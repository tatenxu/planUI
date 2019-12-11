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
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="id" label="id" width="120" v-if="false"></el-table-column>
              <el-table-column prop="name" label="客户名称" width="120"></el-table-column>
              <el-table-column prop="abbreviation" label="客户简称" width="120"></el-table-column>
              <el-table-column prop="description" label="客户描述" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="deptName" label="所属业务组" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-tab-pane>

      <el-tab-pane label="新增客户信息" name="second" v-if="newCardShowFlag">
        <el-card>
          <el-form
            :model="addClientForm"
            :rules="addClientRules"
            ref="addClientForm"
            label-width="100px"
            class="add-ruleForm"
          >
            <el-form-item label="客户名称:" prop="name">
              <el-input
                v-model="addClientForm.name"
                class="inputStyle"
                placeholder="请输入客户名称"
                required
              ></el-input>
            </el-form-item>
            <el-form-item label="客户简称" prop="abbreviation">
              <el-input
                v-model="addClientForm.abbreviation"
                class="inputStyle"
                placeholder="请输入客户简称"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属业务组" prop="deptName">
              <el-cascader
                expand-trigger="hover"
                :options="addClientForm.options.deptOptiopns"
                v-model="addClientForm.deptName"
                :props="deptToCascaderProps"
                :change-on-select="true"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="客户描述" prop="description">
              <el-input
                class="inputArea"
                type="textarea"
                :rows="4"
                placeholder="请输入客户描述"
                v-model="addClientForm.description"
              ></el-input>
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
          <el-form
            :model="updateClientForm"
            :rules="updateClientRules"
            ref="updateClientForm"
            label-width="100px"
            class="add-ruleForm"
          >
            <el-form-item label="客户名称:" prop="name">
              <el-input
                v-model="updateClientForm.name"
                class="inputStyle"
                placeholder="请输入客户名称"
                required
              ></el-input>
            </el-form-item>
            <el-form-item label="客户简称" prop="abbreviation">
              <el-input
                v-model="updateClientForm.abbreviation"
                class="inputStyle"
                placeholder="请输入客户简称"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属业务组" prop="deptName">
              <el-cascader
                expand-trigger="hover"
                :options="updateClientForm.options.deptOptiopns"
                v-model="updateClientForm.deptName"
                :props="deptToCascaderProps"
                :change-on-select="true"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="客户描述" prop="description">
              <el-input
                class="inputArea"
                type="textarea"
                :rows="4"
                placeholder="请输入客户描述"
                v-model="updateClientForm.description"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="save"
                @click="handleEditSaveClick('updateClientForm')"
              >保存</el-button>
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
      tableData: [],
      multipleSelection: [],
      //添加客户参数列表
      addClientForm: {
        abbreviation: "",
        deptName: "",
        description: "",
        name: "",
        options: {
          deptOptiopns: []
        }
      },
      addClientRules: {
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
      updateClientForm: {
        id: "",
        abbreviation: "",
        deptName: "",
        description: "",
        name: "",
        options: {
          deptOptiopns: []
        }
      },
      updateClientRules: {
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
      deptToCascaderProps: {
        value: "name",
        label: "name",
        children: "children"
      },
      //窗口控制
      viewname: "first",
      newCardShowFlag: false,
      editCardShowFlag: false,
      //搜索框
      searchInput: ""
    };
  },
  created: function() {
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

    //加载默认客户信息
    request.get("/backstage/client/find").then(response => {
      this.tableData = response.result;
    });
  },
  methods: {
    //列表选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //搜索客户
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
    //新增客户信息
    handleNewInfoClick() {
      this.newCardShowFlag = true;
      this.addClientForm.abbreviation = "";
      this.addClientForm.deptName = "";
      this.addClientForm.description = "";
      this.addClientForm.name = "";
      this.viewname = "second";
    },
    //编辑客户信息
    handleEditInfoClick() {
      if (this.multipleSelection.length === 0) {
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
        this.editCardShowFlag = true;
        this.updateClientForm.id = this.multipleSelection[0].id;
        this.updateClientForm.name = this.multipleSelection[0].name;
        this.updateClientForm.abbreviation = this.multipleSelection[0].abbreviation;
        this.updateClientForm.deptName = this.multipleSelection[0].deptName;
        this.updateClientForm.description = this.multipleSelection[0].description;
        this.viewname = "third";
      }
    },
    //删除客户信息
    handleDeleteInfoClick() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "至少选择一个客户",
          type: "warning"
        });
        return;
      } else {
        this.$confirm("是否确认选中记录？", "提示", {
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

      // this.tableData = this.multipleSelection;
    },
    //提交新增表格
    handleNewSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
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
    //取消新增
    handleNewCancelClick() {
      this.newCardShowFlag = false;
      this.viewname = "first";
      this.addClientForm.abbreviation = "";
      this.addClientForm.deptName = "";
      this.addClientForm.description = "";
      this.addClientForm.name = "";
    },
    //提交编辑表格
    handleEditSaveClick() {
      const that = this;
      this.$refs[formName].validate(valid => {
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

