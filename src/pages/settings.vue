<template>
  <div>

    <z-button  @click="$router.go(-1)" label="<<" class="mx-2" />
    <z-button  @click="refresh" label="refresh" />

    <h3>Settings - settings</h3>

    <div class="row pa-2">
      <div class="col-3 col-sm-6 pa-2 justify-cc" :class="{'bg-warn':api_data.err}">
        PLC time: {{ get_api_date }}
      </div>
      <div class="col-3 col-sm-6 pa-2 justify-cc" :class="{'bg-warn':api_data.err}">Free mem: {{~~(api_data.mem_free/100)/10}}k</div>

      <div class="col-3 col-sm-6 pa-2 justify-cc" :class="{'bg-warn':api_data.err}">UpTime: {{~~(api_data.uptime/60)}}min</div>

      <div class="col-3 col-sm-6 pa-2 justify-cc" :class="{'bg-warn':api_data.err}">CPU load: {{~~(api_data.load*100+1)}}%</div>

    </div>

    <div class="row pa-2" v-for="(r,i) in sys_info">
      <div class="col-md-12 _col-4 px-2 _text-b">
      Page in dev mode

      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import {ref, onMounted, onActivated, onDeactivated, computed, watch} from 'vue'
//import { useRoute} from 'vue-router'
import {api_data} from '/src/components/global_data'


import LayoutDefault from '/src/components/LayoutDefault.vue'
import ZButton from '/src/components/ZButton.vue'
import {backendUrl} from '/src/components/global_data'

const sys_info = ref(null)
let actived_ = null

function get_api_data(){

  fetch(`${backendUrl}api/status`).then(async req => {
    if (req.ok) {
      const res = await req.json()
      //if (!res) return
      //console.log('api_data_75: ', res)
      sys_info.value = res
      //Object.assign( api_data.value, res)
    } else {
      sys_info.value = []
    }
  }).catch(err=> sys_info.value = [] )
}

const get_api_date = computed(()=>{
    //console.log('api_data: ', api_data.value, 2)
    return api_data.value?.datetime && new Date(api_data.value.datetime ).toISOString().slice(8,16).replace('T',' ')
  }
)

function uptime(val){
  const dd = api_data.uptime/60/60/24, hh = api_data.uptime/60/60, mm = api_data.uptime/60
  return  api_data.uptime/60 
}


function refresh(){
  get_api_data()
}

onActivated(()=>{
  actived_ = true
  get_api_data()
})
onDeactivated(()=>{actived_ = false})

watch(()=> api_data.value.err, val=>{
    //console.log('api_data.value.err: ==========', val, actived_)
    if (!val && actived_) get_api_data()
})

</script>
