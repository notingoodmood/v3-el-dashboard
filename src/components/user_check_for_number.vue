<template>
  <div>
    <div style="margin-top:10px;margin-bottom:10px;">
      请输入从经销商处得到的工单代码(bill code)：
      <input type="text" v-model="inputSome" style="width:300px;" />
      <el-button type="text" @click="checkForData" style="margin-left:20px"
        >查询分属手机号码</el-button
      >
    </div>
    <div v-if="this.selectRow" style="margin-top:10px;margin-bottom:10px">
      当前选定手机号码：{{ this.selectRow.phone_number }}
      <el-button type="text" @click="checkForData" style="margin-left:20px"
        >查询该手机号码短信</el-button
      >
    </div>
    <el-dialog border title="提示" :visible.sync="dialogVisible" width="30%">
      <span>{{ dialog_text }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ button_text }}</el-button>
      </span>
    </el-dialog>

    <vxe-table
      align="allAlign"
      :data="tableData"
      empty-text="无数据"
      :radio-config="{ highlight: true }"
      @radio-change="radioChangeEvent"
    >
      <vxe-column type="radio" width="60">
        <template #header>
          <vxe-button type="text" :disabled="true">选定</vxe-button>
        </template>
      </vxe-column>
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
      dialog_text: params.dialog_loading_text,
      button_text: params.dialog_button_loading,
      selectRow: null,
    };
  },
  methods: {
    checkForData() {
      if (this.dialogVisible == false) {
        this.dialog_text = params.dialog_loading_text;
        this.button_text = params.dialog_button_loading;
        this.dialogVisible = true;
        this.selectRow = null;
      }
      ajax({
        methods: "GET",
        url: params.api_query_phone_number,
        data: {
          bill_code: this.inputSome,
        },
        success: (res) => {
          this.tableData = [];
          if (res.statusCode === 0) {
            this.dialogVisible = false;
            res.data.list.forEach((value, index, array) => {
              this.tableData.push({ phone_number: value });
            });
          } else {
            this.dialog_text =
              params.dialog_query_failed_text_require_reason + res.message;
            this.button_text = params.dialog_button_failed;
          }
        },
        fail: (res) => {
          this.dialog_text = params.dialog_query_failed_text;
          this.tableData = [];
        },
      });
    },
    radioChangeEvent({ row }) {
      this.selectRow = row;
      console.log("单选事件");
    },
    clearRadioRowEvent() {
      this.selectRow = null;
      this.$refs.xTable1.clearRadioRow();
    },
  },
};
</script>
