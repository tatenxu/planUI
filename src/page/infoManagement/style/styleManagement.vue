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
            <el-input v-model="searchOptions.searchParams.rangeName" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">订单款号</div>
            <el-input v-model="searchOptions.searchParams.number" clearable placeholder="请输入"></el-input>
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
          <el-table-column prop="number" width="150" label="订单款号" align="center"></el-table-column>
          <el-table-column prop="clientName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothesLevelName" label="服装层次" align="center"></el-table-column>
          <el-table-column prop="seriesName" width="150" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="creatorName" label="添加人" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="createTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="addMode" label="添加方式" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" width="150" min-width="100" align="center" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button @click="getStyleData(scope.row)" type="text" size="small">查看</el-button> -->
              <el-button
                v-if="scope.row.styleGroupNumber"
                @click="deleteStyleData(scope.row)"
                type="text"
                size="small"
                disabled
              >修改</el-button>
              <el-button v-else @click="changeStyleData(scope.row)" type="text" size="small">修改</el-button>

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
    //得到品牌名称
    request
      .get(`/backstage/brand/name`, {
        params: {
          clientId: undefined
        }
      })
      .then(response => {
        this.searchOptions.options.brandNameOptions = response.result;
      });

    //得到客户名称
    request.get(`/backstage/client/name`).then(response => {
      var CustomerList = response.result;
      this.searchOptions.options.customerNameOptions = CustomerList;
      this.options.customerNameOptions = this.searchOptions.options.customerNameOptions;
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
        this.tableDataA = response.result;
        
        this.pagination.total = response.total;
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
      this.pageChanged();
    },
    dialogCustomerNameSelectionChange() {
      var list = {
        clientId: this.ruleForm.customerName
      };
      console.log(list);
      request
        .get(`/backstage/brand/name`, {
          params: list
        })
        .then(response => {
          this.options.brandNameOptions = response.result;
        });

      this.ruleForm.brandName = "";
      this.ruleForm.rangeName = "";
      // this.ruleForm.number = "";
    },
    dialogBrandNameSelectionChange() {
      var list = {
        brandId: this.ruleForm.brandName
      };
      request
        .get(`/info/series/name`, {
          params: list
        })
        .then(response => {
          this.options.rangeNameTypeOptions = response.result;
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
     pageChanged() {
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
        clientId:
          this.searchOptions.searchParams.customerName === ""
            ? undefined
            : this.searchOptions.searchParams.customerName,
        brandId:
          this.searchOptions.searchParams.brandName === ""
            ? undefined
            : this.searchOptions.searchParams.brandName,
        seriesName:
          this.searchOptions.searchParams.rangeName === ""
            ? undefined
            : this.searchOptions.searchParams.rangeName,
        name:
          this.searchOptions.searchParams.number === ""
            ? undefined
            : this.searchOptions.searchParams.number,
        createAfter: startDate,
        createBefore: endDate,
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.pageSize
      };
      console.log(list);

      request
        .get(`/info/style/find`, {
          params: list
        })
        .then(response => {
          this.tableDataA = response.result;
          
          this.pagination.total = response.total;
        });
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
        clientId:
          this.searchOptions.searchParams.customerName === ""
            ? undefined
            : this.searchOptions.searchParams.customerName,
        brandId:
          this.searchOptions.searchParams.brandName === ""
            ? undefined
            : this.searchOptions.searchParams.brandName,
        seriesName:
          this.searchOptions.searchParams.rangeName === ""
            ? undefined
            : this.searchOptions.searchParams.rangeName,
        name:
          this.searchOptions.searchParams.number === ""
            ? undefined
            : this.searchOptions.searchParams.number,
        createAfter: startDate,
        createBefore: endDate,
        pageNum: 1,
        pageSize: this.pagination.pageSize
      };
      console.log(list);

      request
        .get(`/info/style/find`, {
          params: list
        })
        .then(response => {
          this.tableDataA = response.result;
          
          this.pagination.total = response.total;
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
      this.controlData.ifStyleAdd = true;
      this.dialogFormVisible = true;
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
              request
                .delete(`/info/style/delete`, {
                  params: {
                    id: element.id
                  }
                })
                .then(response => {
                  this.handleSearch();
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
        let rangeId = this.multipleSelection[0].seriesId;
        let ok = 0;
        this.multipleSelection.forEach(element => {
          if (element.seriesId != rangeId) {
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
      //得到系列名称
      request
        .get(`/info/series/name`, {
          params: {
            brandId: row.brandId
          }
        })
        .then(response => {
          // this.searchOptions.options.rangeNameOptions = response.data;
          this.options.rangeNameTypeOptions = response.result;
        });
      //得到品牌名称
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: row.customerId
          }
        })
        .then(response => {
          // this.searchOptions.options.brandNameOptions = response.data;
          this.options.brandNameOptions = response.result;
        });

      this.ruleForm.customerName = row.clientId;
      this.ruleForm.brandName = row.brandId;
      this.ruleForm.rangeName = row.seriesId;
      this.ruleForm.number = row.number;
      this.ruleForm.id = row.id;

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
        var list = {
          id: row.id
        };
        request
          .delete(`/info/style/delete`, {
            params: list
          })
          .then(response => {
            this.handleSearch();
           
          })
         
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            //此处的接口为GET订单款号
            .post(`/info/style/insert`, {
              number: this.ruleForm.number,
              seriesId: this.ruleForm.rangeName,
              addMode: "手动"
            })
            .then(response => {
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
                (this.options.brandNameOptions = "");
              this.options.rangeNameTypeOptions = "";
              this.options.styleNumberOptions = "";
              this.dialogFormVisible = false;
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
          var list = {
            id: this.ruleForm.id,
            number: this.ruleForm.number,
            seriesId: this.ruleForm.rangeName
          };
          request
            //此处的接口为GET订单款号
            .put(`/info/style/update`, list)
            .then(response => {

                this.handleSearch();
                this.ruleForm.customerName = "";
                this.ruleForm.brandName ="";
                this.ruleForm.rangeName ="";
                this.ruleForm.number = "";
                this.ruleForm.id = "";
                this.dialogFormVisible1 = false;
                
               
            })
          
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