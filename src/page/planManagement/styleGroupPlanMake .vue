<template>
  <div class="body">
    <!-- 搜索条件设置 -->
    <el-card class="box-card">
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
            <div class="title">服装层次</div>
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
          <el-radio v-model="checked" label="1">未制定</el-radio>
          <el-radio v-model="checked" label="2">已制定</el-radio>
          <el-radio v-model="checked" label="3">未完成</el-radio>
          <el-radio v-model="checked" label="4">已完成</el-radio>
          <!-- <el-checkbox v-model="checked1">未制定</el-checkbox>
          <el-checkbox v-model="checked2">已制定</el-checkbox>
          <el-checkbox v-model="checked3">未完成</el-checkbox>
          <el-checkbox v-model="checked4">已完成</el-checkbox>-->
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
            <div class="title">款式组名称</div>
            <el-select v-model="SeriesGroupName" clearable placeholder="请选择">
              <el-option
                v-for="item in seriesGroup"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="15">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-input v-model="PlanName" clearable :rows="1" style="margin-left: 20px"></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="TestConfiemClick()">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 搜索结果 -->
    <el-card class="box-card">
      <el-table :data="tableData" style="width: 100%; margin-top: 20px">
        <el-table-column prop="Id" label="序号" align="center"></el-table-column>
        <el-table-column prop="SeriesId" label="系列编号" align="center"></el-table-column>
        <el-table-column prop="StyleGroupName" label="款式组名称" align="center" width="100px"></el-table-column>
        <el-table-column prop="SeriesId" label="系列编号" align="center"></el-table-column>
        <el-table-column prop="ClientName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="BrandName" label="品牌" align="center"></el-table-column>
        <el-table-column prop="ClothesType" label="服装层次" align="center"></el-table-column>
        <el-table-column prop="SeriesName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="Operator" label="添加人" align="center"></el-table-column>
        <el-table-column prop="Department" label="部门" align="center"></el-table-column>
        <el-table-column prop="SeriesPlan" label="系列计划" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <!-- <el-button @click="QuoteSeriesPlan(scope.row)" type="text" size="small">引用系列计划</el-button> -->
            <el-button @click="ToPlanForm(scope.row)" type="text" size="small">制定计划</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked:"0",
      ClientName: "",
      BrandName: "",
      ClothesType: "",
      Date1: "",
      Date2: "",
      SeriesName: "",
      SeriesGroupName: "",
      PlanName: "",
      OrderId: "",

      seriesGroup: [
        {
          label: "款式组A",
          value: 0
        },
        {
          label: "款式组B",
          value: 1
        },
        {
          label: "款式组C",
          value: 2
        }
      ],
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

      tableData: [
        {
          Id: 0,
          SeriesGroupId: "X1-0000",
          SeriesGroupName: "款式组A",

          SeriesId: "001",
          ClientName: "客户A",
          BrandName: "品牌A",
          ClothesType: "服装A",
          SeriesName: "系列A",
          Operator: "添加人A",
          Department: "部门A",
          SeriesPlan: "无计划",
          StyleGroupName: "款式组A",
          State: "无"
        }
      ]
    };
  },
  methods: {
    ClearChanged(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    QuoteSeriesPlan(row) {
      this.$router.push({
        name: "planMakeIndex",
        params: {
          flag: 2,
          goback:"styleGroupPlanMake",
          client: row.ClientName,
          brand: row.BrandName,
          series: row.SeriesName,
          plantype: 2,
          planobj: row.StyleGroupName
        }
      });
    },
    ToPlanForm(row) {
      this.$router.push({
        name: "planMakeIndex",
        params: {
          flag: 2,
          goback:"styleGroupPlanMake",
          client: row.ClientName,
          brand: row.BrandName,
          series: row.SeriesName,
          plantype: 2,
          planobj: row.StyleGroupName
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  min-width: 100px;
}
.Mtitle {
  align-content: center;
  margin-left: 42%;
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

        min-width: 100px;
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