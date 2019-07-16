<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-select v-model="customer" clearable style="min-width:260px">
              <el-option
                v-for="item in customerNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">品牌</div>
            <el-select v-model="brand" clearable style="min-width:260px">
              <el-option
                v-for="item in brandNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title">添加时间</div>
            <el-date-picker
              v-model="dateStart"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              style="min-width:260px"
            ></el-date-picker>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top:20px;margin-left:20px">
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <el-button type="primary" @click="searchModelList">搜索</el-button>
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

            <el-col :span="2">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="addTemplate">添加模板</el-button>
              </div>
            </el-col>

            <el-col :span="11">
              <div class="grid-content bg-purple"></div>
            </el-col>

            <!-- <el-col :span="2">
              <div class="grid-content bg-purple">
                <el-button type="primary">新建模板</el-button>
              </div>
            </el-col>-->
          </el-row>
        </el-header>

        <el-main>
          <div>
            <el-table
              ref="multipleTable"
              :data="modelDisplayData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="50">
                <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
              </el-table-column>
              <!-- <el-table-column prop="id" label="模板编号" width="120"></el-table-column> -->
              <el-table-column prop="name" label="模板名称" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="customerName" label="客户名称" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="brandName" label="品牌" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="createrName" label="添加人" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="publicName" label="是否通用" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="createTime" label="添加时间" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="ViewModel(scope.row)">查看</el-button>
                  <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button type="text" size="small" @click="handleDeleteModelClick(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
      </el-container>
    </el-card>
  </div>
</template>



<script>
export default {
  name:'planModelManagement',
  data() {
    return {
      customer: "",
      brand: "",
      clothingLevel: "",
      modelType: "",
      modelName: "",
      dateStart: "",
      modelDisplayData: [

      ],
      customerNameOptions: [
       
      ],
      brandNameOptions: [
      
      ],
     
     


      multipleSelection: []
    };
  },
  created: function() {
    var that = this;
    //获得品牌名字
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getBrandName `, {
        customerId: ""
      })
      .then(response => {
        console.log("获得品牌信息成功了");
        this.brandNameOptions = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取品牌信息失败",
          type: "error"
        });
      });

   

    //获得顾客名称
    that.$axios
      .get(`${window.$config.HOST}/baseInfoManagement/getCustomerName`)
      .then(response => {
        console.log(response.data);
        this.customerNameOptions = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取顾客信息失败",
          type: "error"
        });
      });
     



    this.$axios
      .get(`${window.$config.HOST}/planManagement/getPlanTemplate`)
      .then(response => {
        this.modelDisplayData = response.data;
        this.modelDisplayData.forEach(element=>{
          if(element.public) element.publicName="是"
          else element.publicName="否"
        })
      })
      .catch(error => {
        this.$message({
          message: "搜索失败！",
          type: "error"
        });
      });
  },
  // computed:{
  //   keepAlives:{
  //     get(){
  //       return this.$store.getters['baseinfo/keepAliveOptions'];
  //     },
  //     set(value){
  //       return this.$store.commit('baseinfo/keepalive-opt-arr', value);
  //     }
  //   }
  // },
  // beforeRouteLeave(to, from, next) {
  //   if (to.name === 'bePlanModelEdit') {
  //     this.keepAlives = ['planModelManagement',];
  //   } else {
  //     this.keepAlives = [];
  //   }
  //   next();
  // },
  methods: {
    addTemplate() {
      this.$router.push({
        name: "bePlanModelEdit",
        params: {
          flag: 1,
          goback:'bePlanModelManagement',
        }
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
    searchModelList() {
      let list = {
        customerName: this.customer===""?undefined: this.customer,
        brandName: this.brand===""?undefined: this.brand,
        startDate: this.changeDate(this.dateStart?this.dateStart[0]:undefined),
        endDate: this.changeDate(this.dateStart?this.dateStart[1]:undefined)
      };

      this.$axios
        .get(`${window.$config.HOST}/planManagement/getPlanTemplate`, {
          params: list
        })
        .then(response => {
          this.modelDisplayData = response.data;
           this.modelDisplayData.forEach(element=>{
          if(element.public) element.publicName="是"
          else element.publicName="否"
        })
        })
        .catch(error => {
          this.$message({
            message: "搜索失败！",
            type: "error"
          });
        });

      console.log(list);
    },
    ViewModel(row) {
      console.log("model tree:", row);
      this.$router.push({
        name: "bePlanModelEdit",
        params: {
          flag: 2,
          id: row.id,
          name: row.name,
          customerName: row.customerName,
          brandName: row.brandName,
          tree: row.tree,
          goback:'bePlanModelManagement'
        }
      });
    },

    handleEdit(row) {
      console.log("model id:", row.id);
      this.$router.push({
        name: "bePlanModelEdit",
        params: {
          flag: 3,
          id: row.id,
          name: row.name,
          customerName: row.customerName,
          brandName: row.brandName,
          tree: row.tree,
          goback:'bePlanModelManagement'
        }
      });
    },
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
    handleSetUniverseClick() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择一个模板!",
          type: "warning"
        });
        return;
      }
      this.$confirm("是否确认将所选模板设为通用?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {

          
      //       this.multipleSelection.forEach(element=>{
      //   if(element.public === true)
      //   {
      //       this.$message({
      //     message: "请选择私有模板设置为通用!",
      //     type: "warning"
      //   });
      //           return ;
      //   }
      // })
          this.multipleSelection.forEach(element => {
            this.$axios
              .post(
                `${window.$config.HOST}/planManagement/changePlanTemplateState `,
                {
                  id: element.id,
                  public: true
                }
              )
              .then(response => {
                if (response.data > 0) {
                  this.searchModelList(),
                  this.$message({
                    message: "设置成功!",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "设置失败!",
                    type: "error"
                  });
                }
              })
              .catch(error => {
                this.$message({
                  message: "搜索失败！",
                  type: "error"
                });
              });
          });
        })
        .catch(() => {
          this.$message({
            message: "取消设置!",
            type: "info"
          });
        });
      // console.log(confirm("是否确认将所选模板设为通用?"));
    },
    handleSetPrivateClick() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择一个模板!",
          type: "warning"
        });
        return;
      }


      this.$confirm("是否确认将所选模板设为私有?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          
      // this.multipleSelection.forEach(element=>{
      //   if(element.public === false)
      //   {
      //       this.$message({
      //     message: "请选择通用模板设置为私有!",
      //     type: "warning"
      //   });
      //           return ; 
      //   }
      // })
          this.multipleSelection.forEach(element=>{
             this.$axios
            .post(
              `${window.$config.HOST}/planManagement/changePlanTemplateState `,
              {
                id: element.id,
                public: false
              }
            )
            .then(response => {
              if (response.data > 0) {
                this.searchModelList(),
                this.$message({
                  message: "设置成功!",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "设置失败!",
                  type: "error"
                });
              }
            })
            .catch(error => {
              this.$message({
                message: "搜索失败！",
                type: "error"
              });
            });
          })
          
        })
        .catch(() => {
          this.$message({
            message: "取消设置!",
            type: "info"
          });
        });
      // console.log(confirm("是否确认将所选模板设为私有?"));
    },
    handleDeleteModelClick(row) {
      const that = this;
      // console.log("点击了本行的删除");
      // console.log("当前row=", row);
      var thisIndex = row.modelCode;
      this.$confirm("是否确认删除该系列？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .delete(
              `${window.$config.HOST}/planManagement/deletePlanTemplate`,
              {
                params: {
                  id: row.id
                }
              }
            )
            .then(response => {
              if (response.data > 0) {
                this.searchModelList(),
                this.$message({
                  message: "删除成功！",
                  type: "success"
                });
              } else {
                this.$message({
                  message: "删除失败！",
                  type: "error"
                });
              }
            })
            .catch(error => {
              this.$message({
                message: "删除遇到未知错误！",
                type: "error"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>



<style lang="less" scoped>
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
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
      // margin: 5px 10px;
    }
    .el-select {
      width: 300px;
      min-width: 75px;
      // margin: 5px 10px;
    }
  }
  .block {
    padding: 30px 0;
    text-align: center;
    //border-right: solid 1px #EFF2F6;
    //display: inline-block;
    //box-sizing: border-box;
  }
}
</style>