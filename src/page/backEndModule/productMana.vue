<template>
 <!-- 本页面经讨论不再使用，无需查看 -->
  <el-card class="box-card">
    <el-tabs v-model="viewname" @tab-click="handleTabClick" class="cardTab">
      <el-tab-pane label="产品信息管理" name="first" class="tabPane">
        <el-container class="paneContainer">
          <el-header clas="containerHeader">
            <el-row :gutter="20">
              <el-col :span="2">
                <div>
                  <el-button type="primary" @click="handleNewInfoClick()">新增信息</el-button>
                </div>
              </el-col>

              <el-col :span="2">
                <div>
                  <el-button type="primary" @click="handleEditInfoClick()">编辑信息</el-button>
                </div>
              </el-col>

              <el-col :span="2">
                <div>
                 <el-button type="primary" @click="handleDeleteInfoClick()">删除信息</el-button>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="containerHeaderDiv2">
                  <el-button type="primary" @click="handleSearchClick(false)" >搜索产品</el-button>
                  <el-input v-model="searchInput" class="nameInput" placeholder="请输入产品名称"></el-input>
                  <span class="inputTag">产品名称:</span>
              </div>
              </el-col>
            </el-row>
            <hr />
          </el-header>

          <el-main clas="containerMain">
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="id" label="id" width="120" v-if="false" ></el-table-column>
            <el-table-column prop="number" label="产品编号" width="120"  ></el-table-column>
            <el-table-column prop="name"  label="产品名称"  width="120"></el-table-column>
            <el-table-column prop="description"  label="产品描述"  width="120"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="deptName"  label="产品部门"  show-overflow-tooltip> </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button type="info" @click="toggleSelection()">取消选择</el-button>
          </div>
          </el-main>
        </el-container>
      </el-tab-pane>

      <el-tab-pane label="新增产品信息" name="second" v-if="newCardShowFlag">
        <el-card>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="add-ruleForm">
            <el-form-item label="产品编号:" prop="addInfoCode">
              <el-input v-model="ruleForm.addInfoCode" class="inputStyle" placeholder="请输入产品名称" ></el-input>
            </el-form-item>
            <el-form-item label="产品名称:" prop="addInfoName">
              <el-input v-model="ruleForm.addInfoName" class="inputStyle" placeholder="请输入产品简称"></el-input>
            </el-form-item>
            <el-form-item label="产品部门:" prop="addInfoDepart">
              <el-cascader
                expand-trigger="hover"
                :options="selectionData"
                v-model="ruleForm.addInfoDepart"
                :props="deptToCascaderProps"
                :change-on-select="true"
              >
              </el-cascader>            
            </el-form-item>
            <el-form-item label="产品描述" prop="addInfoDescription">
              <el-input
                class="inputArea"
                type="textarea"
                :rows="4"
                placeholder="请输入产品描述"
                v-model="ruleForm.addInfoDescription">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="save" @click="handleNewSaveClick('ruleForm')">保存</el-button>
            <el-button type="primary" class="cancel" @click="handleNewCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑产品信息" name="third" v-if="editCardShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">产品编号:</span>
            <el-input v-model="editInfoCode" class="input" placeholder="请输入产品名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">产品名称:</span>
            <el-input v-model="editInfoName" class="input" placeholder="请输入产品简称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">产品部门:</span>
            <el-cascader
              expand-trigger="hover"
              :options="selectionData"
              v-model="editInfoDepart"
              :props="deptToCascaderProps"
              :change-on-select="true"
              :placeholder="editInfoDepartPlaceHolder"
             >
            </el-cascader>
            <!-- <el-input  class="input"  placeholder="请输入产品部门"  v-model="editInfoDepart"></el-input> -->
          </div>
          <div class="inputCombine">
            <span class="inputTag">产品描述:</span>
            <el-input
              class="inputArea"
              type="textarea"
              :rows="4"
              placeholder="请输入产品描述"
              v-model="editInfoDescription">
            </el-input>
          </div>
          <div class="secondButtonDiv">
            <el-button type="primary" @click="handleEditSaveClick()" class="save">保存</el-button>
            <el-button type="primary" @click="handleEditCancelClick()" class="cancel">取消</el-button>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<style lang="less" scoped>
  .box-card{
    min-width: 1500px;
    margin: 20px 50px;
    padding: 0 20px;
  }
  
  // background: black;
  .containerHeaderDiv2{
    // margin-right: 100px;
    // background: white;
    display: flex;
    flex-direction: row-reverse;
    min-width: 500px;
    .nameInput{
      min-width: 100px;
      max-width: 200px;
    }
    .inputTag{
      font-size: 18px;
      line-height: 40px;
      min-width: 90px;
    }
  }
  .add-ruleForm{
    min-width: 250px;
    max-width: 500px;
  }

  .inputCombine{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    min-width: 250px;
    max-width: 500px;
    .inputTag{
      font-size: 18px;
      line-height: 40px;
      min-width: 90px;
    }
  }

  .secondButtonDiv{
    margin-top: 20px;
    min-width: 250px;
    max-width: 500px;
    // background: black;
    .save{
      margin-left: 68%;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        deptToCascaderProps:{
          value:'name',
          label:'name',
          children:'children'
        },
        viewname: 'first',
        searchInput: '',
        tableData: [],
        selectionData: [],
        multipleSelection: [],

        editInfoId:'',
        editInfoDescription:'',
        editInfoName:'',
        editInfoCode:'',
        editInfoDepart:[],
        editInfoDepartPlaceHolder:'',
        editInfoDepartId:'',
        tmpeditInfoDepartName:'',

        ruleForm:{
          addInfoDescription:'',
          addInfoName:'',
          addInfoCode:'',
          addInfoDepart:[],
        },
        rules:{
          addInfoDescription:[{ required: true, message: '请输入产品描述', trigger: 'blur' },],
          addInfoName:[{ required: true, message: '请输入产品名称', trigger: 'blur' },],
          addInfoCode:[{ required: true, message: '请输入产品编码', trigger: 'blur' },],
          addInfoDepart:[{ required: true, message: '请选择产品部门', trigger: 'blur' },],
        },

        newCardShowFlag:false,
        editCardShowFlag: false,

        baseInfoManagementErrorCode : [
          {
            errorCode:0,
            errorInfo:"未知错误",
          },
          {
            errorCode:-1,
            errorInfo:"传送的对象属性中存在null",
          },
          {
            errorCode:-2,
            errorInfo:"字段重复",
          },
          {
            errorCode:-3,
            errorInfo:"参数存在不一致",
          },
          {
            errorCode:-4,
            errorInfo:"当前数据库记录不符合逻辑要求",
          },
          {
            errorCode:-5,
            errorInfo:"未知错所要查询的数据在数据库中不存在",
          },
        ]
      };
    },
    created:function(){
      //获取所有信息
      let that = this;
      that.$axios.get(`${window.$config.HOST}/baseInfoManagement/getProduct`,{
        params:{ name:undefined },
      })
        .then(response=>{
          this.tableData = response.data;
        })
        .catch(error=>{
          this.$message.error("产品信息搜索失败!");
        });
      
      //获取部门信息
      that.$axios.get(`${window.$config.HOST2}/getDeptTree`)
        .then(response=>{
          this.selectionData = response.data;
        })
        .catch(error=>{
          this.$message.error("部门信息加载失败!");
          console.log("部门信息加载失败!");
        });
    },
    methods: {
      
      handleTabClick(tab, event) {
        console.log(tab, event);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSearchClick(allFlag){
        var param = {name:undefined};
        if(!allFlag){
          param = {
            name: (this.searchInput==="")?undefined:this.searchInput,
          };
        }
        
        console.log("搜索"+this.searchInput);

        this.$axios
          .get(`${window.$config.HOST}/baseInfoManagement/getProduct`,{
            params:param,
          })
          .then(response=>{
            this.tableData = response.data;
          })
          .catch(error=>{
            this.$message.error("产品信息搜索失败!");
          });
      },
      handleNewInfoClick(){
        this.newCardShowFlag = true;
        this.viewname = 'second';
        console.log(this.viewname);
      },
      transferDepartNameToCasadeForm(deptName){
        var resultList = [];
        
      },
      handleEditInfoClick(){
        if(this.multipleSelection.length === 0){
          this.$message({
            message:'请选择一个产品信息',
            type:'warning'
          });
          return;
        }
        if(this.multipleSelection.length > 1){
          this.$message({
            message:'只能选择一个信息进行编辑',
            type:'warning'
          });
          return;
        }
        this.editCardShowFlag = true;
        console.log(this.multipleSelection[0]);
        this.editInfoName = this.multipleSelection[0].name;
        this.editInfoCode = this.multipleSelection[0].number;

        this.tmpeditInfoDepartName = this.multipleSelection[0].deptName;
        this.editInfoDepartPlaceHolder = this.multipleSelection[0].deptName;

        this.editInfoDepart = [this.multipleSelection[0].deptName,];
        this.editInfoDepartId = this.multipleSelection[0].departmentId;
        this.editInfoDescription = this.multipleSelection[0].description;
        this.editInfoId = this.multipleSelection[0].id;
        this.viewname = 'third';
      },
      handleDeleteInfoClick(){
        if(this.multipleSelection.length === 0){
          this.$message({
            message:'至少选择一个产品',
            type:'warning'
          });
        }


        this.$confirm('是否确认删除该记录？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.forEach(element => {
          this.$axios.delete(`${window.$config.HOST}/baseInfoManagement/deleteProduct`,{
            params:{id: element.id}
          })
            .then(response=>{
              if(response.data<0){
                console.log("删除失败:"+this.baseInfoManagementErrorCode[-response.data].errorInfo);
                this.$message.error("删除失败:"+this.baseInfoManagementErrorCode[-response.data].errorInfo);
              }
              this.handleSearchClick(true);
              this.$message({
                message:"删除成功!",
                type:'success'
              });
            })
            .catch(error=>{
                console.log(element.name+"删除失败");
                this.$message.error(element.name+"删除失败");
            });          
        });
        // this.tableData = this.multipleSelection;
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      
       
      },
      handleNewSaveClick(){
        var param = {
          number : (this.ruleForm.addInfoCode==="")?undefined:this.ruleForm.addInfoCode,
          name : (this.ruleForm.addInfoName==="")?undefined:this.ruleForm.addInfoName,
          description : (this.ruleForm.addInfoDescription==="")?undefined:this.ruleForm.addInfoDescription,
          deptName : (this.ruleForm.addInfoDepart.length===0)?
                        undefined:this.ruleForm.addInfoDepart[this.ruleForm.addInfoDepart.length-1],
        };
        console.log(param);
        
        this.$axios.post(`${window.$config.HOST}/baseInfoManagement/addProduct`,param)
          .then(response=>{
            if(response.data<0){
              console.log("后台添加失败:"+this.baseInfoManagementErrorCode[-response.data].errorInfo);
              this.$message.error("添加失败:"+this.baseInfoManagementErrorCode[-response.data].errorInfo);
              return;
            }
            this.$message({
              message:'保存成功!',
              type:'success'
            });
            this.handleSearchClick(true);

            this.newCardShowFlag = false;
            this.viewname = "first";

            this.ruleForm.addInfoName = "";
            this.ruleForm.addInfoCode = "";
            this.ruleForm.addInfoDescription = "";
            this.ruleForm.ddInfoDepart = [];
          })
          .catch(error=>{
            this.$message.error("添加失败!");
            this.handleSearchClick(true);
          });

        return;
      },
      handleNewCancelClick(){
        this.newCardShowFlag = false;
        this.viewname = "first";

        this.$message({
          message:'取消新增!',
          type:'info'
        });
        return;
      },
      handleEditSaveClick(){
        var departInfoTmp = (this.editInfoDepart===[this.tmpeditInfoDepartName,])?
                          this.tmpeditInfoDepartName:this.editInfoDepart[this.editInfoDepart.length-1];
        var param = {
          id: this.editInfoId,
          number : (this.editInfoCode==="")?undefined:this.editInfoCode,
          name : (this.editInfoName==="")?undefined:this.editInfoName,
          description : (this.editInfoDescription==="")?undefined:this.editInfoDescription,
          deptName : (departInfoTmp === "")?undefined:departInfoTmp,
        };
        console.log(param);
        
        this.$axios.post(`${window.$config.HOST}/baseInfoManagement/updateProduct`,param)
          .then(response=>{
            if(response.data < 0){
              this.$message.error("编辑失败:"+this.baseInfoManagementErrorCode[-response.data].errorInfo);
              return;
            }
            this.$message({
              message:'编辑成功!',
              type:'success'
            });
            this.handleSearchClick(true);

            this.editInfoName = '';
            this.editInfoCode = '';
            this.editInfoDepart = '';
            this.editInfoDepartId = '';
            this.tmpeditInfoDepartName = '';
            this.editInfoDescription = '';
            this.editInfoId = '';

            this.editCardShowFlag = false;
            this.viewname = "first";
          })
          .catch(error=>{
            this.$message.error("编辑失败!");
            this.handleSearchClick(true);
          });
        
        return;
      },
      handleEditCancelClick(){
        this.editCardShowFlag = false;
        this.viewname = "first";

        this.$message({
          message:'取消编辑!',
          type:'info'
        });
        return;
      },
    }
  };
</script>