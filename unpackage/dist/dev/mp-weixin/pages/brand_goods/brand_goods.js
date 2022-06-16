"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      goodsList: {},
      brandName: ""
    };
  },
  created() {
  },
  onLoad(options) {
    this.brandName = options.keywords;
  },
  onReady() {
    this.getGoods();
  },
  methods: {
    async getGoods() {
      let result = await common_js_http.requestGet("/api/api/search/?v=1&keywords=" + this.brandName + "&XcxSessKey=%20&company_id=7194");
      this.goodsList = result.data.goods_list;
    },
    goGoodsDetailById(goodsId) {
      common_vendor.index.navigateTo({
        url: "/pages/gooddetail/gooddetail?goods_id=" + goodsId,
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
    a: common_vendor.f($data.goodsList, (item, k0, i0) => {
      return {
        a: item.goods_img_url,
        b: common_vendor.t(item.goods_name),
        c: common_vendor.t(item.sale_total),
        d: item.goods_id,
        e: common_vendor.o(($event) => $options.goGoodsDetailById(item.goods_id), item.goods_id)
      };
    }),
    b: common_vendor.t()
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-48aef878"], ["__file", "C:/Study/geek/15.uni-app/ZLHome/pages/brand_goods/brand_goods.vue"]]);
wx.createPage(MiniProgramPage);
