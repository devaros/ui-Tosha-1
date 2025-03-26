<template>
  <div>
    <standard_det v-if="$route.query?.nm_module" />

    <div v-if="!$route.query?.nm_module" >
      <h3> Standard modules </h3>


      <div class="row px-2" >
        <div class="col-6 col-md-12 px-2 _text-b align-ic justify-cc" v-for="(r) in modules">
          <z-button  @click="set_page(r)" ladge :label="r[1]" >
          </z-button>
        </div>
      </div>

    </div>

  </div>
</template>


<script setup lang="ts">
import {ref, onMounted, onActivated, onDeactivated } from 'vue'
import {useRouter} from 'vue-router'

import LayoutDefault from '/src/components/LayoutDefault.vue'
import ZButton from '/src/components/ZButton.vue'
import {backendUrl} from '/src/components/global_data'
import standard_det from './standard_det.vue'

const modules = ref(null)
let evtSource 
let check_id = 0

const router = useRouter()

function get_api_data(){
  //loading.value = true
  fetch(`${backendUrl.value}api/standard/ls`).then(async req => {
    if (req.ok) {
      //edit_mode.value = false
      const res = await req.json()
      modules.value = res.modules
      //categories.value.push(...res)
      //file_content.value = res
      //lines.value = res.split("\n")
      //modified.value = false
      //console.log('api_data_71: ', file_content.value.slice(0,111))
    }
  }) //.finally(_=>loading.value=false)
}


function get_api_data2(){
    //evtSource.readyState
  //EventSource.CONNECTING = 0; // connecting or reconnecting
  //EventSource.OPEN = 1;       // connected
  //EventSource.CLOSED = 2;     // connection closed
  if (evtSource) evtSource.close()
  evtSource = new EventSource(`${backendUrl.value}api/switches/ls/?check_id=${check_id}`, {
    __withCredentials: true, 
    __heartbeatTimeout: 120000,
  })

  evtSource.onmessage = event => {
    try{
      const res = JSON.parse( event.data)  // .json()
      check_id = event.lastEventId
      //console.log('evtSource_message_22: ', event, res);
      switches.value = res
    }catch(err){
      console.warn('evtSource_message_22: ',  event.data.slice(0,4), event.data, err);
    }
  };

  //message– полученное сообщение, доступно как event.data.
  //open– соединение открыто.
  //error– соединение не может быть установлено, например, сервер вернул статус HTTP 500.

  //evtSource.close();
}

function set_api_state(r){

  const options={method:'put',body:JSON.stringify([{id:r.id,value:r.value}])}

  fetch(`${backendUrl.value}api/switches/set`,options).then(async req => {
    if (req.ok) {
      //const res = await req.json()
      //if (!res) return
      //console.log('api_data_87: ', req)
      //switches.value = res
      //Object.assign( api_data.value, res)
    }
  })
  //setTimeout(get_api_data,17555)
}

function set_page([nm_module, label]){
  router.push({name:'standard',params:{nm_module},query:{nm_module, label}})
}


function refresh(){
  get_api_data()
}

onActivated(()=>{
  get_api_data()
})

onDeactivated(()=>{
  if (evtSource) evtSource.close()
}) 

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
