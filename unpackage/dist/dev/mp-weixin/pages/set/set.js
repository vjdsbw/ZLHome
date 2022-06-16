"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      username: "",
      username2: ""
    };
  },
  onShow() {
    this.info();
  },
  methods: {
    async info() {
      let reult = common_vendor.index.getStorageSync("user");
      this.username = reult.user_name;
      this.username2 = reult.user_id;
    },
    async Out() {
      let result = await common_js_http.requestPost("/api/api/logout");
      if (result.error === 0) {
        common_vendor.index.removeStorageSync("user");
        common_vendor.index.showToast({
          title: `\u9000\u51FA\u767B\u5F55`
        });
        setTimeout(() => {
          common_vendor.index.switchTab({
            url: "/pages/index/index"
          });
        }, 2e3);
      }
    },
    goAddress() {
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
    b: common_vendor.t($data.username2),
    c: common_vendor.p({
      type: "right",
      size: "20"
    }),
    d: common_vendor.o((...args) => $options.goAddress && $options.goAddress(...args)),
    e: common_vendor.o((...args) => $options.Out && $options.Out(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-21926b68"], ["__file", "F:/zuolo/pages/set/set.vue"]]);
wx.createPage(MiniProgramPage);
