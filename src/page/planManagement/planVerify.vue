<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="15">
          <div class="bar">
            <div class="title">计划类型</div>
            <el-radio-group v-model="planClassRadioValue" @change="planClassRadioValueChanged()">
              <el-radio-button label="系列计划"></el-radio-button>
              <el-radio-button label="款式计划"></el-radio-button>
              <el-radio-button label="款式组计划"></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="8">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="clientId" clearable @change="searchClientChanged" style="width:350px">
              <el-option v-for="item in clientIdOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="brandId" clearable style="width:350px">
              <el-option v-for="item in brandIdOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar" style="margin-top:10px">

            <el-radio-group v-model="checkedTwo" @change="changeState">
              <el-radio :label="1">已提交</el-radio>
              <el-radio :label="2">已审核</el-radio>
              <el-radio :label="3">已下发</el-radio>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 25px; margin-bottom: 5px;">
        <el-col :span="8">
          <div class="bar">
            <div class="title">新建时间</div>
            <el-date-picker v-model="dataRange" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-autocomplete class="inline-input" v-model="rangeId" :fetch-suggestions="querySearchSeries" placeholder="请输入系列名称" @select="handleSelect" style="width:350px" clearable></el-autocomplete>
          </div>
        </el-col>

        <el-col :offset="0" :span="2">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="getWareList(1)">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 5px;">
        <el-col :span="2">
          <div class="bar">
            <el-button type="primary" size="small" style="margin-right: 20px" @click="VerifyPass" v-if="checkedTwo===1">审核通过</el-button>
          </div>
        </el-col>
        <el-col :offset="1" :span="2">
          <div class="bar">
            <el-button type="primary" size="small" style="margin-right: 20px" @click="VerifyRebut" v-if="checkedTwo===1">审核驳回</el-button>
          </div>
        </el-col>
        <el-col :offset="1" :span="2">
          <div class="bar">
            <el-button type="primary" size="small" style="margin-right: 20px" @click="CancelVerify" v-if="checkedTwo===2">取消审核</el-button>
          </div>
        </el-col>
        <el-col :offset="1" :span="2">
          <div class="bar">
            <el-button type="primary" size="small" style="margin-right: 20px" @click="negotiatePanelOpen" v-if="checkedTwo===2">协商延迟</el-button>
          </div>
        </el-col>
        <el-col :offset="1" :span="2">
          <div class="bar">
            <el-button type="primary" size="small" style="margin-right: 20px" @click="updateExecutePanelOpen" v-if="checkedTwo===2">执行状态更新</el-button>
          </div>
        </el-col>
        <el-col :span="3" style="margin-left:100px">
          <GanttExtension :selectedTableData="AnyChanged" :isRootPlan="false"></GanttExtension>
        </el-col>
      </el-row>
      <br />
      <hr />
      <br />
      <div>
        <el-table :data="tableData" max-height="400" border @selection-change="isChanged" :stripe="true" :highlight-current-row="true" style="width: 100%; margin-top: 20px">
          <af-table-column type="selection" width="50" align="center"></af-table-column>
          <af-table-column width="50" type="index" label="序号"></af-table-column>
          <af-table-column prop="name" label="根计划名称" align="center"></af-table-column>
          <af-table-column prop="clientName" label="客户" align="center"></af-table-column>
          <af-table-column prop="brandName" label="品牌" align="center"></af-table-column>
          <af-table-column prop="clothesLevelName" label="服装层次" align="center"></af-table-column>
          <af-table-column prop="rangeCode" label="波段编码" align="center"></af-table-column>
          <af-table-column prop="styleNumber" label="款号" align="center" v-if="checked===3"></af-table-column>
          <af-table-column prop="styleGroupName" label="款式组名称" align="center" v-if="checked===2"></af-table-column>
          <af-table-column prop="seriesCode" label="系列编码" align="center" v-if="checked===1"></af-table-column>
          <af-table-column prop="systemCode" label="系统编码" align="center" v-if="checked===1"></af-table-column>
          <af-table-column prop="projectType" label="项目类型" align="center"></af-table-column>
          <af-table-column prop="orderStage" label="订单阶段" align="center"></af-table-column>
          <af-table-column prop="predictStyleQuantity" label="预测款数" align="center" v-if="checked===1"></af-table-column>
          <af-table-column prop="predictPieceQuantity" label="预测件数" align="center" v-if="checked===1"></af-table-column>
          <af-table-column prop="informalStyleQuantity" label="非正式款数" align="center" v-if="checked===1"></af-table-column>
          <af-table-column prop="informalPieceQuantity" label="非正式件数" align="center" v-if="checked===1"></af-table-column>
          <af-table-column prop="styleQuantity" label="正式款数" align="center"></af-table-column>
          <af-table-column prop="pieceQuantity" label="正式件数" align="center"></af-table-column>
          <af-table-column prop="inputPoint" label="投入点" align="center"></af-table-column>
          <af-table-column prop="startDate" label="开始时间" align="center"></af-table-column>
          <af-table-column prop="endDate" label="结束时间" align="center"></af-table-column>
          <af-table-column fixed="right" width="100" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="searchDetails(scope.row)">查看详情</el-button>
            </template>
          </af-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
        </div>
      </div>
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
      <el-dialog title="驳回理由" :visible.sync="GoBack" :modal="false">
        <div class="body">
          <el-row :gutter="20">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="GoBackReason"></el-input>
          </el-row>
          <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 5px;">
            <el-col :span="2">
              <div class="bar">
                <el-button type="primary" style="margin-right: 20px" @click="GoBackConfirm">确认</el-button>
              </div>
            </el-col>
            <el-col :offset="1" :span="2">
              <div class="bar">
                <el-button type="primary" style="margin-right: 20px" @click="GoBackCancel">取消</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
      <el-dialog :modal="false" title="协商延迟" width="1200px" :visible.sync="negotiatePanelFlag">
        <el-form :model="negotiateForm" :rules="negotiateFormRule" ref="negotiateForm" label-width="120px" class="demo-ruleForm">
          <el-row :gutter="20" style="margin-top:5px;">
            <el-col :span="8">
              <el-form-item label="协商延迟时间" prop="extension" placeholder="请选择客户名称">
                <el-date-picker v-model="negotiateForm.extension" type="date" placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <div class="bar">
                <el-form-item label="实际起止时间" prop="actualDate" placeholder="请选择起止时间">
                  <el-date-picker :picker-options="pickerOptions0" style="margin-left:20px" v-model="negotiateForm.actualDate" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:5px;">
            <el-col :span="8">
              <el-button type="primary" size="small" @click="negotiate()" style="margin-left:500px;margin-top:3px">协商延迟</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <el-dialog :modal="false" title="执行状态" width="900px" :visible.sync="updateExecuteFlag">
        <el-form :model="updateExecuteForm" :rules="updateExecuteRule" ref="updateExecuteForm" label-width="120px" class="demo-ruleForm">
          <el-row :gutter="20" style="margin-top:5px;">
            <el-col :span="8">
              <el-form-item label="执行状态" prop="executionState" placeholder="请选择客户名称">
                <el-input v-model="updateExecuteForm.executionState" clearable :rows="1" style="margin-left: 20px;min-width:250px" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2">
              <el-button type="primary" size="small" @click="updateExecute()" style="margin-left:150px;margin-top:3px">确定更新状态</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>

      <el-dialog title="查看总计划" :visible.sync="lookAllPlans" :modal="false">
        <div class="body">
          <el-tree :data="allPlans" :highlight-current="true" :props="defaultProps"></el-tree>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// 导入封装的自定义的axios插件用于http请求
import request from "@/utils/request";
// 导入自定义的甘特图插件用于展示计划的甘特图
import GanttExtension from "@/utils/ganttExtension";
const cityOptions = ["已制定", "未制定", "制定中"];
export default {
  name: "planVerify",  // 此页面的component名称
  components: {
    GanttExtension    // 导入
  },
  data() {
    return {
      //日期选择框的可选日期控制，功能是：只能选择今天及今天之后的日期
      pickerOptions0: {
        disabledDate: time => {
          var date = new Date();

          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      //执行状态参数
      updateExecuteFlag: false,  //执行状态弹出框控制标签
      updateExecuteForm: {
        executionState: "",   //执行状态输入框数据
      },
      //执行状态必填、非必填控制
      updateExecuteRule: {
        executionState: [
          { required: true, message: "请输入执行状态！", trigger: "change" }
        ]
      },
      //协商延迟参数
      negotiatePanelFlag: false,  //协商延迟弹出框控制标签
      negotiateForm: {
        extension: "",     //延迟时间
        actualDate: "",   //实际日期
      },
      negotiateFormRule: {
        extension: [  //协商延迟有效性控制
          {
            required: true,   //有控制需求
            trigger: "change",
            validator: (rule, value, callback) => {
              //两者必须填一个
              if ((value != "" && value != null) || (this.negotiateForm.actualDate != null && this.negotiateForm.actualDate != "")) {
                callback();
              } else {
                callback(new Error("请至少选择一项填写！"));
              }
            }
          }
        ],
        actualDate: [    //实际日期有效性控制
          {
            required: true, //有控制需求
            trigger: "change",
            validator: (rule, value, callback) => {
              //两者必须填一个
              if ((value != null && value != "") || (this.negotiateForm.extension != "" && this.negotiateForm.extension != null)) {
                callback();
              } else {
                callback(new Error("请至少选择一项填写！"));
              }
            }
          }
        ],
      },
      lookAllPlans: false,  //查看总计划弹窗控制标签
      allPlans: [],  //查看总计划部分数据
      /* 
        planClassRadioValue是el-radio-group组件选择计划类型变化时存储的值，
        页面打开时，默认选择了系列计划
      */
      planClassRadioValue: "系列计划",
      /* 
        用于映射系列计划-款式计划-款式组计划，目前对应关系：
        系列：1 
        款式组：2
        款式：3
      */
      checked: 1,
      /* 
        用于映射已提交-已审核-已下发，目前对应关系：
        已提交：1 
        已审核：2
        已下发：3
      */
      checkedTwo: 1,
      //系列输入提醒的数据存储
      nameSuggestionsSeries: [],
      //数据映射
      defaultProps: {
        children: "children",
        label: "name"  //用name代替组件的label
      },

      // pagination存储本页面页码控制的变量
      pagination: {
        currentPage: 1, // 当前页码
        pageSizes: [10, 20, 30, 40, 50], // 页码选项中x条/页的选择项
        pageSize: 10, // 当前页面展示多少条数据
        total: 0 // 后台一共有多少条数据
      },

      tableData: [], //主页面表格数据
      GoBack: false,  //驳回弹窗控制标签
      GoBackReason: "",  //驳回理由数据

      //搜索部分数据
      clientId: "",   //客户ID  
      brandId: "",    //品牌ID
      rangeId: "",    //系列ID
      dataRange: "",   //新建时间

      clientIdOptions: [],  //客户名称下拉框数据
      brandIdOptions: [],  //品牌名称下拉框数据
      AnyChanged: []  //列表选中数据存储
    };
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
    if (to.name === "planMakeOfSeries" ||
      to.name === "planMakeOfStyle" ||
      to.name === "planMakeOfStyleGroup" ||
      to.name === "bePlanModelEdit") {
      this.keepAlives = ["planVerify"];
    } else {
      this.keepAlives = [];
    }
    next();
  },
  created: function () {
    var that = this;
    //获取系列名称输入提醒全部数据
    request.get(`/info/series/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestionsSeries.push({
          value: element.name
        });
      });
    });

    //获得品牌下拉框数据
    request
      .get(`/backstage/brand/name`, {
        clientId: undefined
      })
      .then(response => {
        this.brandIdOptions = response.result;
      });
    //获得客户名称下拉框数据
    request.get(`/backstage/client/name`).then(response => {
      this.clientIdOptions = response.result;
    });

    //获得初始页面表格数据
    request
      .get(`/plan/find`, {
        params: {
          pageNum: 1,
          pageSize: 10,
          state: "SUBMIT",   //初始页面状态默认为已提交
          planClass: "SERIES"   //初始页面计划类型默认为系列计划
        }
      })
      .then(response => {
        this.pagination.total = response.total;  //搜索到的数据总数
        this.tableData = response.result;        //表格数据赋值
      });
  },
  methods: {
    //执行状态更新
    updateExecutePanelOpen() {
      if (this.AnyChanged.length != 1) {  // 当且仅当只选择一条计划的时候，可以进行该操作
        this.$message({
          message: "请选择单条计划进行执行状态更新！",
          type: "error"
        });
        return;
      }
      this.updateExecuteFlag = true;  //唤出执行状态更新的弹出框
      this.updateExecuteForm.executionState = "";  //清空弹出框数据
    },
    //在执行状态弹出框内点击确认
    updateExecute() {
      this.$refs["updateExecuteForm"].validate(valid => {   //判断是否必填控制认证通过
        if (valid) {
          this.AnyChanged.forEach(element => {
            request
              .put("/plan/update-execute", null, {
                params:
                {
                  id: this.AnyChanged[0].id,    //为计划ID
                  executionState: this.updateExecuteForm.executionState   //为弹出框输入的执行状态
                }
              })
              .then(response => {
                this.updateExecuteFlag = false;  //关闭弹出框
                this.getWareList(this.pagination.currentPage);  //重新获取该页表格数据
              });
          });

        } else {
          this.$message({
            message: "请填写所有必填项!",
            type: "error"
          });
        }
      });
    },
    //协商延迟弹出框唤出
    negotiatePanelOpen() {
      if (this.AnyChanged.length != 1) {  //判断是否只选择了一条数据
        this.$message({
          message: "请选择单条计划进行协商延迟！",
          type: "error"
        });
        return;
      }
      this.negotiatePanelFlag = true;  //打开弹出框
      this.negotiateForm.extension = "";  //清空弹出框数据
      this.negotiateForm.actualDate = ""; //清空弹出框数据
    },
    //协商延迟弹出框确认按钮点击
    negotiate() {
      this.$refs["negotiateForm"].validate(valid => {  //判断输入有效性
        if (valid) {
          this.AnyChanged.forEach(element => {
            request
              .put("/plan/negotiate", {
                id: element.id,
                extension: (this.negotiateForm.extension === null || this.negotiateForm.extension === "") ? undefined : this.changeDate(this.negotiateForm.extension),
                actualEndDate: (this.negotiateForm.actualDate === null || this.negotiateForm.actualDate === "") ? undefined : this.changeDate(this.negotiateForm.actualDate[1]),
                actualStartDate: (this.negotiateForm.actualDate === null || this.negotiateForm.actualDate === "") ? undefined : this.changeDate(this.negotiateForm.actualDate[0])
              })
              .then(response => {
                this.negotiatePanelFlag = false;  //关闭弹出框
                this.getWareList(this.pagination.currentPage);  //刷新页面
              });
          });

        } else {
          this.$message({
            message: "请填写所有必填项!",
            type: "error"
          });
        }
      });
    },
    //计划类型发生变化，重新获取页面表格数据，并相应修改checked标记
    planClassRadioValueChanged() {
      if (this.planClassRadioValue === "系列计划") {
        this.checked = 1;
      } else if (this.planClassRadioValue === "款式组计划") {
        this.checked = 2;

      } else {
        this.checked = 3;
      }
      this.getWareList(1);
    },
    //系列名称搜索的输入建议
    querySearchSeries(queryString, cb) {
      var nameSuggestions = this.nameSuggestionsSeries;
      var results = queryString
        ? nameSuggestions.filter(this.createFilter(queryString))
        : nameSuggestions;
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    //当搜索框的客户名称改变的时候重新获取品牌下拉框数据，并清空已选品牌
    searchClientChanged() {
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: this.clientId === "" ? undefined : this.clientId
          }
        })
        .then(response => {
          this.brandIdOptions = response.result;
          this.brandId = 1;
          this.brandId = "";
        });
    },
    //查看总计划点击
    lookAllPlan() {
      if (this.AnyChanged.length != 1) {
        this.$message({
          message: "请选择一项！",
          type: "warning"
        });
        return;
      }
      request
        .get(`/plan/tree`, {
          params: {
            id: this.AnyChanged[0].id
          }
        })
        .then(response => {
          this.allPlans = [];
          this.allPlans.push(response.result);
          this.lookAllPlans = true;
        });
    },
    //状态修改，则重新获取表格数据
    changeState() {
      this.getWareList(1);
    },
    //页面显示数据大小修改，重新获取表格数据
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log("每页+" + this.pagination.pageSize);
      this.getWareList(1);
    },
    //页码修改，获取修改页码的数据
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getWareList(val);
    },
    //跳转到计划详情页面
    searchDetails(row) {
      this.$router.push({
        name: this.checked === 1 ? "planMakeOfSeries" : (this.checked === 2 ? "planMakeOfStyleGroup" : "planMakeOfStyle"),
        params: {
          goback: "planVerify",
          isRoot: false,
          isModify: false,
          isCreate: false,
          rowData: row
        }
      });
    },
    //改变日期格式
    changeDate(date) {
      console.log(date);
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
        return y + "-" + m + "-" + d;
      }
    },
    //根据条件搜索获取表格数据
    getWareList(currentPageNum) {
      //首先修改日期格式
      const that = this;
      if (this.dataRange != null) {
        this.DataStartTime = that.changeDate(this.dataRange[0]);
        this.DataEndTime = that.changeDate(this.dataRange[1]);
      } else {
        this.DataStartTime = null;
        this.DataEndTime = null;
      }

      request
        .get(`/plan/find`, {
          params: {
            state:
              this.checkedTwo === 1
                ? "SUBMIT"
                : this.checkedTwo === 2
                  ? "CHECK"
                  : "ASSIGN",
            clientId: this.clientId === "" ? undefined : this.clientId,
            brandId: this.brandId === "" ? undefined : this.brandId,
            seriesName: this.rangeId === "" ? undefined : this.rangeId,
            name: undefined,
            clothesLevelName: undefined,
            createAfter: this.DataStartTime,
            createBefore: this.DataEndTime,
            pageNum: currentPageNum,
            pageSize: this.pagination.pageSize,
            planClass: this.planClassRadioValue === "系列计划" ? "SERIES" : (this.planClassRadioValue === "款式组计划" ? "GROUP" : "STYLE")
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
        });
    },
    //表格选中数据获取
    isChanged(val) {
      this.AnyChanged = val;
    },
    //驳回理由弹出框关闭
    GoBackCancel() {
      this.GoBack = false;
    },
    //驳回理由弹出框提交
    GoBackConfirm() {
      this.AnyChanged.forEach(element => {
        let list = {
          id: element.id,
          reason: this.GoBackReason
        };
        request.put(`/plan/fail`, list).then(response => {
          this.getWareList(this.pagination.currentPage);
        });
      });
      this.GoBack = false;
    },
    //审核通过按钮点击
    VerifyPass() {
      if (this.AnyChanged.length === 0) {  //判断是否勾选了计划
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });
        return;
      }
      for (var i = 0; i < this.AnyChanged.length; i++) {  //逐一审核通过
        request
          .put(`/plan/pass`, null, {
            params: {
              id: this.AnyChanged[i].id
            }
          })
          .then(response => {
            this.getWareList(1);
          });
      }
    },
    //审核驳回按钮点击
    VerifyRebut() {
      if (this.AnyChanged.length === 0) {
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });
        return;
      } else {
        this.GoBack = true;  //唤出审核驳回弹出框
        this.GoBackReason = "";
      }
    },
    //取消审核按钮点击
    CancelVerify() {
      if (this.AnyChanged.length === 0) {
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });
        return;
      }

      //this.$set(this.iptDatas[index], `showAlert`, true)
      for (var i = 0; i < this.AnyChanged.length; i++) {
        request
          .put(`/plan/cancel`, null, {
            params: {
              id: this.AnyChanged[i].id
            }
          })
          .then(response => {
            this.getWareList(1);
          });
      }
    },
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