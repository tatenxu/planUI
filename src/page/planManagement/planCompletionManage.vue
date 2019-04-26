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
          <el-table-column prop="number" label="预测编号" align="center"></el-table-column>
          <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
          <el-table-column prop="rangeName" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="planObject" label="计划对象" align="center"></el-table-column>
          <el-table-column prop="type" label="项目类型" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" align="center"></el-table-column>
          <el-table-column prop="createrName" label="创建人" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>

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
    var param ={
      customerId : NaN,
      brandId : NaN,
      rangeId: NaN,
      id : NaN,
      clothingLevelId : NaN,
      startDate : NaN,
      endDate : NaN,
    };
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getPlanList`,param)
      .then(response => {
        response.data.forEach(element=>{
          //6 表示被删除
          if(element.state === 5){
            this.tableData.push(element);
          }
        });
        this.tableData = SearchList;
      })
      .catch(error => {
        var SearchList = [
          {
            id:'42453453',
            number: "JH190401001",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "法师打发斯蒂芬",
            planObject: "fasdfasdfsda",
            type: "销样",
            state: "XX",
            createrName: "XX",
            createTime: "2019-3-28"
          },
          {
            id:'42454523553',
            number: "JH1904010012",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "rewrqw",
            planObject: "zxcvxzc",
            type: "销样",
            state: "XX",
            createrName: "XX",
            createTime: "2019-3-28"
          },
          {
            id:'547367',
            number: "JH1904010013",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "etwervfasd",
            planObject: "gtrehyger",
            type: "销样",
            state: "XX",
            createrName: "XX",
            createTime: "2019-3-28"
          },
          {
            id:'7876',
            number: "JH1904010014",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "trhhgb",
            planObject: "xcvbcvxnmrstj",
            type: "销样",
            state: "XX",
            createrName: "XX",
            createTime: "2019-3-28"
          },
          {
            id:'23453245',
            number: "JH1904010015",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "ryghrdfsvgsdfg",
            planObject: "xcvnbsrtj",
            type: "销样",
            state: "XX",
            createrName: "XX",
            createTime: "2019-3-28"
          }
        ];
        this.tableData = SearchList;
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