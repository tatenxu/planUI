<template>
  <el-card class="box-card">
    <!-- 搜索条件设置 -->
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
              <el-autocomplete class="inline-input" v-model="seriesName" :fetch-suggestions="querySearchSeries" placeholder="请输入系列名称" @select="handleSelect" style="width:350px" clearable></el-autocomplete>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <div class="title">添加时间</div>
              <el-date-picker style="margin-left:20px " v-model="dateRange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <div class="title">款式组名称</div>
              <el-autocomplete class="inline-input" v-model="name" :fetch-suggestions="querySearchStyleGroup" placeholder="请输入款式组名称" @select="handleSelect" style="width:350px;margin-left:20px" clearable></el-autocomplete>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="3">
            <el-button type="primary" @click="searchStyleGroup(1)" style="margin-left:50px">搜索</el-button>
          </el-col>
          <el-col :span="3">
            <GanttExtension :selectedTableData="multipleSelection" :isRootPlan="true"></GanttExtension>
          </el-col>

        </el-row>
        <br />
        <hr />
        <br />
        <!-- 搜索结果 -->

        <el-table :data="tableData" style="width: 100%; margin-top: 20px" border>
          <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
          <el-table-column prop="serialNo" width="150" label="款式组编号" align="center"></el-table-column>
          <el-table-column prop="name" width="150" label="款式组名称" align="center"></el-table-column>
          <el-table-column prop="clientName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="seriesName" width="150" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="brandName" width="150" label="品牌名称" align="center"></el-table-column>
          <el-table-column prop="clothesLevelName" label="服装层次" align="center"></el-table-column>
          <el-table-column prop="styleQuantity" label="款式数量" align="center"></el-table-column>
          <el-table-column prop="creatorName" label="添加人" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="createTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column fixed="right" label="操作" width="250" align="center" v-if="checked===false">
            <template slot-scope="scope">
              <el-button @click="ToPlanForm(scope.row)" type="text" size="small">制定根计划</el-button>
            </template>
          </el-table-column>
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
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="bar">
                  <el-form-item label="根计划名称" prop="name" placeholder="请输入根计划名称">
                    <el-input v-model="rootPlanMake.name" clearable :rows="1" placeholder="请输入" style="min-width:300px"></el-input>
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
                    <el-button type="primary" @click="addRootPlan('rootPlanMake')">添加</el-button>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" @click="rootPlanCancel()">取消</el-button>
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
import GanttExtension from "@/utils/ganttExtension";
export default {
  components: {
    GanttExtension
  },
  name: "styleGroupPlanMake",
  data() {
    return {
      //表格数据部分
      tableData: [],
      nameSuggestionsSeries: [],
      nameSuggestionsStyleGroup: [],
      multipleSelection: [],
      //搜索部分参数
      clientId: "",
      brandId: "",
      seriesName: "",
      name: "",
      dateRange: "",
      checked: false,
      searchOptions: {
        clientOptions: {},
        brandOptions: {}
      },

      //制定根计划部分参数
      rootPlanMakeFlag: false,
      rootPlanMake: {
        planMakeStartEndDate: "",

        seriesId: "",
        objectId: "",
        name: "",
        dateType: "",
        date: "",
        options: {
          dateTypeOptions: {}
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
        date: [{ required: true, message: "请选择日期", trigger: "change" }]
      },
      //页码/面板控制部分
      viewname: "first",
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
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
    if (to.name === "planMakeIndex") {
      this.keepAlives = ["styleGroupPlanMake"];
    } else {
      this.keepAlives = [];
    }
    next();
  },

  created: function () {
    var that = this;
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

    //获取系列名称
    request.get(`/info/series/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestionsSeries.push({
          value: element.name
        });
      });
    });

    //获得品牌名称
    request.get(`/backstage/brand/name`).then(response => {
      this.searchOptions.brandOptions = response.result;
    });

    //获得客户名称
    request.get(`/backstage/client/name`).then(response => {
      this.searchOptions.clientOptions = response.result;
    });

    //获得初始搜索结果
    request
      .get(`/info/style-group/find`, {
        params: {
          pageNum: 1,
          pageSize: 10,
          haveRootPlan: this.checked
        }
      })
      .then(response => {
        response.result.forEach(element => {
          this.nameSuggestionsStyleGroup.push({
            value: element.name
          });
        });
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
    querySearchStyleGroup(queryString, cb) {
      var nameSuggestions = this.nameSuggestionsStyleGroup;
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
              planClass: "款式组计划",
              objectId: this.rootPlanMake.objectId,
              dateType: this.rootPlanMake.dateType,
              date: date,
              startDate: startDate,
              endDate: endDate
            })
            .then(response => {
              this.searchStyleGroup(this.pagination.currentPage);
              this.rootPlanMakeFlag = false;
              this.viewname = "first";
              this.rootPlanMake.planMakeStartEndDate = "";

              this.rootPlanMake.name = "";
              this.rootPlanMake.dateType = "";
              this.rootPlanMake.date = "";
              this.rootPlanMake.seriesId = "";
              this.rootPlanMake.objectId = "";
            });
        } else {
          this.$message({
            message: "请填写所有必填项!",
            type: "error"
          });
        }
      });
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
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
      this.rootPlanMake.objectId = "";
    },

    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.searchStyleGroup(1);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.searchStyleGroup(val);
    },
    //已制定未制定状态变化
    planTypeSwitchChange() {
      this.searchStyleGroup(1);
    },
    //改变日期格式
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
        return y + "-" + m + "-" + d;
      }
    },
    searchStyleGroup(currentPageNum) {
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
        .get(`/info/style-group/find`, {
          params: {
            haveRootPlan: this.checked === false ? false : true,
            name: this.name === "" ? null : this.name,
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
    },
    ToPlanForm(row) {
      this.rootPlanMake.planMakeStartEndDate = "";

      this.rootPlanMake.seriesId = row.seriesId;
      this.rootPlanMake.objectId = row.id;
      this.rootPlanMake.name = "";
      this.rootPlanMake.dateType = "";
      this.rootPlanMake.date = "";
      this.rootPlanMakeFlag = true;
      this.viewname = "second";
    }
  }
};
</script>

<style lang="less" scoped>
.block {
  padding: 30px 0;
  text-align: center;
}
.title {
  min-width: 100px;
}
.Mtitle {
  align-content: center;
  margin-left: 42%;
  font-size: 2ch;
}
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 1200px;
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