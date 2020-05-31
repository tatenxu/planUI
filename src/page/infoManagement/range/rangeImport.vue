<template>
  <div class="body">
    <el-card class="box-card">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="customerName" placeholder="请选择客户名称">
              <el-select v-model="ruleForm.customerName" @change="clientSelect2" style="width:300px">
                <el-option v-for="item in options.customerNameOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" prop="brandName" placeholder="请选择品牌名称">
              <el-select v-model="ruleForm.brandName" style="width:300px" @change="brandChange">
                <el-option v-for="item in options.brandNameOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服装层次" prop="clothingType" placeholder="请选择服装层次">
              <el-select v-model="ruleForm.clothingType" style="width:300px">
                <el-option v-for="item in options.clothingTypeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
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
              <img style="width: 600px; height: 150px" :src="url" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <div class="label" align="center" style="margin: 0 0 5px 0">文件导入的数据</div>
          <el-table :data="ruleForm.tableData" max-height="400" border :stripe="true" :highlight-current-row="true">
            <af-table-column prop="name" label="款号模板名称" align="center"></af-table-column>
            <af-table-column prop="rangeCode" label="波段编码" align="center"></af-table-column>
            <af-table-column prop="seriesCode" label="系列编码" align="center"></af-table-column>
            <af-table-column prop="systemCode" label="系统编码" align="center"></af-table-column>
            <af-table-column prop="projectType" label="项目类型" align="center"></af-table-column>
            <af-table-column prop="orderStage" label="订单阶段" align="center"></af-table-column>
            <af-table-column prop="predictStyleQuantity" label="预测款数" align="center"></af-table-column>
            <af-table-column prop="predictPieceQuantity" label="预测件数" align="center"></af-table-column>
            <af-table-column prop="informalStyleQuantity" label="非正式款数" align="center"></af-table-column>
            <af-table-column prop="informalPieceQuantity" label="非正式件数" align="center"></af-table-column>
            <af-table-column prop="note" label="备注" align="center"></af-table-column>
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
      //导入图片示例存储的路径
      url: "/static/rangeImport.png",  
      //客户，品牌，服装层次必填、非必填控制
      rules: {           
        customerName: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        brandName: [
          { required: true, message: "请选择品牌", trigger: "change" }
        ],
        clothingType: [
          { required: true, message: "请选择服装层次", trigger: "change" }
        ],
      },
      //存储该页面所有的数据
      ruleForm: {
        customerName: "",  //客户名称
        brandName: "",     //品牌
        clothingType: "",  //服装层次 
        filePath: "",      //文件路径
        tableData: []      //表格数据
      },
      options: {   //下拉框数据
        customerNameOptions: [],
        brandNameOptions: [],
        clothingTypeOptions: []
      },
    };
  },
  created: function () {
    var that = this;
    //获得顾客名称下拉框数据
    request.get(`/backstage/client/name`).then(response => {
      var CustomerList = response.result;
      this.options.customerNameOptions = CustomerList;
    });

    //获得服装层次下拉框数据
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "服装层次"
        }
      })
      .then(response => {
        var ClothingList = response.result;
        this.options.clothingTypeOptions = ClothingList;
      });
  },
  methods: {
    //根据选择的品牌id，获得品牌名称，并组合形成系列名称
    brandChange() {
      if (this.ruleForm.brandName > 0 && this.ruleForm.tableData.length > 0) {
        let brandName = "";
        this.options.brandNameOptions.forEach(ele => {
          if (ele.id === this.ruleForm.brandName) brandName = ele.name;
        })


        this.ruleForm.tableData.forEach(element => {
          element.name = brandName + element.rangeCode + element.orderStage;
        })
      }
    },
    //下拉框选择的客户修改，重新获取品牌数据，并清空已选择品牌
    clientSelect2() {
      this.ruleForm.brandName = "";
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: this.ruleForm.customerName
          }
        })
        .then(response => {
          this.options.brandNameOptions = response.result;
        });
    },
    //处理excel数据，提取其中某些列
    readExcel(file) {
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
          for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
              let sheetInfos = workbook.Sheets[sheet];
              console.log("当前表格的内容(sheetInfos): ", sheetInfos);
              fromTo = sheetInfos["!ref"]; // 如A1:B5
              console.log("当前表格的范围(fromTo):" + fromTo);
              locations = that.getLocationsKeys(fromTo);
              console.log("locations:" + locations);
              var colMax = locations[0];
              console.log("当前表格的最大列数为: ", colMax);
              let rowData = {
                // 每一行的数据
                name: "",
                rangeCode: "",
                seriesCode: "",
                systemCode: "",
                projectType: "",
                orderStage: "",
                predictStyleQuantity: "",
                predictPieceQuantity: "",
                informalStyleQuantity: "",
                informalPieceQuantity: "",
                note: "",
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
                  // 第一列为rangeCode
                  rowData.rangeCode = value;
                  console.log("value: ", value);
                }
                if (i % colMax === 2) {
                  // 第二列为seriesCode
                  rowData.seriesCode = value;
                  console.log("value: ", value);
                }
                if (i % colMax === 3) {
                  // 第三列为systemCode
                  rowData.systemCode = value;
                  console.log("value: ", value);
                }
                if (i % colMax === 4) {
                  // 第四列为projectType
                  rowData.projectType = value;
                  console.log("value: ", value);
                }
                if (i % colMax === 5) {
                  // 第五列为orderStage
                  rowData.orderStage = value;
                  console.log("value: ", value);
                }
                if (i % colMax === 6) {
                  // 第六列为predictStyleQuantity
                  rowData.predictStyleQuantity = value;
                  console.log("value: ", value);
                }
                if (i % colMax === 7) {
                  // 第七列为predictPieceQuantity
                  rowData.predictPieceQuantity = value;
                  console.log("value: ", value);
                }
                if (i % colMax === 8) {
                  // 第八列为informalStyleQuantity
                  rowData.informalStyleQuantity = value;
                  console.log("value: ", value);
                }
                if (i % colMax === 9) {
                  // 第九列为informalPieceQuantity
                  rowData.informalPieceQuantity = value;
                  console.log("value: ", value);
                }
                if (i % colMax === 0) {
                  // 第十列为note 同时为最后一列
                  rowData.note = value;
                  console.log("value: ", value);
                  let brandName = "";
                  that.options.brandNameOptions.forEach(element => {
                    if (element.id === that.ruleForm.brandName) brandName = element.name;
                  })
                  //通过已经获取到的这行数据，组合系列名称
                  rowData.name = brandName + rowData.rangeCode + rowData.orderStage;
                  //将该行存入数据中
                  sheetData.push(rowData);
                  rowData = {
                    //到了最后一列将行数据清空
                    name: "",
                    clientName: "",
                    brandName: "",
                    // clothesLevelName: "",
                    rangeCode: "",
                    seriesCode: "",
                    systemCode: "",
                    projectType: "",
                    orderStage: "",
                    predictStyleQuantity: "",
                    predictPieceQuantity: "",
                    informalStyleQuantity: "",
                    informalPieceQuantity: "",
                    note: "",
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
    //检验文件，对文件合规性进行处理
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
                  resolve("文件上传成功!");
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

      let sv = range.split(":");
      console.log("range", sv);
      let startString = sv[0];
      let endString = sv[1];

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

    // 点击保存按钮，即提交批量添加请求
    submitForm(formName) {
      const that = this;
      var RangeListAdd = [];
      //首先整合数据
      this.ruleForm.tableData.forEach(element => {
        RangeListAdd.push({
          name: element.name,
          brandId: this.ruleForm.brandName,
          clothesLevelName: this.ruleForm.clothingType,
          systemCode: element.systemCode,
          rangeCode: element.rangeCode,
          seriesCode: element.seriesCode,
          projectType: element.projectType,
          orderStage: element.orderStage,
          predictStyleQuantity: element.predictStyleQuantity,
          predictPieceQuantity: element.predictPieceQuantity,
          informalStyleQuantity:
            element.informalStyleQuantity === ""
              ? undefined
              : element.informalStyleQuantity,
          informalPieceQuantity:
            element.informalPieceQuantity === ""
              ? undefined
              : element.informalPieceQuantity,
          note: element.note === ""
            ? undefined
            : element.note,
        });
      });
      //发送批量添加请求，并最后跳转到系列管理页面
      request.post(`/info/series/batch/insert`, RangeListAdd).then(response => {
        this.$router.push({
          name: `rangeManagement`
        });
      });
    },
    // 取消按钮点击
    cancel() {
      const that = this;
      console.log("取消按钮点击");
      that.$router.push({
        name: `rangeManagement`
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