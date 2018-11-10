<template>
  	<div class="login_page fillcontain">
	  	<transition name="form-fade" mode="in-out">
	  		<section class="form_contianer" >
		  		<div class="manage_tip">
		  			<p>好看名片admin</p>
		  		</div>
		    	<el-form :model="loginForm" :rules="rules" ref="loginForm">
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名"><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
				    	<el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
				  	</el-form-item>
				</el-form>
	  		</section>
	  	</transition>
  	</div>
</template>

<script>
	import {login, getAdminInfo} from '@/api/getData'
	import {mapActions, mapState} from 'vuex'
    import {setCookie} from "../api/cookie";
    import md5 from 'js-md5';
	export default {
	    data(){
			return {
				loginForm: {
					username: '',
					password: '',
                    random10:'',
				},
				rules: {
					username: [
			            { required: true, message: '请输入用户名', trigger: 'blur' },
			        ],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					],
				},
				showLogin: false,
                instance:null,

                targetId:'小伟的father'
			}
		},
		mounted(){

		},
		computed: {

		},
        created(){
	      this.randomWord(false,10)

        },
		methods: {
			async submitForm(formName) {
                console.log( this.loginForm.username,"账号")
                console.log(this.loginForm.password)

                this.$refs[formName].validate(async (valid) => {
					if (valid) {
					    console.log(valid)
						const res = await login({account: this.loginForm.username, password: this.random10 +md5(this.loginForm.password)})
                        console.log(res)
						if (res.result) {
							this.$message({
		                        type: 'success',
		                        message: '登录成功'
		                    });
							console.log(res.result.token)
							setCookie("token",res.result.token,86400)
							this.$router.push('post')
                            setCookie("nickName",res.result.nickName,86400)
						}else{
							this.$message({
		                        type: 'error',
		                        message: '账号密码错误',
		                    });
                            // this.$router.push('vueEdit')
                            // this.$router.push('post')
						}
					} else {
					    console.log(2134)
						this.$notify.error({
							title: '错误',
							message: '请输入正确的用户名密码',
							offset: 100
						});
						return false;
					}
				});
			},
            //生成10位随机数
            randomWord(randomFlag, min, max){
                var str = "",
                    range = min,
                    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                    pos = "";
                // 随机产生
                if(randomFlag){
                    range = Math.round(Math.random() * (max-min)) + min;
                }
                for(var i=0; i<range; i++){
                    pos = Math.round(Math.random() * (arr.length-1));
                    str += arr[pos];
                }
                this.random10 = str

            }
		},
		watch: {
			adminInfo: function (newValue){
				if (newValue.id) {
					this.$message({
                        type: 'success',
                        message: '检测到您之前登录过，将自动登录'
                    });
					this.$router.push('manage')
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../style/mixin';
	.login_page{
		background-color: #6f7180;
	}
	.manage_tip{
		position: absolute;
		width: 100%;
		top: -100px;
		left: 0;
		p{
			font-size: 34px;
			color: #fff;
		}
	}
	.form_contianer{
		.wh(320px, 210px);
		.ctp(320px, 210px);
		padding: 25px;
		border-radius: 5px;
		text-align: center;
		background-color: #fff;
		.submit_btn{
			width: 100%;
			font-size: 16px;
		}
	}
	.tip{
		font-size: 12px;
		color: red;
	}
	.form-fade-enter-active, .form-fade-leave-active {
	  	transition: all 1s;
	}
	.form-fade-enter, .form-fade-leave-active {
	  	transform: translate3d(0, -50px, 0);
	  	opacity: 0;
	}
</style>
