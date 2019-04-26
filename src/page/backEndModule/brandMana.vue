<template>
  <el-card class="box-card">
    <el-tabs v-model="viewname" @tab-click="handleTabClick" class="cardTab">
      <el-tab-pane label="品牌信息管理" name="first" class="tabPane">
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
                  <el-button @click="handleSearchClick(false)" type="primary">搜索品牌</el-button>
                  <el-input v-model="searchInput" class="nameInput" placeholder="请输入品牌名称"></el-input>
                  <span class="inputTag">品牌名称:</span>
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
              <el-table-column  prop="name" label="品牌名称"  width="120"  ></el-table-column>
              <el-table-column  prop="abbr"  label="品牌简称"  width="120"></el-table-column>
              <el-table-column  prop="description"  label="品牌描述"  width="120"></el-table-column>
              <el-table-column  prop="customerName"  label="所属客户"  show-overflow-tooltip></el-table-column>
            </el-table>
          <div style="margin-top: 20px">
            <el-button type="info" @click="toggleSelection()">取消选择</el-button>
          </div>
          </el-main>
        </el-container>
      </el-tab-pane>

      <el-tab-pane label="新增品牌信息" name="second" v-if="addCardShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">品牌名称:</span>
            <el-input v-model="addInfoName" class="input" placeholder="请输入品牌名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">品牌简称:</span>
            <el-input v-model="addInfoAbbr" class="input" placeholder="请输入品牌简称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">所属客户:</span>
              <el-select v-model="addInfoCustomer" placeholder="请选择" class="inputSelector">
                <el-option
                  v-for="item in selectionData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </div>
          <div class="inputCombine">
            <span class="inputTag">品牌描述:</span>
            <el-input
              class="inputArea"
              type="textarea"
              :rows="4"
              placeholder="请输入品牌描述"
              v-model="addInfoDescription">
            </el-input>
          </div>
          <div class="secondButtonDiv">
            <el-button type="primary" class="save" @click="handleNewSaveClick()">保存</el-button>
            <el-button type="primary" class="cancel" @click="handleNewCancelClick()">取消</el-button>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑品牌信息" name="third" v-if="editCardShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">品牌名称:</span>
            <el-input v-model="editInfoName" class="input" placeholder="请输入品牌名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">品牌简称:</span>
            <el-input v-model="editInfoAbbr" class="input" placeholder="请输入品牌简称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">所属客户:</span>
            <el-select v-model="editInfoCustomer" placeholder="请选择" class="inputSelector">
              <el-option
                v-for="item in selectionData"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="inputCombine">
            <span class="inputTag">品牌描述:</span>
            <el-input
              class="inputArea"
              type="textarea"
              :rows="4"
              placeholder="请输入品牌描述"
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
        editInfoAbbr:'',
        editInfoCustomer:'',
        editInfoInitCustomerId:'',
        tmpeditInfoCustomer:'',

        addInfoCustomer:'',
        addInfoDescription:'',
        addInfoName:'',
        addInfoAbbr:'',

        addCardShowFlag:false,
        editCardShowFlag: false,
      };
    },
    created:function(){
      //加载默认信息
      this.$axios.get(`${window.$config.HOST}/baseInfoManagement/getBrand`,{name:NaN})
        .then(response=>{
          this.tableData =response.data;
          this.selectionData = [];
          this.tableData.forEach(element=>{
            this.selectionData.push({
              id:element.customerId,
              name:element.customerName
            });
          });
        })
        .catch(error=>{
          this.$message.error("信息加载失败");
          this.tableData = [
            {
              id:'536543',
              customerId:"453142312",
              name: 'nike',
              abbr: 'nk',
              description: '知名品牌',
              customerName:'中国耐克公司'
            },{
              id:'52346',
              customerId:"8478",
              name: 'addidas',
              abbr: 'ad',
              description: '次级品牌',
              customerName:'中国阿迪公司'
            },{
              id:'234513452',
              customerId:"578",
              name: 'newbalance',
              abbr: 'nb',
              description: '国际品牌',
              customerName:'中国新百伦公司'
            },{
              id:'2562',
              customerId:"678468",
              name: '阿赛克斯',
              abbr: 'asics',
              description: '日本品牌',
              customerName:'日本阿赛克斯公司'
            },];
          this.tableData.forEach(element=>{
            this.selectionData.push({
              id:element.customerId,
              name:element.customerName
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
            this.$message.error("请输入品牌名称");
            return;
          }
          param = {name: (this.searchInput==="")?NaN:this.searchInput};
        }
        console.log("搜索参数"+param);
        this.$axios.get(`${window.$config.HOST}/baseInfoManagement/getBrand`,param)
          .then(response=>{
            this.tableData =response.data;
            this.selectionData = [];
            this.tableData.forEach(element=>{
              this.selectionData.push({
                id:element.customerId,
                name:element.customerName
              });
            });
          })
          .catch(error=>{
            this.$message.error("搜索失败");
            this.selectionData = [];
            this.tableData = [
              {
                id:'52346',
                customerId:"8478",
                name: 'addidas',
                abbr: 'ad',
                description: '次级品牌',
                customerName:'中国阿迪公司'
              },{
                id:'234513452',
                customerId:"578",
                name: 'newbalance',
                abbr: 'nb',
                description: '国际品牌',
                customerName:'中国新百伦公司'
              },{
                id:'2562',
                customerId:"678468",
                name: '阿赛克斯',
                abbr: 'asics',
                description: '日本品牌',
                customerName:'日本阿赛克斯公司'
              },];
            this.tableData.forEach(element=>{
              this.selectionData.push({
                id:element.customerId,
                name:element.customerName
              });
            });
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
            message:'请选择一个品牌信息',
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
        this.editInfoCustomer = this.multipleSelection[0].customerId;
        this.editInfoCustomerName = this.multipleSelection[0].customerName;
        this.tmpeditInfoCustomerName = this.multipleSelection[0].customerName;
        this.editInfoDescription = this.multipleSelection[0].description;
        this.viewname = 'third';
      },
      handleDeleteInfoClick(){
        if(this.multipleSelection.length === 0){
          this.$message({
            message:'至少选择一个品牌',
            type:'warning'
          });
        }else{
          this.multipleSelection.forEach(element => {
            this.$axios.post(`${window.$config.HOST}/baseInfoManagement/deleteBrand`,{id:element.id})
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
      },
      handleNewSaveClick(){
        var param = {
          name : (this.addInfoName==="")?NaN:this.addInfoName,
          abbr : (this.addInfoAbbr==="")?NaN:this.addInfoAbbr,
          description : (this.addInfoDescription==="")?NaN:this.addInfoDescription,
          customerId : (this.addInfoGroupId==="")?NaN:this.addInfoCustomer,
        };
        console.log(param);

        this.$axios.post(`${window.$config.HOST}/baseInfoManagement/addBrand`,param)
          .then(response=>{
            if(response.data < 0){
              this.$message.error("添加失败");
            }else{
              this.$message({
                message:'添加成功!',
                type:'success'
              });
            }
          })
          .catch(error=>{
            this.$message.error("添加失败");
            console.log("添加失败");
          })
        
        this.addInfoName = "";
        this.addInfoAbbr = "";
        this.addInfoDescription = "";
        this.addInfoCustomer = "";

        this.handleSearchClick(true);

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
          id : (this.editInfoId==="")?NaN:this.editInfoId,
          name : (this.editInfoName==="")?NaN:this.editInfoName,
          abbr : (this.editInfoAbbr==="")?NaN:this.editInfoAbbr,
          description : (this.editInfoDescription==="")?NaN:this.editInfoDescription,
          groupId : (tmp==="")?NaN:tmp,
        }
        console.log(param);

        this.$axios.post(`${window.$config.HOST}/baseInfoManagement/updateBrand`,param)
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
        this.editInfoCustomer = "";
        this.editInfoCustomerName = "";
        this.tmpeditInfoCustomerName = "";
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