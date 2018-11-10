<template>
    <div class="allmoban" style="width:100%;">
        <div  style="margin-bottom: 20px">全部订单</div>
        <div style="width: 100%;background: #fff;padding: 10px">
            <div class="searchBox">
                <div>
                    <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
                <div>
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="支付成功" value="1"></el-option>
                        <el-option label="支付失败" value="2"></el-option>
                        <el-option label="待发货" value="3"></el-option>
                    </el-select>
                </div>
            </div>
            <div>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="订单编号">
                                    <span>{{ props.row.orderNum }}</span>
                                </el-form-item>
                                <el-form-item label="订单项目">
                                    <span>{{ props.row.type!='print'?'样式解锁':'打印名片' }}</span>
                                </el-form-item>
                                <el-form-item label="样式编号">
                                    <span>{{ props.row.templateId }}</span>
                                </el-form-item>
                                <el-form-item label="支付时间">
                                    <span>{{ props.row.time }}</span>
                                </el-form-item>
                                <el-form-item label="支付金额">
                                    <span style="color: #ff4d51">{{ props.row.price }}</span>
                                </el-form-item>
                                <el-form-item label="支付状态">
                                    <span style="color: #ff4d51">{{ props.row.status=='todo'?'等待支付':props.row.status=='waiting'?'等待发货':props.row.status=='send'?'已发货':'已完成' }}</span>
                                </el-form-item>
                                <el-form-item label="支付方式">
                                    <span>{{ props.row.payType=='weixin'?'微信支付':'支付宝' }}</span>
                                </el-form-item>
                                <div v-if="props.row.type=='print'">
                                    <el-form-item >
                                        <span style="font-size: 16px">配送信息：</span>
                                        </el-form-item>
                                    <el-form-item >
                                    </el-form-item>
                                    <el-form-item label="收货人">
                                        <span >{{ props.row.receiver.name }}</span>
                                    </el-form-item>
                                    <el-form-item label="电话">
                                        <span >{{ props.row.receiver.mobile }}</span>
                                    </el-form-item>
                                    <el-form-item label="收货地址">
                                        <span>{{props.row.receiver.cityName}}{{ props.row.receiver.address }}</span>
                                    </el-form-item>
                                    <el-form-item>

                                    </el-form-item>
                                    <div style="text-align: center">
                                        <el-input v-input="kuaidiNum"  placeholder="输入快递单号"></el-input>
                                        <el-button @click="expressOrder(props.row.id)" style="width: 200px;margin-top: 10px" type="primary">确认发货</el-button>
                                    </div>
                                </div>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="订单编号"
                        prop="orderNum">
                    </el-table-column>
                    <el-table-column
                        label="项目">
                        <template slot-scope="scope">
                            <span>{{scope.row.type!='print'?'样式解锁':'打印名片'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="状态"
                        prop="payState">
                        <template slot-scope="scope">
                            <span>{{ scope.row.status=='todo'?'等待支付':scope.row.status=='waiting'?'等待发货':scope.row.status=='send'?'已发货':'已完成' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="发货状态"
                        prop="delivery">
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import {getorder,expressOrder} from "../api/getData";

    export default {
        name: "chat",
        data(){
            return{
                kuaidiNum:'',
                tableData:[
                //     {
                //     orderId:20180920,
                //     type:0,
                //     styleId:20180920,
                //     time:'2018-09-20  11:20:26',
                //     price:'12',
                //     payType:'微信支付',
                //     payState:'支付成功',
                //     user:'上海灵犀商贸',
                //     delivery:'已发货'
                // },{
                //     orderId:20180920,
                //     type:1,
                //     styleId:20180920,
                //     time:'2018-09-20  11:20:26',
                //     price:'12',
                //     payType:'微信支付',
                //     payState:'支付成功',
                //     user:'上海灵犀商贸',
                //     consignee:'王多鱼',
                //     consigneeNUm:18017256621,
                //     address:'光明金融大厦8楼',
                //     delivery:'待发货'
                // }
                ]
            }
        },
        created(){
          this.getdata()
        },
        methods:{
          getdata(){
              var that = this

              getorder({

           }).then(res=>{
               that.tableData = res
           })
          },
            expressOrder(id){
                expressOrder({
                    num:this.kuaidiNum,
                    id:id
                }).then(res=>{
                    console.log(res)
                })
            },
        },
    }
</script>

<style lang="less">
    .allmoban{
    .searchBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 30px;
        margin-bottom: 10px;
    }
    .tableimg{
        width: 65.2px;
        height: 106.8px;
        border-radius: 5px;
    }
        .demo-table-expand {
            font-size: 0;
        }
        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }
        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }
    }
</style>
