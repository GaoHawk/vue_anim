<template>
  <div id="cityList">
    <mt-index-list v-for="items in cities" height=auto>
      <mt-index-section :index="items.Name" >
        <div v-for="item in items.CityList">
              <mt-cell :title="item.Name"  @click.native.capture="setCity(item.Name)"></mt-cell>
        </div>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>
<script>
export default {

  name:'cityList',
  methods: {
    onValuesChange(picker,values){
      // if(values[0] > values[1]){
      //   picker.setSlotValue(1,values[0]);
      // }
      if(!(this.provinceOn)) return;
      console.log(values);
      this.province = values[0];
      this.$store.commit('SET_PROVINCE',values[0]);
    },
    setCity:function(city){
       console.log(city);
       this.$store.commit('SET_CITY',city);
       this.$store.commit('ROUT_PATH','/');
       this.$store.commit('SET_CITY_ON',false);
       this.$store.commit('SET_PR_ON',false);
    }
  },
  data(){
    return {
      cities:'',
    }
  },
  activated(){
    let cityList,
        cityArr = [];
    if(localStorage.cityList || localStorage.length>0){
      cityList = JSON.parse(localStorage.cityList);
      console.log(cityList);
      if(!(this.cities.length>0)){
          cityList.sort(function (a, b) {
              return a.FullPin > b.FullPin ? 1 : -1;
          });
          cityList.forEach(function(item){
            switch(item.Name){
              case '北京市':
              item.CityList = [
                {
                  Code:"00101",
                  FullPin:'beijing',
                  Name:'北京市'
                }
              ];
              cityArr.push(item);
              break;
              case '天津市':
               item.CityList = [{
                 Code:'00103',
                 FullPin:'tianjin',
                 Name:'天津市'
               }];
               cityArr.push(item);
              break;
              case '重庆市':
               item.CityList = [{
                 Code:'00104',
                 FullPin:'chongqing',
                 Name:'重庆市'
               }];
               cityArr.push(item);
              break;
              case '上海市':
               item.CityList = [{
                 Code:'00102',
                 FullPin:'shanghai',
                 Name:'上海市'
               }];
               cityArr.push(item);
              break;
              default:
              cityArr.push(item);
              break;
            }
          })
          console.log(cityArr);
          this.cities = cityArr;
      }
    }
  }
}
</script>
<style>
.mint-indexlist-nav{
  display: none;
  /*max-height: 5%!important;*/
}
</style>
