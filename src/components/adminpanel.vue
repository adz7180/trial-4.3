<template>
  <div class="admin-panel">
    <h2>HexaNest Admin Panel</h2>

    <section class="logs">
      <h3>Weekly Auto-Update Log</h3>
      <ul>
        <li v-for="entry in updateLog" :key="entry.date">
          {{ entry.date }} — {{ entry.change }}
        </li>
      </ul>
    </section>

    <section class="contractor-requests">
      <h3>Contractor Match Requests</h3>
      <ul>
        <li v-for="request in contractorRequests" :key="request.id">
          {{ request.email }} • {{ request.location }} • <strong>{{ request.model }}</strong>
        </li>
      </ul>
    </section>

    <section class="abuse-tracking">
      <h3>Trial Abuse Monitoring</h3>
      <ul>
        <li v-for="abuse in trialAbuse" :key="abuse.deviceId">
          Device: {{ abuse.deviceId }} — IP: {{ abuse.ip }} — Attempts: {{ abuse.attempts }}
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import autoUpdateManager from '../utils/autoUpdateManager'
// import trialManager from '../utils/trialManager'

export default {
  name: 'AdminPanel',
  data() {
    return {
      updateLog: [],
      contractorRequests: [],
      trialAbuse: [],
    }
  },
  created() {
    this.updateLog = autoUpdateManager.getWeeklyLog()
    this.contractorRequests = JSON.parse(localStorage.getItem('contractorRequests') || '[]')
    this.trialAbuse = trialManager.getAbuseLog()
  },
}
</script>

<style scoped>
.admin-panel {
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
  max-width: 1000px;
  margin: auto;
}

section {
  margin-bottom: 2rem;
}

h3 {
  margin-bottom: 0.5rem;
  color: #444;
}

ul {
  list-style: disc;
  padding-left: 2rem;
}
</style>
