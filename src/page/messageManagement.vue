<template>
  <div class="body">
    <el-tabs v-model="viewname" @tab-click="handleClick">
      <el-tab-pane label="消息管理" name="first">
        <el-card class="box-card">
          <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 5px;">
            <el-col  :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px" @click="getWareList">全选</el-button>
              </div>
            </el-col>
            <el-col  :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px" @click="sendMessage">发送消息</el-button>
              </div>
            </el-col>
            <el-col  :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px" @click="haveRead">标记已读</el-button>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px" @click="getWareList">查看已发送</el-button>
              </div>
            </el-col>

            <el-col :offset="1" :span="5">
              <div class="bar pur">
                <el-date-picker
                  v-model="input1"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
              </div>
            </el-col>

            <el-col  :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px" @click="getWareList">查询</el-button>
              </div>
            </el-col>
          </el-row>

        </el-card>

        <el-card class="box-card">
          <div>
            <el-table :data="tableData" @selection-change="read" max-height="550"  style="width : 100%">
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column prop="id" v-if="false"></el-table-column>
            <el-table-column prop="isRead" label="是否已读" align="center"></el-table-column>
            <el-table-column prop="messageContent" label="消息内容" align="center"></el-table-column>
            <el-table-column prop="plan" label="所属计划" align="center"></el-table-column>
            <el-table-column prop="seriesName" label="系列名称" align="center"></el-table-column>
            <el-table-column prop="sendPeople" label="发送人" align="center"></el-table-column>
            <el-table-column prop="sendTime" label="操作" align="center">
              <template slot-scope="scope">
                  <el-button type="text" size="small">详情</el-button>
                  <el-button type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
          </div>
          <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pagination.currentPage"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total">
          </el-pagination>
        </div>
        </el-card>
      </el-tab-pane>


      <el-tab-pane label="发送消息" name="second" v-if="sendShowFlag">
        <el-card class="box-card">
          <el-row :gutter="20" style="margin-top:5px; ">
            
            <el-col :span="6">
              <div class="bar">
                <div class="title">接收人员</div>
                <el-select v-model="select1" clearable @change="c1">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="bar">
                <div class="title">系列名称</div>
                <el-select v-model="select2" clearable @change="c1">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin-top:5px; ">
            <el-col :span="6">
              <div class="bar">
                <div class="title">款式名称</div>
                <el-select v-model="select3" clearable @change="c1">
                  <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="bar">
                <div class="title">所属计划</div>
                <el-select v-model="select4" clearable @change="c1">
                  <el-option
                    v-for="item in options4"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-col>

            <el-col :gutter="20" style="margin-top:10px; ">
              <div class="bar">
                <div class="title">消息内容</div>
                <el-input type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="textarea"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :offset="9" :span="2" style="margin-top:20px; ">
              <div class="bar">
                <el-button type="primary" style="margin-right: 20px" @click="send">发送</el-button>
              </div>
            </el-col>
            <el-col :offset="0" :span="2" style="margin-top:20px; ">
              <div class="bar">
                <el-button type="primary" style="margin-right: 20px" @click="send">取消</el-button>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>
      <!-- <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
    </el-tabs>
  </div>
</template>


<script>
const cityOptions = ['已制定', '未制定', '制定中'];
export default {
  name: "warehouseList",
  data() {
    return {
      selectedIndex:[],
      viewname:'first',
      sendShowFlag:false,
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      select1: '',
      select2: '',
      select3: '',
      select4:'',
      input1:'',
      input2:'',
      input3:'',
      options1: [{
        value: 1,
        label: "人员A"
      },{
        value: 2,
        label: "人员B"
      },{
        value: 3,
        label: "人员C"
      },{
        value: 4,
        label: "人员D"
      }],
      options2: [{
        value: 1,
        label: "系列A"
      },{
        value: 2,
        label: "系列B"
      },{
        value: 3,
        label: "系列C"
      },{
        value: 4,
        label: "系列D"
      }],
      options3: [{
        value: 1,
        label: "款式A"
      },{
        value: 2,
        label: "款式B"
      },{
        value: 3,
        label: "款式C"
      },{
        value: 4,
        label: "款式D"
      }],
      options4: [{
        value: 1,
        label: "计划A"
      },{
        value: 2,
        label: "计划B"
      },{
        value: 3,
        label: "计划C"
      },{
        value: 4,
        label: "计划D"
      }],
      pagination: {
          currentPage: 1,
          pageSizes: [5, 10, 20, 30, 50],
          pageSize: 5,
          total: 400,
        },
      tableData: [
        {
          id:1,
          isRead:"未读",
          messageContent:"CX2001系列计划已制定，请及时关注并完善款式计划",
          seriesName:"CX2001",
          projectType:"销样",
          sendPeople:"XX",
          sendTime:"2019-3-28",
          plan:"CX2001系列计划"
        }
      ],
      // checked: true,
      pages: 0,
    }
  },
  methods: {
    haveRead() {
      this.tableData.forEach(element => {
        if(this.selectedIndex.includes(element.id)) {
          element.isRead = "已读";
          alert("标记成功！");
        }
      })
    },
    sendMessage() {
      this.viewname = "second";
      this.sendShowFlag = true;
    },
    read(val) {
      val.forEach(element => {
        this.selectedIndex.push(element.id);
      })
    },
    send() {
      this.viewname = "first";
      this.sendShowFlag = false;
    },
    handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
    handleDelete(index, row) {
      this.$confirm('这将删除该仓库下所有记录信息，是否继续？','提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let sendData = {"id": row.id};
        this.$axios
          .post(`${window.$config.HOST}/warehouse/base/deleteWarehouse`, sendData)
          .then(response => {
            if (response.data > 0) {
              this.$message({
              type: 'success',
              message: '删除成功'
              });
              this.tableData.splice(index, 1);
            } else {
              this.$message({
                type: 'info',
                message: '未在数据库中查到此记录对应信息！'
              })
            }
          })
          .catch(error => {
            console.log(error);
            this.$message({
              type: 'info',
              message: '非法操作！'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        });
      });
    },
  },
  
}
</script>

<style lang="less" scoped>
.body{
  min-width: 1500px;
  margin: 20px 50px;
}
.box-card {
  margin-left: 0px;
  margin: 20px 10px;
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
  .pur{
    // background: grey;
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