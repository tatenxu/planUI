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
                  <el-button type="primary">搜索品牌</el-button>
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
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="品牌名称"
              width="120"
              prop="name">
              <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column
              prop="abbr"
              label="品牌简称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="description"
              label="品牌描述"
              width="120">
            </el-table-column>
            <el-table-column
              prop="owner"
              label="所属客户"
              show-overflow-tooltip>
            </el-table-column>
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
              <el-select v-model="addInfoOwner" placeholder="请选择" class="inputSelector">
                <el-option
                  v-for="item in selectionData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
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
            <el-select v-model="editInfoOwner" placeholder="请选择" class="inputSelector">
              <el-option
                v-for="item in selectionData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
  export default {
    data() {
      return {
        viewname: 'first',
        searchInput: '',
        tableData: [
          {
            name: 'nike',
            abbr: 'nk',
            description: '知名品牌',
            owner:'中国耐克公司'
          },{
            name: 'addidas',
            abbr: 'ad',
            description: '次级品牌',
            owner:'中国阿迪公司'
          },{
            name: 'newbalance',
            abbr: 'nb',
            description: '国际品牌',
            owner:'中国新百伦公司'
          },{
            name: '阿赛克斯',
            abbr: 'asics',
            description: '日本品牌',
            owner:'日本阿赛克斯公司'
          },],
          selectionData: [{
            value: '中国耐克公司',
            label: '中国耐克公司'
          }, {
            value: '中国阿迪公司',
            label: '中国阿迪公司'
          }, {
            value: '日本阿赛克斯公司',
            label: '日本阿赛克斯公司'
          }, {
            value: '中国新百伦公司',
            label: '中国新百伦公司'
          },],
        multipleSelection: [],
        editInfoDescription:'',
        editInfoName:'',
        editInfoAbbr:'',
        editInfoOwner:'',

        addInfoOwner:'',
        addInfoDescription:'',
        addInfoName:'',
        addInfoAbbr:'',

        addCardShowFlag:false,
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
        this.editInfoName = this.multipleSelection[0].name;
        this.editInfoAbbr = this.multipleSelection[0].abbr;
        this.editInfoOwner = this.multipleSelection[0].owner;
        this.editInfoDescription = this.multipleSelection[0].description;
        this.viewname = 'third';
      },
      handleDeleteInfoClick(){
        if(this.multipleSelection.length === 0){
          this.$message({
            message:'至少选择一个品牌',
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
        this.tableData.push({
          name:this.addInfoName,
          abbr:this.addInfoAbbr,
          owner:this.addInfoOwner,
          description:this.addInfoDescription
        });
        this.addCardShowFlag = false;
        this.viewname = "first";

        this.$message({
          message:'保存成功!',
          type:'success'
        });

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