<template>
  <div id="app">
    <div class="watermark-logo">
      <img src="@/assets/logo.png" alt="HexaNest Logo" />
    </div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
@use './assets/global.scss' as *;

#app {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
  overflow: hidden;
  position: relative;
}

// Smooth fade transitions between routes
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

// Pulsing watermark in top-right corner
.watermark-logo {
  position: absolute;
  top: 20px;
  right: 20px;
  opacity: 0.6;
  animation: pulse 3s infinite;
  z-index: 1000;

  img {
    width: 120px;
  }
}

@keyframes pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}
</style>
