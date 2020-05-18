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
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <af-table-column type="selection"></af-table-column>
          <!-- <af-table-column type="index" label="序号" align="center"></af-table-column> -->
          <af-table-column prop="planName" label="计划名称" align="center"></af-table-column>
          <af-table-column prop="clientName" label="客户" align="center"></af-table-column>
          <af-table-column prop="brandName" label="品牌" align="center"></af-table-column>
          <af-table-column prop="seriesName" label="系列名称" align="center"></af-table-column>
          <af-table-column prop="discover" label="发现人" align="center"></af-table-column>
          <af-table-column prop="handleOption" label="处理意见" align="center"></af-table-column>
          <af-table-column prop="handleResult" label="处理结果" align="center"></af-table-column>
          <af-table-column prop="place" label="地点" align="center"></af-table-column>
          <af-table-column prop="principal" label="负责人" align="center"></af-table-column>
          <af-table-column prop="scope" label="影响范围" align="center"></af-table-column>
          <af-table-column prop="state" label="状态" align="center"></af-table-column>
          <af-table-column prop="type" label="异常类型" align="center"></af-table-column>
          <af-table-column prop="time" label="时间" align="center"></af-table-column>
          <af-table-column prop="createTime" label="创建时间" align="center"></af-table-column>
          <af-table-column prop="updateTime" label="更新时间" align="center"></af-table-column>
          <af-table-column prop="content" label="异常内容" align="center" show-overflow-tooltip></af-table-column>

          <!-- <template slot-scope="scope">{{ scope.row.createTime }}</template> -->
          <af-table-column fixed="right" width="80px" label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="updateExceptionClick(scope.row)"
                type="text"
                size="small"
              >更新</el-button>
            </template>
          </af-table-column>
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
                v-model="addExceptionRuleForm.time"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
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
            <el-form-item label="处理建议" prop="handleOption" placeholder="请输入内容">
              <el-input
                type="textarea"
                v-model="addExceptionRuleForm.handleOption"
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
// 导入封装的自定义的axios插件用于http请求
import request from "@/utils/request";

export default {
  // 此页面需要用到的数据定义
  data() {
    return {
      // 输入建议，包含计划名称输入建议，系列名称输入建议
      inputSuggestions: {
        plans: [],
        series: []
      },

      // 搜索选项相关变量
      searchOptions: {
        searchParams: {
          clientName: undefined, // 客户名称输入
          brandName: undefined, // 品牌名称输入
          seriesName: undefined, //系列名称输入
          planName: undefined, //计划名称输入
          dateRange: undefined //日期范围输入
        },
        // 输入选项中相关的多选
        options: {
          clientNameOptions: [], //客户名称多选项信息
          brandNameOptions: [] //品牌名称多选项信息
        }
      },

      tableData: [], // 页面展示的异常计划信息
      multipleSelection: [], // 表格数据多选选择的数据
      searchDisabled: false, // 是否允许搜索数据

      addExceptionDialogVisible: false, // 控制添加异常对话框el-dialog是否显示
      // 添加异常对话框中表单元素的类型检查规则
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
        ]
      },
      // 添加异常对话框中表单元素变量
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
      // 添加异常对话框中异常类型下拉框的选项
      addExceptionOptions: { exceptionTypeOptions: [] },

      // 页码控制相关变量
      pagination: {
        currentPage: 1, // 当前页码
        pageSizes: [10, 20, 30, 40, 50], // 页码选项中x条/页的选择项
        pageSize: 10, // 当前页面展示多少条数据
        total: 0 // 后台一共有多少条数据
      }
    };
  },

  created: function() {
    console.log("进入异常管理页面");

    //客户名称下拉框数据加载，接口格式见接口文档
    request.get(`/backstage/client/name`).then(response => {
      // 返回数据存储于this.searchOptions.options.clientNameOptions
      this.searchOptions.options.clientNameOptions = response.result;
    });

    //品牌名称下拉框数据加载，接口格式见接口文档
    request.get(`/backstage/brand/name`).then(response => {
      // 返回数据存储于this.searchOptions.options.brandNameOptions
      this.searchOptions.options.brandNameOptions = response.result;
    });

    //根据默认搜索条件加载所有的异常计划
    this.handleSearchClick();

    //异常类型选项下拉框加载，接口格式见接口文档
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "异常类型"
        }
      })
      .then(response => {
        // 返回数据存储于this.addExceptionOptions.exceptionTypeOptions
        this.addExceptionOptions.exceptionTypeOptions = response.result;
      });

    //获取普通计划的输入建议，接口详情件接口文档
    request.get(`/plan/name`).then(response => {
      this.inputSuggestions.plans = [];

      /* 
      获取的返回数据存储在this.inputSuggestions.plans
      因为el-autocomplete组件中，对应值字段是value，而返回数据中是name字段，所以遍历
      返回数据，将其中的name字段赋值给value字段
      */
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.plans.push(element);
      });
    });

    //获取系列名称的输入建议，接口详情件接口文档
    request.get(`/info/series/name`).then(response => {
      this.inputSuggestions.series = [];

      /* 
      获取的返回数据存储在this.inputSuggestions.series
      因为el-autocomplete组件中，对应值字段是value，而返回数据中是name字段，所以遍历
      返回数据，将其中的name字段赋值给value字段
      */
      response.result.forEach(element => {
        element.value = element.name;
        this.inputSuggestions.series.push(element);
      });
    });
  },

  // vue 的mounted生命周期，在这里如果有路由跳转过来的路由参数，则解析，否则跳过
  mounted() {
    //异常类型选项下拉框加载，接口格式见接口文档
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "异常类型"
        }
      })
      .then(response => {
        // 返回数据存储于this.addExceptionOptions.exceptionTypeOptions
        this.addExceptionOptions.exceptionTypeOptions = response.result;
      });

    /* 路由跳转参数：
      ? params : row ，需要展示的异常数据
      }; */
    let routData = this.$route.params; // 获取到路由参数
    console.log("路由参数:" + Object.keys(routData).length);

    // 根据参数的长度判断是否含有留有参数，没有则跳过
    if (Object.keys(routData).length) {
      // 根据路由参数为相应的输入框赋值
      this.searchOptions.searchParams.clientName = routData.clientName;
      this.searchOptions.searchParams.brandName = routData.brandName;
      this.searchOptions.searchParams.planName = routData.name;
      this.searchOptions.searchParams.seriesName = routData.seriesName;
      this.searchDisabled = true; // 禁用这个页面的搜索功能

      // 根据路由参数，构造搜索该异常的参数，接口详情参阅接口文档
      var param = {
        planName: routData.name === "" ? undefined : routData.name,
        seriesName:
          routData.seriesName === "" ? undefined : routData.seriesName,

        pageNum: 1,
        pageSize: 10
      };
      console.log("mounted 参数：", param);

      // 调用/plan-exception/find接口搜索异常计划数据
      request.get(`/plan-exception/find`, { params: param }).then(response => {
        this.tableData = response.result;
        this.pagination.total = response.total;
      });
    }
  },

  methods: {
    /* 
    el-autocomplete组件的根据输入字段,在所有输入建议中过滤匹配字段的函数，
    组件详情：https://element.eleme.cn/#/zh-CN/component/input 
    */
    createFilter(queryString) {
      return element => {
        return (
          element.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    /* 
    el-autocomplete组件的函数，为普通计划搜索建议赋值
    组件详情：https://element.eleme.cn/#/zh-CN/component/input 
    */
    searchPlanName(queryString, cb) {
      var tmp = this.inputSuggestions.plans;
      var results = queryString
        ? tmp.filter(this.createFilter(queryString))
        : tmp;
      cb(results);
    },

    /* 
    el-autocomplete组件的函数，为系列名称搜索建议赋值
    组件详情：https://element.eleme.cn/#/zh-CN/component/input 
    */
    searchSeriesName(queryString, cb) {
      var tmp = this.inputSuggestions.series;
      var results = queryString
        ? tmp.filter(this.createFilter(queryString))
        : tmp;
      cb(results);
    },

    // 客户名称el-select组件响应函数，当客户名称选择变化时，搜索选项中品牌名称下拉框数据对应变化，重新加载该数据
    clientNameChange() {
      request
        .get(`/backstage/brand/name`, {
          params: { clientId: this.searchOptions.searchParams.clientName }
        })
        .then(response => {
          this.searchOptions.options.brandNameOptions = response.result;
        });
    },

    // el-pagination对应函数，当每页需要展示的数据数量变化时触发
    handleSizeChange(val) {
      this.pagination.pageSize = val; // 当前页面展示数据数量存储于this.pagination.pageSize字段
      this.pagination.currentPage = 1;
      this.handleSearch(); // 重新加载页面展示的计划数据
    },
    // el-pagination对应函数，当当前页码变化时触发
    handleCurrentChange(val) {
      this.pagination.currentPage = val; // 当前页码存储于this.pagination.currentPage
      this.handleSearch(); // 重新加载页面展示的计划数据
    },

    // 辅助函数：将js date对象转变为字符串对象
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

    // 辅助函数：将js date对象转变为字符串对象
    changeTime(time) {
      if (!time) {
        return undefined;
      } else {
        console.log(time);
        time = new Date(time);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = time.getDate();
        d = d < 10 ? "0" + d : d;
        var h = time.getHours();
        h = h < 10 ? "0" + h : h;
        var minute = time.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = time.getSeconds();
        second = minute < 10 ? "0" + second : second;

        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      }
    },

    //搜索函数，调用时将根据页面的搜索选项重新加载页面表格中展示的数据
    handleSearchClick() {
      var param; // 定义参数变量

      // 根据页面搜索功能是否禁用，构造不同的搜索方法，接口详情参阅接口文档
      if (this.searchDisabled) {
        // 如果搜索禁用，只使用seriesName，planName，pageNum，pageSize四个参数
        param = {
          seriesName:
            this.searchOptions.searchParams.seriesName === ""
              ? undefined
              : this.searchOptions.searchParams.seriesName,
          planName:
            this.searchOptions.searchParams.planName === ""
              ? undefined
              : this.searchOptions.searchParams.planName,
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        };
      } else {
        // 如果没有禁用搜索，就根究搜索输入构造搜索参数
        param = {
          // 以下成员字段详情见接口文档，在赋值时额外判断下时候为空，为空则赋值为undefined
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

          // 以下两个字段利用辅助函数将js date对象转化为字符串
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

          // 页码相关参数
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.pageSize
        };
      }

      // 调用/plan-exception/find接口
      request
        .get(`/plan-exception/find`, {
          params: param
        })
        .then(response => {
          this.tableData = response.result; // 搜索结果存储在tableData中
          this.pagination.total = response.total; // 该搜索条件下一共有多少条数据
        });
    },

    // 表格多选时触发函数
    handleSelectionChange(val) {
      this.multipleSelection = val; //将多选的数据存储于this.multipleSelection中
    },

    // 表格行操作中的更新按钮点击时的响应函数，显示更新异常的对话框，并将表格中相关数据赋值到对话框中
    updateExceptionClick(row) {
      // 将行数据赋值传递到弹出对话框的form表单中。
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
        time: row.time,
        discover: row.discover
      };

      // 显示跟新异常对话框
      this.addExceptionDialogVisible = true;
    },

    // 更新异常中的保存按钮点击后的响应函数，提交表单
    submitForm(formname) {
      // 根据表单数据构造/plan-exception/update接口的参数
      let param = {
        id: this.addExceptionRuleForm.id,
        discover: this.addExceptionRuleForm.discover,
        content: this.addExceptionRuleForm.content,
        type: this.addExceptionRuleForm.type,
        place: this.addExceptionRuleForm.place,
        principal: this.addExceptionRuleForm.principal,
        handleOption: this.addExceptionRuleForm.handleOption,
        handleResult: this.addExceptionRuleForm.handleResult,
        scope: this.addExceptionRuleForm.scope,
        state: this.addExceptionRuleForm.state,

        // 时间转化为字符串
        time:
          this.addExceptionRuleForm.time === ""
            ? ""
            : this.changeTime(this.addExceptionRuleForm.time)
      };

      console.log("添加异常参数：", param);
      //调用/plan-exception/update接口更新异常信息
      request.put(`/plan-exception/update`, param).then(response => {
        this.handleSearchClick(); // 更新成功后，handleSearchClick函数根据搜索条件重新加载数据
      });
      this.addExceptionDialogVisible = false; //关闭更新异常对话框
    },

    // 更新异常中的取消按钮点击后的响应函数，清空表单数据并关闭对话框
    cancel() {
      //清空表单
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

      // 关闭对话框
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
