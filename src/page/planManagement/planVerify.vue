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
            <el-select v-model="brandId" clearable >
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
          <div class="bar">
            <div class="title">审核状态</div>
            <el-select v-model="stateId" clearable >
              <el-option
                v-for="item in options3"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
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
            <el-button type="primary" style="margin-right: 20px" >查看总计划</el-button>
          </div>
        </el-col>
      </el-row>
      <br>
      <hr>
      <br>
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          @selection-change="isChanged"
          max-height="550"
          style="width : 100%"
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
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

          <el-table-column fixed="right" width="100">
            <template slot-scope="scope">
              <el-button type="text">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      </div> -->
      <el-dialog title="驳回理由" :visible.sync="GoBack" :modal="false">
        <div class="body">
          <el-row :gutter="20">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="GoBackReason"></el-input>
          </el-row>
          <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 5px;">
            <el-col :span="2">
              <div class="bar">
                <el-button type="primary" style="margin-right: 20px" @click="GoBackCofirm">确认</el-button>
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
    </el-card>
  </div>
</template>

<script>
const cityOptions = ["已制定", "未制定", "制定中"];
export default {
  name: "warehouseList",
  data() {
    return {
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

      pagination: {
        currentPage: 1,
        pageSizes: [5, 10, 20, 30, 50],
        pageSize: 5,
        total: 400
      },
      options1: [],
      options2: [],
      options3: [
        {
          id: 1,
          name: "已制定"
        },
        {
          id: 2,
          name: "已提交"
        },
        {
          id: 3,
          name: "被驳回"
        },
        {
          id: 4,
          name: "已审核"
        },
        {
          id: 5,
          name: "已下发"
        },
        {
          id: 6,
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
      .get(`${window.$config.HOST}/InfoManagement/getBrandName`)
      .then(response => {
        this.options2 = response;
      })
      .catch(error => {
        var ClothingList = [
          {
            id: 1,
            name: "品牌1"
          },
          {
            id: 2,
            name: "品牌2"
          },
          {
            id: 3,
            name: "品牌3"
          }
        ];
        this.options2 = ClothingList;
      });

    //获得系列下拉框
    that.$axios
      .get(`${window.$config.HOST}/InfoManagement/getRangeName`)
      .then(response => {
        this.options4 = response;
      })
      .catch(error => {
        var ClothingList = [
          {
            id: 1,
            name: "系列A"
          },
          {
            id: 2,
            name: "系列B"
          },
          {
            id: 3,
            name: "系列C"
          }
        ];
        this.options4 = ClothingList;
      });

    //获得客户名称下拉框
    that.$axios
      .get(`${window.$config.HOST}/InfoManagement/getCustomerName`)
      .then(response => {
        this.options1 = response;
      })
      .catch(error => {
        var CustomerList = [
          {
            id: 1,
            name: "顾客A"
          },
          {
            id: 2,
            name: "顾客B"
          },
          {
            id: 3,
            name: "顾客C"
          }
        ];
        this.options1 = CustomerList;
      });

    //获得服装层次下拉框
    // that.$axios
    //   .get(`${window.$config.HOST}/InfoManagement/getClothingLevelName`)
    //   .then(response => {
    //     this.type = response;
    //   })
    //   .catch(error => {
    //     var ClothingList = [
    //       {
    //         id: 1,
    //         name: "时装"
    //       },
    //       {
    //         id: 2,
    //         name: "精品"
    //       },
    //       {
    //         id: 3,
    //         name: "时尚"
    //       }
    //     ];
    //     this.type = ClothingList;
    //   });

    //获得空集搜索列表
    that.$axios
      .get(`${window.$config.HOST}/planManagement/getPlanList`)
      .then(response => {
        var SearchList = response;
        this.tableData = SearchList;
      })
      .catch(error => {
        var SearchList = [
          {
            id: 1,
            number: "XL20190101001",
            name: "超级计划",
            parentId: "创生计划",
            rangeId: 1321,
            rangeNumber: "XL20190101001",
            rangeName: "Fall-2019(07/08/09)",
            customerId: 1232131,
            customerName: "Qi-Collection",
            brandId: 42132131,
            brandName: "Selkie",
            clothingLevelId: 321321,
            clothingLevelName: "时装",
            type: 2,
            planObject: "对象A",
            projectType: "款式组计划",
            order: 1,
            quantity: 15,
            product: "未知产品A",
            productDateType: "未知A",
            startDate: "2019-01-01 10:15:01",
            endDate: "2119-05-31 14:25:01",
            proposal: "无建议",
            description: "Balabalabala",
            state: 1,
            createrName: "刘德华",
            deleteTime: "",
            deptName: "业务1组",
            note: "系列备注1",
            createTime: "2019-01-01 10:15:01",
            haveException: 0
          },
          {
            id: 1,
            number: "XL20190101001",
            name: "超级计划",
            parentId: "创生计划",
            rangeId: 1321,
            rangeNumber: "XL20190101001",
            rangeName: "Fall-2019(07/08/09)",
            customerId: 1232131,
            customerName: "Qi-Collection",
            brandId: 42132131,
            brandName: "Selkie",
            clothingLevelId: 321321,
            clothingLevelName: "时装",
            type: 2,
            planObject: "对象A",
            projectType: "款式组计划",
            order: 1,
            quantity: 15,
            product: "未知产品A",
            productDateType: "未知A",
            startDate: "2019-01-01 10:15:01",
            endDate: "2119-05-31 14:25:01",
            proposal: "无建议",
            description: "Balabalabala",
            state: 1,
            createrName: "刘德华",
            deleteTime: "",
            deptName: "业务1组",
            note: "系列备注1",
            createTime: "2019-01-01 10:15:01",
            haveException: 0
          }
        ];
        this.tableData = SearchList;
      });
  },
  methods: {
    //改变日期格式
    changeDate(date) {
      console.log(date);
      if (!date) {
        return "";
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
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      }
    },
    getWareList() {
      const that = this;
      this.DataStartTime = that.changeDate(this.dataRange[0]);
      this.DataEndTime = that.changeDate(this.dataRange[1]);
      that.$axios

        .get(`${window.$config.HOST}/planManagement/getPlanList`, {
          customerId: this.clientId,
          brandId: this.brandId,
          rangeId: this.rangeId,
          startDate: DataStartTime,
          endDate: DataEndTime
        })
        .then(response => {
          var SearchList = response;
          this.tableData = SearchList;
        })
        .catch(error => {
          var SearchList = [
            {
              id: 1,
              number: "XL20190101001",
              name: "超级计划",
              parentId: "创生计划",
              rangeId: 1321,
              rangeNumber: "XL20190101001",
              rangeName: "Fall-2019(07/08/09)",
              customerId: 1232131,
              customerName: "Qi-Collection",
              brandId: 42132131,
              brandName: "Selkie",
              clothingLevelId: 321321,
              clothingLevelName: "时装",
              type: 2,
              planObject: "对象A",
              projectType: "款式组计划",
              order: 1,
              quantity: 15,
              product: "未知产品A",
              productDateType: "未知A",
              startDate: "2019-01-01 10:15:01",
              endDate: "2119-05-31 14:25:01",
              proposal: "无建议",
              description: "Balabalabala",
              state: 1,
              createrName: "刘德华",
              deleteTime: "",
              deptName: "业务1组",
              note: "系列备注1",
              createTime: "2019-01-01 10:15:01",
              haveException: 0
            },
            {
              id: 1,
              number: "XL20190101001",
              name: "超级计划",
              parentId: "创生计划",
              rangeId: 1321,
              rangeNumber: "XL20190101001",
              rangeName: "Fall-2019(07/08/09)",
              customerId: 1232131,
              customerName: "Qi-Collection",
              brandId: 42132131,
              brandName: "Selkie",
              clothingLevelId: 321321,
              clothingLevelName: "时装",
              type: 2,
              planObject: "对象A",
              projectType: "款式组计划",
              order: 1,
              quantity: 15,
              product: "未知产品A",
              productDateType: "未知A",
              startDate: "2019-01-01 10:15:01",
              endDate: "2119-05-31 14:25:01",
              proposal: "无建议",
              description: "Balabalabala",
              state: 1,
              createrName: "刘德华",
              deleteTime: "",
              deptName: "业务1组",
              note: "系列备注1",
              createTime: "2019-01-01 10:15:01",
              haveException: 0
            }
          ];
          this.tableData = SearchList;
        });
    },
    isChanged(val) {
      this.AnyChanged = val;
    },
    GoBackCancel() {
      this.GoBack = false;
      this.$refs.multipleTable.clearSelection();
    },
    GoBackCofirm() {
      for (var i = 0; i < this.AnyChanged.length; i++) {
        //this.$set(this.iptDatas[index], `showAlert`, true)
        this.AnyChanged.forEach(element => {
          that.$axios
            .post(`${window.$config.HOST}/planManagement/failPlan`, {
              id: this.AnyChanged[i].id,
              cause: this.GoBackReason
            })
            .then(response => {
              var ok = response;
              if (ok >= 0) console.log("成功");
              else console.log("失败");
            })
            .catch(error => {});
        });
      }
      this.GoBack = false;
      this.$refs.multipleTable.clearSelection();
    },
    VerifyPass() {
      if (this.AnyChanged.length === 0) {
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });

        return;
      }
      var ok = 0;
      for (var i = 0; i < this.AnyChanged.length; i++) {
        if (this.AnyChanged[i].statue === 2) ok++;
      }

      if (ok != this.AnyChanged.length) {
        this.$message({
          message: "选中项不全是未审核项！",
          type: "warning"
        });
      } else {
        for (var i = 0; i < this.AnyChanged.length; i++) {
          //this.$set(this.iptDatas[index], `showAlert`, true)
          that.$axios
            .get(`${window.$config.HOST}/planManagement/passPlan`, {
              id: this.AnyChanged[i].id
            })
            .then(response => {
              var ok = response;
              if (ok >= 0) console.log("成功");
              else console.log("失败");
            })
            .catch(error => {});
        }
        //}
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
      var ok = 0;
      for (var i = 0; i < this.AnyChanged.length; i++) {
        if (this.AnyChanged[i].statue === 4) ok = 1;
      }

      if (ok === 0) {
        this.GoBack = true;
      } else {
        this.$message({
          message: "选中项包含已审核项！",
          type: "warning"
        });
      }
    },
    CancelVerify() {
      if (this.AnyChanged.length === 0) {
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });
        return;
      }
      var ok = 0;
      for (var i = 0; i < this.AnyChanged.length; i++) {
        if (this.AnyChanged[i].statue === 4) ok++;
      }

      if (ok === this.AnyChanged.length) {
        //this.$set(this.iptDatas[index], `showAlert`, true)
        for (var i = 0; i < this.AnyChanged.length; i++)
        {
           that.$axios
            .post(`${window.$config.HOST}/planManagement/cancelPassPlan`, {
              id: this.AnyChanged[i].id
            })
            .then(response => {
              var ok = response;
              if (ok >= 0) console.log("成功");
              else console.log("失败");
            })
            .catch(error => {});
        }
        this.$refs.multipleTable.clearSelection();
      } else {
        this.$message({
          message: "选中项只能包含已审核项！",
          type: "warning"
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
    },
    handleDelete(index, row) {
      this.$confirm("这将删除该仓库下所有记录信息，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let sendData = { id: row.id };
          this.$axios
            .post(
              `${window.$config.HOST}/warehouse/base/deleteWarehouse`,
              sendData
            )
            .then(response => {
              if (response.data > 0) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.tableData.splice(index, 1);
              } else {
                this.$message({
                  type: "info",
                  message: "未在数据库中查到此记录对应信息！"
                });
              }
            })
            .catch(error => {
              console.log(error);
              this.$message({
                type: "info",
                message: "非法操作！"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
          });
        });
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