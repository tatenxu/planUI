<template>
  <div class="body">
    <el-card class="box-card">
      <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="系列编号">
          <el-row :gutter="20" style="margin-top:5px;">
            <el-col :span="8">
              <div class="bar">
                <div class="title">字母前段</div>
                <el-input
                  v-model="beforeAlphabetRange"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">日期</div>
                <el-input
                  v-model="dateRuleRange"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">编号长度</div>
                <el-input
                  v-model="numberLengthRange"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:30px">
            <el-col :span="8">
              <el-col :span="8">
                <el-button type="primary" @click="saveRangeRule">设定</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary">取消</el-button>
              </el-col>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">生成结果</div>
                <el-input
                  v-model="rangeRuleNumber"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="款式组编号">
          <el-row :gutter="20" style="margin-top:5px;">
            <el-col :span="8">
              <div class="bar">
                <div class="title">字母前段</div>
                <el-input
                  v-model="beforeAlphabetStyleGroup"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">日期</div>
                <el-input
                  v-model="dateRuleStyleGroup"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">编号长度</div>
                <el-input
                  v-model="numberLengthStyleGroup"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:30px">
            <el-col :span="8">
              <el-col :span="8">
                <el-button type="primary" @click="saveStyleGroupRule">设定</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary">取消</el-button>
              </el-col>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">生成结果</div>
                <el-input
                  v-model="styleGroupRuleNumber"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="款式编号">
          <el-row :gutter="20" style="margin-top:5px;">
            <el-col :span="8">
              <div class="bar">
                <div class="title">字母前段</div>
                <el-input
                  v-model="beforeAlphabetStyle"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">日期</div>
                <el-input
                  v-model="dateRuleStyle"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">编号长度</div>
                <el-input
                  v-model="numberLengthStyle"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:30px">
            <el-col :span="8">
              <el-col :span="8">
                <el-button type="primary" @click="saveStyleRule">设定</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary">取消</el-button>
              </el-col>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">生成结果</div>
                <el-input
                  v-model="styleRuleNumber"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="计划编号">
          <el-row :gutter="20" style="margin-top:5px;">
            <el-col :span="8">
              <div class="bar">
                <div class="title">字母前段</div>
                <el-input
                  v-model="beforeAlphabetPlan"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">日期</div>
                <el-input
                  v-model="dateRulePlan"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">编号长度</div>
                <el-input
                  v-model="numberLengthPlan"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:30px">
            <el-col :span="8">
              <el-col :span="8">
                <el-button type="primary" @click="savePlanRule">设定</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary">取消</el-button>
              </el-col>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">生成结果</div>
                <el-input
                  v-model="planRuleNumber"
                  clearable
                  :rows="1"
                  placeholder="请选择"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { POINT_CONVERSION_COMPRESSED } from "constants";
export default {
  data() {
    return {
      beforeAlphabetRange: "",
      numberLengthRange: "",
      dateRuleRange: "",
      rangeRuleNumber: "",

      beforeAlphabetStyleGroup: "",
      numberLengthStyleGroup: "",
      dateRuleStyleGroup: "",
      styleGroupRuleNumber: "",

      beforeAlphabetStyle: "",
      numberLengthStyle: "",
      dateRuleStyle: "",
      styleRuleNumber: "",

      beforeAlphabetPlan: "",
      numberLengthPlan: "",
      dateRulePlan: "",
      planRuleNumber: "",

      tabPosition: "top"
    };
  },

  created: function() {
    (this.beforeAlphabetRange = "系列字母前段"),
      (this.numberLengthRange = "系列编号长度"),
      (this.dateRuleRange = "系列日期格式"),
      (this.rangeRuleNumber = "系列编号样式"),
      (this.beforeAlphabetStyleGroup = "款式组字母前段"),
      (this.numberLengthStyleGroup = "款式组编号长度"),
      (this.dateRuleStyleGroup = "款式组日期规则"),
      (this.styleGroupRuleNumber = "款式组示例"),
      (this.beforeAlphabetStyle = "款式字母前段"),
      (this.numberLengthStyle = "款式编号长度"),
      (this.dateRuleStyle = "款式日期规则"),
      (this.styleRuleNumber = "款式示例"),
      (this.beforeAlphabetPlan = "计划字母前段"),
      (this.numberLengthPlan = "计划编号长度"),
      (this.dateRulePlan = "计划日期格式"),
      (this.planRuleNumber = "计划示例");
  },

  methods: {
    saveRangeRule(){
      return ;
    },
    saveStyleGroupRule(){
      return ;
    },
    saveStyleRule(){
      return ;
    },
    savePlanRule(){
      return ;
    },
  },
  
};
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    .title {
      font-size: 14px;
      min-width: 75px;
      text-align: center;
    }
    .el-input {
      width: 300px;
      min-width: 75px;
    }
    .el-select {
      width: 300px;
      min-width: 75px;
    }
  }
  .block {
    padding: 30px 0;
    text-align: center;
  }
}
</style>