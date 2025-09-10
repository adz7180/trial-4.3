<template>
  <nav class="navbar">
    <div class="logo">HexaNest</div>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/scan">Scan</router-link></li>
      <li><router-link to="/customize">Customize</router-link></li>
      <li><router-link to="/public">Public Builds</router-link></li>
      <li><router-link to="/explore">Explore</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.navbar .logo {
  font-size: 1.8rem;
  font-weight: bold;
}

.navbar ul {
  list-style: none;
  display: flex;
  gap: 25px;
  padding: 0;
}

.navbar li {
  font-size: 1rem;
}

.navbar a {
  text-decoration: none;
  color: #333;
}

.navbar a:hover {
  color: #007bff;
}
</style>
