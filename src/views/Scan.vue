<template>
  <div class="page">
    <!-- Top bar -->
    <header class="topbar">
      <RouterLink to="/" class="brand" aria-label="HexaNest Home">
        <!-- Small inline HexaNest logo -->
        <svg class="mark" viewBox="0 0 120 120" role="img" aria-label="HexaNest Logo">
          <path d="M60 8 16 33v54l44 25 44-25V33L60 8Zm0 10 34 19v46L60 102 26 83V37l34-19Z" />
          <path d="M60 36 39 48v30l21 12 21-12V48L60 36Zm0 10 13 8v22l-13 7-13-7V54l13-8Z" />
          <rect x="57" y="66" width="6" height="20" rx="3" />
        </svg>
        <span class="wordmark">HEXANEST</span>
      </RouterLink>
    </header>

    <!-- Main -->
    <main class="main">
      <!-- Hero -->
      <section class="hero">
        <div class="hero-text">
          <h1>Scan blueprint to 3D</h1>
          <p>Upload a PDF or image. Our AI turns it into a photoreal, editable model you can walk through and customize.</p>
          <div class="pill-row">
            <span>PDF / PNG / JPG</span>
            <span>Wall & room detection</span>
            <span>Editable materials</span>
          </div>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="glass"></div>
        </div>
      </section>

      <!-- Uploader -->
      <section class="uploader" aria-label="Upload blueprint">
        <div
          class="dropzone"
          :class="{ dragover: isDragOver, ready: fileName, disabled: loading }"
          @dragover.prevent="onDragOver"
          @dragleave.prevent="onDragLeave"
          @drop.prevent="onDrop"
        >
          <input
            ref="fileInput"
            type="file"
            class="file-input"
            accept=".pdf,image/*"
            @change="onPickFile"
            aria-label="Upload a PDF or image"
            :disabled="loading"
          />
          <div class="dz-inner">
            <div class="icon" aria-hidden="true"></div>
            <div class="dz-copy">
              <strong>Drag & drop</strong> your blueprint here<br />
              or <button class="linklike" :disabled="loading" @click="trigger">browse</button> to upload
            </div>
            <div class="dz-sub">Accepted: PDF, PNG, JPG • Max 50MB</div>
            <div v-if="fileName" class="dz-file">Selected: {{ fileName }}</div>
          </div>
        </div>

        <div class="actions">
          <button class="btn btn-primary" :disabled="!file || loading" @click="startScan">
            {{ loading ? 'Scanning…' : 'Generate 3D Model' }}
          </button>
          <button class="btn btn-outline" :disabled="(!file && !loading) || loading" @click="clearFile">
            {{ loading ? 'Cancel' : 'Clear' }}
          </button>
        </div>

        <!-- Progress & error -->
        <div v-if="loading" class="progress" aria-live="polite">
          <div class="bar"><span :style="{ width: progress + '%' }"></span></div>
          <div class="muted">Processing… this may take a moment.</div>
        </div>
        <p v-if="error" class="error" aria-live="assertive">{{ error }}</p>
      </section>

      <!-- Viewer -->
      <section
        v-if="modelUrl"
        class="viewer-section"
        aria-label="3D viewer"
        ref="viewerSection"
      >
        <div class="viewer-card">
          <div class="viewer-head">
            <h2>Your 3D model</h2>
            <div class="viewer-actions">
              <RouterLink to="/customize" class="btn btn-outline-sm">Customize</RouterLink>
              <RouterLink to="/share" class="btn btn-outline-sm">Share</RouterLink>
            </div>
          </div>
          <div class="viewer">
            <SceneViewer :modelUrl="modelUrl" />
          </div>
        </div>
      </section>

      <!-- Suggestions -->
      <section v-if="suggestions.length" class="suggestions" aria-label="Design suggestions">
        <h2>Design suggestions</h2>
        <ul>
          <li v-for="(s, i) in suggestions" :key="i">{{ s }}</li>
        </ul>
      </section>
    </main>

    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} HexaNest. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import SceneViewer from '@/components/SceneViewer.vue'

export default {
  name: 'Scan',
  components: { SceneViewer },
  data() {
    return {
      modelUrl: null,
      suggestions: [],
      file: null,
      fileName: '',
      error: '',
      loading: false,
      progress: 12,
      isDragOver: false,
      _progressTimer: null,
      _controller: null
    }
  },
  methods: {
    // UI handlers
    trigger() {
      if (this.$refs.fileInput) this.$refs.fileInput.click()
    },
    onPickFile(e) {
      const files = e && e.target && e.target.files ? e.target.files : null
      this.handleFile(files && files.length ? files[0] : null)
    },
    onDragOver() {
      if (!this.loading) this.isDragOver = true
    },
    onDragLeave() {
      this.isDragOver = false
    },
    onDrop(e) {
      this.isDragOver = false
      if (this.loading) return
      const dt = e && e.dataTransfer ? e.dataTransfer : null
      const f = dt && dt.files && dt.files.length ? dt.files[0] : null
      this.handleFile(f)
    },
    clearFile() {
      // If currently loading, treat Clear as cancel
      if (this.loading && this._controller && typeof this._controller.abort === 'function') {
        try { this._controller.abort() } catch (err) {}
      }
      this.file = null
      this.fileName = ''
      this.error = ''
      this.modelUrl = null
      this.suggestions = []
    },

    // Validation & set
    handleFile(f) {
      if (!f) return
      const name = f && f.name ? f.name.toLowerCase() : ''
      const type = f && f.type ? f.type : ''
      const okType = (type.indexOf('image/') === 0) || name.endsWith('.pdf')
      if (!okType) { this.error = 'Unsupported file type. Upload a PDF or image.'; return }
      const max = 50 * 1024 * 1024
      if (f.size > max) { this.error = 'File too large. Max 50MB.'; return }
      this.error = ''
      this.file = f
      this.fileName = f.name
    },

    // Cosmetic progress while waiting
    _startFakeProgress() {
      this.progress = 12
      this._stopFakeProgress()
      this._progressTimer = setInterval(() => {
        if (this.progress < 85) this.progress += Math.random() * 4
      }, 400)
    },
    _stopFakeProgress() {
      if (this._progressTimer) {
        clearInterval(this._progressTimer)
        this._progressTimer = null
      }
    },

    // API call — same backend contract
    async startScan() {
      if (!this.file) return
      this.loading = true
      this.error = ''
      this.modelUrl = null
      this.suggestions = []
      this._startFakeProgress()

      // Abort any previous request
      if (this._controller && typeof this._controller.abort === 'function') {
        try { this._controller.abort() } catch (err) {}
      }
      // Create AbortController if available (older browsers may not have it)
      this._controller = (typeof AbortController !== 'undefined') ? new AbortController() : null

      const formData = new FormData()
      formData.append('file', this.file)

      try {
        const fetchOpts = { method: 'POST', body: formData }
        if (this._controller) fetchOpts.signal = this._controller.signal

        const res = await fetch('/api/scan', fetchOpts)
        if (!res.ok) {
          let text = ''
          try { text = await res.text() } catch (e) {}
          // eslint-disable-next-line no-console
          console.error('API Error:', res.status, text)
          throw new Error('Scan failed with status ' + res.status)
        }
        const data = await res.json()
        if (data && data.success) {
          this.progress = 100
          this.modelUrl = data.modelPath
          this.suggestions = Array.isArray(data.suggestions) ? data.suggestions : []
          // Smoothly scroll to viewer
          const el = this.$refs.viewerSection
          if (el && typeof el.scrollIntoView === 'function') {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        } else {
          // eslint-disable-next-line no-console
          console.error('Scan failed (server):', data)
          throw new Error('Scan failed. Please try another file.')
        }
      } catch (e) {
        if (e && e.name === 'AbortError') {
          this.error = 'Upload canceled.'
        } else {
          // eslint-disable-next-line no-console
          console.error('Upload error:', e)
          this.error = (e && e.message) ? e.message : 'Upload error. See console for details.'
        }
      } finally {
        this._stopFakeProgress()
        this.loading = false
      }
    }
  },
  beforeDestroy() {
    this._stopFakeProgress()
    if (this._controller && typeof this._controller.abort === 'function') {
      try { this._controller.abort() } catch (err) {}
    }
  }
}
</script>

<!-- Global smooth scroll -->
<style>
html, body { height: 100%; margin: 0; padding: 0; scroll-behavior: smooth; }
#app { min-height: 100%; }
</style>

<style scoped>
/* ===== Brand system (timeless, minimal) ===== */
:root {
  --bg:#FFFFFF; --soft:#FAFAFA; --ink:#1C1C1C; --muted:#6B6B6B; --line:#EDEDED;
  --teal:#014D4E; --champagne:#C6A664;
}

/* Layout */
.page { min-height:100vh; background:var(--bg); color:var(--ink); display:flex; flex-direction:column; }
.main { flex:1; padding:48px 72px; display:flex; flex-direction:column; gap:64px; }
@media (max-width: 900px){ .main{ padding:24px; gap:48px; } }

/* Topbar */
.topbar {
  position: sticky; top: 0; z-index: 10;
  display:flex; align-items:center; justify-content:flex-start; gap:10px;
  padding:10px 16px; background:rgba(255,255,255,.9);
  backdrop-filter:saturate(180%) blur(10px);
  border-bottom:1px solid var(--line);
}
.brand { display:inline-flex; align-items:center; gap:8px; color:inherit; text-decoration:none; user-select:none; }
.mark { width:24px; height:24px; fill:currentColor; color:var(--ink); }
.wordmark { font-weight:800; letter-spacing:.08em; font-size:.95rem; }

/* Hero */
.hero { display:grid; grid-template-columns:1.25fr .75fr; gap:48px; align-items:center; }
@media (max-width: 900px){ .hero{ grid-template-columns:1fr; gap:28px; text-align:center; } }
.hero-text h1 { margin:0 0 .5rem; font-size:clamp(2rem, 4.8vw, 3.2rem); font-weight:900; }
.hero-text p { margin:0; color:var(--muted); font-size:1.08rem; max-width:60ch; }
.pill-row { margin-top:14px; display:flex; gap:10px; flex-wrap:wrap; color:var(--muted); }
.pill-row span { padding:6px 10px; border:1px solid var(--line); border-radius:999px; font-size:.85rem; }
.hero-visual .glass {
  width:100%; aspect-ratio:16 / 10; border-radius:24px;
  background: linear-gradient(135deg, #fff 40%, #f7f7f7 60%);
  border:1px solid var(--line);
  box-shadow: 0 10px 30px rgba(0,0,0,.08), inset 0 0 0 1px rgba(255,255,255,.6);
}

/* Uploader */
.uploader { text-align:center; }
.dropzone {
  position:relative; margin:0 auto; max-width:820px; min-height:200px;
  border:2px dashed var(--line); border-radius:24px; background:#fff;
  display:flex; align-items:center; justify-content:center;
  transition: border-color .25s, box-shadow .25s, background .25s;
}
.dropzone.dragover { border-color:var(--teal); box-shadow:0 12px 32px rgba(1,77,78,.14); background:#fdfefe; }
.dropzone.ready { border-color:#cfd8dc; }
.dropzone.disabled { opacity:.6; pointer-events:none; }
.file-input { position:absolute; inset:0; opacity:0; cursor:pointer; }
.dz-inner { padding:28px; display:grid; place-items:center; gap:8px; }
.icon { width:48px; height:48px; border:2px solid var(--teal); border-radius:12px; position:relative; }
.icon::after { content:""; position:absolute; right:-6px; top:-6px; width:12px; height:12px; border-radius:50%; background:var(--champagne); box-shadow:0 2px 6px rgba(198,166,100,.4); }
.dz-copy { font-size:1.05rem; }
.dz-copy strong { font-weight:900; }
.linklike { border:none; background:none; color:var(--teal); font-weight:800; text-decoration:underline; cursor:pointer; }
.linklike:disabled { opacity:.5; cursor:not-allowed; }
.linklike:hover:not(:disabled) { opacity:.8; }
.dz-sub { color:var(--muted); font-size:.9rem; }
.dz-file { margin-top:6px; font-weight:700; }
.actions { margin:16px auto 0; display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }

.btn { padding:.65rem 1.25rem; font-weight:800; border-radius:16px; border:2px solid transparent; cursor:pointer; }
.btn[disabled] { opacity:.5; cursor:not-allowed; }
.btn-primary { background:var(--teal); color:#fff; box-shadow:0 10px 24px rgba(1,77,78,.22); transition: box-shadow .2s, transform .06s; }
.btn-primary:hover:not([disabled]) { transform:translateY(-1px); box-shadow:0 14px 36px rgba(1,77,78,.32); }
.btn-outline { background:#fff; color:var(--ink); border-color:var(--ink); }
.btn-outline:hover:not([disabled]) { background:var(--ink); color:#fff; }

.progress { margin:12px auto 0; max-width:820px; text-align:left; }
.bar { height:10px; border-radius:999px; background:#f1f5f9; overflow:hidden; border:1px solid #e6e6e6; }
.bar span { display:block; height:100%; background:var(--teal); width:0; transition: width .3s ease; }
@media (prefers-reduced-motion: reduce) {
  .bar span { transition: none; }
  .btn-primary { transition: none; }
}
.muted { font-size:.9rem; color:var(--muted); margin-top:6px; }
.error { color:#C0392B; margin-top:10px; font-weight:700; }

/* Viewer */
.viewer-card {
  background:#fff; border:1px solid var(--line); border-radius:24px;
  box-shadow:0 15px 40px rgba(0,0,0,.06); padding:18px 18px 0;
}
.viewer-head { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:4px 6px 10px; }
.viewer-head h2 { margin:0; font-size:1.35rem; font-weight:900; }
.viewer-actions { display:flex; gap:8px; flex-wrap:wrap; }
.btn-outline-sm { padding:.45rem .8rem; border-radius:12px; border:1.5px solid var(--ink); text-decoration:none; color:var(--ink); font-weight:700; }
.btn-outline-sm:hover { background:var(--ink); color:#fff; }
.viewer { width:100%; height:min(70vh, 720px); border-radius:18px; overflow:hidden; }

/* Suggestions */
.suggestions { max-width:900px; margin:0 auto; }
.suggestions h2 { font-size:1.4rem; font-weight:900; margin:0 0 .6rem; }
.suggestions ul { background:#fff; border:1px solid var(--line); border-radius:18px; box-shadow:0 10px 28px rgba(0,0,0,.05); padding:18px 22px; list-style:none; margin:0; }
.suggestions li { padding:10px 0; border-bottom:1px solid var(--line); }
.suggestions li:last-child { border-bottom:none; }

/* Footer */
.footer { padding:24px; text-align:center; color:var(--muted); font-weight:600; }
</style>
