<template>
  <div class="body">
    <el-card class="box-card">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="customerName" placeholder="请选择客户名称">
              <el-select
                v-model="ruleForm.customerName"
                @change="clientSelect2"
                style="width:300px"
              >
                <el-option
                  v-for="item in options.customerNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" prop="brandName" placeholder="请选择品牌名称">
              <el-select v-model="ruleForm.brandName" style="width:300px">
                <el-option
                  v-for="item in options.brandNameOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服装层次" prop="clothingType" placeholder="请选择服装层次">
              <el-select v-model="ruleForm.clothingType" style="width:300px">
                <el-option
                  v-for="item in options.clothingTypeOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:25px">
          <el-col :span="8">
            <el-form-item label="系统编号" prop="systemCode" placeholder="请输入系统编号">
              <el-input
                v-model="ruleForm.systemCode"
                clearable
                placeholder="请输入"
                style="width:300px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="季节" prop="season" placeholder="请选择季节">
              <el-select v-model="ruleForm.season" style="width:300px">
                <el-option
                  v-for="item in options.seasonOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="投入点" prop="inputPoint" placeholder="请输入根计划名称">
                <el-select v-model="ruleForm.inputPoint" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options.inputPointOptions"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="项目类型" prop="projectType">
              <el-select
                v-model="ruleForm.projectType"
                @change="projectTypeChanged"
                style="min-width:300px"
              >
                <el-option
                  v-for="item in options.projectTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单阶段" prop="orderStage">
              <el-select v-model="ruleForm.orderStage " style="min-width:300px">
                <el-option
                  v-for="item in options.orderStageOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="预测款数" prop="predictStyleQuantity">
              <el-input v-model="ruleForm.predictStyleQuantity" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预测件数" prop="predictPieceQuantity">
              <el-input v-model="ruleForm.predictPieceQuantity" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="实际款数" prop="styleQuantity">
              <el-input v-model="ruleForm.styleQuantity" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际件数" prop="pieceQuantity">
              <el-input v-model="ruleForm.pieceQuantity" clearable placeholder="请输入"></el-input>
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
              :before-upload="beforeUpload"
            >
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
              <img style="width: 300px; height: 150px" :src="url" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <div class="label" align="center" style="margin: 0 0 5px 0">文件导入的数据</div>
          <el-table
            :data="ruleForm.tableData"
            max-height="400"
            border
            :stripe="true"
            :highlight-current-row="true"
          >
            <el-table-column prop="rangeName" label="系列名称" align="center"></el-table-column>
            <!-- <el-table-column prop="rangeAmount" label="系列款数" align="center"></el-table-column> -->
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
import XLSX from "xlsx";
import request from "@/utils/request";
export default {
  data() {
    return {
      url: "/static/rangeImport.png",
      rules: {
        customerName: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        inputPoint: [
          { required: true, message: "请选择投入点", trigger: "change" }
        ],
        brandName: [
          { required: true, message: "请选择品牌", trigger: "change" }
        ],
        clothingType: [
          { required: true, message: "请选择服装层次", trigger: "change" }
        ],
        season: [{ required: true, message: "请选择季节", trigger: "change" }],
        systemCode: [
          { required: true, message: "请输入系统编号", trigger: "blur" }
        ],
        projectType: [
          { required: true, message: "请选择项目类型", trigger: "change" }
        ],
        orderStage: [
          { required: true, message: "请选择订单阶段", trigger: "change" }
        ],
        predictStyleQuantity: [
          { required: true, message: "请输入预测款数", trigger: "blur" }
        ],
        predictPieceQuantity: [
          { required: true, message: "请输入预测件数", trigger: "blur" }
        ],
        styleQuantity: [
          { required: false, message: "请输入实际款数", trigger: "blur" }
        ],
        pieceQuantity: [
          { required: false, message: "请输入实际件数", trigger: "blur" }
        ]
      },
      ruleForm: {
        season: "",
        systemCode: "",
        customerName: "",
        brandName: "",
        inputPoint: "",
        clothingType: "",
        filePath: "",
        projectType: "",
        orderStage: "",
        predictStyleQuantity: "",
        predictPieceQuantity: "",
        styleQuantity: "",
        pieceQuantity: "",
        tableData: []
      },
      options: {
        inputPointOptions: [],
        projectTypeOptions: [],
        orderStageOptions: [],
        seasonOptions: [],
        customerNameOptions: [],
        brandNameOptions: [],
        clothingTypeOptions: []
      },
      fileList: []
    };
  },
  created: function() {
    var that = this;
    //获得投入点
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "投入点"
        }
      })
      .then(response => {
        this.options.inputPointOptions = response.result;
      });
    //获得季节
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "季节"
        }
      })
      .then(response => {
        this.options.seasonOptions = response.result;
      });
    //获得项目类型
    request.get(`/backstage/project-type/find`).then(response => {
      this.options.projectTypeOptions = response.result;
    });
    //获得顾客名称
    request.get(`/backstage/client/name`).then(response => {
      var CustomerList = response.result;
      this.options.customerNameOptions = CustomerList;
    });

    //获得服装层次
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
    projectTypeChanged() {
      this.ruleForm.orderStage = "";
      request
        .get(`/backstage/order-stage/name`, {
          params: {
            projectTypeName: this.ruleForm.projectType
          }
        })
        .then(response => {
          this.options.orderStageOptions = response.result;
        });
    },
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

    ////////////// methods for xls /////////////
    readExcel(file) {
      // 解析Excel
      const that = this;
      return new Promise(function(resolve, reject) {
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
                rangeName: "",
                rangeAmount: "",
                rangeNote: ""
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
                  // 第一列为rangeName
                  rowData.rangeName = value;
                  console.log("value: ", value);
                }
                if (i % colMax === 2) {
                  // 第二列为rangeAmount
                  rowData.rangeAmount = value;
                  console.log("value: ", value);
                }
                if (i % colMax === 0) {
                  // 第三列为rangeNote 同时为最后一列
                  rowData.rangeNote = value;
                  sheetData.push(rowData);
                  rowData = {
                    //到了最后一列将行数据清空
                    rangeName: "",
                    rangeAmount: "",
                    rangeNote: ""
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
      return new Promise(function(resolve, reject) {
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
    },
    upLoadChange(content) {
      this.$message.success("文件上传成功!");
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
    ////////////// methods for xls /////////////
    // 保存按钮点击
    submitForm(formName) {
      const that = this;
      var RangeListAdd = [];
      this.ruleForm.tableData.forEach(element => {
        RangeListAdd.push({
          name: element.rangeName,
          brandId: this.ruleForm.brandName,
          clothesLevelName: this.ruleForm.clothingType,
          note: element.rangeNote,
          season: this.ruleForm.season,
          systemCode: this.ruleForm.systemCode,
          projectType: this.ruleForm.projectType,
          orderStage: this.ruleForm.orderStage,
          inputPoint: this.ruleForm.inputPoint,
          predictStyleQuantity: this.ruleForm.predictStyleQuantity,
          predictPieceQuantity: this.ruleForm.predictPieceQuantity,
          styleQuantity:
            this.ruleForm.styleQuantity === ""
              ? undefined
              : this.ruleForm.styleQuantity,
          pieceQuantity:
            this.ruleForm.pieceQuantity === ""
              ? undefined
              : this.ruleForm.pieceQuantity,
          addMode: "导入"
        });
      });

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