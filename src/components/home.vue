<template>
   <div id="homeindex">
     <child prof="title"></child>
    <mt-field label="车牌号" placeholder="请输入车牌号"  v-model="carNumber" :style="inputStyle" class="carNumber" :readonly="readonly">
      <div >
        <input type="text" placeholder="省份" :style="secondInputStyle" v-model="province" @click="getProvince()" readonly="true">
      </div>
    </mt-field>
    <mt-field label="投保城市" placeholder="请选择投保城市" v-model="city" :style="inputStyle" @click.native.capture="getCity()"  :readonly="true"></mt-field>
    <mt-field label="车主姓名" placeholder="请输入姓名"  :style="inputStyle" v-model="username"></mt-field>
    <mt-field label="联系手机" placeholder="请输入手机号" type="tel" :style="inputStyle" v-model="phone">

    </mt-field>
    <mt-button size="normal" type="primary" style="float:right;margin-right:10px;"
    @click="next()"
  >下一步</mt-button>
    <label class="checkbox" @click="newCar()">
      <i class="reCheck"></i>
      新车
    </label>
    <pickUp style="margin-top:7rem;" v-show="provinceOn" ref="picker"></pickUp>
    <city-picker style="margin-top:5.5rem" v-show="cityOn" ref="city_picker"></city-picker>
   </div>
</template>
<script>
import Header from './header'
import picker from './picker'
import cpicker from './cityPicker'
import { mapState } from 'vuex'
import  quote  from '../../common/comm.js'
import insInfo from '../../common/insInfo.js'
  import { Indicator } from 'mint-ui';
  import { Toast } from 'mint-ui';
export default {
     beforeCreate(){
        let _curl = quote.requrl + "/insuredbasedata?action=InsuredCityQuery";
        let cityList = [];
        if(localStorage.cityList){
          cityList = JSON.parse(localStorage.cityList);
          console.log(cityList);
          // localStorage.removeItem("cityList");
        }else{
          console.log(cityList);
          this.$http({
            method: 'post',
            url:_curl,
            data:{
              PartnerId:insInfo.insData.PartnerId
            }
          }).then(response => {
              console.log(response.data.data);
              var result = response.data.data;
              localStorage.cityList = JSON.stringify(result);
              let arr = [];
              for(let i =0;i<result.length;i++){
                arr.push(result[i].Name);
                for(let j=0;j<result[i].CityList.length;j++){
                  arr.push(result[i].CityList[j].Name);
                }
              }

          }, response => {

              console.log(response)
          })
        }

     },
     name:'home',
     computed:{
        ...mapState({
          province:state => state.province,
          provinceOn:state => state.provinceOn,
          cityOn:state => state.cityOn,
          city:state => state.city
        })
     },
     components:{
        'child':Header,
        pickUp:picker,
        cityPicker:cpicker
     },
     data(){
        return {
           carNumber:'',
           readonly:false,
           username:'',
           phone:'',
           inputStyle:{
             borderRadius:'0.5rem',
             marginBottom:'1rem',
             border:'0.08rem solid #e5e5e5',
           },
           secondInputStyle:{
             border:'0px',
             width:'45px',
             position:'absolute',
             right:'7.8rem',
             bottom:'-10px',
             fontSize:'1rem',
             outline:'beige'
           }

        }
     },
     methods:{
       newCar:function(){
         let label = document.querySelector('.checkbox .reCheck');
         let className = label.getAttribute('class');
         let pos =  className.indexOf('checked');
         if(pos<0){
          label.setAttribute('class','reCheck checked');
          this.readonly = true;
          this.carNumber = "新车"
         }else{
           label.setAttribute('class','reCheck');
           this.readonly = false;
           this.carNumber = '';
         }
       },
       getProvince:function(){
          this.$store.commit('SET_PR_ON',true);
          this.$store.commit('SET_CITY_ON',false);
          this.$refs.picker.slots[0].values = quote.$abbList;
       },
       setCityPicker:function(cityList){
          this.$store.commit('SET_CITY_ON',true);
              var hotCityList = [],
                  tempArr = [],
                  hlist = [],
                  dicCode = quote.$DicHotCity;
              cityList.sort(function (a, b) {
                  return a.FullPin > b.FullPin ? 1 : -1;
              });
              cityList.forEach(function (pro) {
                  pro.show = false;
                  var item = dicCode[pro.Code];
                  if (!item) return;
                  if (!item.length) {
                      hlist.push(pro);
                      return;
                  }
                  pro.CityList.forEach(function (city) {
                      item.forEach(function (dcode) {
                          if (city.Code == dcode) {
                              hlist.push(city);
                          }
                      })
                  })
              })
              var clist = function (item) {
                  tempArr.push(item);
              };
              if (hlist.length) {
                  hlist.sort(function (a, b) {
                      return a.Code > b.Code ? 1 : -1;
                  });
                  hlist.forEach(function (item) {
                      clist(item);
                  })

                  if (tempArr.length) {
                      hotCityList.push(tempArr);
                  }
              }
              console.log(tempArr);
              // 设置热门城市选择
              let codeArr = [],
                  cities = [];
              for(let i =0;i<tempArr.length;i++){
                cities.push(tempArr[i].Name);
                codeArr.push(tempArr[i].Code);
              }
              this.$refs.city_picker.slots[0].values = cities;
              this.$refs.city_picker.codeArr = codeArr;
       },
       getCity:function(){
         this.$store.commit('SET_PR_ON',false);
          var vm = this;
          let cityList;
          if (!(localStorage.cityList) || localStorage.cityList.length == 0) {
              Indicator.open(`加载中...`);
              setTimeout(function(){
                  Indicator.close();
                  if(!(localStorage.cityList) || localStorage.cityList.length == 0){
                      Toast({
                          message: '加载失败',
                          position: 'bottom',
                          duration: 2000
                      });
                      return;
                  }else{
                    cityList = JSON.parse(localStorage.cityList);
                    vm.setCityPicker(cityList);
                  }
              },2200)
          }else{
            cityList = JSON.parse(localStorage.cityList);
            vm.setCityPicker(cityList);
          }
       },
      //  下一步车辆信息
       next:function(){

       }
     }
  }
</script>
<style>
  #homeindex{
    margin-top: 5rem;
  }
  .mint-cell-wrapper .mint-cell-value input{
    text-align: right;
  }
  .carNumber{
    width: 80%;
  }
  .checkbox{
    position: fixed;
    right:1rem;
    top: 4.5rem;
    font-size:1rem;
    color:#666;
    line-height: 4rem;
    padding-left: 0;
  }
  .check .reCheck{
    margin-right:0.5rem;
  }
  .reCheck{
    display: inline-block;
    position:relative;
    vertical-align:middle;
  }
  .reCheck::after{
    content: "";
    display: block;
    width:1.6rem;
    height:1.6rem;
    border-radius:0.5rem;
    border:0.1rem solid #17c3e5;
    background:none;
  }
  .reCheck.checked::before{
    content:'';
    display: block;
    position:absolute;
    width: 1.5rem;
    height:1.5rem;
    background: url(../assets/checked.png) no-repeat;
    background-size: cover;
  }
</style>

