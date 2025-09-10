<template>
  <div class="contractor-connect">
    <h2>Send Your Design to a Contractor</h2>
    <p>Once you're happy with your home design, we’ll help you connect with a vetted contractor near you.</p>

    <div class="design-summary">
      <label>Design Title</label>
      <input v-model="designTitle" placeholder="e.g. Modern Dream Home" />

      <label>Design Notes (optional)</label>
      <textarea v-model="designNotes" placeholder="Any special instructions for the contractor..."></textarea>

      <button @click="sendToContractor" :disabled="sending">
        {{ sending ? 'Sending...' : 'Send to Contractor' }}
      </button>

      <p v-if="confirmation" class="success">{{ confirmation }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContractorConnect',
  data() {
    return {
      designTitle: '',
      designNotes: '',
      sending: false,
      confirmation: ''
    };
  },
  methods: {
    sendToContractor() {
      this.sending = true;

      // Simulated backend send
      setTimeout(() => {
        this.confirmation = "Your design has been successfully forwarded to a contractor near you!";
        this.sending = false;
        this.designTitle = '';
        this.designNotes = '';
      }, 2000);
    }
  }
}
</script>

<style scoped>
.contractor-connect {
  padding: 30px;
  max-width: 600px;
  margin: auto;
  background: #fefefe;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.contractor-connect h2 {
  margin-bottom: 10px;
  font-size: 24px;
}

.contractor-connect label {
  margin-top: 15px;
  font-weight: bold;
  display: block;
}

.contractor-connect input,
.contractor-connect textarea {
  width: 100%;
  padding: 10px;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}

.contractor-connect button {
  margin-top: 20px;
  padding: 12px 20px;
  font-size: 16px;
  background: #1e88e5;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.success {
  margin-top: 15px;
  color: green;
  font-weight: bold;
}
</style>
