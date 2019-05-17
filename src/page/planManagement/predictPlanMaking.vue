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
            <el-select v-model="searchOptions.searchParams.name">
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
      <div><el-button type="primary" @click="submitPredictPlan">提交预测计划</el-button></div>
      <div>
        <el-table :data="tableData" max-height="550"  style="width : 100%" :stripe="true" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column width="50" type="index" label="序号" align="center">></el-table-column>
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

          <el-table-column  fixed="right" width="200" align="center">
            <template slot-scope="scope">
              <el-button @click="toPlanDetail(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="editPredictPlan(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="deletePredictPlan(scope.row)" type="text" size="small">删除</el-button>
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
      selectedTableData:[],
      // checked: true,
      pages: 0,
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
    console.log('进入未提交计划页面');

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
        console.log("初始化获取服装层次名称失败");
      });

    //品牌名称选择获取
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`)
      .then(response => {
         this.searchOptions.options.brandNameOptions = response.data;
      })
      .catch(error => {
        console.log("初始化获取品牌名称失败");
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
        params:{
          stage:"predict"
        }
      })
      .then(response => {
        response.data.forEach(element=>{
          if(element.type === 1 && element.state === 1){
            this.totalTableData.push(element);
          }

          this.pagination.total = this.totalTableData.length;
          // this.pagination.currentPage = 1;
          var pageEleStart = (this.pagination.currentPage-1)*this.pagination.pageSize;
          var pageEleEnd = (pageEleStart+this.pagination.pageSize)> this.pagination.total?this.pagination.total:(pageEleStart+this.pagination.pageSize);
          this.tableData = this.totalTableData.slice(pageEleStart, pageEleEnd);
        });
      })
      .catch(error => {
        console.log("初始化计划列表获取错误");
      });
  },
  methods: {
    handleSelectionChange(val) {
      this.selectedTableData = val;
    },
    // 每页条数改变时触发函数
    handleSizeChange(val) {
      // this.pagination: {
      //   currentPage: 1,
      //   pageSizes: [5, 10, 20, 30, 50],
      //   pageSize: 5,
      //   total: 400
      // },
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
    // 改变日期格式
    changeDate(date) {
      console.log(date);
      if(!date){
        return null;
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
        customerId: (this.searchOptions.searchParams.customerName==="")?null:this.searchOptions.searchParams.customerName, 
        brandId: (this.searchOptions.searchParams.brandName==="")?null:this.searchOptions.searchParams.brandName, 
        id: (this.searchOptions.searchParams.name==="")?null:this.searchOptions.searchParams.name, 
        clothingLevelId :(this.searchOptions.searchParams.clothingLevelName==="")?null:this.searchOptions.searchParams.clothingLevelName, 
        startDate: this.changeDate(this.searchOptions.searchParams.dateRange[0]),
        endDate: this.changeDate(this.searchOptions.searchParams.dateRange[1]),
      };
      console.log(params);

      this.$axios.get(`${window.$config.HOST}/planManagement/getPlanList`,params)
        .then(response=>{
          var resData = response.data;
          resData.forEach(element=>{
            if(element.type === 1 && element.state === 1){
              this.totalTableData.push(element);
            }

            this.pagination.total = this.totalTableData.length;
            // this.pagination.currentPage = 1;
            var pageEleStart = (this.pagination.currentPage-1)*this.pagination.pageSize;
            var pageEleEnd = (pageEleStart+this.pagination.pageSize)> this.pagination.total?this.pagination.total:(pageEleStart+this.pagination.pageSize);
            this.tableData = this.totalTableData.slice(pageEleStart, pageEleEnd);
          });
        })
        .catch(error=>{
          this.$message.error("搜索失败!");
        });
    },

    //查看详情
    toPlanDetail(row){
      param={
        flag: 0,
        goback: "predictPlanMaking",
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

    //提交已制定的预测计划
    submitPredictPlan(){
      // console.log("提交计划"+row.id);
      this.$confirm("是否确认提交计划?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{
          console.log("提交计划:");
          console.log(this.selectedTableData);
          this.selectedTableData.forEach(element=>{
            this.$axios.post(`${window.$config.HOST}/planManagement/submitPlan`,{id:element.id})
              .then(response=>{
                if(response.data < 0){
                  this.$message.error("提交失败,失败代码:"+(resData.errcode));
                }else{
                  this.$message({
                    message: '成功提交!',
                    type: 'success'
                  });
                  console.log(element.name+"提交成功");
                }
              })
              .catch(error=>{
                this.$message.error(element.name+"提交失败!");
              }); 
          }); 
        })
        .catch(()=>{
          this.$message({
            message: '取消提交!',
            type: 'info'
          });
        });
    },

    //编辑预测计划
    editPredictPlan(row){
      param={
        flag: 1,
        goback: "predictPlanMaking",
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

    //删除预测计划
    deletePredictPlan(row){
      this.$confirm("是否确认删除计划"+row.name+"?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{
          console.log("删除计划"+row.id);
          this.$axios
            .delete(`${window.$config.HOST}/planManagement/deletePlan`,{
              params:{id:row.id}
            })
            .then(response=>{
              if(response.data < 0){
                this.$message.error("删除失败,失败代码:"+(-resData.errcode));
              }else{
                this.$message({
                  message: '成功删除!',
                  type: 'success'
                });
              }
            })
            .catch(error=>{
              this.$message.error("删除失败!");
            });          
        })
        .catch(()=>{
          this.$message({
            message: '取消删除!',
            type: 'info'
          });
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