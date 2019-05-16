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
              <el-select v-model="SeriesName" clearable placeholder="请选择">
                <el-option
                  v-for="item in series"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
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
                <el-option v-for="item in type" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="4" class="MinW" style="margin-left:30px">
            <!-- <el-radio v-model="checked" label="1">未制定</el-radio>
            <el-radio v-model="checked" label="2">已制定</el-radio>-->
            <el-switch
              v-model="checked"
              @change="planTypeSwitchChange"
              inactive-color="#13ce66"
              active-text="未制定"
              inactive-text="已制定"
            ></el-switch>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-col :span="3">
              <el-button type="primary" @click="searchSeriesPlan">搜索</el-button>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" @click="handleClick1()">引用计划模板</el-button>
            </el-col>
            <el-col :span="5">
              <el-button type="primary" @click="handleClick2()">存为计划模板</el-button>
            </el-col>
          </el-col>
        </el-row>

        <hr>

        <el-table :data="tableDataA" style="width: 100%; margin-top: 20px">
          <el-table-column w idth="50" type="selection" align="center"></el-table-column>
          <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
        
          <el-table-column prop="number" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothingLevelName" label="服装层次" align="center"></el-table-column>
          <el-table-column prop="name" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="predictState" label="预测计划" align="center"></el-table-column>
          <el-table-column prop="PlanState" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" width="200px">
            <template slot-scope="scope">
              <!-- <el-button size="mini" type="text" @click="ViewDetails=true">查看详情</el-button> -->
              <el-dialog title="系列详情" :visible.sync="ViewDetails" :modal="false">
                <el-tree :data="SeriesDetail" :props="defaultProps"></el-tree>
                <el-button type="primary" @click="ViewDetails=false" style="margin-left:90%">确认</el-button>
              </el-dialog>
              <el-button size="mini" @click="QuotePre(scope.row)" type="text">引用预测</el-button>
              <el-button size="mini" @click="ToPlanForm(scope.row)" type="text">制定计划</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="QuotePre(scope.row)" type="text" size="small">引用预测</el-button>
              <el-button @click="ToPlanForm(scope.row)" type="text" size="small">制定计划</el-button>
            </template>
          </el-table-column>-->
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
                <el-button type="primary">查询</el-button>
              </div>
            </el-col>
          </el-row>
          <br>
          <hr>
          <br>

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
            @selection-change="IsChanged"
          >
            <el-table-column w idth="50" type="selection" align="center"></el-table-column>
            <el-table-column prop="Id" label="序号" align="center"></el-table-column>
            <el-table-column prop="ModelId" label="模板编号" align="center"></el-table-column>
            <el-table-column prop="ModelName" label="模板名称" align="center"></el-table-column>
            <el-table-column prop="ClientName" label="客户名称" align="center"></el-table-column>
            <el-table-column prop="BrandName" label="品牌" align="center"></el-table-column>

            <el-table-column fixed="right" label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="保存计划模版" name="third" v-if="SavePlanModel">
        <el-card>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="bar">
                <div class="title">客户名称</div>
                <el-select v-model="ClientName3" clearable placeholder="请选择">
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
                <el-select v-model="BrandName3" clearable placeholder="请选择">
                  <el-option
                    v-for="item in brand"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="8">
              <div class="bar">
                <div class="title">模板名称</div>
                <el-input
                  v-model="FormName"
                  clearable
                  :rows="1"
                  style="margin-left: 20px"
                  placeholder="请输入"
                ></el-input>
              </div>
            </el-col>

            <el-col :span="3">
              <div class="bar">
                <el-checkbox v-model="IsPublic">是否公用</el-checkbox>
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
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
       pagination: {
        currentPage: 1,
        pageSizes: [5, 10, 20, 30, 50],
        pageSize: 5,
        total: 400
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
      SeriesDetail: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      client: [],
      brand: [],
      type: [],

      series: [],
      tableData1: [
        {
          Id: 0,
          ModelId: "X-000001",
          ModelName: "模板A",
          ClientName: "客户A",
          BrandName: "商标A"
        }
      ],
      tableDataA:[],
      tableData: []
    };
  },
  created: function() {
    var that = this;

    let customer = {
      customerId: ""
    };
    //获得品牌下拉框
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`, {
        params: customer
      })
      .then(response => {
        this.brand = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取品牌名称失败！",
          type: "warning"
        });
      });

    //获得服装层次下拉框
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getClothingLevelName`)
      .then(response => {
        this.type = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取品牌名称失败！",
          type: "warning"
        });
      });

    //获得系列下拉框
    that.$axios
      .get(`${window.$config.HOST}/infoManagement/getRangeName`, {
        params: {
          brandId: ""
        }
      })
      .then(response => {
        this.series = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取系列名称失败！",
          type: "warning"
        });
      });

    //获得客户名称下拉框
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getCustomerName`)
      .then(response => {
        this.client = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取客户名称失败！",
          type: "warning"
        });
      });

    //获得空集搜索列表
    this.$axios
      .post(`${window.$config.HOST}/infoManagement/getRangeList`, {
        customerId: null,
        brandId: null,
        id: null,
        clothingLevelId: null,
        startDate: null,
        endDate: null
      })
      .then(response => {
        console.log(response.data)
        var SearchList = response.data;
        this.tableData = [];
        SearchList.forEach(element => {
          console.log("这次havePlan的值为:" + element.havePlan);
          var d = new Date(element.createTime);
          if (element.addingMode === 1) element.addingModeName = "手动";
          else element.addingModeName = "导入";

          if (element.havePlan === true) element.PlanState = "已制定";
          else if (element.havePlan === false) element.PlanState = "未制定";
          if (element.havePredictPlan === true) element.predictState = "已预测";
          else if (element.havePredictPlan === false)
            element.predictState = "未预测";
          var d = new Date(element.createTime);
          let time = d.toLocaleString();
          element.createTime = time;

          if (this.checked == true && element.havePlan === false) {
            this.tableData.push(element);
          } else if (this.checked == false && element.havePlan === true) {
            this.tableData.push(element);
          }
        });

                  this.pagination.total=response.data.length;
          let i = (this.pagination.currentPage-1) * this.pagination.pageSize;
          let k = (this.pagination.currentPage-1) * this.pagination.pageSize;
          this.tableDataA=[];
        
        for(;i-k<this.pagination.pageSize&&i<this.tableData.length;i++)
        {
          this.tableDataA.push(this.tableData[i]);
        }
      })
      .catch(error => {
        this.$message({
          message: "获取搜索结果失败",
          type: "error"
        });
      });
  },
  methods: {
        handleSizeChange(val) {
    
        this.pagination.pageSize=val;
        console.log("每页+"+this.pagination.pageSize)
        this.searchSeriesPlan();
      },
      handleCurrentChange(val) {
        this.pagination.currentPage=val;
         this.searchSeriesPlan();
      },
    //改变日期格式
    changeDate(date) {
      console.log(date);
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
      this.pagination.currentPage=1;
      const that = this;
      this.DataStartTime = that.changeDate(this.Date1[0]);
      this.DataEndTime = that.changeDate(this.Date1[1]);
      let list = {
        id: this.SeriesName === "" ? "" : this.SeriesName,
        customerId: this.ClientName === "" ? "" : this.ClientName,
        brandId: this.BrandName === "" ? "" : this.BrandName,
        clothingLevelId:
          this.clothingLevelId === "" ? "" : this.clothingLevelId,
        startDate: this.DataStartTime,
        endDate: this.DataEndTime
      };
      console.log(list);
      this.$axios
        .post(`${window.$config.HOST}/infoManagement/getRangeList`, {
          id: this.SeriesName === "" ? null : this.SeriesName,
          customerId: this.ClientName === "" ? null : this.ClientName,
          brandId: this.BrandName === "" ? null : this.BrandName,
          clothingLevelId:
            this.clothingLevelId === "" ? null : this.clothingLevelId,
          startDate: this.DataStartTime,
          endDate: this.DataEndTime
        })
        .then(response => {
          console.log("checked=", this.checked);
          var SearchList = response.data;
          this.tableData = [];
          SearchList.forEach(element => {
            console.log("这次havePlan的值为:" + element.havePlan);
            var d = new Date(element.createTime);
            if (element.addingMode === 1) element.addingModeName = "手动";
            else element.addingModeName = "导入";

            if (element.havePlan === true) element.PlanState = "已制定";
            else if (element.havePlan === false) element.PlanState = "未制定";
            if (element.havePredictPlan === true)
              element.predictState = "已预测";
            else if (element.havePredictPlan === false)
              element.predictState = "未预测";
            var d = new Date(element.createTime);
            let time = d.toLocaleString();
            element.createTime = time;

            if (this.checked == true && element.havePlan === false) {
              this.tableData.push(element);
            } else if (this.checked == false && element.havePlan === true) {
              this.tableData.push(element);
            }
          });
                    this.pagination.total=this.tableData.length;
          let i = (this.pagination.currentPage-1) * this.pagination.pageSize;
          let k = (this.pagination.currentPage-1) * this.pagination.pageSize;
          this.tableDataA=[];
        
        for(;i-k<this.pagination.pageSize&&i<this.tableData.length;i++)
        {
          this.tableDataA.push(this.tableData[i]);
        }
        })
        .catch(error => {
          this.$message({
            message: "获取搜索结果失败",
            type: "error"
          });
        });
    },
    //搜索
    searchSeriesPlan() {
      const that = this;
      this.DataStartTime = that.changeDate(this.Date1[0]);
      this.DataEndTime = that.changeDate(this.Date1[1]);
      let list = {
        id: this.SeriesName === "" ? "" : this.SeriesName,
        customerId: this.ClientName === "" ? "" : this.ClientName,
        brandId: this.BrandName === "" ? "" : this.BrandName,
        clothingLevelId:
          this.clothingLevelId === "" ? "" : this.clothingLevelId,
        startDate: this.DataStartTime,
        endDate: this.DataEndTime
      };
      console.log(list);
      this.$axios
        .post(`${window.$config.HOST}/infoManagement/getRangeList`, {
          id: this.SeriesName === "" ? null : this.SeriesName,
          customerId: this.ClientName === "" ? null : this.ClientName,
          brandId: this.BrandName === "" ? null : this.BrandName,
          clothingLevelId:
            this.clothingLevelId === "" ? null : this.clothingLevelId,
          startDate: this.DataStartTime,
          endDate: this.DataEndTime
        })
        .then(response => {
          console.log("checked=", this.checked);
          var SearchList = response.data;
          this.tableData = [];
          SearchList.forEach(element => {
            console.log("这次havePlan的值为:" + element.havePlan);
            var d = new Date(element.createTime);
            if (element.addingMode === 1) element.addingModeName = "手动";
            else element.addingModeName = "导入";

            if (element.havePlan === true) element.PlanState = "已制定";
            else if (element.havePlan === false) element.PlanState = "未制定";
            if (element.havePredictPlan === true)
              element.predictState = "已预测";
            else if (element.havePredictPlan === false)
              element.predictState = "未预测";
            var d = new Date(element.createTime);
            let time = d.toLocaleString();
            element.createTime = time;

            if (this.checked == true && element.havePlan === false) {
              this.tableData.push(element);
            } else if (this.checked == false && element.havePlan === true) {
              this.tableData.push(element);
            }
          });
                    this.pagination.total=this.tableData.length;
          let i = (this.pagination.currentPage-1) * this.pagination.pageSize;
          let k = (this.pagination.currentPage-1) * this.pagination.pageSize;
          this.tableDataA=[];
        
        for(;i-k<this.pagination.pageSize&&i<this.tableData.length;i++)
        {
          this.tableDataA.push(this.tableData[i]);
        }
        })
        .catch(error => {
          this.$message({
            message: "获取搜索结果失败",
            type: "error"
          });
        });
    },

    IsChanged(val) {
      this.AnyChanged = val;
    },
    // QuotePre(row) {
    //   this.$router.push({
    //     name: "planMakeIndex",
    //     params: {
    //       flag: 1,
    //       goback: "seriesPlanMake",
    //       client: row.customerName,
    //       brand: row.brandName,
    //       series: row.name,
    //       id: row.id,
    //       plantype: 1,
    //       planobj: row.name,
    //       TopPlan: 0,
    //       TopPlanName: "根计划"
    //     }
    //   });
    // },
    ToPlanForm(row) {
      if (row.havePlan === true) {
        this.$message({
          message: "该计划已经被制定",
          type: "warning"
        });
        return;
      }
      console.log("id=" + row.id);
      this.$router.push({
        name: "planMakeIndex",
        params: {
          flag: 1,
          goback: "seriesPlanMake",
          client: row.customerName,
          brand: row.brandName,
          series: row.name,
          id: row.id,
          plantype: 1,
          planobj: row.name,
          TopPlan: 0,
          TopPlanName: "根计划"
        }
      });
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    },
    SaveModel() {
      if (this.AnyChanged.length === 0) {
        this.$message({
          message: "请至少选择一项！",
          type: "warning"
        });
        return;
      }
      this.QuotePlanModel = false;
      this.viewname = "first";
      this.AnyChanged.splice(0, 1);
      return;
    },
    CancelModel() {
      this.QuotePlanModel = false;
      this.viewname = "first";
      this.AnyChanged.splice(0, 1);
      return;
    },

    SaveModel2() {
      if (this.FormName === "") {
        this.$message({
          message: "模板名称为空",
          type: "warning"
        });
        return;
      }
      this.SavePlanModel = false;
      this.viewname = "first";
      return;
    },
    CancelModel2() {
      this.SavePlanModel = false;
      this.viewname = "first";
      return;
    },
    QuotePre(row) {
      const that  =  this;
      //获得品牌下拉框
      console.log(row.id)
      that.$axios
        .post(`${window.$config.HOST}/planManagement/quotePredictPlan`, 
        {
          rangeId: row.id
        })
        .then(response => {
          console.log("repsonse="+response.data)
          let ok = response.data;
          if (ok > 0) {
            this.$message({
              message: "引用预测成功",
              type: "success"
            });
          } else {
            this.$message({
              message: "引用预测失败",
              type: "warning"
            });
          }
        })
        .catch(error => {
            console.log("repsonse=")
          this.$message({
            message: "引用预测失败！",
            type: "error"
          });
        });
    },
    handleClick2() {
      this.SavePlanModel = true;
      this.viewname = "third";
      console.log(this.viewname);
    }
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