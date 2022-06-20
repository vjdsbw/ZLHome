"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      username: ""
    };
  },
  onShow() {
    this.showname();
  },
  methods: {
    showname() {
      let result = common_vendor.index.getStorageSync("user");
      this.username = result.alias;
    },
    gosetnickname() {
      common_vendor.index.navigateTo({
        url: "/pages/setnickname/setnickname"
      });
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
    a: common_vendor.p({
      type: "right",
      size: "20"
    }),
    b: common_vendor.p({
      type: "right",
      size: "20"
    }),
    c: common_vendor.t($data.username),
    d: common_vendor.o((...args) => $options.gosetnickname && $options.gosetnickname(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-164b1626"], ["__file", "D:/HBuilderXProject/ZLHome/pages/useredit/useredit.vue"]]);
wx.createPage(MiniProgramPage);
