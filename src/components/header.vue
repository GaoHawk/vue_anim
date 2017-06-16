<template>
  <div id="header">
   <mt-header fixed title="基本信息" style="background:#fff;color:#333;height:3.2rem;line-height:3.2rem;border-bottom:0.1rem solid #ddd;"></mt-header>
  </div>
</template>
<script>


export default {
     name:'header',
     data(){
        return {
           username:'',
           password:'',
           account_state:'',
           pwd_state:''
        }
     }
  }
</script>
<style>

</style>

