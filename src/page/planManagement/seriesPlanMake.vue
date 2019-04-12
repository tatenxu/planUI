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
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">服装类型</div>
              <el-select v-model="ClothesType" clearable placeholder="请选择">
                <el-option
                  v-for="item in type"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
                :picker-options="pickerOptions2"
              ></el-date-picker>
              <!-- <el-date-picker
                v-model="Date1"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期"
                clearable
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">至</div>
              <el-date-picker
                v-model="Date2"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择日期"
                clearable
              ></el-date-picker>-->
            </div>
          </el-col>
          <el-col :span="8" class="MinW" style="margin-left:30px">
            <el-radio v-model="checked" label="1" >未制定</el-radio>
            <el-radio v-model="checked" label="2" >已制定</el-radio>
            <el-radio v-model="checked" label="3">未完成</el-radio>
            <el-radio v-model="checked" label="4">已完成</el-radio>
            <!-- <el-checkbox v-model="checked1">未制定</el-checkbox>
            <el-checkbox v-model="checked2">已制定</el-checkbox>
            <el-checkbox v-model="checked3">未完成</el-checkbox>
            <el-checkbox v-model="checked4">已完成</el-checkbox> -->
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <div class="title">系列名称</div>
              <el-select v-model="SeriesName" clearable placeholder="请选择">
                <el-option
                  v-for="item in series"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <div class="title">计划名称</div>
              <el-input v-model="PlanName" clearable :rows="1" style="margin-left: 20px"></el-input>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-col :span="3">
              <el-button type="primary" @click="TestConfiemClick()">搜索</el-button>
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

        <el-table :data="tableData" style="width: 100%; margin-top: 20px">
          <el-table-column w idth="50" type="selection" align="center"></el-table-column>
          <el-table-column prop="Id" label="序号" align="center"></el-table-column>
          <el-table-column prop="SeriesId" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="ClientName" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="BrandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="ClothesType" label="服装类型" align="center"></el-table-column>
          <el-table-column prop="SeriesName" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="Operator" label="添加人" align="center"></el-table-column>
          <el-table-column prop="Department" label="部门" align="center"></el-table-column>
          <el-table-column prop="PrePlan" label="预测计划" align="center"></el-table-column>
          <el-table-column prop="State" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" align="center" width="250px">
            <template slot-scope="scope">
              <el-button size="mini" type="text">查看详情</el-button>
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
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
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
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
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
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
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
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
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
      checked:0,
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
      client: [
        {
          label: "客户A",
          value: 0
        },
        {
          label: "客户B",
          value: 1
        },
        {
          label: "客户C",
          value: 2
        },
        {
          label: "客户D",
          value: 3
        }
      ],

      brand: [
        {
          label: "X品牌",
          value: 0
        },
        {
          label: "Y品牌",
          value: 1
        },
        {
          label: "M品牌",
          value: 2
        },
        {
          label: "N品牌",
          value: 3
        }
      ],
      type: [
        {
          label: "时装",
          value: 0
        },
        {
          label: "精品",
          value: 1
        },
        {
          label: "品牌",
          value: 2
        }
      ],

      series: [
        {
          label: "系列A",
          value: 0
        },
        {
          label: "系列B",
          value: 1
        },
        {
          label: "系列C",
          value: 2
        }
      ],
      tableData1: [
        {
          Id: 0,
          ModelId: "X-000001",
          ModelName: "模板A",
          ClientName: "客户A",
          BrandName: "商标A"
        }
      ],
      tableData: [
        {
          Id: 0,
          SeriesGroupId: "X1-0000",
          SeriesGroupName: "款式组A",
          OrderId: "00000001",
          SeriesId: "001",
          ClientName: "客户A",
          BrandName: "品牌A",
          ClothesType: "服装A",
          SeriesName: "系列A",
          Operator: "添加人A",
          Department: "部门A",
          PrePlan: "计划A",
          State: "无"
        }
      ]
    };
  },
  methods: {
    IsChanged(val) {
      this.AnyChanged = val;
    },
    QuotePre(row) {
      this.$router.push({
        name: "planMakeIndex",
        params: {
          flag: 1,
          goback:"seriesPlanMake",
          client: row.ClientName,
          brand: row.BrandName,
          series: row.SeriesName,
          plantype: 1,
          planobj: row.SeriesName
        }
      });
    },
    ToPlanForm(row) {
      this.$router.push({
        name: "planMakeIndex",
        params: {
          flag: 1,
          goback:"seriesPlanMake",
          client: row.ClientName,
          brand: row.BrandName,
          series: row.SeriesName,
          plantype: 1,
          planobj: row.SeriesName
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
    handleClick1() {
      this.QuotePlanModel = true;
      this.viewname = "second";
      console.log(this.viewname);
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