<template>
<LayoutDefault :class="{over_hide}" >

  <router-view class="view" v-slot="{ Component }">
    <Transition name="pagefade"
      @before-enter="over_hide=true"
      _enter="onEnter"
      @after-enter="over_hide=false"
      @enter-cancelled="over_hide=false"
    >
        <keep-alive max="3" >
          <component :is="Component"  />
        </keep-alive>
    </Transition >
  </router-view >


</LayoutDefault>

</template>


<script setup lang="ts">
import {ref, getCurrentInstance } from 'vue'
import LayoutDefault from '/src/components/LayoutDefault.vue'
import {api_data} from './components/global_data'
import {backendUrl} from '/src/components/global_data'

const over_hide = ref(false)

function get_api_data(){
  
  fetch(`${backendUrl}api/data`).then(async req => {
    if (req.ok) {
      const res: never[] = await req.json()
      //categories.value.push(...res)
      if (!res) return
      api_data.value = res
      Object.assign( api_data.value, res)
    }
  }).catch(err=>{
    //if (api_data.value.mem_free)
    api_data.value.err = true
  })
  .finally(()=>
    setTimeout(get_api_data,22555)
    
  )
}

setTimeout(get_api_data,2555)

</script>




<style scoped>
.layout{
  _padding:4px;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.view{
  width: 1200px;
  max-width: 100%;
  padding-bottom: 30px;
}
</style>


<style>
.over_hide main{
  overflow: hidden !important;
}
</style>



