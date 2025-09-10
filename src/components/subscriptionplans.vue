<template>
  <div class="plans">
    <div v-for="plan in plans" :key="plan.id" class="plan-card" @click="$emit('select', plan)">
      <h3>{{ plan.name }}</h3>
      <p class="price">{{ plan.price }}</p>
      <ul>
        <li v-for="feature in plan.features" :key="feature"> {{ feature }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionPlans',
  data() {
    return {
      plans: [
        {
          id: 'free',
          name: '3-Day Free Trial',
          price: '$0',
          features: [
            'Access all features',
            'Customize all rooms',
            'No downloads allowed',
            'Preview only',
          ],
        },
        {
          id: 'monthly',
          name: 'Monthly Plan',
          price: '$15 CAD/month',
          features: [
            'Download custom home designs',
            'Share with architects & contractors',
            'Send to local contractors',
            'Access every feature',
            'Priority rendering',
          ],
        },
        {
          id: 'annual',
          name: 'Annual Plan',
          price: '$162 CAD/year (10% off)',
          features: [
            'Everything in Monthly Plan',
            'Save 10% over the year',
            'Dedicated support access',
          ],
        },
      ],
    }
  },
}
</script>

<style scoped>
.plans {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  flex-wrap: wrap;
}

.plan-card {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  width: 280px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}

.plan-card:hover {
  background: #eaeaea;
}

.price {
  font-weight: bold;
  font-size: 1.3rem;
  margin-bottom: 10px;
}
</style>
