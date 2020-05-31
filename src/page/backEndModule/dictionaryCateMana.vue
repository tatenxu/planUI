<template>
  <div class="box-card">
    <el-tabs v-model="viewname" @tab-click="handleViewChange">
      <el-tab-pane label="数据字典管理" name="first">
        <el-card class="submainCard">
          <el-container>
            <el-main class="subAside">
              <el-container class="paneContainer">
                <el-header clas="containerHeader">
                  <div class="containerHeaderDiv">
                    <el-button type="primary" class="cateButton" @click="handleAddCateClick()">新增</el-button>
                    <el-button type="primary" class="cateButton" @click="handleEditCateClick()">编辑</el-button>
                    <el-button type="primary" class="cateButton" @click="handleDeleteCateClick()">删除</el-button>
                  </div>
                  <hr />
                </el-header>

                <el-main clas="containerMain">
                  <el-table :data="category.tableData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column label width="65">
                      <template slot-scope="scope">
                        <el-radio
                          :label="scope.row.id"
                          v-model="templateRadioCate"
                          @change.native="handleCategSelectionChange(scope.row)"
                        >{{scope.$index+1}}</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column prop="id" v-if="false" label="id" show-overflow-tooltip></el-table-column>
                    <el-table-column
                      prop="name"
                      label="字典类别"
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
                    <el-button type="primary" class="cateButton" @click="handleAddPropClick()">新增</el-button>
                    <el-button type="primary" class="cateButton" @click="handleEditPropClick()">编辑</el-button>
                    <el-button type="primary" class="cateButton" @click="handleDeletePropClick()">删除</el-button>
                  </div>
                  <hr />
                </el-header>

                <el-main clas="containerMain">
                  <el-table :data="property.tableData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column label width="65">
                      <template slot-scope="scope">
                        <el-radio
                          :label="scope.row.id"
                          v-model="templateRadioProp"
                          @change.native="handlePropSelectionChange(scope.row)"
                        >{{scope.$index+1}}</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column prop="id" label="id" v-if="false" show-overflow-tooltip></el-table-column>
                    <el-table-column
                      prop="name"
                      label="类别属性"
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

      <el-tab-pane label="新增字典类别" name="second" v-if="addCateShowFlag">
        <el-card>
          <el-form
            :model="category.addCate"
            :rules="category.addCateRules"
            ref="category.addCate"
            label-width="100px"
            class="add-ruleForm"
          >
            <el-form-item label="类别名称" prop="name">
              <el-input v-model="category.addCate.name" placeholder="请输入字典类别名称"></el-input>
            </el-form-item>
            <el-form-item label="类别描述" prop="code">
              <el-input v-model="category.addCate.code" placeholder="请输入字典类别编码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="save"
                @click="handleAddCateSaveClick('category.addCate')"
              >保存</el-button>
              <el-button type="primary" class="cancel" @click="handleAddCateCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑字典类别" name="third" v-if="editCateShowFlag">
        <el-card>
          <el-form
            :model="category.updateCate"
            :rules="category.addCateRules"
            ref="category.updateCate"
            label-width="100px"
            class="add-ruleForm"
          >
            <el-form-item label="类别名称" prop="name">
              <el-input v-model="category.updateCate.name" placeholder="请输入字典类别名称"></el-input>
            </el-form-item>
            <el-form-item label="类别描述" prop="code">
              <el-input v-model="category.updateCate.code" placeholder="请输入字典类别编码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="save"
                @click="handleEditCateSaveClick('category.updateCate')"
              >保存</el-button>
              <el-button type="primary" class="cancel" @click="handleEditCateCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="新增类别属性" name="fourth" v-if="addPropShowFlag">
        <el-card>
          <el-form
            :model="property.addProperty"
            :rules="property.addPropertyRules"
            ref="property.addProperty"
            label-width="100px"
            class="add-ruleForm"
          >
            <el-form-item label="属性名称" prop="name">
              <el-input v-model="property.addProperty.name" class="input" placeholder="请输入类别属性名称"></el-input>
            </el-form-item>
            <el-form-item label="属性编码" prop="code">
              <el-input v-model="property.addProperty.code" class="input" placeholder="请输入类别属性编码"></el-input>
            </el-form-item>
            <el-form-item label="所属类别" prop="categoryId">
              <el-select
                v-model="property.addProperty.categoryId"
                placeholder="请选择"
                class="inputSelector"
              >
                <el-option
                  v-for="item in property.addProperty.options.categoryOptions"
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
                @click="handleAddPropSaveClick('property.addProperty')"
              >保存</el-button>
              <el-button type="primary" class="cancel" @click="handleAddPropCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑类别属性" name="fifth" v-if="editPropShowFlag">
        <el-card>
          <el-form
            :model="property.updateProperty"
            :rules="property.updatePropertyRules"
            ref="property.updateProperty"
            label-width="100px"
            class="add-ruleForm"
          >
            <el-form-item label="属性名称" prop="name">
              <el-input
                v-model="property.updateProperty.name"
                class="input"
                placeholder="请输入类别属性名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="属性编码" prop="code">
              <el-input
                v-model="property.updateProperty.code"
                class="input"
                placeholder="请输入类别属性编码"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属类别" prop="categoryId">
              <el-select
                v-model="property.updateProperty.categoryId"
                placeholder="请选择"
                class="inputSelector"
              >
                <el-option
                  v-for="item in property.updateProperty.options.categoryOptions"
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
                @click="handleEditPropSaveClick('property.updateProperty')"
              >保存</el-button>
              <el-button type="primary" class="cancel" @click="handleEditPropCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
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
      //单选控制
      templateRadioCate: "",         // 类别单选数据
      templateRadioProp: "",         // 属性单选控制
      //字典类别数据
      category: {
        tableData: [],         // 类别表格数据
        multipleSelection: [],         // 类别选择数据
        addCate: {
          name: "",         // 添加类别的名称
          code: ""         // 添加类别的编码
        },
        addCateRules: {         // 添加类别的数据有效性验证
          name: [
            { required: true, message: "请输入字典类别名称", trigger: "blur" }
          ],
          code: [
            { required: true, message: "请输入字典类别编码", trigger: "blur" }
          ]
        },
        updateCate: {         // 更新类别的数据
          id: "",         // 更新类别的ID
          name: "",         // 更新类别的名称
          code: ""         // 更新类别的编码
        },
        updateCateRules: {         // 数据有效性控制
          name: [
            { required: true, message: "请输入字典类别名称", trigger: "blur" }
          ],
          code: [
            { required: true, message: "请输入字典类别编码", trigger: "blur" }
          ]
        }
      },
      //类别属性数据
      property: {         // 属性数据
        tableData: [],         // 属性的表格数据
        multipleSelection: [],         // 属性的选择数据
        addProperty: {         // 添加属性
          name: "",         // 添加属性的名称
          code: "",         // 添加属性的编码
          categoryId: "",         // 添加属性的所属类别
          options: {         // 下拉框数据
            categoryOptions: []
          }
        },
        addPropertyRules: {         // 添加属性的数据有效性控制
          categoryId: [
            { required: true, message: "请选择字典类别", trigger: "change" }
          ],
          name: [
            { required: true, message: "请输入类别属性编码", trigger: "blur" }
          ],
          code: [
            { required: true, message: "请输入类别属性名称", trigger: "blur" }
          ]
        },
        updateProperty: {         // 更新属性的类别
          id: "",         // 更新属性的ID
          name: "",         // 更新属性的名称
          code: "",         // 更新属性的编码
          categoryId: "",         // 更新属性的所属类别
          options: {         // 下拉框数据
            categoryOptions: []
          }
        },
        updatePropertyRules: {         // 更新属性的数据有效性控制
          categoryId: [
            { required: true, message: "请选择字典类别", trigger: "change" }
          ],
          name: [
            { required: true, message: "请输入类别属性编码", trigger: "blur" }
          ],
          code: [
            { required: true, message: "请输入类别属性名称", trigger: "blur" }
          ]
        }
      },

      viewname: "first",         // 当前的tab
      addCateShowFlag: false,         // 添加类别的tab隐藏控制
      editCateShowFlag: false,         // 编辑类别的tab隐藏控制
      addPropShowFlag: false,         // 添加属性的tab隐藏控制
      editPropShowFlag: false         // 编辑属性的tab隐藏控制
    };
  },
  created: function() {
    //加载所有的字典类别
    request.get(`/backstage/dic-category/find`).then(response => {
      this.category.tableData = response.result;
      this.property.updateProperty.options.categoryOptions = response.result;
      this.property.addProperty.options.categoryOptions = response.result;
    });
  },
  methods: {
    //渲染表头，对element原有样式进行修改
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
    //根据类别搜索类别下的属性
    searchPropertyByCate(categoryId) {
      request
        .get(`/backstage/dic-property/find`, {
          params: { categoryId: categoryId }
        })
        .then(response => {
          this.property.tableData = response.result;
        });
    },
    //搜索类别，主要用于其他函数调用
    searchCategory() {
      request.get(`/backstage/dic-category/find`).then(response => {
        this.category.tableData = response.result;
        this.property.updateProperty.options.categoryOptions = response.result;
        this.property.addProperty.options.categoryOptions = response.result;
      });
    },
    // element自带函数
    handleViewChange(tab, event) {
      console.log(tab, event);
    },
    //字典类别的选中，则搜索该字典类别下的属性
    handleCategSelectionChange(val) {
      this.category.multipleSelection = val;
      this.property.tableData = [];
      this.searchPropertyByCate(val.id);
    },
    //类别属性选中数据获取
    handlePropSelectionChange(val) {
      this.property.multipleSelection = val;
    },
    //新增类别tab跳转，并清空tab数据
    handleAddCateClick() {
      this.addCateShowFlag = true;
      this.category.addCate.name = "";
      this.category.addCate.code = "";
      this.viewname = "second";
    },
    //更新类别tab跳转，并清空tab数据
    handleEditCateClick() {
      if (this.category.multipleSelection.id === undefined) {
        this.$message({
          message: "请选择一个字典类别",
          type: "error"
        });
        return;
      } else {
        this.category.updateCate.id = this.category.multipleSelection.id;
        this.category.updateCate.name = this.category.multipleSelection.name;
        this.category.updateCate.code = this.category.multipleSelection.code;
        this.editCateShowFlag = true;
        this.viewname = "third";
      }
    },
    //删除类别tab跳转，并清空tab数据
    handleDeleteCateClick() {
      if (this.category.multipleSelection.id === undefined) {
        this.$message({
          message: "至少选择一个字典类别",
          type: "warning"
        });
        return;
      }

      this.$confirm("是否确认选中记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request
            .delete(`/backstage/dic-category/delete`, {
              params: { id: this.category.multipleSelection.id }
            })
            .then(response => {
              this.searchCategory();
              this.templateRadioCate = "";
              this.category.multipleSelection = [];
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //新增属性tab跳转，并清空tab数据
    handleAddPropClick() {
      this.addPropShowFlag = true;
      this.property.addProperty.code = "";
      this.property.addProperty.name = "";
      this.property.addProperty.categoryId = "";
      this.viewname = "fourth";
    },
    //更新属性tab跳转，并清空tab数据
    handleEditPropClick() {
      if (this.property.multipleSelection.id === undefined) {
        this.$message({
          message: "请选择一个类别属性!",
          type: "error"
        });
        return;
      } else {
        this.property.updateProperty.id = this.property.multipleSelection.id;
        this.property.updateProperty.name = this.property.multipleSelection.name;
        this.property.updateProperty.code = this.property.multipleSelection.code;
        this.property.updateProperty.categoryId = this.property.multipleSelection.categoryId;
        this.editPropShowFlag = true;
        this.viewname = "fifth";
      }
    },
    //删除属性tab跳转，并清空tab数据
    handleDeletePropClick() {
      if (this.property.multipleSelection.id === undefined) {
        this.$message({
          message: "至少选择一个类别属性",
          type: "warning"
        });
        return;
      }

      this.$confirm("是否确认删除该记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request
            .delete(`/backstage/dic-property/delete`, {
              params: { id: this.property.multipleSelection.id }
            })
            .then(response => {
              this.searchPropertyByCate(
                this.property.multipleSelection.categoryId
              );
              this.templateRadioProp = "";
              this.property.multipleSelection = [];
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //增加类别提交
    handleAddCateSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .post(`/backstage/dic-category/insert`, {
              code: this.category.addCate.code,
              name: this.category.addCate.name
            })
            .then(response => {
              this.searchCategory();
              this.category.addCate.code = "";
              this.category.addCate.name = "";
              this.templateRadioCate = "";
              this.addCateShowFlag = false;
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
    handleAddCateCancelClick() {
      this.category.addCate.name = "";
      this.category.addCate.code = "";
      this.addCateShowFlag = false;
      this.viewname = "first";
    },
    //更新类别提交
    handleEditCateSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .put(`/backstage/dic-category/update`, {
              id: this.category.updateCate.id,
              name: this.category.updateCate.name,
              code: this.category.updateCate.code
            })
            .then(response => {
              this.searchCategory();
              this.category.updateCate.id = "";
              this.category.updateCate.name = "";
              this.category.updateCate.code = "";
              this.templateRadioCate = "";
              this.category.multipleSelection = [];
              this.editCateShowFlag = false;
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
    //取消更新，并清空tab数据
    handleEditCateCancelClick() {
      this.category.updateCate.name = "";
      this.category.updateCate.code = "";
      this.category.updateCate.id = "";
      this.editCateShowFlag = false;
      this.viewname = "first";
    },
    //增加属性
    handleAddPropSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .post(`/backstage/dic-property/insert`, {
              categoryId: this.property.addProperty.categoryId,
              code: this.property.addProperty.code,
              name: this.property.addProperty.name
            })
            .then(response => {
              if (this.category.multipleSelection.id != undefined)
                this.searchPropertyByCate(this.category.multipleSelection.id);
              this.property.addProperty.categoryId = "";
              this.property.addProperty.name = "";
              this.property.addProperty.code = "";
              this.templateRadioProp = "";
              this.addPropShowFlag = false;
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
    //取消新增属性，并清空tab数据
    handleAddPropCancelClick() {
      this.property.addProperty.categoryId = "";
      this.property.addProperty.name = "";
      this.property.addProperty.code = "";
      this.addPropShowFlag = false;
      this.viewname = "first";
    },
    //更新属性提交，并清空tab数据
    handleEditPropSaveClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .put(`/backstage/dic-property/update`, {
              id: this.property.updateProperty.id,
              name: this.property.updateProperty.name,
              code: this.property.updateProperty.code,

              categoryId: this.property.updateProperty.categoryId
            })
            .then(response => {
              this.searchPropertyByCate(this.property.multipleSelection.id);
              this.property.updateProperty.categoryId = "";
              this.property.updateProperty.name = "";
              this.property.updateProperty.code = "";
              this.templateRadioProp = "";
              this.property.multipleSelection = [];
              this.editPropShowFlag = false;
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
    // 关闭更新属性，并清空tab数据
    handleEditPropCancelClick() {
      this.property.updateProperty.categoryId = "";
      this.property.updateProperty.name = "";
      this.property.updateProperty.code = "";
      this.editPropShowFlag = false;
      this.viewname = "first";
    }
  }
};
</script>
