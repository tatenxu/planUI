<template>
  <div class="body">
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="bar">
            <div class="title">客户名称</div>
            <el-input
              v-if="flag===2"
              v-model="client"
              clearable
              :disabled="true"
              :rows="1"
              placeholder
            ></el-input>
            <el-select v-model="client" clearable v-else>
              <el-option
                v-for="item in clientNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">品牌</div>
            <el-input
              v-if="flag===2"
              v-model="brand"
              clearable
              :disabled="true"
              :rows="1"
              placeholder
            ></el-input>
            <el-select v-else v-model="brand" clearable>
              <el-option
                v-for="item in brandNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="bar">
            <div class="title">模板名称</div>
            <el-input
              v-if="flag===2"
              v-model="modelName"
              clearable
              :disabled="true"
              :rows="1"
              placeholder
            ></el-input>
            <el-input v-else v-model="modelName" clearable :rows="1" placeholder></el-input>
          </div>
        </el-col>
        <!-- <el-col :span="2">
          <div class="bar">
            <el-button type="primary">搜索</el-button>
          </div>
        </el-col>-->
      </el-row>
    </el-card>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="bar">
            <el-button type="primary" @click="addNode" v-if="flag!=2">添加一个结点</el-button>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="bar">
            <el-button type="primary" @click="addTemplate" v-if="flag===1">保存</el-button>
          </div>
        </el-col>

        <el-col :span="3">
          <div class="bar">
            <el-button type="primary" @click="updateTemplate" v-if="flag===3">更新</el-button>
          </div>
        </el-col>

        <el-col :span="3">
          <div class="bar">
            <el-button type="primary" @click="goback" v-if="flag===2">返回</el-button>
          </div>
        </el-col>

        <el-col :span="8">
          <div class="bar">
            <div class="title" style="font-size:14px;color:red">注意：只能保留一个根节点,否则会保存失败！</div>
          </div>
        </el-col>
      </el-row>

      <br />

      <br />
      <el-tree
        :data="data"
        node-key="id"
        :props="defaultProps"
        default-expand-all
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        @node-click="handleCheck"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag"
        @click="() => append(data)"
      ></el-tree>

      <el-dialog :modal="false" title="添加结点" :visible.sync="dialogVisible" width="30%">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="bar">
              <div class="title">结点名称</div>
              <el-input
                v-model="nodeName"
                class="nameInput"
                placeholder="请输入结点名称"
                style="min-width:300px"
              ></el-input>
            </div>
          </el-col>
        </el-row>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addNode1">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>


<script>
import request from "@/utils/request";
export default {
  data() {
    return {
      nowClickName: "",
      gobackA: "",
      flag: 0,
      id: "",
      nodeName: "",
      dialogVisible: false,
      modelName: "",
      client: "",
      brand: "",
      brandNameOptions: [
        {
          id: 12,
          name: "324441"
        }
      ],
      clientNameOptions: [
        {
          id: 1,
          name: "321"
        }
      ],
      data: [],
      defaultProps: {
        children: "children",
        label: "planName"
      }
    };
  },

  mounted() {
    /*
     * 其他页面跳转到该页面的参数
     * params: {
     *     goback: source page name,
     *     isUpdate: boolean,
     *     isCreate: boolean,
     *     isDetail: boolean,
     *     data: row
     *   }
     */
    let data = this.$route.params;
    this.flag = data.flag;
    this.gobackA = data.goback;

    console.log("data", data);

    if (this.flag === 2) {
      //flag为1时候，添加！ flag为2的时候查看！flag为3的时候，更新
      (this.data = []), this.data.push(data.tree);
      console.log("this.data", this.data);

      (this.client = data.customerName),
        (this.brand = data.brandName),
        (this.modelName = data.name);
    } else if (this.flag === 3) {
      //flag为1时候，添加！ flag为2的时候查看！flag为3的时候，更新
      (this.data = []),
        (this.id = data.id),
        (this.client = data.customerName),
        (this.brand = data.brandName),
        (this.modelName = data.name),
        this.data.push(data.tree);
    }
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
        console.log("获得顾客信息成功了");
        this.clientNameOptions = response.data;
      })
      .catch(error => {
        this.$message({
          message: "获取顾客信息失败",
          type: "error"
        });
      });
  },
  methods: {
    handleCheck(data, node) {
      this.nowClickName = data.planName;
    },

    goback() {
      this.$router.push({
        name: this.gobackA,
        params: {}
      });
    },
    addTemplate() {
      if (this.data.length > 1) {
        this.$message({
          type: "error",
          message: "只能保留一个根节点，请重试!"
        });
        retrun;
      }
      let list = {
        name: this.modelName,
        customerName: this.client,
        brandName: this.brand,
        tree: this.data
      };
      console.log(list);
      this.$axios
        .post(`${window.$config.HOST}/planManagement/addPlanTemplate `, {
          name: this.modelName,
          customerName: this.client,
          brandName: this.brand,
          tree: this.data[0]
        })
        .then(response => {
          if (response.data > 0) {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.$router.push({
              name: this.gobackA,
              params: {}
            });
          } else if (response.data === -11) {
            this.$message({
              type: "error",
              message: "该模板与已有模板冲突!"
            });
          } else {
            this.$message({
              type: "error",
              message: "出现了未知的错误!"
            });
          }
        })
        .catch(error => {});
    },

    updateTemplate() {
      if (this.data.length > 1) {
        this.$message({
          type: "error",
          message: "只能保留一个根节点，请重试!"
        });
        retrun;
      }
      let list = {
        id: this.id,
        name: this.modelName,
        customerName: this.client,
        brandName: this.brand,
        tree: this.data
      };
      console.log(list);
      this.$axios
        .post(`${window.$config.HOST}/planManagement/updatePlanTemplate `, {
          id: this.id,
          name: this.modelName,
          customerName: this.client,
          brandName: this.brand,
          tree: this.data[0]
        })
        .then(response => {
          if (response.data > 0) {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.$router.push({
              name: this.gobackA,
              params: {}
            });
          } else if (response.data === -1) {
            this.$message({
              type: "error",
              message: "属性有缺失!"
            });
          } else {
            this.$message({
              type: "error",
              message: "出现了未知的错误!"
            });
          }
        })
        .catch(error => {});
    },
    saveTree() {
      console.log(this.data);
    },
    addNode() {
      (this.dialogVisible = true), (this.nodeName = "");
    },

    addNode1() {
      this.dialogVisible = false;
      if (this.data.length === 0) {
        this.data.push({
          planName: this.nodeName,
          children: []
        });
      } else {
        if (this.nowClickName === "") {
          this.$message({
            type: "error",
            message: "请选择一个节点再点击添加按钮！"
          });
        } else this.preTree(this.data[0], 0);
      }
    },

    preTree(T, flag) {
      console.log("1", T.planName);
      if (T.planName == this.nowClickName) {
        console.log("2");
        T.children.push({
          planName: this.nodeName,
          children: []
        });
        flag = 1;
        return flag;
      } else {
        T.children.forEach(child => {
          flag = this.preTree(child, flag);
        });
      }
    },

    handleDragStart(node, ev) {
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.id != 1;
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