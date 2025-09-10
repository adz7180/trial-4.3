<template>
  <div class="app-container">
    <!-- Navbar -->
    <header class="navbar">
      <div class="navbar-left">
        <RouterLink to="/" class="logo" aria-label="HexaNest Home">
          <!-- Inline black-on-white HexaNest Logo -->
          <svg class="mark" viewBox="0 0 120 120" role="img" aria-label="HexaNest Logo">
            <path d="M60 8 16 33v54l44 25 44-25V33L60 8Zm0 10 34 19v46L60 102 26 83V37l34-19Z" />
            <path d="M60 36 39 48v30l21 12 21-12V48L60 36Zm0 10 13 8v22l-13 7-13-7V54l13-8Z" />
            <rect x="57" y="66" width="6" height="20" rx="3" />
          </svg>
          <span class="brand-name">HEXANEST</span>
        </RouterLink>

        <nav class="nav-links">
          <RouterLink to="/" exact-active-class="active-link">Home</RouterLink>
          <RouterLink to="/scan" exact-active-class="active-link">Scan to 3D</RouterLink>
          <RouterLink to="/presets" exact-active-class="active-link">Preset Homes</RouterLink>
        </nav>
      </div>

      <div class="navbar-right">
        <RouterLink to="/login" class="btn btn-outline">Log In</RouterLink>
        <RouterLink to="/signup" class="btn btn-primary">Sign Up</RouterLink>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <section class="hero-section" id="hero">
        <div class="hero-text">
          <h1>Design your home in real time.</h1>
          <p>Walk through, customize, and finalize every detail with ultra-real 4K visuals. From blueprint to photorealistic model—instantly.</p>
          <div class="hero-cta">
            <RouterLink to="/scan" class="btn btn-primary btn-large">Upload a Blueprint</RouterLink>
            <RouterLink to="/presets" class="btn btn-outline btn-large">Explore Preset Homes</RouterLink>
          </div>
          <div class="hero-badges">
            <span>4K Visuals</span>
            <span>Real-time Editing</span>
            <span>Room-by-Room Materials</span>
          </div>
        </div>

        <div class="hero-image" aria-hidden="true">
          <!-- Placeholder visual container (replace with your asset if desired) -->
          <div class="glass-card"></div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section" aria-label="Key features of HexaNest" id="features">
        <h2>Built for creators, architects, and homeowners</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon minimal-icon" aria-hidden="true"></div>
            <h3>Blueprint Scanning</h3>
            <p>Turn 2D blueprints into navigable, editable 3D models—walls, rooms, and openings detected.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon minimal-icon" aria-hidden="true"></div>
            <h3>Full Customization</h3>
            <p>Swap materials, fixtures, lighting, and furniture instantly with photoreal precision.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon minimal-icon" aria-hidden="true"></div>
            <h3>Share & Collaborate</h3>
            <p>Organize projects into folders, invite feedback, and export renders and floor plans.</p>
          </div>
        </div>
      </section>

      <!-- Subscription Plans -->
      <section class="plans-section" aria-label="Subscription plans" id="plans">
        <h2>Choose your plan</h2>
        <p class="subtitle">Start with a full-featured free trial. Upgrade anytime.</p>

        <div class="plans-grid">
          <article class="plan-card">
            <header>
              <h3>Free Trial</h3>
              <p class="plan-price"><span class="price">$0</span> / 7 days</p>
            </header>
            <ul class="plan-features">
              <li>Scan 1 blueprint to 3D</li>
              <li>Preset home exploration</li>
              <li>Standard materials</li>
              <li>Shareable link</li>
            </ul>
            <RouterLink to="/signup" class="btn btn-outline btn-block">Start Free Trial</RouterLink>
          </article>

          <article class="plan-card popular">
            <header>
              <h3>Premium</h3>
              <p class="plan-price"><span class="price">$30</span> / month</p>
              <span class="popular-badge">Most Popular</span>
            </header>
            <ul class="plan-features">
              <li>Unlimited preset homes</li>
              <li>Scan-to-3D with full editing</li>
              <li>All materials & finishes</li>
              <li>Exports (renders & floor plans)</li>
              <li>Project folders & autosave</li>
              <li>Priority support</li>
            </ul>
            <RouterLink to="/subscribe" class="btn btn-primary btn-block">Upgrade to Premium</RouterLink>
          </article>

          <article class="plan-card">
            <header>
              <h3>Company</h3>
              <p class="plan-price"><span class="price">$79</span> / month</p>
            </header>
            <ul class="plan-features">
              <li>Team collaboration</li>
              <li>Brand kit & watermark</li>
              <li>Contractor sharing</li>
              <li>API & Admin dashboard</li>
              <li>Advanced exports (4K/8K)</li>
            </ul>
            <RouterLink to="/contact" class="btn btn-outline btn-block">Contact Sales</RouterLink>
          </article>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} HexaNest. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped lang="scss">
/* ===== Brand System (Apple/Tesla-inspired) ===== */
$bg: #FFFFFF;                 // primary background
$soft: #FAFAFA;               // light section alt
$ink: #1C1C1C;                // charcoal text
$muted: #6B6B6B;              // secondary text
$line: #EDEDED;               // hairline
$teal: #014D4E;               // deep-teal primary
$champagne: #C6A664;          // luxury accent
$radius: 22px;

/* Derived */
$shadow-soft: 0 10px 30px rgba(0,0,0,.08);
$shadow-strong: 0 25px 70px rgba(0,0,0,.16);

* { box-sizing: border-box; }
.app-container {
  font-family: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  background: $bg; color: $ink; min-height: 100vh;
  display: flex; flex-direction: column;
}

/* ===== Navbar ===== */
.navbar {
  position: sticky; top: 0; z-index: 1000;
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 3rem;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: saturate(180%) blur(10px);
  border-bottom: 1px solid transparent;
  transition: border-color .25s ease, box-shadow .25s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,.06);

  .navbar-left {
    display: flex; align-items: center; gap: 2rem;

    .logo {
      display: flex; align-items: center; gap: .75rem;
      color: inherit; text-decoration: none; user-select: none;

      .mark { width: 40px; height: 40px; fill: currentColor; color: $ink; }
      .brand-name { font-weight: 900; letter-spacing: .08em; }
    }

    .nav-links {
      display: flex; gap: 2rem;

      a {
        font-weight: 600; color: $muted; text-decoration: none; font-size: 1.05rem;
        padding-bottom: 3px; border-bottom: 3px solid transparent; transition: all .25s ease;

        &.active-link, &:hover { color: $teal; border-color: $teal; }
      }
    }
  }

  .navbar-right {
    display: flex; gap: 1rem;

    a.btn {
      padding: .6rem 1.6rem; font-weight: 700; font-size: 1rem;
      border-radius: $radius; cursor: pointer; transition: all .25s ease;
      text-align: center; text-decoration: none; user-select: none; border: 2px solid transparent;

      &.btn-primary {
        background-color: $teal; color: #fff; box-shadow: 0 10px 24px rgba(1,77,78,.25);

        &:hover { transform: translateY(-1px); box-shadow: 0 14px 36px rgba(1,77,78,.35); }
      }

      &.btn-outline {
        background-color: transparent; color: $ink; border-color: $ink;

        &:hover { background-color: $ink; color: #fff; }
      }
    }
  }
}

/* ===== Main ===== */
main {
  flex: 1; padding: 3rem 6rem; display: flex; flex-direction: column; gap: 6rem;

  @media (max-width: 900px) { padding: 2rem 2rem; }
}

/* ===== Hero ===== */
.hero-section {
  display: grid; grid-template-columns: 1.15fr .85fr; gap: 48px; align-items: center;

  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 36px; text-align: center; }

  .hero-text {
    h1 {
      font-size: clamp(2.2rem, 5vw, 3.75rem);
      font-weight: 900; margin-bottom: 1rem; line-height: 1.08; color: $ink;
    }
    p {
      font-size: clamp(1.05rem, 2.2vw, 1.25rem);
      margin-bottom: 2rem; color: $muted; font-weight: 500; max-width: 55ch;
    }
    .hero-cta {
      display: flex; gap: 1rem; flex-wrap: wrap; justify-content: flex-start;
      @media (max-width: 900px) { justify-content: center; }

      .btn-large {
        font-size: 1.1rem; padding: 1rem 2rem; border-radius: $radius; font-weight: 700;
      }
    }
    .hero-badges {
      margin-top: 14px; display:flex; gap:10px; flex-wrap:wrap; color: $muted;
      span { padding: 6px 10px; border:1px solid $line; border-radius: 999px; font-size: .85rem; }
    }
  }

  .hero-image {
    .glass-card {
      width: 100%; aspect-ratio: 16/10; border-radius: 24px;
      background: linear-gradient(135deg, #ffffff 40%, #f7f7f7 60%);
      border: 1px solid $line; box-shadow: $shadow-soft, inset 0 0 0 1px rgba(255,255,255,.6);
    }
  }
}

/* ===== Features ===== */
.features-section {
  text-align: center;

  h2 { font-size: clamp(1.8rem, 3.5vw, 3rem); font-weight: 900; margin-bottom: 3rem; }

  .features-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 2rem;

    .feature-card {
      background: #fff; border-radius: 20px; padding: 2rem;
      box-shadow: 0 15px 40px rgba(0,0,0,.06); border: 1px solid $line; transition: transform .25s ease;

      &:hover { transform: translateY(-8px); box-shadow: 0 22px 60px rgba(0,0,0,.08); }

      .minimal-icon {
        width: 48px; height: 48px; margin: 0 auto 1rem; border-radius: 12px;
        border: 2px solid $teal; position: relative;

        /* tiny accent to feel premium without emoji */
        &::after {
          content: ""; position: absolute; right: -6px; top: -6px;
          width: 12px; height: 12px; border-radius: 50%; background: $champagne; box-shadow: 0 2px 6px rgba(198,166,100,.4);
        }
      }

      h3 { font-size: 1.25rem; margin-bottom: .5rem; color: $ink; font-weight: 800; }
      p { color: $muted; font-size: 1.05rem; line-height: 1.5; }
    }
  }
}

/* ===== Plans ===== */
.plans-section {
  background: $soft; border-radius: 40px; padding: 4rem 3rem; text-align: center; border: 1px solid $line;

  h2 { font-size: clamp(1.8rem, 3.5vw, 3rem); font-weight: 900; margin-bottom: .5rem; }
  .subtitle { color: $muted; margin-bottom: 2rem; }

  .plans-grid {
    display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center;

    article.plan-card {
      background: #fff; border-radius: 24px; border: 1px solid $line;
      box-shadow: 0 15px 40px rgba(0,0,0,.06);
      padding: 2rem 2.25rem; max-width: 320px; flex: 1 1 320px;
      display: flex; flex-direction: column; align-items: center; position: relative;

      &.popular {
        border: 3px solid $teal; box-shadow: 0 25px 70px rgba(1,77,78,.18); transform: translateY(-8px);

        .popular-badge {
          position: absolute; top: -18px; right: 18px;
          background: $champagne; color: #1d1d1d; padding: .25rem .9rem;
          font-weight: 800; border-radius: 999px; font-size: .85rem; letter-spacing: .02em;
          box-shadow: 0 4px 10px rgba(198,166,100,.35);
        }
      }

      header {
        margin-bottom: 1.2rem;
        h3 { font-size: 1.4rem; font-weight: 900; margin-bottom: .25rem; }
        .plan-price {
          font-size: 2rem; font-weight: 900; color: $teal;
          .price { font-weight: 900; }
        }
      }

      .plan-features {
        list-style: none; padding: 0; margin-bottom: 1.6rem; width: 100%;
        color: $muted; font-weight: 600; font-size: 1rem; line-height: 1.6;

        li {
          margin-bottom: .9rem; position: relative; padding-left: 1.4rem;
          &::before {
            content: ""; position: absolute; left: 0; top: .55rem;
            width: 9px; height: 9px; border-radius: 2px; background: $teal;
          }
        }
      }

      .btn {
        width: 100%; padding: 1rem 0; font-weight: 800; font-size: 1.05rem;
        border-radius: 14px; cursor: pointer; transition: all .25s ease;
        text-align: center; text-decoration: none; user-select: none; border: 2px solid transparent;

        &.btn-primary {
          background-color: $teal; color: #fff; box-shadow: 0 15px 45px rgba(1,77,78,.35);

          &:hover { transform: translateY(-2px); box-shadow: 0 20px 60px rgba(1,77,78,.45); }
        }

        &.btn-outline {
          background-color: transparent; color: $ink; border-color: $ink;

          &:hover { background: $ink; color: #fff; }
        }

        &.btn-block { display: block; }
      }
    }
  }
}

/* ===== Footer ===== */
.footer {
  padding: 2rem 3rem; text-align: center; font-weight: 600; font-size: 1rem; color: $muted;
}

/* ===== Responsive ===== */
@media (max-width: 950px) {
  .hero-section { grid-template-columns: 1fr; text-align: center;
    .glass-card { max-width: 90vw; margin: 0 auto; }
  }
  main { padding: 2rem 2rem; }
}
@media (max-width: 700px) {
  .plans-section .plans-grid { flex-direction: column; }
  .navbar { padding: 1rem 1.5rem;
    .navbar-left { gap: 1rem; }
    .nav-links { gap: 1rem; }
  }
}
</style>
