<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select
              v-model="searchOptions.searchParams.customerValue"
              @change="customerNameSelectionChange()"
              clearable
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
              v-model="searchOptions.searchParams.brandValue"
              @change="brandSelectionChange()"
              clearable
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
            <el-input v-model="searchOptions.searchParams.rangeValue" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">款式组名</div>
            <el-input v-model="searchOptions.searchParams.idValue" clearable placeholder="请输入"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="searchOptions.searchParams.clothingLevelValue" clearable>
              <el-option
                v-for="item in searchOptions.options.clothingTypeOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name"
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
              clearable
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
            <el-button type="primary" @click="addStyleGroup">添加款式组</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="deleteStyleGroup">删除款式组</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="unbindStyleGroup">解绑款式组</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="totalTableData"
          max-height="400"
          border
          @selection-change="changeCheckBoxFun"
          :stripe="true"
          :highlight-current-row="true"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="serialNo" width="150" label="款式组编号" align="center"></el-table-column>
          <el-table-column prop="name" width="150" label="款式组名称" align="center"></el-table-column>
          <el-table-column prop="clientName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="seriesName" width="150" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothesLevelName" label="服装层次" align="center"></el-table-column>
          <el-table-column prop="styleQuantity" label="数量" align="center"></el-table-column>
          <el-table-column prop="creatorName" label="添加人" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="createTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column label="操作" width="150" min-width="100" align="center" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button @click="getStyleGroupData(scope.row)" type="text" size="small">查看</el-button> -->
              <el-button @click="changeStyleGroupData(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="deleteStyleGroupRow(scope.row)" type="text" size="small">删除</el-button>
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
            <el-form-item label="客户名称" prop="tmpCustomer" placeholder="请选择客户名称">
              <el-select
                v-model="ruleForm.tmpCustomer"
                @change="dialogCustomerNameSelectionChange()"
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
            <el-form-item label="品牌名称" prop="tmpBrand" placeholder="请选择品牌名称">
              <el-select v-model="ruleForm.tmpBrand" @change="dialogBrandSelectionChange()">
                <el-option
                  v-for="item in options.brandNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="服装层次" prop="clothingLevelName" placeholder="请选择服装层次">
              <el-select v-model="ruleForm.clothingLevelName" >
                <el-option
                  v-for="item in options.clothingTypeOptions"
                  :key="item.id"
                  :label="item.clothingLevelName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item> 
          </el-col>-->
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="系列名称" prop="tmpRange" placeholder="请选择系列名称">
              <el-select v-model="ruleForm.tmpRange">
                <el-option
                  v-for="item in options.rangeNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="款式组名" prop="tmpStyleGroup" placeholder="请输入款式组名">
              <el-input v-model="ruleForm.tmpStyleGroup" clearable placeholder="请输入"></el-input>
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
import styleManagementVue from "../style/styleManagement.vue";
import request from "@/utils/request";
import { error } from "util";
import { strictEqual } from "assert";
export default {
  data() {
    return {
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      totalTableData: [],
      searchOptions: {
        searchParams: {
          customerName: "",
          brandName: "",
          clothingLevelName: "",
          rangeName: "",
          name: "",
          dateRange: ""
        },
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          clothingTypeOptions: [],
          rangeNameOptions: [],
          styleGroupNameOptions: []
        }
      },
      data: {
        tableData: []
      },
      multipleSelection: [],
      dialogFormVisible: false,
      rules: {
        tmpCustomer: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        tmpBrand: [
          { required: true, message: "请选择品牌", trigger: "change" }
        ],
        clothingLevelName: [
          { required: true, message: "请选择服装层次", trigger: "change" }
        ],
        tmpRange: [
          { required: true, message: "请选择系列名称", trigger: "change" }
        ],
        tmpStyleGroup: [
          { required: true, message: "请输入款式组名", trigger: "blur" }
        ]
      },
      ruleForm: {
        tmpCustomer: "",
        tmpBrand: "",
        tmpRange: "",
        tmpStyleGroup: "",

        id: "",
        number: "",
        name: "",
        rangeNumber: "",
        rangeId: "",
        rangeName: "",
        customerName: "",
        customerId: "",
        brandName: "",
        brandId: "",
        clothingLevelName: "",
        clothingLevelId: "",
        createrName: "",
        deptName: "",
        createTime: "",
        state: "",
        havePlan: ""
      },
      options: {
        customerNameOptions: [],
        brandNameOptions: [],
        clothingTypeOptions: [],
        rangeNameOptions: []
      },
      controlData: {
        ifStyleGroupAdd: false,
        ifStyleGroupChange: false
      },
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
      ]
    };
  },
  created: function() {
    const that = this;
    console.log("进入款式组管理页面");

    //获取客户名称
    request.get(`/backstage/client/name`).then(response => {
      var resData = response.result;
      resData.forEach(element => {
        this.searchOptions.options.customerNameOptions.push({
          id: element.id,
          name: element.name
        });
        this.options.customerNameOptions = this.searchOptions.options.customerNameOptions;
      });
    });

    //获取服装层次
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "服装层次"
        }
      })
      .then(response => {
        this.searchOptions.options.clothingTypeOptions = response.result;
      });

    var param = {
      clientId: undefined,
      brandId: undefined,
      seriesName: undefined,
      clothesLevelName: undefined,
      name: undefined,
      createAfter: undefined,
      createBefore: undefined,
      pageNum: 1,
      pageSize: 10
    };
    //默认获取所有款式组
    request
      .get(`/info/style-group/find`, {
        params: param
      })
      .then(response => {
        this.totalTableData = response.result;

        this.pagination.total = response.total;
      });

    //品牌名称选择获取
    request
      .get(`/backstage/brand/name`, {
        params: { clientId: undefined }
      })
      .then(response => {
        this.searchOptions.options.brandNameOptions = response.result;
        // this.options.brandNameOptions = this.searchOptions.options.brandNameOptions;
      });

    //获取款式组名
    // request
    //   .get(`${window.$config.HOST}/infoManagement/getStyleGroupName`,{
    //     params:{rangeId:undefined}
    //   })
    //   .then(response => {
    //     if(response.data.errcode < 0){
    //       console.log("款式组获取错误");
    //     }else{
    //       response.data.forEach(element=>{
    //         this.searchOptions.options.styleGroupNameOptions.push({
    //           id:element.name,
    //           name:element.name
    //         });
    //       });
    //     }
    //   })
  },
  methods: {
    //系列选择触发款式组名get

    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log("每页+" + this.pagination.pageSize);
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.pageChanged();
    },
    rangeSelectionChange() {
      console.log("系列名称选择触发");
      console.log(this.searchOptions.searchParams.rangeValue);
      // var param = {
      //   brandId: this.searchOptions.searchParams.rangeValue,
      // };
    },
    //品牌选择触发系列名称get
    brandSelectionChange() {
      console.log("品牌名称选择触发");
      console.log(this.searchOptions.searchParams.brandValue);
      // var param = {
      //   brandId: this.searchOptions.searchParams.brandValue,
      // };
    },
    //品牌名称选择后触发品牌的get请求
    dialogBrandSelectionChange() {
      this.ruleForm.tmpRange = "";
      this.options.rangeNameOptions = [];
      //对话框获取系列
      request
        .get(`/info/series/name`, {
          params: {
            brandId:
              this.ruleForm.brandName === this.ruleForm.tmpBrand
                ? this.ruleForm.brandId
                : this.ruleForm.tmpBrand
          }
        })
        .then(response => {
          this.options.rangeNameOptions = response.result;
        });
    },
    //客户名称选择后触发品牌的get请求
    customerNameSelectionChange() {
      console.log("客户名称选择触发");
      console.log(this.searchOptions.searchParams.customerValue);
    },
    //客户名称选择后触发品牌的get请求
    dialogCustomerNameSelectionChange() {
      // consol.log(val);
      this.ruleForm.tmpBrand = "";
      this.ruleForm.tmpRange = "";
      this.options.rangeNameOptions = [];
      //品牌名称选择获取
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId:
              this.ruleForm.tmpCustomer === this.ruleForm.customerName
                ? this.ruleForm.customerId
                : this.ruleForm.tmpCustomer
          }
        })
        .then(response => {
          this.options.brandNameOptions = response.result;
        });
    },
    // 改变日期格式
    changeDate(date) {
      console.log(date);
      if (!date) {
        return undefined;
      } else {
        // var date = new Date(date);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
      }
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
          } else {
            searchCondition[key] = that.searchOptions.searchParams[key];
          }
        }
      }
      console.log("当前搜索条件", searchCondition);
      return searchCondition;
    },
    // 搜索按钮点击
    pageChanged() {
      request
        .get(`/info/style-group/find`, {
          params: {
            clientId:
              this.searchOptions.searchParams.customerValue === ""
                ? undefined
                : this.searchOptions.searchParams.customerValue,
            brandId:
              this.searchOptions.searchParams.brandValue === ""
                ? undefined
                : this.searchOptions.searchParams.brandValue,
            clothesLevelName:
              this.searchOptions.searchParams.clothingLevelValue === ""
                ? undefined
                : this.searchOptions.searchParams.clothingLevelValue,
            name:
              this.searchOptions.searchParams.idValue === ""
                ? undefined
                : this.searchOptions.searchParams.idValue,
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
            seriesName: this.searchOptions.searchParams.rangeValue,
            pageNum: this.pagination.currentPage,
            pageSize: this.pagination.pageSize
          }
        })
        .then(response => {
          this.totalTableData = response.result;

          this.pagination.total = response.total;

          //时间排序
          this.data.tableData.sort(function(a, b) {
            return Date.parse(b.createTime) - Date.parse(a.createTime);
          });
        });
    },
    handleSearch() {
      request
        .get(`/info/style-group/find`, {
          params: {
            clientId:
              this.searchOptions.searchParams.customerValue === ""
                ? undefined
                : this.searchOptions.searchParams.customerValue,
            brandId:
              this.searchOptions.searchParams.brandValue === ""
                ? undefined
                : this.searchOptions.searchParams.brandValue,
            clothesLevelName:
              this.searchOptions.searchParams.clothingLevelValue === ""
                ? undefined
                : this.searchOptions.searchParams.clothingLevelValue,
            name:
              this.searchOptions.searchParams.idValue === ""
                ? undefined
                : this.searchOptions.searchParams.idValue,
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
            seriesName: this.searchOptions.searchParams.rangeValue,
            pageNum: 1,
            pageSize: this.pagination.pageSize
          }
        })
        .then(response => {
          this.totalTableData = response.result;

          this.pagination.total = response.total;

          //时间排序
          this.data.tableData.sort(function(a, b) {
            return Date.parse(b.createTime) - Date.parse(a.createTime);
          });
        });
    },
    // 添加款式组
    addStyleGroup() {
      const that = this;
      console.log("添加款式组按钮点击");

      this.controlData.ifStyleGroupAdd = true;

      this.dialogFormVisible = true;
    },
    // 删除款式组
    deleteStyleGroup() {
      const that = this;
      console.log("删除款式组按钮点击");
      if (that.multipleSelection.length === 0) {
        this.$message({
          message: "请选择要删除的款式组",
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
        ).then(() => {
          this.multipleSelection.forEach(element => {
            // console.log(element);
            request
              .delete(`/info/style-group/delete`, {
                params: { id: element.id }
              })
              .then(response => {
                this.handleSearch();
              });
          });
        });
      }
    },
    // 解绑款式组
    unbindStyleGroup() {
      const that = this;
      console.log("解绑款式组按钮点击");
      if (that.multipleSelection.length === 0) {
        that.$message({
          message: "请选择要解绑的款式组",
          type: "warning"
        });
      } else if (that.multipleSelection.length == 1) {
        var styleInfoStr = "";
        //根据款式组id获取款式
        request
          .get(`/info/style-group-relation/find`, {
            params: { styleGroupId: that.multipleSelection[0].id }
          })
          .then(response => {
            response.result.forEach(element => {
              styleInfoStr += element + " ";
            });
            if (styleInfoStr == "") {
              that.$message.error("该款式组未绑定款式！");
            } else {
              that
                .$confirm("包含款式: " + styleInfoStr + " 是否继续?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                .then(() => {
                  that.multipleSelection.forEach(element => {
                    request
                      .delete(`/info/style-group-relation/unbind`, {
                        params: { id: element.id }
                      })
                      .then(response => {
                        this.handleSearch();
                      });
                  });
                })
                .catch(() => {
                  that.$message({
                    type: "info",
                    message: "已取消解绑"
                  });
                });
            }
          })
          .catch(error => {
            console.log("获取款式失败:请检查网络");
            this.$message.error("获取款式失败:请检查网络");
          });
      }
    },
    /* //查看操作
    getStyleGroupData(row){
      this.ruleForm.customerName = row.customerName;
      this.ruleForm.brandName = row.brandName;
      this.ruleForm.clothingLevelName = row.clothingLevelName;
      this.ruleForm.rangeName = row.rangeName;
      this.ruleForm.name = row.name;

      this.dialogFormVisible = true;

    }, */
    // 表格中的修改
    changeStyleGroupData(row) {
      this.controlData.ifStyleGroupChange = true;

      (this.ruleForm.tmpCustomer = row.clientName),
        (this.ruleForm.tmpBrand = row.brandName),
        (this.ruleForm.tmpRange = row.seriesId),
        (this.ruleForm.tmpStyleGroup = row.name),
        (this.ruleForm.id = row.id),
        //对话框品牌名称选择获取
        request
          .get(`/backstage/brand/name`, {
            params: { clientId: row.customerId }
          })
          .then(response => {
            this.options.brandNameOptions = response.result;
          });

      //对话框获取系列
      request
        .get(`/info/series/name`, {
          params: { brandId: row.brandId }
        })
        .then(response => {
          this.options.rangeNameOptions = response.result;
        });

      this.options.rangeNameOptions = [];

      (this.ruleForm.id = row.id),
        (this.ruleForm.number = row.number),
        (this.ruleForm.name = row.name),
        (this.ruleForm.rangeNumber = row.rangeNumber),
        (this.ruleForm.rangeId = row.rangeId),
        (this.ruleForm.rangeName = row.rangeName),
        (this.ruleForm.customerName = row.customerName),
        (this.ruleForm.customerId = row.customerId),
        (this.ruleForm.brandName = row.brandName),
        (this.ruleForm.brandId = row.brandId),
        (this.ruleForm.clothingLevelName = row.clothingLevelName),
        (this.ruleForm.clothingLevelId = row.clothingLevelId),
        (this.ruleForm.createrName = row.createrName),
        (this.ruleForm.deptName = row.deptName),
        (this.ruleForm.createTime = row.createTime),
        (this.ruleForm.state = row.state),
        (this.ruleForm.havePlan = row.havePlan),
        (this.dialogFormVisible = true);
    },
    // 表格中的删除
    deleteStyleGroupRow(row) {
      const that = this;
      console.log("删除" + row.id);
      this.$confirm("是否确认删除该款式组？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request
            .delete(`/info/style-group/delete`, {
              params: { id: row.id }
            })
            .then(response => {
              this.handleSearch();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 保存按钮点击
    submitForm(formName) {
      const that = this;
      if (this.controlData.ifStyleGroupAdd) {
        this.controlData.ifStyleGroupAdd = false;
        var param = {
          seriesId:
            this.ruleForm.tmpRange === "" ? undefined : this.ruleForm.tmpRange,
          name:
            this.ruleForm.tmpStyleGroup === ""
              ? undefined
              : this.ruleForm.tmpStyleGroup
        };

        request.post(`/info/style-group/insert`, param).then(response => {
          this.handleSearch();
          this.ruleForm.tmpCustomer = "";
          this.ruleForm.tmpBrand = "";
          this.ruleForm.tmpRange = "";
          this.ruleForm.tmpStyleGroup = "";
        });
      } else if (this.controlData.ifStyleGroupChange) {
        this.controlData.ifStyleGroupChange = false;
        var param = {
          id: this.ruleForm.id,
          name:
            this.ruleForm.tmpStyleGroup === ""
              ? undefined
              : this.ruleForm.tmpStyleGroup,
          seriesId:
            this.ruleForm.tmpRange === this.ruleForm.rangeName
              ? this.ruleForm.rangeId
              : this.ruleForm.tmpRange
        };
        console.log(param);
        request.put(`/info/style-group/update`, param).then(response => {
          this.handleSearch();
        });
      }

      this.handleSearch();
      this.options.brandNameOptions = [];
      this.options.rangeNameOptions = [];
      this.ruleForm.tmpCustomer = "";
      this.ruleForm.tmpBrand = "";
      this.ruleForm.tmpRange = "";
      this.ruleForm.tmpStyleGroup = "";
      this.dialogFormVisible = false;
    },
    // 取消按钮点击
    cancel() {
      const that = this;
      console.log("取消按钮点击");
      this.ruleForm.tmpCustomer = "";
      this.ruleForm.tmpBrand = "";
      this.ruleForm.tmpRange = "";
      this.ruleForm.tmpStyleGroup = "";
      /* that.$router.push({
        path: `/styleGroup/styleGroupManagement`,
      }); */
      this.dialogFormVisible = false;
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