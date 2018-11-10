<template>
  <div style="width:100%">
      <div style="margin-bottom: 20px">模板通知</div>
    <div class="contain">
        <div>
            <div class="bigWords">{{messageData.todayLike}}</div>
            <div class="smallWords">
                <span>今日 </span><span> 新增 </span>
                <span> {{messageData.todayLike}} </span>喜欢
            </div>
        </div>
        <div>
            <div class="bigWords">{{messageData.freeUsedCount}}</div>
            <div class="smallWords">
                <span>{{messageData.templateCount}}个 </span><span> 模板 </span>
                <span>免费解锁</span><span> {{messageData.freeUsedCount}} </span>次
            </div>
        </div>
    </div>
  </div>

</template>

<script>

    import {baseUrl, baseImgPath} from '@/config/env'
    import {getMessage} from '@/api/getData'
    import {getCookie} from "../api/cookie";
    export default {
        data(){
            return {
                messageData:{}
            }

        },
        created(){
            this.getmessage()
        },
        watch:{

        },
    	components: {

    	},
        computed: {
          	editor() {

	      	}
        },
        methods: {
            //隐藏banner
            hiddenBanner(){
              this.bannerShow = false
            },
            async getmessage(){
                const res = await getMessage({})
                console.log(res)
                this.messageData = res
            }
        },

        mounted() {

        }
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .contain{
        padding-top: 10%;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;

    }
    .bigWords{
        font-size: 48px;
        color: #67c23a;
        text-align: center;
        margin-bottom: 30px;
    }
    .smallWords{
        font-size: 20px;
        color: #000;
    }
</style>

