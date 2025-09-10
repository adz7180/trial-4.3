<template>
  <div class="window-options">
    <h2>Window & Door Placement</h2>
    <p>Drag and drop windows/doors into place. Customize style, size, and frame.</p>
    <div class="window-tools">
      <label>Window Style:</label>
      <select v-model="selectedStyle">
        <option value="sliding">Sliding</option>
        <option value="french">French</option>
        <option value="bay">Bay</option>
        <option value="casement">Casement</option>
        <option value="picture">Picture</option>
      </select>
    </div>
    <button @click="enableDragMode">Place New Window</button>
  </div>
</template>

<script>
export default {
  name: 'WindowOptions',
  data() {
    return {
      selectedStyle: 'sliding'
    }
  },
  methods: {
    enableDragMode() {
      this.$emit('place-window', this.selectedStyle)
    }
  }
}
</script>

<style scoped>
.window-options {
  padding: 20px;
}
</style>
