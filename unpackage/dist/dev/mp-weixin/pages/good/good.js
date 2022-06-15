"use strict";
var common_js_http = require("../../common/js/http.js");
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      Goods: [],
      brand: [],
      attr: [],
      p: 1,
      flag: true,
      option1: [
        {
          text: "\u7EFC\u5408",
          value: 0
        },
        {
          text: "\u6700\u65B0",
          value: 1
        }
      ],
      value1: 0,
      value_name: "\u53EF\u591A\u9009"
    };
  },
  created() {
    this.getgoodList();
  },
  methods: {
    async getgoodList() {
      let result = await common_js_http.requestGet("/api/api/category-woshi/", {
        p: this.p
      });
      this.brand = result.data.brand_list;
      this.attr = result.data.attr;
      if (result.data.goods_list.length < 32) {
        this.flag = false;
      } else {
        this.Goods = [...this.Goods, ...result.data.goods_list];
      }
    },
    showDrawer() {
      this.$refs.showRight.open();
    },
    closeDrawer() {
      this.$refs.showRight.close();
    }
  },
  onReachBottom() {
    if (this.flag) {
      this.p++;
      this.getgoodList();
    }
  }
};
if (!Array) {
  const _component_van_dropdown_item = common_vendor.resolveComponent("van-dropdown-item");
  const _component_van_dropdown_menu = common_vendor.resolveComponent("van-dropdown-menu");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  const _easycom_goodList2 = common_vendor.resolveComponent("goodList");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_component_van_dropdown_item + _component_van_dropdown_menu + _easycom_uni_icons2 + _easycom_uni_card2 + _easycom_uni_drawer2 + _easycom_goodList2 + _easycom_uni_load_more2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
const _easycom_goodList = () => "../../components/goodList/goodList.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_card + _easycom_uni_drawer + _easycom_goodList + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      value: $data.value1,
      options: $data.option1
    }),
    b: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-shaixuan",
      size: "16"
    }),
    c: common_vendor.o((...args) => $options.showDrawer && $options.showDrawer(...args)),
    d: common_vendor.o((...args) => $options.closeDrawer && $options.closeDrawer(...args)),
    e: common_vendor.f($data.brand, (item, k0, i0) => {
      return {
        a: item.brand_logo_url,
        b: item.brand_id
      };
    }),
    f: common_vendor.p({
      title: "\u54C1\u724C",
      extra: $data.value_name
    }),
    g: common_vendor.sr("showRight", "cdccd9b4-3"),
    h: common_vendor.p({
      mode: "right",
      width: "320",
      ["mask-click"]: false
    }),
    i: common_vendor.p({
      Goods: $data.Goods
    }),
    j: !$data.flag
  }, !$data.flag ? {
    k: common_vendor.p({
      status: "loading"
    })
  } : {
    l: common_vendor.p({
      status: "noMore"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cdccd9b4"], ["__file", "C:/Study/geek/15.uni-app/ZLHome/pages/good/good.vue"]]);
wx.createPage(MiniProgramPage);
