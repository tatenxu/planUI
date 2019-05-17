<template>
  <div class="body">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-col :span="8">
          <div class="bar">
            <div class="title">下发对象</div>
            <el-select v-model="searchOptions.searchParams.userName" clearable>
              <el-option
                v-for="item in searchOptions.options.userNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select> 
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <el-button type="primary" style="margin-right:20px" @click="distributePlanClick">下发计划</el-button>
          </div>
        </el-col>
          
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%; margin-top: 20px"
          @selection-change="tableSelectionChange"
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

          <!-- <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="ReCover(scope.$index, scope.row)">恢复</el-button>
            </template>
          </el-table-column>-->
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
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      tableMultpleSelection:[],

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
      .get(`${window.$config.HOST}/infoManagement/getUsers`)
      .then(response=>{
        if(response.data.errcode < 0){
          that.$message.error("下发对象加载失败!");
        }
        this.searchOptions.options.userNameOptions = response.data;
      })
      .catch(error=>{
        that.$message.error("下发对象加载失败!");
        this.searchOptions.options.userNameOptions =[
            {
              id:"4243",
              name:"无效小王"
            },
            {
              id:"574523",
              name:"无效小徐"
            },
            {
              id:"57531",
              name:"无效小刘"
            },
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
        this.totalTableData = response.data;

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
          this.totalTableData = response.data;

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
      // this.pagination: {
      //   currentPage: 1,
      //   pageSizes: [5, 10, 20, 30, 50],
      //   pageSize: 5,
      //   total: 400
      // },
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
      if (that.tableMultpleSelection.length === 0) {
        that.$message.error("请选择要删除的计划！");
      } else if (!that.searchOptions.searchParams.userName){
        that.$message.error("请选择下发对象！");
      }else {
        this.tableMultpleSelection.forEach(element => {
          this.$axios
            .post(`${window.$config.HOST}/planManagement/distributePlan`,{
              planId:element.id,
              executerIdList: (this.searchOptions.searchParams.userName==="") ? null : this.searchOptions.searchParams.userName,
            })
            .then(response=>{
              if(response.data < 0){
                that.$message.error(element.name+"下发失败!");
                console.log(element.name+"下发失败!");
              }else{
                console.log(element.name+"下发成功!");
                this.handleSearch();
                // var j = this.tableData.indexOf(element);
                // this.$set(this.tableData[j], "state","已下发");
              }
            })
            .catch(error=>{
              that.$message.error(element.name+"下发失败!");
              console.log(element.name+"下发失败!");
            });
        });
      }
    },
    tableSelectionChange(val){
      this.tableMultpleSelection = val;
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
  .block {
    padding: 30px 0;
    text-align: center;
    //border-right: solid 1px #EFF2F6;
    //display: inline-block;
    //box-sizing: border-box;
  }
}
</style>