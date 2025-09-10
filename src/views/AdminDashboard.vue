<template>
  <div class="admin-dashboard">
    <Navbar />
    <div class="content">
      <h1 class="title">Master Admin Dashboard</h1>
      <p class="subtitle">Manage all company builds, featured projects, and platform operations</p>

      <!-- Featured Builds Control -->
      <div class="card">
        <h2>Featured Builds</h2>
        <div v-if="featured.length">
          <div v-for="build in featured" :key="build.id" class="build-item">
            <span>{{ build.name }}</span>
            <button @click="removeFeatured(build.id)">Remove</button>
          </div>
        </div>
        <div v-else>No featured builds yet.</div>
        <select v-model="selectedBuild">
          <option disabled value="">Select a build to feature</option>
          <option v-for="build in allBuilds" :key="build.id" :value="build.id">{{ build.name }}</option>
        </select>
        <button @click="addFeatured">Feature Build</button>
      </div>

      <!-- Abuse Management -->
      <div class="card">
        <h2>Abuse Reports</h2>
        <div v-if="abuseReports.length">
          <div v-for="report in abuseReports" :key="report.id" class="abuse-item">
            <p><strong>User:</strong> {{ report.user }}</p>
            <p><strong>Reason:</strong> {{ report.reason }}</p>
            <button @click="deleteBuild(report.buildId)">Delete Build</button>
            <button @click="dismissReport(report.id)">Dismiss</button>
          </div>
        </div>
        <div v-else>No reports at this time.</div>
      </div>

      <!-- Company Projects Overview -->
      <div class="card">
        <h2>All Company Projects</h2>
        <div v-if="allBuilds.length">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="build in allBuilds" :key="build.id">
                <td>{{ build.name }}</td>
                <td>{{ build.company }}</td>
                <td>{{ build.public ? 'Public' : 'Private' }}</td>
                <td>
                  <button @click="togglePublic(build)">{{ build.public ? 'Make Private' : 'Make Public' }}</button>
                  <button @click="deleteBuild(build.id)" class="danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>No builds available.</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { firestore } from '@/firebase';

export default {
  name: 'AdminDashboard',
  components: { Navbar },
  data() {
    return {
      allBuilds: [],
      featured: [],
      abuseReports: [],
      selectedBuild: ''
    };
  },
  async created() {
    await this.fetchBuilds();
    await this.fetchFeatured();
    await this.fetchReports();
  },
  methods: {
    async fetchBuilds() {
      const snapshot = await firestore.collection('builds').get();
      this.allBuilds = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async fetchFeatured() {
      const snapshot = await firestore.collection('featured').get();
      this.featured = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async fetchReports() {
      const snapshot = await firestore.collection('reports').get();
      this.abuseReports = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    async togglePublic(build) {
      await firestore.collection('builds').doc(build.id).update({ public: !build.public });
      this.fetchBuilds();
    },
    async deleteBuild(id) {
      await firestore.collection('builds').doc(id).delete();
      this.fetchBuilds();
    },
    async addFeatured() {
      if (!this.selectedBuild) return;
      const build = this.allBuilds.find(b => b.id === this.selectedBuild);
      await firestore.collection('featured').doc(build.id).set(build);
      this.selectedBuild = '';
      this.fetchFeatured();
    },
    async removeFeatured(id) {
      await firestore.collection('featured').doc(id).delete();
      this.fetchFeatured();
    },
    async dismissReport(id) {
      await firestore.collection('reports').doc(id).delete();
      this.fetchReports();
    }
  }
};
</script>

<style scoped>
.admin-dashboard {
  background: #f9fafd;
  min-height: 100vh;
}
.content {
  padding: 50px;
  max-width: 1400px;
  margin: auto;
}
.title {
  font-size: 2.8rem;
  margin-bottom: 10px;
  font-weight: 800;
  color: #111;
}
.subtitle {
  color: #666;
  margin-bottom: 40px;
}
.card {
  background: white;
  border-radius: 24px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.06);
}
.build-item,
.abuse-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
select {
  margin-top: 20px;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #ccc;
}
button {
  background: #007bff;
  border: none;
  color: white;
  padding: 8px 18px;
  border-radius: 12px;
  cursor: pointer;
  margin-left: 10px;
  font-weight: 600;
}
button:hover {
  background: #005dc5;
}
button.danger {
  background: #e74c3c;
}
button.danger:hover {
  background: #c0392b;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  text-align: left;
  padding: 14px;
  border-bottom: 1px solid #eee;
}
</style>
