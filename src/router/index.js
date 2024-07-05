import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import Sum from '../views/Sum.vue';
import Summary from '../views/Summary.vue';
import login from '../components/login.vue';
import signup from '../components/signup.vue';
import Mainview from '../views/MainView.vue';
import Addcategory from '../components/Addcategory.vue';
import Addbrand from '../components/Addbrand.vue';
import productview from '../views/productview.vue';
import product from '../views/product.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "Main",
      component: Mainview,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
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
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
    {
      path: "/signup",
      name: "signup",
      component: signup,
    },
    { path: '/category', 
      name: "category",
      component: Addcategory 
    },
      { path: '/brand',
        name: "Brand",
        component: Addbrand 
      },
        { path: '/product',
          name: "Product",
          component: productview
        },
        { path: '/productlist',
          name: "Productlist",
          component: product 
        },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = localStorage.getItem('token');

  if (requiresAuth && !token) {
    next({ name: 'login' });
  } else {
    next();
  }
});


export default router