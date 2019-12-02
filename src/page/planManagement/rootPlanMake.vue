<template>
  <div class="body">
    <el-card class="box-card">
      <el-tabs v-model="viewname" @tab-click="handleTabClick" class="cardTab">
        <el-tab-pane label="根计划" name="first" class="tabPane">
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
            <el-col :span="8">
              <div class="bar">
                <div class="title">根计划名称</div>
                <el-input v-model="rootPlanName" placeholder="请输入系列名称" :clearable="true"></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
     
              <el-col :span="10">
                <el-button type="primary" @click="searchSeriesPlan(1)">搜索</el-button>

                <el-button type="primary" @click="handleClick2()">存为计划模板</el-button>

                <el-button type="primary" @click="deleteRootPlan()">删除根计划</el-button>
              </el-col>
              <el-col :span="8" style="margin-top:10px;margin-left:400px">
                <el-radio-group v-model="checked" @change="changeState">
                  <el-radio :label="1">系列</el-radio>
                  <el-radio :label="2">款式组</el-radio>
                  <el-radio :label="3">款式</el-radio>
                </el-radio-group>
              </el-col>
 
          </el-row>

          <hr />

          <el-table
            :data="tableData"
            style="width: 100%; margin-top: 20px"
            @selection-change="IsChanged"
          >
            <el-table-column w idth="50" type="selection" align="center"></el-table-column>
            <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
            <el-table-column prop="clientName" label="客户名称" align="center"></el-table-column>
            <el-table-column prop="brandName" label="品牌名称" align="center"></el-table-column>
            <el-table-column prop="seriesName" label="系列名称" align="center"></el-table-column>
            <el-table-column prop="objectName" label="款式组名称" align="center" v-if="checked ===2"></el-table-column>
            <el-table-column prop="objectName" label="款式名称" align="center" v-if="checked ===3"></el-table-column>
            <el-table-column prop="creatorName" label="创建人" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="200px">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="assignRootPlan(scope.row)"
                  v-if="scope.row.state ==='已制定'"
                  type="text"
                >下发</el-button>
                <el-button
                  size="mini"
                  @click="assignDetail(scope.row)"
                  v-if="scope.row.state ==='已下发'"
                  type="text"
                >查看下发情况</el-button>
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
                <el-col :span="8">
                  <div class="bar">
                    <el-form-item label="系列名称" prop="planMakeSeriesId" placeholder="请选择系列名称">
                      <el-select
                        v-model="rootPlanMake.planMakeSeriesId"
                        clearable
                        placeholder="请选择"
                        style="min-width:240px"
                      >
                        <el-option
                          v-for="item in seriesOptions"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col :span="13">
                  <div class="bar">
                    <el-form-item label="起止时间" prop="date" placeholder="请选择起止时间">
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
    <el-dialog
      :modal="false"
      title="根计划下发"
      :visible.sync="dialogFormVisible1"
      :before-close="cancel"
    >
      <el-row :gutter="20" style="margin-top:-30px;">
        <el-col :span="6">
          <div class="title" style="font-size:20px;margin-left:100px;font-weight:700">产线</div>
        </el-col>
        <el-col :span="10">
          <div class="title" style="font-size:20px;margin-left:230px;font-weight:700">人员</div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="assignRoot" style="margin-left:100px">下发</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:15px;">
        <el-col :span="6">
          <el-tree :data="productionLine" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-col>
        <el-col :span="13">
          <el-table
            :data="personTable"
            max-height="400"
            @selection-change="changeCheckBoxFun2"
            :stripe="true"
            :highlight-current-row="true"
            style="width: 100%; margin-top: 20px;margin-left:30%"
          >
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="200" label="人员" align="center"></el-table-column>
            <el-table-column width="150" prop="assignPlanType" label="计划类型" align="center">
              <template slot-scope="scope">
                <el-select size="medium" v-model="scope.row.assignPlanType">
                  <el-option
                    v-for="item in assignPlanTypeOptions"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>

    <el-dialog
      :modal="false"
      title="下发详情"
      :visible.sync="dialogFormVisible2"
      :before-close="cancel"
    >
      <el-row :gutter="20">
        <el-col :span="20">
          <el-table
            :data="assignDetailTable"
            style="width: 100%; margin-top: 20px;margin-left:100px"
          >
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="executorName" width="150" label="人员" align="center"></el-table-column>
            <el-table-column prop="createTime" width="150" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="assignPlanType" width="150" label="计划类型" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="100px">
              <template slot-scope="scope">
                <el-button size="mini" @click="deleteAssign(scope.row,scope.index)" type="text">撤回</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  name: "seriesPlanMake",
  data() {
    return {
      assignDetailTable: [],
      dialogFormVisible2: false,
      deleteAssignId: "",
      assignPlanTypeOptions: [],
      assignId: "",
      defaultProps: {
        children: "children",
        label: "name"
      },
      productionLine: [],
      personTable: [],
      dialogFormVisible1: false,
      pickerOptions0: {
        disabledDate: time => {
          var date = new Date();
          console.log(date.toLocaleDateString());
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      },

      pickerOptions1: {
        disabledDate: time => {
          var date = new Date();
          console.log(date.toLocaleDateString());
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      seriesOptions: [],
      dateTypeOptions: [],
      planMakeRules: {
        planMakeStartEndDate: [
          { required: true, message: "请选择日期时间", trigger: "change" }
        ],
        planMakeSeriesId: [
          { required: true, message: "请选择系列名称", trigger: "change" }
        ],
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
        planMakeSeriesId: "",
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
      checked: 1,
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

      client: [],
      brand: [],
      type: [],

      series: [],
      tableData1: [],
      tableData: [],
      userSelection: [],
      userSelectionList: []
    };
  },
  created: function() {
    //获取计划类型
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "计划类型"
        }
      })
      .then(response => {
        this.assignPlanTypeOptions = response.result;
      });

    //获取产线
    request
      .get(`http://192.168.1.180:8081/product-line/find`)
      .then(response => {
        this.productionLine = response.result;
      });

    //获取模板信息
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
      .get(`/root-plan/find`, {
        params: {
          pageNum: 1,
          pageSize: 10,
          planClass: "SERIES"
        }
      })
      .then(response => {
        this.tableData = response.result;
        this.pagination.total = response.total;
      });
  },
  methods: {
    assignDetail(row) {
      this.dialogFormVisible2 = true;
      this.deleteAssignId = row.id;
      this.handleSearch();
    },
    handleSearch() {
      request
        .get(`/root-plan-assign/find`, {
          params: {
            rootPlanId: this.deleteAssignId
          }
        })
        .then(response => {
          this.assignDetailTable = response.result;
        });
    },
    deleteAssign(row) {
      const that = this;
      this.$confirm("是否撤回该条计划下发？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        request
          .delete(`/root-plan-assign/delete`, {
            params: {
              id: row.id
            }
          })
          .then(response => {
            this.handleSearch();
            this.searchSeriesPlan(this.pagination.currentPage);
          });
      });
    },
    assignRootPlan(row) {
      this.assignId = row.id;
      this.dialogFormVisible1 = true;
    },
    assignRoot() {
      let list = [];
      this.userSelection.forEach(element => {
        if (!element.assignPlanType) {
          this.$message({
            message: "任意一条勾选的人员都必须选择计划类型!",
            type: "error"
          });
          return;
        }
        list.push({
          assignPlanType: element.assignPlanType,
          executorId: element.userId,
          executorName: element.name,
          rootPlanId: this.assignId
        });
      });
      request.post(`/root-plan-assign/insert`, list).then(response => {
        this.searchSeriesPlan(this.pagination.currentPage);
        this.assignId = "";
        this.userSelection = [];
        this.userSelectionList = [];
        this.personTable = [];
        this.dialogFormVisible = false;
        this.dialogFormVisible1 = false;
      });
    },
    cancel() {
      this.assignId = "";
      this.userSelection = [];
      this.userSelectionList = [];
      this.personTable = [];
      this.assignDetailTable = [];
      this.deleteAssignId = "";
      this.dialogFormVisible = false;
      this.dialogFormVisible1 = false;
      this.dialogFormVisible2 = false;
    },
    changeCheckBoxFun2(val) {
      const that = this;
      that.userSelection = val;
    },
    changeCheckBoxFun3(val) {
      const that = this;
      that.assignDetailTable = val;
    },
    handleNodeClick(data) {
      console.log(data);
      request
        .get(`http://192.168.1.180:8081/user-product-line/find`, {
          params: {
            productLineId: data.id
          }
        })
        .then(response => {
          this.personTable = response.result;
        });
    },
    changeState() {
      this.searchSeriesPlan(1);
    },
    CancelRootPlan() {
      this.rootPlanMakeFlag = false;
      this.viewname = "first";
      this.rootPlanMake.planMakeStartEndDate = [];
      this.rootPlanMake.planMakeName = "";
      this.rootPlanMake.planMakeSeriesId = "";
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
          request
            .post(`/root-plan/insert`, {
              name: this.rootPlanMake.planMakeName,
              seriesId: this.rootPlanMake.planMakeSeriesId,
              planClass: "系列计划",
              objectId: this.rootPlanMake.planMakeSeriesId,
              dateType: this.rootPlanMake.planMakeDateType,
              date: this.rootPlanMake.planMakeDate,
              startDate: this.rootPlanMake.planMakeStartDate,
              endDate: this.rootPlanMake.planMakeEndDate,
              state: "已制定"
            })
            .then(response => {});
        } else {
          this.$message({
            message: "制定根计划失败!",
            type: "error"
          });
        }
      });
    },
    deleteRootPlan() {
      if (this.AnyChanged.length < 1) {
        this.$message({
          message: "请选择计划进行删除！",
          type: "error"
        });
        return;
      } else {
        this.AnyChanged.forEach(element => {
          request.delete("/root-plan/delete", {
            params: {
              id: element.id
            }
          })
          .then(response=>{
            this.searchSeriesPlan(1);
          })
        });
      }
    },
    handleClick3() {
      (this.rootPlanMakeFlag = true), (this.viewname = "fourth");
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
    // planTypeSwitchChange() {
    //   this.pagination.currentPage = 1;
    //   const that = this;
    //   this.DataStartTime = that.changeDate(this.Date1[0]);
    //   this.DataEndTime = that.changeDate(this.Date1[1]);
    //   console.log(list);
    //   request
    //     .get(`/root-plan/find`, {
    //       params: {
    //         name: this.rootPlanName === "" ? null : this.rootPlanName,
    //         seriesName: this.SeriesName === "" ? null : this.SeriesName,
    //         clientId: this.ClientName === "" ? null : this.ClientName,
    //         brandId: this.BrandName === "" ? null : this.BrandName,
    //         clothesLevelName:
    //           this.clothingLevelId === "" ? null : this.clothingLevelId,
    //         createAfter: this.DataEndTime,
    //         createBefore: this.DataStartTime,
    //         pageNum: 1,
    //         pageSize: this.pagination.pageSize,
    //         planClass:
    //           this.checked === 1
    //             ? "SERIES"
    //             : this.checked === 2
    //             ? "GROUP"
    //             : "STYLE",
    //         state: "MAKE"
    //       }
    //     })
    //     .then(response => {
    //       this.tableData = reponse.result;
    //       this.pagination.total = response.total;
    //     });
    // },
    //搜索
    searchSeriesPlan(CurrentPageNum) {
      const that = this;
      this.DataStartTime = that.changeDate(this.Date1[0]);
      this.DataEndTime = that.changeDate(this.Date1[1]);

      request
        .get(`/root-plan/find`, {
          params: {
            name: this.rootPlanName === "" ? null : this.rootPlanName,
            seriesName: this.SeriesName === "" ? null : this.SeriesName,
            clientId: this.ClientName === "" ? null : this.ClientName,
            brandId: this.BrandName === "" ? null : this.BrandName,
            clothesLevelName:
              this.clothingLevelId === "" ? null : this.clothingLevelId,
            createAfter: this.DataStartTime,
            createBefore: this.DataEndTime,
            pageNum: CurrentPageNum,
            pageSize: this.pagination.pageSize,
            planClass:
              this.checked === 1
                ? "SERIES"
                : this.checked === 2
                ? "GROUP"
                : "STYLE"
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
        .post(`/root-plan/quote`, {
          seriesId: this.rangeIdForTemplate,
          templateId: this.AnyChanged1[0].id
        })
        .then(response => {
          this.searchSeriesPlan(this.pagination.currentPage),
            (this.QuotePlanModel = false);
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
          this.searchSeriesPlan(1);
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
      console.log(this.viewname);
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