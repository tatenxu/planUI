<template>
  <div class="body">
    <el-card class="box-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="customerName" placeholder="请选择客户名称">
              <el-select v-model="ruleForm.customerName" @change="dialogCustomerNameSelectionChange">
                <el-option v-for="item in options.customerNameOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" prop="brandName" placeholder="请选择品牌名称">
              <el-select v-model="ruleForm.brandName" @change="dialogBrandNameSelectionChange">
                <el-option v-for="item in options.brandNameOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="系列名称" prop="series" placeholder="请选择系列名称">
              <el-select v-model="ruleForm.series" @change="seriesChanged">
                <el-option v-for="item in options.rangeNameTypeOptions" :key="item.id" :label="item.name" :value="[item.id,item.orderStage]"></el-option>
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
            <el-upload style="display: inline; margin-left: 10px;margin-right: 10px;" action="#" ref="fileupload" :show-file-list="false" :http-request="upLoadChange" :before-upload="beforeUpload">
              <el-button type="primary">
                上传文件
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="示例图片" style="margin-top:20px">
              <img style="width: 180px; height: 200px" :src="url"></img>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin: 20px 0 10px 0">
          <div class="label" align="center" style="margin: 0 0 5px 0">文件导入的数据</div>
          <el-table :data="ruleForm.tableData" max-height="400" border :stripe="true" :highlight-current-row="true">
            <el-table-column prop="number" label="订单款号" align="center"></el-table-column>
            <el-table-column prop="pieceQuantity" label="正式件数" align="center"></el-table-column>
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
import XLSX from "xlsx";
import request from "@/utils/request";
export default {
  data() {
    return {
      url: "/static/styleImport.png",
      rules: {
        customerName: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        brandName: [
          { required: true, message: "请选择品牌", trigger: "change" }
        ],
        rangeName: [
          { required: true, message: "请选择系列名称", trigger: "change" }
        ],
        series: [
          {
            required: true,
            trigger: "change",
            validator: (rule, value, callback) => {
              if (value.length > 0) {
                callback();
              } else {
                callback(new Error("请选择系列名称！"));
              }
            }
          }

        ],
      },
      ruleForm: {
        series: [],
        orderStage: "",
        rangeName: "",
        customerName: "",
        brandName: "",
        clothingType: "",
        filePath: "",
        tableData: []
      },
      options: {
        customerNameOptions: [],
        brandNameOptions: [],
        clothingTypeOptions: [],
        rangeNameTypeOptions: []
      }
    };
  },
  created: function () {

    // //得到客户名称
    request
      .get(`/backstage/client/name`)
      .then(response => {
        var CustomerList = response.result;
        this.options.customerNameOptions = CustomerList;
      })


  },
  methods: {
    seriesChanged() {
      if (this.ruleForm.series.length > 0) {
        this.ruleForm.rangeName = this.ruleForm.series[0];
        this.ruleForm.orderStage = this.ruleForm.series[1];
      }
    },
    dialogCustomerNameSelectionChange() {
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: this.ruleForm.customerName
          }
        })
        .then(response => {
          this.options.brandNameOptions = response.result;
        })
      this.ruleForm.brandName = "";
      this.ruleForm.rangeName = "";
    },
    dialogBrandNameSelectionChange() {
      request
        .get(`/info/series/name`, {
          params: {
            brandId: this.ruleForm.brandName
          }
        })
        .then(response => {
          this.options.rangeNameTypeOptions = response.result;
        })
      this.ruleForm.rangeName = "";

    },

    ////////////// methods for xls /////////////
    readExcel(file) {
      console.log("readExcel")

      // 解析Excel
      const that = this;
      return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.onload = e => {
          try {
            // 以二进制流方式读取得到整份excel表格对象
            var data = e.target.result,
              workbook = XLSX.read(data, { type: "binary" });
          } catch (e) {
            reject("读取出错，错误为", e.message);
          }
          var fromTo = ""; // excel中表格的表格范围
          let sheetData = []; //读取的数据，不含表头
          let locations = []; // A1,B1,C1,A2,B3,C3...
          // 遍历每张表读取
          console.log("workbook.Sheets:", workbook.Sheets)
          for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
              let sheetInfos = workbook.Sheets[sheet];
              console.log("当前表格的内容(sheetInfos): ", sheetInfos);   //对的
              fromTo = sheetInfos["!ref"]; // 如A1:B5
              console.log("当前表格的范围(fromTo):" + fromTo);   //对的
              locations = that.getLocationsKeys(fromTo);
              console.log("locations:" + locations);
              var colMax = locations[0];
              console.log("当前表格的最大列数为: ", colMax);
              let rowData = {
                // 每一行的数据
                number: "",
                pieceQuantity: "",
              };
              for (let i = 1 + colMax; i < locations.length; i++) {
                //遍历行数×列数内所有的单元格
                var value = "";
                try {
                  value = sheetInfos[locations[i]].v;
                  console.log(locations[i] + "对应的单元格的value: ", value);
                } catch (e) {
                  value = "";
                  console.log(locations[i] + "对应的单元格的值缺失");
                }
                if (i % colMax === 1) {
                  // 第一列为name
                  rowData.number = value;
                  console.log("value: ", value);
                }
                if (i % colMax === 0) {
                  // 第三列为note 同时为最后一列
                  rowData.pieceQuantity = value;
                  sheetData.push(rowData);
                  rowData = {
                    //到了最后一列将行数据清空    
                    number: "",
                    pieceQuantity: "",
                  };
                }
              }
              resolve(true);
              console.log("sheetData", sheetData);
              that.ruleForm.tableData = sheetData;
            }
            console.log("完成了一张表格数据的读取");
          }
        };
        reader.readAsBinaryString(file);
      });
    },
    beforeUpload(file) {
      const that = this;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          const that = this;
          return new Promise(function (resolve, reject) {
            that.readExcel(file).then(
              result => {
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                  that.$message.error("文件大小不能超过2MB!");
                }
                if (isLt2M && result) {
                  resolve("校验成功!");
                } else {
                  reject(false);
                }
              },
              error => {
                that.$message.error(error);
                reject(false);
              }
            );
          });
        } else {
          this.$message({
            message: "请先选择客户、品牌、服装层次!",
            type: "error"
          });
        }
      });

    },
    upLoadChange(content) {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$message.success("文件上传成功!");
        }
      })
    },
    getLocationsKeys(range) {
      // A1:B5输出 A1,B1...
      console.log("getLocationsKeys")

      let sv = range.split(":");
      console.log("range", sv);
      let startString = sv[0];
      let endString = sv[1];
      console.log("startStr:", startString)
      console.log("endStr:", endString)

      let start = startString.substring(0, 1); // 字符'A'
      console.log("表格的起始列值为: ", start);
      let end = endString.substring(0, 1);
      console.log("表格的结束列值为: ", end);

      let rowMax = parseInt(endString.substring(1, endString.length)); // 获得最大的行数
      console.log("表格里面最大的行值为: ", rowMax);

      let total = 0;
      for (let i = 0; i < end.length; i++) {
        total +=
          Math.pow(26, end.length - 1 - i) *
          (end.charCodeAt(i) - "A".charCodeAt(0) + 1);
        console.log("total: ", total);
      }
      let result = [];
      result.push(total);
      for (let rowNum = 1; rowNum <= rowMax; rowNum++) {
        for (let index = 0; index < total; index++) {
          result.push(this.getCharByNum(index) + rowNum.toString());
        }
      }
      return result;
    },
    getCharByNum(index) {
      console.log("getCharByNum")
      let a = parseInt(index / 26); // 整除
      let b = index % 26; // 余数
      let returnChar = String.fromCharCode(b + 65); // 最后一个字符
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
    submitForm(formName) {
      const that = this;
      var RangeListAdd = [];
      this.ruleForm.tableData.forEach(element => {
        RangeListAdd.push(
          {
            number: element.number,
            seriesId: this.ruleForm.rangeName,
            pieceQuantity: element.pieceQuantity,
            name: element.number + this.ruleForm.orderStage
          }
        );
      });
      console.log(RangeListAdd)
      request
        .post(`/info/style/batch/insert`,
          RangeListAdd
        )
        .then(response => {

        })

      that.$router.push({
        name: `styleManagementIndex`
      });
    },
    // 取消按钮点击
    cancel() {
      const that = this;
      that.$router.push({
        name: `styleManagementIndex`
      });
    },
    // 浏览按钮点击
    findFile() {
      const that = this;
      console.log("浏览按钮点击");
    }
  }
};
</script>


<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 1400px;
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