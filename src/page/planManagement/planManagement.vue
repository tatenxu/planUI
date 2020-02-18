<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="15">
          <div class="bar">
            <div class="title">计划类型</div>
            <el-radio-group v-model="planClassRadioValue">
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
          <el-button type="primary" size="small" @click="lookAllPlan">查看总计划</el-button>
        </el-col>
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
        max-height="400"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px"
        :row-style="tableRowClassName"
      >
        <el-table-column label width="65">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.id"
              v-model="templateRadio"
              @change.native="getTemplateRow(scope.row)"
            >{{scope.$index+1}}</el-radio>
          </template>
        </el-table-column>

        <!-- 三种计划类型都有 -->
        <el-table-column prop="type" label="计划类型" align="center"></el-table-column>
        <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="childPlanNumber" label="子计划数" align="center"></el-table-column>
        <el-table-column prop="clientName" label="客户" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
        <el-table-column prop="clothesLevelName" label="服装层次" align="center"></el-table-column>
        <el-table-column prop="seriesName" label="波段编码" align="center"></el-table-column>

        <!-- 只有款式计划有 -->
        <el-table-column
          v-if="planClassDict[planClassRadioValue]==='STYLE'"
          prop="seriesName"
          label="款号"
          align="center"
        ></el-table-column>

        <!-- 只有系列计划有 -->
        <el-table-column
          v-if="planClassDict[planClassRadioValue]==='SERIES'"
          prop="seriesName"
          label="系列编码"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="planClassDict[planClassRadioValue]==='SERIES'"
          prop="systemCode"
          label="系统编码"
          align="center"
        ></el-table-column>

        <!-- 都有 -->
        <el-table-column prop="systemCode" label="项目类型" align="center"></el-table-column>
        <el-table-column prop="systemCode" label="订单阶段" align="center"></el-table-column>

        <!-- 只有系列计划有 -->
        <el-table-column
          v-if="planClassDict[planClassRadioValue]==='SERIES'"
          prop="systemCode"
          label="预测款数"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="planClassDict[planClassRadioValue]==='SERIES'"
          prop="systemCode"
          label="预测件数"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="planClassDict[planClassRadioValue]==='SERIES'"
          prop="systemCode"
          label="非正式款数"
          align="center"
          width="100"
        ></el-table-column>
        <el-table-column
          v-if="planClassDict[planClassRadioValue]==='SERIES'"
          prop="systemCode"
          label="非正式件数"
          align="center"
          width="100"
        ></el-table-column>

        <!-- 款式和款式组有 -->
        <el-table-column
          v-if="planClassDict[planClassRadioValue]!='SERIES'"
          prop="systemCode"
          label="正式款数"
          align="center"
        ></el-table-column>
        <el-table-column
          v-if="planClassDict[planClassRadioValue]!='SERIES'"
          prop="systemCode"
          label="正式件数"
          align="center"
        ></el-table-column>

        <!-- 都有 -->
        <el-table-column prop="systemCode" label="投入点" align="center"></el-table-column>
        <el-table-column prop="systemCode" label="计划开始" align="center"></el-table-column>
        <el-table-column prop="systemCode" label="计划结束" align="center"></el-table-column>

        <el-table-column prop="state" label="状态" align="center">
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
        </el-table-column>
        <el-table-column label="异常状态" align="center">
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
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
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
        </el-table-column>
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

    <el-dialog title="查看总计划" :visible.sync="lookAllPlans" :modal="false">
      <div class="body">
        <el-tree :data="allPlans" :props="defaultProps"></el-tree>
      </div>
    </el-dialog>

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
import GanttExtension from "@/utils/ganttExtension";
import request from "@/utils/request";

export default {
  name: "planManagement",
  components: {
    GanttExtension
  },

  data() {
    return {
      currentUserId: null,
      templateRadio: null,
      lookAllPlans: false,
      allPlans: [],

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

      inputSuggestions: {
        plans: [],
        series: []
      },

      defaultProps: {
        children: "children",
        label: "name"
      },
      isSubmitPlan: false,
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

      addExceptionDialogVisible: false,
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
      addExceptionOptions: { exceptionTypeOptions: [] }
    };
  },
  created: function() {
    console.log("进入计划管理页面");
    //获取账户信息
    request.get(`/me`).then(response => {
      this.currentUserId = response.result.id;
    });

    //客户名称加载
    request
      .get(`${window.$config.HOST}/backstage/client/name`)
      .then(response => {
        this.searchOptions.options.customerNameOptions = response.result;
      });

    //品牌名称跟随加载
    request
      .get(`${window.$config.HOST}/backstage/brand/name`)
      .then(response => {
        this.searchOptions.options.brandNameOptions = response.result;
      });

    //服装层级加载
    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "服装层次"
        }
      })
      .then(response => {
        this.searchOptions.options.clothesLevelNameOptions = response.result;
      });
    //异常类型选项
    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "异常类型"
        }
      })
      .then(response => {
        this.addExceptionOptions.exceptionTypeOptions = response.result;
      });

    //默认获取已提交/未提交计划列表
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

    //输入建议
    request.get(`${window.$config.HOST}/plan/name`).then(response => {
      this.inputSuggestions.plans = [];
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.plans.push(element);
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
    //输入建议
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
        .get(`${window.$config.HOST}/backstage/brand/name`, {
          params: { clientId: this.searchOptions.searchParams.clientName }
        })
        .then(response => {
          this.searchOptions.options.brandNameOptions = response.result;
        });
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
    getTemplateRow(row) {
      this.templateRadio = row.id;
      this.selectedData = [];
      this.selectedData.push(row);
      console.log(this.selectedData);
    },
    //行颜色
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

        return y + "-" + m + "-" + d;
      }
    },
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
    //搜索按钮
    handleSearch() {
      // console.log(this.searchOptions.searchParams.dateRange);
      var param = {
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
        planClass: this.planClassDict[this.planClassRadioValue],
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      };
      if (this.isSubmitPlan) {
        param.state = "SUBMIT";
        console.log("搜索参数：", param);

        request
          .get(`${window.$config.HOST}/plan/find`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result;
            this.pagination.total = response.total;
          });
      } else {
        console.log("搜索参数：", param);
        param.state = "MAKE";

        request
          .get(`${window.$config.HOST}/plan/find`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result;
            this.pagination.total = response.total;
          });
      }
    },
    planTypeSwitchChange() {
      this.pagination.currentPage = 1;
      this.tableData = [];
      this.handleSearch();
    },
    //查看总计划
    lookAllPlan() {
      if (this.selectedData.length != 1) {
        this.$message({
          message: "请选择一项！",
          type: "warning"
        });
        return;
      }
      let list = {
        id: this.selectedData[0].id
      };

      request
        .get(`${window.$config.HOST}/plan/tree`, {
          params: list
        })
        .then(response => {
          this.allPlans = [];
          this.allPlans.push(response.result);

          this.selectedData = [];
          this.lookAllPlans = true;
        });
    },
    //查看异常--跳转
    toSearchException(row) {
      console.log("查看异常" + row.name);

      this.$router.push({
        name: "planExceptionManagement",
        params: row
      });
    },

    //单删除计划
    deleteOnePlan(planid) {
      console.log("删除： " + planid);
      request
        .delete(`${window.$config.HOST}/plan/delete`, {
          params: { id: planid }
        })
        .then(response => {
          this.handleSearch();
        });
    },
    //删除计划
    deletePlan() {
      if (this.selectedData.length === 0) {
        this.$message.error("请选择要删除的计划！");
      } else {
        this.selectedData.forEach(element => {
          this.deleteOnePlan(element.id);
          this.selectedData = [];
        });
      }
    },
    //提交计划
    submitPlan(row) {
      //行提交
      request
        .put(`${window.$config.HOST}/plan/submit`, null, {
          params: { id: row.id }
        })
        .then(response => {
          this.handleSearch();
        });
    },

    //查看计划详情--跳转
    getPlanDetail(row) {
      var param = {
        goback: "planManagement",
        isRoot: false,
        isModify: false,
        isCreate: false,
        rowData: row
      };
      console.log("跳转参数：", param);

      this.$router.push({
        name: this.planClassRouterDestinationDict[this.planClassRadioValue],
        params: param
      });
    },
    //修改计划详情--跳转
    ModifyPlanDetail(row) {
      var param = {
        goback: "planManagement",
        isRoot: false,
        isModify: true,
        isCreate: false,
        rowData: row
      };
      console.log("跳转参数：", param);

      this.$router.push({
        name: this.planClassRouterDestinationDict[this.planClassRadioValue],
        params: param
      });
    },

    // 添加异常操作
    addException() {
      if (this.selectedData.length === 0) {
        this.$message.error("请选择要添加异常的计划！");
      } else {
        this.addExceptionRuleForm.planId = this.selectedData[0].id;
        this.addExceptionDialogVisible = true;
      }
    },
    confirmAddException() {
      this.addExceptionRuleForm.time =
        this.addExceptionRuleForm.time === ""
          ? ""
          : this.changeTime(this.addExceptionRuleForm.time);

      console.log("添加异常参数：", this.addExceptionRuleForm);

      request
        .post(
          `${window.$config.HOST}/plan-exception/insert`,
          this.addExceptionRuleForm
        )
        .then(response => {
          this.addExceptionRuleForm = {};
          this.handleSearch();
          this.addExceptionDialogVisible = false;
        });
    },
    cancelAddException() {
      this.addExceptionRuleForm = [];
      this.addExceptionDialogVisible = false;
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
