<template>
<div>
  
  <z-button  @click="$router.go(-1)" label="<<" />

  <h2 class="ma-2 "> Network connection</h2>

  <div class="row  px-2 ">
    <div class="list_files_ col-4 col-sm-12 justify-cc" style="padding-top: 8px;">
      Список доступных сетей:
    </div>
    <div class="list_files col-8 col-sm-12">
      <z-button @click="_conn_cou =1;wifi_scan()"  label="scan" :loading="loading_scan" style="width:90px;" />
      

      <div v-for="i in scanned" class="col-12 ma-2">
        <div > {{connected==i[0]?'*':''}}  {{i[0]}} </div>
        <div class="ant mx-2"> <div class="progress" :style="`height:${scale_dbm(i[3])}% ; width:${scale_dbm(i[3])}% ` "> </div> </div>
        <div >
          <a v-if="connected==i[0]" class="cursor-p" @click="wifi_config_delete"> забыть </a> 
          <a v-else class="cursor-p" @click="wifi_config(i[0])"> подключить </a> 
        </div>

      </div>
    </div>
  </div>

</div>
</template>



<script setup lang="ts">
import {ref, onActivated, onDeactivated} from 'vue'
import {backendUrl} from '/src/components/global_data'
import LayoutDefault from '/src/components/LayoutDefault.vue'
import ZButton from '/src/components/ZButton.vue'

const scanned = ref([])
const connected = ref('')
const loading_scan = ref(false)
let _conn_cou = 0
let tt_

function wifi_scan(){
  if (loading_scan.value) return
  loading_scan.value = true
  fetch(`${backendUrl.value}api/net/scan`).then(async req => {
    if (req.ok) {
      const res = await req.json() // .available // .connected
      connected.value = res.connected
      //console.log('api_data_74: ', res)
      scanned.value = scanned.value.filter(r=> (!res.available.find(r2=> r[1]==r2[1])) && ((r[6]+6) > ~~(Date.now()/1000/60)) )
      scanned.value.push(
         ...res.available.map(r=> {r[0] = r[0] || r[1]; r[6] = ~~(Date.now()/1000/60); return r } )
      )
      scanned.value =  scanned.value.sort((a,b)=> (a[3] > b[3]) ? -1 : (a[3] < b[3]) ? 1 : 0 )
    }
  }).finally(()=>{
    loading_scan.value = false
    if (_conn_cou > 3) return
    _conn_cou ++
    tt_ = setTimeout(wifi_scan,(0.5+_conn_cou/3)*60*1000)
  })
}



function wifi_config_delete(){
  if (loading_scan.value) return
  if (confirm("Подтвердите действие - забыть сеть")) {
    loading_scan.value = true
    const options = {method:'delete',}
    fetch(`${backendUrl.value}api/net/config`, options).then(async req => {
      if (req.ok) {
        connected.value=''
      }
    }).finally(()=>{
      loading_scan.value = false
      //wifi_scan()
    })
  }
}

function wifi_config(ssid){
  if (loading_scan.value) return
  const pswd =  prompt(`Введите ключ подключения к сетти ${ssid}`, '')
  if (pswd) {
    loading_scan.value = true
    const options = {method:'post', body: JSON.stringify({ssid, pswd}) }
    fetch(`${backendUrl.value}api/net/config`, options).then(async req => {
      if (req.ok) {
      }
    }).finally(()=>{
      loading_scan.value = false
      wifi_scan()
    })
  }
}

onActivated(()=>{
  wifi_scan()
})

onDeactivated(()=>{
  clearTimeout(tt_)
}) 

function scale_dbm(y){ //-91-20
  return (y+99)*1.8  // Math.min(100, (y[3]+99)*2 )
}

</script>


<style scoped>
.ant{
  width:1.8rem;
  height:1.8rem;
  max-width:1.8rem;
  max-height:1.8rem;
  rotate: -45deg;
  transform: translate(6px, -5px);
  background-color:  #555555aa;
  z-index:22;
  position: relative;
  border-radius: 0% 90% 0% 0%;
}
.ant > .progress{
  border-radius: 0% 100% 0% 0%;
  content: '';
  width:0px;
  height:0px;
  max-width:1.8rem;
  max-height:1.8rem;
  background-color: #33cc66;
  z-index:1;
  position: absolute;
  left:0px;
  bottom:0;
}
</style>
