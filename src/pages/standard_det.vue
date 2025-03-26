<template>
  <div>

    <z-button  @click="$router.go(-1)" label="<<" class="mx-2" />
    <h3> {{label_module}} </h3>

    <div class="row px-2" >
      <div class="col-4 col-md-6 col-sm-12  px-2 pa-md-2 _text-b align-ic justify-cc" v-for="(r) in controls">

        <z-indicator v-if="r.indicator!='digital' || !['digital'].includes(r.control)" :value="r" @click="set_page(r)" style="flex-grow: 2;" > {{r.name}}
        </z-indicator>
        <z-button v-if="['digital'].includes(r.control)" _class="ma-md-2" @click="set_api_state(r, !r.value)" style="flex-grow: 1;" ladge :label="r.name" > *
          <template v-slot:prepend="" v-if="r.indicator=='digital'">
          <div  class="lamp" :class="{on:r.value===1, off:r.value===0}" _label="switch" ></div>
          </template >
        </z-button>

        
      </div>
    </div>

  </div>
</template>


<script setup lang="ts">
import {ref, onMounted, onActivated, onDeactivated, watch, onUnmounted } from 'vue'
import {useRoute} from 'vue-router'

import LayoutDefault from '/src/components/LayoutDefault.vue'
import ZButton from '/src/components/ZButton.vue'
import ZIndicator from '/src/components/ZIndicator.vue'
import {backendUrl} from '/src/components/global_data'

const controls = ref(null)
let evtSource 
let check_id = 0

const route = useRoute()
const nm_module = ref(null)
const label_module = ref(null)

function get_api_data2(){
  //loading.value = true
  nm_module.value = route.query?.nm_module
  fetch(`${backendUrl.value}api/standard/${nm_module.value}`).then(async req => {
    if (req.ok) {
      //edit_mode.value = false
      const res = await req.json()
      nm_module.value = res.data.name
      label_module.value = res.data.label
      controls.value = res.data.data
      //categories.value.push(...res)
      //file_content.value = res
      //lines.value = res.split("\n")
      //modified.value = false
      //console.log('api_data_71: ', file_content.value.slice(0,111))
    }
  }) //.finally(_=>loading.value=false)
}


function get_api_data(){
    //evtSource.readyState
  //EventSource.CONNECTING = 0; // connecting or reconnecting
  //EventSource.OPEN = 1;       // connected
  //EventSource.CLOSED = 2;     // connection closed
  if (evtSource) evtSource.close()
  //nm_module.value = route.query?.nm_module

  evtSource = new EventSource(`${backendUrl.value}api/standard/${nm_module.value}`, {
    __withCredentials: true, 
    __heartbeatTimeout: 120000,
  })

  evtSource.onmessage = event => {
    try{
      const res = JSON.parse( event.data)  // .json()
      check_id = event.lastEventId
      //console.log('evtSource_message_22: ', event, res);
      //switches.value = res
      nm_module.value = res.name
      label_module.value = res.label
      controls.value = res.data

    }catch(err){
      console.warn('evtSource_message_22: ',  event.data.slice(0,4), event.data, err);
    }
  };

  //message– полученное сообщение, доступно как event.data.
  //open– соединение открыто.
  //error– соединение не может быть установлено, например, сервер вернул статус HTTP 500.

  //evtSource.close();
}

function set_api_state(r, val){
  const options={method:'put',body:JSON.stringify([{id:r.id,value:val}])}
  fetch(`${backendUrl.value}api/standard/set/${nm_module.value}`,options).then(async req => {
    if (req.ok) {
    }
  })
}



function refresh(){
  get_api_data()
}

//  console.log('onSetup_28: ',  )

watch(()=>route.query?.nm_module, val=>{
    console.log('onWatch_29: ', val )
  if (val && val !== nm_module.value) {
    if (evtSource) evtSource.close()
    get_api_data()
  }

})

onMounted(()=>{
  nm_module.value = route.query?.nm_module
  get_api_data()
})

onUnmounted(()=>{
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
