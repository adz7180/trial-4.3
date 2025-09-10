// src/components/ProductCard.vue
<template>
  <div class="bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
    <img :src="image" alt="" class="w-full h-48 object-cover" />
    <div class="py-4 bg-blue-600 text-center">
      <span class="text-white font-bold">{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    image: { type: String, required: true },
    label: { type: String, required: true }
  }
};
</script>

<style scoped>
img {
  transition: transform .3s ease;
}
img:hover {
  transform: scale(1.05);
}
</style>
