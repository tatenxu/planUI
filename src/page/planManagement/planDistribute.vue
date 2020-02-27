<template>
  <el-card class="box-card">
    <div>
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="15">
          <div class="bar">
            <div class="title">计划类型</div>
            <el-radio-group v-model="planClassRadioValue" @change="planClassRadioValueChanged()">
              <el-radio-button label="系列计划"></el-radio-button>
              <el-radio-button label="款式计划"></el-radio-button>
              <el-radio-button label="款式组计划"></el-radio-button>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:30px">
        <el-col :span="5">
          <el-switch class="el-switch" v-model="planTypeSwitch" @change="planTypeSwitchChange" inactive-color="#13ce66" active-text="已审核计划" inactive-text="已下发计划"></el-switch>
        </el-col>
        <el-col :span="3">
          <GanttExtension :selectedTableData="[multipleSelection]" :isRootPlan="false"></GanttExtension>
        </el-col>
        <el-col :span="3">
          <div class="bar">
            <el-button type="primary" size="small" style="margin-right:20px" @click="chooseUserClick">选择下发对象</el-button>
          </div>
        </el-col>
        <el-col :offset="1" :span="2" v-if="!planTypeSwitch">
          <div class="bar">
            <el-button type="primary" size="small" style="margin-right: 20px" @click="assignDetail">查看下发情况</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%; margin-top: 20px" highlight-current-row :stripe="true">
        <af-table-column label width="65">
          <template slot-scope="scope">
            <el-radio :label="scope.row.id" v-model="templateRadio" @change.native="getTemplateRow(scope.row)">{{scope.$index+1}}</el-radio>
          </template>
        </af-table-column>
        <af-table-column v-if="false" prop="id" align="center"></af-table-column>
        <af-table-column prop="name" label="根计划名称" align="center"></af-table-column>
        <af-table-column prop="clientName" label="客户" align="center"></af-table-column>
        <af-table-column prop="brandName" label="品牌" align="center"></af-table-column>
        <af-table-column prop="clothesLevelName" label="服装层次" align="center"></af-table-column>
        <af-table-column prop="rangeCode" label="波段编码" align="center"></af-table-column>
        <af-table-column prop="styleNumber" label="款号" align="center" v-if="checked===3"></af-table-column>
        <af-table-column prop="styleGroupName" label="款式组名称" align="center" v-if="checked===2"></af-table-column>
        <af-table-column prop="seriesCode" label="系列编码" align="center" v-if="checked===1"></af-table-column>
        <af-table-column prop="systemCode" label="系统编码" align="center" v-if="checked===1"></af-table-column>
        <af-table-column prop="projectType" label="项目类型" align="center"></af-table-column>
        <af-table-column prop="orderStage" label="订单阶段" align="center"></af-table-column>
        <af-table-column prop="predictStyleQuantity" label="预测款数" align="center" v-if="checked===1"></af-table-column>
        <af-table-column prop="predictPieceQuantity" label="预测件数" align="center" v-if="checked===1"></af-table-column>
        <af-table-column prop="informalStyleQuantity" label="非正式款数" align="center" v-if="checked===1"></af-table-column>
        <af-table-column prop="informalPieceQuantity" label="非正式件数" align="center" v-if="checked===1"></af-table-column>
        <af-table-column prop="styleQuantity" label="正式款数" align="center"></af-table-column>
        <af-table-column prop="pieceQuantity" label="正式件数" align="center"></af-table-column>
        <af-table-column prop="inputPoint" label="投入点" align="center"></af-table-column>
        <af-table-column prop="startDate" label="开始时间" align="center"></af-table-column>
        <af-table-column prop="endDate" label="结束时间" align="center"></af-table-column>
        <af-table-column fixed="right" width="100" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="searchDetails(scope.row)">查看详情</el-button>
          </template>
        </af-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
    </div>

    <!-- <el-dialog :modal="false" title="选择下发对象" :visible.sync="distributePanelFlag" :before-close="distributePanelCancel">
      <el-row :gutter="20" style="margin-top:-30px;">
        <el-col :span="12">
          <div class="bar">
            <div class="title">人员名称</div>
            <el-input v-model="distribute.personName" clearable placeholder="请输入"></el-input>
            <el-button type="primary" @click="searchPersonByName" style="margin-left:20px">搜索</el-button>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="assignRoot" style="margin-left:100px">下发</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="6">
          <div class="title" style="font-size:20px;margin-left:100px;font-weight:700">产线</div>
        </el-col>
        <el-col :span="10">
          <div class="title" style="font-size:20px;margin-left:230px;font-weight:700">人员</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top:15px;">
        <el-col :span="6">
          <el-tree :data="distribute.productLine" :highlight-current="true" :props="distribute.defaultProps" @node-click="handleNodeClick"></el-tree>
        </el-col>
        <el-col :span="13">
          <el-table :data="distribute.personTable" max-height="400" @selection-change="personTableSelect" :stripe="true" :highlight-current-row="true" style="width: 100%; margin-top: 20px;margin-left:30%">
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="200" label="人员" align="center"></el-table-column>
            <el-table-column width="150" prop="assignPlanType" label="计划类型" align="center">
              <template slot-scope="scope">
                <el-select size="medium" v-model="scope.row.assignPlanType">
                  <el-option v-for="item in distribute.options.assignPlanTypeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-dialog> -->
    <el-dialog :modal="false" title="选择下发对象" width="1200px" :visible.sync="distributePanelFlag" :before-close="distributePanelCancel">
      <el-row :gutter="20" style="margin-top:0px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">人员名称</div>
            <el-input v-model="distribute.personName" clearable placeholder="请输入" style="width:250px"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">部门</div>
            <el-cascader expand-trigger="hover" :options="distribute.options.deptOptiopns" clearable v-model="distribute.deptName" :props="deptToCascaderProps" :change-on-select="true" style="width:400px"></el-cascader>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">产线</div>
            <el-cascader expand-trigger="hover" :options="distribute.options.productLineOptions" clearable v-model="distribute.productLine" :props="deptToCascaderProps" :change-on-select="true" style="width:400px"></el-cascader>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="searchPersonByPDP" style="margin-left:100px">搜索</el-button>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top:15px;">
        <el-col :span="13">
          <el-table :data="distribute.personTable" max-height="400" @selection-change="personTableSelect" :stripe="true" :highlight-current-row="true" style="width: 100%; margin-top: 20px;margin-left:30%">
            <el-table-column type="selection" width="50px" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
            <el-table-column prop="name" width="200" label="人员" align="center"></el-table-column>
            <el-table-column width="150" prop="assignPlanType" label="计划类型" align="center">
              <template slot-scope="scope">
                <el-select size="medium" v-model="scope.row.assignPlanType">
                  <el-option v-for="item in distribute.options.assignPlanTypeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
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
    <el-dialog title="查看总计划" :visible.sync="planTreePanelFlag" :modal="false">
      <div class="body">
        <el-tree :data="planTree.planTreeData" :highlight-current="true" :props="planTree.defaultProps"></el-tree>
      </div>
    </el-dialog>

    <el-dialog :modal="false" title="下发详情" :visible.sync="distributeDetailFlag" :before-close="distributeDetailCancel">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-table :data="distributeDetail.tableData" style="width: 100%; margin-top: 20px;margin-left:100px">
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
  </el-card>
</template>

<script>
import request from "@/utils/request";
import GanttExtension from "@/utils/ganttExtension";
export default {
  name: "planDistribute",
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
      planClassRadioValue: "系列计划",
      checked: 1,
      //页码部分
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      //页面主体部分
      planTypeSwitch: true,
      tableData: [],
      multipleSelection: [],
      templateRadio: "",

      //计划下发部分
      distributePanelFlag: false,
      distribute: {
        personName: "",
        deptName: "",
        productLine: "",
        //productLine: [],
        personTable: [],
        userSelection: [],
        personTableTemplate: [],
        options: {
          assignPlanTypeOptions: {},
          productLineOptions: {},
          deptNameOptions: {}
        },
        defaultProps: {
          children: "children",
          label: "name"
        }
      },

      //查看总计划部分
      planTreePanelFlag: false,
      planTree: {
        planTreeData: [],
        defaultProps: {
          children: "children",
          label: "name"
        }
      },

      //下发详情部分
      distributeDetailFlag: false,
      distributeDetail: {
        tableData: []
      }
    };
  },
  created: function () {
    // 获取部门信息
    this.$axios
      .get(`${window.$config.HOST2}/dept/find`)
      .then(response => {
        this.distribute.options.deptOptiopns = response.data.result;
      })
      .catch(error => {
        this.$message.error("部门信息加载失败!");
      });
    //获取产线
    request.get(`${window.$config.HOST2}/product-line/find`).then(response => {
      this.distribute.options.productLineOptions = response.result;
    });
    //获取计划类型
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "计划类型"
        }
      })
      .then(response => {
        this.distribute.options.assignPlanTypeOptions = response.result;
      });
    //获取初始搜索
    request
      .get(`/plan/find`, {
        params: {
          pageNum: 1,
          pageSize: 10,
          state: "CHECK",
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
              name: this.distribute.personName === "" ? undefined : this.distribute.personName,
              deptId: (this.distribute.deptName === "" || this.distribute.deptName === null) ? undefined : this.distribute.deptName[this.distribute.deptName.length - 1],
              productLineId: (this.distribute.productLine === "" || this.distribute.productLine === null) ? undefined : this.distribute.productLine[this.distribute.productLine.length - 1]
            }
          })
        .then(response => {
          this.distribute.personTable = response.data.result;
        })
        .catch(error => {
          this.$message.error("人员信息加载失败!");
        });
    },
    planClassRadioValueChanged() {
      if (this.planClassRadioValue === "系列计划") {
        this.checked = 1;
      } else if (this.planClassRadioValue === "款式组计划") {
        this.checked = 2;

      } else {
        this.checked = 3;
      }
      this.handleSearch(1);
    },
    //下发面板关闭
    distributePanelCancel() {
      this.distribute.personTable = [];
      this.distribute.userSelection = [];
      this.distribute.personTableTemplate = [];
      this.distribute.personName = "";
      this.distributePanelFlag = false;
    },
    distributeDetailCancel() {
      this.distributeDetail.tableData = [];
      this.distributeDetailFlag = false;
    },
    //根据输入框搜索人员
    searchPersonByName() {
      this.distribute.personTable = [];
      this.distribute.personTableTemplate.forEach(element => {
        if (element.name.indexOf(this.distribute.personName) >= 0)
          this.distribute.personTable.push(element);
      });
    },
    //根据单选获得下发详情
    searchDetailTable() {
      request
        .get(`/plan-assign/find`, {
          params: {
            planId: this.multipleSelection.id
          }
        })
        .then(response => {
          this.distributeDetail.tableData = response.result;
          this.distributeDetail.tableData.forEach(element => {
            if (element.assignPlanMade)
              element.assignPlanMadeStr = "是"
            else element.assignPlanMadeStr = "否"
          })
        });
    },
    //撤回下发
    deleteAssign(row) {
      const that = this;
      this.$confirm("是否撤回该条计划下发？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        request
          .delete(`/plan-assign/delete`, {
            params: {
              id: row.id
            }
          })
          .then(response => {
            this.searchDetailTable();
            this.handleSearch(this.pagination.currentPage);
          });
      });
    },
    //打开下发详情面板
    assignDetail() {
      if (this.multipleSelection.id === undefined) {
        this.$message({
          message: "请选择一项计划进行查看！",
          type: "warning"
        });
        return;
      }
      this.distributeDetailFlag = true;
      this.searchDetailTable();
    },
    //进行下发
    assignRoot() {
      let list = [];
      let ok = 0;
      this.distribute.userSelection.forEach(element => {
        if (!element.assignPlanType) {
          this.$message({
            message: "任意一条勾选的人员都必须选择计划类型!",
            type: "error"
          });
          ok++;
          return;
        } else {
          list.push({
            assignPlanType: element.assignPlanType,
            executorId: element.id,
            executorName: element.name,
            planId: this.multipleSelection.id,
            rootPlanId: this.multipleSelection.rootPlanId
          });
        }
      });
      if (ok === 0) {
        if (list.length === 0) {
          this.$message({
            message: "请至少选择一名人员进行下发!",
            type: "error"
          });
          return;
        } else {
          request.post(`/plan-assign/insert`, list).then(response => {
            this.handleSearch(this.pagination.currentPage);
            this.distribute.personTable = [];
            this.distribute.userSelection = [];
            this.distribute.personTableTemplate = [];
            this.distribute.personName = "";
            this.distributePanelFlag = false;
          });
        }
      }
    },
    //点击产线结点
    handleNodeClick(data) {
      request
        .get(`${window.$config.HOST2}/user-product-line/find`, {
          params: {
            productLineId: data.id
          }
        })
        .then(response => {
          this.distribute.personTable = response.result;
          this.distribute.personTableTemplate = response.result;
        });
    },
    //选中人员
    personTableSelect(val) {
      this.distribute.userSelection = val;
    },
    //table选中单条
    getTemplateRow(row) {
      this.multipleSelection = row;
    },
    //查看详情
    searchDetails(row) {
      console.log(row);
      this.$router.push({
        name: this.checked === 1 ? "planMakeOfSeries" : (this.checked === 2 ? "planMakeOfStyleGroup" : "planMakeOfStyle"),
        params: {
          goback: "planDistribute",
          isRoot: false,
          isModify: false,
          isCreate: false,
          rowData: row
        }
      });
    },
    //查看总计划
    lookAllPlan() {
      if (this.multipleSelection.id === undefined) {
        this.$message({
          message: "请选择一项计划进行查看！",
          type: "warning"
        });
        return;
      }
      request
        .get(`/plan/tree`, {
          params: {
            id: this.multipleSelection.id
          }
        })
        .then(response => {
          this.planTree.planTreeData = [];
          this.planTree.planTreeData.push(response.result);
          this.planTreePanelFlag = true;
        });
    },
    //下发panel打开
    chooseUserClick() {
      const that = this;
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择一个计划!",
          type: "warning"
        });
      } else {
        this.distribute.personName = "";
        this.distribute.deptName = "";
        this.distribute.productLine = "";
        this.distribute.userSelection = [];
        this.distributePanelFlag = true;
      }
    },
    //下发-审核转换
    planTypeSwitchChange() {
      this.multipleSelection = {};
      this.templateRadio = "";
      this.handleSearch(1);
    },
    //搜索
    handleSearch(currentPageNum) {
      request
        .get(`/plan/find`, {
          params: {
            pageNum: currentPageNum,
            pageSize: this.pagination.pageSize,
            state: this.planTypeSwitch ? "CHECK" : "ASSIGN",
            planClass: this.planClassRadioValue === "系列计划" ? "SERIES" : (this.planClassRadioValue === "款式组计划" ? "GROUP" : "STYLE")
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
          this.pagination.currentPage = currentPageNum;
        });
    },
    // 每页条数改变时触发函数
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log(`每页 ${val} 条`);
      this.handleSearch(1);
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.currentPage = val;
      this.handleSearch(val);
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
      this.keepAlives = ["planDistribute"];
    } else {
      this.keepAlives = [];
    }
    next();
  }
};
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 1100px;
  .bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    font-size: 14px;
    min-width: 75px;
    text-align: center;
    line-height: 40px;
    // .title {

    //   // background: black;
    // }
    .el-input {
      width: 300px;
      min-width: 75px;
      // margin: 5px 10px;
    }
    .el-select {
      width: 300px;
      min-width: 75px;
      // margin: 5px 10px;
    }
  }
  .el-switch {
    height: 40px;
  }
  .block {
    padding: 30px 0;
    text-align: center;
    //border-right: solid 1px #EFF2F6;
    //display: inline-block;
    //box-sizing: border-box;
  }
}
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