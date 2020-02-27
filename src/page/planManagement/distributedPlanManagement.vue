<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="15">
          <div class="bar">
            <div class="title">计划类型</div>
            <el-radio-group v-model="planClassRadioValue" @change="planClassTypeChange">
              <el-radio-button label="系列计划"></el-radio-button>
              <el-radio-button label="款式计划"></el-radio-button>
              <el-radio-button label="款式组计划"></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>

        <el-col :span="5">
          <el-switch
            v-model="isRootPlan"
            @change="planTypeSwitchChange"
            inactive-color="#13ce66"
            active-text="根计划"
            inactive-text="普通计划"
          ></el-switch>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:5px;">
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
        <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="searchOptions.searchParams.clothesLevelName" clearable>
              <el-option
                v-for="item in searchOptions.options.clothesLevelNameOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-autocomplete
              :fetch-suggestions="isRootPlan ? searchRootPlanName : searchOrdinaryPlanName "
              v-model="searchOptions.searchParams.planName"
              placeholder="请输入内容"
            ></el-autocomplete>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
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
        <el-col :span="9">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              style="margin-left: 20px"
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              clearable
            ></el-date-picker>
          </div>
        </el-col>

        <el-col :offset="1" :span="2">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-button type="primary" size="small" @click="addPlanChild">添加子计划</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="batchAddPlanChild">批量添加子计划</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="changeSubPlanOrder">下级计划顺序调整</el-button>
        </el-col>
        <el-col :span="3">
          <GanttExtension :selectedTableData="selectedData" :isRootPlan="isRootPlan"></GanttExtension>
        </el-col>
      </el-row>

      <el-table
        border
        :data="tableData"
        max-height="800"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px"
        :row-style="tableRowClassName"
        @selection-change="handleMultipleSelectionChange"
      >
        <!-- 多选 -->
        <af-table-column type="selection"></af-table-column>
        <!-- 单选 -->
        <!-- <af-table-column label width="65">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.id"
              v-model="templateRadio"
              @change.native="getTemplateRow(scope.row)"
            >{{scope.$index+1}}</el-radio>
          </template>
        </af-table-column>-->

        <!-- 三种计划类型都有 -->
        <af-table-column prop="assignPlanType" label="下发计划类型" align="center"></af-table-column>
        <af-table-column prop="name" label="计划名称" align="center"></af-table-column>
        <af-table-column prop="numberOfChildren" label="子计划数" align="center"></af-table-column>
        <af-table-column prop="clientName" label="客户" align="center"></af-table-column>
        <af-table-column prop="brandName" label="品牌" align="center"></af-table-column>
        <af-table-column prop="clothesLevelName" label="服装层次" align="center"></af-table-column>
        <af-table-column prop="rangeCode" label="波段编码" align="center"></af-table-column>

        <!-- 只款式组有 -->
        <af-table-column
          v-if="planClassDict[planClassRadioValue]==='GROUP'"
          prop="styleGroupName"
          label="款式组名称"
          align="center"
        ></af-table-column>

        <!-- 只有款式计划有 -->
        <af-table-column
          v-if="planClassDict[planClassRadioValue]==='STYLE'"
          prop="styleNumber"
          label="款号"
          align="center"
        ></af-table-column>

        <!-- 只有系列计划有 -->
        <af-table-column
          v-if="planClassDict[planClassRadioValue]==='SERIES'"
          prop="seriesCode"
          label="系列编码"
          align="center"
        ></af-table-column>
        <af-table-column
          v-if="planClassDict[planClassRadioValue]==='SERIES'"
          prop="systemCode"
          label="系统编码"
          align="center"
        ></af-table-column>

        <!-- 都有 -->
        <af-table-column prop="projectType" label="项目类型" align="center"></af-table-column>
        <af-table-column prop="orderStage" label="订单阶段" align="center"></af-table-column>

        <!-- 只有系列计划有 -->
        <af-table-column
          v-if="planClassDict[planClassRadioValue]==='SERIES'"
          prop="predictStyleQuantity"
          label="预测款数"
          align="center"
        ></af-table-column>
        <af-table-column
          v-if="planClassDict[planClassRadioValue]==='SERIES'"
          prop="predictPieceQuantity"
          label="预测件数"
          align="center"
        ></af-table-column>
        <af-table-column
          v-if="planClassDict[planClassRadioValue]==='SERIES'"
          prop="informalStyleQuantity"
          label="非正式款数"
          align="center"
        ></af-table-column>
        <af-table-column
          v-if="planClassDict[planClassRadioValue]==='SERIES'"
          prop="informalPieceQuantity"
          label="非正式件数"
          align="center"
        ></af-table-column>

        <!-- 款式和款式组有 -->
        <af-table-column
          v-if="planClassDict[planClassRadioValue]!='SERIES'"
          prop="styleQuantity"
          label="正式款数"
          align="center"
        ></af-table-column>
        <af-table-column
          v-if="planClassDict[planClassRadioValue]!='SERIES'"
          prop="pieceQuantity"
          label="正式件数"
          align="center"
        ></af-table-column>

        <!-- 都有 -->
        <af-table-column prop="inputPoint" label="投入点" align="center"></af-table-column>
        <af-table-column prop="startDate" label="计划开始" align="center"></af-table-column>
        <af-table-column prop="endDate" label="计划完成" align="center"></af-table-column>

        <af-table-column fixed="right" label="操作" width="80px" align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="getPlanDetail(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </af-table-column>
      </el-table>
      <!-- 分页 -->
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

    <el-dialog title="子计划顺序调整" :visible.sync="subPlanOrderModificationDialogVisible" :modal="false">
      <el-table :data="subPlanTableData" highlight-current-row style="width: 100%">
        <af-table-column type="index" label="新顺序"></af-table-column>
        <af-table-column prop="name" label="计划名称"></af-table-column>
        <af-table-column prop="startDate" label="开始日期"></af-table-column>
        <af-table-column prop="endDate" label="结束日期"></af-table-column>
        <af-table-column prop="creatorName" label="创建人"></af-table-column>
        <af-table-column prop="deptName" label="部门名称"></af-table-column>
        <af-table-column prop="createTime" label="创建日期"></af-table-column>
        <af-table-column label="操作" width="80px" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.$index===0"
              @click="moveUp(scope.$index,scope.row)"
            >
              <i class="el-icon-arrow-up"></i>
            </el-button>
            <el-button
              size="mini"
              :disabled="scope.$index===(subPlanTableData.length-1)"
              @click="moveDown(scope.$index,scope.row)"
            >
              <i class="el-icon-arrow-down"></i>
            </el-button>
            <!-- <el-button type="info" size="mini" round v-if="scope.$index===0">默认</el-button> -->
          </template>
        </af-table-column>
      </el-table>
      <el-button type="primary" @click="subPlanOrderConfirm">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import GanttExtension from "@/utils/ganttExtension";

import request from "@/utils/request";
export default {
  components: {
    GanttExtension
  },

  name: "distributedPlanManagement",
  data() {
    return {
      isRootPlan: true,
      planClassDict: {
        系列计划: "SERIES",
        款式计划: "STYLE",
        款式组计划: "GROUP"
      },
      planClassRouterDestinationDict: {
        系列计划: "planMakeOfSeries",
        款式计划: "planMakeOfStyle",
        款式组计划: "planMakeOfStyleGroup"
      },
      planClassRadioValue: "系列计划",

      // templateRadio: null,

      inputSuggestions: {
        rootPlans: [],
        ordinaryPlans: [],
        series: []
      },

      defaultProps: {
        children: "children",
        label: "name"
      },
      subPlanOrderModificationDialogVisible: false,
      isSelfMadePlan: false,
      searchOptions: {
        searchParams: {
          clientName: "",
          brandName: "",
          clothesLevelName: "",
          seriesName: "",
          planName: "",
          dateRange: ""
        },
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          clothesLevelNameOptions: []
        }
      },
      tableData: [],

      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      selectedData: [],

      subPlanTableData: []
    };
  },
  created: function() {
    console.log("进入计划管理页面");

    //客户名称加载
    request
      .get(`${window.$config.HOST}/backstage/client/name`)
      .then(response => {
        this.searchOptions.options.customerNameOptions = response.result;
      });

    //品牌名称加载
    request
      .get(`${window.$config.HOST}/backstage/brand/name`)
      .then(response => {
        this.searchOptions.options.brandNameOptions = response.result;
      });

    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "服装层次"
        }
      })
      .then(response => {
        this.searchOptions.options.clothesLevelNameOptions = response.result;
      });

    //默认获取下发的根计划列表
    request
      .get(`${window.$config.HOST}/root-plan/find-assign`, {
        params: {
          planClass: "SERIES",
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        }
      })
      .then(response => {
        this.tableData = response.result;
        this.pagination.total = response.total;
      });

    //输入建议
    request.get(`${window.$config.HOST}/plan/name`).then(response => {
      this.inputSuggestions.ordinaryPlans = [];
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.ordinaryPlans.push(element);
      });
    });
    request.get(`${window.$config.HOST}/root-plan/name`).then(response => {
      this.inputSuggestions.rootPlans = [];
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.rootPlans.push(element);
      });
    });
    request.get(`${window.$config.HOST}/info/series/name`).then(response => {
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
    searchRootPlanName(queryString, cb) {
      var tmp = this.inputSuggestions.rootPlans;
      var results = queryString
        ? tmp.filter(this.createFilter(queryString))
        : tmp;
      cb(results);
    },
    searchOrdinaryPlanName(queryString, cb) {
      var tmp = this.inputSuggestions.ordinaryPlans;
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
        .get(`${window.$config.HOST}/backstage/brand/name`, {
          params: { clientId: this.searchOptions.searchParams.clientName }
        })
        .then(response => {
          this.searchOptions.options.brandNameOptions = response.result;
        });
    },
    planClassTypeChange() {
      this.pagination.currentPage = 1;
      this.tableData = [];
      this.handleSearch();
    },
    planTypeSwitchChange() {
      this.pagination.currentPage = 1;
      this.tableData = [];
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log("每页+" + this.pagination.pageSize);
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.handleSearch();
    },

    // 单选触发函数
    // getTemplateRow(row) {
    //   this.templateRadio = row.id;
    //   this.selectedData = [];
    //   this.selectedData.push(row);
    // },
    // 多选触发函数
    handleMultipleSelectionChange(val) {
      this.selectedData = val;
    },

    // 行颜色
    tableRowClassName({ row, rowIndex }) {
      if (row.fromTemplate) {
        return "background: oldlace;";
      }
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
        // var h = date.getHours();
        // var minute = date.getMinutes();
        // minute = minute < 10 ? "0" + minute : minute;
        // var second = date.getSeconds();
        // second = minute < 10 ? "0" + second : second;
        // return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
        return y + "-" + m + "-" + d;
      }
    },
    //搜索按钮
    handleSearch() {
      let that = this;
      console.log("搜索日期：", this.searchOptions.searchParams.dateRange);
      var param = {
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
        clothesLevelName:
          this.searchOptions.searchParams.clothesLevelName === ""
            ? undefined
            : this.searchOptions.searchParams.clothesLevelName,
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
        pageSize: this.pagination.pageSize,
        planClass: this.planClassDict[this.planClassRadioValue]
      };
      console.log("搜索参数：", param);
      if (that.isRootPlan) {
        request
          .get(`${window.$config.HOST}/root-plan/find-assign`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result;
            this.pagination.total = response.total;
          });
      } else {
        request
          .get(`${window.$config.HOST}/plan/find-assign`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result;
            this.pagination.total = response.total;
          });
      }
    },

    addPlanChild() {
      if (this.selectedData.length === 1) {
        let data = this.selectedData[0];
        var param = {
          goback: "distributedPlanManagement",
          isRoot: this.isRootPlan,
          isModify: false,
          isCreate: true,
          rowData: data
        };
        console.log("路由参数：", param);

        this.isCachedPage = false;
        this.$router.push({
          name: this.planClassRouterDestinationDict[this.planClassRadioValue],
          params: param
        });
        // this.selectedData = [];
      } else if (this.selectedData.length === 0) {
        this.$message.error("请选择要添加子计划的计划！");
      } else {
        this.$message.error("仅允许对一条计划添加子计划，请重新选择！");
      }
    },
    batchAddPlanChild() {
      if (this.selectedData.length === 0) {
        this.$message.error("请选择一个计划！");
      } else {
        var param = {
          goback: "distributedPlanManagement",
          isRoot: this.isRootPlan,
          isModify: false,
          isCreate: true,
          isBatch: true,
          batchData: this.selectedData
        };

        console.log("新建标签页路由参数：", param);

        let createChildPlanPage = this.$router.push({
          name: this.planClassRouterDestinationDict[this.planClassRadioValue],
          params: param
        });
      }
    },

    getPlanDetail(row) {
      var param = {
        goback: "distributedPlanManagement",
        isRoot: this.isRootPlan,
        isModify: false,
        isCreate: false,
        rowData: row
      };
      console.log("跳转参数：", param);

      this.isCachedPage = true;
      this.$router.push({
        name: this.planClassRouterDestinationDict[this.planClassRadioValue],
        params: param
      });
    },

    //子计划顺序跳转按钮
    changeSubPlanOrder() {
      if (this.selectedData.length === 1) {
        var param = {
          id: this.selectedData[0].id
        };
        console.log("子计划搜索参数：", param);
        request
          .get(`${window.$config.HOST}/root-plan/children`, {
            params: param
          })
          .then(response => {
            // console.log(response.data);
            this.subPlanTableData = response.result;
            this.subPlanTableData.sort(function(a, b) {
              return a.sequence - b.sequence;
            });
            // this.selectedData = [];
          });
        this.subPlanOrderModificationDialogVisible = true;
      } else if (this.selectedData.length === 0) {
        this.$message.error("请选择要调整的计划！");
      } else {
        this.$message.error("仅允许对一条计划调整，请重新选择！");
      }
    },
    subPlanOrderConfirm() {
      var param = [];
      var len = this.subPlanTableData.length;
      for (var i = 0; i < len; i++) {
        param.push({
          id: this.subPlanTableData[i].id,
          sequence: i
        });
      }
      console.log("子计划上传顺序：", param);
      request
        .put(`${window.$config.HOST}/plan/adjust-children`, param)
        .then(response => {
          this.subPlanOrderModificationDialogVisible = false;
        });
    },

    //子计划顺序控制函数
    //上移
    moveUp(index, row) {
      var that = this;
      // console.log('上移',index,row);
      // console.log(that.subPlanTableData[index]);
      if (index > 0) {
        let upDate = that.subPlanTableData[index - 1];
        that.subPlanTableData.splice(index - 1, 1);
        that.subPlanTableData.splice(index, 0, upDate);
      } else {
        alert("已经是第一条，不可上移");
      }
      // console.log(that.subPlanTableData);
    },

    //下移
    moveDown(index, row) {
      var that = this;
      // console.log('下移',index,row);
      if (index + 1 === that.subPlanTableData.length) {
        alert("已经是最后一条，不可下移");
      } else {
        console.log(index);
        let downDate = that.subPlanTableData[index + 1];
        that.subPlanTableData.splice(index + 1, 1);
        that.subPlanTableData.splice(index, 0, downDate);
      }
    }
  },
  computed: {
    keepAlives: {
      get() {
        return this.$store.getters["baseinfo/keepAliveOptions"];
      },
      set(value) {
        return this.$store.commit("baseinfo/keepalive-opt-arr", value);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (
      this.isCachedPage &&
      (to.name === "planMakeOfSeries" ||
        to.name === "planMakeOfStyle" ||
        to.name === "planMakeOfStyleGroup")
    ) {
      this.keepAlives = ["distributedPlanManagement"];
    } else {
      this.keepAlives = [];
    }
    next();
  }
};
</script>

<style lang="less" scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.Mtitle {
  font-size: 3ch;
  margin-left: 47%;
}
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 900px;
  .el-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    .el-switch {
      min-width: 200px;
      margin-left: 20px;
    }

    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 14px;
        width: 70px;
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
      .el-radio-group {
        min-width: 300px;
        margin-left: 20px;
      }
    }
  }
  .block {
    padding: 30px 0;
    text-align: center;
  }
}
</style>
