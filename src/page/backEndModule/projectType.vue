<template>
  <div class="box-card">
    <el-tabs v-model="viewname" @tab-click="handleViewChange">
      <el-tab-pane label="项目类型管理" name="first">
        <el-card class="submainCard">
          <el-container>
            <el-main class="subAside">
              <el-container class="paneContainer">
                <el-header clas="containerHeader">
                  <div class="containerHeaderDiv">
                    <el-button
                      type="primary"
                      class="cateButton"
                      @click="handleAddProjectTypeClick()"
                    >新增</el-button>
                    <el-button
                      type="primary"
                      class="cateButton"
                      @click="handleEditProjectTypeClick()"
                    >编辑</el-button>
                    <el-button
                      type="primary"
                      class="cateButton"
                      @click="handleDeleteProjectTypeClick()"
                    >删除</el-button>
                  </div>
                  <hr />
                </el-header>

                <el-main clas="containerMain">
                  <el-table :data="projectType.tableData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column label width="65">
                      <template slot-scope="scope">
                        <el-radio
                          :label="scope.row.id"
                          v-model="templateRadioProjectType"
                          @change.native="handleProjectSelectionChange(scope.row)"
                        >{{scope.$index+1}}</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column prop="id" v-if="false" label="id" show-overflow-tooltip></el-table-column>
                    <el-table-column
                      prop="name"
                      label="项目类型"
                      show-overflow-tooltip
                      :render-header="renderHeader"
                    ></el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-main>

            <hr class="hr" />

            <el-main class="subMain">
              <el-container class="paneContainer">
                <el-header clas="containerHeader">
                  <div class="containerHeaderDiv">
                    <el-button type="primary" class="cateButton" @click="handleAddOrderClick()">新增</el-button>
                    <el-button type="primary" class="cateButton" @click="handleEditOrderClick()">编辑</el-button>
                    <el-button
                      type="primary"
                      class="cateButton"
                      @click="handleDeleteOrderClick()"
                    >删除</el-button>
                  </div>
                  <hr />
                </el-header>

                <el-main clas="containerMain">
                  <el-table :data="orderStage.tableData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column label width="65">
                      <template slot-scope="scope">
                        <el-radio
                          :label="scope.row.id"
                          v-model="templateRadioOrder"
                          @change.native="handleOrderSelectionChange(scope.row)"
                        >{{scope.$index+1}}</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column prop="id" label="id" v-if="false" show-overflow-tooltip></el-table-column>
                    <el-table-column
                      prop="name"
                      label="订单阶段"
                      show-overflow-tooltip
                      :render-header="renderHeader"
                    ></el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-main>
          </el-container>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="新增项目类型" name="second" v-if="addProjectTypeShowFlag">
        <el-card>
          <el-form
            :model="projectType.addProjectType"
            :rules="projectType.addProjectTypeRules"
            ref="projectType.addProjectType"
            label-width="100px"
            class="add-ruleForm"
          >
            <el-form-item label="项目类型" prop="name">
              <el-input v-model="projectType.addProjectType.name" placeholder="请输入项目类型名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="save"
                @click="handleAddProjectTypeSaveClick('projectType.addProjectType')"
              >保存</el-button>
              <el-button type="primary" class="cancel" @click="handleAddProjectTypeCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑项目类型" name="third" v-if="editProjectTypeShowFlag">
        <el-card>
          <el-form
            :model="projectType.updateProjectType"
            :rules="projectType.updateProjectTypeRules"
            ref="projectType.updateProjectType"
            label-width="100px"
            class="add-ruleForm"
          >
            <el-form-item label="项目类型" prop="name">
              <el-input v-model="projectType.updateProjectType.name" placeholder="请输入项目类型名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="save"
                @click="handleEditProjectTypeSaveClick('projectType.updateProjectType')"
              >保存</el-button>
              <el-button
                type="primary"
                class="cancel"
                @click="handleEditProjectTypeCancelClick()"
              >取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="新增订单属性" name="fourth" v-if="addOrderShowFlag">
        <el-card>
          <el-form
            :model="orderStage.addOrder"
            :rules="orderStage.addOrderRules"
            ref="orderStage.addOrder"
            label-width="130px"
            class="add-ruleForm"
          >
            <el-form-item label="订单阶段" prop="name">
              <el-input v-model="orderStage.addOrder.name" class="input" placeholder="请输入订单属性名称"></el-input>
            </el-form-item>

            <el-form-item label="所属项目类型" prop="projectTypeId">
              <el-select
                v-model="orderStage.addOrder.projectTypeId"
                placeholder="请选择"
                class="inputSelector"
              >
                <el-option
                  v-for="item in orderStage.addOrder.options.projectTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="save"
                @click="handleAddOrderSaveClick('orderStage.addOrder')"
              >保存</el-button>
              <el-button type="primary" class="cancel" @click="handleAddOrderCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑订单属性" name="fifth" v-if="editOrderShowFlag">
        <el-card>
          <el-form
            :model="orderStage.updateOrder"
            :rules="orderStage.updateOrderRules"
            ref="orderStage.updateOrder"
            label-width="130px"
            class="add-ruleForm"
          >
            <el-form-item label="订单阶段" prop="name">
              <el-input v-model="orderStage.updateOrder.name" class="input" placeholder="请输入订单属性名称"></el-input>
            </el-form-item>

            <el-form-item label="所属项目类型" prop="projectTypeId">
              <el-select
                v-model="orderStage.updateOrder.projectTypeId"
                placeholder="请选择"
                class="inputSelector"
              >
                <el-option
                  v-for="item in orderStage.updateOrder.options.projectTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="save"
                @click="handleEditOrderSaveClick('orderStage.updateOrder')"
              >保存</el-button>
              <el-button type="primary" class="cancel" @click="handleEditOrderCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      //单选控制
      templateRadioProjectType: "",      // 项目类型单选控制
      templateRadioOrder: "",      // 订单编号单选控制
      //项目类型部分参数
      projectType: {
        tableData: [],      // 项目类型表格数据
        multipleSelection: [],      // 项目类型选中数据
        addProjectType: {
          name: ""      // 添加项目类型名称
        },
        addProjectTypeRules: {      // 数据有效性控制 
          name: [
            { required: true, message: "请输入项目类型名称", trigger: "blur" }
          ]
        },
        updateProjectType: {      // 更新项目类型数据
          name: "",      // 更新项目类型名称
          id: ""      // 更新项目类型ID
        },
        updateProjectTypeRules: {      // 数据有效性控制
          name: [
            { required: true, message: "请输入项目类型名称", trigger: "blur" }
          ]
        }
      },
      //订单阶段部分参数
      orderStage: {
        tableData: [],      // 订单编号表格数据
        multipleSelection: [],      // 订单编号选中数据
        addOrder: {
          name: "",      // 添加订单编号名称
          projectTypeId: "",      // 添加订单编号所属项目类型
          options: {      // 下拉框数据
            projectTypeOptions: []
          }
        },
        addOrderRules: {      // 数据有效性验证
          name: [
            { required: true, message: "请输入订单阶段名称", trigger: "blur" }
          ],
          projectTypeId: [
            { required: true, message: "请选择所属项目类型", trigger: "change" }
          ]
        },
        updateOrder: {
          id: "",      // 更新订单编号ID
          name: "",      // 更新订单编号名称
          projectTypeId: "",      // 更新订单编号所属项目类型
          options: {      // 下拉框数据
            projectTypeOptions: []
          }
        },
        updateOrderRules: {      // 更新数据有效性控制
          name: [
            { required: true, message: "请输入订单阶段名称", trigger: "blur" }
          ],
          projectTypeId: [
            { required: true, message: "请选择所属项目类型", trigger: "change" }
          ]
        }
      },
      //窗口控制参数
      addProjectTypeShowFlag: false,      // 添加项目类型tab隐藏控制
      editProjectTypeShowFlag: false,      // 更新项目类型tab隐藏控制
      addOrderShowFlag: false,      // 添加订单编号tab隐藏控制
      editOrderShowFlag: false,      // 更新订单编号tab隐藏控制
      viewname: "first"      // 当前tab
    };
  },

  created: function() {
    //加载所有的项目类型
    request.get(`/backstage/project-type/find`).then(response => {
      this.projectType.tableData = response.result;
      this.orderStage.addOrder.options.projectTypeOptions = response.result;
      this.orderStage.updateOrder.options.projectTypeOptions = response.result;
    });
  },
  methods: {
    //渲染表头的样式
    renderHeader(h, { column }) {
      return h("div", {
        attrs: {
          class: "cell" //ele原来样式
        },
        domProps: {
          innerHTML:
            "<span style='font-weight:900;font-size:18px'>" +
            column.label +
            "</span>"
        }
      });
    },
    //重新搜索订单阶段
    reSearchOrder(projectTypeId) {
      request
        .get(`/backstage/order-stage/find`, {
          params: { projectTypeId: projectTypeId }
        })
        .then(response => {
          this.orderStage.tableData = response.result;
        });
    },
    //重新搜索项目类型
    reSearchProjectType() {
      request.get(`/backstage/project-type/find`).then(response => {
        this.projectType.tableData = response.result;
        this.orderStage.addOrder.options.projectTypeOptions = response.result;
        this.orderStage.updateOrder.options.projectTypeOptions =
          response.result;
      });
    },
    //element组件自带方法
    handleViewChange(tab, event) {
      console.log(tab, event);
    },
    //项目类型选择
    handleProjectSelectionChange(val) {
      this.projectType.multipleSelection = val;
      this.orderStage.tableData = [];
      this.reSearchOrder(val.id);
    },
    //订单阶段选中
    handleOrderSelectionChange(val) {
      this.orderStage.multipleSelection = val;
    },

    //新增项目类型tab跳转，并清空tab数据
    handleAddProjectTypeClick() {
      this.addProjectTypeShowFlag = true;
      this.projectType.addProjectType.name = "";
      this.viewname = "second";
    },
    //修改项目类型tab跳转，并清空tab数据
    handleEditProjectTypeClick() {
      if (this.projectType.multipleSelection.id === undefined) {
        this.$message({
          type: "error",
          message: "请选择一个项目类型!"
        });
        return;
      } else {
        this.projectType.updateProjectType.id = this.projectType.multipleSelection.id;
        this.projectType.updateProjectType.name = this.projectType.multipleSelection.name;
        this.editProjectTypeShowFlag = true;
        this.viewname = "third";
      }
    },
    //删除项目类型tab跳转，并清空tab数据
    handleDeleteProjectTypeClick() {
      if (this.projectType.multipleSelection.id === undefined) {
        this.$message({
          message: "至少选择一个项目类型",
          type: "warning"
        });
        return;
      } else {
        this.$confirm("是否确认删除该记录？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            request
              .delete(`/backstage/project-type/delete`, {
                params: { id: this.projectType.multipleSelection.id }
              })
              .then(response => {
                this.reSearchProjectType();
                this.templateRadioProjectType = "";
                this.projectType.multipleSelection = [];
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

    //新增订单阶段tab跳转，并清空tab数据
    handleAddOrderClick() {
      this.addOrderShowFlag = true;
      this.orderStage.addOrder.name = "";
      this.orderStage.addOrder.projectTypeId = "";
      this.viewname = "fourth";
    },
    //修改订单阶段tab跳转，并清空tab数据
    handleEditOrderClick() {
      if (this.orderStage.multipleSelection.id === undefined) {
        this.$message({
          type: "error",
          message: "请选择一个订单属性!"
        });
        return;
      } else {
        this.orderStage.updateOrder.id = this.orderStage.multipleSelection.id;
        this.orderStage.updateOrder.name = this.orderStage.multipleSelection.name;
        this.orderStage.updateOrder.projectTypeId = this.orderStage.multipleSelection.projectTypeId;
        this.editOrderShowFlag = true;
        this.viewname = "fifth";
      }
    },
    //删除订单阶段tab跳转，并清空tab数据
    handleDeleteOrderClick() {
      if (this.orderStage.multipleSelection.id === undefined) {
        this.$message({
          message: "至少选择一个订单属性",
          type: "warning"
        });
        return;
      } else {
        this.$confirm("是否确认删除该记录？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            request
              .delete(`/backstage/order-stage/delete`, {
                params: { id: this.orderStage.multipleSelection.id }
              })
              .then(response => {
                this.reSearchOrder(
                  this.orderStage.multipleSelection.projectTypeId
                );
                this.templateRadioOrder = "";
                this.orderStage.multipleSelection = [];
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

    //添加项目类型提交
    handleAddProjectTypeSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .post(`/backstage/project-type/insert`, {
              name: this.projectType.addProjectType.name
            })
            .then(response => {
              this.reSearchProjectType();
              this.projectType.addProjectType.name = "";
              this.addProjectTypeShowFlag = false;
              this.templateRadioProjectType = "";
              this.projectType.multipleSelection = [];
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
    //取消添加项目类型
    handleAddProjectTypeCancelClick() {
      this.projectType.addProjectType.name = "";
      this.addProjectTypeShowFlag = false;
      this.viewname = "first";
    },
    //更新项目类型提交
    handleEditProjectTypeSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .put(`/backstage/project-type/update`, {
              id: this.projectType.updateProjectType.id,
              name: this.projectType.updateProjectType.name
            })
            .then(response => {
              this.reSearchProjectType();
              this.projectType.updateProjectType.id = "";
              this.projectType.updateProjectType.name = "";
              this.templateRadioProjectType = "";
              this.projectType.multipleSelection = [];

              this.editProjectTypeShowFlag = false;
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
    //取消项目类型更新
    handleEditProjectTypeCancelClick() {
      this.projectType.updateProjectType.id = "";
      this.projectType.updateProjectType.name = "";
      this.editProjectTypeShowFlag = false;
      this.viewname = "first";
    },
    //添加订单阶段提交
    handleAddOrderSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .post(`/backstage/order-stage/insert`, {
              name: this.orderStage.addOrder.name,
              projectTypeId: this.orderStage.addOrder.projectTypeId
            })
            .then(response => {
              if (this.projectType.multipleSelection.id != undefined)
                this.reSearchOrder(this.projectType.multipleSelection.id);
              this.orderStage.addOrder.projectTypeId = "";
              this.orderStage.addOrder.name = "";
              this.addOrderShowFlag = false;
              this.templateRadioOrder = "";
              this.orderStage.multipleSelection = [];
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
    //取消添加订单阶段
    handleAddOrderCancelClick() {
      this.orderStage.addOrder.projectTypeId = "";
      this.orderStage.addOrder.name = "";
      this.addOrderShowFlag = false;
      this.viewname = "first";
    },
    //编辑订单阶段提交
    handleEditOrderSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .put(`/backstage/order-stage/update`, {
              id: this.orderStage.updateOrder.id,
              name: this.orderStage.updateOrder.name,
              projectTypeId: this.orderStage.updateOrder.projectTypeId
            })
            .then(response => {
              this.reSearchOrder(this.projectType.multipleSelection.id);
              this.orderStage.updateOrder.id = "";
              this.orderStage.updateOrder.name = "";
              this.orderStage.updateOrder.projectTypeId = "";
              this.templateRadioOrder = "";
              this.orderStage.multipleSelection = [];
              this.editOrderShowFlag = false;
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
    //取消编辑订单阶段
    handleEditOrderCancelClick() {
      this.orderStage.updateOrder.id = "";
      this.orderStage.updateOrder.name = "";
      this.orderStage.updateOrder.projectTypeId = "";
      this.editOrderShowFlag = false;
      this.viewname = "first";
    }
  }
};
</script>

<style lang="less" scoped>
.box-card {
  background-color: none;
  min-width: 1500px;
  margin: 20px 50px;
  padding: 0 20px;
}
.add-ruleForm {
  min-width: 250px;
  max-width: 500px;
}
.submainCard {
  .subAside {
    width: 400px;
    // background: rgb(172, 170, 170);
    .containerHeaderDiv {
      margin-top: 10px;
      .cateButton {
        //width: 50px;
        text-align: center;
      }
    }
  }
  .subMain {
    margin-left: 10px;
    // background: yellow;
    .containerHeaderDiv {
      margin-top: 10px;

      .cateButton {
        //width: 50px;
        text-align: center;
      }
    }
  }
}

.inputCombine {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  min-width: 250px;
  max-width: 500px;
  .inputTag {
    font-size: 18px;
    line-height: 40px;
    min-width: 130px;
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
