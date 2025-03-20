<template>
  <div class="wrapper">


<div class="d-flex_">

  <div><z-button ladge to="/network" label="network" /></div>
  <div><z-button ladge to="/files" label="files" /></div>
  <div><z-button ladge to="/info" label="info" /></div>

  <div><z-button ladge to="/switches" label="switches" /></div>
  <div><z-button ladge to="/cron_scheduler" label="scheduler" /></div>

  <div><z-button ladge to="/servers_api" label="servers-api list" /></div>

  <div><z-button ladge to="/settings" label="settings" /></div>

</div>

<!--HelloWorld/-->

  </div>
</template>


<script setup lang="ts">
  import { defineComponent } from 'vue'
  
  import LayoutDefault from '/src/components/LayoutDefault.vue'
  import ZButton from '/src/components/ZButton.vue'

//export default defineComponent({
//  components:{ZButton}

//import { ref } from 'vue'

//defineProps<{ msg: string }>()

//const count = ref(0)
</script>


<style scoped>
.logo{
  max-width:240px;
}
.btn{
  width:250px;
  _background-image: linear-gradient(to bottom, rgba(255, 255, 255, .2), rgba(255, 255, 255, 0) 40%, rgba(0, 0, 0, .12) 61%, rgba(0, 0, 0, .08));
}
</style>