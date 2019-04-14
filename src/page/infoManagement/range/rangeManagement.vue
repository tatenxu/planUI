<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="searchOptions.searchParams.customerName" >
              <el-option
                v-for="item in searchOptions.options.customerNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="searchOptions.searchParams.brandName" >
              <el-option
                v-for="item in searchOptions.options.brandNameOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="searchOptions.searchParams.clothingType" >
              <el-option
                v-for="item in searchOptions.options.clothingTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
              <el-input v-model=searchOptions.searchParams.rangeName placeholder="请输入系列名称"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
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
          <el-col :span="3">
            <el-button type="primary" @click="addRange">添加系列</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="importRange">批量导入</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="deleteRange">删除系列</el-button>
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
          <el-table-column prop="rangeNumber" width="130" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="customerName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothingType" label="服装层次" align="center"></el-table-column>
          <el-table-column prop="rangeName" width="170" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="addUser" label="添加人" align="center"></el-table-column>
          <el-table-column prop="dept" label="部门" align="center"></el-table-column>
          <el-table-column prop="addTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="addMethod" label="添加方式" align="center"></el-table-column>
          <el-table-column prop="rangeStatus" label="状态" align="center"></el-table-column>
          <el-table-column label="操作" width="150" min-width="100" align="center">
            <template slot-scope="scope">
              <el-button @click="getRangeData(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="changeRangeData(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="deleteRangeData(scope.row)" type="text" size="small">删除</el-button>
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

    <el-dialog  :modal="false" title="系列信息" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"> 
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="customerName" placeholder="请选择客户名称">
              <el-select v-model="ruleForm.customerName" >
                <el-option
                  v-for="item in options.customerNameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> 
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" prop="brandName">
                <el-select v-model="ruleForm.brandName" >
                  <el-option
                    v-for="item in options.brandNameOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item> 
          </el-col>
          <el-col :span="8">
            <el-form-item label="服装层次" prop="clothingType">
              <el-select v-model="ruleForm.clothingType" >
                <el-option
                  v-for="item in options.clothingTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="系列名称" prop="rangeName">
              <el-input v-model="ruleForm.rangeName" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系列款数" prop="rangeAmount">
              <el-input v-model="ruleForm.rangeAmount" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="24" >
            <el-form-item label="系列备注">
              <el-input v-model="ruleForm.rangeNote" type="textarea" :rows="3" placeholder="请输入"></el-input>
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
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
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
          clothingType: "",
          rangeName: "",
          dateRange: "", 
        },
        options: {
          customerNameOptions: [
            {
              value: 1,
              label: "A客户"
            },
            {
              value: 2,
              label: "B客户"
            },
          ],
          brandNameOptions: [
            {
              value: 1,
              label: "X品牌"
            },
            {
              value: 2,
              label: "Y品牌"
            },
          ],
          clothingTypeOptions: [
            {
              value: 1,
              label: "时装"
            },
            {
              value: 2,
              label: "精品"
            },
            {
              value: 3,
              label: "品牌"
            },
          ],
        }
      },
      data:{
        tableData:[
          {
            rangeNumber: "XL20190101001",
            customerName: "Qi-Collection",
            brandName: "Selkie",
            clothingType: "时装",
            rangeName: "Fall-2019(07/08/09)",
            addUser: "刘德华",
            dept: "业务1组",
            addTime: "2019-01-01 10:15:01",
            addMethod: "手动",
            rangeStatus: "已绑定",
            rangeAmount: "15",
            rangeNote: "系列备注1",
          },
          {
            rangeNumber: "XL20181001002",
            customerName: "A客户",
            brandName: "AAA品牌",
            clothingType: "时装",
            rangeName: "Spring-2019(01/02/03)",
            addUser: "刘德华",
            dept: "业务1组",
            addTime: "2018-10-01 09:25:01",
            addMethod: "导入",
            rangeStatus: "已绑定",
            rangeAmount: "10",
            rangeNote: "系列备注2",
          },
        ]
      },
      multipleSelection: [],
      rules:{
        customerName: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        brandName: [
          { required: true, message: '请选择品牌', trigger: 'change' }
        ],
        clothingType: [
          { required: true, message: '请选择服装层次', trigger: 'change' }
        ],
        rangeName: [
          { required: true, message: '请输入系列名称', trigger: 'blur' },
        ],
        rangeAmount: [
          { required: true, message: '请输入系列款数', trigger: 'blur' },
        ],
      },
      ruleForm: {
        customerName: "",
        brandName: "",
        clothingType: "",
        rangeName: "",
        rangeAmount: "",
        rangeNote: "",
      },
      options: {
        customerNameOptions: [
          {
            value: 1,
            label: "A客户"
          },
          {
            value: 2,
            label: "B客户"
          },
        ],
        brandNameOptions: [
          {
            value: 1,
            label: "X品牌"
          },
          {
            value: 2,
            label: "Y品牌"
          },
        ],
        clothingTypeOptions: [
          {
            value: 1,
            label: "时装"
          },
          {
            value: 2,
            label: "精品"
          },
          {
            value: 3,
            label: "品牌"
          },
        ],
      },
      controlData: {
        ifRangeAdd: false,
        ifRangeChange: false,
      },
    };
  },
  created: function () {
    const that = this;
    console.log("进入系列管理页面");
  },
  methods: {
    // 改变日期格式
    changeDate(date){
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var second= date.getSeconds();
      second = minute < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d+' '+h+':'+minute+':'+ second;
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
      console.log("搜索按钮点击");
      let searchConditionParams = that.collectSearchOptions();
    },
    // 添加系列
    addRange(){
      const that = this;
      console.log("添加系列按钮点击");
      /* that.$router.push({
        path: `/range/rangeInfo`,
        query: {
          ifRangeAdd: true,
        }
      }); */
      this.controlData.ifRangeAdd = true;
      this.dialogFormVisible = true;
    },
    // 批量导入
    importRange(){
      const that = this;
      console.log("批量导入按钮点击");
      that.$router.push({
        path: `/range/rangeImport`,
      });
    },
    // 删除系列
    deleteRange(){
      const that = this;
      console.log("删除系列按钮点击");
      if(that.multipleSelection.length ===0){
        this.$message({
          message: '请选择要删除的系列数据',
          type: 'warning'
        });
      }
      else if(that.multipleSelection.length >= 1){
        console.log("有" + that.multipleSelection.length + "条数据被选中");
        this.$confirm("删除所选的" + that.multipleSelection.length + "条系列信息, 是否继续?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          for (var i = 0; i < that.multipleSelection.length; i++){
            var result = that.multipleSelection[i];
            for(var j = 0; j < that.data.tableData.length; j++){
              var delResult = that.data.tableData[j];
              if ((delResult["rangeNumber"] === result.rangeNumber) && 
              (delResult["customerName"] === result.customerName) && 
              (delResult["brandName"] === result.brandName) && 
              (delResult["clothingType"] === result.clothingType) && 
              (delResult["rangeName"] === result.rangeName) && 
              (delResult["addUser"] === result.addUser) && 
              (delResult["dept"] === result.dept) &&
              (delResult["addMethod"] === result.addMethod) && 
              (delResult["rangeAmount"] === result.rangeAmount) && 
              (delResult["rangeNote"] === result.rangeNote)){
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
  
    //查看系列信息
    getRangeData(row){
      this.ruleForm.customerName = row.customerName;
      this.ruleForm.brandName = row.brandName;
      this.ruleForm.clothingType = row.clothingType;
      this.ruleForm.rangeName = row.rangeName;
      this.ruleForm.rangeAmount = row.rangeAmount;
      this.ruleForm.rangeNote = row.ifRangeAdd;
      this.controlData.ifRangeAdd = true;

      this.dialogFormVisible = true;
      /* this.$router.push({
        path: `/range/rangeInfo`,
        query: {
          ifRangeChange: true,
          customerName: row.customerName,
          brandName: row.brandName,
          clothingType: row.clothingType,
          rangeName: row.rangeName,
          rangeAmount: row.rangeAmount,
          rangeNote: row.rangeNote,
        }
      }); */
    },
    // 表格中的修改
    changeRangeData(row){
      const that = this;
      console.log("点击了本行的修改");
      /* that.$router.push({
        path: `/range/rangeInfo`,
        query: {
          ifRangeChange: true,
          customerName: row.customerName,
          brandName: row.brandName,
          clothingType: row.clothingType,
          rangeName: row.rangeName,
          rangeAmount: row.rangeAmount,
          rangeNote: row.rangeNote,
        }
      }); */
      this.ruleForm.customerName = row.customerName;
      this.ruleForm.brandName = row.brandName;
      this.ruleForm.clothingType = row.clothingType;
      this.ruleForm.rangeName = row.rangeName;
      this.ruleForm.rangeAmount = row.rangeAmount;
      this.ruleForm.rangeNote = row.ifRangeAdd;
      this.controlData.ifRangeChange = true;

      this.dialogFormVisible = true;
    },
    // 表格中的删除
    deleteRangeData(row){
      const that = this;
      console.log("点击了本行的删除");
      console.log("当前row=", row.rangeNumber);
      this.$confirm("是否确认删除该系列？", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        for(var j = 0; j < that.data.tableData.length; j++){
          var delResult = that.data.tableData[j];
          if ((delResult["rangeNumber"] === row.rangeNumber) && 
          (delResult["customerName"] === row.customerName) && 
          (delResult["brandName"] === row.brandName) && 
          (delResult["clothingType"] === row.clothingType) && 
          (delResult["rangeName"] === row.rangeName) && 
          (delResult["addUser"] === row.addUser) && 
          (delResult["dept"] === row.dept) &&
          (delResult["addMethod"] === row.addMethod) && 
          (delResult["rangeAmount"] === row.rangeAmount) && 
          (delResult["rangeNote"] === row.rangeNote)){
            that.data.tableData.splice(j,1);
          }
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(that.controlData.ifRangeAdd === true){
            this.$message({
              message: '成功新增系列信息',
              type: 'success'
            });
          }
          if(that.controlData.ifRangeChange === true){
            this.$message({
              message: '成功修改系列信息',
              type: 'success'
            });
          }
        } 
        else {
          console.log('error submit!!');
          return false;
        }
      });
      /* that.$router.push({
        path: `/range/rangeManagement`,
      }); */
      this.dialogFormVisible = false;
    },
    // 取消按钮点击
    cancel(){
      const that = this;
      console.log("取消按钮点击");
      // that.$router.push({
      //   path: `/range/rangeManagement`,
      // });
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