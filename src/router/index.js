// -------------------------------------------- 为模版原版代码 --------------------------------------------
const Login = r => require.ensure([], () => r(require('../page/user/login')), 'login');
const Layout = r => require.ensure([], () => r(require('../page/layout')), 'layout');

// 快速入门
const Quick = r => require.ensure([], () => r(require('../page/quick/quick')), 'quick');

// -------------------------------------------- 为用户新增代码 --------------------------------------------
// 系列管理
const rangeManagement = r => require.ensure([], () => r(require('../page/infoManagement/range/rangeManagement.vue')), 'rangeManagement');
const rangeImport = r => require.ensure([], () => r(require('../page/infoManagement/range/rangeImport.vue')), 'rangeImport');

// 款式组管理
const styleGroupManagement = r => require.ensure([], () => r(require('../page/infoManagement/styleGroup/styleGroupManagement.vue')), 'styleGroupManagement');

// 款式管理
const styleManagement = r => require.ensure([], () => r(require('../page/infoManagement/style/styleManagement.vue')), 'styleManagement');
const styleImport = r => require.ensure([], () => r(require('../page/infoManagement/style/styleImport.vue')), 'styleImport');

// 计划管理

const planManagement = r => require.ensure([], () => r(require('../page/planManagement/planManagement.vue')), 'planManagement');
const distributedPlanManagement = r => require.ensure([], () => r(require('../page/planManagement/distributedPlanManagement.vue')), 'distributedPlanManagement');
const commitedPlanManagement = r => require.ensure([], () => r(require('../page/planManagement/commitedPlanManagement.vue')), 'commitedPlanManagement');
const planCompletionManage = r => require.ensure([], () => r(require('../page/planManagement/planCompletionManage.vue')), 'planCompletionManage');
const planMakeOfSeries = r => require.ensure([], () => r(require('../page/planManagement/planMakeOfSeries.vue')), 'planMakeOfSeries');
const planMakeOfStyle = r => require.ensure([], () => r(require('../page/planManagement/planMakeOfStyle.vue')), 'planMakeOfStyle');
const planMakeOfStyleGroup = r => require.ensure([], () => r(require('../page/planManagement/planMakeOfStyleGroup.vue')), 'planMakeOfStyleGroup');
const seriesPlanMake = r => require.ensure([], () => r(require('../page/planManagement/seriesPlanMake.vue')), 'seriesPlanMake');
const rootPlanMake = r => require.ensure([], () => r(require('../page/planManagement/rootPlanMake.vue')), 'rootPlanMake');
const styleGroupPlanMake = r => require.ensure([], () => r(require('../page/planManagement/styleGroupPlanMake .vue')), 'styleGroupPlanMake ');
const stylePlanMake = r => require.ensure([], () => r(require('../page/planManagement/stylePlanMake.vue')), 'stylePlanMake');
const planVerify = r => require.ensure([], () => r(require('../page/planManagement/planVerify.vue')), 'planVerify');
const planDistribute = r => require.ensure([], () => r(require('../page/planManagement/planDistribute.vue')), 'planDistribute');
const planDeletion = r => require.ensure([], () => r(require('../page/planManagement/planDeletion.vue')), 'planDeletion');
const messageManagement = r => require.ensure([], () => r(require('../page/messageManagement.vue')), 'messageManagement');
const queryStatistic = r => require.ensure([], () => r(require('../page/queryStatistic.vue')), 'queryStatistic');
const planExceptionManagement = r => require.ensure([], () => r(require('../page/planManagement/planExceptionManagement.vue')), 'exceptionManagement');

const formManagement = r => require.ensure([], () => r(require('../page/formManagement.vue')), 'formManagement');
const bePlanModelEdit = r => require.ensure([], () => r(require('../page/backEndModule/planModelEdit.vue')), 'bePlanModelEdit');
const bePlanModelManagement = r => require.ensure([], () => r(require('../page/backEndModule/planModelManagement.vue')), 'bePlanModelManagement');
const bePrivilegeManagement = r => require.ensure([], () => r(require('../page/backEndModule/privilegeManagement.vue')), 'privilegeManagement');

const beRoleManagement = r => require.ensure([], () => r(require('../page/backEndModule/roleManagement.vue')), 'beRoleManagement');
const brandMana = r => require.ensure([], () => r(require('../page/backEndModule/brandMana.vue')), 'brandMana');
const colorMana = r => require.ensure([], () => r(require('../page/backEndModule/colorMana.vue')), 'colorMana');
const customerMana = r => require.ensure([], () => r(require('../page/backEndModule/customerMana.vue')), 'customerMana');
const productMana = r => require.ensure([], () => r(require('../page/backEndModule/productMana.vue')), 'productMana');

const dictionaryCateMana = r => require.ensure([], () => r(require('../page/backEndModule/dictionaryCateMana.vue')), 'dictionaryCateMana');
const numberRuleMana = r => require.ensure([], () => r(require('../page/backEndModule/numberRuleMana.vue')), 'numberRuleMana');
const projectType = r => require.ensure([], () => r(require('../page/backEndModule/projectType.vue')), 'projectType');

// -------------------------------------------- 路由配置部分 ----------------------------------------------
export default [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/quick',
    children: [
      { // 快速入门
        path: '/quick',
        name: 'Quick',
        component: Quick,
        meta: {
          bcrumd: ['快速入门']
        }
      },
      {
        path: '/backEndModule/dictionary/brandMana',
        name: 'brandMana',
        component: brandMana,
        meta: {
          bcrumd: ['后台管理模块', '数据字典', '品牌信息管理'],
        }
      },
      {
        path: '/backEndModule/colorMana',
        name: 'colorMana',
        component: colorMana,
        meta: {
          bcrumd: ['后台管理模块', '颜色管理'],
        }
      },
      {
        path: '/backEndModule/dictionary/customerMana',
        name: 'customerMana',
        component: customerMana,
        meta: {
          bcrumd: ['后台管理模块', '数据字典', '客户信息管理'],
        }
      },
      {
        path: '/backEndModule/dictionary/productMana',
        name: 'productMana',
        component: productMana,
        meta: {
          bcrumd: ['后台管理模块', '数据字典', '产品信息管理'],
        }
      },
      {
        path: '/backEndModule/numberRuleMana',
        name: 'numberRuleMana',
        component: numberRuleMana,
        meta: {
          bcrumd: ['后台管理模块', '编号规则管理'],
        }
      },
      {
        path: '/backEndModule/projectType',
        name: 'projectType',
        component: projectType,
        meta: {
          bcrumd: ['后台管理模块', '项目类型-订单'],
        }
      },
      {
        path: '/backEndModule/dictionary/dictionaryCateMana',
        name: 'dictionaryCateMana',
        component: dictionaryCateMana,
        meta: {
          bcrumd: ['后台管理模块', '数据字典', '数据字典管理'],
        }
      },
      {
        path: '/range/rangeManagement',
        name: 'rangeManagement',
        component: rangeManagement,
        meta: {
          bcrumd: ['系列管理'],
        }
      },
      {
        path: '/range/rangeImport',
        name: 'rangeImport',
        component: rangeImport,
        meta: {
          bcrumd: ['系列管理', '导入系列'],
        }
      },
      {
        path: '/styleGroup/styleGroupManagement',
        name: 'styleGroupManagement',
        component: styleGroupManagement,
        meta: {
          bcrumd: ['款式组管理'],
        }
      },

      {
        path: '/style/styleManagement',
        name: 'styleManagementIndex',
        component: styleManagement,
        meta: {
          bcrumd: ['款式管理'],
        }
      },
      {
        path: '/style/styleImport',
        name: 'styleImport',
        component: styleImport,
        meta: {
          bcrumd: ['款式管理', '绑定款式'],
        }
      },

      {
        path: '/planManagement',
        name: 'planManagement',
        component: planManagement,
        meta: {
          bcrumd: ['制定计划管理'],
        }
      },
      {
        path: '/distributedPlanManagement',
        name: 'distributedPlanManagement',
        component: distributedPlanManagement,
        meta: {
          bcrumd: ['被下发计划管理'],
        }
      },
      {
        path: '/commitedPlanManagement',
        name: 'commitedPlanManagement',
        component: commitedPlanManagement,
        meta: {
          bcrumd: ['已完成计划管理'],
        }
      },
      {
        path: '/planCompletionManage',
        name: 'planCompletionManage',
        component: planCompletionManage,
        meta: {
          bcrumd: ['计划完成管理'],
        }
      },
      {
        path: '/planMake/planMakeOfSeries',
        name: 'planMakeOfSeries',
        component: planMakeOfSeries,
        meta: {
          bcrumd: ['计划制定'],
        }
      },
      {
        path: '/planMake/planMakeOfStyle',
        name: 'planMakeOfStyle',
        component: planMakeOfStyle,
        meta: {
          bcrumd: ['计划制定'],
        }
      }, {
        path: '/planMake/planMakeOfStyleGroup',
        name: 'planMakeOfStyleGroup',
        component: planMakeOfStyleGroup,
        meta: {
          bcrumd: ['计划制定'],
        }
      },
      {
        path: '/planMake/rootPlanMake',
        name: 'rootPlanMake',
        component: rootPlanMake,
        meta: {
          bcrumd: ['计划制定', '系列计划制定'],
        }
      },
      {
        path: '/planMake/seriesPlanMake',
        name: 'seriesPlanMake',
        component: seriesPlanMake,
        meta: {
          bcrumd: ['计划制定', '系列计划制定'],
        }
      },
      {
        path: '/planMake/styleGroupPlanMake',
        name: 'styleGroupPlanMake',
        component: styleGroupPlanMake,
        meta: {
          bcrumd: ['计划制定', '款式组计划制定'],
        }
      },
      {
        path: '/planMake/stylePlanMake',
        name: 'stylePlanMake',
        component: stylePlanMake,
        meta: {
          bcrumd: ['计划制定', '款式计划制定'],
        }
      },
      {
        path: '/planVerify',
        name: 'planVerify',
        component: planVerify,
        meta: {
          bcrumd: ['款式计划审核'],
        }
      },
      {
        path: '/planDistribute',
        name: 'planDistribute',
        component: planDistribute,
        meta: {
          bcrumd: ['计划下发管理'],
        }
      },
      {
        path: '/planDeletion',
        name: 'planDeletion',
        component: planDeletion,
        meta: {
          bcrumd: ['计划回收站'],
        }
      },

      {
        path: '/messageManagement',
        name: 'messageManagement',
        component: messageManagement,
        meta: {
          bcrumd: ['消息管理'],
        }
      },
      {
        path: '/planExceptionManagement',
        name: 'planExceptionManagement',
        component: planExceptionManagement,
        meta: {
          bcrumd: ['异常管理'],
        }
      },
      {
        path: '/queryStatistic',
        name: 'queryStatistic',
        component: queryStatistic,
        meta: {
          bcrumd: ['查询统计'],
        }
      },
      {
        path: '/formManagement',
        name: 'formManagement',
        component: formManagement,
        meta: {
          bcrumd: ['报表管理'],
        }
      },


      {
        path: '/backEndModule/planModelEdit',
        name: 'bePlanModelEdit',
        component: bePlanModelEdit,
        meta: {
          bcrumd: ['计划模板编辑'],
        }
      },
      {
        path: '/backEndModule/planModelManagement',
        name: 'bePlanModelManagement',
        component: bePlanModelManagement,
        meta: {
          bcrumd: ['计划模板管理'],
        }
      },
      {
        path: '/backEndModule/privilegeManagement',
        name: 'bePrivilegeManagement',
        component: bePrivilegeManagement,
        meta: {
          bcrumd: ['后台管理模块', '用户数据管理', '权限管理'],
        }
      },


      {
        path: '/backEndModule/roleManagement',
        name: 'beRoleManagement',
        component: beRoleManagement,
        meta: {
          bcrumd: ['后台管理模块', '权限管理'],
        }
      },
      { // 默认路由
        path: '*',
        redirect: '/quick',
        name: 'Quick',
        component: Quick,
        meta: {
          bcrumd: ['快速入门']
        }
      },
    ]
  },
  {
    path: '*',
    redirect: '/login',
    name: 'Login',
    component: Login,
  }
]
