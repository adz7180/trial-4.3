<template>
  <div class="pillar-options">
    <h2>Pillar Design</h2>

    <label>Pillar Style:</label>
    <select v-model="pillarStyle" @change="update">
      <option value="modern">Modern</option>
      <option value="classic">Classic</option>
      <option value="roman">Roman</option>
      <option value="minimal">Minimal</option>
    </select>

    <label>Pillar Material:</label>
    <select v-model="pillarMaterial" @change="update">
      <option value="wood">Wood</option>
      <option value="stone">Stone</option>
      <option value="marble">Marble</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'PillarOptions',
  data() {
    return {
      pillarStyle: 'modern',
      pillarMaterial: 'wood'
    }
  },
  methods: {
    update() {
      this.$emit('update-pillars', {
        style: this.pillarStyle,
        material: this.pillarMaterial
      })
    }
  }
}
</script>

<style scoped>
.pillar-options {
  padding: 20px;
}
</style>
