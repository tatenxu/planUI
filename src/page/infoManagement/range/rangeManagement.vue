<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>

            <el-select v-model="CustomerValue" :clearable="true">
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
            <el-select v-model="BrandValue" :clearable="true">
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
            <el-input v-model="rangeName" placeholder="请输入系列名称" :clearable="true"></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="ClothingLevelValue" :clearable="true">
              <el-option
                v-for="item in searchOptions.options.clothingTypeOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
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
          <el-table-column prop="serialNo" width="130" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="clientName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothesLevelName" label="服装类型" align="center"></el-table-column>
          <el-table-column prop="name" width="170" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="styleQuantity" label="款数" align="center"></el-table-column>
          <el-table-column prop="creatorName" label="添加人" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="createTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="addMode" label="添加方式" align="center"></el-table-column>
          <!-- <el-table-column prop="stateStr" label="状态" align="center"></el-table-column> -->
          <el-table-column label="操作" width="150" min-width="100" align="center" fixed="right">
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
            <el-form-item label="客户名称" prop="customerName" placeholder="请选择客户名称">
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
            <el-form-item label="品牌名称" prop="brandName">
              <el-select v-model="ruleForm.brandName">
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
            <el-form-item label="系列名称" prop="name">
              <el-input v-model="ruleForm.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="服装层次" prop="clothingLevelName">
              <el-select v-model="ruleForm.clothingLevelName ">
                <el-option
                  v-for="item in ruleForm.options.clothingTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="季节" prop="season">
              <el-select v-model="ruleForm.season ">
                <el-option
                  v-for="item in ruleForm.options.seasonOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系统编码" prop="systemCode">
              <el-input v-model="ruleForm.systemCode" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
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
            <el-form-item label="客户名称" placeholder="请选择客户名称" prop="customerName">
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
            <el-form-item label="品牌名称" prop="brandName">
              <el-select v-model="ruleForm.brandName ">
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
            <el-form-item label="系列名称" prop="name">
              <el-input v-model="ruleForm.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="服装层次" prop="clothingLevelName">
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
          <el-col :span="8">
            <el-form-item label="季节" prop="season">
              <el-select v-model="ruleForm.season ">
                <el-option
                  v-for="item in ruleForm.options.seasonOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系统编码" prop="systemCode">
              <el-input v-model="ruleForm.systemCode" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
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
import request from "@/utils/request";
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
      rangeName: "",
      DataEndTime: "",
      dialogFormVisible: false,
      dialogFormVisible1: false,
      tableData: [],
      totalTableData: [],
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
          errotInfo: "已与款式组或款式绑定，不得删除"
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
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },

      searchOptions: {
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
        season: [{ required: true, message: "请选择季节", trigger: "change" }],
        systemCode: [
          { required: true, message: "请输入系统编码", trigger: "blur" }
        ],
        brandName: [
          { required: true, message: "请选择品牌", trigger: "change" }
        ],
        clothingLevelName: [
          { required: true, message: "请选择服装层次", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入系列名称", trigger: "blur" }]
        // rangeAmount: [
        //   { required: true, message: "请输入系列款数", trigger: "blur" }
        // ]
      },

      ruleForm: {
        season: "",
        systemCode: "",
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
          rangeNameOption: [],
          seasonOptions: [
            {
              name: "春"
            },
            {
              name: "夏"
            },
            {
              name: "秋"
            },
            {
              name: "冬"
            }
          ]
        }
      }
    };
  },

  created: function() {
    var that = this;
    //获得品牌名字
    request
      .get(`${window.$config.HOST}/backstage/brand/find`, {
        name: undefined
      })
      .then(response => {
        console.log("获得品牌信息成功了");
        this.searchOptions.options.brandNameOptions = response.result;
      });

    //获得顾客名称
    request
      .get(`${window.$config.HOST}/backstage/client/find`)
      .then(response => {
        var CustomerList = response.result;
        this.searchOptions.options.customerNameOptions = CustomerList;
        this.ruleForm.options.customerNameOptions = this.searchOptions.options.customerNameOptions;
      });

    //获得服装层次
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "服装层次"
        }
      })
      .then(response => {
        var ClothingList = response.result;
        this.searchOptions.options.clothingTypeOptions = ClothingList;
        this.ruleForm.options.clothingTypeOptions = this.searchOptions.options.clothingTypeOptions;
      });

    //获得空搜索集
    request
      .get(`${window.$config.HOST}/info/series/find`, {
        params: {
          pageNum: 1,
          pageSize: 10
        }
      })
      .then(response => {
        console.log(response.result);
        this.tableData = response.result;
        
        this.pagination.total = response.total;
      });
  },

  methods: {
    //当弹出框的客户名称改变的时候GET弹出框的品牌信息
    clientSelect2() {
      this.ruleForm.brandName = "";
      let list = {
        clientId: this.ruleForm.customerName
      };
      request
        .get(`/backstage/brand/name`, {
          params: list
        })
        .then(response => {
          this.ruleForm.options.brandNameOptions = response.result;
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
    // 每页条数改变时触发函数
    handleSizeChange(val) {
      // this.pagination: {
      //   currentPage: 1,
      //   pageSizes: [5, 10, 20, 30, 50],
      //   pageSize: 5,
      //   total: 400
      // },
      this.pagination.pageSize = val;
      console.log(`每页 ${val} 条`);

      this.pagination.currentPage = 1;
      this.handleSearch();
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.currentPage = val;
      this.pageChanged();
    },
    // 选择框改变监控
    changeCheckBoxFun(val) {
      const that = this;
      that.multipleSelection = val;
    },
    pageChanged() {
      let startDate;
      let endDate;
      if (this.dateRange == undefined) {
        startDate = undefined;
        endDate = undefined;
      } else {
        (startDate = this.changeDate(this.dateRange[0])),
          (endDate = this.changeDate(this.dateRange[1]));
      }
      let list = {
        clientId: this.CustomerValue === "" ? undefined : this.CustomerValue,
        brandId: this.BrandValue === "" ? undefined : this.BrandValue,
        name: this.rangeName === "" ? undefined : this.rangeName,
        clothesLevelName:
          this.ClothingLevelValue === "" ? undefined : this.ClothingLevelValue,
        createAfter: startDate,
        createBefore: endDate,
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.currentPage
      };
      console.log("list:", list);

      request
        .get(`${window.$config.HOST}/info/series/find`, {
          params: {
            clientId:
              this.CustomerValue === "" ? undefined : this.CustomerValue,
            brandId: this.BrandValue === "" ? undefined : this.BrandValue,
            name: this.rangeName === "" ? undefined : this.rangeName,
            clothesLevelName:
              this.ClothingLevelValue === ""
                ? undefined
                : this.ClothingLevelValue,
            createAfter: startDate,
            createBefore: endDate,
            pageSize: this.pagination.pageSize,
            pageNum: this.pagination.currentPage
          }
        })
        .then(response => {
          this.tableData = response.result;
         
          this.pagination.total = response.total;
        });
    },
    handleSearch() {
      let startDate;
      let endDate;
      if (this.dateRange == undefined) {
        startDate = undefined;
        endDate = undefined;
      } else {
        (startDate = this.changeDate(this.dateRange[0])),
          (endDate = this.changeDate(this.dateRange[1]));
      }
      let list = {
        clientId: this.CustomerValue === "" ? undefined : this.CustomerValue,
        brandId: this.BrandValue === "" ? undefined : this.BrandValue,
        name: this.rangeName === "" ? undefined : this.rangeName,
        clothesLevelName:
          this.ClothingLevelValue === "" ? undefined : this.ClothingLevelValue,
        createAfter: startDate,
        createBefore: endDate,
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.currentPage
      };
      console.log("list:", list);

      request
        .get(`${window.$config.HOST}/info/series/find`, {
          params: {
            clientId:
              this.CustomerValue === "" ? undefined : this.CustomerValue,
            brandId: this.BrandValue === "" ? undefined : this.BrandValue,
            name: this.rangeName === "" ? undefined : this.rangeName,
            clothesLevelName:
              this.ClothingLevelValue === ""
                ? undefined
                : this.ClothingLevelValue,
            createAfter: startDate,
            createBefore: endDate,
            pageSize: this.pagination.pageSize,
            pageNum: 1
          }
        })
        .then(response => {
          this.tableData = response.result;
         
          this.pagination.total = response.total;
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
        name: `rangeImport`
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
            this.multipleSelection.forEach(element => {
              let list = {
                id: element.id
              };
              request
                .delete(`/info/series/delete`, {
                  params: list
                })
                .then(response => {
                  this.handleSearch();
            
                })
          
            });

            // this.$message({
            //   type: "success",
            //   message: "删除成功!"
            // });
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

    // 表格中的修改
    changeRangeData(row) {
       request
        .get(`/backstage/brand/name`, {
          params: {
            clientId:row.clientId,
          }
        })
        .then(response => {
          this.ruleForm.options.brandNameOptions = response.result;
        });
        (this.ruleForm.firstCustomerName = row.clientName),
        (this.ruleForm.firstBrandName = row.brandName),
        (this.ruleForm.firstRangeName = row.name),
        (this.ruleForm.firstClothingLevel = row.clothesLevelName),
        (this.ruleForm.id = row.id),
        this.ruleForm.systemCode = row.systemCode,
        this.ruleForm.season=row.season,
        (this.ruleForm.number = row.number),
        (this.ruleForm.name = row.name),
        (this.ruleForm.customerId = row.customerId),
        (this.ruleForm.customerName = row.clientName),
        (this.ruleForm.brandId = row.brandId),
        (this.ruleForm.brandName = row.brandName),
        (this.ruleForm.clothingLevelId = row.clothingLevelId),
        (this.ruleForm.clothingLevelName = row.clothesLevelName),
        (this.ruleForm.createrName = row.createrName),
        (this.ruleForm.styleQuantity = row.styleQuantity),
        (this.ruleForm.deptName = row.deptName),
        (this.ruleForm.createTime = row.createTime),
        (this.ruleForm.addingMode = row.addingMode),
        (this.ruleForm.state = row.state),
        (this.ruleForm.note = row.note),
        (this.ruleForm.havePlan = row.havePlan),
        (this.dialogFormVisible1 = true)
    },
    // 表格中的删除
    deleteRangeData(row, index) {
      const that = this;
      console.log("点击了本行的删除");
      console.log("当前row=", row.rangeNumber);
      let list = {
        id: row.id
      };
      this.$confirm("是否确认删除该系列？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })

        .then(() => {
          request
            .delete(`/info/series/delete`, {
              params: list
            })
            .then(response => {
              this.handleSearch();
            })


        })
        .catch(() => {
          this.$message({
            message: "删除失败",
            type: "error"
          });
        });
    },

    //添加系列信息
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .post(`/info/series/insert`, {
              name: this.ruleForm.name === "" ? undefined : this.ruleForm.name,
      
              brandId:
                this.ruleForm.brandName === ""
                  ? undefined
                  : this.ruleForm.brandName,
              clothesLevelName:
                this.ruleForm.clothingLevelName === ""
                  ? undefined
                  : this.ruleForm.clothingLevelName,
              note: this.ruleForm.note === "" ? undefined : this.ruleForm.note,
              season :this.ruleForm.season === "" ? undefined : this.ruleForm.season,
              addMode:"手动",
              systemCode:this.ruleForm.systemCode === "" ? undefined : this.ruleForm.systemCode,
            })
            .then(response => {
              this.handleSearch();
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
                (this.ruleForm.systemCode = ""),
                (this.ruleForm.season = ""),
                (this.ruleForm.state = ""),
                (this.ruleForm.note = ""),
                (this.ruleForm.havePlan = ""),
                (this.dialogFormVisible = false);
              this.$message({
                message: "添加成功",
                type: "success"
              });
            })
        } else {
          this.$message({
            message: "请填写必须填写的项！",
            type: "error"
          });
        }
      });
    },

    //修改系列信息
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //第一步，将NAME转换为ID
          if (this.ruleForm.firstCustomerName != this.ruleForm.customerName) {
            //变了，说明显示的是ID
            this.ruleForm.customerId = this.ruleForm.customerName; //ID赋值给ID
          }
          if (this.ruleForm.firstBrandName != this.ruleForm.brandName) {
            this.ruleForm.brandId = this.ruleForm.brandName;
          }
          // if (this.ruleForm.firstRangeName != this.ruleForm.name) {
          //   this.ruleForm.id = this.ruleForm.name;
          //   this.ruleForm.options.rangeNameOption.forEach(element => {
          //     if (element.id == this.ruleForm.id) this.ruleForm.name = element.name;
          //   });
          // }
          if (
            this.ruleForm.firstClothingLevel != this.ruleForm.clothingLevelName
          ) {
            this.ruleForm.clothingLevelId = this.ruleForm.clothingLevelName;
          }
          const that = this;
          request
            .put(`/info/series/update`, {
              id: this.ruleForm.id,
              name: this.ruleForm.name,
              brandId: this.ruleForm.brandId,
              clothesLevelName: this.ruleForm.clothingLevelId,
              note: this.ruleForm.note,
              systemCode:this.ruleForm.systemCode,
              season:this.ruleForm.season

            })
            .then(response => {
              this.handleSearch();
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
                  (this.ruleForm.options.brandNameOptions = ""),
                  (this.ruleForm.options.rangeNameOption = ""),
                  (this.dialogFormVisible1 = false);

              
            })
        } else {
          this.$message({
            message: "修改失败!",
            type: "error"
          });
        }
      });
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
        (this.ruleForm.options.brandNameOptions = ""),
        (this.ruleForm.options.rangeNameOption = ""),
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