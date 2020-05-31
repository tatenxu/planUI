<template>
  <el-card class="box-card">
    <el-tabs v-model="viewname" class="cardTab">
      <el-tab-pane label="客户信息管理" name="first" class="tabPane">
        <el-container class="paneContainer">
          <el-header clas="containerHeader">
            <el-row :gutter="20">
              <el-col :span="2">
                <div>
                  <el-button type="primary" @click="handleNewInfoClick()">新增信息</el-button>
                </div>
              </el-col>
              <el-col :span="2">
                <div>
                  <el-button type="primary" @click="handleEditInfoClick()">编辑信息</el-button>
                </div>
              </el-col>

              <el-col :span="2">
                <div>
                  <el-button type="primary" @click="handleDeleteInfoClick()">删除信息</el-button>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="containerHeaderDiv2">
                  <el-button type="primary" @click="handleSearchClick()">搜索客户</el-button>
                  <el-input v-model="searchInput" class="nameInput" placeholder="请输入客户名称"></el-input>
                  <span class="inputTag">客户名称</span>
                </div>
              </el-col>
            </el-row>
            <hr />
          </el-header>

          <el-main clas="containerMain">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="name" label="客户名称" width="220" align="center"></el-table-column>
              <el-table-column prop="abbreviation" label="客户简称" width="200" align="center"></el-table-column>
              <el-table-column prop="description" label="客户描述" width="420"  align="center" show-overflow-tooltip></el-table-column>
              <el-table-column prop="deptName" label="所属业务组"  align="left" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-tab-pane>

      <el-tab-pane label="新增客户信息" name="second" v-if="newCardShowFlag">
        <el-card>
          <el-form :model="addClientForm" :rules="addClientRules" ref="addClientForm" label-width="100px" class="add-ruleForm">
            <el-form-item label="客户名称:" prop="name">
              <el-input v-model="addClientForm.name" class="inputStyle" placeholder="请输入客户名称" required></el-input>
            </el-form-item>
            <el-form-item label="客户简称" prop="abbreviation">
              <el-input v-model="addClientForm.abbreviation" class="inputStyle" placeholder="请输入客户简称"></el-input>
            </el-form-item>
            <el-form-item label="所属业务组" prop="deptName">
              <el-cascader expand-trigger="hover" :options="addClientForm.options.deptOptiopns" v-model="addClientForm.deptName" :props="deptToCascaderProps" :change-on-select="true" style="width:400px"></el-cascader>
            </el-form-item>
            <el-form-item label="客户描述" prop="description">
              <el-input class="inputArea" type="textarea" :rows="4" placeholder="请输入客户描述" v-model="addClientForm.description"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="save" @click="handleNewSaveClick('addClientForm')">保存</el-button>
              <el-button type="primary" class="cancel" @click="handleNewCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑客户信息" name="third" v-if="editCardShowFlag">
        <el-card>
          <el-form :model="updateClientForm" :rules="updateClientRules" ref="updateClientForm" label-width="100px" class="add-ruleForm">
            <el-form-item label="客户名称:" prop="name">
              <el-input v-model="updateClientForm.name" class="inputStyle" placeholder="请输入客户名称" required></el-input>
            </el-form-item>
            <el-form-item label="客户简称" prop="abbreviation">
              <el-input v-model="updateClientForm.abbreviation" class="inputStyle" placeholder="请输入客户简称"></el-input>
            </el-form-item>
            <el-form-item label="所属业务组" prop="deptName">
              <el-cascader expand-trigger="hover" :options="updateClientForm.options.deptOptiopns" v-model="updateClientForm.deptName" :props="deptToCascaderProps" :change-on-select="true" style="width:400px"></el-cascader>
            </el-form-item>
            <el-form-item label="客户描述" prop="description">
              <el-input class="inputArea" type="textarea" :rows="4" placeholder="请输入客户描述" v-model="updateClientForm.description"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="save" @click="handleEditSaveClick('updateClientForm')">保存</el-button>
              <el-button type="primary" class="cancel" @click="handleEditCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import { error } from "util";
import request from "@/utils/request";
export default {
  data() {
    return {
      tableData: [],       // 表格数据
      multipleSelection: [],       // 表格选中数据
      //添加客户参数列表
      addClientForm: {       // 添加tab数据
        abbreviation: "",       // 客户简称
        deptName: "",       // 部门名称
        description: "",       // 客户描述
        name: "",       // 客户名称
        options: {       // 部门下拉框数据
          deptOptiopns: []
        }
      },
      addClientRules: {       // 数据有效性验证控制
        description: [
          { required: false, message: "请输入客户描述", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入客户名称", trigger: "blur" }],
        abbreviation: [
          { required: true, message: "请输入客户简称", trigger: "blur" }
        ],
        deptName: [
          { required: true, message: "请选择业务组", trigger: "change" }
        ]
      },
      //修改客户参数列表
      updateClientForm: {       // 更新客户部分数据
        id: "",       // 更新客户Id
        abbreviation: "",       // 更新客户的简称
        deptName: "",       // 更新客户的部门名称
        description: "",       // 更新客户的描述
        name: "",       // 更新客户的名称
        options: {
          deptOptiopns: []       // 更新客户的部门
        }
      },
      updateClientRules: {       // 数据有效性验证的控制
        description: [
          { required: false, message: "请输入客户描述", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入客户名称", trigger: "blur" }],
        abbreviation: [
          { required: true, message: "请输入客户简称", trigger: "blur" }
        ],
        deptName: [
          { required: true, message: "请选择业务组", trigger: "change" }
        ]
      },
      //业务级联表
      deptToCascaderProps: {       // 组件数据映射、详见element
        value: "name",
        label: "name",       // 用name同时代替组件中的value和label
        children: "children"
      },
      //窗口控制
      viewname: "first",       // 目前窗口tab名称
      newCardShowFlag: false,       // 控制添加客户tab的显示
      editCardShowFlag: false,       // 控制修改客户tab的显示
      //搜索框
      searchInput: ""       // 客户搜索框input数据
    };
  },
  created: function () {
    // 获取部门信息
    this.$axios
      .get(`${window.$config.HOST2}/dept/find`)
      .then(response => {
        this.addClientForm.options.deptOptiopns = response.data.result;
        this.updateClientForm.options.deptOptiopns = response.data.result;
      })
      .catch(error => {
        this.$message.error("部门信息加载失败!");
      });

    //获取客户名称下拉框数据
    request.get("/backstage/client/find").then(response => {
      this.tableData = response.result;
    });
  },
  methods: {
    // 列表数据选中获取
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 根据输入框数据模糊搜索客户
    handleSearchClick() {
      request
        .get("/backstage/client/find", {
          params: {
            name: this.searchInput
          }
        })
        .then(response => {
          this.tableData = response.result;
        });
    },
    // 添加客户的时候，跳转到添加客户tab，并清空可能存在的数据
    handleNewInfoClick() {
      this.newCardShowFlag = true;
      this.addClientForm.abbreviation = "";
      this.addClientForm.deptName = "";
      this.addClientForm.description = "";
      this.addClientForm.name = "";
      this.viewname = "second";
    },
    // 编辑客户的时候，跳转到编辑客户的tab，并传上数据
    handleEditInfoClick() {
      if (this.multipleSelection.length === 0) {      // 判断是否选择且仅选择一个客户
        this.$message({
          message: "请选择一个客户信息",
          type: "warning"
        });
        return;
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "只能选择一个信息进行编辑",
          type: "warning"
        });
        return;
      } else {
        this.editCardShowFlag = true;      // 显示更新tab
        this.updateClientForm.id = this.multipleSelection[0].id;        // 传输当前选择客户的数据到更新tab
        this.updateClientForm.name = this.multipleSelection[0].name;
        this.updateClientForm.abbreviation = this.multipleSelection[0].abbreviation;
        this.updateClientForm.deptName = this.multipleSelection[0].deptName;
        this.updateClientForm.description = this.multipleSelection[0].description;
        this.viewname = "third";      // 跳转到更新tab
      }
    },
    // 删除客户信息
    handleDeleteInfoClick() {
      if (this.multipleSelection.length === 0) {       // 判断是否选择了客户
        this.$message({
          message: "至少选择一个客户",
          type: "warning"
        });
        return;
      } else {
        this.$confirm("是否确认选中记录？", "提示", {             // 二次确认
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.multipleSelection.forEach(element => {
              request
                .delete(`/backstage/client/delete`, {
                  params: { id: element.id }
                })
                .then(response => {
                  this.handleSearchClick();
                });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    // 提交新增表格
    handleNewSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {           // 数据有效性验证
        if (valid) {
          request
            .post(`/backstage/client/insert`, {
              abbreviation: this.addClientForm.abbreviation,
              deptName: this.addClientForm.deptName[
                this.addClientForm.deptName.length - 1
              ],
              description: this.addClientForm.description,
              name: this.addClientForm.name
            })
            .then(response => {
              this.handleSearchClick();
              this.addClientForm.abbreviation = "";
              this.addClientForm.deptName = "";
              this.addClientForm.description = "";
              this.addClientForm.name = "";
              this.newCardShowFlag = false;
              this.viewname = "first";
            });
        } else {
          this.$message({
            message: "请填写所有必填项!",
            type: "error"
          });
        }
      });
    },
    //取消新增，并清空tab数据
    handleNewCancelClick() {
      this.newCardShowFlag = false;
      this.viewname = "first";
      this.addClientForm.abbreviation = "";
      this.addClientForm.deptName = "";
      this.addClientForm.description = "";
      this.addClientForm.name = "";
    },
    //提交编辑表格
    handleEditSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {      // 数据有效性验证
        if (valid) {
          request
            .put(`/backstage/client/update`, {
              abbreviation: this.updateClientForm.abbreviation,
              description: this.updateClientForm.description,
              deptName: this.updateClientForm.deptName[
                this.addClientForm.deptName.length - 1
              ],
              name: this.updateClientForm.name,
              id: this.updateClientForm.id
            })
            .then(response => {
              this.handleSearchClick();
              this.updateClientForm.abbreviation = "";
              this.updateClientForm.deptName = "";
              this.updateClientForm.description = "";
              this.updateClientForm.name = "";
              this.updateClientForm.id = "";
              this.editCardShowFlag = false;
              this.viewname = "first";
            });
        } else {
          this.$message({
            message: "请填写所有必填项!",
            type: "error"
          });
        }
      });
    },
    // 取消更新，并清空tab数据
    handleEditCancelClick() {
      this.editCardShowFlag = false;
      this.viewname = "first";
      this.updateClientForm.abbreviation = "";
      this.updateClientForm.deptName = "";
      this.updateClientForm.description = "";
      this.updateClientForm.name = "";
      this.updateClientForm.id = "";
    }
  }
};
</script>



<style lang="less" scoped>
.box-card {
  min-width: 1500px;
  margin: 20px 50px;
  padding: 0 20px;
}
.add-ruleForm {
  min-width: 250px;
  max-width: 500px;
}
// background: black;
.containerHeaderDiv2 {
  // margin-right: 100px;
  // background: white;
  display: flex;
  flex-direction: row-reverse;
  min-width: 500px;
  .nameInput {
    min-width: 100px;
    max-width: 200px;
  }
  .inputTag {
    font-size: 14px;
    line-height: 40px;
    min-width: 70px;
  }
}

.inputCombine {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  min-width: 250px;
  max-width: 500px;
  .inputTag {
    font-size: 14px;
    line-height: 40px;
    min-width: 90px;
  }
}

.secondButtonDiv {
  margin-top: 20px;
  min-width: 250px;
  max-width: 500px;
  // background: black;
  .save {
    margin-left: 68%;
  }
}
</style>

