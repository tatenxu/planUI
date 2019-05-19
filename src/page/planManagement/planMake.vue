<template>
  <div class="body">
    <el-card class="box-card">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20">
          <span class="Mtitle" v-if="flag===1">系列计划制定</span>
          <span class="Mtitle" v-else-if="flag===2">款式组计划制定</span>
          <span class="Mtitle" v-else-if="flag===3">款式计划制定</span>
          <span class="Mtitle" v-else>计划制定</span>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="客户名称" prop="ClientName" placeholder="请选择客户名称">
                <el-input
                  v-model="ruleForm.ClientName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="品牌名称" prop="BrandName" placeholder="请选择品牌名称">
                <el-input
                  v-model="ruleForm.BrandName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="系列名称" prop="SeriesName" placeholder="请选择系列名称">
                <el-input
                  v-model="ruleForm.SeriesName"
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划类型" prop="PlanType" placeholder="请选择计划类型">
                <el-input
                  v-model="ruleForm.PlanType"
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划对象" prop="objName" placeholder="请选择计划对象">
                <el-input
                  v-model="ruleForm.objName"
                  clearable
                  :rows="1"
                  placeholder="请输入"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar" style="margin-left: 4px">
              <el-form-item label="上级计划" prop="TopPlanName" placeholder="请选择上级计划">
                <el-input
                  v-model="ruleForm.TopPlanName"
                  clearable
                  :rows="1"
                  placeholder="请输入"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划名称" prop="planName" placeholder="请选择客户名称">
                <el-input
                  v-if="showit1"
                  v-model="ruleForm.planName"
                  clearable
                  :rows="1"
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
                <el-input
                  v-else
                  v-model="ruleForm.planName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="项目类型" prop="ProjectType" placeholder="请选择项目类型">
                <el-select
                  v-if="showit1"
                  v-model="ruleForm.ProjectType"
                  clearable
                  placeholder="请选择"
                  style="min-width:240px"
                >
                  <el-option
                    v-for="item in ProjectTypeOpt"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
                <el-input
                  v-else
                  v-model="ruleForm.ProjectType"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划款数" prop="PlanPrice" placeholder="请选择计划款数">
                <el-input
                  v-if="showit1"
                  v-model="ruleForm.PlanPrice"
                  clearable
                  :rows="1"
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
                <el-input
                  v-else
                  v-model="ruleForm.PlanPrice"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="13">
            <div class="bar">
              <el-form-item label="起止时间" prop="Date1" placeholder="请选择起止时间">
                <el-date-picker
                  v-if="showit1"
                  :picker-options="pickerOptions0"
                  style="margin-left:20px"
                  v-model="ruleForm.Date1"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  :start-placeholder="startStr"
                  :end-placeholder="endStr"
                ></el-date-picker>

                <el-date-picker
                  v-else
                  :disabled="true"
                  :picker-options="pickerOptions0"
                  style="margin-left:20px"
                  v-model="ruleForm.Date1"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  :start-placeholder="startStr"
                  :end-placeholder="endStr"
                ></el-date-picker>

                <!-- <el-input
                  v-else
                  v-model="ruleForm.Date1"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:300px"
                ></el-input>-->
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="3">
            <div class="bar" style="margin-left: 0px">
              <el-form-item label="日期类型" prop="ProductDateType" placeholder="请选择日期类型">
                <el-select
                  v-if="showit1"
                  v-model="ruleForm.ProductDateType"
                  clearable
                  placeholder="请选择"
                  style="min-width:120px"
                >
                  <el-option
                    v-for="item in datemodelOpt"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>

                <el-input
                  v-else
                  v-model="ruleForm.ProductDateType"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:120px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="4">
            <el-form-item label prop="ProductData" placeholder="请选择日期">
              <el-date-picker
                :picker-options="pickerOptions1"
                v-if="showit1"
                v-model="ruleForm.ProductData"
                type="date"
                placeholder="选择日期"
                style="min-width:260px"
              ></el-date-picker>
              <el-input
                v-else
                v-model="ruleForm.ProductData"
                clearable
                :rows="1"
                placeholder="请选择"
                :disabled="true"
                style="min-width:260px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划产品" prop="PlanProduct" placeholder="请选择产品">
                <el-select
                  v-if="showit1"
                  v-model="ruleForm.PlanProduct"
                  clearable
                  placeholder="请选择"
                  style="min-width:240px"
                >
                  <el-option
                    v-for="item in PlanProductOpt"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-input
                  v-else
                  v-model="ruleForm.PlanProductName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <div class="bar">
              <el-form-item label="计划建议" prop="PlanPropose" placeholder="请输入计划建议">
                <el-input
                  v-if="showit1"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="ruleForm.PlanPropose"
                  style="margin-left: 26px;width:900px"
                ></el-input>
                <el-input
                  v-else
                  v-model="ruleForm.PlanPropose"
                  clearable
                  :rows="4"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:900px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <div class="bar">
              <el-form-item label="计划描述" prop="PlanDiscribe" placeholder="请输入计划描述">
                <el-input
                  v-if="showit1"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="ruleForm.PlanDiscribe"
                  style="margin-left: 26px;width:900px"
                ></el-input>
                <el-input
                  v-else
                  v-model="ruleForm.PlanDiscribe"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:900px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <div class="bar">
              <el-form-item label="计划备注" prop="PlanRemark" placeholder="请输入计划备注">
                <el-input
                  v-if="showit1"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="ruleForm.PlanRemark"
                  style="margin-left: 26px;width:900px"
                ></el-input>
                <el-input
                  v-else
                  v-model="ruleForm.PlanRemark"
                  clearable
                  :rows="1"
                  placeholder
                  :disabled="true"
                  style="min-width:900px"
                ></el-input>
              </el-form-item>
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
                <el-button type="primary" @click="SavePlanForm('ruleForm')">保存</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="CancelPlanForm()">取消</el-button>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      endStr: "结束时间",
      startStr: "开始时间",

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
      // PlanProductName: "",
      // TopPlanName: "",
      // planObjId: "",
      fileList: [],
      // Date1: "",
      flag: 0,
      goback: "",
      showit1: true,
      showit2: true,
      showit3: true,
      showit4: true,
      showit5: true,

      rules: {
        ClientName: [
          { required: true, message: "请输入客户名称", trigger: "blur" }
        ],
        BrandName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" }
        ],
        SeriesName: [
          { required: true, message: "请输入系列名称", trigger: "blur" }
        ],
        PlanType: [
          { required: true, message: "请输入计划类型", trigger: "blur" }
        ],
        objName: [
          { required: true, message: "请输入计划对象", trigger: "blur" }
        ],
        TopPlanName: [
          { required: true, message: "请输入上级计划", trigger: "blur" }
        ],
        planName: [
          { required: true, message: "请输入计划名称", trigger: "blur" }
        ],
        ProjectType: [
          { required: true, message: "请选择项目类型", trigger: "change" }
        ],
        PlanPrice: [
          { required: true, message: "请输入计划款数", trigger: "blur" }
        ],
        Date1: [
          { required: true, message: "请选择起止时间", trigger: "change" }
        ],
        ProductDateType: [
          { required: true, message: "请选择日期类型", trigger: "change" }
        ],
        ProductData: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        PlanProduct: [
          { required: true, message: "请选择计划产品", trigger: "change" }
        ],
        PlanPropose: [
          { required: true, message: "请输入计划建议", trigger: "blur" }
        ],
        PlanDiscribe: [
          { required: true, message: "请输入计划描述", trigger: "blur" }
        ],
        PlanRemark: [
          { required: false, message: "请输入计划建议", trigger: "blur" }
        ]
      },
      ruleForm: {
        planName: "",
        PlanProduchtName: "",
        TopPlanName: "",
        planObjId: "",
        Date1: "",
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

        Plandate: "",
        datemodel: "",
        PlanPrice: "",
        TopPlan: "",
        PlanStartTime: "",
        PlanEndTime: "",
        id: "",
        planName: "",
        planID: "JH000001"
      },

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
    //获得项目类型下拉框
    let CategoryId;
    that.$axios
      .get(
        `${
          window.$config.HOST
        }/dictionaryManagement/getDictionaryCategoryIdByName`,
        {
          params: {
            name: "项目类型"
          }
        }
      )
      .then(response => {
        let isId = response.data;
        that.$axios
          .get(
            `${window.$config.HOST}/dictionaryManagement/getCategoryProperty`,
            {
              params: {
                categoryId: isId
              }
            }
          )
          .then(response => {
            this.ProjectTypeOpt = response.data;
          })
          .catch(error => {
            console.log("项目类型下拉框获取失败");
          });
      })
      .catch(error => {
        console.log("项目类型字典ID获取失败");
      });

    //获取日期类型
    that.$axios
      .get(
        `${
          window.$config.HOST
        }/dictionaryManagement/getDictionaryCategoryIdByName`,
        {
          params: {
            name: "日期类型"
          }
        }
      )
      .then(response => {
        let dataID = response.data;
        that.$axios
      .get(`${window.$config.HOST}/dictionaryManagement/getCategoryProperty`, {
        params: {
          categoryId: dataID
        }
      })
      .then(response => {
        this.ruleForm.ProductDateType = response.data;
      })
      .catch(error => {
        console.log("项目类型下拉框获取失败");
      });
      })
      .catch(error => {
        console.log("日期类型字典ID获取失败");
      });

    

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
    const that=this;
    that.$axios
            .get(`${window.$config.HOST}/baseInfoManagement/getProduct`, {
              params: {
                name: undefined
              }
            })
            .then(response => {
              response.data.forEach(element => {
                if (element.id === this.ruleForm.PlanProduct) {
                  this.ruleForm.PlanProductName = element.name;
                }
              });
            })
            .catch(error => {
              console.log("获取品牌失败");
            });
    this.init();
  },
  //五个参数控制
  //所有的计划制定的跳转

  methods: {
    //       this.totalTableData.sort(function(b,a){
    // return Date.parse(a.createTime) - Date.parse(b.createTime);//时间正序
    // });

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
    SavePlanForm(formName) {
      console.log(this.ruleForm.data1);
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("啊啊啊啊啊啊啊");
          const that = this;
          this.ruleForm.DataStartTime = that.changeDate(this.ruleForm.Date1[0]);
          this.ruleForm.DataEndTime = that.changeDate(this.ruleForm.Date1[1]);
          let time = that.changeDate(this.ruleForm.ProductData);

          let range;
          this.seriesOpt.forEach(element => {
            if (element.name === this.ruleForm.SeriesName) {
              range = element.id;
            }
          });
          let list = {
            name: this.ruleForm.planName,
            rangeId: range,
            type: this.ruleForm.PlanType,
            isRoot: this.ruleForm.TopPlan === 0 ? true : false,
            parentId: this.ruleForm.TopPlan,
            planObjectId: this.ruleForm.id,
            projectType: this.ruleForm.ProjectType,
            quantity: parseInt(this.ruleForm.PlanPrice),
            productId: this.ruleForm.PlanProduct,
            productDate: time,
            productDateType: this.ruleForm.ProductDateType,
            startDate: this.ruleForm.DataStartTime,
            endDate: this.ruleForm.DataEndTime,
            proposal: this.ruleForm.PlanPropose,
            description: this.ruleForm.PlanDiscribe,
            note: this.ruleForm.PlanRemark
          };

          console.log(list);
          that.$axios
            .post(
              `${window.$config.HOST}/planManagement/addPlan`,
              list
              // name: this.ruleForm.planName,
              // rangeId: range,
              // type: this.ruleForm.PlanType,
              // isRoot: this.ruleForm.TopPlan === 0 ? true : false,
              // parentId: this.ruleForm.TopPlan,
              // planObjectId: this.ruleForm.id,
              // projectType: this.ruleForm.ProjectType,
              // quantity: parseInt(this.ruleForm.PlanPrice),
              // productId: this.ruleForm.PlanProduct,
              // productDate: time,
              // productDateType: this.ruleForm.ProductDateType,
              // startDate: this.ruleForm.DataStartTime,
              // endDate: this.ruleForm.DataEndTime,
              // proposal: this.ruleForm.PlanPropose,
              // description: this.ruleForm.PlanDiscribe,
              // note: this.ruleForm.PlanRemark
            )
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
        } else {
          this.$message({
            message: "制定计划失败!",
            type: "error"
          });
        }
      });
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
      if (data.goback) {
        this.dataOk = false;
        console.log(data);
        this.ruleForm.ClientName = data.client;
        this.ruleForm.BrandName = data.brand;
        this.ruleForm.SeriesName = data.series;
        this.ruleForm.objName = data.planobj;
        this.flag = data.flag;
        this.goback = data.goback;
        this.ruleForm.TopPlan = data.TopPlan;
        this.ruleForm.TopPlanName = data.TopPlanName;
        this.ruleForm.id = data.id;
        this.ruleForm.planName = data.planName;
        this.ruleForm.ProjectType = data.projectType;
        this.ruleForm.PlanPrice = data.number;

        if (data.dataStart != "") {
          this.ruleForm.Date1 = [data.dataStart, data.dataEnd];
          this.startStr = data.dataStart;
          this.endStr = data.dataEnd;
        }
        this.ruleForm.ProductData = data.productDate;
        this.ruleForm.ProductDateType = data.productDateType;
        this.ruleForm.PlanProduct = data.productId;
        this.ruleForm.PlanPropose = data.proposal;
        this.ruleForm.PlanRemark = data.note;
        this.ruleForm.PlanDiscribe = data.description;

        console.log(this.ruleForm);
        if (data.flag === 0) {
          this.showit1 = false;
          // this.ruleForm.ClientName = data.client;
          // this.ruleForm.BrandName = data.brand;
          // this.ruleForm.SeriesName = data.series;
          // this.ruleForm.id = data.id;
          // // plantype:":??????,",
          // this.ruleForm.objName = data.planobj;
          // this.ruleForm.TopPlan = data.TopPlan;
          // this.ruleForm.TopPlanName = data.TopPlanName;
          // this.ruleForm.planName = data.planName;
          // this.ruleForm.ProjectType = data.projectType;
          // this.ruleForm.PlanPrice = data.number;
          // this.ruleForm.Date1 = data.dataStart + " 至 " + data.dataEnd;

          // this.ruleForm.ProductData = data.productDate;
          // this.ruleForm.ProductDateType = data.productDateType;
          // this.ruleForm.PlanProduct = data.productId;
          // this.ruleForm.PlanPropose = data.proposal;
          // this.ruleForm.PlanRemark = data.note;
          // this.ruleForm.PlanDiscribe = data.description;

          console.log(this.ruleForm);

          that.$axios
            .get(`${window.$config.HOST}/baseInfoManagement/getProduct`, {
              params: {
                name: undefined
              }
            })
            .then(response => {
              response.data.forEach(element => {
                if (element.id === this.ruleForm.PlanProduct) {
                  this.ruleForm.PlanProductName = element.name;
                }
              });
            })
            .catch(error => {
              console.log("获取品牌失败");
            });
        }
        switch (data.plantype) {
          case 1:
            this.ruleForm.PlanType = "系列计划";
            break;
          case 2:
            this.ruleForm.PlanType = "款式组计划";
            break;
          case 3:
            this.ruleForm.PlanType = "款式计划";
            break;
          default:
            this.ruleForm.PlanType = data.plantype;
        }
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