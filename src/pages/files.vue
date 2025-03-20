<template>
<div>
  <z-button  v-if="files.find(r=>r[0]=='/')" @click="to_view('/',16384)" label="/" class="mx-2" /> 
  <z-button  v-if="files.find(r=>r[0]=='..')" @click="to_view('..',16384)" label="<<" class="mx-2" /> 
  <z-button  @click="get_api_data()" label="refresh"  class="mx-2" />
  <z-button  _click="set_params(r)" label="upload"  class="mx-2" />

  <h3>Current dir: {{currdir}}</h3>

    <div  class="row px-2" style="min-height:5px">
      <div v_if="loading" class="loader " :class="{loading}">
      </div>
    </div>

  <div class="list_files row">
    <div v-for="r in files" class="col-4 col-md-6 col-sm-12 align-ic px-2">
     <span class="file_nm" :class="{folder:r[1]==16384}" @click="to_view(r[0],r[1])">{{r[0]}}</span>
     <span>
     <z-button _click="scan" @click="delete_file(r[0])" label="x" />
     </span>

    </div>

  </div>


    <div class="row pa-2 " style="white-space: break-spaces;">
      <div class="col-3 col-md-4 col-sm-6 ">
        total: <span class="text-b"> {{~~(stats.total/100)/10}} K</span>
      </div >
      <div class="col-3 col-md-4 col-sm-6">
        free: <span class="text-b">  {{~~(stats.free/100)/10}} K</span>
      </div >
      <div class="col-3 col-md-4 col-sm-6">
        used: <span class="text-b"> {{~~(stats.used/100)/10}} K</span>
      </div >
    </div >

</div>
</template>

<script setup lang="ts">
import {ref, onMounted, onActivated} from 'vue'
import {useRouter} from 'vue-router'
import LayoutDefault from '/src/components/LayoutDefault.vue'
import ZButton from '/src/components/ZButton.vue'
import {backendUrl} from '/src/components/global_data'

const files = ref([])
const stats = ref({used:null,free:null,total:null})
const currdir = ref(null)
//const route = useRoute()
const router = useRouter()
const loading = ref(false)
let fullPath = null

function get_api_data(chdir=''){
  loading.value = true
  fetch(`${backendUrl.value}api/ls/${chdir}`).then(async req => {
    if (req.ok) {
      const res: never[] = await req.json()
      if (!res) return
      files.value = res.files
      stats.value.free = res.free
      stats.value.total = res.total
      stats.value.used = res.used
      currdir.value = res.currdir
      //console.log('api_data_74: ', files.value)
    }
  }).finally(()=>loading.value = false)
}

function delete_file(file_nm=''){

  if (confirm("Готовы удалить этот файл или папку?")) {
    fetch(`${backendUrl.value}api/delete/${file_nm}`,{method:'delete'}).then(async req => {
      if (req.ok) {
        get_api_data()
      } else alert('Ошибка, что-то пошло не так...')
    }).catch(err=> alert('Ошибка, что-то пошло не так...'))
  }
}


function to_view(file_nm, f_type){
  const is_dir =  (f_type === 16384)
  const is_file =  (f_type === 32768)
  if  (f_type === 16384) {  // is_dir
    get_api_data(`?chdir=${file_nm}`)
  }
  if  (f_type === 32768) {  // is_dir
    router.push({name:'show_content',query:{file_name:file_nm}})
  }
}

onActivated(()=>{
  //console.log('api_data_56: ', route)
  //if (fullPath === route.fullPath) return
  setTimeout(()=>{
    get_api_data()
  },9)
})

</script>

<style scoped>
.list_files{
  text-align: left;
  overflow: auto;
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
  transition: all 1s;
}
</style>


