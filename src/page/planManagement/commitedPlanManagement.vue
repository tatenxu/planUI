<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="15">
          <div class="bar">
            <div class="title">计划类别</div>
            <el-radio-group v-model="planClassRadioValue" @change="planClassTypeChange">
              <el-radio-button label="系列计划"></el-radio-button>
              <el-radio-button label="款式计划"></el-radio-button>
              <el-radio-button label="款式组计划"></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>

        <el-col :span="12">
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
      </el-row>

      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="8">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select
              v-model="searchOptions.searchParams.clientName"
              @change="clientNameChange"
              clearable
            >
              <el-option
                v-for="item in searchOptions.options.clientNameOptions"
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

        <el-col :span="8">
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
      </el-row>

      <!-- 第二行 -->
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-autocomplete
              :fetch-suggestions="searchPlanName "
              v-model="searchOptions.searchParams.planName"
              placeholder="请输入内容"
            ></el-autocomplete>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-autocomplete
              :fetch-suggestions="searchSeriesName"
              v-model="searchOptions.searchParams.seriesName"
              placeholder="请输入内容"
            ></el-autocomplete>
          </div>
        </el-col>

        <el-col :span="2" :offset="5">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="bar">
            <el-button
              type="primary"
              size="small"
              style="margin-right: 20px"
              @click="lookAllPlan"
            >查看总计划</el-button>
          </div>
        </el-col>

        <el-col :span="3">
          <GanttExtension :selectedTableData="selectedData" :isRootPlan="true"></GanttExtension>
        </el-col>
      </el-row>

      <el-table
        border
        :data="tableData"
        max-height="800"
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px"
      >
        <af-table-column label>
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.id"
              v-model="templateRadio"
              @change.native="getTemplateRow(scope.$index,scope.row)"
            >{{scope.$index+1}}</el-radio>
          </template>
        </af-table-column>

        <!-- 三种计划类型都有 -->
        <af-table-column prop="name" label="计划名称" align="center"></af-table-column>
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
        <af-table-column prop="completeTime" label="完成时间" align="center"></af-table-column>

        <af-table-column fixed="right" width="80px" label="操作" align="center">
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

      <el-dialog title="查看总计划" :visible.sync="allPlansData.allPlanShow" :modal="false">
        <div class="body">
          <el-tree
            default-expand-all
            :data="allPlansData.allPlans"
            :highlight-current="true"
            :props="allPlansData.defaultProps"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span v-if="data.name != selectedData[0].name && data.id != 0">
                <el-button type="text" size="mini" @click="subPlanLookDetail(data)">详情</el-button>
              </span>
            </span>
          </el-tree>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// 导入自定义的甘特图插件用于展示计划的甘特图
import GanttExtension from "@/utils/ganttExtension";
// 导入封装的自定义的axios插件用于http请求
import request from "@/utils/request";

export default {
  name: "commitedPlanManagement", // 此页面的component名称
  components: {
    GanttExtension
  },

  // 此页面需要用到的数据定义
  data() {
    return {
      // planClassDict用于映射页面的中文显示和接口中对应的英文字段
      planClassDict: {
        系列计划: "SERIES",
        款式计划: "STYLE",
        款式组计划: "GROUP"
      },
      // planClassRouterDestinationDict用于映射计划类型和计划查看/修改/新增时的跳转页面
      planClassRouterDestinationDict: {
        系列计划: "planMakeOfSeries",
        款式计划: "planMakeOfStyle",
        款式组计划: "planMakeOfStyleGroup"
      },
      /* 
        planClassRadioValue是el-radio-group组件选择计划类型变化时存储的值，
        页面打开时，默认选择了系列计划
      */
      planClassRadioValue: "系列计划",

      // 产看总计划按钮的相关数据变量
      allPlansData: {
        allPlans: [], //存储总计划的计划详情
        allPlanShow: false, //控制总计划对话框显示
        /* 
          defaultProps控制el-tre组件相关变量的显示，主要将allPlans的name属性映射到el-tree组件显示label属性
          组件详情：https://element.eleme.cn/#/zh-CN/component/tree
        */
        defaultProps: {
          children: "children",
          label: "name",
          id: "id"
        }
      },

      templateRadio: "", // 表格单选变量，暂时无用

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
          clothesLevelName: undefined, //服装层次输入
          seriesName: undefined, //系列名称输入
          planName: undefined, //计划名称输入
          dateRange: undefined //日期范围输入
        },
        // 输入选项中相关的多选
        options: {
          clientNameOptions: [], //客户名称多选项信息
          brandNameOptions: [], //品牌名称多选项信息
          clothesLevelNameOptions: [] //服装层次多选项信息
        }
      },

      tableData: [], // 页面展示的已提交计划信息

      // 页码控制相关变量
      pagination: {
        currentPage: 1, // 当前页码
        pageSizes: [10, 20, 30, 40, 50], // 页码选项中x条/页的选择项
        pageSize: 10, // 当前页面展示多少条数据
        total: 0 // 后台一共有多少条数据
      },

      selectedData: [] // 页面中多选选中的数据
    };
  },

  created: function() {
    //客户名称下拉框数据加载，接口格式见接口文档
    request
      .get(`${window.$config.HOST}/backstage/client/name`)
      .then(response => {
        // 返回数据存储于this.searchOptions.options.clientNameOptions
        this.searchOptions.options.clientNameOptions = response.result;
      });

    //品牌名称下拉框数据加载，接口格式见接口文档
    request
      .get(`${window.$config.HOST}/backstage/brand/name`)
      .then(response => {
        // 返回数据存储于this.searchOptions.options.brandNameOptions
        this.searchOptions.options.brandNameOptions = response.result;
      });

    //服装层次下拉框数据加载，接口格式见接口文档
    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "服装层次"
        }
      })
      .then(response => {
        // 返回数据存储于this.searchOptions.options.clothesLevelNameOptions
        this.searchOptions.options.clothesLevelNameOptions = response.result;
      });

    //默认获取已完成系列根计划计划列表
    this.handleSearch();

    //获取根计划的输入建议，接口详情件接口文档
    request.get(`${window.$config.HOST}/root-plan/name`).then(response => {
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
    request.get(`${window.$config.HOST}/info/series/name`).then(response => {
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
    el-autocomplete组件的函数，为根计划搜索建议赋值
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
        .get(`${window.$config.HOST}/backstage/brand/name`, {
          params: { clientId: this.searchOptions.searchParams.clientName }
        })
        .then(response => {
          this.searchOptions.options.brandNameOptions = response.result;
        });
    },

    // el-pagination对应函数，当每页需要展示的数据数量变化时触发
    handleSizeChange(val) {
      this.pagination.pageSize = val; // 当前页面展示数据数量存储于this.pagination.pageSize字段
      console.log("每页+" + this.pagination.pageSize);
      this.handleSearch(); // 重新加载页面展示的计划数据
    },

    // el-pagination对应函数，当当前页码变化时触发
    handleCurrentChange(val) {
      this.pagination.currentPage = val; // 当前页码存储于this.pagination.currentPage
      this.handleSearch(); // 重新加载页面展示的计划数据
    },

    // 计划类别选择触发，el-radio-group组件对应响应函数。
    planClassTypeChange() {
      this.pagination.currentPage = 1; // 重新赋值当前页面的页码编号
      this.tableData = []; // 清空之前搜索的计划数据
      this.handleSearch(); // 根据搜索条件重新加载当前选择计划类别的数据
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

        return y + "-" + m + "-" + d;
      }
    },

    //搜索函数，调用时将根据页面的搜索选项重新加载页面表格中展示的数据
    handleSearch() {
      // 根据当前页面中的搜索选项数据构造接口信息中的对应参数
      var param = {
        // 以下成员字段详情见接口文档，在赋值时额外判断下时候为空，为空则赋值为undefined
        clientId: this.searchOptions.searchParams.clientName,
        brandId: this.searchOptions.searchParams.brandName,
        seriesName: this.searchOptions.searchParams.seriesName,
        name: this.searchOptions.searchParams.planName,

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

        // 根据定义的字典，赋值当前计划类别对应的英文值
        planClass: this.planClassDict[this.planClassRadioValue],

        // 页码相关参数
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      };

      // /root-plan/find-complete接口获取完成的根计划信息，接口详情见接口文档
      request
        .get(`${window.$config.HOST}/root-plan/find-complete`, {
          params: param
        })
        .then(response => {
          this.tableData = response.result; // 返回结果的result字段存储赋值给tableData字段
          this.pagination.total = response.total; // 根据返回结果中total字段更新当前搜索条件下后台总共有的数据数
        });
    },

    // 表格单选触发函数，将选择的数据存储在this.selectedData中
    getTemplateRow(index, row) {
      this.selectedData = [row];
    },

    // 产看总计划按钮点击响应函数
    lookAllPlan() {
      // 判断是否是只选择了一个计划，否则提示
      if (this.selectedData.length == 0) {
        this.$message({
          message: "请选择一项！",
          type: "warning"
        });
        return;
      } else if (this.selectedData.length > 1) {
        this.$message({
          message: "只能选择一项！",
          type: "warning"
        });
        return;
      }

      // /root-plan/tree接口获取总计划树，接口详情见接口文档
      request
        .get(`/root-plan/tree`, {
          params: {
            id: this.selectedData[0].id
          }
        })
        .then(response => {
          // 将数据已列表元素的形式存储于 this.allPlansData.allPlans中
          this.allPlansData.allPlans = [];
          this.allPlansData.allPlans.push(response.result);

          // 展示总计划树对话框
          this.allPlansData.allPlanShow = true;
        });
    },

    //列表中的查看详情按钮点击时的响应函数
    getPlanDetail(row) {
      /*
      跳转到对应计划的产看的页面，param为页面跳转的参数
          goback: 当前页面的名称。用于在跳转过去的页面中返回当前页面
          isRoot: 当前要制定的计划是否是跟计划,
          isModify: 是否是更新计划,
          isCreate: 是否是添加计划,
          rowData: 计划数据
        */
      var param = {
        goback: "commitedPlanManagement",
        planClass: this.planClassDict[this.planClassRadioValue],
        isRoot: true,
        isModify: false,
        isCreate: false,
        rowData: row
      };
      console.log("跳转参数：", param);

      // 跳转到目标页面，那么表示目标页面名称。根据planClassRadioValue值，在定义的planClassRouterDestinationDict中映射
      this.$router.push({
        name: this.planClassRouterDestinationDict[this.planClassRadioValue],
        params: param
      });
    },

    // 查看总计划对话框中，点击其中子计划的详情按钮时的响应函数，将跳转到其计划详情页
    subPlanLookDetail(data) {
      // /plan/find-complete接口获取要查看计划的详情
      request
        .get(`/plan/find-complete`, {
          params: {
            id: data.id,
            planClass: this.planClassDict[this.planClassRadioValue]
          }
        })
        .then(response => {
          /*
          利用返回的计划数据构造跳转参数，
          跳转到对应计划的产看的页面，param为页面跳转的参数
            goback: 当前页面的名称。用于在跳转过去的页面中返回当前页面
            isRoot: 当前要制定的计划是否是跟计划,
            isModify: 是否是更新计划,
            isCreate: 是否是添加计划,
            rowData: 计划数据
          */
          var param = {
            goback: "commitedPlanManagement",
            planClass: this.planClassDict[this.planClassRadioValue],
            isRoot: false,
            isModify: false,
            isCreate: false,
            rowData: response.result
          };
          console.log("跳转参数：", param);

          // 跳转到目标页面，那么表示目标页面名称。根据planClassRadioValue值，在定义的planClassRouterDestinationDict中映射
          this.$router.push({
            name: this.planClassRouterDestinationDict[this.planClassRadioValue],
            params: param
          });
        });
    }
  },

  // 计算属性
  computed: {
    // keepalives用于辅助页面缓存，keep-alive标签根据该值判断要缓存的页面，keep-alive标签在layout.vue中
    keepAlives: {
      get() {
        return this.$store.getters["baseinfo/keepAliveOptions"];
      },
      set(value) {
        return this.$store.commit("baseinfo/keepalive-opt-arr", value);
      }
    }
  },

  // 路由跳转前的控制函数
  beforeRouteLeave(to, from, next) {
    // 利用compiuted中的keepAlive实现页面缓存
    if (
      to.name === "planMakeOfSeries" ||
      to.name === "planMakeOfStyle" ||
      to.name === "planMakeOfStyleGroup"
    ) {
      this.keepAlives = ["commitedPlanManagement"];
    } else {
      this.keepAlives = [];
    }
    next();
  }
};
</script>

<style lang="less" scoped>
.Mtitle {
  font-size: 3ch;
  margin-left: 47%;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
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
      .el-input {
        width: 70%;
        min-width: 80px;
        margin-left: 20px;
      }
      .el-select {
        width: 70%;
        min-width: 80px;
        margin-left: 20px;
      }
      .el-autocomplete {
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
