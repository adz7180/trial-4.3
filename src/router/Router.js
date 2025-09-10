import Vue from 'vue';
import Router from 'vue-router';

import ExplorePreview from '../views/explorepreview.vue';
import SubscriptionPlans from '../views/subscriptionplans.vue';
import SceneViewer from '../components/sceneviewer.vue';
import FloorPlanUploader from '../components/floorplanuploader.vue';
import AdminPanel from '../components/adminpanel.vue';
import ContractorConnect from '../components/contractorconnect.vue';
import PaymentScreen from '../components/paymentscreen.vue';

Vue.use(Router);

const routes = [
  { path: '/', name: 'ExplorePreview', component: ExplorePreview },
  { path: '/subscribe', name: 'SubscriptionPlans', component: SubscriptionPlans },
  { path: '/scene', name: 'SceneViewer', component: SceneViewer },
  { path: '/upload', name: 'FloorPlanUploader', component: FloorPlanUploader },
  { path: '/admin', name: 'AdminPanel', component: AdminPanel, meta: { requiresAdmin: true } },
  { path: '/contractor', name: 'ContractorConnect', component: ContractorConnect },
  { path: '/payment', name: 'PaymentScreen', component: PaymentScreen },
];

const router = new Router({
  mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

// Optional navigation guards (admin-only route protection)
router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!isAdmin) return next('/');
  }
  next();
});

export default router;
