"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      num: null,
      temp: 0,
      myScroll: 0,
      type: "",
      icons: false,
      value: "xxx",
      flag: false,
      flag1: true,
      flage: false,
      Goods: [],
      brand: [],
      attr: [],
      goods_ids: "",
      price: [],
      brr: [],
      arr: [],
      a: "",
      b: "",
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
      psort: 0
    };
  },
  onLoad() {
    common_vendor.index.createSelectorQuery().select(".second_list").boundingClientRect((res) => {
      this.myScroll = res.top;
    }).exec();
  },
  onPageScroll(e) {
    if (e.scrollTop > this.myScroll) {
      this.temp = 1;
    } else {
      this.temp = 0;
    }
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
        p: this.p,
        a: this.a,
        b: this.b
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
        let result22 = await common_js_http.requestGet("/api/api/goods/get_price", {
          goods_ids: this.goods_ids
        });
        this.price = result22.data;
      }
      let result2 = await common_js_http.requestGet("/api/api/goods/get_price", {
        goods_ids: this.goods_ids
      });
      this.price = result2.data;
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
    addA(m) {
      if (this.arr.includes(m)) {
        this.arr = this.arr.filter((item) => item !== m);
      } else {
        this.arr.push(m);
      }
    },
    addB(m) {
      if (this.brr.includes(m)) {
        this.brr = this.brr.filter((item) => item !== m);
      } else {
        this.brr.push(m);
      }
    },
    reset() {
      this.arr = [];
      this.brr = [];
      this.a = "";
      this.b = "";
      this.Goods = [];
      this.getgoodList();
    },
    sure() {
      this.arr.forEach((item) => this.a = item + "^" + this.a);
      this.brr.forEach((item) => this.b = item + "^" + this.b);
      this.Goods = [];
      this.getgoodList();
    },
    currentClick(k) {
      this.flage = !this.flage;
      this.psort = 6;
      this.Goods = [];
      this.getgoodList();
    },
    open() {
      console.log("xxx");
    },
    menu(value1) {
      console.log(this.value1);
    },
    bottomClick(k) {
      console.log(k);
      if (k == 1) {
        this.psort = 1;
        console.log("\u4EF7\u683C\u5347\u5E8F");
      } else {
        this.psort = 2;
        console.log("\u4EF7\u683C\u964D\u5E8F");
      }
      this.Goods = [];
      this.price = [];
      this.getgoodList();
    },
    iconClick(index) {
      this.num = index;
    },
    thenClick(idx) {
      this.num = idx;
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
    options.name && !options.pinyin ? this.value = options.name : this.value;
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
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _easycom_goodList2 = common_vendor.resolveComponent("goodList");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_icons2 + _component_van_dropdown_item + _component_van_dropdown_menu + _easycom_uni_drawer2 + _component_van_button + _easycom_goodList2 + _easycom_uni_load_more2)();
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
    g: common_vendor.o(($event) => $options.menu($data.value1)),
    h: common_vendor.p({
      value: $data.value1,
      options: $data.option1
    }),
    i: common_vendor.o(($event) => $options.currentClick(_ctx.value6)),
    j: $data.flage ? 1 : "",
    k: common_vendor.o(($event) => $options.bottomClick(1)),
    l: common_vendor.p({
      type: "bottom",
      size: "8"
    }),
    m: common_vendor.o(($event) => $options.bottomClick(2)),
    n: common_vendor.p({
      type: "top",
      size: "8"
    }),
    o: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-shaixuan",
      size: "14"
    }),
    p: common_vendor.o((...args) => $options.showDrawer && $options.showDrawer(...args)),
    q: common_vendor.t($data.flag ? "\u53EF\u591A\u9009" : "\u67E5\u770B\u5168\u90E8"),
    r: common_vendor.o((...args) => $options.showTag && $options.showTag(...args)),
    s: common_vendor.f($data.brand, (item, k0, i0) => {
      return {
        a: item.brand_logo_url,
        b: item.brand_id,
        c: common_vendor.o(($event) => $options.addB(item.brand_id), item.brand_id)
      };
    }),
    t: !$data.flag ? 1 : "",
    v: common_vendor.f($data.attr, (item, idx, i0) => {
      return {
        a: common_vendor.t(item.attr_name),
        b: common_vendor.f(item.attr_list, (list, k1, i1) => {
          return {
            a: common_vendor.t(list.attr_value),
            b: common_vendor.o(($event) => $options.addA(list.attr_value_id), list.attr_value_id),
            c: list.attr_value_id
          };
        }),
        c: item.attr_id
      };
    }),
    w: common_vendor.t($data.flag1 ? "\u53EF\u591A\u9009" : "\u67E5\u770B\u5168\u90E8"),
    x: common_vendor.o((...args) => $options.show1Tag && $options.show1Tag(...args)),
    y: !$data.flag1 ? 1 : "",
    z: common_vendor.o((...args) => $options.reset && $options.reset(...args)),
    A: common_vendor.o((...args) => $options.sure && $options.sure(...args)),
    B: common_vendor.sr("showRight", "cdccd9b4-7"),
    C: common_vendor.p({
      mode: "right",
      width: "320",
      ["mask-click"]: true
    }),
    D: common_vendor.f($data.brand, (item, index, i0) => {
      return {
        a: common_vendor.t(item.brand_name),
        b: "cdccd9b4-10-" + i0 + ",cdccd9b4-9",
        c: index == $data.num ? 1 : "",
        d: item.brand_id,
        e: common_vendor.o(($event) => $options.iconClick(index), item.brand_id)
      };
    }),
    E: common_vendor.p({
      type: "checkmarkempty",
      color: "red",
      size: "20"
    }),
    F: common_vendor.p({
      type: "danger",
      block: true
    }),
    G: common_vendor.p({
      title: "\u54C1\u724C"
    }),
    H: common_vendor.f($data.attr, (item, k0, i0) => {
      return {
        a: common_vendor.f(item.attr_list, (att, idx, i1) => {
          return {
            a: common_vendor.t(att.attr_value),
            b: "cdccd9b4-13-" + i0 + "-" + i1 + "," + ("cdccd9b4-12-" + i0),
            c: idx == $data.num ? 1 : "",
            d: common_vendor.o(($event) => $options.thenClick(idx))
          };
        }),
        b: "cdccd9b4-14-" + i0 + "," + ("cdccd9b4-12-" + i0),
        c: item.attr_id,
        d: "cdccd9b4-12-" + i0 + ",cdccd9b4-8",
        e: common_vendor.p({
          title: item.attr_name
        })
      };
    }),
    I: common_vendor.p({
      type: "checkmarkempty",
      color: "red",
      size: "20"
    }),
    J: common_vendor.p({
      type: "danger",
      block: true
    }),
    K: common_vendor.n($data.temp == 1 ? "boxStyle" : ""),
    L: common_vendor.p({
      Goods: $data.Goods,
      price: $data.price
    }),
    M: !$data.flag
  }, !$data.flag ? {
    N: common_vendor.p({
      status: "loading"
    })
  } : {
    O: common_vendor.p({
      status: "noMore"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cdccd9b4"], ["__file", "D:/HBuilderXProject/ZLHome/pages/good/good.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
