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
          <span class="Mtitle" v-if="isCreatePlanFlag || isModifyPlanFlag">款式计划制定</span>
          <span class="Mtitle" v-else>款式计划详情</span>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="款式名称" prop="styleName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.styleName"
                  :rows="1"
                  placeholder="请选择"
                  :disabled="alwaysGreyFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="款号" prop="styleNumber" placeholder="请输入">
                <el-input
                  v-model="ruleForm.styleNumber"
                  :rows="1"
                  placeholder="请选择"
                  :disabled="alwaysGreyFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="系列名称" prop="seriesName" placeholder="请输入">
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
              <el-form-item label="客户" prop="clientName" placeholder="请输入">
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
              <el-form-item label="品牌" prop="brandName" placeholder="请输入">
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
              <el-form-item label="服装层次" prop="clothesLevelName" placeholder="请输入">
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
              <el-form-item label="波段编码" prop="rangeCode" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.rangeCode"
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
              <el-form-item label="项目类型" prop="projectType" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.projectType"
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
              <el-form-item label="订单阶段" prop="orderStage" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.orderStage"
                  clearable
                  :rows="1"
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="正式款数" prop="styleQuantity" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.styleQuantity"
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
              <el-form-item label="正式件数" prop="pieceQuantity" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.pieceQuantity"
                  clearable
                  :rows="1"
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="!isRootPlanFlag">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="根计划" prop="rootPlanName" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.rootPlanName"
                  clearable
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="上级计划" prop="superiorName" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.superiorName"
                  clearable
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划类型" prop="type" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.type"
                  clearable
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="!isCreatePlanFlag">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="创建人" prop="creatorName" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.creatorName"
                  clearable
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="创建时间" prop="createTime" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.createTime"
                  clearable
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="部门名称" prop="deptName" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.deptName"
                  clearable
                  placeholder="请输入"
                  style="min-width:240px"
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
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.name"
                  clearable
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="日期类型" prop="dateType" placeholder="请输入">
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
              <el-form-item label="日期" prop="date" placeholder="请输入">
                <el-date-picker
                  clearable
                  v-model="ruleForm.date"
                  type="date"
                  :disabled="!isRootPlanFlag || (!isModifyPlanFlag && !isCreatePlanFlag)"
                  placeholder="选择日期"
                  style="min-width:240px"
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
                  :start-placeholder="placeHolders.startStr"
                  :end-placeholder="placeHolders.endStr"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="4">
            <div class="bar">
              <el-form-item label="计划周期" prop="cycle" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model.number="ruleForm.cycle"
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

        <el-row :gutter="20" v-if="ruleForm.state=='已制定'||ruleForm.state=='已审核'">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="协商延迟" prop="extension" placeholder="请输入">
                <el-date-picker
                  clearable
                  v-model="ruleForm.extension"
                  type="date"
                  :disabled="alwaysGreyFlag"
                  placeholder="选择日期"
                  style="min-width:240px"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="13">
            <div class="bar">
              <el-form-item label="实际起止" prop="actualStartEndDate" placeholder="请输入">
                <el-date-picker
                  align="right"
                  :disabled="alwaysGreyFlag"
                  :picker-options="chooseOptions.pickerOptions0"
                  style="margin-left:20px"
                  v-model="ruleForm.actualStartEndDate"
                  type="daterange"
                  unlink-panels
                  range-separator="至"
                  :start-placeholder="placeHolders.actualStartStr"
                  :end-placeholder="placeHolders.actualEndStr"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="执行状态" prop="executionState" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model.number="ruleForm.executionState"
                  clearable
                  placeholder="请输入"
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
            :file-list="fileList"
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
            <el-table :data="uploadFileNameList" border style="width: 100%">
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
        <el-table :data="uploadResult" border style="width: 100%">
          <el-table-column prop="result" label="上传结果"></el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";
import dayjs from "dayjs";

export default {
  data() {
    return {
      isRootPlanFlag: false,
      alwaysGreyFlag: true,
      isModifyPlanFlag: false,
      isCreatePlanFlag: false,
      originRow: {},
      goback: null, //goback 为返回的 page name

      placeHolders: {
        startStr: "开始时间",
        endStr: "结束时间",
        actualStartStr: "开始时间",
        actualEndStr: "结束时间"
      },

      productLineShowProps: {
        label: "name",
        value: "name",
        checkStrictly: true
      },
      chooseOptions: {
        productOptions: [],
        dateTypeOptions: [],
        productLineOptions: [],
        inputPointOptions: [],
        // 起止时间
        pickerOptions0: {
          disabledDate: time => {
            var date = new Date();
            return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e6就是不可以选择今天的
          }
        }
      },

      // 表单数据
      formData: "",
      rules: {
        name: [{ required: true, message: "请输入", trigger: "change" }],
        product: [{ required: true, message: "请输入", trigger: "blur" }],
        productLine: [{ required: true, message: "请输入", trigger: "blur" }],
        note: [{ required: false, message: "请输入", trigger: "blur" }]
      },
      ruleForm: {
        styleName: "无数据",
        styleNumber: "无数据",
        seriesCode: "无数据",
        assignPlanType: "无数据",
        brandName: "无数据",
        clientName: "无数据",
        clothesLevelName: "无数据",
        createTime: "无数据",
        creatorName: "无数据",
        cycle: 0,
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
        productLine: "一号线",
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
        actualStartEndDate: []
      },

      // 文件操作
      fileList: [],
      uploadFileNameList: [],
      uploadResult: [],
      fileOperationDialogVisible: false
    };
  },

  created() {
    var that = this;
    this.formData = new FormData();

    // 获取产品选择项
    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "产品"
        }
      })
      .then(response => {
        that.chooseOptions.productOptions = response.result;
      });

    // 获取日期类型选择项
    request
      .get(`${window.$config.HOST}/backstage/dic-property/name`, {
        params: {
          categoryName: "日期类型"
        }
      })
      .then(response => {
        that.chooseOptions.dateTypeOptions = response.result;
      });

    //获得投入点
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "投入点"
        }
      })
      .then(response => {
        that.chooseOptions.inputPointOptions = response.result;
      });

    // 获得产品线下拉框
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
  mounted() {
    let that = this;
    that.init();
  },

  methods: {
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
    downloadRow(row) {
      request
        .get(`${window.$config.HOST}/plan-files/download`, {
          responseType: "blob",
          params: {
            planId: this.ruleForm.id,
            filename: row.fileName
          }
        })
        .then(response => {
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
    deleteFile(row) {
      request
        .delete(`${window.$config.HOST}/plan-files/delete`, {
          params: {
            planId: this.ruleForm.id,
            filename: row.fileName
          }
        })
        .then(response => {
          var i = 0;
          this.uploadFileNameList.forEach(element => {
            if (element.fileName === row.fileName) {
              this.uploadFileNameList.splice(i, 1);
            }
            i = i + 1;
          });
        })
        .catch(error => {});
    },
    uploadOK() {
      this.fileOperationDialogVisible = false;
      this.$router.push({
        name: this.goback ? this.goback : "planManagement",
        params: {}
      });
    },
    sigleFileUploadAction(item) {
      this.formData.append("file", item.file);
      console.log(item.file.name);

      this.formData.append("planId", this.ruleForm.id);
      this.formData.append("name", item.file.name);

      request
        .post(`${window.$config.HOST}/plan-files/insert`, this.formData)
        .then(response => {
          console.log("上传结果：", response.result);
        });
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
          console.log("点击添加计划按钮：");
          let that = this;
          that.ruleForm.startDate = that.changeDate(
            that.ruleForm.startEndDate[0]
          );
          that.ruleForm.endDate = that.changeDate(
            that.ruleForm.startEndDate[1]
          );

          console.log("产品线结果", that.ruleForm.productLine);
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

          console.log("添加plan的list: ", param);

          request
            .post(`${window.$config.HOST}/plan/insert`, param)
            .then(response => {
              that.ruleForm.id = response.result;
              console.log("添加成功:", that.ruleForm.id);

              // 上传文件
              this.$refs.upload.submit();

              this.$router.push({
                name: this.goback ? this.goback : "planManagement",
                params: {}
              });
            });
        } else {
          this.$message({
            message: "制定计划失败：请填入必要字段",
            type: "error"
          });
        }
      });
    },

    modifyPlanForm(formName) {
      //修改
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isRootPlanFlag) {
            var param = {
              id: this.ruleForm.id,
              startDate:
                this.ruleForm.startEndDate === undefined
                  ? this.ruleForm.startDate
                  : this.changeDate(this.ruleForm.startEndDate[0]),
              endDate:
                this.ruleForm.startEndDate === undefined
                  ? this.ruleForm.endDate
                  : this.changeDate(this.ruleForm.startEndDate[1]),
              date: this.changeDate(this.ruleForm.date),
              dateType: this.ruleForm.dateType,
              inputPoint: this.ruleForm.inputPoint
            };

            console.log("修改参数：", param);

            request
              .put(`${window.$config.HOST}/root-plan/update`, param)
              .then(response => {
                console.log("修改成功");

                this.originRow.startDate = param.startDate;
                this.originRow.endDate = param.endDate;
                this.originRow.date = param.date;
                this.originRow.dateType = param.dateType;
                this.originRow.inputPoint = param.inputPoint;

                this.$router.push({
                  name: this.goback ? this.goback : "planManagement",
                  params: {}
                });
              });
          } else {
            var param = {
              id: this.ruleForm.id,
              startDate:
                this.ruleForm.startEndDate === undefined
                  ? this.ruleForm.startDate
                  : this.changeDate(this.ruleForm.startEndDate[0]),
              endDate:
                this.ruleForm.startEndDate === undefined
                  ? this.ruleForm.endDate
                  : this.changeDate(this.ruleForm.startEndDate[1]),
              product: this.ruleForm.product,
              productLine:
                this.ruleForm.productLine instanceof Array
                  ? this.ruleForm.productLine[
                      this.ruleForm.productLine.length - 1
                    ]
                  : this.ruleForm.productLine,
              inputPoint: this.ruleForm.inputPoint,
              note: this.ruleForm.note
            };

            console.log("修改参数：", param);

            request
              .put(`${window.$config.HOST}/plan/update`, param)
              .then(response => {
                this.originRow.startDate = param.startDate;
                this.originRow.endDate = param.endDate;
                this.originRow.product = param.product;
                this.originRow.productLine = param.productLine;
                this.originRow.inputPoint = param.inputPoint;
                this.originRow.note = param.note;

                console.log("修改成功");

                this.$refs.upload.submit();

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
    cancelPlanForm() {
      this.$message({
        message: this.isModify || this.isCreate ? "取消制定！" : "返回",
        type: "info"
      });

      this.$router.push({
        name: this.goback ? this.goback : "planManagement",
        params: {}
      });
    },
    init() {
      /* 跳转至本页面的参数：
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
      console.log("开始处理页面跳转参数");
      let that = this;

      console.log("路由参数：", that.$route.params);

      if (Object.getOwnPropertyNames(that.$route.params).length != 0) {
        let data = that.$route.params;

        that.goback = data.goback; //goback 为返回页面的 name
        that.originRow = data.rowData; // 拷贝引用
        // 深拷贝变量，不然只是引用
        that.ruleForm = JSON.parse(JSON.stringify(data.rowData));

        if (data.isCreate) {
          that.isRootPlanFlag = false;
          that.isModifyPlanFlag = data.isModify;
          that.isCreatePlanFlag = data.isCreate;
        } else {
          that.isRootPlanFlag = data.isRoot;
          that.isModifyPlanFlag = data.isModify;
          that.isCreatePlanFlag = data.isCreate;

          // 获取计划的文件列表, 创建子计划时不能获取文件列表
          request
            .get(`${window.$config.HOST}/plan-files/find`, {
              params: { planId: data.rowData.id }
            })
            .then(response => {
              response.result.forEach(ele => {
                that.uploadFileNameList.push({ fileName: ele });
              });
            });
        }

        that.placeHolders.startStr = that.ruleForm.startDate;
        that.placeHolders.endStr = that.ruleForm.endDate;

        that.placeHolders.actualStartStr =
          that.ruleForm.actualStartDate === undefined
            ? that.placeHolders.actualStartStr
            : that.ruleForm.actualStartDate;
        that.placeHolders.actualEndStr =
          that.ruleForm.actualEndDate === undefined
            ? that.placeHolders.actualEndStr
            : that.ruleForm.actualEndDate;

        // 处理是添加子计划时相关属性更改的操作
        if (that.isCreatePlanFlag) {
          that.ruleForm.type = that.ruleForm.assignPlanType;
          that.ruleForm.superiorId = data.isRoot ? 0 : that.ruleForm.id;
          that.ruleForm.superiorName = that.ruleForm.name;

          if (that.ruleForm.rootPlanName != undefined) {
            that.ruleForm.cycle = undefined;
            that.ruleForm.productLine = undefined;
            that.ruleForm.product = undefined;
            that.ruleForm.extension = undefined;
            that.ruleForm.note = undefined;
            that.ruleForm.actualStartEndDate = undefined;
            that.ruleForm.actualStartDate = undefined;
            that.ruleForm.actualEndDate = undefined;
          }

          that.ruleForm.rootPlanName =
            that.ruleForm.rootPlanName === undefined
              ? that.ruleForm.name
              : that.ruleForm.rootPlanName;
          that.ruleForm.rootPlanId =
            that.ruleForm.rootPlanId === undefined
              ? that.ruleForm.id
              : that.ruleForm.rootPlanId;

          that.ruleForm.id = undefined;
          that.ruleForm.name = "";
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