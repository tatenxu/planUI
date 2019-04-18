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
            <el-select v-model="searchOptions.searchParams.customerName" clearable @change="customerNameSelectionChange">
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
            <el-select v-model="searchOptions.searchParams.brandName"  clearable  @change="brandSelectionChange">
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
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column prop="planId" label="预测编号" align="center"></el-table-column>
          <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brand" label="品牌" align="center"></el-table-column>
          <el-table-column prop="planName" label="计划名称" align="center"></el-table-column>
          <el-table-column prop="seriesName" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="planObject" label="计划对象" align="center"></el-table-column>
          <el-table-column prop="projectType" label="项目类型" align="center"></el-table-column>
          <el-table-column prop="createPeople" label="创建人" align="center"></el-table-column>
          <el-table-column prop="deletePeople" label="删除人" align="center"></el-table-column>
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
const cityOptions = ["已制定", "未制定", "制定中"];
export default {
  name: "warehouseList",
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
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getCustomer`)
      .then(response => {
        console.log("getCustomer 成功");
        var resData = response.data;
        resData.forEach(element => {
          this.searchOptions.options.customerNameOptions.push({
            id: element.id,
            name: element.name,
          });
        });
      })
      .catch(error => {
        console.log("getCustomer error!");
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

      this.$axios
        .get(`${window.$config.HOST}/planManagement/getPlanList`)
        .then(response => {
          var SearchList = response;
          SearchList.forEach(element=>{
            //6 表示被删除
            if(element.state === 6){
              this.tableData.push({
                planId:element.id,
                customerName: element.customerName,
                brand: element.brandName,
                planName: element.planName,
                seriesName: element.rangeName,
                planObject: "",
                projectType: element.projectType,
                createPeople: element.createrName,
                deletePeople: "XX",
                deleteTime: "2019-3-28"
              });
            }
          });
          this.tableData = SearchList;
        })
        .catch(error => {
          var SearchList = [
            {
              planId: "JH190401001",
              customerName: "AFL",
              brand: "CX",
              planName: "2001系列计划",
              seriesName: "",
              planObject: "",
              projectType: "销样",
              createPeople: "XX",
              deletePeople: "XX",
              deleteTime: "2019-3-28"
            },
            {
              planId: "JH1904010012",
              customerName: "AFL",
              brand: "CX",
              planName: "2001系列计划",
              seriesName: "",
              planObject: "",
              projectType: "销样",
              createPeople: "XX",
              deletePeople: "XX",
              deleteTime: "2019-3-28"
            },
            {
              planId: "JH1904010013",
              customerName: "AFL",
              brand: "CX",
              planName: "2001系列计划",
              seriesName: "",
              planObject: "",
              projectType: "销样",
              createPeople: "XX",
              deletePeople: "XX",
              deleteTime: "2019-3-28"
            },
            {
              planId: "JH1904010014",
              customerName: "AFL",
              brand: "CX",
              planName: "2001系列计划",
              seriesName: "",
              planObject: "",
              projectType: "销样",
              createPeople: "XX",
              deletePeople: "XX",
              deleteTime: "2019-3-28"
            },
            {
              planId: "JH1904010015",
              customerName: "AFL",
              brand: "CX",
              planName: "2001系列计划",
              seriesName: "",
              planObject: "",
              projectType: "销样",
              createPeople: "XX",
              deletePeople: "XX",
              deleteTime: "2019-3-28"
            }
          ];
          this.tableData = SearchList;
        });
  },
  methods: {
    //客户名称选择后触发品牌的get请求
    customerNameSelectionChange(){
      // consol.log(val);
      console.log("客户名称选择触发");
      console.log(this.searchOptions.searchParams.customerName);
      var param = {
        customerId: this.searchOptions.searchParams.customerName,
      };
      this.$axios
        .get(`${window.$config.HOST}/infoManagement/getBrand`,param)
        .then(response => {
          if(response.data.errcode < 0){
            console.log("客户名称选择错误");
          }
        })
        .catch(error => {
          console.log("客户名称选择错误");
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
        })
    },
    //品牌名称选择后触发请求
    brandSelectionChange(){
      console.log("品牌名称选择触发");
      console.log(this.searchOptions.searchParams.brandName);
      var param = {
        brandId: this.searchOptions.searchParams.brandName,
      };
      this.$axios
        .get(`${window.$config.HOST}/infoManagement/getRange`,param)
        .then(response => {
          if(response.data.errcode < 0){
            console.log("品牌名称选择错误");
          }
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
        })
    },
    //恢复所有选择的按钮
    ReCoverAll() {
      this.tableSelectionData.forEach(element=>{
        this.ReCover(element);
      });
    },
    // 恢复单个的按钮
    ReCover(row) {
      console.log("行恢复");
      var params = {id: row.planId};
      console.log(row);
       this.$axios
        .post(`${window.$config.HOST}/planManagement/restorePlan`,params)
        .then(response=>{
          var resData = response.data;
          if(resData.errcode < 0 ){
            this.tableData.forEach(element=>{
              if(element.planId === row.planId){
                var idx = this.tableData.indexOf(element);
                this.tableData.splice(idx,1);
              }
            });
            this.$message.error(row.planId+"恢复失败！");
          }else{
            this.$message({
              type: 'success',
              message: "恢复成功！"
            })
          }
        })
        .catch(error=>{
          this.$message.error(row.planId+"恢复失败！");
        })
    },
    tableSelectionChange(val) {
      this.tableSelectionData = val;
    },
    //搜索按钮
    handleSearchClick(){
      var params;
      params = {
        customerId: this.searchOptions.searchParams.customerName,
        brandId: this.searchOptions.searchParams.brandName,
        rangeId: this.searchOptions.searchParams.rangeName,
        createTime: this.searchOptions.searchParams.dateRange,
      };
      console.log(params);

        this.$axios
            .post(`${window.$config.HOST}/planManagement/getDeletedPlan`,params)
            .then(response => {
              var SearchList = response;
              this.tableData = SearchList;
            })
            .catch(error => {
              var SearchList = [
                {
                  planId: "JH190401001",
                  customerName: "AFL",
                  brand: "CX",
                  planName: "2001系列计划",
                  seriesName: "",
                  planObject: "",
                  projectType: "销样",
                  createPeople: "XX",
                  deletePeople: "XX",
                  deleteTime: "2019-3-28"
                },
                {
                  planId: "JH1904010012",
                  customerName: "AFL",
                  brand: "CX",
                  planName: "2001系列计划",
                  seriesName: "",
                  planObject: "",
                  projectType: "销样",
                  createPeople: "XX",
                  deletePeople: "XX",
                  deleteTime: "2019-3-28"
                },
                {
                  planId: "JH1904010013",
                  customerName: "AFL",
                  brand: "CX",
                  planName: "2001系列计划",
                  seriesName: "",
                  planObject: "",
                  projectType: "销样",
                  createPeople: "XX",
                  deletePeople: "XX",
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