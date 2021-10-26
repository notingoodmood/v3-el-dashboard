const API_Host = "http://localhost:8080";
const api_send_sms = API_Host + "/SMS/send_sms";
const api_get_token = API_Host + "/SMS/get_token";
const api_query_phone_number = API_Host + "/business/query_phone_number";
const api_query_sms_by_bill = API_Host + "/business/query_sms_by_bill";

const dialog_loading_text = "正在查询...";
const dialog_query_failed_text_require_reason = "访问失败,失败原因:";
const dialog_query_failed_text = "网络访问失败，请稍后重试！";

const dialog_button_loading = "强制停止";
const dialog_button_failed = "关闭";

export default {
  API_Host,
  api_send_sms,
  api_get_token,
  api_query_phone_number,
  api_query_sms_by_bill,
  dialog_loading_text,
  dialog_query_failed_text_require_reason,
  dialog_query_failed_text,
  dialog_button_loading,
  dialog_button_failed,
};
