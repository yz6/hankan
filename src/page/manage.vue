<template>
	<div class="manage_page fillcontain">
            <head-top @collapse="isCollapse"></head-top>
		<div class="menuBox" style="height: calc( 100% - 62px)">
	  		<div  class="leftMenu noselect"  :style="{width:(collapse==true?'5%':'15%')}" style="min-height: 100%; background-color:#2B2F3C;">
				<el-menu  :default-active="defaultActive"
                          text-color="rgba(255,255,255,.45)"
                          active-text-color="#FFFFFF"
                          router
                          @select="currentTab"
                          :collapse="collapse"
                          :collapse-transition="false">
					<!--<el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>-->
                    <div class="menuItemTitle">模板管理</div>
                    <el-menu-item index="post" :style="{paddingLeft:(collapse==true?'20px':'25%')}" >
                        <i class="el-icon-news"></i>
                        <span slot="title">模板通知</span>
                    </el-menu-item >
                    <el-menu-item  index="resume" :style="{paddingLeft:(collapse==true?'20px':'25%')}">
                        <i class="el-icon-goods"></i>
                        <span slot="title">新增模板</span>
                    </el-menu-item>
                    <el-menu-item :style="{paddingLeft:(collapse==true?'20px':'25%')}" index="interview">
                        <i class="el-icon-menu"></i>
                        <span slot="title" >全部模板</span>
                    </el-menu-item>
                    <!--<el-menu-item index="anchors"><i class="el-icon-download"></i>抓取管理</el-menu-item>-->
                    <!--<el-menu-item  :style="{paddingLeft:(collapse==true?'20px':'25%')}" index="like">-->
                        <!--<i class="el-icon-picture"></i>-->
                        <!--<span slot="title">vip定制模板</span>-->
                    <!--</el-menu-item>-->
                    <!--增值-->
                    <div class="menuItemTitle">订单管理</div>
                    <el-menu-item  index="recommend" :style="{paddingLeft:(collapse==true?'20px':'25%')}">
                            <i class="el-icon-tickets"></i>
                        <span slot="title">订单通知</span>
                    </el-menu-item>
                    <el-menu-item :style="{paddingLeft:(collapse==true?'20px':'25%')}" index="chat">
                        <i class="el-icon-document"></i>
                        <span slot="title" >全部订单</span>
                    </el-menu-item>
                    <!--我的-->
                    <div class="menuItemTitle">印刷管理</div>
                    <el-menu-item :style="{paddingLeft:(collapse==true?'20px':'25%')}" index="information">
                        <i class="el-icon-printer"></i>
                        <span slot="title" >纸张列表</span>
                    </el-menu-item>
                    <div class="menuItemTitle">人员管理</div>
                    <el-menu-item   :style="{paddingLeft:(collapse==true?'20px':'25%')}" index="member">
                        <i class="el-icon-info"></i>
                        <span slot="title">设计师列表</span>
                    </el-menu-item>
                    <el-menu-item   :style="{paddingLeft:(collapse==true?'20px':'25%')}" index="guanliyuan">
                        <i class="el-icon-setting"></i>
                        <span slot="title">管理员列表</span>
                    </el-menu-item>
				</el-menu>
			</div>
			<div class="rightContent" style="overflow: auto;" :style="{width:(collapse?'95%':'calc(85% - 40px)')}">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</div>
		</div>
  	</div>
</template>

<script>
    import headTop from '@/components/headTop'
    import {getCookie,delCookie} from "../api/cookie";

    export default {
        data(){
            return{
                screenWidth:"",
                collapse:false,
                currentTabName:this.$route.path.replace('/', ''),
            }
        },
        created(){

            // var token =  getCookie("token")
            // console.log(token)
            // if(token){
            //     console.log(token)
            //
            // }else{
            //     console.log('no')
            //     this.$message({
            //         message: 'token失效，请重新登录',
            //         type: 'warning'
            //     });
            //     this.$router.push('/')
            // }
        },
        components: {
            headTop,
        },
        methods:{
            //屏幕宽度变化
            isCollapse(val){
                this.collapse = val
            },
            currentTab(e){
                this.currentTabName = e
            },
        },
        watch:{
        },
		computed: {

			defaultActive: function(){
				return this.$route.path.replace('/', '');

			}
		},
    }
</script>


<style lang="less" >
	@import '../style/mixin';
    .menuBox{
        display: flex;
        justify-content: space-between;
    }
	.manage_page .el-menu-item{
        min-width: 0;
        height: 45px;
        line-height: 45px;
	}
    .menuBox .el-menu-item.is-active:after{
        content: "";
        width: 4px;
        height: 100%;
        background:#3385ff;
        position: absolute;
        left: 0;
        top: 0;
    }

    .menuBox .el-menu{
        background-color: #545c64;
        color: #fff;
        border: none;
    }
    .menuBox  .el-menu-item{
        width: 100%;

    }
    .menuBox  .el-tooltip{
        padding: 0!important;
        text-align: center;
        width: 100%;
    }
    .menuBox .el-submenu__title{
          color: #fff;
    }
    .menuBox .el-menu-item{
        color: #f1f1f1;
        margin: 1px 0;

    }
    .el-menu-item, .el-submenu__title{
        line-height: 52px;
    }
    .el-menu-item:hover {
        outline: 0;
        background-color: #000;
    }
    .menuBox .el-menu--collapse{
        width: 100%;
        min-width: 50px;
    }
    .headTop{
        display: flex;
    }
    .leftMenu{
        min-width: 50px;
        padding-bottom: 2px;
    }
    .rightContent{
        background: #f5f5f5;
        min-width: 934px;
        padding: 20px;
    }
    .menuBox .el-menu-item img{
        width: 18px;
        height: 18px;
    }
    .menuBox{
        width: 100%;
    }
    .menuBox .el-menu{
        width: 100%;
        background: #1A1F30;
    }
    .menuItemTitle{
        height: 30px;
        padding-left: 12px;
        background-color: #181C2A;
        line-height: 30px;
        text-align: left;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #F4F4F4;
    }
    .menuBox .el-menu-item{
        background-color: #2B2F3C;
    }
    .menuBox .el-menu-item.is-active {
        background-color:  #313646;
    }
    .rightContent .el-tabs__header.is-top{
        margin-bottom: 20px;
    }
    .rightContent .el-tabs--border-card{
        border: none;
        background: none;
        box-shadow: none;
    }

    .rightContent .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active:after{
        content: '';
        width: 100%;
        height: 3px;
        background:#FF844C ;
        top: 0;
        left: 0;
        position: absolute;
    }
    .rightContent .el-tabs__content{
        padding: 0;
    }
    .rightContent .el-tabs--border-card>.el-tabs__header{
        position: relative;
        background-color: #FAFAFA;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06);
        height: 54px;
        box-sizing: border-box;
        -webkit-touch-callout: none; /* iOS Safari */

        -webkit-user-select: none; /* Chrome/Safari/Opera */

        -khtml-user-select: none; /* Konqueror */

        -moz-user-select: none; /* Firefox */

        -ms-user-select: none; /* Internet Explorer/Edge */

        user-select: none; /* Non-prefixed version, currently

not supported by any browser */

    }
    .rightContent .el-tabs--border-card>.el-tabs__header .el-tabs__item{
        font-size: 18px;
        height: 54px;
        line-height: 54px;
        padding: 0 33px;
        border: none;
        color: #666666;
    }
    .rightContent .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover{
         color: #FF844C;
     }
    .rightContent .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active:not(.is-disabled):hover{
        color: #FF844C;
    }
    .rightContent .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
        background: #FFFFFF;
        box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06);
        border-radius: 2px 0 0 0;
        color: #FF844C;
        border: none;
        box-sizing: border-box;
    }
</style>

