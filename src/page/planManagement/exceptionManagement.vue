<template>
  <div class="box-card">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">客户名称：</span>
            <el-select v-model="CustomerName" placeholder="请选择">
              <el-option
                v-for="item in customerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="4">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">品牌：</span>
            <el-select v-model="BrandName" placeholder="请选择">
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="4">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">系列名称</span>
            <el-select v-model="SeriesName" placeholder="请选择">
              <el-option
                v-for="item in rangeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="9">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">新建时间：</span>
            <el-date-picker
              v-model="Data"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
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
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            type='index'
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column
            prop="excCode"
            label="异常编号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="planCode"
            label="计划编号"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="customer"
            label="客户"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="brand"
            label="品牌"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="planName"
            label="计划名称"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="rangeName"
            label="系列名称"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="planObj"
            label="计划对象"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="excContent"
            label="异常内容"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createPerson"
            label="创建人"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="deleteTime"
            label="删除时间"
            show-overflow-tooltip>
            <!-- <template slot-scope="scope">{{ scope.row.deleteTime }}</template> -->
          </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
          <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
        </div>
      </div>
    </el-card>
  </div>
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
          min-width: 70px;
          font-size: 14px;
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
        CustomerName:"",
        Data:"",
        BrandName:"",
        SeriesName:"",
        
        tableData: [
          {
            excCode: '7878787',
            planCode: '45345',
            customer: 'nike',
            brand:'耐克',
            planName:'计划1',
            rangeName:'系列1',
            planObj:'大明',
            excContent:'死机',
            createPerson:'王小虎',
            deleteTime:"2016-10-16"
          },
          {
            excCode: '312',
            planCode: '5335',
            customer: 'add',
            brand:'阿迪',
            planName:'计划2',
            rangeName:'系列1',
            planObj:'大明',
            excContent:'死机',
            createPerson:'王小虎',
            deleteTime:"2016-10-16"
          },
          {
            excCode: '8678',
            planCode: '45343',
            customer: 'nb',
            brand:'nb',
            planName:'计划6',
            rangeName:'系列5',
            planObj:'大明',
            excContent:'死机',
            createPerson:'王小虎',
            deleteTime:"2016-10-16"
          },
          
        ],
        multipleSelection: [],
        rangeOptions:[
          {
            value:'系列1',
            label:'系列1'
          },
          {
            value:'系列2',
            label:'系列2'
          },

        ],
        customerOptions:[
          {
            value:'客户1',
            label:'客户1'
          },
          {
            value:'客户2',
            label:'客户2'
          },
        ],
        brandOptions:[
          {
            value:'品牌1',
            label:'品牌1'
          },
          {
            value:'品牌2',
            label:'品牌2'
          },
        ]
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