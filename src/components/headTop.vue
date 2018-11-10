<template>
    <div class="header_container" >
        <div class="topLogo" >
            好看名片
        </div>
                <div class="user noselect">
                        <div slot="reference" style="display: flex;align-items: center"><img class="head" src="../assets/img/0912切图/img_boy3006@2x.png">
                            <div class="name">管理员</div>
                            <img class="arrow" src="../assets/img/btn_down@2x.png"></div>
                </div>
            </div>
</template>

<script>
	import {signout} from '@/api/getData'
	import {baseImgPath} from '@/config/env'
	import {mapActions, mapState} from 'vuex'
    import {getCookie} from "../api/cookie";

    export default {
    	data(){
    		return {
    			baseImgPath,
                nickName:"",
                screenWidth: document.body.clientWidth,
                width:"",
                //小屏幕折叠
                collapse:false,
                searchKeyword:""
    		}
    	},
        mounted () {
            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
        },
        watch: {
            screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val
                    // this.timer = true
                    // let that = this
                    // setTimeout(function () {
                    //     // that.screenWidth = that.$store.state.canvasWidth
                    //     console.log(that.screenWidth)
                    //     that.init()
                    //     that.timer = false
                    // }, 400)
                }
                let collapse = false
                if(this.screenWidth<=1200){
                    collapse=true
                }else{
                    collapse=false
                }
                this.collapse = collapse
                    this.$emit('collapse', collapse)
            }
        },
    	created(){
            this.nickName=getCookie("nickName")
            if(this.screenWidth<=1200){
                this.$emit('collapse', true)
                this.collapse = true
            }

    	},
    	computed: {
    		...mapState(['adminInfo']),
    	},
		methods: {
			...mapActions(['getAdminData']),
			async handleCommand(command) {
				if (command == 'home') {
					this.$router.push('/vueEdit');
				}else if(command == 'singout'){
					await signout().then(res=>{
                        this.$message({
                            type: 'success',
                            message: '退出成功'
                        });
                        this.$router.push('/');
                    })
				}
			},
		}
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.header_container{
		background-color: #fff;
		height: 60px;
        width: 100%;
        display: flex;
		justify-content: space-between;
		align-items: center;
        color: #fff;
        box-shadow: 0 2px 12px  rgba(0,0,0,.1);
	}
	.avator{
		.wh(36px, 36px);
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    }
    .header_container .el-breadcrumb__item__inner{
        color: #f0f0f0!important;
    }
    .topLogo{
        width: 15%;
        min-width: 50px;
        height: 50px;
        -webkit-background-size: contain;
        background-repeat: no-repeat;
        background-position: 40% center;
        color:#000;
        line-height: 50px;
        text-indent: 30px;
        letter-spacing:10px;
        font-size: 20px;

    }
    .topRight{
        width: 85%;
        min-width: 974px;
        display: flex;
        height: 100%;
        justify-content: space-between;
    }
    .topRight .topSearch{
        width: 64%;
        height: 100%;
        line-height: 100%;
        margin-left: 20px;
        display: flex;
        align-items: center;
        max-width:680px;
    }
    .topRight .topUser{
        width: 36%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right: 20px;
        color: #333333;
        font-size: 14px;
    }
    .topRight .message{
        display: flex;
        justify-content: flex-end;
        .showMessageBtn{
            cursor: pointer;
        }
    }
    .topRight .user{
        display: flex;
        font-size: 12px;
        margin-left: 20px;
        align-items: center;
        position: relative;
        justify-content: flex-end;
        cursor: pointer;
    }
    .user:after{
        content: "";
        position: absolute;
        left: 0;
        top: 7px;
        width: 2px;
        height: 12px;
        background: #D5D5D5;
    }
    .user .head{
        width: 40px;
        height: 40px;
        margin: 0 20px;
        margin-right: 5px;
        border-radius: 50%;
        border: 1px solid #bbb;
    }
    .user .arrow{
        width: 14px;
        height: 14px;
        margin-right: 30px;
    }
    .user .name{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-right: 2px;
        color: #000;

    }
    .el-autocomplete{
        width: 100%;
    }
    .topRight .topSearch{
        .el-input{
            width: 100%;
        }
        .el-input__inner{
            border: 1px solid rgba(255,132,76,.5);
            height: 34px;
            line-height: 34px;
            border-radius: 2px 0 0 2px;
            padding-left: 35px;
        }

        .el-input__prefix{
            display: flex;
            align-items: center;
            justify-content: center;
            .searchIcon{
                padding: 0 8px;
                padding-left: 5px;
                padding-top: 2px;
            }
            .searchIcon:after{
                content: "";
                position: absolute;
                width: 2px;
                height: 12px;
                right:0;
                top: 11px;
                background: #D5D5D5 ;
            }
            img{
                width: 14px;
                height: 14px;

            }
        }
    }
    .serachBtn{
        width: 104px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background: #FF844C;
        border-radius: 0 2px 2px 0;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
    }
    .serachBtn:active{
        background:#ed4014;
    }

</style>
