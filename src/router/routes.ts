import {RouteConfig} from "vue-router";
import Login from "@/views/Login.vue";
import Acc from "@/views/Acc.vue";
import Users from "@/views/Users.vue";
import Privileges from "@/views/errors/Privileges.vue";
import FishnetsList from "@/views/fishnets/FishnetsList.vue";
import FishnetMarkAsLost from "@/views/fishnets/FishnetMarkAsLost.vue";
import FishnetDelete from "@/views/fishnets/FishnetDelete.vue";
import CreateFishnet from "@/views/fishnets/CreateFishnet.vue";

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
        path: '/fishnets/create',
        name: 'CreateFishnet',
        component: CreateFishnet,
        meta: {
            requiresAuth: true,
            checkRoles: true,
            administrator: true,
            seller: true,
            customer: false
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
        component: Acc,
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