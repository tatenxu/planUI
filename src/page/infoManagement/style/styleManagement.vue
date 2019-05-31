<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="searchOptions.searchParams.customerName" :clearable="true">
              <!-- @change="customerNameSelectionChange" -->
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
            <el-select v-model="searchOptions.searchParams.brandName" :clearable="true">
              <!-- @change="brandNameSelectionChange" -->
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
            <div class="title">系列名称</div>
            <el-select v-model="searchOptions.searchParams.rangeName" :clearable="true">
              <!-- @change="rangeNameSelectionChange" -->
              <el-option
                v-for="item in searchOptions.options.rangeNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">订单款号</div>
            <el-select v-model="searchOptions.searchParams.number" :clearable="true">
              <el-option
                v-for="item in searchOptions.options.styleNumberNameOptions"
                :key="item.id"
                :label="item.number"
                :value="item.number"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <!-- <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="searchOptions.searchParams.clothingType">
              <el-option
                v-for="item in searchOptions.options.clothingTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>-->
        <el-col :span="12">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              class="inputBar"
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              :clearable="true"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
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
        <el-table
          :data="tableDataA"
          :default-sort="{prop:'styleGroupName',order:'ascending'}"
          max-height="400"
          border
          @selection-change="changeCheckBoxFun"
          :stripe="true"
          :highlight-current-row="true"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="styleGroupNumber" width="150" label="款式组编号" align="center"></el-table-column>
          <el-table-column prop="styleGroupName" width="130" label="款式组名称" align="center"></el-table-column>
          <el-table-column prop="number" width="150" label="订单款号" align="center"></el-table-column>
          <el-table-column prop="rangeNumber" width="130" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="customerName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothingLevelName" label="服装层次" align="center"></el-table-column>
          <el-table-column prop="rangeName" width="150" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="createTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="addingModeStr" label="添加方式" align="center"></el-table-column>
          <el-table-column prop="stateStr" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" width="150" min-width="100" align="center" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button @click="getStyleData(scope.row)" type="text" size="small">查看</el-button> -->
              <el-button @click="changeStyleData(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="deleteStyleData(scope.row)" type="text" size="small">删除</el-button>
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
      </div>
    </el-card>

    <el-dialog :modal="false" title="款式信息" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" placeholder="请选择客户名称" prop="customerName">
              <el-select
                v-model="ruleForm.customerName "
                @change="dialogCustomerNameSelectionChange"
              >
                <el-option
                  v-for="item in options.customerNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" placeholder="请选择品牌名称" prop="brandName">
              <el-select v-model="ruleForm.brandName " @change="dialogBrandNameSelectionChange">
                <el-option
                  v-for="item in options.brandNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系列名称" placeholder="请选择系列名称" prop="rangeName">
              <el-select v-model="ruleForm.rangeName ">
                <el-option
                  v-for="item in options.rangeNameTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="10">
            <el-form-item label="订单款号" placeholder="请输入订单款号" prop="number">
              <el-input v-model="ruleForm.number" clearable placeholder="请输入"></el-input>
              <!-- <el-select v-model="ruleForm.number ">
                <el-option
                  v-for="item in options.styleNumberOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>-->
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="服装层次" prop="clothingLevelName" placeholder="请选择服装层次">
              <el-select v-model="ruleForm.clothingLevelName">
                <el-option
                  v-for="item in options.clothingTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
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

    <el-dialog :modal="false" title="款式信息" :visible.sync="dialogFormVisible1">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" placeholder="请选择客户名称" prop="customerName">
              <el-select
                v-model="ruleForm.customerName"
                @change="dialogCustomerNameSelectionChange"
              >
                <el-option
                  v-for="item in options.customerNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" placeholder="请选择品牌名称" prop="brandName">
              <el-select v-model="ruleForm.brandName" @change="dialogBrandNameSelectionChange">
                <el-option
                  v-for="item in options.brandNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系列名称" placeholder="请选择系列名称" prop="rangeName">
              <el-select v-model="ruleForm.rangeName">
                <el-option
                  v-for="item in options.rangeNameTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="10">
            <el-form-item label="订单款号" placeholder="请输入订单款号" prop="number">
              <el-input v-model="ruleForm.number" clearable placeholder="请输入"></el-input>
              <!-- <el-select v-model="ruleForm.number">
                <el-option
                  v-for="item in options.styleNumberOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>-->
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="服装层次" prop="clothingLevelName" placeholder="请选择服装层次">
              <el-select v-model="ruleForm.clothingLevelName">
                <el-option
                  v-for="item in options.clothingTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="3" :offset="10">
            <el-button type="primary" @click="submitForm1('ruleForm')">保存</el-button>
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
export default {
  data() {
    return {
      rules: {
        customerName: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        brandName: [
          { required: true, message: "请选择品牌名称", trigger: "change" }
        ],
        rangeName: [
          { required: true, message: "请选择系列名称", trigger: "change" }
        ],
        number: [{ required: true, message: "请输入订单款号", trigger: "blur" }]
        // rangeAmount: [
        //   { required: true, message: "请输入系列款数", trigger: "blur" }
        // ]
      },
      tableDataA: [],
      dateRange: "",
      dialogFormVisible1: false,
      DateStart: "",
      DateEnd: "",
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      searchOptions: {
        searchParams: {
          customerName: "",
          brandName: "",
          rangeName: "",
          number: "",
          dateRange: ""
        },
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          clothingTypeOptions: [],
          rangeNameOptions: [],
          styleNumberNameOptions: []
        }
      },
      data: {
        tableData: []
      },
      multipleSelection: [],
      infoManagementErrorCode: [
        {
          errorCode: -1,
          errotInfo: "新增的数据数据库中已经存在"
        },
        {
          errorCode: -2,
          errotInfo: "传入信息的字段缺失"
        },
        {
          errorCode: -3,
          errotInfo: "数据库操作错误"
        },
        {
          errorCode: -4,
          errotInfo: "数据不唯一"
        },
        {
          errorCode: -5,
          errotInfo: "数据库其他错误"
        },
        {
          errorCode: -6,
          errotInfo: "数据不存在"
        },
        {
          errorCode: -7,
          errotInfo: "数据状态错误"
        }
      ],
      ruleForm: {
        rangeId: "",
        rangeNumber: "",
        rangeName: "",
        styleGroupId: "",
        styleGroupNumber: "",
        styleGroupName: "",
        id: "",
        number: "",
        customerId: "",
        customerName: "",
        brandId: "",
        brandName: "",
        clothingLevelId: "",
        clothingLevelName: "",
        createrName: "",
        deptName: "",
        createTime: "",
        addingMode: "",
        state: "",
        havePlan: false
      },
      options: {
        customerNameOptions: [],
        brandNameOptions: [],
        clothingTypeOptions: [],
        rangeNameTypeOptions: [],
        styleNumberOptions: []
      },
      controlData: {
        ifStyleAdd: false,
        ifStyleChange: false
      },
      dialogFormVisible: false
    };
  },
  created: function() {
    var that = this;
    //得到订单款号
    this.$axios
      //此处的接口为GET订单款号
      .get(`${window.$config.HOST}/infoManagement/getStyleNumber`, {
        params: {
          rangeId: ""
        }
      })
      .then(response => {
        // this.options.styleNumberOptions = response.data;
        this.searchOptions.options.styleNumberNameOptions = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取订单款号失败",
          type: "error"
        });

        // this.searchOptions.options.styleNumberNameOptions = [
        //   {
        //     id: 1,
        //     name: "XY——0000001"
        //   },
        //   {
        //     id: 2,
        //     name: "YZ——0000002"
        //   }
        // ];
      });
    //得到系列名称
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getRangeName`, {
        params: {
          brandId: ""
        }
      })
      .then(response => {
        this.searchOptions.options.rangeNameOptions = response.data;
        // this.options.rangeNameTypeOptions = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取系列名称失败",
          type: "error"
        });
        // this.searchOptions.options.rangeNameOptions = [
        //   {
        //     id: 1,
        //     name: "A系列"
        //   },
        //   {
        //     id: 2,
        //     name: "B系列"
        //   }
        // ];
        // this.searchOptions.options.rangeNameOptions=this.options.rangeNameTypeOptions;
      });
    //得到品牌名称
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`, {
        params: {
          customerId: ""
        }
      })
      .then(response => {
        this.searchOptions.options.brandNameOptions = response.data;
        // this.options.brandNameOptions = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取品牌信息失败",
          type: "error"
        });
        //  this.searchOptions.options.brandNameOptions = [
        //   {
        //     id: 1,
        //     name: "X品牌"
        //   },
        //   {
        //     id: 2,
        //     name: "Y品牌"
        //   }
        // ];
        // this.searchOptions.options.brandNameOptions = this.options.brandNameOptions ;
      });
    //得到客户名称
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getCustomerName`)
      .then(response => {
        var CustomerList = response.data;
        this.searchOptions.options.customerNameOptions = CustomerList;
        this.options.customerNameOptions = this.searchOptions.options.customerNameOptions;
      })
      .catch(error => {
        this.$message({
          message: "获取客户名称失败",
          type: "error"
        });
      });

    //得到搜索信息
    this.$axios
      .post(`${window.$config.HOST}/infoManagement/getStyleList`, {})
      .then(response => {
        console.log(response.data);
        var SearchList = response.data;
        this.data.tableData = SearchList;
        // this.data.tableData.sort(function(b, a) {
        //   console.log("a-b:",a.styleGroupId-b.styleGroupId)
        //   if(a.styleGroupId==null) return 1;
        //   else if(b.styleGroupId==null) return -1;
        //   return a.styleGroupId-b.styleGroupId;
        // });
        this.data.tableData.forEach(element => {
          var d = new Date(element.createTime);
          let time = d.toLocaleString();
          element.createTime = time;

          this.pagination.total = response.data.length;
          let i = (this.pagination.currentPage - 1) * this.pagination.pageSize;
          let k = (this.pagination.currentPage - 1) * this.pagination.pageSize;
          this.tableDataA = [];

          for (
            ;
            i - k < this.pagination.pageSize && i < this.data.tableData.length;
            i++
          ) {
            this.tableDataA.push(this.data.tableData[i]);
          }
        });
      })
      .catch(error => {
        this.$message({
          message: "获取款式搜索结果失败",
          type: "error"
        });
      });
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
    dialogCustomerNameSelectionChange() {
      var list = {
        customerId: this.ruleForm.customerName
      };
      console.log(list);
      this.$axios
        .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`, {
          params: list
        })
        .then(response => {
          console.log(response.data);
          this.options.brandNameOptions = response.data;
        })
        .catch(error => {
          this.$message({
            message: "获取品牌信息失败",
            type: "error"
          });
        });

      this.ruleForm.brandName = "";
      this.ruleForm.rangeName = "";
      // this.ruleForm.number = "";
    },
    dialogBrandNameSelectionChange() {
      var list = {
        brandId: this.ruleForm.brandName
      };
      this.$axios
        .get(`${window.$config.HOST}/infoManagement/getRangeName`, {
          params: list
        })
        .then(response => {
          this.options.rangeNameTypeOptions = response.data;
        })
        .catch(error => {
          this.$message({
            message: "获取系列信息失败",
            type: "error"
          });
        });
      this.ruleForm.rangeName = "";
      // this.ruleForm.number = "";
    },

    // 改变日期格式
    changeDate(date) {
      console.log(date);
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
    handleSearch() {
      let startDate;
      let endDate;
      if (this.dateRange == null) {
        startDate = undefined;
        endDate = undefined;
      } else {
        (startDate = this.changeDate(this.dateRange[0])),
          (endDate = this.changeDate(this.dateRange[1]));
      }
      let list = {
        customerId:
          this.searchOptions.searchParams.customerName === ""
            ? undefined
            : this.searchOptions.searchParams.customerName,
        brandId:
          this.searchOptions.searchParams.brandName === ""
            ? undefined
            : this.searchOptions.searchParams.brandName,
        rangeId:
          this.searchOptions.searchParams.rangeName === ""
            ? undefined
            : this.searchOptions.searchParams.rangeName,
        clothingType: undefined,
        number:
          this.searchOptions.searchParams.number === ""
            ? undefined
            : this.searchOptions.searchParams.number,
        id: undefined,
        startDate: startDate,
        endDate: endDate
      };
      console.log(list);

      this.$axios
        .post(`${window.$config.HOST}/infoManagement/getStyleList`, {
          customerId:
            this.searchOptions.searchParams.customerName === ""
              ? undefined
              : this.searchOptions.searchParams.customerName,
          brandId:
            this.searchOptions.searchParams.brandName === ""
              ? undefined
              : this.searchOptions.searchParams.brandName,
          rangeId:
            this.searchOptions.searchParams.rangeName === ""
              ? undefined
              : this.searchOptions.searchParams.rangeName,
          clothingLevelId: undefined,
          number:
            this.searchOptions.searchParams.number === ""
              ? undefined
              : this.searchOptions.searchParams.number,
          id: undefined,
          startDate: startDate,
          endDate: endDate
        })
        .then(response => {
          this.data.tableData = response.data;
          this.data.tableData.sort(function(b, a) {
            if (a.styleGroupId == "") return 1;
            else if (b.styleGroupId == "") return -1;
            return a.styleGroupId - b.styleGroupId; //时间正序
          });
          this.data.tableData.forEach(element => {
            var d = new Date(element.createTime);
            let time = d.toLocaleString();
            element.createTime = time;

            console.log(this.tableDataA);
          });

          this.pagination.total = response.data.length;
          let i = (this.pagination.currentPage - 1) * this.pagination.pageSize;
          let k = (this.pagination.currentPage - 1) * this.pagination.pageSize;
          this.tableDataA = [];

          for (
            ;
            i - k < this.pagination.pageSize && i < this.data.tableData.length;
            i++
          ) {
            this.tableDataA.push(this.data.tableData[i]);
          }
        })
        .catch(error => {
          this.$message({
            message: "搜索失败",
            type: "error"
          });
        });
    },
    // 选择框改变监控
    changeCheckBoxFun(val) {
      const that = this;
      that.multipleSelection = val;
      console.log("changeCheckBox所选中的内容如下");
      console.log(that.multipleSelection);
      console.log(
        "changeCheckBox所选中的内容的长度为",
        that.multipleSelection.length
      );
    },

    // 添加款号
    addStyle() {
      const that = this;
      console.log("添加款号按钮点击");
      /* that.$router.push({
        path: `/style/styleInfo`,
        query: {
          ifStyleAdd: true,
        }
      }); */
      this.controlData.ifStyleAdd = true;
      this.dialogFormVisible = true;
    },
    // 导入款号
    importStyle() {
      const that = this;
      console.log("批量导入按钮点击");
      that.$router.push({
        name: `styleImport`
      });
    },
    // 删除款号
    deleteStyle() {
      const that = this;
      console.log("删除款号按钮点击");
      if (that.multipleSelection.length === 0) {
        this.$message({
          message: "请选择要删除的款号",
          type: "warning"
        });
      } else if (that.multipleSelection.length >= 1) {
        console.log("有" + that.multipleSelection.length + "条数据被选中");
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
              this.$axios
                .delete(`${window.$config.HOST}/infoManagement/deleteStyle`, {
                  params: {
                    id: element.id
                  }
                })
                .then(response => {
                  this.handleSearch();
                  if (response.data < 0) {
                    this.$message.error(
                      element.name +
                        "删除失败:" +
                        this.infoManagementErrorCode[-response.data - 1]
                          .errotInfo
                    );
                    console.log(
                      element.name +
                        "删除失败:" +
                        this.infoManagementErrorCode[-response.data - 1]
                          .errotInfo
                    );
                  } else {
                    this.$message({
                      type: "success",
                      message: element.name + "删除成功!"
                    });
                  }
                })
                .catch(error => {
                  this.handleSearch();
                  this.$message({
                    message: "删除失败!",
                    type: "warning"
                  });
                });
            });
          })
          .catch(() => {
            this.handleSearch();
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    // 绑定款式组
    bindStyleGroup() {
      const that = this;
      console.log("绑定款式组按钮点击");
      if (that.multipleSelection.length === 0) {
        this.$message({
          message: "请选择要绑定款式组的款号",
          type: "warning"
        });
      } else if (that.multipleSelection.length >= 1) {
        let rangeId = this.multipleSelection[0].rangeId;
        let ok = 0;
        this.multipleSelection.forEach(element => {
          if (element.rangeId != rangeId) {
            ok++;

            this.$message({
              message: "请选择同一系列下的款式进行绑定！",
              type: "warning"
            });
          }
        });
        if (ok === 0) {
          that.$router.push({
            name: `bindStyleGroup`,
            query: {
              bindData: that.multipleSelection
            }
          });
        }
      }
    },
    // 表格中的查看
    getStyleData(row) {
      const that = this;
      console.log("点击了本行的查看");
      /* that.$router.push({
        path: `/style/styleInfo`,
        query: {
          ifStyleChange: true,
          customerName: row.customerName,
          brandName: row.brandName,
          clothingType: row.clothingType,
          rangeName: row.rangeName,
          styleNumber: row.styleNumber,
        }
      }); */
      this.ruleForm.customerName = row.customerName;
      this.ruleForm.brandName = row.brandName;
      this.ruleForm.clothingType = row.clothingType;
      this.ruleForm.rangeName = row.rangeName;
      this.ruleForm.styleNumber = row.styleNumber;

      this.dialogFormVisible = true;
    },
    // 表格中的修改
    changeStyleData(row) {
      const that = this;
      console.log("点击了本行的修改");
      console.log("ID为：", row.styleGroupId);

      if (row.styleGroupId === null) {
        //得到系列名称
        this.$axios
          .get(`${window.$config.HOST}/infoManagement/getRangeName`, {
            params: {
              brandId: row.brandId
            }
          })
          .then(response => {
            // this.searchOptions.options.rangeNameOptions = response.data;
            this.options.rangeNameTypeOptions = response.data;
          })
          .catch(error => {
            this.$message({
              message: "获取系列名称失败",
              type: "error"
            });
          });
        //得到品牌名称
        this.$axios
          .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`, {
            params: {
              customerId: row.customerId
            }
          })
          .then(response => {
            // this.searchOptions.options.brandNameOptions = response.data;
            this.options.brandNameOptions = response.data;
          })
          .catch(error => {
            this.$message({
              message: "获取品牌信息失败",
              type: "error"
            });
          });

        (this.ruleForm.firstCustomerName = row.customerName),
          (this.ruleForm.firstBrandName = row.brandName),
          (this.ruleForm.firstRangeName = row.rangeName),
          (this.ruleForm.firstNumber = row.number),
          (this.ruleForm.firstClothingLevel = row.clothingLevelName),
          (this.ruleForm.rangeId = row.rangeId),
          (this.ruleForm.rangeNumber = row.rangeNumber),
          (this.ruleForm.rangeName = row.rangeName),
          (this.ruleForm.styleGroupId = row.styleGroupId),
          (this.ruleForm.styleGroupNumber = row.styleGroupNumber),
          (this.ruleForm.styleGroupName = row.styleGroupName),
          (this.ruleForm.id = row.id),
          (this.ruleForm.number = row.number),
          (this.ruleForm.customerId = row.customerId),
          (this.ruleForm.customerName = row.customerName),
          (this.ruleForm.brandId = row.brandId),
          (this.ruleForm.brandName = row.brandName),
          (this.ruleForm.clothingLevelId = row.clothingLevelId),
          (this.ruleForm.clothingLevelName = row.clothingLevelName),
          (this.ruleForm.createrName = row.createrName),
          (this.ruleForm.deptName = row.deptName),
          (this.ruleForm.createTime = row.createTime),
          (this.ruleForm.addingMode = row.addingMode),
          (this.ruleForm.state = row.state),
          (this.ruleForm.havePlan = row.havePlan),
          (this.dialogFormVisible1 = true);
      } else {
        this.$message({
          type: "error",
          message: "该款式已被绑定，无法修改！"
        });
      }
    },
    // 表格中的删除
    deleteStyleData(row) {
      const that = this;
      console.log("点击了本行的删除");
      console.log("当前row=", row);
      this.$confirm("是否确认删除该款号？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        var list = {
          id: row.id
        };
        this.$axios
          .delete(`${window.$config.HOST}/infoManagement/deleteStyle`, {
            params: list
          })
          .then(response => {
            this.handleSearch();
            if (response.data < 0) {
              this.$message.error(
                "删除失败:" +
                  this.infoManagementErrorCode[-response.data - 1].errotInfo
              );
              console.log(
                "删除失败:" +
                  this.infoManagementErrorCode[-response.data - 1].errotInfo
              );
            } else {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          })
          .catch(error => {
            this.handleSearch();
            this.$message({
              type: "info",
              message: "暂时不能删除"
            });
          });
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            //此处的接口为GET订单款号
            .post(`${window.$config.HOST}/infoManagement/addStyle`, {
              number: this.ruleForm.number,
              rangeId: this.ruleForm.rangeName
            })
            .then(response => {
              this.handleSearch();
            if (response.data < 0) {
              this.$message.error(
                "添加失败:" +
                  this.infoManagementErrorCode[-response.data - 1].errotInfo
              );
              console.log(
                "添加失败:" +
                  this.infoManagementErrorCode[-response.data - 1].errotInfo
              );
          
              } else {
                (this.ruleForm.rangeId = ""),
                  (this.ruleForm.rangeNumber = ""),
                  (this.ruleForm.rangeName = ""),
                  (this.ruleForm.styleGroupId = ""),
                  (this.ruleForm.styleGroupNumber = ""),
                  (this.ruleForm.styleGroupName = ""),
                  (this.ruleForm.id = ""),
                  (this.ruleForm.number = ""),
                  (this.ruleForm.customerId = ""),
                  (this.ruleForm.customerName = ""),
                  (this.ruleForm.brandId = ""),
                  (this.ruleForm.brandName = ""),
                  (this.ruleForm.clothingLevelId = ""),
                  (this.ruleForm.clothingLevelName = ""),
                  (this.ruleForm.createrName = ""),
                  (this.ruleForm.deptName = ""),
                  (this.ruleForm.createTime = ""),
                  (this.ruleForm.addingMode = ""),
                  (this.ruleForm.state = ""),
                  (this.ruleForm.havePlan = ""),
                  (this.options.brandNameOptions = "");
                this.options.rangeNameTypeOptions = "";
                this.options.styleNumberOptions = "";
                this.dialogFormVisible = false;

                this.$message({
                  type: "success",
                  message: "添加成功"
                });
              }
            })
            .catch(error => {
              this.$message({
                type: "info",
                message: "添加失败！"
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "请填写必须填写的项！"
          });
        }
      });
    },

    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.firstRangeName === this.ruleForm.rangeName) {
            this.options.rangeNameTypeOptions.forEach(element => {
              if (element.name === this.ruleForm.rangeName) {
                this.ruleForm.rangeName = element.id;
              }
            });
          }
          var list = {
            id: this.ruleForm.id,
            number: this.ruleForm.number,
            rangeId: this.ruleForm.rangeName
          };
          this.$axios
            //此处的接口为GET订单款号
            .post(`${window.$config.HOST}/infoManagement/updateStyle`, list)
            .then(response => {
            if (response.data < 0) {
              this.$message.error(
                "更新失败:" +
                  this.infoManagementErrorCode[-response.data - 1].errotInfo
              );
              console.log(
                "更新失败:" +
                  this.infoManagementErrorCode[-response.data - 1].errotInfo
              );
            
              } else {
                this.handleSearch();
                (this.ruleForm.rangeId = ""),
                  (this.ruleForm.rangeNumber = ""),
                  (this.ruleForm.rangeName = ""),
                  (this.ruleForm.styleGroupId = ""),
                  (this.ruleForm.styleGroupNumber = ""),
                  (this.ruleForm.styleGroupName = ""),
                  (this.ruleForm.id = ""),
                  (this.ruleForm.number = ""),
                  (this.ruleForm.customerId = ""),
                  (this.ruleForm.customerName = ""),
                  (this.ruleForm.brandId = ""),
                  (this.ruleForm.brandName = ""),
                  (this.ruleForm.clothingLevelId = ""),
                  (this.ruleForm.clothingLevelName = ""),
                  (this.ruleForm.createrName = ""),
                  (this.ruleForm.deptName = ""),
                  (this.ruleForm.createTime = ""),
                  (this.ruleForm.addingMode = ""),
                  (this.ruleForm.state = ""),
                  (this.ruleForm.havePlan = ""),
                  (this.dialogFormVisible1 = false);
                this.$message({
                  type: "success",
                  message: "成功"
                });
              }
            })
            .catch(error => {
              this.handleSearch();
              this.$message({
                type: "info",
                message: "暂时不能添加"
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // if (this.ruleForm.firstRangeName === this.ruleForm.rangeName)
      //   this.ruleForm.rangeName = this.ruleForm.rangeId;
      // if (this.ruleForm.firstNumber === this.ruleForm.number) {
      //   //如果没有变化
      //   var Numbers = this.ruleForm.number;
      //   var id = this.ruleForm.id;
      // } else {
      //   var id = this.ruleForm.number;
      //   var Numbers;
      //   this.options.styleNumberOptions.forEach(element => {
      //     if (element.id === id) Numbers = element.number;
      //   });
      // }
    },
    // 取消按钮点击
    cancel() {
      const that = this;
      console.log("取消按钮点击");
      /* that.$router.push({
        path: `/style/styleManagement`,
      }); */

      (this.ruleForm.rangeId = ""),
        (this.ruleForm.rangeNumber = ""),
        (this.ruleForm.rangeName = ""),
        (this.ruleForm.styleGroupId = ""),
        (this.ruleForm.styleGroupNumber = ""),
        (this.ruleForm.styleGroupName = ""),
        (this.ruleForm.id = ""),
        (this.ruleForm.number = ""),
        (this.ruleForm.customerId = ""),
        (this.ruleForm.customerName = ""),
        (this.ruleForm.brandId = ""),
        (this.ruleForm.brandName = ""),
        (this.ruleForm.clothingLevelId = ""),
        (this.ruleForm.clothingLevelName = ""),
        (this.ruleForm.createrName = ""),
        (this.ruleForm.deptName = ""),
        (this.ruleForm.createTime = ""),
        (this.ruleForm.addingMode = ""),
        (this.ruleForm.state = ""),
        (this.ruleForm.havePlan = ""),
        (this.dialogFormVisible = false);
      (this.options.brandNameOptions = ""), (this.dialogFormVisible1 = false);
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