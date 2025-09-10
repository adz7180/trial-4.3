<template>
  <div class="payment-screen">
    <h2>Unlock Full Access</h2>
    <p>Choose a subscription plan to enable downloads, sharing, contractor connect, and more.</p>

    <SubscriptionPlans @select="handlePlanSelect" />

    <div class="security-note">
       All payments are securely processed through Stripe.
    </div>
  </div>
</template>

<script>
import SubscriptionPlans from './subscriptionplans.vue'

export default {
  name: 'PaymentScreen',
  components: {
    SubscriptionPlans,
  },
  methods: {
    handlePlanSelect(plan) {
      this.$router.push({ name: 'Checkout', params: { planId: plan.id } })
    },
  },
}
</script>

<style scoped>
.payment-screen {
  padding: 40px;
  max-width: 800px;
  margin: auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 0 15px rgba(0,0,0,0.08);
  text-align: center;
}

.security-note {
  margin-top: 20px;
  font-size: 0.9rem;
  color: #888;
}
</style>
