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
// 导入封装的自定义的axios插件用于http请求
import request from "@/utils/request";

export default {
  // 此页面需要用到的数据定义
  data() {
    return {
      tableData: [], // 页面展示的已删除计划信息
      tableSelectionData: [], //表格中选中的数据

      isRootPlan: true, // el-switch值变量，表示当前展示的计划是根计划/普通计划

      // 输入建议，包含计划名称输入建议，系列名称输入建议
      inputSuggestions: {
        plans: [],
        series: []
      },

      // 搜索选项相关变量
      searchOptions: {
        searchParams: {
          clientName: undefined, // 客户名称输入
          brandName: undefined, // 品牌名称输入
          seriesName: undefined, //系列名称输入
          planName: undefined, //计划名称输入
          dateRange: undefined //日期范围输入
        },
        // 输入选项中相关的多选
        options: {
          customerNameOptions: [], //客户名称多选项信息
          brandNameOptions: [] //品牌名称多选项信息
        }
      },

      // 页码控制相关变量
      pagination: {
        currentPage: 1, // 当前页码
        pageSizes: [10, 20, 30, 40, 50], // 页码选项中x条/页的选择项
        pageSize: 10, // 当前页面展示多少条数据
        total: 0 // 后台一共有多少条数据
      }
    };
  },

  created: function() {
    console.log("进入计划回收站页面");
    //客户名称下拉框数据加载，接口格式见接口文档
    request.get(`/backstage/client/name`).then(response => {
      // 返回数据存储于this.searchOptions.options.customerNameOptions
      this.searchOptions.options.customerNameOptions = response.result;
    });

    //品牌名称下拉框数据加载，接口格式见接口文档
    request.get(`/backstage/brand/name`).then(response => {
      // 返回数据存储于this.searchOptions.options.brandNameOptions
      this.searchOptions.options.brandNameOptions = response.result;
    });

    //加载默认搜索田间下的删除计划
    this.handleSearch();

    //获取普通计划的输入建议，接口详情件接口文档
    request.get(`/plan/name`).then(response => {
      this.inputSuggestions.plans = [];

      /* 
      获取的返回数据存储在this.inputSuggestions.plans
      因为el-autocomplete组件中，对应值字段是value，而返回数据中是name字段，所以遍历
      返回数据，将其中的name字段赋值给value字段
      */
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.plans.push(element);
      });
    });

    //获取系列名称的输入建议，接口详情件接口文档
    request.get(`/info/series/name`).then(response => {
      this.inputSuggestions.series = [];

      /* 
      获取的返回数据存储在this.inputSuggestions.series
      因为el-autocomplete组件中，对应值字段是value，而返回数据中是name字段，所以遍历
      返回数据，将其中的name字段赋值给value字段
      */
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.series.push(element);
      });
    });
  },

  methods: {
    /* 
    el-autocomplete组件的根据输入字段,在所有输入建议中过滤匹配字段的函数，
    组件详情：https://element.eleme.cn/#/zh-CN/component/input 
    */
    createFilter(queryString) {
      return element => {
        return (
          element.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    /* 
    el-autocomplete组件的函数，为普通计划搜索建议赋值
    组件详情：https://element.eleme.cn/#/zh-CN/component/input 
    */
    searchPlanName(queryString, cb) {
      var tmp = this.inputSuggestions.plans;
      var results = queryString
        ? tmp.filter(this.createFilter(queryString))
        : tmp;
      cb(results);
    },

    /* 
    el-autocomplete组件的函数，为系列名称搜索建议赋值
    组件详情：https://element.eleme.cn/#/zh-CN/component/input 
    */
    searchSeriesName(queryString, cb) {
      var tmp = this.inputSuggestions.series;
      var results = queryString
        ? tmp.filter(this.createFilter(queryString))
        : tmp;
      cb(results);
    },

    // 客户名称el-select组件响应函数，当客户名称选择变化时，搜索选项中品牌名称下拉框数据对应变化，重新加载该数据
    clientNameChange() {
      request
        .get(`/backstage/brand/name`, {
          params: { clientId: this.searchOptions.searchParams.clientName }
        })
        .then(response => {
          this.searchOptions.options.brandNameOptions = response.result;
        });
    },

    // 计划类别选择，el-switch组件对应响应函数，是提交/未提交计划选项变化时触发
    planTypeSwitchChange() {
      this.pagination.currentPage = 1; // 重新赋值当前页面的页码编号
      this.tableData = []; // 清空之前搜索的计划数据
      this.handleSearch(); // 根据搜索条件重新加载当前选择计划类型的数据
    },

    // el-pagination对应函数，当每页需要展示的数据数量变化时触发
    handleSizeChange(val) {
      this.pagination.pageSize = val; // 当前页面展示数据数量存储于this.pagination.pageSize字段
      this.pagination.currentPage = 1;
      this.handleSearch(); // 重新加载页面展示的计划数据
    },

    // el-pagination对应函数，当当前页码变化时触发
    handleCurrentChange(val) {
      this.pagination.currentPage = val; // 当前页码存储于this.pagination.currentPage
      this.handleSearch(); // 重新加载页面展示的计划数据
    },

    // el-table多选触发函数，将选中的多条计划数据存储在this.tableSelectionData中
    tableSelectionChange(val) {
      this.tableSelectionData = val;
    },

    // 辅助函数：将js date对象转变为字符串对象
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

    //搜索函数，调用时将根据页面的搜索选项重新加载页面表格中展示的数据
    handleSearch() {
      // 根据当前页面中的搜索选项数据构造接口信息中的对应参数
      var param = {
        // 以下成员字段详情见接口文档，在赋值时额外判断下时候为空，为空则赋值为undefined
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

        // 以下两个字段利用辅助函数将js date对象转化为字符串
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

        // 页码相关参数
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      };
      console.log("搜索参数", param);

      // 根据isRootPlan，是否当前页面查看根计划/普通计划调用不同的接口获取计划信息，接口详情参阅接口文档
      if (this.isRootPlan) {
        request
          .get(`/root-plan/find-delete`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result; // 返回结果的result字段存储赋值给tableData字段
            this.pagination.total = response.total; // 根据返回结果中total字段更新当前搜索条件下后台总共有的数据数
          });
      } else {
        request
          .get(`/plan/find-delete`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result; // 返回结果的result字段存储赋值给tableData字段
            this.pagination.total = response.total; // 根据返回结果中total字段更新当前搜索条件下后台总共有的数据数
          });
      }
    },

    // 表格操作中的恢复操作点击时的响应函数
    ReCover(row) {
      // 根据isRootPlan，是否当前页面查看根计划/普通计划调用不同的接口恢复删除计划信息，接口详情参阅接口文档
      if (this.isRootPlan) {
        console.log("单个恢复:" + row.rootPlanName);

        // 根计划恢复
        request
          .get(`/root-plan/restore`, {
            params: {
              rootPlanId: row.rootPlanId
            }
          })
          .then(response => {
            this.handleSearch(); // 恢复成功过后重新根据搜索田间加载表格信息
          });
      } else {
        console.log("单个恢复:" + row.planName);

        //普通计划恢复
        request
          .get(`/plan/restore`, {
            params: {
              planId: row.planId
            }
          })
          .then(response => {
            this.handleSearch(); // 恢复成功过后重新根据搜索田间加载表格信息
          });
      }
    },

    // 恢复所选计划按钮点击响应函数
    ReCoverAll() {
      // 判断是否有选择到数据，否则报错
      if (this.tableSelectionData.length === 0) {
        this.$message.error("请选择要恢复的计划!");
      } else {
        // 对多选的各行数据，遍历通过调用ReCover()恢复每一条计划
        this.tableSelectionData.forEach(element => {
          console.log("恢复: " + element.name);
          this.ReCover(element);
        });
      }
    },

    //彻底删除按钮点击响应函数
    delelePermanently() {
      // 判断是否有选择到数据，否则报错
      if (this.tableSelectionData.length === 0) {
        this.$message.error("请选择要彻底删除的计划!");
      } else {
        // 对多选的多个计划，遍历，依次彻底删除每一条计划
        this.tableSelectionData.forEach(element => {
          // 根据isRootPlan，是否当前页面查看根计划/普通计划调用不同的接口彻底删除计划信息，接口详情参阅接口文档
          if (this.isRootPlan) {
            // 彻底删除根计划
            request
              .get(`/root-plan/completely-delete`, {
                params: {
                  rootPlanId: element.rootPlanId
                }
              })
              .then(response => {
                console.log("彻底删除", element.name, " OK");
                this.handleSearch(); //删除后根据搜索条件重新加载表格信息
              });
          } else {
            // 彻底删除普通计划
            request
              .get(`/plan/completely-delete`, {
                params: {
                  planId: element.planId
                }
              })
              .then(response => {
                console.log("彻底删除", element.name, " OK");
                this.handleSearch(); //删除后根据搜索条件重新加载表格信息
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