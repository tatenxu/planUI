<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:15px ; margin-bottom:15px">
        <el-col :span="8">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">客户名称：</span>
            <el-select
              v-model="searchOptions.searchParams.customerName"
              clearable
              :disabled="searchDisabled"
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

        <el-col :span="8">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">品牌：</span>
            <el-select
              v-model="searchOptions.searchParams.brandName"
              clearable
              :disabled="searchDisabled"
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

        <el-col :span="8">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">系列名称：</span>
            <!-- <el-select v-model="searchOptions.searchParams.seriesName" :disabled="searchDisabled">
              <el-option v-for="item in searchOptions.options.seriesNameOptions" :key="item.id" :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>-->
            <el-input v-model="searchOptions.searchParams.seriesName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top:25px">
        <el-col :span="8">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">计划名称：</span>
            <el-input v-model="searchOptions.searchParams.planName" placeholder="请输入内容"></el-input>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">新建时间：</span>
            <el-date-picker
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
              :disabled="searchDisabled"
            ></el-date-picker>
          </div>
        </el-col>

        <el-col :span="4">
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
          <el-table-column prop="id" v-if="false"></el-table-column>
          <el-table-column prop="number" label="异常编号" width="100px" align="center"></el-table-column>
          <el-table-column prop="planNumber" label="计划编号" width="100px" align="center"></el-table-column>
          <el-table-column prop="clientName" label="客户" width="100px" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" width="100px" align="center"></el-table-column>
          <el-table-column prop="planName" label="计划名称" width="100px" align="center"></el-table-column>
          <el-table-column prop="seriesName" label="系列名称" width="100px" align="center"></el-table-column>
          <el-table-column prop="planObject" label="计划对象" width="100px" align="center"></el-table-column>
          <el-table-column prop="content" label="异常内容" width="100px" align="center"></el-table-column>
          <el-table-column prop="discover" label="创建人" width="100px" align="center"></el-table-column>
          <el-table-column prop="handleOption" label="处理意见" width="100px" align="center"></el-table-column>
          <el-table-column prop="handleResult" label="处理结果" width="100px" align="center"></el-table-column>
          <el-table-column prop="place" label="地点" width="100px" align="center"></el-table-column>
          <el-table-column prop="planName" label="计划名称" width="100px" align="center"></el-table-column>
          <el-table-column prop="principal" label="负责人" width="100px" align="center"></el-table-column>
          <el-table-column prop="scope" label="影响范围" width="100px" align="center"></el-table-column>
          <el-table-column prop="serialNo" label="系列号" width="100px" align="center"></el-table-column>
          <el-table-column prop="seriesName" label="系列名称" width="100px" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" width="100px" align="center"></el-table-column>
          <el-table-column prop="time" label="时间" width="100px" align="center"></el-table-column>
          <el-table-column prop="type" label="异常类型" width="100px" align="center"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="100px" align="center"></el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="100px"
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

    <!-- 弹出框-修改 -->
    <el-dialog :modal="false" title="款式组信息" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="time" prop="time" placeholder="请选择客户名称">
              <el-input v-model="ruleForm.time" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="type" prop="type" placeholder="请选择品牌名称">
              <el-input v-model="ruleForm.type" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="place" prop="place" placeholder="请选择系列名称">
              <el-input v-model="ruleForm.place" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="principal" prop="principal" placeholder="请输入内容">
              <el-input v-model="ruleForm.principal" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="handleOption" prop="handleOption" placeholder="请输入内容">
              <el-input v-model="ruleForm.handleOption" clearable placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="handleResult" prop="handleResult" placeholder="请输入内容">
              <el-input v-model="ruleForm.handleResult" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="scope" prop="scope" placeholder="请输入内容">
              <el-input v-model="ruleForm.scope" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="state" prop="state" placeholder="请输入内容">
              <el-input v-model="ruleForm.state" clearable placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="content" prop="content" placeholder="请输入内容">
              <el-input v-model="ruleForm.content" clearable placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="3" :offset="10">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" @click="cancel">取消</el-button>
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
          brandNameOptions: [],
          seriesNameOptions: []
        }
      },
      tableData: [],
      multipleSelection: [],
      searchDisabled: false,

      dialogFormVisible: false,
      rules: {
        content: [{ required: true, message: "请输入", trigger: "change" }],
        handleOption: [
          { required: true, message: "请输入", trigger: "change" }
        ],
        handleResult: [
          { required: true, message: "请输入", trigger: "change" }
        ],
        place: [{ required: true, message: "请输入", trigger: "change" }],
        principal: [{ required: true, message: "请输入", trigger: "change" }],
        scope: [{ required: true, message: "请输入", trigger: "change" }],
        state: [{ required: true, message: "请输入", trigger: "change" }],
        time: [{ required: true, message: "请输入", trigger: "change" }],
        type: [{ required: true, message: "请输入", trigger: "change" }]
      },
      ruleForm: {
        content: "",
        handleOption: "",
        handleResult: "",
        place: "",
        principal: "",
        scope: "",
        state: "",
        time: "",
        type: "",

        discover: "",
        serialNo: "",
        planId: 0,
        id: 0
      },

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
        this.searchOptions.options.customerNameOptions = response.result;
      });

    //品牌名称加载
    request
      .get(`${window.$config.HOST}/backstage/brand/name`)
      .then(response => {
        this.searchOptions.options.brandNameOptions = response.result;
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
        this.pagination.total = request.total;
      });
  },

  mounted() {
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
        });
    }
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
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      }
    },
    //搜索按钮
    handleSearchClick() {
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
          this.pagination.total = request.total;
        })
        .catch(error => {
          console.log("异常搜索失败");
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    updateExceptionClick(row) {
      this.ruleForm.content = row.content;
      this.ruleForm.handleOption = row.handleOption;
      this.ruleForm.handleResult = row.handleResult;
      this.ruleForm.place = row.place;
      this.ruleForm.principal = row.principal;
      this.ruleForm.scope = row.scope;
      this.ruleForm.state = row.state;
      this.ruleForm.time = row.time;
      this.ruleForm.type = row.type;
      this.ruleForm.discover = row.discover;
      this.ruleForm.serialNo = row.serialNo;
      this.ruleForm.planId = row.planId;
      this.ruleForm.id = row.id;

      this.dialogFormVisible = true;
    },
    submitForm(formname) {
      request
        .put(`/backstage/plan-exception/update`, this.ruleForm)
        .then(response => {
          this.handleSearchClick();
        });
      this.dialogFormVisible = false;
    },
    cancel() {
      this.dialogFormVisible = false;
    }
  }
};
</script>


<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  .el-col {
    border-radius: 4px;

    .inputCombineDiv {
      display: flex;
      flex-direction: row;

      .inputTag {
        min-width: 70px;
        font-size: 14px;
        line-height: 40px;
        text-align: center;
      }

      .inputTag1 {
        margin-left: 10px;
        margin-right: 10px;
        width: 18px;
        font-size: 18px;
      }
    }
  }
}

.cardBelow {
  margin-top: 10px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.block {
  padding: 30px 0;
  text-align: center;
  //border-right: solid 1px #EFF2F6;
  //display: inline-block;
  //box-sizing: border-box;
}
</style>
