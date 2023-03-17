import {createRouter, createWebHistory} from "vue-router/dist/vue-router";


const routes = [
    {
    path: '/',
    name: 'home-vue',
    component: () => import("./components/Home")
    },
    {
    path: '/patients',
    name: 'patient-list',
    component: () => import("./components/patient/patient-list")
    },
    {
        path: '/patients/add-patient',
        name: 'add-patient',
        component: () => import("./components/patient/add-patient")
    },
    {
        path: '/patients/edit-patient/:id',
        name: 'edit-patient',
        component: () => import("./components/patient/edit-patient")
    },
    {
        path: '/patients/patient-details/:id',
        name: 'patient-details',
        component: () => import("./components/patient/patient-details")
    },
    {
        path: '/doctors',
        name: 'doctor-list',
        component: () => import("./components/doctor/doctor-list")
    },
    {
        path: '/doctors/add-doctor',
        name: 'add-doctor',
        component: () => import("./components/doctor/add-doctor")
    },
    {
        path: '/doctors/edit-doctor/:id',
        name: 'edit-doctor',
        component: () => import("./components/doctor/edit-doctor")
    },
    {
        path: '/doctors/doctor-details/:id',
        name: 'doctor-details',
        component: () => import("./components/doctor/doctor-details")
    },
    {
        path:'/administrators',
        name:'administrator-list',
        component: () => import("./components/administrators/administrator-list")
    },
    {
        path:'/administrators/add-administrator',
        name:'add-administrator',
        component: () => import("./components/administrators/add-administrator")
    },
    {
        path:'/administrators/edit-administrator/:id',
        name:'edit-administrator',
        component: () => import("./components/administrators/edit-administrator")
    },
    {
        path:'/administrators/administrator-details/:id',
        name:'administrator-details',
        component: () => import("./components/administrators/administrator-details")
    }



]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
