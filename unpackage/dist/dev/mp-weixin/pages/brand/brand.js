"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      brandList: []
    };
  },
  created() {
    this.getBrands();
  },
  methods: {
    async getBrands() {
      let result = await common_js_http.requestGet("/api/api/brand_list?XcxSessKey=%20&company_id=7194");
      this.brandList = result.data;
    },
    goGoodsForKeywords(brand_name) {
      common_vendor.index.navigateTo({
        url: "/pages/good/good?keywords=" + brand_name,
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.brandList, (item, k0, i0) => {
      return {
        a: item.image_tv_url,
        b: item.brand_logo_url,
        c: common_vendor.t(item.brand_name),
        d: common_vendor.t(item.desc_t),
        e: common_vendor.o(($event) => $options.goGoodsForKeywords(item.brand_name)),
        f: item.brand_id
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-802078d4"], ["__file", "F:/\u65E0\u9521\u524D\u7AEF\u57F9\u8BAD/\u9A6C\u54E5\u6559\u5B66/uni-app/ZLHome/pages/brand/brand.vue"]]);
wx.createPage(MiniProgramPage);
