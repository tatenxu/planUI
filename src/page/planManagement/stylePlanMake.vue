<template>
  <el-card class="box-card">
    <!-- 搜索条件设置 -->
    <el-tabs v-model="viewname" @tab-click="handleTabClick" class="cardTab">
      <el-tab-pane label="系列计划制定" name="first" class="tabPane">
        <!--表格 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <div class="title">客户名称</div>
              <el-select v-model="clientId" clearable placeholder="请选择" @change="searchClientChanged">
                <el-option v-for="item in searchOptions.clientOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">品牌</div>
              <el-select v-model="brandId" clearable placeholder="请选择">
                <el-option v-for="item in searchOptions.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">系列名称</div>
              <el-autocomplete class="inline-input" v-model="seriesName" :fetch-suggestions="querySearchSeries" placeholder="请输入系列名称" @select="handleSelect" style="width:350px" clearable></el-autocomplete>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <div class="title">添加时间</div>
              <el-date-picker style="margin-left:20px;width:400px " v-model="dateRange" type="daterange" align="right" unlink-panels clearable range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <div class="title">订单款号</div>
              <el-autocomplete class="inline-input" v-model="number" :fetch-suggestions="querySearchStyle" placeholder="请输入系列名称" @select="handleSelect" style="width:400px;margin-left:20px" clearable></el-autocomplete>
            </div>
          </el-col>
          <el-col :span="5" class="MinW">
            <!-- <el-switch v-model="checked" @change="planTypeSwitchChange" inactive-color="#13ce66" inactive-text="未制定" active-text="已制定"></el-switch> -->
            <el-button type="primary" @click="handleSearch(1)" style="margin-left:50px">搜索</el-button>
          </el-col>
        </el-row>
        <br />
        <hr />
        <br />
        <el-row :gutter="20">
          <el-col :span="5">
            <el-button type="primary" size="small" @click="rootPlanMakeBatch()">批量制定根计划</el-button>
          </el-col>
        </el-row>

        <el-table :data="tableData" style="width: 100%; margin-top: 20px" @selection-change="changeCheckBoxFun" border>
          <af-table-column type="selection" width="50" align="center"></af-table-column>
          <af-table-column type="index" label="序号" width="50" align="center"></af-table-column>
          <af-table-column prop="name" label="款号模板名称" align="center"></af-table-column>
          <af-table-column prop="clientName" label="客户" align="center"></af-table-column>
          <af-table-column prop="brandName" label="品牌" align="center"></af-table-column>
          <af-table-column prop="clothesLevelName" label="服装层次" align="center"></af-table-column>
          <af-table-column prop="rangeCode" label="波段编码" align="center"></af-table-column>
          <af-table-column prop="number" label="订单编号" align="center"></af-table-column>
          <af-table-column prop="projectType" label="项目类型" align="center"></af-table-column>
          <af-table-column prop="orderStage" label="订单阶段" align="center"></af-table-column>
          <af-table-column prop="styleQuantity" width="170" label="正式款数" align="center"></af-table-column>
          <af-table-column prop="pieceQuantity" label="正式件数" align="center"></af-table-column>
          <af-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button @click="ToPlanForm(scope.row)" type="text" size="small">制定根计划</el-button>
            </template>
          </af-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="制定根计划" name="second" v-if="rootPlanMakeFlag">
        <el-card>
          <el-form :model="rootPlanMake" :rules="rootPlanMakeRules" ref="rootPlanMake" label-width="120px" class="add-ruleForm">
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="bar">
                  <el-form-item label="起止时间" prop="planMakeStartEndDate" placeholder="请选择起止时间">
                    <el-date-picker :picker-options="pickerOptions0" style="margin-left:20px" v-model="rootPlanMake.planMakeStartEndDate" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="bar">
                  <el-form-item label="投入点" prop="inputPoint">
                    <el-select v-model="rootPlanMake.inputPoint" clearable placeholder="请选择" style="min-width:430px">
                      <el-option v-for="item in rootPlanMake.options.inputPointOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="bar">
                  <el-form-item label="根计划名称" prop="name" placeholder="请输入根计划名称">
                    <el-input v-model="rootPlanMake.name" disabled :rows="1" placeholder="请输入" style="min-width:350px"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="bar" style="margin-left: 0px">
                  <el-form-item label="日期类型" prop="dateType" placeholder="请选择日期类型">
                    <el-select v-model="rootPlanMake.dateType" clearable placeholder="请选择" style="min-width:120px">
                      <el-option v-for="item in rootPlanMake.options.dateTypeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="4">
                <el-form-item label prop="date" placeholder="请选择日期">
                  <el-date-picker :picker-options="pickerOptions1" v-model="rootPlanMake.date" type="date" placeholder="选择日期" style="min-width:260px"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="Mbutton">
                  <el-col :span="2" v-if="nowMakeNum!=0">
                    <el-button type="primary" size="small" @click="toUpOne()">上一个</el-button>
                  </el-col>
                  <el-col :span="2" v-else>
                    <el-button type="primary" size="small" @click="toUpOne()" disabled>上一个</el-button>
                  </el-col>
                  <el-col :span="2" v-if="nowMakeNum!=allMakeNum-1">
                    <el-button type="primary" size="small" @click="toDownOne()">下一个</el-button>
                  </el-col>
                  <el-col :span="2" v-else>
                    <el-button type="primary" size="small" @click="toDownOne()" disabled>下一个</el-button>
                  </el-col>
                  <el-col :span="2" v-if="nowMakeNum===allMakeNum-1">
                    <el-button type="primary" size="small" @click="addRootPlan('rootPlanMake')">添加</el-button>
                  </el-col>
                  <el-col :span="2" v-else>
                    <el-button type="primary" size="small" disabled @click="addRootPlan('rootPlanMake')">添加</el-button>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" size="small" @click="rootPlanCancel()">取消</el-button>
                  </el-col>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "stylePlanMake",
  data() {
    return {
      //批量制定根计划控制数据
      nowMakeNum: 0,   //目前制定根计划的序号
      allMakeNum: 0,   //一共准备批量制定的数目
      batchTable: [],  //批量制定根计划的数据
      //表格数据部分
      tableData: [],    //主页面表格数据
      nameSuggestionsSeries: [],   //系列搜索建议
      nameSuggestionsStyle: [],    //款式搜索建议
      multipleSelection: [],       //表格可选数据
      //搜索部分参数
      clientId: "",       // 客户名称 
      brandId: "",        // 品牌名称
      seriesName: "",      // 系列名称
      number: "",      // 订单款号
      dateRange: "",      // 起始时间
      searchOptions: {     // 订单款号下拉框数据
        clientOptions: {},
        brandOptions: {}
      },

      //制定根计划部分参数
      rootPlanMakeFlag: false,     // 制定根计划tab显示控制
      batchFlag: false,      // 批量标签，若是批量制定根计划，则为true
      rootPlanMake: {     // 制定根计划tab数据
        planMakeStartEndDate: "",     // 起止时间
        inputPoint: "",     // 投入点

        seriesId: [],     // 用于接口传参
        objectId: [],     // 用于接口传参
        name: "",     // 根计划名称
        dateType: "",     // 日期类型
        date: "",     // 日期
        options: {     // 下拉框数据
          dateTypeOptions: {},
          inputPointOptions: {},
        }
      },
      rootPlanMakeRules: {     // 数据有效性验证控制
        planMakeStartEndDate: [
          { required: true, message: "请选择起止时间", trigger: "change" }
        ],

        name: [{ required: true, message: "请输入根计划名", trigger: "blur" }],
        dateType: [
          { required: true, message: "请选择日期类型", trigger: "change" }
        ],
        date: [{ required: true, message: "请选择日期", trigger: "change" }],
        inputPoint: [{ required: true, message: "请选择投入点", trigger: "change" }],
      },
      //页码/面板控制部分
      viewname: "first",     // 当前tab页面
      // pagination存储本页面页码控制的变量
      pagination: {
        currentPage: 1, // 当前页码
        pageSizes: [10, 20, 30, 40, 50], // 页码选项中x条/页的选择项
        pageSize: 10, // 当前页面展示多少条数据
        total: 0 // 后台一共有多少条数据
      },

      pickerOptions0: {
        disabledDate: time => {
          var date = new Date();

          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      },

      pickerOptions1: {
        disabledDate: time => {
          var date = new Date();

          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      }
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
    if (to.name === "planMakeIndex") {
      this.keepAlives = ["stylePlanMake"];
    } else {
      this.keepAlives = [];
    }
    next();
  },

  created: function () {
    var that = this;
    // 获得数据字典投入点数据
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "投入点"
        }
      })
      .then(response => {
        this.rootPlanMake.options.inputPointOptions = response.result;
      });
    // 获得数据字典日期类型数据
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "日期类型"
        }
      })
      .then(response => {
        this.rootPlanMake.options.dateTypeOptions = response.result;
      });

    //获取系列名称用于搜索建议
    request.get(`/info/series/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestionsSeries.push({
          value: element.name
        });
      });
    });

    //获得品牌名称下拉框数据
    request.get(`/backstage/brand/name`).then(response => {
      this.searchOptions.brandOptions = response.result;
    });

    //获得客户名称下拉框数据
    request.get(`/backstage/client/name`).then(response => {
      this.searchOptions.clientOptions = response.result;
    });

    //获得初始搜索结果
    request
      .get(`/info/style/find`, {
        params: {
          pageNum: 1,
          pageSize: 10,
          haveRootPlan: false
        }
      })
      .then(response => {
        response.result.forEach(element => {
          this.nameSuggestionsStyle.push({
            value: element.number
          });
        });
        this.tableData = response.result;
        this.pagination.total = response.total;
        this.pagination.currentPage = 1;
      });
  },
  methods: {
    // 批量制定根计划的时候点击上一个
    toUpOne() {
      const that = this;
      this.$refs["rootPlanMake"].validate(valid => {       // 首先判断该页是否填写完成
        if (valid) {
          // 如果填写完成，则记录该页数据到相应标号下，然后将上一页数据赋值进来
          this.batchTable[this.nowMakeNum].planMakeStartEndDate = this.rootPlanMake.planMakeStartEndDate;
          this.batchTable[this.nowMakeNum].inputPoint = this.rootPlanMake.inputPoint;
          this.batchTable[this.nowMakeNum].dateType = this.rootPlanMake.dateType;
          this.batchTable[this.nowMakeNum].date = this.rootPlanMake.date;
          this.nowMakeNum--;
          this.rootPlanMake.name = this.batchTable[this.nowMakeNum].name;
          this.rootPlanMake.planMakeStartEndDate = this.batchTable[this.nowMakeNum].planMakeStartEndDate;
          this.rootPlanMake.inputPoint = this.batchTable[this.nowMakeNum].inputPoint;
          this.rootPlanMake.dateType = this.batchTable[this.nowMakeNum].dateType;
          this.rootPlanMake.date = this.batchTable[this.nowMakeNum].date;
        } else {
          this.$message({
            message: "请填写所有必填项!",
            type: "error"
          });
        }
      });
    },
    // 批量制定根计划点击下一页
    toDownOne() {
      const that = this;
      this.$refs["rootPlanMake"].validate(valid => {
        if (valid) {
          // 判断该页是否填写完成，必须填写完成才可以点击下一页
          // 如果该页填写完成，记录该页数据到相应标号数据下，然后将下一页数据填入相应字段

          this.batchTable[this.nowMakeNum].planMakeStartEndDate = this.rootPlanMake.planMakeStartEndDate;
          this.batchTable[this.nowMakeNum].inputPoint = this.rootPlanMake.inputPoint;
          this.batchTable[this.nowMakeNum].dateType = this.rootPlanMake.dateType;
          this.batchTable[this.nowMakeNum].date = this.rootPlanMake.date;

          console.log(this.batchTable)
          this.nowMakeNum++;
          this.rootPlanMake.name = this.batchTable[this.nowMakeNum].name;
          this.rootPlanMake.planMakeStartEndDate = this.batchTable[this.nowMakeNum].planMakeStartEndDate;
          this.rootPlanMake.inputPoint = this.batchTable[this.nowMakeNum].inputPoint;
          this.rootPlanMake.dateType = this.batchTable[this.nowMakeNum].dateType;
          this.rootPlanMake.date = this.batchTable[this.nowMakeNum].date;
        } else {
          this.$message({
            message: "请填写所有必填项!",
            type: "error"
          });
        }
      });
    },
    //当搜索框的客户名称改变的时候，自动刷新品牌数据，并重新获取品牌下拉框数据
    searchClientChanged() {
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: this.clientId === "" ? undefined : this.clientId
          }
        })
        .then(response => {
          this.searchOptions.brandOptions = response.result;
          this.brandId = 1;
          this.brandId = "";
        });
    },
    //系列名称搜索的输入建议
    querySearchSeries(queryString, cb) {
      var nameSuggestions = this.nameSuggestionsSeries;
      var results = queryString
        ? nameSuggestions.filter(this.createFilter(queryString))
        : nameSuggestions;
      cb(results);
    },
    // 款号搜索的输入建议
    querySearchStyle(queryString, cb) {
      var nameSuggestions = this.nameSuggestionsStyle;
      var results = queryString
        ? nameSuggestions.filter(this.createFilter(queryString))
        : nameSuggestions;
      cb(results);
    },
    // 搜索建议 详见element
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
    //表格选中数据获取
    changeCheckBoxFun(val) {
      this.multipleSelection = val;
    },
    // 批量制定根计划
    rootPlanMakeBatch() {
      if (this.multipleSelection.length <= 1) {
        this.$message({
          type: "error",
          message: "请选择多个款式进行批量制定根计划。"
        });
        return;
      }
      this.batchTable = [];        // 首先清空之前可能填写的数据
      this.multipleSelection.forEach(element => {          // 遍历表格选中数据，将name用特定规则组成，并读入seriesId和objectId
        this.rootPlanMake.seriesId.push(element.seriesId);
        this.rootPlanMake.objectId.push(element.id);
        this.batchTable.push({
          name: element.number + element.orderStage + "款式根计划",       // 根据规则组成根计划名称
          planMakeStartEndDate: "",
          inputPoint: "",
          dateType: "",
          date: "",
        })
      });
      this.allMakeNum = this.multipleSelection.length;        // 记录批量制定根计划的数据
      this.nowMakeNum = 0;       // 刚开始跳转到批量制定根计划的时候为第0个
      this.rootPlanMake.planMakeStartEndDate = "";       // 清空批量制定根计划tab下的起止时间
      this.rootPlanMake.name = this.multipleSelection[0].number + this.multipleSelection[0].orderStage + "款式根计划";       // 获取第0个计划名称
      this.rootPlanMake.dateType = "";       // 清空日期类型
      this.rootPlanMake.inputPoint = "";       // 清空投入点
      this.rootPlanMake.date = "";       // 清空日期
      this.rootPlanMakeFlag = true;       // 显示批量制定根计划tab
      this.batchFlag = true;       // 置flag为true
      this.viewname = "second";       // 跳转到批量制定根计划的tab
    },
    // 制定单个根计划
    ToPlanForm(row) {
      this.rootPlanMake.seriesId.push(row.seriesId);       // 传参用
      this.rootPlanMake.objectId.push(row.id);        // 传参用
      this.allMakeNum = 1;       // 相当于制定单个根计划
      this.nowMakeNum = 0;
      this.rootPlanMake.planMakeStartEndDate = "";
      this.rootPlanMake.name = row.number + row.orderStage + "款式根计划";
      this.rootPlanMake.dateType = "";
      this.rootPlanMake.date = "";
      this.rootPlanMake.inputPoint = "";
      this.rootPlanMakeFlag = true;
      this.batchFlag = false;
      this.viewname = "second";
    },
    // 制定根计划确认按钮点击
    addRootPlan(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {       // 首先判断数据有效性
        if (valid) {
          let list = [];
          this.batchTable[this.allMakeNum - 1] = {       // 将最后一页数据填入
            name: this.rootPlanMake.name,
            date: this.rootPlanMake.date,
            dateType: this.rootPlanMake.dateType,
            planMakeStartEndDate: this.rootPlanMake.planMakeStartEndDate,
            inputPoint: this.rootPlanMake.inputPoint,
          }
          for (let i = 0; i < this.rootPlanMake.seriesId.length; i++) {       // 组合成list
            list.push({
              name: this.batchTable[i].name,
              seriesId: this.rootPlanMake.seriesId[i],
              planClass: "款式计划",
              inputPoint: this.batchTable[i].inputPoint,
              objectId: this.rootPlanMake.objectId[i],
              dateType: this.batchTable[i].dateType,
              date: this.changeDate(this.batchTable[i].date),
              startDate: this.changeDate(this.batchTable[i].planMakeStartEndDate[0]),
              endDate: this.changeDate(this.batchTable[i].planMakeStartEndDate[1]),
            });
          }

          if (this.batchFlag === false) {       // 单个制定根计划
            request.post(`/root-plan/insert`, list[0]).then(response => {
              this.handleSearch(1);
              this.rootPlanMakeFlag = false;
              this.viewname = "first";
              this.rootPlanMake.planMakeStartEndDate = "";
              this.rootPlanMake.name = "";
              this.rootPlanMake.dateType = "";
              this.rootPlanMake.date = "";
              this.rootPlanMake.seriesId = [];
              this.rootPlanMake.objectId = [];
            });
          } else {       // 批量制定根计划
            request.post(`/root-plan/batch-insert`, list).then(response => {
              this.handleSearch(1);
              this.rootPlanMakeFlag = false;
              this.viewname = "first";
              this.rootPlanMake.planMakeStartEndDate = "";
              this.rootPlanMake.name = "";
              this.rootPlanMake.dateType = "";
              this.rootPlanMake.date = "";
              this.rootPlanMake.seriesId = [];
              this.rootPlanMake.objectId = [];
              this.batchFlag = false;
            });
          }
        } else {
          this.$message({
            message: "请填写所有必填项!",
            type: "error"
          });
        }
      });
    },
    //制定根计划取消按钮，清空所有数据，并隐藏tab
    rootPlanCancel() {
      this.rootPlanMakeFlag = false;
      this.viewname = "first";
      this.batchFlag = false;
      this.rootPlanMake.planMakeStartEndDate = "";

      this.rootPlanMake.name = "";
      this.rootPlanMake.dateType = "";
      this.rootPlanMake.date = "";
      this.rootPlanMake.seriesId = [];
      this.rootPlanMake.objectId = [];
    },
    // 每页条数改变，则刷新数据
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.handleSearch(1);
    },
    // 当前页码改变，则刷新数据
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.handleSearch(val);
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    //改变日期格式
    changeDate(date) {
      if (!date) {
        return null;
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
    // 根据条件搜索主页面数据
    handleSearch(currentPageNum) {
      const that = this;
      let startDate, endDate;
      if (this.dateRange == null) {
        startDate = undefined;
        endDate = undefined;
      } else {
        startDate = this.changeDate(this.dateRange[0]);
        endDate = this.changeDate(this.dateRange[1]);
      }
      request
        .get(`/info/style/find`, {
          params: {
            haveRootPlan: false,
            number: this.number === "" ? null : this.number,
            clientId: this.clientId === "" ? null : this.clientId,
            brandId: this.brandId === "" ? null : this.brandId,
            createAfter: startDate,
            createBefore: endDate,
            pageNum: currentPageNum,
            pageSize: this.pagination.pageSize,
            seriesName: this.seriesName === "" ? null : this.seriesName
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
          this.pagination.currentPage = currentPageNum;
        });
    }
  }
};
</script>
<style lang="less">
.el-table .cell {
  white-space: pre-line;
}
body .el-table th.gutter {
  display: table-cell !important;
}
</style>
<style lang="less" scoped>
.block {
  padding: 30px 0;
  text-align: center;
}
.Mtitle {
  align-content: center;
  margin-left: 43%;
  font-size: 2ch;
}
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 1100px;
  .el-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    .MinW {
      min-width: 400px;
    }
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 14px;
        width: 90px;
        min-width: 100px;
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
    }
  }
}
</style>