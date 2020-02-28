<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="10" style="margin-top: 15px; margin-bottom: 5px;">
        <el-col :span="5">
          <div class="bar" style="min-width:250px">
            <el-switch
              v-model="isRootPlan"
              @change="planTypeSwitchChange"
              inactive-color="#13ce66"
              active-text="根计划"
              inactive-text="普通计划"
            ></el-switch>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10" style="margin-top: 15px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select
              v-model="searchOptions.searchParams.clientName"
              @change="clientNameChange"
              clearable
            >
              <el-option
                v-for="item in searchOptions.options.customerNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="searchOptions.searchParams.brandName" clearable>
              <el-option
                v-for="item in searchOptions.options.brandNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="10" :offset="2">
          <div class="bar">
            <div class="title">新建时间</div>
            <el-date-picker
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 25px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-autocomplete
              :fetch-suggestions="searchPlanName "
              v-model="searchOptions.searchParams.planName"
              placeholder="请输入内容"
            ></el-autocomplete>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-autocomplete
              :fetch-suggestions="searchSeriesName"
              v-model="searchOptions.searchParams.seriesName"
              placeholder="请输入内容"
            ></el-autocomplete>
          </div>
        </el-col>

        <el-col :offset="5" :span="1">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="handleSearch">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-button type="primary" style="margin-right:20px" @click="ReCoverAll">恢复所选计划</el-button>

          <el-button type="primary" style="margin-right:20px" @click="delelePermanently">彻底删除</el-button>
        </el-row>
        <el-table
          border
          :data="tableData"
          style="width: 100%; margin-top: 20px"
          @selection-change="tableSelectionChange"
          :stripe="true"
        >
          <af-table-column type="selection" align="center"></af-table-column>
          <!-- <af-table-column type="index" label="序号" align="center"></af-table-column> -->
          <af-table-column prop="planClass" label="计划类别" align="center"></af-table-column>
          <af-table-column v-if="isRootPlan" prop="rootPlanName" label="计划名称" align="center"></af-table-column>
          <af-table-column v-else prop="planName" label="计划名称" align="center"></af-table-column>
          <af-table-column prop="clientName" label="客户" align="center"></af-table-column>
          <af-table-column prop="brandName" label="品牌" align="center"></af-table-column>
          <af-table-column prop="clothesLevelName" label="服装层次" align="center"></af-table-column>
          <af-table-column prop="projectType" label="项目类型" align="center"></af-table-column>
          <af-table-column prop="orderStage" label="订单阶段" align="center"></af-table-column>
          <af-table-column prop="deleterName" label="删除人" align="center"></af-table-column>
          <af-table-column prop="deleteTime" label="删除时间" align="center"></af-table-column>

          <af-table-column fixed="right" align="center" width="80px" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="ReCover(scope.row)">恢复</el-button>
            </template>
          </af-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      totalTableData: [],
      tableData: [],

      isRootPlan: true,

      inputSuggestions: {
        plans: [],
        series: []
      },

      searchOptions: {
        searchParams: {
          clientName: "",
          brandName: "",
          seriesName: "",
          planName: "",
          dateRange: ""
        },
        options: {
          customerNameOptions: [],
          brandNameOptions: []
        }
      },

      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      pages: 0,
      tableSelectionData: []
    };
  },
  created: function() {
    const that = this;
    console.log("进入计划回收站页面");
    //客户名称加载
    request.get(`/backstage/client/name`).then(response => {
      this.searchOptions.options.customerNameOptions = response.result;
    });

    //品牌名称加载
    request.get(`/backstage/brand/name`).then(response => {
      this.searchOptions.options.brandNameOptions = response.result;
    });

    //加载默认所有的删除计划
    this.handleSearch();

    //输入建议
    request.get(`/plan/name`).then(response => {
      this.inputSuggestions.plans = [];
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.plans.push(element);
      });
    });

    request.get(`/info/series/name`).then(response => {
      this.inputSuggestions.series = [];
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.series.push(element);
      });
    });
  },
  methods: {
    // 输入建议
    createFilter(queryString) {
      return element => {
        return (
          element.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    searchPlanName(queryString, cb) {
      var tmp = this.inputSuggestions.plans;
      var results = queryString
        ? tmp.filter(this.createFilter(queryString))
        : tmp;
      cb(results);
    },
    searchSeriesName(queryString, cb) {
      var tmp = this.inputSuggestions.series;
      var results = queryString
        ? tmp.filter(this.createFilter(queryString))
        : tmp;
      cb(results);
    },

    clientNameChange() {
      //品牌名称跟随加载
      request
        .get(`/backstage/brand/name`, {
          params: { clientId: this.searchOptions.searchParams.clientName }
        })
        .then(response => {
          this.searchOptions.options.brandNameOptions = response.result;
        });
    },
    planTypeSwitchChange() {
      this.pagination.currentPage = 1;
      this.tableData = [];
      this.handleSearch();
    },

    // 每页条数改变时触发函数
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log(`每页 ${val} 条`);

      this.pagination.currentPage = 1;
      this.handleSearch();
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.currentPage = val;
      this.handleSearch();
    },
    tableSelectionChange(val) {
      this.tableSelectionData = val;
    },
    // 改变日期格式
    changeDate(date) {
      if (!date) {
        return undefined;
      } else {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        var h = date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = date.getSeconds();
        second = minute < 10 ? "0" + second : second;
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      }
    },
    //搜索按钮
    handleSearch() {
      var param;
      param = {
        clientId:
          this.searchOptions.searchParams.clientName === ""
            ? undefined
            : this.searchOptions.searchParams.clientName,
        brandId:
          this.searchOptions.searchParams.brandName === ""
            ? undefined
            : this.searchOptions.searchParams.brandName,
        seriesName:
          this.searchOptions.searchParams.seriesName === ""
            ? undefined
            : this.searchOptions.searchParams.seriesName,
        name:
          this.searchOptions.searchParams.planName === ""
            ? undefined
            : this.searchOptions.searchParams.planName,
        createAfter: this.changeDate(
          this.searchOptions.searchParams.dateRange
            ? this.searchOptions.searchParams.dateRange[0]
            : null
        ),
        createBefore: this.changeDate(
          this.searchOptions.searchParams.dateRange
            ? this.searchOptions.searchParams.dateRange[1]
            : null
        ),
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      };
      console.log("搜索参数", param);

      if (this.isRootPlan) {
        request
          .get(`/root-plan/find-delete`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result;
            this.pagination.total = response.total;
          });
      } else {
        request
          .get(`/plan/find-delete`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result;
            this.pagination.total = response.total;
          });
      }
    },
    // 恢复单个的按钮
    ReCover(row) {
      if (this.isRootPlan) {
        console.log("单个恢复:" + row.rootPlanName);

        request
          .get(`/root-plan/restore`, {
            params: {
              rootPlanId: row.rootPlanId
            }
          })
          .then(response => {
            this.handleSearch();
          });
      } else {
        console.log("单个恢复:" + row.planName);

        request
          .get(`/plan/restore`, {
            params: {
              planId: row.planId
            }
          })
          .then(response => {
            this.handleSearch();
          });
      }
    },
    //恢复所有选择的按钮
    ReCoverAll() {
      if (this.tableSelectionData.length === 0) {
        this.$message.error("请选择要恢复的计划!");
      } else {
        this.tableSelectionData.forEach(element => {
          console.log("恢复: " + element.name);
          this.ReCover(element);
        });
      }
    },
    //彻底删除
    delelePermanently() {
      if (this.tableSelectionData.length === 0) {
        this.$message.error("请选择要彻底删除的计划!");
      } else {
        this.tableSelectionData.forEach(element => {
          if (this.isRootPlan) {
            request
              .get(`/root-plan/completely-delete`, {
                params: {
                  rootPlanId: element.rootPlanId
                }
              })
              .then(response => {
                console.log("彻底删除", element.name, " OK");
                this.handleSearch();
              });
          } else {
            request
              .get(`/plan/completely-delete`, {
                params: {
                  planId: element.planId
                }
              })
              .then(response => {
                console.log("彻底删除", element.name, " OK");
                this.handleSearch();
              });
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 900px;
  .bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    .title {
      font-size: 14px;
      min-width: 70px;
      text-align: center;
    }
    .el-autocomplete {
      width: 70%;
      min-width: 80px;
      margin-left: 20px;
    }
    .el-select {
      width: 70%;
      min-width: 80px;
      margin-left: 20px;
    }
    .el-switch {
      width: 70%;
      min-width: 80px;
      margin-left: 7px;
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