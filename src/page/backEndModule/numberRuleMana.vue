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
    this.$axios
      .get(
        `${window.$config.HOST}/baseInfoManagement/getSerialNoRegularByObject`,
        {
          params: {
            numberObject: "系列"
          }
        }
      )
      .then(response => {
        this.initialRange = response.data;
        this.numberPrefixRange = response.data.numberPrefix; //前段
        this.numberLengthRange = response.data.numberLength;
        this.lengthRange = response.data.lastNumberLength;
        console.log("前长度：", this.lengthRange);
        console.log("现在长度:", this.numberLengthRange);
      })
      .catch(error => {
        console.log("系列编号规则获取失败!");
      });

    //款式组
    this.$axios
      .get(
        `${window.$config.HOST}/baseInfoManagement/getSerialNoRegularByObject`,
        {
          params: {
            numberObject: "款式组"
          }
        }
      )
      .then(response => {
        this.initialStyleGroup = response.data;
        this.numberPrefixStyleGroup = response.data.numberPrefix; //前段
        this.numberLengthStyleGroup = response.data.numberLength;
        this.lengthStyleGroup = response.data.numberLength;
      })
      .catch(error => {
        console.log("款式组编号规则获取失败!");
        this.numberPrefixStyleGroup = "获取失败";
        this.numberLengthStyleGroup = "获取失败";
      });

    //异常
    this.$axios
      .get(
        `${window.$config.HOST}/baseInfoManagement/getSerialNoRegularByObject`,
        {
          params: {
            numberObject: "异常"
          }
        }
      )
      .then(response => {
        this.initialException = response.data;
        this.numberPrefixException = response.data.numberPrefix; //前段
        this.numberLengthException = response.data.numberLength;
        this.lengthException = response.data.numberLength;
      })
      .catch(error => {
        console.log("异常编号规则获取失败!");
        this.numberPrefixException = "获取失败";
        this.numberLengthException = "获取失败";
      });

    this.$axios
      .get(
        `${window.$config.HOST}/baseInfoManagement/getSerialNoRegularByObject`,
        {
          params: {
            numberObject: "计划"
          }
        }
      )
      .then(response => {
        this.initialPlan = response.data;
        this.numberPrefixPlan = response.data.numberPrefix; //前段
        this.numberLengthPlan = response.data.numberLength;
        this.lengthPlan = response.data.numberLength;
      })
      .catch(error => {
        console.log("计划编号规则获取失败!");
        this.numberPrefixPlan = "获取失败";
        this.numberLengthPlan = "获取失败";
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
      this.exceptionRuleNumber = this.numberLengthException + "20190101" + ss;
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
      this.styleGroupRuleNumber = this.numberLengthStyleGroup + "20190101" + ss;
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
      this.planRuleNumber = this.numberLengthPlan + "20190101" + ss;
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

      this.$axios
        .post(
          `${window.$config.HOST}/baseInfoManagement/updateSerialNoRegular`,
          {
            id: this.initialRange.id,
            numberObject: this.initialRange.numberObject,
            numberPrefix: this.numberPrefixRange, // 单号的字母
            numberLength: parseInt(this.numberLengthRange), // 当前长度
            lastNumberLength: parseInt(this.lengthRange) // 之前的长度
          }
        )
        .then(response => {
          if (response.data === 1) {
            //系列
            this.$axios
              .get(
                `${
                  window.$config.HOST
                }/baseInfoManagement/getSerialNoRegularByObject`,
                {
                  params: {
                    numberObject: "系列"
                  }
                }
              )
              .then(response => {
                this.initialRange = response.data;
                this.numberPrefixRange = response.data.numberPrefix; //前段
                this.numberLengthRange = response.data.numberLength;
              })
              .catch(error => {
                console.log("系列编号规则获取失败!");
              });
            this.$message({
              message: "保存成功！",
              type: "success"
            });
          } else {
            this.$message({
              message: "保存失败！",
              type: "warning"
            });
          }
        })
        .catch(error => {
          console.log("保存失败!");
        });
      return;
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

      this.$axios
        .post(
          `${window.$config.HOST}/baseInfoManagement/updateSerialNoRegular`,
          {
            id: this.initialStyleGroup.id,
            numberObject: this.initialStyleGroup.numberObject,
            numberPrefix: this.numberPrefixStyleGroup, // 单号的字母
            numberLength: parseInt(this.numberLengthStyleGroup), // 当前长度
            lastNumberLength: parseInt(this.lengthStyleGroup) // 之前的长度
          }
        )
        .then(response => {
          if (response.data === 1) {
            //款式组
            this.$axios
              .get(
                `${
                  window.$config.HOST
                }/baseInfoManagement/getSerialNoRegularByObject`,
                {
                  params: {
                    numberObject: "款式组"
                  }
                }
              )
              .then(response => {
                this.initialStyleGroup = response.data;
                this.numberPrefixStyleGroup = response.data.numberPrefix; //前段
                this.numberLengthStyleGroup = response.data.numberLength;
              })
              .catch(error => {
                console.log("款式组编号规则获取失败!");
              });
            this.$message({
              message: "保存成功！",
              type: "success"
            });
          } else {
            this.$message({
              message: "保存失败！",
              type: "warning"
            });
          }
        })
        .catch(error => {
          console.log("保存失败!");
        });
      return;
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

      this.$axios
        .post(
          `${window.$config.HOST}/baseInfoManagement/updateSerialNoRegular`,
          {
            id: this.initialException.id,
            numberObject: this.initialException.numberObject,
            numberPrefix: this.numberPrefixException, // 单号的字母
            numberLength: parseInt(this.numberLengthException), // 当前长度
            lastNumberLength: parseInt(this.lengthException) // 之前的长度
          }
        )
        .then(response => {
          if (response.data === 1) {
            //异常
            this.$axios
              .get(
                `${
                  window.$config.HOST
                }/baseInfoManagement/getSerialNoRegularByObject`,
                {
                  params: {
                    numberObject: "异常"
                  }
                }
              )
              .then(response => {
                this.initialException = response.data;
                this.numberPrefixException = response.data.numberPrefix; //前段
                this.numberLengthException = response.data.numberLength;
              })
              .catch(error => {
                console.log("异常编号规则获取失败!");
              });
            this.$message({
              message: "保存成功！",
              type: "success"
            });
          } else {
            this.$message({
              message: "保存失败！",
              type: "warning"
            });
          }
        })
        .catch(error => {
          console.log("保存失败!");
        });
      return;
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

      this.$axios
        .post(
          `${window.$config.HOST}/baseInfoManagement/updateSerialNoRegular`,
          {
            id: this.initialPlan.id,
            numberObject: this.initialPlan.numberObject,
            numberPrefix: this.numberPrefixPlan, // 单号的字母
            numberLength: parseInt(this.numberLengthPlan), // 当前长度
            lastNumberLength: parseInt(this.lengthPlan) // 之前的长度
          }
        )
        .then(response => {
          if (response.data === 1) {
            //计划
            this.$axios
              .get(
                `${
                  window.$config.HOST
                }/baseInfoManagement/getSerialNoRegularByObject`,
                {
                  params: {
                    numberObject: "计划"
                  }
                }
              )
              .then(response => {
                this.initialPlan = response.data;
                this.numberPrefixPlan = response.data.numberPrefix; //前段
                this.numberLengthPlan = response.data.numberLength;
              })
              .catch(error => {
                console.log("计划编号规则获取失败!");
              });
            this.$message({
              message: "保存成功！",
              type: "success"
            });
          } else {
            this.$message({
              message: "保存失败！",
              type: "warning"
            });
          }
        })
        .catch(error => {
          console.log("保存失败!");
        });
      return;
    }
  }
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