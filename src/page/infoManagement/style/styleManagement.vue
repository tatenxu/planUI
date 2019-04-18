<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select
              v-model="searchOptions.searchParams.customerName"
              @change="customerNameSelectionChange"
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
            <el-select
              v-model="searchOptions.searchParams.brandName"
              @change="brandNameSelectionChange"
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

        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-select
              v-model="searchOptions.searchParams.rangeName"
              @change="rangeNameSelectionChange"
            >
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
            <el-select v-model="searchOptions.searchParams.styleNumber">
              <el-option
                v-for="item in searchOptions.options.styleNumberNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="6">
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
        </el-col>
        <el-col :span="12">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              class="inputBar"
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
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
          :data="data.tableData"
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
          <el-table-column prop="styleNumber" width="150" label="订单款号" align="center"></el-table-column>
          <el-table-column prop="rangeNumber" width="130" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="customerName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothingType" label="服装层次" align="center"></el-table-column>
          <el-table-column prop="rangeName" width="150" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="addUser" label="添加人" align="center"></el-table-column>
          <el-table-column prop="dept" label="部门" align="center"></el-table-column>
          <el-table-column prop="addTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="addMethod" label="添加方式" align="center"></el-table-column>
          <el-table-column prop="styleStatus" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" width="150" min-width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="getStyleData(scope.row)" type="text" size="small">查看</el-button>
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
            <el-form-item label="客户名称" prop="customerName" placeholder="请选择客户名称">
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
            <el-form-item label="品牌名称" prop="brandName" placeholder="请选择品牌名称">
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
            <el-form-item label="系列名称" prop="rangeName" placeholder="请选择系列名称">
              <el-select v-model="ruleForm.rangeName" @change="dialogRangeNameSelectionChange">
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
          <el-col :span="8">
            <el-form-item label="订单款号" prop="styleNumber" placeholder="请输入订单款号">
              <!-- <el-input v-model="ruleForm.styleNumber" clearable placeholder="请输入"></el-input> -->
              <el-select v-model="ruleForm.styleNumber">
                <el-option
                  v-for="item in options.styleNumberOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服装层次" prop="clothingType" placeholder="请选择服装层次">
              <el-select v-model="ruleForm.clothingType">
                <el-option
                  v-for="item in options.clothingTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
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
            <el-form-item label="客户名称" prop="customerName" placeholder="请选择客户名称">
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
            <el-form-item label="品牌名称" prop="brandName" placeholder="请选择品牌名称">
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
            <el-form-item label="系列名称" prop="rangeName" placeholder="请选择系列名称">
              <el-select v-model="ruleForm.rangeName" @change="dialogRangeNameSelectionChange">
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
          <el-col :span="8">
            <el-form-item label="订单款号" prop="styleNumber" placeholder="请输入订单款号">
              <!-- <el-input v-model="ruleForm.styleNumber" clearable placeholder="请输入"></el-input> -->
              <el-select v-model="ruleForm.styleNumber">
                <el-option
                  v-for="item in options.styleNumberOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服装层次" prop="clothingType" placeholder="请选择服装层次">
              <el-select v-model="ruleForm.clothingType">
                <el-option
                  v-for="item in options.clothingTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
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
      dialogFormVisible1: false,
      DateStart: "",
      DateEnd: "",
      pagination: {
        currentPage: 1,
        pageSizes: [5, 10, 20, 30, 50],
        pageSize: 5,
        total: 400
      },
      searchOptions: {
        searchParams: {
          customerName: "",
          brandName: "",
          clothingType: "",
          rangeName: "",
          styleNumber: "",
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
      rules: {
        customerName: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        brandName: [
          { required: true, message: "请选择品牌", trigger: "change" }
        ],
        clothingType: [
          { required: true, message: "请选择服装层次", trigger: "change" }
        ],
        rangeName: [
          { required: true, message: "请选择系列名称", trigger: "change" }
        ],
        styleNumber: [
          { required: true, message: "请输入订单款号", trigger: "blur" }
        ]
      },
      ruleForm: {
        customerName: "",
        brandName: "",
        clothingType: "",
        rangeName: "",
        styleNumber: ""
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
    const that = this;
    console.log("进入系列管理页面");
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getCustomer`)
      .then(response => {
        var CustomerList = response;
        this.searchOptions.options.customerNameOptions = response;
        this.options.customerNameOptions = this.searchOptions.options.customerNameOptions;
      })
      .catch(error => {
        this.searchOptions.options.customerNameOptions = [
          {
            id: 42453,
            name: "A客户"
          },
          {
            id: 41526,
            name: "B客户"
          }
        ];
        this.options.customerNameOptions = this.searchOptions.options.customerNameOptions;
      });

    that.$axios
      .get(`${window.$config.HOST}/InfoManagement/getClothingLevel`)
      .then(response => {
        var ClothingList = response;
        this.searchOptions.options.clothingTypeOptions = ClothingList;
        this.options.clothingTypeOptions = ClothingList;
      })
      .catch(error => {
        var ClothingList = [
          {
            id: 1,
            name: "时装"
          },
          {
            id: 2,
            name: "精品"
          },
          {
            id: 3,
            name: "时尚"
          }
        ];
        this.searchOptions.options.clothingTypeOptions = ClothingList;
        this.options.clothingTypeOptions = ClothingList;
      });

    this.$axios
      .get(`${window.$config.HOST}/InfoManagement/getRangeList`)
      .then(response => {
        var SearchList = response;
        this.data.tableData = SearchList;
      })
      .catch(error => {
        var SearchList = [
          {
            styleNumber: "3213213",
            styleGroupNumber: "KSZ20190101001",
            styleGroupName: "款式1组",
            rangeNumber: "XL20190101001",
            customerName: "Qi-Collection",
            brandName: "Selkie",
            clothingType: "时装",
            rangeName: "Fall-2019(07/08/09)",
            addUser: "刘德华",
            dept: "业务1组",
            addTime: "2019-01-01 10:15:01",
            state: "已下发"
          }
        ];
        this.data.tableData = SearchList;
      });
  },
  methods: {
    dialogCustomerNameSelectionChange() {
      var param = {
        id: this.ruleForm.customerName
      };
      this.$axios
        .get(`${window.$config.HOST}/infoManagement/getBrand`, param)
        .then(response => {
          this.options.brandNameOptions = response;
        })
        .catch(error => {
          this.options.brandNameOptions = [
            {
              id: 1,
              name: "X品牌"
            },
            {
              id: 2,
              name: "Y品牌"
            }
          ];
        });
    },
    dialogBrandNameSelectionChange() {
      var param = {
        id: this.ruleForm.brandName
      };
      this.$axios
        .get(`${window.$config.HOST}/infoManagement/getRangeName`, param)
        .then(response => {
          this.options.rangeNameTypeOptions = response;
        })
        .catch(error => {
          this.options.rangeNameTypeOptions = [
            {
              id: 1,
              name: "A系列"
            },
            {
              id: 2,
              name: "B系列"
            }
          ];
        });
    },
    dialogRangeNameSelectionChange() {
      var param = {
        id: this.ruleForm.rangeName
      };
      this.$axios
        //此处的接口为GET订单款号
        .get(`${window.$config.HOST}/infoManagement/？？？？？？`, param)
        .then(response => {
          this.options.styleNumberOptions = response;
        })
        .catch(error => {
          this.options.styleNumberOptions = [
            {
              id: 1,
              name: "XY——0000001"
            },
            {
              id: 2,
              name: "YZ——0000002"
            }
          ];
        });
    },
    //当品牌名称改变的时候GET系列信息
    brandNameSelectionChange() {
      var param = {
        id: this.searchOptions.searchParams.brandName
      };
      this.$axios
        .get(`${window.$config.HOST}/infoManagement/getRangeName`, param)
        .then(response => {
          this.searchOptions.options.rangeNameOptions = response;
        })
        .catch(error => {
          this.searchOptions.options.rangeNameOptions = [
            {
              id: 1,
              name: "A系列"
            },
            {
              id: 2,
              name: "B系列"
            }
          ];
        });
    },
    //当客户名称改变的时候GET品牌信息
    customerNameSelectionChange() {
      // consol.log(val);

      var param = {
        id: this.searchOptions.searchParams.customerName
      };
      this.$axios
        .get(`${window.$config.HOST}/infoManagement/getBrand`, param)
        .then(response => {
          this.searchOptions.options.brandNameOptions = response;
        })
        .catch(error => {
          this.searchOptions.options.brandNameOptions = [
            {
              id: 1,
              name: "X品牌"
            },
            {
              id: 2,
              name: "Y品牌"
            }
          ];
        });
    },
    //当系列名称改变的时候GET订单款号
    rangeNameSelectionChange() {
      var param = {
        id: this.searchOptions.searchParams.rangeName
      };
      this.$axios
        //此处的接口为GET订单款号
        .get(`${window.$config.HOST}/infoManagement/？？？？？？`, param)
        .then(response => {
          this.searchOptions.options.styleNumberNameOptions = response;
        })
        .catch(error => {
          this.searchOptions.options.styleNumberNameOptions = [
            {
              id: 1,
              name: "XY——0000001"
            },
            {
              id: 2,
              name: "YZ——0000002"
            }
          ];
        });
    },
    // 改变日期格式
    changeDate(date) {
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
    },
    // 每页条数改变时触发函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 搜集搜索条件
    collectSearchOptions() {
      const that = this;
      let searchCondition = {};
      for (let key in that.searchOptions.searchParams) {
        if (that.searchOptions.searchParams[key] !== "") {
          if (key == "dateRange") {
            var dateRange = that.searchOptions.searchParams[key];
            var DateStart = that.changeDate(dateRange[0]);
            searchCondition["DateStart"] = DateStart;
            var DateEnd = that.changeDate(dateRange[1]);
            searchCondition["DateEnd"] = DateEnd;
            this.DateStart = DateStart;
            this.DateEnd = DateEnd;
          } else {
            searchCondition[key] = that.searchOptions.searchParams[key];
          }
        }
      }
      console.log("当前搜索条件", searchCondition);
      return searchCondition;
    },
    // 搜索按钮点击
    handleSearch() {
         this.$axios
      .get(`${window.$config.HOST}/InfoManagement/getRangeList`,{
            customerId: this.searchOptions.searchParams.customerName,
            brandId: this.searchOptions.searchParams.brandName,
            rangeId: this.searchOptions.searchParams.rangeName,
            clothingType: this.searchOptions.searchParams.clothingType,
            styleNumber: this.searchOptions.searchParams.styleNumber,
            dateStart: this.DateStart,
            dateEnd: this.DateEnd
      })
      .then(response => {
        var SearchList = response;
        this.data.tableData = SearchList;
      })
      .catch(error => {
        var SearchList = [
          {
            styleNumber: "32132132321313",
            styleGroupNumber: "KSZ20190101001",
            styleGroupName: "款式1组",
            rangeNumber: "XL20190101001",
            customerName: "Qi-Collection",
            brandName: "Selkie",
            clothingType: "时装",
            rangeName: "Fall-2019(07/08/09)",
            addUser: "刘德华",
            dept: "业务1组",
            addTime: "2019-01-01 10:15:01",
            state: "已下发"
          }
        ];
        this.data.tableData = SearchList;
      });
      // this.$axios
      //   .post(
      //     `${window.$config.HOST}/infoManagement/getStyleList`,
      //     (param = {
      //       customerId: this.searchOptions.searchParams.customerName,
      //       brandId: this.searchOptions.searchParams.brandName,
      //       rangeId: this.searchOptions.searchParams.rangeName,
      //       clothingType: this.searchOptions.searchParams.clothingType,
      //       styleNumber: this.searchOptions.searchParams.styleNumber,
      //       dateStart: this.DateStart,
      //       dateEnd: this.DateEnd
      //     })
      //   )
      //   .then(response => {
               
      //     this.data.tableData = resonse;
      //   })
      //   .catch(error => {
          
      //     var SearchList = [
      //       {
      //         styleNumber: "321321dsadasdsa3",
      //         styleGroupNumber: "KSZ20190101001",
      //         styleGroupName: "款式1组",
      //         rangeNumber: "XL20190101001",
      //         customerName: "Qi-Collection",
      //         brandName: "Selkidsadsadsadsadsadsade",
      //         clothingType: "时装",
      //         rangeName: "Fall-2019(07/08/09)",
      //         addUser: "刘德华",
      //         dept: "业务1组",
      //         addTime: "2019-01-01 10:15:01",
      //         state: "已下发"
      //       }
      //     ];
      //     this.data.tableData = SearchList;
      //   });
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
        path: `/style/styleImport`
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
              var params = element.styleGroupNumber;
              this.$axios
                .post(`${window.$config.HOST}/InfoManagement/deleteStyle`, {
                  params
                })
                .then(response => {
                  var ok = response;
                  switch (ok) {
                    case 0:
                      this.$message({
                        message: "删除成功",
                        type: "success"
                      });
                      break;
                    default:
                      this.$message({
                        message: "删除失败",
                        type: "warning"
                      });
                      break;
                  }
                })
                .catch(error => {
                  this.$message({
                    message: "出现了一些未知的错误！",
                    type: "warning"
                  });
                });
            });
          })
          .catch(() => {
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
        that.$router.push({
          path: `/style/bindStyleGroup`,
          query: {
            bindData: that.multipleSelection
          }
        });
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
      this.controlData.ifStyleChange = true;
      this.ruleForm.customerName = row.customerName;
      this.ruleForm.brandName = row.brandName;
      this.ruleForm.clothingType = row.clothingType;
      this.ruleForm.rangeName = row.rangeName;
      this.ruleForm.styleNumber = row.styleNumber;

      this.dialogFormVisible1 = true;
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
        var param = {
          id: row.styleId
        };
        this.$axios
          .get(`${window.$config.HOST}/infoManagement/deleteStyle`, param)
          .then(response => {
            var ok = response;
            switch (ok) {
              case 0:
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                break;
              default:
                this.$message({
                  message: "删除失败",
                  type: "warning"
                });
                break;
            }
          })
          .catch(error => {
            this.$message({
              type: "info",
              message: "暂时不能删除"
            });
          });
      });
    },
    submitForm(formName) {
      var param = {
        rangeName: this.ruleForm.rangeName,
        customerId: this.ruleForm.customerName,
        brandId: this.ruleForm.brandName,
        clothingLevelId: this.ruleForm.clothingType,
        styleNumber: this.ruleForm.styleNumber
      };
      this.$axios
        //此处的接口为GET订单款号
        .post(`${window.$config.HOST}/infoManagement/addStyle`, param)
        .then(response => {
          var ok = response;
          switch (ok) {
            case 0:
              this.$message({
                message: "保存成功",
                type: "success"
              });
              break;
            default:
              this.$message({
                message: "保存失败",
                type: "warning"
              });
              break;
          }
        })
        .catch(error => {
          this.$message({
            type: "info",
            message: "暂时不能添加"
          });
        });
      this.dialogFormVisible = false;
    },

    submitForm1(formName) {
      var param = {
        rangeName: this.ruleForm.rangeName,
        customerId: this.ruleForm.customerName,
        brandId: this.ruleForm.brandName,
        clothingLevelId: this.ruleForm.clothingType,
        styleNumber: this.ruleForm.styleNumber
      };
      this.$axios
        //此处的接口为GET订单款号
        .post(`${window.$config.HOST}/infoManagement/updateStyle`, param)
        .then(response => {
          var ok = response;
          switch (ok) {
            case 0:
              this.$message({
                message: "保存成功",
                type: "success"
              });
              break;
            default:
              this.$message({
                message: "保存失败",
                type: "warning"
              });
              break;
          }
        })
        .catch(error => {
          this.$message({
            type: "info",
            message: "暂时不能添加"
          });
        });

      this.ruleForm.customerName = "";
      this.ruleForm.brandName = "";
      this.ruleForm.clothingType = "";
      this.ruleForm.rangeName = "";
      this.ruleForm.styleNumber = "";
      this.dialogFormVisible1 = false;
    },
    // 取消按钮点击
    cancel() {
      const that = this;
      console.log("取消按钮点击");
      /* that.$router.push({
        path: `/style/styleManagement`,
      }); */

      this.ruleForm.customerName = "";
      this.ruleForm.brandName = "";
      this.ruleForm.clothingType = "";
      this.ruleForm.rangeName = "";
      this.ruleForm.styleNumber = "";
      this.dialogFormVisible = false;
      this.dialogFormVisible1 = false;
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