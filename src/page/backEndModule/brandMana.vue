<template>
  <el-card class="box-card">
    <el-tabs v-model="viewname" @tab-click="handleTabClick" class="cardTab">
      <el-tab-pane label="品牌信息管理" name="first" class="tabPane">
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
                  <el-button @click="handleSearchClick()" type="primary">搜索品牌</el-button>
                  <el-input v-model="searchInput" class="nameInput" placeholder="请输入品牌名称"></el-input>
                  <span class="inputTag">品牌名称</span>
                </div>
              </el-col>
            </el-row>

            <hr />
          </el-header>

          <el-main clas="containerMain">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border style="width: 100%" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="name" label="品牌名称" width="220" align="center"></el-table-column>
              <el-table-column prop="abbreviation" label="品牌简称" width="200" align="center"></el-table-column>
              <el-table-column prop="description" label="品牌描述" width="420" align="center"></el-table-column>
              <el-table-column prop="clientName" label="所属客户" align="left" show-overflow-tooltip></el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-tab-pane>

      <el-tab-pane label="新增品牌信息" name="second" v-if="addCardShowFlag">
        <el-card>
          <el-form :model="addBrandForm" :rules="addBrandRules" ref="addBrandForm" label-width="100px" class="add-ruleForm">
            <el-form-item label="品牌名称" prop="name">
              <el-input v-model="addBrandForm.name" class="inputStyle" placeholder="请输入品牌名称"></el-input>
            </el-form-item>
            <el-form-item label="品牌简称" prop="abbreviation">
              <el-input v-model="addBrandForm.abbreviation" class="inputStyle" placeholder="请输入品牌简称"></el-input>
            </el-form-item>
            <el-form-item label="所属客户" prop="clientId">
              <el-select v-model="addBrandForm.clientId" placeholder="请选择" class="inputSelector">
                <el-option v-for="item in addBrandForm.options.clientOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌描述" prop="description">
              <el-input class="inputArea" type="textarea" :rows="4" placeholder="请输入品牌描述" v-model="addBrandForm.description"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="save" @click="handleNewSaveClick('addBrandForm')">保存</el-button>
              <el-button type="primary" class="cancel" @click="handleNewCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑品牌信息" name="third" v-if="editCardShowFlag">
        <el-card>
          <el-form :model="updateBrandForm" :rules="updateBrandRules" ref="updateBrandForm" label-width="100px" class="add-ruleForm">
            <el-form-item label="品牌名称" prop="name">
              <el-input v-model="updateBrandForm.name" class="inputStyle" placeholder="请输入品牌名称"></el-input>
            </el-form-item>
            <el-form-item label="品牌简称" prop="abbreviation">
              <el-input v-model="updateBrandForm.abbreviation" class="inputStyle" placeholder="请输入品牌简称"></el-input>
            </el-form-item>
            <el-form-item label="所属客户" prop="clientId">
              <el-select v-model="updateBrandForm.clientId" placeholder="请选择" class="inputSelector">
                <el-option v-for="item in updateBrandForm.options.clientOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌描述" prop="description">
              <el-input class="inputArea" type="textarea" :rows="4" placeholder="请输入品牌描述" v-model="updateBrandForm.description"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="save" @click="handleEditSaveClick('updateBrandForm')">保存</el-button>
              <el-button type="primary" class="cancel" @click="handleEditCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>




<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      //添加品牌参数列表
      addBrandForm: {
        abbreviation: "",
        clientId: "",
        description: "",
        name: "",
        options: {
          clientOptions: []
        }
      },
      addBrandRules: {
        description: [
          { required: false, message: "请输入品牌描述", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入品牌名称", trigger: "blur" }],
        abbreviation: [
          { required: true, message: "请输入品牌简称", trigger: "blur" }
        ],
        clientId: [{ required: true, message: "请选择客户", trigger: "change" }]
      },
      //修改客户参数列表
      updateBrandForm: {
        id: "",
        abbreviation: "",
        clientId: "",
        description: "",
        name: "",
        options: {
          clientOptions: []
        }
      },
      updateBrandRules: {
        description: [
          { required: false, message: "请输入品牌描述", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入品牌名称", trigger: "blur" }],
        abbreviation: [
          { required: true, message: "请输入品牌简称", trigger: "blur" }
        ],
        clientId: [{ required: true, message: "请选择客户", trigger: "change" }]
      },
      //窗口控制
      viewname: "first",
      addCardShowFlag: false,
      editCardShowFlag: false,
      //搜索框
      searchInput: ""
    };
  },
  created: function () {
    //加载客户选择框
    request.get(`/backstage/client/find`).then(response => {
      this.addBrandForm.options.clientOptions = response.result;
      this.updateBrandForm.options.clientOptions = response.result;
    });

    //加载所有品牌
    request.get(`/backstage/brand/find`).then(response => {
      this.tableData = response.result;
    });
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    //列表选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //搜索列表
    handleSearchClick() {
      request
        .get(`/backstage/brand/find`, {
          params: {
            name: this.searchInput
          }
        })
        .then(response => {
          this.tableData = response.result;
        });
    },
    //添加品牌信息
    handleNewInfoClick() {
      this.addCardShowFlag = true;
      this.viewname = "second";
      this.addBrandForm.abbreviation = "";
      this.addBrandForm.clientId = "";
      this.addBrandForm.description = "";
      this.addBrandForm.name = "";
    },
    //编辑品牌信息
    handleEditInfoClick() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择一个品牌信息",
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
        this.updateBrandForm.id = this.multipleSelection[0].id;
        this.updateBrandForm.name = this.multipleSelection[0].name;
        this.updateBrandForm.abbreviation = this.multipleSelection[0].abbreviation;
        this.updateBrandForm.clientId = this.multipleSelection[0].clientId;
        this.updateBrandForm.description = this.multipleSelection[0].description;
        this.viewname = "third";
      }
    },
    //删除品牌信息
    handleDeleteInfoClick() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "至少选择一个品牌",
          type: "warning"
        });
      } else {
        this.$confirm("是否确认选中记录？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.multipleSelection.forEach(element => {
              request
                .delete(`/backstage/brand/delete`, {
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
    //新增表格提交
    handleNewSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .post(`/backstage/brand/insert`, {
              abbreviation: this.addBrandForm.abbreviation,
              clientId: this.addBrandForm.clientId,
              description: this.addBrandForm.description,
              name: this.addBrandForm.name
            })
            .then(response => {
              this.handleSearchClick();
              this.addBrandForm.name = "";
              this.addBrandForm.abbreviation = "";
              this.addBrandForm.clientId = "";
              this.addBrandForm.description = "";
              this.addCardShowFlag = false;
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
      this.addCardShowFlag = false;
      this.viewname = "first";
      this.addBrandForm.name = "";
      this.addBrandForm.abbreviation = "";
      this.addBrandForm.clientId = "";
      this.addBrandForm.description = "";
    },
    //编辑表格提交
    handleEditSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .put(`/backstage/brand/update`, {
              abbreviation: this.updateBrandForm.abbreviation,
              clientId: this.updateBrandForm.clientId,
              description: this.updateBrandForm.description,
              name: this.updateBrandForm.name,
              id: this.updateBrandForm.id
            })
            .then(response => {
              this.handleSearchClick(true);
              this.updateBrandForm.name = "";
              this.updateBrandForm.abbreviation = "";
              this.updateBrandForm.clientId = "";
              this.updateBrandForm.description = "";
              this.updateBrandForm.id = "";
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
    //取消编辑
    handleEditCancelClick() {
      this.editCardShowFlag = false;
      this.viewname = "first";
      this.updateBrandForm.name = "";
      this.updateBrandForm.abbreviation = "";
      this.updateBrandForm.clientId = "";
      this.updateBrandForm.description = "";
      this.updateBrandForm.id = "";
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

.add-ruleForm {
  min-width: 250px;
  max-width: 500px;
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
    min-width: 70px;
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