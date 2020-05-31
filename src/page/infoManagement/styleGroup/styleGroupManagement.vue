<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20" style="margin-top:5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="clientId" clearable @change="searchClientChanged">
              <el-option v-for="item in searchOptions.clientOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="brandId" clearable>
              <el-option v-for="item in searchOptions.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">系列名称</div>
            <el-autocomplete class="inline-input" v-model="seriesName" :fetch-suggestions="querySearchSeries" placeholder="请输入系列名称" @select="handleSelect" clearable></el-autocomplete>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">款式组名</div>
            <el-autocomplete class="inline-input" v-model="name" :fetch-suggestions="querySearchStyleGroup" placeholder="请输入款式组名称" @select="handleSelect" clearable></el-autocomplete>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
        <el-col :span="6">
          <div class="bar">
            <div class="title">服装层次</div>
            <el-select v-model="clothesLevelName" clearable>
              <el-option v-for="item in searchOptions.clothesLevelOptions" :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker class="inputBar" v-model="dateRange" type="daterange" range-separator="至" start-placeholde="开始日期" end-placeholde="结束日期" clearable></el-date-picker>
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
          <el-col :span="4">
            <el-button type="primary" @click="addStyleGroup">添加款式组</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="deleteStyleGroup">删除款式组</el-button>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="unbindStyleGroup">解绑款式组</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" max-height="400" border @selection-change="changeCheckBoxFun" :stripe="true" :highlight-current-row="true" style="width: 100%; margin-top: 20px">
          <af-table-column type="selection" width="50" align="center"></af-table-column>
          <af-table-column type="index" label="序号" width="50" align="center"></af-table-column>
          <af-table-column prop="name" label="款式组名称" align="center"></af-table-column>
          <af-table-column prop="clientName" label="客户" align="center"></af-table-column>
          <af-table-column prop="brandName" label="品牌" align="center"></af-table-column>
          <af-table-column prop="clothesLevelName" label="服装层次" align="center"></af-table-column>
          <af-table-column prop="rangeCode" label="波段编码" align="center"></af-table-column>
          <af-table-column prop="projectType" label="项目类型" align="center"></af-table-column>
          <af-table-column prop="orderStage" label="订单阶段" align="center"></af-table-column>
          <af-table-column prop="styleQuantity" label="正式款数" align="center"></af-table-column>
          <af-table-column prop="pieceQuantity" label="正式件数" align="center"></af-table-column>
          <af-table-column label="操作" width="150" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button @click="updateStyleGroup(scope.row)" type="text" size="small" v-if="scope.row.creatorId === meID">修改</el-button>
              <el-button @click="daleteStyleGroup(scope.row)" type="text" size="small" v-if="scope.row.creatorId === meID">删除</el-button>
            </template>
          </af-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pagination.currentPage" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"></el-pagination>
        </div>
      </div>
    </el-card>
    <el-dialog :modal="false" title="修改款式组" :visible.sync="updatePanelFlag">
      <el-form :model="updateForm" :rules="updateRules" ref="updateForm" label-width="100px" class="demo-updateForm">
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="clientId" placeholder="请选择客户名称">
              <el-select v-model="updateForm.clientId" @change="updateClientChanged()">
                <el-option v-for="item in updateForm.options.clientOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" prop="brandId" placeholder="请选择品牌名称">
              <el-select v-model="updateForm.brandId" @change="updateBrandChanged()">
                <el-option v-for="item in updateForm.options.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="系列名称" prop="seriesId" placeholder="请选择系列名称">
              <el-select v-model="updateForm.seriesId">
                <el-option v-for="item in updateForm.options.seriesOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="款式组名" prop="name" placeholder="请输入款式组名">
              <el-input v-model="updateForm.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="3" :offset="10">
            <el-button type="primary" @click="updateSubmit('updateForm')">保存</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" @click="updateCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>

    <el-dialog :modal="false" title="增加款式组" :visible.sync="addPanelFlag">
      <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px" class="demo-updateForm">
        <el-row :gutter="20" style="margin-top:5px;">
          <el-col :span="8">
            <el-form-item label="客户名称" prop="clientId" placeholder="请选择客户名称">
              <el-select v-model="addForm.clientId" @change="addClientChanged()">
                <el-option v-for="item in addForm.options.clientOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌名称" prop="brandId" placeholder="请选择品牌名称">
              <el-select v-model="addForm.brandId" @change="addBrandChanged()">
                <el-option v-for="item in addForm.options.brandOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top: 30px; margin-bottom: 5px;">
          <el-col :span="8">
            <el-form-item label="系列名称" prop="seriesId" placeholder="请选择系列名称">
              <el-select v-model="addForm.seriesId">
                <el-option v-for="item in addForm.options.seriesOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="款式组名" prop="name" placeholder="请输入款式组名">
              <el-input v-model="addForm.name" clearable placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin: 50px 0 10px 0">
          <el-col :span="3" :offset="10">
            <el-button type="primary" @click="addSubmit('addForm')">保存</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="info" @click="addCancel">取消</el-button>
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
      meID: "",   //此时登入者的ID，用于判断是否有修改，删除权限
      //搜索条件部分
      clientId: "",  //客户名称
      brandId: "",   //品牌名称
      seriesName: "",   //系列名称
      name: "",       //款式组名称
      clothesLevelName: "",  //服装层次
      dateRange: "",   //开始时间
      searchOptions: {   //下拉框数据
        clientOptions: {},
        brandOptions: {},
        clothesLevelOptions: {}
      },

      //表格数据
      tableData: [],   
      multipleSelection: [],         //表格选中
      nameSuggestionsSeries: [],     //输入提醒——系列
      nameSuggestionsStyleGroup: [], //输入提醒——款式组

      //添加款式组
      addPanelFlag: false,      //为true时唤出弹出框
      addForm: {      
        clientId: "",
        brandId: "",
        seriesId: "",
        name: "",
        options: {
          clientOptions: {},
          brandOptions: {},
          seriesOptions: {}
        }
      },
      addRules: { //此处为控制添加款式组时的必填/非必填
        clientId: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        brandId: [
          { required: true, message: "请选择品牌名称", trigger: "change" }
        ],
        seriesId: [
          { required: true, message: "请选择系列名称", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入款式组名称", trigger: "blur" }]
      },

      //修改款式组
      updatePanelFlag: false,
      updateForm: {
        id: "",
        clientId: "",
        brandId: "",
        seriesId: "",
        name: "",
        options: {
          clientOptions: {},
          brandOptions: {},
          seriesOptions: {}
        }
      },
      updateRules: {  //此处为控制修改款式组时的必填/非必填
        clientId: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        brandId: [
          { required: true, message: "请选择品牌名称", trigger: "change" }
        ],
        seriesId: [
          { required: true, message: "请选择系列名称", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入款式组名称", trigger: "blur" }]
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
    //确认自己的信息
    request.get(`/me`).then(response => {
      this.meID = response.result.id;
    });
    //获取客户名称
    request.get(`/backstage/client/name`).then(response => {
      this.searchOptions.clientOptions = response.result;
      this.addForm.options.clientOptions = response.result;
      this.updateForm.options.clientOptions = response.result;
    });

    //获取服装层次
    request
      .get(`/backstage/dic-property/name`, {
        params: {
          categoryName: "服装层次"
        }
      })
      .then(response => {
        this.searchOptions.clothesLevelOptions = response.result;
      });

    //默认获取所有款式组
    request
      .get(`/info/style-group/find`, {
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

    //获取品牌名称
    request
      .get(`/backstage/brand/name`, {
        params: { clientId: undefined }
      })
      .then(response => {
        this.searchOptions.brandOptions = response.result;
      });

    //获取系列名称
    request.get(`/info/series/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestionsSeries.push({
          value: element.name
        });
      });
    });

    //获取款式组名称
    request.get(`/info/style-group/name`).then(response => {
      response.result.forEach(element => {
        this.nameSuggestionsStyleGroup.push({
          value: element.name
        });
      });
    });
  },
  methods: {
    //当搜索框的客户名称改变的时候，清空品牌选项，并重新获取品牌下拉框数据
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
    //款式组名称搜索的输入建议(参考element组件)
    querySearchStyleGroup(queryString, cb) {
      var nameSuggestions = this.nameSuggestionsStyleGroup;
      var results = queryString
        ? nameSuggestions.filter(this.createFilter(queryString))
        : nameSuggestions;
      cb(results);
    },
    //系列名称搜索的输入建议(参考element组件)
    querySearchSeries(queryString, cb) {
      var nameSuggestions = this.nameSuggestionsSeries;
      var results = queryString
        ? nameSuggestions.filter(this.createFilter(queryString))
        : nameSuggestions;
      cb(results);
    },
    //搜索的输入建议(参考element组件)
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleSelect(item) {
      console.log(item);
    },

    // 每页条数改变时触发函数
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.handleSearch(val);
    },
    // 当前页码改变时触发函数
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.handleSearch(1);
    },

    //更新款式组的时候选择品牌，自动清空系列选项，并重新获取系列下拉框数据
    updateBrandChanged() {
      this.updateForm.seriesId = "";
      this.updateForm.options.seriesOptions = [];
      //下拉提醒获取
      request
        .get(`/info/series/name`, {
          params: {
            brandId:
              this.updateForm.brandId === ""
                ? undefined
                : this.updateForm.brandId
          }
        })
        .then(response => {
          this.updateForm.options.seriesOptions = response.result;
        });
    },
    //当更新弹出框的客户名称改变的时候重新获取品牌下拉框数据，并清空品牌和系列数据
    updateClientChanged() {
      this.updateForm.brandId = "";
      this.updateForm.seriesId = "";
      this.updateForm.options.brandOptions = [];
      this.updateForm.options.seriesOptions = [];
      //品牌名称选择获取
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId:
              this.updateForm.clientId === ""
                ? undefined
                : this.updateForm.clientId
          }
        })
        .then(response => {
          this.updateForm.options.brandOptions = response.result;
        });
    },

    //添加款式组的时候选择品牌，自动清空系列选项，并重新获取系列下拉框数据
    addBrandChanged() {
      this.addForm.seriesId = "";
      this.addForm.options.seriesOptions = [];
      //下拉提醒获取
      request
        .get(`/info/series/name`, {
          params: {
            brandId:
              this.addForm.brandId === "" ? undefined : this.addForm.brandId
          }
        })
        .then(response => {
          this.addForm.options.seriesOptions = response.result;
        });
    },
    //当添加弹出框的客户名称改变的时候重新获取品牌下拉框数据，并清空品牌和系列数据
    addClientChanged() {
      this.addForm.brandId = "";
      this.addForm.seriesId = "";
      this.addForm.options.brandOptions = [];
      this.addForm.options.seriesOptions = [];
      //品牌名称选择获取
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId:
              this.addForm.clientId === "" ? undefined : this.addForm.clientId
          }
        })
        .then(response => {
          this.addForm.options.brandOptions = response.result;
        });
    },
    // 改变日期格式
    changeDate(date) {
      console.log(date);
      if (!date) {
        return undefined;
      } else {
        // var date = new Date(date);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
      }
    },

    // 选择框改变监控
    changeCheckBoxFun(val) {
      this.multipleSelection = val;
    },
    // 搜索按钮点击，进行搜索
    handleSearch(currentPageNum) {
      let startDate;
      let endDate;
      //首先判断日期，并修改格式
      if (this.dateRange == undefined) {
        startDate = undefined;
        endDate = undefined;
      } else {
        startDate = this.changeDate(this.dateRange[0]);
        endDate = this.changeDate(this.dateRange[1]);
      }
      request
        .get(`/info/style-group/find`, {
          params: {
            clientId: this.clientId === "" ? undefined : this.clientId,
            brandId: this.brandId === "" ? undefined : this.brandId,
            clothesLevelName:
              this.clothesLevelName === "" ? undefined : this.clothesLevelName,
            name: this.name === "" ? undefined : this.name,
            createAfter: startDate,
            createBefore: endDate,
            seriesName: this.seriesName === "" ? undefined : this.seriesName,
            pageNum: currentPageNum,
            pageSize: this.pagination.pageSize
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.pagination.currentPage = currentPageNum;
          this.pagination.total = response.total;
        });
    },

    // 添加款式组按钮点击，唤出弹出框，并清空弹出框数据
    addStyleGroup() {
      this.addForm.clientId = "";
      this.addForm.brandId = "";
      this.addForm.seriesId = "";
      this.addForm.name = "";
      this.addForm.options.brandOptions = {};
      this.addForm.options.seriesOptions = {};
      this.addPanelFlag = true;
    },

    // 删除款式组
    deleteStyleGroup() {
      const that = this;
      //首先判断勾选的条目是否大于0，大于0才进行删除
      if (that.multipleSelection.length === 0) {
        this.$message({
          message: "请选择要删除的款式组",
          type: "warning"
        });
      } else if (that.multipleSelection.length >= 1) {
        let flag = 0;
        //判断勾选的条目是否有权限删除，即创建者是否是操作者
        this.multipleSelection.forEach(element => {
          if (element.creatorId != this.meID) flag++;
        });
        if (flag === 0) {
          this.$confirm(
            "删除所选的" +
            that.multipleSelection.length +
            "条款式组信息, 是否继续?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          ).then(() => {
            this.multipleSelection.forEach(element => {
              request
                .delete(`/info/style-group/delete`, {
                  params: { id: element.id }
                })
                .then(response => {
                  //删除之后重新获取信息
                  this.handleSearch(1);
                });
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

    // 解绑款式组
    unbindStyleGroup() {
      const that = this;
      //判断是否勾选了款式组
      if (that.multipleSelection.length === 0) {
        that.$message({
          message: "请选择要解绑的款式组",
          type: "warning"
        });
        //只有勾选款式组的数目为1的时候，才能够解绑款式组
      } else if (that.multipleSelection.length == 1) {
        var styleInfoStr = "";
        request
          .get(`/info/style-group-relation/find`, {
            params: { styleGroupId: that.multipleSelection[0].id }  //传入款式组ID
          })
          .then(response => {
            response.result.forEach(element => {
              styleInfoStr += element + " ";       //获取的是该款式组绑定的款式，并显示
            });
            if (styleInfoStr == "") {   //如果为空，说明款式组未绑定任何款式
              that.$message.error("该款式组未绑定款式！");
            } else {
              that
                .$confirm("包含款式: " + styleInfoStr + " 是否继续?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                .then(() => {   //点击确认后，开始解绑
                  that.multipleSelection.forEach(element => {
                    request
                      .delete(`/info/style-group-relation/unbind`, {
                        params: { id: element.id }
                      })
                      .then(response => {
                        this.handleSearch(this.pagination.currentPage);  //解绑成功，重新获取当前页面的信息
                      });
                  });
                })
                .catch(() => {
                  that.$message({
                    type: "info",
                    message: "已取消解绑"
                  });
                });
            }
          })
          .catch(error => {
            this.$message.error("获取款式失败:请检查网络");
          });
      }
    },
    // 表格中的修改按钮点击，传入点击行的数据并获取品牌、系列下拉框数据
    updateStyleGroup(row) {
      this.updateForm.id = row.id;
      this.updateForm.clientId = row.clientId;
      this.updateForm.brandId = row.brandId;
      this.updateForm.seriesId = row.seriesId;
      this.updateForm.name = row.name;
      this.updatePanelFlag = true;
      //获取品牌名称
      request
        .get(`/backstage/brand/name`, {
          params: { clientId: row.clientId }
        })
        .then(response => {
          this.updateForm.options.brandOptions = response.result;
        });

      //获取能选择的系列
      request
        .get(`/info/series/name`, {
          params: { brandId: row.brandId }
        })
        .then(response => {
          this.updateForm.options.seriesOptions = response.result;
        });
    },
    // 表格中的删除按钮点击
    daleteStyleGroup(row) {
      const that = this;
      this.$confirm("是否确认删除该款式组？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request
            .delete(`/info/style-group/delete`, {
              params: { id: row.id }
            })
            .then(response => {
              this.handleSearch(this.pagination.currentPage);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 提交款式组修改的请求
    updateSubmit(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .put(`/info/style-group/update`, {
              name: this.updateForm.name,
              seriesId: this.updateForm.seriesId,
              id: this.updateForm.id
            })
            .then(response => {
              this.handleSearch(this.pagination.currentPage);
              this.updatePanelFlag = false;
            });
        } else {
          this.$message({
            message: "请填写必须填写的项！",
            type: "error"
          });
        }
      });
    },
    // 提交款式组添加的请求
    addSubmit(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          request
            .post(`/info/style-group/insert`, {
              name: this.addForm.name,
              seriesId: this.addForm.seriesId
            })
            .then(response => {
              this.handleSearch(1);
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
    // 添加款式组取消按钮点击，清空所有数据
    addCancel() {
      this.addForm.clientId = "";
      this.addForm.brandId = "";
      this.addForm.seriesId = "";
      this.addForm.name = "";
      this.addForm.options.brandOptions = {};
      this.addForm.options.seriesOptions = {};
      this.addPanelFlag = false;
    },
    // 修改款式组取消按钮点击，清空所有数据
    updateCancel() {
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