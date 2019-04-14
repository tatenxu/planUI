<template>
  <el-card class="box-card">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">客户名称：</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        
        <el-col :span="5">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">品牌：</span>
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">模板名称：</span>
            <el-input class="input" v-model="input" placeholder="请输入内容"></el-input>
          </div>
        </el-col>

        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="cardBelow">
      <el-container>
        <el-header>
        </el-header>

        <el-main>
          <div>
          </div>
        </el-main>
      </el-container>
    </el-card>
  </el-card>
</template>


<style lang="less" scoped>
  .box-card{
    min-width: 1500px;
    margin: 20px 50px;
    padding: 0 20px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .el-col {
      border-radius: 4px;
      .inputCombineDiv{
        display: flex;
        flex-direction: row;
        .inputTag{
          min-width: 90px;
          font-size: 18px;
          line-height: 40px;
          text-align:center;
        }
        .inputTag1{
          margin-left: 10px;
          margin-right: 10px;
          width: 18px;
          font-size: 18px;
        }
      }
    }
  }
  
  .cardBelow{
    margin-top: 10px;
  }
  
  .bg-purple {
    // background: #d3dce6;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
 
</style>


<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  }
</script>