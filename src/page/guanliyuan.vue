<template>
    <div>
        <div style="margin-bottom: 20px">
           管理员
        </div>
        <div style="background: #fff">
            <div class="searchBox">
                <el-button  type="primary" @click="addGl" plain>新增管理员</el-button>
            </div>
            <el-dialog title="新增设计师" :visible.sync="dialogFormVisible" >
                <el-form label-width="80px"
                         label-position="left" >
                    <el-form-item  label="账号" >
                       <el-input v-model="account" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item   label="密码">
                        <el-input v-model="password" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item   label="手机号码">
                        <el-input v-model="phoneNum" style="width: 300px"></el-input>
                    </el-form-item>
                    <el-form-item   label="昵称">
                        <el-input v-model="niceName" style="width: 300px"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addAdmin">新 增</el-button>
                </div>
            </el-dialog>
            <el-table

                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                    prop="nickName"
                    label="昵称">
                </el-table-column>
                <el-table-column
                    prop="account"
                    label="账号">
                </el-table-column>
                <el-table-column
                    prop="mobile"
                    label="手机">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="uopdatepwd(scope.row.id)">重置密码</el-button>
                        <el-button type="text" @click="deladmin(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {getadmin,deladmin,uopdatepwd,addAdmin} from "../api/getData";
    import md5 from 'js-md5';
    export default {

        name: "guanliyuan",
        data(){
            return{
                account:'',
                password:'',
                niceName:'',
                phoneNum:'',
                random10:'',
                dialogFormVisible:false,
                tableData:[{
                    name:'上海大白科技',
                    user:'asd123456',
                    pass:'aaabbbccc'
                },{
                    name:'小伟',
                    user:'18017258888',
                    pass:'cddddddd'
                }]
            }

        },
        created(){
          this.getadmin()

        },
        methods:{
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

            },
            addGl(){
                this.randomWord(false,10)
                this.dialogFormVisible = true
                this.account='',
                this.password='',
                this.niceName='', this.phoneNum=''
            },
            addAdmin(){
                var that = this
                if(this.account!=''
                    &&
                    this.password!=''
                    &&
                    this.niceName!=''
                        &&
                        this.phoneNum!=''
                ){
                    addAdmin({
                        account:this.account,
                        mobile:this.phoneNum,
                        password:this.random10 +md5(this.password),
                        nickName:this.niceName
                    }).then(res=>{
                        console.log(res)
                        that.dialogFormVisible = false
                        that.getadmin()
                        this.$message({
                            message: '新增成功',
                            type: 'success'
                        });
                    })
                }

            },
            getadmin(){
                getadmin({

                }).then((res)=>{
                    console.log(res)
                    this.tableData = res.result
                })
            },
            deladmin(id){
                var that =this
                deladmin({
                    id
                }).then(res=>{
                    if(res.result == 'SUCCESS'){
                        that.getadmin()
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '删除失败',
                            type: 'warning'
                        });
                    }
                })
            },
            uopdatepwd(id){
                this.randomWord(false,10)
                this.$prompt('请输入新密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    uopdatepwd({
                        id,
                        password:this.random10+ md5(value)
                    }).then(res=>{
                        if(res.result=='SUCCESS'){
                            this.$message({
                                message: '重置成功',
                                type: 'success'
                            });
                        }else{
                            this.$message({
                                message: '重置失败',
                                type: 'success'
                            });
                        }
                    })
                })
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
</style>
