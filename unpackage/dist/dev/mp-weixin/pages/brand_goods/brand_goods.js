"use strict";
var common_js_http = require("../../common/js/http.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      goodsList: {}
    };
  },
  created() {
    this.getGoods();
  },
  methods: {
    async getGoods() {
      let result = await common_js_http.requestGet(`/api/api/search/?v=1&keywords=\u559C\u4E34\u95E8&XcxSessKey=%20&company_id=7194`);
      this.goodsList = result.data.goods_list;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.goodsList, (item, k0, i0) => {
      return {
        a: item.goods_img_url,
        b: common_vendor.t(item.goods_name),
        c: common_vendor.t(item.sale_total),
        d: item.goods_id
      };
    }),
    b: common_vendor.t()
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-48aef878"], ["__file", "F:/\u65E0\u9521\u524D\u7AEF\u57F9\u8BAD/\u9A6C\u54E5\u6559\u5B66/uni-app/ZLHome/pages/brand_goods/brand_goods.vue"]]);
wx.createPage(MiniProgramPage);
