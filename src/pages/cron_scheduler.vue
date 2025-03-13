<template>
  <div>

    <z-button  @click="$router.go(-1)" label="<<" class="mx-2" />
    <z-button  @click="changed=false;refresh()" label="refresh" />

    <div class="row pa-2">
      <div class="col-4 col-sm-6 pa-2 justify-cc" :class="{'bg-warn':api_data.err}">
        UpTime: {{~~(api_data.uptime/60)}}min
      </div>

      <div class="col-4 col-sm-12 pa-2 justify-cc" :class="{'bg-warn':api_data.err}">
        PLC time: {{ get_api_date }}
      </div>
    </div>

    <h3>Cron tab</h3>

    <div class="row pa-md-2" >
      <div class="col-md-12 _col-4 px-2 text-b">
      {{cron_list?.name}}
      </div>
      <div class="col-md-12 _col-8 _px-2">

        <div class="row pa-md-2" >
          <div class="col-md-12 _col-6 _pa-md-2"  style="flex-grow:1;">
            <div class="col-12 px-2" >
              Cron table:
            </div>

            <div class="col-12 pa-2  " v__for="(r,i) in cron_list?.tasks" __style="width: 650px;" style="overflow:auto; _max-width: calc(100vw - 30px);"  >
            <div class=" _mx-2 d-flex_ tab_wrap" v-for="(r,i) in cron_list?.tasks"  :class="{ up: ch_index===i && ch_index>ch_idx_move  , down: ch_index===i && ch_index<ch_idx_move }" >
              <z-button  @click="to_position(i)" :label="ch_index===i?'<>':i+'.'" title="position" :class="{ch_index:ch_index===i}" />
              <z-button :class="[r[0] ? '_bg-positive': 'bg-secondary']" @click="r[0]=!r[0];changed=true" :label="r[0]?'o':'~'" _label="o" />
              <z-button  @click="set_schedule(r)" :label="r[1]" />
              <span class="px-2">{{r[2]}}</span>
              <z-button  @click="set_params(r)" :label="r[3]" />
              <z-button  @click="set_label(r)" :label="r[4]" />
              <z-button  @click="cron_list.tasks.splice(i,1);changed=true" label="-" />
            </div>
            </div>
          </div>

          <div class="col-md-12 _col-6 px-2" style="flex-grow:1;">
            <div class="col-12 pa-2 align-ic" >
              Command's:
              <span class="px-2"> <z-button class="bg-warn" v-if="changed" @click="save" label="Save" /> </span>
            </div>
            <div class="col-12 _px-2 align-ic" v-for="(r,i) in cron_list?.cmd_list">
            {{r}} <z-button  @click="appent_task(r);changed=true" label="+" />
            </div>
          </div>
        </div>

      <pre class="txt-left pa-md-2_ pa-2" style="white-space: break-spaces;">
Schedule string: "* * * * *" as position "mm hh dw dd my" where:
mm - minutes,
hh - hours,
dw - day of week (1-mo, 2-tu, ..., 7-su),
dd - day of month,
my - month of year,
format: every position * may be as any number;
 integer number;
 range of number 2-9;
 list 1,2,3;
 number with delimiter (example: */3 for step every third), range with step throw delimiter 4-20/4 every fourth
      </pre>

      </div>
    </div >

  </div>
</template>


<script setup lang="ts">
import {ref, onMounted, onActivated, onDeactivated, computed, watch} from 'vue'
//import { useRoute} from 'vue-router'
import {api_data} from '/src/components/global_data'


import LayoutDefault from '/src/components/LayoutDefault.vue'
import ZButton from '/src/components/ZButton.vue'
import {backendUrl} from '/src/components/global_data'

const cron_list = ref(null)
let actived_ = null
const changed = ref(false)
const ch_index = ref(null)
const ch_idx_move = ref(undefined)

function get_api_data(){
  if (changed==true) return
  fetch(`${backendUrl}api/cron/ls`).then(async req => {
    if (req.ok) {
      const res = await req.json()
      //if (!res) return
      //console.log('api_data_75: ', res)
      cron_list.value = res
      changed.value = false
      //Object.assign( api_data.value, res)
    } else {
      sys_info.value = []
    }
  }).catch(err=> sys_info.value = [] )
  //setTimeout(get_api_data,17555)
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

function appent_task(cmd){
  cron_list.value.tasks.push([true, "- * * * *", cmd[0], cmd[2], cmd[1]])
}

function set_schedule(task){
  const val = prompt('Input schedule format [* * * * *] ', task[1])
  if (val.trim().split(/\s+/).length==5) {
    task[1] = val
    changed.value = true
  }
}

function set_params(task){
  const val = prompt('Input params ', JSON.stringify(task[3]) )
  if (val!==null) {
    try{
      task[3] = JSON.parse( val)
    }catch{
      task[3] = "params"
    }
    //task[3] =  val
    changed.value = true
  } 
}

function set_label(task){
  const val = prompt('Input label ', task[4] )
  if (val!==null) {
    task[4] = val
    changed.value = true
  }
}

function refresh(){
  get_api_data()
}

onActivated(()=>{
  actived_ = true
  get_api_data()
})
onDeactivated(()=>{actived_ = false})

function save(){

  const options = {method:'put', body: JSON.stringify(cron_list.value.tasks)}

  fetch(`${backendUrl}api/cron/set`, options).then(async req => {
    if (req.ok) {
      get_api_data()
    } else {
      // error!
    }
  }).catch(err=> {} )

}

watch(()=> api_data.value.err, val=>{
    //console.log('api_data.value.err: ==========', val, actived_)
    if (!val && actived_) get_api_data()
})

function to_position(ind){
  if (ch_index.value===null){
    ch_index.value = ind
    return
  }
  if (ch_index.value==ind) {ch_index.value = null; ch_idx_move.value = undefined; return}

  ch_idx_move.value = ind
  setTimeout(()=>{
    cron_list.value.tasks.splice(ind,0, cron_list.value.tasks.splice(ch_index.value,1)[0])
    ch_index.value = null
    changed.value = true
    ch_idx_move.value = undefined
  },455)
}

</script>


<style scoped>
.btn{
  white-space: nowrap;
}
.col-12{
  _max-width: calc(100vw - var(--md-2));
  flex-flow: nowrap;
    overflow: auto;
    flex-direction: column;
    align-items: start;
}

.ch_index{
  background-color: #ffbb44 !important;
}
.tab_wrap{
  white-space: nowrap;
  _transition: all 1.4s;
}

.up, .down{
  transition: all 0.3s;
}
.up{
  transform: translateY(-40px);
  opacity: 0;
}
.down{
  transform: translateY(40px);
  opacity: 0;
}
</style>


<style >
.ch_index > span{
  animation: ani_el867 1s infinite;
}
@keyframes ani_el867{
  0%{
    transform: rotateZ(75deg);
  }
  50%{
    transform: rotateZ(105deg);
  }
  100%{
    transform: rotateZ(75deg);
  }

}
</style>

