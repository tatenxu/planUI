<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="searchOptions.searchParams.customerName" clearable>
              <el-option
                v-for="item in searchOptions.options.customerNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="searchOptions.searchParams.brandName" clearable>
              <el-option
                v-for="item in searchOptions.options.brandNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-input v-model="searchOptions.searchParams.clothingLevelName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-input v-model="searchOptions.searchParams.seriesName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-input v-model="searchOptions.searchParams.planName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              style="margin-left: 20px"
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              clearable
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <el-switch
            v-model="isSubmitPlan"
            @change="planTypeSwitchChange"
            inactive-color="#13ce66"
            active-text="提交的计划"
            inactive-text="未提交计划"
          ></el-switch>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-button type="primary" size="small" @click="lookAllPlan">查看总计划</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableDataShow"
        max-height="400"
        @selection-change="changeCheckBoxFun"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px"
        :row-style="tableRowClassName"
      >
        <el-table-column width="50" type="selection" align="center"></el-table-column>
        <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="id" v-if="false"></el-table-column>
        <el-table-column prop="number" label="计划编号" align="center"></el-table-column>
        <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="rangeNumber" label="系列编号" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
        <el-table-column prop="seriesName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
        <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
        <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
        <el-table-column prop="parentName" label="上级计划" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.state==='被驳回'"
              placement="top-start"
              title="驳回理由"
              width="200"
              trigger="hover"
              :content="scope.row.rejectReason"
            >
              <p slot="reference">被驳回</p>
            </el-popover>
            <p v-else-if="scope.row.state==='已制定'">已制定</p>
            <p v-else-if="scope.row.state==='已审核'">已审核</p>
            <p v-else-if="scope.row.state==='已下发'">已下发</p>
            <p v-else-if="scope.row.state==='已提交'">已提交</p>
            <p v-else-if="scope.row.state==='已删除'">已删除</p>
            <p v-else>其他</p>
          </template>
        </el-table-column>
        <el-table-column label="异常状态" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="toSearchException(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.haveException"
              style="background:red;"
            >有异常，查看</el-button>
            <p v-else>无异常</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="getPlanDetail(scope.row)" type="text" size="small">查看</el-button>
            <el-button
              v-if="isSubmitPlan && (scope.row.state === '已制定' || scope.row.state === '被驳回')"
              @click.native.prevent="ModifyPlanDetail(scope.row)"
              type="text"
              size="small"
            >修改</el-button>
            <el-button
              v-if="isSubmitPlan && (scope.row.state === '已制定' || scope.row.state === '被驳回')"
              @click.native.prevent="submitPlan(scope.row)"
              type="text"
              size="small"
            >提交</el-button>
            <el-button
              v-if="isSubmitPlan && (scope.row.state === '已制定' || scope.row.state === '被驳回')"
              @click.native.prevent="deleteOnePlan(scope.row.id)"
              type="text"
              size="small"
            >删除</el-button>
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
    </el-card>

    <el-dialog title="查看总计划" :visible.sync="lookAllPlans" :modal="false">
      <div class="body">
        <el-tree :data="allPlans" :props="defaultProps"></el-tree>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
import consoleSidebarVue from "../../components/layout/consoleSidebar.vue";
export default {
  name: "planManagement",
  data() {
    return {
      isCacheFlag: true,
      lookAllPlans: false,
      allPlans: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      subPlanOrderModificationDialogVisible: false,
      tableDataShow: [],
      isSubmitPlan: false,
      searchOptions: {
        searchParams: {
          customerName: "",
          brandName: "",
          clothingLevelName: "",
          seriesName: "",
          planName: "",
          dateRange: ""
        },
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          clothingLevelOptions: [],
          rangeNameOptions: [],
          planNameOptions: [],
          selfPlanNameOptions: [],
          distributedPlanNameOptions: []
        }
      },
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      selectedData: [],

      subPlanTableData: [],

      planManagementErrorCode: [
        {
          errorCode: -1,
          errotInfo: "所需属性值缺失"
        },
        {
          errorCode: -2,
          errotInfo: "计划名称重复"
        },
        {
          errorCode: -3,
          errotInfo: "父计划未下发"
        },
        {
          errorCode: -4,
          errotInfo: "系列根计划不存在"
        },
        {
          errorCode: -5,
          errotInfo: "款式组根计划不存在"
        },
        {
          errorCode: -6,
          errotInfo: "根计划已存在"
        },
        {
          errorCode: -7,
          errotInfo: "计划开始结束时间超额"
        },
        {
          errorCode: -8,
          errotInfo: "计划款数超额"
        },
        {
          errorCode: -9,
          errotInfo: "引用预测计划时预测计划不存在"
        },
        {
          errorCode: -10,
          errotInfo: "当前计划状态不允许执行此操作"
        },
        {
          errorCode: -11,
          errotInfo: "与已有计划冲突"
        }
      ]
    };
  },
  created: function() {
    console.log("进入计划管理页面");

    //客户名称加载
    request
      .get(`${window.$config.HOST}/backstage/client/name`)
      .then(response => {
        this.searchOptions.options.customerNameOptions = response.result;
      });

    //品牌名称加载
    request
      .get(`${window.$config.HOST}/backstage/brand/name`)
      .then(response => {
        this.searchOptions.options.brandNameOptions = response.result;
      });

    //默认获取已提交/未提交计划列表
    if (this.isSubmitPlan) {
      request
        .get(`${window.$config.HOST}/plan/find`, {
          params: {
            pageNum: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            state: "SUBMIT"
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
        });
    } else {
      request
        .get(`${window.$config.HOST}/plan/find`, {
          params: {
            pageNum: this.pagination.currentPage,
            pageSize: this.pagination.pageSize,
            state: "MAKE"
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
        });
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log("每页+" + this.pagination.pageSize);
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.handleSearch();
    },
    //行颜色
    tableRowClassName({ row, rowIndex }) {
      if (row.fromTemplate) {
        return "background: oldlace;";
      }
    },
    // 改变日期格式
    changeDate(date) {
      if (!date) {
        return undefined;
      } else {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        // var h = date.getHours();
        // var minute = date.getMinutes();
        // minute = minute < 10 ? "0" + minute : minute;
        // var second = date.getSeconds();
        // second = minute < 10 ? "0" + second : second;
        // return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
        return y + "-" + m + "-" + d;
      }
    },
    //搜索按钮
    handleSearch() {
      // console.log(this.searchOptions.searchParams.dateRange);
      var param = {
        clientId:
          this.searchOptions.searchParams.customerName === ""
            ? undefined
            : this.searchOptions.searchParams.customerName,
        brandId:
          this.searchOptions.searchParams.brandName === ""
            ? undefined
            : this.searchOptions.searchParams.brandName,
        rangeId:
          this.searchOptions.searchParams.seriesName === ""
            ? undefined
            : this.searchOptions.searchParams.seriesName,
        name:
          this.searchOptions.searchParams.planName === ""
            ? undefined
            : this.searchOptions.searchParams.planName,
        clothesLevelName:
          this.searchOptions.searchParams.clothingLevelName === ""
            ? undefined
            : this.searchOptions.searchParams.clothingLevelName,
        seriesName:
          this.searchOptions.searchParams.seriesName === ""
            ? undefined
            : this.searchOptions.searchParams.seriesName,
        createAfter: this.changeDate(
          this.searchOptions.searchParams.dateRange
            ? this.searchOptions.searchParams.dateRange[0]
            : null
        ),
        createBefore: this.changeDate(
          this.searchOptions.searchParams.dateRange
            ? this.searchOptions.searchParams.dateRange[1]
            : null
        ),
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      };
      if (this.isSubmitPlan) {
        param.state = "SUBMIT";
        console.log("搜索参数：", param);

        request
          .get(`${window.$config.HOST}/plan/find`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result;
            this.pagination.total = response.total;
          });
      } else {
        console.log("搜索参数：", param);
        param.state = "MAKE";

        request
          .get(`${window.$config.HOST}/plan/find`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result;
            this.pagination.total = response.total;
          });
      }
    },
    planTypeSwitchChange() {
      this.pagination.currentPage = 1;
      this.tableData = [];
      this.handleSearch();
    },
    //查看总计划
    lookAllPlan() {
      if (this.selectedData.length != 1) {
        this.$message({
          message: "请选择一项！",
          type: "warning"
        });
        return;
      }
      let list = {
        id: this.selectedData[0].id
      };

      request
        .get(`${window.$config.HOST}/plan/tree`, {
          params: list
        })
        .then(response => {
          this.allPlans = [];
          this.allPlans.push(response.result);

          this.lookAllPlans = true;
        });
    },
    //查看异常--跳转
    toSearchException(row) {
      console.log("查看异常" + row.id);

      this.isCacheFlag = true;
      this.$router.push({
        name: "exceptionManagement",
        params: {
          planId: row.id,
          customerId: row.customerId,
          customerName: row.customerName,
          brandId: row.brandId,
          brandName: row.brandName,
          rangeId: row.rangeId,
          seriesName: row.seriesName,
          files: row.files
        }
      });
    },

    //单删除计划
    deleteOnePlan(planid) {
      console.log("删除： " + planid);
      request
        .delete(`${window.$config.HOST}/plan/delete`, {
          params: { id: planid }
        })
        .then(response => {
          this.handleSearch();
        });
    },
    //删除计划
    deletePlan() {
      if (this.selectedData.length === 0) {
        this.$message.error("请选择要删除的计划！");
      } else {
        this.selectedData.forEach(element => {
          this.deleteOnePlan(element.id);
        });
      }
    },
    //提交计划
    submitPlan(row) {
      //行提交
      this.$axios
        .put(`${window.$config.HOST}/plan/submit`, { id: row.id })
        .then(response => {
          this.handleSearch();
        });
    },

    // 选择表格中的行数据
    changeCheckBoxFun(val) {
      this.selectedData = val;
    },
    //查看计划详情--跳转
    getPlanDetail(row) {
      var param = {
        flag: 3,
        goback: "planManagement",
        customerName: row.customerName,
        brandName: row.brandName,
        rangeId: row.rangeId,
        seriesName: row.seriesName,
        topPlanId: row.parentId,
        topPlanName: row.parentName ? row.parentName : "根计划",
        planId: row.id,
        planType: row.type,
        planObjectName: row.planObject,
        planObjectId: row.planObjectId,
        planName: row.name,
        projectType: row.projectType,
        quantity: row.quantity,
        dateStart: row.startDate,
        dateEnd: row.endDate,
        productDate: row.productDate,
        productDateType: row.productDateType,
        planProductId: row.productId,
        planPropose: row.proposal,
        note: row.note,
        planDescribe: row.description,
        files: row.files
      };
      console.log(param);

      this.isCacheFlag = true;
      this.$router.push({
        name: "planMakeIndex",
        params: param
      });
    },
    //修改计划详情--跳转
    ModifyPlanDetail(row) {
      var param = {
        flag: 2,
        goback: "planManagement",
        customerName: row.customerName,
        brandName: row.brandName,
        rangeId: row.rangeId,
        seriesName: row.seriesName,
        topPlanId: row.parentId,
        topPlanName: row.parentName ? row.parentName : "根计划",
        planId: row.id,
        planType: row.type,
        planObjectName: row.planObject,
        planObjectId: row.planObjectId,
        planName: row.name,
        projectType: row.projectType,
        quantity: row.quantity,
        dateStart: row.startDate,
        dateEnd: row.endDate,
        productDate: row.productDate,
        productDateType: row.productDateType,
        planProductId: row.productId,
        planPropose: row.proposal,
        note: row.note,
        planDescribe: row.description,
        files: row.files
      };
      console.log(param);

      this.isCacheFlag = false;
      this.$router.push({
        name: "planMakeIndex",
        params: param
      });
    }
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
    if (
      this.isCacheFlag &&
      (to.name === "planMakeIndex" || to.name === "exceptionManagement")
    ) {
      this.keepAlives = ["planManagement"];
    } else {
      this.keepAlives = [];
    }
    next();
  }
};
</script>

<style lang="less" scoped>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.Mtitle {
  font-size: 3ch;
  margin-left: 47%;
}
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .el-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 14px;
        width: 90px;
        min-width: 50px;
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
  .block {
    padding: 30px 0;
    text-align: center;
  }
}
</style>
