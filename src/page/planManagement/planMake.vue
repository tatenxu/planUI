<template>
  <div class="body">
    <el-backtop target=".body"></el-backtop>

    <el-card class="box-card">
      <!-- 根计划 -->
      <el-form
        v-if="isRootPlanFlag"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- title -->
        <el-row :gutter="20">
          <span class="Mtitle" v-if="isCreatePlanFlag || isModifyPlanFlag">计划制定</span>
          <span class="Mtitle" v-else>计划详情</span>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="客户名称" prop="clientName" placeholder="请输入">
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
              <el-form-item label="品牌名称" prop="brandName" placeholder="请输入">
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
              <el-form-item label="系列名称" prop="seriesName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.seriesName"
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
              <el-form-item label="系统编码" prop="systemCode" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.systemCode"
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
              <el-form-item label="计划对象" prop="objectName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.objectName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="alwaysGreyFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划类别" prop="planClass" placeholder="请输入">
                <el-input
                  v-model="ruleForm.planClass"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="alwaysGreyFlag"
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
              <el-form-item label="输入点" prop="inputPoint" placeholder="请输入">
                <el-input
                  v-model="ruleForm.inputPoint"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="alwaysGreyFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="预测款数" prop="predictStyleQuantity" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.predictStyleQuantity"
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
              <el-form-item label="预测件数" prop="predictPieceQuantity" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.predictPieceQuantity"
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
              <el-form-item label="款数" prop="styleQuantity" placeholder="请输入">
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
              <el-form-item label="件数" prop="pieceQuantity" placeholder="请输入">
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

        <!-- 可修改行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划名称" prop="name" placeholder="请输入">
                <el-input
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
                  v-model="ruleForm.name"
                  clearable
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="13">
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
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar" style="margin-left: 0px">
              <el-form-item label="日期类型" prop="dateType" placeholder="请输入">
                <el-select
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
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
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
                  placeholder="选择日期"
                  style="min-width:240px"
                ></el-date-picker>
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
      </el-form>

      <!-- 普通计划 -->
      <el-form
        v-else
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- title -->
        <el-row :gutter="20">
          <span class="Mtitle" v-if="isCreatePlanFlag || isModifyPlanFlag">计划制定</span>
          <span class="Mtitle" v-else>计划详情</span>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="客户名称" prop="clientName" placeholder="请输入">
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
              <el-form-item label="品牌名称" prop="brandName" placeholder="请输入">
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
              <el-form-item label="系列名称" prop="seriesName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.seriesName"
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
              <el-form-item label="系统编码" prop="systemCode" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.systemCode"
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
              <el-form-item label="计划对象" prop="objectName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.objectName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="alwaysGreyFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划类别" prop="planClass" placeholder="请输入">
                <el-input
                  v-model="ruleForm.planClass"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="alwaysGreyFlag"
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
                  :rows="1"
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="根计划" prop="rootPlanName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.rootPlanName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="alwaysGreyFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="上级计划" prop="superiorName" placeholder="请输入">
                <el-input
                  v-model="ruleForm.superiorName"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="alwaysGreyFlag"
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
              <el-form-item label="输入点" prop="inputPoint" placeholder="请输入">
                <el-input
                  v-model="ruleForm.inputPoint"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                  :disabled="alwaysGreyFlag"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar" style="margin-left: 0px">
              <el-form-item label="日期类型" prop="dateType" placeholder="请输入">
                <el-select :disabled="alwaysGreyFlag" v-model="ruleForm.dateType" clearable>
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
                  :disabled="alwaysGreyFlag"
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
              <el-form-item label="预测款数" prop="predictStyleQuantity" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.predictStyleQuantity"
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
              <el-form-item label="预测件数" prop="predictPieceQuantity" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.predictPieceQuantity"
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
              <el-form-item label="款数" prop="styleQuantity" placeholder="请输入">
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
              <el-form-item label="件数" prop="pieceQuantity" placeholder="请输入">
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

        <!-- 添加和修改时不显示的行 -->
        <el-row :gutter="20" v-if="!(isModifyPlanFlag||isCreatePlanFlag)">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划编号" prop="serialNo" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.serialNo"
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
              <el-form-item label="下发类型" prop="assignPlanType" placeholder="无数据">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.assignPlanType"
                  clearable
                  :rows="1"
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <!-- 添加和修改时不显示的行 -->
        <el-row :gutter="20" v-if="!(isModifyPlanFlag||isCreatePlanFlag)">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="部门名称" prop="deptName" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.deptName"
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
              <el-form-item label="创建人" prop="creatorName" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.creatorName"
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
              <el-form-item label="创建时间" prop="createTime" placeholder="请输入">
                <el-input
                  :disabled="alwaysGreyFlag"
                  v-model="ruleForm.createTime"
                  clearable
                  :rows="1"
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <!-- 可修改行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="计划名称" prop="name" placeholder="请输入">
                <el-input
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
                  v-model="ruleForm.name"
                  clearable
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="13">
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
        </el-row>

        <!-- 可修改行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="周期" prop="cycle" placeholder="请输入">
                <el-input
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
                  v-model.number="ruleForm.cycle"
                  clearable
                  placeholder="请输入"
                  style="min-width:240px"
                ></el-input>
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
        </el-row>

        <!-- 可修改行 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="bar" style="margin-left: 4px">
              <el-form-item label="协商延迟" prop="extension" placeholder="请输入">
                <el-date-picker
                  clearable
                  v-model="ruleForm.extension"
                  type="date"
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
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
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
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
        </el-row>

        <el-row :gutter="20">
          <el-col :span="20">
            <div class="bar">
              <el-form-item label="计划建议" prop="proposal" placeholder="请输入">
                <el-input
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
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
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
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
                  :disabled="!isModifyPlanFlag && !isCreatePlanFlag"
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

        <!-- 文件操作 -->
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
        <el-button icon="el-icon-arrow-up" @click="ganttVisualButtonClick" type="primary">甘特图</el-button>
        <!-- </div> -->
      </float-icons>
      <!-- 抽屉 -->
      <el-drawer title="甘特图" size="60%" :visible.sync="ganttDrawerVisible" direction="btt">
        <el-card>
          <gantt-elastic
            :options="ganttOptions"
            :tasks="ganttTasks"
            @tasks-updated="ganttTaskUpdate"
            @options-updated="ganttOptionsUpdate"
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
      isRootPlanFlag: true,
      alwaysGreyFlag: true,
      isModifyPlanFlag: false,
      isCreatePlanFlag: false,
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
        planTypeOptions: [],
        orderStageOptions: [],
        productOptions: [],
        dateTypeOptions: [],
        productLineOptions: [],
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
        startEndDate: [{ required: true, message: "请输入", trigger: "blur" }],
        cycle: [
          {
            type: "number",
            required: true,
            message: "周期应为整数",
            trigger: "blur"
          }
        ],
        product: [{ required: true, message: "请输入", trigger: "blur" }],
        productLine: [{ required: true, message: "请输入", trigger: "blur" }],
        extension: [{ required: false, message: "请输入", trigger: "blur" }],
        actualStartEndDate: [
          { required: false, message: "请输入", trigger: "blur" }
        ],
        proposal: [{ required: true, message: "请输入", trigger: "blur" }],
        description: [{ required: true, message: "请输入", trigger: "blur" }],
        note: [{ required: false, message: "请输入", trigger: "blur" }]
      },
      ruleForm: {
        assignPlanType: "无数据",
        brandName: "无数据",
        clientName: "无数据",
        clothesLevelName: "无数据",
        createTime: "2019-11-17T06:44:17.823Z",
        creatorName: "无数据",
        cycle: "无数据",
        dateType: "无数据",
        deptName: "无数据",
        description: "无数据",
        haveException: "无数据",
        name: "无数据",
        note: "无数据",
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
        rootPlanName: "无数据",
        serialNo: "无数据",
        seriesName: "无数据",
        styleQuantity: "无数据",
        superiorName: "无数据",
        type: "无数据",
        systemCode: "无数据",
        creator: "无数据",
        extension: "无数据",
        startEndDate: [],
        actualStartEndDate: []
      },

      // 文件操作
      fileList: [],
      uploadFileNameList: [],
      uploadResult: [],
      fileOperationDialogVisible: false,

      // 甘特图
      ganttWatch: {
        ganttWatchPlanNameOrigin: "",
        ganttWatchPlanStartDateOrigin: "",
        ganttWatchPlanEndDateOrigin: ""
      },
      ganttDrawerVisible: false,
      ganttTasks: [],
      ganttOptions: {
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
            display: false
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
              label: "计划名称",
              value: "name",
              width: 150,
              expander: true,
              html: true,
              events: {
                click({ data, column }) {
                  console.log(data.id + "尝试跳转");
                }
              }
            },
            {
              id: 2,
              label: "创建人",
              value: "creatorName",
              width: 80,
              html: true
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
      }
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

    // 获得产品线下拉框
    request.get(`${window.$config.HOST2}/product-line/find`).then(response => {
      that.chooseOptions.productLineOptions = response.result;
    });
  },
  mounted() {
    let that = this;
    that.init();

    // gantt related
    function ganttGetDate(hours) {
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
    request
      .get(`${window.$config.HOST}/root-plan/find-gantt`, {
        params: {
          id: this.isRootPlanFlag ? this.ruleForm.id : this.ruleForm.rootPlanId
        }
      })
      .then(response => {
        this.ganttTasks = [];
        // console.log(response.data);
        response.result.forEach(element => {
          element.style = {
            base: {
              fill: element.colorCode,
              stroke: "YELLOW"
            }
          };

          element.type = "task";

          if (element.id === 0) {
            element.parentId = undefined;
            element.callaped = true;
          } else {
            element.parentId = element.superiorId;
          }

          if (!(element.startDate === null || element.endDate === null)) {
            var dateObj1 = new Date(element.startDate);
            var dateObj2 = new Date(element.endDate);
            element.startTime = dateObj1.getTime();
            element.duration = dateObj2.getTime() - dateObj1.getTime();
            this.ganttTasks.push(element);
          }
        });
      })
      .catch(error => {
        console.log("错误的根计划id");
      });
  },

  methods: {
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
    // submitUpload() {
    //   this.$refs.upload.submit();
    // },

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
      /* 
      name,rootPlanId,
      superiorId,type,productLine,
      product,cycle,startDate,
      endDate,actualStartDate,actualEndDate,
      extension,proposal,description,note 
      */
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

          if (
            that.ruleForm.actualStartEndDate &&
            that.ruleForm.actualStartEndDate.length === 2
          ) {
            that.ruleForm.actualStartDate = that.changeDate(
              that.ruleForm.actualStartEndDate[0]
            );
            that.ruleForm.actualEndDate = that.changeDate(
              that.ruleForm.actualStartEndDate[1]
            );
          }

          var param = {
            name: that.ruleForm.name,
            rootPlanId: that.ruleForm.rootPlanId,
            superiorId: that.ruleForm.superiorId,
            type: that.ruleForm.type,
            productLine: that.ruleForm.productLine[0],
            product: that.ruleForm.product,
            cycle: that.ruleForm.cycle,
            startDate: that.ruleForm.startDate,
            endDate: that.ruleForm.endDate,
            proposal: that.ruleForm.proposal,
            description: that.ruleForm.description,
            note: that.ruleForm.note,
            actualStartDate: that.ruleForm.actualStartDate,
            actualEndDate: that.ruleForm.actualEndDate,
            extension:
              that.ruleForm.extension === undefined
                ? undefined
                : that.changeDate(that.ruleForm.extension)
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
      /* 普通计划 
        id,name,productLine,product,
        cycle,startDate,endDate,
        proposal,description,note,extension,
        actualStartDate, actualEndDate,
      */

      /* 根计划
        id,name,dateType,
        date,startDate,endDate
      */

      //修改
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.isRootPlanFlag) {
            var param = {
              id: this.ruleForm.id,
              name: this.ruleForm.name,
              startDate: this.changeDate(this.ruleForm.startEndDate[0]),
              endDate: this.changeDate(this.ruleForm.startEndDate[1]),
              date: this.ruleForm.date,
              dateType: this.changeDate(this.ruleForm.dateType)
            };

            console.log("修改参数：", param);

            request
              .put(`${window.$config.HOST}/root-plan/update`, param)
              .then(response => {
                console.log("修改成功");
                this.$router.push({
                  name: this.goback ? this.goback : "planManagement",
                  params: {}
                });
              });
          } else {
            console.log(this.ruleForm.actualStartEndDate);
            if (
              this.ruleForm.actualStartEndDate != undefined &&
              this.ruleForm.actualStartEndDate.length == 2
            ) {
              this.ruleForm.actualStartDate = this.changeDate(
                this.ruleForm.actualStartEndDate[0]
              );
              this.ruleForm.actualEndDate = this.changeDate(
                this.ruleForm.actualStartEndDate[1]
              );
            } else {
              this.ruleForm.actualStartDate = undefined;
              this.ruleForm.actualEndDate = undefined;
            }
            var param = {
              id: this.ruleForm.id,
              creatorId: this.ruleForm.creatorId,
              rootPlanId: this.ruleForm.rootPlanId,
              name: this.ruleForm.name,
              productLine: this.ruleForm.productLine,
              product: this.ruleForm.product,
              cycle: this.ruleForm.cycle,
              startDate: this.changeDate(this.ruleForm.startEndDate[0]),
              endDate: this.changeDate(this.ruleForm.startEndDate[1]),
              proposal: this.ruleForm.proposal,
              description: this.ruleForm.description,
              note: this.ruleForm.note,
              extension: this.changeDate(this.ruleForm.extension),
              actualStartDate: this.ruleForm.actualStartDate,
              actualEndDate: this.ruleForm.actualEndDate
            };

            console.log("修改参数：", param);

            request
              .put(`${window.$config.HOST}/plan/update`, param)
              .then(response => {
                console.log("修改成功");
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
        // console.log(data.dateStart)

        that.goback = data.goback; //goback 为返回页面的 name

        if (data.isCreate) {
          that.isRootPlanFlag = false;
          that.isModifyPlanFlag = data.isModify;
          that.isCreatePlanFlag = data.isCreate;
        } else {
          that.isRootPlanFlag = data.isRoot;
          that.isModifyPlanFlag = data.isModify;
          that.isCreatePlanFlag = data.isCreate;

          // 获取计划的文件列表, 创建子计划时不能获取文件列表
          console.log("asdfhadjsfhas:", that.ruleForm.id);
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

        // 深拷贝变量，不然只是引用
        that.ruleForm = JSON.parse(JSON.stringify(data.rowData));

        // 甘特图监控变量
        that.ganttWatch.ganttWatchPlanNameOrigin = that.ruleForm.name;
        that.ganttWatch.ganttWatchPlanStartDateOrigin = that.ruleForm.startDate;
        that.ganttWatch.ganttWatchPlanEndDateOrigin = that.ruleForm.endDate;

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
          that.ruleForm.name = "";

          that.ruleForm.type = that.ruleForm.assignPlanType;
          that.ruleForm.superiorId = data.isRoot ? 0 : that.ruleForm.id;
          that.ruleForm.superiorName = that.ruleForm.name;

          that.ruleForm.rootPlanName =
            that.ruleForm.rootPlanName === undefined
              ? that.ruleForm.name
              : that.ruleForm.rootPlanName;
          that.ruleForm.rootPlanId =
            that.ruleForm.rootPlanId === undefined
              ? that.ruleForm.id
              : that.ruleForm.rootPlanId;

          that.ruleForm.id = undefined;
        }
      }
    },

    // gantt related
    ganttVisualButtonClick() {
      if (
        !(
          this.ganttWatch.ganttWatchPlanNameOrigin === this.ruleForm.name &&
          this.ruleForm.startEndDate === undefined
        )
      ) {
        // 有更新
        this.ganttTasks.forEach(ele => {
          if (
            ele.id === this.ruleForm.id ||
            (this.isRootPlanFlag && ele.id === 0)
          ) {
            // 是当前ele,普通计划不可能为0
            ele.name = this.ruleForm.name;
            ele.startDate =
              this.ruleForm.startEndDate === undefined
                ? this.ruleForm.startDate
                : this.changeDate(this.ruleForm.startEndDate[0]);
            ele.endDate =
              this.ruleForm.startEndDate === undefined
                ? this.ruleForm.endDate
                : this.changeDate(this.ruleForm.startEndDate[1]);

            var dateObj1 = new Date(ele.startDate);
            var dateObj2 = new Date(ele.endDate);
            ele.startTime = dateObj1.getTime();
            ele.duration = dateObj2.getTime() - dateObj1.getTime();

            console.log(ele.start, ele.duration);
          }
        });
        this.ganttTaskUpdate(this.ganttTasks);
      }

      this.ganttDrawerVisible = true;
    },
    ganttTaskUpdate(tasks) {
      this.ganttTasks = tasks;
    },
    ganttOptionsUpdate(options) {
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
  font-size: 4ch;
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