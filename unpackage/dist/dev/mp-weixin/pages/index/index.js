"use strict";
var common_js_http = require("../../common/js/http.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      href: "https://uniapp.dcloud.io/component/README?id=uniui"
    };
  },
  created() {
    this.getSwipers();
  },
  methods: {
    async getSwipers() {
      let result = await common_js_http.requestPost("/api/m/index/cate", {
        "biao": "keting"
      });
      let result2 = await common_js_http.requestPost("/api/x/index/index");
      let result3 = await common_js_http.requestGet("/api/api/category-chuang/?v=1&XcxSessKey=%20&company_id=7194");
      console.log(result, result2, result3);
    }
  }
};
if (!Array) {
  const _component_van_button = common_vendor.resolveComponent("van-button");
  _component_van_button();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "default"
    }),
    b: common_vendor.p({
      type: "primary"
    }),
    c: common_vendor.p({
      type: "info"
    }),
    d: common_vendor.p({
      type: "warning"
    }),
    e: common_vendor.p({
      type: "danger"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/\u65E0\u9521\u524D\u7AEF\u57F9\u8BAD/\u9A6C\u54E5\u6559\u5B66/uni-app/ZLHome/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
