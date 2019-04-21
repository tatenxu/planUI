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
            <el-select v-model="searchOptions.searchParams.rangeName" clearable >
              <el-option
                v-for="item in searchOptions.options.rangeNameOptions"
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
            <div class="title">计划名称</div>
            <el-select v-model="searchOptions.searchParams.planName">
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
      <el-table :data="tableData" max-height="550"  style="width : 100%">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <!-- <el-table-column v-if="false" prop="id" align="center"></el-table-column> -->
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="forecastedId" label="预测编号" align="center"></el-table-column>
        <el-table-column prop="planName" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="seriesNumber" label="系列编号" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="brand" label="品牌" align="center"></el-table-column>
        <el-table-column prop="clothesType" label="服装层次" align="center"></el-table-column>
        <el-table-column prop="seriesName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="addPeople" label="添加人" align="center"></el-table-column>
        <el-table-column prop="department" label="部门" align="center"></el-table-column>
        <!-- <el-table-column prop="statue" label="状态" align="center"></el-table-column> -->
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
const cityOptions = ['已制定', '未制定', '制定中'];
export default {
  name: "warehouseList",
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      
      searchOptions: {
        searchParams: {
          customerName: "",
          brandName: "",
          clothingLevel: "",
          rangeName: "",
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
      .get(`${window.$config.HOST}/infoManagement/getCustomer`)
      .then(response => {
        console.log("getCustomer 成功");
        var resData = response.data;
        resData.forEach(element => {
          this.searchOptions.options.customerNameOptions.push({
            id:element.id,
            name:element.name,
          });
          this.options.customerNameOptions = this.searchOptions.options.customerNameOptions;
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

    //获取服装层次
    that.$axios
      .get(`${window.$config.HOST}/InfoManagement/getClothingLevel`)
      .then(response => {
        var ClothingList = response;
        this.searchOptions.options.clothingLevelOptions = ClothingList;
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
      .get(`${window.$config.HOST}/infoManagement/getBrand`)
      .then(response => {
        if(response.data.errcode < 0){
          console.log("品牌名称选择错误");
        }else{
          response.data.forEach(element=>{
            this.searchOptions.options.brandNameOptions.push({
              id: element.id,
              name: element.name
            });
          });
        }
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

    //默认获取计划列表
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getPlanList`)
      .then(response => {
        if(response.data.errcode < 0){
          console.log("计划列表获取错误");
        }else{
          response.data.forEach(element=>{
            this.tableData.push({
              id: element.id,
              planNumber: element.number,
              planName: element.name,
              rangeNumber: element.rangeNumber,
              customerName: element.customerName,
              brandName: element.brandName,
              rangeName: element.rangeName,
              createrName: element.createrName,
              deptName: element.deptName,
              date: element.createTime,
              parentId: element.parentId,
              state: element.state,
              exception: element.haveException
            });

            //给搜索选择中的计划名称赋值
            this.searchOptions.options.planNameOptions.push({
              id: element.id,
              name:element.name
            });
          });
        }
      })
      .catch(error => {
        console.log("计划列表获取错误");
        this.tableData = [
          {
            id:"1",
            forecastedId:"JH001",
            planName:"系列A计划",
            seriesNumber:"XL20190101001",
            customerName:"Qi-Collection",
            brand:"Selikie",
            clothesType:"时装",
            seriesName:"Fall-2019(01/08/09)",
            addPeople:"刘德华",
            department:"业务一组",
            statue:"未制定"
          }
        ];
        this.searchOptions.options.planNameOptions = [
          {
            id: 475,
            name: "计划1",
          },
          {
            id: 753,
            name: "计划2",
          },
          {
            id: 986,
            name: "计划3",
          }
        ];
      });
  },
  methods: {
    makePredict(row){
      const that = this;
      that.$router.push({
        path: `/planMake/planMakeIndex`,
      })
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleDelete(index, row) {
      this.$confirm('这将删除该仓库下所有记录信息，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let sendData = {"id": row.id};
        this.$axios
          .post(`${window.$config.HOST}/warehouse/base/deleteWarehouse`, sendData)
          .then(response => {
            if (response.data > 0) {
              this.$message({
              type: 'success',
              message: '删除成功'
              });
              this.tableData.splice(index, 1);
            } else {
              this.$message({
                type: 'info',
                message: '未在数据库中查到此记录对应信息！'
              })
            }
          })
          .catch(error => {
            console.log(error);
            this.$message({
              type: 'info',
              message: '非法操作！'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        });
      });
    },
  },
  getUnmadedPlanList(){
    return ;
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