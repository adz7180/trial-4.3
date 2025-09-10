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

      <router-link to="/signup" class="muted-link">Sign up</router-link>
    </header>

    <!-- Main -->
    <main class="main">
      <section class="center">
        <div class="card">
          <h1 class="title">Welcome back</h1>
          <p class="subtitle">Log in to continue your project.</p>

          <form class="form" @submit.prevent="onSubmit">
            <!-- Email -->
            <div class="field">
              <label for="email">Email</label>
              <input
                id="email"
                type="email"
                v-model.trim="email"
                autocomplete="email"
                required
                @input="clearError"
              />
              <p class="hint" :class="{ bad: email && !isEmailValid(email) }">
                {{ email && !isEmailValid(email) ? 'Enter a valid email' : ' ' }}
              </p>
            </div>

            <!-- Password -->
            <div class="field">
              <label for="pw">Password</label>
              <div class="password-row">
                <input
                  id="pw"
                  :type="showPw ? 'text' : 'password'"
                  v-model="password"
                  autocomplete="current-password"
                  required
                  @input="clearError"
                />
                <button type="button" class="ghost" @click="toggleShowPw">
                  {{ showPw ? 'Hide' : 'Show' }}
                </button>
              </div>
              <div class="row-between">
                <label class="check">
                  <input type="checkbox" v-model="remember" />
                  <span>Keep me signed in</span>
                </label>
                <button type="button" class="linklike" @click="onForgot">Forgot password?</button>
              </div>
            </div>

            <!-- Primary email login -->
            <button class="btn btn-primary" type="submit" :disabled="!canSubmit || loading">
              {{ loading ? 'Signing in…' : 'Log In' }}
            </button>

            <!-- Divider -->
            <div class="divider"><span>or continue with</span></div>

            <!-- Social providers -->
            <div class="providers">
              <button class="btn btn-ghost icon-left" @click.prevent="onGoogle" :disabled="loading">
                <span class="ico g"></span> Google
              </button>
              <button class="btn btn-ghost icon-left" @click.prevent="onApple" :disabled="loading">
                <span class="ico a"></span> Apple
              </button>
            </div>

            <p v-if="error" class="error" aria-live="assertive">{{ error }}</p>
            <p v-if="info" class="info" aria-live="polite">{{ info }}</p>
          </form>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} HexaNest. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
/**
 * Replace these with your actual Firebase wrapper functions.
 * They should resolve on success and throw (with message) on error.
 *
 * loginWithEmail(email, password, { remember })
 * continueWithGoogle()
 * continueWithApple()
 * sendPasswordReset(email)
 */
import {
  loginWithEmail,
  continueWithGoogle,
  continueWithApple,
  sendPasswordReset
} from '@/firebase'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      showPw: false,
      remember: true,
      loading: false,
      error: '',
      info: ''
    }
  },
  computed: {
    canSubmit() {
      return this.isEmailValid(this.email) && !!this.password
    }
  },
  methods: {
    isEmailValid(e) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
    },
    toggleShowPw() {
      this.showPw = !this.showPw
    },
    clearError() {
      if (this.error) this.error = ''
      if (this.info) this.info = ''
    },
    async onSubmit() {
      if (!this.canSubmit || this.loading) return
      this.error = ''
      this.info = ''
      this.loading = true
      try {
        await loginWithEmail(this.email, this.password, { remember: this.remember })
        this.$router.push('/') // or route to last page / dashboard
      } catch (e) {
        this.error = e && e.message ? e.message : 'Login failed.'
      } finally {
        this.loading = false
      }
    },
    async onGoogle() {
      if (this.loading) return
      this.error = ''
      this.info = ''
      this.loading = true
      try {
        await continueWithGoogle()
        this.$router.push('/') // or /subscribe if you gate access
      } catch (e) {
        this.error = e && e.message ? e.message : 'Google sign-in failed.'
      } finally {
        this.loading = false
      }
    },
    async onApple() {
      if (this.loading) return
      this.error = ''
      this.info = ''
      this.loading = true
      try {
        await continueWithApple()
        this.$router.push('/')
      } catch (e) {
        this.error = e && e.message ? e.message : 'Apple sign-in failed.'
      } finally {
        this.loading = false
      }
    },
    async onForgot() {
      this.error = ''
      this.info = ''
      if (!this.email || !this.isEmailValid(this.email)) {
        this.error = 'Enter your email above, then click “Forgot password?” again.'
        return
      }
      this.loading = true
      try {
        await sendPasswordReset(this.email)
        this.info = 'Password reset email sent. Check your inbox.'
      } catch (e) {
        this.error = e && e.message ? e.message : 'Could not send reset email.'
      } finally {
        this.loading = false
      }
    }
  }
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
.brand { display:inline-flex; align-items:center; gap:8px; color:inherit; text-decoration:none; user-select:none; }
.mark { width:24px; height:24px; fill:currentColor; color:var(--ink); }
.wordmark { font-weight:800; letter-spacing:.08em; font-size:.95rem; }
.muted-link { color:var(--muted); text-decoration:none; font-weight:700; }
.muted-link:hover { color:var(--ink); }

/* Layout */
.main { flex:1; display:grid; place-items:center; padding:32px 16px; }
.center { width:100%; max-width:480px; }
.card {
  background:#fff; border:1px solid var(--line); border-radius:28px;
  box-shadow:0 20px 60px rgba(0,0,0,.06); padding:28px 28px 24px;
}
.title { margin:0 0 6px; font-size:1.8rem; font-weight:900; letter-spacing:-.01em; }
.subtitle { margin:0 0 12px; color:var(--muted); }

/* Form */
.form { display:grid; gap:12px; margin-top:6px; }
.field { display:grid; gap:6px; }
label { font-weight:800; font-size:.95rem; }
input[type="email"], input[type="password"], input[type="text"] {
  padding:14px 14px; border:1.5px solid var(--line); border-radius:14px; outline:none;
  font-size:1rem; background:#fff; color:var(--ink);
}
input:focus { border-color: var(--teal); box-shadow:0 0 0 3px rgba(1,77,78,.12); }

.password-row { display:flex; gap:8px; }
.password-row input { flex:1; }
.ghost {
  border:1.5px solid var(--ink); background:#fff; color:var(--ink);
  border-radius:12px; padding:.65rem .9rem; font-weight:800; cursor:pointer;
}
.ghost:hover { background:var(--ink); color:#fff; }

.row-between { display:flex; align-items:center; justify-content:space-between; margin-top:6px; }
.check { display:flex; align-items:center; gap:8px; user-select:none; }
.check input { width:16px; height:16px; }

.linklike {
  background:none; border:none; color:var(--teal); font-weight:900; cursor:pointer; padding:0;
}
.linklike:hover { opacity:.8; }

/* Buttons */
.btn {
  padding:.9rem 1.2rem; font-weight:900; border-radius:14px; border:2px solid transparent; cursor:pointer;
  width:100%; margin-top:6px; transition: transform .06s, box-shadow .2s;
}
.btn[disabled] { opacity:.5; cursor:not-allowed; }
.btn-primary { background:var(--teal); color:#fff; box-shadow:0 15px 40px rgba(1,77,78,.22); }
.btn-primary:hover:not([disabled]) { transform:translateY(-1px); box-shadow:0 20px 55px rgba(1,77,78,.32); }

.btn-ghost {
  background:#fff; color:var(--ink); border:1.5px solid var(--ink);
  padding:.85rem 1rem; border-radius:12px; font-weight:900; width:100%;
}
.btn-ghost:hover { background:var(--ink); color:#fff; }

/* Divider + providers */
.divider {
  display:flex; align-items:center; gap:12px; color:var(--muted); font-weight:700;
  margin:12px 0 4px;
}
.divider::before, .divider::after {
  content:""; flex:1; height:1px; background:var(--line);
}
.providers { display:grid; grid-template-columns: 1fr 1fr; gap:10px; }
.icon-left { display:flex; align-items:center; gap:8px; justify-content:center; }
.ico { width:16px; height:16px; display:inline-block; border-radius:4px; }
.ico.g { background:#4285f4; } /* Google chip */
.ico.a { background:#000000; } /* Apple chip  */

/* Messages */
.error { color:#C0392B; font-weight:700; margin-top:8px; }
.info  { color:#0E7C62; font-weight:700; margin-top:8px; }

/* Footer */
.footer { padding:20px; text-align:center; color:var(--muted); font-weight:600; }

/* Responsive */
@media (max-width: 520px) {
  .providers { grid-template-columns: 1fr; }
}
</style>
