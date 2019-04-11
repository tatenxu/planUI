<template>
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
                  <el-button type="primary">搜索产品</el-button>
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
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="产品编号"
              width="120"
              prop="code">
              <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column
              prop="name"
              label="产品名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="description"
              label="产品描述"
              width="120"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="ownerDepart"
              label="产品部门"
              show-overflow-tooltip>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button type="info" @click="toggleSelection()">取消选择</el-button>
          </div>
          </el-main>
        </el-container>
      </el-tab-pane>

      <el-tab-pane label="新增产品信息" name="second" v-if="newCardShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">产品编号:</span>
            <el-input v-model="addInfoCode" class="input" placeholder="请输入产品名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">产品名称:</span>
            <el-input v-model="addInfoName" class="input" placeholder="请输入产品简称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">产品部门:</span>
              <el-select v-model="addInfoDepartOwner" placeholder="请选择" class="inputSelector">
                <el-option
                  v-for="item in selectionData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </div>
          <div class="inputCombine">
            <span class="inputTag">产品描述:</span>
            <el-input
              class="inputArea"
              type="textarea"
              :rows="4"
              placeholder="请输入产品描述"
              v-model="addInfoDescription">
            </el-input>
          </div>
          <div class="secondButtonDiv">
            <el-button type="primary" class="save" @click="handleNewSaveClick()">保存</el-button>
            <el-button type="primary" class="cancel" @click="handleNewCancelClick()">取消</el-button>
          </div>
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
            <el-select v-model="editInfoDepartOwner" placeholder="请选择" class="inputSelector">
              <el-option
                v-for="item in selectionData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
        viewname: 'first',
        searchInput: '',
        tableData: [
          {
            name: 'nike',
            code: 'nk',
            description: '知名产品',
            ownerDepart:'部门1'
          },{
            name: 'addidas',
            code: 'ad',
            description: '次级产品',
            ownerDepart:'部门2'
          },{
            name: 'newbalance',
            code: 'nb',
            description: '国际产品',
            ownerDepart:'部门3'
          },{
            name: '阿赛克斯',
            code: 'asics',
            description: '日本产品',
            ownerDepart:'部门4'
          },],
          selectionData: [{
            value: '部门1',
            label: '部门1'
          }, {
            value: '部门2',
            label: '部门2'
          }, {
            value: '部门3',
            label: '部门3'
          }, {
            value: '部门4',
            label: '部门4'
          },],
        multipleSelection: [],

        editInfoDescription:'',
        editInfoName:'',
        editInfoCode:'',
        editInfoDepartOwner:'',

        addInfoDescription:'',
        addInfoName:'',
        addInfoCode:'',
        addInfoDepartOwner:'',

        newCardShowFlag:false,
        editCardShowFlag: false,
      };
    },
    // computed:{
    //   viewname: 'first',
    // },
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
      handleNewInfoClick(){
        this.newCardShowFlag = true;
        this.viewname = 'second';
        console.log(this.viewname);
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
        this.editInfoCode = this.multipleSelection[0].code;
        this.editInfoDepartOwner = this.multipleSelection[0].ownerDepart;
        this.editInfoDescription = this.multipleSelection[0].description;
        this.viewname = 'third';
      },
      handleDeleteInfoClick(){
        if(this.multipleSelection.length === 0){
          this.$message({
            message:'至少选择一个产品',
            type:'warning'
          });
        }
        this.multipleSelection.forEach(element => {
          var i = this.tableData.indexOf(element);
          this.tableData.splice(i,1);
        });
        // this.tableData = this.multipleSelection;
      },
      handleNewSaveClick(){
        this.newCardShowFlag = false;
        this.viewname = "first";

        this.tableData.push({
          name:this.addInfoName,
          code:this.addInfoCode,
          ownerDepart:this.addInfoDepartOwner,
          description: this.addInfoDescription
        });

        this.$message({
          message:'保存成功!',
          type:'success'
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
        this.editCardShowFlag = false;
        this.viewname = "first";

        this.$message({
          message:'保存成功!',
          type:'success'
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