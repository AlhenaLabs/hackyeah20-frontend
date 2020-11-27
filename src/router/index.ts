import Vue from 'vue'
import VueRouter from 'vue-router'
import {appRoutes} from "@/router/routes";
import {StorageKeys} from "@/enums/StorageKeys";
import {User} from "@/types/User";
import {RolesEnum} from "@/enums/RolesEnum";

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    ...appRoutes,
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const administrator = to.matched.some(x => x.meta.administrator)
  const seller = to.matched.some(x => x.meta.seller)
  const customer = to.matched.some(x => x.meta.customer)
  const checkRoles = to.matched.some(x => x.meta.checkRoles)
  const token = localStorage.getItem(StorageKeys.AUTH_TOKEN);
  const userData = localStorage.getItem(StorageKeys.USER);
  const user: User = userData ? JSON.parse(userData) : null;

  if (requiresAuth && !token) {
    next('/login')
    return;
  }

  if (!requiresAuth && token) {
    next('/')
    return;
  }

  if (requiresAuth && checkRoles) {
    const canAdministratorAccess = user.role === RolesEnum.ADMINISTRATOR && administrator;
    const canSellerAccess = user.role === RolesEnum.SELLER && seller;
    const canCustomerAccess = user.role === RolesEnum.CUSTOMER && customer;

    if (!canAdministratorAccess && !canSellerAccess && !canCustomerAccess) {
      next('/errors/privileges')
    }
  }

  next()
})

export default router
