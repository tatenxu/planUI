<template>
  <div class="body">
    <el-card class="box-card">
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
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="8">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="clientId" clearable @change="searchClientChanged" style="width:350px">
              <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="brandId" clearable style="width:350px">
              <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar" style="margin-top:10px">
            <!-- <div class="title">审核状态</div>
            <el-select v-model="stateId" clearable>
              <el-option
                v-for="item in options3"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>-->

            <el-radio-group v-model="checked" @change="changeState">
              <el-radio :label="1">已提交</el-radio>
              <el-radio :label="2">已审核</el-radio>
              <el-radio :label="3">已下发</el-radio>
            </el-radio-group>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 25px; margin-bottom: 5px;">
        <el-col :span="8">
          <div class="bar">
            <div class="title">新建时间</div>
            <el-date-picker v-model="dataRange" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-autocomplete class="inline-input" v-model="rangeId" :fetch-suggestions="querySearchSeries" placeholder="请输入系列名称" @select="handleSelect" style="width:350px" clearable></el-autocomplete>
          </div>
        </el-col>

        <el-col :offset="0" :span="2">
          <div class="bar">
            <el-button type="primary" style="margin-right: 20px" @click="getWareList(1)">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 5px;">
        <el-col :span="2">
          <div class="bar">
            <el-button type="primary" size="small" style="margin-right: 20px" @click="VerifyPass" v-if="checked===1">审核通过</el-button>
          </div>
        </el-col>
        <el-col :offset="1" :span="2">
          <div class="bar">
            <el-button type="primary" size="small" style="margin-right: 20px" @click="VerifyRebut" v-if="checked===1">审核驳回</el-button>
          </div>
        </el-col>
        <el-col :offset="1" :span="2">
          <div class="bar">
            <el-button type="primary" size="small" style="margin-right: 20px" @click="CancelVerify" v-if="checked===2">取消审核</el-button>
          </div>
        </el-col>
        <el-col :offset="1" :span="2">
          <div class="bar">
            <el-button type="primary" size="small" style="margin-right: 20px" @click="lookAllPlan">查看总计划</el-button>
          </div>
        </el-col>
        <el-col :span="3" style="margin-left:100px">
          <GanttExtension :selectedTableData="AnyChanged" :isRootPlan="false"></GanttExtension>
        </el-col>
      </el-row>
      <br />
      <hr />
      <br />
      <div>
        <el-table :data="tableDataA" max-height="400" border @selection-change="isChanged" :stripe="true" :highlight-current-row="true" style="width: 100%; margin-top: 20px">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column width="50" type="index" label="序号"></el-table-column>
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
          <el-table-column prop="date" width="150px" label="时间" align="center"></el-table-column>
          <el-table-column prop="state" label="审核状态" align="center"></el-table-column>
          <el-table-column fixed="right" width="100" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="searchDetails(scope.row)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
        </div>
      </div>
      <!-- <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pagination.currentPage"
          :page-sizes="pagination.pageSizes"
          :page-size="pagination.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        ></el-pagination>
      </div>-->
      <el-dialog title="驳回理由" :visible.sync="GoBack" :modal="false">
        <div class="body">
          <el-row :gutter="20">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="GoBackReason"></el-input>
          </el-row>
          <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 5px;">
            <el-col :span="2">
              <div class="bar">
                <el-button type="primary" style="margin-right: 20px" @click="GoBackConfirm">确认</el-button>
              </div>
            </el-col>
            <el-col :offset="1" :span="2">
              <div class="bar">
                <el-button type="primary" style="margin-right: 20px" @click="GoBackCancel">取消</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-dialog>

      <el-dialog title="查看总计划" :visible.sync="lookAllPlans" :modal="false">
        <div class="body">
          <el-tree :data="allPlans" :highlight-current="true" :props="defaultProps"></el-tree>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";
import GanttExtension from "@/utils/ganttExtension";
const cityOptions = ["已制定", "未制定", "制定中"];
export default {
  name: "planVerify",
  components: {
    GanttExtension
  },
  data() {
    return {
      lookAllPlans: false,
      planClassRadioValue: "系列计划",
      checked: 1,
      nameSuggestionsSeries: [],

      defaultProps: {
        children: "children",
        label: "name"
      },

      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      allPlans: [],
      tableDataA: [],
      GoBack: false,
      GoBackReason: "",
      list: [],
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      select1: "",
      select2: "",
      select3: "",
      clientId: "",
      brandId: "",
      rangeId: "",
      stateId: "",
      dataRange: "",
      dataStartTime: "",
      dataEndTime: "",

      options1: [],
      options2: [],
      options3: [
        {
          id: "已制定",
          name: "已制定"
        },
        {
          id: "已提交",
          name: "已提交"
        },
        {
          id: "已审核",
          name: "已审核"
        },
        {
          id: "已下发",
          name: "已下发"
        },
        {
          id: "已删除",
          name: "已删除"
        }
      ],
      options4: [],
      tableData: [],
      // checked: true,
      pages: 0,
      AnyChanged: []
    };
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
      this.keepAlives = ["planVerify"];
    } else {
      this.keepAlives = [];
    }
    next();
  },
  created: function () {
    var that = this;
    //获取系列名称
    request.get(`/info/series/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestionsSeries.push({
          value: element.name
        });
      });
    });

    //获得品牌下拉框
    request
      .get(`/backstage/brand/name`, {
        clientId: undefined
      })
      .then(response => {
        this.options2 = response.result;
      });
    //获得客户名称下拉框
    request.get(`/backstage/client/name`).then(response => {
      this.options1 = response.result;
    });

    //获得空集搜索列表
    request
      .get(`/plan/find`, {
        params: {
          pageNum: 1,
          pageSize: 10,
          state: "SUBMIT",
          planClass: "SERIES"
        }
      })
      .then(response => {
        this.pagination.total = response.total;
        this.tableDataA = response.result;
      });
  },
  methods: {
    //计划类型发生变化
    planClassRadioValueChanged() {
      if (this.planClassRadioValue === "系列计划") {
        this.checked = 1;
      } else if (this.planClassRadioValue === "款式组计划") {
        this.checked = 2;

      } else {
        this.checked = 3;
      }
      this.getWareList(1);
    },
    //系列名称搜索的输入建议
    querySearchSeries(queryString, cb) {
      var nameSuggestions = this.nameSuggestionsSeries;
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
    //当搜索框的客户名称改变的时候GET弹出框的品牌信息
    searchClientChanged() {
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: this.clientId === "" ? undefined : this.clientId
          }
        })
        .then(response => {
          this.options2 = response.result;
          this.brandId = 1;
          this.brandId = "";
        });
    },
    lookAllPlan() {
      if (this.AnyChanged.length != 1) {
        this.$message({
          message: "请选择一项！",
          type: "warning"
        });
        return;
      }
      request
        .get(`/plan/tree`, {
          params: {
            id: this.AnyChanged[0].id
          }
        })
        .then(response => {
          this.allPlans = [];
          this.allPlans.push(response.result);
          this.lookAllPlans = true;
        });
    },
    changeState() {
      this.getWareList(1);
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log("每页+" + this.pagination.pageSize);
      this.getWareList(1);
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.getWareList(val);
    },
    //查看详情
    searchDetails(row) {
      console.log(row);
      this.$router.push({
        name: "planMakeIndex",
        params: {
          goback: "planVerify",
          isRoot: false,
          isModify: false,
          isCreate: false,
          rowData: row
        }
      });
    },
    //改变日期格式
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
    getWareList(currentPageNum) {
      const that = this;
      if (this.dataRange != null) {
        this.DataStartTime = that.changeDate(this.dataRange[0]);
        this.DataEndTime = that.changeDate(this.dataRange[1]);
      } else {
        this.DataStartTime = null;
        this.DataEndTime = null;
      }

      request
        .get(`/plan/find`, {
          params: {
            state:
              this.checked === 1
                ? "SUBMIT"
                : this.checked === 2
                  ? "CHECK"
                  : "ASSIGN",
            clientId: this.clientId === "" ? undefined : this.clientId,
            brandId: this.brandId === "" ? undefined : this.brandId,
            seriesName: this.rangeId === "" ? undefined : this.rangeId,
            name: undefined,
            clothesLevelName: undefined,
            createAfter: this.DataStartTime,
            createBefore: this.DataEndTime,
            pageNum: currentPageNum,
            pageSize: this.pagination.pageSize,
            planClass: this.planClassRadioValue === "系列计划" ? "SERIES" : (this.planClassRadioValue === "款式组计划" ? "GROUP" : "STYLE")
          }
        })
        .then(response => {
          this.tableDataA = response.result;
          this.pagination.total = response.total;
        });
    },
    isChanged(val) {
      this.AnyChanged = val;
    },
    GoBackCancel() {
      this.GoBack = false;
    },
    GoBackConfirm() {
      this.AnyChanged.forEach(element => {
        let list = {
          id: element.id,
          reason: this.GoBackReason
        };
        request.put(`/plan/fail`, list).then(response => {
          this.getWareList(this.pagination.currentPage);
        });
      });
      this.GoBack = false;
    },
    VerifyPass() {
      if (this.AnyChanged.length === 0) {
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });
        return;
      }
      for (var i = 0; i < this.AnyChanged.length; i++) {
        request
          .put(`/plan/pass`, null, {
            params: {
              id: this.AnyChanged[i].id
            }
          })
          .then(response => {
            this.getWareList(1);
          });
      }
    },
    VerifyRebut() {
      if (this.AnyChanged.length === 0) {
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });
        return;
      } else {
        this.GoBack = true;
        this.GoBackReason = "";
      }
    },
    CancelVerify() {
      if (this.AnyChanged.length === 0) {
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });
        return;
      }

      //this.$set(this.iptDatas[index], `showAlert`, true)
      for (var i = 0; i < this.AnyChanged.length; i++) {
        request
          .put(`/plan/cancel`, null, {
            params: {
              id: this.AnyChanged[i].id
            }
          })
          .then(response => {
            this.getWareList(1);
          });
      }
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    check(val) {
      val.forEach(element => {
        this.index.push(element);
      });
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
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
    .title {
      font-size: 14px;
      min-width: 75px;
      text-align: center;
    }
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
  .block {
    padding: 30px 0;
    text-align: center;
    //border-right: solid 1px #EFF2F6;
    //display: inline-block;
    //box-sizing: border-box;
  }
}
</style>