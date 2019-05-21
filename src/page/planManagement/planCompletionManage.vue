<template>
  <div class="body">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-button type="primary" style="margin-right:20px" @click="handleCompletionClick">计划完成</el-button>
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
          <el-table-column prop="number" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothingLevelName" label="服装类型" align="center"></el-table-column>
          <el-table-column prop="name" width="170" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="createTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="addingModeStr" label="添加方式" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" align="center"></el-table-column>

          <!-- <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="ReCover(scope.$index, scope.row)">恢复</el-button>
            </template>
          </el-table-column>-->
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
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import { rename } from 'fs';
export default {
  data() {
    return {
      totalTableData:[],
      tableData: [ ],
      
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
    const that = this;
    console.log('进入计划完成页面');

    //加载默认所有系列
    this.$axios
      .post(`${window.$config.HOST}/infoManagement/getRangeList`, {
        customerId: undefined,
        brandId: undefined,
        id: undefined,
        clothingLevelId: undefined,
        startDate: undefined,
        endDate: undefined
      })
      .then(response => {
        this.totalTableData = response.data;
        this.totalTableData.forEach(element => {
          var d = new Date(element.createTime);
          let time = d.toLocaleString();
          element.createTime = time;
        });

        this.pagination.total = this.totalTableData.length;
        var pageEleStart = (this.pagination.currentPage-1)*this.pagination.pageSize;
        var pageEleEnd = (pageEleStart+this.pagination.pageSize)> this.pagination.total?this.pagination.total:(pageEleStart+this.pagination.pageSize);
        this.tableData = this.totalTableData.slice(pageEleStart, pageEleEnd);
      })
      .catch(error => {
        console.log("初始化加载系列失败");
      });
  },
  methods: {
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
    handleSearch(){
      console.log("开始搜索");
      this.$axios
        .post(`${window.$config.HOST}/infoManagement/getRangeList`, {
          customerId: undefined,
          brandId: undefined,
          id: undefined,
          clothingLevelId: undefined,
          startDate: undefined,
          endDate: undefined
        })
        .then(response => {
          this.totalTableData = response.data;
          this.totalTableData.forEach(element => {
            var d = new Date(element.createTime);
            let time = d.toLocaleString();
            element.createTime = time;
          });

          this.pagination.total = this.totalTableData.length;
          var pageEleStart = (this.pagination.currentPage-1)*this.pagination.pageSize;
          var pageEleEnd = (pageEleStart+this.pagination.pageSize)> this.pagination.total?this.pagination.total:(pageEleStart+this.pagination.pageSize);
          this.tableData = this.totalTableData.slice(pageEleStart, pageEleEnd);
        })
        .catch(error => {
          console.log("加载系列失败");
        });
    },
    //计划完成按钮点击
    handleCompletionClick() {
      //this.$set(this.iptDatas[index], `showAlert`, true)
      const that = this;
      if (that.tableSelectionData.length === 0) {
        that.$message.error("请选择要删除的计划！");
      } else {
        this.tableSelectionData.forEach(element => {
          this.$axios
            .get(`${window.$config.HOST}/infoManagement/completeRange`,{
              params:{id:element.id}
            })
            .then(response=>{
              if(response.data < 0){
                this.$message.error(element.name+"添加完成失败"+":"+response.data);
              }else{
                console.log("完成"+element.name);
                this.$message({
                  message: element.name+"已完成",
                  type: "success"
                });
                this.handleSearch();
              }
            })
            .catch(error=>{
              console.log(element.name+"完成失败");
              this.$message.error(element.name+"添加完成失败");
            });
        });
      }
    },
    
    //表格选择变化
    tableSelectionChange(val) {
      this.tableSelectionData = val;
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