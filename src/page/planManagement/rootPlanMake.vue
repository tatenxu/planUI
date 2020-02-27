<template>
  <div class="body">
    <el-card class="box-card">

      <el-tabs v-model="viewname" @tab-click="handleTabClick" class="cardTab">
        <el-tab-pane label="根计划" name="first" class="tabPane">
          <el-row :gutter="20" style="margin-top:5px;">
            <el-col :span="15">
              <div class="bar">
                <div class="title">计划类型</div>
                <el-radio-group v-model="planClassRadioValue" @change="planClassRadioValueChange" style="margin-left:20px">
                  <el-radio-button label="系列计划"></el-radio-button>
                  <el-radio-button label="款式计划"></el-radio-button>
                  <el-radio-button label="款式组计划"></el-radio-button>
                </el-radio-group>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="bar">
                <div class="title">客户名称</div>
                <el-select v-model="clientId" clearable placeholder="请选择" @change="searchClientChanged">
                  <el-option v-for="item in searchOptions.clientOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">品牌</div>
                <el-select v-model="brandId" clearable placeholder="请选择">
                  <el-option v-for="item in searchOptions.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">系列名称</div>
                <el-autocomplete class="inline-input" v-model="seriesName" :fetch-suggestions="querySearchSeries" placeholder="请输入系列名称" @select="handleSelect" style="width:350px" clearable></el-autocomplete>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="bar">
                <div class="title">添加时间</div>
                <el-date-picker style="margin-left:20px " v-model="dateRange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">服装层次</div>

                <el-select v-model="clothesLevelName" clearable placeholder="请选择">
                  <el-option v-for="item in searchOptions.clothesLevelOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">根计划名称</div>
                <el-autocomplete class="inline-input" v-model="name" :fetch-suggestions="querySearchRootPlan" placeholder="请输入根计划名称" @select="handleSelect" style="width:350px" clearable></el-autocomplete>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">

            <el-col :span="2">
              <el-button type="primary" size="small" @click="searchRootPlan(1)">搜索</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="small" @click="negotiatePanelOpen()">协商延迟</el-button>
            </el-col>
            <el-col :span="3">
              <el-button type="primary" size="small" @click="deleteRootPlan()">删除根计划</el-button>
            </el-col>
            <el-col :span="3">
              <GanttExtension :selectedTableData="multipleSelection" :isRootPlan="true"></GanttExtension>
            </el-col>
          </el-row>

          <hr />

          <el-table :data="tableData" style="width: 100%; margin-top: 20px" border @selection-change="changeCheckBoxFun" :row-style="tableRowClassName">
            <el-table-column w idth="50" type="selection" align="center"></el-table-column>
            <el-table-column prop="name" width="250px" label="根计划名称" align="center"></el-table-column>
            <el-table-column prop="clientName" width="250px" label="客户" align="center"></el-table-column>
            <el-table-column prop="brandName" width="250px" label="品牌" align="center"></el-table-column>
            <el-table-column prop="clothesLevelName" width="250px" label="服装层次" align="center"></el-table-column>
            <el-table-column prop="rangeCode" width="250px" label="波段编码" align="center"></el-table-column>
            <el-table-column prop="styleNumber" width="250px" label="款号" align="center" v-if="checked===3"></el-table-column>
            <el-table-column prop="styleGroupName" width="250px" label="款式组名称" align="center" v-if="checked===2"></el-table-column>
            <el-table-column prop="seriesCode" width="250px" label="系列编码" align="center" v-if="checked===1"></el-table-column>
            <el-table-column prop="systemCode" width="250px" label="系统编码" align="center" v-if="checked===1"></el-table-column>
            <el-table-column prop="projectType" width="250px" label="项目类型" align="center"></el-table-column>
            <el-table-column prop="orderStage" width="250px" label="订单阶段" align="center"></el-table-column>
            <el-table-column prop="predictStyleQuantity" width="250px" label="预测款数" align="center" v-if="checked===1"></el-table-column>
            <el-table-column prop="predictPieceQuantity" width="250px" label="预测件数" align="center" v-if="checked===1"></el-table-column>
            <el-table-column prop="informalStyleQuantity" width="250px" label="非正式款数" align="center" v-if="checked===1"></el-table-column>
            <el-table-column prop="informalPieceQuantity" width="250px" label="非正式件数" align="center" v-if="checked===1"></el-table-column>
            <el-table-column prop="styleQuantity" width="250px" label="正式款数" align="center"></el-table-column>
            <el-table-column prop="pieceQuantity" width="250px" label="正式件数" align="center"></el-table-column>
            <el-table-column prop="inputPoint" width="250px" label="投入点" align="center"></el-table-column>
            <el-table-column prop="startDate" width="150px" label="开始时间" align="center"></el-table-column>
            <el-table-column prop="endDate" width="150px" label="结束时间" align="center"></el-table-column>
            <el-table-column prop="dateType" label="日期类型" align="center"></el-table-column>
            <el-table-column prop="date" width="150px" label="日期" align="center"></el-table-column>
            <el-table-column label="是否约束" align="center" fixed="right" width="80px" v-if="checked ===1">
              <template slot-scope="scope" v-if=" checked ===1">
                <el-switch v-if=" checked ===1" v-model="scope.row.limited" @change="rootPlanLimit(scope.row)" active-color="#13ce66"></el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center" width="250px">
              <template slot-scope="scope">
                <el-button size="mini" @click="assignRootPlan(scope.row)" type="text" v-if="scope.row.creatorId === meID">下发</el-button>
                <el-button size="mini" @click="assignDetail(scope.row)" v-if="scope.row.state ==='已下发'" type="text">查看下发情况</el-button>
                <el-button size="mini" @click="toPageDetail(scope.row)" type="text">查看详情</el-button>
                <el-button size="mini" @click="toUpdateRootPlan(scope.row)" v-if="scope.row.state !='已下发' && scope.row.creatorId === meID" type="text">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
          </div>
        </el-tab-pane>

        <el-tab-pane label="保存计划模版" name="second" v-if="savePlanModelFlag">
          <el-form :model="saveModel" :rules="modelRules" ref="saveModel" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="bar">
                  <el-form-item label="客户名称" prop="clientId" placeholder="请选择客户名称">
                    <el-select v-model="saveModel.clientId" disabled placeholder="请选择" style="min-width:250px">
                      <el-option v-for="item in saveModel.options.clientOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="bar">
                  <el-form-item label="品牌名称" prop="brandId" placeholder="请选择品牌名称">
                    <el-select v-model="saveModel.brandId" disabled placeholder="请选择" style="min-width:250px">
                      <el-option v-for="item in saveModel.options.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <div class="bar">
                  <el-form-item label="模板名称" prop="name" placeholder="请输入模板名称">
                    <el-input v-model="saveModel.name" clearable :rows="1" style="margin-left: 20px;min-width:250px" placeholder="请输入"></el-input>
                  </el-form-item>
                </div>
              </el-col>

              <el-col :span="2">
                <div class="bar">
                  <el-button type="primary" @click="saveModelClick('saveModel')">保存</el-button>
                </div>
              </el-col>

              <el-col :span="2">
                <div class="bar">
                  <el-button type="primary" @click="cancelModelClick()">取消</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog :modal="false" title="协商延迟" width="900px" :visible.sync="negotiatePanelFlag">
      <el-form :model="negotiateForm" :rules="negotiateFormRule" ref="negotiateForm" label-width="120px" class="demo-ruleForm">
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="协商延迟时间" prop="extension" placeholder="请选择客户名称">
              <el-date-picker v-model="negotiateForm.extension" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" size="small" @click="negotiate()" style="margin-left:100px;margin-top:3px">协商延迟</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- <el-dialog :modal="false" title="根计划下发" :visible.sync="rootPlanDistributeFlag" :before-close="cancelDistribute">
      <el-row :gutter="20" style="margin-top:-30px;">
        <el-col :span="12">
          <div class="bar">
            <div class="title">人员名称</div>
            <el-input v-model="rootDistribute.personName" clearable placeholder="请输入" style="width:350px"></el-input>
            <el-button type="primary" @click="searchPersonByName" style="margin-left:20px">搜索</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="assignRoot" style="margin-left:100px">下发</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:10px;">
        <el-col :span="6">
          <div class="title" style="font-size:20px;margin-left:100px;font-weight:700">产线</div>
        </el-col>
        <el-col :span="10">
          <div class="title" style="font-size:20px;margin-left:230px;font-weight:700">人员</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:15px;">
        <el-col :span="6">
          <el-tree :data="productionLine" :highlight-current="true" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-col>
        <el-col :span="13">
          <el-table :data="rootDistribute.tableData" max-height="400" @selection-change="changeCheckBoxFun2" :stripe="true" :highlight-current-row="true" style="width: 100%; margin-top: 20px;margin-left:30%">
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="200" label="人员" align="center"></el-table-column>
            <el-table-column width="150" prop="assignPlanType" label="计划类型" align="center">
              <template slot-scope="scope">
                <el-select size="medium" v-model="scope.row.assignPlanType">
                  <el-option v-for="item in rootDistribute.options.assignPlanTypeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog> -->

    <el-dialog :modal="false" title="根计划下发" width="1200px" :visible.sync="rootPlanDistributeFlag" :before-close="cancelDistribute">
      <el-row :gutter="20" style="margin-top:0px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">人员名称</div>
            <el-input v-model="rootDistribute.personName" clearable placeholder="请输入" style="width:250px"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">部门</div>
            <el-cascader expand-trigger="hover" :options="rootDistribute.options.deptOptiopns" clearable v-model="rootDistribute.deptName" :props="deptToCascaderProps" :change-on-select="true" style="width:400px"></el-cascader>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">产线</div>
            <el-cascader expand-trigger="hover" :options="rootDistribute.options.productLineOptions" clearable v-model="rootDistribute.productLine" :props="deptToCascaderProps" :change-on-select="true" style="width:400px"></el-cascader>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="searchPersonByPDP" style="margin-left:100px">搜索</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top:15px;">
        <el-col :span="13">
          <el-table :data="rootDistribute.tableData" max-height="400" @selection-change="changeCheckBoxFun2" :stripe="true" :highlight-current-row="true" style="width: 100%; margin-top: 20px;margin-left:30%">
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="200" label="人员" align="center"></el-table-column>
            <el-table-column width="150" prop="assignPlanType" label="计划类型" align="center">
              <template slot-scope="scope">
                <el-select size="medium" v-model="scope.row.assignPlanType">
                  <el-option v-for="item in rootDistribute.options.assignPlanTypeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="assignRoot" style="margin-left:348px;margin-top:30px">下发</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog :modal="false" title="下发详情" :visible.sync="detailDistributeFlag" :before-close="cancelDistributeDetail">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-table :data="detailDistribute.tableData" style="width: 100%; margin-top: 20px;margin-left:100px">
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="executorName" width="150" label="人员" align="center"></el-table-column>
            <el-table-column prop="createTime" width="150" label="创建时间" align="center"></el-table-column>
            <el-table-column prop="assignPlanType" width="150" label="计划类型" align="center"></el-table-column>
            <el-table-column prop="assignPlanMadeStr" width="100" label="子计划制定" align="center"></el-table-column>
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
import GanttExtension from "@/utils/ganttExtension";
export default {
  name: "rootPlanMake",
  components: {
    GanttExtension
  },
  data() {
    return {
      deptToCascaderProps: {
        value: "id",
        label: "name",
        children: "children"
      },
      //协商延迟
      negotiatePanelFlag: false,
      negotiateForm: {
        extension: "",
      },
      negotiateFormRule: {
        extension: [
          { required: true, message: "请选择协商延迟的时间！", trigger: "change" }
        ],
      },
      //自己的ID
      meID: "",
      //根计划下发部分参数
      productionLine: [],
      rootDistribute: {
        id: "",
        productLine: "",
        deptName: "",
        personName: "",
        tableData: [],
        tableDataA: [],
        multipleSelection: [],
        options: {
          assignPlanTypeOptions: {},
          productLineOptions: [],
          deptOptiopns: [],

        }
      },
      //下发详情部分参数

      detailDistribute: {
        id: "",
        tableData: []
      },

      //存为模板部分参数
      saveModel: {
        rootPlanName: "",
        id: "",
        clientId: "",
        brandIo: "",
        name: "",
        options: {
          clientOptions: {},
          brandOptions: {}
        }
      },
      modelRules: {
        clientId: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        brandId: [
          { required: true, message: "请选择品牌名称", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入模板名称", trigger: "blur" }]
      },
      //窗口控制部分
      viewname: "first",
      savePlanModelFlag: false,
      detailDistributeFlag: false,
      rootPlanDistributeFlag: false,

      //搜索部分参数
      checked: 1,
      planClassRadioValue: "系列计划",
      clientId: "",
      brandId: "",
      name: "",
      clothesLevelName: "",
      dateRange: "",
      seriesName: "",
      searchOptions: {
        clientOptions: {},
        brandOptions: {},
        clothesLevelOptions: {}
      },

      //表格参数
      nameSuggestionsRootPlan: [],
      nameSuggestionsSeries: [],
      tableData: [],
      multipleSelection: [],

      defaultProps: {
        children: "children",
        label: "name"
      },
      //页码部分
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      //日期控制部分
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
      }
    };
  },
  created: function () {
    // 获取部门信息
    this.$axios
      .get(`${window.$config.HOST2}/dept/find`)
      .then(response => {
        this.rootDistribute.options.deptOptiopns = response.data.result;
      })
      .catch(error => {
        this.$message.error("部门信息加载失败!");
      });
    //获取产线
    request.get(`${window.$config.HOST2}/product-line/find`).then(response => {
      this.rootDistribute.options.productLineOptions = response.result;
    });
    //确认自己的信息
    request.get(`/me`).then(response => {
      this.meID = response.result.id;
    });
    //获取系列名称
    request.get(`/info/series/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestionsSeries.push({
          value: element.name
        });
      });
    });

    //获取根计划名称
    request.get(`/root-plan/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestionsRootPlan.push({
          value: element.name
        });
      });
    });
    //获取计划类型
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "计划类型"
        }
      })
      .then(response => {
        this.rootDistribute.options.assignPlanTypeOptions = response.result;
      });

    //获得品牌下拉框
    request.get(`/backstage/brand/name`).then(response => {
      this.searchOptions.brandOptions = response.result;
      this.saveModel.options.brandOptions = response.result;
    });
    //获得服装层次下拉框
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "服装层次"
        }
      })
      .then(response => {
        this.searchOptions.clothesLevelOptions = response.result;
      });
    //获得客户名称下拉框
    request.get(`/backstage/client/name`).then(response => {
      this.searchOptions.clientOptions = response.result;
      this.saveModel.options.clientOptions = response.result;
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
        this.pagination.currentPage = 1;
      });
  },
  methods: {
    searchPersonByPDP() {

      this.$axios
        .get(`${window.$config.HOST2}/user/find-dup`,
          {
            params: {
              name: this.rootDistribute.personName === "" ? undefined : this.rootDistribute.personName,
              deptId: (this.rootDistribute.deptName === "" || this.rootDistribute.deptName === null) ? undefined : this.rootDistribute.deptName[this.rootDistribute.deptName.length - 1],
              productLineId: (this.rootDistribute.productLine === "" || this.rootDistribute.productLine === null) ? undefined : this.rootDistribute.productLine[this.rootDistribute.productLine.length - 1]
            }
          })
        .then(response => {
          this.rootDistribute.tableData = response.data.result;
        })
        .catch(error => {
          this.$message.error("人员信息加载失败!");
        });
    },
    //协商延迟面板打开
    negotiatePanelOpen() {
      if (this.multipleSelection.length != 1) {
        this.$message({
          message: "请选择单条计划进行协商延迟！",
          type: "error"
        });
        return;
      }
      this.negotiatePanelFlag = true;
      this.negotiateForm.extension = "";
    },
    //协商延迟按钮点击
    negotiate() {
      this.$refs["negotiateForm"].validate(valid => {
        if (valid) {
          this.multipleSelection.forEach(element => {
            request
              .put("/root-plan/negotiate", null, {
                params: {
                  id: element.id,
                  extension: this.changeDate(this.negotiateForm.extension)
                }
              })
              .then(response => {
                this.negotiatePanelFlag = false;
                this.searchRootPlan(this.pagination.currentPage);
              });
          });

        } else {
          this.$message({
            message: "请填写所有必填项!",
            type: "error"
          });
        }
      });
    },
    //计划类型修改
    planClassRadioValueChange() {
      if (this.planClassRadioValue === "系列计划") {
        this.checked = 1;
      } else if (this.planClassRadioValue === "款式组计划") {
        this.checked = 2;

      } else {
        this.checked = 3;
      }
      this.searchRootPlan(1);
    },
    // 行颜色
    tableRowClassName({ row, rowIndex }) {
      if (row.fromTemplate) {
        return "background: oldlace;";
      }
    },
    searchPersonByName() {
      this.rootDistribute.tableData = [];
      this.rootDistribute.tableDataA.forEach(element => {
        if (element.name.indexOf(this.rootDistribute.personName) >= 0)
          this.rootDistribute.tableData.push(element);
      });
    },
    rootPlanLimit(row) {
      console.log(row);
      request
        .put(`/root-plan/limit`, null, {
          params: {
            id: row.id,
            limited: row.limited
          }
        })
        .then(response => {
          this.searchRootPlan(this.pagination.currentPage);
        });
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
    querySearchSeries(queryString, cb) {
      var nameSuggestions = this.nameSuggestionsSeries;
      var results = queryString
        ? nameSuggestions.filter(this.createFilter(queryString))
        : nameSuggestions;
      cb(results);
    },
    querySearchRootPlan(queryString, cb) {
      var nameSuggestions = this.nameSuggestionsRootPlan;
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

    //列表选中
    changeCheckBoxFun(val) {
      this.multipleSelection = val;
    },
    //点击更新根计划
    toUpdateRootPlan(row) {
      this.$router.push({
        name: this.checked === 1 ? "planMakeOfSeries" : (this.checked === 2 ? "planMakeOfStyleGroup" : "planMakeOfStyle"),
        params: {
          goback: "rootPlanMake",
          isRoot: true,
          isModify: true,
          isCreate: false,
          rowData: row
        }
      });
    },
    //点击查看下发详情
    assignDetail(row) {
      this.detailDistributeFlag = true;
      this.detailDistribute.id = row.id;

      this.searchDetailDistruibute();
    },
    searchDetailDistruibute() {
      request
        .get(`/root-plan-assign/find`, {
          params: {
            rootPlanId: this.detailDistribute.id
          }
        })
        .then(response => {
          this.detailDistribute.tableData = response.result;
          this.detailDistribute.tableData.forEach(element => {
            if (element.assignPlanMade)
              element.assignPlanMadeStr = "是"
            else element.assignPlanMadeStr = "否"
          })
        });
    },
    //撤回下发详情中的下发
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
            this.searchDetailDistruibute();
            this.searchRootPlan(this.pagination.currentPage);
          });
      });
    },
    //计划的查看详情
    toPageDetail(row) {
      this.$router.push({
        name: this.checked === 1 ? "planMakeOfSeries" : (this.checked === 2 ? "planMakeOfStyleGroup" : "planMakeOfStyle"),
        params: {
          isRoot: true,
          isModify: false,
          isCreate: false,
          rowData: row,
          goback: "rootPlanMake"
        }
      });
    },
    //根计划的下发按钮
    assignRootPlan(row) {
      this.rootDistribute.id = row.id;
      this.rootDistribute.personName = "";
      this.rootDistribute.deptName = "";
      this.rootDistribute.productLine = "";
      this.rootDistribute.multipleSelection = [];
      this.rootPlanDistributeFlag = true;
    },
    assignRoot() {
      if (this.rootDistribute.multipleSelection.length === 0) {
        this.$message({
          message: "请至少选择一个人员进行下发!",
          type: "error"
        });
        return;
      }
      let list = [];
      let ok = 0;
      this.rootDistribute.multipleSelection.forEach(element => {
        if (!element.assignPlanType) {
          this.$message({
            message: "任意一条勾选的人员都必须选择计划类型!",
            type: "error"
          });
          ok = 1;
          return;
        }
        list.push({
          assignPlanType: element.assignPlanType,
          executorId: element.id,
          executorName: element.name,
          rootPlanId: this.rootDistribute.id,
        });
      });
      if (ok === 0) {
        request.post(`/root-plan-assign/insert`, list).then(response => {
          this.searchRootPlan(this.pagination.currentPage);
          this.rootDistribute.id = "";
          this.rootDistribute.multipleSelection = [];
          this.rootDistribute.tableData = [];
          this.rootDistribute.tableDataA = [];
          this.rootDistribute.personName = "";
          this.rootPlanDistributeFlag = false;
        });
      }
    },
    cancelDistribute() {
      this.rootDistribute.id = "";
      this.rootDistribute.multipleSelection = [];
      this.rootDistribute.tableData = [];
      this.rootDistribute.tableDataA = [];
      this.rootDistribute.personName = "";
      this.rootPlanDistributeFlag = false;
    },
    cancelDistributeDetail() {
      this.detailDistribute.id = "";
      this.detailDistribute.tableData = [];
      this.detailDistributeFlag = false;
    },
    //人员的勾选
    changeCheckBoxFun2(val) {
      this.rootDistribute.multipleSelection = val;
    },
    handleNodeClick(data) {
      request
        .get(`${window.$config.HOST2}/user-product-line/find`, {
          params: {
            productLineId: data.id
          }
        })
        .then(response => {
          this.rootDistribute.tableData = response.result;
          this.rootDistribute.tableDataA = response.result;
        });
    },

    //系列、款式组、款式的选择改变
    changeState() {
      this.searchRootPlan(1);
    },

    deleteRootPlan() {
      if (this.multipleSelection.length < 1) {
        this.$message({
          message: "请选择计划进行删除！",
          type: "error"
        });
        return;
      } else {
        let flag = 0;
        this.multipleSelection.forEach(element => {
          if (element.creatorId != this.meID) {
            flag++;
          }
        });
        if (flag === 0) {
          this.$confirm("是否删除选中根计划？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.multipleSelection.forEach(element => {
              request
                .delete("/root-plan/delete", {
                  params: {
                    id: element.id
                  }
                })
                .then(response => {
                  this.searchRootPlan(1);
                });
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
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.searchRootPlan(1);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.searchRootPlan(val);
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

    //搜索
    searchRootPlan(currentPageNum) {
      const that = this;
      let startDate, endDate;

      if (this.dateRange == "") {
        startDate = undefined;
        endDate = undefined;
      } else {
        startDate = this.changeDate(this.dateRange[0]);
        endDate = this.changeDate(this.dateRange[1]);
      }

      request
        .get(`/root-plan/find`, {
          params: {
            name: this.name === "" ? null : this.name,
            seriesName: this.seriesName === "" ? null : this.seriesName,
            clientId: this.clientId === "" ? null : this.clientId,
            brandId: this.brandId === "" ? null : this.brandId,
            clothesLevelName:
              this.clothesLevelName === "" ? null : this.clothesLevelName,
            createAfter: startDate,
            createBefore: endDate,
            pageNum: currentPageNum,
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
          this.tableData = [];
          this.tableData = response.result;
          this.pagination.total = response.total;
          this.pagination.currentPage = currentPageNum;
        });
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    },

    saveModelClick(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .post(`/plan-template/save`, {
              rootPlanId: this.saveModel.id,
              name: this.saveModel.name,
              clientId: this.saveModel.clientId,
              brandId: this.saveModel.brandId,
              rootPlanName: this.saveModel.rootPlanName
            })
            .then(response => {
              this.searchRootPlan(1);
              this.saveModel.id = "";
              this.saveModel.name = "";
              this.saveModel.clientId = "";
              this.saveModel.brandId = "";
              this.saveModel.rootPlanName = "";
              this.savePlanModelFlag = false;
              this.viewname = "first";
            });
        } else {
          this.$message({
            message: "请填写所有必填项!",
            type: "error"
          });
        }
      });
    },
    cancelModelClick() {
      this.saveModel.id = "";
      this.saveModel.name = "";
      this.saveModel.clientId = "";
      this.saveModel.brandId = "";
      this.saveModel.rootPlanName = "";
      this.savePlanModelFlag = false;
      this.viewname = "first";
    },

    saveModelPanelOpen() {
      if (this.multipleSelection.length != 1) {
        this.$message({
          message: "请选择一条计划保存为模板！",
          type: "error"
        });
        return;
      } else {
        this.saveModel.clientId = this.multipleSelection[0].clientId;
        this.saveModel.brandId = this.multipleSelection[0].brandId;
        this.saveModel.id = this.multipleSelection[0].id;
        this.saveModel.rootPlanName = this.multipleSelection[0].name;
        this.savePlanModelFlag = true;
        this.viewname = "second";
      }
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
    if (to.name === "planMakeOfSeries" ||
      to.name === "planMakeOfStyle" ||
      to.name === "planMakeOfStyleGroup" ||
      to.name === "bePlanModelEdit") {
      this.keepAlives = ["rootPlanMake"];
    } else {
      this.keepAlives = [];
    }
    next();
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
  min-width: 1200px;
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
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 1100px;
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
</style>