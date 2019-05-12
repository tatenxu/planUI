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
          <el-table-column prop="addingModeName" label="添加方式" align="center"></el-table-column>
          <el-table-column prop="stateName" label="状态" align="center"></el-table-column>

          <!-- <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="ReCover(scope.$index, scope.row)">恢复</el-button>
            </template>
          </el-table-column>-->
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
// import { rename } from 'fs';
export default {
  data() {
    return {
      tableData: [ ],
      
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
    console.log('进入计划完成页面');

    //加载未完成的计划
    // var param ={
    //   customerId : null,
    //   brandId : null,
    //   rangeId: null,
    //   id : null,
    //   clothingLevelId : null,
    //   startDate : null,
    //   endDate : null,
    // };
    
    this.$axios
      .post(`${window.$config.HOST}/infoManagement/getRangeList`, {
        customerId: "",
        brandId: "",
        id: "",
        clothingLevelId: "",
        startDate: "",
        endDate: ""
      })
      .then(response => {
        // response.data.forEach(element=>{
        //   if(element.state === 5){
        //     this.tableData.push(element);
        //   }
        // });
        this.tableData = response.data;
        this.tableData.forEach(element => {
          if(element.addingMode===1) element.addingModeName="手动";
          else element.addingModeName="导入";

          if(element.state===1) element.stateName="已制定";
          else if(element.state===2) element.stateName="已提交";
          else if(element.state===3) element.stateName="被驳回";
          else if(element.state===4) element.stateName="已审核";
          else if(element.state===5) element.stateName="已下发";
          else if(element.state===6) element.stateName="已删除";
          var d = new Date(element.createTime);
          let time = d.toLocaleString();
          element.createTime = time;
        });
      })
      .catch(error => {
        console.log("初始化加载系列失败");
      });
  },
  methods: {
    //计划完成按钮点击
    handleCompletionClick() {
      //this.$set(this.iptDatas[index], `showAlert`, true)
      const that = this;
      if (that.tableSelectionData.length === 0) {
        that.$message.error("请选择要删除的计划！");
      } else {
        this.tableSelectionData.forEach(element => {
          console.log("删除"+element.name);
          this.$axios.post(`${window.$config.HOST}/planManagement/completePlan`,{id:element.id})
            .then(response=>{
              if(response.data<0){
                this.$message.error(element.name+"添加完成失败");
              }else{
                console.log("完成"+element.name);
                var j = this.tableData.indexOf(element);
                this.$set(this.tableData[j], "state", "已完成");
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