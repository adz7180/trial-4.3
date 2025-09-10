<template>
  <div class="customization-panel">
    <h2>Material & Design Customization</h2>

    <!-- Flooring Options -->
    <div class="section">
      <h3>Flooring</h3>
      <div class="material-options">
        <button
          v-for="material in materials.flooring"
          :key="material.name"
          @click="applyMaterial('floor', material)"
        >
          {{ material.name }}
        </button>
      </div>
    </div>

    <!-- Wall Options -->
    <div class="section">
      <h3>Walls</h3>
      <div class="material-options">
        <button
          v-for="material in materials.walls"
          :key="material.name"
          @click="applyMaterial('walls', material)"
        >
          {{ material.name }}
        </button>
      </div>
    </div>

    <!-- Ceiling Options -->
    <div class="section">
      <h3>Ceilings</h3>
      <div class="material-options">
        <button
          v-for="material in materials.ceiling"
          :key="material.name"
          @click="applyMaterial('ceiling', material)"
        >
          {{ material.name }}
        </button>
      </div>
    </div>

    <!-- Roof Options -->
    <div class="section">
      <h3>Roof</h3>
      <div class="material-options">
        <button
          v-for="material in materials.roof"
          :key="material.name"
          @click="applyMaterial('roof', material)"
        >
          {{ material.name }}
        </button>
      </div>
    </div>

    <!-- Fireplace Options -->
    <div class="section">
      <h3>Fireplace</h3>
      <div class="material-options">
        <button
          v-for="material in materials.fireplace"
          :key="material.name"
          @click="applyMaterial('fireplace', material)"
        >
          {{ material.name }}
        </button>
      </div>
    </div>

    <!-- Furniture Options -->
    <div class="section">
      <h3>Furniture</h3>
      <div class="material-options">
        <button
          v-for="material in materials.furniture"
          :key="material.name"
          @click="applyMaterial('furniture', material)"
        >
          {{ material.name }}
        </button>
      </div>
    </div>

    <!-- Pillars & Columns -->
    <div class="section">
      <h3>Pillars & Columns</h3>
      <div class="material-options">
        <button
          v-for="material in materials.pillars"
          :key="material.name"
          @click="applyMaterial('pillars', material)"
        >
          {{ material.name }}
        </button>
      </div>
    </div>

    <!-- Chandeliers -->
    <div class="section">
      <h3>Chandeliers</h3>
      <div class="material-options">
        <button
          v-for="material in materials.chandelier"
          :key="material.name"
          @click="applyMaterial('chandelier', material)"
        >
          {{ material.name }}
        </button>
      </div>
    </div>

    <!-- Exterior Cladding -->
    <div class="section">
      <h3>Exterior Materials</h3>
      <div class="material-options">
        <button
          v-for="material in materials.exterior"
          :key="material.name"
          @click="applyMaterial('exterior', material)"
        >
          {{ material.name }}
        </button>
      </div>
    </div>

    <!-- Smart Home Options -->
    <div class="section">
      <h3>Smart Home Features</h3>
      <div class="material-options">
        <button
          v-for="material in materials.smartHome"
          :key="material.name"
          @click="applyMaterial('smartHome', material)"
        >
          {{ material.name }}
        </button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CustomizationPanel',
  data() {
    return {
      materials: {
        flooring: [
          { name: 'Hardwood', color: '#8B4513', metalness: 0.1, roughness: 0.6 },
          { name: 'Marble', color: '#f8f8f8', metalness: 0.3, roughness: 0.2 },
          { name: 'Tile', color: '#d9d9d9', metalness: 0.2, roughness: 0.4 }
        ],
        walls: [
          { name: 'White Paint', color: '#ffffff', metalness: 0, roughness: 0.9 },
          { name: 'Beige', color: '#f5f5dc', metalness: 0, roughness: 0.9 },
          { name: 'Feature Wall', color: '#333333', metalness: 0, roughness: 0.9 }
        ],
        ceiling: [
          { name: 'Flat White', color: '#fefefe', metalness: 0, roughness: 0.95 },
          { name: 'Coffered Ceiling', color: '#e0e0e0', metalness: 0, roughness: 0.9 }
        ],
        roof: [
          { name: 'Shingles', color: '#444444', metalness: 0.1, roughness: 0.6 },
          { name: 'Metal Roof', color: '#888888', metalness: 0.5, roughness: 0.3 }
        ],
        fireplace: [
          { name: 'Stone Fireplace', color: '#a9a9a9', metalness: 0.1, roughness: 0.8 },
          { name: 'Brick Fireplace', color: '#b22222', metalness: 0.1, roughness: 0.8 }
        ],
        furniture: [
          { name: 'Leather Sofa', color: '#3e2723', metalness: 0.2, roughness: 0.5 },
          { name: 'Fabric Couch', color: '#c0c0c0', metalness: 0.1, roughness: 0.7 }
        ],
        pillars: [
          { name: 'White Column', color: '#ffffff', metalness: 0, roughness: 0.9 },
          { name: 'Marble Column', color: '#f0f0f0', metalness: 0.2, roughness: 0.6 }
        ],
        chandelier: [
          { name: 'Fancy Crystal', color: '#f5f5f5', metalness: 0.5, roughness: 0.1 },
          { name: 'Modern Black', color: '#333333', metalness: 0.8, roughness: 0.3 }
        ],
        exterior: [
          { name: 'Brick', color: '#b22222', metalness: 0, roughness: 0.9 },
          { name: 'Stucco', color: '#f5f5f5', metalness: 0, roughness: 0.9 },
          { name: 'Wood Siding', color: '#8b4513', metalness: 0.1, roughness: 0.6 }
        ],
        smartHome: [
          { name: 'Enable Smart Lights', color: '#00c853', metalness: 0.2, roughness: 0.3 },
          { name: 'Enable Smart Thermostat', color: '#ff9800', metalness: 0.2, roughness: 0.3 }
        ]
      }
    };
  },
  methods: {
    applyMaterial(category, material) {
      this.$emit('set-material', {
        category,
        material
      });
    }
  }
};
</script>

<style scoped>
.customization-panel {
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

h2 {
  text-align: center;
  font-size: 1.8rem;
  background: linear-gradient(135deg, #007bff, #00b7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section h3 {
  margin-bottom: 10px;
  color: #333;
}

.material-options {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.material-options button {
  background: linear-gradient(135deg, #ffffff, #f0f4f9);
  border: 1px solid #ccc;
  padding: 10px 16px;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
  transition: 0.3s;
}

.material-options button:hover {
  background: linear-gradient(135deg, #007bff, #00b7ff);
  color: white;
}
</style>
