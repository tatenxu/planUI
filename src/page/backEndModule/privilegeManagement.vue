<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">用户</div>
            <el-select v-model="userName" :clearable="true">
              <el-option
                v-for="item in searchOptions.options.userNameOptions"
                :key="item.id"
                :label="item.realName"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <!-- <el-select v-model="searchOptions.searchParams.customerName" @change="clientSelect"> -->
            <el-select v-model="CustomerValue" :clearable="true">
              <el-option
                v-for="item in searchOptions.options.customerNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <!-- <el-select v-model="searchOptions.searchParams.brandName" @change="brandSelect"> -->
            <el-select v-model="BrandValue" :clearable="true">
              <el-option
                v-for="item in searchOptions.options.brandNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div class="table">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-button type="primary" @click="addUser">添加用户</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="deleteUser">删除用户</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          max-height="400"
          @selection-change="changeCheckBoxFun"
          :stripe="true"
          :highlight-current-row="true"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column type="selection" width="50px" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="userName" width="200" label="用户" align="center"></el-table-column>
          <el-table-column prop="customerName" width="200" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" width="200" label="品牌" align="center"></el-table-column>
          <el-table-column label="操作" width="200" min-width="100" align="center">
            <template slot-scope="scope">
              <!-- <el-button @click="getRangeData(scope.row)" type="text" size="small">查看</el-button> -->
              <!-- <el-button @click="changeRangeData(scope.row)" type="text" size="small">修改</el-button> -->
              <el-button @click="deleteRangeData(scope.row,scope.index)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagination.currentPage"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          ></el-pagination>
        </div> -->
      </div>
    </el-card>

    <el-dialog :modal="false" title="新增用户" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="用户" prop="userName">
              <el-select v-model="ruleForm.userName">
                <el-option
                  v-for="item in ruleForm.options.userNameOptions"
                  :key="item.id"
                  :label="item.realName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称" prop="customerName" placeholder="请选择客户名称">
              <el-select v-model="ruleForm.customerName" @change="clientSelect2">
                <el-option
                  v-for="item in ruleForm.options.customerNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" prop="brandName">
              <el-select v-model="ruleForm.brandName">
                <el-option
                  v-for="item in ruleForm.options.brandNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="3" :offset="10">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" @click="cancel">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { POINT_CONVERSION_COMPRESSED } from 'constants';
export default {
  data() {
    return {
      userName: "",
      CustomerValue: "",
      BrandValue: "",
      dialogFormVisible: false,
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSizes: [5, 10, 20, 30, 50],
        pageSize: 5,
        total: 400
      },

      searchOptions: {
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          userNameOptions: []
        }
      },
      multipleSelection: [],
      rules: {
        userName: [
          { required: true, message: "请选择用户", trigger: "change" }
        ],
        brandName: [
          { required: true, message: "请选择品牌", trigger: "change" }
        ],
        customerName: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ]
      },

      ruleForm: {
        userName:"",
        brandName: "",
        brandId: "",
        customerName: "",
        customerId: "",
        name: "",
        id: "",
        options: {
          customerNameOptions: [

          ],
          brandNameOptions: [
          ],
          userNameOptions: [
 
          ]
        }
      }
    };
  },

  created: function() {
    var that = this;
    //获得品牌名字
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrand`, {
        name: undefined
      })
      .then(response => {
        // this.searchOptions.options.brandNameOptions = response.data;
        response.data.forEach(element => {
          this.searchOptions.options.brandNameOptions.push(element);
        });
      
      })
      .catch(error => {
        this.$message({
          message: "获取品牌信息失败",
          type: "error"
        });
      });

    //获得顾客名称
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getCustomer`)
      .then(response => {
        response.data.forEach(element => {
          this.searchOptions.options.customerNameOptions.push(element);
          this.ruleForm.options.customerNameOptions.push(element);
        });
      })
      .catch(error => {
        this.$message({
          message: "获取顾客信息失败",
          type: "error"
        });
      });


    //获得用户名称
    that.$axios
      .get(`${window.$config.HOST2}/getAllUserName`)
      .then(response => {
        response.data.forEach(element => {
           this.ruleForm.options.userNameOptions.push(element)
           this.searchOptions.options.userNameOptions.push(element)
        });
      })
      .catch(error => {
        console.log(error)
      });
    //获得空搜索
    this.$axios
      .get(`${window.$config.HOST}/authorityManagement/getUserDataAuthority`)
      .then(response => {
        console.log("获得品牌信息成功了");
        console.log(response.data)
        this.tableData = response.data;
      })
      .catch(error => {
      });

  },

  methods: {
    handleSearch(){
      this.$axios
        .get(`${window.$config.HOST}/authorityManagement/getUserDataAuthority`, {params:{
          userId:this.userName === "" ? undefined : this.userName,
          customerId:this.CustomerValue === "" ? undefined : this.CustomerValue,
          brandId:this.BrandValue === "" ? undefined : this.BrandValue,
        }})
        .then(response => {
          this.tableData = response.data;
        })
        .catch(error => {
        });
    },
    // 表格中的删除
    deleteRangeData(row, index) {
      const that = this;
      console.log("点击了本行的删除");
      console.log("当前row=", row.rangeNumber);
      let list = {
        id: row.id
      };
      this.$confirm("是否确认删除该系列？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })

        .then(() => {
          this.$axios
            .delete(`${window.$config.HOST}/authorityManagement/deleteUserDataAuthority`,{
              params:{
                id:row.id
              }
            })
            .then(response => {
              this.handleSearch();
              var ok = response.data;
              if (ok < 0) {
                this.$message({
                  message: "删除失败",
                  type: "error"
                });
              } else {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
              }
            })
            .catch(error => {
              this.handleSearch();
              this.$message({
                message: "删除2失败",
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            message: "删除3失败",
            type: "error"
          });
        });
    },
    // 选择框改变监控
    changeCheckBoxFun(val) {
      const that = this;
      that.multipleSelection = val;
    },

    deleteUser() {
      const that = this;
      if (that.multipleSelection.length === 0) {
        this.$message({
          message: "请选择要删除的系列数据",
          type: "warning"
        });
      } else if (that.multipleSelection.length >= 1) {
        console.log("有" + that.multipleSelection.length + "条数据被选中");
        this.$confirm(
          "删除所选的" +
            that.multipleSelection.length +
            "条系列信息, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            console.log(this.multipleSelection)
            this.multipleSelection.forEach(element => {
              console.log(element.id);
                let list = {
                  id: element.id
                };
                console.log(list)
              this.$axios
                .delete(`${window.$config.HOST}/authorityManagement/deleteUserDataAuthority`,
                {
                  params:list
                })
                .then(response => {
                  this.handleSearch();
                  var ok = response.data;
                  if (ok < 0) {
                    this.$message({
                      message: "删除失败",
                      type: "error"
                    });
                  } else {
                    this.$message({
                      message: "删除成功",
                      type: "success"
                    });
                  }
                })
                .catch(error => {
                  this.handleSearch();
                  this.$message({
                    message: "删除失败",
                    type: "error"
                  });
                });
            });

            // this.$message({
            //   type: "success",
            //   message: "删除成功!"
            // });
          })
          .catch(() => {
            this.handleSearch();
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    //当弹出框的客户名称改变的时候GET弹出框的品牌信息
    clientSelect2() {
      console.log(this.ruleForm.customerName)
      this.ruleForm.brandName = "";
      // if(this.ruleForm.customerName===0)
      // {
      //   this.ruleForm.brandNameOptions=this.searchOptions.options.brandNameOptions;
      //   return ;
      // }
      // let list = {
      //   customerId: this.ruleForm.customerName===0?"":this.ruleForm.customerName
      // // };
      // console.log(list);
      this.$axios
        .get(`${window.$config.HOST}/baseInfoManagement/getBrand`, {
          params: {
            customerId:this.ruleForm.customerName
          }
        })
        .then(response => {
          console.log(response.data);
          this.ruleForm.options.brandNameOptions =[{
              id: 0,
              name: "*"
            }];
            response.data.forEach(element=>{
               this.ruleForm.options.brandNameOptions.push(element)
            })
        })
        .catch(error => {
          this.$message({
            message: "获取品牌信息失败",
            type: "error"
          });
        });
    },
    // 添加用户
    addUser() {
      const that = this;
      this.dialogFormVisible = true;
    },

    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let userName;
          this.ruleForm.options.userNameOptions.forEach(element=>{
            if(element.id===this.ruleForm.userName)
            {
              userName=element.realName;
            }
          })
          let list={
                          		userId :this.ruleForm.userName ,
		              userName : userName,
	              	customerId :this.ruleForm.customerName ,
	              	brandId : this.ruleForm.brandName,
          }
          console.log(list)
          
          this.$axios
            .post(`${window.$config.HOST}/authorityManagement/addUserDataAuthority`,{
              		userId :this.ruleForm.userName ,
		              userName : userName,
	              	customerId :this.ruleForm.customerName ,
	              	brandId : this.ruleForm.brandName,
            })
            .then(response => {
              console.log(response.data)
              var ok = response.data;
              if (ok < 0) {
                this.$message({
                  message: "添加失败",
                  type: "warning"
                });
              } else {
                this.handleSearch();
                this.ruleForm.customerName = "",
                this.ruleForm.brandName = "",
                this.ruleForm.userName = "",
                this.dialogFormVisible = false;
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
              }
            })
            .catch(error => {
              this.handleSearch();
              this.$message({
                message: "添加成功",
                type: "success"
              });
            });
        } else {
          this.$message({
            message: "请填写必须填写的项！",
            type: "error"
          });
        }
      });
    },

    cancel() {
      (this.ruleForm.customerName = ""),
        (this.ruleForm.brandName = ""),
        (this.ruleForm.userName = ""),
        (this.dialogFormVisible = false);
    }
  }
};
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    .title {
      font-size: 14px;
      min-width: 75px;
      text-align: center;
    }
    .el-input {
      width: 300px;
      min-width: 75px;
    }
    .el-select {
      width: 300px;
      min-width: 75px;
    }
  }
  .block {
    padding: 30px 0;
    text-align: center;
  }
}
</style>