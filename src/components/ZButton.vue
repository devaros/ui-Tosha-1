<template>
  <template v-if="to" >
    <router-link class="btn my-2 gggg  _mx-auto" :class="{ladge:ladge}" :to="to">
      {{label}}
    </router-link>
  </template>
  <template v-else >
    <a class="btn my-2  _mx-auto" :class="{ladge:ladge}" _to="to">
      <slot name="prepend" />
      <img v-if="loading" src="/assets2/ios_spin.svg" />
      <span v-else class="mx-2" style="    flex-grow: 1;">{{label}}</span>
    </a>
  </template>
</template>


<script setup lang="ts">

  //import { defineProps } from "vue"

  const props = defineProps({
    to: { type: [Object, String], required: false },
    label: { },
    ladge: { type: Boolean, default: false},
    loading: { type: Boolean, default: false},
  });

</script>

<style _lang="scss" scoped>
.btn{
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0);
    _display: inline-block;
    _background-color: #ffeebb;
    background-color: #eeeeee;
    border-radius: 22px;
    padding-left: 8px;
    padding-right: 8px;
    margin-left: 2px;
    margin-right: 2px;
    _align-content: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    text-transform: uppercase;
    box-shadow: 2.0px 2.0px 3.0px #000000dd;
    transition: all 0.7s ease;
    cursor: pointer;
    height: 1.8rem;
    user-select: none;
}
.btn > img{
    height: 1.5rem;
}
.ladge{
    min-height: 3rem;
    min-width: 120px;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, .2), rgba(255, 255, 255, 0) 40%, rgba(0, 0, 0, .12) 91%, rgba(0, 0, 0, .08));
}
.ladge > img{
    height: 2.2rem;
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
