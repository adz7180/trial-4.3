<!-- src/views/Customize.vue -->
<template>
  <div class="customize">
    <!-- Header -->
    <header class="header">
      <h1>Customize Your Dream Home</h1>
      <p>Select a home size to begin real‑time customization in hyper‑realistic 4K.</p>
    </header>

    <!-- Size Selector -->
    <div class="size-selector">
      <button
        v-for="size in houseSizes"
        :key="size.value"
        :class="['size-btn', { active: selectedSize === size.value }]"
        @click="selectSize(size.value)"
      >
        {{ size.label }}
      </button>
    </div>

    <!-- Loader Overlay -->
    <div v-if="loading" class="loader-overlay">
      <div class="spinner"></div>
      <p>Generating 4K model…</p>
    </div>

    <!-- 3D Viewer & Panel -->
    <transition name="fade">
      <div v-if="modelUrl && !loading" class="workspace">
        <div class="viewer">
          <SceneViewer
            ref="sceneViewer"
            :modelUrl="modelUrl"
            :resolution="[3840,2160]"
            :enablePBR="true"
            @set-material="applyMaterial"
          />
        </div>
        <aside class="panel">
          <CustomizationPanel @set-material="applyMaterial" />
        </aside>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SceneViewer from '@/components/SceneViewer.vue';
import CustomizationPanel from '@/components/CustomizationPanel.vue';

const selectedSize = ref('');
const modelUrl     = ref('');
const loading      = ref(false);
const sceneViewer  = ref(null);

const houseSizes = [
  { label: '1500 sq ft', value: '1500' },
  { label: '1800 sq ft', value: '1800' },
  { label: '2000 sq ft', value: '2000' },
  { label: '2200 sq ft', value: '2200' },
  { label: '2400 sq ft', value: '2400' },
  { label: '3000 sq ft', value: '3000' },
  { label: '5000 sq ft', value: '5000' }
];

async function selectSize(size) {
  if (loading.value) return;
  selectedSize.value = size;
  modelUrl.value = '';
  loading.value = true;

  try {
    const res = await fetch(`/api/generate-model?size=${size}`);
    if (!res.ok) throw new Error('Generation failed');
    const { url } = await res.json();
    modelUrl.value = url;
  } catch (err) {
    console.error(err);
    alert('Model generation failed. Please try again.');
  } finally {
    loading.value = false;
  }
}

function applyMaterial(material) {
  if (sceneViewer.value && sceneViewer.value.applyMaterial) {
    sceneViewer.value.applyMaterial(material);
  }
}
</script>

<style scoped lang="scss">
// Variables
$white: #fff;
$dark: #1a1a1a;
$primary: #007aff;
$bg: #f5f5f7;

// Base
.customize {
  font-family: 'Inter', sans-serif;
  background: $bg;
  min-height: 100vh;
  padding: 4rem 2rem;
  position: relative;
  overflow-x: hidden;
}

// Header
.header {
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 0.5rem;
    background: linear-gradient(90deg, $primary, lighten($primary,10%));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    color: darken($dark,20%);
    font-size: 1.125rem;
  }
}

// Size Selector
.size-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px,1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto 4rem;
}

.size-btn {
  background: rgba($white,0.4);
  backdrop-filter: blur(8px);
  border: none;
  border-radius: 1rem;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  color: $dark;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba($dark,0.1);
  }

  &.active {
    background: linear-gradient(135deg, $primary, lighten($primary,10%));
    color: $white;
    box-shadow: 0 12px 30px rgba($primary,0.3);
  }
}

// Loader
.loader-overlay {
  position: absolute;
  inset: 0;
  background: rgba($white,0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 20;

  .spinner {
    width: 4rem;
    height: 4rem;
    border: 5px solid rgba($primary,0.3);
    border-top-color: $primary;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  p {
    margin-top: 1rem;
    color: $dark;
    font-weight: 600;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

// Workspace
.workspace {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  max-width: 1440px;
  margin: 0 auto;

  .viewer {
    flex: 2;
    background: $white;
    border-radius: 2rem;
    padding: 1.5rem;
    box-shadow: 0 20px 40px rgba($dark,0.05);
  }

  .panel {
    flex: 1;
    background: rgba($white,0.6);
    backdrop-filter: blur(12px);
    border-radius: 2rem;
    padding: 2rem;
    box-shadow: 0 15px 35px rgba($dark,0.05);
  }
}

// Fade
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

// Responsive
@media (max-width: 1024px) {
  .workspace { flex-direction: column; }
}
</style>
