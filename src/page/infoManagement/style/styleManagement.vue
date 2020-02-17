<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="clientId" :clearable="true" @change="searchClientChanged">
              <el-option v-for="item in searchOptions.clientOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="brandId" :clearable="true">
              <el-option v-for="item in searchOptions.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-autocomplete class="inline-input" v-model="seriesName" :fetch-suggestions="querySearchSeries" placeholder="请输入系列名称" @select="handleSelect" style="width:260px" clearable></el-autocomplete>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">订单款号</div>
            <el-autocomplete class="inline-input" v-model="number" :fetch-suggestions="querySearchStyle" placeholder="请输入订单款号" @select="handleSelect" style="width:260px" clearable></el-autocomplete>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="12">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker class="inputBar" v-model="dateRange" type="daterange" range-separator="至" start-placeholde="开始日期" end-placeholde="结束日期" :clearable="true"></el-date-picker>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch(1)">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div class="table">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-button type="primary" @click="addStyle">添加款号</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="importStyle">批量导入</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="deleteStyle">删除款号</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="bindStyleGroup">绑定款式组</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" max-height="400" border @selection-change="changeCheckBoxFun" :stripe="true" :highlight-current-row="true" style="width: 100%; margin-top: 20px">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="name" width="150" label="款号模板名称" align="center"></el-table-column>
          <el-table-column prop="clientName" width="120" label="客户" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothesLevelName" label="服装层次" align="center"></el-table-column>
          <el-table-column prop="rangeCode" width="150" label="波段编码" align="center"></el-table-column>
          <el-table-column prop="number" width="150" label="订单编号" align="center"></el-table-column>
          <el-table-column prop="projectType" label="项目类型" align="center"></el-table-column>
          <el-table-column prop="orderStage" label="订单阶段" align="center"></el-table-column>
          <el-table-column prop="styleQuantity" width="170" label="正式款数" align="center"></el-table-column>
          <el-table-column prop="pieceQuantity" label="正式件数" align="center"></el-table-column>
          <el-table-column label="操作" width="150" min-width="100" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="scope.row.styleGroupNumber && scope.row.creatorId === meID" type="text" size="small" disabled>修改</el-button>
              <el-button v-if="scope.row.creatorId === meID && !scope.row.styleGroupNumber " @click="styleChanged(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="styleDelete(scope.row)" v-if="scope.row.creatorId === meID" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
        </div>
      </div>
    </el-card>

    <el-dialog :modal="false" title="添加款式" :visible.sync="addPanelFlag">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" placeholder="请选择客户名称" prop="clientId">
              <el-select v-model="addForm.clientId " @change="addClientChanged">
                <el-option v-for="item in addForm.options.clientOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" placeholder="请选择品牌名称" prop="brandId">
              <el-select v-model="addForm.brandId" @change="addBrandChanged">
                <el-option v-for="item in addForm.options.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系列名称" placeholder="请选择系列名称" prop="series">
              <el-select v-model="addForm.series" @change="addSeriesChange">
                <el-option v-for="item in addForm.options.seriesOptions" :key="item.id" :label="item.name" :value="[item.id,item.projectType,item.orderStage]"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="项目类型" placeholder="请输入订单款号" prop="projectType">
              <el-input v-model="addForm.projectType" disabled placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单阶段" placeholder="请输入正式件数" prop="orderStage">
              <el-input v-model="addForm.orderStage" disabled placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="订单款号" placeholder="请输入订单款号" prop="number">
              <el-input v-model="addForm.number" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="正式件数" placeholder="请输入正式件数" prop="pieceQuantity">
              <el-input v-model.number="addForm.pieceQuantity" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="3" :offset="10">
            <el-button type="primary" @click="addSubmit('addForm')">保存</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" @click="addCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog :modal="false" title="修改款式" :visible.sync="updatePanelFlag">
      <el-form :model="updateForm" :rules="updateRules" ref="updateForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" placeholder="请选择客户名称" prop="clientId">
              <el-select v-model="updateForm.clientId " @change="updateClientChanged">
                <el-option v-for="item in updateForm.options.clientOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" placeholder="请选择品牌名称" prop="brandId">
              <el-select v-model="updateForm.brandId" @change="updateBrandChanged">
                <el-option v-for="item in updateForm.options.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系列名称" placeholder="请选择系列名称" prop="series">
              <el-select v-model="updateForm.series" @change="updateSeriesChange">
                <el-option v-for="item in updateForm.options.seriesOptions" :key="item.id" :label="item.name" :value="[item.id,item.projectType,item.orderStage]"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="项目类型" placeholder="请输入订单款号" prop="projectType">
              <el-input v-model="updateForm.projectType" disabled placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单阶段" placeholder="请输入正式件数" prop="orderStage">
              <el-input v-model="updateForm.orderStage" disabled placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="订单款号" placeholder="请输入订单款号" prop="number">
              <el-input v-model="updateForm.number" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="正式件数" placeholder="请输入正式件数" prop="pieceQuantity">
              <el-input v-model.number="updateForm.pieceQuantity" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="3" :offset="10">
            <el-button type="primary" @click="updateSubmit('updateForm')">保存</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" @click="updateCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog :modal="false" title="绑定款式组" :visible.sync="bindPanelFlag">
      <el-form :model="bindStyle" :rules="bindRules" ref="bindStyle" label-width="100px" class="demo-addForm">
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="款式组" placeholder="请选择款式组" prop="styleGroupId">
              <el-select v-model="bindStyle.styleGroupId" :clearable="true">
                <el-option v-for="item in bindStyle.options.styleGroupOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="3" :offset="10">
            <el-button type="primary" @click="bindSubmit('bindStyle')">保存</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" @click="bindCancel">取消</el-button>
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
      meID: "",
      //搜索部分参数
      clientId: "",
      brandId: "",
      seriesName: "",
      number: "",
      dateRange: "",
      searchOptions: {
        clientOptions: {},
        brandOptions: {}
      },

      //表格数据
      tableData: [],
      multipleSelection: [],
      nameSuggestionsStyle: [],
      nameSuggestionsSeries: [],

      //添加款式数据
      addPanelFlag: false,
      addForm: {
        series: [],
        clientId: "",
        brandId: "",
        seriesId: "",
        number: "",
        pieceQuantity: "",
        projectType: "",
        orderStage: "",
        options: {
          clientOptions: {},
          brandOptions: {},
          seriesOptions: {}
        }
      },
      addRules: {
        clientId: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        brandId: [
          { required: true, message: "请选择品牌名称", trigger: "change" }
        ],
        seriesId: [
          { required: true, message: "请选择系列名称", trigger: "change" }
        ],
        number: [{ required: true, message: "请输入订单款号", trigger: "change" }],
        pieceQuantity: [
          {
            required: true,
            message: "请输入大于0的数字！",
            trigger: "change"
          },
          { type: "number", message: "请输入大于0的数字！" }
        ],
        series: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              if (value.length > 0) {
                callback();
              } else {
                callback(new Error("请选择系列名称！"));
              }
            }
          }

        ],
      },

      //修改款式数据
      updatePanelFlag: false,
      updateForm: {
        id: "",
        series: [],
        clientId: "",
        brandId: "",
        seriesId: "",
        projectType: "",
        orderStage: "",
        number: "",
        pieceQuantity: "",
        options: {
          clientOptions: {},
          brandOptions: {},
          seriesOptions: {}
        }
      },
      updateRules: {
        clientId: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        brandId: [
          { required: true, message: "请选择品牌名称", trigger: "change" }
        ],
        seriesId: [
          { required: true, message: "请选择系列名称", trigger: "change" }
        ],
        number: [{ required: true, message: "请输入订单款号", trigger: "change" }],
        pieceQuantity: [
          {
            required: true,
            message: "请输入大于0的数字！",
            trigger: "change"
          },
          { type: "number", message: "请输入大于0的数字！" }
        ],
        series: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              if (value.length > 0) {
                callback();
              } else {
                callback(new Error("请选择系列名称！"));
              }
            }
          }

        ],
      },

      //绑定款式组
      bindPanelFlag: false,
      bindStyle: {
        styleGroupId: "",
        options: {
          styleGroupOptions: {}
        }
      },
      bindRules: {
        styleGroupOptions: [
          { required: true, message: "请选择款式组", trigger: "change" }
        ]
      },
      styleGroupBindList: [],

      //页码部分
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      }
    };
  },
  created: function () {
    //确认自己的信息
    request.get(`/me`).then(response => {
      this.meID = response.result.id;
    });
    //得到品牌名称
    request
      .get(`/backstage/brand/name`, {
        params: {
          clientId: undefined
        }
      })
      .then(response => {
        this.searchOptions.brandOptions = response.result;
      });

    //得到客户名称
    request.get(`/backstage/client/name`).then(response => {
      this.searchOptions.clientOptions = response.result;
      this.addForm.options.clientOptions = response.result;
      this.updateForm.options.clientOptions = response.result;
    });

    //获取系列名称
    request.get(`/info/series/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestionsSeries.push({
          value: element.name
        });
      });
    });

    //得到搜索信息
    request
      .get(`/info/style/find`, {
        params: {
          pageNum: 1,
          pageSize: 10
        }
      })
      .then(response => {
        response.result.forEach(element => {
          this.nameSuggestionsStyle.push({
            value: element.number
          });
        });
        this.tableData = response.result;
        this.pagination.total = response.total;
        this.pagination.currentPageNum = 1;
      });

    //得到搜索信息
    request.get(`/info/style/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestionsStyle.push({
          value: element.number
        });
      });
    });
  },

  methods: {
    //添加系列的时候选择了系列
    addSeriesChange() {
      if (this.addForm.series.length > 0) {
        this.addForm.seriesId = this.addForm.series[0];
        this.addForm.projectType = this.addForm.series[1];
        this.addForm.orderStage = this.addForm.series[2];
      }
    },
    //修改系列的时候选择了系列
    updateSeriesChange() {
      if (this.updateForm.series.length > 0) {
        this.updateForm.seriesId = this.updateForm.series[0];
        this.updateForm.projectType = this.updateForm.series[1];
        this.updateForm.orderStage = this.updateForm.series[2];
      }
    },
    //当搜索框的客户名称改变的时候GET弹出框的品牌信息
    searchClientChanged() {
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: this.clientId === "" ? undefined : this.clientId
          }
        })
        .then(response => {
          this.searchOptions.brandOptions = response.result;
          this.brandId = 1;
          this.brandId = "";
        });
    },
    //系列名称搜索的输入建议
    querySearchStyle(queryString, cb) {
      var nameSuggestions = this.nameSuggestionsStyle;
      var results = queryString
        ? nameSuggestions.filter(this.createFilter(queryString))
        : nameSuggestions;
      cb(results);
    },
    querySearchSeries(queryString, cb) {
      var nameSuggestions = this.nameSuggestionsSeries;
      var results = queryString
        ? nameSuggestions.filter(this.createFilter(queryString))
        : nameSuggestions;
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    bindSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.multipleSelection.forEach(element => {
            this.styleGroupBindList.push({
              styleGroupId: this.bindStyle.styleGroupId,
              styleId: element.id
            });
          });
          request
            //此处的接口为GET订单款号
            .post(`/info/style-group-relation/bind`, this.styleGroupBindList)
            .then(response => {
              this.handleSearch(this.pagination.currentPage);
              this.bindPanelFlag = false;
              this.bindStyle.styleGroupId = "";
              this.styleGroupBindList = [];
            });
        } else {
          this.$message({
            message: "请选择款式组进行绑定操作！",
            type: "error"
          });
        }
      });
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.handleSearch(1);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.handleSearch(val);
    },
    //添加款式时，选择客户变化时重新获取品牌下拉框
    addClientChanged() {
      this.addForm.brandId = "";
      this.addForm.seriesId = "";
      this.addForm.options.brandOptions = {};
      this.addForm.options.seriesOptions = {};
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: this.addForm.clientId
          }
        })
        .then(response => {
          this.addForm.options.brandOptions = response.result;
        });
    },
    //添加款式时，选择品牌变化时重新获取系列下拉框
    addBrandChanged() {
      this.addForm.seriesId = "";
      this.addForm.options.seriesOptions = {};
      request
        .get(`/info/series/name`, {
          params: {
            brandId: this.addForm.brandId
          }
        })
        .then(response => {
          this.addForm.options.seriesOptions = response.result;
        });
    },

    //修改款式时，选择客户变化时重新获取品牌下拉框
    updateClientChanged() {
      this.updateForm.brandId = "";
      this.updateForm.seriesId = "";
      this.updateForm.options.brandOptions = {};
      this.updateForm.options.seriesOptions = {};
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: this.updateForm.clientId
          }
        })
        .then(response => {
          this.updateForm.options.brandOptions = response.result;
        });
    },
    //修改款式时，选择品牌变化时重新获取系列下拉框
    updateBrandChanged() {
      this.updateForm.seriesId = "";
      this.updateForm.options.seriesOptions = {};
      request
        .get(`/info/series/name`, {
          params: {
            brandId: this.updateForm.brandId
          }
        })
        .then(response => {
          this.updateForm.options.seriesOptions = response.result;
        });
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
        return y + "-" + m + "-" + d;
      }
    },
    // 搜索按钮点击
    handleSearch(currentPageNum) {
      let startDate;
      let endDate;
      if (this.dateRange == null) {
        startDate = undefined;
        endDate = undefined;
      } else {
        startDate = this.changeDate(this.dateRange[0]);
        endDate = this.changeDate(this.dateRange[1]);
      }
      request
        .get(`/info/style/find`, {
          params: {
            clientId: this.clientId === "" ? undefined : this.clientId,
            brandId: this.brandId === "" ? undefined : this.brandId,
            seriesName: this.seriesName === "" ? undefined : this.seriesName,
            number: this.number === "" ? undefined : this.number,
            createAfter: startDate,
            createBefore: endDate,
            pageNum: currentPageNum,
            pageSize: this.pagination.pageSize
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.currentPage = currentPageNum;
          this.pagination.total = response.total;
        });
    },
    // 选择框改变监控
    changeCheckBoxFun(val) {
      this.multipleSelection = val;
    },
    // 添加款号
    addStyle() {
      this.addForm.series = [];
      this.addForm.projectType = "";
      this.addForm.orderStage = "";
      this.addForm.clientId = "";
      this.addForm.brandId = "";
      this.addForm.seriesId = "";
      this.addForm.number = "";
      this.addForm.pieceQuantity = "";
      this.addForm.options.brandOptions = {};
      this.addForm.options.seriesOptions = {};
      this.addPanelFlag = true;
    },
    // 导入款号
    importStyle() {
      const that = this;
      that.$router.push({
        name: `styleImport`
      });
    },
    // 删除款号
    deleteStyle() {
      const that = this;
      if (that.multipleSelection.length === 0) {
        this.$message({
          message: "请选择要删除的款号",
          type: "warning"
        });
      } else if (that.multipleSelection.length >= 1) {
        let flag = 0;
        this.multipleSelection.forEach(element => {
          if (element.creatorId != this.meID) flag++;
        });
        if (flag === 0) {
          this.$confirm(
            "删除所选的" +
            that.multipleSelection.length +
            "条款式组信息, 是否继续?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              this.multipleSelection.forEach(element => {
                request
                  .delete(`/info/style/delete`, {
                    params: {
                      id: element.id
                    }
                  })
                  .then(response => {
                    this.handleSearch(1);
                  });
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        } else {
          this.$message({
            message: "您没有权限删除其中的某些条目！",
            type: "warning"
          });
        }
      }
    },
    // 绑定款式组
    bindStyleGroup() {
      const that = this;
      if (that.multipleSelection.length === 0) {
        this.$message({
          message: "请选择要绑定款式组的款号",
          type: "warning"
        });
      } else if (that.multipleSelection.length >= 1) {
        let seriesId = this.multipleSelection[0].seriesId;
        let ok = 0;
        this.multipleSelection.forEach(element => {
          // if (element.state === "绑定") {
          //   this.$message({
          //     message: "所选择的款式中包含已绑定款式！",
          //     type: "error"
          //   });
          //   ok++;
          // }
          if (element.seriesId != seriesId) {
            ok++;
            this.$message({
              message: "请选择同一系列下的款式进行绑定！",
              type: "warning"
            });
          }
        });
        if (ok === 0) {
          //得到款式组下拉框
          request
            .get(`/info/style-group/name`, {
              params: {
                seriesId: seriesId
              }
            })
            .then(response => {
              this.bindStyle.options.styleGroupOptions = response.result;
              this.bindPanelFlag = true;
            });
        }
      }
    },
    // 表格中的修改
    styleChanged(row) {
      //得到系列名称
      request
        .get(`/info/series/name`, {
          params: {
            brandId: row.brandId
          }
        })
        .then(response => {
          this.updateForm.options.seriesOptions = response.result;
        });
      //得到品牌名称
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: row.clientId
          }
        })
        .then(response => {
          this.updateForm.options.brandOptions = response.result;
        });
      this.updateForm.series = row.seriesName;
      this.updateForm.projectType = row.projectType;
      this.updateForm.orderStage = row.orderStage;
      this.updateForm.clientId = row.clientId;
      this.updateForm.brandId = row.brandId;
      this.updateForm.seriesId = row.seriesId;
      this.updateForm.number = row.number;
      this.updateForm.id = row.id;
      this.updateForm.pieceQuantity = row.pieceQuantity;
      this.updatePanelFlag = true;
    },
    // 表格中的删除
    styleDelete(row) {
      const that = this;
      this.$confirm("是否确认删除该款号？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        request
          .delete(`/info/style/delete`, {
            params: {
              id: row.id
            }
          })
          .then(response => {
            this.handleSearch(1);
          });
      });
    },
    addSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let brandName = "";
          this.addForm.options.brandOptions.forEach(ele => {
            if (ele.id === this.addForm.brandId) brandName = ele.name;
          })
          request
            .post(`/info/style/insert`, {
              number: this.addForm.number,
              seriesId: this.addForm.seriesId,
              pieceQuantity: this.addForm.pieceQuantity,
              name: brandName + this.addForm.number + this.addForm.orderStage
            })
            .then(response => {
              this.handleSearch(1);
              this.addPanelFlag = false;
            });
        } else {
          this.$message({
            type: "error",
            message: "请填写必须填写的项！"
          });
        }
      });
    },

    updateSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            //此处的接口为GET订单款号
            .put(`/info/style/update`, {
              id: this.updateForm.id,
              number: this.updateForm.number,
              seriesId: this.updateForm.seriesId,
              pieceQuantity: this.updateForm.pieceQuantity
            })
            .then(response => {
              this.handleSearch(this.pagination.currentPage);
              this.updateForm.clientId = "";
              this.updateForm.brandId = "";
              this.updateForm.seriesId = "";
              this.updateForm.number = "";
              this.updateForm.pieceQuantity = "";
              this.updateForm.id = "";
              this.updatePanelFlag = false;
            });
        } else {
          this.$message({
            type: "error",
            message: "请填写必须填写的项！"
          });
        }
      });
    },
    // 取消按钮点击
    bindCancel() {
      this.bindPanelFlag = false;
      this.bindStyle.styleGroupId = "";
      this.styleGroupBindList = [];
    },
    addCancel() {
      this.addForm.clientId = "";
      this.addForm.brandId = "";
      this.addForm.seriesId = "";
      this.addForm.number = "";
      this.addForm.pieceQuantity = "";
      this.addForm.options.brandOptions = {};
      this.addForm.options.seriesOptions = {};
      this.addPanelFlag = false;
    },
    updateCancel() {
      this.updateForm.id = "";
      this.updateForm.clientId = "";
      this.updateForm.brandId = "";
      this.updateForm.seriesId = "";
      this.updateForm.number = "";
      this.updateForm.pieceQuantity = "";
      this.updateForm.options.brandOptions = {};
      this.updateForm.options.seriesOptions = {};
      this.updatePanelFlag = false;
    }
  }
};
</script>
<style lang="less">
.el-table .cell {
  white-space: pre-line;
}
body .el-table th.gutter {
  display: table-cell !important;
}
</style>
<style lang="less" scoped>
.box-card {
  min-width: 900px;
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
    }
    .el-select {
      width: 300px;
      min-width: 75px;
    }
  }
  .block {
    padding: 30px 0;
    text-align: center;
  }
}
</style>