const API_Host = "http://localhost:8080";
const api_send_sms = API_Host + "/SMS/send_sms";
const api_get_token = API_Host + "/SMS/get_token";
const api_query_phone_number = API_Host + "/business/query_phone_number";

export default {
  API_Host,
  api_send_sms,
  api_get_token,
  api_query_phone_number,
};
