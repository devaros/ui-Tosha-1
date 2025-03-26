<template>
  <nav class="nav d-md2-none">

    <template v-for="itm in items" >
    <router-link v-if="itm.label" class="btn my-2  _mx-auto" :title="itm.label"
        :class="{hilith:$route.path ==itm.to}" :to="itm.to">
      <img :src="itm.img" />
    </router-link>
    <div v-else class="space" >
    </div>
    </template>

  </nav>

</template>

<script setup lang="ts">
//import {ref} from 'vue'

const items = [
  {img:'/assets2/net_wifi.svg',to:'/network',label:'network'},
  {img:'/assets2/folder_files.svg',to:'/files',label:'files'},
  {img:'/assets2/info.svg',to:'/info',label:'info'},
  {img:'/assets2/switches.svg',to:'/switches',label:'switch'},
  {img:'/assets2/schedule.svg',to:'/cron_scheduler',label:'scheduler'},
  {img:'',to:'',label:''},
  {img:'/assets2/settings.svg',to:'/settings',label:'settings'},
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

@media (max-width: 800.00px) {
  .d-md2-none{
    display: none !important;
  }
}
nav a{
    transition: background-color 1s;
    height: 40px;
    padding: 8px;
    _padding-bottom: 8px;
}
nav .hilith{
    background-color: aliceblue;
    _padding: 3px;
}

nav a > img{
    height: 100%;
}

</style>
