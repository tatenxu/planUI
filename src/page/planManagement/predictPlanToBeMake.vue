<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px; ">
        <el-col :span="8">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="searchOptions.searchParams.customerName" clearable >
              <el-option
                v-for="item in searchOptions.options.customerNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="searchOptions.searchParams.brandName" clearable >
              <el-option
                v-for="item in searchOptions.options.brandNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="searchOptions.searchParams.name" clearable >
              <el-option
                v-for="item in searchOptions.options.clothingLevelOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 25px; margin-bottom: 5px;">

        <el-col :span="8">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-select v-model="searchOptions.searchParams.name">
              <el-option
                v-for="item in searchOptions.options.rangeNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="13">
          <div class="bar">
            <div class="title">制定时间</div>
            <el-date-picker
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="bar">
            <el-button type="primary" @click="handleSearch()">搜索</el-button>
          </div>
        </el-col>
      </el-row>
        
        <!-- <el-col :span="16">
          <div class="bar">
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-col> -->
    </el-card>

    <el-card class="box-card">
      <div>
      <el-table :data="tableData" max-height="550"  style="width : 100%" :stripe="true">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column v-if="false" prop="id" align="center"></el-table-column>
        <!-- <el-table-column prop="forecastedId" label="预测编号" align="center"></el-table-column>
        <el-table-column prop="planName" label="计划名称" align="center"></el-table-column> -->
        <el-table-column prop="number" label="系列编号" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
        <el-table-column prop="name" label="服装层次" align="center"></el-table-column>
        <el-table-column prop="name" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
        <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
        <!-- <el-table-column prop="state" label="状态" align="center"></el-table-column> -->
        <!-- <el-table-column prop="note" label="操作" align="center"></el-table-column> -->

        <el-table-column  fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
              <el-button v-if="!scope.row.havePredictPlan" @click="makePredict(scope.row)" type="text" size="small">
                制定预测
              </el-button>
              <p v-if="scope.row.havePredictPlan">已制定</p>
          </template>
        </el-table-column>

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
            :total="pagination.total">
          </el-pagination>
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
          customerName: "",
          brandName: "",
          name: "",
          name: "",
          planName:"",
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
      tableData: [],
      totalTableData:[],
      // checked: true,
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0,
      },
    }
  },

  created: function () {
    const that = this;
    console.log('进入未制定计划页面');

    //获取客户名称
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getCustomerName`)
      .then(response => {
        this.searchOptions.options.customerNameOptions = response.data;
      })
      .catch(error => {
        console.log("初始化获取客户失败!");
      });

    //获取服装层次
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getClothingLevelName`)
      .then(response => {
        this.searchOptions.options.clothingLevelOptions = response.data;
      })
      .catch(error => {
        console.log("初始化服装层次错误");        
      });

    //品牌名称选择获取
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`)
      .then(response => {
        this.searchOptions.options.brandNameOptions = response.data;
      })
      .catch(error => {
        console.log("初始化品牌名称选择错误");
      });

    //加载系列名称
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getRangeName`)
      .then(response => {
        this.searchOptions.options.rangeNameOptions = response.data;
      })
      .catch(error => {
        console.log("系列名称加载错误");
      });

    //默认获取计划列表
    var param = {
      customerId : undefined,
      brandId : undefined,
      id : undefined,
      clothingLevelId : undefined,
      startDate : undefined,
      endDate : undefined,
    };
    this.$axios
      .post(`${window.$config.HOST}/infoManagement/getRangeList`,param)
      .then(response => {
        this.totalTableData = response.data;

        this.pagination.total = this.totalTableData.length;
        var pageEleStart = (this.pagination.currentPage-1)*this.pagination.pageSize;
        var pageEleEnd = (pageEleStart+this.pagination.pageSize)> this.pagination.total?this.pagination.total:(pageEleStart+this.pagination.pageSize);
        this.tableData = this.totalTableData.slice(pageEleStart, pageEleEnd);
      })
      .catch(error => {
        console.log("初始化计划列表获取错误");
      });
  },

  methods: {
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
    makePredict(row){
      const that = this;
      that.$router.push({
        name: "planMakeIndex",
        params: {
          flag:1,
          goback: "predictPlanToBeMake",
          customerName: row.customerName,
          brandName: row.brandName,
          rangeId:"", 
          rangeName: row.name,
          planType: "预测计划",
          planObjectName: row.name,
          planObjectId:"",
          topPlanName: "根计划",
          topPlanId:0
        }
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
        var h = date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = date.getSeconds();
        second = minute < 10 ? "0" + second : second;
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      }
    },
    //获取预测计划列表
    handleSearch(){
      var params = {
        customerId: (this.searchOptions.searchParams.customerName==="")?undefined:this.searchOptions.searchParams.customerName, 
        brandId: (this.searchOptions.searchParams.brandName==="")?undefined:this.searchOptions.searchParams.brandName,
        id: (this.searchOptions.searchParams.planName==="")?undefined:this.searchOptions.searchParams.planName,
        clothingLevelId :(this.searchOptions.searchParams.name==="")?undefined:this.searchOptions.searchParams.name, 
        startDate: this.changeDate(this.searchOptions.searchParams.dateRange?this.searchOptions.searchParams.dateRange[0]:null),
        endDate:this.changeDate(this.searchOptions.searchParams.dateRange?this.searchOptions.searchParams.dateRange[1]:null),
      };
      console.log(params);

      this.$axios
        .post(`${window.$config.HOST}/infoManagement/getRangeList`, params)
        .then(response => {
          this.totalTableData = response.data;

          this.pagination.total = this.totalTableData.length;
          // this.pagination.currentPage = 1;
          var pageEleStart = (this.pagination.currentPage-1)*this.pagination.pageSize;
          var pageEleEnd = (pageEleStart+this.pagination.pageSize)> this.pagination.total?this.pagination.total:(pageEleStart+this.pagination.pageSize);
          this.tableData = this.totalTableData.slice(pageEleStart, pageEleEnd);
        })
        .catch(error => {
          console.log("搜索失败");
        });
    },
  },  
}
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