<template>
  <div class="dashboard">
    <div class="header">
      <h1>Company Dashboard</h1>
      <p>Manage your builds. Upload new designs or update existing ones.</p>
    </div>

    <!-- Upload New Build -->
    <div class="upload-form">
      <h2>Upload New Build</h2>
      <input v-model="name" placeholder="Build Name" />
      <input v-model="description" placeholder="Short Description" />
      <input type="file" @change="handleModelUpload" />
      <input type="file" @change="handleImageUpload" />
      <select v-model="visibility">
        <option value="public">Public</option>
        <option value="private">Private</option>
      </select>
      <button :disabled="!readyToUpload" @click="uploadBuild">Upload Build</button>
    </div>

    <!-- List of Company Builds -->
    <div class="build-list">
      <h2>Your Builds</h2>
      <div
        class="build-card"
        v-for="build in companyBuilds"
        :key="build.id"
      >
        <img :src="build.previewImage" alt="Preview" />
        <div class="build-info">
          <h3>{{ build.name }}</h3>
          <p>{{ build.description }}</p>
          <span class="status" :class="build.visibility">{{ build.visibility }}</span>
          <div class="actions">
            <button @click="toggleVisibility(build)">{{ build.visibility === 'public' ? 'Make Private' : 'Make Public' }}</button>
            <button class="delete" @click="deleteBuild(build.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default {
  name: 'CompanyDashboard',
  data() {
    return {
      name: '',
      description: '',
      modelFile: null,
      imageFile: null,
      visibility: 'public',
      companyBuilds: [],
    };
  },
  computed: {
    readyToUpload() {
      return this.name && this.description && this.modelFile && this.imageFile;
    }
  },
  async mounted() {
    await this.fetchCompanyBuilds();
  },
  methods: {
    async fetchCompanyBuilds() {
      const auth = getAuth();
      const user = auth.currentUser;
      const q = query(collection(db, 'builds'), where('ownerId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      this.companyBuilds = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    },
    handleModelUpload(e) {
      this.modelFile = e.target.files[0];
    },
    handleImageUpload(e) {
      this.imageFile = e.target.files[0];
    },
    async uploadBuild() {
      const auth = getAuth();
      const user = auth.currentUser;
      const modelUrl = `/uploads/${user.uid}/${this.modelFile.name}`;
      const previewImage = `/uploads/${user.uid}/${this.imageFile.name}`;

      await addDoc(collection(db, 'builds'), {
        name: this.name,
        description: this.description,
        modelUrl,
        previewImage,
        visibility: this.visibility,
        ownerId: user.uid,
        timestamp: new Date()
      });

      this.name = '';
      this.description = '';
      this.modelFile = null;
      this.imageFile = null;
      this.visibility = 'public';

      await this.fetchCompanyBuilds();
    },
    async toggleVisibility(build) {
      const docRef = doc(db, 'builds', build.id);
      const newVisibility = build.visibility === 'public' ? 'private' : 'public';
      await updateDoc(docRef, { visibility: newVisibility });
      await this.fetchCompanyBuilds();
    },
    async deleteBuild(id) {
      await deleteDoc(doc(db, 'builds', id));
      await this.fetchCompanyBuilds();
    }
  }
};
</script>

<style scoped>
.dashboard {
  background: radial-gradient(circle at top, #f9fbfd, #e7ebf0);
  min-height: 100vh;
  padding: 50px 70px;
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
  color: #666;
  font-size: 1.1rem;
}

.upload-form {
  background: rgba(255, 255, 255, 0.9);
  padding: 24px;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(20px);
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
}

.upload-form input,
.upload-form select {
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  width: 240px;
}

.upload-form button {
  background: linear-gradient(135deg, #007bff, #00b7ff);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.upload-form button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.upload-form button:hover {
  transform: translateY(-3px);
}

.build-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.build-card {
  display: flex;
  gap: 20px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(20px);
}

.build-card img {
  width: 160px;
  height: 120px;
  object-fit: cover;
  border-radius: 14px;
}

.build-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.build-info h3 {
  margin: 0;
}

.status {
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 0.8rem;
  color: white;
}

.status.public {
  background: #28a745;
}

.status.private {
  background: #dc3545;
}

.actions {
  display: flex;
  gap: 10px;
}

.actions button {
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
}

.actions .delete {
  background: #dc3545;
}
</style>
