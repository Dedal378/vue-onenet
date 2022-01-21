import { createRouter, createWebHistory } from 'vue-router';

import PublicLayout from '../layouts/PublicLayout.vue';
import LoginLayout from '../layouts/LoginLayout.vue';

import { getToken } from '@/services/utils';

const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'HomePage',
        redirect: '/cabinet',
      },
    ],
  },
  {
    path: '/signin',
    component: LoginLayout,
    children: [
      {
        path: '',
        name: 'AuthPage',
        component: () => import('../views/AuthPage.vue'),
      },
    ],
  },
  {
    path: '/cabinet',
    component: PublicLayout,
    children: [
      {
        path: '',
        name: 'ControlPage',
        component: () => import('../views/cabinet/index.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (!to.params.pageNumber) {
      setTimeout(() => {
        document.getElementById('app').scrollIntoView();
      }, 100);
    }
  },
});

router.beforeEach((to, _, next) => {
  if (to.name !== 'AuthPage' && !getToken()) {
    next({ name: 'AuthPage' });
  } else if (to.name === 'AuthPage' && getToken()) {
    next({ name: 'HomePage' });
  } else {
    next();
  }
});

export default router;
