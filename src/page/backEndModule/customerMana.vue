<template>
  <el-card class="box-card">
    <el-tabs v-model="viewname"  class="cardTab">
      <el-tab-pane label="客户信息管理" name="first" class="tabPane">
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
                  <el-button type="primary" @click="handleSearchClick(false)">搜索客户</el-button>
                  <el-input v-model="searchInput"  class="nameInput" placeholder="请输入客户名称"></el-input>
                  <span class="inputTag">客户名称:</span>
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
              <el-table-column  type="selection"  width="55"></el-table-column>
              <el-table-column  prop="id" label="id"  width="120"  v-if="false"></el-table-column>
              <el-table-column  prop="name" label="客户名称"  width="120"  ></el-table-column>
              <el-table-column  prop="abbr"  label="客户简称"  width="120"></el-table-column>
              <el-table-column  prop="description"  label="客户描述"  width="120"  show-overflow-tooltip></el-table-column>
              <el-table-column  prop="groupName"  label="所属业务组"  show-overflow-tooltip></el-table-column>
            </el-table>
          <div style="margin-top: 20px">
            <el-button type="info" @click="toggleSelection()">取消选择</el-button>
          </div>
          </el-main>
        </el-container>
      </el-tab-pane>

      <el-tab-pane label="新增客户信息" name="second" v-if="newCardShowFlag">
        <el-card>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="add-ruleForm">
            <el-form-item label="客户名称:" prop="addInfoName">
              <el-input v-model="ruleForm.addInfoName" class="inputStyle" placeholder="请输入客户名称" required></el-input>
            </el-form-item>
            <el-form-item label="客户简称:" prop="addInfoAbbr">
              <el-input v-model="ruleForm.addInfoAbbr" class="inputStyle" placeholder="请输入客户简称"></el-input>
            </el-form-item>
            <el-form-item label="所属业务组:" prop="addInfoGroup">
              <el-cascader
                expand-trigger="hover"
                :options="selectionData"
                v-model="ruleForm.addInfoGroup"
                :props="deptToCascaderProps"
                :change-on-select="true"
              >
              </el-cascader>            
            </el-form-item>
            <el-form-item label="客户描述:" prop="addInfoDescription">
              <el-input
                class="inputArea"
                type="textarea"
                :rows="4"
                placeholder="请输入客户描述"
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

      <el-tab-pane label="编辑客户信息" name="third" v-if="editCardShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">客户名称:</span>
            <el-input v-model="editInfoName" class="input" placeholder="请输入客户名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">客户简称:</span>
            <el-input v-model="editInfoAbbr" class="input" placeholder="请输入客户简称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">所属业务组:</span>
            <el-cascader
                expand-trigger="hover"
                :options="selectionData"
                v-model="editInfoGroup"
                :props="deptToCascaderProps"
                :change-on-select="true"
                :placeholder="editInfoGroupPlaceHolder"
              >
            </el-cascader>
          </div>
          <div class="inputCombine">
            <span class="inputTag">客户描述:</span>
            <el-input
              class="inputArea"
              type="textarea"
              :rows="4"
              placeholder="请输入客户描述"
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
  .add-ruleForm{
    min-width: 250px;
    max-width: 500px;
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
      font-size: 14px;
      line-height: 40px;
      min-width: 70px;
    }
  }

  .inputCombine{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    min-width: 250px;
    max-width: 500px;
    .inputTag{
      font-size: 14px;
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
import { error } from 'util';
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
        editInfoAbbr:'',
        editInfoGroup:[],
        editInfoGroupPlaceHolder:'',
        editIndoInitGroupId:'',
        tmpeditInfoGroupName:'',

        ruleForm:{
          addInfoDescription:'',
          addInfoName:'',
          addInfoAbbr:'',
          addInfoGroup:[],
        },
        rules:{
          addInfoDescription:[{ required: true, message: '请输入客描述', trigger: 'blur' },],
          addInfoName:[{ required: true, message: '请输入客户名称', trigger: 'blur' },],
          addInfoAbbr:[{ required: true, message: '请输入客户简称', trigger: 'blur' },],
          addInfoGroup:[{ required: true, message: '请选择业务组', trigger: 'blur' },],
        },

        newCardShowFlag:false,
        editCardShowFlag: false,
      };
    },
    created:function(){
      console.log("进入客户管理");
      //获取部门信息
      this.$axios.get(`${window.$config.HOST2}/getDeptTree`)
        .then(response=>{
          this.selectionData = response.data;
        })
        .catch(error=>{
          this.$message.error("部门信息加载失败!");
          console.log("部门信息加载失败!");
        });
      //加载默认客户信息
      this.$axios
        .get(`${window.$config.HOST}/baseInfoManagement/getCustomer`,{
          params:{name:undefined},
        })
        .then(response=>{
          this.tableData = response.data;
        })
        .catch(error=>{
          this.$message.error("加载失败");
        });
    },
    methods: {
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
          /* if(this.searchInput === ""){
            this.$message.error("请输入客户名称");
            return;
          } */
          param = {name: (this.searchInput==="")?undefined:this.searchInput};
        }
        console.log("搜索参数"+ allFlag);
        console.log(param);
        this.$axios
          .get(`${window.$config.HOST}/baseInfoManagement/getCustomer`,{
            params:param,
          })
          .then(response=>{
            console.log(response.data);
            this.tableData = response.data;
          })
          .catch(error=>{
            this.$message.error("加载失败");
          });
      },
      handleNewInfoClick(){
        this.newCardShowFlag = true;
        this.viewname = 'second';
        console.log(this.viewname);
      },
      handleEditInfoClick(){
        if(this.multipleSelection.length === 0){
          this.$message({
            message:'请选择一个客户信息',
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
        this.editInfoId = this.multipleSelection[0].id;
        this.editInfoName = this.multipleSelection[0].name;
        this.editInfoAbbr = this.multipleSelection[0].abbr;

        this.editInfoGroupPlaceHolder = this.multipleSelection[0].groupName;
        this.tmpeditInfoGroupName = this.multipleSelection[0].groupName;

        this.editInfoGroup = [this.multipleSelection[0].groupName];
        this.editIndoInitGroupId = this.multipleSelection[0].groupId;
        this.editInfoDescription = this.multipleSelection[0].description;
        this.viewname = 'third';
      },
      handleDeleteInfoClick(){
        if(this.multipleSelection.length === 0){
          this.$message({
            message:'至少选择一个客户',
            type:'warning'
          });
          return;
        }else{
          this.multipleSelection.forEach(element => {
            this.$axios
              .delete(`${window.$config.HOST}/baseInfoManagement/deleteCustomer`,{
                params:{id:element.id}
              })
              .then(response=>{
                if(response.data<0){
                  this.$message.error(element.name+"删除失败");
                  console.log(element.name+"删除失败");
                }else{
                  console.log(element.name+"删除成功");
                  this.$message({
                    type:"success",
                    message:element.name+"删除成功"
                  });
                  var i = this.tableData.indexOf(element);
                  this.tableData.splice(i,1);
                }
              })
              .catch(error=>{
                this.$message.error(element.name+"删除失败");
                console.log(element.name+"删除失败");
              });
            });
        }
        
        // this.tableData = this.multipleSelection;
      },
      handleNewSaveClick(){
        var param = {
          name : (this.ruleForm.addInfoName==="")?undefined:this.ruleForm.addInfoName,
          abbr : (this.ruleForm.addInfoAbbr==="")?undefined:this.ruleForm.addInfoAbbr,
          description : (this.ruleForm.addInfoDescription==="")?undefined:this.ruleForm.addInfoDescription,
          groupName : (this.ruleForm.addInfoGroup.length===0)?undefined:this.ruleForm.addInfoGroup[this.ruleForm.addInfoGroup.length-1],
        };
        console.log(param);
        this.$axios.post(`${window.$config.HOST}/baseInfoManagement/addCustomer`,param)
          .then(response=>{
            if(response.data<0){
              this.$message.error("添加失败!");
            }else{
              this.$message({
                type:"success",
                message:"添加成功"
              });
              this.handleSearchClick(true);

              this.ruleForm.addInfoName = "";
              this.ruleForm.addInfoAbbr = "";
              this.ruleForm.addInfoDescription = "";
              this.ruleForm.addInfoGroup = [];

              this.newCardShowFlag = false;
              this.viewname = "first";
            }
          })
          .catch(error=>{
            console.log("添加失败");
            this.$message.error("添加失败!");
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
        var tmpGroupName = (this.editInfoGroup ===[this.tmpeditInfoGroupName,])?
                          this.tmpeditInfoGroupName : this.editInfoGroup[this.editInfoGroup.length-1];
        var param = {
          id : (this.editInfoId==="")?undefined:this.editInfoId,
          name : (this.editInfoName==="")?undefined:this.editInfoName,
          abbr : (this.editInfoAbbr==="")?undefined:this.editInfoAbbr,
          description : (this.editInfoDescription==="")?undefined:this.editInfoDescription,
          groupName : (tmpGroupName==="")?undefined:tmpGroupName,
        };
        console.log(param);
        
        this.$axios.post(`${window.$config.HOST}/baseInfoManagement/updateCustomer`,param)
          .then(response=>{
            if(response.data<0){
              this.$message.error("编辑失败");
            }else{
              this.$message({
                message:'编辑成功!',
                type:'success'
              });
              this.handleSearchClick(true);

              this.editInfoId = "";
              this.editInfoName = "";
              this.editInfoAbbr = "";
              this.editInfoGroup = "";
              this.editIndoInitGroupId = "";
              this.tmpeditInfoGroupName = "";
              this.editInfoDescription = "";

              this.editCardShowFlag = false;
              this.viewname = "first";
            }
          })
          .catch(error=>{
            this.$message.error("编辑失败");
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