<template>
  <div class="fireplace-options">
    <h2>Fireplace Selection</h2>

    <label>Type:</label>
    <select v-model="type" @change="apply">
      <option value="gas">Gas</option>
      <option value="electric">Electric</option>
      <option value="wood">Wood-burning</option>
      <option value="modern">Modern Wall Insert</option>
    </select>

    <label>Frame Material:</label>
    <select v-model="frame" @change="apply">
      <option value="marble">Marble</option>
      <option value="stone">Stone</option>
      <option value="tile">Tile</option>
      <option value="steel">Steel</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FireplaceOptions',
  data() {
    return {
      type: 'electric',
      frame: 'marble'
    }
  },
  methods: {
    apply() {
      this.$emit('set-fireplace', {
        type: this.type,
        frame: this.frame
      })
    }
  }
}
</script>

<style scoped>
.fireplace-options {
  padding: 20px;
}
</style>
