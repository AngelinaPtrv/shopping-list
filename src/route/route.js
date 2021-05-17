import Vue from 'vue';
import Router from 'vue-router';
import Grid from '@/components/Grid/Grid';
import NotFound from '@/components/NotFound/NotFound';
import WelcomePage from '@/components/WelcomePage/WelcomePage';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/:url/list',
      component: Grid
    },
    {
      path: '/',
      name: WelcomePage,
      component: WelcomePage
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})

export default router;