<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <span class="Mtitle" v-if="flag===1">系列计划制定</span>
        <span class="Mtitle" v-else-if="flag===2">款式组计划制定</span>
        <span class="Mtitle" v-else-if="flag===3">款式计划制定</span>
        <span class="Mtitle" v-else>计划制定</span>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-input v-model="ClientName" clearable :rows="1" placeholder="请选择" :disabled="true"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">品牌</div>
            <el-input v-model="BrandName" clearable :rows="1" placeholder="请选择" :disabled="true"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">系列</div>

            <el-input v-model="SeriesName" :rows="1" placeholder="请选择" :disabled="true"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划类型</div>

            <el-input v-model="PlanType" :rows="1" placeholder="请选择" :disabled="true"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划对象</div>
            <el-input v-model="objName" clearable :rows="1" placeholder="请输入" :disabled="true"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar" style="margin-left: 4px">
            <div class="title">上级计划</div>
            <el-input v-model="TopPlanName" clearable :rows="1" placeholder="请输入" :disabled="true"></el-input>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-input v-if="showit1" v-model="planName" clearable :rows="1" placeholder="请输入"></el-input>
            <el-input
              v-else
              v-model="planName"
              clearable
              :rows="1"
              placeholder="请选择"
              :disabled="true"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">项目类型</div>
            <el-select v-if="showit1" v-model="ProjectType" clearable placeholder="请选择">
              <el-option
                v-for="item in ProjectTypeOpt"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
            <el-input
              v-else
              v-model="ProjectType"
              clearable
              :rows="1"
              placeholder="请选择"
              :disabled="true"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划款数</div>
            <el-input v-if="showit1" v-model="PlanPrice" clearable :rows="1" placeholder="请输入"></el-input>
            <el-input
              v-else
              v-model="PlanPrice"
              clearable
              :rows="1"
              placeholder="请选择"
              :disabled="true"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">起止时间</div>
            <el-date-picker
              v-if="showit1"
              style="margin-left:20px "
              v-model="Date1"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
            <el-input v-else v-model="Date1" clearable :rows="1" placeholder="请选择" :disabled="true"></el-input>
          </div>
        </el-col>

        <el-col :span="5">
          <div class="bar" style="margin-left: 0px">
            <div class="title">产品日期</div>

            <el-select v-if="showit1" v-model="ProductDateType" clearable placeholder="请选择">
              <el-option
                v-for="item in datemodelOpt"
                :key="item.label"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
            <el-input
              v-else
              v-model="ProductDateType"
              clearable
              :rows="1"
              placeholder="请选择"
              :disabled="true"
            ></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <el-date-picker v-if="showit1" v-model="ProductData" type="date" placeholder="选择日期"></el-date-picker>
          <el-input
            v-else
            v-model="ProductData"
            clearable
            :rows="1"
            placeholder="请选择"
            :disabled="true"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">计划产品</div>
            <el-select v-if="showit1" v-model="PlanProduct" clearable placeholder="请选择">
              <el-option
                v-for="item in PlanProductOpt"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-input
              v-else
              v-model="PlanProductName"
              clearable
              :rows="1"
              placeholder="请选择"
              :disabled="true"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="bar">
            <div class="title">计划建议</div>

            <el-input
            v-if="showit1"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="PlanPropose"
              style="margin-left: 26px"
            ></el-input>
             <el-input
              v-else
              v-model="PlanPropose"
              clearable
              :rows="1"
              placeholder="请选择"
              :disabled="true"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="bar">
            <div class="title">计划描述</div>

            <el-input
            v-if="showit1"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="PlanDiscribe"
              style="margin-left: 26px"
            ></el-input>
            <el-input
              v-else
              v-model="PlanDiscribe"
              clearable
              :rows="1"
              placeholder="请选择"
              :disabled="true"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="bar">
            <div class="title">计划备注</div>

            <el-input
            v-if="showit1"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="PlanRemark"
              style="margin-left: 26px"
            ></el-input>
                        <el-input
              v-else
              v-model="PlanRemark"
              clearable
              :rows="1"
              placeholder=""
              :disabled="true"
            ></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
          style="margin-left:11%"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="Mbutton">
            <el-col :span="8" v-if="showit1">
              <el-button type="primary" @click="SavePlanForm">保存</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="CancelPlanForm()">取消</el-button>
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
      PlanProductName: "",
      TopPlanName: "",
      planObjId: "",
      fileList: [],
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
      BrandName: "",
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
      id: "",
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
      PlanProductOpt: [],
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

      clientOpt: [],

      brandOpt: [],
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

      seriesOpt: [],
      DataStartTime: "",
      DataEndTime: ""
    };
  },

  created() {
    var that = this;

    //获得品牌下拉框
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getProduct`, {
        params: {
          name: undefined
        }
      })
      .then(response => {
        this.PlanProductOpt = response.data;
      })
      .catch(error => {
        console.log("获取品牌失败");
      });
  },
  mounted() {
    this.init();
  },
  //五个参数控制
  //所有的计划制定的跳转
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
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
    SavePlanForm() {
      const that = this;
      this.DataStartTime = that.changeDate(this.Date1[0]);
      this.DataEndTime = that.changeDate(this.Date1[1]);
      let time = that.changeDate(this.ProductData);

      if (
        this.PlanName === "" ||
        this.Date1 === "" ||
        this.TopPlan === "" ||
        this.ProjectType === "" ||
        this.PlanPrice === "" ||
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
        let range;
        this.seriesOpt.forEach(element => {
          if (element.name === this.SeriesName) {
            range = element.id;
          }
        });
        let list = {
          name: this.planName,
          rangeId: range,
          type: this.PlanType,
          isRoot: this.TopPlan === 0 ? true : false,
          parentId: this.TopPlan,
          planObjectId: this.id,
          projectType: this.ProjectType,
          quantity: parseInt(this.PlanPrice),
          productId: this.PlanProduct,
          productDate: time,
          productDateType: this.ProductDateType,
          startDate: this.DataStartTime,
          endDate: this.DataEndTime,
          proposal: this.PlanPropose,
          description: this.PlanDiscribe,
          note: this.PlanRemark
        };

        console.log(list);
        that.$axios

          .post(`${window.$config.HOST}/planManagement/addPlan`, {
            name: this.planName,
            rangeId: range,
            type: this.PlanType,
            isRoot: this.TopPlan === 0 ? true : false,
            parentId: this.TopPlan,
            planObjectId: this.id,
            projectType: this.ProjectType,
            quantity: parseInt(this.PlanPrice),
            productId: this.PlanProduct,
            productDate: time,
            productDateType: this.ProductDateType,
            startDate: this.DataStartTime,
            endDate: this.DataEndTime,
            proposal: this.PlanPropose,
            description: this.PlanDiscribe,
            note: this.PlanRemark
          })
          .then(response => {
            console.log(response.data);
            let ok = response.data;
            if (ok > 0) {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.$router.push({
                name: this.goback,
                params: {}
              });
            } else {
              this.$message({
                message: "添加失败",
                type: "error"
              });
            }
          })
          .catch(error => {
            this.$message({
              message: "添加失败！",
              type: "warning"
            });
          });
      }
    },
    CancelPlanForm() {
      this.$message({
        message: "取消制定！",
        type: "info"
      });

      this.$router.push({
        name: this.goback,
        params: {}
      });
    },
    init() {
      console.log("开始获取");
      const that = this;
      //获得品牌下拉框
      that.$axios
        .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`, {
          customerId: undefined
        })
        .then(response => {
          this.brandOpt = response.data;
        })
        .catch(error => {
          console.log("获取品牌失败");
        });

      //获得系列下拉框
      that.$axios
        .get(`${window.$config.HOST}/infoManagement/getRangeName`, {
          brandId: undefined
        })
        .then(response => {
          this.seriesOpt = response.data;
        })
        .catch(error => {
          console.log("获取系列信息失败");
        });

      //获得客户名称下拉框
      that.$axios
        .get(`${window.$config.HOST}/baseInfoManagement/getCustomerName`)
        .then(response => {
          this.clientOpt = response.data;
        })
        .catch(error => {
          console.log("获取客户信息失败");
        });

      // console.log(this.$route.params);
      let data = this.$route.params;
      console.log(data);
      this.ClientName = data.client;
      this.BrandName = data.brand;
      this.SeriesName = data.series;
      this.objName = data.planobj;
      this.flag = data.flag;
      this.goback = data.goback;
      this.planObjId = data.planObjId;
      this.TopPlan = data.TopPlan;
      this.TopPlanName = data.TopPlanName;
      this.id = data.id;
      if (data.flag === 0) {
        console.log("到达这里了");
        this.showit1 = false;
        this.ClientName = data.client;
        this.BrandName = data.brand;
        this.SeriesName = data.series;
        this.id = data.id;
        // plantype:":??????,",
        this.objName = data.planobj;
        this.TopPlan = data.TopPlan;
        this.TopPlanName = data.TopPlanName;
        this.planName = data.planName;
        this.ProjectType = data.projectType;
        this.PlanPrice = data.number;

        this.ProductData = data.productDate;
        this.ProductDateType = data.productDateType;
        this.PlanProduct = data.productId;
        this.PlanPropose = data.proposal;
        this.PlanRemark = data.note;
        this.PlanDiscribe = data.description;

        that.$axios
          .get(`${window.$config.HOST}/baseInfoManagement/getProduct`, {
            params: {
              name: undefined
            }
          })
          .then(response => {
              response.data.forEach(element => {
          console.log("到达这ss里111");
          if (element.id === this.PlanProduct) {
            console.log("到达ss这里");
            this.PlanProductName = element.name;
          }
        });

          })
          .catch(error => {
            console.log("获取品牌失败");
          });

      }

      // let list={
      //     showit1:false,
      //     ClientName:data.client,
      //     BrandName:data.brand,
      //     SeriesName:data.series,
      //     id:data.id,

      //     objName:data.planobj,
      //     TopPlan:data.TopPlan,
      //     TopPlanName:data.TopPlanName,
      //     planName:data.planName,
      //     ProjectType:data.projectType,
      //     PlanPrice:data.number,

      //     ProductData:data.productDate,
      //     ProductDateType:data.productDateType,
      //     PlanProduct :data.productId,
      //     PlanPropose:data.proposal ,
      //     PlanRemark:data.note ,
      //     PlanDiscribe:data.description
      // }
      //
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