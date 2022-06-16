"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      type: "",
      value: "xxx",
      flag: false,
      flag1: false,
      flage: false,
      Goods: [],
      brand: [],
      attr: [],
      goods_ids: "",
      price: [],
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
      value1: 0
    };
  },
  created() {
  },
  methods: {
    tosearch() {
      common_vendor.index.navigateTo({
        url: `/pages/search/search?value=${this.value}`,
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    },
    tocart() {
      common_vendor.index.navigateTo({
        url: "/pages/cart/cart",
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    },
    async getgoodList() {
      let result = await common_js_http.requestGet(`/api/api/category-` + this.type + `/`, {
        p: this.p
      });
      if (result.data) {
        this.brand = result.data.brand_list;
        this.attr = result.data.attr;
        if (result.data.goods_list.length < 32) {
          this.flag = false;
        }
        this.Goods = [...this.Goods, ...result.data.goods_list];
        for (var i = 0; i < this.Goods.length; i++) {
          if (i == 0) {
            this.goods_ids = this.goods_ids + this.Goods[i].goods_id;
          }
          this.goods_ids = this.goods_ids + `,` + this.Goods[i].goods_id;
        }
        let result2 = await common_js_http.requestGet("/api/api/goods/get_price", {
          goods_ids: this.goods_ids
        });
        this.price = result2.data;
      }
    },
    showDrawer() {
      this.$refs.showRight.open();
    },
    closeDrawer() {
      this.$refs.showRight.close();
    },
    showTag() {
      this.flag = !this.flag;
    },
    show1Tag() {
      this.flag1 = !this.flag1;
    },
    currentClick() {
      this.flage = !this.flage;
    }
  },
  onReachBottom() {
    if (this.flag) {
      this.p++;
      this.getgoodList();
      this.goods_ids = "";
    }
  },
  async onLoad(options) {
    console.log(options);
    options.name && !options.pinyin ? this.value = options.name : this.value;
    if (options.name && !options.v && !options.pinyin) {
      let result = await common_js_http.requestGet(`/api/api/search/?v=1&keywords=${options.name}`);
      this.Goods = result.data.goods_list;
      for (var i = 0; i < this.Goods.length; i++) {
        if (i == 0) {
          this.goods_ids = this.goods_ids + this.Goods[i].goods_id;
        }
        this.goods_ids = this.goods_ids + `,` + this.Goods[i].goods_id;
      }
      let result2 = await common_js_http.requestGet("/api/api/goods/get_price", {
        goods_ids: this.goods_ids
      });
      this.price = result2.data;
    }
    if (options.name && options.v) {
      let result = await common_js_http.requestGet(`/api/api/search/?v=${options.v}&b=${options.b}`);
      this.Goods = result.data.goods_list;
      for (var i = 0; i < this.Goods.length; i++) {
        if (i == 0) {
          this.goods_ids = this.goods_ids + this.Goods[i].goods_id;
        }
        this.goods_ids = this.goods_ids + `,` + this.Goods[i].goods_id;
      }
      let result2 = await common_js_http.requestGet("/api/api/goods/get_price", {
        goods_ids: this.goods_ids
      });
      this.price = result2.data;
    } else if (options.pinyin) {
      this.type = options.pinyin;
      this.value = options.chinese;
      this.getgoodList();
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_van_dropdown_item = common_vendor.resolveComponent("van-dropdown-item");
  const _component_van_dropdown_menu = common_vendor.resolveComponent("van-dropdown-menu");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  const _easycom_goodList2 = common_vendor.resolveComponent("goodList");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_icons2 + _component_van_dropdown_item + _component_van_dropdown_menu + _easycom_uni_drawer2 + _easycom_goodList2 + _easycom_uni_load_more2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
const _easycom_goodList = () => "../../components/goodList/goodList.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_drawer + _easycom_goodList + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-sousuo",
      size: "20"
    }),
    b: common_vendor.o((...args) => _ctx.onKeyInput && _ctx.onKeyInput(...args)),
    c: $data.value,
    d: common_vendor.o(($event) => $options.tosearch()),
    e: common_vendor.o($options.tocart),
    f: common_vendor.p({
      type: "cart",
      size: "30"
    }),
    g: common_vendor.p({
      value: $data.value1,
      options: $data.option1
    }),
    h: common_vendor.o((...args) => $options.currentClick && $options.currentClick(...args)),
    i: $data.flage ? 1 : "",
    j: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-xiajiantou",
      size: "8"
    }),
    k: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-shangjiantou",
      size: "8"
    }),
    l: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-shaixuan",
      size: "14"
    }),
    m: common_vendor.o((...args) => $options.showDrawer && $options.showDrawer(...args)),
    n: common_vendor.o((...args) => $options.closeDrawer && $options.closeDrawer(...args)),
    o: common_vendor.t($data.flag ? "\u53EF\u591A\u9009" : "\u67E5\u770B\u5168\u90E8"),
    p: common_vendor.o((...args) => $options.showTag && $options.showTag(...args)),
    q: common_vendor.f($data.brand, (item, k0, i0) => {
      return {
        a: item.brand_logo_url,
        b: item.brand_id
      };
    }),
    r: !$data.flag ? 1 : "",
    s: common_vendor.f($data.attr, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.attr_name),
        b: common_vendor.f(item.attr_list, (list, k1, i1) => {
          return {
            a: common_vendor.t(list.attr_value),
            b: list.attr_value_id
          };
        }),
        c: item.attr_id
      };
    }),
    t: common_vendor.t($data.flag1 ? "\u53EF\u591A\u9009" : "\u67E5\u770B\u5168\u90E8"),
    v: common_vendor.o((...args) => $options.show1Tag && $options.show1Tag(...args)),
    w: !$data.flag1 ? 1 : "",
    x: common_vendor.sr("showRight", "cdccd9b4-7"),
    y: common_vendor.p({
      mode: "right",
      width: "320",
      ["mask-click"]: false
    }),
    z: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-xiajiantou",
      size: "8"
    }),
    A: common_vendor.f($data.attr, (attrs, k0, i0) => {
      return {
        a: common_vendor.t(attrs.attr_name),
        b: "cdccd9b4-9-" + i0,
        c: attrs.attr_id
      };
    }),
    B: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-xiajiantou",
      size: "8"
    }),
    C: common_vendor.p({
      Goods: $data.Goods,
      price: $data.price
    }),
    D: !$data.flag
  }, !$data.flag ? {
    E: common_vendor.p({
      status: "loading"
    })
  } : {
    F: common_vendor.p({
      status: "noMore"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cdccd9b4"], ["__file", "F:/zuolo/pages/good/good.vue"]]);
wx.createPage(MiniProgramPage);
