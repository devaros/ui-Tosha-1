<template>
<LayoutDefault :class="{over_hide}" >
</LayoutDefault>
</template>


<script setup lang="ts">
import {ref, getCurrentInstance, watch } from 'vue'
import LayoutDefault from '/src/components/LayoutDefault.vue'
import {api_data} from './components/global_data'
import {backendUrl} from '/src/components/global_data'

const over_hide = ref(false)

backendUrl.value = localStorage.getItem('current_host') || '/'

let tt_ = 111

function get_api_data(){
  let trans = tt_
  fetch(`${backendUrl.value}api/data`).then(async req => {
    if (req.ok && trans === tt_) {
      const res: never[] = await req.json()
      if (!res) return
      api_data.value = res
    }
  }).catch(err=>{
    if (trans === tt_)  api_data.value.err = true
  })
  .finally(()=>{
    if (trans === tt_)  tt_ = setTimeout(get_api_data,22555)
  })
}

setTimeout(get_api_data,2555)

watch(()=> backendUrl.value, (val)=>{
  console.log('watch_67: ', val)
  clearTimeout(tt_); tt_=null; api_data.value = {}; get_api_data()
})

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
</style>


<style>
.over_hide main{
  overflow: hidden !important;
}
</style>



