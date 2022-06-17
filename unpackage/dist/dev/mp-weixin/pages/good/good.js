"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      currents: null,
      current: null,
      num: 0,
      num1: [0, 0, 0, 0],
      minvalue: "",
      maxvalue: "",
      isChoose: true,
      noChoose: false,
      num: null,
      temp: 0,
      myScroll: 0,
      type: "",
      icons: false,
      value: "",
      flag: true,
      flag1: true,
      flage: false,
      flag2: true,
      flag3: true,
      Goods: [],
      brand: [],
      attr: [],
      goods_ids: "",
      price: [],
      brr: [],
      arr: [],
      krr: [[]],
      a: "",
      b: "",
      p: 1,
      pn: "",
      px: "",
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
    this.selectAllComponents(".item").map((item) => {
      item.toggle(false);
    });
  },
  created() {
    this.getgoodList();
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
        b: this.b,
        psort: this.psort,
        pn: this.pn,
        px: this.px
      });
      if (result.data.goods_list.length > 0) {
        this.brand = result.data.brand_list;
        this.attr = result.data.attr;
        for (let k = 0; k < result.data.attr.length; k++) {
          this.krr[k] = [];
        }
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
      } else {
        common_vendor.index.showToast({
          title: "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86",
          image: "/static/icon/err.png",
          duration: 2e3
        });
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
    show1Tag(idx) {
      this.current = idx;
      this.flag1 = !this.flag1;
      console.log(this.attr);
    },
    addA(m, n) {
      if (this.krr[n].includes(m)) {
        this.krr[n] = this.krr[n].filter((item) => item !== m);
      } else {
        this.krr[n].push(m);
      }
      this.num1[n] = this.krr[n].length;
      console.log(this.num1, "ccccccccccccccccccccc");
      if (this.arr.includes(m)) {
        this.arr = this.arr.filter((item) => item !== m);
      } else {
        this.arr.push(m);
      }
      console.log(this.arr);
      this.currents = n;
      this.flag2 = false;
    },
    addB(m) {
      if (this.brr.includes(m)) {
        this.brr = this.brr.filter((item) => item !== m);
      } else {
        this.brr.push(m);
      }
      this.num = this.brr.length;
      this.flag3 = false;
    },
    reset() {
      this.arr = [];
      this.brr = [];
      this.a = "";
      this.b = "";
      this.num = 0;
      this.num1 = 0;
      this.minvalue = "";
      this.maxvalue = "";
      this.Goods = [];
      this.getgoodList();
      this.flag2 = true;
      this.flag3 = true;
    },
    sure() {
      this.arr.forEach((item) => this.a = item + "^" + this.a);
      this.brr.forEach((item) => this.b = item + "^" + this.b);
      this.pn = this.minvalue;
      this.px = this.maxvalue;
      this.Goods = [];
      this.getgoodList();
      this.$refs.showRight.close();
      this.selectAllComponents(".item").map((item) => {
        item.toggle(false);
      });
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
      if (this.value1 == 0) {
        this.value1 = 1;
        this.psort = 4;
      } else {
        this.value1 = 0;
        this.psort = 0;
      }
      this.Goods = [];
      this.getgoodList();
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
      this.goods_ids = "";
      this.getgoodList();
    },
    onminPrice(e) {
      this.minvalue = e.detail.value;
      console.log(e, e.detail.value);
    },
    onmaxPrice(e) {
      this.maxvalue = e.detail.value;
      console.log(e, e.detail.value);
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
    } else if (options.keywords) {
      let result = await common_js_http.requestGet("/api/api/search/?v=1&keywords=" + options.keywords + "&XcxSessKey=%20&company_id=7194");
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
    q: common_vendor.t($data.flag3 ? "\u53EF\u591A\u9009" : `\u5DF2\u9009${$data.num}\u9879`),
    r: common_vendor.o((...args) => $options.showTag && $options.showTag(...args)),
    s: common_vendor.f($data.brand, (item, k0, i0) => {
      return {
        a: item.brand_logo_url,
        b: item.brand_id,
        c: common_vendor.o(($event) => $options.addB(item.brand_id), item.brand_id),
        d: $data.brr.indexOf(item.brand_id) != -1 ? "red" : "#eee"
      };
    }),
    t: !$data.flag ? 1 : "",
    v: common_vendor.f($data.attr, (item, idx, i0) => {
      return {
        a: common_vendor.t(item.attr_name),
        b: common_vendor.t($data.flag2 ? "\u53EF\u591A\u9009" : $data.currents == idx ? `\u5DF2\u9009${$data.num1[idx]}\u9879` : "\u53EF\u591A\u9009"),
        c: common_vendor.o(($event) => $options.show1Tag(idx)),
        d: common_vendor.f(item.attr_list, (list, k1, i1) => {
          return {
            a: common_vendor.t(list.attr_value),
            b: common_vendor.o(($event) => $options.addA(list.attr_value_id, idx), list.attr_value_id),
            c: list.attr_value_id,
            d: $data.arr.indexOf(list.attr_value_id) != -1 ? "red" : "#333"
          };
        }),
        e: common_vendor.n($data.flag1 ? $data.current == idx ? "active" : "attr_text" : false),
        f: item.attr_id
      };
    }),
    w: common_vendor.o((...args) => $options.onminPrice && $options.onminPrice(...args)),
    x: $data.minvalue,
    y: common_vendor.o((...args) => $options.onmaxPrice && $options.onmaxPrice(...args)),
    z: $data.maxvalue,
    A: common_vendor.o((...args) => $options.reset && $options.reset(...args)),
    B: common_vendor.o((...args) => $options.sure && $options.sure(...args)),
    C: common_vendor.sr("showRight", "cdccd9b4-7"),
    D: common_vendor.p({
      mode: "right",
      width: "320",
      ["mask-click"]: true
    }),
    E: common_vendor.f($data.brand, (item, index, i0) => {
      return {
        a: common_vendor.t(item.brand_name),
        b: common_vendor.o(($event) => $options.addB(item.brand_id)),
        c: $data.brr.indexOf(item.brand_id) != -1 ? "red" : "#333",
        d: "cdccd9b4-10-" + i0 + ",cdccd9b4-9",
        e: $data.brr.indexOf(item.brand_id) != -1 ? $data.isChoose : $data.noChoose,
        f: item.brand_id
      };
    }),
    F: common_vendor.p({
      type: "checkmarkempty",
      color: "red",
      size: "20"
    }),
    G: common_vendor.p({
      block: true
    }),
    H: common_vendor.o((...args) => $options.reset && $options.reset(...args)),
    I: common_vendor.p({
      type: "danger",
      block: true
    }),
    J: common_vendor.o((...args) => $options.sure && $options.sure(...args)),
    K: common_vendor.p({
      title: "\u54C1\u724C"
    }),
    L: common_vendor.f($data.attr, (item, k0, i0) => {
      return {
        a: common_vendor.f(item.attr_list, (att, idx, i1) => {
          return {
            a: common_vendor.t(att.attr_value),
            b: common_vendor.o(($event) => $options.addA(att.attr_value_id, idx)),
            c: $data.arr.indexOf(att.attr_value_id) != -1 ? "red" : "#333",
            d: "cdccd9b4-14-" + i0 + "-" + i1 + "," + ("cdccd9b4-13-" + i0),
            e: $data.arr.indexOf(att.attr_value_id) != -1 ? $data.isChoose : $data.noChoose,
            f: att.attr_value_id
          };
        }),
        b: "cdccd9b4-15-" + i0 + "," + ("cdccd9b4-13-" + i0),
        c: "cdccd9b4-16-" + i0 + "," + ("cdccd9b4-13-" + i0),
        d: item.attr_id,
        e: "cdccd9b4-13-" + i0 + ",cdccd9b4-8",
        f: common_vendor.p({
          title: item.attr_name
        })
      };
    }),
    M: common_vendor.p({
      type: "checkmarkempty",
      color: "red",
      size: "20"
    }),
    N: common_vendor.p({
      block: true
    }),
    O: common_vendor.o((...args) => $options.reset && $options.reset(...args)),
    P: common_vendor.p({
      type: "danger",
      block: true
    }),
    Q: common_vendor.o((...args) => $options.sure && $options.sure(...args)),
    R: common_vendor.n($data.temp == 1 ? "boxStyle" : ""),
    S: common_vendor.p({
      Goods: $data.Goods,
      price: $data.price,
      psort: $data.psort
    }),
    T: !$data.flag
  }, !$data.flag ? {
    U: common_vendor.p({
      status: "loading"
    })
  } : {
    V: common_vendor.p({
      status: "noMore"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cdccd9b4"], ["__file", "D:/HBuilderXProject/ZLHome/pages/good/good.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
