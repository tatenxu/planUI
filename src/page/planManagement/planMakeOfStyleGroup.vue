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
        <!-- title -->
        <el-row :gutter="20">
          <span class="Mtitle" v-if="isCreatePlanFlag || isModifyPlanFlag">款式组计划制定</span>
          <span class="Mtitle" v-else>款式组计划详情</span>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="款式组名" prop="styleGroupName" placeholder="无数据">
                <el-input
                  v-model="ruleForm.styleGroupName"
                  :rows="1"
                  placeholder="请选择"
                  :disabled="alwaysGreyFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="系列名称" prop="seriesName" placeholder="无数据">
                <el-input
                  v-model="ruleForm.seriesName"
                  :rows="1"
                  placeholder="请选择"
                  :disabled="alwaysGreyFlag"
                  style="min-width:630px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="客户" prop="clientName" placeholder="无数据">
                <el-input
                  clearable
                  v-model="ruleForm.clientName"
                  :rows="1"
                  placeholder="请选择"
                  :disabled="alwaysGreyFlag"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="品牌" prop="brandName" placeholder="无数据">
                <el-input
                  v-model="ruleForm.brandName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="alwaysGreyFlag"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="服装层次" prop="clothesLevelName" placeholder="无数据">
                <el-input
                  v-model="ruleForm.clothesLevelName"
                  :rows="1"
                  placeholder="请选择"
                  :disabled="alwaysGreyFlag"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="波段编码" prop="rangeCode" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.rangeCode"
                  clearable
                  :rows="1"
                  placeholder="无数据"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="项目类型" prop="projectType" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.projectType"
                  clearable
                  :rows="1"
                  placeholder="无数据"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="订单阶段" prop="orderStage" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.orderStage"
                  clearable
                  :rows="1"
                  placeholder="无数据"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="正式款数" prop="styleQuantity" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.styleQuantity"
                  clearable
                  :rows="1"
                  placeholder="无数据"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="正式件数" prop="pieceQuantity" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.pieceQuantity"
                  clearable
                  :rows="1"
                  placeholder="无数据"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="!isRootPlanFlag">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="根计划" prop="rootPlanName" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.rootPlanName"
                  clearable
                  placeholder="无数据"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="上级计划" prop="superiorName" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.superiorName"
                  clearable
                  placeholder="无数据"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划类型" prop="type" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.type"
                  clearable
                  placeholder="无数据"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="!isCreatePlanFlag">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="创建人" prop="creatorName" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.creatorName"
                  clearable
                  placeholder="无数据"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="创建时间" prop="createTime" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.createTime"
                  clearable
                  placeholder="无数据"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="部门名称" prop="deptName" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.deptName"
                  clearable
                  placeholder="无数据"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划名称" prop="name" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.name"
                  clearable
                  placeholder="无数据"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="日期类型" prop="dateType" placeholder="无数据">
                <el-select
                  :disabled="!isRootPlanFlag || (!isModifyPlanFlag && !isCreatePlanFlag)"
                  v-model="ruleForm.dateType"
                  clearable
                >
                  <el-option
                    v-for="item in chooseOptions.dateTypeOptions"
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
              <el-form-item label="日期" prop="date" placeholder="无数据">
                <el-date-picker
                  clearable
                  v-model="ruleForm.date"
                  type="date"
                  :disabled="!isRootPlanFlag || (!isModifyPlanFlag && !isCreatePlanFlag)"
                  placeholder="选择日期"
                  style="min-width:240px"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="投入点" prop="inputPoint" placeholder="请输入">
                <el-select
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
                  v-model="ruleForm.inputPoint"
                  clearable
                >
                  <el-option
                    v-for="item in chooseOptions.inputPointOptions"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="10">
            <div class="bar">
              <el-form-item label="起止时间" prop="startEndDate" placeholder="请输入">
                <el-date-picker
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
                  :picker-options="chooseOptions.pickerOptions0"
                  style="margin-left:20px"
                  v-model="ruleForm.startEndDate"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  :start-placeholder="ruleForm.placeHolders.startStr"
                  :end-placeholder="ruleForm.placeHolders.endStr"
                  @change="startEndDateChange"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="4">
            <div class="bar">
              <el-form-item label="计划周期" prop="cycle" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model.number="cycleHelper"
                  clearable
                  placeholder="请输入"
                  style="min-width:140px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="!isRootPlanFlag">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="产品线" prop="productLine" placeholder="请输入">
                <el-cascader
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
                  clearable
                  v-model="ruleForm.productLine"
                  style="min-width:240px"
                  :options="chooseOptions.productLineOptions"
                  :props="productLineShowProps"
                ></el-cascader>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="产品" prop="product" placeholder="请输入">
                <el-select
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
                  v-model="ruleForm.product"
                  clearable
                >
                  <el-option
                    v-for="item in chooseOptions.productOptions"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8" v-if="(ruleForm.state=='已下发'||ruleForm.state=='已审核')">
            <div class="bar">
              <el-form-item label="协商延迟" prop="extension" placeholder="无数据">
                <el-date-picker
                  clearable
                  v-model="ruleForm.extension"
                  type="date"
                  :disabled="alwaysGreyFlag"
                  placeholder="选择日期"
                  style="min-width:240px"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>

          <el-col
            :span="13"
            v-if="!isRootPlanFlag && (ruleForm.state=='已下发'||ruleForm.state=='已审核')"
          >
            <div class="bar">
              <el-form-item label="实际起止" prop="actualStartEndDate" placeholder="无数据">
                <el-date-picker
                  align="right"
                  :disabled="alwaysGreyFlag"
                  :picker-options="chooseOptions.pickerOptions0"
                  style="margin-left:20px"
                  v-model="ruleForm.actualStartEndDate"
                  type="daterange"
                  unlink-panels
                  range-separator="至"
                  :start-placeholder="ruleForm.placeHolders.actualStartStr"
                  :end-placeholder="ruleForm.placeHolders.actualEndStr"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>

          <el-col
            :span="8"
            v-if="!isRootPlanFlag && (ruleForm.state=='已下发'||ruleForm.state=='已审核')"
          >
            <div class="bar">
              <el-form-item label="执行状态" prop="executionState" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model.number="ruleForm.executionState"
                  clearable
                  placeholder="无数据"
                  style="min-width:150px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="!isRootPlanFlag">
          <el-col :span="20">
            <div class="bar">
              <el-form-item label="计划备注" prop="note" placeholder="请输入">
                <el-input
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
                  type="textarea"
                  :rows="4"
                  placeholder="请输入"
                  v-model="ruleForm.note"
                  style="margin-left:20px;width:900px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="!isCreatePlanFlag && !isModifyPlanFlag">
          <el-col :span="20">
            <el-form-item label="总计划树"></el-form-item>
            <el-tree default-expand-all :data="ruleForm.allPlansData" :props="allPlansDefaultProps"></el-tree>
          </el-col>
        </el-row>

        <!-- 按钮行 -->
        <el-row :gutter="20">
          <el-col :span="20">
            <div class="Mbutton">
              <el-col :span="8" v-if="isCreatePlanFlag">
                <el-button type="primary" @click="savePlanForm('ruleForm')">添加</el-button>
              </el-col>
              <el-col :span="8" v-if="isModifyPlanFlag">
                <el-button type="primary" @click="modifyPlanForm('ruleForm')">修改</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="cancelPlanForm()">取消</el-button>
              </el-col>
            </div>
          </el-col>
        </el-row>

        <!-- 文件操作，根计划无此操作 -->
        <el-row :gutter="20">
          <el-upload
            ref="upload"
            v-if="isModifyPlanFlag || isCreatePlanFlag"
            action
            :file-list="ruleForm.fileList"
            :http-request="sigleFileUploadAction"
            multiple
            style="margin-left:11%"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <!-- 手动上传按钮 -->
            <!-- <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
            >上传到服务器</el-button>-->
          </el-upload>
        </el-row>
        <el-row :gutter="20">
          <el-col style="width:70%;margin-left:10%  ">
            <el-table :data="ruleForm.uploadFileNameList" border style="width: 100%">
              <el-table-column prop="fileName" label="已上传文件"></el-table-column>
              <el-table-column fixed="right" width="150" align="center" v-if="isModifyPlanFlag">
                <template slot-scope="scope">
                  <el-button @click="deleteFile(scope.row,scope.index)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                width="150"
                align="center"
                v-if="!isModifyPlanFlag && ! isCreatePlanFlag"
              >
                <template slot-scope="scope">
                  <el-button @click="downloadRow(scope.row)" type="text" size="small">下载</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>

      <el-dialog title :visible.sync="fileOperationDialogVisible" width="30%" :modal="false">
        <!-- <span>这是一段信息</span> -->
        <span slot="footer" class="dialog-footer">
          <span>修改上传文件请到修改计划页面中！</span>
          <el-button type="primary" @click="uploadOK">确 定</el-button>
        </span>
        <el-table :data="ruleForm.uploadResult" border style="width: 100%">
          <el-table-column prop="result" label="上传结果"></el-table-column>
        </el-table>
      </el-dialog>

      <el-dialog
        title="提示"
        :visible.sync="batchDialogVisible"
        width="30%"
        :before-close="batchDialogCancel"
        :modal="false"
      >
        <span>计划添加成功，是否继续添加下一个计划？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="batchDialogCancel">返回被下发计划管理</el-button>
          <el-button type="primary" @click="batchDialogContinue">继 续</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request"; // 导入封装的自定义的axios插件用于http请求
import dayjs from "dayjs";

export default {
  // 此页面需要用到的数据定义
  data() {
    return {
      cycleHelper: 0, // 周期自动计算变量，computed中监控该变量，随着选取的起止时间而变化
      isRootPlanFlag: false, // 当前计划是否是根计划，用于控制页面相关组件的显示和判断
      alwaysGreyFlag: true, // 是否一直禁用flag，用于控制页面相关标签元素是否禁用
      isModifyPlanFlag: false, // 是否在这个页面修改当前计划
      isCreatePlanFlag: false, //是否在这个页面创建新计划
      originRow: {}, // 保存路由传递过来的原始计划数据
      goback: null, //goback 为返回到跳转过来的页面的名称

      // GlobalControl用于在批量添加子计划时存储所有父计划的数据
      GlobalControl: {
        AllData: [], // 所有父计划
        CurrentIndex: 0 //当前批量添加子计划的索引，正在处理第几个子计划的父计划数据
      },

      fileOperationDialogVisible: false, // 控制显示文件操作提示对话框
      batchDialogVisible: false, //控制显示批量添加子计划的提示对话框

      /*
       用于指示el-cascader标签对数据的解析，将label和value都解析到给定数据的name属性
      el-cascader标签详情：https://element.eleme.cn/#/zh-CN/component/cascader
      */
      productLineShowProps: {
        label: "name",
        value: "name",
        checkStrictly: true
      },

      // 页面中的下拉选择器数据
      chooseOptions: {
        productOptions: [], // 产品选择器数据
        dateTypeOptions: [], //日期类型选择器数据
        productLineOptions: [], //产品线选择器数据
        inputPointOptions: [], //投入点选择器数据
        // 起止时间
        pickerOptions0: {
          disabledDate: time => {
            var date = new Date();
            return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
          }
        }
      },

      // 总计划树形控件数据解析，将给定数据的name属性解析为label属性
      allPlansDefaultProps: {
        children: "children",
        label: "name"
      },

      formData: "", // 文件操作表单变量
      // 表单中数据的限制条件
      rules: {
        // 产品必填
        product: [{ required: true, message: "请输入", trigger: "blur" }],
        //产品线必填
        productLine: [{ required: true, message: "请输入", trigger: "blur" }],

        startEndDate: [
          {
            required: false,
            message: "请输入",
            trigger: "blur"
          }
        ],
        // 输入点必填
        inputPoint: [{ required: true, message: "请输入", trigger: "blur" }]
      },

      // 表单中数据变量
      ruleForm: {
        date: "1970-01-01",
        seriesCode: "无数据",
        assignPlanType: "无数据",
        brandName: "无数据",
        clientName: "无数据",
        clothesLevelName: "无数据",
        createTime: "无数据",
        creatorName: "无数据",
        cycle: "0",
        dateType: "无数据",
        deptName: "无数据",
        haveException: "无数据",
        name: "无数据",
        note: "无数据",
        orderStage: "无数据",
        pieceQuantity: "无数据",
        informalPieceQuantity: "无数据",
        planClass: "无数据",
        predictPieceQuantity: "无数据",
        predictStyleQuantity: "无数据",
        product: "无数据",
        productLine: null,
        projectType: "无数据",
        rootPlanName: "无数据",
        seriesName: "无数据",
        styleQuantity: "无数据",
        informalStyleQuantity: "无数据",
        inputPoint: "无数据",
        superiorName: "无数据",
        type: "无数据",
        systemCode: "无数据",
        extension: "无数据",
        executionState: "无数据",
        startEndDate: [],
        defaultStartEndDate: ["2020-02-15", "2020-02-16"],
        actualStartEndDate: ["1970-01-01", "1970-01-01"],

        fileList: [],
        uploadResult: [],
        uploadFileNameList: [],

        placeHolders: {
          startStr: "开始时间",
          endStr: "结束时间",
          actualStartStr: "开始时间",
          actualEndStr: "结束时间"
        },

        allPlansData: []
      }
    };
  },

  created() {
    var that = this; //引用
    this.formData = new FormData(); // 创建新表单

    //产品选择器数据下拉框数据加载，接口格式见接口文档
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "产品"
        }
      })
      .then(response => {
        that.chooseOptions.productOptions = response.result;
      });

    //日期类型选择器数据下拉框数据加载，接口格式见接口文档
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "日期类型"
        }
      })
      .then(response => {
        that.chooseOptions.dateTypeOptions = response.result;
      });

    //投入点选择器数据下拉框数据加载，接口格式见接口文档
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "投入点"
        }
      })
      .then(response => {
        that.chooseOptions.inputPointOptions = response.result;
      });

    /*
    产品线选择器数据下拉框数据加载，接口格式见接口文档。
    首先通过/me接口获取操作人的信息，然后获取该用户的产品线信息
    */
    request.get(`${window.$config.HOST2}/product-line/find`).then(response => {
      // that.chooseOptions.productLineOptions = response.result;
      request.get(`/me`).then(response => {
        response.result.productLines.forEach(ele => {
          that.chooseOptions.productLineOptions.push({
            name: ele,
            id: 0,
            children: null
          });
        });
      });
    });
  },

  // vue mounted 生命周期，调用init（）函数解析路由参数
  mounted() {
    let that = this;
    that.init(); // 解析路由参数
  },

  watch: {
    // 监控cyceHelper变量，通过更新cycleHelper值，动态更新页面中周期的值
    cycleHelper: function(val) {
      this.ruleForm.cycle = val;
    }
  },

  methods: {
    /*
    起止时间el-date-picker标签的日期选择改变触发函数，当起止时间该改变时，更新受监控的cycleHelper，
    这样就可以动态更新页面中的周期值
    */
    startEndDateChange() {
      console.log("起止时间改变：", this.ruleForm.startEndDate);

      // 判断是否是清空了el-data-picker的值，是则将父计划的起始值付给当前计划，否则就根据新选择的值更新当前计划的值
      if (this.ruleForm.startEndDate === null) {
        this.ruleForm.startDate = this.ruleForm.placeHolders.startStr;
        this.ruleForm.endDate = this.ruleForm.placeHolders.endStr;
      } else {
        this.ruleForm.startDate = this.ruleForm.startEndDate[0];
        this.ruleForm.endDate = this.ruleForm.startEndDate[1];
      }

      // 根据选择的起始时间得到js对象并计算相差的天数并赋值给cycleHelper
      var dateStart = new Date(this.ruleForm.startDate);
      var dateEnd = new Date(this.ruleForm.endDate);
      var difValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
      this.cycleHelper = difValue;
    },

    // dfs禁用，废弃
    dfsDisable(node, plArr) {
      if (plArr.indexOf(node.name) == -1) {
        node.disabled = true;
      } else {
        node.disabled = false;
      }
      if (node.children != null) {
        node.children.forEach(ele => {
          this.dfsDisable(ele, plArr);
        });
      }
    },

    // 下载文件按钮点击的响应函数
    downloadRow(row) {
      // /plan-files/download接口下载文件，接口详情查阅接口文档
      request
        .get(`/plan-files/download`, {
          responseType: "blob",
          params: {
            planId: this.ruleForm.id, // 当前计划的id
            filename: row.fileName //要下载的文件名
          }
        })
        .then(response => {
          // 将文件存储下来
          let content = response;
          let blob = new Blob([content]);
          let fileName = row.fileName;
          console.log("存储：", fileName);
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
        });
    },

    // 删除文件按钮点击的响应函数
    deleteFile(row) {
      // /plan-files/delete接口删除文件，接口详情参阅接口文档
      request
        .delete(`/plan-files/delete`, {
          params: {
            planId: this.ruleForm.id, // 当前计划的id
            filename: row.fileName // 要删除的文件名
          }
        })
        .then(response => {
          // 删除成功后，在本地将此计划的附件列表中删除已经删除的那个附件名
          var i = 0;
          this.ruleForm.uploadFileNameList.forEach(element => {
            if (element.fileName === row.fileName) {
              this.ruleForm.uploadFileNameList.splice(i, 1);
            }
            i = i + 1;
          });
        })
        .catch(error => {});
    },

    // 修改文件提示对话框确定按钮的响应函数，正确逻辑下批量添加子计划永远不会触发这个修改时才会有的函数，所以下方逻辑是有点复杂冗余的
    uploadOK() {
      // 关闭对话框
      this.ruleForm.fileOperationDialogVisible = false;

      /* 
      后续操作划分为四种判断：
        如果现在是批量添加子计划并且是最后一个要添加的子计划：所有批量添加成功，返回计划制定跳转至本页面的原始页面
        如果现在是批量添加子计划并且不是最后一个要添加的子计划：弹出批量添加对话框，提示进行下一个计划添加
        如果不是批量添加子计划，则返回计划制定页面planManagement
      */
      if (this.isBatched) {
        if (
          this.GlobalControl.CurrentIndex == this.GlobalControl.AllData.length
        ) {
          this.$message({
            message: "所有子计划添加成功！",
            type: "success"
          });
          this.$router.push({
            name: this.goback ? this.goback : "planManagement",
            params: {}
          });
        } else {
          this.batchDialogVisible = true;
        }
      } else {
        this.$router.push({
          name: this.goback ? this.goback : "planManagement",
          params: {}
        });
      }
    },

    // 针对新增每个附件上传的操作，el-upload组件详情：https://element.eleme.cn/#/zh-CN/component/upload
    sigleFileUploadAction(item) {
      this.formData.append("file", item.file); //在表单数据中添加文件内容
      console.log(item.file.name);

      this.formData.append("planId", this.ruleForm.id); // 表单中添加当前计划的id
      this.formData.append("name", item.file.name); // 表单中添加附件名

      // /plan-files/insert接口新增附件，接口详情参阅接口文档
      request.post(`/plan-files/insert`, this.formData).then(response => {
        console.log("上传结果：", response.result);
      });
    },

    // 添加子计划按钮响应函数
    savePlanForm(formName) {
      // 先验证表单数据是否符合要求
      this.$refs[formName].validate(valid => {
        // 如果有效则进行操作，否则提示表单数据有误
        if (valid) {
          let that = this; // 引用

          // 根据表单哪痛构造/plan/insert接口的参数，接口详情参阅接口文档
          var param = {
            name: that.ruleForm.name,
            type: that.ruleForm.type,
            rootPlanId: that.ruleForm.rootPlanId,
            superiorId: that.ruleForm.superiorId,
            inputPoint: that.ruleForm.inputPoint,
            productLine:
              that.ruleForm.productLine[that.ruleForm.productLine.length - 1],
            product: that.ruleForm.product,
            note: that.ruleForm.note,

            startDate: that.ruleForm.startDate,
            endDate: that.ruleForm.endDate
          };

          // /plan/insert接口添加子计划
          request.post(`/plan/insert`, param).then(response => {
            // 如果成功则获取到刚新增计划的id
            that.ruleForm.id = response.result;
            // 计划新增成功后，才能根据上面的新计划id上传其附件，调用submit函数上传附件
            this.$refs.upload.submit();

            /* 
            如果当前是批量添加子计划，则当前这个子计划添加成功，开始下一个要添加的子计划
            否则当前子计划添加成功，返回跳转至本页面的原始页面
            */
            if (this.isBatched) {
              /*
               判断是否是批量添加的最后一个了，
               如果是则提示所有子计划添加成功并返回跳转至本页面的原始页面，
               否则弹出批量添加子计划提示对话框，让用户选择后续操作
               */
              if (
                this.GlobalControl.CurrentIndex ==
                this.GlobalControl.AllData.length
              ) {
                this.$message({
                  message: "所有子计划添加成功！",
                  type: "success"
                });
                // 返回planManagement
                this.$router.push({
                  name: this.goback ? this.goback : "planManagement",
                  params: {}
                });
              } else {
                this.batchDialogVisible = true; //弹出批量添加子计划提示对话框，让用户选择后续操作
              }
            } else {
              //返回跳转至本页面的原始页面
              this.$router.push({
                name: this.goback ? this.goback : "planManagement",
                params: {}
              });
            }
          });
        } else {
          this.$message({
            message: "制定计划失败：请填入必要字段",
            type: "error"
          });
        }
      });
    },

    // 修改计划按钮响应函数
    modifyPlanForm(formName) {
      // 首先验证表单数据
      this.$refs[formName].validate(valid => {
        // 如果有效则进行操作，否则提示表单数据有误
        if (valid) {
          // 根据isRootPlanFlag调用不同接口，根计划--/root-plan/update；普通计划--/plan/update
          if (this.isRootPlanFlag) {
            // 构造参数，接口详情参阅接口文档
            var param = {
              id: this.ruleForm.id,
              startDate: this.ruleForm.startDate,
              endDate: this.ruleForm.endDate,
              date: this.ruleForm.date,
              dateType: this.ruleForm.dateType,
              inputPoint: this.ruleForm.inputPoint,
              superiorId: this.ruleForm.superiorId
            };

            // 调用/root-plan/update接口
            request.put(`/root-plan/update`, param).then(response => {
              // 如果更新成功，则将原始计划数据开始日期，结束日期，日期，日期类型和投入点字段在本地更新
              this.originRow.startDate = param.startDate;
              this.originRow.endDate = param.endDate;
              this.originRow.date = param.date;
              this.originRow.dateType = param.dateType;
              this.originRow.inputPoint = param.inputPoint;

              // 返回跳转至本页面的原始页面
              this.$router.push({
                name: this.goback ? this.goback : "planManagement",
                params: {}
              });
            });
          } else {
            // /plan/update,   构造参数，接口详情参阅接口文档
            var param = {
              id: this.ruleForm.id,
              rootPlanId: this.ruleForm.rootPlanId,
              startDate: this.ruleForm.startDate,
              endDate: this.ruleForm.endDate,
              product: this.ruleForm.product,
              // 判断productLine的合法性
              productLine:
                this.ruleForm.productLine instanceof Array
                  ? this.ruleForm.productLine[
                      this.ruleForm.productLine.length - 1
                    ]
                  : this.ruleForm.productLine,
              inputPoint: this.ruleForm.inputPoint,
              note: this.ruleForm.note,
              superiorId: this.ruleForm.superiorId
            };

            // 调用/plan/update接口
            request.put(`/plan/update`, param).then(response => {
              // 如果更新成功，则将原始计划数据开始日期，结束日期，产品，产品线，备注和投入点字段在本地更新
              this.originRow.startDate = param.startDate;
              this.originRow.endDate = param.endDate;
              this.originRow.product = param.product;
              this.originRow.productLine = param.productLine;
              this.originRow.inputPoint = param.inputPoint;
              this.originRow.note = param.note;

              // 更新字段成功后，调用submit函数，如果有新增的附件等，则在这个函数中上传
              this.$refs.upload.submit();

              // 返回跳转至本页面的原始页面
              this.$router.push({
                name: this.goback ? this.goback : "planManagement",
                params: {}
              });
            });
          }
        } else {
          this.$message({
            message: "修改计划失败：请填入必要信息",
            type: "error"
          });
        }
      });
    },

    // 取消按钮响应函数
    cancelPlanForm() {
      // 如果是修改或者新增计划，则提示然后返回跳转至本页面的原始页面
      this.$message({
        message: this.isModify || this.isCreate ? "取消制定！" : "返回",
        type: "info"
      });

      this.$router.push({
        name: this.goback ? this.goback : "planManagement",
        params: {}
      });
    },

    // 批量添加子计划对话框的取消按钮的响应函数
    batchDialogCancel() {
      // 提示取消制定
      this.$message({
        message: "取消制定！",
        type: "info"
      });

      // 返回跳转至本页面的原始页面
      this.$router.push({
        name: this.goback ? this.goback : "planManagement",
        params: {}
      });
    },

    // 批量添加子计划对话框的继续按钮的响应函数
    batchDialogContinue() {
      this.processOnePlanData(); // 处理批量添加的下一条父计划的数据
      this.batchDialogVisible = false; // 关闭对话框
    },

    // 加载当前计划的总计划树数据，/root-plan/tree或/plan/tree接口详情参阅接口文档
    getPlanTreeData(idArg) {
      let list = {
        id: idArg
      };

      //根据isRootPlanFlag调用不同的接口
      if (this.isRootPlanFlag) {
        request
          .get(`/root-plan/tree`, {
            params: list
          })
          .then(response => {
            this.ruleForm.allPlansData = [response.result]; //将返回的计划树数据存储在this.ruleForm.allPlansData中
          });
      } else {
        request
          .get(`/plan/tree`, {
            params: list
          })
          .then(response => {
            this.ruleForm.allPlansData = [response.result]; //将返回的计划树数据存储在this.ruleForm.allPlansData中
          });
      }
    },

    // 批量添加子计划时，处理下一条父计划数据的函数
    processOnePlanData() {
      let that = this;

      // console.log(that.GlobalControl.AllData[that.GlobalControl.CurrentIndex]);

      that.ruleForm = undefined; //清空当前页面各种标签的数据
      // 深拷贝父计划数据变量，不然只是引用
      that.ruleForm = JSON.parse(
        JSON.stringify(
          that.GlobalControl.AllData[that.GlobalControl.CurrentIndex]
        )
      );

      this.formData = new FormData(); //创建新的表单
      this.ruleForm.fileList = []; //清空附件列表
      // 非创建子计划时获取计划文件列表
      if (!that.isCreatePlanFlag) {
        // 获取计划的文件列表, 创建子计划时不能获取文件列表，接口参阅接口文档
        request
          .get(`/plan-files/find`, {
            params: { planId: that.ruleForm.id }
          })
          .then(response => {
            // 将返回的附件列表数据压入ruleForm.uploadFileNameList中
            that.ruleForm.uploadFileNameList = [];
            response.result.forEach(ele => {
              that.ruleForm.uploadFileNameList.push({ fileName: ele });
            });
          });
      }

      // ruleForm.placeHolders用于在输入子计划的起始时间时提示父计划的起始时间
      that.ruleForm.placeHolders = {
        startStr: that.ruleForm.startDate,
        endStr: that.ruleForm.endDate
      };
      // 新创建的子计划继承父计划的extension（协商延迟）
      that.ruleForm.extension =
        that.ruleForm.extension === null ? "无数据" : that.ruleForm.extension;

      // 如果父计划的起始时间或者实际起始时间为空或者未定义，则新增子计划的实际起始时间未定义，否则继承父计划的实际起始时间
      if (
        that.ruleForm.actualStartDate === null ||
        that.ruleForm.actualStartDate === undefined ||
        that.ruleForm.actualEndDate === null ||
        that.ruleForm.actualEndDate === undefined
      ) {
        that.ruleForm.actualStartEndDate = undefined;
      } else {
        that.ruleForm.actualStartEndDate = [
          that.ruleForm.actualStartDate,
          that.ruleForm.actualEndDate
        ];
      }

      // 自动计算周期
      var dateStart = new Date(that.ruleForm.startDate);
      var dateEnd = new Date(that.ruleForm.endDate);
      var difValue = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
      that.cycleHelper = difValue;

      // 查看时加载计划树
      if (!that.isCreatePlanFlag && !that.isModifyPlanFlag) {
        that.getPlanTreeData(that.ruleForm.id);
      }

      // 处理是添加子计划时相关属性更改的操作
      if (that.isCreatePlanFlag) {
        that.ruleForm.type = that.ruleForm.assignPlanType; //子计划的类型为父计划的下发计划类型
        //子计划的上级计划id：如果父计划是根计划，则为0，否则为当前计划的id
        that.ruleForm.superiorId = that.originalDataIsRoot
          ? 0
          : that.ruleForm.id;
        // 子计划的上计划名为当前的这个父计划名
        that.ruleForm.superiorName = that.ruleForm.name;

        // 如果新增子计划的父计划的根计划名已定义，则更新新增子计划的周期为0，产品线，产品，备注和输入点为未定义
        if (that.ruleForm.rootPlanName != undefined) {
          that.ruleForm.cycle = 0;
          that.ruleForm.productLine = undefined;
          that.ruleForm.product = undefined;
          that.ruleForm.note = undefined;
          that.ruleForm.inputPoint = undefined;
        }

        // 如果新增子计划的父计划的根计划名未定义，则新增子计划的根计划名为当前这个父计划名，否则继承当前父计划的根计划名
        that.ruleForm.rootPlanName =
          that.ruleForm.rootPlanName === undefined
            ? that.ruleForm.name
            : that.ruleForm.rootPlanName;
        // 如果新增子计划的父计划的根计划id未定义，则新增子计划的根计划id为当前这个父计划id，否则继承当前父计划的根计划id
        that.ruleForm.rootPlanId =
          that.ruleForm.rootPlanId === undefined
            ? that.ruleForm.id
            : that.ruleForm.rootPlanId;

        that.ruleForm.id = undefined; //当前新增子计划的id还是空的

        // 当是新增计划时，则起始时间字段在表单中是必填的
        that.rules.startEndDate = [
          {
            required: true,
            message: "请输入",
            trigger: "blur"
          }
        ];

        // 根据规则自动生成计划名 = 品牌名+波段+订单阶段+款式组名+下发计划类型
        that.ruleForm.name =
          that.ruleForm.brandName +
          that.ruleForm.rangeCode +
          that.ruleForm.orderStage +
          that.ruleForm.styleGroupName +
          that.ruleForm.assignPlanType;
      }

      // 当前批量处理的父计划数据完成，CurrentIndex指向批量数据中下一条要处理的数据
      that.GlobalControl.CurrentIndex++;
    },

    /* 
    init函数解析本页面加载时传递过来的路由参数
    新建窗口（query） / 跳转至本页面的参数：
        ? {
        ?   name: "this page's router name",
        ?   params: {
        ?     goback: source page name
        ?     isRoot: boolean,
        ?     isModify: boolean,
        ?     isCreate: boolean,
        ?     rowData: the choosen row data
        ?   }
        ? }
    */
    init() {
      console.log("开始处理页面跳转参数");
      let that = this;

      // 确认有路由参数
      if (Object.getOwnPropertyNames(that.$route.params).length != 0) {
        console.log("路由params参数：", that.$route.params);
        let data = that.$route.params; // 引用路由参数

        that.goback = data.goback; //goback存储源页面名称
        that.originalDataIsRoot = data.isRoot; // 拷贝--是否传递过来的原始计划是根计划
        that.isModifyPlanFlag = data.isModify; // 拷贝--是否传递过来的计划要进行修改操作
        that.isCreatePlanFlag = data.isCreate; // 拷贝--是否传递过来的计划要进行添加操作

        // 如果是要添加数据，则当前页面的ruleForm表示的是新增计划的数据，则其不是根计划，否则不是新增数据，则当前数据是否是根计划直接拷贝isRoot属性
        if (data.isCreate) {
          that.isRootPlanFlag = false;
        } else {
          that.isRootPlanFlag = data.isRoot;
        }

        // 判断是否是要批量添加数据
        if (data.isBatch === undefined) {
          that.isBatched = false; //在页面中存储不是批量添加
          that.originRow = data.rowData; // 引用原始计划数据

          that.GlobalControl.AllData = [data.rowData]; //则所有数据只有一个
          that.GlobalControl.CurrentIndex = 0; //当前处理第一个数据
          that.GlobalControl.AllDataLength = 1; //长度为1
        } else {
          that.isBatched = true; //在页面是要进行批量添加操作

          that.GlobalControl.AllData = data.batchData; // 引用所有的批量父数据
          that.GlobalControl.CurrentIndex = 0; //当前要处理第一条父计划数据
        }

        this.processOnePlanData(); //依次开处理所有数据
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
  font-size: 4ch;
}
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 1200px;

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
        min-width: 240px;
        margin-left: 20px;
      }
      .el-select {
        width: 70%;
        min-width: 240px;
        margin-left: 20px;
      }
      .el-cascader {
        width: 70%;
        min-width: 240px;
        margin-left: 20px;
      }
    }
  }
}
</style>