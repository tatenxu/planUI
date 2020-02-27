<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">用户</div>
            <el-select v-model="searchForm.userId" :clearable="true">
              <el-option v-for="item in searchForm.options.userIdOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="searchForm.clientId" :clearable="true">
              <el-option v-for="item in searchForm.options.clientIdOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="searchForm.brandId" :clearable="true">
              <el-option v-for="item in searchForm.options.brandIdOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
            <el-button type="primary" @click="addPrivilegePanel">添加权限</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="deletePrivilege">删除权限</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" max-height="400" border @selection-change="changeCheckBoxFun" :stripe="true" :highlight-current-row="true" style="width: 100%; margin-top: 20px">
          <el-table-column type="selection" width="50px" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="userName" width="300" label="用户" align="center"></el-table-column>
          <el-table-column prop="clientName" width="300" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" width="300" label="品牌" align="center"></el-table-column>
          <el-table-column label="操作" width="200" min-width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="deleteRangeData(scope.row,scope.index)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-dialog :modal="false" title="添加权限" :visible.sync="addPrivilegePanelFlagS2" width="1000px">
      <el-form :model="addPrivilege" :rules="addPrivilegeRules" ref="addPrivilege" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="3">
            <el-button type="primary" icon="el-icon-search" @click="searchBrandTable">搜索</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="submitForm()">添加</el-button>
          </el-col>
        </el-row>
        <div class="table">
          <el-table :data="addPrivilege.clientTable" max-height="400" ref="multipleTableClient" @selection-change="clientTableChanged" :stripe="true" :highlight-current-row="true" style="width:40%;margin-top: 20px;margin-left:30%">
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="200" label="客户" align="center"></el-table-column>
          </el-table>
        </div>
        <div class="table">
          <el-table :data="addPrivilege.brandTable" max-height="400" ref="multipleTableBrand" @selection-change="brandTableChanged" :stripe="true" :highlight-current-row="true" style="width:40%;margin-top: 20px;margin-left:30%">
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="200" label="品牌" align="center"></el-table-column>
          </el-table>
        </div>
      </el-form>
    </el-dialog>

    <!-- <el-dialog :modal="false" title="添加权限" :visible.sync="addPrivilegePanelFlagS1" width="1000px">
      <el-row :gutter="20" style="margin-top:10px;">
        <el-col :span="10">
          <div class="bar">
            <div class="title">人员名称</div>
            <el-input v-model="addPrivilege.searchName" clearable placeholder="请输入"></el-input>
            <el-button type="primary" @click="searchPersonByName" style="margin-left:20px">搜索</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="nextStep" style="margin-left:100px">下一步</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:10px;">
        <el-col :span="6">
          <div class="title" style="font-size:20px;margin-left:100px;font-weight:700">产线</div>
        </el-col>
        <el-col :span="10">
          <div class="title" style="font-size:20px;margin-left:230px;font-weight:700">人员</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:15px;">
        <el-col :span="6">
          <el-tree :data="addPrivilege.productionLine" ref="tree" node-key="id" :highlight-current="true" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-col>
        <el-col :span="10">
          <el-table :data="addPrivilege.personTable" max-height="400" ref="multipleTablePerson" @selection-change="personChanged" :stripe="true" :highlight-current-row="true" style="width: 100%; margin-top: 20px;margin-left:30%">
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="200" label="人员" align="center"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog> -->

    <el-dialog :modal="false" title="添加权限" width="1200px" :visible.sync="addPrivilegePanelFlagS1">
      <el-row :gutter="20" style="margin-top:0px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">人员名称</div>
            <el-input v-model="addPrivilege.personName" clearable placeholder="请输入" style="width:250px"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">部门</div>
            <el-cascader expand-trigger="hover" :options="addPrivilege.options.deptOptiopns" clearable v-model="addPrivilege.deptName" :props="deptToCascaderProps" :change-on-select="true" style="width:400px"></el-cascader>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">产线</div>
            <el-cascader expand-trigger="hover" :options="addPrivilege.options.productLineOptions" clearable v-model="addPrivilege.productLine" :props="deptToCascaderProps" :change-on-select="true" style="width:400px"></el-cascader>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="searchPersonByPDP" style="margin-left:100px">搜索</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top:15px;">
        <el-col :span="13">
          <el-table :data="addPrivilege.personTable" max-height="400" ref="multipleTablePerson" @selection-change="personChanged" :stripe="true" :highlight-current-row="true" style="width: 100%; margin-top: 20px;margin-left:30%">
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="200" label="人员" align="center"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="nextStep" style="margin-left:348px;margin-top:30px">下一步</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import { POINT_CONVERSION_COMPRESSED } from "constants";
export default {
  data() {
    return {
      deptToCascaderProps: {
        value: "id",
        label: "name",
        children: "children"
      },
      //搜索数据:
      searchForm: {
        userId: "",
        brandId: "",
        clientId: "",
        options: {
          userIdOptions: [],
          brandIdOptions: [],
          clientIdOptions: []
        }
      },
      //主table
      tableData: [],
      multipleSelection: [],
      //添加权限控制数据
      addPrivilegePanelFlagS1: false,
      addPrivilegePanelFlagS2: false,
      addPrivilege: {
        productLine: "",
        deptName: "",
        personName: "",
        searchName: "",
        productionLine: [],
        personTable: [],
        allPersonTable: [],
        userSelection: [],
        clientTable: [],
        clientSelection: [],
        brandTable: [],
        brandSelection: [],
        options: {
          productLineOptions: [],
          deptOptiopns: [],

        }
      },
      addPrivilegeRules: {

      },
      //控制产线显示
      defaultProps: {
        children: "children",
        label: "name"
      },

    };
  },

  created: function () {
    var that = this;
    // 获取部门信息
    this.$axios
      .get(`${window.$config.HOST2}/dept/find`)
      .then(response => {
        this.addPrivilege.options.deptOptiopns = response.data.result;
      })
      .catch(error => {
        this.$message.error("部门信息加载失败!");
      });
    //获取产线
    request.get(`${window.$config.HOST2}/product-line/find`).then(response => {
      // this.addPrivilege.productionLine = response.result;
      this.addPrivilege.options.productLineOptions = response.result;

    });

    //获得品牌名字
    request.get(`/backstage/brand/find`).then(response => {
      this.searchForm.options.brandIdOptions = response.result;
    });

    //获得顾客名称
    request.get(`/backstage/client/find`).then(response => {
      this.searchForm.options.clientIdOptions = response.result;
      this.addPrivilege.clientTable = response.result;
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
        this.searchForm.options.userIdOptions = response.data.result;
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
    searchPersonByPDP() {
      this.$axios
        .get(`${window.$config.HOST2}/user/find-dup`,
          {
            params: {
              name: this.addPrivilege.personName === "" ? undefined : this.addPrivilege.personName,
              deptId: (this.addPrivilege.deptName === "" || this.addPrivilege.deptName === null) ? undefined : this.addPrivilege.deptName[this.addPrivilege.deptName.length - 1],
              productLineId: (this.addPrivilege.productLine === "" || this.addPrivilege.productLine === null) ? undefined : this.addPrivilege.productLine[this.addPrivilege.productLine.length - 1]
            }
          })
        .then(response => {
          this.addPrivilege.personTable = response.data.result;
        })
        .catch(error => {
          this.$message.error("人员信息加载失败!");
        });
    },
    //根据名字搜索人物
    searchPersonByName() {
      this.addPrivilege.personTable = [];
      this.addPrivilege.allPersonTable.forEach(element => {
        if (element.name.indexOf(this.addPrivilege.searchName) >= 0)
          this.addPrivilege.personTable.push(element);
      });
    },
    //进入添加权限下一步
    nextStep() {
      if (this.addPrivilege.userSelection.length === 0) {
        this.$message({
          message: "请至少选择一个人员！",
          type: "error"
        });
        return;
      }
      this.addPrivilegePanelFlagS1 = false;
      this.addPrivilegePanelFlagS2 = true;
      this.$nextTick(() => {
        this.$refs.multipleTableBrand.clearSelection();
        this.$refs.multipleTableClient.clearSelection();
      })
    },
    //选择产线获取产线内人员
    handleNodeClick(data) {
      request
        .get(`${window.$config.HOST2}/user-product-line/find`, {
          params: {
            productLineId: data.id
          }
        })
        .then(response => {
          this.addPrivilege.personTable = response.result;
          this.addPrivilege.allPersonTable = response.result;
        });
    },
    //搜索权限信息 
    handleSearch() {
      request
        .get(`/backstage/user-client-brand/find`, {
          params: {
            userId: this.searchForm.userId === "" ? undefined : this.searchForm.userId,
            clientId: this.searchForm.clientId === "" ? undefined : this.searchForm.clientId,
            brandId: this.searchForm.brandId === "" ? undefined : this.searchForm.brandId
          }
        })
        .then(response => {
          this.tableData = response.result;
        });
    },
    //根据客户获取品牌表格
    searchBrandTable() {
      if (this.addPrivilege.clientSelection.length > 0) {
        this.addPrivilege.brandTable = [];
        this.addPrivilege.clientSelection.forEach(ele => {
          request
            .get(`/backstage/brand/find`, {
              params: {
                clientId: ele.id
              }
            })
            .then(response => {
              response.result.forEach(element => {
                this.addPrivilege.brandTable.push(element);
              })

            });
        })
      } else {
        this.$message({
          message: "请选择一个客户再进行搜索！",
          type: "error"
        });
        return;
      }


    },
    // 表格中的删除
    deleteRangeData(row, index) {
      const that = this;
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
            message: "已取消删除！",
            type: "info"
          });
        });
    },
    // 选择框改变监控
    changeCheckBoxFun(val) {
      const that = this;
      that.multipleSelection = val;
    },
    //表格人员选择
    personChanged(val) {
      const that = this;
      that.addPrivilege.userSelection = val;
    },
    //表格品牌选择
    brandTableChanged(val) {
      const that = this;
      that.addPrivilege.brandSelection = val;
    },
    //表格客户选择
    clientTableChanged(val) {
      const that = this;
      that.addPrivilege.clientSelection = val;
    },
    //批量删除权限
    deletePrivilege() {
      const that = this;
      if (that.multipleSelection.length === 0) {
        this.$message({
          message: "请选择要删除的系列数据",
          type: "warning"
        });
      } else if (that.multipleSelection.length >= 1) {
        this.$confirm(
          "删除所选的" +
          that.multipleSelection.length +
          "条权限信息, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            this.multipleSelection.forEach(element => {
              request
                .delete(`/backstage/user-client-brand/delete`, {
                  params: {
                    id: element.id
                  }
                })
                .then(response => {
                  this.handleSearch();
                })
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除！"
            });
          });
      }
    },

    // 添加用户
    addPrivilegePanel() {
      // const that = this;

      this.addPrivilegePanelFlagS1 = true;

      // this.addPrivilege.searchName = "";
      // this.addPrivilege.personTable = [];
      // this.addPrivilege.allPersonTable = [];

      // this.addPrivilege.brandTable = [];
      // this.$nextTick(() => {
      //   this.$nextTick(() => {
      //     for (let i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
      //       this.$refs.tree.store._getAllNodes()[i].expanded = false;
      //     }
      //   });
      // this.$refs.multipleTablePerson.clearSelection();
      // })
      this.addPrivilege.personName = "";
      this.addPrivilege.deptName = "";
      this.addPrivilege.productLine = "";
      this.addPrivilege.userSelection = [];
      this.addPrivilege.personTable = [];
      this.$nextTick(() => {
        this.$refs.multipleTablePerson.clearSelection();
      })
    },

    submitForm() {
      if (this.addPrivilege.brandSelection.length === 0) {
        this.$message({
          message: "请至少选择一个品牌！",
          type: "error"
        });
        return;
      }
      const that = this;
      let list = [];
      this.addPrivilege.userSelection.forEach(element => {
        this.addPrivilege.brandSelection.forEach(ele => {
          list.push({
            userId: element.id,
            userName: element.name,
            brandId: ele.id,
            clientId: ele.clientId
          });
        });
      });
      request
        .post(`/backstage/user-client-brand/insert`, list)
        .then(response => {
          this.handleSearch();
          this.addPrivilegePanelFlagS2 = false;
        });


    },
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 1100px;
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
</style>