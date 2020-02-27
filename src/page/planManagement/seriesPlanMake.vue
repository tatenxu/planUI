<template>
  <el-card class="box-card">
    <el-tabs v-model="viewname" @tab-click="handleTabClick" class="cardTab">
      <el-tab-pane label="系列计划制定" name="first" class="tabPane">
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
              <div class="title">品牌名称</div>
              <el-select v-model="brandId" clearable placeholder="请选择">
                <el-option v-for="item in searchOptions.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">系列名称</div>
              <el-autocomplete class="inline-input" v-model="name" :fetch-suggestions="querySearchSeries" placeholder="请输入系列名称" @select="handleSelect" style="width:350px" clearable></el-autocomplete>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <div class="title">添加时间</div>
              <el-date-picker style="margin-left:20px;width:400px " v-model="dateRange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">服装层次</div>
              <el-select v-model="clothesLevelName" clearable placeholder="请选择">
                <el-option v-for="item in searchOptions.clothesLevelOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" size="small" @click="handleSearch(1)">搜索</el-button>
          </el-col>

        </el-row>
        <!-- <el-row :gutter="20">

          <el-col :span="4">
            <el-button type="primary" size="small" @click="toQuoteModel()">引用计划模板</el-button>
          </el-col>

        </el-row> -->
        <hr />
        <el-table :data="tableData" style="width: 100%; margin-top: 20px" @selection-change="changeCheckBoxFun" border>
          <af-table-column type="selection" width="50" align="center"></af-table-column>
          <af-table-column type="index" label="序号" width="50" align="center"></af-table-column>
          <af-table-column prop="name" label="系列编号" align="center"></af-table-column>
          <af-table-column prop="clientName" label="客户" align="center"></af-table-column>
          <af-table-column prop="brandName" label="品牌" align="center"></af-table-column>
          <af-table-column prop="clothesLevelName" label="服装层次" align="center"></af-table-column>
          <af-table-column prop="rangeCode" label="波段编码" align="center"></af-table-column>
          <af-table-column prop="seriesCode" label="系列编码" align="center"></af-table-column>
          <af-table-column prop="systemCode" label="系统编码" align="center"></af-table-column>
          <af-table-column prop="projectType" label="项目类型" align="center"></af-table-column>
          <af-table-column prop="orderStage" label="订单阶段" align="center"></af-table-column>
          <af-table-column prop="predictStyleQuantity" label="预测款式" align="center"></af-table-column>
          <af-table-column prop="predictPieceQuantity" label="预测件数" align="center"></af-table-column>
          <af-table-column prop="styleQuantity" label="正式款数" align="center"></af-table-column>
          <af-table-column prop="pieceQuantity" label="正式件数" align="center"></af-table-column>
          <af-table-column prop="creatorName" label="添加人" align="center"></af-table-column>
          <af-table-column prop="createTime" label="添加时间" align="center"></af-table-column>
          <af-table-column label="操作" fixed="right" align="center" width="200px">
            <template slot-scope="scope">
              <el-button size="mini" @click="ToPlanForm(scope.row)" type="text">制定根计划</el-button>
            </template>
          </af-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
        </div>
      </el-tab-pane>

      <el-tab-pane label="引用计划模板" name="second" v-if="quotePlanModel">
        <el-card>
          <el-row :gutter="20">
            <el-col :span="2">
              <el-button type="primary" size="small" @click="quoteModel()">确认</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="small" @click="CancelModel()">取消</el-button>
            </el-col>
          </el-row>
          <el-table :data="quotePlan.tableDate" style="width: 100%; margin-top: 20px" @selection-change="quoteChangeCheckBoxFun">
            <af-table-column w idth="50" type="selection" align="center"></af-table-column>
            <af-table-column type="index" label="序号" align="center"></af-table-column>
            <af-table-column prop="name" label="模板名称" align="center"></af-table-column>
            <af-table-column prop="clientName" label="客户名称" align="center"></af-table-column>
            <af-table-column prop="brandName" label="品牌名称" align="center"></af-table-column>
            <af-table-column prop="creatorName" label="创建人" align="center"></af-table-column>
            <af-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="toPlanModelPage(scope.row)">查看</el-button>
              </template>
            </af-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="保存计划模版" name="third" v-if="savePlanModel">
        <el-card>
          <el-form :model="savePlan" :rules="savePlanModelRules" ref="savePlan" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="bar">
                  <el-form-item label="客户名称" prop="clientId" placeholder="请选择客户名称">
                    <el-select v-model="savePlan.clientId" clearable placeholder="请选择" style="min-width:250px">
                      <el-option v-for="item in savePlan.options.clientOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="bar">
                  <el-form-item label="品牌名称" prop="brandId" placeholder="请选择品牌名称">
                    <el-select v-model="savePlan.brandId" clearable placeholder="请选择" style="min-width:250px">
                      <el-option v-for="item in savePlan.options.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <div class="bar">
                  <el-form-item label="模板名称" prop="name" placeholder="请输入模板名称">
                    <el-input v-model="savePlan.name" clearable :rows="1" style="margin-left: 20px;min-width:250px" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="2">
                <div class="bar">
                  <el-button type="primary" size="small" @click="saveModel('savePlanModel')">保存</el-button>
                </div>
              </el-col>

              <el-col :span="2">
                <div class="bar">
                  <el-button type="primary" size="small" @click="saveModelCancel()">取消</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="制定根计划" name="fourth" v-if="rootPlanMakeFlag">
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
                  <el-col :span="2">
                    <el-button type="primary" size="small" @click="addRootPlan('rootPlanMake')">添加</el-button>
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
  name: "seriesPlanMake",
  data() {
    return {
      //tab标签
      viewname: "first",
      //搜索部分参数
      clientId: "",
      brandId: "",
      name: "",
      dateRange: "",
      clothesLevelName: "",
      searchOptions: {
        clientOptions: {},
        brandOptions: {},
        clothesLevelOptions: {}
      },

      //制定根计划部分参数
      rootPlanMakeFlag: false,
      rootPlanMake: {
        planMakeStartEndDate: "",
        inputPoint: "",
        seriesId: "",
        name: "",
        dateType: "",
        date: "",
        options: {
          dateTypeOptions: {},
          inputPointOptions: {}
        }
      },
      rootPlanMakeRules: {
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

      //引用计划模板部分参数
      quotePlanModel: false,
      quotePlan: {
        clientId: "",
        brandId: "",
        seriesId: "",
        tableDate: [],
        multipleSelection: [],
        options: {
          clientOptions: {},
          brandOptions: {}
        }
      },

      //保存计划模板
      savePlanModel: false,
      savePlanModelRules: {
        clientId: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        brandId: [
          { required: true, message: "请选择品牌名称", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入模板名称", trigger: "blur" }]
      },
      savePlan: {
        clientId: "",
        brandId: "",
        name: "",
        rootPlanId: "",
        rootPlanName: "",
        options: {
          clientOptions: {},
          brandOptions: {}
        }
      },

      //表格数据
      tableData: [],
      nameSuggestionsSeries: [],
      multipleSelection: [],

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
      },

      //页码部分
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      }
    };
  },
  created: function () {
    //获得品牌下拉框
    request.get(`/backstage/brand/name`).then(response => {
      this.searchOptions.brandOptions = response.result;
      this.quotePlan.options.brandOptions = response.result;
    });

    //获取系列名称
    request.get(`/info/series/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestionsSeries.push({
          value: element.name
        });
      });
    });

    //获得日期类型
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "日期类型"
        }
      })
      .then(response => {
        this.rootPlanMake.options.dateTypeOptions = response.result;
      });
    //获得投入点
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "投入点"
        }
      })
      .then(response => {
        this.rootPlanMake.options.inputPointOptions = response.result;
      });

    //获得服装层次下拉框
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "服装层次"
        }
      })
      .then(response => {
        this.searchOptions.clothesLevelOptions = response.result;
      });

    //获得客户名称下拉框
    request.get(`/backstage/client/name`).then(response => {
      this.searchOptions.clientOptions = response.result;
      this.quotePlan.options.clientOptions = response.result;
      this.savePlan.options.clientOptions = response.result;
    });

    //获得空集搜索列表
    request
      .get(`/info/series/find`, {
        params: {
          pageNum: 1,
          pageSize: 10,
          haveRootPlan: false
        }
      })
      .then(response => {
        this.tableData = response.result;
        this.pagination.total = response.total;
        this.pagination.currentPage = 1;
      });
  },
  methods: {
    //当搜索框的客户名称改变的时候GET弹出框的品牌信息
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
    //列表选中
    changeCheckBoxFun(val) {
      this.multipleSelection = val;
    },
    quoteChangeCheckBoxFun(val) {
      this.quotePlan.multipleSelection = val;
    },
    //制定根计划取消按钮
    rootPlanCancel() {
      this.rootPlanMakeFlag = false;
      this.viewname = "first";
      this.rootPlanMake.planMakeStartEndDate = "";
      this.rootPlanMake.name = "";
      this.rootPlanMake.dateType = "";
      this.rootPlanMake.date = "";
      this.rootPlanMake.seriesId = "";
    },
    //提交制定根计划列表
    addRootPlan(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let startDate, endDate, date;
          if (this.rootPlanMake.planMakeStartEndDate == null) {
            startDate = undefined;
            endDate = undefined;
          } else {
            startDate = this.changeDate(
              this.rootPlanMake.planMakeStartEndDate[0]
            );
            endDate = this.changeDate(
              this.rootPlanMake.planMakeStartEndDate[1]
            );
          }
          if (this.rootPlanMake.date == null) {
            date = undefined;
          } else {
            date = this.changeDate(this.rootPlanMake.date);
          }
          request
            .post(`/root-plan/insert`, {
              name: this.rootPlanMake.name,
              seriesId: this.rootPlanMake.seriesId,
              planClass: "系列计划",
              objectId: this.rootPlanMake.seriesId,
              inputPoint: this.rootPlanMake.inputPoint,
              dateType: this.rootPlanMake.dateType,
              date: date,
              startDate: startDate,
              endDate: endDate
            })
            .then(response => {
              this.handleSearch(this.pagination.currentPage);
              this.rootPlanMakeFlag = false;
              this.viewname = "first";
              this.rootPlanMake.planMakeStartEndDate = "";
              this.rootPlanMake.name = "";
              this.rootPlanMake.dateType = "";
              this.rootPlanMake.inputPoint = "";
              this.rootPlanMake.date = "";
              this.rootPlanMake.seriesId = "";
            });
        } else {
          this.$message({
            message: "请填写所有必填项!",
            type: "error"
          });
        }
      });
    },

    //跳转到查看模板
    toPlanModelPage(row) {
      this.$router.push({
        name: "bePlanModelEdit",
        params: {
          goback: "seriesPlanMake",
          isUpdate: false,
          isCreate: false,
          isDetail: true,
          data: row
        }
      });
    },

    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.handleSearch(1);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.handleSearch(val);
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
    //制定状态转变
    planTypeSwitchChange() {
      this.handleSearch(1);
    },
    //搜索
    handleSearch(CurrentPageNum) {
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
        .get(`/info/series/find`, {
          params: {
            haveRootPlan: false,
            name: this.name === "" ? null : this.name,
            clientId: this.clientId === "" ? null : this.clientId,
            brandId: this.brandId === "" ? null : this.brandId,
            clothesLevelName:
              this.clothesLevelName === "" ? null : this.clothesLevelName,
            createAfter: startDate,
            createBefore: endDate,
            pageNum: CurrentPageNum,
            pageSize: this.pagination.pageSize
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
          this.pagination.currentPage = CurrentPageNum;
        });
    },
    //跳转制定根计划面板
    ToPlanForm(row) {
      this.rootPlanMake.seriesId = row.id;
      this.rootPlanMakeFlag = true;
      this.viewname = "fourth";
      this.rootPlanMake.planMakeStartEndDate = "";
      this.rootPlanMake.dateType = "";
      this.rootPlanMake.inputPoint = "";
      this.rootPlanMake.date = "";
      this.rootPlanMake.name = row.brandName + row.rangeCode + row.projectType + "系列根计划";
    },

    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    //引用模板提交
    quoteModel() {
      if (this.quotePlan.multipleSelection.length != 1) {
        this.$message({
          message: "请选择一条进行引用！",
          type: "error"
        });
        return;
      } else {
        request
          .post(`/root-plan/quote`, null, {
            params: {
              seriesId: this.quotePlan.seriesId,
              templateId: this.quotePlan.multipleSelection[0].id
            }
          })
          .then(response => {
            this.handleSearch(this.pagination.currentPage);
            this.quotePlanModel = false;
            this.viewname = "first";
            this.quotePlan.multipleSelection = [];
            this.quotePlan.clientId = "";
            this.quotePlan.brandId = "";
            this.quotePlan.seriesId = "";
          });
      }
    },

    CancelModel() {
      this.quotePlanModel = false;
      this.viewname = "first";
      this.quotePlan.multipleSelection = [];
      this.quotePlan.clientId = "";
      this.quotePlan.brandId = "";
      this.quotePlan.seriesId = "";
    },

    saveModel() {
      request
        .post(`/plan-template/save`, {
          rootPlanId: this.savePlan.rootPlanId,
          name: this.savePlan.name,
          clientId: this.savePlan.clientId,
          brandId: this.savePlan.brandId,
          rootPlanName: this.savePlan.rootPlanName
        })
        .then(response => {
          this.SavePlanModel = false;
          this.viewname = "first";
          return;
        });
    },
    saveModelCancel() {
      this.savePlan.clientId = "";
      this.savePlan.brandId = "";
      this.savePlan.name = "";
      this.savePlan.rootPlanId = "";
      this.savePlan.rootPlanName = "";
      this.savePlan.options.brandOptions = {};
      this.SavePlanModel = false;
      this.viewname = "first";
    },

    toQuoteModel() {
      if (this.multipleSelection.length != 1) {
        this.$message({
          message: "请选择一条系列进行引用模板！",
          type: "error"
        });
        return;
      } else {
        request
          .get(`/plan-template/find`, {
            params: {
              clientId: this.multipleSelection[0].clientId,
              brandId: this.multipleSelection[0].brandId
            }
          })
          .then(response => {
            this.quotePlan.tableDate = response.result;
            this.quotePlan.clientId = "";
            this.quotePlan.brandId = "";
            this.quotePlan.seriesId = this.multipleSelection[0].id;
            this.quotePlan.multipleSelection = [];
            this.quotePlanModel = true;
            this.viewname = "second";
          });
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
    if (to.name === "planMakeIndex" || to.name === "bePlanModelEdit") {
      this.keepAlives = ["seriesPlanMake"];
    } else {
      this.keepAlives = [];
    }
    next();
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
.title {
  min-width: 100px;
}
.containerHeaderDiv1 {
  display: flex;
  flex-direction: row;
  width: 100%;
  // background: black;
  .containerHeaderDiv2 {
    position: relative;
    left: 300px;
    // margin-right: 100px;
    // background: white;
    display: flex;
    flex-direction: row-reverse;
    min-width: 500px;
    .input {
      min-width: 200px;
      max-width: 400px;
    }
    .inputTag {
      font-size: 14px;
      line-height: 40px;
      min-width: 90px;
    }
  }
}

.inputCombine {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  min-width: 250px;
  max-width: 500px;
  .inputTag {
    font-size: 14px;
    line-height: 40px;
    min-width: 90px;
  }
}

.secondButtonDiv {
  margin-top: 20px;
  min-width: 250px;
  max-width: 500px;
  // background: black;
  .save {
    margin-left: 68%;
  }
}

.containerHeaderDiv1 {
  display: flex;
  flex-direction: row;
  width: 100%;
  // background: black;
  .containerHeaderDiv2 {
    position: relative;
    left: 300px;
    // margin-right: 100px;
    // background: white;
    display: flex;
    flex-direction: row-reverse;
    min-width: 500px;
    .input {
      min-width: 200px;
      max-width: 400px;
    }
    .inputTag {
      font-size: 14px;
      line-height: 40px;
      min-width: 90px;
    }
  }
}
.block {
  padding: 30px 0;
  text-align: center;
}
.Mtitle {
  align-content: center;
  margin-left: 45%;
  font-size: 2ch;
}
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 1300px;
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