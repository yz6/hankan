<template>
    <div class="allmoban" style="width:100%;">
        <div  style="margin-bottom: 20px">全部模板</div>
        <div style="width: 100%;background: #fff;padding: 10px">
            <div class="searchBox">
               <div>
                   <!--<el-input placeholder="请输入内容" v-model="input5" class="input-with-select">-->
                       <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
                   <!--</el-input>-->
               </div>
               <div>
                   <!--<el-select v-model="select" slot="prepend" placeholder="请选择">-->
                       <!--<el-option label="喜欢最多" value="1"></el-option>-->
                       <!--<el-option label="解锁最多" value="2"></el-option>-->
                       <!--<el-option label="打印最多" value="3"></el-option>-->
                   <!--</el-select>-->
               </div>
            </div>
            <div>
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="id"
                        label="ID">
                    </el-table-column>
                    <el-table-column

                        label="预览图">
                        <template slot-scope="scope">
                            <img class="tableimg" :src="scope.row.storeImgUrl" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="likeCount"
                        label="喜欢">
                    </el-table-column>
                    <el-table-column
                        prop="unlockCount"
                        label="解锁">
                    </el-table-column>
                    <el-table-column
                        prop="printCount"
                        label="印刷">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.status=='offline'?'已下架':'使用中'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="type"
                        label="类型">
                        <template slot-scope="scope">
                            <span>{{scope.row.type=='vip'?'VIP':'普通'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click.native="upDateMuban(scope.row)">编辑</el-button>
                            <el-button @click="scope.row.status =='offline'?updateOrder('online',scope.row.id):updateOrder('offline',scope.row.id)" type="text" size="small">{{scope.row.status=='offline'?'上架':'下架'}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="编辑普通模板" :visible.sync="upDateDialog">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item prop="mubanType" label="模板类型">
                            <el-radio-group  v-model="form.mubanType">
                                <el-radio label="normal">普通模板</el-radio>
                                <el-radio label="vip">vip定制模板</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="商店预览图">
                            <div style="display: flex;">
                                <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    :headers="upLoadHeaders"
                                    :data="'shop'"
                                    :show-file-list="false"
                                    :http-request="upLoadImg">
                                    <img v-if="form.shopImage.url" :src="form.shopImage.url" class="yulan">
                                    <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                                </el-upload>
                                <span style="margin: 0 10px;color: #606266;">订单预览图</span>
                                <el-upload
                                    class="avatar-uploader"
                                    action=""
                                    :headers="upLoadHeaders"
                                    :data="'order'"
                                    :show-file-list="false"
                                    :http-request="upLoadImg">
                                    <img v-if="form.orderImage.url" :src="form.orderImage.url" class="yulan">
                                    <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                                </el-upload>
                            </div>

                        </el-form-item>
                    <el-form-item label="商品概述">
                        <el-input type="textarea" :rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="使用方法">
                        <el-input type="textarea" :rows="5" v-model="form.useMethod"></el-input>
                    </el-form-item>
                    <el-form-item label="印刷预览">
                        <el-upload
                            ref="upload"
                            action=""
                            :http-request="upLoadPrintImg"
                            list-type="picture-card"
                            :on-remove="removePrintImg"
                            :limit="6"
                            :file-list="fileList2">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="配送信息">
                        <el-input  v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="解锁价格">
                        <el-radio-group  v-model="form.free">
                            <el-radio :label="false">付费</el-radio>
                            <el-radio :label="true">免费</el-radio>
                        </el-radio-group>
                        <el-input v-model="form.price" v-show="!form.free"></el-input>
                    </el-form-item>
                    <el-form-item label="标签">
                        <el-input  v-model="form.tags"></el-input>
                    </el-form-item>
                        <el-form-item label="设计师">
                            <el-select @change="changeSjs" v-model="form.sjsId">
                                <el-option
                                    v-for="item in sjsData"
                                    :key="item.id"
                                    :label="item.niceName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="upDateDialog = false">取 消</el-button>
                        <el-button type="primary" @click="upDateSub">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>

    </div>
</template>

<script>
    import {getCookie} from "../api/cookie";
    import {getTem,updateOrder,updateTem,getsjs} from "../api/getData";

    export default {
        name: "interview",
        data(){
            return{
                form: {
                    free:'',
                    delivery: false,
                    useMethod:'',
                    price:'',
                    mubanType: '',
                    desc: '',
                    sjsId:'',
                    tags:'',
                    shopImage:[],
                    orderImage:[],
                    printImage:[],

                },
                fileList2:[],
                sjsData:[],
                fileList1:[{name:'123.jpg',url:''}],
                tableData:[],
                upDateDialog:false
            }
        },
        created(){
          this.getTem()
            this.getsjs()
        },
        methods:{
            upLoadImg(e){
                console.log(e)
                var that = this
                let file = e.file;//获取文件
                let param = new FormData(); //创建form对象
                let token = getCookie("token")
                param.append('file',file);//通过append向form对象添加数据//FormData私有类对象，访问不到，可以通过get判断值是否传进去
                const instance= this.$ajax.create({
                    withCredentials: true
                })
                let config = {
                    headers: {'token': token,"client-id":"n56RVu9qqR84"}
                }
                instance.post('file/uploadImage',param,config)
                    .then(response => {
                        console.log(response.data)
                        if(e.data == 'shop'){
                            that.form.shopImage = {
                                url:response.data.result.url,
                                path:response.data.result.path
                            }
                        }
                        if(e.data == 'order'){
                            that.form.orderImage = {
                                url:response.data.result.url,
                                path:response.data.result.path
                            }
                        }

                        that.htPath =  response.data.result.path
                        console.log(that.imageUrl1)
                    }).catch(err=>{

                })

                console.log('formData.get(\'file\')=',param.get('file'))
            },
            upDateSub(){
                var printImgUrls = ''
                this.upDateDialog = false;
                console.log(this.fileList2)
                 this.form.printImage.forEach((v,i)=>{
                     printImgUrls +=  v.url.replace(new RegExp('http://image.mynicecard.com'),'')+','
                 })
                var that = this
                printImgUrls=(printImgUrls .substring(printImgUrls .length - 1) == ',') ? printImgUrls .substring(0, printImgUrls .length - 1) : printImgUrl
                console.log(printImgUrls)
                console.log(this.form)
                var isFree = ''
                var orderImgUrl =  this.form.orderImage.url.replace(new RegExp('http://image.mynicecard.com'),'')
                var shopImageUrl = this.form.shopImage.url.replace(new RegExp('http://image.mynicecard.com'),'')
                isFree =  this.form.free?1:0
                updateTem({
                    id:this.form.id,
                    description:this.form.desc,
                    designerId:this.form.sjsId,
                    isFree,
                    orderImgUrl,
                    storeImgUrl:shopImageUrl,
                    price:this.form.price,
                    printImgUrls,
                    tags:this.form.tags,
                    useMethod:this.form.useMethod,
                    type:this.form.mubanType
                }).then(res=>{
                    console.log(res)
                    that.getTem()
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                })
            },
            getsjs(){
                getsjs({

                }).then(res=>{
                    console.log(res)
                    this.sjsData = res.result
                })
            },
            changeSjs(e){
                console.log(e)
            },
            upDateMuban(data){
                this.fileList2 = []
                // this.$refs.upload.clearFiles();
                this.upDateDialog = true
                console.log(data)
                this.form.id = data.id
                this.form.desc = data.description
                this.form.useMethod = data.useMethod
                this.form.tags = data.tags
                this.form.free = data.free
                this.form.mubanType = data.type
                this.form.price = data.price
                this.form.orderImage.url = data.orderImgUrl
                this.form.shopImage.url = data.storeImgUrl
                this.sjsData.forEach((v,i)=>{
                    if(v.id == data.designerId){
                        this.form.sjsId =v.id
                    }
                });
                this.form.printImage = this.fileList2
                    var str = ''
                str = (data.printImgUrls.substring(data.printImgUrls.length-1)==',')?data.printImgUrls.substring(0,data.printImgUrls.length-1):data.printImgUrls;
                str.split(',').forEach((v,i)=>{
                    this.fileList2.push({url:v})
                })
                console.log(this.fileList2)
            },
            getTem(){
                getTem({

                }).then(res=>{
                    console.log(res)
                    this.tableData = res.result
                })
            },
            updateOrder(action,id){
                var that = this
                updateOrder({
                    action,
                    id
                }).then(res=>{
                    if(res.result == 'SUCCESS'){
                        that.getTem()
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '操作失败',
                            type: 'warning'
                        });
                    }

                })
            },
            //上传印刷图片
            upLoadPrintImg(e){
                console.log(e)
                var that = this
                let file = e.file;//获取文件
                let param = new FormData(); //创建form对象
                let token = getCookie("token")
                param.append('file',file);//通过append向form对象添加数据//FormData私有类对象，访问不到，可以通过get判断值是否传进去
                const instance= this.$ajax.create({
                    withCredentials: true
                })
                let config = {
                    headers: {'token': token,"client-id":"n56RVu9qqR84"}
                }
                instance.post('file/uploadImage',param,config)
                    .then(response => {
                        console.log(response)
                        that.form.printImage.push({
                            url:response.data.result.url,
                            path:response.data.result.path,
                            uid:file.uid
                        })
                        console.log(that.form.printImage)
                    }).catch(err=>{

                })
                console.log(e)
            },
            removePrintImg(e){
                console.log(e)
                this.form.printImage.forEach((v,i)=>{
                    if(e.uid == v.uid){
                        this.form.printImage.splice(i,1)
                    }
                })
                console.log(this.form.printImage)
            },
        }
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
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width:65.2px;
        height: 106.8px;
        line-height: 106.8px;
        text-align: center;
    }
    .bindingPhoneBox{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        height: 40px;
        border: 1px solid #bbb;
    }
    .phoneItem{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        height: 40px;
        border: 1px solid #bbb;
        border-top: none;
        color: #666;
        font-size: 14px;
    }
    .el-form-item .el-input{
        width: 80%;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width:65.2px;
        height: 106.8px;
        line-height: 106.8px;
        text-align: center;
    }
    .avatar{
        width: 178px;
        height: 178px;
        display: block;
    }
    .yulan {
        width: 65.2px;
        height: 106.8px;
        display: block;
    }
</style>
