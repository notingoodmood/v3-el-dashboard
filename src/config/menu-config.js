const base = "Home";

export default [
  {
    name: "basic",
    meta: {
      title: "用户",
      icon: "fa fa-camera-retro",
    },
    sub: [
      {
        name: "user_check_for_number",
        meta: {
          index: `/Home/user_check_for_number`,
          title: "查询工单分属号码",
          type: "menu",
          active: false,
        },
      },
      {
        name: "user_check_for_sms",
        meta: {
          index: `/Home/user_check_for_sms`,
          title: "查询短信验证码",
          type: "menu",
          active: false,
        },
      },
    ],
  },
  {
    name: "Form",
    meta: {
      title: "管理员",
      icon: "fa fa-bandcamp",
    },
    sub: [
      {
        name: "developer_assign",
        meta: {
          index: `/Home/developer_assign`,
          title: "新建工单",
          type: "menu",
          active: false,
        },
      },
    ],
  },
];
