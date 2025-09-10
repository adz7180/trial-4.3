<template>
  <div class="wall-customizer">
    <h2>Wall Customization</h2>
    <div v-for="wall in walls" :key="wall.id" class="wall-section">
      <h3>{{ wall.name }}</h3>

      <label>Texture:</label>
      <select v-model="wall.texture" @change="updateWall(wall)">
        <option value="smooth">Smooth</option>
        <option value="brick">Brick</option>
        <option value="concrete">Concrete</option>
        <option value="wainscoting">Wainscoting</option>
        <option value="marble">Marble</option>
      </select>

      <label>Color:</label>
      <input type="color" v-model="wall.color" @change="updateWall(wall)" />

      <label>Feature Wall:</label>
      <input type="checkbox" v-model="wall.isFeature" @change="updateWall(wall)" />

      <div v-if="wall.isFeature">
        <label>Mount TV:</label>
        <input type="checkbox" v-model="wall.mountTV" @change="updateWall(wall)" />

        <label>Backsplash Type:</label>
        <select v-model="wall.backsplash" @change="updateWall(wall)">
          <option value="glass">Glass</option>
          <option value="tile">Tile</option>
          <option value="stone">Stone</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WallOptions",
  props: {
    walls: Array
  },
  methods: {
    updateWall(wall) {
      this.$emit("update-wall", wall);
    }
  }
};
</script>

<style scoped>
.wall-customizer {
  padding: 20px;
}
.wall-section {
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 15px;
}
</style>
