import Vue from 'vue';
import Router from 'vue-router';

import App from './App';
import PortfolioHome from './components/PortfolioHome';

import '@/assets/styles/styles.scss';

Vue.config.productionTip = false;

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/', name: 'home', component: PortfolioHome, alias: 'home',
    },
    { path: '/projects', name: 'projects', component: PortfolioHome },
    { path: '/art', name: 'art', component: PortfolioHome },
    { path: '/contact', name: 'contact', component: PortfolioHome },
  ],
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
