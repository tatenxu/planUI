import Config from '../config/index';
// -------------------------------------------- 为模版原版代码 --------------------------------------------
const Login = r => require.ensure([], () => r(require('../page/user/login')), 'login');
const Layout = r => require.ensure([], () => r(require('../page/layout')), 'layout');

// 快速入门
const Quick = r => require.ensure([], () => r(require('../page/quick/quick')), 'quick');

// -------------------------------------------- 为用户新增代码 --------------------------------------------
// 系列管理
const rangeManagement = r => require.ensure([], () => r(require('../page/infoManagement/range/rangeManagement.vue')), 'rangeManagement');
const rangeInfo = r => require.ensure([], () => r(require('../page/infoManagement/range/rangeInfo.vue')), 'rangeInfo');
const rangeImport = r => require.ensure([], () => r(require('../page/infoManagement/range/rangeImport.vue')), 'rangeImport');

// 款式组管理
const styleGroupManagement = r => require.ensure([], () => r(require('../page/infoManagement/styleGroup/styleGroupManagement.vue')), 'styleGroupManagement');
const styleGroupInfo = r => require.ensure([], () => r(require('../page/infoManagement/styleGroup/styleGroupInfo.vue')), 'styleGroupInfo');

// 款式管理
const styleManagement = r => require.ensure([], () => r(require('../page/infoManagement/style/styleManagement.vue')), 'styleManagement');
const styleInfo = r => require.ensure([], () => r(require('../page/infoManagement/style/styleInfo.vue')), 'styleInfo');
const bindStyleGroup = r => require.ensure([], () => r(require('../page/infoManagement/style/bindStyleGroup.vue')), 'bindStyleGroup');
const styleImport = r => require.ensure([], () => r(require('../page/infoManagement/style/styleImport.vue')), 'styleImport');

// 计划管理
const predictPlanToBeMake = r => require.ensure([], () => r(require('../page/planManagement/predictPlanToBeMake.vue')), 'predictPlanToBeMake');
const predictPlanMaking = r => require.ensure([], () => r(require('../page/planManagement/predictPlanMaking.vue')), 'predictPlanMaking');
const predictPlanMade = r => require.ensure([], () => r(require('../page/planManagement/predictPlanMade.vue')), 'predictPlanMade');
const planManagement = r => require.ensure([], () => r(require('../page/planManagement/planManagement.vue')), 'planManagement');
const commitedPlanManagement = r => require.ensure([], () => r(require('../page/planManagement/commitedPlanManagement.vue')), 'commitedPlanManagement');
const planCompletionManage = r => require.ensure([], () => r(require('../page/planManagement/planCompletionManage.vue')), 'planCompletionManage');
const planMakeIndex = r => require.ensure([], () => r(require('../page/planManagement/planMake.vue')), 'planMakeIndex');
const seriesPlanMake = r => require.ensure([], () => r(require('../page/planManagement/seriesPlanMake.vue')), 'seriesPlanMake');
const styleGroupPlanMake  = r => require.ensure([], () => r(require('../page/planManagement/styleGroupPlanMake .vue')), 'styleGroupPlanMake ');
const stylePlanMake = r => require.ensure([], () => r(require('../page/planManagement/stylePlanMake.vue')), 'stylePlanMake');
const planVerify = r => require.ensure([], () => r(require('../page/planManagement/planVerify.vue')), 'planVerify');
const planDistribute = r => require.ensure([], () => r(require('../page/planManagement/planDistribute.vue')), 'planDistribute');
const planRecover = r => require.ensure([], () => r(require('../page/planManagement/planRecover.vue')), 'planRecover');
const messageManagement = r => require.ensure([], () => r(require('../page/messageManagement.vue')), 'messageManagement');
const exceptionManagement = r => require.ensure([], () => r(require('../page/planManagement/exceptionManagement.vue')), 'exceptionManagement');
const queryStatistic = r => require.ensure([], () => r(require('../page/queryStatistic.vue')), 'queryStatistic');
const formManagement = r => require.ensure([], () => r(require('../page/formManagement.vue')), 'formManagement');
const subGantt = r => require.ensure([], () => r(require('../page/subGantt.vue')), 'subGantt');
const subsubGantt = r => require.ensure([], () => r(require('../page/subsubGantt.vue')), 'subsubGantt');
const bePlanModelEdit = r => require.ensure([], () => r(require('../page/backEndModule/planModelEdit.vue')), 'bePlanModelEdit');
const bePlanModelManagement = r => require.ensure([], () => r(require('../page/backEndModule/planModelManagement.vue')), 'bePlanModelManagement');
const bePrivilegeManagement = r => require.ensure([], () => r(require('../page/backEndModule/privilegeManagement.vue')), 'privilegeManagement');
const beUserManagement = r => require.ensure([], () => r(require('../page/backEndModule/userData/userManagement.vue')), 'beUserManagement');
const beGroupManagement = r => require.ensure([], () => r(require('../page/backEndModule/userData/groupManagement.vue')), 'beGroupManagement');
const beRoleManagement = r => require.ensure([], () => r(require('../page/backEndModule/roleManagement.vue')), 'beRoleManagement');
const brandMana = r => require.ensure([], () => r(require('../page/backEndModule/brandMana.vue')), 'brandMana');
const customerMana = r => require.ensure([], () => r(require('../page/backEndModule/customerMana.vue')), 'customerMana');
const productMana = r => require.ensure([], () => r(require('../page/backEndModule/productMana.vue')), 'productMana');
const clothingLevelMana = r => require.ensure([], () => r(require('../page/backEndModule/clothingLevelMana.vue')), 'clothingLevelMana');
const dictionaryCateMana = r => require.ensure([], () => r(require('../page/backEndModule/dictionaryCateMana.vue')), 'dictionaryCateMana');
const numberRuleMana = r => require.ensure([], () => r(require('../page/backEndModule/numberRuleMana.vue')), 'numberRuleMana');


var servicePath = "/planservice";
// -------------------------------------------- 路由配置部分 --------------------------------------------
export default [
  {
    path: Config.route.login,
    name: 'Login',
    component: Login
  },  
  {
    path: servicePath+'/',
    name: 'Layout',
    component: Layout,
    children: [
      { // 快速入门
        path: servicePath+'/quick',
        name: 'Quick',
        component: Quick,
        meta: {
          bcrumd: ['快速入门']
        }
      },
      { 
        path: servicePath+'/backEndModule/dictionary/brandMana',
        name: 'brandMana',
        component: brandMana,
        meta: {
          bcrumd: ['后台管理模块', '数据字典', '品牌信息管理'],
        }
      },
      { 
        path: servicePath+'/backEndModule/dictionary/customerMana',
        name: 'customerMana',
        component: customerMana,
        meta: {
          bcrumd: ['后台管理模块', '数据字典', '客户信息管理'],
        }
      },
      {
        path: servicePath+'/backEndModule/dictionary/productMana',
        name: 'productMana',
        component: productMana,
        meta: {
          bcrumd: ['后台管理模块', '数据字典', '产品信息管理'],
        }
      },
      {
        path: servicePath+'/backEndModule/dictionary/clothingLevelMana',
        name: 'clothingLevelMana',
        component: clothingLevelMana,
        meta: {
          bcrumd: ['后台管理模块', '数据字典', '产品信息管理'],
        }
      },
      {
        path: servicePath+'/backEndModule/numberRuleMana',
        name: 'numberRuleMana',
        component: numberRuleMana,
        meta: {
          bcrumd: ['后台管理模块', '编号规则管理'],
        }
      },
      { 
        path: servicePath+'/backEndModule/dictionary/dictionaryCateMana',
        name: 'dictionaryCateMana',
        component: dictionaryCateMana,
        meta: {
          bcrumd: ['后台管理模块', '数据字典', '数据字典管理'],
        }
      },
      { 
        path: servicePath+'/range/rangeManagement',
        name: 'rangeManagement',
        component: rangeManagement,
        meta: {
          bcrumd: ['系列管理'],
        }
      },
      { 
        path: servicePath+'/range/rangeInfo',
        name: 'rangeInfo',
        component: rangeInfo,
        meta: {
          bcrumd: ['系列管理', '系列信息'],
        }
      },
      { 
        path: servicePath+'/range/rangeImport',
        name: 'rangeImport',
        component: rangeImport,
        meta: {
          bcrumd: ['系列管理', '导入系列'],
        }
      },
      { 
        path: servicePath+'/styleGroup/styleGroupManagement',
        name: 'styleGroupManagement',
        component: styleGroupManagement,
        meta: {
          bcrumd: ['款式组管理'],
        }
      },
      { 
        path: servicePath+'/styleGroup/styleGroupInfo',
        name: 'styleGroupInfo',
        component: styleGroupInfo,
        meta: {
          bcrumd: ['款式组管理', '款式组信息'],
        }
      },
      { 
        path: servicePath+'/style/styleManagement',
        name: 'styleManagementIndex',
        component: styleManagement,
        meta: {
          bcrumd: ['款式管理'],
        }
      },
      { 
        path: servicePath+'/style/styleInfo',
        name: 'styleInfo',
        component: styleInfo,
        meta: {
          bcrumd: ['款式管理', '款式信息'],
        }
      },
      { 
        path: servicePath+'/style/bindStyleGroup',
        name: 'bindStyleGroup',
        component: bindStyleGroup,
        meta: {
          bcrumd: ['款式管理', '导入款式'],
        }
      },
      { 
        path: servicePath+'/style/styleImport',
        name: 'styleImport',
        component: styleImport,
        meta: {
          bcrumd: ['款式管理', '绑定款式'],
        }
      },
      { 
        path: servicePath+'/predictPlanToBeMake',
        name: 'predictPlanToBeMake',
        component: predictPlanToBeMake,
        meta: {
          bcrumd: ['预测计划管理','未制定计划'],
        }
      },
      { 
        path: servicePath+'/predictPlanMaking',
        name: 'predictPlanMaking',
        component: predictPlanMaking,
        meta: {
          bcrumd: ['预测计划管理','未提交计划'],
        }
      },
      { 
        path: servicePath+'/predictPlanMade',
        name: 'predictPlanMade',
        component: predictPlanMade,
        meta: {
          bcrumd: ['预测计划管理','已提交计划'],
        }
      },
      { 
        path: servicePath+'/planManagement',
        name: 'planManagement',
        component: planManagement,
        meta: {
          bcrumd: ['进行中计划管理'],
        }
      },
      { 
        path: servicePath+'/commitedPlanManagement',
        name: 'commitedPlanManagement',
        component: commitedPlanManagement,
        meta: {
          bcrumd: ['已提交计划管理'],
        }
      },
      { 
        path: servicePath+'/planCompletionManage',
        name: 'planCompletionManage',
        component: planCompletionManage,
        meta: {
          bcrumd: ['计划完成管理'],
        }
      },
      { 
        path: servicePath+'/planMake/planMakeIndex',
        name: 'planMakeIndex',
        component: planMakeIndex,
        meta: {
          bcrumd: ['计划制定'],
        }
      },
      { 
        path: servicePath+'/planMake/seriesPlanMake',
        name: 'seriesPlanMake',
        component: seriesPlanMake,
        meta: {
          bcrumd: ['计划制定', '系列计划制定'],
        }
      },
      { 
        path: servicePath+'/planMake/styleGroupPlanMake',
        name: 'styleGroupPlanMake',
        component: styleGroupPlanMake,
        meta: {
          bcrumd: ['计划制定', '款式组计划制定'],
        }
      },
      { 
        path: servicePath+'/planMake/stylePlanMake',
        name: 'stylePlanMake',
        component: stylePlanMake,
        meta: {
          bcrumd: ['计划制定', '款式计划制定'],
        }
      },
      { 
        path: servicePath+'/planVerify',
        name: 'planVerify',
        component: planVerify,
        meta: {
          bcrumd: ['款式计划审核'],
        }
      },
      { 
        path: servicePath+'/planDistribute',
        name: 'planDistribute',
        component: planDistribute,
        meta: {
          bcrumd: ['计划下发管理'],
        }
      },
      { 
        path: servicePath+'/planRecover',
        name: 'planRecover',
        component: planRecover,
        meta: {
          bcrumd: ['计划回收站'],
        }
      },
      { 
        path: servicePath+'/messageManagement',
        name: 'messageManagement',
        component: messageManagement,
        meta: {
          bcrumd: ['消息管理'],
        }
      },
      { 
        path: servicePath+'/exceptionManagement',
        name: 'exceptionManagement',
        component: exceptionManagement,
        meta: {
          bcrumd: ['异常管理'],
        }
      },
      { 
        path: servicePath+'/queryStatistic',
        name: 'queryStatistic',
        component: queryStatistic,
        meta: {
          bcrumd: ['查询统计'],
        }
      },
      { 
        path:servicePath+ '/formManagement',
        name: 'formManagement',
        component: formManagement,
        meta: {
          bcrumd: ['报表管理'],
          // keepAlive: true
        }
      },
      { 
        path:servicePath+ '/subGantt',
        name: 'subGantt',
        component: subGantt,
        meta: {
          bcrumd: ['报表管理','款式组甘特图'],
          // keepAlive: true
        }
      },
      { 
        path:servicePath+ '/subsubGantt',
        name: 'subsubGantt',
        component: subsubGantt,
        meta: {
          bcrumd: ['报表管理','款式组甘特图','款式甘特图'],
        }
      },
      { 
        path: servicePath+'/backEndModule/planModelEdit',
        name: 'bePlanModelEdit',
        component: bePlanModelEdit,
        meta: {
          bcrumd: ['计划模板编辑'],
        }
      },
      { 
        path: servicePath+'/backEndModule/planModelManagement',
        name: 'bePlanModelManagement',
        component: bePlanModelManagement,
        meta: {
          bcrumd: ['计划模板管理'],
        }
      },
      { 
        path: servicePath+'/backEndModule/privilegeManagement',
        name: 'bePrivilegeManagement',
        component: bePrivilegeManagement,
        meta: {
          bcrumd: ['后台管理模块','用户数据管理', '权限管理'],
        }
      },
      { 
        path: servicePath+'/backEndModule/userManagement',
        name: 'beUserManagement',
        component: beUserManagement,
        meta: {
          bcrumd: ['后台管理模块','用户数据管理', '用户管理'],
        }
      },
      { 
        path: servicePath+'/backEndModule/groupManagement',
        name: 'beGroupManagement',
        component: beGroupManagement,
        meta: {
          bcrumd: ['后台管理模块','用户数据管理', '部门管理'],
        }
      },
      { 
        path: servicePath+'/backEndModule/roleManagement',
        name: 'beRoleManagement',
        component: beRoleManagement,
        meta: {
          bcrumd: ['后台管理模块','权限管理'],
        }
      },
      { // 默认路由
        path: '*',
        redirect: servicePath+'/quick',
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
    // redirect: Config.route.login,
    // name: 'Login',
    // component: Login
    redirect: servicePath+'/',
    name: 'Layout',
    component: Layout,
  }
]
