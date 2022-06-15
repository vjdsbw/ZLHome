"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      keywords: "",
      category_list: [],
      type: "",
      info: [],
      current: 0,
      mode: "round",
      bed: [],
      goodsthing: [],
      newbrands: [],
      viewto: "",
      currentIndex: 0,
      currentIndex2: 0,
      brandlists: [],
      catelist: [],
      is_fixed: false,
      cate_fixed: false,
      Goods: [],
      brand: [],
      attr: [],
      p: 1,
      flag: true,
      choosebrandlist: [
        "keting",
        "woshi",
        "canting",
        "ertongfang",
        "shufang",
        "jiancai",
        "dengshi",
        "weiyu",
        "jiafang",
        "jiashi"
      ]
    };
  },
  created() {
    this.getSwipers();
    this.getgoodList();
  },
  methods: {
    todetail(id) {
      console.log(id);
      common_vendor.index.navigateTo({
        url: `/pages/gooddetail/gooddetail?id=${id}`,
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    },
    async getgoodList() {
      var temp = this.choosebrandlist[this.currentIndex2];
      let result = await common_js_http.requestGet(`/api/api/category-${temp}/`, {
        p: this.p
      });
      console.log(result);
      if (result) {
        this.brand = result.data.brand_list;
        this.attr = result.data.attr;
        if (result.data.goods_list.length < 32) {
          this.flag = false;
        } else {
          this.Goods = result.data.goods_list;
        }
      } else {
        this.Goods = [];
      }
    },
    onReachBottom() {
      if (this.flag) {
        this.p++;
        this.getgoodList();
      }
    },
    choosecate(id) {
      this.currentIndex2 = id;
      this.getgoodList();
    },
    jumpTo(id) {
      this.viewto = "s" + id;
      this.currentIndex = id;
    },
    change(e) {
      this.current = e.detail.current;
    },
    tosearch() {
      console.log("xxxx");
      common_vendor.index.navigateTo({
        url: "/pages/search/search",
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    },
    toBed() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search",
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    },
    async getSwipers() {
      await common_js_http.requestPost("/api/m/index/cate", {
        "biao": "keting"
      });
      let result2 = await common_js_http.requestPost("/api/x/index/index");
      await common_js_http.requestGet("/api/api/category-chuang/?v=1&XcxSessKey=%20&company_id=7194");
      let brandlist = await common_js_http.requestPost("/api/x/index/index_two");
      this.bed = result2.data.cate;
      this.info = result2.data.banner;
      this.goodsthing = result2.data.goodsthing;
      this.newbrands = result2.data.newbrands;
      this.brandlists = brandlist.data.style_manage;
      this.catelist = brandlist.data.cat_tab;
    }
  },
  onPageScroll(res) {
    if (res.scrollTop >= 100) {
      this.is_fixed = true;
    } else {
      this.is_fixed = false;
    }
    if (res.scrollTop >= 7e3) {
      this.cate_fixed = true;
    } else {
      this.cate_fixed = false;
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_goodList2 = common_vendor.resolveComponent("goodList");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_easyinput2 + _easycom_uni_icons2 + _easycom_uni_swiper_dot2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_goodList2 + _easycom_uni_load_more2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_goodList = () => "../../components/goodList/goodList.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_icons + _easycom_uni_swiper_dot + _easycom_uni_list_item + _easycom_uni_list + _easycom_goodList + _easycom_uni_load_more)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.is_fixed == true
  }, $data.is_fixed == true ? {
    b: common_vendor.p({
      disabled: true,
      prefixIcon: "search",
      placeholder: "\u8F93\u5165\u54C1\u724C\u6216\u4EA7\u54C1\u578B\u53F7",
      inputBorder: "false"
    }),
    c: common_vendor.o(($event) => $options.tosearch())
  } : {}, {
    d: common_vendor.p({
      disabled: true,
      prefixIcon: "search",
      placeholder: "\u8F93\u5165\u54C1\u724C\u6216\u4EA7\u54C1\u578B\u53F7",
      inputBorder: "false"
    }),
    e: common_vendor.o(($event) => $options.tosearch()),
    f: common_vendor.p({
      type: "cart",
      size: "30"
    }),
    g: common_vendor.f($data.info, (item, k0, i0) => {
      return {
        a: item.image_xcx,
        b: item.id
      };
    }),
    h: common_vendor.o((...args) => $options.change && $options.change(...args)),
    i: common_vendor.p({
      info: $data.info,
      current: $data.current,
      field: "content",
      mode: $data.mode
    }),
    j: common_vendor.f($data.bed, (item, k0, i0) => {
      return {
        a: item.image_xcx,
        b: common_vendor.t(item.desc),
        c: item.id,
        d: common_vendor.o((...args) => $options.toBed && $options.toBed(...args), item.id)
      };
    }),
    k: $data.currentIndex === 4 ? 1 : "",
    l: common_vendor.o(($event) => $options.jumpTo(4)),
    m: $data.currentIndex === 3 ? 1 : "",
    n: common_vendor.o(($event) => $options.jumpTo(3)),
    o: $data.currentIndex === 2 ? 1 : "",
    p: common_vendor.o(($event) => $options.jumpTo(2)),
    q: $data.currentIndex === 1 ? 1 : "",
    r: common_vendor.o(($event) => $options.jumpTo(1)),
    s: $data.currentIndex === 0 ? 1 : "",
    t: common_vendor.o(($event) => $options.jumpTo(0)),
    v: common_vendor.f($data.goodsthing, (item, index, i0) => {
      return {
        a: common_vendor.f(item.sub_list, (i, k1, i1) => {
          return {
            a: i.image_xcx,
            b: common_vendor.t(i.brand),
            c: common_vendor.t(i.goods_desc),
            d: common_vendor.t(i.shop_price),
            e: common_vendor.o(($event) => $options.todetail(i.goods_id), i.id),
            f: i.id
          };
        }),
        b: index,
        c: `s${index}`
      };
    }),
    w: $data.viewto,
    x: common_vendor.p({
      title: "\u54C1\u724C\u4E0A\u65B0",
      link: "reLaunch",
      to: "/pages/brand/brand",
      rightText: "\u66F4\u591A"
    }),
    y: common_vendor.f($data.newbrands, (item, k0, i0) => {
      return {
        a: item.image_xcx,
        b: common_vendor.t(item.desc),
        c: common_vendor.t(item.desc_t),
        d: item.id
      };
    }),
    z: common_vendor.f($data.brandlists, (item, index, i0) => {
      return {
        a: common_vendor.t(item.desc.split("|").join("")),
        b: common_vendor.t(item.desc_t),
        c: common_vendor.f(item.goods.goods_list, (j, k1, i1) => {
          return {
            a: j.image_xcx_702,
            b: common_vendor.t(j.brand),
            c: common_vendor.t(j.desc_t),
            d: common_vendor.t(j.shop_price),
            e: common_vendor.o(($event) => $options.todetail(j.goods_id), j.id),
            f: j.id
          };
        }),
        d: common_vendor.t(item.brand.tab_name),
        e: common_vendor.f(item.brand.list, (i, k1, i1) => {
          return {
            a: i.image_xcx,
            b: i.image_2_xcx,
            c: common_vendor.t(i.desc_t),
            d: i.id
          };
        }),
        f: index
      };
    }),
    A: common_vendor.f($data.catelist, (item, idx, i0) => {
      return {
        a: common_vendor.t(item.desc),
        b: common_vendor.t(item.desc_t),
        c: $data.currentIndex2 === idx ? 1 : "",
        d: common_vendor.o(($event) => $options.choosecate(idx)),
        e: item.id
      };
    }),
    B: $data.cate_fixed == true ? 1 : "",
    C: common_vendor.p({
      Goods: $data.Goods
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-57280228"], ["__file", "C:/Study/geek/15.uni-app/ZLHome/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
