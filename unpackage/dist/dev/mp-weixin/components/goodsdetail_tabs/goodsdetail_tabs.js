"use strict";
var common_js_http = require("../../common/js/http.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "goodsdetail_tabs",
  data() {
    return {
      active: 2,
      activeKey: 0,
      goodsImg: [],
      goodsCanshu: [],
      serviceInfo: []
    };
  },
  created() {
    this.getGoodImg();
  },
  methods: {
    onTabChange(event) {
      console.log(event.detail);
    },
    async getGoodImg() {
      let result = await common_js_http.requestGet("/api/api_goods?category_pinyin=undefined&goods_id=90846&XcxSessKey=%20&company_id=7194");
      this.goodsImg = result.data.goods_gallery;
      this.goodsCanshu = result.data.group_attr_list;
      this.serviceInfo = result.data.config_detail_list;
    }
  }
};
if (!Array) {
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  (_component_van_tab + _component_van_tabs)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.goodsImg, (item, k0, i0) => {
      return {
        a: item.img_url_url,
        b: item.img_id
      };
    }),
    b: common_vendor.p({
      title: "\u5546\u54C1\u8BE6\u60C5"
    }),
    c: common_vendor.f($data.goodsCanshu, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.attr_group_name),
        b: common_vendor.f(item.attr_lis, (i, k1, i1) => {
          return {
            a: common_vendor.t(i.name),
            b: common_vendor.t(i.value),
            c: i.name
          };
        }),
        c: item.attr_group_id
      };
    }),
    d: common_vendor.p({
      title: "\u89C4\u683C\u53C2\u6570"
    }),
    e: common_vendor.f($data.serviceInfo, (item, k0, i0) => {
      return {
        a: item.image_url,
        b: item.id
      };
    }),
    f: common_vendor.p({
      title: "\u670D\u52A1\u4FDD\u969C"
    }),
    g: common_vendor.p({
      active: $data.active,
      change: _ctx.onChange
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3f5a4fc4"], ["__file", "F:/zuolo/components/goodsdetail_tabs/goodsdetail_tabs.vue"]]);
wx.createComponent(Component);
