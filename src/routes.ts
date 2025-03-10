import {
    createWebHistory,
    createRouter
} from "vue-router";
//import Home from "./components/HelloWorld.vue";
//import Info from "./pages/info.vue";

const history = createWebHistory();

const routes = [
    {
        path: "/", name:"home",
        component: ()=>import('./pages/home.vue')
    },
    {
        path: "/info", name:"info", meta:{label:'info'},
        component: ()=>import('./pages/info.vue') //Info
    },
    {
        path: "/network", name:"networl", meta:{label:'network'},
        component: ()=>import('./pages/network.vue') //Info
    },
    {
        path: "/files", name:"files", meta:{label:'files'},
        component: ()=>import('./pages/files.vue') //Info
    },
    {
        path: "/show_content", name:"show_content", meta:{label:'file content'},
        component: ()=>import('./pages/show_content.vue') //Info
    },
    {
        path: "/switches", name:"switches", meta:{label:'switches'},
        component: ()=>import('./pages/switches.vue') //switches
    },
    {
        path: "/cron_scheduler", name:"cron_scheduler", meta:{label:'scheduler'},
        component: ()=>import('./pages/cron_scheduler.vue') 
    },
    {
        path: "/settings", name:"settings", meta:{label:'settings'},
        component: ()=>import('./pages/settings.vue') 
    },
];

const router = createRouter({
    history,
    routes
});

export default router;

