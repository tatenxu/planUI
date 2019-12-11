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
                :label="item.username"
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
            <el-button type="primary" @click="addUser">添加权限</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="deleteUser">删除权限</el-button>
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
          <el-table-column prop="clientName" width="200" label="客户名称" align="center"></el-table-column>
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
        </div>-->
      </div>
    </el-card>

    <el-dialog :modal="false" title="添加权限" :visible.sync="dialogFormVisible" :before-close="cancel">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户" prop="customerName">
              <el-select v-model="ruleForm.customerName">
                <el-option
                  v-for="item in ruleForm.options.customerNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch1">搜索</el-button>
          </el-col>

          <el-col :span="3">
            <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
          </el-col>
          <!-- <el-col :span="3">
            <el-button type="info" @click="cancel">取消</el-button>
          </el-col>-->
        </el-row>

        <div class="table">
          <el-table
            :data="ruleForm.tableData"
            max-height="400"
            @selection-change="changeCheckBoxFun1"
            :stripe="true"
            :highlight-current-row="true"
            style="width: 100%; margin-top: 20px;margin-left:30%"
          >
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="200" label="品牌" align="center"></el-table-column>
          </el-table>
        </div>
      </el-form>
    </el-dialog>

    <el-dialog
      :modal="false"
      title="添加权限"
      :visible.sync="dialogFormVisible1"
      :before-close="cancel"
    >
      <el-row :gutter="20" style="margin-top:-30px;">
        <el-col :span="6">
          <div class="title" style="font-size:20px;margin-left:100px;font-weight:700">产线</div>
        </el-col>
        <el-col :span="10">
          <div class="title" style="font-size:20px;margin-left:230px;font-weight:700">人员</div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="nextStep" style="margin-left:100px">下一步</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:15px;">
        <el-col :span="6">
          <el-tree :data="productionLine" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-col>
        <el-col :span="10">
          <el-table
            :data="personTable"
            max-height="400"
            @selection-change="changeCheckBoxFun2"
            :stripe="true"
            :highlight-current-row="true"
            style="width: 100%; margin-top: 20px;margin-left:30%"
          >
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="200" label="人员" align="center"></el-table-column>
          </el-table>
        </el-col>
      </el-row>

      <!-- <div class="table">
          <el-table
            :data="personTable"
            max-height="400"
            @selection-change="changeCheckBoxFun1"
            :stripe="true"
            :highlight-current-row="true"
            style="width: 100%; margin-top: 20px;margin-left:30%"
          >
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="200" label="人员" align="center"></el-table-column>
          </el-table>
      </div>-->
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import { POINT_CONVERSION_COMPRESSED } from "constants";
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name"
      },
      userSelectionList: [],
      userSelection: [],
      productionLine: [],
      personTable: [],
      userName: "",
      CustomerValue: "",
      BrandValue: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
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
        brandName: [
          { required: true, message: "请选择品牌", trigger: "change" }
        ],
        customerName: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ]
      },
      baseInfoManagementErrorCode: [
        {
          errorCode: 0,
          errorInfo: "未知错误"
        },
        {
          errorCode: -1,
          errorInfo: "传送的对象属性中存在null"
        },
        {
          errorCode: -2,
          errorInfo: "字段重复"
        },
        {
          errorCode: -3,
          errorInfo: "参数存在不一致"
        },
        {
          errorCode: -4,
          errorInfo: "当前数据库记录不符合逻辑要求"
        },
        {
          errorCode: -5,
          errorInfo: "未知错所要查询的数据在数据库中不存在"
        }
      ],
      ruleForm: {
        multipleSelection: [],
        tableData: [],
        userName: "",
        brandName: "",
        brandId: "",
        customerName: "",
        customerId: "",
        name: "",
        id: "",
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          userNameOptions: []
        }
      }
    };
  },

  created: function() {
    var that = this;
    //获取产线
    request.get(`${window.$config.HOST2}/product-line/find`).then(response => {
      this.productionLine = response.result;
    });

    //获得品牌名字
    request.get(`/backstage/brand/find`).then(response => {
      this.searchOptions.options.brandNameOptions = response.result;
    });

    //获得顾客名称
    request.get(`/backstage/client/find`).then(response => {
      this.searchOptions.options.customerNameOptions = response.result;
      this.ruleForm.options.customerNameOptions = response.result;
    });

    //获得用户名称
    that.$axios
      .get(`${window.$config.HOST2}/user/find`, {
        params: {
          pageNum: 1,
          pageSize: 100
        }
      })
      .then(response => {
        this.searchOptions.options.userNameOptions = response.data.result;
      })
      .catch(error => {
        console.log(error);
      });
    //获得空搜索
    request.get(`/backstage/user-client-brand/find`).then(response => {
      this.tableData = response.result;
    });
  },

  methods: {
    nextStep() {
      console.log(this.userSelection);
      if (this.userSelection.length === 0) {
        this.$message({
          message: "请至少选择一个人员！",
          type: "error"
        });
        return;
      }
      (this.dialogFormVisible1 = false), (this.dialogFormVisible = true);
    },
    handleNodeClick(data) {
      console.log(data);
      request
        .get(`${window.$config.HOST2}/user-product-line/find`, {
          params: {
            productLineId: data.id
          }
        })
        .then(response => {
          this.personTable = response.result;
        });
    },
    handleSearch() {
      request
        .get(`/backstage/user-client-brand/find`, {
          params: {
            userId: this.userName === "" ? undefined : this.userName,
            clientId:
              this.CustomerValue === "" ? undefined : this.CustomerValue,
            brandId: this.BrandValue === "" ? undefined : this.BrandValue
          }
        })
        .then(response => {
          this.tableData = response.result;
        });
    },

    handleSearch1() {
      if (this.ruleForm.customerName === "") {
        this.$message({
          message: "请选择一个客户再进行搜索！",
          type: "error"
        });
        return;
      }
      request
        .get(`/backstage/brand/find`, {
          params: {
            clientId: this.ruleForm.customerName
          }
        })
        .then(response => {
          this.ruleForm.tableData = response.result;
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
          request
            .delete(`/backstage/user-client-brand/delete`, {
              params: {
                id: row.id
              }
            })
            .then(response => {
              this.handleSearch();
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
    changeCheckBoxFun2(val) {
      const that = this;
      that.userSelection = val;
    },

    changeCheckBoxFun1(val) {
      const that = this;
      that.ruleForm.multipleSelection = val;
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
            console.log(this.multipleSelection);
            this.multipleSelection.forEach(element => {
              console.log(element.id);
              let list = {
                id: element.id
              };
              console.log(list);
              request
                .delete(`/backstage/user-client-brand/delete`, {
                  params: {
                    id: element.id
                  }
                })
                .then(response => {
                  this.handleSearch();
                })
                .catch(error => {
                  this.handleSearch();
                  this.$message({
                    message: "删除失败",
                    type: "error"
                  });
                });
            });
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

    // 添加用户
    addUser() {
      const that = this;
      (this.ruleForm.multipleSelection = []),
        (this.ruleForm.tableData = []),
        (this.ruleForm.userName = ""),
        (this.ruleForm.brandName = ""),
        (this.ruleForm.brandId = ""),
        (this.ruleForm.customerName = ""),
        (this.ruleForm.customerId = ""),
        (this.ruleForm.name = ""),
        (this.ruleForm.id = ""),
        (this.userSelection = []),
        (this.dialogFormVisible1 = true);
    },

    submitForm(formName) {
      if (this.ruleForm.multipleSelection.length === 0) {
        this.$message({
          message: "请至少选择一个品牌！",
          type: "error"
        });
        return;
      }
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.userSelection.forEach(element1 => {
            this.ruleForm.multipleSelection.forEach(element2 => {
              this.userSelectionList.push({
                userId: element1.userId,
                userName: element1.username,
                brandId: element2.id,
                clientId: this.ruleForm.customerName
              });
            });
          });

          console.log(this.userSelectionList);

          request
            .post(`/backstage/user-client-brand/insert`, this.userSelectionList)
            .then(response => {
              this.handleSearch();
              (this.ruleForm.customerName = ""),
                (this.ruleForm.brandName = ""),
                (this.ruleForm.userName = ""),
                (this.userSelection = []),
                (this.userSelectionList = []),
                (this.ruleForm.multipleSelection = []),
                (this.personTable = []),
                (this.dialogFormVisible = false);
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
        (this.userSelection = []),
        (this.userSelectionList = []),
        (this.ruleForm.multipleSelection = []),
        (this.personTable = []),
        (this.dialogFormVisible = false);
      this.dialogFormVisible1 = false;
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