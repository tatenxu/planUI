<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="searchOptions.searchParams.customerName" >
              <el-option
                v-for="item in searchOptions.options.customerNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="searchOptions.searchParams.brandName" >
              <el-option
                v-for="item in searchOptions.options.brandNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="searchOptions.searchParams.clothingType" >
              <el-option
                v-for="item in searchOptions.options.clothingTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-input v-model='searchOptions.searchParams.rangeName' placeholder="请输入系列名称"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-select v-model="searchOptions.searchParams.planName" >
              <el-option
                v-for="item in searchOptions.options.planNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              style="margin-left: 20px"
              v-model='searchOptions.searchParams.dateRange'
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期">
            </el-date-picker>
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
        style="width: 100%; margin-top: 20px">
        <el-table-column width="50" type="selection" align="center"></el-table-column>
        <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="id" v-if="false"></el-table-column>
        <el-table-column prop="planId" label="计划编号" align="center"></el-table-column>
        <el-table-column prop="planName" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="rangeNumber" label="系列编号" align="center"></el-table-column>
        <el-table-column prop="clientName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
        <el-table-column prop="rangeName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="operator" label="添加人" align="center"></el-table-column>
        <el-table-column prop="department" label="部门" align="center"></el-table-column>
        <el-table-column prop="date" label="添加时间" align="center"></el-table-column>
        <el-table-column prop="parentPlan" label="上级计划" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="getPlanDetail(scope.$index, tableData)"
              type="text"
              size="small"
            >查看</el-button>
            <el-button
              @click.native.prevent="changePlan(scope.$index, tableData)"
              type="text"
              size="small"
            >修改</el-button>
            <el-button
              @click.native.prevent="deleteOnePlan(scope.$index, tableData)"
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
      searchOptions:{
        searchParams :{
          customerName: "",
          brandName: "",
          clothingType: "",
          rangeName: "",
          dateRange: "", 
        },
        options: {
          customerNameOptions: [
            {
              value: 1,
              label: "A客户"
            },
            {
              value: 2,
              label: "B客户"
            },
          ],
          brandNameOptions: [
            {
              value: 1,
              label: "X品牌"
            },
            {
              value: 2,
              label: "Y品牌"
            },
          ],
          clothingTypeOptions: [
            {
              value: 1,
              label: "时装"
            },
            {
              value: 2,
              label: "精品"
            },
            {
              value: 3,
              label: "品牌"
            },
          ],
        }
      },
      tableData: [
        {
          id:1,
          planId:"00001",
          planName:"计划A",
          rangeNumber:"第一个系列",
          clientName:"客户A",
          brandName:"品牌A",
          rangeName:"A系列",
          operator:"甲",
          department:"部门A",
          date:"2019-4-9",
          parentPlan:"无",
          state:"优秀",
        }
      ],
      pagination: {
        currentPage: 1,
        pageSizes: [5, 10, 20, 30, 50],
        pageSize: 5,
        total: 400,
      },
      selectedData: [],
    }
  },
  methods: {
    addPlanChild() {
      const that = this;
      if(that.selectedData.length === 1) {
        let data = that.selectedData[0];
        that.$router.push({
          name : 'planMakeIndex',
          params : {
            client : data.clientName,
            brand : data.brandName,
            series : data.rangeName,
            plantype : 2,
            planobj : data.rangeName
          }
        })
      } else if (that.selectedData.length === 0) {
        that.$message.error("请选择要添加子计划的计划！");
      } else {
        that.$message.error("仅允许对一条计划添加子计划，请重新选择！");
      }
    },
    deletePlan() {
      const that = this;
      if (that.selectedData.length === 0) {
        that.$message.error("请选择要删除的计划！")
      } else {
        that.tableData.splice(0,1);
        that.$$message({
          message : '删除成功！',
          type : 'success'
        })
      }
    },
    changeOrder() {
      this.$message('此功能对应页面暂时缺失')
    },
    addException() {
      const that = this;
      if (that.selectedData.length === 0) {
        that.$message.error("请选择要添加异常的计划！");
      } else {
        that.$prompt('请输入计划出现的异常', '异常信息添加', {
          confirmButtonText: '确定',
          cancelButttonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '异常内容不得为空'
        }).then(({value}) => {
          console.log(value);
          that.$message({
            type: 'success',
            message: '添加异常信息成功'
          })
        })
      }
    },
    changeCheckBoxFun(val) {
      const that = this;
      that.selectedData = val;
      console.log("selectedData:", val);
    },
    getPlanDetail(index, row) {
      const that = this;
      that.$router.push({
        name : 'planMakeIndex',
        params : {
          client : row.clientName,
          brand : row.brandName,
          series : row.rangeName,
          plantype : 2,
          planobj : row.rangeName
        }
      })
    },
    changePlan(index, row) {
      const that = this;
      that.$router.push({
        name : 'planMakeIndex',
        params : {
          client : row.clientName,
          brand : row.brandName,
          series : row.rangeName,
          plantype : 2,
          planobj : row.rangeName
        }
      })
    },
    deleteOnePlan(index, row) {
      const that = this;
      that.tableData.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.Mtitle{
  font-size:3ch;
  margin-left:47%;
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
