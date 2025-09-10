<template>
  <div class="chandelier-options">
    <h2>Select Chandelier Style</h2>

    <label>Room:</label>
    <select v-model="room">
      <option value="foyer">Foyer</option>
      <option value="dining">Dining Room</option>
      <option value="living">Living Room</option>
      <option value="hallway">Hallway</option>
    </select>

    <label>Style:</label>
    <select v-model="style">
      <option value="fancy">Fancy</option>
      <option value="modern">Modern</option>
      <option value="casual">Casual</option>
      <option value="rustic">Rustic</option>
    </select>

    <button @click="apply">Apply</button>
  </div>
</template>

<script>
export default {
  name: 'ChandelierOptions',
  data() {
    return {
      room: 'foyer',
      style: 'fancy'
    }
  },
  methods: {
    apply() {
      this.$emit('set-chandelier', {
        room: this.room,
        style: this.style
      })
    }
  }
}
</script>

<style scoped>
.chandelier-options {
  padding: 20px;
}
</style>
