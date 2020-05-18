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
import GanttElastic from "gantt-elastic"; //导入gantt-elastic插件
import GanttHeader from "gantt-elastic-header"; //导入gantt-elastic-elastic插件
import dayjs from "dayjs";
import request from "@/utils/request"; // 导入封装的自定义的axios插件用于http请求

export default {
  name: "formManagement", // 此页面的component名称

  // 导入标签
  components: {
    GanttElastic,
    GanttHeader
  },

  // 此页面需要用到的数据定义
  data() {
    return {
      //搜索选项变量
      searchOptions: {
        searchParams: {
          /* 
            planClassRadioValue是el-radio-group组件选择计划类型变化时存储的值，
            页面打开时，默认选择了系列计划
          */
          planClassRadioValue: "系列计划",
          planClassName: "SERIES", // 对应planClassRadioValue的英文名

          clientName: "",
          brandName: "",
          seriesName: "",
          creatorName: "",
          timeLineName: "",
          planStateName: "", //计划转台
          seriesStateName: "", //系列转台
          deliverStateName: "" //交付状态
        },
        options: {
          customerNameOptions: [], //客户名称选择器多选项信息
          brandNameOptions: [], //品牌名称多选项信息
          creatorOptions: [], //创建人多选项信息
          planTypeOptions: [], //计划类型多选项信息

          // 计划类别选择器数据
          planClassDict: {
            系列计划: "SERIES",
            款式计划: "STYLE",
            款式组计划: "GROUP"
          },
          // timeline选择器数据
          timeLineOptions: [
            { id: "quannian", name: "全年投放计划" },
            { id: "xiasanyue", name: "下三月投放计划" },
            { id: "benyue", name: "当月投放计划" },
            { id: "xiazhou", name: "下周投放计划" },
            { id: "benzhou", name: "本周投放计划" }
          ],
          // 计划状态选择器数据
          planStateOptions: [
            { id: "quxiao", name: "计划取消" },
            { id: "daiding", name: "计划待定" },
            { id: "chuangjian", name: "计划创建" },
            { id: "xiajia", name: "计划下架" }
          ],
          // 系列状态选择器数据
          seriesStateOptions: [
            { id: "wanjie", name: "订单完结" },
            { id: "yunxing", name: "订单运行" }
          ],
          // 交付状态选择器数据
          deliverStateOptions: [
            { id: "quannian", name: "全年交付计划" },
            { id: "xiasanyue", name: "下三月交付计划" },
            { id: "benyue", name: "当月交付计划" },
            { id: "xiazhou", name: "下周交付计划" },
            { id: "benzhou", name: "本周交付计划" }
          ]
        },

        maps: {
          //计划状态中英文映射
          planStateMaps: {
            quxiao: "计划取消",
            xiajia: "计划下架",
            chuangjian: "计划创建",
            daiding: "计划待定"
          },
          //系列状态中英文映射
          seriesStateMaps: {
            wanjie: "订单完结",
            yunxing: "订单运行"
          },
          //timeline中英文映射
          timeLineMaps: {
            quannian: "全年投放计划",
            xiasanyue: "下三月投放计划",
            benyue: "当月投放计划",
            xiazhou: "下周投放计划",
            benzhou: "本周投放计划"
          },
          //交付状态中英文映射
          deliverStateMaps: {
            quannian: "全年交付计划",
            xiasanyue: "下三月交付计划",
            benyue: "当月交付计划",
            xiazhou: "下周交付计划",
            benzhou: "本周交付计划"
          }
        }
      },

      //系列名称输入建议
      inputSuggestions: {
        series: []
      },

      originSeriesGetData: {}, //存储根据接口搜索到的所有计划的数据

      // gantt-elastic插件数据
      tasks: [],
      options: {}
    };
  },
  created: function() {
    //客户名称下拉框数据加载，接口格式见接口文档
    request
      .get(`${window.$config.HOST}/backstage/client/name`)
      .then(response => {
        // 返回数据存储于this.searchOptions.options.customerNameOptions
        this.searchOptions.options.customerNameOptions = response.result;
      });

    //品牌名称下拉框数据加载，接口格式见接口文档
    request
      .get(`${window.$config.HOST}/backstage/brand/name`)
      .then(response => {
        // 返回数据存储于this.searchOptions.options.brandNameOptions
        this.searchOptions.options.brandNameOptions = response.result;
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

    // 计划类型下拉框选择器数据加载，接口详情查阅接口文档
    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "计划类型"
        }
      })
      .then(response => {
        this.searchOptions.options.planTypeOptions = response.result;
      });

    // 所有用户名下拉框数据加载作为创建人选择器选项，接口格式见接口文档
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

    //根据默认搜索田间加载所有数据
    this.handleSearch();

    /*
      初始化gantt-elasstic的options配置，
      详情见https://github.com/neuronetio/vue-gantt-elastic
        或者https://www.npmjs.com/package/gantt-elastic
    */
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
    // 计划类别选择触发，el-radio-group组件对应响应函数。
    planClassTypeChange() {
      this.handleSearch(); // 根据搜索条件重新加载当前选择计划类别的数据
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

    addTask() {},
    tasksUpdate(tasks) {
      this.tasks = tasks;
    },
    optionsUpdate(options) {
      this.options = options;
    },

    // 辅助函数：将js date对象转变为字符串对象
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

    //用于生成时间范围，生成当前日期为标准的全年，下三月，本月，下周，本周五个时间段
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

    //搜索函数，调用时将根据页面的搜索选项重新加载页面表格中展示的数据
    handleSearch() {
      //调用generateDateLists获取搜索的五个时间段
      var allDates = this.generateDateLists();

      // 构造/plan/find-gantt接口的参数，接口详情参阅接口文档
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

      // 调用/plan/find-gantt接口获取数据
      request
        .get(`${window.$config.HOST}/plan/find-gantt`, {
          params: param
        })
        .then(response => {
          //成功获取到数据

          this.tasks = []; //清空甘特图已经有的数据
          this.originSeriesGetData = []; //清空之前搜索的数据

          // console.log(response.result);

          // 遍历获取的数据
          response.result.forEach(element => {
            /* 
            如果当前数据的计划状态未定义或者等于搜索条件的计划状态 
            并且系列状态未定义或者等于搜索条件的系列状态
            则将当前数据加入甘特图中展示        
            */
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
              // 设置颜色为element.colorCode
              element.style = {
                base: {
                  fill: element.colorCode,
                  stroke: "YELLOW"
                }
              };

              element.type = "task";

              /*
               如果当前数据的上级计划id为0，则其为根计划，谁为甘特图中的顶级计划，
               否则设置数据在甘特中的parentId为其superiorId
              */
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

              // 如果时间段合法，根据当前计划数据的起止时间设置在甘特图中的显示时间段，否则不显示在gantt中，但存储于originSeriesGetData
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

    // 导出excel表响应函数，对应的接口为exportUrl，接口详情参阅接口文档
    exportExcel(exportUrl) {
      //构造接口参数
      var data = [];

      // 从originSeriesGetData和tasks中获取excel数据
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

      //根据exportUrl调用相应的接口下载excel表格
      request({
        url: exportUrl,
        method: "post",
        data: data,
        "Content-Type": "application/json;charset=UTF-8",
        responseType: "blob"
      }).then(response => {
        //文件获取到后，存储下来
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