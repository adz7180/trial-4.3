<template>
  <div class="smarthome-options">
    <h2>Smart Home Integration</h2>

    <label><input type="checkbox" v-model="features.voice" /> Voice Control</label>
    <label><input type="checkbox" v-model="features.lighting" /> Smart Lighting</label>
    <label><input type="checkbox" v-model="features.thermostat" /> Smart Thermostat</label>
    <label><input type="checkbox" v-model="features.security" /> Security System</label>
    <label><input type="checkbox" v-model="features.energy" /> Energy Efficiency Mode</label>

    <button @click="applySmartHome">Apply</button>
  </div>
</template>

<script>
export default {
  name: 'SmartHomeOptions',
  data() {
    return {
      features: {
        voice: true,
        lighting: true,
        thermostat: false,
        security: false,
        energy: false
      }
    }
  },
  methods: {
    applySmartHome() {
      this.$emit('set-smarthome', this.features)
    }
  }
}
</script>

<style scoped>
.smarthome-options {
  padding: 20px;
}
</style>
