import {createRouter, createWebHistory} from "vue-router/dist/vue-router";



const routes=[{
    path: '/home',
    name: 'home-vue',
    component: () => import("./components/Home")
},{
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
        path:'/doctors',
        name:'doctor-list',
        component: () => import("./components/doctor/doctor-list")
    },
    {
        path:'/doctors/add-doctor',
        name:'add-doctor',
        component: () => import("./components/doctor/add-doctor")
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
