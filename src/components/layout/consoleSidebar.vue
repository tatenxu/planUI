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
      :unique-opened='true'
      :router='true'
      :default-active="defaultActive"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="sidebar-content">
      <div class="sidebar-fold">计划服务-系列规划</div>
      
      <el-menu-item index="/quick">
        <i class="el-icon-message"></i>
        快速入门
      </el-menu-item>

      <el-submenu index="infoManagement">
        <template slot="title">
          <i class="el-icon-document"></i>
          信息管理
        </template>
        <el-menu-item index="/range/rangeManagement"><i class="el-icon-document"></i>系列管理</el-menu-item>
        <!-- <el-menu-item index="/range/rangeInfo"><i class="el-icon-document"></i>系列信息</el-menu-item> -->
        <!-- <el-menu-item index="/range/rangeImport"><i class="el-icon-document"></i>导入系列</el-menu-item> -->
        
        <el-menu-item index="/styleGroup/styleGroupManagement"><i class="el-icon-document"></i>款式组管理</el-menu-item>
        <!-- <el-menu-item index="/styleGroup/styleGroupInfo"><i class="el-icon-document"></i>款式组信息</el-menu-item> -->

        <el-menu-item index="/style/styleManagement"><i class="el-icon-document"></i>款式管理</el-menu-item>
        <!-- <el-menu-item index="/style/styleInfo"><i class="el-icon-document"></i>款式信息</el-menu-item> -->
        <!-- <el-menu-item index="/style/styleImport"><i class="el-icon-document"></i>导入款式</el-menu-item> -->
        <!-- <el-menu-item index="/style/bindStyleGroup"><i class="el-icon-document"></i>绑定款式组</el-menu-item> -->

      </el-submenu>

      <el-submenu index="planMake">
        <template slot="title">
          <i class="el-icon-document"></i>
          计划管理
        </template>

        <el-menu-item index="/planManagement"><i class="el-icon-document"></i>计划管理</el-menu-item>
        <el-submenu index="predictPlanManagement">
          <template slot="title">
            <i class="el-icon-document"></i>
            预测计划管理
          </template>
          <el-menu-item index="/predictPlanToBeMake"><i class="el-icon-document"></i>未制定计划</el-menu-item>
          <el-menu-item index="/predictPlanMaking"><i class="el-icon-document"></i>制定中计划</el-menu-item>
          <el-menu-item index="/predictPlanMade"><i class="el-icon-document"></i>已制定计划</el-menu-item>
        </el-submenu>

        <el-menu-item index="/planMake/planMakeIndex"><i class="el-icon-document"></i>计划制定</el-menu-item>
        <el-menu-item index="/planMake/seriesPlanMake"><i class="el-icon-document"></i>系列计划制定</el-menu-item>
        <el-menu-item index="/planMake/styleGroupPlanMake"><i class="el-icon-document"></i>款式组计划制定</el-menu-item>
        <el-menu-item index="/planMake/stylePlanMake"><i class="el-icon-document"></i>款式计划制定</el-menu-item>
        <el-menu-item index="/planVerify"><i class="el-icon-document"></i>计划审核管理</el-menu-item>
        <el-menu-item index="/planDistribute"><i class="el-icon-document"></i>计划下发管理</el-menu-item>
        <el-menu-item index="/planCompletionManage"><i class="el-icon-document"></i>计划完成管理</el-menu-item>
        <el-menu-item index="/planRecover"><i class="el-icon-document"></i>计划回收站</el-menu-item>
        <el-menu-item index="/exceptionManagement"><i class="el-icon-document"></i>异常管理</el-menu-item>
      </el-submenu>

      <el-menu-item index="/messageManagement"><i class="el-icon-document"></i>消息管理</el-menu-item>
      <el-menu-item index="/queryStatistic"><i class="el-icon-document"></i>查询统计</el-menu-item>
      <el-menu-item index="/formManagement"><i class="el-icon-document"></i>报表管理</el-menu-item>

      <el-submenu index="backEnd">
        <template slot="title">
          <i class="el-icon-message"></i>
          后管理模块
        </template>
        <el-menu-item index="/backEndModule/planModelManagement"><i class="el-icon-document"></i>计划模板管理</el-menu-item>
        <el-menu-item index="/backEndModule/planModelEdit"><i class="el-icon-document"></i>计划模板编辑</el-menu-item>
        <el-menu-item index="/backEndModule/dictionary/productMana"><i class="el-icon-document"></i>产品管理</el-menu-item>
        <el-menu-item index="/backEndModule/dictionary/customerMana"><i class="el-icon-document"></i>客户管理</el-menu-item>
        <el-menu-item index="/backEndModule/dictionary/brandMana"><i class="el-icon-document"></i>品牌管理</el-menu-item>
        <el-menu-item index="/backEndModule/dictionary/dictionaryCateMana"><i class="el-icon-document"></i>数据字典管理</el-menu-item>
        <!-- <el-submenu index="dictionary">
          <template slot="title">
            <i class="el-icon-message"></i>
            用户数据管理
          </template>
          <el-menu-item index="/backEndModule/userManagement"><i class="el-icon-document"></i>用户管理</el-menu-item>
          <el-menu-item index="/backEndModule/groupManagement"><i class="el-icon-document"></i>部门管理</el-menu-item>
          <el-menu-item index="/backEndModule/roleManagement"><i class="el-icon-document"></i>角色管理</el-menu-item>
        </el-submenu> -->

        <!-- <el-menu-item index="/quick"><i class="el-icon-message"></i>权限管理</el-menu-item>

        <el-submenu index="/quick">
          <template slot="title">
            <i class="el-icon-message"></i>
            系统配置
          </template>
          <el-menu-item index="/quick"><i class="el-icon-document"></i>系统配置项</el-menu-item>
          <el-menu-item index="/quick"><i class="el-icon-document"></i>API管理</el-menu-item>
        </el-submenu> -->
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  export default {
    components: {
    },
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
