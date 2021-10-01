const base = "Home";

export default [
  {
    name: "basic",
    meta: {
      title: "基本",
      icon: "fa fa-camera-retro",
    },
    sub: [
      {
        name: "BasicLayout",
        meta: {
          index: `/Home/BasicLayout`,
          title: "基本布局",
          type: "menu",
          active: false,
        },
      },
      {
        name: "BasicContainer",
        meta: {
          index: `/Home/BasicContainer`,
          title: "基本容器",
          type: "menu",
          active: false,
        },
      },
      {
        name: "user_check_for_number",
        meta: {
          index: `/Home/user_check_for_number`,
          title: "查询工单分属号码",
          type: "menu",
          active: false,
        },
      },
    ],
  },
  {
    name: "Form",
    meta: {
      title: "表单",
      icon: "fa fa-bandcamp",
    },
    sub: [
      {
        name: "FormRadio",
        meta: {
          index: `/Home/FormRadio`,
          title: "单选按钮",
          type: "menu",
          active: false,
        },
      },
    ],
  },
];
