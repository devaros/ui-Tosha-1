<template>
    <div class="indicator my-2" :class="module_class" >{{max}}=
      <div v-if="type=='digital'" class="mx-2 " :class="[module_class,type]" :style="[`background-color: ${!value ? '#00cc66':'#114422'} ;`]"> </div>
      <div v-else-if="type=='analog' && max" class="mx-2 " :class="[module_class, type]" :style="[` background-image: linear-gradient(to ${direction},  #003366 ${value}%, #2299dd ${value}%);`]"> </div>
      <div v-else  class="mx-2 any" :class="module_class" _style="[`background-color: ${!value ? '#00cc66':'#114422'} ;`]"> </div>
      <slot name="prepend" />
      <span  class="mx-2">{{label}}</span>
      <span v-if="type=='analog'" class="mx-2" :class="{min, max}" > {{value}} {{measure}}</span>
      
    </div>
</template>


<script setup lang="ts">

  //import { defineProps } from "vue"

  const props = defineProps({
    //to: { type: [Object, String], required: false },
    type: {type: [String], },
    label: { },
    value: { },
    max: {type: Number },
    min: {type: Number },
    direction: {type: [String], default:'right'},
    module_class: {},
    measure: {type: [String]},
    ladge: { type: Boolean, default: false},
  });

</script>

<style _lang="scss" scoped>
.indicator{
  display: inline-flex;
}
.digital{
  width: 18px;
  height: 18px;
  border-radius: 9px;
  align-self: center;
  _background-image: linear-gradient(to bottom, rgba(255, 255, 255, .2), rgba(255, 255, 255, 0) 40%, rgba(0, 0, 0, .12) 91%, rgba(0, 0, 0, .08));
}
.analog{
  width: 18px;
  height: 18px;
  background-color: #;
  align-self: center;
  _background-image: linear-gradient(to bottom, rgba(255, 255, 255, .2), rgba(255, 255, 255, 0) 40%, rgba(0, 0, 0, .12) 91%, rgba(0, 0, 0, .08));
}
.ladge{
    min-height: 3rem;
    min-width: 120px;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, .2), rgba(255, 255, 255, 0) 40%, rgba(0, 0, 0, .12) 91%, rgba(0, 0, 0, .08));
}
.btn:hover{
    background-color: #fff9d9;
    _box-shadow: 1.0px 1.0px 3.0px #00000099;
    _transition: all 0s ease;
    _transform: scaleX(1.02);
}
.btn:active, .btn:focus{
    background-color: #ffbb77;
    box-shadow: 1.0px 1.0px 1.0px #00000055;
    transition: all 0s ease;
}
</style>
