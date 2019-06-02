<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px; ">
        <el-col :span="6">
          <div class="bar">
            <div class="title">创建人:</div>
            <el-select v-model="searchOptions.searchParams.createrName" clearable >
              <el-option
                v-for="item in searchOptions.options.createrNameOptions"
                :key="item.realName"
                :label="item.realName"
                :value="item.realName">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">计划名称:</div>
            <el-input v-model="searchOptions.searchParams.planName"/>
          </div>
        </el-col>

        <el-col :span="10">
          <div class="bar">
            <div class="title">起止时间:</div>
              <el-date-picker
                v-model="searchOptions.searchParams.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </div>
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
            createrName: "",
            planName: "",
            dateRange: ""
          },
          options: {
            createrNameOptions: [],
          }
        },

        tasks :[],
        options:{},
      }
    },
    created:function(){
      //获取用户信息
      this.$axios
        .get(`${window.$config.HOST2}/getAllUserName`)
        .then(response=>{
          if(response.data.errcode < 0){
            that.$message.error("下发对象加载失败!");
          }
          this.searchOptions.options.createrNameOptions = response.data;
        })
        .catch(error=>{
          this.$message.error("下发对象加载失败!");
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
            display: true
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
                  console.log(data.id+"尝试跳转");
                  if(data.isRoot){
                    that.$router.push({
                      name:'subGantt',
                      params:{rangePlanid:data.id},
                    })
                  } else {
                    this.$message({
                      message:data.name + "不是根计划",
                      type:'info'
                    })
                  }
                }
              }
            },
            {
              id: 2,
              label: "创建人",
              value: "createrName",
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
              value:"endDate",
              width: 78
            },
            {
              id: 5,
              label: "项目类型",
              value: "projectType",
              width: 70
            },
            {
              id: 6,
              label: "数量",
              value: "quantity",
              width: 50
            },
            // {
            //   id: 5,
            //   label: "%",
            //   value: "progress",
            //   width: 35,
            //   style: {
            //     "task-list-header-label": {
            //       "text-align": "center",
            //       width: "100%"
            //     },
            //     "task-list-item-value-container": {
            //       "text-align": "center",
            //       width: "100%"
            //     }
            //   }
            // }
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
      addTask() {
      },
      tasksUpdate(tasks) {
        this.tasks = tasks;       
      },
      optionsUpdate(options) {
        this.options = options;
      },

      // 改变日期格式
      changeDate(date) {
        console.log(date);
        if(!date){
          return undefined;
        }else{
          // var date = new Date(date);
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? "0" + m : m;
          var d = date.getDate();
          d = d < 10 ? "0" + d : d;
          return y + "-" + m + "-" + d ;
        }
      },
      handleSearch(){
        var param={
          name: (this.searchOptions.searchParams.planName === "")?undefined:this.searchOptions.searchParams.planName, 
          createrName: (this.searchOptions.searchParams.createrName==="")?undefined:this.searchOptions.searchParams.createrName,
          startDate:this.changeDate(this.searchOptions.searchParams.dateRange?this.searchOptions.searchParams.dateRange[0]:null), 
          endDate:this.changeDate(this.searchOptions.searchParams.dateRange?this.searchOptions.searchParams.dateRange[1]:null), 
        };
        console.log(param);
        this.$axios
          .get(`${window.$config.HOST}/planManagement/getGanttForRangePlan`,{
            params:param
          })
          .then(response=>{
            this.tasks = [];
            // console.log(response.data);
            response.data.forEach(element=>{
              if(element.parentId ===0){
                element.parentId = undefined;
                element.collapsed = true;
              }
              if(!element.haveException){
                element.style = {
                  base: {
                    fill: "GREEN",
                    stroke: "YELLOW"
                  }
                }
              }
              element.type = "task";

              var dateObj1 = new Date(element.startDate);
              var dateObj2 = new Date(element.endDate);
              element.start = dateObj1.getTime();
              element.duration = dateObj2.getTime()-dateObj1.getTime();

              this.tasks.push(element);
            })          
          })
          .catch(error=>{
            this.$message.error("搜索失败:请检查网络");
            console.log("搜索失败:请检查网络");
          });
      },
    },
    computed:{
      keepAlives:{
        get(){
          console.log(this.$store.getters['baseinfo/keepAliveOptions']);
          return this.$store.getters['baseinfo/keepAliveOptions'];
        },
        set(value){
          return this.$store.commit('baseinfo/keepalive-opt-arr', value);
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.name === 'subGantt') {
        this.keepAlives = ['formManagement','subGantt'];
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