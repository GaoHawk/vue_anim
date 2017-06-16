<template>
  <div id="example-1">
    <button @click="show = !show">
      Toggle render
      </button>
     <transition name="slide-fade">
       <p v-if="show">hello</p>
     </transition>
  </div>
</template>
<script>
  export default {
     name:'example-1',
     data(){
        return{
           show: true
        }
     }
  }
</script>
<style>
.slide-fade-enter-active{
  -webkit-transition:all .3s ease;
  -moz-transition:all .3s ease;
  -ms-transition:all .3s ease;
  -o-transition:all .3s ease;
  transition:all .3s ease;
}
.slide-fade-leave-active{
  -webkit-transition: all .8s cubic-bezier(1.0,0.5,0.8,1.0);
  -moz-transition: all .8s cubic-bezier(1.0,0.5,0.8,1.0);
  -ms-transition: all .8s cubic-bezier(1.0,0.5,0.8,1.0);
  -o-transition: all .8s cubic-bezier(1.0,0.5,0.8,1.0);
  transition: all .8s cubic-bezier(1.0,0.5,0.8,1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>
