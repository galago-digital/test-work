import Vue from 'vue';
import VueRouter from 'vue-router';
import FormPerson from '../page/form-page/FormPerson.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'form',
    component: FormPerson,
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../page/table-page/TablePerson.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
