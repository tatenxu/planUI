<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="searchOptions.searchParams.customerName" clearable>
              <el-option
                v-for="item in searchOptions.options.customerNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="searchOptions.searchParams.brandName" clearable>
              <el-option
                v-for="item in searchOptions.options.brandNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="searchOptions.searchParams.clothingLevel" clearable>
              <el-option
                v-for="item in searchOptions.options.clothingLevelOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-select v-model="searchOptions.searchParams.rangeName" clearable>
              <el-option
                v-for="item in searchOptions.options.rangeNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">计划名称</div>
            <el-select v-model="searchOptions.searchParams.name" clearable>
              <el-option
                v-for="item in searchOptions.options.planNameOptions"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              style="margin-left: 20px"
              v-model="searchOptions.searchParams.dateRange"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              clearable
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="6">
          <el-switch
            v-model="isSelfMadePlan"
            @change="planTypeSwitchChange"
            inactive-color="#13ce66"
            active-text="制定的计划"
            inactive-text="被下发计划">
          </el-switch>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <el-row :gutter="20">
        <!-- <el-col :span="3" v-if="isSelfMadePlan">
          <el-button type="primary" size="small" @click="deletePlan" >删除计划</el-button>
        </el-col> -->
        <!-- <el-col :span="3" v-if="isSelfMadePlan">
          <el-button type="primary" size="small" @click="submitPlan" >提交计划</el-button>
        </el-col> -->
        <el-col :span="3" v-if="!isSelfMadePlan">
          <el-button type="primary" size="small" @click="addPlanChild">添加子计划</el-button>
        </el-col>
        <el-col :span="4" v-if="!isSelfMadePlan">
          <el-button type="primary" size="small" @click="changeSubPlanOrder">下级计划顺序调整</el-button>
        </el-col>
        <el-col :span="3" v-if="!isSelfMadePlan">
          <el-button type="primary" size="small" @click="addException">添加异常</el-button>
        </el-col>
      </el-row>
      <el-table
        :data="tableDataShow"
        max-height="400"
        @selection-change="changeCheckBoxFun"
        :stripe="true"
        :highlight-current-row="true"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column width="50" type="selection" align="center"></el-table-column>
        <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="id" v-if="false"></el-table-column>
        <el-table-column prop="number" label="计划编号" align="center"></el-table-column>
        <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
        <el-table-column prop="rangeNumber" label="系列编号" align="center"></el-table-column>
        <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
        <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
        <el-table-column prop="rangeName" label="系列名称" align="center"></el-table-column>
        <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
        <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
        <el-table-column prop="createTime" label="添加时间" align="center"></el-table-column>
        <el-table-column prop="parentName" label="上级计划" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" align="center">
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.state==='被驳回'"
              placement="top-start"
              title="驳回理由"
              width="200"
              trigger="hover"
              :content="scope.row.rejectReason">
              <p slot="reference">被驳回</p>
            </el-popover>
            <p v-else-if="scope.row.state==='已制定'">已制定</p>
            <p v-else-if="scope.row.state==='已审核'">已审核</p>
            <p v-else-if="scope.row.state==='已下发'">已下发</p>
            <p v-else-if="scope.row.state==='已提交'">已提交</p>
            <p v-else-if="scope.row.state==='已删除'">已删除</p>
            <p v-else>其他</p>
          </template>
        </el-table-column>
        <el-table-column label="异常状态" width="150" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="ToSearchException(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.haveException"
            >有异常，查看</el-button>
            <p v-else>无异常</p>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click.native.prevent="getPlanDetail(scope.row)" type="text" size="small">查看</el-button>
            <el-button
              v-if="isSelfMadePlan && (scope.row.state === '已制定' || scope.row.state === '被驳回')"
              @click.native.prevent="ModifyPlanDetail(scope.row)"
              type="text"
              size="small"
            >修改</el-button>
            <el-button
              v-if="isSelfMadePlan && (scope.row.state === '已制定' || scope.row.state === '被驳回')"
              @click.native.prevent="submitPlan(scope.row)"
              type="text"
              size="small"
            >提交</el-button>
            <el-button
              v-if="isSelfMadePlan && (scope.row.state === '已制定' || scope.row.state === '被驳回')"
              @click.native.prevent="deleteOnePlan(scope.row.id)"
              type="text"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagination.currentPage"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          ></el-pagination>
        </div>
    </el-card>

    <el-dialog title="子计划顺序调整"  :visible.sync="subPlanOrderModificationDialogVisible" :modal="false">
      <el-table
        :data="subPlanTableData"
        highlight-current-row
        style="width: 100%"  >
          <!-- <el-table-column  type="selection"  width="55px"></el-table-column> -->
          <el-table-column  type="index"  label="新顺序" width="70px"></el-table-column>
          <el-table-column  prop="order"  label="原顺序" width="70"></el-table-column>
          <el-table-column  prop="name"  label="计划名称"  width="100px"></el-table-column>
          <el-table-column  prop="number"  label="款号"  width="100px"></el-table-column>
          <el-table-column  prop="startDate"  label="开始日期"  width="100px"></el-table-column>
          <el-table-column  prop="endDate"  label="结束日期"  width="100px"></el-table-column>
          <el-table-column  prop="createrName"  label="创建人"  width="100px"></el-table-column>
          <el-table-column  prop="deptName"  label="部门名称"  width="100px"></el-table-column>
          <el-table-column  prop="createTime"  label="创建日期"  width="100px"></el-table-column>
          <el-table-column label="操作" width="150px" fixed="right">
            <template slot-scope="scope">
              <el-button  size="mini"  :disabled="scope.$index===0"  @click="moveUp(scope.$index,scope.row)">
                <i class="el-icon-arrow-up"></i>
              </el-button>
              <el-button  size="mini"  :disabled="scope.$index===(subPlanTableData.length-1)"  @click="moveDown(scope.$index,scope.row)">
                <i class="el-icon-arrow-down"></i>
              </el-button>
              <!-- <el-button type="info" size="mini" round v-if="scope.$index===0">默认</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      <el-button  type="primary" @click="subPlanOrderConfirm">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { error } from 'util';
import consoleSidebarVue from '../../components/layout/consoleSidebar.vue';
export default {
  data() {
    return {
      subPlanOrderModificationDialogVisible:false,
      tableDataShow:[],
      isSelfMadePlan:false,
      searchOptions: {
        searchParams: {
          customerName: "",
          brandName: "",
          clothingLevel: "",
          rangeName: "",
          name:"",
          dateRange: ""
        },
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          clothingLevelOptions: [],
          rangeNameOptions:[],
          planNameOptions:[],
          selfPlanNameOptions:[],
          distributedPlanNameOptions:[],
        }
      },
      tableData: [],
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      selectedData: [],

      subPlanTableData: [],
    };
  },
  created: function () {
    console.log('进入计划管理页面');

    //获取客户名称
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getCustomerName`)
      .then(response => {
        this.searchOptions.options.customerNameOptions = response.data;
      })
      .catch(error => {
        console.log("初始化客户选项错误!");
      });

    //获取服装层次
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getClothingLevelName`)
      .then(response => {
        this.searchOptions.options.clothingLevelOptions = response.data;
      })
      .catch(error => {
        console.log("初始化服装层次加载错误");
      });

    //品牌名称选择获取
    this.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName`,{
        params:{customerId:""}
      })
      .then(response => {
        this.searchOptions.options.brandNameOptions = response.data;
      })
      .catch(error => {
        console.log("初始化品牌名称选择错误");
      });

    //初始化获取系列
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getRangeName`,{
        params:{brandId:""}
      })
      .then(response => {
        this.searchOptions.options.rangeNameOptions = response.data;
      })
      .catch(error => {
        console.log("初始化系列名称加载错误");
      });

    //默认获取被下发计划列表
    var param = {
      stage: "manage"
    }
    this.$axios
      .get(`${window.$config.HOST}/planManagement/getDistributedPlanList`)
      .then(response => {
        this.tableData = response.data;
        this.tableData.forEach(element=>{
        if(element.isRoot){
            element.parentName = "根计划";
          }
        });
        //时间排序
        this.totalTableData.sort(function(a,b){
          return Date.parse(b.createTime)-Date.parse(a.createTime);
        });

        //复制计划名称
        this.searchOptions.options.planNameOptions = response.data;
        this.searchOptions.options.distributedPlanNameOptions = response.data;

        //分页
        this.pagination.total=response.data.length;
        let i = (this.pagination.currentPage-1) * this.pagination.pageSize;
        let k = (this.pagination.currentPage-1) * this.pagination.pageSize;
        this.tableDataShow=[];
        
        for(;i-k<this.pagination.pageSize&&i<this.tableData.length;i++)
        {
          this.tableDataShow.push(this.tableData[i]);
        }

        this.$axios
          .get(`${window.$config.HOST}/planManagement/getPlanList`,{
            params:{stage : "manage"}
          })
          .then(response=>{
            this.searchOptions.options.selfPlanNameOptions = response.data;
          })
          .catch(error=>{
            this.$message.error("搜索失败!");
          });
        
      })
      .catch(error => {
        console.log("初始化被下发计划列表获取错误");
      });
  },
  methods: {
    ToSearchException(row) {
      console.log("查看异常"+row.id);
      this.$router.push({
        name: "exceptionManagement",
        params: {
          planId: row.id,
          customerId: row.customerId,
          customerName: row.customerName,
          brandId: row.brandId,
          brandName: row.brandName,
          rangeId: row.rangeId,
          rangeName: row.rangeName,
        }
      });
    },    
    handleSizeChange(val) {
      this.pagination.pageSize=val;
      console.log("每页+"+this.pagination.pageSize)
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage=val;
        this.handleSearch();
    },
    addPlanChild() {
      if (this.selectedData.length === 1) {
        let data = this.selectedData[0];
        var param={
          flag:1,
          goback:"planManagement",
          customerName: data.customerName,
          brandName: data.brandName,
          rangeId:data.rangeId,
          rangeName: data.rangeName,
          planType: data.type,
          planObjectName: data.planObject,
          planObjectId:data.planObjectId,
          topPlanName: data.name?data.name:"根计划",
          topPlanId: data.id,
        };

        console.log(param);
        this.$router.push({
          name: "planMakeIndex",
          params: param
        });
      } else if (this.selectedData.length === 0) {
        this.$message.error("请选择要添加子计划的计划！");
      } else {
        this.$message.error("仅允许对一条计划添加子计划，请重新选择！");
      }
    },
    deletePlan() {
      if (this.selectedData.length === 0) {
        this.$message.error("请选择要删除的计划！");
      } else {
        this.selectedData.forEach(element=>{
            console.log(element.id);
            this.deleteOnePlan(element.id);
            // this.$axios
            //   .delete(`${window.$config.HOST}/planManagement/deletePlan`,{
            //     params:{id:element.id}
            //   })
            //   .then(response=>{
            //     if(response.data < 0 ){
            //       this.$message.error(element.id + "删除失败!");
            //     }else{
            //       this.$message({
            //         type:"success",
            //         message: element.id+"删除成功!"
            //       });
            //       this.handleSearch()
            //     }
            //   })
            //   .catch(error=>{
            //     this.$message.error(element.id + "删除失败!");
            //   })
          });
      }
    },
    //提交计划
    submitPlan(row){
      // 注释的是批量提交的函数
      // if (this.selectedData.length === 0) {
      //   this.$message.error("请选择要提交的计划！");
      // } else {
      //   this.selectedData.forEach(element=>{
      //       console.log(element.id);
      //       this.$axios
      //         .get(`${window.$config.HOST}/planManagement/submitPlan`,{
      //           params:{id:element.id}
      //         })
      //         .then(response=>{
      //           if(response.data < 0 ){
      //             console.log(element.name + "提交失败(服务器)!");
      //             this.$message.error(element.id + "提交失败!");
      //           }else{
      //             this.$message({
      //               type:"success",
      //               message: element.id+"提交成功!"
      //             });
      //             this.handleSearch()
      //           }
      //         })
      //         .catch(error=>{
      //           console.log(element.name + "提交失败!");
      //           this.$message.error(element.id + "提交失败!");
      //         })
      //     });
      // }

      //行提交
      this.$axios
        .get(`${window.$config.HOST}/planManagement/submitPlan`,{
          params:{id:row.id}
        })
        .then(response=>{
          if(response.data < 0 ){
            console.log(row.name + "提交失败(服务器)!");
            this.$message.error(row.id + "提交失败!");
          }else{
            this.$message({
              type:"success",
              message: row.id+"提交成功!"
            });
            this.handleSearch();
          }
        })
        .catch(error=>{
          console.log(row.name + "提交失败!");
          this.$message.error(row.id + "提交失败!");
        })
    },
    //子计划顺序跳转按钮
    changeSubPlanOrder() {
      // this.$message("此功能对应页面暂时缺失");
      if (this.selectedData.length === 1) {
        var param = {
          id: this.selectedData[0].id,
        };
        console.log(param);
        this.$axios
          .get(`${window.$config.HOST}/planManagement/getChildrenPlanList`,{
            params:param
          })
          .then(response=>{
            // console.log(response.data);
            this.subPlanTableData=response.data;
            this.subPlanTableData.sort(function(a,b){
              return a.order-b.order;
            });
          })
          .catch(error=>{
            console.lopg("获取子计划列表失败");
          });
        this.subPlanOrderModificationDialogVisible = true;
      } else if (this.selectedData.length === 0) {
        this.$message.error("请选择要调整的计划！");
      } else {
        this.$message.error("仅允许对一条计划调整，请重新选择！");
      }
    },
    subPlanOrderConfirm(){
      var param = [];
      var len = this.subPlanTableData.length;
      for(var i = 0; i < len; i++){
        param.push({
          id:this.subPlanTableData[i].id,
          order: i,
        });
      }
      console.log(param);
      this.$axios
        .post(`${window.$config.HOST}/planManagement/adjustPlanOrder`,param)
        .then(response=>{
          if(response.data < 0){
            console.log("顺序调整失败");
            this.$message.error("顺序调整失败");
          }else{
            console.log("顺序调整成功");
            this.$message({
              type:"success",
              message:"调整成功!"
            });
          }
        })
        .catch(error=>{
          console.log("顺序调整请求失败");
          this.$message.error("顺序调整失败");
        })
      this.subPlanOrderModificationDialogVisible = false;
    },
    addException() {
      if (this.selectedData.length === 0) {
        this.$message.error("请选择要添加异常的计划！");
      } else {
        this
          .$prompt("请输入计划出现的异常", "异常信息添加", {
            confirmButtonText: "确定",
            cancelButttonText: "取消",
            inputPattern: /\S/,
            inputErrorMessage: "异常内容不得为空"
          })
          .then(({ value }) => {
            console.log(value);
            this.selectedData.forEach(element=>{
              var params = {
                planId : element.id,
                cause : (value==="")?"":value,
              };
              // console.log(params);
              this.$axios.post(`${window.$config.HOST}/planManagement/addException`,params)
                .then(response=>{
                  if(response.data < 0){
                    this.$message.error(element.name + "添加异常失败");
                  }else{
                    this.$message({
                      type:"success",
                      message:element.name+"异常添加成功"
                    })
                  }
                })
                .catch(error=>{
                  this.$message.error(element.name + "添加异常失败");
                })
            });
          });
      }
    },
    changeCheckBoxFun(val) {
      this.selectedData = val;
    },
    getPlanDetail(row) {
      var param={
        flag: 3,
        goback: "planManagement",
        customerName: row.customerName,
        brandName: row.brandName,
        rangeId:row.rangeId,
        rangeName: row.rangeName,
        topPlanId: row.parentId,
        topPlanName: row.parentName?row.parentName:"根计划",
        planId:row.id,
        planType: row.type,
        planObjectName: row.planObject,
        planObjectId:row.planObjectId,
        planName:row.name,
        projectType:row.projectType,
        quantity:row.quantity,
        dateStart:row.startDate,
        dateEnd:row.endDate,
        productDate:row.productDate,
        productDateType:row.productDateType,
        planProductId:row.productId,
        planPropose:row.proposal,
        note:row.note,
        planDescribe:row.description,
      };
      console.log(param);
      this.$router.push({
        name: "planMakeIndex",
        params: param
      });
    },
    ModifyPlanDetail(row) {
      var param={
        flag: 2,
        goback: "planManagement",
        customerName: row.customerName,
        brandName: row.brandName,
        rangeId:row.rangeId,
        rangeName: row.rangeName,
        topPlanId: row.parentId,
        topPlanName: row.parentName?row.parentName:"根计划",
        planId:row.id,
        planType: row.type,
        planObjectName: row.planObject,
        planObjectId:row.planObjectId,
        planName:row.name,
        projectType:row.projectType,
        quantity:row.quantity,
        dateStart:row.startDate,
        dateEnd:row.endDate,
        productDate:row.productDate,
        productDateType:row.productDateType,
        planProductId:row.productId,
        planPropose:row.proposal,
        note:row.note,
        planDescribe:row.description,
      };
      console.log(param);
      this.$router.push({
        name: "planMakeIndex",
        params: param
      });
    },
    deleteOnePlan(planid) {
      console.log("删除 "+planid);
      this.$axios
        .delete(`${window.$config.HOST}/planManagement/deletePlan`,{
          params:{id:planid}
        })
        .then(response=>{
          if(response.data < 0){
            this.$message.error(planid+"删除失败");
            console.log("删除失败");
          }else{
            this.handleSearch();
            console.log("删除成功");
            this.$message({
              type:"success",
              message:planid+"删除成功"
            });
          }
        })
        .catch(error=>{
          this.$message.error(planid+"删除失败");
        });
    },
    // 改变日期格式
    changeDate(date) {
      if(!date){
        return undefined;
      }else{
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        // var h = date.getHours();
        // var minute = date.getMinutes();
        // minute = minute < 10 ? "0" + minute : minute;
        // var second = date.getSeconds();
        // second = minute < 10 ? "0" + second : second;
        // return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
        return y + "-" + m + "-" + d;
      }
    },
    //搜索按钮
    handleSearch(){
      console.log(this.searchOptions.searchParams.dateRange);
      var param = {
        customerId: (this.searchOptions.searchParams.customerName==="")?undefined:this.searchOptions.searchParams.customerName, 
        brandId: (this.searchOptions.searchParams.brandName==="")?undefined:this.searchOptions.searchParams.brandName, 
        rangeId: (this.searchOptions.searchParams.rangeName==="")?undefined:this.searchOptions.searchParams.rangeName,  
        name: (this.searchOptions.searchParams.name==="")?undefined:this.searchOptions.searchParams.name, 
        clothingLevelId :(this.searchOptions.searchParams.clothingLevel==="")?undefined:this.searchOptions.searchParams.clothingLevel, 
        startDate: this.changeDate(this.searchOptions.searchParams.dateRange?this.searchOptions.searchParams.dateRange[0]:null),
        endDate:this.changeDate(this.searchOptions.searchParams.dateRange?this.searchOptions.searchParams.dateRange[0]:null),
      };
      if(this.isSelfMadePlan){
        param.stage = "manage";
        console.log(param);
        this.$axios
          .get(`${window.$config.HOST}/planManagement/getPlanList`,{
            params:param
          })
          .then(response=>{
            this.tableData = response.data;
            this.tableData.forEach(element=>{
              if(element.isRoot){
                element.parentName = "根计划";
              }
            });
            //时间排序
            this.tableData.sort(function(a,b){
              return Date.parse(b.createTime)-Date.parse(a.createTime);
            });
            
            //分页
            this.pagination.total=response.data.length;
            let i = (this.pagination.currentPage-1) * this.pagination.pageSize;
            let k = (this.pagination.currentPage-1) * this.pagination.pageSize;
            this.tableDataShow=[];
            for(;i-k<this.pagination.pageSize&&i<this.tableData.length;i++)
            {
              this.tableDataShow.push(this.tableData[i]);
            }
          })
          .catch(error=>{
            this.$message.error("搜索失败!");
            // this.tableDataShow=[
            //   {
            //     brandId: 1,
            //     brandName: "AAA品牌",
            //     clothingLevelId: 2,
            //     clothingLevelName: "时装",
            //     createTime: "2019-05-14 10:49:40",
            //     createrName: "张三",
            //     customerId: 1,
            //     customerName: "江苏A客户",
            //     deleteTime: null,
            //     deleterName: null,
            //     deptName: "设计管理部",
            //     description: "系列A1的子计划",
            //     endDate: "2020-06-01",
            //     haveException: false,
            //     id: 5,
            //     isCompleted: false,
            //     isRoot: false,
            //     name: "系列AA2计划",
            //     note: "",
            //     number: "JX20190514002",
            //     parentId: 2,
            //     parentName: "系列A1计划",
            //     planObject: "Fall-2019(07/08/09)",
            //     planObjectId: 1,
            //     productDate: "2020-04-30",
            //     productDateType: "交货日期",
            //     productId: 1,
            //     projectType: "头样",
            //     proposal: "系列AA2",
            //     quantity: 5,
            //     rangeId: 1,
            //     rangeName: "Fall-2019(07/08/09)",
            //     rangeNumber: "XL20190101001",
            //     rejectReason: null,
            //     startDate: "2019-05-11",
            //     state: "已提交",
            //     type: "系列计划",
            //   },{
            //     brandId: 1,
            //     brandName: "AAA品牌",
            //     clothingLevelId: 2,
            //     clothingLevelName: "时装",
            //     createTime: "2019-05-14 10:49:15",
            //     createrName: "张三",
            //     customerId: 1,
            //     customerName: "江苏A客户",
            //     deleteTime: null,
            //     deleterName: null,
            //     deptName: "设计管理部",
            //     description: "系列A1的子计划",
            //     endDate: "2020-06-01",
            //     haveException: false,
            //     id: 4,
            //     isCompleted: false,
            //     isRoot: false,
            //     name: "系列AA1计划",
            //     note: "",
            //     number: "JX20190514001",
            //     parentId: 2,
            //     parentName: "系列A1计划",
            //     planObject: "Fall-2019(07/08/09)",
            //     planObjectId: 1,
            //     productDate: "2020-04-30",
            //     productDateType: "交货日期",
            //     productId: 1,
            //     projectType: "头样",
            //     proposal: "系列AA1",
            //     quantity: 10,
            //     rangeId: 1,
            //     rangeName: "Fall-2019(07/08/09)",
            //     rangeNumber: "XL20190101001",
            //     rejectReason: "驳回呀",
            //     startDate: "2019-05-11",
            //     state: "被驳回",
            //     type: "系列计划",
            //   }
            // ];
          });
      }else{
        console.log(param);
        this.$axios
          .get(`${window.$config.HOST}/planManagement/getDistributedPlanList`,{
            params:param
          })
          .then(response=>{
            this.tableData = response.data;
            this.tableData.forEach(element=>{
              if(element.isRoot){
                element.parentName = "根计划";
              }
            });

            //时间排序
            this.totalTableData.sort(function(a,b){
              return Date.parse(b.createTime)-Date.parse(a.createTime);
            }); 

            //分页
            this.pagination.total=response.data.length;
            let i = (this.pagination.currentPage-1) * this.pagination.pageSize;
            let k = (this.pagination.currentPage-1) * this.pagination.pageSize;
            this.tableDataShow=[];
        
            for(;i-k<this.pagination.pageSize&&i<this.tableData.length;i++)
            {
              this.tableDataShow.push(this.tableData[i]);
            }
          })
          .catch(error=>{
            this.$message.error("搜索失败!");
          });
      }
    },
    planTypeSwitchChange(){
      this.pagination.currentPage=1;
      this.tableData = [];
      this.handleSearch();

      if(this.isSelfMadePlan){
        this.searchOptions.options.planNameOptions = this.searchOptions.options.selfPlanNameOptions;
      }else{
        this.searchOptions.options.planNameOptions = this.searchOptions.options.distributedPlanNameOptions;
      }
      
    },
    //子计划顺序控制函数
    //上移
    moveUp(index,row){
      var that = this;
      // console.log('上移',index,row);
      // console.log(that.subPlanTableData[index]);
      if (index > 0) {
        let upDate = that.subPlanTableData[index - 1];
        that.subPlanTableData.splice(index - 1, 1);
        that.subPlanTableData.splice(index,0, upDate);
      } else {
        alert('已经是第一条，不可上移');
      }
      // console.log(that.subPlanTableData);
      },

    //下移
    moveDown(index,row){
      var that = this;
      // console.log('下移',index,row);
      if ((index + 1) === that.subPlanTableData.length){
        alert('已经是最后一条，不可下移');
      } else {
        console.log(index);
        let downDate = that.subPlanTableData[index + 1];
        that.subPlanTableData.splice(index + 1, 1);
        that.subPlanTableData.splice(index,0, downDate);
      }
    },
  }
};
</script>

<style lang="less" scoped>
  .Mtitle {
    font-size: 3ch;
    margin-left: 47%;
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
          width: 90px;
          min-width: 50px;
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
    .block {
      padding: 30px 0;
      text-align: center;
    }
  }
</style>
