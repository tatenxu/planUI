
<!--此页面搜索接口，添加接口，删除接口还未协商 -->

<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">角色名</div>
            <el-select v-model="roleId" :clearable="true">
              <el-option
                v-for="item in searchOptions.options.roleOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">页面名</div>
            <!-- <el-select v-model="searchOptions.searchParams.customerName" @change="clientSelect"> -->
            <el-select v-model="pageName" :clearable="true">
              <el-option
                v-for="item in searchOptions.options.pageOptions"
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
          border
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column type="selection" width="50px" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="roleName" width="300" label="角色" align="center"></el-table-column>
          <el-table-column prop="menuName" width="300" label="页面名" align="center"></el-table-column>
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

    <el-dialog :modal="false" title="新增权限" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8" style="margin-left:22%">
            <el-form-item label="角色" prop="roleId">
              <el-select v-model="ruleForm.roleId">
                <el-option
                  v-for="item in ruleForm.options.roleOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
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
            style="width: 400px; margin-top: 20px;margin-left:30%"
          >
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="200" label="页面名称" align="center"></el-table-column>
          </el-table>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { POINT_CONVERSION_COMPRESSED } from "constants";
import request from "@/utils/request";
export default {
  data() {
    return {
      roleId: "",
      pageName: "",

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
          roleOptions: [],
          pageOptions: [],
          userNameOptions: []
        }
      },
      multipleSelection: [],
      rules: {
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }]
      },

      ruleForm: {
        roleId: "",
        roleName: "",
        multipleSelection: [],
        tableData: [],
        options: {
          roleOptions: []
        }
      }
    };
  },

  created: function() {
    var that = this;
    //获得角色名字
    this.$axios
      .get(`${window.$config.HOST2}/role/find`)
      .then(response => {
        this.searchOptions.options.roleOptions = response.data.result;
        this.ruleForm.options.roleOptions = response.data.result;
      })
      .catch(error => {
        this.$message({
          message: "获取角色信息失败",
          type: "error"
        });
      });

    request.get("/menu/find").then(response => {
      this.searchOptions.options.pageOptions = response.result;
      this.ruleForm.tableData = response.result;
    });

    //获得空搜索
    request.get(`/backstage/role-menu/find`).then(response => {
      this.tableData = response.result;
    });
  },

  methods: {
    //搜索
    handleSearch() {
      request
        .get(`/backstage/role-menu/find`, {
          params: {
            roleId: this.roleId === "" ? undefined : this.roleId,
            menuId: this.pageName === "" ? undefined : this.pageName
          }
        })
        .then(response => {
          this.tableData = response.result;
        })
        .catch(error => {});
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
            .delete(`/backstage/role-menu/delete`, {
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
            var len = this.multipleSelection.length;
            var count = 0;
            this.multipleSelection.forEach(element => {
              console.log(element.id);
              let list = {
                id: element.id
              };
              console.log(list);
              request
                .delete(`/backstage/role-menu/delete`, {
                  params: {
                    id: element.id
                  }
                })
                .then(response => {
                  count++;
                  if (count === len) {
                    this.$message({
                      message: "删除成功！",
                      type: "success"
                    });
                    this.handleSearch();
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
    // 添加用户
    addUser() {
      const that = this;

      (this.ruleForm.roleId = ""),
        (this.ruleForm.roleName = ""),
        (this.dialogFormVisible = true);
    },

    //OK
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let roleName;
          this.ruleForm.options.roleOptions.forEach(element => {
            if (element.id === this.ruleForm.roleId) {
              roleName = element.name;
            }
          });

          let list = [];

          this.ruleForm.multipleSelection.forEach(element => {
            list.push({
              roleId: this.ruleForm.roleId,
              roleName: roleName,
              menuId: element.id
            });
          });
          request.post(`/backstage/role-menu/insert`, list).then(response => {
            this.handleSearch();
            (this.ruleForm.roleId = ""),
              (this.ruleForm.roleName = ""),
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

    //Ok
    cancel() {
      (this.ruleForm.roleId = ""),
        (this.ruleForm.roleName = ""),
        (this.dialogFormVisible = false);
    }
  }
};
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
</style>