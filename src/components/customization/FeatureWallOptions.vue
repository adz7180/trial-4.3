<template>
  <div class="feature-wall">
    <h2>Feature Wall Customization</h2>

    <label>Material:</label>
    <select v-model="material" @change="update">
      <option value="tile">Tile</option>
      <option value="stone">Stone</option>
      <option value="wood">Wood Panels</option>
      <option value="glass">Glass</option>
    </select>

    <label>Include Mounted TV:</label>
    <input type="checkbox" v-model="mountedTV" @change="update" />
  </div>
</template>

<script>
export default {
  name: 'FeatureWallOptions',
  data() {
    return {
      material: 'tile',
      mountedTV: true
    }
  },
  methods: {
    update() {
      this.$emit('update-featurewall', {
        material: this.material,
        mountedTV: this.mountedTV
      })
    }
  }
}
</script>

<style scoped>
.feature-wall {
  padding: 20px;
}
</style>
