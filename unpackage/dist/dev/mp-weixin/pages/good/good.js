"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      currents: null,
      current: null,
      num: 0,
      num1: [],
      minvalue: "",
      maxvalue: "",
      isChoose: true,
      noChoose: false,
      flagg: true,
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
      psort: 0,
      gws: 0
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
  async onShow() {
    let user = common_vendor.index.getStorageSync("user");
    let carnum = await common_js_http.requestPost(`/api/api/get_cart_num?company_id=${user.company_id}`);
    this.gws = carnum.data.total;
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
    async getgoodsids() {
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
      if (result.data.goods_list.length != 0) {
        this.brand = result.data.brand_list;
        this.attr = result.data.attr;
        for (let k = 0; k < result.data.attr.length; k++) {
          this.krr[k] = [];
          this.num1[k] = 0;
        }
        if (result.data.goods_list.length < 32) {
          this.flag = false;
        }
        this.Goods = [...this.Goods, ...result.data.goods_list];
        this.getgoodsids();
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
    },
    addA(m, n) {
      this.krr[n].includes(m) ? this.krr[n] = this.krr[n].filter((item) => item !== m) : this.krr[n].push(m);
      this.num1[n] = this.krr[n].length;
      this.arr.includes(m) ? this.arr = this.arr.filter((item) => item !== m) : this.arr.push(m);
      this.currents = n;
      this.flag2 = false;
    },
    addB(m) {
      this.brr.includes(m) ? this.brr = this.brr.filter((item) => item !== m) : this.brr.push(m);
      this.num = this.brr.length;
      this.flag3 = false;
    },
    reset() {
      this.arr.length = 0;
      this.brr.length = 0;
      this.a = "";
      this.b = "";
      this.num = 0;
      this.num1.forEach((item, idx) => this.num1[idx] = 0);
      this.minvalue = "";
      this.maxvalue = "";
      this.Goods.length = 0;
      this.getgoodList();
      this.flag2 = true;
      this.flag3 = true;
    },
    sure() {
      this.arr.forEach((item) => this.a = item + "^" + this.a);
      this.brr.forEach((item) => this.b = item + "^" + this.b);
      this.pn = this.minvalue;
      this.px = this.maxvalue;
      this.Goods.length = 0;
      this.getgoodList();
      this.$refs.showRight.close();
      this.selectAllComponents(".item").map((item) => {
        item.toggle(false);
      });
    },
    currentClick(k) {
      this.flage = !this.flage;
      this.psort = 6;
      this.Goods.length = 0;
      this.getgoodList();
    },
    open() {
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
      k == 1 ? this.psort = 1 : this.psort = 2;
      this.Goods.length = 0;
      this.price.length = 0;
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
    },
    setTitle(name) {
      common_vendor.index.setNavigationBarTitle({
        title: "\u3010" + name + "\u3011" + name + "\u54C1\u724C_" + name + "\u4EF7\u683C_" + name + "\u56FE\u7247-\u4F50\u7F57\u4F18\u9009\u8D85\u503C\u70ED\u5356"
      });
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
    this.num1.length = 0;
    options.name && !options.pinyin ? this.value = options.name : this.value;
    if (options.name && !options.v && !options.pinyin) {
      this.setTitle(options.name);
      let result = await common_js_http.requestGet(`/api/api/search/?v=1&keywords=${options.name}`);
      this.Goods = result.data.goods_list;
      this.getgoodsids();
    }
    if (options.name && options.v) {
      this.setTitle(options.name);
      let result = await common_js_http.requestGet(`/api/api/search/?v=${options.v}&b=${options.b}`);
      console.log(result, "xxxxxxxxxxx111111");
      this.Goods = result.data.goods_list;
      this.getgoodsids();
    } else if (options.chinese && options.pinyin) {
      this.type = options.pinyin;
      this.value = options.chinese;
      this.setTitle(options.chinese);
      this.getgoodList();
    } else if (options.chinese && !options.pinyin) {
      this.value = options.chinese;
    } else if (options.keywords) {
      this.value = options.keywords;
      this.setTitle(options.keywords);
      let result = await common_js_http.requestGet("/api/api/search/?v=1&keywords=" + options.keywords + "&XcxSessKey=%20&company_id=7194");
      this.Goods = result.data.goods_list;
      this.getgoodsids();
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _component_van_dropdown_item = common_vendor.resolveComponent("van-dropdown-item");
  const _component_van_dropdown_menu = common_vendor.resolveComponent("van-dropdown-menu");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  const _component_van_button = common_vendor.resolveComponent("van-button");
  const _easycom_goodList2 = common_vendor.resolveComponent("goodList");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_icons2 + _easycom_uni_badge2 + _component_van_dropdown_item + _component_van_dropdown_menu + _easycom_uni_drawer2 + _component_van_button + _easycom_goodList2 + _easycom_uni_load_more2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
const _easycom_goodList = () => "../../components/goodList/goodList.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_badge + _easycom_uni_drawer + _easycom_goodList + _easycom_uni_load_more)();
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
    d: common_vendor.o($options.tocart),
    e: common_vendor.p({
      type: "cart",
      size: "30"
    }),
    f: common_vendor.p({
      size: "small",
      text: $data.gws,
      absolute: "rightTop",
      type: "error"
    }),
    g: common_vendor.o(($event) => $options.tosearch()),
    h: common_vendor.o(($event) => $options.menu($data.value1)),
    i: common_vendor.p({
      value: $data.value1,
      options: $data.option1
    }),
    j: common_vendor.o(($event) => $options.currentClick(_ctx.value6)),
    k: $data.flage ? 1 : "",
    l: common_vendor.o(($event) => $options.bottomClick(1)),
    m: common_vendor.p({
      type: "bottom",
      size: "8"
    }),
    n: common_vendor.o(($event) => $options.bottomClick(2)),
    o: common_vendor.p({
      type: "top",
      size: "8"
    }),
    p: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-shaixuan",
      size: "14"
    }),
    q: common_vendor.o((...args) => $options.showDrawer && $options.showDrawer(...args)),
    r: common_vendor.t($data.flag3 ? "\u53EF\u591A\u9009" : $data.num == 0 ? "\u53EF\u591A\u9009" : `\u5DF2\u9009${$data.num}\u9879`),
    s: common_vendor.o((...args) => $options.showTag && $options.showTag(...args)),
    t: common_vendor.f($data.brand, (item, k0, i0) => {
      return {
        a: item.brand_logo_url,
        b: item.brand_id,
        c: common_vendor.o(($event) => $options.addB(item.brand_id), item.brand_id),
        d: $data.brr.indexOf(item.brand_id) != -1 ? "red" : "#eee"
      };
    }),
    v: !$data.flag ? 1 : "",
    w: common_vendor.f($data.attr, (item, idx, i0) => {
      return {
        a: common_vendor.t(item.attr_name),
        b: common_vendor.t($data.flag2 ? "\u53EF\u591A\u9009" : $data.currents == idx ? $data.num1[idx] != 0 ? `\u5DF2\u9009${$data.num1[idx]}\u9879` : "\u53EF\u591A\u9009" : !$data.num1[idx] ? "\u53EF\u591A\u9009" : $data.num1[idx] == 0 ? "\u53EF\u591A\u9009" : `\u5DF2\u9009${$data.num1[idx]}\u9879`),
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
    x: common_vendor.o((...args) => $options.onminPrice && $options.onminPrice(...args)),
    y: $data.minvalue,
    z: common_vendor.o((...args) => $options.onmaxPrice && $options.onmaxPrice(...args)),
    A: $data.maxvalue,
    B: common_vendor.o((...args) => $options.reset && $options.reset(...args)),
    C: common_vendor.o((...args) => $options.sure && $options.sure(...args)),
    D: common_vendor.sr("showRight", "cdccd9b4-8"),
    E: common_vendor.p({
      mode: "right",
      width: "320",
      ["mask-click"]: true
    }),
    F: common_vendor.f($data.brand, (item, index, i0) => {
      return {
        a: common_vendor.t(item.brand_name),
        b: common_vendor.o(($event) => $options.addB(item.brand_id)),
        c: $data.brr.indexOf(item.brand_id) != -1 ? "red" : "#333",
        d: "cdccd9b4-11-" + i0 + ",cdccd9b4-10",
        e: $data.brr.indexOf(item.brand_id) != -1 ? $data.isChoose : $data.noChoose,
        f: item.brand_id
      };
    }),
    G: common_vendor.p({
      type: "checkmarkempty",
      color: "red",
      size: "20"
    }),
    H: common_vendor.p({
      block: true
    }),
    I: common_vendor.o((...args) => $options.reset && $options.reset(...args)),
    J: common_vendor.p({
      type: "danger",
      block: true
    }),
    K: common_vendor.o((...args) => $options.sure && $options.sure(...args)),
    L: common_vendor.p({
      title: "\u54C1\u724C"
    }),
    M: common_vendor.f($data.attr, (item, index, i0) => {
      return {
        a: common_vendor.f(item.attr_list, (att, idx, i1) => {
          return {
            a: common_vendor.t(att.attr_value),
            b: common_vendor.o(($event) => $options.addA(att.attr_value_id, index)),
            c: $data.arr.indexOf(att.attr_value_id) != -1 ? "red" : "#333",
            d: "cdccd9b4-15-" + i0 + "-" + i1 + "," + ("cdccd9b4-14-" + i0),
            e: $data.arr.indexOf(att.attr_value_id) != -1 ? $data.isChoose : $data.noChoose,
            f: att.attr_value_id
          };
        }),
        b: "cdccd9b4-16-" + i0 + "," + ("cdccd9b4-14-" + i0),
        c: "cdccd9b4-17-" + i0 + "," + ("cdccd9b4-14-" + i0),
        d: item.attr_id,
        e: "cdccd9b4-14-" + i0 + ",cdccd9b4-9",
        f: common_vendor.p({
          title: item.attr_name
        })
      };
    }),
    N: common_vendor.p({
      type: "checkmarkempty",
      color: "red",
      size: "20"
    }),
    O: common_vendor.p({
      block: true
    }),
    P: common_vendor.o((...args) => $options.reset && $options.reset(...args)),
    Q: common_vendor.p({
      type: "danger",
      block: true
    }),
    R: common_vendor.o((...args) => $options.sure && $options.sure(...args)),
    S: common_vendor.n($data.temp == 1 ? "boxStyle" : ""),
    T: common_vendor.p({
      Goods: $data.Goods,
      price: $data.price,
      psort: $data.psort
    }),
    U: !$data.flagg
  }, !$data.flagg ? {
    V: common_vendor.p({
      status: "loading"
    })
  } : {
    W: common_vendor.p({
      status: "noMore"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-cdccd9b4"], ["__file", "D:/HBuilderXProject/ZLHome/pages/good/good.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
