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
            <div class="title">计划名称</div>
            <el-select v-model="searchOptions.searchParams.predictPlanName" clearable>
              <el-option
                v-for="item in searchOptions.options.planNameOptions"
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
            <el-button type="primary" @click="handleSearchClick">搜索</el-button>
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
      <el-table :data="tableDataA" max-height="550" style="width : 100%" :stripe="true">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column v-if="false" prop="id" align="center"></el-table-column>
        <el-table-column prop="number" label="预测编号" align="center"></el-table-column>
        <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="rangeNumber" label="系列编号" align="center"></el-table-column>
        <el-table-column prop="rangeName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
        <el-table-column prop="clothingLevelName" label="服装层次" align="center"></el-table-column>
        <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
        <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
        <!-- <el-table-column prop="statue" label="状态" align="center"></el-table-column> -->
        <!-- <el-table-column prop="note" label="操作" align="center"></el-table-column> -->

        <el-table-column  fixed="right" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="inspectDetail(scope.row)" type="text" size="small">查看</el-button>

          </template>
        </el-table-column>

      </el-table>
      </div>
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
export default {
  data() {
    return {
      searchOptions: {
        tableDataA:[],
        searchParams: {
          customerName: "",
          brandName: "",
          clothingLevel: "",
          rangeName: "",
          predictPlanName:"",
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
        pageSizes: [2, 10, 20, 30, 50],
        pageSize: 2,
        total: 400,
      },
    }
  },
  created: function () {
    const that = this;
    console.log('进入一提交计划页面');

    //获取客户名称
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getCustomerName`)
      .then(response => {
        this.searchOptions.options.customerNameOptions = response.data;
      })
      .catch(error => {
        console.log("初始化获取客户名称失败");
      });

    //获取服装层次
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getClothingLevelName`)
      .then(response => {
        this.searchOptions.options.clothingLevelOptions = response.data;
      })
      .catch(error => {
        console.log("初始化获取服装层次失败");
      });

    //品牌名称选择获取
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`,{customerId:null})
      .then(response => {
         this.searchOptions.options.brandNameOptions = response.data;
      })
      .catch(error => {
        console.log("初始化品牌名称选择错误");
      });

    //默认获取计划列表
    var param ={
      customerId : null,
      brandId : null,
      rangeId: null,
      id : null,
      clothingLevelId : null,
      startDate : null,
      endDate : null,
    };
    this.$axios
      .get(`${window.$config.HOST}/planManagement/getPlanList`,{
        params: {
          stage: "predict"
        }
      })
      .then(response => {
        response.data.forEach(element=>{
          if(element.type === 1 && element.state === 2){
            this.tableData.push(element);
          }
        });
        this.pagination.total=response.data.length;
        let i = (this.pagination.currentPage-1) * this.pagination.pageSize;
        let k = (this.pagination.currentPage-1) * this.pagination.pageSize;
        this.tableDataA=[];
        
        for(;i-k<this.pagination.pageSize&&i<this.tableData.length;i++)
        {
          this.tableDataA.push(this.tableData[i]);
        }
      })
      .catch(error => {
        console.log("初始化计划列表获取错误");
        // this.tableData = [
        //   {
        //     id:"7946",
        //     number:"JH001",
        //     name:"系列A计划",
        //     rangeNumber:"XL20190101001",
        //     customerName:"Qi-Collection",
        //     brandName:"Selikie",
        //     clothingLevelName:"时装",
        //     rangeName:"Fall-2019(01/08/09)",
        //     createrName:"刘德华",
        //     deptName:"业务一组",
        //     state:"未制定"
        //   },
        //   {
        //     id:"4545",
        //     number:"JH002",
        //     name:"系列B计划",
        //     rangeNumber:"XL20190101001",
        //     customerName:"Qi-Collection",
        //     brandName:"Selikie",
        //     clothingLevelName:"时装",
        //     rangeName:"Fall-2019(01/08/09)",
        //     createrName:"刘德华",
        //     deptName:"业务二组",
        //     state:"未制定"
        //   }
        // ];
      });
  },
  methods: {
    // 改变日期格式
    changeDate(date) {
      if(!date){
        return "";
      }else{
        console.log(date);
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
    handleSearchClick(){
      var params = {
        customerId: (this.searchOptions.searchParams.customerName==="")?null:this.searchOptions.searchParams.customerName, 
        brandId: (this.searchOptions.searchParams.brandName==="")?null:this.searchOptions.searchParams.brandName, 
        id: (this.searchOptions.searchParams.predictPlanName==="")?null:this.searchOptions.searchParams.predictPlanName, 
        clothingLevelId :(this.searchOptions.searchParams.clothingLevelName==="")?null:this.searchOptions.searchParams.clothingLevelName, 
        startDate: this.changeDate(this.searchOptions.searchParams.dateRange[0]),
        endDate: this.changeDate(this.searchOptions.searchParams.dateRange[1]),
      };
      console.log(params);

      //获取计划列表
      this.$axios
        .get(`${window.$config.HOST}/infoManagement/getPlanList`,params)
        .then(response => {
          if(response.data.errcode < 0){
            console.log("计划列表获取错误");
            return ;
          }
          response.data.forEach(element=>{
            if(element.type === 1 && element.state === 2){
              this.tableData.push(element);
            }
          });
             this.pagination.total=response.data.length;
        let i = (this.pagination.currentPage-1) * this.pagination.pageSize;
        let k = (this.pagination.currentPage-1) * this.pagination.pageSize;
        this.tableDataA=[];
        
        for(;i-k<this.pagination.pageSize&&i<this.tableData.length;i++)
        {
          this.tableDataA.push(this.tableData[i]);
        }
        })
        .catch(error => {
          console.log("计划列表获取错误");
          this.tableData = [
            {
              id:"7946",
              number:"JH001",
              name:"系列A计划",
              rangeNumber:"XL20190101001",
              customerName:"Qi-Collection",
              brandName:"Selikie",
              clothingLevelName:"时装",
              rangeName:"Fall-2019(01/08/09)",
              createrName:"刘德华",
              deptName:"业务一组",
              state:"未制定"
            },
          ];
        });
    },
    inspectDetail(row){
      const that = this;
      that.$router.push({
        name: "planMakeIndex",
        params: {
          goback: "predictPlanMade",
          flag: 5,
          client: row.customerName,
          brand: row.brandName,
          series: row.rangeName,
          plantype: 1,
          planobj: row.rangeName
        }
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