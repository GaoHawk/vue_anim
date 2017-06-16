<template>

    <div class="login">
          <child ></child>
        <h2 class="title">云课堂手机app</h2>
        <mt-field label="用户名" :state="account_state" placeholder="请输入用户名" v-model="username" v-focus></mt-field>
        <mt-field label="密码" :state="pwd_state" placeholder="请输入密码" type="password" v-model="password" v-focus></mt-field>
        <div class="center">
            <mt-button type="default" size="small" @click.native="clearout">清空</mt-button>
            <mt-button type="primary" size="small" @click.native="logIn">登陆</mt-button>
        </div>
    </div>
</template>
<script>
  import Bus from '../../common/bus';
  import { Indicator } from 'mint-ui';
  import { Toast,Button } from 'mint-ui';
  import Header from './header.vue'


  export default {
     created(){
        Bus.$on('clearState',target =>{
            this.state = target;
            this.account_state = this.state;
            this.pwd_state = this.state;
        })
     },
     data(){
        return {
           username:'',
           password:'',
           account_state:'',
           pwd_state:''
        }
     },
    components:{
       'child':Header
    },
     methods:{
        clearout(){
            this.username = '';
            this.password = '';
            this.account_state = '';
            this.pwd_state = '';
        },
        logIn(){

            Indicator.open(`登录中...`);
            var userId = this.username;
            let userErrMsg = '';
            let pwdErrMsg = '';
            let role = 0;
            if(userId =="" || userId.length !=6 && userId.length !=8 && userId.length !=11 ){
                userErrMsg = '用户登陆id错误'
            }
            if(this.password.length<6){
                pwdErrMsg = '密码不得小于6位'
            }
            if(userId.length ===6 || userId.length ===11){
                role = 1;
            }else if(userId.length ===8){
                role = 2;
            }


            // 前端验证输入合法性
            if(userErrMsg.length>0 || pwdErrMsg.length>0){
                var errMsg = userErrMsg?userErrMsg:'' + `_` + pwdErrMsg;
                if(userErrMsg.length>0){
                    this.account_state = 'error';
                }
                if(pwdErrMsg.length>0){
                    this.pwd_state = 'error';
                }
                Toast({
                    message: errMsg,
                    position: 'bottom',
                    duration: 2500
                });
                setTimeout(function(){
                    Indicator.close();
                },1500)
                return;
            }

            // 模拟本地登陆效果
            // if(userId == `236942` && this.password == `123456`){
            //     let store = this.$store;
            //     let router = this.$router;
            //     setTimeout(function(){
            //         Indicator.close();
            //         store.commit('ROUT_PATH','/home/yearIndex');
            //         store.commit('SET_PREPATH','/');
            //         store.commit('SET_HOME',false);
            //         sessionStorage.showHome = false;
            //         window.sessionStorage.userId = userId;
            //         console.log(sessionStorage);
            //     },1500)
            //     console.log(this);

            // }else{

            //     Toast({
            //         message: `用户名或密码错误`,
            //         position: 'bottom',
            //         duration: 2500
            //     });

            //     setTimeout(function(){
            //         Indicator.close();
            //     },1500)
            // }
            this.$http.get('http://120.24.72.106:8081/appdesk/login',{
                params: {
                    user_id: userId,
                    role:role,
                    password:this.password,
                }
            }).then(response => {
                console.log(response.data.data);
                let store = this.$store;
                let router = this.$router;
                this.$store.commit('SET_U_SESSION',response.data.data.session);
                this.$store.commit('SET_COMMENTS_UID',userId);
                setTimeout(function(){
                    Indicator.close();
                    store.commit('ROUT_PATH','/home/yearIndex');
                    store.commit('SET_PREPATH','/');
                    store.commit('SET_HOME',false);
                    sessionStorage.showHome = false;
                    window.sessionStorage.userId = userId;
                    console.log(sessionStorage);
                },1500)
            }, response => {

                console.log(response)
                if(response){
                    Toast({
                        message: `用户名或密码错误`,
                        position: 'bottom',
                        duration: 2500
                    });
                }
                setTimeout(function(){
                    Indicator.close();
                },1500)
            })

        }
     },
    activated(){

    }
  }
</script>
<style >
.center{
    margin-top:10px;
    text-align:center;
}
.login .title{
    text-align:center;
    margin-top:60px;
}
</style>
