"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  props: ["Goods", "price"],
  name: "goodList",
  data() {
    return {};
  },
  updated() {
    let array = [];
    for (var m = 0, n = 0; m < this.price.length; m++, n++) {
      array.push(Object.assign(this.Goods[n], { shop_price: this.price[m].shop_price }));
    }
  },
  methods: {
    togoodsdetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/gooddetail/gooddetail?id=${id}`,
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
    a: common_vendor.f($props.Goods, (item, k0, i0) => {
      return {
        a: item.goods_img_url,
        b: common_vendor.t(item.goods_name),
        c: common_vendor.t(item.shop_price),
        d: common_vendor.t(item.sale_total),
        e: item.goods_name,
        f: common_vendor.o(($event) => $options.togoodsdetail(item.goods_id), item.goods_name)
      };
    })
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-527b7738"], ["__file", "D:/HBuilderXProject/ZLHome/components/goodList/goodList.vue"]]);
wx.createComponent(Component);
