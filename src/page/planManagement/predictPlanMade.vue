<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px; ">
        <el-col :span="8">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="select1" clearable @change="c1">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="select2" clearable @change="c1">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="select3" clearable @change="c1">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 5px;">

        <el-col :span="8">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-input v-model="input3" clearable placeholder="请输入" @change="c4"></el-input>
          </div>
        </el-col>

        <el-col :span="13">
          <div class="bar">
            <div class="title">制定时间</div>
            <el-date-picker
              v-model="input1"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="bar">
            <el-button type="primary" @click="getWareList">搜索</el-button>
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
      <div>
      <el-table :data="tableData" max-height="550" border style="width : 100%">
        <el-table-column type="selection" width="50" align="center"></el-table-column>
        <!-- <el-table-column v-if="false" prop="id" align="center"></el-table-column> -->
        <el-table-column prop="id" label="序号" align="center"></el-table-column>
        <el-table-column prop="forecastedId" label="预测编号" align="center"></el-table-column>
        <el-table-column prop="planName" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="seriesNumber" label="系列编号" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="brand" label="品牌" align="center"></el-table-column>
        <el-table-column prop="clothesType" label="服装层次" align="center"></el-table-column>
        <el-table-column prop="seriesName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="addPeople" label="添加人" align="center"></el-table-column>
        <el-table-column prop="department" label="部门" align="center"></el-table-column>
        <el-table-column prop="statue" label="状态" align="center"></el-table-column>
        <!-- <el-table-column prop="note" label="操作" align="center"></el-table-column> -->

        <el-table-column  fixed="right" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="makePredict(scope.row)" type="text" size="small">查看</el-button>

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
const cityOptions = ['已制定', '未制定', '制定中'];
export default {
  name: "warehouseList",
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      select1: '',
      select2: '',
      select3: '',
      input1:'',
      input2:'',
      input3:'',
      pagination: {
          currentPage: 1,
          pageSizes: [5, 10, 20, 30, 50],
          pageSize: 5,
          total: 400,
        },
      options1: [{
        value: 1,
        label: "客户A"
      },{
        value: 2,
        label: "客户B"
      },{
        value: 3,
        label: "客户C"
      },{
        value: 4,
        label: "客户D"
      },{
        value: 5,
        label: "客户E"
      }],
      options2: [{
        value: 1,
        label: "品牌A"
      },{
        value: 2,
        label: "品牌B"
      },{
        value: 3,
        label: "品牌C"
      },{
        value: 4,
        label: "品牌D"
      },{
        value: 5,
        label: "品牌E"
      }],
      options3: [{
        value: 1,
        label: "类型A"
      },{
        value: 2,
        label: "类型B"
      },{
        value: 3,
        label: "类型C"
      },{
        value: 4,
        label: "类型D"
      },{
        value: 5,
        label: "类型E"
      }],
      tableData: [
        {
          id:"1",
          forecastedId:"JH001",
          planName:"系列A计划",
          seriesNumber:"XL20190101001",
          customerName:"Qi-Collection",
          brand:"Selikie",
          clothesType:"时装",
          seriesName:"Fall-2019(01/08/09)",
          addPeople:"刘德华",
          department:"业务一组",
          statue:"已制定"
        }
      ],
      // checked: true,
      pages: 0,
    }
  },
  methods: {
    makePredict(row){
      const that = this;
      that.$router.push({
        path: `/planMake/planMakeIndex`,
      })
    },
    deleteDate(row) {
      this.tableData = [];
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleDelete(index, row) {
      this.$confirm('这将删除该仓库下所有记录信息，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let sendData = {"id": row.id};
        this.$axios
          .post(`${window.$config.HOST}/warehouse/base/deleteWarehouse`, sendData)
          .then(response => {
            if (response.data > 0) {
              this.$message({
              type: 'success',
              message: '删除成功'
              });
              this.tableData.splice(index, 1);
            } else {
              this.$message({
                type: 'info',
                message: '未在数据库中查到此记录对应信息！'
              })
            }
          })
          .catch(error => {
            console.log(error);
            this.$message({
              type: 'info',
              message: '非法操作！'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
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