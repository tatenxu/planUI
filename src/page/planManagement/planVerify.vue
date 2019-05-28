<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="clientId" clearable>
              <el-option
                v-for="item in options1"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="brandId" clearable>
              <el-option
                v-for="item in options2"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar" style="margin-top:10px">
            <!-- <div class="title">审核状态</div>
            <el-select v-model="stateId" clearable>
              <el-option
                v-for="item in options3"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>-->

            <el-radio-group v-model="checked" @change="changeState">
              <el-radio :label="1">已提交</el-radio>
              <el-radio :label="2">已审核</el-radio>
              <el-radio :label="3">已下发</el-radio>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 25px; margin-bottom: 5px;">
        <el-col :span="8">
          <div class="bar">
            <div class="title">新建时间</div>
            <el-date-picker
              v-model="dataRange"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">系列名称</div>
            <!-- <el-input v-model="input3" clearable @change="c4"></el-input> -->
            <el-select v-model="rangeId" clearable>
              <el-option
                v-for="item in options4"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :offset="0" :span="2">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="getWareList">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 5px;">
        <el-col :span="2">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="VerifyPass">审核通过</el-button>
          </div>
        </el-col>
        <el-col :offset="1" :span="2">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="VerifyRebut">审核驳回</el-button>
          </div>
        </el-col>
        <el-col :offset="1" :span="2">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="CancelVerify">取消审核</el-button>
          </div>
        </el-col>
        <el-col :offset="1" :span="2">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="lookAllPlan">查看总计划</el-button>
          </div>
        </el-col>
      </el-row>
      <br>
      <hr>
      <br>
      <div>
        <el-table
          :data="tableDataA"
          max-height="400"
          border
          @selection-change="isChanged"
          :stripe="true"
          :highlight-current-row="true"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
          <el-table-column prop="number" label="预测编号" align="center"></el-table-column>
          <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
          <el-table-column prop="rangeName" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="planObject" label="计划对象" align="center"></el-table-column>
          <el-table-column prop="projectType" label="项目类型" align="center"></el-table-column>
          <el-table-column prop="startDate" label="计划开始" align="center"></el-table-column>
          <el-table-column prop="endDate" label="计划结束" align="center"></el-table-column>
          <el-table-column prop="state" label="审核状态" align="center"></el-table-column>

          <el-table-column fixed="right" width="100" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="searchDetails(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
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
      </div>
      <!-- <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>-->
      <el-dialog title="驳回理由" :visible.sync="GoBack" :modal="false">
        <div class="body">
          <el-row :gutter="20">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="GoBackReason"></el-input>
          </el-row>
          <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 5px;">
            <el-col :span="2">
              <div class="bar">
                <el-button type="primary" style="margin-right: 20px" @click="GoBackConfirm">确认</el-button>
              </div>
            </el-col>
            <el-col :offset="1" :span="2">
              <div class="bar">
                <el-button type="primary" style="margin-right: 20px" @click="GoBackCancel">取消</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-dialog>

      <el-dialog title="查看总计划" :visible.sync="lookAllPlans" :modal="false">
        <div class="body">
          <el-tree :data="allPlans" :props="defaultProps"></el-tree>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
const cityOptions = ["已制定", "未制定", "制定中"];
export default {
  name: "warehouseList",
  data() {
    return {
      lookAllPlans: false,
      checked: 1,

      defaultProps: {
        children: "children",
        label: "name"
      },

      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      allPlans: [],
      tableDataA: [],
      GoBack: false,
      GoBackReason: "",
      list: [],
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      select1: "",
      select2: "",
      select3: "",
      clientId: "",
      brandId: "",
      rangeId: "",
      stateId: "",
      dataRange: "",
      dataStartTime: "",
      dataEndTime: "",

      options1: [],
      options2: [],
      options3: [
        {
          id: "已制定",
          name: "已制定"
        },
        {
          id: "已提交",
          name: "已提交"
        },
        {
          id: "已审核",
          name: "已审核"
        },
        {
          id: "已下发",
          name: "已下发"
        },
        {
          id: "已删除",
          name: "已删除"
        }
      ],
      options4: [],
      tableData: [],
      // checked: true,
      pages: 0,
      AnyChanged: []
    };
  },
  created: function() {
    var that = this;

    //获得品牌下拉框
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`, {
        customerId: undefined
      })
      .then(response => {
        this.options2 = response.data;
      })
      .catch(error => {
        console.log("获取品牌失败");
      });

    //获得系列下拉框
    that.$axios
      .get(`${window.$config.HOST}/infoManagement/getRangeName`, {
        brandId: undefined
      })
      .then(response => {
        this.options4 = response.data;
      })
      .catch(error => {
        console.log("获取系列信息失败");
      });

    //获得客户名称下拉框
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getCustomerName`)
      .then(response => {
        this.options1 = response.data;
      })
      .catch(error => {
        console.log("获取客户信息失败");
      });
    console.log("到达这里了");
    //获得空集搜索列表
    let list = {
      stage: "review",
      customerId: undefined,
      brandId: undefined,
      rangeId: undefined,
      name: undefined,
      clothingLevelId: undefined,
      startDate: undefined,
      endDate: undefined
    };
    console.log(list);
    that.$axios
      .get(`${window.$config.HOST}/planManagement/getPlanList`, {
        params: list
      })
      .then(response => {
        console.log("获取空搜索集成功");

        (this.tableData = []),
          response.data.forEach(element => {
            console.log("dsadsa");
            if (element.state === "已提交") this.tableData.push(element);
          });

        this.pagination.total = response.data.length;
        let i = (this.pagination.currentPage - 1) * this.pagination.pageSize;
        let k = (this.pagination.currentPage - 1) * this.pagination.pageSize;
        this.tableDataA = [];

        for (
          ;
          i - k < this.pagination.pageSize && i < this.tableData.length;
          i++
        ) {
          this.tableDataA.push(this.tableData[i]);
        }
        console.log(response.data);
      })
      .catch(error => {
        console.log("获取空搜索集失败");
      });
  },
  methods: {
    lookAllPlan() {
      if (this.AnyChanged.length != 1) {
        this.$message({
          message: "请选择一项！",
          type: "warning"
        });
        return;
      }
      let list = {
        id: this.AnyChanged[0].id
      };

      this.$axios
        .get(`${window.$config.HOST}/planManagement/getPlanTree`, {
          params: list
        })
        .then(response => {
          this.allPlans = [];
          this.allPlans.push(response.data);
          console.log(this.allPlans);

          this.lookAllPlans = true;
        })
        .catch(error => {
          this.$message({
            message: "获取总计划失败",
            type: "warning"
          });
        });
    },
    changeState() {
      getWareList();
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log("每页+" + this.pagination.pageSize);
      this.getWareList();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getWareList();
    },
    //查看详情
    searchDetails(row) {
      console.log(row);
      this.$router.push({
        name: "planMakeIndex",
        params: {
          flag: 3,
          goback: "planVerify",
          planId: row.id,
          planName: row.name,
          customerName: row.customerName,
          brandName: row.brandName,
          rangeName: row.rangeName,
          rangeId: row.rangeId,
          planType: row.type,
          planObjectName: row.planObject,
          planObjectId: row.planObjectId,
          topPlanName: row.isRoot === true ? row.name : row.parentName,
          topPlanId: row.parentId,
          projectType: row.projectType,
          quantity: row.quantity,
          dateStart: row.startDate,
          dateEnd: row.endDate,
          productDateType: row.productDateType,
          productDate: row.productDate,
          planProductId: row.productId,
          planPropose: row.proposal,
          planDescribe: row.description,
          note: row.note
        }
      });
    },
    //改变日期格式
    changeDate(date) {
      console.log(date);
      if (!date) {
        return undefined;
      } else {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        var h = date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = date.getSeconds();
        second = minute < 10 ? "0" + second : second;
        return y + "-" + m + "-" + d;
      }
    },
    getWareList() {
      const that = this;
      this.DataStartTime = that.changeDate(this.dataRange[0]);
      this.DataEndTime = that.changeDate(this.dataRange[1]);
      let list = {
        stage: "review",
        customerId: this.clientId === "" ? undefined : this.clientId,
        brandId: this.brandId === "" ? undefined : this.brandId,
        rangeId: this.rangeId === "" ? undefined : this.rangeId,
        name: undefined,
        clothingLevelId: undefined,
        startDate: this.DataStartTime,
        endDate: this.DataEndTime
      };

      let list1 = {
        stage: "distribute",
        customerId: this.clientId === "" ? undefined : this.clientId,
        brandId: this.brandId === "" ? undefined : this.brandId,
        rangeId: this.rangeId === "" ? undefined : this.rangeId,
        name: undefined,
        clothingLevelId: undefined,
        startDate: this.DataStartTime,
        endDate: this.DataEndTime
      };
      console.log(list);

      let stateName;
      if (this.checked === 1) {
        stateName = "已提交";
      } else if (this.checked === 2) {
        stateName = "已审核";
      } else if (this.checked === 3) {
        stateName = "已下发";
      }

      if (this.checked === 3) {
        that.$axios
          .get(`${window.$config.HOST}/planManagement/getPlanList`, {
            params: list1
          })
          .then(response => {
            console.log(response.data);

            (this.tableData = []),
              response.data.forEach(element => {
                console.log("dsadsa");
                if (element.state === stateName) this.tableData.push(element);
              });

            this.pagination.total = this.tableData.length;
            let i =
              (this.pagination.currentPage - 1) * this.pagination.pageSize;
            let k =
              (this.pagination.currentPage - 1) * this.pagination.pageSize;
            this.tableDataA = [];

            for (
              ;
              i - k < this.pagination.pageSize && i < this.tableData.length;
              i++
            ) {
              this.tableDataA.push(this.tableData[i]);
            }
          })

          .catch(error => {});
      } else {
        that.$axios
          .get(`${window.$config.HOST}/planManagement/getPlanList`, {
            params: list
          })
          .then(response => {
            console.log(response.data);

            (this.tableData = []),
              response.data.forEach(element => {
                console.log("dsadsa");
                if (element.state === stateName) this.tableData.push(element);
              });

            this.pagination.total = this.tableData.length;
            let i =
              (this.pagination.currentPage - 1) * this.pagination.pageSize;
            let k =
              (this.pagination.currentPage - 1) * this.pagination.pageSize;
            this.tableDataA = [];

            for (
              ;
              i - k < this.pagination.pageSize && i < this.tableData.length;
              i++
            ) {
              this.tableDataA.push(this.tableData[i]);
            }
          })

          .catch(error => {});
      }
    },
    isChanged(val) {
      this.AnyChanged = val;
    },
    GoBackCancel() {
      this.GoBack = false;
    },
    GoBackConfirm() {
      //this.$set(this.iptDatas[index], `showAlert`, true)
      this.AnyChanged.forEach(element => {
        console.log(element);
        let list = {
          id: element.id,
          reason: this.GoBackReason
        };
        console.log(list);
        this.$axios
          .get(`${window.$config.HOST}/planManagement/failPlan`, {
            params: list
          })
          .then(response => {
            this.getWareList();
            var ok = response.data;
            if (ok >= 0) {
              this.$message({
                message: "操作成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "当前计划状态不允许执行此操作！",
                type: "error"
              });
            }
          })
          .catch(error => {
            this.$message({
              message: "操作失败!",
              type: "error"
            });
          });
      });
      this.GoBack = false;
    },
    VerifyPass() {
      if (this.AnyChanged.length === 0) {
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });
        return;
      }
      for (var i = 0; i < this.AnyChanged.length; i++) {
        this.$axios
          .get(`${window.$config.HOST}/planManagement/passPlan`, {
            params: {
              id: this.AnyChanged[i].id
            }
          })
          .then(response => {
            this.getWareList();
            console.log(response.data);
            var ok = response.data;
            if (ok >= 0) {
              this.$message({
                message: "操作成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "当前计划状态不允许执行此操作！",
                type: "error"
              });
            }
          })
          .catch(error => {
            this.$message({
              message: "操作失败!",
              type: "error"
            });
          });
      }
    },
    VerifyRebut() {
      if (this.AnyChanged.length === 0) {
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });
        return;
      }
      this.GoBack = true;
    },
    CancelVerify() {
      if (this.AnyChanged.length === 0) {
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });
        return;
      }

      //this.$set(this.iptDatas[index], `showAlert`, true)
      for (var i = 0; i < this.AnyChanged.length; i++) {
        this.$axios
          .get(`${window.$config.HOST}/planManagement/cancelPassPlan`, {
            params: {
              id: this.AnyChanged[i].id
            }
          })
          .then(response => {
            this.getWareList();
            var ok = response.data;
            if (ok >= 0) {
              this.$message({
                message: "操作成功",
                type: "success"
              });
            } else {
              this.$message({
                message: "当前计划状态不允许执行此操作！",
                type: "error"
              });
            }
          })
          .catch(error => {
            this.$message({
              message: "操作失败!",
              type: "error"
            });
          });
      }
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    check(val) {
      val.forEach(element => {
        this.index.push(element);
      });
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
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