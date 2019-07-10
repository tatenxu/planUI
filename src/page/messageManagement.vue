<template>
  <div class="body">
    <el-tabs v-model="viewname" >
      <el-tab-pane label="消息管理" name="first">
        <el-card class="box-card">
          <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 5px;">
            <el-col  :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px" >全选</el-button>
              </div>
            </el-col>
            <el-col  :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px" @click="sendMessageClick">发送消息</el-button>
              </div>
            </el-col>
            <el-col  :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px" @click="markRead">标记已读</el-button>
              </div>
            </el-col>
            <el-col :span="4">
              <el-switch
                v-model="isRcvMsg"
                active-text="已接收"
                inactive-text="已发送"
                inactive-color="#13ce66"
                style="margin-top:10px"
                @change="switchSendReceiveState">
              </el-switch>
            </el-col>

            <el-col :offset="1" :span="5">
              <div class="bar pur">
                <el-date-picker
                  v-model="searchDate"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
              </div>
            </el-col>

            <el-col  :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px" @click="handleSearch">查询</el-button>
              </div>
            </el-col>
          </el-row>

        </el-card>

        <el-card class="box-card">
          <div>
            <el-table :data="tableData" @selection-change="tableSelectionChange" max-height="550"  style="width : 100%">
            <el-table-column type="selection" width="50" align="center"></el-table-column>
            <el-table-column prop="id" v-if="false"></el-table-column>
            <el-table-column prop="stateStr" label="是否已读" align="center"></el-table-column>
            <el-table-column prop="messageDetails" label="消息内容" align="center"></el-table-column>
            <el-table-column v-if="isRcvMsg" prop="senderName" label="发送人" align="center"></el-table-column>
            <el-table-column v-if="!isRcvMsg" prop="receiverName" label="接收人" align="center"></el-table-column>
            <el-table-column prop="createTime" label="发送时间" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
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
                <el-select v-model="rcvUser" clearable >
                  <el-option
                    v-for="item in sendTargetOption"
                    :key="item.id"
                    :label="item.realName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin-top:5px; ">
            <el-col :gutter="20" style="margin-top:10px; ">
              <div class="bar">
                <div class="title">消息内容</div>
                <el-input type="textarea"
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="msgContent"></el-input>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :offset="9" :span="2" style="margin-top:20px; ">
              <div class="bar">
                <el-button type="primary" style="margin-right: 20px" @click="sendConfirm">发送</el-button>
              </div>
            </el-col>
            <el-col :offset="0" :span="2" style="margin-top:20px; ">
              <div class="bar">
                <el-button type="primary" style="margin-right: 20px" @click="sendCancel">取消</el-button>
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
import { error, isRegExp } from 'util';
import consoleSidebarVue from '../components/layout/consoleSidebar.vue';
export default {
  name: "warehouseList",
  data() {
    return {
      isRcvMsg : true,
      msgContent:"",
      tableSelectionData:[],
      viewname:'first',
      sendShowFlag:false,
      checkedCities: [],
      rcvUser: '',
      searchDate:'',
      sendTargetOption: [{
        id: 1,
        realName: "人员A"
      },{
        value: 4,
        realName: "系列D"
      }],
      
      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      tableData: [],
      // checked: true,
      pages: 0,
    }
  },
  created(){
    this.handleSearch();
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log("每页+" + this.pagination.pageSize);
      this.handleSearch();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.handleSearch();
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
        return y + "-" + m + "-" + d;
      }
    },
    handleSearch(){
      let that=this;
      if(that.isRcvMsg){
        that.$axios
          .post(`${window.$config.HOST}/baseInfoManagement/getReceiveMessageResponse`,{
            startDate:that.changeDate(that.searchDate ? that.searchDate[0]:null),
            endDate:that.changeDate(that.searchDate ? that.searchDate[1]:null),
          })
          .then(response=>{
            that.tableData = response.data;

            //时间排序
            that.tableData.sort(function(a, b) {
              return Date.parse(b.createTime) - Date.parse(a.createTime);
            });

            //分页
            that.pagination.total = response.data.length;
            let i =
              (that.pagination.currentPage - 1) * that.pagination.pageSize;
            let k =
              (that.pagination.currentPage - 1) * that.pagination.pageSize;
            that.tableDataShow = [];
            for (
              ;
              i - k < that.pagination.pageSize && i < that.tableData.length;
              i++
            ) {
              that.tableDataShow.push(that.tableData[i]);
            }
          })
          .catch(error=>{
            console.log("获取消息失败:请检查网络!");
            that.tableData = [
              {
                id:1,
                stateStr:"未读",
                messageDetails:"CX2001系列计划已制定，请及时关注并完善款式计划",
                state:3,
                senderName:"XX",
                createTime:"2019-3-28",
              }
            ];
          });
      } else {
        that.$axios
          .post(`${window.$config.HOST}/baseInfoManagement/getSendMessageResponse `,{
            startDate:that.changeDate(that.searchDate ? that.searchDate[0]:null),
            endDate:that.changeDate(that.searchDate ? that.searchDate[1]:null),
          })
          .then(response=>{
            that.tableData = response.data;

            //时间排序
            that.tableData.sort(function(a, b) {
              return Date.parse(b.createTime) - Date.parse(a.createTime);
            });

            //分页
            that.pagination.total = response.data.length;
            let i =
              (that.pagination.currentPage - 1) * that.pagination.pageSize;
            let k =
              (that.pagination.currentPage - 1) * that.pagination.pageSize;
            that.tableDataShow = [];
            for (
              ;
              i - k < that.pagination.pageSize && i < that.tableData.length;
              i++
            ) {
              that.tableDataShow.push(that.tableData[i]);
            }
          })
          .catch(error=>{
            console.log("获取消息失败:请检查网络!");
            that.tableData = [
              {
                id:1,
                stateStr:"未读",
                messageDetails:"CX2001系列计划已制定，请及时关注并完善款式计划",
                state:3,
                receiverName:"XasdfasfX",
                createTime:"2019-3-28",
              }
            ];
          });
      }
    },
    switchSendReceiveState(){
      let that=this;
      that.tableData = [];
      that.handleSearch();
    },
    markRead() {
      let that = this;
      if(that.tableSelectionData.length === 0){
        that.$message({
          message:"请选择未读的消息!",
          type:"warning"
        });
      } else {
        var flag = 1;
        that.tableSelectionData.forEach(ele=>{
          if(ele.stateStr === "未读"){
            that.$message({
              message:"不能选择已读信息,请重新选择!",
              type:"warning"
            });
            flag = 0;
          }
        });
        if(flag===1){
          that.tableSelectionData.forEach(ele=>{
            that.$axios
            .get(`${window.$config.HOST}/baseInfoManagement/updateMessageStateRead `, {
              params:{id:ele.id}
            })
            .then(response=>{
              if(response.data<0){
                console.log("标记失败:"+that.planManagementErrorCode[-response.data - 1].errotInfo);
                that.$message({
                  message:"标记失败:"+that.planManagementErrorCode[-response.data - 1].errotInfom,
                  type:"error"
                });
              } else {
                that.$message({
                  message:"标记成功",
                  type:"success"
                });
              }
            })
            .catch(error=>{
              that.$message({
                  message:"标记失败:请检查网络",
                  type:"error"
                });
            });
          });
        }
      }
    },
    sendMessageClick() {
      let that=this;
      that.$axios
        .get(`${window.$config.HOST}/getAllUserName`)
        .then(response => {
          that.sendTargetOption = response.data;
        })
        .catch(error=>{
          console.log("发送对象获取错误!")
        })

      this.viewname = "second";
      this.sendShowFlag = true;
    },
    tableSelectionChange(val) {
      this.tableSelectionData = val;
    },
    sendConfirm() {
      let that = this;
      if(that.rcvUser === "" || that.msgContent===""){
        that.$message({
          type:'warning',
          message:"请选择接收人,并填写消息内容!"
        });
      } else {
        that.$axios
          .post(`${window.$config.HOST}/baseInfoManagement/addMessage`, {
            receiverId:that.rcvUser,
            messageDetails:that.msgContent,
          })
          .then(response=>{
            if(response.data < 0){
              console.log("发送失败:"+that.planManagementErrorCode[-response.data - 1].errotInfo);
              that.$message({
                message:"发送失败:"+that.planManagementErrorCode[-response.data - 1].errotInfom,
                type:"error"
              });
            }else{
              this.viewname = "first";
              this.sendShowFlag = false;
              that.$message({
                message:"发送成功",
                type:"success"
              });
            }
          })
          .catch(error=>{
            that.$message({
                message:"发送失败:请检查网络!",
                type:"error"
              });
            console.log("发送失败:请检查网络!");
          })
      }
    },
    sendCancel(){
      this.viewname = "first";
      this.sendShowFlag = false;
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