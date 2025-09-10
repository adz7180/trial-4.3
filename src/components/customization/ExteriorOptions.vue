<template>
  <div class="exterior-options">
    <h2>Exterior Customization</h2>

    <label>Brick Color:</label>
    <input type="color" v-model="brickColor" @change="updateExterior" />

    <label>Trim Color:</label>
    <input type="color" v-model="trimColor" @change="updateExterior" />

    <label>Garage Style:</label>
    <select v-model="garageStyle" @change="updateExterior">
      <option value="modern">Modern</option>
      <option value="carriage">Carriage</option>
      <option value="glass">Glass Panel</option>
      <option value="wood">Wood Finish</option>
    </select>

    <label>Outdoor Lighting:</label>
    <select v-model="outdoorLighting" @change="updateExterior">
      <option value="warm">Warm Lights</option>
      <option value="cool">Cool Lights</option>
      <option value="led">LED Accents</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'ExteriorOptions',
  data() {
    return {
      brickColor: '#c1440e',
      trimColor: '#ffffff',
      garageStyle: 'modern',
      outdoorLighting: 'warm'
    }
  },
  methods: {
    updateExterior() {
      this.$emit('set-exterior', {
        brick: this.brickColor,
        trim: this.trimColor,
        garage: this.garageStyle,
        lighting: this.outdoorLighting
      })
    }
  }
}
</script>

<style scoped>
.exterior-options {
  padding: 20px;
}
</style>
