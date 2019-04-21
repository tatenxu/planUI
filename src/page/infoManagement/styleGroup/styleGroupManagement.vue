<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title" >客户名称</div>
            <el-select v-model="searchOptions.searchParams.customerName" @change="customerNameSelectionChange()">
              <el-option
                v-for="item in searchOptions.options.customerNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="searchOptions.searchParams.brandName" @change="brandSelectionChange()" >
              <el-option
                v-for="item in searchOptions.options.brandNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        
        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
              <el-select v-model="searchOptions.searchParams.rangeName" @change="rangeSelectionChange()">
              <el-option
                v-for="item in searchOptions.options.rangeNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">款式组名</div>
            <el-select v-model="searchOptions.searchParams.styleGroupName" >
              <el-option
                v-for="item in searchOptions.options.styleGroupNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="searchOptions.searchParams.clothingLevelName" >
              <el-option
                v-for="item in searchOptions.options.clothingTypeOptions"
                :key="item.id"
                :label="item.clothingLevelName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              class="inputBar"
              v-model='searchOptions.searchParams.dateRange'
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card">
      <div class="table">
        <el-row :gutter="10">
          <el-col :span="4">
            <el-button type="primary" @click="addStyleGroup">添加款式组</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="deleteStyleGroup">删除款式组</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="unbindStyleGroup"> 解绑款式组</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="data.tableData"
          max-height="400"
          border
          @selection-change="changeCheckBoxFun"
          :stripe="true"
          :highlight-current-row="true"
          style="width: 100%; margin-top: 20px">
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="styleGroupNumber" width="150" label="款式组编号" align="center"></el-table-column>
          <el-table-column prop="styleGroupName" width="150" label="款式组名称" align="center"></el-table-column>
          <el-table-column prop="rangeNumber" width="130" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="customerName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="rangeName" width="150" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothingLevelName" label="服装层次" align="center"></el-table-column>
          <el-table-column prop="createrName" label="添加人" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="state" width="70" label="状态" align="center"></el-table-column>
          <el-table-column prop="createTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column label="操作" width="150" min-width="100" align="center">
            <template slot-scope="scope">
              <!-- <el-button @click="getStyleGroupData(scope.row)" type="text" size="small">查看</el-button> -->
              <el-button @click="changeStyleGroupData(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="deleteStyleGroupData(scope.row)" type="text" size="small">删除</el-button>
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
            :total="pagination.total">
          </el-pagination>
        </div>
      </div>
    </el-card>

    <el-dialog  :modal="false" title="款式组信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="customerName" placeholder="请选择客户名称">
              <el-select v-model="ruleForm.tmpCustomer" @change="dialogCustomerNameSelectionChange()" >
                <el-option
                  v-for="item in options.customerNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item> 
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" prop="brandName" placeholder="请选择品牌名称">
              <el-select v-model="ruleForm.tmpBrand" @change="dialogBrandSelectionChange()">
                <el-option
                  v-for="item in options.brandNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item> 
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="服装层次" prop="clothingLevelName" placeholder="请选择服装层次">
              <el-select v-model="ruleForm.clothingLevelName" >
                <el-option
                  v-for="item in options.clothingTypeOptions"
                  :key="item.id"
                  :label="item.clothingLevelName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item> 
          </el-col> -->
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="系列名称" prop="rangeName" placeholder="请选择系列名称">
              <el-select v-model="ruleForm.tmpRange" >
                <el-option
                  v-for="item in options.rangeNameTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item> 
          </el-col>
          <el-col :span="8">
            <el-form-item label="款式组名" prop="styleNumber" placeholder="请输入款式组名">
              <el-input v-model="ruleForm.tmpStyleGroup" clearable placeholder="请输入"></el-input>
            </el-form-item> 
          </el-col>
        </el-row>
        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="3" :offset="10">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" @click="cancel">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import styleManagementVue from '../style/styleManagement.vue';
import { error } from 'util';
export default {
  data() {
    return {
      pagination: {
        currentPage: 1,
        pageSizes: [5, 10, 20, 30, 50],
        pageSize: 5,
        total: 400,
      },
      searchOptions:{
        searchParams :{
          customerName: "",
          brandName: "",
          clothingLevelName: "",
          rangeName: "",
          styleGroupName: "",
          dateRange: "", 
        },
        options: {
          customerNameOptions: [],
          brandNameOptions: [],
          clothingTypeOptions: [],
          rangeNameOptions: [],
          styleGroupNameOptions:[],
        }
      },
      data:{
        tableData:[]
      },
      multipleSelection: [],
      dialogFormVisible: false,
      rules: {
        customerName: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        brandName: [
          { required: true, message: '请选择品牌', trigger: 'change' }
        ],
        clothingLevelName: [
          { required: true, message: '请选择服装层次', trigger: 'change' }
        ],
        rangeName: [
          { required: true, message: '请选择系列名称', trigger: 'change' },
        ],
        styleGroupName: [
          { required: true, message: '请输入款式组名', trigger: 'blur' },
        ],
      },
      ruleForm: {
        tmpCustomer:"",
        tmpBrand:"",
        tmpRange:"",
        tmpStyleGroup:"",

        styleGroupId: "",
        styleGroupNumber: "",
        styleGroupName: "",
        rangeNumber:"" ,
        rangeId: "",
        rangeName:"" ,
        customerName:"" ,
        customerId:"",
        brandName: "",
        brandId: "",
        clothingLevelName:"" ,
        clothingLevelId:"",
        createrName: "",
        deptName: "",
        createTime: "",
        state:"",
        havePlan:"",
      },
      options: {
        customerNameOptions: [],
        brandNameOptions: [],
        clothingTypeOptions: [],
        rangeNameTypeOptions: [],
      },
      controlData: {
        ifStyleGroupAdd: false,
        ifStyleGroupChange: false,
      },
    };
  },
  created: function () {
    const that = this;
    console.log('进入款式组管理页面');

    //获取客户名称
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getCustomer`)
      .then(response => {
        console.log("getCustomer 成功");
        var resData = response.data;
        resData.forEach(element => {
          this.searchOptions.options.customerNameOptions.push({
            id:element.id,
            name:element.name,
          });
          this.options.customerNameOptions = this.searchOptions.options.customerNameOptions;
        });
      })
      .catch(error => {
        console.log("getCustomer error!");
        this.searchOptions.options.customerNameOptions = [
          {
            id: 42453,
            name: "A客户"
          },
          {
            id: 41526,
            name: "B客户"
          },
        ];
        this.options.customerNameOptions = this.searchOptions.options.customerNameOptions;
      });

    //获取服装层次
    that.$axios
    .get(`${window.$config.HOST}/InfoManagement/getClothingLevel`)
    .then(response => {
      var ClothingList = response;
      this.searchOptions.options.clothingTypeOptions = ClothingList;
    })
    .catch(error => {
      var ClothingList = [
        {
          id: 1,
          clothingLevelName: "时装"
        },
        {
          id: 2,
          clothingLevelName: "精品"
        },
        {
          id: 3,
          clothingLevelName: "时尚"
        }
      ];
      this.searchOptions.options.clothingTypeOptions = ClothingList;
      this.options.clothingTypeOptions = ClothingList;
    });

    //默认获取所有款式组
    this.$axios
      .get(`${window.$config.HOST}/InfoManagement/getStyleGroupList`)
      .then(response => {
        var SearchList = response.data;
        this.data.tableData = SearchList;

        SearchList.forEach(element=>{
          this.data.tableData.push({
            styleGroupId: element.id,
            styleGroupNumber: element.number,
            styleGroupName: element.name,
            rangeNumber: element.rangeNumber,
            rangeId: element.rangeId,
            rangeName: element.rangeName,
            customerName: element.customerName,
            customerId:element.customerId,
            brandName: element.brandName,
            brandId: element.brandId,
            clothingLevelName: element.clothingLevelName,
            clothingLevelId:element.clothingLevelId,
            createrName: element.createrName,
            deptName: element.deptName,
            createTime: element.createTime,
            state:element.state,
            havePlan:element.havePlan,
          });
        });

      })
      .catch(error => {
        var SearchList = [
          {
            styleGroupId: "475342343",
            styleGroupNumber: "KSZ20190101001",
            styleGroupName: "款式1组",
            rangeNumber:"XL20190101001" ,
            rangeId: "48674231",
            rangeName:"Fall-2019(07/08/09)" ,
            customerName:"Qi-Collection" ,
            customerId:"745341",
            brandName: "Selkie",
            brandId: "574531423",
            clothingLevelName:"时装" ,
            clothingLevelId:"575123",
            createrName: "刘德华",
            deptName: "业务1组",
            createTime: "2019-01-01 10:15:01",
            state:"已下发",
            havePlan:"1",
          },
        ];
        this.data.tableData = SearchList;
      });
 
    //品牌名称选择获取
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getBrand`)
      .then(response => {
        if(response.data.errcode < 0){
          console.log("品牌名称选择错误");
        }else{
          response.data.forEach(element=>{
            this.searchOptions.options.brandNameOptions.push({
              id: element.id,
              name: element.name
            });
          });
          this.options.brandNameOptions = this.searchOptions.options.brandNameOptions;
        }
      })
      .catch(error => {
        console.log("品牌名称选择错误");
        this.searchOptions.options.brandNameOptions = [
          {
            id: 1,
            name: "X品牌"
          },
          {
            id: 2,
            name: "Y品牌"
          },
        ];
        this.options.brandNameOptions = this.searchOptions.options.brandNameOptions;
      });

    //获取系列
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getRange`)
      .then(response => {
        if(response.data.errcode < 0){
          console.log("系列名称获取错误");
        }else{
          response.data.forEach(element=>{
            this.searchOptions.options.rangeNameOptions.push({
              id: element.id,
              name: element.name
            });
          });

          this.options.rangeNameTypeOptions = this.searchOptions.options.rangeNameOptions;
        }
      })
      .catch(error => {
        console.log("品牌名称选择错误");
        this.searchOptions.options.rangeNameOptions = [
          {
            id: 1,
            name: "Fall-2019(07/08/09)"
          },
          {
            id: 2,
            name: "Spring-2019(01/02/03)"
          },
          {
            id: 3,
            name: "Winter-2019(10/11/12)"
          },
        ];
        this.options.rangeNameTypeOptions = this.searchOptions.options.rangeNameOptions;
      });
    
    //获取款式组名
    this.$axios
      .get(`${window.$config.HOST}/infoManagement/getStyleGroupName`)
      .then(response => {
        if(response.data.errcode < 0){
          console.log("款式组获取错误");
        }else{
          response.data.forEach(element=>{
            this.searchOptions.options.styleGroupNameOptions.push({
              id:element.name,
              name:element.name
            });
          });
        }
      })
      .catch(error => {
        console.log("款式组获取错误");
        this.searchOptions.options.styleGroupNameOptions = [
          {
            id: 5451,
            name: "款式组1"
          },
          {
            id: 27452,
            name: "款式组2"
          },
          {
            id: 356,
            name: "款式组3"
          },
        ];
      });

  },
  methods: {
    //系列选择触发款式组名get
    rangeSelectionChange(){
      console.log("系列名称选择触发");
      console.log(this.searchOptions.searchParams.rangeName);
      // var param = {
      //   brandId: this.searchOptions.searchParams.rangeName,
      // };
      
    },
    //品牌选择触发系列名称get
    brandSelectionChange(){
      console.log("品牌名称选择触发");
      console.log(this.searchOptions.searchParams.brandName);
      // var param = {
      //   brandId: this.searchOptions.searchParams.brandName,
      // };
      
    },
    //品牌名称选择后触发品牌的get请求
    dialogBrandSelectionChange(){
      // consol.log(val);
      console.log("对话框品牌名称选择触发");
      console.log(this.ruleForm.brandName);
      // var param = {
      //   customerId: this.ruleForm.brandName,
      // };
      
    },
    //客户名称选择后触发品牌的get请求
    customerNameSelectionChange(){
      // consol.log(val);
      console.log("客户名称选择触发");
      console.log(this.searchOptions.searchParams.customerName);
      
    },
    //客户名称选择后触发品牌的get请求
    dialogCustomerNameSelectionChange(){
      // consol.log(val);
      console.log("对话框客户名称选择触发");
      console.log(this.ruleForm.customerName);
      // var param = {
      //   customerId: this.ruleForm.customerName,
      // };
    },
    // 改变日期格式
    // 改变日期格式
    changeDate(date) {
      console.log(date);
      if(!date){
        return "";
      }else{
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
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      }
    },
    // 每页条数改变时触发函数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 选择框改变监控
    changeCheckBoxFun(val){
      const that = this;
      that.multipleSelection = val;
      console.log("changeCheckBox所选中的内容如下");
      console.log(that.multipleSelection);
      console.log("changeCheckBox所选中的内容的长度为",that.multipleSelection.length);
    },
    // 搜集搜索条件
    collectSearchOptions(){ 
      const that = this;
      let searchCondition = {};
      for (let key in that.searchOptions.searchParams){
        if (that.searchOptions.searchParams[key] !== "") {
          if (key == "dateRange"){
            var dateRange = that.searchOptions.searchParams[key];
            var DateStart = that.changeDate(dateRange[0]);
            searchCondition["DateStart"] = DateStart;
            var DateEnd = that.changeDate(dateRange[1]);
            searchCondition["DateEnd"] = DateEnd;
          }
          else{
            searchCondition[key] = that.searchOptions.searchParams[key];
          }
        }
      }
      console.log("当前搜索条件", searchCondition);
      return searchCondition;
    },
    // 搜索按钮点击
    handleSearch(){
      const that = this;
      console.log('搜索');
      let searchConditionParams = that.collectSearchOptions();
      this.$axios
        .get(`${window.$config.HOST}/infoManagement/getStyleGroupList`,searchConditionParams)
        .then(response=>{
          var data = response.data;

        })
        .catch(error=>{
          var SearchList = [
            {
              styleGroupId: "475342343",
              styleGroupNumber: "KSZ20190101001",
              styleGroupName: "款式1组",
              rangeNumber:"XL20190101001" ,
              rangeId: "48674231",
              rangeName:"Fall-2019(07/08/09)" ,
              customerName:"Qi-Collection" ,
              customerId:"745341",
              brandName: "Selkie",
              brandId: "574531423",
              clothingLevelName:"时装" ,
              clothingLevelId:"575123",
              createrName: "刘德华",
              deptName: "业务1组",
              createTime: "2019-01-01 10:15:01",
              state:"已下发",
              havePlan:"1",
            },
            {
              styleGroupId: "475342343",
              styleGroupNumber: "KSZ20190101001",
              styleGroupName: "款式2组",
              rangeNumber:"XL20190101001" ,
              rangeId: "48674231",
              rangeName:"Fall-2019(07/08/09)" ,
              customerName:"Qi-Collection" ,
              customerId:"745341",
              brandName: "Selkie",
              brandId: "574531423",
              clothingLevelName:"时装" ,
              clothingLevelId:"575123",
              createrName: "刘德华",
              deptName: "业务1组",
              createTime: "2019-01-01 10:15:01",
              state:"已下发",
              havePlan:"1",
            },
            {
              styleGroupId: "475342343",
              styleGroupNumber: "KSZ20190101001",
              styleGroupName: "款式3组",
              rangeNumber:"XL20190101001" ,
              rangeId: "48674231",
              rangeName:"Fall-2019(07/08/09)" ,
              customerName:"Qi-Collection" ,
              customerId:"745341",
              brandName: "Selkie",
              brandId: "574531423",
              clothingLevelName:"时装" ,
              clothingLevelId:"575123",
              createrName: "刘德华",
              deptName: "业务1组",
              createTime: "2019-01-01 10:15:01",
              state:"已下发",
              havePlan:"1",
            },
          ];
          this.data.tableData = SearchList;
        });
    },
    // 添加款式组
    addStyleGroup(){
      const that = this;
      console.log('添加款式组按钮点击');
      
      this.controlData.ifStyleGroupAdd = true;

      this.dialogFormVisible = true;
    },
    // 删除款式组
    deleteStyleGroup(){
      const that = this;
      console.log('删除款式组按钮点击');
      if(that.multipleSelection.length ===0){
        this.$message({
          message: '请选择要删除的款式组',
          type: 'warning'
        });
      }
      else if(that.multipleSelection.length >= 1){
        console.log("有" + that.multipleSelection.length + "条数据被选中");
        this.$confirm("删除所选的" + that.multipleSelection.length + "条款式组信息, 是否继续?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          for (var i = 0; i < that.multipleSelection.length; i++){
            var result = that.multipleSelection[i];

            deleteStyleGroupData(result);
            for(var j = 0; j < that.data.tableData.length; j++){
              var delResult = that.data.tableData[j];
              if ((delResult["styleGroupNumber"] === result.styleGroupNumber) && 
              (delResult["styleGroupName"] === result.styleGroupName) && 
              (delResult["styleNumber"] === result.styleNumber) && 
              (delResult["customerName"] === result.customerName) && 
              (delResult["brandName"] === result.brandName) && 
              (delResult["clothingLevelName"] === result.clothingLevelName) &&
              (delResult["rangeName"] === result.rangeName) && 
              (delResult["createrName"] === result.createrName) && 
              (delResult["deptName"] === result.deptName) && 
              (delResult["createTime"] === result.createTime)){
                that.data.tableData.splice(j,1);
              }
            }
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    },
    // 解绑款式组
    unbindStyleGroup(){
      const that = this;
      console.log('解绑款式组按钮点击');
      if(that.multipleSelection.length ===0){
        this.$message({
          message: '请选择要解绑的款式组',
          type: 'warning'
        });
      }
      else if(that.multipleSelection.length >= 1){
        console.log("有" + that.multipleSelection.length + "条数据被选中");
        this.$confirm("解绑所选的" + that.multipleSelection.length + "条款式组, 是否继续?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.multipleSelection.forEach(element=>{
            console.log("开始解绑");
            this.$axios.post((`${window.$config.HOST}/infoManagement/unbindStyleGroup`),{
              id:element.styleGroupId,
            })
              .then(response=>{
                var resData = response.data;
                if(resData.errcode < 0){
                  this.$message.error(element.styleGroupName+"解绑失败!")
                }else{
                  this.$message({
                    type: 'success',
                    message: element.styleGroupNam + '解绑成功!'
                  });
                }
              })
              .catch(error=>{
                this.$message.error(element.styleGroupName+"解绑失败!")
              });
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解绑'
          });          
        });
      }
    },
    /* //查看操作
    getStyleGroupData(row){
      this.ruleForm.customerName = row.customerName;
      this.ruleForm.brandName = row.brandName;
      this.ruleForm.clothingLevelName = row.clothingLevelName;
      this.ruleForm.rangeName = row.rangeName;
      this.ruleForm.styleGroupName = row.styleGroupName;

      this.dialogFormVisible = true;

    }, */
    // 表格中的修改
    changeStyleGroupData(row){
      const that = this;
      console.log("点击了本行的修改");
      this.controlData.ifStyleGroupChange = true;
      
      this.ruleForm.tmpCustomer = row.customerName,
      this.ruleForm.tmpBrand = row.brandName,
      this.ruleForm.tmpRange = row.rangeName,
      this.ruleForm.tmpStyleGroup = row.styleGroupName,

      this.ruleForm.styleGroupId = row.styleGroupId,
      this.ruleForm.styleGroupNumber= row.styleGroupNumber,
      this.ruleForm.styleGroupName= row.styleGroupName,
      this.ruleForm.rangeNumber=row.rangeNumber,
      this.ruleForm.rangeId=row.rangeId,
      this.ruleForm.rangeName= row.rangeName,
      this.ruleForm.customerName= row.customerName,
      this.ruleForm.customerId=row.customerId,
      this.ruleForm.brandName= row.brandName,
      this.ruleForm.brandId= row.brandId,
      this.ruleForm.clothingLevelName= row.clothingLevelName,
      this.ruleForm.clothingLevelId=row.clothingLevelId,
      this.ruleForm.createrName= row.createrName,
      this.ruleForm.deptName= row.deptName,
      this.ruleForm.createTime= row.createTime,
      this.ruleForm.state=row.state,
      this.ruleForm.havePlan=row.havePlan,

      this.dialogFormVisible = true;
    },
    // 表格中的删除
    deleteStyleGroupData(row){
      const that = this;
      console.log("点击了本行的删除");
      this.$confirm("是否确认删除该款式组？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        for(var j = 0; j < that.data.tableData.length; j++){
          var delResult = that.data.tableData[j];
          if ((delResult["styleGroupNumber"] === row.styleGroupNumber) && 
          (delResult["styleGroupName"] === row.styleGroupName) && 
          (delResult["styleNumber"] === row.styleNumber) && 
          (delResult["customerName"] === row.customerName) && 
          (delResult["brandName"] === row.brandName) && 
          (delResult["clothingLevelName"] === row.clothingLevelName) &&
          (delResult["rangeName"] === row.rangeName) && 
          (delResult["createrName"] === row.createrName) && 
          (delResult["deptName"] === row.deptName) && 
          (delResult["createTime"] === row.createTime)){
            this.$axios.post((`${window.$config.HOST}/infoManagement/deleteStyleGroup`),{
              id:row.styleGroupId,
            })
              .then(response=>{
                var resData = response.data;
                if(resData.errorCode >= 0){
                  that.data.tableData.splice(j,1);
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }else{
                  this.$message({
                    type: 'danger',
                    message: '删除失败!'
                  }); 
                }
              })
              .catch(error=>{
                this.$message.error(
                    '删除失败!'
                  ); 
              });
          }
        }
      }).
      catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 保存按钮点击
    submitForm(formName){
      const that = this;
      console.log("保存按钮点击");

      // console.log(this.ruleForm.customerId);
      var params = {
        id : this.ruleForm.styleGroupId,
        name : this.ruleForm.tmpStyleGroup ,
        customerId : ((this.ruleForm.tmpCustomer === this.ruleForm.customerName)? this.ruleForm.customerId:this.ruleForm.tmpCustomer),
        brandId : ((this.ruleForm.tmpBrand === this.ruleForm.brandName)? this.ruleForm.brandId:this.ruleForm.tmpBrand),
        rangeId :  ((this.ruleForm.tmpRange === this.ruleForm.rangeName)? this.ruleForm.rangeId:this.ruleForm.tmpRange),
        // clothingLevelId: this.ruleForm.clothingLevelName,
      };

      console.log(params);

      if(this.controlData.ifStyleGroupAdd){
        this.$axios
          .post(`${window.$config.HOST}/infoManagement/addStyleGroup`,params)
          .then(response=>{
            var resData = response.data;
            if(resData.errorCode >= 0){
              this.$message({
                message: '成功新增款式组信息',
                type: 'success'
              });
            }else{
              this.$message.error('新增款式组信息失败');
            }
          })
          .catch(error=>{
            this.$message.error('新增款式组信息失败');
          });
      }else if(this.controlData.ifStyleGroupChange){
        this.$axios
          .post(`${window.$config.HOST}/infoManagement/updateStyleGroup`,params)
          .then(response=>{
            var resData = response.data;
            if(resData.errorCode >= 0){
              this.$message({
                message: '成功修改款式组信息',
                type: 'success'
              });
            }else{
              this.$message.error('修改款式组信息失败');
            }
          })
          .catch(error=>{
            this.$message.error('修改款式组信息失败');
          });
      }
      
      
      this.handleSearch();

      this.dialogFormVisible = false;
    },
    // 取消按钮点击
    cancel(){
      const that = this;
      console.log("取消按钮点击");
      /* that.$router.push({
        path: `/styleGroup/styleGroupManagement`,
      }); */
      this.dialogFormVisible = false;
    }
  }
}
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