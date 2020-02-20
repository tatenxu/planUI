<template>
  <div class="body">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-button type="primary" style="margin-right:20px" @click="handleCompletionClick">计划完成</el-button>
        </el-row>
        <el-table :data="tableData" style="width: 100%; margin-top: 20px" @selection-change="tableSelectionChange" :stripe="true">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="name" width="150" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="clientName" width="120" label="客户" align="center"></el-table-column>
          <el-table-column prop="brandName" width="120" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothesLevelName" width="120" label="服装层次" align="center"></el-table-column>
          <el-table-column prop="rangeCode" width="120" label="波段编码" align="center"></el-table-column>
          <el-table-column prop="seriesCode" width="120" label="系列编码" align="center"></el-table-column>
          <el-table-column prop="systemCode" width="120" label="系统编码" align="center"></el-table-column>
          <el-table-column prop="projectType" width="120" label="项目类型" align="center"></el-table-column>
          <el-table-column prop="orderStage" width="120" label="订单阶段" align="center"></el-table-column>
          <el-table-column prop="predictStyleQuantity" width="120" label="预测款式" align="center"></el-table-column>
          <el-table-column prop="predictPieceQuantity" width="120" label="预测件数" align="center"></el-table-column>
          <el-table-column prop="styleQuantity" width="120" label="正式款数" align="center"></el-table-column>
          <el-table-column prop="creatorName" width="180" label="添加人" align="center"></el-table-column>
          <el-table-column prop="createTime" width="220" label="添加时间" align="center"></el-table-column>

          <!-- <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="ReCover(scope.$index, scope.row)">恢复</el-button>
            </template>
          </el-table-column>-->
        </el-table>
      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import { rename } from 'fs';
import request from "@/utils/request";
export default {
  data() {
    return {
      totalTableData: [],
      tableData: [],

      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      pages: 0,
      tableSelectionData: []
    };
  },
  created: function () {
    //加载默认所有系列
    request
      .get(`/info/series/find`, {
        params: {
          pageNum: 1,
          pageSize: 10
        }
      })
      .then(response => {
        this.tableData = response.result;
        this.pagination.total = response.total;
        this.pagination.currentPage = 1;
      });
  },
  methods: {
    // 每页条数改变时触发函数
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.handleSearch(1);
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.handleSearch(val);
    },
    handleSearch(currentPageNum) {
      request
        .get(`/info/series/find`, {
          params: {
            pageSize: this.pagination.pageSize,
            pageNum: currentPageNum
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
          this.pagination.currentPage = currentPageNum;
        });
    },
    //计划完成按钮点击
    handleCompletionClick() {
      //this.$set(this.iptDatas[index], `showAlert`, true)
      const that = this;
      if (that.tableSelectionData.length === 0) {
        that.$message.error("请选择想要完成的计划！");
      } else {
        this.tableSelectionData.forEach(element => {
          request
            .put(`/info/series/complete`, null, {
              params: {
                id: element.id
              }
            })
            .then(response => {
              this.handleSearch(1);
            });
        });
      }
    },

    //表格选择变化
    tableSelectionChange(val) {
      this.tableSelectionData = val;
    }
  }
};
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 1100px;
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