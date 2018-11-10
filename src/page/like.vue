<template>
    <div class="allmoban" style="width:100%;">
        <div  style="margin-bottom: 20px">vip定制模板</div>
        <div style="width: 100%;background: #fff;padding: 10px">
            <div class="searchBox">
                <div>
                    <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
                <div>
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="喜欢最多" value="1"></el-option>
                        <el-option label="解锁最多" value="2"></el-option>
                        <el-option label="打印最多" value="3"></el-option>
                    </el-select>
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
                            <img class="tableimg" :src="scope.row.img" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="like"
                        label="喜欢">
                    </el-table-column>
                    <el-table-column
                        prop="unlock"
                        label="解锁">
                    </el-table-column>
                    <el-table-column
                        prop="printing"
                        label="印刷">
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        label="状态">
                        <template slot-scope="scope">
                            <span>{{scope.row.state==0?'已下架':'使用中'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                        <template slot-scope="scope">
                            <el-button type="text" @click="upDateVip(scope.row.img)" size="small">编辑</el-button>
                            <el-button type="text" size="small">{{scope.row.state==0?'发布':'刷新'}}</el-button>
                            <el-button :disabled="scope.row.state==0" type="text" size="small">下架</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog title="编辑普通模板" :visible.sync="upDateDialog">
                    <el-form ref="form" :model="form" label-width="120px">
                        <el-form-item style="width: 500px" label="模板ID">
                            <el-input  v-model="form.desc"></el-input>
                        </el-form-item>
                        <el-form-item label="预览图">
                            <el-upload
                                class="avatar-uploader"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="yulan">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-button style="position: absolute;left: 500px" @click="addDomain">新增绑定手机</el-button>
                        <el-form-item
                            style="width: 500px"
                            prop="email"
                            label="绑定手机号"
                        >
                            <el-input v-model="form.email"></el-input>
                        </el-form-item>

                        <el-form-item
                            v-for="(domain, index) in form.domains"
                            style="width: 500px"
                            :prop="'domains.' + index + '.value'"
                            :key="index"
                        >
                            <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
                        </el-form-item>

                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="upDateDialog = false">取 消</el-button>
                        <el-button type="primary" @click="upDateDialog = false">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "interview",
        data(){
            return{
                tableData:[{
                    id:'vip'+20180918003,
                    img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537262307714&di=5beaaaf125818d53aac667c7ef449946&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fblog%2F201409%2F19%2F20140919033712_YZJar.thumb.700_0.jpeg',
                    like:104,
                    unlock:85,
                    printing:32,
                    state:0,
                },
                    {
                        id:'vip'+20180918004,
                        img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537262307713&di=7c8a1bbae995e5470100a2e9623c6468&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201504%2F29%2F20150429093528_rz3Aa.jpeg',
                        like:67,
                        unlock:28,
                        printing:19,
                        state:1,
                    },
                    {
                        id:'vip'+20180918005,
                        img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537262397452&di=cb4a0fa054ace48db927132cbd72dd6a&imgtype=jpg&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D1693049746%2C492702481%26fm%3D214%26gp%3D0.jpg',
                        like:37,
                        unlock:18,
                        printing:9,
                        state:1,
                    }
                ],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    mubanType: '1',
                    desc: '',
                    imageUrl: '',
                    fileList:'',
                    dialogImageUrl: '',
                    dialogVisible: false,
                    domains:[]

                },
                upDateDialog:false
            }
        },
        methods:{
            removeDomain(item) {
                var index = this.form.domains.indexOf(item)
                if (index !== -1) {
                    this.form.domains.splice(index, 1)
                }
            },
            submitForm(formName) {
                console.log(formName)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.form)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            addDomain() {
                this.form.domains.push({
                    value: '',
                });
            },
            upDateVip(){
                this.upDateDialog = true
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
    }
</style>
