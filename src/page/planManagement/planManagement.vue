<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="searchOptions.searchParams.customerName">
              <el-option
                v-for="item in searchOptions.options.customerNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="searchOptions.searchParams.brandName">
              <el-option
                v-for="item in searchOptions.options.brandNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="searchOptions.searchParams.clothingLevel" >
              <el-option
                v-for="item in searchOptions.options.clothingLevelOptions"
                :key="item.id"
                :label="item.clothingLevelName"
                :value="item.id"
              ></el-option>
            </el-select>
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
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="6">
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
        <el-col :span="9">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              style="margin-left: 20px"
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-button type="primary" size="small" @click="addPlanChild">添加子计划</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" size="small" @click="deletePlan">删除计划</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="changeOrder">下级计划顺序调整</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" size="small" @click="addException">添加异常</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        max-height="400"
        @selection-change="changeCheckBoxFun"
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column width="50" type="selection" align="center"></el-table-column>
        <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="id" v-if="false"></el-table-column>
        <el-table-column prop="planNumber" label="计划编号" align="center"></el-table-column>
        <el-table-column prop="planName" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="rangeNumber" label="系列编号" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
        <el-table-column prop="rangeName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
        <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
        <el-table-column prop="date" label="添加时间" align="center"></el-table-column>
        <el-table-column prop="parentId" label="上级计划" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center"></el-table-column>
        <el-table-column label="异常状态" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="ToSearchException(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.exception"
            >有异常，查看</el-button>
            <p v-else>无异常</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="getPlanDetail(scope.row)" type="text" size="small">查看</el-button>
            <el-button
              @click.native.prevent="ModifyPlanDetail(scope.row)"
              type="text"
              size="small"
            >修改</el-button>
            <el-button
              @click.native.prevent="deleteOnePlan(scope.$index)"
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
import { error } from 'util';
export default {
  data() {
    return {
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
      pagination: {
        currentPage: 1,
        pageSizes: [5, 10, 20, 30, 50],
        pageSize: 5,
        total: 400
      },
      selectedData: []
    };
  },
  created: function () {
    const that = this;
    console.log('进入计划管理页面');

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

    //获取系列
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getRange`)
      .then(response => {
        if(response.data.errcode < 0){
          console.log("系列名称获取错误");
        }else{
          response.data.forEach(element=>{
            this.searchOptions.options.rangeNameOptions.push({
              id: element.id,
              name: element.name
            });
          });
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
            id: 1,
            planNumber: "00001",
            planName: "计划1",
            rangeNumber: "1",
            customerName: "客户1",
            brandName: "品牌1",
            rangeName: "系列1",
            createrName: "1",
            deptName: "1",
            date: "2019-4-9",
            parentId: "无",
            state: "优秀",
            exception: true
          },
          {
            id: 2,
            planNumber: "00002",
            planName: "计划2",
            rangeNumber: "2",
            customerName: "客户2",
            brandName: "品牌2",
            rangeName: "系列2",
            createrName: "2",
            deptName: "2",
            date: "2019-4-9",
            parentId: "无",
            state: "优秀",
            exception: true
          },
          {
            id: 3,
            planNumber: "00003",
            planName: "计划3",
            rangeNumber: "3",
            customerName: "客户3",
            brandName: "品牌3",
            rangeName: "系列3",
            createrName: "3",
            deptName: "3",
            date: "2019-4-9",
            parentId: "无",
            state: "优秀",
            exception: true
          },
          {
            id: 4,
            planNumber: "00004",
            planName: "计划4",
            rangeNumber: "4",
            customerName: "客户4",
            brandName: "品牌4",
            rangeName: "系列4",
            createrName: "4",
            deptName: "4",
            date: "2019-4-9",
            parentId: "无",
            state: "优秀",
            exception: false
          },
          {
            id: 5,
            planNumber: "00005",
            planName: "计划A",
            rangeNumber: "第一个系列",
            customerName: "客户A",
            brandName: "品牌A",
            rangeName: "A系列",
            createrName: "甲",
            deptName: "部门A",
            date: "2019-4-9",
            parentId: "无",
            state: "优秀",
            exception: false
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
    ToSearchException(row) {
      console.log("查看异常"+row.id);
      this.$router.push({
        name: "exceptionManagement",
        params: {
          planId: row.id,
          customerId: row.customerId,
          customerName: row.customerName,
          brandId: row.brandId,
          brandName: row.brandName,
          rangeId: row.rangeId,
          rangeName: row.rangeName,
        }
      });
    },
    addPlanChild() {
      const that = this;
      if (that.selectedData.length === 1) {
        let data = that.selectedData[0];
        that.$router.push({
          name: "planMakeIndex",
          params: {
            client: data.customerName,
            brand: data.brandName,
            series: data.rangeName,
            plantype: 2,
            planobj: data.rangeName
          }
        });
      } else if (that.selectedData.length === 0) {
        that.$message.error("请选择要添加子计划的计划！");
      } else {
        that.$message.error("仅允许对一条计划添加子计划，请重新选择！");
      }
    },
    deletePlan() {
      const that = this;
      if (that.selectedData.length === 0) {
        that.$message.error("请选择要删除的计划！");
      } else {
        this.selectedData.forEach(element=>{
            console.log(element.id);
            this.$axios.post(`${window.$config.HOST}/planManagement/deletePlan`,{id:element.id})
              .then(response=>{
                var resData = response.data;
                if(res.resData.errcode < 0 ){
                  this.$message.error(element.id + "删除失败!");
                }else{
                  this.$message({
                    type:"success",
                    message: element.id+"删除成功!"
                  });
                  var j = this.tableData.indexOf(element);
                  this.tableData.splice(j, 1);
                }
              })
              .catch(error=>{
              this.$message.error(element.id + "删除失败!");
            })
          });
      }
    },
    changeOrder() {
      this.$message("此功能对应页面暂时缺失");
    },
    addException() {
      const that = this;
      if (that.selectedData.length === 0) {
        that.$message.error("请选择要添加异常的计划！");
      } else {
        that
          .$prompt("请输入计划出现的异常", "异常信息添加", {
            confirmButtonText: "确定",
            cancelButttonText: "取消",
            inputPattern: /\S/,
            inputErrorMessage: "异常内容不得为空"
          })
          .then(({ value }) => {
            console.log(value);
            that.selectedData.forEach(element=>{
              var params = {
                planId : element.id,
                cause : value,
              };
              // console.log(params);
              that.$axios.post(`${window.$config.HOST}/planManagement/addException`,params)
                .then(response=>{
                  if(response.data.errcode < 0){
                    that.$message.error(element.planName + "添加异常失败");
                  }else{
                    that.$message({
                      type:"success",
                      message:element.planName+"异常添加成功"
                    })
                  }
                })
                .catch(error=>{
                  that.$message.error(element.planName + "添加异常失败");
                })
            });
            that.$message({
              type: "success",
              message: "添加异常信息成功"
            });
          });
      }
    },
    changeCheckBoxFun(val) {
      this.selectedData = val;
 
    },
    getPlanDetail(row) {
      const that = this;
      that.$router.push({
        name: "planMakeIndex",
        params: {
          flag: 4,
          goback: "planManagement",
          client: row.customerName,
          brand: row.brandName,
          series: row.rangeName,
          plantype: 2,
          planobj: row.rangeName
        }
      });
    },
    ModifyPlanDetail(row) {
      const that = this;
      that.$router.push({
        name: "planMakeIndex",
        params: {
          goback: "planManagement",
          flag: 5,
          client: row.customerName,
          brand: row.brandName,
          series: row.rangeName,
          plantype: 2,
          planobj: row.rangeName
        }
      });
    },
    deleteOnePlan(planid) {
      console.log("删除 "+planid);
      this.$axios.post(`${window.$config.HOST}/planManagement/deletePlan`,{id:planid})
        .then(response=>{
          if(response.data.errcode < 0){
            this.$message.error(planid+"删除失败");
            return;
          }else{
            this.tableData.forEach(element=>{
              if(element.id === planid){
                var idx = this.tableData.indexOf(element);
                this.tableData.splice(idx,1);
                return;
              }
            })
            this.$message({
              type:"success",
              message:planid+"删除成功"
            });
          }
        })
        .catch(error=>{
          this.$message.error(planid+"删除失败");
        });
    },
    // 改变日期格式
    changeDate(date) {
      console.log(date);
      if(!date){
        return "";
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
    //搜索按钮
    handleSearch(){
      var params = {
        customerId: this.searchOptions.searchParams.customerName, 
        brandId: this.searchOptions.searchParams.brandName, 
        rangeId: this.searchOptions.searchParams.rangeName, 
        id: this.searchOptions.searchParams.planName, 
        clothingLevelId :this.searchOptions.searchParams.clothingLevelName, 
        startDate: this.changeDate(this.searchOptions.searchParams.dateRange[0]),
        endDate:this.changeDate(this.searchOptions.searchParams.dateRange[1]),
      };

      this.$axios.get(`${window.$config.HOST}/planManagement/getPlanList`,params)
        .then(response=>{
          var resData = response.data;
          if(resData.errcode < 0){
            this.$message.error("搜索失败!");
            return;
          }
          resData.forEach(element=>{
            this.tableData.push({
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
            })
          });
        })
        .catch(error=>{
          this.tableData = [
            {
              id: 1,
              planNumber: "00001",
              planName: "1",
              rangeNumber: "1",
              customerName: "1",
              brandName: "1",
              rangeName: "1",
              createrName: "1",
              deptName: "1",
              date: "2019-4-9",
              parentId: "无",
              state: "优秀",
              exception: true
            },
            {
              id: 2,
              planNumber: "00002",
              planName: "2",
              rangeNumber: "2",
              customerName: "2",
              brandName: "2",
              rangeName: "2",
              createrName: "2",
              deptName: "2",
              date: "2019-4-9",
              parentId: "无",
              state: "优秀",
              exception: true
            },
          ];
          this.$message.error("搜索失败!");
          return;
        });
    },
    handleSizeChange(){

    },
    handleCurrentChange(){
      
    }
  }
};
</script>

<style lang="less" scoped>
.Mtitle {
  font-size: 3ch;
  margin-left: 47%;
}
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .el-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 14px;
        width: 90px;
        min-width: 50px;
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
  .block {
    padding: 30px 0;
    text-align: center;
  }
}
</style>
