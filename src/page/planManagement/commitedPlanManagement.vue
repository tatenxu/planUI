<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="searchOptions.searchParams.customerName" clearable>
              <el-option
                v-for="item in searchOptions.options.customerNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="searchOptions.searchParams.clothingLevel" clearable>
              <el-option
                v-for="item in searchOptions.options.clothingLevelOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-select v-model="searchOptions.searchParams.rangeName" clearable>
              <el-option
                v-for="item in searchOptions.options.rangeNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-select v-model="searchOptions.searchParams.name" clearable>
              <el-option
                v-for="item in searchOptions.options.planNameOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              style="margin-left: 20px"
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              clearable
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      
      <el-table
        :data="tableData"
        max-height="400"
        @selection-change="changeCheckBoxFun"
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column width="50" type="selection" align="center"></el-table-column>
        <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="id" v-if="false"></el-table-column>
        <el-table-column prop="number" label="计划编号" align="center"></el-table-column>
        <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="rangeNumber" label="系列编号" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
        <el-table-column prop="rangeName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
        <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
        <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
        <el-table-column prop="parentName" label="上级计划" align="center"></el-table-column>
        <el-table-column prop="havePlan" label="状态" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.havePlan">已制定</p>
            <p v-else>未制定</p>
          </template>
        </el-table-column>
        <el-table-column label="异常状态" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="ToSearchException(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.haveException"
            >有异常，查看</el-button>
            <p v-else>无异常</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="getPlanDetail(scope.row)" type="text" size="small">查看</el-button>
            <!-- <el-button
              v-if="isSelfMadePlan"
              @click.native.prevent="ModifyPlanDetail(scope.row)"
              type="text"
              size="small"
            >修改</el-button>
            <el-button
              v-if="isSelfMadePlan"
              @click.native.prevent="deleteOnePlan(scope.row.id)"
              type="text"
              size="small"
            >删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
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
import { error } from 'util';
export default {
  data() {
    return {
      searchOptions: {
        searchParams: {
          customerName: "",
          brandName: "",
          clothingLevel: "",
          rangeName: "",
          name:"",
          dateRange: ""
        },
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          clothingLevelOptions: [],
          rangeNameOptions:[],
          planNameOptions:[],
        }
      },
      totalTableData:[],
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      selectedData: []
    };
  },
  created: function () {
    const that = this;
    console.log('进入计划管理页面');

    //获取客户名称
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getCustomerName`)
      .then(response => {
        this.searchOptions.options.customerNameOptions = response.data;
      })
      .catch(error => {
        console.log("初始化客户选项错误!");
      });

    //获取服装层次
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getClothingLevelName`)
      .then(response => {
        this.searchOptions.options.clothingLevelOptions = response.data;
      })
      .catch(error => {
        console.log("初始化服装层次加载错误");
      });

    //品牌名称选择获取
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`,{
        params:{customerId:""}
      })
      .then(response => {
        this.searchOptions.options.brandNameOptions = response.data;
      })
      .catch(error => {
        console.log("初始化品牌名称选择错误");
      });

    //初始化获取系列
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getRangeName`,{
        params:{brandId:""}
      })
      .then(response => {
        this.searchOptions.options.rangeNameOptions = response.data;
      })
      .catch(error => {
        console.log("初始化系列名称加载错误");
      });

    //默认获取已完成计划列表
    var param = {
      stage: "manage"
    }
    this.$axios
      .get(`${window.$config.HOST}/planManagement/getCompletedPlanList`,{
        params:param
      })
      .then(response=>{
          response.data.forEach(element=>{
            this.totalTableData = response.data;
            this.totalTableData.forEach(element=>{
              if(element.isRoot){
                element.parentName = "根计划";
              }
            });
          });
          this.searchOptions.options.planNameOptions = this.totalTableData;

          this.pagination.total = this.totalTableData.length;
          var pageEleStart = (this.pagination.currentPage-1)*this.pagination.pageSize;
          var pageEleEnd = (pageEleStart+this.pagination.pageSize)> this.pagination.total?this.pagination.total:(pageEleStart+this.pagination.pageSize);
          this.tableData = this.totalTableData.slice(pageEleStart, pageEleEnd);
        })
      .catch(error => {
        console.log("初始化被下发计划列表获取错误");
      });
  },
  methods: {   
    changeCheckBoxFun(val) {
      this.selectedData = val;
    },
    getPlanDetail(row) {
      param={
        flag: 0,
        goback: "commitedPlanManagement",
        client: row.customerName,
        brand: row.brandName,
        series: row.rangeName,
        id:row.id,
        plantype: row.type,
        planobj: row.planObject,
        TopPlan: row.parentId,
        TopPlanName: row.parentName?row.parentName:"根计划",
        planName:row.name,
        projectType:row.projectType,
        number:row.number,
        dataStart:row.startDate,
        dataEnd:row.endDate,
        productDate:row.productDate,
        productDateType:row.productDateType,
        productId:row.productId,
        proposal:row.proposal,
        note:row.note,
        description:row.description,
      };
      that.$router.push({
        name: "planMakeIndex",
        params: param
      });
    },
    
    // 改变日期格式
    changeDate(date) {
      if(!date){
        return undefined;
      }else{
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        // var h = date.getHours();
        // var minute = date.getMinutes();
        // minute = minute < 10 ? "0" + minute : minute;
        // var second = date.getSeconds();
        // second = minute < 10 ? "0" + second : second;
        // return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
        return y + "-" + m + "-" + d;
      }
    },
    //搜索按钮
    handleSearch(){
      var param = {
        customerId: (this.searchOptions.searchParams.customerName==="")?undefined:this.searchOptions.searchParams.customerName, 
        brandId: (this.searchOptions.searchParams.brandName==="")?undefined:this.searchOptions.searchParams.brandName, 
        rangeId: (this.searchOptions.searchParams.rangeName==="")?undefined:this.searchOptions.searchParams.rangeName,  
        name: (this.searchOptions.searchParams.name==="")?undefined:this.searchOptions.searchParams.name, 
        clothingLevelId :(this.searchOptions.searchParams.name==="")?undefined:this.searchOptions.searchParams.name, 
        startDate: this.changeDate(this.searchOptions.searchParams.dateRange?this.searchOptions.searchParams.dateRange[0]:null),
        endDate:this.changeDate(this.searchOptions.searchParams.dateRange?this.searchOptions.searchParams.dateRange[1]:null),
      };
      
      param.stage = "manage";
      console.log(param);
      this.$axios
        .get(`${window.$config.HOST}/planManagement/getCompletedPlanList`,{
          params:param
        })
        .then(response=>{
          this.totalTableData = response.data;
          this.totalTableData.forEach(element=>{
            if(element.isRoot){
              element.parentName = "根计划";
            }
          });

          //分页
          this.pagination.total = this.totalTableData.length;
          this.pagination.currentPage = 1;
          var pageEleStart = (this.pagination.currentPage-1)*this.pagination.pageSize;
          var pageEleEnd = (pageEleStart+this.pagination.pageSize)> this.pagination.total?this.pagination.total:(pageEleStart+this.pagination.pageSize);
          this.tableData = this.totalTableData.slice(pageEleStart, pageEleEnd);
        })
        .catch(error=>{
          this.$message.error("搜索失败!");
        });
    },
   
    handleSizeChange(val) {
      this.pagination.pageSize=val;
      console.log("每页+"+this.pagination.pageSize)
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage=val;
      this.handleSearch();
    },
  }
};
</script>

<style lang="less" scoped>
.Mtitle {
  font-size: 3ch;
  margin-left: 47%;
}
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
      .title {
        font-size: 14px;
        width: 90px;
        min-width: 50px;
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
  .block {
    padding: 30px 0;
    text-align: center;
  }
}
</style>
