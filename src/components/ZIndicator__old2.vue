<template>
    <div class="indicator my-2" :class="{digital:val.indicator=='digital'}"> 
      <div v-if="val.indicator=='digital' && !['digital'].includes(val.control)" class="mx-2 digital2" :style="[`background-color: ${!val.value ? '#00cc66':'#114422'} ;`]"> </div>                             
      <div v-else-if="val.indicator=='analog' && (val.min || val.max) && ['right','left'].includes(direction)" class="mx-2 analog horisontal" :class="[val.class, 'dir-'+(val.direction ||'right') ]" >
        <div :style="[`width: ${scale}%;`]"></div>
      </div>
      <div v-else-if="val.indicator=='analog' && (val.min || val.max)" class="mx-2 analog" :class="[val.class, 'dir-'+val.direction ||'right' ]" _style="[]">
        <div :style="[`height: ${scale}%;`]"></div>
      </div>
      <div v-else  class="mx-2 any" :class="[val.class]" _style="[`background-color: ${!value ? '#00cc66':'#114422'} ;`]"> </div>
      <slot name="prepend" />
      <span  class="mx-2">{{val.name}}</span>
      <span v-if="val.indicator=='analog'" class="px-2 value text-b" :class="{modified}" > {{val.value}} {{val.measure}}</span>
      
    </div>
</template>


<script setup lang="ts">

  import { computed, watch, ref} from "vue"
  const modified = ref(false)

  const props = defineProps({
    value: { },
  });

  const val =  computed(()=> props.value)
  const direction = computed(()=> props.value.direction || 'right')

  const scale = computed(()=>{
    const d0 = val.value.max - val.value.min
    return Math.round((val.value.value-val.value.min)*100 / d0)

  })

  watch(()=>val.value.value, ()=>{
    modified.value = true
    setTimeout(()=>modified.value = false, 3222)
  })

</script>

<style _lang="scss" scoped>
.indicator{
  display: inline-flex;
}
.indicator.digital{
  background-color: #00000011;
  border-radius: 5px;
}
.digital2{
  width: 18px;
  height: 18px;
  border-radius: 9px;
  align-self: center;
  _background-image: linear-gradient(to bottom, rgba(255, 255, 255, .2), rgba(255, 255, 255, 0) 40%, rgba(0, 0, 0, .12) 91%, rgba(0, 0, 0, .08));
}
.analog{
  width: 28px;
  height: 32px;
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
.value{
  transition: background-color 3s;
  background-color: #00000011;
  border-radius: 11px;
}
.modified{
  background-color: #ffff00;
}

</style>
