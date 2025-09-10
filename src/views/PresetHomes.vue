<template>
  <div class="page">
    <!-- Top bar -->
    <header class="topbar">
      <router-link to="/" class="brand" aria-label="HexaNest Home">
        <!-- Small inline HexaNest logo -->
        <svg class="mark" viewBox="0 0 120 120" role="img" aria-label="HexaNest Logo">
          <path d="M60 8 16 33v54l44 25 44-25V33L60 8Zm0 10 34 19v46L60 102 26 83V37l34-19Z" />
          <path d="M60 36 39 48v30l21 12 21-12V48L60 36Zm0 10 13 8v22l-13 7-13-7V54l13-8Z" />
          <rect x="57" y="66" width="6" height="20" rx="3" />
        </svg>
        <span class="wordmark">HEXANEST</span>
      </router-link>

      <nav class="right-actions">
        <router-link to="/scan" class="muted-link">Scan to 3D</router-link>
      </nav>
    </header>

    <!-- Main -->
    <main class="main">
      <!-- Hero -->
      <section class="hero">
        <div class="hero-text">
          <h1>Preset Homes</h1>
          <p>Timeless layouts curated by designers. Start from a proven plan and make it yours.</p>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="glass"></div>
        </div>
      </section>

      <!-- Controls -->
      <section class="controls" aria-label="Filters">
        <div class="row">
          <div class="control">
            <label for="q">Search</label>
            <input id="q" type="text" v-model.trim="q" placeholder="Search by name, style, features" @input="touch" />
          </div>

          <div class="control">
            <label for="style">Style</label>
            <select id="style" v-model="style" @change="touch">
              <option value="">Any</option>
              <option v-for="s in styles" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>

          <div class="control">
            <label for="beds">Beds</label>
            <select id="beds" v-model.number="beds" @change="touch">
              <option :value="0">Any</option>
              <option :value="2">2+</option>
              <option :value="3">3+</option>
              <option :value="4">4+</option>
              <option :value="5">5+</option>
            </select>
          </div>

          <div class="control">
            <label for="sort">Sort</label>
            <select id="sort" v-model="sort" @change="touch">
              <option value="featured">Featured</option>
              <option value="name">Name</option>
              <option value="sqft-asc">Sqft ↑</option>
              <option value="sqft-desc">Sqft ↓</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Grid -->
      <section class="grid" aria-label="Preset home list">
        <article
          v-for="home in visibleHomes"
          :key="home.id"
          class="card"
        >
          <div class="thumb" aria-hidden="true">
            <!-- Minimal inline thumbnail (placeholder blueprint block) -->
            <svg viewBox="0 0 400 260" class="thumb-svg">
              <rect x="1" y="1" width="398" height="258" rx="16" fill="#ffffff" stroke="#EDEDED" />
              <rect x="28" y="28" width="150" height="90" fill="#f7fafb" stroke="#e6e6e6" />
              <rect x="210" y="28" width="160" height="60" fill="#f7fafb" stroke="#e6e6e6" />
              <rect x="28" y="140" width="342" height="90" fill="#f7fafb" stroke="#e6e6e6" />
              <line x1="28" y1="130" x2="370" y2="130" stroke="#014D4E" stroke-width="2" />
            </svg>
          </div>

          <div class="meta">
            <div class="name-row">
              <h3 class="name">{{ home.name }}</h3>
              <span class="style-pill">{{ home.style }}</span>
            </div>
            <div class="specs">
              <span>{{ home.beds }} bd</span>
              <span>{{ home.baths }} ba</span>
              <span>{{ home.sqft.toLocaleString() }} sqft</span>
            </div>
          </div>

          <div class="actions">
            <router-link
              class="btn btn-primary"
              :to="{ path: '/customize', query: { preset: home.id } }"
            >
              Preview
            </router-link>
            <router-link class="btn btn-outline" to="/scan">Scan to 3D</router-link>
          </div>
        </article>

        <p v-if="!visibleHomes.length" class="empty">No results. Try clearing filters.</p>
      </section>
    </main>

    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} HexaNest. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Presets',
  data() {
    return {
      q: '',
      style: '',
      beds: 0,
      sort: 'featured',
      // Demo data; replace with API results if desired
      homes: [
        { id: 'aurora', name: 'Aurora', style: 'Modern', beds: 3, baths: 2, sqft: 1800, featured: true },
        { id: 'sienna', name: 'Sienna', style: 'Scandinavian', beds: 4, baths: 3, sqft: 2450, featured: true },
        { id: 'willow', name: 'Willow', style: 'Minimal', beds: 2, baths: 2, sqft: 1400, featured: false },
        { id: 'horizon', name: 'Horizon', style: 'Mid-Century', beds: 5, baths: 4, sqft: 3100, featured: true },
        { id: 'clover', name: 'Clover', style: 'Farmhouse', beds: 4, baths: 3, sqft: 2600, featured: false },
        { id: 'harbor', name: 'Harbor', style: 'Coastal', beds: 3, baths: 2, sqft: 1950, featured: false }
      ],
      styles: ['Modern', 'Minimal', 'Scandinavian', 'Mid-Century', 'Farmhouse', 'Coastal'],
      dirty: false
    }
  },
  computed: {
    filtered() {
      var q = (this.q || '').toLowerCase()
      return this.homes.filter(function (h) {
        var okQ = !q || h.name.toLowerCase().indexOf(q) > -1 || h.style.toLowerCase().indexOf(q) > -1
        var okStyle = !this.style || h.style === this.style
        var okBeds = !this.beds || h.beds >= this.beds
        return okQ && okStyle && okBeds
      }.bind(this))
    },
    sorted() {
      var list = this.filtered.slice()
      if (this.sort === 'name') {
        list.sort(function (a, b) { return a.name.localeCompare(b.name) })
      } else if (this.sort === 'sqft-asc') {
        list.sort(function (a, b) { return a.sqft - b.sqft })
      } else if (this.sort === 'sqft-desc') {
        list.sort(function (a, b) { return b.sqft - a.sqft })
      } else {
        // featured first, then name
        list.sort(function (a, b) {
          if (a.featured === b.featured) return a.name.localeCompare(b.name)
          return a.featured ? -1 : 1
        })
      }
      return list
    },
    visibleHomes() {
      return this.sorted
    }
  },
  methods: {
    touch() {
      this.dirty = true
    }
  }
}
</script>

<style scoped>
:root {
  --bg:#FFFFFF; --soft:#FAFAFA; --ink:#1C1C1C; --muted:#6B6B6B; --line:#EDEDED;
  --teal:#014D4E; --champagne:#C6A664;
}

/* Layout */
.page { min-height:100vh; background:var(--bg); color:var(--ink); display:flex; flex-direction:column; }
.main { flex:1; padding:48px 72px; display:flex; flex-direction:column; gap:48px; }
@media (max-width: 900px){ .main { padding:24px; gap:36px; } }

/* Top bar */
.topbar {
  position: sticky; top: 0; z-index: 10;
  display:flex; align-items:center; justify-content:space-between; gap:10px;
  padding:12px 16px; background:rgba(255,255,255,.9);
  backdrop-filter:saturate(180%) blur(10px);
  border-bottom:1px solid var(--line);
}
.brand { display:inline-flex; align-items:center; gap:8px; color:inherit; text-decoration:none; user-select:none; }
.mark { width:24px; height:24px; fill:currentColor; color:var(--ink); }
.wordmark { font-weight:800; letter-spacing:.08em; font-size:.95rem; }
.muted-link { color:var(--muted); text-decoration:none; font-weight:700; }
.muted-link:hover { color:var(--ink); }
.right-actions { display:flex; align-items:center; gap:12px; }

/* Hero */
.hero { display:grid; grid-template-columns:1.15fr .85fr; gap:36px; align-items:center; }
@media (max-width: 900px){ .hero { grid-template-columns:1fr; text-align:center; } }
.hero-text h1 { margin:0 0 .5rem; font-size:clamp(2rem, 4.8vw, 3.2rem); font-weight:900; }
.hero-text p { margin:0; color:var(--muted); font-size:1.08rem; max-width:60ch; }
.hero-visual .glass {
  width:100%; aspect-ratio:16 / 10; border-radius:24px;
  background: linear-gradient(135deg, #fff 40%, #f7f7f7 60%);
  border:1px solid var(--line);
  box-shadow: 0 10px 30px rgba(0,0,0,.08), inset 0 0 0 1px rgba(255,255,255,.6);
}

/* Controls */
.controls { background:var(--soft); border:1px solid var(--line); border-radius:20px; padding:16px; }
.row { display:grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap:12px; }
@media (max-width: 900px){ .row { grid-template-columns:1fr 1fr; } }
@media (max-width: 560px){ .row { grid-template-columns:1fr; } }
.control { display:grid; gap:6px; }
label { font-weight:800; font-size:.95rem; }
input[type="text"], select {
  padding:12px 12px; border:1.5px solid var(--line); border-radius:12px; outline:none;
  font-size:1rem; background:#fff; color:var(--ink);
}
input:focus, select:focus { border-color: var(--teal); box-shadow:0 0 0 3px rgba(1,77,78,.12); }

/* Grid */
.grid {
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap:18px;
}
.card {
  background:#fff; border:1px solid var(--line); border-radius:20px;
  box-shadow:0 15px 40px rgba(0,0,0,.06);
  overflow:hidden; display:flex; flex-direction:column;
  transition: transform .18s ease, box-shadow .22s ease;
}
.card:hover { transform: translateY(-4px); box-shadow:0 24px 66px rgba(0,0,0,.08); }

.thumb { background:#fff; border-bottom:1px solid var(--line); }
.thumb-svg { width:100%; height:auto; display:block; }

.meta { padding:14px 16px 0; }
.name-row { display:flex; align-items:center; justify-content:space-between; gap:10px; }
.name { margin:0; font-size:1.15rem; font-weight:900; }
.style-pill {
  font-size:.8rem; font-weight:800; color:#1d1d1d; background:#f4efe3;
  border:1px solid #eadfca; padding:4px 8px; border-radius:999px;
}
.specs { display:flex; gap:12px; color:var(--muted); font-weight:700; margin:8px 0 10px; }

.actions {
  display:flex; gap:10px; padding:0 16px 16px; margin-top:auto;
}
.btn {
  flex:1 1 auto; padding:.8rem 1rem; font-weight:900; border-radius:14px; border:2px solid transparent; cursor:pointer;
  text-align:center; text-decoration:none; user-select:none;
}
.btn-primary { background:var(--teal); color:#fff; box-shadow:0 12px 30px rgba(1,77,78,.24); }
.btn-primary:hover { transform:translateY(-1px); box-shadow:0 18px 44px rgba(1,77,78,.34); }
.btn-outline { background:#fff; color:var(--ink); border-color:var(--ink); }
.btn-outline:hover { background:var(--ink); color:#fff; }

.empty { text-align:center; color:var(--muted); font-weight:700; padding:16px; }

/* Footer */
.footer { padding:24px; text-align:center; color:var(--muted); font-weight:600; }
</style>
