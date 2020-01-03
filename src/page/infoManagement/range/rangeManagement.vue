<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="clientId" :clearable="true" @change="searchClientChanged">
              <el-option
                v-for="item in searchOptions.clientOption"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="brandId" :clearable="true">
              <el-option
                v-for="item in searchOptions.brandOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-autocomplete
              class="inline-input"
              v-model="name"
              :fetch-suggestions="querySearch"
              placeholder="请输入系列名称"
              @select="handleSelect"
              clearable
            ></el-autocomplete>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="clothesLevelName" :clearable="true">
              <el-option
                v-for="item in searchOptions.clothesLevelOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="12">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              class="inputBar"
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholde="开始日期"
              end-placeholde="结束日期"
              :clearable="true"
            ></el-date-picker>
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
        <el-table
          :data="tableData"
          max-height="400"
          border
          @selection-change="changeCheckBoxFun"
          :stripe="true"
          :highlight-current-row="true"
          style="width: 100%; margin-top: 20px"
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="serialNo" width="150" label="系列编号" align="center"></el-table-column>
          <el-table-column prop="clientName" width="120" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" width="120" label="品牌" align="center"></el-table-column>
          <el-table-column prop="clothesLevelName" label="服装类型" align="center"></el-table-column>
          <el-table-column prop="name" width="170" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="importStyleQuantity" width="70" label="导入款数" align="center"></el-table-column>
          <el-table-column prop="creatorName" label="添加人" align="center"></el-table-column>
          <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
          <el-table-column prop="createTime" width="170" label="添加时间" align="center"></el-table-column>
          <el-table-column prop="addMode" label="添加方式" align="center"></el-table-column>
          <!-- <el-table-column prop="stateStr" label="状态" align="center"></el-table-column> -->
          <el-table-column label="操作" width="150" min-width="100" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button @click="detailPanel(scope.row)" type="text" size="small">查看</el-button>
              <el-button
                @click="updatePanel(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.creatorId === meID"
              >修改</el-button>
              <el-button
                @click="deleteSeries(scope.row)"
                type="text"
                size="small"
                v-if="scope.row.creatorId === meID"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagination.currentPage"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total"
          ></el-pagination>
        </div>
      </div>
    </el-card>

    <el-dialog :modal="false" title="添加系列" :visible.sync="addPanelFlag">
      <el-form
        :model="addForm"
        :rules="addRules"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="clientId" placeholder="请选择客户名称">
              <el-select v-model="addForm.clientId" @change="addClientChanged">
                <el-option
                  v-for="item in addForm.options.clientOption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" prop="brandId">
              <el-select v-model="addForm.brandId">
                <el-option
                  v-for="item in addForm.options.brandOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系列名称" prop="name">
              <el-input v-model="addForm.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="服装层次" prop="clothesLevelName">
              <el-select v-model="addForm.clothesLevelName ">
                <el-option
                  v-for="item in addForm.options.clothesLevelOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="季节" prop="season">
              <el-select v-model="addForm.season ">
                <el-option
                  v-for="item in addForm.options.seasonOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
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
                <el-option
                  v-for="item in addForm.options.projectTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单阶段" prop="orderStage">
              <el-select v-model="addForm.orderStage ">
                <el-option
                  v-for="item in addForm.options.orderStageOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="投入点" prop="inputPoint" placeholder="请输入根计划名称">
                <el-select v-model="addForm.inputPoint" clearable placeholder="请选择">
                  <el-option
                    v-for="item in addForm.options.inputPointOptions"
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
            <el-form-item label="实际款数" prop="styleQuantity">
              <el-input v-model.number="addForm.styleQuantity" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际件数" prop="pieceQuantity">
              <el-input v-model.number="addForm.pieceQuantity" placeholder="请输入"></el-input>
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
      <el-form
        :model="updateForm"
        :rules="updateRules"
        ref="updateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" placeholder="请选择客户名称" prop="clientId">
              <el-select
                v-model="updateForm.clientId "
                @change="updateClientChanged"
                :disabled="detailFlag===true"
              >
                <el-option
                  v-for="item in updateForm.options.clientOption"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" prop="brandId">
              <el-select v-model="updateForm.brandId " :disabled="detailFlag===true">
                <el-option
                  v-for="item in updateForm.options.brandOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系列名称" prop="name">
              <el-input
                v-model="updateForm.name"
                clearable
                placeholder="请输入"
                :disabled="detailFlag===true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="服装层次" prop="clothesLevelName">
              <el-select v-model="updateForm.clothesLevelName " :disabled="detailFlag===true">
                <el-option
                  v-for="item in updateForm.options.clothesLevelOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="季节" prop="season">
              <el-select v-model="updateForm.season " :disabled="detailFlag===true">
                <el-option
                  v-for="item in updateForm.options.seasonOptions"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="系统编码" prop="systemCode">
              <el-input
                v-model="updateForm.systemCode"
                clearable
                placeholder="请输入"
                :disabled="detailFlag===true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="项目类型" prop="projectType">
              <el-select
                v-model="updateForm.projectType"
                @change="updateProjectTypeChanged"
                :disabled="detailFlag===true"
              >
                <el-option
                  v-for="item in updateForm.options.projectTypeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单阶段" prop="orderStage">
              <el-select v-model="updateForm.orderStage " :disabled="detailFlag===true">
                <el-option
                  v-for="item in updateForm.options.orderStageOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="投入点" prop="inputPoint" placeholder="请输入根计划名称">
                <el-select
                  v-model="updateForm.inputPoint"
                  clearable
                  placeholder="请选择"
                  :disabled="detailFlag===true"
                >
                  <el-option
                    v-for="item in updateForm.options.inputPointOptions"
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
            <el-form-item label="预测款数" prop="predictStyleQuantity">
              <el-input
                v-model.number="updateForm.predictStyleQuantity"
                placeholder="请输入"
                :disabled="detailFlag===true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预测件数" prop="predictPieceQuantity">
              <el-input
                v-model.number="updateForm.predictPieceQuantity"
                placeholder="请输入"
                :disabled="detailFlag===true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="实际款数" prop="styleQuantity">
              <el-input
                v-model.number="updateForm.styleQuantity"
                placeholder="请输入"
                :disabled="detailFlag===true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="实际件数" prop="pieceQuantity">
              <el-input
                v-model.number="updateForm.pieceQuantity"
                placeholder="请输入"
                :disabled="detailFlag===true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="24">
            <el-form-item label="系列备注">
              <el-input
                v-model="updateForm.note"
                type="textarea"
                :rows="3"
                placeholder="请输入"
                :disabled="detailFlag===true"
              ></el-input>
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
      meID: "",
      //搜索条件部分
      clientId: "",
      brandId: "",
      name: "",
      nameSuggestions: [],
      clothesLevelName: "",
      dateRange: "",
      searchOptions: {
        clientOption: {},
        brandIdOptions: {},
        clothesLevelName: {}
      },

      //查看和修改区别标记字段
      detailFlag: false,

      //表格数据
      tableData: [],
      multipleSelection: [],

      //添加系列部分
      addPanelFlag: false,
      addForm: {
        clientId: "",
        brandId: "",
        name: "",
        clothesLevelName: "",
        season: "",
        systemCode: "",
        projectType: "",
        inputPoint: "",
        orderStage: "",
        predictStyleQuantity: "",
        predictPieceQuantity: "",
        styleQuantity: "",
        pieceQuantity: "",
        note: "",
        options: {
          clientOptions: {},
          brandOptions: {},
          clothingLevelOptions: {},
          projectTypeOptions: {},
          orderStageOptions: {},
          inputPointOptions: {},
          seasonOptions: []
        }
      },
      addRules: {
        clientId: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        inputPoint: [
          { required: true, message: "请选择投入点", trigger: "change" }
        ],
        season: [{ required: true, message: "请选择季节", trigger: "change" }],
        systemCode: [
          { required: true, message: "请输入系统编码", trigger: "blur" }
        ],
        brandId: [{ required: true, message: "请选择品牌", trigger: "change" }],
        clothesLevelName: [
          { required: true, message: "请选择服装层次", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入系列名称", trigger: "blur" }],
        projectType: [
          { required: true, message: "请选择项目类型", trigger: "change" }
        ],
        orderStage: [
          { required: true, message: "请选择订单阶段", trigger: "change" }
        ],
        predictStyleQuantity: [
          {
            required: true,
            message: "请输入大于0的数字！",
            trigger: "blur"
          },
          { type: "number", message: "请输入大于0的数字！" }
        ],
        predictPieceQuantity: [
          {
            required: true,
            message: "请输入大于0的数字！",
            trigger: "blur"
          },
          { type: "number", message: "请输入大于0的数字！" }
        ],
        styleQuantity: [
          {
            required: false,
            trigger: "blur",
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
        pieceQuantity: [
          {
            required: false,
            trigger: "blur",
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
      updateForm: {
        id: "",
        clientId: "",
        addMode: "",
        brandId: "",
        inputPoint: "",
        name: "",
        clothesLevelName: "",
        season: "",
        systemCode: "",
        projectType: "",
        orderStage: "",
        predictStyleQuantity: "",
        predictPieceQuantity: "",
        styleQuantity: "",
        pieceQuantity: "",
        note: "",
        options: {
          clientOptions: {},
          brandOptions: {},
          inputPointOptions: {},
          clothingLevelOptions: {},
          projectTypeOptions: {},
          orderStageOptions: {},
          seasonOptions: [
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
      updateRules: {
        clientId: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        inputPoint: [
          { required: true, message: "请选择投入点", trigger: "change" }
        ],
        season: [{ required: true, message: "请选择季节", trigger: "change" }],
        systemCode: [
          { required: true, message: "请输入系统编码", trigger: "blur" }
        ],
        brandId: [{ required: true, message: "请选择品牌", trigger: "change" }],
        clothesLevelName: [
          { required: true, message: "请选择服装层次", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入系列名称", trigger: "blur" }],
        projectType: [
          { required: true, message: "请选择项目类型", trigger: "change" }
        ],
        orderStage: [
          { required: true, message: "请选择订单阶段", trigger: "change" }
        ],
        predictStyleQuantity: [
          {
            required: true,
            message: "请输入大于0的数字！",
            trigger: "blur"
          },
          { type: "number", message: "请输入大于0的数字！" }
        ],
        predictPieceQuantity: [
          {
            required: true,
            message: "请输入大于0的数字！",
            trigger: "blur"
          },
          { type: "number", message: "请输入大于0的数字！" }
        ],
        styleQuantity: [
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
            trigger: "blur"
          }
        ],
        pieceQuantity: [
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
            trigger: "blur"
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

  created: function() {
    var that = this;
    //确认自己的信息
    request.get(`/me`).then(response => {
      this.meID = response.result.id;
    });
    //获得季节
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "季节"
        }
      })
      .then(response => {
        this.updateForm.options.seasonOptions = response.result;
        this.addForm.options.seasonOptions = response.result;
      });
    //获得品牌名字
    request.get(`/backstage/brand/name`).then(response => {
      this.searchOptions.brandOptions = response.result;
    });

    //获得投入点
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "投入点"
        }
      })
      .then(response => {
        this.addForm.options.inputPointOptions = response.result;
        this.updateForm.options.inputPointOptions = response.result;
      });

    //获得项目类型
    request.get(`/backstage/project-type/find`).then(response => {
      this.addForm.options.projectTypeOptions = response.result;
      this.updateForm.options.projectTypeOptions = response.result;
    });

    //获得顾客名称
    request.get(`/backstage/client/name`).then(response => {
      this.searchOptions.clientOption = response.result;
      this.addForm.options.clientOption = response.result;
      this.updateForm.options.clientOption = response.result;
    });

    //获得全部系列
    request.get(`/info/series/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestions.push({
          value: element.name
        });
      });
    });

    //获得服装层次
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

    //获得空搜索集
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
    //添加弹窗中的项目类型变化
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
    //修改弹窗中的项目类型变化
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
    handleSelect(item) {
      console.log(item);
    },

    //系列名称搜索的输入建议
    querySearch(queryString, cb) {
      var nameSuggestions = this.nameSuggestions;
      var results = queryString
        ? nameSuggestions.filter(this.createFilter(queryString))
        : nameSuggestions;
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },

    //当搜索框的客户名称改变的时候GET弹出框的品牌信息
    searchClientChanged() {
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId: this.clientId === "" ? undefined : this.clientId
          }
        })
        .then(response => {
          this.searchOptions.brandOptions = response.result;
          this.brandId = 1;
          this.brandId = "";
        });
    },
    //当弹出框的客户名称改变的时候GET弹出框的品牌信息
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

    handleSearch(currentPageNum) {
      let startDate;
      let endDate;
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
          this.pagination.total = response.total;
          this.pagination.currentPage = currentPageNum;
        });
    },

    // 添加系列
    addPanel() {
      this.addForm.clientId = "";
      this.addForm.brandId = "";
      this.addForm.name = "";
      this.addForm.clothesLevelName = "";
      this.addForm.season = "";
      this.addForm.systemCode = "";
      this.addForm.projectType = "";
      this.addForm.orderStage = "";
      this.addForm.inputPoint = "";
      this.addForm.predictStyleQuantity = "";
      this.addForm.predictPieceQuantity = "";
      this.addForm.styleQuantity = "";
      this.addForm.pieceQuantity = "";
      this.addForm.note = "";
      this.addForm.options.brandOptions = {};
      this.addForm.options.orderStageOptions = {};
      this.addPanelFlag = true;
    },

    // 批量导入
    importRange() {
      this.$router.push({
        name: `rangeImport`
      });
    },
    // 删除系列
    deleteBatchSeries() {
      const that = this;
      if (that.multipleSelection.length === 0) {
        this.$message({
          message: "请选择要删除的系列!",
          type: "warning"
        });
      } else if (that.multipleSelection.length >= 1) {
        let flag = 0;
        this.multipleSelection.forEach(element => {
          if (element.creatorId != this.meID) flag++;
        });
        if (flag === 0) {
          this.$confirm(
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
              this.multipleSelection.forEach(element => {
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
            .catch(() => {
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
              // TODO: 后台传回的这两个参数是String类型的会导致数据绑定失败
              this.updateForm.clientId = parseInt(row.clientId);
              this.updateForm.brandId = parseInt(row.brandId);
              this.updateForm.name = row.name;
              this.updateForm.projectType = row.projectType;
              this.updateForm.orderStage = row.orderStage;
              this.updateForm.inputPoint = row.inputPoint;
              this.updateForm.predictStyleQuantity = row.predictStyleQuantity;
              this.updateForm.predictPieceQuantity = row.predictPieceQuantity;
              this.updateForm.styleQuantity = row.styleQuantity;
              this.updateForm.pieceQuantity = row.pieceQuantity;
              this.updateForm.clothesLevelName = row.clothesLevelName;
              this.updateForm.season = row.season;
              this.updateForm.systemCode = row.systemCode;
              this.updateForm.note = row.note;
              this.updateForm.addMode = row.addMode;
              this.detailFlag = false;
              this.updatePanelFlag = true;
              this.updateForm.options.orderStageOptions = response.result;
            });
        });
    },

    // 显示详情系列的面板
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
          // TODO: 后台传回的这两个参数是String类型的会导致数据绑定失败
          this.updateForm.clientId = parseInt(row.clientId);
          this.updateForm.brandId = parseInt(row.brandId);
          this.updateForm.name = row.name;
          this.updateForm.projectType = row.projectType;
          this.updateForm.orderStage = row.orderStage;
          this.updateForm.inputPoint = row.inputPoint;
          this.updateForm.predictStyleQuantity = row.predictStyleQuantity;
          this.updateForm.predictPieceQuantity = row.predictPieceQuantity;
          this.updateForm.styleQuantity = row.styleQuantity;
          this.updateForm.pieceQuantity = row.pieceQuantity;
          this.updateForm.clothesLevelName = row.clothesLevelName;
          this.updateForm.season = row.season;
          this.updateForm.systemCode = row.systemCode;
          this.updateForm.addMode = row.addMode;
          this.updateForm.note = row.note;
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
          request
            .post(`/info/series/insert`, {
              name: this.addForm.name,
              brandId: this.addForm.brandId,
              clothesLevelName: this.addForm.clothesLevelName,
              note: this.addForm.note === "" ? undefined : this.addForm.note,
              season: this.addForm.season,
              addMode: "手动",
              systemCode: this.addForm.systemCode,
              projectType: this.addForm.projectType,
              orderStage: this.addForm.orderStage,
              inputPoint: this.addForm.inputPoint,
              predictStyleQuantity: this.addForm.predictStyleQuantity,
              predictPieceQuantity: this.addForm.predictPieceQuantity,
              styleQuantity:
                this.addForm.styleQuantity === ""
                  ? undefined
                  : this.addForm.styleQuantity,
              pieceQuantity:
                this.addForm.pieceQuantity === ""
                  ? undefined
                  : this.addForm.pieceQuantity
            })
            .then(response => {
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
              note:
                this.updateForm.note === "" ? undefined : this.updateForm.note,
              season: this.updateForm.season,
              addMode: this.updateForm.addMode,
              systemCode: this.updateForm.systemCode,
              projectType: this.updateForm.projectType,
              orderStage: this.updateForm.orderStage,
              inputPoint: this.updateForm.inputPoint,
              predictStyleQuantity: this.updateForm.predictStyleQuantity,
              predictPieceQuantity: this.updateForm.predictPieceQuantity,
              styleQuantity:
                this.updateForm.styleQuantity === ""
                  ? undefined
                  : this.updateForm.styleQuantity,
              pieceQuantity:
                this.updateForm.pieceQuantity === ""
                  ? undefined
                  : this.updateForm.pieceQuantity
            })
            .then(response => {
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

    // 取消按钮点击
    addCancel() {
      this.addForm.clientId = "";
      this.addForm.brandId = "";
      this.addForm.name = "";
      this.addForm.clothesLevelName = "";
      this.addForm.season = "";
      this.addForm.systemCode = "";
      this.addForm.projectType = "";
      this.addForm.orderStage = "";
      this.addForm.inputPoint = "";
      this.addForm.predictStyleQuantity = "";
      this.addForm.predictPieceQuantity = "";
      this.addForm.styleQuantity = "";
      this.addForm.pieceQuantity = "";
      this.addForm.note = "";
      this.addForm.options.orderStageOptions = {};
      this.addForm.options.brandOptions = {};
      this.addPanelFlag = false;
    },

    updateCancel() {
      this.updateForm.id = "";
      this.updateForm.clientId = "";
      this.updateForm.brandId = "";
      this.updateForm.name = "";
      this.updateForm.clothesLevelName = "";
      this.updateForm.season = "";
      this.updateForm.systemCode = "";
      this.updateForm.note = "";
      this.updateForm.projectType = "";
      this.updateForm.orderStage = "";
      this.updateForm.inputPoint = "";
      this.updateForm.predictStyleQuantity = "";
      this.updateForm.predictPieceQuantity = "";
      this.updateForm.styleQuantity = "";
      this.updateForm.pieceQuantity = "";
      this.updateForm.note = "";
      this.updateForm.options.orderStageOptions = {};
      this.updateForm.options.brandOptions = {};
      this.updatePanelFlag = false;
    }
  }
};
</script>

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