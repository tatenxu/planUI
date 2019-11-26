<template>
  <div class="body">
    <el-backtop target=".body"></el-backtop>

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
              <el-form-item label="客户名称" prop="clientName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.clientName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="!alwaysGreyFlag"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="品牌名称" prop="brandName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.brandName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="!alwaysGreyFlag"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="系列名称" prop="seriesName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.seriesName"
                  :rows="1"
                  placeholder="请选择"
                  :disabled="!alwaysGreyFlag"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="服装层次" prop="clothesLevelName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.clothesLevelName"
                  :rows="1"
                  placeholder="请选择"
                  :disabled="!alwaysGreyFlag"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划类别" prop="planClass" placeholder="请输入">
                <el-input
                  v-model="ruleForm.planClass"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="!alwaysGreyFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划对象" prop="objectName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.objectName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="!alwaysGreyFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="根计划" prop="rootPlanName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.rootPlanName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="!alwaysGreyFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="上级计划" prop="superiorName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.superiorName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="!alwaysGreyFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar" style="margin-left: 0px">
              <el-form-item label="日期类型" prop="dateType" placeholder="请输入">
                <el-input
                  v-model="ruleForm.dateType"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="!alwaysGreyFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划名称" prop="name" placeholder="请输入">
                <el-input
                  :disabled="!modifyFlanFlag"
                  v-model="ruleForm.name"
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
              <el-form-item label="计划类型" prop="type" placeholder="请输入">
                <el-select
                  :disabled="!modifyFlanFlag"
                  v-model="ruleForm.type"
                  clearable
                  placeholder="请选择"
                  style="min-width:240px"
                >
                  <el-option
                    v-for="item in chooseOptions.planTypeOptions"
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
              <el-form-item label="项目类型" prop="projectType" placeholder="请输入">
                <el-select
                  :disabled="!modifyFlanFlag"
                  v-model="ruleForm.projectType"
                  clearable
                  placeholder="请选择"
                  style="min-width:240px"
                >
                  <el-option
                    v-for="item in chooseOptions.projectTypeOptions"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <!-- 第五行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="订单阶段" prop="orderStage" placeholder="请输入">
                <el-select
                  :disabled="!modifyFlanFlag"
                  v-model="ruleForm.orderStage"
                  clearable
                  placeholder="请选择"
                  style="min-width:240px"
                >
                  <el-option
                    v-for="item in chooseOptions.orderStageOptions"
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
              <el-form-item label="产品线" prop="productLine" placeholder="请输入">
                <el-select
                  :disabled="!modifyFlanFlag"
                  v-model="ruleForm.productLine"
                  clearable
                  placeholder="请选择"
                  style="min-width:240px"
                >
                  <el-option
                    v-for="item in chooseOptions.productLineOptions"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar" style="margin-left: 4px">
              <el-form-item label="周期" prop="cycle" placeholder="请输入">
                <el-input
                  v-model="ruleForm.cycle"
                  clearable
                  :rows="1"
                  placeholder="请输入"
                  :disabled="!modifyFlanFlag"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <!-- 第六行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="款数" prop="styleQuantity" placeholder="请输入">
                <el-input
                  v-model="ruleForm.styleQuantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="!modifyFlanFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="件数" prop="pieceQuantity" placeholder="请输入">
                <el-input
                  v-model="ruleForm.pieceQuantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="!modifyFlanFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="预测款数" prop="predictStyleQuantity" placeholder="请输入">
                <el-input
                  v-model="ruleForm.predictStyleQuantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="!modifyFlanFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <!-- 第七行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="预测件数" prop="predictPieceQuantity" placeholder="请输入">
                <el-input
                  v-model="ruleForm.predictPieceQuantity"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="!modifyFlanFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="13">
            <div class="bar">
              <el-form-item label="起止时间" prop="date" placeholder="请输入">
                <el-date-picker
                  :disabled="!modifyFlanFlag"
                  :picker-options="chooseOptions.pickerOptions0"
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
              <el-form-item label="计划建议" prop="proposal" placeholder="请输入">
                <el-input
                  :disabled="!modifyFlanFlag"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入"
                  v-model="ruleForm.proposal"
                  style="margin-left: 26px;width:900px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <div class="bar">
              <el-form-item label="计划描述" prop="description" placeholder="请输入">
                <el-input
                  :disabled="!modifyFlanFlag"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入"
                  v-model="ruleForm.description"
                  style="margin-left: 26px;width:900px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <div class="bar">
              <el-form-item label="计划备注" prop="note" placeholder="请输入">
                <el-input
                  :disabled="!modifyFlanFlag"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入"
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

      <!-- 悬浮按钮 -->
      <float-icons class="icons-warp">
        <!-- <div> -->
        <el-button icon="el-icon-arrow-up" @click="drawerVisible = true" type="primary">甘特图</el-button>
        <!-- </div> -->
      </float-icons>
      <!-- 抽屉 -->
      <el-drawer title="甘特图" size="60%" :visible.sync="drawerVisible" direction="btt">
        <el-card>
          <gantt-elastic
            :options="ganttOptions"
            :tasks="ganttTasks"
            @tasks-updated="tasksUpdate"
            @options-updated="optionsUpdate"
          >
            <gantt-header slot="header"></gantt-header>
          </gantt-elastic>
        </el-card>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";
import FloatIcons from "@/utils/floaticons";
import GanttElastic from "gantt-elastic";
import GanttHeader from "gantt-elastic-header";
import dayjs from "dayjs";

export default {
  // imported components
  components: {
    "float-icons": FloatIcons,
    GanttElastic,
    GanttHeader
  },
  data() {
    return {
      drawerVisible: false,
      fileOperationDialogVisible: false,
      alwaysGreyFlag: false,
      modifyFlanFlag: true,

      formData: "",
      endStr: "结束时间",
      startStr: "开始时间",

      chooseOptions: {
        planTypeOptions: {},
        projectTypeOptions: {},
        orderStageOptions: {},
        productLineOptions: {},
        // 起止时间
        pickerOptions0: {
          disabledDate: time => {
            var date = new Date();
            console.log(date.toLocaleDateString());
            return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
          }
        }
      },

      fileList: [],
      uploadFileName: [],
      uploadResult: [],

      flag: 1, //flag =  0的时候，为查看详情，flag = 1的时候，为添加修改之类的
      goback: "", //goback 为返回的 page name

      rules: {
        clientName: [{ required: true, message: "请输入", trigger: "blur" }],
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
      ruleForm: {
        brandId: 0,
        brandName: "无数据",
        clientId: 0,
        clientName: "无数据",
        clothesLevelName: "无数据",
        createTime: "2019-11-17T06:44:17.823Z",
        creatorId: 0,
        creatorName: "无数据",
        cycle: "无数据",
        date: "无数据",
        dateType: "无数据",
        deptName: "无数据",
        description: "无数据",
        endDate: "无数据",
        haveException: "无数据",
        id: 0,
        name: "无数据",
        note: "无数据",
        objectId: 0,
        objectName: "无数据",
        orderStage: "无数据",
        pieceQuantity: "无数据",
        planClass: "无数据",
        predictPieceQuantity: "无数据",
        predictStyleQuantity: "无数据",
        product: "无数据",
        productLine: "无数据",
        projectType: "无数据",
        proposal: "无数据",
        rootPlanId: 0,
        rootPlanName: "无数据",
        sequence: "无数据",
        serialNo: "无数据",
        seriesId: 0,
        seriesName: "无数据",
        startDate: "无数据",
        state: "无数据",
        styleQuantity: "无数据",
        superiorName: "无数据",
        type: "无数据"
      },

      // gantt related
      ganttTasks: [],
      ganttOptions: {}
    };
  },

  created() {
    var that = this;
    this.formData = new FormData();

    //获得项目类型下拉框
    request
      .get(`${window.$config.HOST}/backstage/project-type/find`)
      .then(response => {
        this.chooseOptions.projectTypeOptions = response.result;
      });
    //获取订单阶段下拉框
    request
      .get(`${window.$config.HOST}/backstage/order-stage/find`)
      .then(response => {
        this.chooseOptions.orderStageOptions = response.result;
      });
    //获得计划类型下拉框
    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "type"
        }
      })
      .then(response => {
        this.chooseOptions.planTypeOptions = response.result;
      });

    // 获得产品线下拉框
    request
      .get(`${window.$config.HOST2}/backstage/product-line/find`)
      .then(response => {
        this.chooseOptions.productLineOptions = response.result;
        console.log("产品线：", this.chooseOptions.productLineOptions);
      });
    // gantt related
    function getDate(hours) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      const timeStamp = new Date(
        currentYear,
        currentMonth,
        currentDay,
        0,
        0,
        0
      ).getTime();
      return new Date(timeStamp + hours * 60 * 60 * 1000).getTime();
    }
    this.ganttOptions = {
      taskMapping: {
        progress: "quantity"
      },
      maxRows: 100,
      maxHeight: 500,
      title: {
        label: "系列计划时间表",
        html: false
      },
      row: {
        height: 24
      },
      calendar: {
        hour: {
          display: true
        }
      },
      chart: {
        progress: {
          bar: false
        },
        expander: {
          display: true
        }
      },
      taskList: {
        expander: {
          straight: false
        },
        columns: [
          {
            id: 1,
            label: "系列计划",
            value: "name",
            width: 150,
            expander: true,
            html: true,
            events: {
              click({ data, column }) {
                console.log(data.id + "尝试跳转");
                if (data.isRoot) {
                  that.$router.push({
                    name: "subGantt",
                    params: { rangePlanid: data.id }
                  });
                } else {
                  this.$message({
                    message: data.name + "不是根计划",
                    type: "info"
                  });
                }
              }
            }
          },
          {
            id: 2,
            label: "创建人",
            value: "createrName",
            width: 80,
            html: true
          },
          {
            id: 3,
            label: "开始日期",
            // value: task => dayjs(task.start).format("YYYY-MM-DD"),
            value: "startDate",
            width: 78
          },
          {
            id: 4,
            label: "结束日期",
            // value: task => dayjs(task.start).format("YYYY-MM-DD"),
            value: "endDate",
            width: 78
          },
          {
            id: 5,
            label: "项目类型",
            value: "projectType",
            width: 70
          },
          {
            id: 6,
            label: "数量",
            value: "quantity",
            width: 50
          }
        ]
      },
      locale: {
        name: "en",
        Now: "回到现在",
        "X-Scale": "X-放大",
        "Y-Scale": "Y-放大",
        "Task list width": "侧边栏缩放",
        "Before/After": "放大",
        "Display task list": "侧边栏"
      }
    };
    this.ganttTasks = [
      {
        id: 1,
        label: "Make some noise",
        user:
          '<a href="https://www.google.com/search?q=John+Doe" target="_blank" style="color:#0077c0;">John Doe</a>',
        start: getDate(-24 * 5),
        duration: 15 * 24 * 60 * 60 * 1000,
        percent: 85,
        type: "project"
        //collapsed: true,
      },
      {
        id: 2,
        label: "With great power comes great responsibility",
        user:
          '<a href="https://www.google.com/search?q=Peter+Parker" target="_blank" style="color:#0077c0;">Peter Parker</a>',
        parentId: 1,
        start: getDate(-24 * 4),
        duration: 4 * 24 * 60 * 60 * 1000,
        percent: 50,
        type: "milestone",
        collapsed: true,
        style: {
          base: {
            fill: "#1EBC61",
            stroke: "#0EAC51"
          }
        }
      },
      {
        id: 3,
        label: "Courage is being scared to death, but saddling up anyway.",
        user:
          '<a href="https://www.google.com/search?q=John+Wayne" target="_blank" style="color:#0077c0;">John Wayne</a>',
        parentId: 2,
        start: getDate(-24 * 3),
        duration: 2 * 24 * 60 * 60 * 1000,
        percent: 100,
        type: "task"
      },
      {
        id: 4,
        label: "Put that toy AWAY!",
        user:
          '<a href="https://www.google.com/search?q=Clark+Kent" target="_blank" style="color:#0077c0;">Clark Kent</a>',
        start: getDate(-24 * 2),
        duration: 2 * 24 * 60 * 60 * 1000,
        percent: 50,
        type: "task",
        dependentOn: [3]
      },
      {
        id: 5,
        label:
          "One billion, gajillion, fafillion... shabadylu...mil...shabady......uh, Yen.",
        user:
          '<a href="https://www.google.com/search?q=Austin+Powers" target="_blank" style="color:#0077c0;">Austin Powers</a>',
        parentId: 4,
        start: getDate(0),
        duration: 2 * 24 * 60 * 60 * 1000,
        percent: 10,
        type: "milestone",
        style: {
          base: {
            fill: "#0287D0",
            stroke: "#0077C0"
          }
        }
      },
      {
        id: 6,
        label: "Butch Mario and the Luigi Kid",
        user:
          '<a href="https://www.google.com/search?q=Mario+Bros" target="_blank" style="color:#0077c0;">Mario Bros</a>',
        parentId: 5,
        start: getDate(24),
        duration: 1 * 24 * 60 * 60 * 1000,
        percent: 50,
        type: "task",
        collapsed: true,
        style: {
          base: {
            fill: "#8E44AD",
            stroke: "#7E349D"
          }
        }
      },
      {
        id: 7,
        label: "Devon, the old man wanted me, it was his dying request",
        user:
          '<a href="https://www.google.com/search?q=Knight+Rider" target="_blank" style="color:#0077c0;">Knight Rider</a>',
        parentId: 2,
        dependentOn: [6],
        start: getDate(24 * 2),
        duration: 4 * 60 * 60 * 1000,
        percent: 20,
        type: "task",
        collapsed: true
      },
      {
        id: 8,
        label: "Hey, Baby! Anybody ever tell you I have beautiful eyes?",
        user:
          '<a href="https://www.google.com/search?q=Johhny+Bravo" target="_blank" style="color:#0077c0;">Johhny Bravo</a>',
        parentId: 7,
        dependentOn: [7],
        start: getDate(24 * 3),
        duration: 1 * 24 * 60 * 60 * 1000,
        percent: 0,
        type: "task"
      },
      {
        id: 9,
        label:
          "This better be important, woman. You are interrupting my very delicate calculations.",
        user:
          '<a href="https://www.google.com/search?q=Dexter\'s+Laboratory" target="_blank" style="color:#0077c0;">Dexter\'s Laboratory</a>',
        parentId: 8,
        dependentOn: [8, 7],
        start: getDate(24 * 4),
        duration: 4 * 60 * 60 * 1000,
        percent: 20,
        type: "task",
        style: {
          base: {
            fill: "#8E44AD",
            stroke: "#7E349D"
          }
        }
      },
      {
        id: 10,
        label: "current task",
        user:
          '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
        start: getDate(24 * 5),
        duration: 24 * 60 * 60 * 1000,
        percent: 0,
        type: "task"
      },
      {
        id: 11,
        label: "test task",
        user:
          '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
        start: getDate(24 * 6),
        duration: 24 * 60 * 60 * 1000,
        percent: 0,
        type: "task"
      },
      {
        id: 12,
        label: "test task",
        user:
          '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
        start: getDate(24 * 7),
        duration: 24 * 60 * 60 * 1000,
        percent: 0,
        type: "task",
        parentId: 11
      },
      {
        id: 13,
        label: "test task",
        user:
          '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
        start: getDate(24 * 8),
        duration: 24 * 60 * 60 * 1000,
        percent: 0,
        type: "task"
      },
      {
        id: 14,
        label: "test task",
        user:
          '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
        start: getDate(24 * 9),
        duration: 24 * 60 * 60 * 1000,
        percent: 0,
        type: "task"
      },
      {
        id: 15,
        label: "test task",
        user:
          '<a href="https://www.google.com/search?q=Johnattan+Owens" target="_blank" style="color:#0077c0;">Johnattan Owens</a>',
        start: getDate(24 * 16),
        duration: 24 * 60 * 60 * 1000,
        percent: 0,
        type: "task"
      }
    ];
  },
  mounted() {
    const that = this;
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
        this.ruleForm.clientName = data.clientName;
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
        this.ruleForm.clientName = data.clientName;
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
        this.alwaysGreyFlag = false;
        this.ruleForm.planId = data.planId;
        this.ruleForm.clientName = data.clientName;
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
    },

    // gantt related
    tasksUpdate(tasks) {
      this.ganttTasks = tasks;
    },
    optionsUpdate(options) {
      this.ganttOptions = options;
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