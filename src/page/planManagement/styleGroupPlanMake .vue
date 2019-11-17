<template>
  <el-card class="box-card">
    <!-- 搜索条件设置 -->
    <el-tabs v-model="viewname" @tab-click="handleTabClick" class="cardTab">
      <el-tab-pane label="系列计划制定" name="first" class="tabPane">
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
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <div class="title">款式组名称</div>
              <el-input v-model="SeriesGroupName" placeholder="请输入款式组名称" :clearable="true"></el-input>
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

            <el-button type="primary" @click="searchStyleGroup(1)" style="margin-left:50px">搜索</el-button>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20">
        <el-col :span="15">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-input v-model="PlanName" clearable :rows="1" style="margin-left: 20px"></el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <el-button type="primary" @click="searchStyleGroup">搜索</el-button>
        </el-col>
        </el-row>-->
        <br />
        <hr />
        <br />

        <!-- 搜索结果 -->

        <el-table :data="tableDataA" style="width: 100%; margin-top: 20px" border>
          <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
          <el-table-column prop="serialNo" width="150" label="款式组编号" align="center"></el-table-column>
          <el-table-column prop="name" width="150" label="款式组名称" align="center"></el-table-column>
          <el-table-column prop="clientName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="seriesName" width="150" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothesLevelName" label="服装层次" align="center"></el-table-column>
          <el-table-column prop="styleQuantity" label="款式数量" align="center"></el-table-column>
          <el-table-column prop="creatorName" label="添加人" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="createTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="250"
            align="center"
            v-if="checked===false"
          >
            <template slot-scope="scope">
              <!-- <el-button
                @click="QuoteSeriesPlan(scope.row)"
                type="text"
                size="small"
                :disabled="true"
              >引用系列计划</el-button>-->
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
  name: "styleGroupPlanMake",
  data() {
    return {
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
        planMakeSeriesId: "",
        planMakePlanClass: "",
        planMakeObjectId: "",
        planMakeDateType: "",
        planMakeDate: "",
        planMakeStartDate: "",
        planMakeEndDate: ""
      },

      rootPlanMakeFlag: false,
      viewname: "first",
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },

      tableDataA: [],
      checked: 0,
      ClientName: "",
      BrandName: "",
      ClothesType: "",
      Date1: "",
      Date2: "",
      SeriesName: "",
      SeriesGroupName: "",
      PlanName: "",
      OrderId: "",

      seriesGroup: [],
      client: [],
      brand: [],
      type: [],
      series: [],
      tableData: [],
      DataStartTime: "",
      DataEndTime: ""
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
      this.keepAlives = ["styleGroupPlanMake"];
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
    //获得品牌名称
    request.get(`/backstage/brand/name`).then(response => {
      this.brand = response.result;
    });

    //获得客户名称
    request.get(`/backstage/client/name`).then(response => {
      this.client = response.result;
    });

    //获得初始搜索结果
    request
      .get(`/info/style-group/find`, {
        params: {
          pageNum: 1,
          pageSize: 10,
          haveRootPlan: this.checked
        }
      })
      .then(response => {
        this.tableDataA = response.result;
        this.pagination.total = response.total;
      });
  },
  methods: {
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
          let list = {};

          list = {
            name: this.rootPlanMake.planMakeName,
            seriesId: this.rootPlanMake.planMakeSeriesId,
            planClass: "款式组计划",
            objectId: this.rootPlanMake.objectId,
            dateType: this.rootPlanMake.planMakeDateType,
            date: this.rootPlanMake.planMakeDate,
            startDate: this.rootPlanMake.planMakeStartDate,
            endDate: this.rootPlanMake.planMakeEndDate
          };

          request.post(`/root-plan/insert`, list).then(response => {
            this.searchStyleGroup(1);
            this.rootPlanMakeFlag = false;
            this.viewname = "first";
            this.rootPlanMake.planMakeStartEndDate = [];
            this.rootPlanMake.planMakeName = "";
            this.rootPlanMake.planMakeSeriesId = "";
            this.rootPlanMake.planMakePlanClass = "";
            this.rootPlanMake.planMakeObjectId = "";
            this.rootPlanMake.planMakeDateType = "";
            this.rootPlanMake.planMakeDate = "";
            this.rootPlanMake.planMakeStartDate = "";
            this.rootPlanMake.planMakeEndDate = "";
          });
        } else {
          this.$message({
            message: "制定根计划失败!",
            type: "error"
          });
        }
      });
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    CancelRootPlan() {
      this.rootPlanMakeFlag = false;
      this.viewname = "first";
      this.rootPlanMake.planMakeStartEndDate = [];
      this.rootPlanMake.planMakeName = "";
      this.rootPlanMake.planMakeSeriesId = "";
      this.rootPlanMake.planMakePlanClass = "";
      this.rootPlanMake.planMakeObjectId = "";
      this.rootPlanMake.planMakeDateType = "";
      this.rootPlanMake.planMakeDate = "";
      this.rootPlanMake.planMakeStartDate = "";
      this.rootPlanMake.planMakeEndDate = "";
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log("每页+" + this.pagination.pageSize);
      this.searchStyleGroup(1);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.searchStyleGroup(val);
    },
    planTypeSwitchChange() {
      const that = this;
      if (this.Date1 != null) {
        this.DataStartTime = that.changeDate(this.Date1[0]);
        this.DataEndTime = that.changeDate(this.Date1[1]);
      } else {
        this.DataStartTime = null;
        this.DataEndTime = null;
      }
      request
        .get(`/info/style-group/find`, {
          params: {
            seriesName: this.SeriesName === "" ? undefined : this.SeriesName,
            clientId: this.ClientName === "" ? undefined : this.ClientName,
            brandId: this.BrandName === "" ? undefined : this.BrandName,
            clothesLevelName:
              this.clothingLevelId === "" ? undefined : this.clothingLevelId,
            createBefore: this.DataEndTime,
            createAfter: this.DataStartTime,
            name:
              this.SeriesGroupName === "" ? undefined : this.SeriesGroupName,
            haveRootPlan: this.checked,
            pageNum: 1,
            pageSize: this.pagination.pageSize
          }
        })
        .then(response => {
          this.tableDataA = response.result;
          this.pagination.total = response.total;
        });
    },
    //改变日期格式
    changeDate(date) {
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
    searchStyleGroup(currentPageNum) {
      const that = this;
      if (this.Date1 != null) {
        this.DataStartTime = that.changeDate(this.Date1[0]);
        this.DataEndTime = that.changeDate(this.Date1[1]);
      } else {
        this.DataStartTime = null;
        this.DataEndTime = null;
      }

      request
        .get(`/info/style-group/find`, {
          params: {
            seriesName: this.SeriesName === "" ? undefined : this.SeriesName,
            clientId: this.ClientName === "" ? undefined : this.ClientName,
            brandId: this.BrandName === "" ? undefined : this.BrandName,
            clothesLevelName:
              this.clothingLevelId === "" ? undefined : this.clothingLevelId,
            createBefore: this.DataEndTime,
            createAfter: this.DataStartTime,
            name:
              this.SeriesGroupName === "" ? undefined : this.SeriesGroupName,
            haveRootPlan: this.checked,
            pageNum: currentPageNum,
            pageSize: this.pagination.pageSize
          }
        })
        .then(response => {
          this.tableDataA = response.result;
          this.pagination.total = response.total;
        });
    },
    ClearChanged(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    // QuoteSeriesPlan(row) {
    //   const that = this;
    //   //获得品牌下拉框
    //   let list = {
    //     styleGroupId: row.id,
    //     rangeId: row.rangeId
    //   };
    //   request.post(`/root-plan/quote`, list).then(response => {});
    // },
    ToPlanForm(row) {
      this.rootPlanMake.planMakeSeriesId = row.seriesId;
      this.rootPlanMake.objectId = row.id;
      this.rootPlanMakeFlag = true;
      this.viewname = "fourth";
    }
  }
};
</script>

<style lang="less" scoped>
.block {
  padding: 30px 0;
  text-align: center;
}
.title {
  min-width: 100px;
}
.Mtitle {
  align-content: center;
  margin-left: 42%;
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