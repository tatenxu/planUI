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
                  <el-table
                    ref="multipleTable"
                    :data="projectType"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleProjectSelectionChange"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" v-if="false" label="id" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="项目类型" show-overflow-tooltip></el-table-column>
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
                  <el-table
                    ref="multipleTable"
                    :data="orderTable"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handlePropSelectionChange"
                  >
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="id" v-if="false" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="name" label="订单" show-overflow-tooltip></el-table-column>
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
            :model="ruleFormProjectType"
            :rules="rulesProjectType"
            ref="ruleForm1"
            label-width="100px"
            class="add-ruleForm"
          >
            <el-form-item label="项目类型:" prop="addProjectTypeName">
              <el-input v-model="ruleFormProjectType.addProjectTypeName" placeholder="请输入项目类型名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="save"
                @click="handleAddProjectTypeSaveClick('ruleFormProjectType')"
              >保存</el-button>
              <el-button type="primary" class="cancel" @click="handleAddProjectTypeCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑项目类型" name="third" v-if="editProjectTypeShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">项目类型名称:</span>
            <el-input v-model="editProjectTypeName" class="input" placeholder="请输入项目类型名称"></el-input>
          </div>
          <div class="secondButtonDiv">
            <el-button type="primary" class="save" @click="handleEditProjectTypeSaveClick()">保存</el-button>
            <el-button type="primary" class="cancel" @click="handleEditProjectTypeCancelClick()">取消</el-button>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="新增订单属性" name="fourth" v-if="addOrderShowFlag">
        <el-card>
          <el-form
            :model="ruleFormOrder"
            :rules="rulesProp"
            ref="ruleForm1"
            label-width="130px"
            class="add-ruleForm"
          >
            <el-form-item label="订单名称:" prop="addOrderName">
              <el-input v-model="ruleFormOrder.addOrderName" class="input" placeholder="请输入订单属性名称"></el-input>
            </el-form-item>

            <el-form-item label="所属项目类型" prop="addOrderProjectTypeId">
              <el-select
                v-model="ruleFormOrder.addOrderProjectTypeId"
                placeholder="请选择"
                class="inputSelector"
              >
                <el-option
                  v-for="item in projectType"
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
                @click="handleAddOrderSaveClick('ruleFormOrder')"
              >保存</el-button>
              <el-button type="primary" class="cancel" @click="handleAddOrderCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑订单属性" name="fifth" v-if="editOrderShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">订单属性名称:</span>
            <el-input v-model="editOrderName" class="input" placeholder="请输入订单属性名称"></el-input>
          </div>

          <div class="inputCombine">
            <span class="inputTag">所属订单:</span>
            <el-select v-model="underProjectTypeId" placeholder="请选择" class="inputSelector">
              <el-option
                v-for="item in projectType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="secondButtonDiv">
            <el-button type="primary" class="save" @click="handleEditOrderSaveClick()">保存</el-button>
            <el-button type="primary" class="cancel" @click="handleEditOrderCancelClick()">取消</el-button>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

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

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      projectType: [],
      orderTable: [],
      editProjectTypeId: "",
      editOrderId: "",
      lastOrderProjectTypeId: "",
      addProjectTypeShowFlag: false,
      editProjectTypeShowFlag: false,
      addOrderShowFlag: false,
      editOrderShowFlag: false,
      multiProjectTypeSelection: [],
      multipleOrderSelection: [],
      viewname: "first",
      underProjectTypeId: "",
      ruleFormProjectType: {
        addProjectTypeName: ""
      },
      rulesProjectType: {
        addProjectTypeName: [
          { required: true, message: "请输入项目类型名称", trigger: "blur" }
        ]
      },
      ruleFormOrder: {
        addOrderName: "",
        addOrderProjectTypeId: ""
      },
      rulesProp: {
        addOrderName: [
          { required: true, message: "请输入订单名称", trigger: "blur" }
        ],
        addOrderProjectTypeId: [
          { required: true, message: "请选择所属项目类型", trigger: "changed" }
        ]
      }
    };
  },

  created: function() {
    //加载所有的项目类型
    request.get(`/backstage/project-type/find`).then(response => {
      this.projectType = response.result;
    });
  },
  methods: {
    reSearchOrder(projectTypeId) {
      console.log(projectTypeId);
      request
        .get(`/backstage/order-stage/find`, {
          params: { projectTypeId: projectTypeId }
        })
        .then(response => {
          this.orderTable = response.result;
        });
    },
    reSearchProjectType() {
      request.get(`/backstage/project-type/find`).then(response => {
        this.projectType = response.result;
      });
    },

    handleViewChange(tab, event) {
      console.log(tab, event);
    },

    handleProjectSelectionChange(val) {
      this.multiProjectTypeSelection = val;
      this.orderTable = [];
      if (val.length >= 1) {
        this.reSearchOrder(val[0].id);
      }
    },
    handlePropSelectionChange(val) {
      this.multipleOrderSelection = val;
    },

    handleAddProjectTypeClick() {
      this.addProjectTypeShowFlag = true;
      this.viewname = "second";
    },

    handleEditProjectTypeClick() {
      if (this.multiProjectTypeSelection.length === 0) {
        alert("请选择一个项目类型!");
        return;
      }

      if (this.multiProjectTypeSelection.length > 1) {
        alert("只能选择一个项目类型!");
        return;
      }

      this.editProjectTypeId = this.multiProjectTypeSelection[0].id;
      this.editProjectTypeName = this.multiProjectTypeSelection[0].name;
      this.editProjectTypeShowFlag = true;
      this.viewname = "third";
    },
    handleDeleteProjectTypeClick() {
      if (this.multiProjectTypeSelection.length === 0) {
        this.$message({
          message: "至少选择一个项目类型",
          type: "warning"
        });
      }

      this.$confirm("是否确认删除该记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.multiProjectTypeSelection.forEach(element => {
            request
              .delete(`/backstage/project-type/delete`, {
                params: { id: element.id }
              })
              .then(response => {
                this.reSearchProjectType();
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    handleAddOrderClick() {
      this.addOrderShowFlag = true;
      this.viewname = "fourth";
    },
    handleEditOrderClick() {
      if (this.multipleOrderSelection.length === 0) {
        alert("请选择一个订单属性!");
        return;
      }

      if (this.multipleOrderSelection.length > 1) {
        alert("只能选择一个订单属性!");
        return;
      }
      this.lastOrderProjectTypeId = this.multipleOrderSelection[0].projectTypeId;

      this.editOrderId = this.multipleOrderSelection[0].id;
      this.editOrderName = this.multipleOrderSelection[0].name;
      this.underProjectTypeId = this.multipleOrderSelection[0].projectTypeId;

      this.editOrderShowFlag = true;
      this.viewname = "fifth";
    },
    handleDeleteOrderClick() {
      if (this.multipleOrderSelection.length === 0) {
        this.$message({
          message: "至少选择一个订单属性",
          type: "warning"
        });
      }

      this.$confirm("是否确认删除该记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.multipleOrderSelection.forEach(element => {
            request
              .delete(`/backstage/order-stage/delete`, {
                params: { id: element.id }
              })
              .then(response => {
                this.reSearchOrder(element.projectTypeId);
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleAddProjectTypeSaveClick() {
      var param = {
        name:
          this.ruleFormProjectType.addProjectTypeName === ""
            ? null
            : this.ruleFormProjectType.addProjectTypeName
      };
      request.post(`/backstage/project-type/insert`, param).then(response => {
        this.reSearchProjectType();
        this.ruleFormProjectType.addProjectTypeName = "";
        this.addProjectTypeShowFlag = false;
        this.viewname = "first";
      });
    },
    handleAddProjectTypeCancelClick() {
      this.$message({
        message: "取消新增!",
        type: "info"
      });

      this.ruleFormProjectType.addProjectTypeName = "";
      this.addProjectTypeShowFlag = false;
      this.viewname = "first";
    },
    handleEditProjectTypeSaveClick() {
      var param = {
        id: this.editProjectTypeId === "" ? null : this.editProjectTypeId,
        name: this.editProjectTypeName === "" ? null : this.editProjectTypeName
      };

      request.put(`/backstage/project-type/update`, param).then(response => {
        this.reSearchProjectType();

        this.editProjectTypeId = "";
        this.editProjectTypeName = "";
        this.editProjectTypeShowFlag = false;
        this.viewname = "first";
      });
    },
    handleEditProjectTypeCancelClick() {
      this.$message({
        message: "取消编辑!",
        type: "info"
      });
      this.editProjectTypeShowFlag = false;
      this.viewname = "first";
    },

    handleAddOrderSaveClick() {
      var param = {
        name:
          this.ruleFormOrder.addOrderName === ""
            ? null
            : this.ruleFormOrder.addOrderName,
        projectTypeId:
          this.ruleFormOrder.addOrderProjectTypeId === ""
            ? null
            : this.ruleFormOrder.addOrderProjectTypeId
      };

      request.post(`/backstage/order-stage/insert`, param).then(response => {
        this.reSearchOrder(param.projectTypeId);
        this.ruleFormOrder.addOrderName = "";
        this.ruleFormOrder.addOrderProjectTypeId = "";
        this.addOrderShowFlag = false;
        this.viewname = "first";
      });
    },

    handleAddOrderCancelClick() {
      this.$message({
        message: "取消新增!",
        type: "info"
      });

      this.ruleFormOrder.addOrderName = "";
      this.ruleFormOrder.addOrderProjectTypeId = "";

      this.addOrderShowFlag = false;
      this.viewname = "first";
    },

    handleEditOrderSaveClick() {
      var param = {
        id: this.editOrderId === "" ? null : this.editOrderId,
        name: this.editOrderName === "" ? null : this.editOrderName,
        projectTypeId:
          this.underProjectTypeId === "" ? null : this.underProjectTypeId
      };

      request.put(`/backstage/order-stage/update`, param).then(response => {
        this.reSearchOrder(this.lastOrderProjectTypeId);

        (this.lastOrderProjectTypeId = ""), (this.editOrderId = "");
        this.editOrderName = "";
        this.underProjectTypeId = "";

        this.editOrderShowFlag = false;
        this.viewname = "first";
      });
    },
    handleEditOrderCancelClick() {
      this.$message({
        message: "取消编辑!",
        type: "info"
      });
      this.editOrderShowFlag = false;
      this.viewname = "first";
    }
  }
};
</script>
