// src/components/FeatureCard.vue
<template>
  <div class="flex flex-col items-center">
    <img :src="icon" alt="" class="w-12 h-12 mb-2" />
    <span class="text-white font-medium">{{ label }}</span>
  </div>
</template>

<script>
export default {
  name: 'FeatureCard',
  props: {
    icon: { type: String, required: true },
    label: { type: String, required: true }
  }
};
</script>

<style scoped>
img {
  filter: brightness(1) drop-shadow(0 2px 4px rgba(0,0,0,0.5));
}
</style>
