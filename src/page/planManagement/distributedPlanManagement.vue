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
        <af-table-column label="操作" width="150px" fixed="right">
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
// 导入自定义的甘特图插件用于展示计划的甘特图
import GanttExtension from "@/utils/ganttExtension";
// 导入封装的自定义的axios插件用于http请求
import request from "@/utils/request";

export default {
  // 导入
  components: {
    GanttExtension
  },

  // 此页面的component名称
  name: "distributedPlanManagement",

  // 此页面需要用到的数据定义
  data() {
    return {
      isRootPlan: true, // 当前查看搜索的计划是否是跟计划
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

      // inputSuggestions表示本页面中的所有输入建议变量
      inputSuggestions: {
        rootPlans: [], // 跟计划名的输入建议
        ordinaryPlans: [], // 普通计划的输入建议
        series: [] //系列名称的输入建议
      },
      subPlanOrderModificationDialogVisible: false, // 点击下级计划调整按钮时，控制对应对话框的弹出显示

      // searchOptions表示本页面的搜索选项中相应的字段值
      searchOptions: {
        searchParams: {
          clientName: "", // 对应搜索选项中的客户名称
          brandName: "", // 对应搜索选项中的品牌名称
          clothesLevelName: "", //对应搜索选项中的服装层次
          seriesName: "", //对应搜索选项中的系列名称
          planName: "", //对应搜索选项中的计划名称
          dateRange: "" //对应搜索选项中的日期范围
        },
        options: {
          customerNameOptions: [], // 存储搜索选项中客户名称的选择列表
          brandNameOptions: [], // 存储搜索选项中品牌名称的选择列表
          clothesLevelNameOptions: [] // 存储搜索选项中服装层次的选择列表
        }
      },

      tableData: [], // 本页面的计划展示数据

      // pagination存储本页面页码控制的变量
      pagination: {
        currentPage: 1, // 当前页码
        pageSizes: [10, 20, 30, 40, 50], // 页码选项中x条/页的选择项
        pageSize: 10, // 当前页面展示多少条数据
        total: 0 // 后台一共有多少条数据
      },

      selectedData: [], // 页面中多选选中的数据

      subPlanTableData: [] // 点击子计划顺序调整按钮后的弹出的对话框中显示的数据
    };
  },
  created: function() {
    //客户名称下拉框数据加载，接口格式见接口文档
    request
      .get(`${window.$config.HOST}/backstage/client/name`)
      .then(response => {
        // 返回数据存储于this.searchOptions.options.customerNameOptions中
        this.searchOptions.options.customerNameOptions = response.result;
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

    //页面加载默认获取下发的根计划列表数据，接口格式见接口文档
    request
      .get(`${window.$config.HOST}/root-plan/find-assign`, {
        params: {
          planClass: "SERIES",
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        }
      })
      .then(response => {
        this.tableData = response.result; // 返回数据中的result字段是计划数据，存储在tableData字段中
        this.pagination.total = response.total; // 返回数据中的total字段表示当前搜索条件下后太一共有多少条数据，将其存储于this.pagination.total字段
      });

    //获取普通计划的输入建议，接口详情件接口文档
    request.get(`${window.$config.HOST}/plan/name`).then(response => {
      this.inputSuggestions.ordinaryPlans = [];

      /* 
      获取的返回数据存储在this.inputSuggestions.ordinaryPlans中。
      因为el-autocomplete组件中，对应值字段是value，而返回数据中是name字段，所以遍历
      返回数据，将其中的name字段赋值给value字段
      */
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.ordinaryPlans.push(element);
      });
    });

    //获取根计划的输入建议，接口详情件接口文档
    request.get(`${window.$config.HOST}/root-plan/name`).then(response => {
      this.inputSuggestions.rootPlans = [];

      /* 
      获取的返回数据存储在this.inputSuggestions.rootPlans
      因为el-autocomplete组件中，对应值字段是value，而返回数据中是name字段，所以遍历
      返回数据，将其中的name字段赋值给value字段
      */
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.rootPlans.push(element);
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
    searchRootPlanName(queryString, cb) {
      var tmp = this.inputSuggestions.rootPlans;
      var results = queryString
        ? tmp.filter(this.createFilter(queryString))
        : tmp;
      cb(results);
    },

    /* 
    el-autocomplete组件的函数，为普通计划搜索建议赋值
    组件详情：https://element.eleme.cn/#/zh-CN/component/input 
    */
    searchOrdinaryPlanName(queryString, cb) {
      var tmp = this.inputSuggestions.ordinaryPlans;
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

    // 计划类别选择触发，el-radio-group组件对应响应函数。
    planClassTypeChange() {
      this.pagination.currentPage = 1; // 重新赋值当前页面的页码编号
      this.tableData = []; // 清空之前搜索的计划数据
      this.handleSearch(); // 根据搜索条件重新加载当前选择计划类别的数据
    },

    // 计划类别选择，el-switch组件对应响应函数，是根计划/普通计划选项变化时触发
    planTypeSwitchChange() {
      this.pagination.currentPage = 1; // 重新赋值当前页面的页码编号
      this.tableData = []; // 清空之前搜索的计划数据
      this.handleSearch(); // 根据搜索条件重新加载当前选择计划类型的数据
    },

    // el-table组件多选时触发函数
    handleMultipleSelectionChange(val) {
      this.selectedData = val; // 将多选的数据存储于this.selectedData字段中
    },

    // el-table行颜色处理函数，组件详情：https://element.eleme.cn/#/zh-CN/component/table
    tableRowClassName({ row, rowIndex }) {
      // 当row.fromTemplate为真，即该行数据是从模板来时，行颜色设置为oldlace
      if (row.fromTemplate) {
        return "background: oldlace;";
      }
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
      let that = this; // 引用
      console.log("搜索日期：", this.searchOptions.searchParams.dateRange);

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
        clothesLevelName:
          this.searchOptions.searchParams.clothesLevelName === ""
            ? undefined
            : this.searchOptions.searchParams.clothesLevelName,

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
        pageSize: this.pagination.pageSize,

        // 根据定义的字典，赋值当前计划类别对应的英文值
        planClass: this.planClassDict[this.planClassRadioValue]
      };

      console.log("搜索参数：", param);

      // 根据当前页面选择的计划类型（跟计划/普通计划）调用不同的接口，参数是相同的
      if (that.isRootPlan) {
        request
          .get(`${window.$config.HOST}/root-plan/find-assign`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result; // 返回结果的result字段存储赋值给tableData字段
            this.pagination.total = response.total; // 根据返回结果中total字段更新当前搜索条件下后台总共有的数据数
          });
      } else {
        request
          .get(`${window.$config.HOST}/plan/find-assign`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result; // 返回结果的result字段存储赋值给tableData字段
            this.pagination.total = response.total; // 根据返回结果中total字段更新当前搜索条件下后台总共有的数据数
          });
      }
    },

    // 点击添加子计划按钮时的响应函数
    addPlanChild() {
      // 判断是否是只选择了一条数据，如果多选了则提醒
      if (this.selectedData.length === 1) {
        let data = this.selectedData[0]; // 得到选中的行数据

        /*添加子计划将跳转到对应计划的制定的页面，param为页面跳转的参数
          goback: 当前页面的名称。用于在跳转过去的页面中返回当前页面
          isRoot: 当前要制定的计划是否是跟计划,
          isModify: 是否是更新计划,
          isCreate: 是否是添加计划,
          rowData: 计划数据
        */
        var param = {
          goback: "distributedPlanManagement",
          isRoot: this.isRootPlan,
          isModify: false,
          isCreate: true,
          rowData: data
        };
        console.log("路由参数：", param);

        // 路由控制
        this.isCachedPage = false; // 当前页面是否缓存
        // 跳转到目标页面，那么表示目标页面名称。根据planClassRadioValue值，在定义的planClassRouterDestinationDict中映射
        this.$router.push({
          name: this.planClassRouterDestinationDict[this.planClassRadioValue],
          params: param
        });
      } else if (this.selectedData.length === 0) {
        this.$message.error("请选择要添加子计划的计划！");
      } else {
        this.$message.error("仅允许对一条计划添加子计划，请重新选择！");
      }
    },

    // 批量添加子计划按钮点击时的响应函数
    batchAddPlanChild() {
      // 判断是否有选择数据
      if (this.selectedData.length === 0) {
        this.$message.error("请选择一个计划！");
      } else {
        /*
        添加子计划将跳转到对应计划的制定的页面，param为页面跳转的参数
          goback: 当前页面的名称。用于在跳转过去的页面中返回当前页面
          isRoot: 当前要制定的计划是否是跟计划,
          isModify: 是否是更新计划,
          isCreate: 是否是添加计划,
          isBatch: 是否是批量添加数据
          batchData: 批量计划数据列表
        */
        var param = {
          goback: "distributedPlanManagement",
          isRoot: this.isRootPlan,
          isModify: false,
          isCreate: true,
          isBatch: true,
          batchData: this.selectedData
        };

        console.log("新建标签页路由参数：", param);

        // 路由跳转控制
        this.isCachedPage = false; // 当前页面是否缓存
        // 跳转到目标页面，那么表示目标页面名称。根据planClassRadioValue值，在定义的planClassRouterDestinationDict中映射
        this.$router.push({
          name: this.planClassRouterDestinationDict[this.planClassRadioValue],
          params: param
        });
      }
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
        goback: "distributedPlanManagement",
        isRoot: this.isRootPlan,
        isModify: false,
        isCreate: false,
        rowData: row
      };
      console.log("跳转参数：", param);

      this.isCachedPage = true; // 当前页面是否缓存
      // 跳转到目标页面，那么表示目标页面名称。根据planClassRadioValue值，在定义的planClassRouterDestinationDict中映射
      this.$router.push({
        name: this.planClassRouterDestinationDict[this.planClassRadioValue],
        params: param
      });
    },

    //下级计划顺序调整按钮点击时响应函数
    changeSubPlanOrder() {
      // 判断是否只选择了一行数据，否则提示只能选择一条
      if (this.selectedData.length === 1) {
        // 根据选择的行数据的计划id字段搜索该数据的子数据，接口详情看接口文档
        var param = {
          id: this.selectedData[0].id
        };
        request
          .get(`${window.$config.HOST}/root-plan/children`, {
            params: param
          })
          .then(response => {
            this.subPlanTableData = response.result; // 返回结果的result字段存储于subPlanTableData用于在对话框中显示
            // 将返回的子计划数据按照其sequence字段排序
            this.subPlanTableData.sort(function(a, b) {
              return a.sequence - b.sequence;
            });
          });
        //subPlanOrderModificationDialogVisible设置为true，显示子计划顺序调整对话框
        this.subPlanOrderModificationDialogVisible = true;
      } else if (this.selectedData.length === 0) {
        this.$message.error("请选择要调整的计划！");
      } else {
        this.$message.error("仅允许对一条计划调整，请重新选择！");
      }
    },

    // 子计划顺序调整确认按钮
    subPlanOrderConfirm() {
      // 构造/plan/adjust-children接口参数，接口详情见接口文档
      var param = [];
      var len = this.subPlanTableData.length;
      // 遍历得到id新顺序的id和sequence字段
      for (var i = 0; i < len; i++) {
        param.push({
          id: this.subPlanTableData[i].id,
          sequence: i
        });
      }

      // 接口调用
      console.log("子计划上传顺序：", param);
      request
        .put(`${window.$config.HOST}/plan/adjust-children`, param)
        .then(response => {
          this.subPlanOrderModificationDialogVisible = false; // 成功后关闭子计划顺序调整对话框
        });
    },

    //子计划顺序辅助控制函数，组件详情可见：https://element.eleme.cn/#/zh-CN/component/table
    //上移
    moveUp(index, row) {
      var that = this;
      if (index > 0) {
        let upDate = that.subPlanTableData[index - 1];
        that.subPlanTableData.splice(index - 1, 1);
        that.subPlanTableData.splice(index, 0, upDate);
      } else {
        alert("已经是第一条，不可上移");
      }
    },

    //下移
    moveDown(index, row) {
      var that = this;
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
