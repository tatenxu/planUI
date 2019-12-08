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
                  <el-button @click="handleSearchClick(false)" type="primary">搜索品牌</el-button>
                  <el-input v-model="searchInput" class="nameInput" placeholder="请输入品牌名称"></el-input>
                  <span class="inputTag">品牌名称:</span>
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
              <el-table-column prop="id" label="id" v-if="false" width="120"></el-table-column>
              <el-table-column prop="name" label="品牌名称" width="120"></el-table-column>
              <el-table-column prop="abbreviation" label="品牌简称" width="120"></el-table-column>
              <el-table-column prop="description" label="品牌描述" width="120"></el-table-column>
              <el-table-column prop="clientName" label="所属客户" show-overflow-tooltip></el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-button type="info" @click="toggleSelection()">取消选择</el-button>
            </div>
          </el-main>
        </el-container>
      </el-tab-pane>

      <el-tab-pane label="新增品牌信息" name="second" v-if="addCardShowFlag">
        <el-card>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="add-ruleForm"
          >
            <el-form-item label="品牌名称" prop="addInfoName">
              <el-input v-model="ruleForm.addInfoName" class="inputStyle" placeholder="请输入品牌名称"></el-input>
            </el-form-item>
            <el-form-item label="品牌简称" prop="addInfoAbbr">
              <el-input v-model="ruleForm.addInfoAbbr" class="inputStyle" placeholder="请输入品牌简称"></el-input>
            </el-form-item>
            <el-form-item label="所属客户" prop="addInfoCustomer">
              <el-select v-model="ruleForm.addInfoCustomer" placeholder="请选择" class="inputSelector">
                <el-option
                  v-for="item in selectionData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌描述" prop="addInfoDescription">
              <el-input
                class="inputArea"
                type="textarea"
                :rows="4"
                placeholder="请输入品牌描述"
                v-model="ruleForm.addInfoDescription"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="save" @click="handleNewSaveClick('ruleForm')">保存</el-button>
              <el-button type="primary" class="cancel" @click="handleNewCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑品牌信息" name="third" v-if="editCardShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">品牌名称</span>
            <el-input v-model="editInfoName" class="input" placeholder="请输入品牌名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">品牌简称</span>
            <el-input v-model="editInfoAbbr" class="input" placeholder="请输入品牌简称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">所属客户</span>
            <el-select v-model="editInfoCustomer" placeholder="请选择" class="inputSelector">
              <el-option
                v-for="item in selectionData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="inputCombine">
            <span class="inputTag">品牌描述</span>
            <el-input
              class="inputArea"
              type="textarea"
              :rows="4"
              placeholder="请输入品牌描述"
              v-model="editInfoDescription"
            ></el-input>
          </div>
          <div class="secondButtonDiv">
            <el-button type="primary" @click="handleEditSaveClick()" class="save">保存</el-button>
            <el-button type="primary" @click="handleEditCancelClick()" class="cancel">取消</el-button>
          </div>
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
      viewname: "first",
      searchInput: "",
      tableData: [],
      multipleSelection: [],
      selectionData: [],

      editInfoDescription: "",
      editInfoName: "",
      editInfoId: "",
      editInfoAbbr: "",
      editInfoCustomer: "",
      editInfoInitCustomerId: "",
      tmpeditInfoCustomer: "",

      ruleForm: {
        addInfoCustomer: "",
        addInfoDescription: "",
        addInfoName: "",
        addInfoAbbr: ""
      },
      rules: {
        addInfoCustomer: [
          { required: true, message: "请选择客户", trigger: "blur" }
        ],
        addInfoDescription: {
          required: false,
          message: "请输入描述",
          trigger: "blur"
        },
        addInfoName: {
          required: true,
          message: "请输入品牌名称",
          trigger: "blur"
        },
        addInfoAbbr: {
          required: true,
          message: "请输入品牌简称",
          trigger: "blur"
        }
      },

      addCardShowFlag: false,
      editCardShowFlag: false,

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
      ]
    };
  },
  created: function() {
    //加载客户选择信息
    request
      .get(`${window.$config.HOST}/backstage/client/find`)
      .then(response => {
        this.selectionData = response.result;
      });

    //加载默认信息
    request
      .get(`${window.$config.HOST}/backstage/brand/find`, {
        params: { name: null }
      })
      .then(response => {
        this.tableData = response.result;
      });
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSearchClick(allFlag) {
      var param = { name: null };
      if (!allFlag) {
        /* if(this.searchInput === ""){
            this.$message.error("请输入品牌名称");
            return;
          } */
        param = { name: this.searchInput === "" ? null : this.searchInput };
      }
      console.log("搜索参数");
      console.log(param);
      request
        .get(`${window.$config.HOST}/backstage/brand/find`, {
          params: param
        })
        .then(response => {
          this.tableData = response.result;
        });
    },
    handleNewInfoClick() {
      this.addCardShowFlag = true;
      this.viewname = "second";
      console.log(this.viewname);
    },
    handleEditInfoClick() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择一个品牌信息",
          type: "warning"
        });
        return;
      }
      if (this.multipleSelection.length > 1) {
        this.$message({
          message: "只能选择一个信息进行编辑",
          type: "warning"
        });
        return;
      }
      this.editCardShowFlag = true;
      console.log(this.multipleSelection[0]);
      this.editInfoId = this.multipleSelection[0].id;
      this.editInfoName = this.multipleSelection[0].name;
      this.editInfoAbbr = this.multipleSelection[0].abbreviation;
      this.editInfoCustomer = this.multipleSelection[0].clientId;
      this.editInfoCustomerName = this.multipleSelection[0].clientName;
      this.tmpeditInfoCustomerName = this.multipleSelection[0].clientName;
      this.editInfoDescription = this.multipleSelection[0].description;
      this.viewname = "third";
      editInfoCustomer;
    },
    handleDeleteInfoClick() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "至少选择一个品牌",
          type: "warning"
        });
      } else {
        this.multipleSelection.forEach(element => {
          request
            .delete(`${window.$config.HOST}/backstage/brand/delete`, {
              params: { id: element.id }
            })
            .then(response => {
              var i = this.tableData.indexOf(element);
              this.tableData.splice(i, 1);
            });
        });
      }
    },
    handleNewSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var param = {
            name:
              this.ruleForm.addInfoName === ""
                ? null
                : this.ruleForm.addInfoName,
            abbreviation:
              this.ruleForm.addInfoAbbr === ""
                ? null
                : this.ruleForm.addInfoAbbr,
            description:
              this.ruleForm.addInfoDescription === ""
                ? null
                : this.ruleForm.addInfoDescription,
            clientId:
              this.ruleForm.addInfoCustomer === ""
                ? null
                : this.ruleForm.addInfoCustomer
          };
          console.log(param);

          request
            .post(`${window.$config.HOST}/backstage/brand/insert`, param)
            .then(response => {
              this.handleSearchClick(true);
              this.ruleForm.addInfoName = "";
              this.ruleForm.addInfoAbbr = "";
              this.ruleForm.addInfoDescription = "";
              this.ruleForm.addInfoCustomer = "";

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
    handleNewCancelClick() {
      this.addCardShowFlag = false;
      this.viewname = "first";
      this.$message({
        message: "取消新增!",
        type: "info"
      });
      return;
    },
    handleEditSaveClick() {
      var tmp =
        this.editInfoCustomer === this.tmpeditInfoCustomer
          ? this.editInfoInitCustomerId
          : this.editInfoCustomer;
      var param = {
        id: this.editInfoId === "" ? null : this.editInfoId,
        name: this.editInfoName === "" ? null : this.editInfoName,
        abbreviation: this.editInfoAbbr === "" ? null : this.editInfoAbbr,
        description:
          this.editInfoDescription === "" ? null : this.editInfoDescription,
        clientId: tmp === "" ? null : tmp
      };
      console.log(param);

      request
        .put(`${window.$config.HOST}/backstage/brand/update`, param)
        .then(response => {
          this.handleSearchClick(true);

          this.editInfoId = "";
          this.editInfoName = "";
          this.editInfoAbbr = "";
          this.editInfoCustomer = "";
          this.editInfoCustomerName = "";
          this.tmpeditInfoCustomerName = "";
          this.editInfoDescription = "";

          this.editCardShowFlag = false;
          this.viewname = "first";
        });

      return;
    },
    handleEditCancelClick() {
      this.editCardShowFlag = false;
      this.viewname = "first";
      this.$message({
        message: "取消编辑!",
        type: "info"
      });
      return;
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