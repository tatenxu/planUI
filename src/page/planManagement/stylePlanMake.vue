<template>
  <el-card class="box-card">
    <!-- 搜索条件设置 -->
    <el-tabs v-model="viewname" @tab-click="handleTabClick" class="cardTab">
      <el-tab-pane label="系列计划制定" name="first" class="tabPane">
        <!--表格 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <div class="title">客户名称</div>
              <el-select v-model="ClientName" clearable placeholder="请选择">
                <el-option
                  v-for="item in client"
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
              <el-select v-model="BrandName" clearable placeholder="请选择">
                <el-option v-for="item in brand" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">系列名称</div>
              <el-input v-model="SeriesName" placeholder="请输入系列名称" :clearable="true"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <div class="title">添加时间</div>
              <el-date-picker
                style="margin-left:20px "
                v-model="Date1"
                type="daterange"
                align="right"
                unlink-panels
                clearable
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <div class="title">订单款号</div>
              <el-input v-model="OrderId" placeholder="请输入系列名称" :clearable="true"></el-input>
            </div>
          </el-col>
          <el-col :span="5" class="MinW" style="margin-left:30px">
            <!-- <el-radio v-model="checked" label="1">未制定</el-radio>
            <el-radio v-model="checked" label="2">已制定</el-radio>-->
            <el-switch
              v-model="checked"
              @change="planTypeSwitchChange"
              inactive-color="#13ce66"
              inactive-text="未制定"
              active-text="已制定"
            ></el-switch>
            <el-button type="primary" @click="SearchIt(1)" style="margin-left:50px">搜索</el-button>
            <!-- <el-radio v-model="checked" label="3">未完成</el-radio>
            <el-radio v-model="checked" label="4">已完成</el-radio>-->
          </el-col>
        </el-row>
        <br />
        <hr />
        <br />
        <el-row :gutter="20">
          <el-col :span="5">
            <el-button type="primary" @click="handleClick3()">批量制定根计划</el-button>
          </el-col>
        </el-row>

        <el-table
          :data="tableDataA"
          style="width: 100%; margin-top: 20px"
          @selection-change="IsChanged"
          border
        >
          <el-table-column width="50" type="selection" align="center"></el-table-column>
          <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
          <el-table-column prop="number" width="150" label="订单款号" align="center"></el-table-column>
          <el-table-column prop="clientName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName"  width="120" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothesLevelName" label="服装层次" align="center"></el-table-column>
          <el-table-column prop="seriesName" width="150" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="creatorName" label="添加人" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="createTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="addMode" label="添加方式" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" align="center"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="250"
            align="center"
            v-if="checked===false"
          >
            <template slot-scope="scope">
              <!-- <el-button @click="QuoteSeriesPlan(scope.row)" type="text" size="small">引用系列计划</el-button> -->
              <el-button @click="ToPlanForm(scope.row)" type="text" size="small">制定根计划</el-button>
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
      </el-tab-pane>
      <el-tab-pane label="制定根计划" name="fourth" v-if="rootPlanMakeFlag">
        <el-form
          :model="rootPlanMake"
          :rules="planMakeRules"
          ref="rootPlanMake"
          label-width="120px"
          class="add-ruleForm"
        >
          <el-row :gutter="20">
            <el-col :span="13">
              <div class="bar">
                <el-form-item label="起止时间" prop="planMakeStartEndDate" placeholder="请选择起止时间">
                  <el-date-picker
                    :picker-options="pickerOptions0"
                    style="margin-left:20px"
                    v-model="rootPlanMake.planMakeStartEndDate"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="bar">
                <el-form-item label="根计划名称" prop="planMakeName" placeholder="请输入根计划名称">
                  <el-input
                    v-model="rootPlanMake.planMakeName"
                    clearable
                    :rows="1"
                    placeholder="请输入"
                    style="min-width:240px"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="bar" style="margin-left: 0px">
                <el-form-item label="日期类型" prop="planMakeDateType" placeholder="请选择日期类型">
                  <el-select
                    v-model="rootPlanMake.planMakeDateType"
                    clearable
                    placeholder="请选择"
                    style="min-width:120px"
                  >
                    <el-option
                      v-for="item in dateTypeOptions"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="4">
              <el-form-item label prop="productDate" placeholder="请选择日期">
                <el-date-picker
                  :picker-options="pickerOptions1"
                  v-model="rootPlanMake.planMakeDate"
                  type="date"
                  placeholder="选择日期"
                  style="min-width:260px"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="20">
              <div class="Mbutton">
                <el-col :span="2">
                  <el-button type="primary" @click="addRootPlan('rootPlanMake')">添加</el-button>
                </el-col>
                <el-col :span="2">
                  <el-button type="primary" @click="CancelRootPlan()">取消</el-button>
                </el-col>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "stylePlanMake",
  data() {
    return {
      AnyChanged: [],
      rootPlanMakeFlag: false,
      pickerOptions0: {
        disabledDate: time => {
          var date = new Date();

          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      },

      pickerOptions1: {
        disabledDate: time => {
          var date = new Date();

          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      seriesOptions: [],
      dateTypeOptions: [],
      planMakeRules: {
        planMakeStartEndDate: [
          {
            required: true,
            message: "请选择日期时间",
            trigger: "change"
          }
        ],
        // planMakeSeriesId: [
        //   { required: true, message: "请选择系列名称", trigger: "change" }
        // ],
        planMakeName: [
          { required: true, message: "请输入计划名称", trigger: "blur" }
        ],
        planMakeDateType: [
          { required: true, message: "请选择日期类型", trigger: "change" }
        ],
        planMakeDate: [
          { required: true, message: "请选择日期", trigger: "change" }
        ]
      },
      rootPlanName: "",
      rootPlanMake: {
        planMakeStartEndDate: [],
        planMakeName: "",
        planMakeSeriesId: [],
        planMakePlanClass: "",
        planMakeObjectId: [],
        planMakeDateType: "",
        planMakeDate: "",
        planMakeStartDate: "",
        planMakeEndDate: ""
      },
      viewname: "first",
      tableDataA: [],
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      checked: false,
      batchFlag: false,

      DataStartTime: "",
      DataEndTime: "",
      ClientName: "",
      BrandName: "",
      ClothesType: "",
      Date1: "",
      Date2: "",
      SeriesName: "",
      SeriesGroupName: "",
      PlanName: "",
      OrderId: "",
      orderOption: [],
      seriesGroup: [],
      client: [],
      brand: [],
      type: [],
      series: [],
      tableData: [],

      barCode: "",
      qualityTestRecordDetail: [
        {
          materialCode: "",
          unit: "",
          qualityTestQuantity: "",
          qualityTestMethod: "",
          qualityTestStandard: "",
          entryQuantity: "",
          returnQuantity: "",
          reason: "",
          result: ""
        }
      ],
      multipleSelection: [],
      controlData: {
        // isAllMaterialGetTestFlag: 0,
        isFromPlan: false,
        isFromTest: false,
        selectDataLength: 0
      }
    };
  },
  computed: {
    keepAlives: {
      get() {
        return this.$store.getters["baseinfo/keepAliveOptions"];
      },
      set(value) {
        return this.$store.commit("baseinfo/keepalive-opt-arr", value);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "planMakeIndex") {
      this.keepAlives = ["stylePlanMake"];
    } else {
      this.keepAlives = [];
    }
    next();
  },

  created: function() {
    var that = this;
    //获得日期类型
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "日期类型"
        }
      })
      .then(response => {
        this.dateTypeOptions = response.result;
      });

    //得到品牌名称
    request
      .get(`/backstage/brand/name`, {
        params: {
          clientId: ""
        }
      })
      .then(response => {
        this.brand = response.result;
      });

    //得到客户名称
    request.get(`/backstage/client/name`).then(response => {
      this.client = response.result;
    });

    //得到搜索信息
    request
      .get(`/info/style/find`, {
        params: {
          haveRootPlan: this.checked,
          pageNum: 1,
          pageSize: 10
        }
      })
      .then(response => {
        this.tableDataA = response.result;
        this.pagination.total = response.total;
      });
  },
  methods: {
    IsChanged(val) {
      this.AnyChanged = val;
    },
    handleClick3() {
      if (this.AnyChanged.length <= 1) {
        this.$message({
          type: "error",
          message: "请选择多个款式进行批量制定根计划。"
        });
        return;
      }
      this.AnyChanged.forEach(element => {
        this.rootPlanMake.planMakeSeriesId.push(element.seriesId);
        this.rootPlanMake.planMakeObjectId.push(element.id);
      });
      this.rootPlanMakeFlag = true;
      this.batchFlag=true;
      this.viewname = "fourth";
    },
    ToPlanForm(row) {
      this.rootPlanMake.planMakeSeriesId.push(row.seriesId);
      this.rootPlanMake.planMakeObjectId.push(row.id);
      this.rootPlanMakeFlag = true;
      this.batchFlag = false;
      this.viewname = "fourth";
    },
    addRootPlan(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.rootPlanMake.planMakeStartDate = that.changeDate(
            this.rootPlanMake.planMakeStartEndDate[0]
          );
          this.rootPlanMake.planMakeEndDate = that.changeDate(
            this.rootPlanMake.planMakeStartEndDate[1]
          );

          this.rootPlanMake.planMakeDate = that.changeDate(
            this.rootPlanMake.planMakeDate
          );
          let list = [];
          for (let i = 0; i < this.rootPlanMake.planMakeSeriesId.length; i++) {
            list.push({
              name: this.rootPlanMake.planMakeName,
              seriesId: this.rootPlanMake.planMakeSeriesId[i],
              planClass: "款式计划",
              objectId: this.rootPlanMake.planMakeObjectId[i],
              dateType: this.rootPlanMake.planMakeDateType,
              date: this.rootPlanMake.planMakeDate,
              startDate: this.rootPlanMake.planMakeStartDate,
              endDate: this.rootPlanMake.planMakeEndDate
            });
          }

          if (this.batchFlag === false) {
            request.post(`/root-plan/insert`, list[0]).then(response => {
              this.SearchIt(1);
              this.rootPlanMakeFlag = false;
              this.viewname = "first";
              this.rootPlanMake.planMakeStartEndDate = [];
              this.rootPlanMake.planMakeName = "";
              this.rootPlanMake.planMakeSeriesId = [];
              this.rootPlanMake.planMakePlanClass = "";
              this.rootPlanMake.planMakeObjectId = [];
              this.rootPlanMake.planMakeDateType = "";
              this.rootPlanMake.planMakeDate = "";
              this.rootPlanMake.planMakeStartDate = "";
              this.rootPlanMake.planMakeEndDate = "";
            });
          } else {
            request.post(`/root-plan/batch-insert`, list).then(response => {
              this.SearchIt(1);
              this.rootPlanMakeFlag = false;
              this.viewname = "first";
              this.rootPlanMake.planMakeStartEndDate = [];
              this.rootPlanMake.planMakeName = "";
              this.rootPlanMake.planMakeSeriesId = [];
              this.rootPlanMake.planMakePlanClass = "";
              this.rootPlanMake.planMakeObjectId = [];
              this.rootPlanMake.planMakeDateType = "";
              this.rootPlanMake.planMakeDate = "";
              this.rootPlanMake.planMakeStartDate = "";
              this.rootPlanMake.planMakeEndDate = "";
              this.batchFlag = false;
            });
          }
        } else {
          this.$message({
            message: "制定根计划失败!",
            type: "error"
          });
        }
      });
    },
    CancelRootPlan() {
      this.rootPlanMakeFlag = false;
      this.viewname = "first";
      this.rootPlanMake.planMakeStartEndDate = [];
      this.rootPlanMake.planMakeName = "";
      this.rootPlanMake.planMakeSeriesId = [];
      this.rootPlanMake.planMakePlanClass = "";
      this.rootPlanMake.planMakeObjectId = [];
      this.rootPlanMake.planMakeDateType = "";
      this.rootPlanMake.planMakeDate = "";
      this.rootPlanMake.planMakeStartDate = "";
      this.rootPlanMake.planMakeEndDate = "";
      this.batchFlag = false;
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log("每页+" + this.pagination.pageSize);
      this.SearchIt(1);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.SearchIt(val);
    },

    planTypeSwitchChange() {
      this.pagination.currentPage = 1;
      console.log(this.checked);
      const that = this;
      if (this.Date1 != null) {
        this.DataStartTime = that.changeDate(this.Date1[0]);
        this.DataEndTime = that.changeDate(this.Date1[1]);
      } else {
        this.DataStartTime = null;
        this.DataEndTime = null;
      }
      request
        .get(`/info/style/find`, {
          params: {
            clientId: this.ClientName === "" ? null : this.ClientName,
            brandId: this.BrandName === "" ? null : this.BrandName,
            seriesName: this.SeriesName === "" ? null : this.SeriesName,
            number: this.OrderId === "" ? null : this.OrderId,

            createAfter: this.DataStartTime,
            createBefore: this.DataEndTime,
            pageNum: 1,
            pageSize: this.pagination.pageSize,
            haveRootPlan: this.checked
          }
        })
        .then(response => {
          this.tableDataA = response.result;
          this.pagination.total = response.total;
        });
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    //改变日期格式
    changeDate(date) {
      console.log(date);
      if (!date) {
        return null;
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
    SearchIt(currentPageNum) {
      const that = this;
      if (this.Date1 != null) {
        this.DataStartTime = that.changeDate(this.Date1[0]);
        this.DataEndTime = that.changeDate(this.Date1[1]);
      } else {
        this.DataStartTime = null;
        this.DataEndTime = null;
      }
      request
        .get(`/info/style/find`, {
          params: {
            clientId: this.ClientName === "" ? null : this.ClientName,
            brandId: this.BrandName === "" ? null : this.BrandName,
            seriesName: this.SeriesName === "" ? null : this.SeriesName,
            number: this.OrderId === "" ? null : this.OrderId,

            createAfter: this.DataStartTime,
            createBefore: this.DataEndTime,
            pageNum: currentPageNum,
            pageSize: this.pagination.pageSize,
            haveRootPlan: this.checked
          }
        })
        .then(response => {
          this.tableDataA = response.result;
          this.pagination.total = response.total;
        });
    }

    // QuoteSeriesPlan(row) {
    //   this.$router.push({
    //     name: "planMakeIndex",
    //     params: {
    //       flag: 2,
    //       goback: "stylePlanMake",
    //       client: row.customerName,
    //       brand: row.brandName,
    //        id:row.id,
    //       series: row.rangeName,
    //       plantype: 2,
    //       planobj: row.number
    //     }
    //   });
    // },
  }
};
</script>

<style lang="less" scoped>
.block {
  padding: 30px 0;
  text-align: center;
}
.Mtitle {
  align-content: center;
  margin-left: 43%;
  font-size: 2ch;
}
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .el-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    .MinW {
      min-width: 400px;
    }
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 14px;
        width: 90px;
        min-width: 100px;
        text-align: center;
      }
      .el-input {
        width: 70%;
        min-width: 80px;
        margin-left: 20px;
      }
      .el-select {
        width: 70%;
        min-width: 80px;
        margin-left: 20px;
      }
    }
  }
}
</style>