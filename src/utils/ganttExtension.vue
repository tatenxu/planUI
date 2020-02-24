<template>
  <div class="body">
    <!-- <el-card class="box-card"> -->
    <!-- 悬浮按钮 -->
    <!-- <float-icons class="icons-warp"> -->
    <!-- <div> -->
    <el-button @click="ganttVisualButtonClick" size="small" type="primary">查看甘特图</el-button>
    <!-- </div> -->
    <!-- </float-icons> -->
    <!-- 抽屉 -->
    <el-drawer title="甘特图" size="60%" :visible.sync="ganttDrawerVisible" direction="btt">
      <el-card>
        <gantt-elastic
          :options="ganttOptions"
          :tasks="ganttTasks"
          @tasks-updated="ganttTaskUpdate"
          @options-updated="ganttOptionsUpdate"
        >
          <gantt-header slot="header"></gantt-header>
        </gantt-elastic>
      </el-card>
    </el-drawer>
    <!-- </el-card> -->
  </div>
</template>

<script>
import request from "@/utils/request";
// import FloatIcons from "@/utils/floaticons";
import GanttElastic from "gantt-elastic";
import GanttHeader from "gantt-elastic-header";
import dayjs from "dayjs";

export default {
  components: {
    // "float-icons": FloatIcons,
    GanttElastic,
    GanttHeader
  },
  props: {
    selectedTableData: Array,
    isRootPlan: Boolean
  },
  data() {
    return {
      // 甘特图
      transferedRootPlanId: null,
      ganttDrawerVisible: false,
      ganttTasks: [],
      ganttOptions: {
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
              label: "计划名称",
              value: "name",
              width: 150,
              expander: true,
              html: true,
              events: {
                click({ data, column }) {
                  console.log(data.id + "尝试跳转");
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
              label: "开始时间",
              value: "startDate",
              width: 80,
              html: true
            },
            {
              id: 4,
              label: "结束时间",
              value: "endDate",
              width: 80,
              html: true
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
      }
    };
  },

  methods: {
    // gantt related
    ganttVisualButtonClick() {
      if (this.selectedTableData.length === 0) {
        this.$message({
          message: "请选择一个计划!",
          type: "warning"
        });
      } else if (this.selectedTableData.length > 1) {
        this.$message({
          message: "只能选择一个计划查看甘特图!",
          type: "warning"
        });
      } else {
        this.transferedRootPlanId = this.isRootPlan
          ? this.selectedTableData[0].id
          : this.selectedTableData[0].rootPlanId;
        console.log("根计划ID：", this.transferedRootPlanId);
        this.ganttDrawerVisible = true;

        this.getGanttDataByRootPlanId();
      }
    },

    getGanttDataByRootPlanId() {
      let that = this;

      // gantt related
      function ganttGetDate(hours) {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const currentDay = currentDate.getDate();
        const timeStamp = new Date(
          currentYear,
          currentMonth,
          currentDay,
          0,
          0,
          0
        ).getTime();
        return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
      }
      request
        .get(`${window.$config.HOST}/root-plan/find-gantt`, {
          params: {
            id: this.transferedRootPlanId
          }
        })
        .then(response => {
          this.ganttTasks = [];
          // console.log(response.data);
          response.result.forEach(element => {
            element.style = {
              base: {
                fill: element.colorCode,
                stroke: "YELLOW"
              }
            };

            element.type = "task";

            if (element.id === 0) {
              element.parentId = undefined;
              element.callaped = true;
            } else {
              element.parentId = element.superiorId;
            }

            if (!(element.startDate === null || element.endDate === null)) {
              var dateObj1 = new Date(element.startDate);
              var dateObj2 = new Date(element.endDate);
              element.startTime = dateObj1.getTime();
              element.duration = dateObj2.getTime() - dateObj1.getTime();
              this.ganttTasks.push(element);
            }
          });
        })
        .catch(error => {
          console.log("错误的根计划id");
        });

      // addtion
      this.rules.startEndDate.push({
        required: !this.isModifyPlanFlag,
        message: "请输入",
        trigger: "blur"
      });
    },

    ganttTaskUpdate(tasks) {
      this.ganttTasks = tasks;
    },
    ganttOptionsUpdate(options) {
      this.ganttOptions = options;
    }
  }
};
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .el-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
}
</style>