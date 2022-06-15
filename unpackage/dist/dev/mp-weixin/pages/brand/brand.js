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
      console.log(result);
      this.brandList = result.data;
    },
    goGoodsDetail() {
      common_vendor.index.navigateTo({
        url: "../brand_goods/brand_goods",
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
        e: item.brand_id
      };
    }),
    b: common_vendor.o((...args) => $options.goGoodsDetail && $options.goGoodsDetail(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-802078d4"], ["__file", "C:/Study/geek/15.uni-app/ZLHome/pages/brand/brand.vue"]]);
wx.createPage(MiniProgramPage);
