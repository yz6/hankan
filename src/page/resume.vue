<template>
    <div style="width: 80%;margin: 0 auto;margin-top: 30px;">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item prop="mubanType" label="模板类型">
                <el-radio-group  v-model="form.mubanType">
                    <el-radio label="normal">普通模板</el-radio>
                    <el-radio label="vip">vip定制模板</el-radio>
                </el-radio-group>
            </el-form-item>
            <div>

                <el-form-item prop="shopImage" label="商店预览图">
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
                   </div>

                </el-form-item>
                <el-form-item label="订单预览图" prop="orderImage">
                    <el-upload

                        prop="orderImage"
                        class="avatar-uploader"
                        action=""
                        :headers="upLoadHeaders"
                        :data="'order'"
                        :show-file-list="false"
                        :http-request="upLoadImg">
                        <img v-if="form.orderImage.url" :src="form.orderImage.url" class="yulan">
                        <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                    </el-upload>
                </el-form-item>
                <el-form-item prop="summary" label="商品概述">
                    <el-input type="textarea" :rows="5" v-model="form.summary"></el-input>
                </el-form-item>
                <el-form-item prop="desc" label="使用方法">
                    <el-input type="textarea" :rows="5" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item prop="printImage" label="印刷预览">
                    <el-upload
                        ref="upload"
                        action=""
                        :http-request="upLoadPrintImg"
                        list-type="picture-card"
                        :on-remove="removePrintImg"
                        :limit="6">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item prop="peisong" label="配送信息">
                    <el-input  v-model="form.peisong"></el-input>
                </el-form-item>
                <el-form-item prop="isfree" label="解锁价格">
                    <el-radio-group @change="swichFree"  v-model="form.isfree">
                        <el-radio label="0">免费</el-radio>
                        <el-radio label="1">付费</el-radio>
                    </el-radio-group>
                    <span></span>
                </el-form-item>
                <el-form-item  v-if="form.isfree=='1'" label="价格" prop="price">
                    <el-input v-model="form.price" style="width: 300px"></el-input>(元)
                </el-form-item>
                <el-form-item prop="biaoqian" label="标签" >
                    <el-input  v-model="form.biaoqian" placeholder="标签用英文逗号 ',' 分隔"></el-input>
                </el-form-item>
                <el-form-item prop="sjs" label="设计师">
                    <el-select v-model="form.sjs">
                        <el-option
                            v-for="item in sjsOption"
                            :key="item.id"
                            :label="item.niceName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                </el-form-item>
            </div>
            <!--<div v-show="form.mubanType==2" style="position: relative">-->
                <!--<el-form-item style="width: 500px" label="模板ID">-->
                    <!--<el-input  v-model="form.desc"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="预览图">-->
                    <!--<el-upload-->
                        <!--class="avatar-uploader"-->
                        <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                        <!--:show-file-list="false"-->
                        <!--:on-success="handleAvatarSuccess"-->
                        <!--:before-upload="beforeAvatarUpload">-->
                        <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                        <!--<i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                    <!--</el-upload>-->
                <!--</el-form-item>-->
                <!--<el-button style="position: absolute;left: 500px" @click="addDomain">新增绑定手机</el-button>-->
                    <!--<el-form-item-->
                        <!--style="width: 500px"-->
                        <!--prop="email"-->
                        <!--label="绑定手机号"-->
                    <!--&gt;-->
                        <!--<el-input v-mozdel="form.email"></el-input>-->
                    <!--</el-form-item>-->

                    <!--<el-form-item-->
                        <!--v-for="(domain, index) in form.domains"-->
                        <!--style="width: 500px"-->
                        <!--:prop="'domains.' + index + '.value'"-->
                        <!--:key="index"-->
                    <!--&gt;-->
                        <!--<el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item>-->
                        <!--<el-button type="primary" @click="submitForm('form')">提交</el-button>-->

                    <!--</el-form-item>-->
            <!--</div>-->

        </el-form>

    </div>
</template>

<script>
    import {getCookie} from "../api/cookie";
    import {getsjs,addTem} from "../api/getData";

    export default {
        name: "resume",
       data(){
           return {
               form: {
                   mubanType: '1',
                   shopImage:[],
                   orderImage:[],
                   printImage:[],
                   summary:'',
                   desc:'',
                   peisong:'',
                   isfree:'',
                   sjs:'',
                   biaoqian:null,
                   price:''
               },
               rules:{
                   mubanType: [{required: true,message: '请填入', trigger: 'blur' }],
                   shopImage:[{required: true,message: '请填入', trigger: 'blur' }],
                   orderImage:[{required: true,message: '请输入', trigger: 'blur' }],
                   printImage:[{required: true,message: '请输入', trigger: 'blur' }],
                   summary:[{required: true,message: '请输入', trigger: 'blur' }],
                   desc:[{required: true,message: '请输入', trigger: 'blur' }],
                   peisong:[{required: true,message: '请输入', trigger: 'blur' }],
                   isfree:[{required: true,message: '请输入', trigger: 'blur' }],
                   sjs:[{required: true,message: '请输入', trigger: 'blur' }],
                   biaoqian:[{required: true,message: '请输入', trigger: 'blur' }],
                   price:[{required: true,message: '请输入', trigger: 'blur' }]
               },
               sjsOption:'',
               upLoadHeaders:{
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   "client-id":"n56RVu9qqR84",
                   "token":getCookie("token")
               },
               free:false,
               phoneList:[
                   {
                       num:18017265821,
                       id:1
                   },
                   {   id:1,
                       num:13403772395
                   }
               ]
           }
       },
        created(){
            getsjs({

          }).then(res=>{
              this.sjsOption = res.result
                console.log(this.sjsOption)
          }).catch(err=>{
              console.log(err)
            })

        },
        methods:{
            //上传图片
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
            selectSJS(e){
                console.log(e)
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
            //切换模板类型
            swichType(e){
                console.log(e)
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },

            removeDomain(item) {
                var index = this.form.domains.indexOf(item)
                if (index !== -1) {
                    this.form.domains.splice(index, 1)
                }
            },
            submitForm(formName) {
                console.log(formName)
                var that = this
                this.$refs[formName].validate((valid) => {
                    console.log(valid)
                    console.log(that.form)
                    var designer = ''
                    var free = false
                    var printImgUrls = ''
                    that.sjsOption.forEach((v,i)=>{
                        if(v.id ==that.form.sjs){
                            designer = v.niceName
                        }
                    })
                    that.form.printImage.forEach((v,i)=>{
                        printImgUrls += v.path +','
                    })
                   printImgUrls=(printImgUrls .substring(printImgUrls .length - 1) == ',') ? printImgUrls .substring(0, printImgUrls .length - 1) : printImgUrl
                    console.log(this.form.printImage)
                    if (valid) {
                        addTem({
                            description:that.form.summary,
                            designerId:that.form.sjs,
                            isFree:that.form.isfree,
                            orderImgUrl:that.form.orderImage.path,
                            price:that.form.price,
                            printImgUrls:printImgUrls,
                            storeImgUrl:that.form.shopImage.path,
                            tags:that.form.biaoqian,
                            type:that.form.mubanType,
                            useMethod:that.form.desc
                        }).then(res=>{
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            console.log(res)
                            this.$refs.upload.clearFiles();
                            this.form = {
                                mubanType: '',
                                shopImage:[],
                                orderImage:[],
                                printImage:'',
                                summary:'',
                                desc:'',
                                peisong:'',
                                isfree:'',
                                sjs:'',
                                biaoqian:null,
                                price:''
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                console.log(this.form)
            },
            addDomain() {
                this.form.domains.push({
                    value: '',
                });
            },
            swichFree(e){
                console.log(e)
               if(e=='1'){
                    this.free =true
               }else{
                   this.free =false
               }
            }

        }
    }
</script>

<style lang="less">
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
