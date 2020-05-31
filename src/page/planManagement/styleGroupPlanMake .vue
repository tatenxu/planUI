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
              <el-date-picker style="margin-left:20px;width:400px " v-model="dateRange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <div class="title">款式组名称</div>
              <el-autocomplete class="inline-input" v-model="name" :fetch-suggestions="querySearchStyleGroup" placeholder="请输入款式组名称" @select="handleSelect" style="width:350px;margin-left:20px" clearable></el-autocomplete>
            </div>
          </el-col>

          <el-col :span="3">
            <el-button type="primary" @click="searchStyleGroup(1)" style="margin-left:50px">搜索</el-button>
          </el-col>

        </el-row>
        <br />
        <hr />
        <br />
        <!-- 搜索结果 -->

        <el-table :data="tableData" style="width: 100%; margin-top: 20px" border>
          <af-table-column type="selection" width="50" align="center"></af-table-column>
          <af-table-column type="index" label="序号" width="50" align="center"></af-table-column>
          <af-table-column prop="name" label="款式组名称" align="center"></af-table-column>
          <af-table-column prop="clientName" label="客户" align="center"></af-table-column>
          <af-table-column prop="brandName" label="品牌" align="center"></af-table-column>
          <af-table-column prop="clothesLevelName" label="服装层次" align="center"></af-table-column>
          <af-table-column prop="rangeCode" label="波段编码" align="center"></af-table-column>
          <af-table-column prop="projectType" label="项目类型" align="center"></af-table-column>
          <af-table-column prop="orderStage" label="订单阶段" align="center"></af-table-column>
          <af-table-column prop="styleQuantity" label="正式款数" align="center"></af-table-column>
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
// 导入自定义的甘特图插件用于展示计划的甘特图
import GanttExtension from "@/utils/ganttExtension";
// 导入封装的自定义的axios插件用于http请求
import request from "@/utils/request";
export default {
  components: {
    GanttExtension
  },
  name: "styleGroupPlanMake",
  data() {
    return {
      //表格数据部分
      tableData: [],   //表格数据
      nameSuggestionsSeries: [],    //系列数据，用于系列输入建议
      nameSuggestionsStyleGroup: [],  //款式组数据，用于款式组输入建议  
      multipleSelection: [],  //表格选中数据
      //搜索部分参数
      clientId: "",     // 客户名称
      brandId: "",     // 品牌名称
      seriesName: "",    // 系列名称
      name: "",         // 款式组名称
      dateRange: "",    // 起始时间

      searchOptions: {  // 下拉框数据
        clientOptions: {},
        brandOptions: {}
      },

      //制定根计划部分参数
      rootPlanMakeFlag: false,    // 控制制定根计划tab标签是否显示
      rootPlanMake: {                  
        planMakeStartEndDate: "",          // 起止时间
        inputPoint: "",      // 投入点
        seriesId: "",     // 记录seriesId用于制定根计划传参
        objectId: "",     // 记录objectId用于制定根计划传参
        name: "",         // 根计划名称
        dateType: "",      // 日期类型
        date: "",       // 日期
        options: { // 下拉框数据
          dateTypeOptions: {},
          inputPointOptions: {}
        }
      },
      rootPlanMakeRules: {        // 控制表格数据有效性验证(必填、非必填)
        planMakeStartEndDate: [
          { required: true, message: "请选择起止时间", trigger: "change" }
        ],

        name: [{ required: true, message: "请输入根计划名", trigger: "blur" }],
        dateType: [
          { required: true, message: "请选择日期类型", trigger: "change" }
        ],
        date: [{ required: true, message: "请选择日期", trigger: "change" }],
        inputPoint: [{ required: true, message: "请选择日期", trigger: "change" }],
      },
      //页码/面板控制部分
      viewname: "first", // 控制当前tab显示
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
      this.keepAlives = ["styleGroupPlanMake"];
    } else {
      this.keepAlives = [];
    }
    next();
  },

  created: function () {
    var that = this;
    // 获取数据字典投入点数据
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "投入点"
        }
      })
      .then(response => {
        this.rootPlanMake.options.inputPointOptions = response.result;
      });
    // 获取数据字典日期类型数据
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "日期类型"
        }
      })
      .then(response => {
        this.rootPlanMake.options.dateTypeOptions = response.result;
      });

    // 获取系列名称数据，用于输入建议
    request.get(`/info/series/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestionsSeries.push({
          value: element.name
        });
      });
    });

    //获得品牌名称数据
    request.get(`/backstage/brand/name`).then(response => {
      this.searchOptions.brandOptions = response.result;
    });

    //获得客户名称数据
    request.get(`/backstage/client/name`).then(response => {
      this.searchOptions.clientOptions = response.result;
    });

    //获得页面初始数据
    request
      .get(`/info/style-group/find`, {
        params: {
          pageNum: 1,
          pageSize: 10,
          haveRootPlan: false
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
    //当搜索框的客户名称改变的时候，清空品牌数据，并重新获取品牌下拉框数据
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
    // 款式组名称搜索的输入建议
    querySearchStyleGroup(queryString, cb) {
      var nameSuggestions = this.nameSuggestionsStyleGroup;
      var results = queryString
        ? nameSuggestions.filter(this.createFilter(queryString))
        : nameSuggestions;
      cb(results);
    },
    // 用于输入建议
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
    // 制定根计划tab中的保存按钮点击
    addRootPlan(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 日期类型转换
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
          // 发送请求
          request
            .post(`/root-plan/insert`, {
              name: this.rootPlanMake.name,
              seriesId: this.rootPlanMake.seriesId,
              planClass: "款式组计划",
              objectId: this.rootPlanMake.objectId,
              inputPoint: this.rootPlanMake.inputPoint,
              dateType: this.rootPlanMake.dateType,
              date: date,
              startDate: startDate,
              endDate: endDate
            })
            .then(response => {
              this.searchStyleGroup(this.pagination.currentPage);     // 重新获取页面数据
              this.rootPlanMakeFlag = false;         // 隐藏制定根计划tab
              this.viewname = "first";              // 返回主tab
              this.rootPlanMake.planMakeStartEndDate = "";   // 清空数据

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
    // tab标签点击自动触发
    handleTabClick(tab, event) { 
      console.log(tab, event);
    },
    //制定根计划取消按钮，清空所有数据
    rootPlanCancel() {
      this.rootPlanMakeFlag = false;   // 隐藏制定根计划tab
      this.viewname = "first";          // 返回主tab
      this.rootPlanMake.planMakeStartEndDate = "";     // 清空数据
      this.rootPlanMake.name = "";    // 清空数据
      this.rootPlanMake.dateType = "";   // 清空数据
      this.rootPlanMake.date = "";   // 清空数据
      this.rootPlanMake.seriesId = "";   // 清空数据
      this.rootPlanMake.objectId = "";   // 清空数据
    },
    // 页面条目数改变时，重新获取数据
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.searchStyleGroup(1);
    },
    // 当前页码改变时，重新获取数据
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.searchStyleGroup(val);
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
    // 根据条件搜索款式组计划，并获取数据
    searchStyleGroup(currentPageNum) {
      const that = this;
      // 日期类型转换
      let startDate, endDate;
      if (this.dateRange == null) {
        startDate = undefined;
        endDate = undefined;
      } else {
        startDate = this.changeDate(this.dateRange[0]);
        endDate = this.changeDate(this.dateRange[1]);
      }
      // 发送请求
      request
        .get(`/info/style-group/find`, {
          params: {
            haveRootPlan: false,
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
    // 跳转到根计划制定tab
    ToPlanForm(row) {
      this.rootPlanMake.planMakeStartEndDate = "";

      this.rootPlanMake.seriesId = row.seriesId;  // 记录当前选中行的一些信息用于接口传参
      this.rootPlanMake.objectId = row.id;        // 记录当前选中行的一些信息用于接口传参

      this.rootPlanMake.dateType = "";
      this.rootPlanMake.date = "";
      this.rootPlanMake.name = row.brandName + row.rangeCode + row.orderStage + row.name + "根计划";   // 根据规则组合成根计划名称
      this.rootPlanMakeFlag = true;
      this.viewname = "second";
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