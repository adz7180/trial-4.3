<template>
  <div class="explore">
    <h1>Explore Preview</h1>
    <SceneViewer :modelUrl="modelUrl" />
  </div>
</template>

<script>
import SceneViewer from '../components/SceneViewer.vue'

export default {
  components: { SceneViewer },
  data() {
    return {
      modelUrl: '/models/house5000.glb'
    }
  }
}
</script>

<style scoped>
.explore {
  padding: 40px;
  text-align: center;
}
</style>
