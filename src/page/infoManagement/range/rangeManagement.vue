<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="clientId" :clearable="true" @change="searchClientChanged">
              <el-option v-for="item in searchOptions.clientOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="brandId" :clearable="true">
              <el-option v-for="item in searchOptions.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-autocomplete class="inline-input" v-model="name" :fetch-suggestions="querySearch" placeholder="请输入系列名称" @select="handleSelect" clearable></el-autocomplete>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="clothesLevelName" :clearable="true">
              <el-option v-for="item in searchOptions.clothesLevelOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="12">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker class="inputBar" v-model="dateRange" type="daterange" range-separator="至" start-placeholde="开始日期" end-placeholde="结束日期" :clearable="true"></el-date-picker>
          </div>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch(1)">搜索</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <div class="table">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-button type="primary" @click="addPanel">添加系列</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="importRange">批量导入</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="deleteBatchSeries">删除系列</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" max-height="400" border @selection-change="changeCheckBoxFun" :stripe="true" :highlight-current-row="true" style="width: 100%; margin-top: 20px">
          <af-table-column type="selection" align="center"></af-table-column>
          <af-table-column type="index" width="50px" label="序号" align="center"></af-table-column>
          <af-table-column prop="name" label="系列编号" align="center"></af-table-column>
          <af-table-column prop="clientName" label="客户" align="center"></af-table-column>
          <af-table-column prop="brandName" label="品牌" align="center"></af-table-column>
          <af-table-column prop="clothesLevelName" label="服装层次" align="center"></af-table-column>
          <af-table-column prop="rangeCode" label="波段编码" align="center"></af-table-column>
          <af-table-column prop="seriesCode" label="系列编码" align="center"></af-table-column>
          <af-table-column prop="systemCode" label="系统编码" align="center"></af-table-column>
          <af-table-column prop="projectType" label="项目类型" align="center"></af-table-column>
          <af-table-column prop="orderStage" label="订单阶段" align="center"></af-table-column>
          <af-table-column prop="predictStyleQuantity" label="预测款式" align="center"></af-table-column>
          <af-table-column prop="predictPieceQuantity" label="预测件数" align="center"></af-table-column>
          <af-table-column prop="styleQuantity" label="正式款数" align="center"></af-table-column>
          <af-table-column prop="pieceQuantity" label="正式件数" align="center"></af-table-column>
          <af-table-column prop="creatorName" label="添加人" align="center"></af-table-column>
          <af-table-column prop="createTime" label="添加时间" align="center"></af-table-column>
          <af-table-column label="操作" align="center" width="180"  fixed="right">
            <template slot-scope="scope">
              <el-button @click="detailPanel(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click="updatePanel(scope.row)" type="text" size="small" v-if="scope.row.creatorId === meID">修改</el-button>
              <el-button @click="deleteSeries(scope.row)" type="text" size="small" v-if="scope.row.creatorId === meID">删除</el-button>
            </template>
          </af-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
        </div>
      </div>
    </el-card>

    <el-dialog :modal="false" title="添加系列" :visible.sync="addPanelFlag">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="clientId" placeholder="请选择客户名称">
              <el-select v-model="addForm.clientId" @change="addClientChanged">
                <el-option v-for="item in addForm.options.clientOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" prop="brandId">
              <el-select v-model="addForm.brandId" @change="addBrandChange">
                <el-option v-for="item in addForm.options.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服装层次" prop="clothesLevelName">
              <el-select v-model="addForm.clothesLevelName ">
                <el-option v-for="item in addForm.options.clothesLevelOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="波段编码" prop="rangeCode">
              <el-select v-model="addForm.rangeCode" @change="getAddName">
                <el-option v-for="item in addForm.options.rangeCodeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系列编码" prop="seriesCode">
              <el-select v-model="addForm.seriesCode">
                <el-option v-for="item in addForm.options.seriesCodeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系统编码" prop="systemCode">
              <el-input v-model="addForm.systemCode" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="项目类型" prop="projectType">
              <el-select v-model="addForm.projectType" @change="addProjectTypeChanged">
                <el-option v-for="item in addForm.options.projectTypeOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单阶段" prop="orderStage">
              <el-select v-model="addForm.orderStage" @change="getAddName">
                <el-option v-for="item in addForm.options.orderStageOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系列名称" prop="name">
              <el-input v-model="addForm.name" disabled placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="预测款数" prop="predictStyleQuantity">
              <el-input v-model.number="addForm.predictStyleQuantity" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预测件数" prop="predictPieceQuantity">
              <el-input v-model.number="addForm.predictPieceQuantity" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="非正式款数" prop="informalStyleQuantity">
              <el-input v-model.number="addForm.informalStyleQuantity" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="非正式件数" prop="informalPieceQuantity">
              <el-input v-model.number="addForm.informalPieceQuantity" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="24">
            <el-form-item label="系列备注">
              <el-input v-model="addForm.note " type="textarea" :rows="3" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="3" :offset="10">
            <el-button type="primary" @click="submitAddForm('addForm')">保存</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" @click="addCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog :modal="false" title="详情信息" :visible.sync="updatePanelFlag">
      <el-form :model="updateForm" :rules="updateRules" ref="updateForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" placeholder="请选择客户名称" prop="clientId">
              <el-select v-model="updateForm.clientId " @change="updateClientChanged" :disabled="detailFlag===true">
                <el-option v-for="item in updateForm.options.clientOption" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" prop="brandId">
              <el-select v-model="updateForm.brandId" @change="updateBrandChange" :disabled="detailFlag===true">
                <el-option v-for="item in updateForm.options.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服装层次" prop="clothesLevelName">
              <el-select v-model="updateForm.clothesLevelName " :disabled="detailFlag===true">
                <el-option v-for="item in updateForm.options.clothesLevelOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="波段编码" prop="rangeCode" placeholder="请输入根计划名称">
                <el-select v-model="updateForm.rangeCode" clearable placeholder="请选择" @change="getUpdateName" :disabled="detailFlag===true">
                  <el-option v-for="item in updateForm.options.rangeCodeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系列编码" prop="seriesCode">
              <el-select v-model="updateForm.seriesCode " :disabled="detailFlag===true">
                <el-option v-for="item in updateForm.options.seriesCodeOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系统编码" prop="systemCode">
              <el-input v-model="updateForm.systemCode" clearable placeholder="请输入" :disabled="detailFlag===true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="项目类型" prop="projectType">
              <el-select v-model="updateForm.projectType" @change="updateProjectTypeChanged" :disabled="detailFlag===true">
                <el-option v-for="item in updateForm.options.projectTypeOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单阶段" prop="orderStage">
              <el-select v-model="updateForm.orderStage " :disabled="detailFlag===true" @change="getUpdateName">
                <el-option v-for="item in updateForm.options.orderStageOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系列名称" prop="name">
              <el-input v-model="updateForm.name" clearable placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="预测款数" prop="predictStyleQuantity">
              <el-input v-model.number="updateForm.predictStyleQuantity" placeholder="请输入" :disabled="detailFlag===true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预测件数" prop="predictPieceQuantity">
              <el-input v-model.number="updateForm.predictPieceQuantity" placeholder="请输入" :disabled="detailFlag===true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="detailFlag===true">
            <el-form-item label="部门" prop="deptName">
              <el-input v-model.number="updateForm.deptName" placeholder="请输入" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="非正式款数" prop="informalStyleQuantity">
              <el-input v-model.number="updateForm.informalStyleQuantity" placeholder="请输入" :disabled="detailFlag===true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="非正式件数" prop="informalPieceQuantity">
              <el-input v-model.number="updateForm.informalPieceQuantity" placeholder="请输入" :disabled="detailFlag===true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="24">
            <el-form-item label="系列备注">
              <el-input v-model="updateForm.note" type="textarea" :rows="3" placeholder="请输入" :disabled="detailFlag===true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="8" :offset="10">
            <el-button type="primary" @click="updateSeries('updateForm')" v-if="detailFlag!=true">保存</el-button>
            <el-button type="info" @click="updateCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      meID: "",  //此时登入者的ID，用于判断是否有修改，删除权限
      //搜索条件部分
      clientId: "",     //客户名称
      brandId: "",      //品牌名称
      name: "",         //系列名称
      nameSuggestions: [],    //系列名称下的待选列表数据
      clothesLevelName: "",    //服装层次
      dateRange: "",      //添加时间
      searchOptions: {   //三个下拉框的数据
        clientOption: {},
        brandIdOptions: {},
        clothesLevelName: {}
      },

      //查看和修改区别标记字段
      detailFlag: false,     //为true时唤出弹出框

      //表格数据
      tableData: [],          
      multipleSelection: [],   //表格选中数据

      //添加系列部分
      addPanelFlag: false,  
      addForm: {
        brandName: "", 
        clientId: "",
        brandId: "",
        name: "",
        clothesLevelName: "",
        rangeCode: "",    
        seriesCode: "",   //系列编码
        systemCode: "",   //系统编码
        projectType: "",   //项目类型
        orderStage: "",   //订单阶段
        predictStyleQuantity: "",  //预测款数
        predictPieceQuantity: "",   //预测件数
        informalStyleQuantity: "",  //非正式款数
        informalPieceQuantity: "",  //非正式件数
        note: "",    //备注
        options: {
          clientOptions: {},
          brandOptions: {},
          rangeCodeOptions: {},
          clothingLevelOptions: {},
          projectTypeOptions: {},
          orderStageOptions: {},

          seriesCodeOptions: []
        }
      },
      addRules: {       //此处为控制添加系列时的必填/非必填
        clientId: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        rangeCode: [
          { required: true, message: "请选择波段编码", trigger: "change" }
        ],
        seriesCode: [{ required: true, message: "请选择季节", trigger: "change" }],
        systemCode: [
          { required: true, message: "请输入系统编码", trigger: "change" }
        ],
        brandId: [{ required: true, message: "请选择品牌", trigger: "change" }],
        clothesLevelName: [
          { required: true, message: "请选择服装层次", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入系列名称", trigger: "change" }],
        projectType: [
          { required: true, message: "请选择项目类型", trigger: "change" }
        ],
        orderStage: [
          { required: true, message: "请选择订单阶段", trigger: "change" }
        ],
        predictStyleQuantity: [  //此处为对预测款数、预测件数 数字的判断
          {
            required: true,
            message: "请输入大于0的数字！",
            trigger: "change"
          },
          { type: "number", message: "请输入大于0的数字！" }
        ],
        predictPieceQuantity: [  //此处为对预测款数、预测件数 数字的判断
          {
            required: true,
            message: "请输入大于0的数字！",
            trigger: "change"
          },
          { type: "number", message: "请输入大于0的数字！" }
        ],
        informalStyleQuantity: [   //此处为费正式款数，非正式件数数字的判断
          {
            required: false,
            trigger: "change",
            validator: (rule, value, callback) => {
              if (value != "" && value != null) {
                if (
                  /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) == false
                ) {
                  callback(new Error("请填写大于0的数字"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            }
          }
        ],
        informalPieceQuantity: [  //此处为费正式款数，非正式件数数字的判断
          {
            required: false,
            trigger: "change",
            validator: (rule, value, callback) => {
              if (value != "" && value != null) {
                if (
                  /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) == false
                ) {
                  callback(new Error("请填写大于0的数字"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            }
          }
        ]
      },

      //修改系列部分
      updatePanelFlag: false,
      updateForm: {   //更新系列的数据部分
        id: "",
        clientId: "",
        addMode: "",
        brandName: "",
        brandId: "",
        name: "",
        deptName: "",
        clothesLevelName: "",
        seriesCode: "",
        systemCode: "",
        rangeCode: "",
        projectType: "",
        orderStage: "",
        predictStyleQuantity: "",
        predictPieceQuantity: "",
        informalStyleQuantity: "",
        informalPieceQuantity: "",
        note: "",
        options: {
          clientOptions: {},
          brandOptions: {},
          clothingLevelOptions: {},
          rangeCodeOptions: {},
          projectTypeOptions: {},
          orderStageOptions: {},
          seriesCodeOptions: [
            {
              name: "春"
            },
            {
              name: "夏"
            },
            {
              name: "秋"
            },
            {
              name: "冬"
            }
          ]
        }
      },
      updateRules: {    //必填、非必填的判断
        clientId: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        rangeCode: [
          { required: true, message: "请选择波段编码", trigger: "change" }
        ],
        seriesCode: [{ required: true, message: "请选择季节", trigger: "change" }],
        systemCode: [
          { required: true, message: "请输入系统编码", trigger: "change" }
        ],
        brandId: [{ required: true, message: "请选择品牌", trigger: "change" }],
        clothesLevelName: [
          { required: true, message: "请选择服装层次", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入系列名称", trigger: "change" }],
        projectType: [
          { required: true, message: "请选择项目类型", trigger: "change" }
        ],
        orderStage: [
          { required: true, message: "请选择订单阶段", trigger: "change" }
        ],
        predictStyleQuantity: [//此处为对预测款数、预测件数 数字的判断
          {
            required: true,
            message: "请输入大于0的数字！",
            trigger: "change"
          },
          { type: "number", message: "请输入大于0的数字！" }
        ],
        predictPieceQuantity: [//此处为对预测款数、预测件数 数字的判断
          {
            required: true,
            message: "请输入大于0的数字！",
            trigger: "change"
          },
          { type: "number", message: "请输入大于0的数字！" }
        ],
        informalStyleQuantity: [//此处为费正式款数，非正式件数数字的判断
          {
            required: false,
            validator: (rule, value, callback) => {
              console.log(value);
              if (value != "" && value != null) {
                if (
                  /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) == false
                ) {
                  callback(new Error("请填写大于0的数字"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        informalPieceQuantity: [//此处为费正式款数，非正式件数数字的判断
          {
            required: false,
            validator: (rule, value, callback) => {
              if (value != "" && value != null) {
                if (
                  /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value) == false
                ) {
                  callback(new Error("请填写大于0的数字"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ]
      },

      //页码部分
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      }
    };
  },

  created: function () {
    var that = this;
    //确认自己的信息，获得修改，删除的权限
    request.get(`/me`).then(response => {
      this.meID = response.result.id;
    }); 
    //获得季节下拉框的数据
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "系列编码"
        }
      })
      .then(response => {
        let list = [];
        let i = 1;
        response.result.forEach(ele => {
          list.push({
            id: i,
            name: ele.name
          })
          i++;
        })
        response.result.forEach(ele => {
          list.push({
            id: i,
            name: ele.code
          })
          i++;
        })
        this.updateForm.options.seriesCodeOptions = list;
        this.addForm.options.seriesCodeOptions = list;

      });
    //获得品牌下拉框的数据
    request.get(`/backstage/brand/name`).then(response => {
      this.searchOptions.brandOptions = response.result;
    });

    //获取波段编码下拉框的数据
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "波段编码"
        }
      })
      .then(response => {
        let list = [];
        let i = 1;
        //由于要同时在下拉框中显示name和code因此循环两次重新组成数据
        response.result.forEach(ele => {
          list.push({
            id: i,
            name: ele.name
          })
          i++;
        })
        response.result.forEach(ele => {
          list.push({
            id: i,
            name: ele.code
          })
          i++;
        })
        this.addForm.options.rangeCodeOptions = list;
        this.updateForm.options.rangeCodeOptions = list;
      });

    //获得项目类型下拉框
    request.get(`/backstage/project-type/find`).then(response => {
      this.addForm.options.projectTypeOptions = response.result;
      this.updateForm.options.projectTypeOptions = response.result;
    });

    //获得客户名称下拉框
    request.get(`/backstage/client/name`).then(response => {
      this.searchOptions.clientOption = response.result;
      this.addForm.options.clientOption = response.result;
      this.updateForm.options.clientOption = response.result;
    });

    //获得全部系列，以推荐搜索
    request.get(`/info/series/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestions.push({
          value: element.name
        });
      });
    });

    //获得服装层次下拉框
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "服装层次"
        }
      })
      .then(response => {
        this.searchOptions.clothesLevelOptions = response.result;
        this.addForm.options.clothesLevelOptions = response.result;
        this.updateForm.options.clothesLevelOptions = response.result;
      });

    //获得页面初始信息
    request
      .get(`/info/series/find`, {
        params: {
          pageNum: 1,
          pageSize: 10
        }
      })
      .then(response => {
        this.tableData = response.result;
        this.pagination.total = response.total;
        this.pagination.currentPage = 1;
      });
  },

  methods: {
    //添加系列的时候选择品牌，则自动获得品牌名称数据，并判断是否可以组合成系列名称
    addBrandChange() {
      this.addForm.options.brandOptions.forEach(ele => {
        if (ele.id === this.addForm.brandId) {
          this.addForm.brandName = ele.name;
          this.getAddName();

        }
      })
    },
    //更新系列的时候选择品牌，则自动获得品牌名称数据，并判断是否可以组合成系列名称
    updateBrandChange() {
      this.updateForm.options.brandOptions.forEach(ele => {
        if (ele.id === this.updateForm.brandId) {
          this.updateForm.brandName = ele.name;
          this.getUpdateName();

        }
      })
    },
    //添加时组合形成系列名称
    getAddName() {
      if (this.addForm.brandId > 0 && this.addForm.orderStage != "" && this.addForm.rangeCode != "") {
        this.addForm.name = this.addForm.brandName + this.addForm.rangeCode + this.addForm.orderStage;
      } else {
        this.addForm.name = "";
      }
    },
    //更新时组合形成系列名称
    getUpdateName() {
      if (this.updateForm.brandId > 0 && this.updateForm.orderStage != "" && this.updateForm.rangeCode != "") {
        this.updateForm.name = this.updateForm.brandName + this.updateForm.rangeCode + this.updateForm.orderStage;
      } else {
        this.updateForm.name = "";
      }
    },
    //添加弹窗中的项目类型变化，则获取对应的订单阶段
    addProjectTypeChanged() {
      this.addForm.orderStage = "";
      request
        .get(`/backstage/order-stage/name`, {
          params: {
            projectTypeName: this.addForm.projectType
          }
        })
        .then(response => {
          this.addForm.options.orderStageOptions = response.result;
        });
    },
    //修改弹窗中的项目类型变化，则获取对应的订单阶段
    updateProjectTypeChanged() {
      this.updateForm.orderStage = "";
      request
        .get(`/backstage/order-stage/name`, {
          params: {
            projectTypeName: this.updateForm.projectType
          }
        })
        .then(response => {
          this.updateForm.options.orderStageOptions = response.result;
        });
    },

    //打印系列名称
    handleSelect(item) {
      console.log(item);
    },

    //系列名称搜索的输入建议(参考element组件)
    querySearch(queryString, cb) {
      var nameSuggestions = this.nameSuggestions;
      var results = queryString
        ? nameSuggestions.filter(this.createFilter(queryString))
        : nameSuggestions;
      cb(results);
    },
    //系列名称搜索的输入建议(参考element组件)
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },

    //当搜索框的客户名称改变的时候重新获取品牌下拉框数据，并清空品牌数据
    searchClientChanged() {
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: this.clientId === "" ? undefined : this.clientId
          }
        })
        .then(response => {
          this.searchOptions.brandOptions = response.result;
          //由于组件的渲染原因，必须修改数值才能重新渲染
          this.brandId = 1;
          this.brandId = "";
        });
    },
    //当添加弹出框的客户名称改变的时候重新获取品牌下拉框数据，并清空品牌数据
    addClientChanged() {
      this.addForm.brandId = "";
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: this.addForm.clientId
          }
        })
        .then(response => {
          this.addForm.options.brandOptions = response.result;
        });
    },
    //当更新弹出框的客户名称改变的时候重新获取品牌下拉框数据，并清空品牌数据
    updateClientChanged() {
      this.updateForm.brandId = "";
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: this.updateForm.clientId
          }
        })
        .then(response => {
          this.updateForm.options.brandOptions = response.result;
        });
    },
    // 改变日期格式
    changeDate(date) {
      if (!date) {
        return undefined;
      } else {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        var h = date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? "0" + minute : minute;
        var second = date.getSeconds();
        second = minute < 10 ? "0" + second : second;
        return y + "-" + m + "-" + d;
      }
    },
    // 每页条数改变时触发函数
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.handleSearch(1);
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.handleSearch(val);
    },
    // 选择框改变监控
    changeCheckBoxFun(val) {
      this.multipleSelection = val;
    },
    //搜索数据
    handleSearch(currentPageNum) {
      let startDate;
      let endDate;
      //转换数据格式
      if (this.dateRange == undefined) {
        startDate = undefined;
        endDate = undefined;
      } else {
        startDate = this.changeDate(this.dateRange[0]);
        endDate = this.changeDate(this.dateRange[1]);
      }

      request
        .get(`/info/series/find`, {
          params: {
            clientId: this.clientId === "" ? undefined : this.clientId,
            brandId: this.brandId === "" ? undefined : this.brandId,
            name: this.name === "" ? undefined : this.name,
            clothesLevelName:
              this.clothesLevelName === "" ? undefined : this.clothesLevelName,
            createAfter: startDate,
            createBefore: endDate,
            pageSize: this.pagination.pageSize,
            pageNum: currentPageNum
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.total = response.total;  //获取页码的总条数
          this.pagination.currentPage = currentPageNum;  //获取当前页数
        });
    },

    // 添加系列，点击的时候先清空添加弹出框所有数据
    addPanel() {
      this.addForm.clientId = "";
      this.addForm.brandId = "";
      this.addForm.name = "";
      this.addForm.clothesLevelName = "";
      this.addForm.seriesCode = "";
      this.addForm.systemCode = "";
      this.addForm.projectType = "";
      this.addForm.orderStage = "";
      this.addForm.rangeCode = "";
      this.addForm.predictStyleQuantity = "";
      this.addForm.predictPieceQuantity = "";
      this.addForm.informalStyleQuantity = "";
      this.addForm.informalPieceQuantity = "";
      this.addForm.note = "";
      this.addForm.options.brandOptions = {};
      this.addForm.options.orderStageOptions = {};
      this.addPanelFlag = true;
    },

    // 批量导入页面的跳转
    importRange() {
      this.$router.push({
        name: `rangeImport`
      });
    },
    // 批量删除系列
    deleteBatchSeries() {
      const that = this;
      if (that.multipleSelection.length === 0) {  //判断：若没有选择任何条目，则弹出
        this.$message({
          message: "请选择要删除的系列!",
          type: "warning"
        });
      } else if (that.multipleSelection.length >= 1) {  //判断：条目大于等于1，可以删除
        let flag = 0;
        this.multipleSelection.forEach(element => {   //判断：是否每个条目的创建者都是删除的操作者
          if (element.creatorId != this.meID) flag++;
        });
        if (flag === 0) {  //只有所有条目的创建者等于操作者的时候，才可以删除
          this.$confirm(   //弹出确认删除的信息
            "删除所选的" +
            that.multipleSelection.length +
            "条系列信息, 是否继续?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
            .then(() => {
              this.multipleSelection.forEach(element => { //开始删除，一条一条的遍历并删除
                request
                  .delete(`/info/series/delete`, {
                    params: {
                      id: element.id
                    }
                  })
                  .then(response => {
                    this.handleSearch(1);
                  });
              });
            })
            .catch(() => {    //弹出确认信息的时候，点击了取消
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        } else { 
          this.$message({
            message: "您没有权限删除其中的某些条目！",
            type: "warning"
          });
        }
      }
    },

    // 显示修改系列的面板
    updatePanel(row) {
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: row.clientId
          }
        })
        .then(response => {
          this.updateForm.options.brandOptions = response.result;
          request
            .get(`/backstage/order-stage/name`, {
              params: {
                projectTypeName: row.projectType
              }
            })
            .then(response => {
              this.updateForm.id = row.id;
              this.updateForm.clientId = parseInt(row.clientId);
              this.updateForm.brandId = parseInt(row.brandId);
              this.updateForm.name = row.name;
              this.updateForm.projectType = row.projectType;
              this.updateForm.orderStage = row.orderStage;
              this.updateForm.rangeCode = row.rangeCode;
              this.updateForm.predictStyleQuantity = row.predictStyleQuantity;
              this.updateForm.predictPieceQuantity = row.predictPieceQuantity;
              this.updateForm.informalStyleQuantity = row.informalStyleQuantity;
              this.updateForm.informalPieceQuantity = row.informalPieceQuantity;
              this.updateForm.clothesLevelName = row.clothesLevelName;
              this.updateForm.seriesCode = row.seriesCode;
              this.updateForm.systemCode = row.systemCode;
              this.updateForm.note = row.note;
              this.updateForm.addMode = row.addMode;
              this.updateForm.brandName = row.brandName;
              this.detailFlag = false;
              this.updatePanelFlag = true;
              this.updateForm.options.orderStageOptions = response.result;
            });
        });
    },

    // 显示详情系列的面板，传ID获得详情
    detailPanel(row) {
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: row.clientId
          }
        })
        .then(response => {
          this.updateForm.options.brandOptions = response.result;
          this.updateForm.id = row.id;
          this.updateForm.clientId = parseInt(row.clientId);
          this.updateForm.brandId = parseInt(row.brandId);
          this.updateForm.name = row.name;
          this.updateForm.projectType = row.projectType;
          this.updateForm.orderStage = row.orderStage;
          this.updateForm.rangeCode = row.rangeCode;
          this.updateForm.predictStyleQuantity = row.predictStyleQuantity;
          this.updateForm.predictPieceQuantity = row.predictPieceQuantity;
          this.updateForm.informalStyleQuantity = row.informalStyleQuantity;
          this.updateForm.informalPieceQuantity = row.informalPieceQuantity;
          this.updateForm.clothesLevelName = row.clothesLevelName;
          this.updateForm.seriesCode = row.seriesCode;
          this.updateForm.systemCode = row.systemCode;
          this.updateForm.addMode = row.addMode;
          this.updateForm.note = row.note;
          this.updateForm.deptName = row.deptName;
          this.detailFlag = true;
          this.updatePanelFlag = true;
        });
    },

    // 表格中的删除操作
    deleteSeries(row) {
      const that = this;
      this.$confirm("是否确认删除该系列？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })

        .then(() => {
          request
            .delete(`/info/series/delete`, {
              params: {
                id: row.id
              }
            })
            .then(response => {
              this.handleSearch(this.pagination.currentPage);
            });
        })
        .catch(() => {
          this.$message({
            message: "已取消删除",
            type: "info"
          });
        });
    },

    //添加系列信息
    submitAddForm(form) {
      const that = this;
      this.$refs[form].validate(valid => {
        if (valid) {
          //必填项在这一步就已经判断，只有非必填项需要 : ? 语句
          request
            .post(`/info/series/insert`, {
              name: this.addForm.name,
              brandId: this.addForm.brandId,
              clothesLevelName: this.addForm.clothesLevelName,
              seriesCode: this.addForm.seriesCode,
              rangeCode: this.addForm.rangeCode,
              systemCode: this.addForm.systemCode,
              projectType: this.addForm.projectType,
              orderStage: this.addForm.orderStage,
              predictStyleQuantity: this.addForm.predictStyleQuantity,
              predictPieceQuantity: this.addForm.predictPieceQuantity,
              informalStyleQuantity:
                this.addForm.informalStyleQuantity === ""
                  ? undefined
                  : this.addForm.informalStyleQuantity,
              informalPieceQuantity:
                this.addForm.informalPieceQuantity === ""
                  ? undefined
                  : this.addForm.informalPieceQuantity,
              note: this.addForm.note === "" ? undefined : this.addForm.note,
            })
            .then(response => {
              //添加完成后重新获取主页面数据，并关闭弹出框
              this.handleSearch(this.pagination.currentPage);
              this.addPanelFlag = false;
            });
        } else {
          this.$message({
            message: "请填写必须填写的项！",
            type: "error"
          });
        }
      });
    },

    //修改系列信息
    updateSeries(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .put(`/info/series/update`, {
              id: this.updateForm.id,
              name: this.updateForm.name,
              brandId: this.updateForm.brandId,
              clothesLevelName: this.updateForm.clothesLevelName,
              seriesCode: this.updateForm.seriesCode,
              rangeCode: this.updateForm.rangeCode,
              systemCode: this.updateForm.systemCode,
              projectType: this.updateForm.projectType,
              orderStage: this.updateForm.orderStage,
              predictStyleQuantity: this.updateForm.predictStyleQuantity,
              predictPieceQuantity: this.updateForm.predictPieceQuantity,
              informalStyleQuantity:
                this.updateForm.informalStyleQuantity === ""
                  ? undefined
                  : this.updateForm.informalStyleQuantity,
              informalPieceQuantity:
                this.updateForm.informalPieceQuantity === ""
                  ? undefined
                  : this.updateForm.informalPieceQuantity,
              note:
                this.updateForm.note === "" ? undefined : this.updateForm.note,
            })
            .then(response => {
              //修改完成后重新获取主页面数据，并关闭弹出框
              this.handleSearch(this.pagination.currentPage);
              this.updatePanelFlag = false;
            });
        } else {
          this.$message({
            message: "请填写必填项!",
            type: "error"
          });
        }
      });
    },

    // 取消按钮点击，清空添加弹出框所有数据
    addCancel() {
      this.addForm.clientId = "";
      this.addForm.brandId = "";
      this.addForm.name = "";
      this.addForm.clothesLevelName = "";
      this.addForm.seriesCode = "";
      this.addForm.systemCode = "";
      this.addForm.projectType = "";
      this.addForm.orderStage = "";
      this.addForm.rangeCode = "";
      this.addForm.predictStyleQuantity = "";
      this.addForm.predictPieceQuantity = "";
      this.addForm.informalStyleQuantity = "";
      this.addForm.informalPieceQuantity = "";
      this.addForm.note = "";
      this.addForm.options.orderStageOptions = {};
      this.addForm.options.brandOptions = {};
      this.addPanelFlag = false;
    },
    // 取消按钮点击，清空更新弹出框所有数据
    updateCancel() {
      this.updateForm.id = "";
      this.updateForm.clientId = "";
      this.updateForm.brandId = "";
      this.updateForm.name = "";
      this.updateForm.clothesLevelName = "";
      this.updateForm.seriesCode = "";
      this.updateForm.systemCode = "";
      this.updateForm.note = "";
      this.updateForm.projectType = "";
      this.updateForm.orderStage = "";
      this.updateForm.rangeCode = "";
      this.updateForm.predictStyleQuantity = "";
      this.updateForm.predictPieceQuantity = "";
      this.updateForm.informalStyleQuantity = "";
      this.updateForm.informalPieceQuantity = "";
      this.updateForm.note = "";
      this.updateForm.deptName = "";
      this.updateForm.options.orderStageOptions = {};
      this.updateForm.options.brandOptions = {};
      this.updatePanelFlag = false;
    }
  }
};
</script>


<style lang="less">
.el-table .cell {
  white-space: pre-line;
}
body .el-table th.gutter {
  display: table-cell !important;
}
</style>

<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  min-width: 900px;
  .bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    .title {
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