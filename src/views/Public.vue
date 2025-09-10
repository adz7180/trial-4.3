<template>
  <div class="public-builds">
    <div class="header">
      <h1>Explore Public Builds</h1>
      <p>Browse homes shared by verified companies. Click any to fully edit in real-time.</p>
    </div>

    <div class="build-grid">
      <div
        v-for="build in publicBuilds"
        :key="build.id"
        class="build-card"
        @click="openBuild(build)"
      >
        <img :src="build.thumbnailUrl" alt="Build Preview" />
        <div class="info">
          <h3>{{ build.name }}</h3>
          <p>{{ build.company }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firestore } from '@/firebase';
import router from '@/router';

export default {
  name: 'Public',
  data() {
    return {
      publicBuilds: []
    };
  },
  async created() {
    const snapshot = await firestore.collection('builds')
      .where('visibility', '==', 'public')
      .where('uploadedByRole', '==', 'company')
      .get();

    this.publicBuilds = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  },
  methods: {
    openBuild(build) {
      router.push({ name: 'Customize', query: { model: build.modelUrl } });
    }
  }
};
</script>

<style scoped>
.public-builds {
  min-height: 100vh;
  padding: 60px 80px;
  background: linear-gradient(to bottom, #f9fbfd, #e0e6ed);
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 3rem;
  background: linear-gradient(to right, #007bff, #00b7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header p {
  font-size: 1.2rem;
  color: #555;
}

.build-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  margin-top: 30px;
}

.build-card {
  background: rgba(255, 255, 255, 0.85);
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(30px);
}

.build-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.1);
}

.build-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.build-card .info {
  padding: 20px;
  text-align: center;
}

.build-card h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: #222;
}

.build-card p {
  color: #666;
  font-size: 0.95rem;
}
</style>
