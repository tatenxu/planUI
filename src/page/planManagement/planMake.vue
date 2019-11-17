<template>
  <div class="body">
    <el-backtop target=".box-card"></el-backtop>

    <el-card class="box-card">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20">
          <span class="Mtitle">计划制定</span>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="客户名称" prop="customerName" placeholder="请选择客户名称">
                <el-input
                  v-model="ruleForm.clientName"
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
              <el-form-item label="系列名称" prop="seriesName" placeholder="请选择系列名称">
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
              <el-form-item label="服装层次" prop="clothingLevelName" placeholder="请选择计划类型">
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
              <el-form-item label="创建人" prop="creatorName" placeholder="请选择计划对象">
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
              <el-form-item label="cycle" prop="cycle" placeholder="请选择上级计划">
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
              <el-form-item label="计划名称" prop="name" placeholder="请选择客户名称">
                <el-input
                  :disabled="!lookShowItem"
                  v-model="ruleForm.planName"
                  clearable
                  :rows="1"
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="部门名称" prop="deptName" placeholder="请选择项目类型">
                <el-select
                  :disabled="!lookShowItem"
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
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="异常状态" prop="haveException" placeholder="请选择计划款数">
                <el-input
                  v-model="ruleForm.quantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  disabled
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="订单阶段" prop="orderStage" placeholder="请选择产品">
                <el-select
                  :disabled="!lookShowItem"
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
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="pieceQuantity" prop="pieceQuantity" placeholder="请选择计划款数">
                <el-input
                  v-model="ruleForm.quantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  disabled
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划类别" prop="planClass" placeholder="请选择计划款数">
                <el-input
                  v-model="ruleForm.quantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  disabled
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="预测数量" prop="predictPieceQuantity" placeholder="请选择产品">
                <el-select
                  :disabled="!lookShowItem"
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
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="预测款式数" prop="predictStyleQuantity" placeholder="请选择计划款数">
                <el-input
                  v-model="ruleForm.quantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  disabled
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="产品" prop="product" placeholder="请选择计划款数">
                <el-input
                  v-model="ruleForm.quantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  disabled
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="产品线" prop="productLine" placeholder="请选择产品">
                <el-select
                  :disabled="!lookShowItem"
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
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="项目类型" prop="projectType" placeholder="请选择计划款数">
                <el-input
                  v-model="ruleForm.quantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  disabled
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="对象名" prop="objectName" placeholder="请选择计划款数">
                <el-input
                  v-model="ruleForm.quantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  disabled
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="根计划" prop="rootPlanName" placeholder="请选择产品">
                <el-select
                  :disabled="!lookShowItem"
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
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="排序号" prop="sequence" placeholder="请选择计划款数">
                <el-input
                  v-model="ruleForm.quantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  disabled
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="系列号" prop="serialNo" placeholder="请选择计划款数">
                <el-input
                  v-model="ruleForm.quantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  disabled
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="状态" prop="state" placeholder="请选择产品">
                <el-select
                  :disabled="!lookShowItem"
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
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="款式数量" prop="styleQuantity" placeholder="请选择计划款数">
                <el-input
                  v-model="ruleForm.quantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  disabled
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="父计划" prop="superiorName" placeholder="请选择计划款数">
                <el-input
                  v-model="ruleForm.quantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  disabled
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="类型" prop="type" placeholder="请选择产品">
                <el-select
                  :disabled="!lookShowItem"
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
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar" style="margin-left: 0px">
              <el-form-item label="日期类型" prop="dateType" placeholder="请选择日期类型">
                <el-select
                  :disabled="!lookShowItem"
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
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <el-form-item label="创建日期" prop="createTime" placeholder="请选择日期">
              <el-date-picker
                :picker-options="pickerOptions1"
                :disabled="!lookShowItem"
                v-model="ruleForm.productDate"
                type="date"
                placeholder="选择日期"
                style="min-width:260px"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="13">
            <div class="bar">
              <el-form-item label="起止时间" prop="date" placeholder="请选择起止时间">
                <el-date-picker
                  :disabled="!lookShowItem"
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
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="20">
            <div class="bar">
              <el-form-item label="计划建议" prop="proposal" placeholder="请输入计划建议">
                <el-input
                  :disabled="!lookShowItem"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="ruleForm.planPropose"
                  style="margin-left: 26px;width:900px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <div class="bar">
              <el-form-item label="计划描述" prop="description" placeholder="请输入计划描述">
                <el-input
                  :disabled="!lookShowItem"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="ruleForm.planDescribe"
                  style="margin-left: 26px;width:900px"
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
                  :disabled="!lookShowItem"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入内容"
                  v-model="ruleForm.note"
                  style="margin-left: 26px;width:900px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-upload
            v-if="flag===1 || flag===2"
            action
            :file-list="fileList"
            :http-request="uploadImg"
            multiple
            style="margin-left:11%"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!-- <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"

            >上传到服务器</el-button>-->
          </el-upload>
        </el-row>
        <el-row :gutter="20" v-if="flag===2 || flag===3">
          <el-col style="width:70%;margin-left:10%  ">
            <el-table :data="uploadFileName" border style="width: 100%">
              <el-table-column prop="fileName" label="上传结果"></el-table-column>
              <el-table-column fixed="right" width="150" align="center" v-if="flag===2">
                <template slot-scope="scope">
                  <el-button @click="deleteFile(scope.row,scope.index)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column fixed="right" width="150" align="center" v-if="flag===3">
                <template slot-scope="scope">
                  <el-button @click="downloadRow(scope.row)" type="text" size="small">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <div class="Mbutton">
              <el-col :span="8" v-if="flag === 1">
                <el-button type="primary" @click="savePlanForm('ruleForm')">保存</el-button>
              </el-col>
              <el-col :span="8" v-if="flag === 2">
                <el-button type="primary" @click="modifyPlanForm('ruleForm')">修改</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="cancelPlanForm()">取消</el-button>
              </el-col>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-dialog title :visible.sync="fileOperationDialogVisible" width="30%" :modal="false">
        <!-- <span>这是一段信息</span> -->
        <span slot="footer" class="dialog-footer">
          <span>修改上传文件请到修改计划页面中！</span>
          <el-button type="primary" @click="uploadOK">确 定</el-button>
        </span>
        <el-table :data="uploadResult" border style="width: 100%">
          <el-table-column prop="result" label="上传结果"></el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileOperationDialogVisible: false,
      formData: "",
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
      fileList: [],
      // date: "",
      uploadFileName: [],
      lookShowItem: false,

      rules: {
        customerName: [{ required: true, message: "请输入", trigger: "blur" }],
        brandName: [{ required: true, message: "请输入", trigger: "blur" }],
        rangeName: [{ required: true, message: "请输入", trigger: "blur" }],
        planType: [{ required: true, message: "请输入", trigger: "blur" }],
        planObjectName: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        topPlanName: [{ required: true, message: "请输入", trigger: "blur" }],
        planName: [{ required: true, message: "请输入", trigger: "blur" }],
        projectType: [{ required: true, message: "请输入", trigger: "change" }],
        quantity: [{ required: true, message: "请输入", trigger: "blur" }],
        date: [{ required: true, message: "请输入", trigger: "change" }],
        productDateType: [
          { required: true, message: "请输入", trigger: "change" }
        ],
        productDate: [{ required: true, message: "请输入", trigger: "change" }],
        planProductName: [
          { required: true, message: "请输入", trigger: "change" }
        ],
        planPropose: [{ required: true, message: "请输入", trigger: "blur" }],
        planDescribe: [{ required: true, message: "请输入", trigger: "blur" }],
        note: [{ required: false, message: "请输入", trigger: "blur" }]
      },
      flag: 1, //flag =  0的时候，为查看详情，flag = 1的时候，为添加修改之类的
      goback: "", //goback 为返回的 name

      ruleForm: {
        planId: "无数据",
        clientName: "无数据",
        brandName: "无数据",
        rangeId: "无数据",
        rangeName: "无数据",
        planType: "无数据",
        planObjectName: "无数据",
        planObjectId: "无数据",
        topPlanName: "无数据",
        topPlanId: "无数据",
        planName: "无数据",
        projectType: "无数据",
        quantity: "无数据",
        date: ["无数据", "无数据"],
        dateStart: "无数据",
        dateEnd: "无数据",
        productDateType: "无数据",
        productDate: "无数据",
        planProductName: "无数据",
        planProductId: "无数据",
        planPropose: "无数据",
        planDescribe: "无数据",
        note: "无数据"
      },

      uploadResult: [],

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
    this.formData = new FormData();

    //获得项目类型下拉框
    let CategoryId;
    that.$axios
      .get(
        `${window.$config.HOST}/dictionaryManagement/getDictionaryCategoryIdByName`,
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
        `${window.$config.HOST}/dictionaryManagement/getDictionaryCategoryIdByName`,
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
        console.log("计划产品下拉框", this.PlanProductOpt);
        this.PlanProductOpt.forEach(element => {
          if (element.id === this.ruleForm.planProductId)
            this.ruleForm.planProductName = element.name;
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
    downloadRow(row) {
      this.$axios
        .get(`${window.$config.HOST}/planManagement/downloadPlanFile`, {
          responseType: "blob",
          params: {
            planId: this.ruleForm.planId,
            filename: row.fileName
          }
        })
        .then(response => {
          let content = response.data;
          let blob = new Blob([content]);
          let fileName = row.fileName;
          console.log(fileName);
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        })
        .catch(error => {});
    },
    deleteFile(row) {
      this.$axios
        .delete(`${window.$config.HOST}/planManagement/deletePlanFile`, {
          params: {
            planId: this.ruleForm.planId,
            filename: row.fileName
          }
        })
        .then(response => {
          if (response.data >= 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            });

            console.log("删除前", this.uploadFileName);
            let i = 0;
            this.uploadFileName.forEach(element => {
              if (element.fileName === row.fileName) {
                this.uploadFileName.splice(i, 1);
              }
              i = i + 1;
            });
            console.log("删除后", this.uploadFileName);
          } else {
            this.$message({
              type: "error",
              message: "要删除的文件不存在!"
            });
          }
        })
        .catch(error => {});
    },
    uploadOK() {
      this.fileOperationDialogVisible = false;
      this.$router.push({
        name: this.goback,
        params: {}
      });
    },
    uploadImg(item) {
      this.formData.append("file", item.file);
      console.log(this.formData);
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
    savePlanForm(formName) {
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
              if (response.data < 0) {
                console.log(
                  "添加失败:" +
                    this.planManagementErrorCode[-response.data - 1].errotInfo
                );
                this.$message.error(
                  "添加失败:" +
                    this.planManagementErrorCode[-response.data - 1].errotInfo
                );
              } else {
                this.$message({
                  type: "success",
                  message: "添加成功!"
                });

                this.formData.append("planId", response.data);
                that.$axios
                  .post(
                    `${window.$config.HOST}/planManagement/addPlanFiles`,
                    this.formData
                  )
                  .then(response => {
                    console.log(response.data);
                    let l = [];
                    if (response.data.length == 0) {
                      this.$router.push({
                        name: this.goback,
                        params: {}
                      });
                    } else {
                      response.data.forEach(element => {
                        this.uploadResult.push({
                          result: element
                        });
                      });
                      this.fileOperationDialogVisible = true;
                    }
                  })
                  .catch(error => {});

                // this.formData.append("planId", response.data);
                // that.$axios
                //   .post(
                //     `${window.$config.HOST}/planManagement/addPlanFiles`,
                //     this.formData
                //   )
                //   .then(response => {
                //     console.log(response.data);

                //     response.data.forEach(element => {
                //       this.uploadResult.push({
                //         result: element
                //       });
                //     });
                //     this.fileOperationDialogVisible = true;
                //   })
                //   .catch(error => {});

                // this.$router.push({
                //   name: this.goback,
                //   params: {}
                // });
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

    modifyPlanForm(formName) {
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
              if (response.data < 0) {
                console.log(
                  "修改失败:" +
                    this.planManagementErrorCode[-response.data - 1].errotInfo
                );
                this.$message.error(
                  "修改失败:" +
                    this.planManagementErrorCode[-response.data - 1].errotInfo
                );
              } else {
                this.$message({
                  type: "success",
                  message: "修改成功!"
                });

                this.formData.append("planId", this.ruleForm.planId);
                that.$axios
                  .post(
                    `${window.$config.HOST}/planManagement/addPlanFiles`,
                    this.formData
                  )
                  .then(response => {
                    console.log(response.data);
                    let l = [];
                    if (response.data.length == 0) {
                      this.$router.push({
                        name: this.goback,
                        params: {}
                      });
                    } else {
                      response.data.forEach(element => {
                        this.uploadResult.push({
                          result: element
                        });
                      });
                      this.fileOperationDialogVisible = true;
                    }
                  })
                  .catch(error => {});
                // this.$router.push({
                //   name: this.goback,
                //   params: {}
                // });
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
    cancelPlanForm() {
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

      this.goback = data.goback; //goback 为返回的 name
      this.flag = data.flag; //flag = 0的时候，为查看详情，flag = 1的时候，为添加修改之类的

      if (this.flag === 1) {
        //1的时候，为添加之类

        this.ruleForm.quantity = data.quantity;
        this.ruleForm.customerName = data.customerName;
        this.ruleForm.brandName = data.brandName;
        this.ruleForm.rangeId = data.rangeId;
        this.ruleForm.rangeName = data.rangeName;
        this.ruleForm.planType = data.planType;
        this.ruleForm.planObjectName = data.planObjectName;
        this.ruleForm.planObjectId = data.planObjectId;
        this.ruleForm.topPlanName = data.topPlanName;
        this.ruleForm.topPlanId = data.topPlanId;
      } else if (this.flag === 2) {
        //2的时候，为修改之类

        this.ruleForm.planId = data.planId;
        this.ruleForm.customerName = data.customerName;
        this.ruleForm.brandName = data.brandName;
        this.ruleForm.rangeId = data.rangeId;
        this.ruleForm.rangeName = data.rangeName;
        this.ruleForm.planType = data.planType;
        this.ruleForm.planObjectName = data.planObjectName;
        this.ruleForm.planObjectId = data.planObjectId;
        this.ruleForm.topPlanName = data.topPlanName;
        this.ruleForm.topPlanId = data.topPlanId;
        this.ruleForm.planName = data.planName;
        this.ruleForm.projectType = data.projectType;
        this.ruleForm.quantity = data.quantity;

        this.ruleForm.date = [data.dateStart, data.dateEnd];
        this.startStr = data.dateStart;
        this.endStr = data.dateEnd;

        this.ruleForm.productDateType = data.productDateType;
        this.ruleForm.productDate = data.productDate;
        this.ruleForm.planProductId = data.planProductId;
        this.ruleForm.planPropose = data.planPropose;
        this.ruleForm.planDescribe = data.planDescribe;
        this.ruleForm.note = data.note;
        data.files.forEach(element => {
          this.uploadFileName.push({
            fileName: element
          });
        });
      } else if (this.flag === 3) {
        //查看
        this.lookShowItem = false;
        this.ruleForm.planId = data.planId;
        this.ruleForm.customerName = data.customerName;
        this.ruleForm.brandName = data.brandName;
        this.ruleForm.rangeId = data.rangeId;
        this.ruleForm.rangeName = data.rangeName;
        this.ruleForm.planType = data.planType;
        this.ruleForm.planObjectName = data.planObjectName;
        this.ruleForm.planObjectId = data.planObjectId;
        this.ruleForm.topPlanName = data.topPlanName;
        this.ruleForm.topPlanId = data.topPlanId;
        this.ruleForm.planName = data.planName;
        this.ruleForm.projectType = data.projectType;
        this.ruleForm.quantity = data.quantity;

        this.startStr = data.dateStart;
        this.endStr = data.dateEnd;
        this.ruleForm.productDateType = data.productDateType;
        this.ruleForm.productDate = data.productDate;
        this.ruleForm.planProductId = data.planProductId;
        this.ruleForm.planPropose = data.planPropose;
        this.ruleForm.planDescribe = data.planDescribe;
        this.ruleForm.note = data.note;
        data.files.forEach(element => {
          this.uploadFileName.push({
            fileName: element
          });
        });
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