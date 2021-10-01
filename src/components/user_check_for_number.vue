<template>
  <div>
    请输入从经销商处得到的工单代码(bill code)：
    <input type="text" v-model="inputSome" style="width:300px;" />

    <el-button type="text" @click="checkForData" style="margin-left:20px"
      >查询</el-button
    >

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>正在查询...</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">强制停止</el-button>
      </span>
    </el-dialog>

    <vxe-table align="allAlign" :data="tableData" empty-text="无数据">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="phone_number" title="短信号码" sortable></vxe-column>
    </vxe-table>
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
      tableData: [],
    };
  },
  methods: {
    checkForData() {
      if (this.dialogVisible == false) {
        this.dialogVisible = true;
      }
      ajax({
        methods: "GET",
        url: params.api_query_phone_number,
        data: {
          bill_code: this.inputSome,
        },
        success: (res) => {
          this.dialogVisible = false;
          if (res.statusCode === 0) {
            let array = [];
            for (let s of res.data.list) {
              array.push({ phone_number: s });
            }
            this.tableData = array;
          } else {
            this.tableData = [];
          }
        },
        fail: (res) => {
          this.dialogVisible = false;
          this.tableData = [];
        },
      });
    },
  },
};
</script>
