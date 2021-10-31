<template>
  <div>
    <div>
      1.输入在运营商处获得的工单代码(bill code):
      <input
        type="text"
        v-model="billCode"
        style="width:300px;margin-left:20px"
      />
    </div>
    <div style="margin-top:15px;margin-bottom:15px">
      2.输入<strong>此工单分属</strong>的手机号码:
      <input
        type="text"
        v-model="businessPhoneNumber"
        style="margin-left:15px"
      />

      <el-button type="primary" @click="checkForSMS" style="margin-left: 20px"
        >查询验证码短信</el-button
      >
    </div>
    <vxe-table
      align="allAlign"
      :data="tableData"
      empty-text="无数据"
      :radio-config="{ highlight: true }"
    >
      <vxe-column type="radio" width="60">
        <template #header>
          <vxe-button type="text" :disabled="true">高亮</vxe-button>
        </template>
      </vxe-column>
      <vxe-column field="from" title="发信者(from)" sortable></vxe-column>
      <vxe-column field="to" title="收信者(to)" sortable></vxe-column>
      <vxe-column field="content" title="内容" sortable></vxe-column>
      <vxe-column field="time" title="接收时间" sortable></vxe-column>
    </vxe-table>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>{{ dialogTitle }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">{{
          dialogButtonText
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ajax from "../ajax.js";
import params from "../golbal";
export default {
  name: "user_check_for_sms",
  data() {
    return {
      billCode: "",
      businessPhoneNumber: "",
      dialogVisible: false,
      dialogTitle: params.dialog_loading_text,
      dialogButtonText: params.dialog_button_loading,
      tableData: [],
    };
  },
  mounted() {
    if (this.$route.params.billCode) {
      //router传参的优先级高于cookies
      this.billCode = this.$route.params.billCode;
      this.businessPhoneNumber = this.$route.params.businessPhoneNumber;
    } else {
      let billCodeFromCookies = this.$cookies.get("billCode");
      if (billCodeFromCookies) {
        this.billCode = billCodeFromCookies;
      }
      let businessPhoneNumberFromCookies = this.$cookies.get(
        "businessPhoneNumber"
      );
      if (businessPhoneNumberFromCookies) {
        this.businessPhoneNumber = businessPhoneNumberFromCookies;
      }
    }
  },
  methods: {
    checkForSMS() {
      this.dialogVisible = true;
      this.dialogTitle = params.dialog_loading_text;
      this.dialogButtonText = params.dialog_button_loading;
      this.tableData = [];
      ajax({
        methods: "GET",
        url: params.api_query_sms_by_bill,
        data: {
          bill_code: this.billCode,
          phone_number: encodeURIComponent(this.businessPhoneNumber),
        },
        success: (res) => {
          console.log(JSON.stringify(res));
          if (res.statusCode === 0) {
            this.dialogVisible = false;
            for (let data of res.data.list) {
              this.tableData.push({
                from: data.from_phone_number,
                to: data.to_phone_number,
                content: data.content,
                time: data.create_time,
              });
            }
          } else {
            this.dialogTitle =
              params.dialog_query_failed_text_require_reason + res.message;
            this.dialogButtonText = params.dialog_button_failed;
          }
        },
        fail: (res) => {
          this.dialogTitle = params.dialog_query_failed_text;
          this.dialogButtonText = params.dialog_button_failed;
        },
      });
    },
  },
};
</script>
