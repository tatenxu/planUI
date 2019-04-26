<template>
  <div class="body">
    <el-card class="box-card">
      <!--表格 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="ClientName" clearable placeholder="请选择">
              <el-option v-for="item in client" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="BrandName" clearable placeholder="请选择">
              <el-option v-for="item in brand" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- <el-col :span="8">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="ClothesType" clearable placeholder="请选择">
              <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
        <el-row :gutter="20">-->
        <el-col :span="8">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              style="margin-left:20px "
              v-model="Date1"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <!-- <el-date-picker
              v-model="Date1"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期"
              clearable
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">至</div>
            <el-date-picker
              v-model="Date2"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期"
              clearable
            ></el-date-picker>-->
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-select v-model="SeriesName" clearable placeholder="请选择">
              <el-option v-for="item in series" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- <el-col :span="8">
          <div class="bar">
            <div class="title">款式组名称</div>
            <el-select v-model="SeriesGroupName" clearable placeholder="请选择">
              <el-option
                v-for="item in seriesGroup"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col> -->
         <el-col :span="8">
          <div class="bar">
            <div class="title">订单款号</div>
            <!-- <el-input v-model="OrderId" clearable :rows="1" style="margin-left: 20px"></el-input> -->
            <el-select v-model="OrderId">
              <el-option
                v-for="item in orderOption"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
         </el-col>
        <el-col :span="5" class="MinW" style="margin-left:30px">
          <el-radio v-model="checked" label="1">未制定</el-radio>
          <el-radio v-model="checked" label="2">已制定</el-radio>
           <el-button type="primary" @click="SearchIt()" style="margin-left:50px">搜索</el-button>
          <!-- <el-radio v-model="checked" label="3">未完成</el-radio>
          <el-radio v-model="checked" label="4">已完成</el-radio>-->
        </el-col>
      </el-row>
      <!-- </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-input v-model="PlanName" clearable :rows="1" style="margin-left: 20px"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">订单款号</div>
            <el-input v-model="OrderId" clearable :rows="1" style="margin-left: 20px"></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="SearchIt()">搜索</el-button>
        </el-col>
      </el-row> -->
    </el-card>

    <!-- 搜索结果 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%; margin-top: 20px">
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="styleGroupNumber" label="款式组编号" align="center" width="100px"></el-table-column>
        <el-table-column prop="styleGroupName" label="款式组名称" align="center" width="100px"></el-table-column>
        <el-table-column prop="number" label="订单款号" align="center"></el-table-column>
        <el-table-column prop="rangeNumber" label="系列编号" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
        <el-table-column prop="clothingLevelName" label="服装层次" align="center"></el-table-column>
        <el-table-column prop="rangeName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
        <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="ToPlanForm(scope.row)" type="text" size="small">制定计划</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: "0",
      // checked1: false,
      // checked2: false,
      // checked3: false,
      // checked4: false,
      DataStartTime: "",
      DataEndTime: "",
      ClientName: "",
      BrandName: "",
      ClothesType: "",
      Date1: "",
      Date2: "",
      SeriesName: "",
      SeriesGroupName: "",
      PlanName: "",
      OrderId: "",
      orderOption:[],
      seriesGroup: [],
      client: [],
      brand: [],
      type: [],
      series: [],
      tableData: [],

      barCode: "",
      qualityTestRecordDetail: [
        {
          materialCode: "",
          unit: "",
          qualityTestQuantity: "",
          qualityTestMethod: "",
          qualityTestStandard: "",
          entryQuantity: "",
          returnQuantity: "",
          reason: "",
          result: ""
        }
      ],
      multipleSelection: [],
      controlData: {
        // isAllMaterialGetTestFlag: 0,
        isFromPlan: false,
        isFromTest: false,
        selectDataLength: 0
      }
    };
  },

  created: function() {
    var that = this;
    //获得款式组名称
    that.$axios
      .get(`${window.$config.HOST}/InfoManagement/getStyleGroupName`,
      {
        rangeId:NaN
      })
      .then(response => {
        this.seriesGroup = response;
      })
      .catch(error => {
        var ClothingList = [
          {
            id: 1,
            name: "款式组A"
          },
          {
            id: 2,
            name: "款式组B"
          },
          {
            id: 3,
            name: "款式组C"
          }
        ];
        this.seriesGroup = ClothingList;
      });

    //得到系列名称
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getRangeName`,
      {
        brandId:NaN
      })
      .then(response => {
        this.series = response;
      })
      .catch(error => {
        this.series = [
          {
            id: 1,
            name: "A系列"
          },
          {
            id: 2,
            name: "B系列"
          }
        ];
      });
    //得到品牌名称
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`,
      {
        customerId:NaN
      })
      .then(response => {
        this.brand = response;
      })
      .catch(error => {
        this.brand = [
          {
            id: 1,
            name: "X品牌"
          },
          {
            id: 2,
            name: "Y品牌"
          }
        ];
      });
    //得到客户名称
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getCustomerName`)
      .then(response => {
        var client = response;
      })
      .catch(error => {
        var CustomerList = [
          {
            id: 1,
            name: "顾客A"
          },
          {
            id: 2,
            name: "顾客B"
          },
          {
            id: 3,
            name: "顾客C"
          }
        ];
        this.client = CustomerList;
      });

    //得到搜索信息
    this.$axios
      .get(`${window.$config.HOST}/InfoManagement/getStyleList`,
      {
        customerId:NaN, brandId:NaN, rangeId:NaN, number:NaN, clothingLevelId:NaN, startDate:NaN, endDate:NaN
      })
      .then(response => {
        this.tableData = response;
      })
      .catch(error => {
        var SearchList = [
          {
            rangeId: 1,
            rangeNumber: "XL20190101001",
            rangeName: "Fall-2019(07/08/09)",
            styleGroupId: 213213,
            styleGroupNumber: "KSZ20190101001",
            styleGroupName: "款式1组",
            id: 321321321,
            number: "1242142131",
            customerId: 321321321,
            customerName: "Qi-Collection",
            brandId: 42132131,
            brandName: "Selkie",
            clothingLevelId: 321321,
            clothingLevelName: "时装",
            createrName: "刘德华",
            deptName: "业务1组",
            createTime: "2019-01-01 10:15:01",
            addingMode: "手动",
            state: "已绑定",
            havePlan: false
          },
          {
            rangeId: 1,
            rangeNumber: "XL20190101001",
            rangeName: "Fall-2019(07/08/09)",
            styleGroupId: 213213,
            styleGroupNumber: "KSZ20190101001",
            styleGroupName: "款式1组",
            id: 321321321,
            number: "1242142131",
            customerId: 321321321,
            customerName: "Qi-Collection",
            brandId: 42132131,
            brandName: "Selkie",
            clothingLevelId: 321321,
            clothingLevelName: "时装",
            createrName: "刘德华",
            deptName: "业务1组",
            createTime: "2019-01-01 10:15:01",
            addingMode: "手动",
            state: "已绑定",
            havePlan: false
          }
        ];
        this.tableData = SearchList;
      });
  },
  methods: {
    //改变日期格式
    changeDate(date) {
      console.log(date);
      if (!date) {
        return NaN;
      } else {
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
    SearchIt() {
      const that = this;
      this.DataStartTime = that.changeDate(this.Date1[0]);
      this.DataEndTime = that.changeDate(this.Date1[1]);
      this.$axios
        .get(`${window.$config.HOST}/InfoManagement/getStyleList`, {
          params: {
            customerId: this.ClientName===""?NaN:this.ClientName,
            brandId: this.BrandName===""?NaN:this.BrandName,
            rangeId: this.SeriesName===""?NaN:this.SeriesName,
            number: this.OrderId===""?NaN:this.OrderId,
            clothingLevelId: NaN,
            startDate: this.DataStartTime,
            endDate: this.DataEndTime
          }
        })
        .then(response => {
          this.tableData = response;
        })
        .catch(error => {
          var SearchList = [
            {
              rangeId: 1,
              rangeNumber: "XL201sssss90101001",
              rangeName: "Fall-2019(07/08/09)",
              styleGroupId: 213213,
              styleGroupNumber: "KSZ20190101001",
              styleGroupName: "款式1组",
              id: 321321321,
              number: "1242142131",
              customerId: 321321321,
              customerName: "Qi-Collection",
              brandId: 42132131,
              brandName: "Selkie",
              clothingLevelId: 321321,
              clothingLevelName: "时装",
              createrName: "刘德华",
              deptName: "业务1组",
              createTime: "2019-01-01 10:15:01",
              addingMode: "手动",
              state: "已绑定",
              havePlan: false
            },
            {
              rangeId: 1,
              rangeNumber: "XL20190101001",
              rangeName: "Fall-2019(07/08/09)",
              styleGroupId: 213213,
              styleGroupNumber: "KSZ20190101001",
              styleGroupName: "款式1组",
              id: 321321321,
              number: "1242142131",
              customerId: 321321321,
              customerName: "Qi-Collection",
              brandId: 42132131,
              brandName: "Selkie",
              clothingLevelId: 321321,
              clothingLevelName: "时装",
              createrName: "刘德华",
              deptName: "业务1组",
              createTime: "2019-01-01 10:15:01",
              addingMode: "手动",
              state: "已绑定",
              havePlan: false
            }
          ];
          this.tableData = SearchList;
        });
    },
    ToPlanForm(row) {
      this.$router.push({
        name: "planMakeIndex",
        params: {
          flag: 3,
          goback: "stylePlanMake",
          client: row.ClientName,
          brand: row.BrandName,
          series: row.SeriesName,
          plantype: 3,
          planobj: row.OrderId
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.Mtitle {
  align-content: center;
  margin-left: 43%;
  font-size: 2ch;
}
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .el-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    .MinW {
      min-width: 400px;
    }
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 14px;
        width: 90px;
        min-width: 100px;
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
}
</style>