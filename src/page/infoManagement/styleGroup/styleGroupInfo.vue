<template>
  <div class="body">
    <el-card class="box-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="customerName" placeholder="请选择客户名称">
              <el-select v-model="ruleForm.customerName" >
                <el-option
                  v-for="item in options.customerNameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> 
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" prop="brandName" placeholder="请选择品牌名称">
              <el-select v-model="ruleForm.brandName" >
                <el-option
                  v-for="item in options.brandNameOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> 
          </el-col>
          <el-col :span="8">
            <el-form-item label="服装类型" prop="clothingType" placeholder="请选择服装类型">
              <el-select v-model="ruleForm.clothingType" >
                <el-option
                  v-for="item in options.clothingTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> 
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="系列名称" prop="rangeName" placeholder="请选择系列名称">
              <el-select v-model="ruleForm.rangeName" >
                <el-option
                  v-for="item in options.rangeNameTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="款式组名" prop="styleGroupName" placeholder="请输入款式组名">
              <el-input v-model="ruleForm.styleGroupName" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="3" :offset="10">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" @click="cancel">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules:{
        customerName: [
          { required: true, message: '请选择客户名称', trigger: 'change' }
        ],
        brandName: [
          { required: true, message: '请选择品牌', trigger: 'change' }
        ],
        clothingType: [
          { required: true, message: '请选择服装类型', trigger: 'change' }
        ],
        rangeName: [
          { required: true, message: '请选择系列名称', trigger: 'change' },
        ],
        styleGroupName: [
          { required: true, message: '请输入款式组名', trigger: 'blur' },
        ],
      },
      ruleForm: {
        customerName: "",
        brandName: "",
        clothingType: "",
        rangeName: "",
        styleGroupName: "",
      },
      options: {
        customerNameOptions: [
          {
            value: 1,
            label: "A客户"
          },
          {
            value: 2,
            label: "B客户"
          },
        ],
        brandNameOptions: [
          {
            value: 1,
            label: "X品牌"
          },
          {
            value: 2,
            label: "Y品牌"
          },
        ],
        clothingTypeOptions: [
          {
            value: 1,
            label: "时装"
          },
          {
            value: 2,
            label: "精品"
          },
          {
            value: 3,
            label: "品牌"
          },
        ],
        rangeNameTypeOptions: [
          {
            value: 1,
            label: "Fall-2019(07/08/09)"
          },
          {
            value: 2,
            label: "Spring-2019(01/02/03)"
          },
          {
            value: 3,
            label: "Winter-2019(10/11/12)"
          },
        ],
      },
      controlData: {
        ifStyleGroupAdd: false,
        ifStyleGroupChange: false,
      },
    };
  },
  created: function () {
    const that = this;
    console.log("进入款式组信息页面");
    var result = {};
    result = that.$route.query;
    if (result.hasOwnProperty("ifStyleGroupAdd")){
      that.controlData.ifStyleGroupAdd = result["ifStyleGroupAdd"];
      console.log("当面页面用于添加款式组");
    }
    if (result.hasOwnProperty("ifStyleGroupChange")){
      that.controlData.ifStyleGroupChange = result["ifStyleGroupChange"];
      console.log("当面页面用于修改款式组");
      that.ruleForm = result;
    }
  },
  methods: {
    // 保存按钮点击
    submitForm(formName){
      const that = this;
      console.log("保存按钮点击");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(that.controlData.ifStyleGroupAdd === true){
            this.$message({
              message: '成功新增款式组信息',
              type: 'success'
            });
          }
        if(that.controlData.ifStyleGroupChange === true){
            this.$message({
              message: '成功修改款式组信息',
              type: 'success'
            });
          }
        }
      });
    },
    // 取消按钮点击
    cancel(){
      const that = this;
      console.log("取消按钮点击");
      that.$router.push({
        path: `/styleGroup/styleGroupManagement`,
      });
    }
  }
}
</script>


<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .inputBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    .label {
      font-size: 14px;
      min-width: 75px;
      text-align: center;
    }
    .el-input {
      width: 300px;
      min-width: 75px;
    }
    .el-select {
      width: 300px;
      min-width: 75px;
    }
  }
  .block {
    padding: 30px 0;
    text-align: center;
  }
}
</style>