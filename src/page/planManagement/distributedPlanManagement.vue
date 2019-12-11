<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select
              v-model="searchOptions.searchParams.clientName"
              @change="clientNameChange"
              clearable
            >
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
            <el-select v-model="searchOptions.searchParams.clothesLevelName" clearable>
              <el-option
                v-for="item in searchOptions.options.clothesLevelNameOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-input v-model="searchOptions.searchParams.planName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-input v-model="searchOptions.searchParams.seriesName" placeholder="请输入内容"></el-input>
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
        <el-col :span="5">
          <el-switch
            v-model="isRootPlan"
            @change="planTypeSwitchChange"
            inactive-color="#13ce66"
            active-text="根计划"
            inactive-text="普通计划"
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
          <el-button type="primary" size="small" @click="addPlanChild">添加子计划</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" size="small" @click="changeSubPlanOrder">下级计划顺序调整</el-button>
        </el-col>
        <el-col :span="3" v-if="!isRootPlan">
          <el-button type="primary" size="small" @click="lookAllPlan">查看总计划</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        max-height="400"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column label width="65">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.id"
              v-model="templateRadio"
              @change.native="getTemplateRow(scope.row)"
            >{{scope.$index+1}}</el-radio>
          </template>
        </el-table-column>
        <!-- :row-style="tableRowClassName" -->
        <!-- <el-table-column width="50" type="selection" align="center"></el-table-column> -->
        <!-- <el-table-column width="50" type="index" label="序号" align="center"></el-table-column> -->
        <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="clientName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
        <el-table-column prop="seriesName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="systemCode" label="系统编码" align="center"></el-table-column>
        <el-table-column prop="clothesLevelName" label="服装层次" align="center"></el-table-column>
        <el-table-column prop="serialNo" label="计划编号" align="center"></el-table-column>
        <el-table-column prop="creatorName" label="添加人" align="center"></el-table-column>
        <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
        <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
        <el-table-column prop="planClass" label="计划类别" align="center"></el-table-column>

        <!-- 根计划 -->
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="getPlanDetail(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>

        <!-- 普通计划有查看异常操作 -->
        <el-table-column v-if="!isRootPlan" label="异常状态" width="150" align="center">
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

    <el-dialog title="子计划顺序调整" :visible.sync="subPlanOrderModificationDialogVisible" :modal="false">
      <el-table :data="subPlanTableData" highlight-current-row style="width: 100%">
        <!-- <el-table-column  type="selection"  width="55px"></el-table-column> -->
        <el-table-column type="index" label="新顺序" width="70px"></el-table-column>
        <el-table-column prop="order" label="原顺序" width="70"></el-table-column>
        <el-table-column prop="name" label="计划名称" width="100px"></el-table-column>
        <el-table-column prop="startDate" label="开始日期" width="100px"></el-table-column>
        <el-table-column prop="endDate" label="结束日期" width="100px"></el-table-column>
        <el-table-column prop="creatorName" label="创建人" width="100px"></el-table-column>
        <el-table-column prop="deptName" label="部门名称" width="100px"></el-table-column>
        <el-table-column prop="createTime" label="创建日期" width="100px"></el-table-column>
        <el-table-column label="操作" width="150px" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.$index===0"
              @click="moveUp(scope.$index,scope.row)"
            >
              <i class="el-icon-arrow-up"></i>
            </el-button>
            <el-button
              size="mini"
              :disabled="scope.$index===(subPlanTableData.length-1)"
              @click="moveDown(scope.$index,scope.row)"
            >
              <i class="el-icon-arrow-down"></i>
            </el-button>
            <!-- <el-button type="info" size="mini" round v-if="scope.$index===0">默认</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="subPlanOrderConfirm">确定</el-button>
    </el-dialog>

    <el-dialog title="查看总计划" :visible.sync="lookAllPlanDialogVisible" :modal="false">
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
      isRootPlan: true,

      templateRadio: null,
      isCacheFlag: true,
      lookAllPlanDialogVisible: false,
      allPlans: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      subPlanOrderModificationDialogVisible: false,
      isSelfMadePlan: false,
      searchOptions: {
        searchParams: {
          clientName: "",
          brandName: "",
          clothesLevelName: "",
          seriesName: "",
          planName: "",
          dateRange: ""
        },
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          clothesLevelNameOptions: []
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

      subPlanTableData: []
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

    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "服装层次"
        }
      })
      .then(response => {
        this.searchOptions.options.clothesLevelNameOptions = response.result;
      });

    //默认获取下发的根计划列表
    request
      .get(`${window.$config.HOST}/root-plan/find-assign`, {
        params: {
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        }
      })
      .then(response => {
        this.tableData = response.result;
        this.pagination.total = response.total;
      });
  },
  methods: {
    clientNameChange() {
      //品牌名称跟随加载
      request
        .get(`${window.$config.HOST}/backstage/brand/name`, {
          params: { clientId: this.searchOptions.searchParams.clientName }
        })
        .then(response => {
          this.searchOptions.options.brandNameOptions = response.result;
        });
    },
    planTypeSwitchChange() {
      this.pagination.currentPage = 1;
      this.tableData = [];
      this.handleSearch();
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log("每页+" + this.pagination.pageSize);
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.handleSearch();
    },
    getTemplateRow(row) {
      this.templateRadio = row.id;
      this.selectedData = [];
      this.selectedData.push(row);
    },
    // //表格选择变化
    // tableSelectionChange(val) {
    //   this.selectedData = val;
    // },
    // 行颜色
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
      let that = this;
      console.log("搜索日期：", this.searchOptions.searchParams.dateRange);
      var param = {
        clientId:
          this.searchOptions.searchParams.clientName === ""
            ? undefined
            : this.searchOptions.searchParams.clientName,
        brandId:
          this.searchOptions.searchParams.brandName === ""
            ? undefined
            : this.searchOptions.searchParams.brandName,
        seriesName:
          this.searchOptions.searchParams.seriesName === ""
            ? undefined
            : this.searchOptions.searchParams.seriesName,
        name:
          this.searchOptions.searchParams.planName === ""
            ? undefined
            : this.searchOptions.searchParams.planName,
        clothesLevelName:
          this.searchOptions.searchParams.clothesLevelName === ""
            ? undefined
            : this.searchOptions.searchParams.clothesLevelName,
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
      console.log("搜索参数：", param);
      if (that.isRootPlan) {
        request
          .get(`${window.$config.HOST}/root-plan/find-assign`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result;
            this.pagination.total = response.total;
          });
      } else {
        request
          .get(`${window.$config.HOST}/plan/find-assign`, {
            params: param
          })
          .then(response => {
            this.tableData = response.result;
            this.pagination.total = response.total;
          });
      }
    },
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

          // this.selectedData = [];
          this.lookAllPlanDialogVisible = true;
        });
    },

    addPlanChild() {
      if (this.selectedData.length === 1) {
        let data = this.selectedData[0];

        var param = {
          goback: "distributedPlanManagement",
          isRoot: this.isRootPlan,
          isModify: false,
          isCreate: true,
          rowData: data
        };

        console.log("路由参数：", param);

        this.isCacheFlag = true;
        this.$router.push({
          name: "planMakeIndex",
          params: param
        });
        // this.selectedData = [];
      } else if (this.selectedData.length === 0) {
        this.$message.error("请选择要添加子计划的计划！");
      } else {
        this.$message.error("仅允许对一条计划添加子计划，请重新选择！");
      }
    },

    getPlanDetail(row) {
      var param = {
        goback: "distributedPlanManagement",
        isRoot: this.isRootPlan,
        isModify: false,
        isCreate: false,
        rowData: row
      };
      console.log("跳转参数：", param);

      this.isCacheFlag = true;
      this.$router.push({
        name: "planMakeIndex",
        params: param
      });
    },

    //子计划顺序跳转按钮
    changeSubPlanOrder() {
      if (this.selectedData.length === 1) {
        var param = {
          id: this.selectedData[0].id
        };
        console.log("子计划搜索参数：", param);
        request
          .get(`${window.$config.HOST}/plan/children`, {
            params: param
          })
          .then(response => {
            // console.log(response.data);
            this.subPlanTableData = response.result;
            this.subPlanTableData.sort(function(a, b) {
              return a.sequence - b.sequence;
            });
            // this.selectedData = [];
          });
        this.subPlanOrderModificationDialogVisible = true;
      } else if (this.selectedData.length === 0) {
        this.$message.error("请选择要调整的计划！");
      } else {
        this.$message.error("仅允许对一条计划调整，请重新选择！");
      }
    },
    subPlanOrderConfirm() {
      var param = [];
      var len = this.subPlanTableData.length;
      for (var i = 0; i < len; i++) {
        param.push({
          id: this.subPlanTableData[i].id,
          sequence: i
        });
      }
      console.log("子计划上传顺序：", param);
      request
        .put(`${window.$config.HOST}/plan/adjust-children`, param)
        .then(response => {
          this.subPlanOrderModificationDialogVisible = false;
        });
    },

    //子计划顺序控制函数
    //上移
    moveUp(index, row) {
      var that = this;
      // console.log('上移',index,row);
      // console.log(that.subPlanTableData[index]);
      if (index > 0) {
        let upDate = that.subPlanTableData[index - 1];
        that.subPlanTableData.splice(index - 1, 1);
        that.subPlanTableData.splice(index, 0, upDate);
      } else {
        alert("已经是第一条，不可上移");
      }
      // console.log(that.subPlanTableData);
    },

    //下移
    moveDown(index, row) {
      var that = this;
      // console.log('下移',index,row);
      if (index + 1 === that.subPlanTableData.length) {
        alert("已经是最后一条，不可下移");
      } else {
        console.log(index);
        let downDate = that.subPlanTableData[index + 1];
        that.subPlanTableData.splice(index + 1, 1);
        that.subPlanTableData.splice(index, 0, downDate);
      }
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
