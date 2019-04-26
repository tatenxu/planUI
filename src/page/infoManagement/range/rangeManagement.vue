<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <!-- <el-select v-model="searchOptions.searchParams.customerName" @change="clientSelect"> -->
            <el-select v-model="CustomerValue">
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
            <!-- <el-select v-model="searchOptions.searchParams.brandName" @change="brandSelect"> -->
            <el-select v-model="BrandValue">
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
            <!-- <el-input v-model="searchOptions.searchParams.rangeName" placeholder="请输入系列名称"></el-input> -->
            <!-- <el-select v-model="searchOptions.searchParams.rangeName"> -->
            <el-select v-model="RangeValue">
              <el-option
                v-for="item in searchOptions.options.rangeNameOption"
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
            <!-- <el-select v-model="searchOptions.searchParams.clothingType"> -->
            <el-select v-model="ClothingLevelValue">
              <el-option
                v-for="item in searchOptions.options.clothingTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="12">
          <div class="bar">
            <div class="title">添加时间</div>
            <!-- <el-date-picker
              class="inputBar"
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
            ></el-date-picker>-->
            <el-date-picker
              class="inputBar"
              v-model="dateRange"
              type="dateRange"
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
          <el-col :span="3">
            <el-button type="primary" @click="addRange">添加系列</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="importRange">批量导入</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="deleteRange">删除系列</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          max-height="400"
          border
          @selection-change="changeCheckBoxFun"
          :stripe="true"
          :highlight-current-row="true"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="number" width="130" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="customerName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothingLevelName" label="服装类型" align="center"></el-table-column>
          <el-table-column prop="name" width="170" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="createTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="addingMode" label="添加方式" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" width="150" min-width="100" align="center">
            <template slot-scope="scope">
              <!-- <el-button @click="getRangeData(scope.row)" type="text" size="small">查看</el-button> -->
              <el-button @click="changeRangeData(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="deleteRangeData(scope.row,scope.index)" type="text" size="small">删除</el-button>
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

    <el-dialog :modal="false" title="系列信息" :visible.sync="dialogFormVisible">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" placeholder="请选择客户名称">
              <el-select v-model="ruleForm.customerName" @change="clientSelect2">
                <el-option
                  v-for="item in ruleForm.options.customerNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称">
              <el-select v-model="ruleForm.brandName" @change="brandSelect2">
                <el-option
                  v-for="item in ruleForm.options.brandNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系列名称">
              <el-select v-model="ruleForm.name ">
                <el-option
                  v-for="item in ruleForm.options.rangeNameOption"
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
            <el-form-item label="服装层次">
              <el-select v-model="ruleForm.clothingLevelName ">
                <el-option
                  v-for="item in ruleForm.options.clothingTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="系列款数">
              <el-input v-model="ruleForm.RangeAmount" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row :gutter="10" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="24">
            <el-form-item label="系列备注">
              <el-input v-model="ruleForm.note " type="textarea" :rows="3" placeholder="请输入"></el-input>
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

    <el-dialog :modal="false" title="系列信息" :visible.sync="dialogFormVisible1">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" placeholder="请选择客户名称">
              <el-select v-model="ruleForm.customerName " @change="clientSelect2">
                <el-option
                  v-for="item in ruleForm.options.customerNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称">
              <el-select v-model="ruleForm.brandName " @change="brandSelect2">
                <el-option
                  v-for="item in ruleForm.options.brandNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系列名称">
              <el-select v-model="ruleForm.name ">
                <el-option
                  v-for="item in ruleForm.options.rangeNameOption"
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
            <el-form-item label="服装层次">
              <el-select v-model="ruleForm.clothingLevelName ">
                <el-option
                  v-for="item in ruleForm.options.clothingTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="系列款数">
              <el-input v-model="ruleForm.RangeAmount" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row :gutter="10" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="24">
            <el-form-item label="系列备注">
              <el-input v-model="ruleForm.note" type="textarea" :rows="3" placeholder="请输入"></el-input>
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
      dateRange: "",
      RangeValue: "",
      CustomerValue: "",
      BrandValue: "",
      ClothingLevelValue: "",
      RangeValue: "",
      Data: "",
      DataStartTime: "",
      DataEndTime: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSizes: [5, 10, 20, 30, 50],
        pageSize: 5,
        total: 400
      },

      searchOptions: {
        // searchParams: {
        //   customerName: "",
        //   brandName: "",
        //   clothingType: "",
        //   rangeName: "",
        //   dateRange: ""
        // },
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          clothingTypeOptions: [],

          rangeNameOption: []
        }
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
          { required: true, message: "请输入系列名称", trigger: "blur" }
        ]
        // rangeAmount: [
        //   { required: true, message: "请输入系列款数", trigger: "blur" }
        // ]
      },

      ruleForm: {
        brandName: "",
        brandId: "",
        customerName: "",
        customerId: "",
        name: "",
        id: "",
        clothingLevelId: "",
        clothingLevelName: "",
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          clothingTypeOptions: [],
          rangeNameOption: []
        }
      }
    };
  },

  //watch: {
  //   asf: function(newCustomerName, oldCustomerName) {
  //     console.log("开始");
  //     this.$axios
  //       .get(`${window.$config.HOST}/InfoManagement/getBrand`, {
  //         params: {
  //           custumerId: oldCustomerName
  //         }
  //       })
  //       .then(response => {
  //         console.log("开始response");
  //         var BrandList = response;
  //         this.searchOptions.options.brandNameOptions = BrandList;
  //       })
  //       .catch(error => {
  //         console.log("开始catch");
  //         var BrandList = [
  //           {
  //             id: 1,
  //             CustomerName: "品牌A"
  //           },
  //           {
  //             id: 2,
  //             CustomerName: "品牌B"
  //           },
  //           {
  //             id: 3,
  //             CustomerName: "品牌C"
  //           }
  //         ];
  //         this.searchOptions.options.brandNameOptions = BrandList;
  //       });

  //   }
  // },
  created: function() {
    var that = this;
    //获得品牌名字
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`, {
        customerId: NaN
      })
      .then(response => {
        this.searchOptions.options.brandNameOptions = response;
        // this.ruleForm.options.brandNameOptions = response;
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
        this.searchOptions.options.brandNameOptions = ClothingList;
        // this.ruleForm.options.brandNameOptions = ClothingList;
      });

    //获得系列名称
    that.$axios
      .get(`${window.$config.HOST}/InfoManagement/getRangeName`, {
        brandId: NaN
      })
      .then(response => {
        this.searchOptions.options.rangeNameOption = response;
        // this.ruleForm.options.rangeNameOption = response;
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
        this.searchOptions.options.rangeNameOption = ClothingList;
        // this.ruleForm.options.rangeNameOption = ClothingList;
      });

    //获得顾客名称
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getCustomerName`)
      .then(response => {
        var CustomerList = response;
        this.searchOptions.options.customerNameOptions = CustomerList;
        this.ruleForm.options.customerNameOptions = this.searchOptions.options.customerNameOptions;
      })
      .catch(error => {
        var CustomerList = [
          {
            id: 1,
            name: "顾客A"
          },
          {
            id: 2,
            name: "顾客B"
          },
          {
            id: 3,
            name: "顾客C"
          }
        ];
        this.searchOptions.options.customerNameOptions = CustomerList;
        this.ruleForm.options.customerNameOptions = this.searchOptions.options.customerNameOptions;
      });

    //获得服装层次
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getClothingLevelName`)
      .then(response => {
        var ClothingList = response;
        this.searchOptions.options.clothingTypeOptions = ClothingList;
        this.ruleForm.options.clothingTypeOptions = this.searchOptions.options.clothingTypeOptions;
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
        this.ruleForm.options.clothingTypeOptions = this.searchOptions.options.clothingTypeOptions;
      });

    //获得空搜索集
    this.$axios
      .get(`${window.$config.HOST}/InfoManagement/getRangeList`, {
        customerId: NaN,
        brandId: NaN,
        id: NaN,
        clothingLevelId: NaN,
        startDate: NaN,
        endDate: NaN
      })
      .then(response => {
        var SearchList = response;
        this.tableData = SearchList;
      })
      .catch(error => {
        var SearchList = [
          {
            id: 1,
            number: "XL20190101001",
            name: "Fall-2019(07/08/09)",
            customerId: 1232131,
            customerName: "Qi-Collection",
            brandId: 42132131,
            brandName: "Selkie",
            clothingLevelId: 321321,
            clothingLevelName: "时装",
            createrName: "刘德华",
            styleQuantity: 15,
            deptName: "业务1组",
            createTime: "2019-01-01 10:15:01",
            addingMode: "手动",
            state: "已绑定",
            note: "系列备注1",
            havePlan: false
          },
          {
            id: 1,
            number: "XL20190101001",
            name: "Fall-2019(07/08/09)",
            customerId: 1232131,
            customerName: "Qi-Collection",
            brandId: 42132131,
            brandName: "Selkie",
            clothingLevelId: 321321,
            clothingLevelName: "时装",
            createrName: "刘德华",
            styleQuantity: 15,
            deptName: "业务1组",
            createTime: "2019-01-01 10:15:01",
            addingMode: "手动",
            state: "已绑定",
            note: "系列备注1",
            havePlan: false
          }
        ];
        this.tableData = SearchList;
      });
  },

  methods: {
    // //当品牌改变的时候GET系列名称
    // brandSelect() {
    //   this.$axios
    //     .get(`${window.$config.HOST}/InfoManagement/getRangeName`, {
    //       brandId: this.BrandValue
    //     })
    //     .then(response => {
    //       var RangeList = response.data;
    //       this.searchOptions.options.rangeNameOption = RangeList;
    //     })
    //     .catch(error => {
    //       var RangeList = [
    //         {
    //           id: 1,
    //           name: "系列A"
    //         },
    //         {
    //           id: 2,
    //           name: "系列B"
    //         },
    //         {
    //           id: 3,
    //           name: "系列C"
    //         }
    //       ];
    //       this.searchOptions.options.rangeNameOption = RangeList;
    //     });
    // },

    // //当客户名称改变的时候GET品牌信息
    // clientSelect() {
    //   this.$axios
    //     .get(`${window.$config.HOST}/InfoManagement/getBrand`, {
    //       params: {
    //         custumerId: this.CustomerValue
    //       }
    //     })
    //     .then(response => {
    //       var BrandList = response;
    //       this.searchOptions.options.brandNameOptions = BrandList;
    //     })
    //     .catch(error => {
    //       var BrandList = [
    //         {
    //           id: 1,
    //           name: "品牌A"
    //         },
    //         {
    //           id: 2,
    //           name: "品牌B"
    //         },
    //         {
    //           id: 3,
    //           name: "品牌C"
    //         }
    //       ];
    //       this.searchOptions.options.brandNameOptions = BrandList;
    //     });
    // },

    //当弹出框的客户名称改变的时候GET弹出框的品牌信息
    clientSelect2() {
      this.$axios
        .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`, {
          params: {
            custumerId: this.ruleForm.customerName
          }
        })
        .then(response => {
          var BrandList = response;
          this.ruleForm.options.brandNameOptions = BrandList;
        })
        .catch(error => {
          console.log("第一处测试点");
          var BrandList = [
            {
              id: 1,
              name: "品牌A"
            },
            {
              id: 2,
              name: "品牌B"
            },
            {
              id: 3,
              name: "品牌C"
            }
          ];
          this.ruleForm.options.brandNameOptions = BrandList;
        });
    },

    //当弹出框的品牌名称改变的时候GET弹出框的系列信息
    brandSelect2() {
      this.$axios
        .get(`${window.$config.HOST}/InfoManagement/getRangeName`, {
          brandId: this.ruleForm.brandName
        })
        .then(response => {
          var RangeList = response.data;
          this.ruleForm.options.rangeNameOption = RangeList;
        })
        .catch(error => {
          var RangeList = [
            {
              id: 1,
              name: "系列A"
            },
            {
              id: 2,
              name: "系列B"
            },
            {
              id: 3,
              name: "系列C"
            }
          ];
          this.ruleForm.options.rangeNameOption = RangeList;
        });
    },

    // 搜集搜索条件
    collectSearchOptions() {
      const that = this;
      var dateRange = that.dateRange;
      var DateStart = that.changeDate(dateRange[0]);
      var DateEnd = that.changeDate(dateRange[1]);

      this.DateStartTime = DateStart;
      this.DateEndTime = DateEnd;
    },
    // 改变日期格式
    changeDate(date) {
      console.log(date);
      if (!date) {
        return NaN;
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
    // 每页条数改变时触发函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 选择框改变监控
    changeCheckBoxFun(val) {
      const that = this;
      that.multipleSelection = val;
    },
    // 搜集搜索条件
    // collectSearchOptions() {
    //   const that = this;
    //   let searchCondition = {};
    //   for (let key in that.searchOptions.searchParams) {
    //     if (that.searchOptions.searchParams[key] !== "") {
    //       if (key == "dateRange") {
    //         var dateRange = that.searchOptions.searchParams[key];
    //         this.DateStart = that.changeDate(dateRange[0]);
    //         searchCondition["DateStart"] = DateStart;
    //         this.DateEnd = that.changeDate(dateRange[1]);
    //         searchCondition["DateEnd"] = DateEnd;
    //       } else {
    //         searchCondition[key] = that.searchOptions.searchParams[key];
    //       }
    //     }
    //   }
    //   console.log("当前搜索条件", searchCondition);
    //   return searchCondition;
    // },
    // 搜索按钮点击
    handleSearch() {
      //首先把日期改变为Start - end
      this.collectSearchOptions();
      this.$axios
        .get(`${window.$config.HOST}/InfoManagement/getRangeList`, {
          params: {
            customerId: this.CustomerValue===""?NaN:this.CustomerValue,
            brandId: this.BrandValue===""?NaN:this.BrandValue,
            id: this.RangeValue===""?NaN:this.RangeValue,
            clothingLevelId: this.ClothingLevelValue===""?NaN:this.ClothingLevelValue,
            dateStart: this.DataStartTime,
            dateEnd: this.DataEndTime
          }
        })
        .then(response => {
          var SearchList = response;
          this.tableData = SearchList;
        })
        .catch(error => {
          var SearchList = [
            {
              id: 1,
              number: "XL20190101001",
              name: "Fall-2019(07/08/09)",
              customerId: 1232131,
              customerName: "Qi-Collection",
              brandId: 42132131,
              brandName: "Selkie",
              clothingLevelId: 321321,
              clothingLevelName: "时装",
              createrName: "刘德华",
              styleQuantity: 15,
              deptName: "业务1组",
              createTime: "2019-01-01 10:15:01",
              addingMode: "手动",
              state: "已绑定",
              note: "系列备注1",
              havePlan: false
            },
            {
              id: 1,
              number: "XL20190101001",
              name: "Fall-2019(07/08/09)",
              customerId: 1232131,
              customerName: "Qi-Collection",
              brandId: 42132131,
              brandName: "Selkie",
              clothingLevelId: 321321,
              clothingLevelName: "时装",
              createrName: "刘德华",
              styleQuantity: 15,
              deptName: "业务1组",
              createTime: "2019-01-01 10:15:01",
              addingMode: "手动",
              state: "已绑定",
              note: "系列备注1",
              havePlan: false
            }
          ];
          this.tableData = SearchList;
        });
    },

    // 添加系列
    addRange() {
      const that = this;
      console.log("添加系列按钮点击");
      // that.$router.push({
      //   path: `/range/rangeInfo`,
      //   query: {
      //     ifRangeAdd: true
      //   }
      // });
      this.dialogFormVisible = true;
    },
    // 批量导入
    importRange() {
      const that = this;
      console.log("批量导入按钮点击");
      that.$router.push({
        path: `/range/rangeImport`
      });
    },
    // 删除系列
    deleteRange() {
      const that = this;
      if (that.multipleSelection.length === 0) {
        this.$message({
          message: "请选择要删除的系列数据",
          type: "warning"
        });
      } else if (that.multipleSelection.length >= 1) {
        console.log("有" + that.multipleSelection.length + "条数据被选中");
        this.$confirm(
          "删除所选的" +
            that.multipleSelection.length +
            "条系列信息, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            //      this.AnyChanged.forEach(element => {
            //   var j = this.tableData.indexOf(element);
            //   this.$set(this.tableData[j], "deletePeople", "已完成");
            // });
            this.multipleSelection.forEach(element => {
         
              this.$axios
                .post(`${window.$config.HOST}/InfoManagement/deleteRange`, {
                  id:element.id
                })
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
                    message: "出现了一些未知的错误！",
                    type: "warning"
                  });
                });
            });

            // this.$message({
            //   type: "success",
            //   message: "删除成功!"
            // });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },

    // 表格中的修改
    changeRangeData(row) {
      const that = this;
      //console.log("点击了本行的修改");
      /* that.$router.push({
        path: `/range/rangeInfo`,
        query: {
          ifRangeChange: true,
          customerName: row.customerName,
          brandName: row.brandName,
          clothingType: row.clothingType,
          rangeName: row.rangeName,
          rangeAmount: row.rangeAmount,
          rangeNote: row.rangeNote
        }
      }); */

      (this.ruleForm.firstCustomerName = row.customerName),
        (this.ruleForm.firstBrandName = row.brandName),
        (this.ruleForm.firstRangeName = row.name),
        (this.ruleForm.firstClothingLevel = row.clothingLevelName),
        (this.ruleForm.id = row.id),
        (this.ruleForm.number = row.number),
        (this.ruleForm.name = row.name),
        (this.ruleForm.customerId = row.customerId),
        (this.ruleForm.customerName = row.customerName),
        (this.ruleForm.brandId = row.brandId),
        (this.ruleForm.brandName = row.brandName),
        (this.ruleForm.clothingLevelId = row.clothingLevelId),
        (this.ruleForm.clothingLevelName = row.clothingLevelName),
        (this.ruleForm.createrName = row.createrName),
        (this.ruleForm.styleQuantity = row.styleQuantity),
        (this.ruleForm.deptName = row.deptName),
        (this.ruleForm.createTime = row.createTime),
        (this.ruleForm.addingMode = row.addingMode),
        (this.ruleForm.state = row.state),
        (this.ruleForm.note = row.note),
        (this.ruleForm.havePlan = row.havePlan),
        (this.dialogFormVisible1 = true);
    },
    // 表格中的删除
    deleteRangeData(row, index) {
      const that = this;
      console.log("点击了本行的删除");
      console.log("当前row=", row.rangeNumber);
      this.$confirm("是否确认删除该系列？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post(`${window.$config.HOST}/InfoManagement/deleteRange`, {
              id: row.id
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
              this.tableData.splice(index, 1);
              this.$message({
                message: "出现了一些未知的错误2！",
                type: "warning"
              });
            });
        })
        .catch(() => {
          this.$message({
            message: "出现了一些未知的错误！",
            type: "warning"
          });
        });
    },

    //添加系列信息
    submitForm(formName) {
      const that = this;
      this.$axios
        .post(`${window.$config.HOST}/InfoManagement/addRange`, {
          params: {
            // customerId: this.CustomerValue,
            // brandId: this.BrandValue,
            // rangeName : this.RangeValue,
            // clothingLevelId: this.ClothingLevelValue,
            // dateStart: this.DataStartTime,
            // dateEnd: this.DataEndTime
            name: this.ruleForm.name,
            customerId: this.ruleForm.customerId,
            brandId: this.ruleForm.brandId,
            clothingLevelId: this.ruleForm.clothingLevelId,
            note: this.ruleForm.note
          }
        })
        .then(response => {
          var ok = response;
          switch (ok) {
            case 0:
              this.$message({
                message: "添加成功",
                type: "success"
              });
              break;
            default:
              this.$message({
                message: "添加失败",
                type: "warning"
              });
              break;
          }
        })
        .catch(error => {});
      console.log("现在要添加啦");

      (this.ruleForm.id = ""),
        (this.ruleForm.number = ""),
        (this.ruleForm.name = ""),
        (this.ruleForm.customerId = ""),
        (this.ruleForm.customerName = ""),
        (this.ruleForm.brandId = ""),
        (this.ruleForm.brandName = ""),
        (this.ruleForm.clothingLevelId = ""),
        (this.ruleForm.clothingLevelName = ""),
        (this.ruleForm.createrName = ""),
        (this.ruleForm.styleQuantity = ""),
        (this.ruleForm.deptName = ""),
        (this.ruleForm.createTime = ""),
        (this.ruleForm.addingMode = ""),
        (this.ruleForm.state = ""),
        (this.ruleForm.note = ""),
        (this.ruleForm.havePlan = ""),
        (this.dialogFormVisible = false);
      handleSearch();
    },

    //修改系列信息
    submitForm1(formName) {
      //第一步，将NAME转换为ID
      if (this.ruleForm.firstCustomerName != this.ruleForm.customerName) {
        //变了，说明显示的是ID
        this.ruleForm.customerId = this.ruleForm.customerName; //ID赋值给ID
        this.ruleForm.options.customerNameOption.forEach(element => {
          if (element.id == this.ruleForm.customerId)
            this.ruleForm.customerName = element.name;
        });
      }
      if (this.ruleForm.firstBrandName != this.ruleForm.brandName) {
        this.ruleForm.brandId = this.ruleForm.brandName;
        this.ruleForm.options.brandNameOption.forEach(element => {
          if (element.id == this.ruleForm.brandId)
            this.ruleForm.brandName = element.name;
        });
      }
      if (this.ruleForm.firstRangeName != this.ruleForm.name) {
        this.ruleForm.id = this.ruleForm.name;
        this.ruleForm.options.rangeNameOption.forEach(element => {
          if (element.id == this.ruleForm.id) this.ruleForm.name = element.name;
        });
      }
      if (
        this.ruleForm.firstClothingLevel === this.ruleForm.clothingLevelName
      ) {
        this.ruleForm.clothingLevelId = this.ruleForm.clothingLevelName;
        this.ruleForm.options.clothingTypeOptions.forEach(element => {
          if (element.id == this.ruleForm.clothingLevelId)
            this.ruleForm.clothingLevelName = element.name;
        });
      }

      const that = this;

      this.$axios
        .post(`${window.$config.HOST}/InfoManagement/updateRange`, {
          params: {
            id: this.ruleForm.id,
            name: this.ruleForm.name,
            customerId: this.ruleForm.customerId,
            brandId: this.ruleForm.brandId,
            clothingLevelId: this.ruleForm.clothingLevelId,
            note: this.ruleForm.note
          }
        })
        .then(response => {
          var ok = response;
          switch (ok) {
            case 0:
              this.$message({
                message: "添加成功",
                type: "success"
              });
              break;
            default:
              this.$message({
                message: "添加失败",
                type: "warning"
              });
              break;
          }
        })
        .catch(error => {});
      console.log("现在要添加啦");
      (this.ruleForm.id = ""),
        (this.ruleForm.number = ""),
        (this.ruleForm.name = ""),
        (this.ruleForm.customerId = ""),
        (this.ruleForm.customerName = ""),
        (this.ruleForm.brandId = ""),
        (this.ruleForm.brandName = ""),
        (this.ruleForm.clothingLevelId = ""),
        (this.ruleForm.clothingLevelName = ""),
        (this.ruleForm.createrName = ""),
        (this.ruleForm.styleQuantity = ""),
        (this.ruleForm.deptName = ""),
        (this.ruleForm.createTime = ""),
        (this.ruleForm.addingMode = ""),
        (this.ruleForm.state = ""),
        (this.ruleForm.note = ""),
        (this.ruleForm.havePlan = ""),
        (this.dialogFormVisible1 = false);
      handleSearch();
    },
    // 取消按钮点击
    cancel() {
      const that = this;
      console.log("取消按钮点击");
      (this.ruleForm.id = ""),
        (this.ruleForm.number = ""),
        (this.ruleForm.name = ""),
        (this.ruleForm.customerId = ""),
        (this.ruleForm.customerName = ""),
        (this.ruleForm.brandId = ""),
        (this.ruleForm.brandName = ""),
        (this.ruleForm.clothingLevelId = ""),
        (this.ruleForm.clothingLevelName = ""),
        (this.ruleForm.createrName = ""),
        (this.ruleForm.styleQuantity = ""),
        (this.ruleForm.deptName = ""),
        (this.ruleForm.createTime = ""),
        (this.ruleForm.addingMode = ""),
        (this.ruleForm.state = ""),
        (this.ruleForm.note = ""),
        (this.ruleForm.havePlan = ""),
        (this.dialogFormVisible = false);
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