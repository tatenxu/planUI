<template>
  <div class="box-card">
    <el-tabs v-model="viewname" @tab-click="handleViewChange">
      <el-tab-pane label="数据字典管理" name="first">
        <el-card class="submainCard">
          <el-container>
            <el-main class="subAside">
              <el-container class="paneContainer">
                <el-header clas="containerHeader">
                  <div class="containerHeaderDiv">
                    <el-button type="primary" class="cateButton" @click="handleAddCateClick()">新增</el-button>
                    <el-button type="primary" class="cateButton" @click="handleEditCateClick()">编辑</el-button>
                    <el-button type="primary" class="cateButton" @click="handleDeleteCateClick()">删除</el-button>
                  </div>
                  <hr />
                </el-header>

                <el-main clas="containerMain">
                  <el-table
                    ref="multipleTable"
                    :data="dictionCategories"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleCategSelectionChange">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    
                    <el-table-column
                      prop="name"
                      label="字典类别"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-main>

            <hr class="hr"> 

            <el-main class="subMain">
              <el-container class="paneContainer">
                <el-header clas="containerHeader">
                  <div class="containerHeaderDiv">
                    <el-button type="primary" class="cateButton" @click="handleAddPropClick()">新增</el-button>
                    <el-button type="primary" class="cateButton" @click="handleEditPropClick()">编辑</el-button>
                    <el-button type="primary" class="cateButton" @click="handleDeletePropClick()">删除</el-button>
                  </div>
                  <hr />
                </el-header>

                <el-main clas="containerMain">
                  <el-table
                    ref="multipleTable"
                    :data="selectedCateProps"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handlePropSelectionChange">
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    
                    <el-table-column
                      prop="propName"
                      label="类别属性"
                      show-overflow-tooltip>
                    </el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-main>
          </el-container>
        </el-card>
      </el-tab-pane>
      
      <el-tab-pane label="新增字典类别" name="second" v-if="addCateShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">字典类别名称:</span>
            <el-input v-model="addCateName" class="input" placeholder="请输入品牌名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">字典类别编码:</span>
            <el-input v-model="addCateCode" class="input" placeholder="请输入品牌简称"></el-input>
          </div>
          <div class="secondButtonDiv">
            <el-button type="primary" class="save" @click="handleAddCateSaveClick()">保存</el-button>
            <el-button type="primary" class="cancel" @click="handleAddCateCancelClick()">取消</el-button>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑字典类别" name="third" v-if="editCateShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">字典类别名称:</span>
            <el-input v-model="editCateName" class="input" placeholder="请输入品牌名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">字典类别编码:</span>
            <el-input v-model="editCateCode" class="input" placeholder="请输入品牌简称"></el-input>
          </div>
          <div class="secondButtonDiv">
            <el-button type="primary" class="save" @click="handleEditCateSaveClick()">保存</el-button>
            <el-button type="primary" class="cancel" @click="handleEditCateCancelClick()">取消</el-button>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="新增类别属性" name="fourth" v-if="addPropShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">类别属性名称:</span>
            <el-input v-model="addPropName" class="input" placeholder="请输入品牌名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">类别属性编码:</span>
            <el-input v-model="addPropCode" class="input" placeholder="请输入品牌简称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">所属类别:</span>
              <el-select v-model="addPropOwnerCate" placeholder="请选择" class="inputSelector">
                <el-option
                  v-for="item in dictionCategories"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
          </div>
          <div class="secondButtonDiv">
            <el-button type="primary" class="save" @click="handleAddPropSaveClick()">保存</el-button>
            <el-button type="primary" class="cancel" @click="handleAddPropCancelClick()">取消</el-button>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑类别属性" name="fifth" v-if="editPropShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">类别属性名称:</span>
            <el-input v-model="editPropName" class="input" placeholder="请输入品牌名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">类别属性编码:</span>
            <el-input v-model="editPropCode" class="input" placeholder="请输入品牌简称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">所属类别:</span>
              <el-select v-model="editPropOwnerCate" placeholder="请选择" class="inputSelector">
                <el-option
                  v-for="item in dictionCategories"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
          </div>
          <div class="secondButtonDiv">
            <el-button type="primary" class="save" @click="handleEditPropSaveClick()">保存</el-button>
            <el-button type="primary" class="cancel" @click="handleEditPropCancelClick()">取消</el-button>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="less" scoped>
  .box-card{
    background-color: none;
    min-width: 1500px;
    margin: 20px 50px;
    padding: 0 20px;
  }
  .submainCard{
    .subAside{
      width:400px;
      // background: rgb(172, 170, 170);
      .containerHeaderDiv{
        margin-top: 10px;
        .cateButton{
          //width: 50px;
          text-align: center;
        }
      }
    }
    .subMain{
      margin-left: 10px;
      // background: yellow;
      .containerHeaderDiv{
        margin-top: 10px;
        
        .cateButton{
          //width: 50px;
          text-align: center;
        }
      }
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
      min-width: 130px;
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
  data(){
    return{
      viewname:'first',
      dictionCategories:[
        {
          name:"性别",
          code:"sex",
          detail:{
            prop1:"男",
            prop2:"女",
          }
        },
        {
          name:"职称",
          code:"job",
          detail:{
            prop1:"高工",
            prop2:"工人",
            prop3:"客户经理"
          }
        },
        {
          name:"学历",
          code:"education",
          detail:{
            prop1:"高中",
            prop2:"学士",
            prop3:"硕士",
            prop4:"博士",
          }
        },
        {
          name:"客户类型",
          code:"customerType",
          detail:{
            prop1:"大",
            prop2:"小",
            prop3:"中",
            prop4:"跨国",
          }
        },
      ],
      multiCateSelection:[],
      selectedCateProps:[],
      multiplePropSelection:[],
      addCateName:'',
      addCateCode:'',
      editCateName:'',
      editCateCode:'',
      addPropName:'',
      addPropCode:'',
      addPropOwnerCate:'',
      editPropName:'',
      editPropCode:'',
      editPropOwnerCate:'',

      addCateShowFlag:false,
      editCateShowFlag:false,
      addPropShowFlag:false,
      editPropShowFlag:false,

    }
  },

  methods:{
    handleViewChange(tab, event) {
      console.log(tab, event);
    },
    handleCategSelectionChange(val) {
        this.multiCateSelection = val;
        this.selectedCateProps = [];
        if(val.length >= 1){
          var det = val[0].detail;
         
          for(var prop in det){
            this.selectedCateProps.push({
              name:val[0].name,propName:det[prop]
              });
          }
          console.log(this.selectedCateProps);
        }
    },
    handlePropSelectionChange(val){
      this.multiplePropSelection = val;
    },
    handleAddCateClick(){
      this.addCateShowFlag = true;
      this.viewname = 'second';
    },
    handleEditCateClick(){
      if(this.multiCateSelection.length === 0){
         alert("请选择一个字典类别!");
         return;
      }
       
      if(this.multiCateSelection.length > 1){
         alert("只能选择一个字典类别!");
         return;
      }
      this.editCateName = this.multiCateSelection[0].name;
      this.editCateCode = this.multiCateSelection[0].code;
      this.editCateShowFlag = true;
      this.viewname = 'third';
    },
    handleDeleteCateClick(){
      if(this.multiCateSelection.length === 0){
          this.$message({
            message:'至少选择一个字典类别',
            type:'warning'
          });
        }
      this.multiCateSelection.forEach(element => {
        var i = this.dictionCategories.indexOf(element);
        this.dictionCategories.splice(i,1);
      });
      this.$message({
        message:"删除成功!",
        type:"success"
      });
    },
    handleAddPropClick(){
      this.addPropShowFlag = true;
      this.viewname = 'fourth';
    },
    handleEditPropClick(){
      if(this.multiplePropSelection.length === 0){
         alert("请选择一个类别属性!");
         return;
      }
       
      if(this.multiplePropSelection.length > 1){
         alert("只能选择一个类别属性!");
         return;
      }

      this.editPropName = this.multiplePropSelection[0].propName;
      this.editPropCode = this.multiplePropSelection[0].propName;
      this.editPropOwnerCate = this.multiplePropSelection[0].name;

      this.editPropShowFlag = true;
      this.viewname = 'fifth';
    },
    handleDeletePropClick(){
      if(this.multiplePropSelection.length === 0){
          this.$message({
            message:'至少选择一个类别属性',
            type:'warning'
          });
        }
      this.multiplePropSelection.forEach(element => {
        var i = this.selectedCateProps.indexOf(element);
        this.selectedCateProps.splice(i,1);
      });
      this.$message({
        message:"删除成功!",
        type:"success"
      });
    },
    handleAddCateSaveClick(){
      this.dictionCategories.push({
        name: this.addCateName,
        code: this.addCateCode,
      });
      this.$message({
        message:"保存成功!",
        type:"success"
      });
      this.addCateShowFlag = false;
      this.viewname = 'first';
    },
    handleAddCateCancelClick(){
      this.$message({
        message:"取消新增!",
        type:"info"
      });
      this.addCateShowFlag = false;
      this.viewname = 'first';
    },
    handleEditCateSaveClick(){
      this.$message({
        message:"保存成功!",
        type:"success"
      });
      this.editCateShowFlag = false;
      this.viewname = 'first';
    },
    handleEditCateCancelClick(){
      this.$message({
        message:"取消编辑!",
        type:"info"
      });
      this.editCateShowFlag = false;
      this.viewname = 'first';
    },
    handleAddPropSaveClick(){
      this.$message({
        message:"保存成功!",
        type:"success"
      });
      this.selectedCateProps.push({
        name: this.editPropName,
        propName: this.editPropOwnerCate,
      });
      console.log(this.selectedCateProps);

      this.addPropShowFlag = false;
      this.viewname = 'first';
    },
    handleAddPropCancelClick(){
      this.$message({
        message:"取消新增!",
        type:"info"
      });
      this.addPropShowFlag = false;
      this.viewname = 'first';
    },
    handleEditPropSaveClick(){
      this.$message({
        message:"保存成功!",
        type:"success"
      });
      this.editPropShowFlag = false;
      this.viewname = 'first';
    },
    handleEditPropCancelClick(){
      this.$message({
        message:"取消编辑!",
        type:"info"
      });
      this.editPropShowFlag = false;
      this.viewname = 'first';
    },
  }
}
</script>
