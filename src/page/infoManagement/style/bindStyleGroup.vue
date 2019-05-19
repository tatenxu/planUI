<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="8">
          <div class="inputBox">
            <div class="label">款式组名</div>
            <el-select v-model="data.styleGroupName">
              <el-option
                v-for="item in options.styleGroupNameTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row style="margin: 20px 0 10px 0">
        <div class="label" align="center" style="margin: 0 0 5px 0">已选款号</div>
        <el-table :data="data.tableData" border style="width: 100%;">
          <el-table-column prop="number" label="订单款号" align="center"></el-table-column>
          <!-- <el-table-column prop="rangeNumber" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothingType" label="服装层次" align="center"></el-table-column>
          <el-table-column prop="rangeName"  label="系列名称" align="center"></el-table-column>-->
        </el-table>
      </el-row>
      <el-row style="margin: 50px 0 10px 0">
        <el-col :span="3" :offset="10">
          <el-button type="primary" @click="store" :disabled="controlData.storeDisabled">保存</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="info" @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      styleIdList: [],
      data: {
        tableData: []
      },
      options: {
        customerNameOptions: [],
        brandNameOptions: [],
        clothingTypeOptions: [],
        rangeNameTypeOptions: [],
        styleGroupNameTypeOptions: []
      },
      controlData: {
        storeDisabled: false
      }
    };
  },
  created: function() {
    const that = this;
    console.log("进入绑定款式组页面");
    var result = {};
    result = that.$route.query;
    if (result.hasOwnProperty("bindData")) {
      console.log("传过来的 绑定数据为" + result["bindData"]);
      that.data.tableData = result["bindData"];
    }

    //得到订单款号
    this.$axios
      //此处的接口为GET订单款号
      .post(`${window.$config.HOST}/infoManagement/getStyleGroupList`, {
        customerId: null,
        brandId: null,
        rangeId: null,
        clothingLevelId: null,
        id: null,
        startDate: null,
        endDate: null
      })
      .then(response => {
        console.log(response.data);
        this.options.styleGroupNameTypeOptions = response.data;
      })
      .catch(error => {
        console.log("拿款式组出错");
      });
  },
  methods: {
    // 保存按钮点击
    store() {
      const that = this;
      let styleGroupNames;
      let styleGroupNumber;
      this.options.styleGroupNameTypeOptions.forEach(element => {
        if (element.id === this.data.styleGroupName) {
          styleGroupNames = element.name;
          styleGroupNumber = element.number;
        }
      });

      that.data.tableData.forEach(element => {
        this.styleIdList.push({
          styleGroupId: this.data.styleGroupName,
          styleGroupNumber: styleGroupNumber,
          styleGroupName: styleGroupNames,
          styleNumber: element.number
        });
        console.log(this.styleIdList);
      });
      let list = this.styleIdList;
      console.log(list);
      this.$axios
        //此处的接口为GET订单款号
        .post(`${window.$config.HOST}/infoManagement/bindStyleGroup`, list)
        .then(response => {
          var ok = response.data;
          if (ok >= 0) {
            if (ok === this.styleIdList.length) {
              console.log(ok);
              this.$message({
                message: "绑定成功!",
                type: "success"
              });
              that.$router.push({
                name: `styleManagementIndex`
              });
            } else {
              this.$message({
                message: this.styleIdList.length - ok + "条数据未添加成功",
                type: "warning"
              });
            }
          } else {
            this.$message({
              message: "绑定失败",
              type: "warning"
            });
          }
        })
        .catch(error => {
          this.$message({
            message: "绑定款式失败",
            type: "warning"
          });
        });
    },
    // 取消按钮点击
    cancel() {
      const that = this;
      console.log("取消按钮点击");
      that.$router.push({
        name: `styleManagementIndex`
      });
    }
  }
};
</script>


<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .inputBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    .label {
      font-size: 14px;
      min-width: 75px;
      text-align: center;
    }
    .el-input {
      width: 300px;
      min-width: 75px;
    }
    .el-select {
      width: 300px;
      min-width: 75px;
    }
  }
  .block {
    padding: 30px 0;
    text-align: center;
  }
}
</style>