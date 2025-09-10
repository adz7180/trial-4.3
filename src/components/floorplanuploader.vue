<template>
  <div class="uploader">
    <h2>Scan Floor Plan</h2>
    <input type="file" @change="handleFileUpload" accept=".jpg, .png, .jpeg, .pdf, .svg" />
    <p v-if="loading">Processing floor plan into 3D...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
// import blueprintTo3DModel from '../utils/blueprintTo3DModel'
import analytics from '../utils/analytics'

export default {
  name: 'FloorPlanUploader',
  data() {
    return {
      loading: false,
      error: null,
    }
  },
  methods: {
    async handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      this.loading = true
      this.error = null

      try {
        const modelData = await blueprintTo3DModel(file)
        this.$store.commit('setCurrentModel', modelData)
        this.$router.push('/editor')
        analytics.trackEvent('FloorPlan Scanned')
      } catch (err) {
        console.error('Error scanning floor plan:', err)
        this.error = 'Failed to process floor plan. Please upload a clear file.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.uploader {
  padding: 2rem;
  text-align: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.08);
  max-width: 500px;
  margin: 3rem auto;
}

input[type='file'] {
  margin-top: 1rem;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
