import Vue from 'vue'
import Vuex from 'vuex'
import  router  from '../router'

const debug = process.env.NODE_ENV !== 'production'
console.log(router);
Vue.use(Vuex)
Vue.config.debug = debug;

export default new Vuex.Store({

  state: {
    prevPath:'',
    path:'',
    title: '',
    province:'',
    provinceOn:false,
    city:'',
    cityOn:false,
    slotIndex:0,
  },
  actions: {
    //控制路由状态
    setRouter({commit},path){
       commit('ROUT_PATH',path)
    },
    setNewTitle ({commit}, msg) {
      commit('NEW_TITLE', msg)
    },
    setProvince({commit},msg){
      commit('SET_PROVINCE',msg)
    },
    setCity({commit},msg){
      commit(('SET_CITY'),msg)
    },
    setProvinceOn({coommit},bl){
      commit('SET_PR_ON',bl)
    },
    setCityOn({commit},bl){
      commit('SET_CITY_ON',bl);
    },
    setSlotIndex({commit},num){
      commit('SET_SLOTINDEX',num);
    }

  },
  mutations: {
    ROUT_PATH(state,path){
       router.push({path:path })
       state.path = path;
    },
    NEW_TITLE (state, msg) {
      state.title = msg
    },
    SET_PROVINCE(state,msg){
      state.province = msg
    },
    SET_CITY(state,msg){
      state.city = msg;
    },
    SET_PR_ON(state,bl){
      state.provinceOn = bl
    },
    SET_CITY_ON(state,bl){
      state.cityOn = bl
    },
    SET_SLOTINDEX(state,num){
      state.slotIndex = num;
    }

  },

  strict: debug

})
