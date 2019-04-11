<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">客户名称：</span>
            <el-select v-model="customerSelectValue" placeholder="请选择">
              <el-option
                v-for="item in customerOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="5">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">品牌：</span>
            <el-select v-model="brandSelectionValue" placeholder="请选择">
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>

        

        <el-col :span="9">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">添加时间：</span>
            <el-date-picker
              v-model="addTimeValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="5">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">服装类型：</span>
            <el-select v-model="clothTypeSelectionValue" placeholder="请选择">
              <el-option
                v-for="item in clothTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
      </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">模板名称：</span>
            <el-input class="inputinline" v-model="modelNameValue" placeholder="请输入内容"></el-input>
          </div>
        </el-col>

        <el-col :span="5">
          <div class="grid-content bg-purple inputCombineDiv">
            <span class="inputTag">模板类型：</span>
            <el-select v-model="modelTypeSelectionValue" placeholder="请选择">
              <el-option
                v-for="item in modelTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card">
      <el-container>
        <el-header>
          <el-row :gutter="40">
            <el-col :span="2">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="handleSetUniverseClick">设为通用</el-button>
              </div>
            </el-col>

            <el-col :span="2">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="handleSetPrivateClick">设为私有</el-button>
              </div>
            </el-col>

            <el-col :span="11">
              <div class="grid-content bg-purple">
                
              </div>
            </el-col>

            <!-- <el-col :span="2">
              <div class="grid-content bg-purple">
                <el-button type="primary">新建模板</el-button>
              </div>
            </el-col> -->
          </el-row>
        </el-header>

        <el-main>
          <div>
            <el-table
              ref="multipleTable"
              :data="modelDisplayData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                label="序号"
                width="50">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
              </el-table-column>
              <el-table-column
                prop="modelCode"
                label="模板编号"
                width="120">
              </el-table-column>
              <el-table-column
                prop="modelName"
                label="模板名称"
                width="120"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="customerName"
                label="客户名称"
                width="120"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="brand"
                label="品牌"
                width="120" 
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="addPerson"
                label="添加人"
                width="120"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="isUniverse"
                label="是否通用"
                width="120"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="addTime"
                label="添加时间"
                width="120"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                label="操作"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button type="text" size="small">查看</el-button>
                  <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" @click="handleDeleteModelClick(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            
            <div style="margin-top: 20px">
              <el-button type="info" @click="toggleSelection()">取消选择</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>


<style lang="less" scoped>
  .box-card {
    min-width: 1500px;
    margin: 20px 50px;
    padding: 0 20px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    .el-col {
      border-radius: 4px;
      .inputCombineDiv{
        display: flex;
        flex-direction: row;
        .inputTag{
          min-width: 80px;
          font-size: 14px;
          line-height: 40px;
          text-align:center;
        }
        .inputinline{
          width:220px;
        }
      }
    }
  }
  
  .bg-purple {
    // background: #d3dce6;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>

<script>
  export default {
    data() {
      return {
        modelDisplayData: [
          {
            modelCode: '45245',
            modelName: '模板1',
            customerName: '客户1',
            brand:'品牌1',
            addPerson:'小明',
            isUniverse:'是',
            addTime:'2016-11-01'
          },
          {
            modelCode: '45245',
            modelName: '模板2',
            customerName: '客户2',
            brand:'品牌2',
            addPerson:'小虎',
            isUniverse:'否',
            addTime:'2018-2-3'
          },
        ],
        customerOptions:[
          {
            label:'客户1',
            value:'客户1'
          },
          {
            label:'客户2',
            value:'客户2'
          }
        ],
        brandOptions:[
          {
            label:'品牌1',
            value:'品牌1'
          },
          {
            label:'品牌2',
            value:'品牌2'
          }
        ],
        clothTypeOptions:[
          {
            label:'服装类型1',
            value:'服装类型1'
          },
          {
            label:'服装类型2',
            value:'服装类型2'
          }
        ],
        modelTypeOptions:[
          {
            label:'模板类型1',
            value:'模板类型1'
          },
          {
            label:'模板类型2',
            value:'模板类型2'
          }
        ],
        clothTypeSelectionValue:'',
        modelTypeSelectionValue:'',
        brandSelectionValue:'',
        customerSelectValue:'',
        addTimeValue:'',
        modelNameValue:'',

        multipleSelection: [],
      }
    },

    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSetUniverseClick(){
        if(this.multipleSelection.length === 0){
          this.$message({
          message: '请选择一个模板!',
          type: 'warning'
          });
          return;
        }
        this.$confirm("是否确认将所选模板设为通用?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{
          this.$message({
          message: '成功设置!',
          type: 'success'
          });
        }).
        catch(()=>{
          this.$message({
          message: '取消设置!',
          type: 'info'
          });
        });
        // console.log(confirm("是否确认将所选模板设为通用?"));
      },
      handleSetPrivateClick(){
        if(this.multipleSelection.length === 0){
          this.$message({
          message: '请选择一个模板!',
          type: 'warning'
          });
          return;
        }
        if(this.multipleSelection.length === 0){
          this.$message({
          message: '请选择一个模板!',
          type: 'warning'
          });
          return;
        }
        this.$confirm("是否确认将所选模板设为私有?", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(()=>{
          this.$message({
          message: '成功设置!',
          type: 'success'
          });
        }).
        catch(()=>{
          this.$message({
          message: '取消设置!',
          type: 'info'
          });
        });
        // console.log(confirm("是否确认将所选模板设为私有?"));
      },
      handleDeleteModelClick(row){
        const that = this;
        // console.log("点击了本行的删除");
        // console.log("当前row=", row);
        var thisIndex = row.modelCode;
        this.$confirm("是否确认删除该系列？", "提示", {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          // console.log();
          for(var j = 0; j < this.modelDisplayData.length; j++){
            var delResult = this.modelDisplayData[j];
            console.log(delResult);
            if (delResult["modelCode"] === thisIndex){
              console.log(delResult);
              this.modelDisplayData.splice(j,1);
            }
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }
</script>