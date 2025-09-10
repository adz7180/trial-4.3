<template>
  <div class="demo-preview">
    <video
      class="demo-video"
      autoplay
      muted
      loop
      playsinline
    >
      <source src="@/assets/videos/demo_homewalkthrough.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div class="overlay">
      <div class="logo">HexaNest</div>
      <div class="text-block">
        <h1>Design The Impossible</h1>
        <p>
          Experience ultra-realistic customization — from floors and lighting to
          feature walls, chandeliers, smart tech, and more.
        </p>
        <div class="actions">
          <button @click="startDesign">Start Designing</button>
          <button @click="viewPlans">View Floor Plans</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DemoPreview",
  methods: {
    startDesign() {
      this.$router.push('/customize');
    },
    viewPlans() {
      this.$router.push('/home-selector');
    }
  }
};
</script>

<style scoped>
.demo-preview {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: black;
}

.demo-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(1.05) contrast(1.1);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  color: white;
  background: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8));
}

.logo {
  font-size: 28px;
  font-weight: bold;
  align-self: flex-end;
  opacity: 0.9;
  animation: pulse 3s infinite;
  pointer-events: none;
}

.text-block {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  pointer-events: auto;
}

.text-block h1 {
  font-size: 42px;
  margin-bottom: 10px;
}

.text-block p {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 30px;
}

.actions button {
  background: white;
  color: black;
  padding: 12px 22px;
  margin: 0 12px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
}

.actions button:hover {
  background: #f0f0f0;
}

@keyframes pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
</style>
