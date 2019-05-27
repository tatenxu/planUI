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
                    <el-table-column  type="selection"  width="55"> </el-table-column>
                    <el-table-column  prop="id"  v-if="false" label="id"  show-overflow-tooltip></el-table-column>
                    <el-table-column  prop="category"   label="字典类别"  show-overflow-tooltip></el-table-column>
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
                    <el-table-column  type="selection"  width="55"></el-table-column>
                    <el-table-column  prop="id"  label="id"  v-if="false" show-overflow-tooltip></el-table-column>
                    <el-table-column  prop="name"  label="类别属性"  show-overflow-tooltip></el-table-column>
                  </el-table>
                </el-main>
              </el-container>
            </el-main>
          </el-container>
        </el-card>
      </el-tab-pane>
      
      <el-tab-pane label="新增字典类别" name="second" v-if="addCateShowFlag">
        <el-card>
          <el-form :model="ruleFormCate" :rules="rulesCate" ref="ruleForm1" label-width="100px" class="add-ruleForm">
            <el-form-item label="类别名称:" prop="addCateName">
              <el-input v-model="ruleFormCate.addCateName"  placeholder="请输入字典类别名称" ></el-input>
            </el-form-item>
            <el-form-item label="类别描述" prop="addCateCode">
              <el-input v-model="ruleFormCate.addCateCode" class="input" placeholder="请输入字典类别编码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="save" @click="handleAddCateSaveClick('ruleForm')">保存</el-button>
              <el-button type="primary" class="cancel" @click="handleAddCateCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑字典类别" name="third" v-if="editCateShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">字典类别名称:</span>
            <el-input v-model="editCateName" class="input" placeholder="请输入字典类别名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">字典类别编码:</span>
            <el-input v-model="editCateCode" class="input" placeholder="请输入字典类别编码"></el-input>
          </div>
          <div class="secondButtonDiv">
            <el-button type="primary" class="save" @click="handleEditCateSaveClick()">保存</el-button>
            <el-button type="primary" class="cancel" @click="handleEditCateCancelClick()">取消</el-button>
          </div>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="新增类别属性" name="fourth" v-if="addPropShowFlag">
        <el-card>
          <el-form :model="ruleFormProp" :rules="rulesProp" ref="ruleForm1" label-width="100px" class="add-ruleForm">
            <el-form-item label="属性名称:" prop="addPropName">
              <el-input v-model="ruleFormProp.addPropName" class="input" placeholder="请输入类别属性名称"></el-input>
            </el-form-item>
            <el-form-item label="属性编码" prop="addPropCode">
              <el-input v-model="ruleFormProp.addPropCode" class="input" placeholder="请输入类别属性编码"></el-input>
            </el-form-item>
            <el-form-item label="所属类别" prop="addPropCategoryId">
              <el-select v-model="ruleFormProp.addPropCategoryId" placeholder="请选择" class="inputSelector">
                <el-option
                  v-for="item in dictionCategories"
                  :key="item.id"
                  :label="item.category"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="save" @click="handleAddPropSaveClick('ruleForm')">保存</el-button>
              <el-button type="primary" class="cancel" @click="handleAddPropCancelClick()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="编辑类别属性" name="fifth" v-if="editPropShowFlag">
        <el-card>
          <div class="inputCombine">
            <span class="inputTag">类别属性名称:</span>
            <el-input v-model="editPropName" class="input" placeholder="请输入类别属性名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">类别属性编码:</span>
            <el-input v-model="editPropCode" class="input" placeholder="请输入类别属性编码"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">所属类别:</span>
              <el-select v-model="editPropCate" placeholder="请选择" class="inputSelector">
                <el-option
                  v-for="item in dictionCategories"
                  :key="item.id"
                  :label="item.category"
                  :value="item.id">
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
  .add-ruleForm{
    min-width: 250px;
    max-width: 500px;
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
      dictionCategories:[],
      multiCateSelection:[],
      selectedCateProps:[],
      multiplePropSelection:[],

      ruleFormCate:{
        addCateName:'',
        addCateCode:'',
      },
      rulesCate:{
        addCateName:[{ required: true, message: '请输入字典类别名称', trigger: 'blur' },],
        addCateCode:[{ required: true, message: '请输入字典类别编码', trigger: 'blur' },],
      },

      editCateId:'',
      editCateName:'',
      editCateCode:'',

      ruleFormProp:{
        addPropName:'',
        addPropCode:'',
        addPropCategoryId:'',
      },
      rulesProp:{
        addPropName:[{ required: true, message: '请输入类别属性名称', trigger: 'blur' },],
        addPropCode:[{ required: true, message: '请输入类别属性编码', trigger: 'blur' },],
        addPropCategoryId:[{ required: true, message: '请选择所属类别', trigger: 'blur' },],
      },

      editPropId:'',
      editPropName:'',
      editPropCode:'',
      editPropCate:'',
      initeditPropCateName:'',

      addCateShowFlag:false,
      editCateShowFlag:false,
      addPropShowFlag:false,
      editPropShowFlag:false,

    }
  },
  created:function(){
    //加载所有的字典类别
    this.$axios
      .get(`${window.$config.HOST}/dictionaryManagement/getAllDictionaryCategory`)
      .then(response=>{
        this.dictionCategories = response.data;
      })
      .catch(error=>{
        console.log("字典类别加载错误");
        this.dictionCategories = [
          {
            id:"241234",
            category:"性别",
            code:"sex",
          },
          {
            id:"4234",
            category:"职称",
            code:"job",
          },
          {
            id:"2345234",
            category:"学历",
            code:"education",
          },
          {
            id:"2412764",
            category:"客户类型",
            code:"customerType",
          },
        ];
      });
  },
  methods:{
    reSearchProperty(cateId){
      console.log(cateId);
      this.$axios
        .get(`${window.$config.HOST}/dictionaryManagement/getCategoryProperty`,{
          params:{categoryId:cateId}
        })
        .then(response=>{
          this.selectedCateProps = response.data;
        })
        .catch(error=>{
          this.$message.error("属性信息加载失败");
          this.selectedCateProps = [
            {
              id : "3245123",
              name : "属性1",
              code : "faksjdk",
              categoryId : "54145",
              categoryName:"类别1"
            },
            {
              id : "1543",
              name : "属性2",
              code : "adsf",
              categoryId : "54145",
              categoryName:"类别1"
            },
            {
              id : "3245123",
              name : "属性3",
              code : "xggffh",
              categoryId : "54145",
              categoryName:"类别1"
            },
            {
              id : "3245123",
              name : "属性4",
              code : "ertdf ",
              categoryId : "54145",
              categoryName:"类别1"
            },
            {
              id : "76867",
              name : "属性7",
              code : "dfgadf",
              categoryId : "54145",
              categoryName:"类别1"
            },
          ]
        });
    },
    reSearchCategory(){
      console.log("再搜索");
      //重新加载
      this.$axios.get(`${window.$config.HOST}/dictionaryManagement/getAllDictionaryCategory`)
        .then(response=>{
          this.dictionCategories = response.data;
        })
        .catch(error=>{
          console.log("字典类别加载错误");
          this.dictionCategories = [
            {
              id:"241234",
              category:"性别",
              code:"sex",
            },
            {
              id:"4234",
              category:"职称",
              code:"job",
            },
            {
              id:"2345234",
              category:"学历",
              code:"education",
            },
            {
              id:"241234",
              category:"客户类型",
              code:"customerType",
            },
          ];
        });
    },
    handleViewChange(tab, event) {
      console.log(tab, event);
    },
    handleCategSelectionChange(val) {
        this.multiCateSelection = val;
        this.selectedCateProps = [];
        if(val.length >= 1){
          this.reSearchProperty(val[0].id);
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
      this.editCateId = this.multiCateSelection[0].id;
      this.editCateName = this.multiCateSelection[0].category;
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
        console.log("删除"+element.id);
        this.$axios
          .delete(`${window.$config.HOST}/dictionaryManagement/deleteDictionaryCategory`,{
            params:{id:element.id}
          })
          .then(response=>{
            if(response.data < 0){
              this.$message.error("删除失败");
              console.log("删除失败");
            }else{
              this.$message({
                message:"删除成功!",
                type:"success"
              });
              console.log("删除成功");
              this.reSearchCategory();
            }
          })
          .catch(error=>{
            this.$message.error("删除失败");
            console.log("删除失败");
          });
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

      this.editPropId = this.multiplePropSelection[0].id
      this.editPropName = this.multiplePropSelection[0].name;
      this.editPropCode = this.multiplePropSelection[0].code;
      //Attention!!!!!!
      this.editPropCate = this.multiCateSelection[0].category;
      this.initeditPropCateId = this.multiplePropSelection[0].categoryId;
      this.initeditPropCateName = this.editPropCate;

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
        this.$axios
          .delete(`${window.$config.HOST}/dictionaryManagement/deleteCategoryProperty`,{
            params:{id:element.id}
          })
          .then(response=>{
            if(response.data<0){
              this.$message.error("删除失败");
            }else{
              this.$message({
                message:"删除成功!",
                type:"success"
              });
              this.reSearchProperty(element.categoryId);
            }
          })
          .catch(error=>{
            this.$message.error("删除失败");
          });
      });
      
    },
    handleAddCateSaveClick(){
      var param = {
        category : (this.ruleFormCate.addCateName==='')?null:this.ruleFormCate.addCateName,
		    code : (this.ruleFormCate.addCateCode==='')?null:this.ruleFormCate.addCateCode,
      }
      this.$axios.post(`${window.$config.HOST}/dictionaryManagement/addDictionaryCategory`,param)
        .then(response=>{
          if(response.data<0){
            this.$message.error("添加失败");
          }else{
            this.$message({
              message:"添加成功!",
              type:"success"
            });
            this.reSearchCategory();
          }
        })
        .catch(error=>{
          this.$message.error("添加失败");
        });

      this.ruleFormCate.addCateName = "";
      this.ruleFormCate.addCateCode = "";
      
      this.addCateShowFlag = false;
      this.viewname = 'first';
    },
    handleAddCateCancelClick(){
      this.$message({
        message:"取消新增!",
        type:"info"
      });

      this.ruleFormCate.addCateName = "";
      this.ruleFormCate.addCateCode ="";

      this.addCateShowFlag = false;
      this.viewname = 'first';
    },
    handleEditCateSaveClick(){
      var param = {
        id : (this.editCateId==="")?null:this.editCateId,
        category : (this.editCateName==="")?null:this.editCateName,
        code : (this.editCateCode==="")?null:this.editCateCode,
      };
    
      this.$axios.post(`${window.$config.HOST}/dictionaryManagement/updateDictionaryCategory`,param)
        .then(response=>{
          if(response.data<0){
            this.$message.error("编辑失败");
          }else{
            this.$message({
              message:"编辑成功!",
              type:"success"
            });
            this.reSearchCategory();
          }
        });

      this.editCateId = "";
      this.editCateName = "";
      this.editPropCode = "";
      


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
      var param = {
        name : (this.ruleFormProp.addPropName==='')?null:this.ruleFormProp.addPropName,
        code : (this.ruleFormProp.addPropCode==='')?null:this.ruleFormProp.addPropCode,
        categoryId : (this.ruleFormProp.addPropCategoryId==='')?null:this.ruleFormProp.addPropCategoryId,
      };

      console.log(param);

      this.$axios.post(`${window.$config.HOST}/dictionaryManagement/addCategoryProperty`,param)
        .then(response=>{
          if(response.data < 0){
            this.$message.error("添加失败");
          }else{
            console.log("添加成功");
            this.$message({
              message:"添加成功!",
              type:"success"
            });
            this.reSearchProperty(param.categoryId);
          }
        })
        .catch(error=>{
          this.$message.error("添加失败");
        });

      this.ruleFormProp.addPropName = "";
      this.ruleFormProp.addPropCode ="";
      this.ruleFormProp.addPropCategoryId ="";

      this.addPropShowFlag = false;
      this.viewname = 'first';
    },
    handleAddPropCancelClick(){
      this.$message({
        message:"取消新增!",
        type:"info"
      });
      
      this.ruleFormProp.addPropName = "";
      this.ruleFormProp.addPropCode = "";
      this.ruleFormProp.addPropCategoryId = "";

      this.addPropShowFlag = false;
      this.viewname = 'first';
    },
    handleEditPropSaveClick(){
      var tmp = (this.editPropCate===this.initeditPropCateName)?this.initeditPropCateId:this.editPropCate;
      var param={
        id : (this.editPropId==="")? null:this.editPropId,
        name : (this.editPropName==="")? null:this.editPropName,
        code : (this.editPropCode==="")? null:this.editPropCode,
        categoryId :  (tmp==="")? null:tmp,
      }
      console.log(param);

      this.$axios.post(`${window.$config.HOST}/dictionaryManagement/updateCategoryProperty`,param)
        .then(response=>{
          if(response.data<0){
            this.$message.error("编辑失败");
          }else{
            console.log("编辑成功");
            this.$message({
              message:"编辑成功!",
              type:"success"
            });
            this.reSearchProperty(param.categoryId);
          }
        })
        .catch(error=>{
          this.$message.error("编辑失败");
        });

      this.editPropId = "";
      this.editPropName = "";
      this.editPropCode = "";
      this.editPropCate = "";
      this.initeditPropCateId = "";
      this.initeditPropCateName = "";
      
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
