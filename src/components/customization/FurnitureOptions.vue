<template>
  <div class="furniture-options">
    <h2>Select Furniture Style</h2>
    <label>Room:</label>
    <select v-model="selectedRoom">
      <option v-for="room in rooms" :key="room">{{ room }}</option>
    </select>

    <label>Style:</label>
    <select v-model="selectedStyle">
      <option value="modern">Modern</option>
      <option value="elegant">Elegant</option>
      <option value="french">French</option>
      <option value="casual">Casual</option>
    </select>

    <label>Table Type:</label>
    <select v-model="tableType">
      <option value="wood">Wood</option>
      <option value="marble">Marble</option>
      <option value="glass">Glass</option>
    </select>

    <button @click="applyStyle">Apply</button>
  </div>
</template>

<script>
export default {
  name: 'FurnitureOptions',
  data() {
    return {
      rooms: ['Living Room', 'Dining Room', 'Bedroom', 'Office'],
      selectedRoom: 'Living Room',
      selectedStyle: 'modern',
      tableType: 'wood'
    }
  },
  methods: {
    applyStyle() {
      this.$emit('set-furniture', {
        room: this.selectedRoom,
        style: this.selectedStyle,
        table: this.tableType
      })
    }
  }
}
</script>

<style scoped>
.furniture-options {
  padding: 20px;
}
</style>
