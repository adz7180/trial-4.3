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
          <h1 class="title">Create your account</h1>

          <form class="form" @submit.prevent="onSubmit">
            <!-- Email -->
            <div class="field">
              <label for="email">Email</label>
              <input id="email" type="email" v-model.trim="email" autocomplete="email" required />
              <p class="hint" :class="{ bad: email && !isEmailValid(email) }">
                {{ email && !isEmailValid(email) ? 'Enter a valid email' : ' ' }}
              </p>
            </div>

            <!-- Confirm Email -->
            <div class="field">
              <label for="email2">Confirm Email</label>
              <input id="email2" type="email" v-model.trim="email2" autocomplete="email" required />
              <p class="hint" :class="{ bad: email2 && email !== email2 }">
                {{ email2 && email !== email2 ? 'Emails do not match' : ' ' }}
              </p>
            </div>

            <!-- Password -->
            <div class="field">
              <label for="pw">Create password</label>
              <input id="pw" :type="showPw ? 'text' : 'password'" v-model="password" autocomplete="new-password" required />
              <p class="hint" :class="{ bad: password && !isPasswordValid(password) }">
                Must be at least 8 characters and include a capital letter.
              </p>
            </div>

            <!-- Confirm Password -->
            <div class="field">
              <label for="pw2">Confirm password</label>
              <input id="pw2" :type="showPw ? 'text' : 'password'" v-model="password2" autocomplete="new-password" required />
              <p class="hint" :class="{ bad: password2 && password !== password2 }">
                {{ password2 && password !== password2 ? 'Passwords do not match' : ' ' }}
              </p>
            </div>

            <!-- Toggles -->
            <div class="row-between">
              <label class="toggle">
                <input type="checkbox" v-model="showPw" />
                <span>Show password</span>
              </label>
            </div>

            <!-- Agreements -->
            <div class="agreements">
              <label class="check">
                <input type="checkbox" v-model="agreeTos" />
                <span>I agree to the <router-link to="/terms">Terms of Service</router-link>.</span>
              </label>
              <label class="check">
                <input type="checkbox" v-model="agreePrivacy" />
                <span>I agree to the <router-link to="/privacy">Privacy Policy</router-link>.</span>
              </label>
            </div>

            <!-- Primary email sign up -->
            <button class="btn btn-primary" type="submit" :disabled="!canSubmit || loading">
              {{ loading ? 'Creating…' : 'Create Account' }}
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
import { registerUser, continueWithGoogle, continueWithApple } from '@/firebase'

export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      email2: '',
      password: '',
      password2: '',
      showPw: false,
      agreeTos: false,
      agreePrivacy: false,
      loading: false,
      error: ''
    }
  },
  computed: {
    canSubmit() {
      return (
        this.isEmailValid(this.email) &&
        this.email === this.email2 &&
        this.isPasswordValid(this.password) &&
        this.password === this.password2 &&
        this.agreeTos &&
        this.agreePrivacy
      )
    }
  },
  methods: {
    isEmailValid(e) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
    },
    isPasswordValid(pw) {
      if (!pw || pw.length < 8) return false
      return /[A-Z]/.test(pw)
    },
    async onSubmit() {
      if (!this.canSubmit || this.loading) return
      this.error = ''
      this.loading = true
      try {
        await registerUser(this.email, this.password)
        this.$router.push({ path: '/verify', query: { email: this.email } })
      } catch (e) {
        this.error = e && e.message ? e.message : 'Sign up failed.'
      } finally {
        this.loading = false
      }
    },
    async onGoogle() {
      if (this.loading) return
      this.error = ''
      this.loading = true
      try {
        const user = await continueWithGoogle()
        // Social providers generally return verified emails → proceed to subscription
        this.$router.push('/subscribe')
      } catch (e) {
        this.error = e && e.message ? e.message : 'Google sign-in failed.'
      } finally {
        this.loading = false
      }
    },
    async onApple() {
      if (this.loading) return
      this.error = ''
      this.loading = true
      try {
        const user = await continueWithApple()
        this.$router.push('/subscribe')
      } catch (e) {
        // Common Apple setup issues show here (services ID / redirect URL)
        this.error = e && e.message ? e.message : 'Apple sign-in failed.'
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
.center { width:100%; max-width:560px; }
.card {
  background:#fff; border:1px solid var(--line); border-radius:28px;
  box-shadow:0 20px 60px rgba(0,0,0,.06); padding:28px 28px 24px;
}
.title { margin:0 0 8px; font-size:1.8rem; font-weight:900; letter-spacing:-.01em; }
.muted { color:var(--muted); }

/* Form */
.form { display:grid; gap:12px; margin-top:10px; }
.field { display:grid; gap:6px; }
label { font-weight:800; font-size:.95rem; }
input[type="email"], input[type="password"], input[type="text"] {
  padding:14px 14px; border:1.5px solid var(--line); border-radius:14px; outline:none;
  font-size:1rem; background:#fff; color:var(--ink);
}
input:focus { border-color: var(--teal); box-shadow:0 0 0 3px rgba(1,77,78,.12); }
.hint { min-height:18px; font-size:.85rem; color:var(--muted); margin:0; }
.hint.bad { color:#B00020; }

.row-between { display:flex; align-items:center; justify-content:space-between; }

.toggle { display:flex; align-items:center; gap:8px; user-select:none; cursor:pointer; }
.toggle input { width:16px; height:16px; }

.agreements { display:grid; gap:8px; margin:8px 0 6px; }
.check { display:flex; align-items:flex-start; gap:8px; }
.check input { margin-top:3px; width:16px; height:16px; }
.check a { color:var(--ink); font-weight:800; text-decoration:underline; }

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
  padding:.85rem 1rem; border-radius:12px; font-weight:900;
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
.providers { display:flex; gap:10px; flex-wrap:wrap; }
.icon-left { display:flex; align-items:center; gap:8px; justify-content:center; }
.ico { width:16px; height:16px; display:inline-block; border-radius:4px; }
.ico.g { background: #4285f4; } /* tiny color chip for Google */
.ico.a { background: #000000; } /* tiny color chip for Apple  */

.error { color:#C0392B; font-weight:700; margin-top:8px; }

/* Footer */
.footer { padding:20px; text-align:center; color:var(--muted); font-weight:600; }
</style>
