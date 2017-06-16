<template>
<div id="cpicker">
  <h4 class="hotCity">热门城市: <span @click="getAllCity">查看所有城市</span></h4>
  <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
  <p class="page-picker-desc">你选择的城市:{{ city }}</p>
  <mt-button size="small" type="primary" style="float:right;margin-right:10px;"
    @click="closePanel()"
  >确定</mt-button>
</div>
</template>
<script>
import quote from '../../common/comm.js'
import { mapState } from 'vuex'
export default {
  computed:{
     ...mapState({
        cityOn:state => state.cityOn,
     })
  },
  methods: {
    onValuesChange(picker,values){
      // if(values[0] > values[1]){
      //   picker.setSlotValue(1,values[0]);
      // }

      if(!(this.cityOn)) return;
      console.log(values);
      this.city = values[0];
      this.$store.commit('SET_CITY',values[0]);
    },
    closePanel:function(){
      this.$store.commit('SET_CITY_ON',false);
    },
    getAllCity:function(){
      this.$store.commit('ROUT_PATH','cityList');
    }
  },
  data(){
    return {
      city:'',
      codeArr:[],
      slots:[
        {
          flex: 1,
          values: '',
          className: 'slot1',
        }
      ]
    }
  }
}
</script>
<style>
.page-picker-desc{
  margin:10px 0 50px;
  display: inline-block;
}
h4.hotCity{
color:#ef4f4f;margin-top:.5rem;margin-bottom:.5rem;
}
.hotCity span{
  font-size: .9rem;
  color:#888;
  float: right;
}
.hotCity span::after{
  clear: both;
}
</style>
