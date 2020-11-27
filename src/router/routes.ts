import {RouteConfig} from "vue-router";
import Login from "@/views/Login.vue";
import Acc from "@/views/Acc.vue";
import Users from "@/views/users/Users.vue";
import Privileges from "@/views/errors/Privileges.vue";
import FishnetsList from "@/views/fishnets/FishnetsList.vue";
import FishnetMarkAsLost from "@/views/fishnets/FishnetMarkAsLost.vue";
import FishnetDelete from "@/views/fishnets/FishnetDelete.vue";
import CreateFishnet from "@/views/fishnets/CreateFishnet.vue";
import CreateUser from "@/views/users/CreateUser.vue";
import FishnetLogs from "@/views/fishnets/FishnetLogs.vue";
import FishnetChangeStatus from "@/views/fishnets/FishnetChangeStatus.vue";
import FIshnetRenew from "@/views/fishnets/FIshnetRenew.vue";

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
        path: '/fishnets/:id/logs',
        name: 'FishnetLogs',
        component: FishnetLogs,
        meta: {
            requiresAuth: true,
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
            requiresAuth: true,
            checkRoles: true,
            administrator: true,
            seller: true,
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
    {
        path: '/fishnets/:id/change-status',
        name: 'FishnetChangeStatus',
        component: FishnetChangeStatus,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/fishnets/:id/renew',
        name: 'FishnetRenew',
        component: FIshnetRenew,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/users/create',
        name: 'CreateUser',
        component: CreateUser,
        meta: {
            requiresAuth: true,
            checkRoles: true,
            administrator: true,
            seller: true,
        }
    }
];