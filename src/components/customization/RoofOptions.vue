<template>
  <div class="roof-options">
    <h2>Roof Customization</h2>
    <label>Roof Type:</label>
    <select v-model="roofType" @change="updateRoof">
      <option value="gable">Gable</option>
      <option value="hip">Hip</option>
      <option value="flat">Flat</option>
      <option value="mansard">Mansard</option>
      <option value="shed">Shed</option>
    </select>

    <label>Color:</label>
    <input type="color" v-model="roofColor" @change="updateRoof" />
  </div>
</template>

<script>
export default {
  name: 'RoofOptions',
  data() {
    return {
      roofType: 'gable',
      roofColor: '#666666'
    }
  },
  methods: {
    updateRoof() {
      this.$emit('set-roof', {
        type: this.roofType,
        color: this.roofColor
      })
    }
  }
}
</script>

<style scoped>
.roof-options {
  padding: 20px;
}
</style>
