<template>
 <!-- 本页面经讨论不再使用，无需查看 -->
  <div class="body">
    <el-card class="box-card">
      <el-form
        :model="ruleForm"
        :rules="Rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20">
          <el-col :span="3" v-if="!isDetail">
            <div class="bar">
              <el-button type="primary" @click="addOneNode">添加一个结点</el-button>
            </div>
          </el-col>
          <el-col :span="3" v-if="isCreate">
            <div class="bar">
              <el-button type="primary" @click="saveTemplate('ruleForm')">保存</el-button>
            </div>
          </el-col>

          <el-col :span="3" v-if="isUpdate">
            <div class="bar">
              <el-button type="primary" @click="updateTemplate('ruleForm')">更新</el-button>
            </div>
          </el-col>

          <el-col :span="3">
            <div class="bar">
              <el-button type="primary" @click="gobackPage">返回</el-button>
            </div>
          </el-col>

          <el-col :span="8" v-if="!isDetail">
            <div class="bar">
              <div class="title" style="font-size:14px;color:red">注意：只能保留一个根节点,否则会保存失败！</div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:30px">
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="客户名称" prop="clientId" placeholder="请选择客户名称">
                <el-select
                  v-model="ruleForm.clientId"
                  clearable
                  :disabled="isDetail"
                  @change="clientChanged"
                >
                  <el-option
                    v-for="item in options.clientOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="bar">
              <el-form-item label="品牌名称" prop="brandId" placeholder="请选择品牌名称">
                <el-select v-model="ruleForm.brandId" clearable :disabled="isDetail">
                  <el-option
                    v-for="item in options.brandOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="bar">
              <el-form-item label="模板名称" prop="name" placeholder="请输入模板名称">
                <el-input
                  :disabled="isDetail"
                  v-model="ruleForm.name"
                  clearable
                  :rows="1"
                  placeholder
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
        <br />
        <br />
      </el-form>

      <br />

      <br />
      <el-tree
        :data="data"
        node-key="id"
        :props="defaultProps"
        :highlight-current="true"
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

      <el-dialog :modal="false" title="添加结点" :visible.sync="addNodeFlag" width="30%">
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
          <el-button type="primary" @click="addNodeFlag = false">取 消</el-button>
          <el-button type="primary" @click="addNode">确 定</el-button>
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
      //页面标识
      isUpdate: false,
      isCreate: false,
      isDetail: false,
      goback: "",

      //属性参数
      ruleForm: {
        id: "",
        clientId: "",
        brandId: "",
        name: ""
      },

      Rules: {
        clientId: [
          { required: true, message: "请选择客户名称", trigger: "change" }
        ],
        brandId: [
          { required: true, message: "请选择品牌名称", trigger: "change" }
        ],
        name: [{ required: true, message: "请填写模板名称", trigger: "blur" }]
      },

      options: {
        clientOptions: {},
        brandOptions: {}
      },

      //添加节点弹窗
      addNodeFlag: false,
      nowClickName: "", //用于新增节点的时候作为父节点标记
      data: [], //树数据
      nodeName: "",
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
    console.log("data:", data);
    this.isUpdate = data.isUpdate;
    this.isCreate = data.isCreate;
    this.isDetail = data.isDetail;
    this.goback = data.goback;

    if (this.isUpdate || this.isDetail) {
      this.ruleForm.id = data.data.id;
      this.ruleForm.clientId = parseInt(data.data.clientId);
      this.ruleForm.brandId = parseInt(data.data.brandId);
      this.ruleForm.name = data.data.name;
      this.data.push(data.data.templateTree);
    }
  },

  created: function() {
    var that = this;
    //获得品牌名字
    request.get(`/backstage/brand/name`).then(response => {
      this.options.brandOptions = response.result;
    });
    //获得客户名称
    request.get(`/backstage/client/name`).then(response => {
      this.options.clientOptions = response.result;
    });
  },
  methods: {
    clientChanged() {
      request
        .get(`/backstage/brand/name`, {
          params: {
            clientId:
              this.ruleForm.clientId === "" ? undefined : this.ruleForm.clientId
          }
        })
        .then(response => {
          this.options.brandOptions = response.result;
          this.ruleForm.brandId = 1;
          this.ruleForm.brandId = "";
        });
    },
    handleCheck(data, node) {
      this.nowClickName = data.planName;
    },
    gobackPage() {
      this.$router.push({
        name: this.goback,
        params: {}
      });
    },
    //添加模板
    saveTemplate(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.data.length > 1) {
            this.$message({
              type: "error",
              message: "只能保留一个根节点，请重试!"
            });
            return;
          } else if (this.data.length === 0) {
            this.$message({
              type: "error",
              message: "请至少设置一个节点！"
            });
            return;
          } else {
            request
              .post(`/plan-template/insert`, {
                name: this.ruleForm.name,
                clientId: this.ruleForm.clientId,
                brandId: this.ruleForm.brandId,
                templateTree: this.data[0]
              })
              .then(response => {
                this.gobackPage();
              });
          }
        } else {
          this.$message({
            message: "请填写所有必填项!",
            type: "error"
          });
        }
      });
    },

    //修改模板
    updateTemplate(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.data.length > 1) {
            this.$message({
              type: "error",
              message: "只能保留一个根节点，请重试!"
            });
            return;
          } else if (this.data.length === 0) {
            this.$message({
              type: "error",
              message: "请至少设置一个节点！"
            });
            return;
          } else {
            request
              .put(`/plan-template/update`, {
                id: this.ruleForm.id,
                name: this.ruleForm.name,
                clientId: this.ruleForm.clientId,
                brandId: this.ruleForm.brandId,
                templateTree: this.data[0]
              })
              .then(response => {
                this.gobackPage();
              });
          }
        } else {
          this.$message({
            message: "请填写所有必填项!",
            type: "error"
          });
        }
      });
    },
    //添加节点唤出弹窗
    addOneNode() {
      this.addNodeFlag = true;
      this.nodeName = "";
    },
    //添加节点
    addNode() {
      this.addNodeFlag = false;
      if (this.data.length === 0) {
         if(this.nodeName === "")
        {
          this.$message({
            type: "error",
            message: "必须输入节点名称"
          });
          return ;
        }
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

    //遍历树
    preTree(T, flag) {
      if (flag === 1) {
        return flag;
      }
      if (T.planName == this.nowClickName) {
        if(this.nodeName === "")
        {
          this.$message({
            type: "error",
            message: "必须输入节点名称"
          });
          return ;
        }
        T.children.push({
          planName: this.nodeName,
          children: []
        });
        return 1;
      } else {
        T.children.forEach(child => {
          flag = this.preTree(child);
          if (flag === 1) return flag;
        });
      }
      return flag;
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
  min-width: 1100px;
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
      width: 250px;
      min-width: 75px;
      // margin: 5px 10px;
    }
    .el-select {
      width: 250px;
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