<template>
  <div class="admin">
    <h1>Admin Dashboard</h1>
    <div class="panel-grid">
      <div class="panel">Manage Users</div>
      <div class="panel">Public Builds</div>
      <div class="panel">Contractors</div>
      <div class="panel">Payments & Plans</div>
      <div class="panel">System Logs</div>
    </div>
  </div>
</template>

<style scoped>
.admin {
  padding: 80px;
  background: linear-gradient(to bottom, #fdfdfd, #eaeaea);
}

h1 {
  font-size: 2.8rem;
  margin-bottom: 40px;
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.panel {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(30px);
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  text-align: center;
  font-weight: 600;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.panel:hover {
  transform: translateY(-6px);
}
</style>
