<template>
  <div>
    <div v-if="isDeveloper">
      <div style="margin-top:10px;margin-bottom:10px;">
        1.首先请检查当前手机号码分配情况：
        <el-button
          type="primary"
          style="margin-left:15px"
          @click="getAssignStatus"
          :disabled="updating"
          >{{ updating ? "刷新中" : "刷新" }}</el-button
        >
      </div>

      <vxe-table align="allAlign" :data="tableData" empty-text="无数据">
        <vxe-column field="filed_name" title="分类名称" sortable></vxe-column>
        <vxe-column field="assigned" title="已分配" sortable></vxe-column>
        <vxe-column field="unassigned" title="剩余未分配" sortable></vxe-column>
      </vxe-table>

      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <div style="margin-top:30px;margin-bottom:30px;">
        2.选定一个分配项目：{{
          this.tableData.length == 0 ? "  暂无数据，请刷新" : ""
        }}
        <el-select
          v-model="selectedField"
          placeholder="请选择"
          :disabled="this.SelectorData.length == 0"
          style="margin-left:20px"
        >
          <el-option
            v-for="item in SelectorData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div
        style="margin-top:30px;margin-bottom:30px;"
        v-if="this.SelectorData.length != 0"
      >
        3.填写分配数量：
        <input
          type="text"
          v-model="inputSome"
          style="width:200px;height:30px"
          @input="checkForNumber"
          clearable
        />
        个
        <span v-if="this.inputWarning" style="color:red;margin-left:10px"
          >请检查</span
        >
      </div>
      <div
        style="margin-top:30px;margin-bottom:30px;"
        v-if="this.SelectorData.length != 0"
      >
        4.分配工单:
        <el-button
          type="primary"
          style="margin-left:15px"
          @click="assignBill"
          :disabled="this.finished"
          >提交数据</el-button
        >
      </div>
      <div style="margin-top:80px" v-if="this.finished">
        分配成功!请复制下面的工单代码提供给用户，之后请重新打开此界面：
      </div>
      <div
        style="margin-top:20px;font-size:30px;color:red"
        v-if="this.finished"
      >
        {{ this.code }}
      </div>
    </div>

    <div v-else-if="!isDeveloper">
      <div style="color:red">抱歉，此功能仅限管理员使用！</div>
      <div style="margin-top:20px">
        如果您是管理员，请点击右上角的【退出登录】，并以管理员身份使用。
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "../ajax.js";
import params from "../golbal";
export default {
  name: "BasicContainer",
  data() {
    return {
      inputSome: "",
      dialogVisible: false,
      isDeveloper: true,
      updating: false,
      tableData: [],
      SelectorData: [],
      selectedField: "",
      inputWarning: false,
      finished: false,
      code: "",
    };
  },
  mounted() {
    //如果使用者不是管理员，不显示内容
    let token = this.$cookies.get("token");
    if (!token || token.length === 0) {
      this.isDeveloper = false;
    }
  },
  methods: {
    getAssignStatus() {
      this.updating = true;
      let token = this.$cookies.get("token");
      if (!token || token.length === 0) {
        //不是一个管理员！
        this.updating = false;
        return;
      }
      ajax({
        methods: "GET",
        url: params.api_query_assign_status,
        data: {
          token: token,
        },
        success: (res) => {
          this.updating = false;
          console.log(res);
          this.tableData = res.data.list;
          this.SelectorData = [];
          for (let i = 0; i < res.data.list.length; i++) {
            let item = res.data.list[i];
            this.SelectorData.push({
              value: item.field,
              label: item.filed_name,
            });
          }
        },
        fail: (res) => {
          this.updating = false;
        },
      });
    },
    assignBill() {
      let token = this.$cookies.get("token");
      console.log(this.inputSome);
      if (!/^\d+$/.test(this.inputSome)) {
        alert("输入的数量有误！！！");
        return;
      }
      console.log(this.selectedField);
      if (this.selectedField === "" || isNaN(this.selectedField)) {
        alert("请选定一个类型！！！");
        return;
      }
      ajax({
        methods: "GET",
        url: params.api_create_new_bill,
        data: {
          token: token,
          field: this.selectedField,
          quantity: this.inputSome,
        },
        success: (res) => {
          if (res.statusCode === 0) {
            alert(`工单分配成功，请复制最底部信息，之后重新刷新界面！`);
            console.log(res);
            this.finished = true;
            this.code = res.data.bill_code;
          } else {
            alert(`工单分配失败！服务器返回信息：${res.message}`);
          }
        },
        fail: (res) => {
          alert(`工单分配失败！服务器返回信息：${res.message}`);
        },
      });
    },
    checkForNumber() {
      if (!this.selectedField) {
        return;
      }
      let limit = this.tableData[this.selectedField].unassigned;
      console.log(limit);
      if (this.inputSome > limit) {
        this.inputWarning = true;
      } else {
        this.inputWarning = false;
      }
    },
  },
};
</script>

<style>
.notDeveloperWarning {
  align-content: center;
  justify-content: center;
}
</style>
