<template>
  <div class="lighting-options">
    <h2>Lighting Per Room</h2>
    <div v-for="room in rooms" :key="room.id" class="room-lighting">
      <h3>{{ room.name }}</h3>
      <label>Lighting Style:</label>
      <select v-model="room.lighting" @change="updateLighting(room)">
        <option value="modern">Modern</option>
        <option value="warm">Warm Glow</option>
        <option value="cool">Cool White</option>
        <option value="spotlight">Spotlight</option>
        <option value="color">Smart RGB</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LightingOptions',
  props: {
    rooms: Array
  },
  methods: {
    updateLighting(room) {
      this.$emit('update-lighting', room)
    }
  }
}
</script>

<style scoped>
.lighting-options {
  padding: 20px;
}
.room-lighting {
  margin-bottom: 20px;
}
</style>
