<template>
<el-card class="box-card">
  <div class="bar">
    <el-table :data="tableData" style="width: 100%; margin-top: 20px">
      <el-table-column w idth="50" type="selection" align="center"></el-table-column>
      <el-table-column prop="Id" label="序号" align="center"></el-table-column>
      <el-table-column prop="SeriesId" label="系列编号" align="center"></el-table-column>
      <el-table-column prop="ClientName" label="客户名称" align="center"></el-table-column>
      <el-table-column prop="BrandName" label="品牌" align="center"></el-table-column>
      <el-table-column prop="ClothesType" label="服装类型" align="center"></el-table-column>
      <el-table-column prop="SeriesName" label="系列名称" align="center"></el-table-column>
      <el-table-column prop="Operator" label="添加人" align="center"></el-table-column>
      <el-table-column prop="Department" label="部门" align="center"></el-table-column>
      <el-table-column prop="PrePlan" label="预测计划" align="center"></el-table-column>
      <el-table-column prop="State" label="状态" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="ViewDetails=true">查看详情</el-button>
          <el-dialog title="系列详情" :visible.sync="ViewDetails" :modal="false">
            <el-tree :data="SeriesDetail" :props="defaultProps"></el-tree>
            <el-button type="primary" @click="ViewDetails=false" style="margin-left:90%">确认</el-button>
          </el-dialog>
          <!-- <el-button size="mini" @click="QuotePre(scope.row)" type="text">引用预测</el-button> -->
          <el-button size="mini" @click="ToPlanForm(scope.row)" type="text">制定计划</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="QuotePre(scope.row)" type="text" size="small">引用预测</el-button>
              <el-button @click="ToPlanForm(scope.row)" type="text" size="small">制定计划</el-button>
            </template>
      </el-table-column>-->
    </el-table>
  </div>
</el-card>
</template>



<script>
export default {
  data() {
    return {
    }
  },
  methods:{

  }
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