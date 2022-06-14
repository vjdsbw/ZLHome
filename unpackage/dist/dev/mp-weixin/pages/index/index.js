"use strict";
var common_js_http = require("../../common/js/http.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      href: "https://uniapp.dcloud.io/component/README?id=uniui",
      goods_ids: ""
    };
  },
  created() {
    this.getSwipers();
  },
  methods: {
    async getSwipers() {
      await common_js_http.requestPost("/api/x/index/index");
      let result3 = await common_js_http.requestGet("/api/api/category-xidingdeng/");
      console.log(result3.data.goods_list);
      for (let i = 0; i < result3.data.goods_list.length; i++) {
        if (i == 0) {
          this.goods_ids = result3.data.goods_list[i].goods_id;
        }
        this.goods_ids = this.goods_ids + `,` + result3.data.goods_list[i].goods_id;
      }
      console.log(this.goods_ids);
      let result4 = await common_js_http.requestGet("/api/api/goods/get_price", { "goods_ids": this.goods_ids });
      console.log(result4);
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/dell/Desktop/ZLHome/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
