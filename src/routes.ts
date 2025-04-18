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
        path: "/standard", name:"standard", meta:{label:'standard sections'},
        component: ()=>import('./pages/standard.vue') //standard
    },
    {
        path: "/standard/grp/:nm_group", name:"standard_grp", meta:{label:'tags & controls'},
        component: ()=>import('./pages/standard.vue') //standard
    },

    {
        path: "/cron_scheduler", name:"cron_scheduler", meta:{label:'scheduler'},
        component: ()=>import('./pages/cron_scheduler.vue') 
    },
    {
        path: "/settings", name:"settings", meta:{label:'settings'},
        component: ()=>import('./pages/settings.vue') 
    },
    {
        path: "/servers_api", name:"servers_api", meta:{label:'servers-api list'},
        component: ()=>import('./pages/servers_api.vue') 
    },

];

const router = createRouter({
    history,
    routes
});

export default router;

