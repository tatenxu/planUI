<template>
  <el-card class="box-card">
    <div>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-switch
            class="el-switch"
            v-model="isVerifiedPlan"
            @change="planTypeSwitchChange"
            inactive-color="#13ce66"
            active-text="已审核计划"
            inactive-text="已下发计划"
          ></el-switch>
        </el-col>
        <el-col :span="3" v-if="isVerifiedPlan">
          <div class="bar">
            <el-button type="primary" style="margin-right:20px" @click="chooseUserClick">选择下发对象</el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="bar" id="userChosenList"></div>
        </el-col>

        <el-col :offset="1" :span="2">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="lookAllPlan">查看总计划</el-button>
          </div>
        </el-col>
        <el-col :offset="1" :span="2" v-if="!isVerifiedPlan">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="assignDetail">查看下发情况</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%; margin-top: 20px"
        highlight-current-row
        :stripe="true"
      >
        <!-- <el-table-column type="selection" width="50" align="center"></el-table-column> -->
        <el-table-column label width="65">
          <template slot-scope="scope">
            <el-radio
              :label="scope.row.id"
              v-model="templateRadio"
              @change.native="getTemplateRow(scope.$index,scope.row)"
            >&nbsp</el-radio>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column v-if="false" prop="id" align="center"></el-table-column>
        <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="serialNo" label="计划编号" align="center" width="150px"></el-table-column>
        <el-table-column prop="clientName" label="客户" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>

        <el-table-column prop="seriesName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="objectName" label="计划对象" align="center"></el-table-column>
        <el-table-column prop="planClass" label="项目类型" align="center"></el-table-column>
        <el-table-column prop="creatorName" label="创建人" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" width="150px"></el-table-column>
        <el-table-column fixed="right" width="100" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="searchDetails(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    <el-dialog
      :modal="false"
      title="选择下发对象"
      :visible.sync="userChoseTableDialogShow"
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

    <el-dialog title="查看总计划" :visible.sync="lookAllPlans" :modal="false">
      <div class="body">
        <el-tree :data="allPlans" :props="defaultProps"></el-tree>
      </div>
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
  </el-card>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      dialogFormVisible2: false,
      assignPlanTypeOptions: [],
      deleteAssignId: "",
      assignDetailTable: [],

      assignId: "",
      productionLine: [],
      personTable: [],

      templateRadio: "",
      lookAllPlans: false,
      allPlans: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      userChoseTableDialogShow: false,
      isVerifiedPlan: true,
      searchOptions: {
        searchParams: {
          userName: ""
        },
        options: {
          userNameOptions: []
        }
      },

      totalTableData: [],
      tableData: [],
      userTableMultpleSelection: [],
      chosenPlanRow: [],

      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },

      planManagementErrorCode: [
        {
          errorCode: -1,
          errotInfo: "所需属性值缺失"
        },
        {
          errorCode: -2,
          errotInfo: "计划名称重复"
        },
        {
          errorCode: -3,
          errotInfo: "父计划未下发"
        },
        {
          errorCode: -4,
          errotInfo: "系列根计划不存在"
        },
        {
          errorCode: -5,
          errotInfo: "款式组根计划不存在"
        },
        {
          errorCode: -6,
          errotInfo: "根计划已存在"
        },
        {
          errorCode: -7,
          errotInfo: "计划开始结束时间超额"
        },
        {
          errorCode: -8,
          errotInfo: "计划款数超额"
        },
        {
          errorCode: -9,
          errotInfo: "引用预测计划时预测计划不存在"
        },
        {
          errorCode: -10,
          errotInfo: "当前计划状态不允许执行此操作"
        },
        {
          errorCode: -11,
          errotInfo: "与已有计划冲突"
        }
      ]
    };
  },
  created: function() {
    let that = this;
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
    //获取所有未下发计划
    request
      .get(`/plan/find`, {
        params: {
          pageNum: 1,
          pageSize: 10,
          state: "CHECK"
        }
      })
      .then(response => {
        this.tableData = response.result;
        this.pagination.total = response.total;
      });
  },
  methods: {
    handleSearch1() {
      request
        .get(`/plan-assign/find`, {
          params: {
            planId: this.deleteAssignId
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
          .delete(`/plan-assign/delete`, {
            params: {
              id: row.id
            }
          })
          .then(response => {
            this.handleSearch1();
            this.handleSearch(this.pagination.currentPage);
          });
      });
    },
    assignDetail() {
      if (this.chosenPlanRow.id === undefined) {
        this.$message({
          message: "请选择一项计划进行查看！",
          type: "warning"
        });
        return;
      }

      this.dialogFormVisible2 = true;
      this.deleteAssignId = this.chosenPlanRow.id;
      this.handleSearch1();
    },
    assignRoot() {
      let list = [];
      let ok = 0;
      this.userSelection.forEach(element => {
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
            executorId: element.userId,
            executorName: element.name,
            planId: this.assignId
          });
        }
      });
      if (ok === 0) {
        request.post(`/plan-assign/insert`, list).then(response => {
          this.handleSearch(this.pagination.currentPage);
          this.assignId = "";
          this.userSelection = [];
          this.userSelectionList = [];
          this.personTable = [];
          this.userChoseTableDialogShow = false;
        });
      }
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
    changeCheckBoxFun2(val) {
      const that = this;
      that.userSelection = val;
    },

    cancel() {
      this.assignId = "";
      this.userSelection = [];
      this.userSelectionList = [];
      this.personTable = [];
      this.assignDetailTable = [];
      this.deleteAssignId = "";

      this.userChoseTableDialogShow = false;
      this.dialogFormVisible2 = false;
    },
    getTemplateRow(index, row) {
      this.chosenPlanRow = row;
      console.log(this.chosenPlanRow);
    },
    //查看详情
    searchDetails(row) {
      console.log(row);
      this.$router.push({
        name: "planMakeIndex",
        params: {
          flag: 3,
          goback: "planVerify",
          planId: row.id,
          planName: row.name,
          customerName: row.customerName,
          brandName: row.brandName,
          rangeName: row.rangeName,
          rangeId: row.rangeId,
          planType: row.type,
          planObjectName: row.planObject,
          planObjectId: row.planObjectId,
          topPlanName: row.isRoot === true ? row.name : row.parentName,
          topPlanId: row.parentId,
          projectType: row.projectType,
          quantity: row.quantity,
          dateStart: row.startDate,
          dateEnd: row.endDate,
          productDateType: row.productDateType,
          productDate: row.productDate,
          planProductId: row.productId,
          planPropose: row.proposal,
          planDescribe: row.description,
          note: row.note,
          files: row.files
        }
      });
    },
    lookAllPlan() {
      if (this.chosenPlanRow.id === undefined) {
        this.$message({
          message: "请选择一项计划进行查看！",
          type: "warning"
        });
        return;
      }
      request
        .get(`/plan/tree`, {
          params: {
            id: this.chosenPlanRow.id
          }
        })
        .then(response => {
          this.allPlans = [];
          this.allPlans.push(response.result);
          this.lookAllPlans = true;
        });
    },
    chooseUserClick() {
      // console.log(this.chosenPlanRow.brandId);
      const that = this;
      if (this.chosenPlanRow.length === 0) {
        this.$message({
          message: "请选择一个计划!",
          type: "warning"
        });
      } else {
        //获取用户信息
        this.assignId = this.chosenPlanRow.id;
        this.userChoseTableDialogShow = true;
      }
    },
    //switch 处理函数
    planTypeSwitchChange() {
      this.handleSearch(1);
    },
    handleSearch(currentPageNum) {
      request
        .get(`/plan/find`, {
          params: {
            pageNum: currentPageNum,
            pageSize: this.pagination.pageSize,
            state: this.isVerifiedPlan ? "CHECK" : "DISTRIBUTE"
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;
        });
    },
    // 每页条数改变时触发函数
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log(`每页 ${val} 条`);

      this.pagination.currentPage = 1;
      this.handleSearch(1);
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.currentPage = val;
      this.handleSearch(val);
    },
    tableSelectionChange(val) {
      this.userTableMultpleSelection = val;
      if (this.userTableMultpleSelection.length !== 0) {
        var showStr = "已选择:";
        this.userTableMultpleSelection.forEach(element => {
          showStr = showStr + element.userName + ",";
        });
        document.getElementById("userChosenList").innerHTML = showStr;
      } else {
        document.getElementById("userChosenList").innerHTML = "";
      }
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
</style>