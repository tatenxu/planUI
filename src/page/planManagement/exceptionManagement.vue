<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:15px ; margin-bottom:15px">
        <el-col :span="8">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">客户名称：</span>
            <el-select v-model="searchOptions.searchParams.customerName" clearable :disabled="searchDisabled">
              <el-option
                v-for="item in searchOptions.options.customerNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">品牌：</span>
            <el-select v-model="searchOptions.searchParams.brandName"  clearable :disabled="searchDisabled">
              <el-option
                v-for="item in searchOptions.options.brandNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">系列名称</span>
            <el-select v-model="searchOptions.searchParams.rangeName" :disabled="searchDisabled">
              <el-option
                v-for="item in searchOptions.options.rangeNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:25px">
        <el-col :span="10">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">新建时间：</span>
            <el-date-picker
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              :disabled="searchDisabled"
            ></el-date-picker>
          </div>
        </el-col>

        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="handleSearchClick">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50px"></el-table-column>
          <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
          <el-table-column prop="excId" v-if="false"></el-table-column>
          <el-table-column prop="excNumber" label="异常编号" width="100px" align="center"></el-table-column>
          <el-table-column prop="planNumber" label="计划编号" width="100px" align="center"></el-table-column>
          <el-table-column prop="customerName" label="客户" width="100px" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" width="100px" align="center"></el-table-column>
          <el-table-column prop="planName" label="计划名称" width="100px" align="center"></el-table-column>
          <el-table-column prop="rangeName" label="系列名称" width="100px" align="center"></el-table-column>
          <el-table-column prop="planObject" label="计划对象" width="100px" align="center"></el-table-column>
          <el-table-column prop="excContent" label="异常内容" width="100px" align="center"></el-table-column>
          <el-table-column prop="createrName" label="创建人" width="100px" align="center"></el-table-column>
          <el-table-column prop="createDate" label="创建时间" width="100px" align="center" show-overflow-tooltip></el-table-column>
            <!-- <template slot-scope="scope">{{ scope.row.createDate }}</template> -->
        </el-table>
      </div>
    </el-card>
  </div>
</template>


<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
    .inputCombineDiv {
      display: flex;
      flex-direction: row;
      .inputTag {
        min-width: 70px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
      }
      .inputTag1 {
        margin-left: 10px;
        margin-right: 10px;
        width: 18px;
        font-size: 18px;
      }
    }
  }
}

.cardBelow {
  margin-top: 10px;
}

.bg-purple {
  // background: #d3dce6;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>

<script>
export default {
  data() {
    return {
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
      tableData: [],
      multipleSelection: [],
      searchDisabled: false,
    };
  },

  created: function () {
    const that = this;
    console.log('进入异常管理页面');

    //客户名称加载
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getCustomer`)
      .then(response => {
        console.log("getCustomer 成功");
        var resData = response.data;
        resData.forEach(element => {
          this.searchOptions.options.customerNameOptions.push({
            value:element.id,
            label:element.name,
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

    //品牌名称加载
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getBrand`)
      .then(response => {
        if(response.data.errcode < 0){
          console.log("品牌加载失败");
        }
      })
      .catch(error => {
        console.log("品牌加载失败");
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
      .get(`${window.$config.HOST}/infoManagement/getRange`)
      .then(response => {
        if(response.data.errcode < 0){
          console.log("系列名称加载失败");
        }
      })
      .catch(error => {
        console.log("系列名称加载失败");
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

    //加载默认所有的异常计划
    this.$axios
      .get(`${window.$config.HOST}/planManagement/getPlanList`)
      .then(response => {
        var resData = response.data;
        if(resData.errcode < 0){
          this.$methods.error("加载异常信息失败");
        }
        resData.forEach(element=>{
          this.tableData.push({
            excId :element.id,
            excNumber: element.number,
            planNumber: element.planNumber,
            customerName: element.customerName,
            brandName: element.brandName,
            planName: element.planName,
            rangeName: element.rangeName,
            planObject: element.planObject,
            excContent: element.cause,
            createrName: element.createrName,
            createDate: element.createDate
          });
        });
        
      })
      .catch(error => {
        var SearchList = [
          {
            excId :5674,
            excNumber: "7878787",
            planNumber: "45345",
            customerName: "nike",
            brandName: "耐克",
            planName: "计划1",
            rangeName: "系列1",
            planObject: "大明",
            excContent: "死机",
            createrName: "王小虎",
            createDate: "2016-10-16"
          },
          {
            excId :56754,
            excNumber: "312",
            planNumber: "5335",
            customerName: "add",
            brandName: "阿迪",
            planName: "计划2",
            rangeName: "系列1",
            planObject: "大明",
            excContent: "死机",
            createrName: "王小虎",
            createDate: "2016-10-16"
          },
          {
            excId :564514,
            excNumber: "8678",
            planNumber: "45343",
            customerName: "nb",
            brandName: "nb",
            planName: "计划6",
            rangeName: "系列5",
            planObject: "大明",
            excContent: "死机",
            createrName: "王小虎",
            createDate: "2016-10-16"
          }
        ];
        this.tableData = SearchList;
      });
  },
  mounted(){
    let routData = this.$route.params;
    console.log("路由参数:"+Object.keys(routData).length);
    if(Object.keys(routData).length){
      this.searchOptions.searchParams.customerName = routData.customerName;
      this.searchOptions.searchParams.brandName = routData.brandName;
      this.searchOptions.searchParams.rangeName = routData.rangeName;
      this.searchDisabled = true;

      var params;
      params = {
        customerId: routData.customerId,
        brandId: routData.customerId,
        rangeId: routData.customerId,
      };
      console.log(params);

      this.$axios
        .post(`${window.$config.HOST}/planManagement/getException`,params)
        .then(response => {
          var resData = response.data;
          if(resData.errcode < 0){
            this.$methods.error("加载异常信息失败");
          }
          resData.forEach(element=>{
            this.tableData.push({
              excId :element.id,
              excNumber: element.number,
              planNumber: element.planNumber,
              customerName: element.customerName,
              brandName: element.brandName,
              planName: element.planName,
              rangeName: element.rangeName,
              planObject: element.planObject,
              excContent: element.cause,
              createrName: element.createrName,
              createDate: element.createDate
            });
          });
        })
        .catch(error => {
          var SearchList = [
            {
              excId:"7458756415",
              excNumber: "7878787",
              planNumber: "45345",
              customerName: "nike",
              brandName: "耐克",
              planName: "计划1",
              rangeName: "系列1",
              planObject: "大明",
              excContent: "死机",
              createrName: "王小虎",
              createDate: "2016-10-16"
            },
          ];
          this.tableData = SearchList;
        });
    }

    
  },
  methods: {
    //搜索按钮
    handleSearchClick(){
      var params;
      params = {
        customerId: this.searchOptions.searchParams.customerName,
        brandId: this.searchOptions.searchParams.brandName,
        rangeId: this.searchOptions.searchParams.rangeName,
        createDate: this.searchOptions.searchParams.dateRange,
      };
      console.log(params);

      this.$axios
        .post(`${window.$config.HOST}/planManagement/getException`,params)
        .then(response => {
          var resData = response.data;
          if(resData.errcode < 0){
            this.$methods.error("加载异常信息失败");
          }
          resData.forEach(element=>{
            this.tableData.push({
              excId :element.id,
              excNumber: element.number,
              planNumber: element.planNumber,
              customerName: element.customerName,
              brandName: element.brandName,
              planName: element.planName,
              rangeName: element.rangeName,
              planObject: element.planObject,
              excContent: element.cause,
              createrName: element.createrName,
              createDate: element.createDate
            });
          });
        })
        .catch(error => {
          var SearchList = [
            {
              excId:"7458756415",
              excNumber: "7878787",
              planNumber: "45345",
              customerName: "nike",
              brandName: "耐克",
              planName: "计划1",
              rangeName: "系列1",
              planObject: "大明",
              excContent: "死机",
              createrName: "王小虎",
              createDate: "2016-10-16"
            },
            {
              excId:"87351456",
              excNumber: "312",
              planNumber: "5335",
              customerName: "add",
              brandName: "阿迪",
              planName: "计划2",
              rangeName: "系列1",
              planObject: "大明",
              excContent: "死机",
              createrName: "王小虎",
              createDate: "2016-10-16"
            },
          ];
          this.tableData = SearchList;
        });
    },
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>