import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Sum from '../views/Sum.vue';
import Summary from '../views/Summary.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/sum",
      name: "sum",
      component: Sum,
    },
    {
      path: "/summary",
      name: "summary",
      component: Summary,
    },
    {
      path: '/student',
      name: 'student',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/studentview.vue')
    }
  ],
});



export default router