<template>
  <div id="index">
   <router-link to="/anim1">Go to A1</router-link>
   <router-link to="/anim2">GO to A2</router-link>
   <router-link to="/anim3">Go to A3</router-link>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      show:true,
    }
  }
}
</script>
