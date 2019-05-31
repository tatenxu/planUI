<template>
  <el-card class="box-card">
    <el-tabs v-model="viewname" @tab-click="handleTabClick" class="cardTab">
      <el-tab-pane label="服装层次管理" name="first" class="tabPane">
        <el-container class="paneContainer">
          <el-header clas="containerHeader">
            <el-row :gutter="20">
              <el-col :span="2">
                <div>
                  <el-button type="primary" @click="handleNewInfoClick()">新增</el-button>
                </div>
              </el-col>

              <el-col :span="2">
                <div>
                  <el-button type="primary" @click="handleEditInfoClick()">编辑</el-button>
                </div>
              </el-col>

              <el-col :span="2">
                <div>
                 <el-button type="primary" @click="handleDeleteInfoClick()">删除</el-button>
                </div>
              </el-col>

              <el-col :span="6">
                <div class="containerHeaderDiv2">
                  <el-button @click="handleSearchClick(false)" type="primary">搜索服装层次</el-button>
                  <el-input v-model="searchInput" class="nameInput" placeholder="请输入服装层次名称"></el-input>
                  <span class="inputTag">服装层次名称:</span>
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
              <el-table-column  prop="id" label="id" v-if="false"  width="120"  ></el-table-column>
              <el-table-column  prop="name" label="服装层次名称"  width="120"  ></el-table-column>
              <el-table-column  prop="description"  label="服装层次描述"  width="120"></el-table-column>
            </el-table>
          <div style="margin-top: 20px">
            <el-button type="info" @click="toggleSelection()">取消选择</el-button>
          </div>
          </el-main>
        </el-container>
      </el-tab-pane>

      <el-tab-pane label="新增服装层次" name="second" v-if="addCardShowFlag">
        <el-card>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="add-ruleForm">
            <el-form-item label="层次名称:" prop="addInfoName">
              <el-input v-model="ruleForm.addInfoName" class="inputStyle" placeholder="请输入服装层次名称" ></el-input>
            </el-form-item>
            <el-form-item label="层次描述" prop="addInfoDescription">
              <el-input
                class="inputArea"
                type="textarea"
                :rows="4"
                placeholder="请输入服装层次描述"
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

      <el-tab-pane label="编辑服装层次" name="third" v-if="editCardShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">层次名称:</span>
            <el-input v-model="editInfoName" class="input" placeholder="请输入服装层次名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">层次描述:</span>
            <el-input
              class="inputArea"
              type="textarea"
              :rows="4"
              placeholder="请输入服装层次描述"
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
      font-size: 14px;
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
// import { truncate } from 'fs';
// import { constants } from 'fs';
  export default {
    data() {
      return {
        viewname: 'first',
        searchInput: '',
        tableData: [],
        multipleSelection: [],
        selectionData:[],

        editInfoDescription:'',
        editInfoName:'',
        editInfoId:'',
        editInfoInitCustomerId:'',

        ruleForm:{
          addInfoDescription:'',
          addInfoName:'',
        },
        rules:{
          addInfoDescription:[{ required: true, message: '请输入服装类型信息', trigger: 'blur' },],
          addInfoName:[{ required: true, message: '请输入服装类型名称', trigger: 'blur' },],
        },

        addCardShowFlag:false,
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
      //加载默认
      this.$axios
        .get(`${window.$config.HOST}/baseInfoManagement/getClothingLevel`,{
          params:{name:null},
        })
        .then(response=>{
          // console.log(response.data);
          this.tableData =response.data;
        })
        .catch(error=>{
          this.$message.error("初始服装层次加载失败");
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
        var param = {name:null};
        if(!allFlag){
          param = {name: (this.searchInput==="")?null:this.searchInput};
        }
        console.log("搜索参数");
        console.log(param);
        this.$axios
          .get(`${window.$config.HOST}/baseInfoManagement/getClothingLevel`,{
            params:param,
          })
          .then(response=>{
            this.tableData =response.data;
          })
          .catch(error=>{
            this.$message.error("搜索失败");
            this.selectionData = [];
          });
      },
      handleNewInfoClick(){
        this.addCardShowFlag = true;
        this.viewname = 'second';
        console.log(this.viewname);
      },
      handleEditInfoClick(){
        if(this.multipleSelection.length === 0){
          this.$message({
            message:'请选择一个服装层次',
            type:'warning'
          });
          return;
        }
        if(this.multipleSelection.length > 1){
          this.$message({
            message:'只能选择一个进行编辑',
            type:'warning'
          });
          return;
        }
        this.editCardShowFlag = true;
        console.log(this.multipleSelection[0]);
        this.editInfoId = this.multipleSelection[0].id;
        this.editInfoName = this.multipleSelection[0].name;
        this.editInfoDescription = this.multipleSelection[0].description;
        this.viewname = 'third';
      },
      handleDeleteInfoClick(){
        if(this.multipleSelection.length === 0){
          this.$message({
            message:'至少选择一个服装层次',
            type:'warning'
          });
        }else{
          this.multipleSelection.forEach(element => {
            this.$axios
              .delete(`${window.$config.HOST}/baseInfoManagement/deleteClothingLevel`,{
                params:{id:element.id},
              })
              .then(response=>{
                if(response.data<0){
                  this.$message.error("删除失败:"+this.baseInfoManagementErrorCode[-response.data].errorInfo);
                  console.log(element.name+"删除失败:"+this.baseInfoManagementErrorCode[-response.data].errorInfo);
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
      },
      handleNewSaveClick(){
        var param = {
          name : (this.ruleForm.addInfoName==="")?null:this.ruleForm.addInfoName,
          description : (this.ruleForm.addInfoDescription==="")?null:this.ruleForm.addInfoDescription,
        };
        console.log(param);

        this.$axios.post(`${window.$config.HOST}/baseInfoManagement/addClothingLevel`,param)
          .then(response=>{
            if(response.data < 0){
              this.$message.error("添加失败:"+this.baseInfoManagementErrorCode[-response.data].errorInfo);
            }else{
              this.$message({
                message:'添加成功!',
                type:'success'
              });
              this.handleSearchClick(true);
            }
          })
          .catch(error=>{
            this.$message.error("添加失败");
            console.log("添加失败");
          })
        
        this.ruleForm.addInfoName = "";
        this.ruleForm.addInfoDescription = "";

        this.addCardShowFlag = false;
        this.viewname = "first";

        return;
      },
      handleNewCancelClick(){
        this.addCardShowFlag = false;
        this.viewname = "first";
        this.$message({
          message:'取消新增!',
          type:'info'
        });
        return;
      },
      handleEditSaveClick(){
        var tmp = (this.editInfoCustomer===this.tmpeditInfoCustomer)?this.editInfoInitCustomerId:this.editInfoCustomer;
        var param = {
          id : (this.editInfoId==="")?null:this.editInfoId,
          name : (this.editInfoName==="")?null:this.editInfoName,
          description : (this.editInfoDescription==="")?null:this.editInfoDescription,
        }
        console.log(param);

        this.$axios.post(`${window.$config.HOST}/baseInfoManagement/updateClothingLevel`,param)
          .then(response=>{
            if(response.data < 0){
              this.$message.error("编辑失败:"+this.baseInfoManagementErrorCode[-response.data].errorInfo);
            }else{
              this.$message({
                message:'编辑成功!',
                type:'success'
              });
              this.handleSearchClick(true);
            }
          })
        .catch(error=>{
          this.$message.error("编辑失败");
        });

        this.editInfoId = "";
        this.editInfoName = "";
        this.editInfoAbbr = "";
        this.editInfoCustomer = "";
        this.editInfoCustomerName = "";
        this.tmpeditInfoCustomerName = "";
        this.editInfoDescription = "";

        this.editCardShowFlag = false;
        this.viewname = "first";

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