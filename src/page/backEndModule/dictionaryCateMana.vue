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
          <div class="inputCombine">
            <span class="inputTag">字典类别名称:</span>
            <el-input v-model="addCateName" class="input" placeholder="请输入字典类别名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">字典类别编码:</span>
            <el-input v-model="addCateCode" class="input" placeholder="请输入字典类别编码"></el-input>
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
          <div class="inputCombine">
            <span class="inputTag">类别属性名称:</span>
            <el-input v-model="addPropName" class="input" placeholder="请输入类别属性名称"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">类别属性编码:</span>
            <el-input v-model="addPropCode" class="input" placeholder="请输入类别属性编码"></el-input>
          </div>
          <div class="inputCombine">
            <span class="inputTag">所属类别:</span>
              <el-select v-model="addPropCategoryId" placeholder="请选择" class="inputSelector">
                <el-option
                  v-for="item in dictionCategories"
                  :key="item.id"
                  :label="item.category"
                  :value="item.id">
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

      addCateName:'',
      addCateCode:'',

      editCateId:'',
      editCateName:'',
      editCateCode:'',

      addPropName:'',
      addPropCode:'',
      addPropCategoryId:'',

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
            id:"2412764",
            category:"客户类型",
            code:"customerType",
          },
        ];
      });
  },
  methods:{
    reSearchProperty(cateId){
      this.$axios.get(`${window.$config.HOST}/dictionaryManagement/getCategoryProperty`,{categoryId:cateId})
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
          this.$axios.get(`${window.$config.HOST}/dictionaryManagement/getCategoryProperty`,{categoryId:val[0].id})
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
                  categoryId : "2352",
                  categoryName:"类别1"
                },
                {
                  id : "3245123",
                  name : "属性3",
                  code : "xggffh",
                  categoryId : "56436",
                  categoryName:"类别1"
                },
                {
                  id : "3245123",
                  name : "属性4",
                  code : "ertdf ",
                  categoryId : "7567",
                  categoryName:"类别1"
                },
              ]
            });
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
        console.log("删除"+element.category);
        this.$axios.post(`${window.$config.HOST}/dictionaryManagement/deleteDictionaryCategory`,{id:element.id})
          .then(response=>{
            if(response.data<0){
              this.$message.error(elemenet.category+"删除失败");
              console.log(elemenet.category+"删除失败");
            }else{
              this.$message({
                message:elemenet.category+"删除成功!",
                type:"success"
              });
              console.log(elemenet.category+"删除成功");
              this.reSearchCategory();
            }
          })
          .catch(error=>{
            this.$message.error(elemenet.category+"删除失败");
            console.log(elemenet.category+"删除失败");
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
      this.editPropCate = this.multiplePropSelection[0].categoryName;
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
        this.$axios.post(`${window.$config.HOST}/dictionaryManagement/deletecCategoryProperty`,{id:element.id})
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
        category : (this.addCateName==='')?NaN:this.addCateName,
		    code : (this.addCateCode==='')?NaN:this.addCateCode,
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

      this.addCateName = "";
      this.addCateCode ="";



      this.addCateShowFlag = false;
      this.viewname = 'first';
    },
    handleAddCateCancelClick(){
      this.$message({
        message:"取消新增!",
        type:"info"
      });

      this.addCateName = "";
      this.addCateCode ="";

      this.addCateShowFlag = false;
      this.viewname = 'first';
    },
    handleEditCateSaveClick(){
      var param = {
        id : (this.editCateId==="")?NaN:this.editCateId,
        category : (this.editCateName==="")?NaN:this.editCateName,
        code : (this.editCateCode==="")?NaN:this.editCateCode,
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
        name : (this.addPropName==='')?NaN:this.addPropName,
        code : (this.addPropCode==='')?NaN:this.addPropCode,
        categoryId : (this.addPropCategoryId==='')?NaN:this.addPropCategoryId,
      };

      console.log(param);

      this.$axios.post(`${window.$config.HOST}/dictionaryManagement/addPropCategoryId`,param)
        .then(response=>{
          if(response.data<0){
            this.$message.error("添加失败");
          }else{
            this.$message({
              message:"添加成功!",
              type:"success"
            });
            this.reSearchProperty(this.addPropCategoryId);
          }
        })
        .catch(error=>{
          this.$message.error("添加失败");
        });

      

      this.addPropName = "";
      this.addPropCode ="";
      this.addPropCategoryId ="";

      this.addPropShowFlag = false;
      this.viewname = 'first';
    },
    handleAddPropCancelClick(){
      this.$message({
        message:"取消新增!",
        type:"info"
      });
      
      this.addPropName = "";
      this.addPropCode = "";
      this.addPropCategoryId = "";

      this.addPropShowFlag = false;
      this.viewname = 'first';
    },
    handleEditPropSaveClick(){
      var tmp = (this.editPropCate===this.initeditPropCateName)?this.initeditPropCateId:this.editPropCate;
      var param={
        id : (this.editPropId==="")? NaN:this.editPropId,
        name : (this.editPropName==="")? NaN:this.editPropName,
        code : (this.editPropCode==="")? NaN:this.editPropCode,
        categoryId :  (tmp==="")? NaN:tmp,
      }
      console.log(param);

      this.$axios.post(`${window.$config.HOST}/dictionaryManagement/updateDictionaryCategory`,param)
        .then(response=>{
          if(response.data<0){
            this.$message.error("编辑失败");
          }else{
            this.$message({
              message:"保存成功!",
              type:"success"
            });
            this.reSearchProperty(this.initeditPropCateId);
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
