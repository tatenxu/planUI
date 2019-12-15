<template>
  <el-card class="box-card">
    <el-tabs v-model="viewname" @tab-click="handleTabClick" class="cardTab">
      <el-tab-pane label="颜色管理" name="first" class="tabPane">
        <!--表格 -->
        <el-row :gutter="20">
          <el-col :span="5" class="MinW" style="margin-left:30px">
            <el-switch
              v-model="checked"
              @change="planTypeSwitchChange"
              inactive-color="#13ce66"
              inactive-text="计划"
              active-text="异常"
            ></el-switch>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="addColorPanel()">添加颜色</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" @click="deleteColor()">删除颜色</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%; margin-top: 20px"
          @selection-change="changeCheckBoxFun"
          border
        >
          <el-table-column width="50" type="selection" align="center"></el-table-column>
          <el-table-column width="50" type="index" label="序号" align="center"></el-table-column>
          <el-table-column prop="type" width="350" label="类型" align="center"></el-table-column>
          <el-table-column prop="assignPlanType" label="颜色展示" align="center">
            <template slot-scope="scope">
              <div :style="'width:500px;height:30px;background-color:'+scope.row.code"></div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="updateColorPanel(scope.row)" type="text">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="添加/修改颜色(默认添加)" name="second">
        <el-card>
          <el-form
            :model="colorData"
            :rules="colorRules"
            ref="colorData"
            label-width="120px"
            class="add-ruleForm"
          >
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="计划/异常" prop="classification" placeholder="请选择添加类型">
                  <el-select
                    v-model="colorData.classification"
                    clearable
                    placeholder="请选择"
                    style="min-width:300px"
                    @change="typeChanged"
                  >
                    <el-option
                      v-for="item in colorData.options.classificationOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="类型" prop="type" placeholder="请选择添加类型">
                  <el-select
                    v-model="colorData.type"
                    clearable
                    placeholder="请选择"
                    style="min-width:300px"
                  >
                    <el-option
                      v-for="item in colorData.options.typeOptions"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2" style="margin-top:-18px">
                <el-button type="primary" @click="submitColor('colorData')">添加</el-button>
              </el-col>
              <el-col :span="2" style="margin-top:-18px">
                <el-button type="primary" @click="cancel()">取消</el-button>
              </el-col>
            </el-row>
          </el-form>

          <div class="palette-pro-container" style="margin-left:100px">
            <div ref="dotStage" class="color-stage" title="拖动调节饱和度和明度">
              <div class="bgd current-bgd" :style="{'backgroundColor': pureColor}" />
              <div class="bgd white-bgd" />
              <div class="bgd black-bgd" />
              <div
                ref="dot"
                class="color-dot"
                :style="{'left': `${satLeft}%`, 'top': `${valueTop}%`}"
              />
            </div>

            <div class="controller-stage">
              <div class="current-color-stage" title="点击复制" @click="handleCopyColor(currentColor)">
                <div class="lucency" />
                <div class="current-color" :style="{'backgroundColor': currentColor}" />
              </div>
              <div class="controller-bars">
                <div ref="hueStage" class="bar hue-stage" title="拖动调节色相">
                  <div class="hue-bar" />
                  <div ref="hue" class="slider" :style="{'left': `${hueLeft}%`}" />
                </div>
                <div ref="transStage" class="bar trans-stage" title="拖动调节透明度">
                  <div class="lucency" />
                  <div
                    class="trans-bar"
                    :style="{'backgroundImage': `linear-gradient(to right, rgba(255, 255, 255, 0), ${pureColor})`}"
                  />
                  <div ref="trans" class="slider" :style="{'left': `${transLeft}%`}" />
                </div>
              </div>
              <div class="current-color-text-stage">
                <input
                  disabled
                  id="current-color-text"
                  type="text"
                  class="current-color-input"
                  v-model="_currentColor"
                />
              </div>
            </div>

            <div class="show-stage">
              <div class="show-toggle-stage flex-start-stage">
                <button
                  class="show-toggle-btn"
                  @click="(blendent = item.value, update())"
                  v-for="item in blendents"
                  :key="item.label"
                >{{item.label}}</button>
              </div>
              <div class="show-color-stage flex-start-stage">
                <div
                  class="show-color-item"
                  title="点击复制"
                  @click="handleCopyColor(color)"
                  v-for="(color, index) in showColors"
                  :key="index"
                  :style="{'backgroundColor': color}"
                />
              </div>
            </div>

            <div class="recom-stage flex-start-stage">
              <div
                class="recom-color-item"
                @click="handleSetColor(color)"
                v-for="(color, index) in recomColors"
                :key="index"
                :style="{'backgroundColor': color}"
              />
            </div>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import request from "@/utils/request";
import Color from "@/utils/color";
import drag from "@/utils/drag";
import paste from "@/utils/paste";

export default {
  name: "color-picker",
  data() {
    const color = new Color({
      // 精度
      precision: 12 * 5
    });
    return {
      //颜色控制部分
      color,
      satLeft: 50,
      valueTop: 50,
      hueLeft: 50,
      transLeft: 50,
      pureColor: undefined,
      currentColor: undefined,
      showColors: undefined,
      blendent: undefined,
      recomColors: color.get("recomColors"),
      blendents: [
        { label: "互补色", value: "reverse" },
        { label: "近似色", value: "similar" },
        { label: "三角色", value: "triangle" },
        { label: "四角色", value: "square" },
        { label: "分裂互补色", value: "complement" },
        { label: "双分裂互补色", value: "doubleComplement" }
      ],
      //表格数据部分
      checked: false,
      viewname: "first",
      updateFlag: false,

      multipleSelection: [],

      colorData: {
        id: "",
        type: "",
        classification: "",
        options: {
          typeOptions: {},
          classificationOptions: [
            {
              id: "PLAN",
              name: "计划"
            },
            {
              id: "EXCEPTION",
              name: "异常"
            }
          ]
        }
      },
      colorRules: {
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        classification: [
          { required: true, message: "请选择计划/异常", trigger: "change" }
        ]
      },
      tableData: []
    };
  },
  computed: {
    _currentColor() {
      return this.currentColor;
    }
  },

  created: function() {
    //异常-计划修改
    request
      .get(`/color/find`, {
        params: {
          classification: this.checked ? "EXCEPTION" : "PLAN"
        }
      })
      .then(response => {
        this.tableData = response.result;
      });
  },
  mounted() {
    const { dotStage, hueStage, transStage } = this.$refs;

    [dotStage, hueStage, transStage].forEach(item => {
      drag(item, {
        start: (event, elem) => this.handleDrag(event, elem),
        move: (event, elem) => this.handleDrag(event, elem),
        end: (event, elem) => this.handleDrag(event, elem)
      });
    });

    this.update();
  },
  methods: {
    typeChanged() {
      //获取计划类型
      request
        .get(`/backstage/dic-property/name`, {
          params: {
            categoryName:
              this.colorData.classification === "PLAN" ? "计划类型" : "异常类型"
          }
        })
        .then(response => {
          this.colorData.options.typeOptions = response.result;
          this.colorData.type = "";
        });
    },
    //RGBA转换为十六进制
    hexify(color) {
      var values = color
        .replace(/rgba?\(/, "")
        .replace(/\)/, "")
        .replace(/[\s+]/g, "")
        .split(",");
      var a = parseFloat(values[3] || 1),
        r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255),
        g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255),
        b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
      return (
        "#" +
        ("0" + r.toString(16)).slice(-2) +
        ("0" + g.toString(16)).slice(-2) +
        ("0" + b.toString(16)).slice(-2)
      );
    },
    //将16进制转换为RGBA
    //hex -> rgba
    hexToRgba(hex, opacity) {
      return (
        "rgba(" +
        parseInt("0x" + hex.slice(1, 3)) +
        "," +
        parseInt("0x" + hex.slice(3, 5)) +
        "," +
        parseInt("0x" + hex.slice(5, 7)) +
        ")"
      );
    },
    updateColorPanel(row) {
      this.updateFlag = true;
      this.colorData.id = row.id;
      this.colorData.type = row.type;
      this.colorData.classification = row.classification;
      //获取计划类型
      request
        .get(`/backstage/dic-property/name`, {
          params: {
            categoryName:
              row.classification === "PLAN" ? "计划类型" : "异常类型"
          }
        })
        .then(response => {
          this.colorData.options.typeOptions = response.result;
        });
      this.viewname = "second";
    },
    submitColor(formName) {
      const that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.updateFlag) {
            let colorNum = this.hexify(this.color.output);
            request
              .post(`/color/insert`, {
                classification: this.colorData.classification,
                type: this.colorData.type,
                code: colorNum
              })
              .then(response => {
                this.viewname = "first";
                this.colorData.type = "";
                this.colorData.classification = "";
                this.planTypeSwitchChange();
              });
          } else {
            let colorNum = this.hexify(this.color.output);
            request
              .put(`/color/update`, {
                id: this.colorData.id,
                classification: this.colorData.classification,
                type: this.colorData.type,
                code: colorNum
              })
              .then(response => {
                this.viewname = "first";
                this.colorData.type = "";
                this.colorData.classification = "";
                this.colorData.id = "";
                this.updateFlag = false;
                this.planTypeSwitchChange();
              });
          }
        } else {
          this.$message({
            message: "请选择所有必填属性!",
            type: "error"
          });
        }
      });
    },
    cancel() {
      this.viewname = "first";
      this.colorData.type = "";
      this.colorData.classification = "";
      this.colorData.id = "";
      this.updateFlag = false;
    },
    addColorPanel() {
      this.colorData.options.typeOptions = [];
      this.viewname = "second";
      this.updateFlag = false;
    },
    //删除颜色
    deleteColor() {
      this.$confirm("是否删除选中根计划？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.multipleSelection.forEach(element => {
          request
            .delete(`/color/delete`, {
              params: {
                id: element.id
              }
            })
            .then(response => {
              this.planTypeSwitchChange();
            });
        });
      });
    },
    planTypeSwitchChange() {
      //异常-计划修改
      request
        .get(`/color/find`, {
          params: {
            classification: this.checked ? "EXCEPTION" : "PLAN"
          }
        })
        .then(response => {
          this.tableData = response.result;
        });
    },
    //列表选中
    changeCheckBoxFun(val) {
      this.multipleSelection = val;
    },
    handleSetColor(color) {
      const { satLeft, valueTop, hueLeft, transLeft } = this.color.string2rate(
        color
      );
      this.satLeft = satLeft;
      this.valueTop = valueTop;
      this.hueLeft = hueLeft;
      this.transLeft = transLeft;
      this.update();
    },

    handleCopyColor(color) {
      paste(color);
    },

    update() {
      this.color._update(
        this.satLeft,
        this.valueTop,
        this.hueLeft,
        this.transLeft
      );
      this.showColors = this.color.blendent(this.blendent);
      this.currentColor = this.color.get("output");
      this.pureColor = this.color.get("pure");
    },

    handleDrag(event, elem) {
      const { hue, trans, dot } = this.$refs;
      const _className = elem.className;

      const { width, height, left, top } = elem.getBoundingClientRect();

      let _left = event.clientX - left;
      let _top = event.clientY - top;

      _left = _left > 0 ? Math.min(width, _left) : 0;
      _top = _top > 0 ? Math.min(height, _top) : 0;

      _className.indexOf("hue") !== -1
        ? (this.hueLeft = (_left / width) * 100)
        : _className.indexOf("trans") !== -1
        ? (this.transLeft = (_left / width) * 100)
        : _className.indexOf("color") !== -1
        ? ((this.satLeft = (_left / width) * 100),
          (this.valueTop = (_top / height) * 100))
        : "";

      this.update();
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="less" scoped>
.palette-pro-container {
  width: 300px;
  background-color: #fff;
  box-shadow: 1px 1px 5px #949494;
  box-sizing: border-box;
  font-size: 1rem;
}
/* color-stage */
.color-stage {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  cursor: crosshair;
}
.bgd {
  position: absolute;
  width: 100%;
  height: 100%;
}
.white-bgd {
  background: linear-gradient(to right, white, rgba(255, 255, 255, 0));
}
.black-bgd {
  background: linear-gradient(to top, black, rgba(255, 255, 255, 0));
}
.current-bgd {
  background-color: red;
}
.color-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid #fff;
  box-shadow: 1px 1px 1px #949494;
  transform: translate(-50%, -50%);
}
/* color-stage */
/* controller-stage */
.controller-stage {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  padding: 20px 10px;
}
.current-color-stage {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: cell;
  box-shadow: 1px 1px 1px #949494;
  overflow: hidden;
}
.current-color {
  position: absolute;
  width: 100%;
  height: 100%;
}
.controller-bars {
  width: 65%;
  height: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.bar {
  position: relative;
  width: 100%;
  height: 15px;
  border-radius: 3px;
  cursor: e-resize;
  box-shadow: 1px 1px 1px #949494;
}
.hue-bar {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to right,
    red 0,
    #f0f 17%,
    blue 33%,
    cyan 50%,
    lime 67%,
    #ff0 83%,
    red
  );
}
.slider {
  position: absolute;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  margin: -3px 0;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 1px 1px 5px#949494;
}
.trans-bar {
  position: absolute;
  width: 100%;
  height: 100%;
}
.lucency {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("~@/assets/img/palette/lucency.png");
  background-repeat: repeat;
  background-size: 10px;
  background-position: 0 0;
}
/* controller-stage */
/* current-color-text-stage */
.current-color-text-stage {
  margin-top: 20px;
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.current-color-input {
  border: 1px solid #949494;
  width: 70%;
  height: 10px;
  border-radius: 3px;
  padding: 8px;
}
/* current-color-text-stage */
/* show-stage */
.show-stage {
  padding: 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.show-toggle-btn {
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  padding: 5px;
  margin: 5px;
  border-radius: 3px;
  color: #fff;
  border: 1px solid #409eff;
  background-color: #409eff;
}
.flex-start-stage {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
}
.show-color-item {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  box-shadow: 1px 1px 1px #949494;
  cursor: cell;
  margin: 5px;
}
/* show-stage */
/* recom-stage */
.recom-stage {
  padding: 10px;
}
.recom-color-item {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  box-shadow: 1px 1px 1px #949494;
  margin: 5px;
}
/* recom-stage */
.block {
  padding: 30px 0;
  text-align: center;
}
.Mtitle {
  align-content: center;
  margin-left: 43%;
  font-size: 2ch;
}
.box-card {
  margin: 20px 50px;
  padding: 0 20px;
  .el-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    .MinW {
      min-width: 400px;
    }
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      .title {
        font-size: 14px;
        width: 90px;
        min-width: 100px;
        text-align: center;
      }
      .el-input {
        width: 70%;
        min-width: 80px;
        margin-left: 20px;
      }
      .el-select {
        width: 70%;
        min-width: 80px;
        margin-left: 20px;
      }
    }
  }
}
</style>