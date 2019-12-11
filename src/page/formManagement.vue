<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px; ">
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划类别:</div>
            <el-select v-model="searchOptions.searchParams.planClassName">
              <el-option
                v-for="item in searchOptions.options.planClassOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">创建人:</div>
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

        <el-col :span="8">
          <div class="bar">
            <div class="title">计划类型:</div>
            <el-select v-model="searchOptions.searchParams.planTypeName" clearable>
              <el-option
                v-for="item in searchOptions.options.planTypeOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top:5px; ">
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划状态:</div>
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
            <div class="title">系列状态:</div>
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
            <div class="title">TimeLine:</div>
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
            <div class="title">交付状态:</div>
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

        <el-col :span="2" :offset="2">
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </el-col>

        <el-col :span="2">
          <el-button type="primary" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
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
          planClassName: "SERIES",
          creatorName: "",
          planTypeName: "",
          timeLineName: "",
          planStateName: "",
          seriesStateName: "",
          deliverStateName: ""
        },
        options: {
          planClassOptions: [
            { id: "STYLE", name: "款式计划" },
            { id: "GROUP", name: "款式组计划" },
            { id: "SERIES", name: "系列计划" }
          ],
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

      originSeriesGetData: {},
      tasks: [],
      options: {}
    };
  },
  created: function() {
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
        creatorId:
          this.searchOptions.searchParams.creatorName === ""
            ? undefined
            : this.searchOptions.searchParams.creatorName,
        type:
          this.searchOptions.searchParams.planTypeName === ""
            ? undefined
            : this.searchOptions.searchParams.planTypeName,

        planClass:
          this.searchOptions.searchParams.planClassName === ""
            ? "SERIES"
            : this.searchOptions.searchParams.planClassName,

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

    exportExcel() {
      import("@/utils/Export2Excel").then(excel => {
        const tHeader = [
          "业务组",
          "业务",
          "客户",
          "品牌",
          "系列名称",
          "系统编码",
          "项目类型",
          "订单阶段",
          "预测款数",
          "预测件数",
          "实际款数",
          "实际件数",
          "投入点",
          "计划开始",
          "计划完成",
          "异常",
          "客户延误",
          "实际开始",
          "协商延迟",
          "实际出清",
          "计划状态",
          "系列状态",
          "TIMELINE远近",
          "交付远近",
          "系列更新提醒"
        ];
        const filterVal = [
          "productLine",
          "creatorName",
          "clientName",
          "brandName",
          "seriesName",
          "systemCode",
          "projectType",
          "orderStage",
          "predictStyleQuantity",
          "predictPieceQuantity",
          "styleQuantity",
          "pieceQuantity",
          "inputPoint",
          "startDate",
          "endDate",
          "exceptionContent",
          "clientDelay",
          "actualStartDate",
          "extension",
          "actualEndDate",
          "planState",
          "seriesState",
          "startTimeLine",
          "endTimeLine",
          "seriesRemind"
        ];
        const list = this.originSeriesGetData.concat(this.tasks);
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename
        });
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
  }
}
</style>