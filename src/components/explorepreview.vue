<template>
  <div class="explore-preview">
    <video ref="previewVideo" autoplay loop muted playsinline>
      <source src="@/assets/videos/hexanest_walkthrough_4k.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <img class="watermark" src="@/assets/logo.png" alt="HexaNest Logo" />
    <div class="cta">
      <h2>Explore Your Dream Home</h2>
      <p>This walkthrough shows what’s possible with HexaNest. Ready to design your own?</p>
      <button @click="$router.push('/subscription')">Get Started</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExplorePreview',
}
</script>

<style scoped>
.explore-preview {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.watermark {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 140px;
  opacity: 0.6;
  animation: pulse 3s infinite;
  pointer-events: none;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}

.cta {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  text-align: center;
  background: rgba(0,0,0,0.5);
  padding: 20px 40px;
  border-radius: 12px;
  backdrop-filter: blur(4px);
}

.cta button {
  margin-top: 10px;
  padding: 10px 24px;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  background: #1e88e5;
  color: white;
  cursor: pointer;
}
</style>
