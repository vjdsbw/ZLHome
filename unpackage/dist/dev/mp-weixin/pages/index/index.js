"use strict";
var common_js_http = require("../../common/js/http.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  created() {
    this.getSwipers();
  },
  methods: {
    onKeyInput: function(event) {
      this.keywords = event.detail.value;
    },
    async getSwipers() {
      let result2 = await common_js_http.requestGet("/api/api/category-chaji");
      console.log(result2);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/HBuilderXProject/ZLHome/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
