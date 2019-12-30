<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="10" style="margin-top: 15px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select
              :disabled="searchDisabled"
              v-model="searchOptions.searchParams.clientName"
              clearable
              @change="clientNameChange"
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchOptions.options.clientNameOptions"
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
            <el-select
              :disabled="searchDisabled"
              v-model="searchOptions.searchParams.brandName"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in searchOptions.options.brandNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="10" :offset="2">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              :disabled="searchDisabled"
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10" style="margin-top: 15px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-autocomplete
              :disabled="searchDisabled"
              :fetch-suggestions="searchPlanName "
              v-model="searchOptions.searchParams.planName"
              placeholder="请输入内容"
            ></el-autocomplete>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-autocomplete
              :disabled="searchDisabled"
              :fetch-suggestions="searchSeriesName"
              v-model="searchOptions.searchParams.seriesName"
              placeholder="请输入内容"
            ></el-autocomplete>
          </div>
        </el-col>

        <el-col :span="1" :offset="5">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="handleSearchClick">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50px"></el-table-column>
          <el-table-column type="index" label="序号" width="50px" align="center"></el-table-column>
          <el-table-column prop="serialNo" label="异常编号" width="150px" align="center"></el-table-column>
          <el-table-column prop="planName" label="计划名称" width="100px" align="center"></el-table-column>
          <el-table-column prop="clientName" label="客户" width="100px" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" width="100px" align="center"></el-table-column>
          <el-table-column prop="seriesName" label="系列名称" width="100px" align="center"></el-table-column>
          <el-table-column prop="discover" label="创建人" width="100px" align="center"></el-table-column>
          <el-table-column prop="handleOption" label="处理意见" width="100px" align="center"></el-table-column>
          <el-table-column prop="handleResult" label="处理结果" width="100px" align="center"></el-table-column>
          <el-table-column prop="place" label="地点" width="100px" align="center"></el-table-column>
          <el-table-column prop="principal" label="负责人" width="100px" align="center"></el-table-column>
          <el-table-column prop="scope" label="影响范围" width="100px" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" width="100px" align="center"></el-table-column>
          <el-table-column prop="type" label="异常类型" width="100px" align="center"></el-table-column>
          <el-table-column prop="time" label="时间" width="200px" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200px" align="center"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="200px" align="center"></el-table-column>
          <el-table-column
            prop="content"
            label="异常内容"
            width="300px"
            align="center"
            show-overflow-tooltip
          ></el-table-column>

          <!-- <template slot-scope="scope">{{ scope.row.createTime }}</template> -->
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="updateExceptionClick(scope.row)"
                type="text"
                size="small"
              >更新</el-button>
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

    <!-- 弹出框-添加异常 -->
    <el-dialog
      :modal="false"
      title="添加异常"
      style="min-width:1200px"
      :visible.sync="addExceptionDialogVisible"
    >
      <el-form
        :model="addExceptionRuleForm"
        :rules="addExceptionRules"
        ref="addExceptionRuleForm"
        label-width="100px"
      >
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="发现人" prop="discover" placeholder="请输入内容">
              <el-input v-model="addExceptionRuleForm.discover" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="异常类型" prop="type" placeholder="请输入内容">
              <el-select v-model="addExceptionRuleForm.type" clearable>
                <el-option
                  v-for="item in addExceptionOptions.exceptionTypeOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人" prop="principal" placeholder="请输入内容">
              <el-input v-model="addExceptionRuleForm.principal" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="影响范围" prop="scope" placeholder="请输入内容">
              <el-input v-model="addExceptionRuleForm.scope" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" prop="state" placeholder="请输入内容">
              <el-input v-model="addExceptionRuleForm.state" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地点" prop="place" placeholder="请输入内容">
              <el-input v-model="addExceptionRuleForm.place" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="时间" prop="time" placeholder="请输入内容">
              <el-date-picker
                style="max-width:150px"
                v-model="addExceptionRuleForm.time"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="24">
            <el-form-item label="内容" prop="content" placeholder="请输入内容">
              <el-input type="textarea" v-model="addExceptionRuleForm.content" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处理结果" prop="handleResult" placeholder="请输入内容">
              <el-input
                type="textarea"
                v-model="addExceptionRuleForm.handleResult"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处理结果" prop="handleResult" placeholder="请输入内容">
              <el-input
                type="textarea"
                v-model="addExceptionRuleForm.handleResult"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="3" :offset="10">
            <el-button type="primary" @click="submitForm('addExceptionRuleForm')">保存</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" @click="cancel()">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      inputSuggestions: {
        plans: [],
        series: []
      },

      searchOptions: {
        searchParams: {
          clientName: "",
          brandName: "",
          seriesName: "",
          planName: "",
          dateRange: ""
        },
        options: {
          clientNameOptions: [],
          brandNameOptions: [],
          seriesNameOptions: []
        }
      },
      tableData: [],
      multipleSelection: [],
      searchDisabled: false,

      addExceptionDialogVisible: false,
      addExceptionRules: {
        content: [{ required: false, message: "请输入", trigger: "change" }],
        discover: [{ required: false, message: "请输入", trigger: "change" }],
        place: [{ required: false, message: "请输入", trigger: "change" }],
        principal: [{ required: false, message: "请输入", trigger: "change" }],
        scope: [{ required: false, message: "请输入", trigger: "change" }],
        state: [{ required: false, message: "请输入", trigger: "change" }],
        time: [{ required: false, message: "请输入", trigger: "change" }],
        type: [{ required: false, message: "请输入", trigger: "change" }],
        handleOption: [
          { required: false, message: "请输入", trigger: "change" }
        ],
        handleResult: [
          { required: false, message: "请输入", trigger: "change" }
        ],
        discover: [{ required: false, message: "请输入", trigger: "change" }]
      },
      addExceptionRuleForm: {
        content: "",
        discover: "",
        handleOption: "",
        handleResult: "",
        place: "",
        planId: 0,
        principal: "",
        scope: "",
        state: "",
        time: "",
        type: ""
      },
      addExceptionOptions: { exceptionTypeOptions: [] },

      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      pages: 0,
      tableSelectionData: []
    };
  },

  created: function() {
    const that = this;
    console.log("进入异常管理页面");

    //客户名称加载
    request
      .get(`${window.$config.HOST}/backstage/client/name`)
      .then(response => {
        this.searchOptions.options.clientNameOptions = response.result;
      });

    //品牌名称跟随加载
    request
      .get(`${window.$config.HOST}/backstage/brand/name`)
      .then(response => {
        this.searchOptions.options.brandNameOptions = response.result;
      });

    //异常类型选项
    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "异常类型"
        }
      })
      .then(response => {
        this.addExceptionOptions.exceptionTypeOptions = response.result;
      });

    //加载默认所有的异常计划
    request
      .get(`${window.$config.HOST}/plan-exception/find`, {
        params: {
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        }
      })
      .then(response => {
        this.tableData = response.result;
        this.pagination.total = response.total;
      });

    //输入建议
    request.get(`${window.$config.HOST}/plan/name`).then(response => {
      this.inputSuggestions.plans = [];
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.plans.push(element);
      });
    });

    request.get(`${window.$config.HOST}/info/series/name`).then(response => {
      this.inputSuggestions.series = [];
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.series.push(element);
      });
    });
  },

  mounted() {
    //异常类型选项
    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "异常类型"
        }
      })
      .then(response => {
        this.addExceptionOptions.exceptionTypeOptions = response.result;
      });

    /* 路由跳转参数：
      ? params : row 
      }; */
    let routData = this.$route.params;
    console.log("路由参数:" + Object.keys(routData).length);
    if (Object.keys(routData).length) {
      this.searchOptions.searchParams.clientName = routData.clientName;
      this.searchOptions.searchParams.brandName = routData.brandName;
      this.searchOptions.searchParams.planName = routData.name;
      this.searchOptions.searchParams.seriesName = routData.seriesName;
      this.searchDisabled = true;

      var param = {
        planName: routData.name === "" ? undefined : routData.name,
        seriesName:
          routData.seriesName === "" ? undefined : routData.seriesName,
        pageNum: 1,
        pageSize: 10
      };
      console.log("mounted 参数：", param);

      request
        .get(`${window.$config.HOST}/plan-exception/find`, { params: param })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
        });
    }
  },

  methods: {
    //输入建议
    searchPlanName(queryString, cb) {
      var tmp = this.inputSuggestions.plans;
      var results = queryString
        ? tmp.filter(this.createFilter(queryString))
        : tmp;
      cb(results);
    },
    searchSeriesName(queryString, cb) {
      var tmp = this.inputSuggestions.series;
      var results = queryString
        ? tmp.filter(this.createFilter(queryString))
        : tmp;
      cb(results);
    },

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
    // 改变日期格式
    changeDate(date) {
      if (!date) {
        return undefined;
      } else {
        console.log(date);
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
    changeTime(time) {
      if (!time) {
        return undefined;
      } else {
        console.log(time);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = time.getDate();
        d = d < 10 ? "0" + d : d;
        var h = time.getHours();
        var minute = time.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = time.getSeconds();
        second = minute < 10 ? "0" + second : second;
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      }
    },
    //搜索按钮
    handleSearchClick() {
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
        planName:
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
      console.log("搜索参数:", param);

      request
        .get(`${window.$config.HOST}/plan-exception/find`, {
          params: param
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    updateExceptionClick(row) {
      this.addExceptionRuleForm = {
        id: row.id,
        content: row.content,
        type: row.type,
        place: row.place,
        principal: row.principal,
        handleOption: row.handleOption,
        handleResult: row.handleResult,
        scope: row.scope,
        state: row.state,
        time: row.time
      };
      this.addExceptionDialogVisible = true;
    },
    submitForm(formname) {
      let param = {
        id: this.addExceptionRuleForm.id,
        content: this.addExceptionRuleForm.content,
        type: this.addExceptionRuleForm.type,
        place: this.addExceptionRuleForm.place,
        principal: this.addExceptionRuleForm.principal,
        handleOption: this.addExceptionRuleForm.handleOption,
        handleResult: this.addExceptionRuleForm.handleResult,
        scope: this.addExceptionRuleForm.scope,
        state: this.addExceptionRuleForm.state,
        time:
          this.addExceptionRuleForm.time === ""
            ? ""
            : this.changeTime(this.addExceptionRuleForm.time)
      };

      console.log("添加异常参数：", this.addExceptionRuleForm);
      request.put(`/plan-exception/update`, param).then(response => {
        this.handleSearchClick();
      });
      this.addExceptionDialogVisible = false;
    },
    cancel() {
      this.addExceptionRuleForm.id = "";
      this.addExceptionRuleForm.content = "";
      this.addExceptionRuleForm.type = "";
      this.addExceptionRuleForm.place = "";
      this.addExceptionRuleForm.principal = "";
      this.addExceptionRuleForm.handleOption = "";
      this.addExceptionRuleForm.handleResult = "";
      this.addExceptionRuleForm.scope = "";
      this.addExceptionRuleForm.state = "";

      this.addExceptionRuleForm.time = "";
      this.addExceptionDialogVisible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 900px;
  .bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    .title {
      font-size: 14px;
      min-width: 70px;
      text-align: center;
    }
    .el-autocomplete {
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
  .block {
    padding: 30px 0;
    text-align: center;
    //border-right: solid 1px #EFF2F6;
    //display: inline-block;
    //box-sizing: border-box;
  }
}
</style>
