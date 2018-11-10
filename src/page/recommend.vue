<template>
    <div style="width:100%">
        <div style="margin-bottom: 20px">订单通知</div>
        <div class="contain">
            <div>
                <div class="bigWords">33</div>
                <div class="smallWords">
                    <span>今日 </span><span> 新增 </span>
                    <span> 33 </span>订单
                </div>
            </div>
            <div>
                <div class="bigWords">200</div>
                <div class="smallWords">
                    <span>12个 </span><span> 模板 </span>
                    <span>付费解锁</span><span> 200 </span>次
                    <span> 打印 </span><span> 35次</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "recommend"
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
