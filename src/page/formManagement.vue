<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px; ">
        <el-col :span="15">
          <div class="bar">
            <div class="title">计划类型</div>
            <el-radio-group
              v-model="searchOptions.searchParams.planClassRadioValue"
              @change="planClassTypeChange"
            >
              <el-radio-button label="系列计划"></el-radio-button>
              <el-radio-button label="款式计划"></el-radio-button>
              <el-radio-button label="款式组计划"></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>

        <el-col :span="8" :offset="1">
          <div class="bar">
            <div class="title">创建人</div>
            <el-select v-model="searchOptions.searchParams.creatorName" clearable>
              <el-option
                v-for="item in searchOptions.options.creatorOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <!-- <el-col :span="8">
          <div class="bar">
            <div class="title">计划类型</div>
            <el-select v-model="searchOptions.searchParams.planTypeName" clearable>
              <el-option
                v-for="item in searchOptions.options.planTypeOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </el-col>-->
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
                v-for="item in searchOptions.options.customerNameOptions"
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
            <div class="title">系列名称</div>
            <el-autocomplete
              :fetch-suggestions="searchSeriesName"
              v-model="searchOptions.searchParams.seriesName"
              placeholder="请输入内容"
            ></el-autocomplete>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top:5px; ">
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划状态</div>
            <el-select v-model="searchOptions.searchParams.planStateName" clearable>
              <el-option
                v-for="item in searchOptions.options.planStateOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">系列状态</div>
            <el-select v-model="searchOptions.searchParams.seriesStateName" clearable>
              <el-option
                v-for="item in searchOptions.options.seriesStateOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top:5px; ">
        <el-col :span="8">
          <div class="bar">
            <div class="title">TimeLine</div>
            <el-select v-model="searchOptions.searchParams.timeLineName" clearable>
              <el-option
                v-for="item in searchOptions.options.timeLineOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">交付状态</div>
            <el-select v-model="searchOptions.searchParams.deliverStateName" clearable>
              <el-option
                v-for="item in searchOptions.options.deliverStateOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="2" :offset="6">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px; ">
        <el-col :span="3">
          <el-button type="primary" @click="exportExcel('plan/export-month')">按月导出</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="exportExcel('plan/export-week')">按周导出</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="exportExcel('plan/export-day')">按日导出</el-button>
        </el-col>
      </el-row>

      <gantt-elastic
        :options="options"
        :tasks="tasks"
        @tasks-updated="tasksUpdate"
        @options-updated="optionsUpdate"
      >
        <gantt-header slot="header"></gantt-header>
      </gantt-elastic>
    </el-card>
  </div>
</template>

<script>
import GanttElastic from "gantt-elastic";
import GanttHeader from "gantt-elastic-header";
import dayjs from "dayjs";
import request from "@/utils/request";

export default {
  name: "formManagement",
  components: {
    GanttElastic,
    GanttHeader
  },
  data() {
    return {
      searchOptions: {
        searchParams: {
          planClassRadioValue: "系列计划",
          planClassName: "SERIES",
          clientName: "",
          brandName: "",
          seriesName: "",
          creatorName: "",
          timeLineName: "",
          planStateName: "",
          seriesStateName: "",
          deliverStateName: ""
        },
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          planClassDict: {
            系列计划: "SERIES",
            款式计划: "STYLE",
            款式组计划: "GROUP"
          },
          creatorOptions: [],
          planTypeOptions: [],
          timeLineOptions: [
            { id: "quannian", name: "全年投放计划" },
            { id: "xiasanyue", name: "下三月投放计划" },
            { id: "benyue", name: "当月投放计划" },
            { id: "xiazhou", name: "下周投放计划" },
            { id: "benzhou", name: "本周投放计划" }
          ],
          planStateOptions: [
            { id: "quxiao", name: "计划取消" },
            { id: "daiding", name: "计划待定" },
            { id: "chuangjian", name: "计划创建" },
            { id: "xiajia", name: "计划下架" }
          ],
          seriesStateOptions: [
            { id: "wanjie", name: "订单完结" },
            { id: "yunxing", name: "订单运行" }
          ],
          deliverStateOptions: [
            { id: "quannian", name: "全年交付计划" },
            { id: "xiasanyue", name: "下三月交付计划" },
            { id: "benyue", name: "当月交付计划" },
            { id: "xiazhou", name: "下周交付计划" },
            { id: "benzhou", name: "本周交付计划" }
          ]
        },
        maps: {
          planStateMaps: {
            quxiao: "计划取消",
            xiajia: "计划下架",
            chuangjian: "计划创建",
            daiding: "计划待定"
          },
          seriesStateMaps: {
            wanjie: "订单完结",
            yunxing: "订单运行"
          },
          timeLineMaps: {
            quannian: "全年投放计划",
            xiasanyue: "下三月投放计划",
            benyue: "当月投放计划",
            xiazhou: "下周投放计划",
            benzhou: "本周投放计划"
          },
          deliverStateMaps: {
            quannian: "全年交付计划",
            xiasanyue: "下三月交付计划",
            benyue: "当月交付计划",
            xiazhou: "下周交付计划",
            benzhou: "本周交付计划"
          }
        }
      },
      inputSuggestions: {
        series: []
      },

      originSeriesGetData: {},
      tasks: [],
      options: {}
    };
  },
  created: function() {
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
    // 输入建议
    request.get(`${window.$config.HOST}/info/series/name`).then(response => {
      this.inputSuggestions.series = [];
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.series.push(element);
      });
    });

    //获取用户信息
    this.$axios
      .get(`${window.$config.HOST2}/getAllUserName`)
      .then(response => {
        if (response.data.errcode < 0) {
          that.$message.error("下发对象加载失败!");
        }
        this.searchOptions.options.creatorNameOptions = response.data;
      })
      .catch(error => {
        this.$message.error("下发对象加载失败!");
      });

    // 计划类型
    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "计划类型"
        }
      })
      .then(response => {
        this.searchOptions.options.planTypeOptions = response.result;
      });

    // 加载人员
    request
      .get(`${window.$config.HOST2}/user/find`, {
        params: {
          pageNum: 1,
          pageSize: 100
        }
      })
      .then(response => {
        this.searchOptions.options.creatorOptions = response.result;
      });

    //默认加载所有
    this.handleSearch();

    let that = this;
    //初始化options
    this.options = {
      taskMapping: {
        progress: "quantity"
      },
      maxRows: 100,
      maxHeight: 500,
      title: {
        label: "系列计划时间表",
        html: false
      },
      row: {
        height: 24
      },
      calendar: {
        hour: {
          display: false
        }
      },
      chart: {
        progress: {
          bar: false
        },
        expander: {
          display: true
        }
      },
      taskList: {
        expander: {
          straight: false
        },
        columns: [
          {
            id: 1,
            label: "系列计划",
            value: "name",
            width: 150,
            expander: true,
            html: true,
            events: {
              click({ data, column }) {
                console.log(data.name, "尝试跳转");
              }
            }
          },
          {
            id: 2,
            label: "创建人",
            value: "creatorName",
            width: 80,
            html: true
          },
          {
            id: 3,
            label: "开始日期",
            // value: task => dayjs(task.start).format("YYYY-MM-DD"),
            value: "startDate",
            width: 78
          },
          {
            id: 4,
            label: "结束日期",
            // value: task => dayjs(task.start).format("YYYY-MM-DD"),
            value: "endDate",
            width: 78
          },
          {
            id: 5,
            label: "异常类型",
            value: "exceptionType",
            width: 70
          },
          {
            id: 6,
            label: "异常内容",
            value: "exceptionContent",
            width: 70
          }
        ]
      },
      locale: {
        name: "en",
        Now: "回到现在",
        "X-Scale": "X-放大",
        "Y-Scale": "Y-放大",
        "Task list width": "侧边栏缩放",
        "Before/After": "放大",
        "Display task list": "侧边栏"
      }
    };
  },
  methods: {
    planClassTypeChange() {
      this.handleSearch();
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
    // 系列名称搜索建议
    searchSeriesName(queryString, cb) {
      var tmp = this.inputSuggestions.series;
      var results = queryString
        ? tmp.filter(this.createFilter(queryString))
        : tmp;
      cb(results);
    },

    addTask() {},
    tasksUpdate(tasks) {
      this.tasks = tasks;
    },
    optionsUpdate(options) {
      this.options = options;
    },

    // 改变日期格式
    changeDate(date) {
      console.log(date);
      if (!date) {
        return undefined;
      } else {
        // var date = new Date(date);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
      }
    },
    generateDateLists() {
      var allDates = {};
      var statesToAddtion = {
        quannian: [10000, 91],
        xiasanyue: [90, 32],
        benyue: [31, 15],
        xiazhou: [14, 8],
        benzhou: [7, 1]
      };

      var now_ms = Date.parse(new Date()); // millionseconds * 1000
      // 一天： 8.64e7
      if (this.searchOptions.searchParams.timeLineName === "") {
        allDates.startDateBefore = undefined;
        allDates.startDateAfter = undefined;
      } else {
        allDates.startDateBefore = this.changeDate(
          new Date(
            now_ms +
              statesToAddtion[this.searchOptions.searchParams.timeLineName][0] *
                8.64e7
          )
        );
        allDates.startDateAfter = this.changeDate(
          new Date(
            now_ms +
              statesToAddtion[this.searchOptions.searchParams.timeLineName][1] *
                8.64e7
          )
        );
      }
      if (this.searchOptions.searchParams.deliverStateName === "") {
        allDates.endDateBefore = undefined;
        allDates.endDateAfter = undefined;
      } else {
        allDates.endDateBefore = this.changeDate(
          new Date(
            now_ms +
              statesToAddtion[
                this.searchOptions.searchParams.deliverStateName
              ][0] *
                8.64e7
          )
        );
        allDates.endDateBefore = this.changeDate(
          new Date(
            now_ms +
              statesToAddtion[
                this.searchOptions.searchParams.deliverStateName
              ][1] *
                8.64e7
          )
        );
      }
      return allDates;
    },
    handleSearch() {
      var allDates = this.generateDateLists();
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

        creatorId:
          this.searchOptions.searchParams.creatorName === ""
            ? undefined
            : this.searchOptions.searchParams.creatorName,

        planClass: this.searchOptions.options.planClassDict[
          this.searchOptions.searchParams.planClassRadioValue
        ],

        startDateBefore: allDates.startDateBefore,
        startDateAfter: allDates.startDateAfter,
        endDateBefore: allDates.endDateBefore,
        endDateAfter: allDates.endDateAfter
      };
      console.log("搜索参数：", param);
      request
        .get(`${window.$config.HOST}/plan/find-gantt`, {
          params: param
        })
        .then(response => {
          this.tasks = [];
          this.originSeriesGetData = [];
          console.log(response.result);
          response.result.forEach(element => {
            if (
              (this.searchOptions.searchParams.planStateName === "" ||
                this.searchOptions.maps.planStateMaps[
                  this.searchOptions.searchParams.planStateName
                ] === element.planState) &&
              (this.searchOptions.searchParams.seriesStateName === "" ||
                this.searchOptions.maps.seriesStateMaps[
                  this.searchOptions.searchParams.seriesStateName
                ] === element.seriesState)
            ) {
              element.style = {
                base: {
                  fill: element.colorCode,
                  stroke: "YELLOW"
                }
              };

              element.type = "task";

              if (element.superiorId === 0) {
                element.parentId = undefined;
                element.callaped = true;
              } else {
                element.parentId = element.superiorId;
              }

              element.startTimeLine = this.searchOptions.maps.timeLineMaps[
                this.searchOptions.searchParams.timeLineName
              ];
              element.endTimeLine = this.searchOptions.maps.deliverStateMaps[
                this.searchOptions.searchParams.deliverStateName
              ];

              if (!(element.startDate === null || element.endDate === null)) {
                var dateObj1 = new Date(element.startDate);
                var dateObj2 = new Date(element.endDate);
                element.start = dateObj1.getTime();
                element.duration = dateObj2.getTime() - dateObj1.getTime();
                this.tasks.push(element);
              } else {
                // 不显示的系列
                this.originSeriesGetData.push(element);
              }
            }
          });
        });
    },

    exportExcel(exportUrl) {
      var data = [];

      this.originSeriesGetData.forEach(ele => {
        data.push({
          id: ele.id,
          name: ele.name,
          superiorId: ele.superiorId,
          clientName: ele.clientName,
          brandName: ele.brandName,
          seriesName: ele.seriesName,
          systemCode: ele.systemCode,
          projectType: ele.projectType,
          orderStage: ele.orderStage,
          predictStyleQuantity: ele.predictStyleQuantity,
          predictPieceQuantity: ele.predictPieceQuantity,
          styleQuantity: ele.styleQuantity,
          pieceQuantity: ele.pieceQuantity,
          inputPoint: ele.inputPoint,
          type: ele.type,
          productLine: ele.productLine,
          cycle: ele.cycle,
          startDate: ele.startDate,
          endDate: ele.endDate,
          actualStartDate: ele.actualStartDate,
          actualEndDate: ele.actualEndDate,
          extension: ele.extension,
          creatorId: ele.creatorId,
          creatorName: ele.creatorName,
          haveException: ele.haveException,
          exceptionType: ele.exceptionType,
          exceptionContent: ele.exceptionContent,
          planState: ele.planState,
          seriesState: ele.seriesState,
          startTimeLine: ele.startTimeLine,
          endTimeLine: ele.endTimeLine,
          clientDelay: ele.clientDelay,
          seriesRemind: ele.seriesRemind,
          colorCode: ele.colorCode,
          exceptionColorCode: ele.exceptionColorCode
        });
      });
      this.tasks.forEach(ele => {
        data.push({
          id: ele.id,
          name: ele.name,
          superiorId: ele.superiorId,
          clientName: ele.clientName,
          brandName: ele.brandName,
          seriesName: ele.seriesName,
          systemCode: ele.systemCode,
          projectType: ele.projectType,
          orderStage: ele.orderStage,
          predictStyleQuantity: ele.predictStyleQuantity,
          predictPieceQuantity: ele.predictPieceQuantity,
          styleQuantity: ele.styleQuantity,
          pieceQuantity: ele.pieceQuantity,
          inputPoint: ele.inputPoint,
          type: ele.type,
          productLine: ele.productLine,
          cycle: ele.cycle,
          startDate: ele.startDate,
          endDate: ele.endDate,
          actualStartDate: ele.actualStartDate,
          actualEndDate: ele.actualEndDate,
          extension: ele.extension,
          creatorId: ele.creatorId,
          creatorName: ele.creatorName,
          haveException: ele.haveException,
          exceptionType: ele.exceptionType,
          exceptionContent: ele.exceptionContent,
          planState: ele.planState,
          seriesState: ele.seriesState,
          startTimeLine: ele.startTimeLine,
          endTimeLine: ele.endTimeLine,
          clientDelay: ele.clientDelay,
          seriesRemind: ele.seriesRemind,
          colorCode: ele.colorCode,
          exceptionColorCode: ele.exceptionColorCode
        });
      });

      request({
        url: exportUrl,
        method: "post",
        data: data,
        "Content-Type": "application/json;charset=UTF-8",
        responseType: "blob"
      }).then(response => {
        let content = response;
        let blob = new Blob([content]);
        let da = new Date();
        let fileName = da.toLocaleString() + "GanttExcel.xlsx";
        console.log(response);
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
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
    if (to.name === "subGantt") {
      this.keepAlives = ["formManagement", "subGantt"];
    } else {
      this.keepAlives = [];
    }
    next();
  }
};
</script>

<style lang="less" scoped>
.box-card {
  min-width: 900px;
  margin: 20px 50px;
  padding: 0 20px;
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
    .el-autocomplete {
      width: 300px;
      min-width: 75px;
    }
  }
}
</style>