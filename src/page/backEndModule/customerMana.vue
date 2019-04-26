<template>
  <el-card class="box-card">
    <el-tabs v-model="viewname" @tab-click="handleTabClick" class="cardTab">
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
          <div class="inputCombine">
            <span class="inputTag">客户名称:</span>
            <el-input v-model="addInfoName" class="input" placeholder="请输入客户名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">客户简称:</span>
            <el-input v-model="addInfoAbbr" class="input" placeholder="请输入客户简称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">所属客户:</span>
              <el-select v-model="addInfoGroupId" placeholder="请选择" class="inputSelector">
                <el-option
                  v-for="item in selectionData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </div>
          <div class="inputCombine">
            <span class="inputTag">客户描述:</span>
            <el-input
              class="inputArea"
              type="textarea"
              :rows="4"
              placeholder="请输入客户描述"
              v-model="addInfoDescription">
            </el-input>
          </div>
          <div class="secondButtonDiv">
            <el-button type="primary" class="save" @click="handleNewSaveClick()">保存</el-button>
            <el-button type="primary" class="cancel" @click="handleNewCancelClick()">取消</el-button>
          </div>
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
            <span class="inputTag">所属客户:</span>
            <el-select v-model="editInfoGroup" placeholder="请选择" class="inputSelector">
              <el-option
                v-for="item in selectionData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
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
import { error } from 'util';
// import { truncate } from 'fs';
// import { constants } from 'fs';
  export default {
    data() {
      return {
        viewname: 'first',
        searchInput: '',
        tableData: [],
        selectionData: [],
        multipleSelection: [],

        editInfoId:'',
        editInfoDescription:'',
        editInfoName:'',
        editInfoAbbr:'',
        editInfoGroup:'',
        editIndoInitGroupId:'',
        tmpeditInfoGroupName:'',

        addInfoDescription:'',
        addInfoName:'',
        addInfoAbbr:'',
        addInfoGroupId:'',


        newCardShowFlag:false,
        editCardShowFlag: false,
      };
    },
    created:function(){
      //加载默认客户信息
      this.$axios.get(`${window.$config.HOST}/baseInfoManagement/getCustomer`,{name:NaN})
        .then(response=>{
          this.tableData = response.data;
          this.tableData.forEach(element=>{
            this.selectionData.push({
              id:element.groupId,
              name:element.groupName
            });
          });
        })
        .catch(error=>{
          this.$message.error("加载失败");
          this.tableData = [
          {
            id:"453142312",
            name: 'nike',
            abbr: 'nk',
            description: '知名客户',
            groupName:'业务组1',
            groupId : "52753425",
          },{
            id:"2534",
            name: 'addidas',
            abbr: 'ad',
            description: '次级客户',
            groupName:'业务组2',
            groupId : "2565464",
          },{
            id:"32452345",
            name: 'newbalance',
            abbr: 'nb',
            description: '国际客户',
            groupName:'业务组3',
            groupId : "5677",
          },{
            id:"56456",
            name: '阿赛克斯',
            abbr: 'asics',
            description: '日本客户',
            groupName:'业务组4',
            groupId : "26246",
          },];
          this.tableData.forEach(element=>{
            this.selectionData.push({
              id:element.groupId,
              name:element.groupName
            });
          });
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
        var param = {name:NaN};
        if(!allFlag){
          if(this.searchInput === ""){
            this.$message.error("请输入客户名称");
            return;
          }
          param = {name: (this.searchInput==="")?NaN:this.searchInput};
        }
        console.log("搜索参数"+param);
        this.$axios.get(`${window.$config.HOST}/baseInfoManagement/getCustomer`,param)
          .then(response=>{
            this.tableData = response.data;
            this.selectionData = [];
            this.tableData.forEach(element=>{
              this.selectionData.push({
                id:element.groupId,
                name:element.groupName
              });
            });
          })
          .catch(error=>{
            this.$message.error("加载失败");
            this.tableData = [
            {
              id:"2534",
              name: 'addidas',
              abbr: 'ad',
              description: '次级客户',
              groupName:'业务组2',
              groupId : "2565464",
            },{
              id:"32452345",
              name: 'newbalance',
              abbr: 'nb',
              description: '国际客户',
              groupName:'业务组3',
              groupId : "5677",
            },{
              id:"56456",
              name: '阿赛克斯',
              abbr: 'asics',
              description: '日本客户',
              groupName:'业务组4',
              groupId : "26246",
            },];
            this.selectionData = [];
            this.tableData.forEach(element=>{
              this.selectionData.push({
                id:element.groupId,
                name:element.groupName
              });
            });
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
        this.editInfoGroup = this.multipleSelection[0].groupName;
        this.editIndoInitGroupId = this.multipleSelection[0].groupId;
        this.tmpeditInfoGroupName = this.multipleSelection[0].groupName;
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
            this.$axios.post(`${window.$config.HOST}/baseInfoManagement/deleteCustomer`,{id:element.id})
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
          name : (this.addInfoName==="")?NaN:this.addInfoName,
          abbr : (this.addInfoAbbr==="")?NaN:this.addInfoAbbr,
          description : (this.addInfoDescription==="")?NaN:this.addInfoDescription,
          groupId : (this.addInfoGroupId==="")?NaN:this.addInfoGroupId,
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
            }
          })
          .catch(error=>{
            console.log("添加失败");
            this.$message.error("添加失败!");
          });

        this.handleSearchClick(true);

        this.addInfoName = "";
        this.addInfoAbbr = "";
        this.addInfoDescription = "";
        this.addInfoGroupId = "";

        this.handleSearchClick(true);

        this.newCardShowFlag = false;
        this.viewname = "first";

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
        var groupidTmp = (this.editInfoGroup === this.tmpeditInfoGroupName)?this.editIndoInitGroupId:this.editInfoGroup;
        var param = {
          id : (this.editInfoId==="")?NaN:this.editInfoId,
          name : (this.editInfoName==="")?NaN:this.editInfoName,
          abbr : (this.editInfoAbbr==="")?NaN:this.editInfoAbbr,
          description : (this.editInfoDescription==="")?NaN:this.editInfoDescription,
          groupId : (groupidTmp==="")?NaN:groupidTmp,
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
            }
          })
          .catch(error=>{
            this.$message.error("编辑失败");
          });

        this.editInfoId = "";
        this.editInfoName = "";
        this.editInfoAbbr = "";
        this.editInfoGroup = "";
        this.editIndoInitGroupId = "";
        this.tmpeditInfoGroupName = "";
        this.editInfoDescription = "";

        this.handleSearchClick(true);

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