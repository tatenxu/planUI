<template>
  <div class="body">
    <!-- 搜索条件设置 -->
    <el-card class="box-card">
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
        <el-col :span="8">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-select v-model="SeriesName" clearable placeholder="请选择">
              <el-option v-for="item in series" :key="item.id " :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
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
          </div>
        </el-col>

        <el-col :span="8">
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
        </el-col>
        <el-col :span="5" class="MinW" style="margin-left:30px">
          <!-- <el-radio v-model="checked" label="1">未制定</el-radio>
          <el-radio v-model="checked" label="2">已制定</el-radio>-->
          <el-switch
            v-model="checked"
            @change="planTypeSwitchChange"
            inactive-color="#13ce66"
            inactive-text="未制定"
            active-text="已制定"
          ></el-switch>

          <el-button type="primary" @click="searchStyleGroup" style="margin-left:50px">搜索</el-button>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col :span="15">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-input v-model="PlanName" clearable :rows="1" style="margin-left: 20px"></el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" @click="searchStyleGroup">搜索</el-button>
        </el-col>
      </el-row>-->
    </el-card>

    <!-- 搜索结果 -->
    <el-card class="box-card">
      <el-table :data="tableDataA" style="width: 100%; margin-top: 20px">
      <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="number" label="款式组编号" align="center"></el-table-column>
        <el-table-column prop="name" label="款式组名称" align="center" width="100px"></el-table-column>
        <el-table-column prop="rangeNumber" label="系列编号" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
        <el-table-column prop="clothingLevelName" label="服装层次" align="center"></el-table-column>
        <el-table-column prop="rangeName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
        <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
        <el-table-column prop="stateName" label="是否制定计划" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250" align="center" v-if="checked===false">
          <template slot-scope="scope">
            <el-button @click="QuoteSeriesPlan(scope.row)" type="text" size="small">引用系列计划</el-button>
            <el-button @click="ToPlanForm(scope.row)" type="text" size="small">制定计划</el-button>
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
export default {
  data() {
    return {
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40,50],
        pageSize: 10,
        total: 0
      },
      tableDataA:[],
      checked: 0,
      ClientName: "",
      BrandName: "",
      ClothesType: "",
      Date1: "",
      Date2: "",
      SeriesName: "",
      SeriesGroupName: "",
      PlanName: "",
      OrderId: "",

      seriesGroup: [],
      client: [],
      brand: [],
      type: [],
      series: [],
      tableData: [],
      DataStartTime: "",
      DataEndTime: ""
    };
  },

  created: function() {
    var that = this;
    //获得系列名称
    that.$axios
      .get(`${window.$config.HOST}/infoManagement/getRangeName`, {
        params: {
          brandId: ""
        }
      })
      .then(response => {
        this.series = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取系列名称失败",
          type: "error"
        });
      });
    //获得品牌名称
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`, {
        parmas: {
          customerId: ""
        }
      })
      .then(response => {
        this.brand = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取品牌名称失败",
          type: "error"
        });
      });

    //获得款式组名称
    that.$axios
      .get(`${window.$config.HOST}/infoManagement/getStyleGroupName`, {
        params: {
          rangeId: ""
        }
      })
      .then(response => {
        this.seriesGroup = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取款式组名称失败",
          type: "error"
        });
      });

    //获得客户名称
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getCustomerName`)
      .then(response => {
        this.client = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取客户名称失败",
          type: "error"
        });
      });

    //获得初始搜索结果
    that.$axios
      .post(`${window.$config.HOST}/infoManagement/getStyleGroupList`, {
        customerId: null,
        brandId: null,
        rangeId: null,
        clothingLevelId: null,
        id: null,
        startDate: null,
        endDate: null
      })
      .then(response => {
        console.log(response.data)
       
        response.data.forEach(element => {
  if (element.havePlan === true) element.stateName = "已制定";
            else if (element.havePlan === false) element.stateName = "未制定";
            if (element.havePredictPlan === true)
              element.predictState = "已预测";
            else if (element.havePredictPlan === false)
              element.predictState = "未预测";



          var d = new Date(element.createTime);
          let time = d.toLocaleString();
          element.createTime = time;
          if(element.havePlan===false) this.tableData.push(element);
        });



          this.pagination.total=this.tableData.length;
          let i = (this.pagination.currentPage-1) * this.pagination.pageSize;
          let k = (this.pagination.currentPage-1) * this.pagination.pageSize;
          this.tableDataA=[];
        
        for(;i-k<this.pagination.pageSize&&i<this.tableData.length;i++)
        {
          this.tableDataA.push(this.tableData[i]);
        }
      })
      .catch(error => {
        this.$message({
          message: "获取搜索结果失败",
          type: "error"
        });
      });
  },
  methods: {

        handleSizeChange(val) {
    
        this.pagination.pageSize=val;
        console.log("每页+"+this.pagination.pageSize)
        this.searchStyleGroup();
      },
      handleCurrentChange(val) {
        this.pagination.currentPage=val;
         this.searchStyleGroup();
      },
    planTypeSwitchChange() {
      console.log("ssssssssss=" + this.checked);
      const that = this;
      this.DataStartTime = that.changeDate(this.Date1[0]);
      this.DataEndTime = that.changeDate(this.Date1[1]);
      let list = {
        id: this.SeriesName === "" ? "" : this.SeriesName,
        customerId: this.ClientName === "" ? "" : this.ClientName,
        brandId: this.BrandName === "" ? "" : this.BrandName,
        clothingLevelId:
          this.clothingLevelId === "" ? "" : this.clothingLevelId,
        startDate: this.DataStartTime,
        endDate: this.DataEndTime
      };
      console.log(list);
      this.$axios
        .post(`${window.$config.HOST}/infoManagement/getStyleGroupList`, {
          id: this.SeriesName === "" ? null : this.SeriesName,
          customerId: this.ClientName === "" ? null : this.ClientName,
          brandId: this.BrandName === "" ? null : this.BrandName,
          clothingLevelId:this.clothingLevelId === "" ? null : this.clothingLevelId,
          startDate: this.DataStartTime,
          endDate: this.DataEndTime
        })
        .then(response => {
          console.log(response.data)
          var SearchList = response.data;
          this.tableData = [];
          SearchList.forEach(element => {
            console.log("这次havePlan的值为:" + element.havePlan);
            var d = new Date(element.createTime);
            if (element.havePlan === true) element.stateName = "已制定";
            else if (element.havePlan === false) element.stateName = "未制定";
            if (element.havePredictPlan === true)
              element.predictState = "已预测";
            else if (element.havePredictPlan === false)
              element.predictState = "未预测";
            var d = new Date(element.createTime);
            let time = d.toLocaleString();
            element.createTime = time;

            if (this.checked == false && element.havePlan === false) {
              this.tableData.push(element);
            } else if (this.checked == true && element.havePlan === true) {
              this.tableData.push(element);
            }


          });

                       this.pagination.total=this.tableData.length;
          let i = (this.pagination.currentPage-1) * this.pagination.pageSize;
          let k = (this.pagination.currentPage-1) * this.pagination.pageSize;
          this.tableDataA=[];
        
        for(;i-k<this.pagination.pageSize&&i<this.tableData.length;i++)
        {
          this.tableDataA.push(this.tableData[i]);
        }
        })
        .catch(error => {
          this.$message({
            message: "获取搜索结果失败",
            type: "error"
          });
        });
    },
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
    searchStyleGroup() {
      const that = this;
      this.DataStartTime = that.changeDate(this.Date1[0]);
      this.DataEndTime = that.changeDate(this.Date1[1]);

      this.$axios
        .post(`${window.$config.HOST}/infoManagement/getStyleGroupList`, {
          customerId: this.ClientName === "" ? null : this.ClientName,
          brandId: this.BrandName === "" ? null : this.BrandName,
          rangeId: this.SeriesName === "" ? null : this.SeriesName,
          clothingLevelId: null,
          id: this.SeriesGroupName === "" ? null : this.SeriesGroupName,
          startDate: this.DataStartTime,
          endDate: this.DataEndTime
        })
        .then(response => {
          console.log(response.data);
          console.log("checked=", this.checked);
          var SearchList = response.data;
          this.tableData = [];
          SearchList.forEach(element => {
            console.log("这次havePlan的值为:" + element.havePlan);
            var d = new Date(element.createTime);
             if (element.havePlan === true) element.stateName = "已制定";
            else if (element.havePlan === false) element.stateName = "未制定";
            if (element.havePredictPlan === true)
              element.predictState = "已预测";
            else if (element.havePredictPlan === false)
              element.predictState = "未预测";
    
            let time = d.toLocaleString();
            element.createTime = time;

            if (this.checked != 0) {
              if (this.checked == false && element.havePlan === false) {
                this.tableData.push(element);
              } else if (this.checked == true && element.havePlan === true) {
                this.tableData.push(element);
              }
            } else this.tableData.push(element);
          });

                       this.pagination.total=this.tableData.length;
          let i = (this.pagination.currentPage-1) * this.pagination.pageSize;
          let k = (this.pagination.currentPage-1) * this.pagination.pageSize;
          this.tableDataA=[];
        
        for(;i-k<this.pagination.pageSize&&i<this.tableData.length;i++)
        {
          this.tableDataA.push(this.tableData[i]);
        }
        })
        .catch(error => {
          var SearchList = [
            {
              id: 475342343,
              number: "KSZ201901sss01001",
              name: "款式1组",
              rangeId: 48674231,
              rangeNumber: "XL20190101001",
              rangeName: "Fall-2019(07/08/09)",
              customerId: 745341,
              customerName: "Qi-Collection",
              brandId: 574531423,
              brandName: "Selkie",
              clothingLevelId: 575123,
              clothingLevelName: "时装",
              createrName: "刘德华",
              deptName: "业务1组",
              createTime: "2019-01-01 10:15:01",
              state: "已下发",
              havePlan: 1
            },
            {
              id: 475342343,
              number: "KSZ20190101001",
              name: "款式1组",
              rangeId: 48674231,
              rangeNumber: "XL20190101001",
              rangeName: "Fall-2019(07/08/09)",
              customerId: 745341,
              customerName: "Qi-Collection",
              brandId: 574531423,
              brandName: "Selkie",
              clothingLevelId: 575123,
              clothingLevelName: "时装",
              createrName: "刘德华",
              deptName: "业务1组",
              createTime: "2019-01-01 10:15:01",
              state: "已下发",
              havePlan: 1
            }
          ];
          this.tableData = SearchList;
        });
    },
    ClearChanged(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    QuoteSeriesPlan(row) {
     const that  =  this;
      //获得品牌下拉框
      console.log(row.id)
      let list = {
        styleGroupId:row.id ,
         rangeId: row.rangeId
      }
      that.$axios
        .post(`${window.$config.HOST}/planManagement/quoteRangePlan`, list)
        .then(response => {
          console.log("repsonse="+response.data)
          let ok = response.data;
          if (ok > 0) {
            this.$message({
              message: "引用预测成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "引用预测失败",
              type: "warning"
            });
          }
        })
        .catch(error => {
            console.log("repsonse=")
          this.$message({
            message: "引用预测失败！",
            type: "error"
          });
        });
     
    },
    ToPlanForm(row) {

            if (row.havePlan === true) {
        this.$message({
          message: "该计划已经被制定",
          type: "warning"
        });
        return;
      }
      this.$router.push({
        name: "planMakeIndex",
        params: {
          flag: 2,
          goback: "styleGroupPlanMake",
          client: row.customerName,
          brand: row.brandName,
          series: row.rangeName,
          planType: 2,
          id: row.id,
          planObj: row.name,
          topPlan: 0,
          topPlanName: "根计划",
                    planName: "",
          projectType: "",
          number: "",
          dataStart: "",
          dataEnd: "",
          productDate: "",
          productDateType: "",
          productId: "",
          proposal: "",
          note: "",
          description: ""
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>


  .block {
    padding: 30px 0;
    text-align: center;
  }
.title {
  min-width: 100px;
}
.Mtitle {
  align-content: center;
  margin-left: 42%;
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