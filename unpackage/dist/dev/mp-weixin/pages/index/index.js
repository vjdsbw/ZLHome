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
      brandlists: [],
      catelist: [],
      active: "keting"
    };
  },
  created() {
    this.getSwipers();
  },
  methods: {
    changeactive(name) {
      console.log(name);
    },
    jumpTo(id) {
      this.viewto = "s" + id;
      this.currentIndex = id;
    },
    change(e) {
      this.current = e.detail.current;
    },
    tosearch() {
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
      this.catelist = brandlist.data.cat_tab.slice(0, 5);
      console.log(this.catelist);
    },
    onKeyInput: function(event) {
      this.keywords = event.detail.value;
    },
    async search() {
      let result = await common_js_http.requestGet(`/api/api/search?keywords=` + this.keywords);
      this.category_list = result.data.category_list;
      for (let i = 0; i < this.category_list.length; i++) {
        if (this.category_list[i].keywords.match(this.keywords)) {
          this.type = this.category_list[i].pinyin;
        } else {
          for (let j = 0; j < this.category_list[i].item.length; j++) {
            if (this.category_list[i].item[j].keywords.match(this.keywords)) {
              this.type = this.category_list[i].item[j].pinyin;
            }
          }
        }
      }
      await common_js_http.requestGet(`/api/api/category-` + this.type + `v=1&XcxSessKey=%20&company_id=7194`);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_swiper_dot2 = common_vendor.resolveComponent("uni-swiper-dot");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _component_van_tab = common_vendor.resolveComponent("van-tab");
  const _component_van_tabs = common_vendor.resolveComponent("van-tabs");
  (_easycom_uni_icons2 + _easycom_uni_swiper_dot2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _component_van_tab + _component_van_tabs)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_swiper_dot = () => "../../uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_swiper_dot + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.tosearch && $options.tosearch(...args)),
    b: common_vendor.p({
      type: "cart",
      size: "30"
    }),
    c: common_vendor.f($data.info, (item, k0, i0) => {
      return {
        a: item.image_xcx,
        b: item.id
      };
    }),
    d: common_vendor.o((...args) => $options.change && $options.change(...args)),
    e: common_vendor.p({
      info: $data.info,
      current: $data.current,
      field: "content",
      mode: $data.mode
    }),
    f: common_vendor.f($data.bed, (item, k0, i0) => {
      return {
        a: item.image_xcx,
        b: common_vendor.t(item.desc),
        c: item.id,
        d: common_vendor.o((...args) => $options.toBed && $options.toBed(...args), item.id)
      };
    }),
    g: $data.currentIndex === 4 ? 1 : "",
    h: common_vendor.o(($event) => $options.jumpTo(4)),
    i: $data.currentIndex === 3 ? 1 : "",
    j: common_vendor.o(($event) => $options.jumpTo(3)),
    k: $data.currentIndex === 2 ? 1 : "",
    l: common_vendor.o(($event) => $options.jumpTo(2)),
    m: $data.currentIndex === 1 ? 1 : "",
    n: common_vendor.o(($event) => $options.jumpTo(1)),
    o: $data.currentIndex === 0 ? 1 : "",
    p: common_vendor.o(($event) => $options.jumpTo(0)),
    q: common_vendor.f($data.goodsthing, (item, index, i0) => {
      return {
        a: common_vendor.f(item.sub_list, (i, k1, i1) => {
          return {
            a: i.image_xcx,
            b: common_vendor.t(i.brand),
            c: common_vendor.t(i.goods_desc),
            d: common_vendor.t(i.shop_price),
            e: i.id
          };
        }),
        b: index,
        c: `s${index}`
      };
    }),
    r: $data.viewto,
    s: common_vendor.p({
      title: "\u54C1\u724C\u4E0A\u65B0",
      link: "reLaunch",
      to: "/pages/brand/brand",
      rightText: "\u66F4\u591A"
    }),
    t: common_vendor.f($data.newbrands, (item, k0, i0) => {
      return {
        a: item.image_xcx,
        b: common_vendor.t(item.desc),
        c: common_vendor.t(item.desc_t),
        d: item.id
      };
    }),
    v: common_vendor.f($data.brandlists, (item, index, i0) => {
      return {
        a: common_vendor.t(item.desc.split("|").join("")),
        b: common_vendor.t(item.desc_t),
        c: common_vendor.f(item.goods.goods_list, (j, k1, i1) => {
          return {
            a: j.image_xcx_702,
            b: common_vendor.t(j.desc_t),
            c: common_vendor.t(j.shop_price),
            d: j.id
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
    w: common_vendor.p({
      title: "\u6807\u7B7E 1"
    }),
    x: common_vendor.p({
      title: "\u6807\u7B7E 2"
    }),
    y: common_vendor.p({
      title: "\u6807\u7B7E 3"
    }),
    z: common_vendor.p({
      title: "\u6807\u7B7E 4"
    }),
    A: common_vendor.o(($event) => $data.active = $event),
    B: common_vendor.p({
      active: $data.active
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-57280228"], ["__file", "F:/zuolo/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
