import Vue from 'vue'
import VueRouter from 'vue-router'
import {appRoutes} from "@/router/routes";
import {StorageKeys} from "@/enums/StorageKeys";

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    ...appRoutes,
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const token = localStorage.getItem(StorageKeys.AUTH_TOKEN);

  if (requiresAuth && !token) {
    next('/login')
    return;
  }

  if (!requiresAuth && token) {
    next('/')
    return;
  }

  next()
})

export default router
