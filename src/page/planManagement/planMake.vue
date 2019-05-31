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
              <el-form-item label="客户名称" prop="customerName" placeholder="请选择客户名称">
                <el-input
                  v-model="ruleForm.customerName"
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
              <el-form-item label="品牌名称" prop="brandName" placeholder="请选择品牌名称">
                <el-input
                  v-model="ruleForm.brandName"
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
              <el-form-item label="系列名称" prop="rangeName" placeholder="请选择系列名称">
                <el-input
                  v-model="ruleForm.rangeName"
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
              <el-form-item label="计划类型" prop="planType" placeholder="请选择计划类型">
                <el-input
                  v-model="ruleForm.planType"
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
              <el-form-item label="计划对象" prop="planObjectName" placeholder="请选择计划对象">
                <el-input
                  v-model="ruleForm.planObjectName"
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
              <el-form-item label="上级计划" prop="topPlanName" placeholder="请选择上级计划">
                <el-input
                  v-model="ruleForm.topPlanName"
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
              <el-form-item label="项目类型" prop="projectType" placeholder="请选择项目类型">
                <el-select
                  v-if="showit1"
                  v-model="ruleForm.projectType"
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
                  v-model="ruleForm.projectType"
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
              <el-form-item label="计划款数" prop="quantity" placeholder="请选择计划款数">
                <!-- <el-input
                  v-if="showit1"
                  v-model="ruleForm.quantity"
                  clearable
                  :rows="1"
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input> -->
                <el-input
                  v-model="ruleForm.quantity"
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
              <el-form-item label="起止时间" prop="date" placeholder="请选择起止时间">
                <el-date-picker
                  v-if="showit1"
                  :picker-options="pickerOptions0"
                  style="margin-left:20px"
                  v-model="ruleForm.date"
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
                  v-model="ruleForm.date"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  :start-placeholder="startStr"
                  :end-placeholder="endStr"
                ></el-date-picker>

                <!-- <el-input
                  v-else
                  v-model="ruleForm.date"
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
              <el-form-item label="日期类型" prop="productDateType" placeholder="请选择日期类型">
                <el-select
                  v-if="showit1"
                  v-model="ruleForm.productDateType"
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
                  v-model="ruleForm.productDateType"
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
            <el-form-item label prop="productDate" placeholder="请选择日期">
              <el-date-picker
                :picker-options="pickerOptions1"
                v-if="showit1"
                v-model="ruleForm.productDate"
                type="date"
                placeholder="选择日期"
                style="min-width:260px"
              ></el-date-picker>
              <el-input
                v-else
                v-model="ruleForm.productDate"
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
              <el-form-item label="计划产品" prop="planProductName" placeholder="请选择产品">
                <el-select
                  v-if="showit1"
                  v-model="ruleForm.planProductName"
                  clearable
                  placeholder="请选择"
                  style="min-width:240px"
                >
                  <el-option
                    v-for="item in PlanProductOpt"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
                <el-input
                  v-else
                  v-model="ruleForm.planProductName"
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
              <el-form-item label="计划建议" prop="planPropose" placeholder="请输入计划建议">
                <el-input
                  v-if="showit1"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="ruleForm.planPropose"
                  style="margin-left: 26px;width:900px"
                ></el-input>
                <el-input
                  v-else
                  v-model="ruleForm.planPropose"
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
              <el-form-item label="计划描述" prop="planDescribe" placeholder="请输入计划描述">
                <el-input
                  v-if="showit1"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="ruleForm.planDescribe"
                  style="margin-left: 26px;width:900px"
                ></el-input>
                <el-input
                  v-else
                  v-model="ruleForm.planDescribe"
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
              <el-form-item label="计划备注" prop="note" placeholder="请输入计划备注">
                <el-input
                  v-if="showit1"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="ruleForm.note"
                  style="margin-left: 26px;width:900px"
                ></el-input>
                <el-input
                  v-else
                  v-model="ruleForm.note"
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
              <el-col :span="8" v-if="flag === 1">
                <el-button type="primary" @click="SavePlanForm('ruleForm')">保存</el-button>
              </el-col>
              <el-col :span="8" v-if="flag === 2">
                <el-button type="primary" @click="SavePlanForm1('ruleForm')">修改</el-button>
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
import { POINT_CONVERSION_COMPRESSED } from "constants";
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
      // topPlanName: "",
      // planObjId: "",
      fileList: [],
      // date: "",

      showit1: true,
      showit2: true,
      showit3: true,
      showit4: true,
      showit5: true,

      rules: {
        customerName: [
          { required: true, message: "请输入客户名称", trigger: "blur" }
        ],
        brandName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" }
        ],
        rangeName: [
          { required: true, message: "请输入系列名称", trigger: "blur" }
        ],
        planType: [
          { required: true, message: "请输入计划类型", trigger: "blur" }
        ],
        planObjectName: [
          { required: true, message: "请输入计划对象", trigger: "blur" }
        ],
        topPlanName: [
          { required: true, message: "请输入上级计划", trigger: "blur" }
        ],
        planName: [
          { required: true, message: "请输入计划名称", trigger: "blur" }
        ],
        projectType: [
          { required: true, message: "请选择项目类型", trigger: "change" }
        ],
        quantity: [
          { required: true, message: "请输入计划款数", trigger: "blur" }
        ],
        date: [
          { required: true, message: "请选择起止时间", trigger: "change" }
        ],
        productDateType: [
          { required: true, message: "请选择日期类型", trigger: "change" }
        ],
        productDate: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        planProductName: [
          { required: true, message: "请选择计划产品", trigger: "change" }
        ],
        planPropose: [
          { required: true, message: "请输入计划建议", trigger: "blur" }
        ],
        planDescribe: [
          { required: true, message: "请输入计划描述", trigger: "blur" }
        ],
        note: [{ required: false, message: "请输入计划建议", trigger: "blur" }]
      },
      flag: 1, //flag =  0的时候，为查看详情，flag = 1的时候，为添加修改之类的
      isModify: false, //是否是修改
      goback: "", //goback 为返回的 name
            planManagementErrorCode:[
        {
          errorCode:-1,
          errotInfo:"所需属性值缺失",
        },
        {
          errorCode:-2,
          errotInfo:"计划名称重复",
        },
        {
          errorCode:-3,
          errotInfo:"父计划未下发",
        },
        {
          erorCode:-4,
          errotInfo:"系列根计划不存在",
        },
        {
          errorCode:-5,
          errotInfo:"款式组根计划不存在",
        },
        {
          errorCode:-6,
          errotInfo:"根计划已存在",
        },
        {
          errorCode:-7,
          errotInfo:"计划开始结束时间超额",
        },
        {
          errorCode:-8,
          errotInfo:"计划款数超额",
        },
        {
          errorCode:-9,
          errotInfo:"引用预测计划时预测计划不存在",
        },
        {
          errorCode:-10,
          errotInfo:"当前计划状态不允许执行此操作",
        },
        {
          errorCode:-11,
          errotInfo:"与已有计划冲突",
        },
      ],
      ruleForm: {
        planId: "",
        customerName: "",
        brandName: "",
        rangeId: "",
        rangeName: "",
        planType: "",
        planObjectName: "",
        planObjectId: "",
        topPlanName: "",
        topPlanId: "",
        planName: "",
        projectType: "",
        quantity: "",
        date: "",
        dateStart: "",
        dateEnd: "",
        productDateType: "",
        productDate: "",
        planProductName: "",
        planProductId: "",
        planPropose: "",
        planDescribe: "",
        note: ""

        // planName: "",
        // planProduchtName: "",
        // topPlanName: "",
        // planObjId: "",
        // date: "",
        // productDateType: "",
        // productDate: "",
        // customerName: "",
        // brandName: "",
        // rangeName: "",
        // planObjectName: "",
        // note: "",
        // planType: "",
        // planDescribe: "",
        // planPropose: "",
        // projectType: "",
        // planProductId: "",
        // productDate: "",
        // datemodel: "",
        // quantity: "",
        // topPlanId: "",
        // PlanStartTime: "",
        // PlanEndTime: "",
        // rangeId: "",
        // planName: "",
        // planID: "JH000001"
      },

      ProjectTypeOpt: [],
      PlanProductOpt: [],
      datemodelOpt: [],
      PlantypeOpt: [],
      clientOpt: [],
      brandOpt: [],
      typeOpt: [],
      seriesOpt: [],
      startDate: "",
      endDate: ""
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
            console.log("项目类型下拉框:" + response.data);
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
          .get(
            `${window.$config.HOST}/dictionaryManagement/getCategoryProperty`,
            {
              params: {
                categoryId: dataID
              }
            }
          )
          .then(response => {
            this.datemodelOpt = response.data;
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
    const that = this;
       that.$axios
        .get(`${window.$config.HOST}/baseInfoManagement/getProduct`, {
          params: {
            name: undefined
          }
        })
        .then(response => {
          this.PlanProductOpt = response.data;
          console.log("计划产品下拉框",this.PlanProductOpt)
            this.PlanProductOpt.forEach(element => {
            if (element.id === this.ruleForm.planProductId)
              this.ruleForm.planProductName = element.name;
          })
        })
        .catch(error => {
          console.log("获取品牌失败");
        });
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

    changeDate(date1) {
      var date = new Date(date1);
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
      //添加
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("啊啊啊啊啊啊啊");
          const that = this;
          this.ruleForm.startDate = that.changeDate(this.ruleForm.date[0]);
          this.ruleForm.endDate = that.changeDate(this.ruleForm.date[1]);
          let time = that.changeDate(this.ruleForm.productDate);
          let productId;

          this.PlanProductOpt.forEach(element => {
            if (element.name === this.ruleForm.planProductName) {
              productId = element.id;
            }
          });

          let list = {
            name: this.ruleForm.planName,
            rangeId: this.ruleForm.rangeId,
            type: this.ruleForm.planType,
            isRoot: this.ruleForm.topPlanId === 0 ? true : false,
            parentId: this.ruleForm.topPlanId,
            planObjectId: this.ruleForm.planObjectId,
            projectType: this.ruleForm.projectType,
            quantity: parseInt(this.ruleForm.quantity),
            productId: productId,
            productDate: time,
            productDateType: this.ruleForm.productDateType,
            startDate: this.ruleForm.startDate,
            endDate: this.ruleForm.endDate,
            proposal: this.ruleForm.planPropose,
            description: this.ruleForm.planDescribe,
            note: this.ruleForm.note
          };

          console.log("添加plan的list: ", list);
          that.$axios
            .post(`${window.$config.HOST}/planManagement/addPlan`, list)
            .then(response => {
          if(response.data < 0 ){
            console.log("添加失败:"+this.planManagementErrorCode[-response.data-1].errotInfo);
            this.$message.error( "添加失败:"+this.planManagementErrorCode[-response.data-1].errotInfo);
          }else{
            this.$message({
              type:"success",
              message:"添加成功!"
            });
          }
            })
            .catch(error => {
              this.$message({
                message: "访问数据库失败！",
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

    SavePlanForm1(formName) {
      //修改
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("啊啊啊啊啊啊啊");
          const that = this;
          this.ruleForm.startDate = that.changeDate(this.ruleForm.date[0]);
          this.ruleForm.endDate = that.changeDate(this.ruleForm.date[1]);
          let time = that.changeDate(this.ruleForm.productDate);
          let productId;

          this.PlanProductOpt.forEach(element => {
            if (element.name === this.ruleForm.planProductName) {
              productId = element.id;
            }
          });

          let range;
          this.seriesOpt.forEach(element => {
            if (element.name === this.ruleForm.rangeName) {
              range = element.rangeId;
            }
          });
          let list = {
            id: this.ruleForm.planId,
            name: this.ruleForm.planName,
            projectType: this.ruleForm.projectType,
            quantity: this.ruleForm.quantity,
            productId: productId,
            productDate: time,
            productDateType: this.ruleForm.productDateType,
            startDate: this.ruleForm.startDate,
            endDate: this.ruleForm.endDate,
            proposal: this.ruleForm.planPropose,
            description: this.ruleForm.planDescribe,
            note: this.ruleForm.note
          };

          console.log(list);
          that.$axios
            .post(`${window.$config.HOST}/planManagement/updatePlan`, list)
            .then(response => {
          if(response.data < 0 ){
            console.log("修改失败:"+this.planManagementErrorCode[-response.data-1].errotInfo);
            this.$message.error( "修改失败:"+this.planManagementErrorCode[-response.data-1].errotInfo);
          }else{
            this.$message({
              type:"success",
              message: "修改成功!"
            });
          }
            })
            .catch(error => {
              this.$message({
                message: "访问数据库失败！",
                type: "warning"
              });
            });
        } else {
          this.$message({
            message: "修改计划失败!",
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

      console.log(this.$route.params);
      let data = this.$route.params;
      // console.log(data.dateStart)


      (this.goback = data.goback), //goback 为返回的 name
        (this.flag = data.flag); //flag = 0的时候，为查看详情，flag = 1的时候，为添加修改之类的

      if (this.flag === 1) {
        //1的时候，为添加之类
        this.ruleForm.quantity=data.quantity,
        (this.ruleForm.customerName = data.customerName),
          (this.ruleForm.brandName = data.brandName),
          (this.ruleForm.rangeId = data.rangeId),
          (this.ruleForm.rangeName = data.rangeName),
          (this.ruleForm.planType = data.planType),
          (this.ruleForm.planObjectName = data.planObjectName),
          (this.ruleForm.planObjectId = data.planObjectId),
          (this.ruleForm.topPlanName = data.topPlanName),
          (this.ruleForm.topPlanId = data.topPlanId);
      } else if (this.flag === 2) {
        //2的时候，为修改之类
        (this.ruleForm.planId = data.planId),
          (this.ruleForm.customerName = data.customerName),
          (this.ruleForm.brandName = data.brandName),
          (this.ruleForm.rangeId = data.rangeId),
          (this.ruleForm.rangeName = data.rangeName),
          (this.ruleForm.planType = data.planType),
          (this.ruleForm.planObjectName = data.planObjectName),
          (this.ruleForm.planObjectId = data.planObjectId),
          (this.ruleForm.topPlanName = data.topPlanName),
          (this.ruleForm.topPlanId = data.topPlanId),
          (this.ruleForm.planName = data.planName),
          (this.ruleForm.projectType = data.projectType),
          (this.ruleForm.quantity = data.quantity),
          // (this.ruleForm.date = data.date),
          // (this.ruleForm.dateStart = data.dateStart),
          // (this.ruleForm.dateEnd = data.dateEnd),

          (this.ruleForm.date = [data.dateStart, data.dateEnd]);
          this.startStr = data.dateStart;
          this.endStr = data.dateEnd;

          (this.ruleForm.productDateType = data.productDateType),
          (this.ruleForm.productDate = data.productDate),
          (this.ruleForm.planProductId = data.planProductId),
          (this.ruleForm.planPropose = data.planPropose),
          (this.ruleForm.planDescribe = data.planDescribe),
          (this.ruleForm.note = data.note);
      } else if (this.flag === 3) {
        (this.showit1 = false),
          (this.ruleForm.planId = data.planId),
          (this.ruleForm.customerName = data.customerName),
          (this.ruleForm.brandName = data.brandName),
          (this.ruleForm.rangeId = data.rangeId),
          (this.ruleForm.rangeName = data.rangeName),
          (this.ruleForm.planType = data.planType),
          (this.ruleForm.planObjectName = data.planObjectName),
          (this.ruleForm.planObjectId = data.planObjectId),
          (this.ruleForm.topPlanName = data.topPlanName),
          (this.ruleForm.topPlanId = data.topPlanId),
          (this.ruleForm.planName = data.planName),
          (this.ruleForm.projectType = data.projectType),
          (this.ruleForm.quantity = data.quantity),

          // (this.ruleForm.dateStart = data.dateStart),
          // (this.ruleForm.dateEnd = data.dateEnd),

        this.startStr = data.dateStart;
        this.endStr = data.dateEnd;
        (this.ruleForm.productDateType = data.productDateType),
          (this.ruleForm.productDate = data.productDate),
          // (this.ruleForm.planProductName = data.planProductName),
          (this.ruleForm.planProductId = data.planProductId),
          ((this.ruleForm.planPropose = data.planPropose)),
          (this.ruleForm.planDescribe = data.planDescribe),
          (this.ruleForm.note = data.note);
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