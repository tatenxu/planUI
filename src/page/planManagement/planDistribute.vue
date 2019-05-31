<template>
  <el-card class="box-card">
    <div>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-switch
            class="el-switch"
            v-model="isVerifiedPlan"
            @change="planTypeSwitchChange"
            inactive-color="#13ce66"
            active-text="已审核计划"
            inactive-text="已下发计划">
          </el-switch>
        </el-col>
        <el-col :span="3" v-if="isVerifiedPlan">
          <div class="bar">
            <el-button type="primary" style="margin-right:20px" @click="chooseUserClick">选择下发对象</el-button>
          </div>
        </el-col>
        <el-col :span="12" >
          <div class="bar" id="userChosenList">
          </div>
        </el-col>
        <el-col :span="3" v-if="isVerifiedPlan">
          <div class="bar">
            <el-button type="primary" style="margin-right:20px" @click="distributePlanClick">下发计划</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table
        ref="singleTable"
        :data="tableData"
        style="width: 100%; margin-top: 20px"
        highlight-current-row
        @current-change="handlePlanChosenChange"
        :stripe="true"
      >
        <!-- <el-table-column type="selection" width="50" align="center"></el-table-column> -->
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column v-if="false" prop="id" align="center"></el-table-column>
        <el-table-column prop="number" label="预测编号" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
        <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="rangeName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="planObject" label="计划对象" align="center"></el-table-column>
        <el-table-column prop="type" label="项目类型" align="center"></el-table-column>
        <el-table-column prop="createrName" label="创建人" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pagination.currentPage"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
      ></el-pagination>
    </div>

    <el-dialog title="选择下发对象" :visible.sync="userChoseTableDialogShow" :modal="false">
      <el-table 
        @selection-change="tableSelectionChange"
        :stripe="true"
        :data="searchOptions.options.userNameOptions">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column property="realName" label="下发对象" width="150"></el-table-column>
      </el-table>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      userChoseTableDialogShow:false,
      isVerifiedPlan:true,
      searchOptions: {
        searchParams: {
          userName:""
        },
        options: {
          userNameOptions:[],
        }
      },
      
      totalTableData:[],
      tableData: [],
      userTableMultpleSelection:[],
      chosenPlanRow:{},

      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0,
      },

      planManagementErrorCode:[
        {
          errorCode:-1,
          errotInfo:"所需属性值缺失",
        },
        {
          errorCode:-2,
          errotInfo:"计划名称重复",
        },
        {
          errorCode:-3,
          errotInfo:"父计划未下发",
        },
        {
          errorCode:-4,
          errotInfo:"系列根计划不存在",
        },
        {
          errorCode:-5,
          errotInfo:"款式组根计划不存在",
        },
        {
          errorCode:-6,
          errotInfo:"根计划已存在",
        },
        {
          errorCode:-7,
          errotInfo:"计划开始结束时间超额",
        },
        {
          errorCode:-8,
          errotInfo:"计划款数超额",
        },
        {
          errorCode:-9,
          errotInfo:"引用预测计划时预测计划不存在",
        },
        {
          errorCode:-10,
          errotInfo:"当前计划状态不允许执行此操作",
        },
        {
          errorCode:-11,
          errotInfo:"与已有计划冲突",
        },
      ],
    };
  },
  created:function(){
    let that = this;
    //获取用户信息
    that.$axios
      .get(`${window.$config.HOST2}/getAllUserName`)
      .then(response=>{
        if(response.data.errcode < 0){
          that.$message.error("下发对象加载失败");
        }
        this.searchOptions.options.userNameOptions = response.data;
      })
      .catch(error=>{
        that.$message.error("下发对象加载失败!");
        // this.searchOptions.options.userNameOptions = [
        //   {
        //     id:425,
        //     realName:"sdfasd"
        //   },
        //   {
        //     id:123,
        //     realName:"dsaf"
        //   }
        // ];
      });

    //获取所有未下发计划
    var param = {
      stage:"distribute"
    };
    this.$axios
      .get(`${window.$config.HOST}/planManagement/getPlanList`,{
        params:param
      })
      .then(response => {
        console.log("初始化加载下发计划成功");
        response.data.forEach(element=>{
          if(element.state === "已审核"){
            this.totalTableData.push(element);
          }
        });

        //时间排序
        this.totalTableData.sort(function(a,b){
          return Date.parse(b.createTime)-Date.parse(a.createTime);
        });
        
        //分页
        this.pagination.total = this.totalTableData.length;
        // this.pagination.currentPage = 1;
        var pageEleStart = (this.pagination.currentPage-1)*this.pagination.pageSize;
        var pageEleEnd = (pageEleStart+this.pagination.pageSize)> this.pagination.total?this.pagination.total:(pageEleStart+this.pagination.pageSize);
        this.tableData = this.totalTableData.slice(pageEleStart, pageEleEnd);

      })
      .catch(error => {
        console.log("初始化加载计划列表获取错误");
        // this.tableData = [{id:1,number:"JX20190520001",
        // name:"系列计划制定测试计划001",rangeId:14,type:"系列计划",
        // isRoot:true,parentId:0,parentName:null,planObjectId:14,
        // planObject:"系列款号1",projectType:"品样",quantity:12,productId:2,
        // productDate:"2019-05-29",productDateType:"出运日期",startDate:"2019-06-11",
        // endDate:"2019-06-20",proposal:"系列计划制定测试计划001",description:"系列计划制定测试计划001",
        // state:"已审核",createrName:"孙博士",deptName:"设计管理部",createTime:"2019-05-20 18:13:07",
        // rejectReason:"3213213",deleterName:null,deleteTime:null,haveException:false,note:"系列计划制定测试计划001",
        // rangeNumber:"XL20190520005",rangeName:"系列款号1",brandId:5,brandName:"单独测试品牌",customerId:4,
        // customerName:"单独测试客户",isCompleted:false,clothingLevelId:3,clothingLevelName:"精品"}];
        // console.log(this.totalTableData);
      });
  },
  methods: {
    chooseUserClick(){
      this.userChoseTableDialogShow = true;
    },
    //计划表格单选
    handlePlanChosenChange(val){
      this.chosenPlanRow = val;
      this.tableData.forEach(row=>{
        if(row.id === val.id){
          this.$refs.singleTable.toggleRowSelection(row,true);
        } else {
          this.$refs.singleTable.toggleRowSelection(row, false);
        }
      });
    },
    //switch 处理函数
    planTypeSwitchChange(){
      this.handleSearch();
    },
    handleSearch(){
      var param = {
        stage:"distribute"
      };
      this.$axios
        .get(`${window.$config.HOST}/planManagement/getPlanList`,{
          params:param
        })
        .then(response => {
          this.totalTableData = [];
          response.data.forEach(element=>{
            if(this.isVerifiedPlan){
              if(element.state === "已审核"){
                this.totalTableData.push(element);
              }
            }else{
              if(element.state === "已下发"){
                this.totalTableData.push(element);
              }
            }
          });

          //时间排序
          this.totalTableData.sort(function(a,b){
            return Date.parse(b.createTime)-Date.parse(a.createTime);
          });
          this.pagination.total = this.totalTableData.length;
          var pageEleStart = (this.pagination.currentPage-1)*this.pagination.pageSize;
          var pageEleEnd = (pageEleStart+this.pagination.pageSize)> this.pagination.total?this.pagination.total:(pageEleStart+this.pagination.pageSize);
          this.tableData = this.totalTableData.slice(pageEleStart, pageEleEnd);
        })
        .catch(error => {
          console.log("初始化加载计划列表获取错误");
        });
    },
    // 每页条数改变时触发函数
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log(`每页 ${val} 条`);

      this.pagination.currentPage = 1;
      this.handleSearch();
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.currentPage = val;
      this.handleSearch();
    },
    distributePlanClick() {
      //this.$set(this.iptDatas[index], `showAlert`, true)
      let that = this;
      if (that.userTableMultpleSelection.length === 0) {
        that.$message.error("请选择下发对象！");
      } else {
        var paramUserList = [];
        this.userTableMultpleSelection.forEach(element=>{
          paramUserList.push(element.id);
        });
        this.$axios
          .post(`${window.$config.HOST}/planManagement/distributePlan`,{
            planId:this.chosenPlanRow.id,
            executerIdList: paramUserList,
          })
          .then(response=>{
            console.log({
              planId:this.chosenPlanRow.id,
              executerIdList: paramUserList,
            });
            if(response.data < 0){
              that.$message.error(this.chosenPlanRow+"下发失败:");
              console.log(this.chosenPlanRow+"下发失败!");
            }else{
              console.log(this.chosenPlanRow+"下发成功!");
              that.$message({
                message:this.chosenPlanRow+"下发成功!",
                type:'success'
              });
              this.handleSearch();
            }
          })
          .catch(error=>{
            console.log({
              planId:this.chosenPlanRow.id,
              executerIdList: paramUserList,
            });
            that.$message.error("下发失败:"+this.planManagementErrorCode[-response.data-1].errotInfo);
            console.log("下发失败:"+this.planManagementErrorCode[-response.data-1].errotInfo);
          });
      }
    },
    tableSelectionChange(val){
      this.userTableMultpleSelection = val;
      if(this.userTableMultpleSelection.length !== 0){
        var showStr = "已选择:";
        this.userTableMultpleSelection.forEach(element=>{
          showStr = showStr + element.realName + ","
        });
        document.getElementById("userChosenList").innerHTML = showStr;
      } else {
        document.getElementById("userChosenList").innerHTML = '';
      }
    }
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
    font-size: 14px;
      min-width: 75px;
      text-align: center;
      line-height: 40px;
    // .title {
      
    //   // background: black;
    // }
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
  .el-switch{
    height: 40px;
  }
  .block {
    padding: 30px 0;
    text-align: center;
    //border-right: solid 1px #EFF2F6;
    //display: inline-block;
    //box-sizing: border-box;
  }
}
</style>