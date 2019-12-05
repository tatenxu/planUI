<style lang="less">
.console-sidebar {
  .el-submenu__title {
    font-size: 12px;
    height: 46px;
    line-height: 46px;
  }
  .el-submenu {
    background: #37424f;
    border-bottom: 1px solid #414d5c;
  }
  .el-submenu__icon-arrow {
    right: 40px;
    margin-top: -4px;
  }
  .el-icon-message {
    font-size: 12px;
  }
  .el-menu-item {
    font-size: 12px;
    height: 42px;
    line-height: 42px;
    &.is-active {
      border-right: none;
      color: #fff;
      background: #0099cc !important;
      &:hover {
        background: #0099cc !important;
      }
    }
  }
}
</style>
<style scoped lang="less">
.console-sidebar {
  position: fixed;
  top: 50px;
  bottom: 0px;
  background-color: #293038;
  z-index: 102;
  overflow-x: hidden;
  overflow-y: auto;
  height: auto;
  width: 180px;
  .sidebar-content {
    width: 200px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    background: #293038;
    .sidebar-fold {
      height: 30px;
      width: 140px;
      background: #394555;
      color: #aeb9c2;
      text-align: left;
      padding: 0 20px;
      line-height: 30px !important;
      user-select: none;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
    }
  }
}
</style>
<template>
  <div class="console-sidebar">
    <el-menu
      :unique-opened="true"
      :router="true"
      :default-active="defaultActive"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="sidebar-content"
    >
      <div class="sidebar-fold">计划服务-系列规划</div>

      <el-menu-item index="/quick'">
        <i class="el-icon-message"></i>
        快速入门
      </el-menu-item>

      <el-submenu index="infoManagement">
        <template slot="title">
          <i class="el-icon-document"></i>
          信息管理
        </template>
        <el-menu-item index="/range/rangeManagement" v-if="rangeMana">
          <i class="el-icon-document"></i>系列管理
        </el-menu-item>
        <!-- <el-menu-item index="/range/rangeInfo"><i class="el-icon-document"></i>系列信息</el-menu-item> -->
        <!-- <el-menu-item index="/range/rangeImport"><i class="el-icon-document"></i>导入系列</el-menu-item> -->

        <el-menu-item index="/styleGroup/styleGroupManagement" v-if="styleGroupMana">
          <i class="el-icon-document"></i>款式组管理
        </el-menu-item>
        <!-- <el-menu-item index="/styleGroup/styleGroupInfo"><i class="el-icon-document"></i>款式组信息</el-menu-item> -->

        <el-menu-item index="/style/styleManagement" v-if="styleMana">
          <i class="el-icon-document"></i>款式管理
        </el-menu-item>
        <!-- <el-menu-item index="/style/styleInfo"><i class="el-icon-document"></i>款式信息</el-menu-item> -->
        <!-- <el-menu-item index="/style/styleImport"><i class="el-icon-document"></i>导入款式</el-menu-item> -->
        <!-- <el-menu-item index="/style/bindStyleGroup"><i class="el-icon-document"></i>绑定款式组</el-menu-item> -->
      </el-submenu>

      <el-submenu index="planMake">
        <template slot="title">
          <i class="el-icon-document"></i>
          计划管理
        </template>
        <el-submenu index="rootPlan">
          <template slot="title">
            <i class="el-icon-document"></i>
            根计划
          </template>
          <el-menu-item index="/planMake/seriesPlanMake" v-if="rangePlan">
            <i class="el-icon-document"></i>系列制定
          </el-menu-item>
          <el-menu-item index="/planMake/styleGroupPlanMake" v-if="styleGroupPlan">
            <i class="el-icon-document"></i>款式组制定
          </el-menu-item>
          <el-menu-item index="/planMake/stylePlanMake" v-if="stylePlan">
            <i class="el-icon-document"></i>款式制定
          </el-menu-item>
          <el-menu-item index="/planMake/rootPlanMake" v-if="stylePlan">
            <i class="el-icon-document"></i>已制定根计划
          </el-menu-item>
        </el-submenu>

        <el-menu-item index="/planManagement" v-if="planMana">
          <i class="el-icon-document"></i>制定计划管理
        </el-menu-item>
        <el-menu-item index="/distributedPlanManagement">
          <i class="el-icon-document"></i>被下发计划管理
        </el-menu-item>
        <el-menu-item index="/commitedPlanManagement" v-if="completedPlanMana">
          <i class="el-icon-document"></i>已完成计划管理
        </el-menu-item>
        <el-submenu index="predictPlanManagement" disabled v-if="predictMana">
          <template slot="title">
            <i class="el-icon-document"></i>
            预测计划管理
          </template>
          <el-menu-item index="/predictPlanToBeMake">
            <i class="el-icon-document"></i>未制定计划
          </el-menu-item>
          <el-menu-item index="/predictPlanMaking">
            <i class="el-icon-document"></i>已制定计划
          </el-menu-item>
          <el-menu-item index="/predictPlanMade">
            <i class="el-icon-document"></i>已保存计划
          </el-menu-item>
        </el-submenu>

        <!-- <el-menu-item index="/planMake/planMakeIndex">
          <i class="el-icon-document"></i>计划制定
        </el-menu-item>-->

        <el-menu-item index="/planVerify" v-if="planReview">
          <i class="el-icon-document"></i>计划审核管理
        </el-menu-item>
        <el-menu-item index="/planDistribute" v-if="planDistribute">
          <i class="el-icon-document"></i>计划下发管理
        </el-menu-item>
        <el-menu-item index="/planCompletionManage" v-if="rangeCompleted">
          <i class="el-icon-document"></i>系列完成管理
        </el-menu-item>
        <el-menu-item index="/planRecover" v-if="planRecover">
          <i class="el-icon-document"></i>计划回收站
        </el-menu-item>
        <el-menu-item index="/exceptionManagement" v-if="exceptionMana">
          <i class="el-icon-document"></i>异常管理
        </el-menu-item>
      </el-submenu>

      <el-menu-item index="/messageManagement" v-if="messageMana">
        <i class="el-icon-document"></i>消息管理
      </el-menu-item>
      <el-menu-item index="/queryStatistic" v-if="statistics">
        <i class="el-icon-document"></i>查询统计
      </el-menu-item>
      <el-menu-item index="/formManagement" v-if="gantt">
        <i class="el-icon-document"></i>报表管理
      </el-menu-item>

      <!-- <el-menu-item index="/gantt"><i class="el-icon-document"></i>报表管理</el-menu-item> -->

      <el-submenu index="backEnd" v-if="backMana">
        <template slot="title">
          <i class="el-icon-message"></i>
          后台管理模块
        </template>
        <el-menu-item index="/backEndModule/planModelManagement">
          <i class="el-icon-document"></i>计划模板管理
        </el-menu-item>

        <el-menu-item index="/backEndModule/dictionary/customerMana">
          <i class="el-icon-document"></i>客户管理
        </el-menu-item>
        <el-menu-item index="/backEndModule/dictionary/brandMana">
          <i class="el-icon-document"></i>品牌管理
        </el-menu-item>

        <el-menu-item index="/backEndModule/projectType">
          <i class="el-icon-document"></i>项目类型——订单
        </el-menu-item>

        <el-menu-item index="/backEndModule/dictionary/dictionaryCateMana">
          <i class="el-icon-document"></i>数据字典管理
        </el-menu-item>

        <el-menu-item index="/backEndModule/privilegeManagement">
          <i class="el-icon-message"></i>数据权限管理
        </el-menu-item>
        <el-menu-item index="/backEndModule/roleManagement">
          <i class="el-icon-message"></i>系统权限管理
        </el-menu-item>
        <el-menu-item index="/backEndModule/numberRuleMana">
          <i class="el-icon-message"></i>编号规则管理
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import request from "@/utils/request";
export default {
  data() {
    //项目类型，订单阶段  跟数据字典页面类似
    return {
      roleList: [],
      pageList: [],
      // rangeMana: false,
      // styleGroupMana: false,
      // styleMana: false,
      // toDoPredict: false,
      // doingPredict: false,
      // savePredict: false,
      // planMana: false,
      // completedPlanMana: false,
      // rangePlan: false,
      // styleGroupPlan: false,
      // stylePlan: false,
      // planReview: false,
      // planDistribute: false,
      // rangeCompleted: false,
      // planRecover: false,
      // exceptionMana: false,
      // messageMana: false,
      // statistics: false,
      // gantt: false,
      // predictMana: false,
      // backMana: false

      rangeMana: true,
      styleGroupMana: true,
      styleMana: true,
      toDoPredict: true,
      doingPredict: true,
      savePredict: true,
      planMana: true,
      completedPlanMana: true,
      rangePlan: true,
      styleGroupPlan: true,
      stylePlan: true,
      planReview: true,
      planDistribute: true,
      rangeCompleted: true,
      planRecover: true,
      exceptionMana: true,
      messageMana: true,
      statistics: true,
      gantt: true,
      predictMana: true,
      backMana: true
    };
  },

  created: function() {
    //获得自己的角色信息
    request.get(`/me`).then(response => {
      for (let i = 0; i <= response.result.roles.length; i++) {
        this.roleList.push(response.result.roles[i]);
        request
          .get(`/backstage/role-menu/find`, {
            params: {
              roleName: response.result.roles[i]
            }
          })
          .then(response => {
            response.result.forEach(element => {
              this.pageList.push(element.menuName);
            });
            if (this.pageList.includes("系列管理")) {
              this.rangeMana = true;
            }
            if (this.pageList.includes("款式组管理")) {
              this.styleGroupMana = true;
            }
            if (this.pageList.includes("款式管理")) {
              this.styleMana = true;
            }
            if (this.pageList.includes("进行中计划管理")) {
              this.planMana = true;
            }
            if (this.pageList.includes("已完成计划管理")) {
              this.completedPlanMana = true;
            }
            if (this.pageList.includes("预测计划管理")) {
              this.predictMana = true;
            }
            if (this.pageList.includes("系列计划制定")) {
              this.rangePlan = true;
            }
            if (this.pageList.includes("款式组计划制定")) {
              this.styleGroupPlan = true;
            }
            if (this.pageList.includes("款式计划制定")) {
              this.stylePlan = true;
            }
            if (this.pageList.includes("计划审核管理")) {
              this.planReview = true;
            }
            if (this.pageList.includes("计划下发管理")) {
              this.planDistribute = true;
            }
            if (this.pageList.includes("系列完成管理")) {
              this.rangeCompleted = true;
            }
            if (this.pageList.includes("计划回收站")) {
              this.planRecover = true;
            }
            if (this.pageList.includes("异常管理")) {
              this.exceptionMana = true;
            }
            if (this.pageList.includes("消息管理")) {
              this.messageMana = true;
            }
            if (this.pageList.includes("查询统计")) {
              this.statistics = true;
            }
            if (this.pageList.includes("报表管理")) {
              this.gantt = true;
            }
            if (this.pageList.includes("后台管理")) {
              this.backMana = true;
            }
          });
      }
    });
  },
  components: {},
  computed: {
    defaultActive: function() {
      const that = this;
      return (
        (that.$route.meta && that.$route.meta.activePath) || this.$route.path
      );
    }
  }
};
</script>
