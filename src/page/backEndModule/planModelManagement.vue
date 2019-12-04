<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="clientId" clearable style="min-width:260px">
              <el-option
                v-for="item in searchOptions.clientOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="brandId" clearable style="min-width:260px">
              <el-option
                v-for="item in searchOptions.brandOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              style="min-width:260px"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top:20px;margin-left:20px">
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="searchModelList">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <el-container>
        <el-header>
          <el-row :gutter="40">
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="handleSetUniverseClick">设为通用</el-button>
              </div>
            </el-col>

            <el-col :span="2">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="handleSetPrivateClick">设为私有</el-button>
              </div>
            </el-col>

            <el-col :span="2">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="addTemplate">添加模板</el-button>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div>
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              border
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
              <el-table-column prop="name" label="模板名称" width="120" align="center"></el-table-column>
              <el-table-column prop="clientName" label="客户名称" width="120" align="center"></el-table-column>
              <el-table-column prop="brandName" label="品牌名称" width="120" align="center"></el-table-column>
              <el-table-column prop="creatorName" label="添加人" width="120" align="center"></el-table-column>
              <el-table-column prop="publicUseFlag" label="是否通用" width="120" align="center"></el-table-column>
              <el-table-column prop="createTime" label="添加时间" width="220" align="center"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="ViewModel(scope.row)">查看</el-button>
                  <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" @click="handleDeleteModelClick(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>



<script>
import request from "@/utils/request";
export default {
  name: "planModelManagement",
  data() {
    return {
      //搜索部分参数
      clientId: "",
      brandId: "",
      dateRange: "",

      searchOptions: {
        clientOptions: [],
        brandOptions: []
      },
      //表格数据
      tableData: [],
      multipleSelection: []
    };
  },
  created: function() {
    //获得品牌名字
    request.get(`/backstage/brand/name`).then(response => {
      this.searchOptions.brandOptions = response.result;
    });

    //获得顾客名称
    request.get(`/backstage/client/name`).then(response => {
      this.searchOptions.clientOptions = response.result;
    });

    //获取初始搜索信息
    request.get(`/plan-template/find`).then(response => {
      this.tableData = response.result;
      this.tableData.forEach(element => {
        if (element.publicUse === true) element.publicUseFlag = "是";
        else element.publicUseFlag = "否";
      });
    });
  },

  methods: {
    addTemplate() {
      this.$router.push({
        name: "bePlanModelEdit",
        params: {
          isCreate: true,
          isUpdate: false,
          isDetail: false,
          data: row,
          goback: "bePlanModelManagement"
        }
      });
    },
    // 改变日期格式
    changeDate(date) {
      console.log(date);
      if (!date) {
        return undefined;
      } else {
        // var date = new Date(date);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
      }
    },
    searchModelList() {
      request
        .get(`/plan-template/find`, {
          params: {
            clientId: this.clientId === "" ? undefined : this.clientId,
            brandId: this.brandId === "" ? undefined : this.brandId,
            createAfter: this.changeDate(
              this.dateRange ? this.dateRange[0] : undefined
            ),
            createBefore: this.changeDate(
              this.dateRange ? this.dateRange[1] : undefined
            )
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.tableData.forEach(element => {
            if (element.publicUse === true) element.publicUseFlag = "是";
            else element.publicUseFlag = "否";
          });
        });
    },
    //查看模板
    ViewModel(row) {
      this.$router.push({
        name: "bePlanModelEdit",
        params: {
          isCreate: false,
          isUpdate: false,
          isDetail: true,
          data: row,
          goback: "bePlanModelManagement"
        }
      });
    },
    //编辑模板
    handleEdit(row) {
      this.$router.push({
        name: "bePlanModelEdit",
        params: {
          isCreate: false,
          isUpdate: true,
          isDetail: false,
          data: row,
          goback: "bePlanModelManagement"
        }
      });
    },
    //表格选中
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //设为通用
    handleSetUniverseClick() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择一个模板!",
          type: "warning"
        });
      } else {
        let allPrivate = 0;
        this.multipleSelection.forEach(element => {
          if (element.publicUse != false) {
            allPrivate = 1;
            this.$message({
              message: "请仅选择现状态为私有的模板!",
              type: "error"
            });
            return;
          }
        });
        if (allPrivate === 0) {
          this.$confirm("是否将所选模板的权限设为通用！", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              request.put(
                `/plan-template/authority`,

                this.multipleSelection
              );
            })
            .catch(() => {
              this.$message({
                message: "取消设置!",
                type: "info"
              });
            });
        }
      }
    },

    //设为私有
    handleSetPrivateClick() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择一个模板!",
          type: "warning"
        });
      } else {
        let allPrivate = 0;
        this.multipleSelection.forEach(element => {
          if (element.publicUse != true) {
            allPrivate = 1;
            this.$message({
              message: "请仅选择现状态为通用的模板!",
              type: "error"
            });
            return;
          }
        });
        if (allPrivate === 0) {
          this.$confirm("是否将所选模板的权限设为私有！", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              request.put(
                `/plan-template/authority`,

                this.multipleSelection
              );
            })
            .catch(() => {
              this.$message({
                message: "取消设置!",
                type: "info"
              });
            });
        }
      }
    },
    //删除模板
    handleDeleteModelClick(row) {
      const that = this;
      this.$confirm("是否确认删除该模板？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request.delete("/plan-template/delete", {
            params: {
              id: row.id
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
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
      // margin: 5px 10px;
    }
    .el-select {
      width: 300px;
      min-width: 75px;
      // margin: 5px 10px;
    }
  }
  .block {
    padding: 30px 0;
    text-align: center;
    //border-right: solid 1px #EFF2F6;
    //display: inline-block;
    //box-sizing: border-box;
  }
}
</style>