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
            <el-select v-model="searchOptions.searchParams.clothingLevelName" clearable >
              <el-option
                v-for="item in searchOptions.options.clothingLevelOptions"
                :key="item.id"
                :label="item.clothingLevelName"
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
            <el-button type="primary" @click="getUnmadedPlanList()">搜索</el-button>
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
        <el-table-column prop="clothingLevelName" label="服装层次" align="center"></el-table-column>
        <el-table-column prop="name" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
        <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
        <!-- <el-table-column prop="state" label="状态" align="center"></el-table-column> -->
        <!-- <el-table-column prop="note" label="操作" align="center"></el-table-column> -->

        <el-table-column  fixed="right" width="150" align="center">
          <template slot-scope="scope">
              <el-button @click="makePredict(scope.row)" type="text" size="small">制定预测</el-button>
          </template>
        </el-table-column>

      </el-table>
      </div>
      <div class="block">
          <el-pagination
            
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
          clothingLevelName: "",
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
      // checked: true,
      pages: 0,
      pagination: {
        currentPage: 1,
        pageSizes: [5, 10, 20, 30, 50],
        pageSize: 5,
        total: 400,
      },
    }
  },

  created: function () {
    const that = this;
    console.log('进入未制定计划页面');

    //获取客户名称
    this.$axios
      .get(`${window.$config.HOST}/baseIinfoManagement/getCustomerName`)
      .then(response => {
        console.log("getCustomer 成功");
        this.searchOptions.options.customerNameOptions = response.data;
      })
      .catch(error => {
        console.log("getCustomer 失败!");
        this.searchOptions.options.customerNameOptions = [
          {
            id: 42453,
            name: "A客户"
          },
          {
            id: 41526,
            name: "B客户"
          },
        ];
      });

    //获取服装层次
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getClothingLevelName`)
      .then(response => {
        this.searchOptions.options.clothingLevelOptions = response.data;
      })
      .catch(error => {
        var ClothingList = [
          {
            id: 1,
            clothingLevelName: "时装"
          },
          {
            id: 2,
            clothingLevelName: "精品"
          },
          {
            id: 3,
            clothingLevelName: "时尚"
          }
        ];
        this.searchOptions.options.clothingLevelOptions = ClothingList;
      });

    //品牌名称选择获取
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`,{customerId:NaN})
      .then(response => {
        this.searchOptions.options.brandNameOptions = this.searchOptions.options.brandNameOptions;
      })
      .catch(error => {
        console.log("品牌名称选择错误");
        this.searchOptions.options.brandNameOptions = [
          {
            id: 1,
            name: "X品牌"
          },
          {
            id: 2,
            name: "Y品牌"
          },
        ];
      });

    //加载系列名称
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getRangeName`,{brandId:NaN})
      .then(response => {
        this.searchOptions.options.rangeNameOptions = response;
      })
      .catch(error => {
        console.log("系列名称加载错误");
        this.searchOptions.options.rangeNameOptions = [
          {
            id: 1,
            name: "时装"
          },
          {
            id: 2,
            name: "精品"
          },
          {
            id: 3,
            name: "时尚"
          }
        ];
      });

    //默认获取计划列表
    var param = {
      customerId : NaN,
      brandId : NaN,
      id : NaN,
      clothingLevelId : NaN,
      startDate : NaN,
      endDate : NaN,
    };
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getRangeList`,param)
      .then(response => {
        this.tableData = response.data;
      })
      .catch(error => {
        console.log("计划列表获取错误");
        this.tableData = [
          {
            id:"4453",
            number:"XL20190101001",
            customerName:"Qi-Collection",
            brandName:"Selikie",
            clothingLevelName:"时装",
            name:"Fall-2019(01/08/09)",
            createrName:"刘德华",
            deptName:"业务一组",
            state:"未制定"
          }
        ];
      })
      ;
  },

  methods: {
    makePredict(row){
      const that = this;
      that.$router.push({
        name: "planMakeIndex",
        params: {
          goback: "predictPlanToBeMake",
          flag: 5,
          client: row.customerName,
          brand: row.brandName,
          series: row.rangeName,
          plantype: 1,
          planobj: row.rangeName
        }
      });
    },
    // 改变日期格式
    changeDate(date) {
      console.log(date);
      if(!date){
        return NaN;
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
    getUnmadedPlanList(){
      var params = {
        customerId: (this.searchOptions.searchParams.customerName==="")?NaN:this.searchOptions.searchParams.customerName, 
        brandId: (this.searchOptions.searchParams.brandName==="")?NaN:this.searchOptions.searchParams.brandName,
        id: (this.searchOptions.searchParams.planName==="")?NaN:this.searchOptions.searchParams.planName,
        clothingLevelId :(this.searchOptions.searchParams.clothingLevelName==="")?NaN:this.searchOptions.searchParams.clothingLevelName, 
        startDate: this.changeDate(this.searchOptions.searchParams.dateRange[0]),
        endDate: this.changeDate(this.searchOptions.searchParams.dateRange[1]),
      };
      console.log(params);

      this.$axios
      .get(`${window.$config.HOST}/InfoManagement/getRangeList`, params)
      .then(response => {
        var SearchList = response;
        this.tableData = SearchList;
      })
      .catch(error => {
        var SearchList = [
          {
            id: 1,
            number: "XL20190101001",
            name: "Fall-2019(07/08/09)",
            customerId: 1232131,
            customerName: "Qi-Collection",
            brandId: 42132131,
            brandName: "Selkie",
            clothingLevelId: 321321,
            clothingLevelName: "时装",
            createrName: "刘德华",
            styleQuantity: 15,
            deptName: "业务1组",
            createTime: "2019-01-01 10:15:01",
            addingMode: "手动",
            state: "已绑定",
            note: "系列备注1",
            havePlan: false
          },
          {
            id: 1,
            number: "XL20190101001",
            name: "Fall-2019(07/08/09)",
            customerId: 1232131,
            customerName: "Qi-Collection",
            brandId: 42132131,
            brandName: "Selkie",
            clothingLevelId: 321321,
            clothingLevelName: "时装",
            createrName: "刘德华",
            styleQuantity: 15,
            deptName: "业务1组",
            createTime: "2019-01-01 10:15:01",
            addingMode: "手动",
            state: "已绑定",
            note: "系列备注1",
            havePlan: false
          }
        ];
        this.tableData = SearchList;
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