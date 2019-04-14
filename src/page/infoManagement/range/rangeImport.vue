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
          <el-col :span="10">
            <el-form-item label="文件路径">
              <el-input v-model="ruleForm.filePath"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-upload 
              style="display: inline; margin-left: 10px;margin-right: 10px;"
              action="#"
              ref="fileupload"
              :show-file-list="false"
              :http-request="upLoadChange"
              :before-upload="beforeUpload">
              <el-button type="primary">上传文件<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <div class="label" align="center" style="margin: 0 0 5px 0">文件导入的数据</div>
          <el-table
            :data="ruleForm.tableData"
            max-height="400"
            border
            :stripe="true"
            :highlight-current-row="true">
            <el-table-column prop="rangeName" label="系列名称" align="center"></el-table-column>
            <el-table-column prop="rangeAmount" label="系列款数" align="center"></el-table-column>
            <el-table-column prop="rangeNote" label="系列备注" align="center"></el-table-column>
          </el-table>
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
import XLSX from 'xlsx';
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
      },
      ruleForm: {
        customerName: "",
        brandName: "",
        clothingType: "",
        filePath: "",
        tableData:[
          {
            rangeName: "Winter-2018(10/11/12)",
            rangeAmount: "20",
            rangeNote: "备注1",
          },
          {
            rangeName: "Winter-2019(10/11/12)",
            rangeAmount: "30",
            rangeNote: "备注2",
          },
        ],
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
      },
      fileList:[

      ],
    };
  },
  created: function () {
    const that = this;
    console.log("进入导入系列页面");
  },
  methods: {
    ////////////// methods for xls /////////////
    readExcel (file) { // 解析Excel
      const that = this;
      return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            // 以二进制流方式读取得到整份excel表格对象
            var data = e.target.result, workbook = XLSX.read(data, {type: 'binary'});
          } catch (e) {
            reject("读取出错，错误为",e.message);
          }
          var fromTo = ""; // excel中表格的表格范围
          let sheetData = []; //读取的数据，不含表头
          let locations = []; // A1,B1,C1,A2,B3,C3...
          // 遍历每张表读取
          for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
              let sheetInfos = workbook.Sheets[sheet];
              console.log("当前表格的内容(sheetInfos): ",sheetInfos);
              fromTo = sheetInfos['!ref']; // 如A1:B5
              console.log("当前表格的范围(fromTo):" + fromTo);
              locations = that.getLocationsKeys(fromTo);
              console.log("locations:" + locations);
              var colMax = locations[0];
              console.log("当前表格的最大列数为: ",colMax);
              let rowData = { // 每一行的数据
                rangeName: "",
                rangeAmount: "",
                rangeNote: "",
              }
              for (let i = 1 + colMax; i < locations.length; i++) { //遍历行数×列数内所有的单元格
                var value = "";
                try {
                  value = sheetInfos[locations[i]].v;
                  console.log(locations[i] + "对应的单元格的value: ",value);
                }
                catch (e) {
                  value = "";
                  console.log(locations[i] + "对应的单元格的值缺失");
                }
                if (i%colMax === 1){ // 第一列为rangeName
                  rowData.rangeName = value;
                  console.log("value: ",value);
                }
                if (i%colMax === 2){ // 第二列为rangeAmount
                  rowData.rangeAmount = value;
                  console.log("value: ",value);
                }
                if (i%colMax === 0){ // 第三列为rangeNote 同时为最后一列
                  rowData.rangeNote = value;
                  sheetData.push(rowData);
                  rowData = { //到了最后一列将行数据清空
                    rangeName: "",
                    rangeAmount: "",
                    rangeNote: "",
                  }
                }
              }
              resolve(true);
              console.log("sheetData",sheetData);
              that.ruleForm.tableData = sheetData;
            }
            console.log("完成了一张表格数据的读取");
          }
        }
        reader.readAsBinaryString(file);
      })
    },
    beforeUpload (file) {
      const that = this;
      return new Promise(function (resolve, reject) {
        that.readExcel(file).then(result => {
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            that.$message.error('文件大小不能超过2MB!');
          }
          if (isLt2M && result) {
            resolve('校验成功!');
          } else {
            reject(false);
          }
        }, error => {
          that.$message.error(error);
          reject(false);
        })
      })
    },
    upLoadChange (content) {
      this.$message.success('文件上传成功!');
    },
    getLocationsKeys (range) { // A1:B5输出 A1,B1...
      
      let sv = range.split(":");
      console.log("range", sv);
      let startString = sv[0];
      let endString = sv[1];

      let start = startString.substring(0, startString.length - 1);// 字符'A'
      console.log("表格的起始列值为: ",start);
      let end = endString.substring(0, endString.length - 1);
      console.log("表格的结束列值为: ",end);

      let rowMax = parseInt(endString.substring(1, endString.length));// 获得最大的行数
      console.log("表格里面最大的行值为: ",rowMax);

      let total = 0;
      for (let i = 0; i < end.length; i++) {
        total += Math.pow(26, end.length - 1 - i) * (end.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
        console.log("total: ",total);
      }
      let result = [];
      result.push(total);
      for (let rowNum = 1; rowNum <= rowMax; rowNum++){
        for (let index = 0;index < total;index++) {
          result.push(this.getCharByNum(index) + rowNum.toString());
        }
      }
      return result;
    },
    getCharByNum(index) {
      let a = parseInt(index / 26);// 整除
      let b = index % 26;// 余数
      let returnChar = String.fromCharCode(b + 65);// 最后一个字符
      while (a > 0) {
        b = a % 26;
        a = parseInt(a / 26);
        // 从后生成字符，向前推进
        returnChar = String.fromCharCode(b + 65 - 1) + returnChar;
      }
      return returnChar;
    },
    ////////////// methods for xls /////////////
    // 保存按钮点击
    submitForm(formName){
      const that = this;
      console.log("保存按钮点击");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            message: '成功导入系列信息',
            type: 'success'
          });
        }
      });
    },
    // 取消按钮点击
    cancel(){
      const that = this;
      console.log("取消按钮点击");
      that.$router.push({
        path: `/range/rangeManagement`,
      });
    },
    // 浏览按钮点击
    findFile(){
      const that = this;
      console.log("浏览按钮点击");
    },
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