import {RouteConfig} from "vue-router";
import Login from "@/views/Login.vue";
import Account from "@/views/Account.vue";
import Users from "@/views/Users.vue";
import Privileges from "@/views/errors/Privileges.vue";
import FishnetsList from "@/views/fishnets/FishnetsList.vue";
import FishnetMarkAsLost from "@/views/fishnets/FishnetMarkAsLost.vue";
import FishnetDelete from "@/views/fishnets/FishnetDelete.vue";

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
    {
        path: '/users',
        name: 'Users',
        component: Users,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/fishnets/:id/mark-as-lost',
        name: 'MarkFishnetAsLost',
        component: FishnetMarkAsLost,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/fishnets/:id/delete',
        name: 'FishnetDelete',
        component: FishnetDelete,
        meta: {
            requiresAuth: true
        }
    },
];