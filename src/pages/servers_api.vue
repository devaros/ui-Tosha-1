<template>
  <div>

    <z-button  @click="$router.go(-1)" label="<<" class="mx-2" />
    <h3>Servers REST API</h3>
    <h5>current host: {{current_host}}</h5>


    <div class="row px-2" >
      <div class="col-6 col-md-12 px-2 _text-b align-ic justify-cc" v-for="(r) in servers_list">
        <z-button  @click="select_host(r)" ladge :label="r?.name || 'switch'" >
          <template v-slot:prepend="">
          <div  class="lamp" :class="{on:r.state, off:r.state===false}" _label="switch" ></div>
          </template >

        </z-button>
      </div>
    </div>


  </div>
</template>


<script setup lang="ts">
import {ref, onMounted, onActivated } from 'vue'
import { useRoute} from 'vue-router'

import LayoutDefault from '/src/components/LayoutDefault.vue'
import ZButton from '/src/components/ZButton.vue'
import {backendUrl} from '/src/components/global_data'

const route = useRoute()
const switches = ref(null)
let evtSource 
let check_id = 0
const current_host = ref(backendUrl)

const servers_list = ref([
  {name:"main-this '/'", host:"/", state:""},
  {name:"PLC- reserv .1.108", host:"http://192.168.1.108/", state:""},
  {name:"PLC-holl-2 .5.120", host:"http://192.168.5.120/", state:""},
  {name:"PLC-pole-3 .5.111", host:"http://192.168.5.111/", state:""},
  {name:"PLC-wirpool-4 .1.108", host:"http://192.168.1.108/", state:""},
])


//console.log('api_data_88: ', dgram)
 

let tt_ = null

function ping_servers(){
  if (route.name != 'servers_api') return
  servers_list.value.forEach ((r,i)=>{
    setTimeout(()=>{
      fetch(`${r.host}ping`).then(async req => {
      //console.log('api_data_87: ', req)
        if (req.ok ) { // && req.type==='basic'
          const res = await req.text()
          //console.log('api_data_87: ', req, res)
          if (res.search('pong')===0) r.state=true
          else r.state=false
        } else {
          r.state=false
        }
      }).catch(err=>r.state=false)
    },i*300)
  })
  tt_ = setTimeout(ping_servers,737*1000)
}



function refresh(){
  get_api_data()
}

onActivated(()=>{
  //get_api_data()
  clearTimeout(tt_)
  ping_servers()
})

function select_host(srv){
  backendUrl.value = srv.host
  //backendUrl.value = localStorage.getItem('current_host') 
  localStorage.setItem('current_host', backendUrl.value )
} 

</script>

<style>
.lamp{
  width:16px;
  height:16px;
  background: #aaaaaa;
  align-self: center;
  margin: 0 6px;
}
.lamp.on{
  background: #00cc00;
}
.lamp.off{
  background: #446666;
}

.btn .lamp{
    box-shadow: inset 1px 1px 4px 1px #3338;
    border-radius: 9px;
}

</style>
