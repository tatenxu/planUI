<template>
  <div>
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
   name: "subsubGantt",
   components: {
     GanttElastic,
     GanttHeader
   },
   data() {
     return {
      tasks :[],
      options:{},
     }
   },
   created:function(){
     let that = this;
     //初始化options
     this.options = {
      taskMapping: {
        progress: "quantity"
      },
      maxRows: 100,
      maxHeight: 500,
      title: {
        label: "款式计划时间表",
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
           label: "款式计划",
           value: "name",
           width: 150,
           expander: true,
           html: true,
           events: {
            click({ data, column }) {
              console.log(data.id+"尝试跳转");
              if(data.isRoot){
               // that.$router.push({
               //   name:'subGantt',
               //   params:{planid:0},
               // })
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
   mounted:function(){
     let styleGroupPlanid = this.$route.params.styleGroupPlanid;
     console.log("款式组id:"+styleGroupPlanid);
     if(styleGroupPlanid)
      this.handleSearch(styleGroupPlanid);
     else{
      this.$message({
         message:"请返回报表管理重新开始!",
         type:'warning'
      });
      // window.history.go(-1);
     }
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
     handleSearch(rangePlanid){
      var param = {
        id:rangePlanid,
      };

      console.log(param);
      this.$axios
        .get(`${window.$config.HOST}/planManagement/getGanttForStylePlan`,{
         params:param,
        })
        .then(response=>{
          this.tasks = [];
          if(response.data.length === 0){
              console.log("无子计划");
              this.$message({
                message:"选择的款式组没有子计划!",
                type:'warning'
              })
          }
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