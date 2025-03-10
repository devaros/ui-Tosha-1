<template>
  <div class="layout">
  <header>
      <router-link to="/" _target="_blank" class="logo " :class="{home:$route.name!='home'}">
        <Transition name="fade">
          <img v-if="show_a" key="1" src="/py-tosha-a.svg" class="ma-1" alt="py-Tosha logo" />
          <img v-else key="2" src="/py-Tosha.svg" class="ma-1" alt="py-Tosha logo"  />
        </Transition>
          <img v-if="preload" v-show="false" key="2" src="/py-Tosha.svg" class="ma-1" alt="py-Tosha logo"  />
      </router-link>

      <img v-if="preload" v-show="false" key="2" src="/ios_spin.svg" class="ma-1" alt="py-Tosha logo"  />

<h2 class="title text-h2">
      {{$route.meta.label || 'py-Tosha'}}
</h2>
  </header>

  <main style="_padding-left: 50px;">

  <nav_bar/>

  <!--slot /-->

  <router-view class="view" v-slot="{ Component }">
    <Transition name="pagefade"
      _before-enter="over_hide=true"
      _enter="onEnter"
      _after-enter="over_hide=false"
      _enter-cancelled="over_hide=false"
    >
        <keep-alive max="3" >
          <component :is="Component" class="viewG" />
        </keep-alive>
    </Transition >
  </router-view >



  </main>
  <footer>
    <ul>
    <li :class="{'bg-warn':api_data.err}">
      {{ get_api_data }}
    </li>
    <li :class="{'bg-warn':api_data.err}">mem: {{~~(api_data.mem_free/100)/10}}k</li>
    <li :class="{'bg-warn':api_data.err}">cpu: {{~~(api_data.load*100+1)}}%</li>
    </ul>
  </footer>
  </div>
</template>


<script setup lang="ts">
import {ref, watch, computed} from 'vue' 
import { useRoute, useRouter } from 'vue-router'
import ZButton from './ZButton.vue'
let show_a = ref(true)
import {api_data} from './global_data'
import nav_bar from "./Nav_Bar.vue"

const route = useRoute();
let preload = ref(false)
setTimeout(()=>preload.value = true,2222)


const get_api_data = computed(()=>{
    //console.log('api_data: ', api_data.value, 2)
    return api_data.value?.datetime && new Date(api_data.value.datetime ).toISOString().slice(8,16).replace('T',' ')
  }
)

let tt_ = null
watch(()=> route.name, ()=>{
  //console.log('route__44: ', route.name )
  clearTimeout(tt_)
  tt_ = setTimeout(()=>show_a.value=false,7000)
  if (show_a.value) return
  setTimeout(()=>show_a.value=true,400);
})
</script>


<style scoped>
header{
  text-wrap-mode: nowrap;
  padding-right: 4px;
  padding-left: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  max-width:99vw;
  white-space: nowrap;
  _overflow: auto;
  overflow: unset;
}
header > *{
  display: inline-block;
  margin:4px;
}

.logo{
  width:90px;
  max-width:140px;
  background-color: #dddddd;
  border-radius: 8px;
}
.title{
  min-width:220px;
  white-space: pre-wrap;
  max-width: calc(99vw - 140px);
  text-wrap: wrap;
}
.logo img{
  width:80px;
  transition: width 0.4s ease, opacity 0.4s ease;
}
.logo.home img{
  width:42px;
}


.layout{
  min-height: 300px;
  height: 100dvh;
  max-height: 100dvh;
    display: flex;
    flex-direction: column;
  max-width: 100vw;
}
main{
  display: flex;
  flex-grow: 1;
  overflow: auto;
  _width: 1200px;
  width: 1200px;
  max-width: 100vw;
  _padding-left: 6px;
  _padding-right: 6px;
  _padding-bottom: 26px;
  margin: 2px auto;
  background-color: aliceblue;
  border-top: solid 2px #306998;
  border-bottom: solid 2px #306998;
  position: relative;
  _overflow: hidden;
}

@media (max-width: 960.00px) {
  main{
    _max-width: 100vw;
  }
}

.view{
  width: 100%;
  max-width: 1130px;
  padding-bottom: 30px;
  _position: relative;
}


._fade-enter-active, .fade-enter-to{
  _position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  _position: absolute;
  _position: fixed;
  _transition: opacity 2.5s ease;
}

.fade-enter-to{
  _position: absolute;
}
.fade-enter-from,
.fade-leave-to{
  position: absolute;
  _position: fixed;
  opacity: 0;
}

footer {
  background-color: #ffffff;
  z-index:99;
}
footer > *{
  margin: 2px 4px;
  _margin-right: 4px;
  padding-left:0px;
}
footer li:before{
  content:"";
  margin-left: 4px;
  margin-right: 4px;
    background-color: blue;
    width: 6px;
    height: 6px;
    display: inline-block;
    bottom: 2px;
    position: relative;
}
footer li{
  min-width: 150px;
  display: inline-table;

  margin-left: 4px;
  margin-right: 4px;
    width: 4px;
    height: 4px;
    display: inline;
    background-color: #e7e7e7;
    border-radius: 8px;
    padding: 2px 8px;
  position: relative;
    bottom: 0;
}

</style>
