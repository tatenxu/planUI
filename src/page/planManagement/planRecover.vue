<template>
  <div class="body">
    <el-card class="box-card">
      <!-- <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 5px;">
        <el-col :offset="0" :span="2">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="ReCover">恢复</el-button>
          </div>
        </el-col>
        <el-col :offset="0" :span="2">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="getWareList">刷新</el-button>
          </div>
        </el-col>
      </el-row>-->

      <el-row :gutter="20" style="margin-top: 15px; margin-bottom: 5px;">
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

        <el-col :span="6" :offset="4">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="searchOptions.searchParams.brandName"  clearable>
              <el-option
                v-for="item in searchOptions.options.brandNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 25px; margin-bottom: 5px;">
        <el-col :span="10">
          <div class="bar">
            <div class="title">新建时间</div>
            <el-date-picker
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-select v-model="searchOptions.searchParams.rangeName" >
              <el-option
                v-for="item in searchOptions.options.rangeNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :offset="0" :span="2">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="handleSearchClick">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-button type="primary" style="margin-right:20px" @click="ReCoverAll">恢复所选计划</el-button>
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
          <el-table-column prop="createrName" label="删除人" align="center"></el-table-column>
          <el-table-column prop="deleteTime" label="删除时间" align="center"></el-table-column>

          <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="ReCover( scope.row)">恢复</el-button>
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
      tableData: [ ],
      searchOptions:{
        searchParams :{
          customerName: "",
          brandName: "",
          rangeName: "",
          dateRange: "", 
        },
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          rangeNameOptions: [],
        }
      },
      
      pagination: {
        currentPage: 1,
        pageSizes: [5, 10, 20, 30, 50],
        pageSize: 5,
        total: 400
      },
      pages: 0,
      tableSelectionData: []
    };
  },
  created: function () {
    const that = this;
    console.log('进入计划回收站页面');
    //加载客户名称
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getCustomerName`)
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

    //加载品牌名称
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`,{customerId:NaN})
      .then(response => {
        this.searchOptions.options.brandNameOptions = response.data;
      })
      .catch(error => {
        console.log("品牌名称加载错误");
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
        this.searchOptions.options.rangeNameOptions = response.data;
      })
      .catch(error => {
        console.log("品牌名称选择错误");
        this.searchOptions.options.rangeNameOptions = [
          {
            id: 1,
            name: "Fall-2019(07/08/09)"
          },
          {
            id: 2,
            name: "Spring-2019(01/02/03)"
          },
          {
            id: 3,
            name: "Winter-2019(10/11/12)"
          },
        ];
      });
    //加载删除的计划
    var param ={
      customerId : NaN,
      brandId : NaN,
      rangeId: NaN,
      id : NaN,
      clothingLevelId : NaN,
      startDate : NaN,
      endDate : NaN,
    };
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getPlanList`,param)
      .then(response => {
        response.data.forEach(element=>{
          if(element.state === '6'){
            this.tableData.push(element);
          }
        });
      })
      .catch(error => {
        var SearchList = [
          {
            id:"4234234",
            number: "JH190401001",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "",
            planObject: "",
            type: "销样",
            createrName: "XX",
            createrName: "XX",
            deleteTime: "2019-3-28"
          },
          {
            id:"57657",
            number: "JH1904010012",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "",
            planObject: "",
            type: "销样",
            createrName: "XX",
            createrName: "XX",
            deleteTime: "2019-3-28"
          },
          {
            id:"657567",
            number: "JH1904010013",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "",
            planObject: "",
            type: "销样",
            createrName: "XX",
            createrName: "XX",
            deleteTime: "2019-3-28"
          },
          {
            id:"2345",
            number: "JH1904010014",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "",
            planObject: "",
            type: "销样",
            createrName: "XX",
            createrName: "XX",
            deleteTime: "2019-3-28"
          },
          {
            id:"34626",
            number: "JH1904010015",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "",
            planObject: "",
            type: "销样",
            createrName: "XX",
            createrName: "XX",
            deleteTime: "2019-3-28"
          }
        ];
        this.tableData = SearchList;
      });
  },
  methods: {
    //恢复所有选择的按钮
    ReCoverAll() {
      if(this.tableSelectionData.length === 0){
        this.$message.error("请选择要恢复的计划!")
      }else{
        this.tableSelectionData.forEach(element=>{
          console.log("恢复"+element.name);
          this.ReCover(element);
        });
      } 
    },
    // 恢复单个的按钮
    ReCover(row) {
      console.log("行恢复");
      var params = {id: row.id};
      console.log(row);
       this.$axios
        .post(`${window.$config.HOST}/planManagement/restorePlan`,params)
        .then(response=>{
          var resData = response.data;
          if(resData < 0 ){
            this.$message.error(row.number+"恢复失败！");
          }else{
            this.$message({
              type: 'success',
              message: "恢复成功！"
            });
            this.tableData.forEach(element=>{
              if(element.number === row.number){
                var idx = this.tableData.indexOf(element);
                this.tableData.splice(idx,1);
              }
            });
          }
        })
        .catch(error=>{
          this.$message.error(row.number+"恢复失败！");
        })
    },
    tableSelectionChange(val) {
      this.tableSelectionData = val;
    },
    // 改变日期格式
    changeDate(date) {
      if(!date){
        return NaN;
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
    //搜索按钮
    handleSearchClick(){
      var params;
      params = {
        customerId : (this.searchOptions.searchParams.customerName==="")?NaN:this.searchOptions.searchParams.customerName,
        brandId : (this.searchOptions.searchParams.brandName==="")?NaN:this.searchOptions.searchParams.brandName,
        rangeId: (this.searchOptions.searchParams.rangeName==="")?NaN:this.searchOptions.searchParams.rangeName,
        id : NaN,
        clothingLevelId : NaN,
        startDate: this.changeDate(this.searchOptions.searchParams.dateRange[0]),
        endDate: this.changeDate(this.searchOptions.searchParams.dateRange[1]),      
      };
      console.log(params);

      this.$axios
        .get(`${window.$config.HOST}/planManagement/getPlanList`,params)
        .then(response => {
          this.tableData = [];
          response.data.forEach(element=>{
            if(element.state === '6'){
              this.tableData.push(element);
            }
          })
        })
        .catch(error => {
          var SearchList = [
            {
              number: "JH190401001",
              customerName: "AFL",
              brandName: "CX",
              name: "2001系列计划",
              rangeName: "",
              planObject: "",
              type: "销样",
              createrName: "XX",
              createrName: "XX",
              deleteTime: "2019-3-28"
            },
            {
              number: "JH1904010012",
              customerName: "AFL",
              brandName: "CX",
              name: "2001系列计划",
              rangeName: "",
              planObject: "",
              type: "销样",
              createrName: "XX",
              createrName: "XX",
              deleteTime: "2019-3-28"
            },
            {
              number: "JH1904010013",
              customerName: "AFL",
              brandName: "CX",
              name: "2001系列计划",
              rangeName: "",
              planObject: "",
              type: "销样",
              createrName: "XX",
              createrName: "XX",
              deleteTime: "2019-3-28"
            },
          ];
          this.tableData = SearchList;
        });
    },
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