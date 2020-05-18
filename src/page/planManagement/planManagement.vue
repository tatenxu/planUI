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
        <el-col :span="6">
          <el-switch
            v-model="isSubmitPlan"
            @change="planTypeSwitchChange"
            inactive-color="#13ce66"
            active-text="提交的计划"
            inactive-text="未提交计划"
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
              :fetch-suggestions="searchPlanName "
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

        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-button type="primary" size="small" @click="addException">添加异常</el-button>
        </el-col>
        <el-col :span="3">
          <GanttExtension :selectedTableData="selectedData" :isRootPlan="false"></GanttExtension>
        </el-col>
      </el-row>
      <el-table
        border
        :data="tableData"
        max-height="800"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px"
        :row-style="tableRowClassName"
      >
        <af-table-column label width="65">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.id"
              v-model="selectedDataID"
              @change.native="getTemplateRow(scope.row)"
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
          width="100"
        ></af-table-column>
        <af-table-column
          v-if="planClassDict[planClassRadioValue]==='SERIES'"
          prop="informalPieceQuantity"
          label="非正式件数"
          align="center"
          width="100"
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

        <af-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.state==='被驳回'"
              placement="top-start"
              title="驳回理由"
              trigger="hover"
              :content="scope.row.rejectReason"
            >
              <p slot="reference">被驳回</p>
            </el-popover>
            <p v-else-if="scope.row.state==='已制定'">已制定</p>
            <p v-else-if="scope.row.state==='已审核'">已审核</p>
            <p v-else-if="scope.row.state==='已下发'">已下发</p>
            <p v-else-if="scope.row.state==='已提交'">已提交</p>
            <p v-else-if="scope.row.state==='已删除'">已删除</p>
            <p v-else>其他</p>
          </template>
        </af-table-column>

        <af-table-column label="异常状态" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="toSearchException(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.haveException"
              style="background:red;"
            >有异常，查看</el-button>
            <p v-else>无异常</p>
          </template>
        </af-table-column>
        <af-table-column fixed="right" label="操作" width="200px" align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="getPlanDetail(scope.row)" type="text" size="small">查看</el-button>
            <el-button
              v-if="!isSubmitPlan && 
                (scope.row.state === '已制定' || scope.row.state === '被驳回') 
                && (scope.row.creatorId === currentUserId || scope.row.creatorId === 0) "
              @click.native.prevent="ModifyPlanDetail(scope.row)"
              type="text"
              size="small"
            >修改</el-button>
            <el-button
              v-if="!isSubmitPlan && 
                (scope.row.state === '已制定' || scope.row.state === '被驳回') 
                && (scope.row.creatorId === currentUserId || scope.row.creatorId === 0) "
              @click.native.prevent="deleteOnePlan(scope.row.id)"
              type="text"
              size="small"
            >删除</el-button>
            <el-button
              v-if="!isSubmitPlan && 
                (scope.row.state === '已制定' || scope.row.state === '被驳回') 
                && (scope.row.creatorId === currentUserId || scope.row.creatorId === 0) "
              @click.native.prevent="submitPlan(scope.row)"
              type="text"
              size="small"
            >提交</el-button>
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

    <!-- 弹出框-添加异常 -->
    <el-dialog
      :modal="false"
      title="添加异常"
      style="min-width:1200px"
      :visible.sync="addExceptionDialogVisible"
    >
      <el-form
        :model="addExceptionRuleForm"
        :rules="addExceptionRules"
        ref="addExceptionRuleForm"
        label-width="100px"
      >
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="发现人" prop="discover" placeholder="请输入内容">
              <el-input v-model="addExceptionRuleForm.discover" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="异常类型" prop="type" placeholder="请输入内容">
              <el-select v-model="addExceptionRuleForm.type" clearable>
                <el-option
                  v-for="item in addExceptionOptions.exceptionTypeOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人" prop="principal" placeholder="请输入内容">
              <el-input v-model="addExceptionRuleForm.principal" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="影响范围" prop="scope" placeholder="请输入内容">
              <el-input v-model="addExceptionRuleForm.scope" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="state" placeholder="请输入内容">
              <el-input v-model="addExceptionRuleForm.state" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地点" prop="place" placeholder="请输入内容">
              <el-input v-model="addExceptionRuleForm.place" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="时间" prop="time" placeholder="请输入内容">
              <el-date-picker
                v-model="addExceptionRuleForm.time"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="24">
            <el-form-item label="内容" prop="content" placeholder="请输入内容">
              <el-input type="textarea" v-model="addExceptionRuleForm.content" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处理建议" prop="handleOption" placeholder="请输入内容">
              <el-input
                type="textarea"
                v-model="addExceptionRuleForm.handleOption"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处理结果" prop="handleResult" placeholder="请输入内容">
              <el-input
                type="textarea"
                v-model="addExceptionRuleForm.handleResult"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="3" :offset="10">
            <el-button type="primary" @click="confirmAddException('addExceptionRuleForm')">保存</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" @click="cancelAddException()">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// 导入自定义的甘特图插件用于展示计划的甘特图
import GanttExtension from "@/utils/ganttExtension";
// 导入封装的自定义的axios插件用于http请求
import request from "@/utils/request";

export default {
  name: "planManagement", // 此页面的component名称
  components: {
    GanttExtension
  },

  // 此页面需要用到的数据定义
  data() {
    return {
      currentUserId: null, // 保存当前操作这个页面用户的ID
      selectedDataID: null, // 表格中被选中计划的ID

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

      // 输入建议，包含计划名称输入建议，系列名称输入建议
      inputSuggestions: {
        plans: [],
        series: []
      },

      isSubmitPlan: false, // el-switch值变量，存储当前页面查看的是未提交/提交的计划

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

      // 页码控制相关变量
      pagination: {
        currentPage: 1, // 当前页码
        pageSizes: [10, 20, 30, 40, 50], // 页码选项中x条/页的选择项
        pageSize: 10, // 当前页面展示多少条数据
        total: 0 // 后台一共有多少条数据
      },

      tableData: [], // 页面展示的已提交计划信息
      selectedData: [], // 页面中多选选中的数据

      // 以下为添加异常相关的操作变量
      addExceptionDialogVisible: false, // 控制添加异常对话框el-dialog是否显示
      // 添加异常对话框中表单元素的类型检查规则
      addExceptionRules: {
        content: [{ required: false, message: "请输入", trigger: "change" }],
        discover: [{ required: false, message: "请输入", trigger: "change" }],
        place: [{ required: false, message: "请输入", trigger: "change" }],
        principal: [{ required: false, message: "请输入", trigger: "change" }],
        scope: [{ required: false, message: "请输入", trigger: "change" }],
        state: [{ required: false, message: "请输入", trigger: "change" }],
        time: [{ required: false, message: "请输入", trigger: "change" }],
        type: [{ required: false, message: "请输入", trigger: "change" }],
        handleOption: [
          { required: false, message: "请输入", trigger: "change" }
        ],
        handleResult: [
          { required: false, message: "请输入", trigger: "change" }
        ],
        discover: [{ required: false, message: "请输入", trigger: "change" }]
      },
      // 添加异常对话框中表单元素变量
      addExceptionRuleForm: {
        content: "",
        discover: "",
        handleOption: "",
        handleResult: "",
        place: "",
        planId: 0,
        principal: "",
        scope: "",
        state: "",
        time: "",
        type: ""
      },
      // 添加异常对话框中异常类型下拉框的选项
      addExceptionOptions: { exceptionTypeOptions: [] }
    };
  },

  created: function() {
    console.log("进入计划管理页面");
    //获取当前账户信息，接口详情看接口文档
    request.get(`/me`).then(response => {
      this.currentUserId = response.result.id;
    });

    //客户名称下拉框数据加载，接口格式见接口文档
    request
      .get(`${window.$config.HOST}/backstage/client/name`)
      .then(response => {
        // 返回数据存储于this.searchOptions.options.clientNameOptions
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

    //异常类型选项下拉框加载，接口格式见接口文档
    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "异常类型"
        }
      })
      .then(response => {
        // 返回数据存储于this.addExceptionOptions.exceptionTypeOptions
        this.addExceptionOptions.exceptionTypeOptions = response.result;
      });

    // 默认获取已提交/未提交计划列表数据，返回数据存储于this.tableData中，接口详情见接口文档
    if (this.isSubmitPlan) {
      request
        .get(`${window.$config.HOST}/plan/find`, {
          params: {
            planClass: this.planClassDict[this.planClassRadioValue],
            pageNum: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            state: "SUBMIT"
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
        });
    } else {
      request
        .get(`${window.$config.HOST}/plan/find`, {
          params: {
            planClass: this.planClassDict[this.planClassRadioValue],
            pageNum: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            state: "MAKE"
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
        });
    }

    //获取普通计划的输入建议，接口详情件接口文档
    request.get(`${window.$config.HOST}/plan/name`).then(response => {
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

    // 表格选择,el-radio触发函数
    getTemplateRow(row) {
      this.selectedDataID = row.id; // 获取选择计划的ID
      this.selectedData = []; // 清空数据
      this.selectedData.push(row); // 押入新选择的数据
    },

    // el-table行颜色处理函数，组件详情：https://element.eleme.cn/#/zh-CN/component/table
    tableRowClassName({ row, rowIndex }) {
      // 当row.fromTemplate为真，即该行数据是从模板来时，行颜色设置为oldlace
      if (row.fromTemplate) {
        return "background: oldlace;";
      }
    },

    // 计划类别选择触发，el-radio-group组件对应响应函数。
    planClassTypeChange() {
      this.pagination.currentPage = 1; // 重新赋值当前页面的页码编号
      this.tableData = []; // 清空之前搜索的计划数据
      this.handleSearch(); // 根据搜索条件重新加载当前选择计划类别的数据
    },

    // 计划类别选择，el-switch组件对应响应函数，是提交/未提交计划选项变化时触发
    planTypeSwitchChange() {
      this.pagination.currentPage = 1; // 重新赋值当前页面的页码编号
      this.tableData = []; // 清空之前搜索的计划数据
      this.handleSearch(); // 根据搜索条件重新加载当前选择计划类型的数据
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

    // 辅助函数：将js date对象转变为字符串对象
    changeTime(time) {
      if (!time) {
        return undefined;
      } else {
        console.log(time);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = time.getDate();
        d = d < 10 ? "0" + d : d;
        var h = time.getHours();
        h = h < 10 ? "0" + h : h;
        var minute = time.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = time.getSeconds();
        second = second < 10 ? "0" + second : second;
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
        rangeId:
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
        seriesName:
          this.searchOptions.searchParams.seriesName === ""
            ? undefined
            : this.searchOptions.searchParams.seriesName,

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

      // 根据this.isSubmitPlan，提交/未提交的计划调用不同的接口，接口详情见接口文档
      if (this.isSubmitPlan) {
        param.state = "SUBMIT"; // 利用param.state = "SUBMIT"来获取已提交计划

        request
          .get(`${window.$config.HOST}/plan/find`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result; // 返回结果的result字段存储赋值给tableData字段
            this.pagination.total = response.total; // 根据返回结果中total字段更新当前搜索条件下后台总共有的数据数
          });
      } else {
        console.log("搜索参数：", param);
        param.state = "MAKE"; // 利用param.state = "MAKE"来获取制定中计划

        request
          .get(`${window.$config.HOST}/plan/find`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result; // 返回结果的result字段存储赋值给tableData字段
            this.pagination.total = response.total; // 根据返回结果中total字段更新当前搜索条件下后台总共有的数据数
          });
      }
    },

    //查看异常按钮点击响应函数，跳转到异常查看页面
    toSearchException(row) {
      console.log("查看异常" + row.name);

      this.$router.push({
        name: "planExceptionManagement", // 跳转目的地
        params: row // 跳转参数，就是这行计划的详情
      });
    },

    //行计划操作中删除按钮响应函数
    deleteOnePlan(planid) {
      // console.log("删除： " + planid);
      // 接口详情参阅接口文档
      request
        .delete(`${window.$config.HOST}/plan/delete`, {
          params: { id: planid }
        })
        .then(response => {
          this.handleSearch(); // 删除成功后根据搜索条件重新加载页面
        });
    },

    //行计划操作中提交按钮响应函数
    submitPlan(row) {
      // 接口详情参阅接口文档
      request
        .put(`${window.$config.HOST}/plan/submit`, null, {
          params: { id: row.id }
        })
        .then(response => {
          this.handleSearch(); // 提交成功后根据搜索条件重新加载页面
        });
    },

    //行计划操作中产看按钮响应函数
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
        goback: "planManagement",
        isRoot: false,
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

    //行计划操作中修改按钮响应函数
    ModifyPlanDetail(row) {
      /*
      跳转到对应计划的修改的页面，param为页面跳转的参数
          goback: 当前页面的名称。用于在跳转过去的页面中返回当前页面
          isRoot: 当前要制定的计划是否是跟计划,
          isModify: 是否是更新计划,
          isCreate: 是否是添加计划,
          rowData: 计划数据
        */
      var param = {
        goback: "planManagement",
        isRoot: false,
        isModify: true,
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

    // 添加异常按钮响应函数
    addException() {
      // 判断是否只选择了一条计划，否则提示
      if (this.selectedData.length === 0) {
        this.$message.error("请选择要添加异常的计划！");
      } else {
        this.addExceptionRuleForm.planId = this.selectedData[0].id; // 获取目标计划的id
        this.addExceptionDialogVisible = true; // 显示添加异常对话框
      }
    },

    // 添加异常对话框的保存按钮响应函数
    confirmAddException() {
      // 获取添加异常时间，非空时进行js date --> string的转换
      this.addExceptionRuleForm.time =
        this.addExceptionRuleForm.time === ""
          ? ""
          : this.changeTime(this.addExceptionRuleForm.time);

      console.log("添加异常参数：", this.addExceptionRuleForm);

      // /plan-exception/insert接口添加异常，接口详情参阅接口文档
      request
        .post(
          `${window.$config.HOST}/plan-exception/insert`,
          this.addExceptionRuleForm
        )
        .then(response => {
          this.addExceptionRuleForm = {}; // 添加成功后清空添加异常表单
          this.handleSearch(); // 根据搜索田间冲洗加载页面的数据
          this.addExceptionDialogVisible = false; // 关闭添加异常对话框
        });
    },

    // 添加异常对话框中取消按钮响应函数
    cancelAddException() {
      this.addExceptionRuleForm = []; // 清空添加异常表单
      this.addExceptionDialogVisible = false; //关闭添加异常对话框
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
      to.name === "planMakeOfStyleGroup" ||
      to.name === "planExceptionManagement"
    ) {
      this.keepAlives = ["planManagement"];
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
