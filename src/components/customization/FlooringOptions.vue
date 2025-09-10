<template>
  <div class="flooring-selector">
    <h2>Select Flooring for Each Room</h2>
    <div v-for="room in rooms" :key="room.id" class="room-flooring">
      <h3>{{ room.name }}</h3>
      <label>Flooring Type:</label>
      <select v-model="room.flooring" @change="updateFlooring(room)">
        <option value="hardwood">Hardwood</option>
        <option value="tile">Tile</option>
        <option value="carpet">Carpet</option>
        <option value="marble">Marble</option>
        <option value="vinyl">Vinyl</option>
        <option value="laminate">Laminate</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlooringOptions",
  props: {
    rooms: Array
  },
  methods: {
    updateFlooring(room) {
      this.$emit("update-flooring", room);
    }
  }
};
</script>

<style scoped>
.flooring-selector {
  padding: 20px;
}
.room-flooring {
  margin-bottom: 20px;
}
</style>
