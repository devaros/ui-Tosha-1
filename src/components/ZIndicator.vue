<template>
  <div class="indicator my-2 pa-1" :class="{digital:val.indicator=='digital'}"> 
      <slot name="prepend" />
      <span  class="mx-2 label">{{val.name}}</span>

      <div v-if="val.indicator=='digital' && !['digital'].includes(val.control)" class="mx-2 digital2" :style="[`background-color: ${val.value ? '#00cc66':'#114422'} ;`]"> </div>
      <div v-else-if="val.indicator=='analog' && (val.min || val.max) && ['right','left'].includes(direction)" class="mx-2 analog horisontal" :class="[val.class, 'dir-'+(val.direction ||'right') ]" >
        <div :style="[`width: ${scale}%;`]"></div>
      </div>
      <div v-else-if="val.indicator=='analog' && (val.min || val.max)" class=" analog vertical" :class="[val.class, 'dir-'+val.direction ||'right' ]" _style="[]">
        <div :style="[`height: ${scale}%;`]"></div>
      </div>
      <div v-else  class="mx-2 any" :class="[val.class]" _style="[`background-color: ${!value ? '#00cc66':'#114422'} ;`]"> </div>

      <span v-if="val.indicator=='analog'" class="px-2 value _control text-b" :class="{modified, control:val.control}" @click.stop="set_value2(val)" > {{val.value}} {{val.measure}}</span>
      <span v-else-if="val.indicator=='digital' && val.text!==undefined " class="px-2 value text" :class="{modified}" > {{val.text}} {{val.measure}}</span>
      
  </div>
</template>


<script setup lang="ts">

import { computed, watch, ref} from "vue"
const emit = defineEmits(['change'])
const modified = ref(false)

const props = defineProps({
  value: { },
  group: { },
});

const val =  computed(()=> props.value)
const direction = computed(()=> props.value.direction || 'right')

const scale = computed(()=>{
  const d0 = val.value.max - val.value.min
  return Math.min(99, Math.max(1, Math.round((val.value.value-val.value.min)*100 / d0)))
})

watch(()=>val.value.value, ()=>{
    modified.value = true
    setTimeout(()=>modified.value = false, 3222)
})

function set_value2(r){
  //if ( !r.control) return
  //console.log("set_value_76: ", r)
  const val = prompt('Input value ', r.value )
  //console.log("set_value_76: ", val)
  if (val!==null && Number(val) && val.length>0) {
    r.value = Number(val)
    emit('change', {r, value:Number(val), group:props.group})
  } else if (val!==null ) {
    r.value = val
    emit('change', {r, value:val, group:props.group})
  } 
}

</script>

<style _lang="scss" scoped>
.indicator{
  display: inline-flex;
  background-color: #e8eeee;
  border-radius: 8px;
}
.indicator.digital{
  background-color: #00000011;
  border-radius: 5px;
}
.digital2{
  width: 19px;
  height: 19px;
  border-radius: 9px;
  align-self: center;
  _background-image: linear-gradient(to bottom, rgba(255, 255, 255, .2), rgba(255, 255, 255, 0) 40%, rgba(0, 0, 0, .12) 91%, rgba(0, 0, 0, .08));
  background-image: radial-gradient(#00dd9966 50%, #00443366);
}
.analog{
  width: 28px;
  height: 52px;
  border-radius: 3px;
  background-color: #2299dd;
   _background-image: linear-gradient(to right,  #003366 40%, #2299dd 50%);
  align-self: center;
  transition: all 1s;
  position: relative;
}
.analog> div{
  transition: all 2s;
  _content: " ";
  left:1px;
  border-radius: 2px;
  bottom:1px;
  _margin:1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background-color: #003366;
  position: absolute;
}
.analog.horisontal{
  width: 48px;
  background-color: #44dddd;
  height: 18px;
  flex-grow: 1;
}
.vertical{
  margin-left: 16px;
  margin-right: 16px;
}
.label{
  flex-grow: 1;
  text-align: start;
}
.value{
  transition: background-color 3s, box-shadow 0.5s;
  _background-color: #00000011;
  border-radius: 9px;
  _flex-grow: 1;
  width: 30%;
  height: 1.8rem;
}
.value.control{
  user-select: none;
  background-color: #00000015;
  box-shadow: 1px 1px 2px 0px #00000000;
}
.value.control:hover{
  box-shadow: 1px 1px 2px 0px #000000ff;
}
.value.control:active, .value.control:focus{
  transition: box-shadow 0.1s;
  box-shadow: 1px 1px 2px 0px #00000000;
}
.modified{
  background-color: #ffff00 !important;
}

</style>
