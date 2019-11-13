<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="10" style="margin-top: 15px; margin-bottom: 5px;">
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

        <el-col :span="6" :offset="2">
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

        <el-col :span="6" :offset="2">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-input v-model="searchOptions.searchParams.planName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 25px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-input v-model="searchOptions.searchParams.seriesName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>

        <el-col :span="10" :offset="2">
          <div class="bar">
            <div class="title">新建时间</div>
            <el-date-picker
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            ></el-date-picker>
          </div>
        </el-col>

        <el-col :offset="1" :span="2">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="handleSearch">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-button type="primary" style="margin-right:20px" @click="ReCoverAll">恢复所选计划</el-button>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%; margin-top: 20px"
          @selection-change="tableSelectionChange"
          :stripe="true"
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column type="index" label="序号" align="center"></el-table-column>
          <el-table-column v-if="false" prop="id" align="center"></el-table-column>
          <el-table-column prop="clientName" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
          <el-table-column prop="serialNo" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="seriesName" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="planClass" label="计划对象" align="center"></el-table-column>
          <el-table-column prop="type" label="项目类型" align="center"></el-table-column>
          <el-table-column prop="deleteName" label="删除人" align="center"></el-table-column>
          <el-table-column prop="createTime" label="删除时间" align="center"></el-table-column>

          <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="ReCover(scope.row)">恢复</el-button>
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
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalTableData: [],
      tableData: [],
      searchOptions: {
        searchParams: {
          customerName: "",
          brandName: "",
          seriesName: "",
          planName: "",
          dateRange: ""
        },
        options: {
          customerNameOptions: [],
          brandNameOptions: []
        }
      },

      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      pages: 0,
      tableSelectionData: [],

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
    const that = this;
    console.log("进入计划回收站页面");
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

    //加载默认所有的删除计划
    request
      .get(`${window.$config.HOST}/plan-delete-info/find`, {
        params: {
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        }
      })
      .then(response => {
        this.tableData = response.result;
        this.pagination.total = request.total;
      });
  },
  methods: {
    // 每页条数改变时触发函数
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log(`每页 ${val} 条`);

      this.pagination.currentPage = 1;
      this.handleSearch();
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.currentPage = val;
      this.handleSearch();
    },
    tableSelectionChange(val) {
      this.tableSelectionData = val;
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
        var h = date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = date.getSeconds();
        second = minute < 10 ? "0" + second : second;
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      }
    },
    //搜索按钮
    handleSearch() {
      var param;
      param = {
        clientId:
          this.searchOptions.searchParams.customerName === ""
            ? undefined
            : this.searchOptions.searchParams.customerName,
        brandId:
          this.searchOptions.searchParams.brandName === ""
            ? undefined
            : this.searchOptions.searchParams.brandName,
        clothesLevelName: "",
        clothesLevelName:
          this.searchOptions.searchParams.seriesName === ""
            ? undefined
            : this.searchOptions.searchParams.seriesName,
        name:
          this.searchOptions.searchParams.planName === ""
            ? undefined
            : this.searchOptions.searchParams.planName,
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
      console.log("搜索参数", param);

      request
        .get(`${window.$config.HOST}/plan-delete-info/find`, {
          params: param
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = request.total;
        });
    },
    // 恢复单个的按钮
    ReCover(row) {
      console.log("单个恢复:" + row.name);

      request
        .get(`${window.$config.HOST}/plan-delete-info/delete`, {
          params: {
            id: row.id,
            planId: row.planId
          }
        })
        .then(response => {
          this.handleSearch();
        });
    },
    //恢复所有选择的按钮
    ReCoverAll() {
      if (this.tableSelectionData.length === 0) {
        this.$message.error("请选择要恢复的计划!");
      } else {
        this.tableSelectionData.forEach(element => {
          console.log("恢复: " + element.name);
          this.ReCover(element);
        });
      }
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