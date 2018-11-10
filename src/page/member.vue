<template>
    <div>
        <div style="margin-bottom: 20px">
            设计师管理
        </div>
        <div style="background: #fff">
            <div class="searchBox">
                <el-button  type="primary" @click="addDesigner" plain>新增设计师</el-button>
            </div>
            <el-dialog title="新增设计师" :visible.sync="dialogFormVisible" >
                <el-form >
                    <el-form-item class="shejishi"  label="头像" >
                        <el-upload
                            class="avatar-uploader"
                            action=""
                            :data="'shop'"
                            :show-file-list="false"
                            :http-request="upLoadImg">
                            <img class="userhead" v-if="avatar.url" :src="avatar.url">
                            <i v-else class="el-icon-plus avatar-uploader-icon" ></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item  label="名字">
                        <el-input v-model="nickName" style="width: 300px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addSJC">新 增</el-button>
                </div>
            </el-dialog>
            <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="设计师信息">
                    <template slot-scope="scope">
                        <div class="sjsxx">
                            <img style="width: 50px;height: 50px;border-radius: 50%;margin-right: 30px" :src="scope.row.avatar" alt="">
                            <span >{{scope.row.niceName}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    label="模板数量">
                    <template slot-scope="scope">
                        <span>{{scope.row.num}}个</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click='delSjs(scope.row.id)'>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {getCookie} from "../api/cookie";
    import {addsjs,getsjs,delsjs} from '../api/getData'

    export default {
        name: "member",
        data(){
            return{
                imageUrl: '',
                dialogFormVisible:false,
                avatar:{
                    url:'',
                    path:''
                },
                nickName:'',
                tableData:[]
            }
        },
        created(){
          this.getSJS()
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

                            that.avatar = {
                                url:response.data.result.url,
                                path:response.data.result.path
                            }

                    }).catch(err=>{

                })

                console.log('formData.get(\'file\')=',param.get('file'))
            },
            addDesigner(){
                this.dialogFormVisible = true
            },
            getSJS(){
                getsjs({

                }).then(res=>{
                    this.tableData = res.result
                })
            },
            delSjs(ID){
                var that = this
                this.$confirm('此操作删除该设计师, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    delsjs({
                        id:ID
                    }).then(res=>{
                        that.getSJS()
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });

                    })
                })

            },
            addSJC(){
                this.dialogFormVisible = false
                var that = this
                if(that.avatar.path&&that.nickName){
                    var res = addsjs({
                        avatar:that.avatar.path,
                        niceName:that.nickName,
                    }).then(res=>{
                        that.getSJS()
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                        that.avatar.path=''
                        that.avatar.url=''
                        that.nickName=''

                    }).catch(err=>{
                        this.$message.error('新增失败');
                    })
                    console.log(res)
                }

            }


        }
    }
</script>

<style lang="less">
.sjsxx{
    display: flex;
    align-items: center;
}
.searchBox{
    padding: 10px 0;
    padding-left: 30px;
}

.shejishi{
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .userhead{
        width: 178px;
        height: 178px;
    }
}

</style>
