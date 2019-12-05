<template>
  <div class="body">
    <el-card class="box-card">
      <!-- 第一行 -->
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">计划类别</div>
            <el-select v-model="searchOptions.searchParams.brandName" clearable>
              <el-option
                v-for="item in searchOptions.options.planClassOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
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
      </el-row>
      <!-- 第二行 -->
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-input v-model="searchOptions.searchParams.planName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
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
      </el-row>
      <!-- 第三行 -->
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="6" :offset="15">
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
      <el-col :span="3">
        <el-button type="primary" size="small" @click="lookAllPlan">查看总计划</el-button>
      </el-col>

      <el-table
        :data="tableData"
        max-height="400"
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column label width="65">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.id"
              v-model="templateRadio"
              @change.native="getTemplateRow(scope.$index,scope.row)"
            ></el-radio>
          </template>
        </el-table-column>
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
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.isCompleted">已完成</p>
            <p v-else>未完成</p>
          </template>
        </el-table-column>
        <el-table-column label="异常状态" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="ToSearchException(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.haveException"
            >有异常，查看</el-button>
            <p v-else>无异常</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="getPlanDetail(scope.row)" type="text" size="small">查看</el-button>
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
      <el-dialog title="查看总计划" :visible.sync="lookAllPlanDialogVisible" :modal="false">
        <div class="body">
          <el-tree :data="allPlans" :props="defaultProps"></el-tree>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "commitedPlanManagement",
  data() {
    return {
      templateRadio: "",
      lookAllPlanDialogVisible: false,
      isRootPlan: true,
      allPlans: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      searchOptions: {
        searchParams: {
          customerName: undefined,
          brandName: undefined,
          clothesLevelName: undefined,
          planClassNmae: undefined,
          seriesName: undefined,
          planName: undefined,
          dateRange: undefined
        },
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          planClassOptions: [
            { label: "STYLE", name: "款式计划" },
            { label: "GROUP", name: "款式组计划" },
            { label: "SERIES", name: "系列计划" }
          ],
          clothesLevelNameOptions: []
        }
      },
      totalTableData: [],
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      selectedData: []
    };
  },
  created: function() {
    const that = this;
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

    //服装层级加载
    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "服装层次"
        }
      })
      .then(response => {
        this.searchOptions.options.clothesLevelNameOptions = response.result;
      });

    //默认获取已完成计划列表
    request
      .get(`${window.$config.HOST}/plan/find-complete`, {
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
      var param = {
        clientId: this.searchOptions.searchParams.customerName,
        brandId: this.searchOptions.searchParams.brandName,
        seriesName: this.searchOptions.searchParams.seriesName,
        name: this.searchOptions.searchParams.planName,
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
      request
        .get(`${window.$config.HOST}/plan/find-complete`, {
          params: param
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
        });
    },
    getTemplateRow(index, row) {
      this.selectedData = row;
      console.log(row);
    },
    // 查看总计划接口
    lookAllPlan() {
      let list = {
        id: this.selectedData.id
      };
      request
        .get(`${window.$config.HOST}/plan/tree`, {
          params: list
        })
        .then(response => {
          this.allPlans = [];
          this.allPlans.push(response.result);
          // console.log(this.allPlans);

          this.lookAllPlanDialogVisible = true;
        });
    },

    getPlanDetail(row) {
      var param = {
        flag: 3,
        goback: "commitedPlanManagement",
        customerName: row.customerName,
        brandName: row.brandName,
        rangeId: row.rangeId,
        rangeName: row.rangeName,
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
    if (to.name === "planMakeIndex") {
      this.keepAlives = ["commitedPlanManagement"];
    } else {
      this.keepAlives = [];
    }
    next();
  }
};
</script>

<style lang="less" scoped>
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
