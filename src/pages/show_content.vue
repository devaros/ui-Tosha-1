<template>
<div>
  <z-button  @click="$router.go(-1)" label="<<" class="mx-2" />

  <h3> {{$route.query.file_name}}</h3>

    <div  class="row px-2" style="min-height:5px">
      <div v_show="loading" class="loader " :class="{loading}">
      </div>
    </div>

  <div class="list_files row px-2">

    <pre style="white-space:pre-wrap;background-color:#eeeeee;padding: 2px;" v-text="file_content" />

  </div>
</div>
</template>

<script setup lang="ts">
import {ref, onMounted, onActivated} from 'vue'
import { useRoute} from 'vue-router'

import LayoutDefault from '/src/components/LayoutDefault.vue'
import ZButton from '/src/components/ZButton.vue'
import {backendUrl} from '/src/components/global_data'

const file_content = ref(null)
const route = useRoute()
let file_nm = null
const loading = ref(false)

function get_api_data(file_name){
  loading.value = true
  fetch(`${backendUrl}show_content/?file_name=${file_name}`).then(async req => {
    if (req.ok) {
      const res = await req.text()
      //categories.value.push(...res)
      file_content.value = res
      //console.log('api_data_74: ', '=',res.slice(0,11))
    }
  }).finally(_=>loading.value=false)
}



function to_view(file_nm, f_type){
  const is_dir =  (f_type === 16384)
  const is_file =  (f_type === 32768)
  if  (f_type === 16384) {  // is_dir
    get_api_data(`?chdir=${file_nm}`)
  }
}

onActivated(()=>{
  if  (file_nm === route.query.file_name) return
  file_content.value=null
  file_nm = route.query.file_name
  setTimeout(()=>{
    get_api_data(file_nm)
  },9)

})


</script>

<style scoped>
.list_files{
  text-align: left;
}
.file_nm{
  flex-grow: 2;
    cursor: pointer;
    background-color: #00000011;
    border-radius: 6px;
    padding: 0 4px;  
}
.file_nm.folder{
  font-weight: bold;
}
.loading{
  transition: all 3s;
}
</style>


