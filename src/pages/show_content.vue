<template>
<div>
  <z-button  @click="$router.go(-1)" label="<<" class="mx-2" />
  <z-button  @click="edit_mode = !edit_mode" label="edit" class="mx-2" />
  <z-button v-if="edit_mode" class="mx-2 bg-warn"  @click="download_content" label="save" />


  <h3> {{$route.query.file_name}}</h3>

    <div  class="row px-2" style="min-height:5px">
      <div v_show="loading" class="loader " :class="{loading}">
      </div>
    </div>

  <div class="list_files row px-2">

    <pre v-if="!edit_mode" style="white-space:pre-wrap;background-color:#eeeeee;padding: 2px;" v-text="file_content" />

    <textarea v-else id="f_content" multiple name="content" :rows="lines.length" _cols="55"
      style="min-height: 50vh;width:100%" v-model="file_content"
    ></textarea>


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
let edit_mode = ref(false)
const lines = ref([])

function get_api_data(file_name){
  loading.value = true
  fetch(`${backendUrl}show_content/?file_name=${file_name}`).then(async req => {
    if (req.ok) {
      edit_mode.value = false
      const res = await req.text()
      //categories.value.push(...res)
      file_content.value = res
      lines.value = res.split("\n")
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

function download_content(e){
    const form_data = new FormData()
    const el = document.querySelector("#f_content")
    let params = new URLSearchParams(document.location.search)
    let file_name = params.get("file_name")
    const dd = el.value
    let bb = new Blob([dd], {
      type: 'text/plain'
    });
    form_data.append("files", bb )
    const xhr = new XMLHttpRequest()
    xhr.open("PUT", `${backendUrl}api/upload/${file_name}`, true)
    //xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.addEventListener("load", ()=>{
      //window.location.href = "/files"
      window.history.back()
    });
    xhr.addEventListener("error", ()=>{
      alert("Upload Error!")
    });
    xhr.send(dd)
    get_api_data()
}

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


