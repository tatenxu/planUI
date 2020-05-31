<template>
 <!-- 本页面经讨论不再使用，无需查看 -->
  <div class="body">
    <el-card class="box-card">
      <el-tabs :tab-position="tabPosition" style="height: 200px;">
        <el-tab-pane label="系列编号">
          <el-row :gutter="20" style="margin-top:5px;">
            <el-col :span="8">
              <div class="bar">
                <div class="title">字母前段</div>
                <el-input
                  v-model="numberPrefixRange"
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
                <el-button type="primary" @click="previewRange">生成规则</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="saveRangeRule">确定设置</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary">取消</el-button>
              </el-col>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">预览结果</div>
                <el-input
                  v-model="rangeRuleNumber"
                  clearable
                  :rows="1"
                  placeholder="请点击生成规则"
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
                  v-model="numberPrefixStyleGroup"
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
                <el-button type="primary" @click="previewStyleGroup">生成规则</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="saveStyleGroupRule">确定设置</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary">取消</el-button>
              </el-col>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">预览结果</div>
                <el-input
                  v-model="styleGroupRuleNumber"
                  clearable
                  :rows="1"
                  placeholder="请点击生成规则"
                  :disabled="true"
                  style="min-width:240px"
                ></el-input>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="异常编号">
          <el-row :gutter="20" style="margin-top:5px;">
            <el-col :span="8">
              <div class="bar">
                <div class="title">字母前段</div>
                <el-input
                  v-model="numberPrefixException"
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
                  v-model="dateRuleException"
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
                  v-model="numberLengthException"
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
                <el-button type="primary" @click="previewException">生成规则</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="saveExceptionRule">确定设置</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary">取消</el-button>
              </el-col>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">预览结果</div>
                <el-input
                  v-model="exceptionRuleNumber"
                  clearable
                  :rows="1"
                  placeholder="请点击生成规则"
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
                  v-model="numberPrefixPlan"
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
                <el-button type="primary" @click="previewPlan">生成规则</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="savePlanRule">确定设置</el-button>
              </el-col>
              <el-col :span="8">
                <el-button type="primary">取消</el-button>
              </el-col>
            </el-col>
            <el-col :span="8">
              <div class="bar">
                <div class="title">预览结果</div>
                <el-input
                  v-model="planRuleNumber"
                  clearable
                  :rows="1"
                  placeholder="请点击生成规则"
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
import request from "@/utils/request";
import { POINT_CONVERSION_COMPRESSED } from "constants";
export default {
  data() {
    return {
      numberPrefixRange: "",
      numberLengthRange: "",
      dateRuleRange: "20190101",
      rangeRuleNumber: "",
      lengthRange: "",

      numberPrefixStyleGroup: "",
      numberLengthStyleGroup: "",
      dateRuleStyleGroup: "20190101",
      styleGroupRuleNumber: "",
      lengthStyleGroup: "",

      numberPrefixException: "",
      numberLengthException: "",
      dateRuleException: "20190101",
      exceptionRuleNumber: "",
      lengthException: "",

      numberPrefixPlan: "",
      numberLengthPlan: "",
      dateRulePlan: "20190101",
      planRuleNumber: "",
      lengthPlan: "",

      initialRange: [],
      initialStyleGroup: [],
      initialException: [],
      initialPlan: [],
      tabPosition: "top"
    };
  },

  created: function() {
    const that = this;
    //系列
    request
      .get(`/backstage/serial-number/find`, {
        params: {
          type: "SERIES"
        }
      })
      .then(response => {
        this.initialRange = response.result;
        this.numberPrefixRange = this.initialRange.prefix; //前段
        this.numberLengthRange = this.initialRange.length;
        this.lengthRange = this.initialRange.length;
      });

    //款式组
    request
      .get(`/backstage/serial-number/find`, {
        params: {
          type: "STYLE_GROUP"
        }
      })
      .then(response => {
        this.initialStyleGroup = response.result;
        this.numberPrefixStyleGroup = this.initialStyleGroup.prefix; //前段
        this.numberLengthStyleGroup = this.initialStyleGroup.length;
        this.lengthStyleGroup = this.initialStyleGroup.length;
      });

    //异常
    request
      .get(`/backstage/serial-number/find`, {
        params: {
          type: "EXCEPTION"
        }
      })
      .then(response => {
        this.initialException = response.result;
        this.numberPrefixException = this.initialException.prefix; //前段
        this.numberLengthException = this.initialException.length;
        this.lengthException = this.initialException.length;
      });

    request
      .get(`/backstage/serial-number/find`, {
        params: {
          type: "PLAN"
        }
      })
      .then(response => {
        this.initialPlan = response.result;
        this.numberPrefixPlan = this.initialPlan.prefix; //前段
        this.numberLengthPlan = this.initialPlan.length;
        this.lengthPlan = this.initialPlan.length;
      });
  },

  methods: {
    previewException() {
      if (
        this.numberLengthException === this.initialException.numberLength &&
        this.numberPrefixException === this.initialException.numberPrefix
      ) {
        this.$message({
          message: "请先至少修改一项！",
          type: "warning"
        });
        return;
      }
      if (this.numberLengthException <= 0) {
        this.$message({
          message: "长度必须大于0！",
          type: "warning"
        });
        return;
      }
      if (
        this.numberLengthException === "" ||
        this.numberPrefixException === ""
      ) {
        this.$message({
          message: "不可为空!",
          type: "warning"
        });
        return;
      }
      var ss = "";
      for (let i = 0; i < this.numberLengthException - 1; i++) {
        ss = ss + "0";
      }
      ss = ss + "1";
      this.exceptionRuleNumber = this.numberPrefixException + "20190101" + ss;
    },
    previewStyleGroup() {
      if (
        this.numberLengthStyleGroup === this.initialStyleGroup.numberLength &&
        this.numberPrefixStyleGroup === this.initialStyleGroup.numberPrefix
      ) {
        this.$message({
          message: "请先至少修改一项！",
          type: "warning"
        });
        return;
      }
      if (this.numberLengthStyleGroup <= 0) {
        this.$message({
          message: "长度必须大于0！",
          type: "warning"
        });
        return;
      }
      if (
        this.numberLengthStyleGroup === "" ||
        this.numberPrefixStyleGroup === ""
      ) {
        this.$message({
          message: "不可为空!",
          type: "warning"
        });
        return;
      }
      var ss = "";
      for (let i = 0; i < this.numberLengthStyleGroup - 1; i++) {
        ss = ss + "0";
      }
      ss = ss + "1";
      this.styleGroupRuleNumber = this.numberPrefixStyleGroup + "20190101" + ss;
    },
    previewRange() {
      if (
        this.numberLengthRange === this.initialRange.numberLength &&
        this.numberPrefixRange === this.initialRange.numberPrefix
      ) {
        this.$message({
          message: "请先至少修改一项！",
          type: "warning"
        });
        return;
      }
      if (this.numberLengthRange <= 0) {
        this.$message({
          message: "长度必须大于0！",
          type: "warning"
        });
        return;
      }
      if (this.numberLengthRange === "" || this.numberPrefixRange === "") {
        this.$message({
          message: "不可为空!",
          type: "warning"
        });
        return;
      }
      var ss = "";
      for (let i = 0; i < this.numberLengthRange - 1; i++) {
        ss = ss + "0";
      }
      console.log("ss:", ss);
      ss = ss + "1";
      console.log("ss:", ss);
      this.rangeRuleNumber = this.numberPrefixRange + "20190101" + ss;
    },
    previewPlan() {
      if (
        this.numberLengthPlan === this.initialPlan.numberLength &&
        this.numberPrefixPlan === this.initialPlan.numberPrefix
      ) {
        this.$message({
          message: "请先至少修改一项！",
          type: "warning"
        });
        return;
      }
      if (this.numberLengthPlan <= 0) {
        this.$message({
          message: "长度必须大于0！",
          type: "warning"
        });
        return;
      }
      if (this.numberLengthPlan === "" || this.numberPrefixPlan === "") {
        this.$message({
          message: "不可为空!",
          type: "warning"
        });
        return;
      }
      var ss = "";
      for (let i = 0; i < this.numberLengthPlan - 1; i++) {
        ss = ss + "0";
      }
      ss = ss + "1";
      this.planRuleNumber = this.numberPrefixPlan + "20190101" + ss;
    },
    saveRangeRule() {
      if (
        this.numberLengthRange === this.initialRange.numberLength &&
        this.numberPrefixRange === this.initialRange.numberPrefix
      ) {
        this.$message({
          message: "请先至少修改一项！",
          type: "warning"
        });
        return;
      }
      if (this.numberLengthRange <= 0) {
        this.$message({
          message: "长度必须大于0！",
          type: "warning"
        });
        return;
      }
      if (this.numberLengthRange === "" || this.numberPrefixRange === "") {
        this.$message({
          message: "不可为空!",
          type: "warning"
        });
        return;
      }

      if (
        parseInt(this.initialRange.numberLength) ==
        parseInt(this.numberLengthRange)
      ) {
        console.log("没改!", this.lengthRange);
      } else {
        this.lengthRange = this.initialRange.numberLength;
        console.log("改了", this.lengthRange);
      }

      console.log("this.lengthRange", this.lengthRange);
      console.log("this.numberLengthRange", this.numberLengthRange);

      request
        .put(`/backstage/serial-number/update`, {
          id: this.initialRange.id,
          prefix: this.numberPrefixRange, // 单号的字母
          length: parseInt(this.numberLengthRange) // 当前长度
        })
        .then(response => {});
    },
    saveStyleGroupRule() {
      if (
        this.numberLengthStyleGroup === this.initialStyleGroup.numberLength &&
        this.numberPrefixStyleGroup === this.initialStyleGroup.numberPrefix
      ) {
        this.$message({
          message: "请先至少修改一项！",
          type: "warning"
        });
        return;
      }
      if (this.numberLengthStyleGroup <= 0) {
        this.$message({
          message: "长度必须大于0！",
          type: "warning"
        });
        return;
      }
      if (
        this.numberLengthStyleGroup === "" ||
        this.numberPrefixStyleGroup === ""
      ) {
        this.$message({
          message: "不可为空!",
          type: "warning"
        });
        return;
      }

      if (
        parseInt(this.initialStyleGroup.numberLength) ==
        parseInt(this.numberLengthStyleGroup)
      ) {
        console.log("没改!", this.lengthStyleGroup);
      } else {
        this.lengthStyleGroup = this.initialStyleGroup.numberLength;
        console.log("改了", this.lengthStyleGroup);
      }

      console.log("this.lengthStyleGroup", this.lengthStyleGroup);
      console.log("this.numberLengthStyleGroup", this.numberLengthStyleGroup);

      request
        .put(`/backstage/serial-number/update`, {
          id: this.initialStyleGroup.id,
          prefix: this.numberPrefixStyleGroup, // 单号的字母
          length: parseInt(this.numberLengthStyleGroup) // 当前长度
        })
        .then(response => {});
    },
    saveExceptionRule() {
      if (
        this.numberLengthException === this.initialException.numberLength &&
        this.numberPrefixException === this.initialException.numberPrefix
      ) {
        this.$message({
          message: "请先至少修改一项！",
          type: "warning"
        });
        return;
      }
      if (this.numberLengthException <= 0) {
        this.$message({
          message: "长度必须大于0！",
          type: "warning"
        });
        return;
      }
      if (
        this.numberLengthException === "" ||
        this.numberPrefixException === ""
      ) {
        this.$message({
          message: "不可为空!",
          type: "warning"
        });
        return;
      }

      if (
        parseInt(this.initialException.numberLength) ==
        parseInt(this.numberLengthException)
      ) {
        console.log("没改!", this.lengthException);
      } else {
        this.lengthException = this.initialException.numberLength;
        console.log("改了", this.lengthException);
      }

      console.log("this.lengthException", this.lengthException);
      console.log("this.numberLengthException", this.numberLengthException);

      request
        .put(`/backstage/serial-number/update`, {
          id: this.initialException.id,
          prefix: this.numberPrefixException, // 单号的字母
          length: parseInt(this.numberLengthException) // 当前长度
        })
        .then(response => {});
    },
    savePlanRule() {
      if (
        this.numberLengthPlan === this.initialPlan.numberLength &&
        this.numberPrefixPlan === this.initialPlan.numberPrefix
      ) {
        this.$message({
          message: "请先至少修改一项！",
          type: "warning"
        });
        return;
      }
      if (this.numberLengthPlan <= 0) {
        this.$message({
          message: "长度必须大于0！",
          type: "warning"
        });
        return;
      }
      if (this.numberLengthPlan === "" || this.numberPrefixPlan === "") {
        this.$message({
          message: "不可为空!",
          type: "warning"
        });
        return;
      }

      if (
        parseInt(this.initialPlan.numberLength) ==
        parseInt(this.numberLengthPlan)
      ) {
        console.log("没改!", this.lengthPlan);
      } else {
        this.lengthPlan = this.initialPlan.numberLength;
        console.log("改了", this.lengthPlan);
      }

      console.log("this.lengthPlan", this.lengthPlan);
      console.log("this.numberLengthPlan", this.numberLengthPlan);

      request
        .put(`/backstage/serial-number/update`, {
          id: this.initialPlan.id,
          prefix: this.numberPrefixPlan, // 单号的字母
          length: parseInt(this.numberLengthPlan) // 当前长度
        })
        .then(response => {});
    }
  }
};
</script>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 1100px;
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