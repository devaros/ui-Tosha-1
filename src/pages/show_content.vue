<template>
<div>

<div style="position: sticky;top:0; left: 0;max-width: inherit;" >
  <z-button  @click="$router.go(-1)" label="<<" class="mx-2" />
  <z-button  @click="get_api_data()" label="refresh"  class="mx-2" />
  <z-button  @click="edit_mode = !edit_mode" label="edit" class="mx-2" />
  <z-button v-if="edit_mode || modified" class="mx-2 bg-warn"  @click="download_content" label="save" />
</div>

  <h3> {{$route.query.file_name}}</h3>

    <div  class="row px-2" style="min-height:5px">
      <div v_show="loading" class="loader " :class="{loading}">
      </div>
    </div>

  <div class="list_files row px-2" style="_max-width: inherit;">

    <pre v_if="!edit_mode" :contenteditable="edit_mode" id="f_content"  style="white-space:pre-wrap;background-color:#eeeeee;padding: 2px;" v-text="file_content" 
        _input="file_content = $event.target.innerText "
        @blur="file_content = $event.target.innerText "
    />

    <textarea v-if="0" id="f_content" multiple name="content" :rows="lines.length+3" _cols="55"
      style="min-height: 60vh;width:100%" 
      :value="file_content"
      _input="event => text = event.target.value"
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

function get_api_data(){
  loading.value = true
  fetch(`${backendUrl.value}show_content/?file_name=${file_nm}`).then(async req => {
    if (req.ok) {
      edit_mode.value = false
      const res = await req.text()
      //categories.value.push(...res)
      file_content.value = res
      lines.value = res.split("\n")
      modified.value = false
      //console.log('api_data_71: ', file_content.value.slice(0,111))
    }
  }).finally(_=>loading.value=false)
}


onActivated(()=>{
  if  (file_nm === route.query.file_name) return
  file_content.value=null
  file_nm = route.query.file_name
  setTimeout(()=>{
    get_api_data()
  },9)

  const el = document.querySelector("#f_content")
  el.oninput = ()=>  modified.value = true

})

const modified = ref (false)

function download_content(e){
    const form_data = new FormData()
    const el = document.querySelector("#f_content")
    let params = new URLSearchParams(document.location.search)
    let file_name = params.get("file_name")
    const dd =   el.textContent
    let bb = new Blob([dd], {
      type: 'text/plain'
    });

    form_data.append("files", bb )
    const xhr = new XMLHttpRequest()
    xhr.open("PUT", `${backendUrl.value}api/upload/${file_name}`, true)
    //xhr.setRequestHeader("Content-Type", "text/plain");

    xhr.addEventListener("load", ()=>{
      loading.value = false
      modified.value = false
      //window.location.href = "/files"
      //window.history.back()
    });

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) { // запрос завершён
        get_api_data()
      }
    };
    xhr.addEventListener("error", ()=>{
      loading.value = false
      alert("Upload Error!")
    });

    loading.value = true
    xhr.send(dd)

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
pre[contenteditable="true"]{
  background-color: #ffffff !important;
}

</style>


