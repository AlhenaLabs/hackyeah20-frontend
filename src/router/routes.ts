import {RouteConfig} from "vue-router";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";

export const appRoutes: Array<RouteConfig>  = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
];