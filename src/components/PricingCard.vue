// src/components/PricingCard.vue
<template>
  <div class="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between">
    <div>
      <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
      <div class="flex items-baseline mb-4">
        <span class="text-4xl font-extrabold">{{ price }}</span>
        <span class="text-lg text-gray-300 ml-1">{{ unit }}</span>
      </div>
      <ul class="space-y-2 mb-6 text-gray-300">
        <li v-for="(feat,i) in featuresList" :key="i">✔ {{ feat }}</li>
      </ul>
    </div>
    <button class="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold uppercase transition">Get Started</button>
  </div>
</template>

<script>
export default {
  name: 'PricingCard',
  props: {
    title: { type: String, required: true },
    price: { type: String, required: true },
    unit: { type: String, required: true },
    features: { type: Array, required: true }
  },
  computed: {
    featuresList() {
      return this.features;
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
