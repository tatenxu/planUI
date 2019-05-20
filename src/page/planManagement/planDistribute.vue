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
        :data="tableData"
        style="width: 100%; margin-top: 20px"
        highlight-current-row
        @current-change="handlePlanChosenChange"
        :stripe="true"
      >
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
    };
  },
  created:function(){
    let that = this;
    //获取用户信息
    that.$axios
      .get(`${window.$config.HOST2}/getAllUserName`)
      .then(response=>{
        if(response.data.errcode < 0){
          that.$message.error("下发对象加载失败!");
        }
        this.searchOptions.options.userNameOptions = response.data;
      })
      .catch(error=>{
        that.$message.error("下发对象加载失败!");
        this.searchOptions.options.userNameOptions = [
          {
            id:425,
            realName:"sdfasd"
          },
          {
            id:123,
            realName:"dsaf"
          }
        ];
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

        //分页
        this.pagination.total = this.totalTableData.length;
        this.pagination.currentPage = 1;
        var pageEleStart = (this.pagination.currentPage-1)*this.pagination.pageSize;
        var pageEleEnd = (pageEleStart+this.pagination.pageSize)> this.pagination.total?this.pagination.total:(pageEleStart+this.pagination.pageSize);
        this.tableData = this.totalTableData.slice(pageEleStart, pageEleEnd);
      })
      .catch(error => {
        console.log("初始化加载计划列表获取错误");
      });
  },
  methods: {
    chooseUserClick(){
      this.userChoseTableDialogShow = true;
    },
    //计划表格单选
    handlePlanChosenChange(){
      this.chosenPlanRow = val;
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
          console.log("初始化加载下发计划成功");
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
              that.$message.error(element.name+"下发失败!");
              console.log(element.name+"下发失败!");
            }else{
              console.log(element.name+"下发成功!");
              this.handleSearch();
            }
          })
          .catch(error=>{
            console.log({
              planId:this.chosenPlanRow.id,
              executerIdList: paramUserList,
            });
            that.$message.error(element.name+"下发失败!");
            console.log(element.name+"下发失败!");
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