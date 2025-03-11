<template>
  <nav class="nav _nav_wrap d-md2-none">

    <router-link v-for="itm in items" class="btn my-2  _mx-auto" :title="itm.label"
        :class="{hilith:$route.path ==itm.to}" :to="itm.to">
      <img :src="itm.img" />
    </router-link>

  </nav>

</template>

<script setup lang="ts">
//import {ref} from 'vue'

const items = [
  {img:'/net_wifi.svg',to:'/network',label:'network'},
  {img:'/folder_files.svg',to:'/files',label:'files'},
  {img:'/info.svg',to:'/info',label:'info'},
  {img:'/switches.svg',to:'/switches',label:'switch'},
  {img:'/schedule.svg',to:'/cron_scheduler',label:'scheduler'},
  {img:'/settings.svg',to:'/settings',label:'settings'},
]

   
</script>


<style scoped>


nav, .nav{
  overflow-y: auto;
    width: 50px;
    min-width: 50px;
    background-color: #dee;
    position: sticky;
    /* bottom: 24px; */
    left: 0px;
    top: 0px;
    height: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    z-index: 99;
}
.nav_wrap{
    height: 100%;
    padding-bottom: 20px;
    z-index: 99;
    _display: table;

    _width: 50px;
    background-color: #d5f;
    position: sticky;
    /* bottom: 24px; */
    left: 0px;
    top: 0px;
    _height: 100%;
    _padding-top: 20px;
    _padding-bottom: 20px;
    _display: flex;
    _flex-direction: column;
}
@media (max-width: 800.00px) {
  .d-md2-none{
    display: none !important;
  }
}
nav a{
    transition: background-color 1s;
    height: 28px;
    padding: 2px;
}
nav .hilith{
    background-color: #0553;
    _padding: 3px;
}

nav a > img{
    height: 100%;
}

</style>
