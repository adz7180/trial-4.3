<template>
  <div class="page">
    <!-- Top bar -->
    <header class="topbar">
      <router-link to="/" class="brand" aria-label="HexaNest Home">
        <svg class="mark" viewBox="0 0 120 120" role="img" aria-label="HexaNest Logo">
          <path d="M60 8 16 33v54l44 25 44-25V33L60 8Zm0 10 34 19v46L60 102 26 83V37l34-19Z" />
          <path d="M60 36 39 48v30l21 12 21-12V48L60 36Zm0 10 13 8v22l-13 7-13-7V54l13-8Z" />
          <rect x="57" y="66" width="6" height="20" rx="3" />
        </svg>
        <span class="wordmark">HEXANEST</span>
      </router-link>
      <router-link to="/login" class="muted-link">Log in</router-link>
    </header>

    <main class="main">
      <section class="center">
        <div class="card">
          <h1 class="title">Verify your email</h1>
          <p class="muted">
            We sent a verification link to <strong>{{ email }}</strong>. Open the email and click the link to verify.
          </p>

          <div class="actions">
            <button class="btn btn-primary" :disabled="loading" @click="checkVerification">
              {{ loading ? 'Checking…' : 'I Verified' }}
            </button>
            <button class="btn btn-ghost" :disabled="resendIn>0 || loading" @click="resend">
              Resend email<span v-if="resendIn>0"> in {{ resendIn }}s</span>
            </button>
          </div>

          <p v-if="notice" class="notice">{{ notice }}</p>
          <p v-if="error" class="error" aria-live="assertive">{{ error }}</p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} HexaNest. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
// v9 modular imports
import { getAuth, sendEmailVerification, reload } from 'firebase/auth'

export default {
  name: 'VerifyEmail',
  data() {
    return {
      email: this.$route.query.email || '',
      loading: false,
      error: '',
      notice: '',
      resendIn: 0,
      _timer: null
    }
  },
  methods: {
    async checkVerification() {
      this.loading = true
      this.error = ''
      this.notice = ''
      try {
        var auth = getAuth()
        var user = auth.currentUser

        // If no signed-in user, ask them to log in so we can check status.
        if (!user) {
          this.notice = 'Please log in so we can confirm your email status.'
          this.$router.push({ path: '/login', query: { next: '/verify?email=' + encodeURIComponent(this.email) } })
          return
        }

        // Ensure we reload fresh status from Firebase
        await reload(user)

        if (user.emailVerified) {
          this.$router.push('/subscribe')
        } else {
          this.error = 'Not verified yet. Click the link in your email, then press "I Verified".'
        }
      } catch (e) {
        this.error = e && e.message ? e.message : 'Could not check verification.'
      } finally {
        this.loading = false
      }
    },

    async resend() {
      if (this.resendIn > 0 || this.loading) return
      this.loading = true
      this.error = ''
      this.notice = ''
      try {
        var auth = getAuth()
        var user = auth.currentUser
        if (!user) {
          this.notice = 'Please log in to resend a verification email.'
          this.$router.push({ path: '/login', query: { next: '/verify?email=' + encodeURIComponent(this.email) } })
          return
        }
        await sendEmailVerification(user, {
          url: window.location.origin + '/verify',
          handleCodeInApp: false
        })
        this.startCooldown(30)
        this.notice = 'Verification email sent.'
      } catch (e) {
        this.error = e && e.message ? e.message : 'Unable to resend verification email.'
      } finally {
        this.loading = false
      }
    },

    startCooldown(sec) {
      this.clearTimer()
      this.resendIn = sec
      var self = this
      this._timer = setInterval(function () {
        if (self.resendIn > 0) self.resendIn -= 1
        if (self.resendIn <= 0) self.clearTimer()
      }, 1000)
    },
    clearTimer() {
      if (this._timer) { clearInterval(this._timer); this._timer = null }
    }
  },
  beforeDestroy() { this.clearTimer() }
}
</script>

<style scoped>
:root {
  --bg:#FFFFFF; --soft:#FAFAFA; --ink:#1C1C1C; --muted:#6B6B6B; --line:#EDEDED;
  --teal:#014D4E; --champagne:#C6A664;
}

.page { min-height:100vh; background:var(--bg); color:var(--ink); display:flex; flex-direction:column; }

/* Top bar */
.topbar {
  position: sticky; top: 0; z-index: 10;
  display:flex; align-items:center; justify-content:space-between; gap:10px;
  padding:12px 16px; background:rgba(255,255,255,.9);
  backdrop-filter:saturate(180%) blur(10px);
  border-bottom:1px solid var(--line);
}
.brand { display:inline-flex; align-items:center; gap:8px; color:inherit; text-decoration:none; }
.mark { width:24px; height:24px; fill:currentColor; color:var(--ink); }
.wordmark { font-weight:800; letter-spacing:.08em; font-size:.95rem; }
.muted-link { color:var(--muted); text-decoration:none; font-weight:700; }
.muted-link:hover { color:var(--ink); }

/* Layout */
.main { flex:1; display:grid; place-items:center; padding:32px 16px; }
.center { width:100%; max-width:560px; }
.card {
  background:#fff; border:1px solid var(--line); border-radius:28px;
  box-shadow:0 20px 60px rgba(0,0,0,.06); padding:28px 28px 24px;
}
.title { margin:0 0 8px; font-size:1.8rem; font-weight:900; letter-spacing:-.01em; }
.muted { color:var(--muted); }

.actions { display:flex; gap:10px; align-items:center; margin-top:16px; flex-wrap:wrap; }
.btn {
  padding:.9rem 1.2rem; font-weight:900; border-radius:14px; border:2px solid transparent; cursor:pointer;
  transition: transform .06s, box-shadow .2s;
}
.btn-primary { background:var(--teal); color:#fff; box-shadow:0 15px 40px rgba(1,77,78,.22); }
.btn-primary:hover { transform:translateY(-1px); box-shadow:0 20px 55px rgba(1,77,78,.32); }
.btn-ghost { background:#fff; color:var(--ink); border:1.5px solid var(--ink); padding:.75rem 1rem; border-radius:12px; }
.btn-ghost:hover { background:var(--ink); color:#fff; }

.notice { color:#1d3b1d; background:#edf7ed; border:1px solid #cde8cd; padding:8px 12px; border-radius:10px; margin-top:8px; }
.error { color:#C0392B; font-weight:700; margin-top:8px; }

.footer { padding:20px; text-align:center; color:var(--muted); font-weight:600; }
</style>
