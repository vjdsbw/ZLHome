"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      show: true,
      allchecked: true,
      checked: true
    };
  },
  methods: {
    goshopping() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.show == false
  }, $data.show == false ? {
    b: common_vendor.o((...args) => $options.goshopping && $options.goshopping(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-14ff6a2e"], ["__file", "C:/Study/geek/15.uni-app/ZLHome/pages/carts/carts.vue"]]);
wx.createPage(MiniProgramPage);
