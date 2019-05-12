<template>
  <div class="body">
    <el-card class="box-card">
      <div>
        <el-row :gutter="20">
          <el-col :span="8">
          <div class="bar">
            <div class="title">下发对象</div>
            <el-select v-model="searchOptions.searchParams.userName" clearable>
              <el-option
                v-for="item in searchOptions.options.userNameOptions"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select> 
          </div>
        </el-col>
        <el-col :span="8">
          <div class="bar">
            <el-button type="primary" style="margin-right:20px" @click="distributePlanClick">下发计划</el-button>
          </div>
        </el-col>
          
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%; margin-top: 20px"
          @selection-change="tableSelectionChange"
          :stripe="true"
        >
          <el-table-column type="selection" width="50" align="center"></el-table-column>
          <el-table-column type="index" label="序号" align="center"></el-table-column>
          <el-table-column v-if="false" prop="id" align="center"></el-table-column>
          <el-table-column prop="number" label="预测编号" align="center"></el-table-column>
          <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
          <el-table-column prop="brandName" label="品牌" align="center"></el-table-column>
          <el-table-column prop="name" label="计划名称" align="center"></el-table-column>
          <el-table-column prop="rangeName" label="系列名称" align="center"></el-table-column>
          <el-table-column prop="planObject" label="计划对象" align="center"></el-table-column>
          <el-table-column prop="type" label="项目类型" align="center"></el-table-column>
          <el-table-column prop="createrName" label="创建人" align="center"></el-table-column>
          <el-table-column prop="state" label="状态" align="center"></el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>

          <!-- <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="ReCover(scope.$index, scope.row)">恢复</el-button>
            </template>
          </el-table-column>-->
        </el-table>
      </div>
      <div class="block">
        <el-pagination
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
export default {
  data() {
    return {
      searchOptions: {
        searchParams: {
          userName:""
        },
        options: {
          userNameOptions:[],
        }
      },
      
      tableData: [],
      tableMultpleSelection:[],

      pages: 0,
      pagination: {
        currentPage: 1,
        pageSizes: [5, 10, 20, 30, 50],
        pageSize: 5,
        total: 400,
      },
    };
  },
  created:function(){
    let that = this;
    //获取用户信息
    that.$axios
      .get(`${window.$config.HOST}/infoManagement/getUsers`)
      .then(response=>{
        if(response.data.errcode < 0){
          that.$message.error("下发对象加载失败!");
        }
        this.searchOptions.options.userNameOptions = response.data;
      })
      .catch(error=>{
        that.$message.error("下发对象加载失败!");
        this.searchOptions.options.userNameOptions =[
            {
              id:"4243",
              name:"小王"
            },
            {
              id:"574523",
              name:"小徐"
            },
            {
              id:"57531",
              name:"小刘"
            },
          ];
      });

    //获取所有未下发计划
    // var param ={
    //   customerId : null,
    //   brandId : null,
    //   rangeId: null,
    //   id : null,
    //   clothingLevelId : null,
    //   startDate : null,
    //   endDate : null,
    // };
    var param = {
      stage:"distribute"
    };
    this.$axios
      .get(`${window.$config.HOST}/planManagement/getPlanList`,{
        params:param
      })
      .then(response => {
        console.log("初始化加载下发计划成功");
      })
      .catch(error => {
        console.log("计划列表获取错误");
        this.tableData = [
          {
            id:"45312",
            number: "JH190401001",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "aaaaaaaa",
            planObject: "rwqerqwer",
            type: "销样",
            createrName: "XX",
            state: "XX",
            createTime: "2019-3-28"
          },
          {
            id:"451",
            number: "JH1904010012",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "bbbbb",
            planObject: "qwerqwe",
            type: "销样",
            createrName: "XX",
            state: "XX",
            createTime: "2019-3-28"
          },
          {
            id:"878351",
            number: "JH1904010013",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "vvvvvvv",
            planObject: "weqrqwer",
            type: "销样",
            createrName: "XX",
            state: "XX",
            createTime: "2019-3-28"
          },
          {
            id:"87563",
            number: "JH1904010014",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "ffffffff",
            planObject: "ewqrqwerqwer",
            type: "销样",
            createrName: "XX",
            state: "XX",
            createTime: "2019-3-28"
          },
          {
            id:"875",
            number: "JH1904010015",
            customerName: "AFL",
            brandName: "CX",
            name: "2001系列计划",
            rangeName: "fasdfasdf",
            planObject: "zcxzv",
            type: "销样",
            createrName: "XX",
            state: "XX",
            createTime: "2019-3-28"
          }
        ];
      });
  },
  methods: {
    distributePlanClick() {
      //this.$set(this.iptDatas[index], `showAlert`, true)
      let that = this;
      if (that.tableMultpleSelection.length === 0) {
        that.$message.error("请选择要删除的计划！");
      } else if (!that.searchOptions.searchParams.userName){
        that.$message.error("请选择下发对象！");
      }else {
        this.tableMultpleSelection.forEach(element => {
          this.$axios
            .post(`${window.$config.HOST}/planManagement/distributePlan`,{
              planId:element.id,
              distributedUserId: (this.searchOptions.searchParams.userName==="") ? null : this.searchOptions.searchParams.userName,
            })
            .then(response=>{
              if(response.data < 0){
                that.$message.error(element.name+"下发失败!");
                console.log(element.name+"下发失败!");
              }else{
                console.log(element.name+"下发成功!");
                var j = this.tableData.indexOf(element);
                this.$set(this.tableData[j], "state","已下发");
              }
            })
            .catch(error=>{
              that.$message.error(element.name+"下发失败!");
              console.log(element.name+"下发失败!");
            });
        });
      }
    },
    tableSelectionChange(val){
      this.tableMultpleSelection = val;
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