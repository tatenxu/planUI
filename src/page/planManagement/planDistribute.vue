<template>
  <div class="body">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-button type="primary" style="margin-right:20px" @click="FinishPlan">计划完成</el-button>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%; margin-top: 20px"
          @selection-change="IsChanged"
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column prop="planId" label="预测编号" align="center"></el-table-column>
          <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brand" label="品牌" align="center"></el-table-column>
          <el-table-column prop="planName" label="计划名称" align="center"></el-table-column>
          <el-table-column prop="seriesName" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="planObject" label="计划对象" align="center"></el-table-column>
          <el-table-column prop="projectType" label="项目类型" align="center"></el-table-column>
          <el-table-column prop="createPeople" label="创建人" align="center"></el-table-column>
          <el-table-column prop="deletePeople" label="状态" align="center"></el-table-column>
          <el-table-column prop="deleteTime" label="创建时间" align="center"></el-table-column>

          <!-- <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="ReCover(scope.$index, scope.row)">恢复</el-button>
            </template>
          </el-table-column>-->
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
          :total="pagination.total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
const cityOptions = ["已制定", "未制定", "制定中"];
export default {
  name: "warehouseList",
  data() {
    return {
      checkAll: false,
      checkedCities: [],
      cities: cityOptions,
      isIndeterminate: true,
      select1: "",
      select2: "",
      select3: "",
      input1: "",
      input2: "",
      input3: "",
      pagination: {
        currentPage: 1,
        pageSizes: [5, 10, 20, 30, 50],
        pageSize: 5,
        total: 400
      },
      options1: [
        {
          value: 1,
          label: "客户A"
        },
        {
          value: 2,
          label: "客户B"
        },
        {
          value: 3,
          label: "客户C"
        },
        {
          value: 4,
          label: "客户D"
        },
        {
          value: 5,
          label: "客户E"
        }
      ],
      options2: [
        {
          value: 1,
          label: "品牌A"
        },
        {
          value: 2,
          label: "品牌B"
        },
        {
          value: 3,
          label: "品牌C"
        },
        {
          value: 4,
          label: "品牌D"
        },
        {
          value: 5,
          label: "品牌E"
        }
      ],
      options3: [
        {
          value: 1,
          label: "未审核"
        },
        {
          value: 2,
          label: "审核中"
        },
        {
          value: 3,
          label: "已审核"
        }
      ],
      tableData: [
        {
          planId: "JH190401001",
          customerName: "AFL",
          brand: "CX",
          planName: "2001系列计划",
          seriesName: "",
          planObject: "",
          projectType: "销样",
          createPeople: "XX",
          deletePeople: "XX",
          deleteTime: "2019-3-28"
        },
        {
          planId: "JH1904010012",
          customerName: "AFL",
          brand: "CX",
          planName: "2001系列计划",
          seriesName: "",
          planObject: "",
          projectType: "销样",
          createPeople: "XX",
          deletePeople: "XX",
          deleteTime: "2019-3-28"
        },
        {
          planId: "JH1904010013",
          customerName: "AFL",
          brand: "CX",
          planName: "2001系列计划",
          seriesName: "",
          planObject: "",
          projectType: "销样",
          createPeople: "XX",
          deletePeople: "XX",
          deleteTime: "2019-3-28"
        },
        {
          planId: "JH1904010014",
          customerName: "AFL",
          brand: "CX",
          planName: "2001系列计划",
          seriesName: "",
          planObject: "",
          projectType: "销样",
          createPeople: "XX",
          deletePeople: "XX",
          deleteTime: "2019-3-28"
        },
        {
          planId: "JH1904010015",
          customerName: "AFL",
          brand: "CX",
          planName: "2001系列计划",
          seriesName: "",
          planObject: "",
          projectType: "销样",
          createPeople: "XX",
          deletePeople: "XX",
          deleteTime: "2019-3-28"
        }
      ],
      // checked: true,
      pages: 0,
      AnyChanged: []
    };
  },
  methods: {
    FinishPlan() {
      //this.$set(this.iptDatas[index], `showAlert`, true)
      const that = this;
      if (that.AnyChanged.length === 0) {
        that.$message.error("请选择要删除的计划！");
      } else {
        this.AnyChanged.forEach(element => {
          var j = this.tableData.indexOf(element);
          this.$set(this.tableData[j], "deletePeople","已完成");
        });
      }
    },
    ReCover(index) {
      this.tableData.splice(index, 1);
    },
    IsChanged(val) {
      this.AnyChanged = val;
    },

    check(val) {
      val.forEach(element => {
        this.index.push(element.planId);
      });
    },
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleDelete(index, row) {
      this.$confirm("这将删除该仓库下所有记录信息，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let sendData = { id: row.id };
          this.$axios
            .post(
              `${window.$config.HOST}/warehouse/base/deleteWarehouse`,
              sendData
            )
            .then(response => {
              if (response.data > 0) {
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
                this.tableData.splice(index, 1);
              } else {
                this.$message({
                  type: "info",
                  message: "未在数据库中查到此记录对应信息！"
                });
              }
            })
            .catch(error => {
              console.log(error);
              this.$message({
                type: "info",
                message: "非法操作！"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消操作"
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