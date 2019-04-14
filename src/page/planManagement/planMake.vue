<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <span class="Mtitle">计划制定</span>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划编号</div>
            <el-input v-model="planID" clearable :rows="1" placeholder="planID" :disabled="true"></el-input>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-input v-model="planName" clearable :rows="1" placeholder="请输入"></el-input>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">起止时间</div>
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
          </div>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划开始</div>
            <el-date-picker
              v-model="PlanStartTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期"
              clearable
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划结束</div>
            <el-date-picker
              v-model="PlanEndTime"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              placeholder="选择日期"
              clearable
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>-->
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">客户</div>
            <el-select v-if="showit1" v-model="ClientName" clearable placeholder="请选择">
              <el-option
                v-for="item in clientOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-else
              v-model="ClientName"
              clearable
              :rows="1"
              placeholder="请选择"
              :disabled="true"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-if="showit2" v-model="ClientName" clearable placeholder="请选择">
              <el-option
                v-for="item in brandOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-else
              v-model="ClientName"
              clearable
              :rows="1"
              placeholder="请选择"
              :disabled="true"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">系列</div>
            <el-select v-if="showit3" v-model="SeriesName" clearable placeholder="请选择">
              <el-option
                v-for="item in seriesOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-else v-model="SeriesName" :rows="1" placeholder="请选择" :disabled="true"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划类型</div>
            <el-select v-if="showit4" v-model="PlanType" clearable placeholder="请选择">
              <el-option
                v-for="item in PlantypeOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-else v-model="PlanType" :rows="1" placeholder="请选择" :disabled="true"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划对象</div>
            <el-select v-if="showit4" v-model="objName" clearable placeholder="请选择">
              <el-option
                v-for="item in objOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input v-else v-model="objName" :rows="1" placeholder="请选择" :disabled="true"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar" style="margin-left: 4px">
            <div class="title">上级计划</div>
            <el-input v-model="TopPlan" clearable :rows="1" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="bar">
            <el-button type="primary" @click="TestConfiemClick()" style="margin-left: 20px">选择</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">项目类型</div>
            <el-select v-model="ProjectType" clearable placeholder="请选择">
              <el-option
                v-for="item in ProjectTypeOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划款项</div>
            <el-input v-model="PlanPrice" clearable :rows="1" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="bar" style="margin-left: 0px">
            <div class="title">产品日期</div>
            <el-select v-model="ProductDateType" clearable placeholder="请选择">
              <el-option
                v-for="item in datemodelOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="3">
          <el-date-picker v-model="ProductData" type="date" placeholder="选择日期"></el-date-picker>
          <!-- <el-date-picker
            v-model="ProductData"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期"
            clearable
          ></el-date-picker>-->
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划部门</div>
            <el-input v-model="PlanDepartment" clearable :rows="1" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划人员</div>
            <el-input v-model="PlanPerson" clearable :rows="1" placeholder="请输入"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划产品</div>
            <el-select v-model="PlanProduct" clearable placeholder="请选择">
              <el-option
                v-for="item in PlanProductOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="bar">
            <div class="title">计划建议</div>

            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="PlanPropose"
              style="margin-left: 26px"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="bar">
            <div class="title">计划描述</div>

            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="PlanDiscribe"
              style="margin-left: 26px"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="bar">
            <div class="title">计划备注</div>

            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="PlanRemark"
              style="margin-left: 26px"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="Mbutton">
            <el-col :span="8">
              <el-button type="primary" @click="SavePlanForm">保存</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="handleClick()">取消</el-button>
            </el-col>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Date1: "",
      dsa: "",
      flag: 0,
      goback: "",
      showit1: true,
      showit2: true,
      showit3: true,
      showit4: true,
      showit5: true,
      ProductDateType: "",
      ProductData: "",
      ClientName: "",
      BrandNaem: "",
      SeriesName: "",
      objName: "",
      PlanRemark: "",
      PlanType: "",
      PlanDiscribe: "",
      PlanPropose: "",
      ProjectType: "",
      PlanProduct: "",
      PlanPerson: "",
      PlanDepartment: "",
      Plandate: "",
      datemodel: "",
      PlanPrice: "",
      TopPlan: "",
      PlanStartTime: "",
      PlanEndTime: "",
      planName: "",
      planID: "JH000001",

      ProjectTypeOpt: [
        {
          label: "头样",
          value: 0
        },
        {
          label: "销货",
          value: 1
        },
        {
          label: "大货",
          value: 2
        }
      ],
      PlanProductOpt: [
        {
          label: "产品A",
          value: 0
        },
        {
          label: "产品B",
          value: 1
        },
        {
          label: "产品C",
          value: 2
        }
      ],
      datemodelOpt: [
        {
          label: "出运日期",
          value: 0
        },
        {
          label: "上柜日期",
          value: 1
        },
        {
          label: "交货日期",
          value: 2
        }
      ],
      objOpt: [
        {
          label: "对象A",
          value: 0
        },
        {
          label: "对象B",
          value: 1
        },
        {
          label: "对象C",
          value: 2
        }
      ],
      PlantypeOpt: [
        {
          label: "系列计划",
          value: 0
        },
        {
          label: "款式计划",
          value: 1
        },
        {
          label: "款式组计划",
          value: 2
        }
      ],

      clientOpt: [
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

      brandOpt: [
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
      typeOpt: [
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

      seriesOpt: [
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
      ]
    };
  },
  mounted() {
    this.init();
  },
  //五个参数控制
  //所有的计划制定的跳转
  methods: {
    SavePlanForm() {
      if (
        this.PlanName === "" ||
        this.Date1 === "" ||
        this.TopPlan === "" ||
        this.ProjectType === "" ||
        this.PlanPrice === "" ||
        this.PlanDepartment === "" ||
        this.PlanPerson === "" ||
        this.PlanProduct === "" ||
        this.PlanPropose === "" ||
        this.PlanDiscribe === "" ||
        this.ProductData === ""
      ) {
        this.$message({
          message: "请填写必要信息，保存失败！",
          type: "warning"
        });
      } else {
        this.$message({
          message: "保存成功！",
          type: "success"
        });

        this.$router.push({
          name: this.goback,
          params: {}
        });
      }
    },
    init() {
      // console.log(this.$route.params);
      let data = this.$route.params;
      this.ClientName = data.client;
      this.BrandNaem = data.brand;
      this.SeriesName = data.series;
      this.objName = data.planobj;
      this.flag = data.flag;
      this.goback = data.goback;
      switch (data.plantype) {
        case 1:
          this.PlanType = "系列计划";
          break;
        case 2:
          this.PlanType = "款式组计划";
          break;
        case 3:
          this.PlanType = "款式计划";
          break;
      }
      switch (data.flag) {
        case 1: {
          this.showit1 = false;
          this.showit2 = false;
          this.showit3 = false;
          this.showit4 = false;
          this.showit5 = false;
          break;
        }
        case 2: {
          this.showit1 = false;
          this.showit2 = false;
          this.showit3 = false;
          this.showit4 = false;
          this.showit5 = false;
          break;
        }
        case 3: {
          this.showit1 = false;
          this.showit2 = false;
          this.showit3 = false;
          this.showit4 = false;
          this.showit5 = false;
          break;
        }
        default:
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  min-width: 100px;
}
.Mbutton {
  margin-left: 45%;
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