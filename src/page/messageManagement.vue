<template>
  <div class="body">
    <el-tabs v-model="viewname">
      <el-tab-pane label="消息管理" name="first">
        <el-card class="box-card">
          <el-row :gutter="20" style="margin-top: 10px; margin-bottom: 5px;">
            <el-col :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px">全选</el-button>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px" @click="sendMessageClick">发送消息</el-button>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px" @click="markRead">标记已读</el-button>
              </div>
            </el-col>
            <el-col :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px" @click="deleteMessage">删除消息</el-button>
              </div>
            </el-col>
            <el-col :span="4">
              <el-switch
                v-model="isRcvMsg"
                active-text="已接收"
                inactive-text="已发送"
                inactive-color="#13ce66"
                style="margin-top:10px"
                @change="switchSendReceiveState"
              ></el-switch>
            </el-col>

            <!-- <el-col :offset="1" :span="5">
              <div class="bar pur">
                <el-date-picker
                  v-model="searchDate"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']"
                ></el-date-picker>
              </div>
            </el-col>-->

            <!-- <el-col :span="2">
              <div class="bar pur">
                <el-button type="primary" style="margin-right: 20px" @click="handleSearch">查询</el-button>
              </div>
            </el-col>-->
          </el-row>
        </el-card>

        <el-card class="box-card">
          <div>
            <el-table
              :data="tableData"
              @selection-change="tableSelectionChange"
              max-height="550"
              style="width : 100%"
              border
            >
              <el-table-column type="selection" width="50" align="center"></el-table-column>
              <el-table-column prop="id" v-if="false"></el-table-column>
              <el-table-column prop="observedStr" label="是否已读" align="center" width="50px"></el-table-column>
              <el-table-column prop="content" label="消息内容" align="center"></el-table-column>
              <el-table-column
                v-if="isRcvMsg"
                prop="senderName"
                label="发送人"
                align="center"
                width="100px"
              ></el-table-column>
              <el-table-column
                v-if="!isRcvMsg"
                prop="receiverName"
                label="接收人"
                align="center"
                width="100px"
              ></el-table-column>
              <!-- <el-table-column prop="createTime" label="发送时间" align="center"></el-table-column> -->
              <!-- <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-table-column>-->
            </el-table>
          </div>
          <!-- <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="pagination.currentPage"
              :page-sizes="pagination.pageSizes"
              :page-size="pagination.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total"
            ></el-pagination>
          </div>-->
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="发送消息" name="second" v-if="sendShowFlag">
        <el-card class="box-card">
          <el-row :gutter="20" style="margin-top:5px; ">
            <el-col :span="6">
              <div class="bar">
                <div class="title">接收人员</div>
                <el-select v-model="rcvUser" clearable>
                  <el-option
                    v-for="item in sendTargetOption"
                    :key="item.id"
                    :label="item.name"
                    :value="[item.id,item.name]"
                  ></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin-top:5px; ">
            <el-col :gutter="20" style="margin-top:10px; ">
              <div class="bar">
                <div class="title">消息内容</div>
                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="msgContent"></el-input>
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
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
    </el-tabs>
  </div>
</template>


<script>
import { error, isRegExp } from "util";
import request from "@/utils/request";
import consoleSidebarVue from "../components/layout/consoleSidebar.vue";
export default {
  name: "warehouseList",
  data() {
    return {
      selfId: "",
      selfName: "",
      isRcvMsg: true,
      msgContent: "",
      tableSelectionData: [],
      viewname: "first",
      sendShowFlag: false,
      checkedCities: [],
      rcvUser: [],
      searchDate: "",
      sendTargetOption: [],

      pagination: {
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50],
        pageSize: 10,
        total: 0
      },
      tableData: [],
      // checked: true,
      pages: 0
    };
  },
  created() {
    //获取自己身份
    request.get(`/me`).then(response => {
      console.log(response);
      this.selfId = response.result.id;
      this.selfName = response.result.name;
      //获取自己的消息列表
      request
        .get(`/message/find`, {
          params: {
            receiverId: this.selfId
          }
        })
        .then(response => {
          this.tableData = response.result;
          this.tableData.forEach(element => {
            element.observedStr = element.observed ? "已读" : "未读";
          });
          this.pagination.total = response.total;
        });
    });
  },
  methods: {
    handleSizeChange(val) {
      this.pagination.pageSize = val;
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
    handleSearch() {
      let that = this;
      let list = {};
      if (that.isRcvMsg) {
        list = {
          receiverId: this.selfId
        };
      } else {
        list = {
          senderId: this.selfId
        };
      }
      request
        .get(`/message/find`, {
          params: list
        })
        .then(response => {
          this.tableData = response.result;
          this.tableData.forEach(element => {
            element.observedStr = element.observed ? "已读" : "未读";
          });
          this.pagination.total = response.total;
        });
    },
    switchSendReceiveState() {
      let that = this;
      that.tableData = [];
      that.handleSearch();
    },
    deleteMessage() {
      let that = this;
      if (that.tableSelectionData.length === 0) {
        that.$message({
          message: "请选择想要删除的消息!",
          type: "warning"
        });
      } else {
        that.tableSelectionData.forEach(element => {
          request
            .delete(`/message/delete`, {
              params: {
                receiveDelete: this.isRcvMsg,
                sendDelete: !this.isRcvMsg,
                id: element.id
              }
            })
            .then(response => {
              this.handleSearch();
            });
        });
      }
    },
    markRead() {
      let that = this;
      if (that.tableSelectionData.length === 0) {
        that.$message({
          message: "请选择未读的消息!",
          type: "warning"
        });
      } else {
        var flag = 1;
        that.tableSelectionData.forEach(ele => {
          if (ele.observedStr === "已读") {
            that.$message({
              message: "不能选择已读信息,请重新选择!",
              type: "warning"
            });
            flag = 0;
          }
        });
        if (flag === 1) {
          let idList = [];
          that.tableSelectionData.forEach(element => {
            idList.push(element.id);
          });
          request.put(`/message/read`, idList).then(response => {
            this.handleSearch();
          });
        }
      }
    },
    sendMessageClick() {
      let that = this;

      that.$axios
        .get(`http://192.168.1.111:8081/user/find`, {
          params: {
            pageNum: 1,
            pageSize: 100
          }
        })
        .then(response => {
          this.sendTargetOption = response.data.result;
        });

      this.viewname = "second";
      this.sendShowFlag = true;
    },
    tableSelectionChange(val) {
      this.tableSelectionData = val;
    },
    sendConfirm() {
      let that = this;
      if (that.rcvUser === [] || that.msgContent === "") {
        that.$message({
          type: "warning",
          message: "请选择接收人,并填写消息内容!"
        });
      } else {
        var param = {
          receiverId: that.rcvUser[0],
          receiverName: that.rcvUser[1],
          content: that.msgContent,
          senderName: this.selfName,
          senderId: this.selfId
        };
        request.post(`/message/insert`, param).then(response => {
          this.viewname = "first";
          this.sendShowFlag = false;
          this.handleSearch();
        });
      }
    },
    sendCancel() {
      this.viewname = "first";
      this.sendShowFlag = false;
    }
  }
};
</script>

<style lang="less" scoped>
.body {
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

  .block {
    padding: 30px 0;
    text-align: center;
    //border-right: solid 1px #EFF2F6;
    //display: inline-block;
    //box-sizing: border-box;
  }
}
</style>