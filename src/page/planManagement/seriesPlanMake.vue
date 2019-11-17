<template>
  <el-card class="box-card">
    <el-tabs v-model="viewname" @tab-click="handleTabClick" class="cardTab">
      <el-tab-pane label="系列计划制定" name="first" class="tabPane">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <div class="title">客户名称</div>
              <el-select v-model="ClientName" clearable placeholder="请选择">
                <el-option
                  v-for="item in client"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">品牌</div>
              <el-select v-model="BrandName" clearable placeholder="请选择">
                <el-option v-for="item in brand" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">系列名称</div>
              <el-input v-model="SeriesName" placeholder="请输入系列名称" :clearable="true"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <div class="title">添加时间</div>
              <el-date-picker
                style="margin-left:20px "
                v-model="Date1"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">服装层次</div>

              <el-select v-model="clothingLevelId" clearable placeholder="请选择">
                <el-option
                  v-for="item in type"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="4" class="MinW" style="margin-left:30px">
            <el-switch
              v-model="checked"
              @change="planTypeSwitchChange"
              inactive-color="#13ce66"
              inactive-text="未制定"
              active-text="已制定"
            ></el-switch>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-col :span="3">
              <el-button type="primary" @click="searchSeriesPlan(1)">搜索</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="handleClick1()">引用计划模板</el-button>
            </el-col>
            <!-- <el-col :span="5">
              <el-button type="primary" @click="handleClick2()">存为计划模板</el-button>
            </el-col>-->
            <!-- <el-col :span="5">
              <el-button type="primary" @click="handleClick3()">制定根计划</el-button>
            </el-col>-->
          </el-col>
        </el-row>

        <hr />

        <el-table
          :data="tableData"
          style="width: 100%; margin-top: 20px"
          @selection-change="IsChanged"
          border
        >
          <el-table-column width="50" type="selection" align="center"></el-table-column>
          <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
          <el-table-column prop="serialNo" width="180" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="clientName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothesLevelName" label="服装类型" align="center"></el-table-column>
          <el-table-column prop="name" width="170" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="styleQuantity" label="款数" align="center"></el-table-column>
          <el-table-column prop="creatorName" label="添加人" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="createTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="addMode" label="添加方式" align="center"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="200px" v-if="!checked">
            <template slot-scope="scope">
              <el-dialog title="系列详情" :visible.sync="ViewDetails" :modal="false">
                <el-tree :data="SeriesDetail" :props="defaultProps"></el-tree>
                <el-button type="primary" @click="ViewDetails=false" style="margin-left:90%">确认</el-button>
              </el-dialog>
              <el-button size="mini" @click="ToPlanForm(scope.row)" type="text">制定根计划</el-button>
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
      </el-tab-pane>

      <el-tab-pane label="引用计划模板" name="second" v-if="QuotePlanModel">
        <el-card>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="bar">
                <div class="title">客户名称</div>
                <el-select v-model="ClientName2" clearable placeholder="请选择">
                  <el-option
                    v-for="item in client"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">品牌</div>
                <el-select v-model="BrandName2" clearable placeholder="请选择">
                  <el-option
                    v-for="item in brand"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </el-col>

            <el-col :span="8">
              <div class="bar">
                <el-button type="primary" @click="searchTemplate">查询</el-button>
              </div>
            </el-col>
          </el-row>
          <br />
          <hr />
          <br />

          <el-row :gutter="20">
            <el-col :span="2">
              <el-button type="primary" size="small" @click="SaveModel()">确认</el-button>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="small" @click="CancelModel()">取消</el-button>
            </el-col>
          </el-row>
          <el-table
            :data="tableData1"
            style="width: 100%; margin-top: 20px"
            @selection-change="IsChanged1"
          >
            <el-table-column w idth="50" type="selection" align="center"></el-table-column>
            <el-table-column type="index" label="序号" align="center"></el-table-column>

            <el-table-column prop="name" label="模板名称" align="center"></el-table-column>
            <el-table-column prop="clientName" label="客户名称" align="center"></el-table-column>
            <el-table-column prop="brandName" label="品牌名称" align="center"></el-table-column>
            <el-table-column prop="creatorName" label="创建人" align="center"></el-table-column>

            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="toPlanModelPage(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="保存计划模版" name="third" v-if="SavePlanModel">
        <el-card>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="bar">
                  <el-form-item label="客户名称" prop="ClientName3" placeholder="请选择客户名称">
                    <el-select
                      v-model="ruleForm.ClientName3"
                      clearable
                      placeholder="请选择"
                      style="min-width:250px"
                    >
                      <el-option
                        v-for="item in client"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="bar">
                  <el-form-item label="品牌名称" prop="BrandName3" placeholder="请选择品牌名称">
                    <el-select
                      v-model="ruleForm.BrandName3"
                      clearable
                      placeholder="请选择"
                      style="min-width:250px"
                    >
                      <el-option
                        v-for="item in brand"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="8">
                <div class="bar">
                  <el-form-item label="模板名称" prop="FormName" placeholder="请输入模板名称">
                    <el-input
                      v-model="ruleForm.FormName"
                      clearable
                      :rows="1"
                      style="margin-left: 20px;min-width:250px"
                      placeholder="请输入"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="2">
                <div class="bar">
                  <el-button type="primary" @click="SaveModel2()">保存</el-button>
                </div>
              </el-col>

              <el-col :span="2">
                <div class="bar">
                  <el-button type="primary" @click="CancelModel2()">取消</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="制定根计划" name="fourth" v-if="rootPlanMakeFlag">
        <el-card>
          <el-form
            :model="rootPlanMake"
            :rules="planMakeRules"
            ref="rootPlanMake"
            label-width="120px"
            class="add-ruleForm"
          >
            <el-row :gutter="20">
              <el-col :span="13">
                <div class="bar">
                  <el-form-item label="起止时间" prop="planMakeStartEndDate" placeholder="请选择起止时间">
                    <el-date-picker
                      :picker-options="pickerOptions0"
                      style="margin-left:20px"
                      v-model="rootPlanMake.planMakeStartEndDate"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                    ></el-date-picker>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="bar">
                  <el-form-item label="根计划名称" prop="planMakeName" placeholder="请输入根计划名称">
                    <el-input
                      v-model="rootPlanMake.planMakeName"
                      clearable
                      :rows="1"
                      placeholder="请输入"
                      style="min-width:240px"
                    ></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="bar" style="margin-left: 0px">
                  <el-form-item label="日期类型" prop="planMakeDateType" placeholder="请选择日期类型">
                    <el-select
                      v-model="rootPlanMake.planMakeDateType"
                      clearable
                      placeholder="请选择"
                      style="min-width:120px"
                    >
                      <el-option
                        v-for="item in dateTypeOptions"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="4">
                <el-form-item label prop="productDate" placeholder="请选择日期">
                  <el-date-picker
                    :picker-options="pickerOptions1"
                    v-model="rootPlanMake.planMakeDate"
                    type="date"
                    placeholder="选择日期"
                    style="min-width:260px"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <div class="Mbutton">
                  <el-col :span="2">
                    <el-button type="primary" @click="addRootPlan('rootPlanMake')">添加</el-button>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" @click="CancelRootPlan()">取消</el-button>
                  </el-col>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "seriesPlanMake",
  data() {
    return {
      pickerOptions0: {
        disabledDate: time => {
          var date = new Date();

          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      },

      pickerOptions1: {
        disabledDate: time => {
          var date = new Date();
  
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      seriesOptions: [],
      dateTypeOptions: [],
      planMakeRules: {
        planMakeStartEndDate: [
          {
            required: true,
            message: "请选择日期时间",
            trigger: "change"
          }
        ],
        // planMakeSeriesId: [
        //   { required: true, message: "请选择系列名称", trigger: "change" }
        // ],
        planMakeName: [
          { required: true, message: "请输入计划名称", trigger: "blur" }
        ],
        planMakeDateType: [
          { required: true, message: "请选择日期类型", trigger: "change" }
        ],
        planMakeDate: [
          { required: true, message: "请选择日期", trigger: "change" }
        ]
      },
      rootPlanName: "",
      rootPlanMake: {
        planMakeStartEndDate: [],
        planMakeName: "",
        planMakeSeriesId: [],
        planMakePlanClass: "",
        planMakeObjectId: "",
        planMakeDateType: "",
        planMakeDate: "",
        planMakeStartDate: "",
        planMakeEndDate: ""
      },

      rootPlanMakeFlag: false,
      rules: {
        ClientName3: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        BrandName3: [
          { required: true, message: "请选择品牌名称", trigger: "change" }
        ],
        FormName: [
          { required: true, message: "请输入模板名称", trigger: "blur" }
        ]
      },
      ruleForm: {
        FormName: "",
        BrandName3: "",
        ClientName3: "",
        planId: "",
        planName: ""
      },
      isPublic: false,
      rangeIdForTemplate: "",
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },

      clothingLevelId: "",
      DataStartTime: "",
      DataEndTime: "",
      ViewDetails: false,
      checked: 0,
      FormName: "",
      viewname: "first",
      SavePlanModel: false,
      QuotePlanModel: false,
      ClientName2: "",
      ClientName3: "",
      ClientName: "",
      BrandName: "",
      BrandName2: "",
      BrandName3: "",
      ClothesType: "",
      Date1: "",
      Date2: "",
      SeriesName: "",
      SeriesGroupName: "",
      PlanName: "",
      OrderId: "",
      AnyChanged: [],
      AnyChanged1: [],
      SeriesDetail: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      client: [],
      brand: [],
      type: [],

      series: [],
      tableData1: [],
      tableData: []
    };
  },
  created: function() {
    request.get(`/plan-template/find`).then(response => {
      this.tableData1 = response.result;
    });
    //获得品牌下拉框
    request.get(`/backstage/brand/name`).then(response => {
      this.brand = response.result;
    });

    //获得系列名称
    request
      .get(`/info/series/name`, {
        params: {
          brandId: 1
        }
      })
      .then(response => {
        this.seriesOptions = response.result;
      });

    //获得日期类型
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "日期类型"
        }
      })
      .then(response => {
        this.dateTypeOptions = response.result;
      });

    //获得服装层次下拉框
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "服装层次"
        }
      })
      .then(response => {
        this.type = response.result;
      });

    //获得客户名称下拉框
    request.get(`/backstage/client/name`).then(response => {
      this.client = response.result;
    });

    //获得空集搜索列表
    request
      .get(`/info/series/find`, {
        params: {
          pageNum: 1,
          pageSize: 10,
          haveRootPlan: false
        }
      })
      .then(response => {
        this.tableData = response.result;
        this.pagination.total = response.total;
      });
  },
  methods: {
    CancelRootPlan() {
      this.rootPlanMakeFlag = false;
      this.viewname = "first";
      this.rootPlanMake.planMakeStartEndDate = [];
      this.rootPlanMake.planMakeName = "";
      this.rootPlanMake.planMakeSeriesId = [];
      this.rootPlanMake.planMakePlanClass = "";
      this.rootPlanMake.planMakeObjectId = "";
      this.rootPlanMake.planMakeDateType = "";
      this.rootPlanMake.planMakeDate = "";
      this.rootPlanMake.planMakeStartDate = "";
      this.rootPlanMake.planMakeEndDate = "";
    },
    addRootPlan(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.rootPlanMake.planMakeStartDate = that.changeDate(
            this.rootPlanMake.planMakeStartEndDate[0]
          );
          this.rootPlanMake.planMakeEndDate = that.changeDate(
            this.rootPlanMake.planMakeStartEndDate[1]
          );

          this.rootPlanMake.planMakeDate = that.changeDate(
            this.rootPlanMake.planMakeDate
          );
          let list = [];
          this.rootPlanMake.planMakeSeriesId.forEach(element => {
            list.push({
              name: this.rootPlanMake.planMakeName,
              seriesId: element,
              planClass: "系列计划",
              objectId: element,
              dateType: this.rootPlanMake.planMakeDateType,
              date: this.rootPlanMake.planMakeDate,
              startDate: this.rootPlanMake.planMakeStartDate,
              endDate: this.rootPlanMake.planMakeEndDate
            });
          });

          request.post(`/root-plan/insert`, list[0]).then(response => {
            this.searchSeriesPlan(1);
            this.rootPlanMakeFlag = false;
            this.viewname = "first";
            this.rootPlanMake.planMakeStartEndDate = [];
            this.rootPlanMake.planMakeName = "";
            this.rootPlanMake.planMakeSeriesId = [];
            this.rootPlanMake.planMakePlanClass = "";
            this.rootPlanMake.planMakeObjectId = "";
            this.rootPlanMake.planMakeDateType = "";
            this.rootPlanMake.planMakeDate = "";
            this.rootPlanMake.planMakeStartDate = "";
            this.rootPlanMake.planMakeEndDate = "";
          });
        } else {
          this.$message({
            message: "制定根计划失败!",
            type: "error"
          });
        }
      });
    },

    handleClick3() {
      if (this.AnyChanged.length < 1) {
        this.$message({
          type: "error",
          message: "请至少选择一项进行制定根计划。"
        });
        return;
      }
      this.AnyChanged.forEach(element => {
        this.rootPlanMake.planMakeSeriesId.push(element.id);
      });
      this.rootPlanMakeFlag = true;
      this.viewname = "fourth";
    },
    toPlanModelPage(row) {
      this.$router.push({
        name: "bePlanModelEdit",
        params: {
          flag: 2,
          id: row.id,
          name: row.name,
          customerName: row.customerName,
          brandName: row.brandName,
          tree: row.tree,
          goback: "seriesPlanMake"
        }
      });
    },
    searchTemplate() {
      request
        .get(`/plan-template/find`, {
          params: {
            clientId: this.ClientName2 === "" ? undefined : this.ClientName2,
            brandId: this.brandName2 === "" ? undefined : this.brandName2
          }
        })
        .then(response => {
          this.tableData1 = response.result;
        });
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log("每页+" + this.pagination.pageSize);
      this.searchSeriesPlan(1);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.searchSeriesPlan(val);
    },
    //改变日期格式
    changeDate(date) {
      if (!date) {
        return null;
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
    planTypeSwitchChange() {
      this.pagination.currentPage = 1;

      const that = this;
      if (this.Date1 != null) {
        this.DataStartTime = that.changeDate(this.Date1[0]);
        this.DataEndTime = that.changeDate(this.Date1[1]);
      } else {
        this.DataStartTime = null;
        this.DataEndTime = null;
      }

      request
        .get(`/info/series/find`, {
          params: {
            haveRootPlan: this.checked === false ? false : true,
            name: this.SeriesName === "" ? null : this.SeriesName,
            clientId: this.ClientName === "" ? null : this.ClientName,
            brandId: this.BrandName === "" ? null : this.BrandName,
            clothesLevelName:
              this.clothingLevelId === "" ? null : this.clothingLevelId,
            createAfter: this.DataStartTime,
            createBefore: this.DataEndTime,
            pageNum: 1,
            pageSize: this.pagination.pageSize
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
        });
    },
    //搜索
    searchSeriesPlan(CurrentPageNum) {
      const that = this;

      if (this.Date1 != null) {
        this.DataStartTime = that.changeDate(this.Date1[0]);
        this.DataEndTime = that.changeDate(this.Date1[1]);
      } else {
        this.DataStartTime = null;
        this.DataEndTime = null;
      }

      request
        .get(`/info/series/find`, {
          params: {
            haveRootPlan: this.checked === false ? false : true,
            name: this.SeriesName === "" ? null : this.SeriesName,
            clientId: this.ClientName === "" ? null : this.ClientName,
            brandId: this.BrandName === "" ? null : this.BrandName,
            clothesLevelName:
              this.clothingLevelId === "" ? null : this.clothingLevelId,
            createAfter: this.DataStartTime,
            createBefore: this.DataEndTime,
            pageNum: CurrentPageNum,
            pageSize: this.pagination.pageSize
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
        });
    },

    IsChanged(val) {
      this.AnyChanged = val;
    },

    IsChanged1(val) {
      this.AnyChanged1 = val;
    },
    ToPlanForm(row) {
      this.rootPlanMake.planMakeSeriesId.push(row.id);
      this.rootPlanMakeFlag = true;
      this.viewname = "fourth";
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    SaveModel() {
      if (this.AnyChanged1.length != 1) {
        this.$message({
          message: "请选择一条进行引用！",
          type: "error"
        });
        return;
      }

      request
        .post(`/root-plan/quote`, null, {
          params: {
            seriesId: this.rangeIdForTemplate,
            templateId: this.AnyChanged1[0].id
          }
        })
        .then(response => {
          this.searchSeriesPlan(this.pagination.currentPage);
          this.QuotePlanModel = false;
          this.viewname = "first";
          this.AnyChanged1 = [];
          return;
        });
    },
    CancelModel() {
      this.QuotePlanModel = false;
      this.viewname = "first";
      this.AnyChanged1.splice(0, 1);
      return;
    },

    SaveModel2() {
      request
        .post(`/plan-template/save`, {
          rootPlanId: this.ruleForm.planId,
          name: this.ruleForm.FormName,
          clientId: this.ruleForm.ClientName3,
          brandId: this.ruleForm.BrandName3,
          rootPlanName: this.ruleForm.planName
        })
        .then(response => {
          this.ruleForm.planId = "";
          this.ruleForm.FormName = "";
          this.ruleForm.ClientName3 = "";
          this.ruleForm.BrandName3 = "";
          this.ruleForm.planName = "";
          this.SavePlanModel = false;
          this.viewname = "first";
          return;
        });
    },
    CancelModel2() {
      this.ruleForm.planId = "";
      this.ruleForm.FormName = "";
      this.ruleForm.ClientName3 = "";
      this.ruleForm.BrandName3 = "";
      this.ruleForm.planName = "";
      this.SavePlanModel = false;
      this.viewname = "first";
      return;
    },
    QuotePre(row) {
      const that = this;
      //获得品牌下拉框
      this.$axios
        .post(`${window.$config.HOST}/planManagement/quotePredictPlan`, {
          rangeId: row.id
        })
        .then(response => {});
    },
    handleClick2() {
      if (this.AnyChanged.length != 1) {
        this.$message({
          message: "请选择一条计划保存为模板！",
          type: "error"
        });
        return;
      }
      this.ruleForm.ClientName3 = this.AnyChanged[0].clientId;
      this.ruleForm.BrandName3 = this.AnyChanged[0].brandId;
      this.ruleForm.planId = this.AnyChanged[0].id;
      this.ruleForm.planName = this.AnyChanged[0].name;
      this.SavePlanModel = true;
      this.viewname = "third";
    },

    handleClick1() {
      if (this.AnyChanged.length != 1) {
        this.$message({
          message: "请选择一条系列进行引用模板！",
          type: "error"
        });
        return;
      }
      this.rangeIdForTemplate = this.AnyChanged[0].id;
      this.QuotePlanModel = true;
      this.viewname = "second";

    }
  },

  computed: {
    keepAlives: {
      get() {
        return this.$store.getters["baseinfo/keepAliveOptions"];
      },
      set(value) {
        return this.$store.commit("baseinfo/keepalive-opt-arr", value);
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "planMakeIndex" || to.name === "bePlanModelEdit") {
      this.keepAlives = ["seriesPlanMake"];
    } else {
      this.keepAlives = [];
    }
    next();
  }
};
</script>

<style lang="less" scoped>
.title {
  min-width: 100px;
}
.containerHeaderDiv1 {
  display: flex;
  flex-direction: row;
  width: 100%;
  // background: black;
  .containerHeaderDiv2 {
    position: relative;
    left: 300px;
    // margin-right: 100px;
    // background: white;
    display: flex;
    flex-direction: row-reverse;
    min-width: 500px;
    .input {
      min-width: 200px;
      max-width: 400px;
    }
    .inputTag {
      font-size: 14px;
      line-height: 40px;
      min-width: 90px;
    }
  }
}

.inputCombine {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  min-width: 250px;
  max-width: 500px;
  .inputTag {
    font-size: 14px;
    line-height: 40px;
    min-width: 90px;
  }
}

.secondButtonDiv {
  margin-top: 20px;
  min-width: 250px;
  max-width: 500px;
  // background: black;
  .save {
    margin-left: 68%;
  }
}

.containerHeaderDiv1 {
  display: flex;
  flex-direction: row;
  width: 100%;
  // background: black;
  .containerHeaderDiv2 {
    position: relative;
    left: 300px;
    // margin-right: 100px;
    // background: white;
    display: flex;
    flex-direction: row-reverse;
    min-width: 500px;
    .input {
      min-width: 200px;
      max-width: 400px;
    }
    .inputTag {
      font-size: 14px;
      line-height: 40px;
      min-width: 90px;
    }
  }
}
.block {
  padding: 30px 0;
  text-align: center;
}
.Mtitle {
  align-content: center;
  margin-left: 45%;
  font-size: 2ch;
}
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .el-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    .MinW {
      min-width: 400px;
    }
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 14px;
        width: 90px;

        text-align: center;
      }
      .el-input {
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
  }
}
</style>