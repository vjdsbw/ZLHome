"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      username: ""
    };
  },
  created() {
    this.show();
  },
  onShow() {
    this.show();
  },
  methods: {
    gologin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    },
    show() {
      let result = common_vendor.index.getStorageSync("user");
      if (result) {
        this.username = result.user_name;
      } else {
        this.username = "\u70B9\u51FB\u767B\u5F55";
      }
    },
    goSet() {
      let result = common_vendor.index.getStorageSync("user");
      if (result) {
        common_vendor.index.navigateTo({
          url: "/pages/set/set"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.username),
    b: common_vendor.o((...args) => $options.gologin && $options.gologin(...args)),
    c: common_vendor.o($options.goSet),
    d: common_vendor.p({
      type: "gear-filled",
      size: "30",
      color: "white"
    }),
    e: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-ziwopingjia",
      size: "20"
    }),
    f: common_vendor.p({
      type: "right",
      size: "20"
    }),
    g: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-shoucang",
      size: "20"
    }),
    h: common_vendor.p({
      type: "right",
      size: "20"
    }),
    i: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-ziwopingjia",
      size: "20"
    }),
    j: common_vendor.p({
      type: "right",
      size: "20"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-259fb574"], ["__file", "D:/HBuilderXProject/ZLHome/pages/me/me.vue"]]);
wx.createPage(MiniProgramPage);
