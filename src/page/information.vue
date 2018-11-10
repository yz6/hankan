<template>
    <div>
        <div style="margin-bottom: 20px">
            纸张管理
        </div>
       <div style="background: #fff">
           <div class="searchBox">
               <el-button type="primary" @click="showDialog(0)" plain>新增纸张</el-button>
           </div>
           <el-dialog title="纸张" :visible.sync="dialogFormVisible" >
                   <el-form :inline="true">
                       <el-form-item  label="纸张名称" >
                           <el-input style="width: 300px" v-model="name"></el-input>
                       </el-form-item>
                       <el-form-item  label="纸张价格">
                           <el-input style="width: 300px" v-model="price"></el-input>
                       </el-form-item>
                   </el-form>
               <div slot="footer" class="dialog-footer">
                   <el-button @click="dialogFormVisible=false">取 消</el-button>
                   <el-button type="primary" @click="addpaperSub()">确 定</el-button>
               </div>
           </el-dialog>
           <el-table
               :data="tableData"
               stripe
               style="width: 100%">
               <el-table-column
                   prop="name"
                   label="名称">
               </el-table-column>
               <el-table-column
                   label="价格">
                   <template slot-scope="scope">
                       <span>{{scope.row.price}}元</span>
                   </template>
               </el-table-column>
               <el-table-column
                   label="状态">
                   <template slot-scope="scope">
                       <span>{{scope.row.status=='offline'?'未上架':'使用中'}}</span>
                   </template>
               </el-table-column>
               <el-table-column
                   label="操作">
                   <template slot-scope="scope">
                       <el-button type="text" size="small" @click="showDialog(1,scope.row.id,scope.row.name,scope.row.price)">编辑</el-button>
                       <el-button type="text" size="small" @click="changeStatus(scope.row.id,scope.row.status)">{{scope.row.status=='offline'?'上架':'下架'}}</el-button>
                   </template>
               </el-table-column>
           </el-table>
       </div>
    </div>
</template>

<script>
    import {addpaper,getpaper,updatepaper,statuspaper} from "../api/getData";

    export default {
        name: "information",
        data(){
            return{
                name:'',
                price:'',
                dialogFormVisible:false,
                tableData:[],
                type:'',
                editId:''
            }
        },
        created(){
          this.getpaper()
        },
        methods:{
            getpaper(){
                getpaper({

                }).then(res=>{
                    this.tableData = res.result
                })
            },
            showDialog(e,id,name,price){
                this.type = e
                this.dialogFormVisible = true
                if(e==1){
                    this.name = name
                    this.price = price
                    this.editId = id
                }else{
                    this.name = ''
                    this.price = ''
                }
            },
            addpaperSub(){
                console.log()
                var that = this
                if(this.name && this.price){
                    if(this.type==0){
                        addpaper({
                            name:this.name,
                            price:this.price
                        }).then(res=>{
                            that.getpaper()
                            console.log(res)
                            that.dialogFormVisible = false
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                        })
                    }else{
                        updatepaper({
                            name:this.name,
                            price:this.price,
                            id:this.editId
                        }).then(res=>{
                            that.getpaper()
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            that.dialogFormVisible = false
                        })
                    }
                }
            },
            changeStatus(id,status){
                var that = this
                var poststatus = ''
                status == 'offline'?poststatus = 'online':poststatus = 'offline'
                this.$confirm('是否更改状态为'+poststatus+'?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=>{

                    statuspaper({
                        id:id,
                        status:poststatus
                    }).then(res=>{
                        that.getpaper()
                        console.log(res)
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    })
                })
                console.log(status)

            }
        }
    }
</script>

<style lang="less">
    .searchBox{
        padding: 10px 0;
        padding-left: 30px;
    }
</style>
