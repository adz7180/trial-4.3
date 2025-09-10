import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      email: '',
      role: 'guest', // 'guest', 'subscriber', 'admin', 'company'
    },
    trial: {
      isActive: false,
      expiresAt: null,
    },
    subscription: {
      plan: 'none', // 'none', 'monthly', 'annual', 'premium', 'company'
    },
    features: {
      canDownload: false,
      canShare: false,
      canSendToContractor: false,
      scan2DEnabled: true,
      customizationEnabled: true,
      autoUpdateEnabled: true,
    },
  },

  mutations: {
    setUser(state, payload) {
      state.user.email = payload.email;
      state.user.role = payload.role;
    },
    setTrial(state, payload) {
      state.trial.isActive = payload.isActive;
      state.trial.expiresAt = payload.expiresAt;
    },
    setSubscription(state, plan) {
      state.subscription.plan = plan;
    },
    updateFeatures(state, features) {
      state.features = { ...state.features, ...features };
    },
  },

  actions: {
    startTrial({ commit }) {
      const now = new Date();
      const expiry = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3-day trial
      commit('setTrial', { isActive: true, expiresAt: expiry });
    },
    endTrial({ commit }) {
      commit('setTrial', { isActive: false, expiresAt: null });
    },
    activatePlan({ commit }, plan) {
      commit('setSubscription', plan);
      if (plan === 'premium' || plan === 'company') {
        commit('updateFeatures', {
          canDownload: true,
          canShare: true,
          canSendToContractor: true,
        });
      }
    },
    elevateToAdmin({ commit }) {
      commit('setUser', { role: 'admin' });
    },
  },

  getters: {
    isAdmin: state => state.user.role === 'admin',
    isSubscriber: state => state.subscription.plan !== 'none',
    isTrialActive: state => state.trial.isActive,
    canAccessDownloads: state => state.features.canDownload,
    fullAccess: state =>
      state.features.canDownload &&
      state.features.canShare &&
      state.features.canSendToContractor,
  },
});
