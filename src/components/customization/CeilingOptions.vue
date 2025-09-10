<template>
  <div class="ceiling-options">
    <h2>Ceiling Style</h2>
    <div v-for="room in rooms" :key="room.id" class="room-ceiling">
      <h3>{{ room.name }}</h3>
      <label>Ceiling Type:</label>
      <select v-model="room.ceiling" @change="updateCeiling(room)">
        <option value="flat">Flat</option>
        <option value="tray">Tray</option>
        <option value="coffered">Coffered</option>
        <option value="vaulted">Vaulted</option>
        <option value="beam">Exposed Beams</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "CeilingOptions",
  props: {
    rooms: Array
  },
  methods: {
    updateCeiling(room) {
      this.$emit("update-ceiling", room);
    }
  }
};
</script>

<style scoped>
.ceiling-options {
  padding: 20px;
}
.room-ceiling {
  margin-bottom: 20px;
}
</style>
