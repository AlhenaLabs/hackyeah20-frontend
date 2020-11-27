import {RouteConfig} from "vue-router";
import Login from "@/views/Login.vue";
import Account from "@/views/Account.vue";
import Privileges from "@/views/errors/Privileges.vue";
import FishnetsList from "@/views/fishnets/FishnetsList.vue";

export const appRoutes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Fishnets',
        component: FishnetsList,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/errors/privileges',
        name: 'PrivilegesError',
        component: Privileges,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/account',
        name: 'Account',
        component: Account,
        meta: {
            requiresAuth: true
        }
    },
];