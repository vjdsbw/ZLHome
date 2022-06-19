"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      title: [],
      lists: [],
      currentIndex: 0,
      doms: "",
      topList: [],
      gws: 0
    };
  },
  created() {
    this.getList();
    this.getListContent().then(() => {
      this.getNodesInfo();
    });
  },
  onLoad() {
  },
  async onShow() {
    let user = common_vendor.index.getStorageSync("user");
    let carnum = await common_js_http.requestPost(`/api/api/get_cart_num?company_id=${user.company_id}`);
    this.gws = carnum.data.total;
  },
  onReady() {
  },
  methods: {
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
    async getList() {
      let result = await common_js_http.requestGet("/api/m/index/cate_list");
      this.title = result.data;
    },
    async getListContent() {
      let result = await common_js_http.requestGet("/api/m/index/cate_list?XcxSessKey=%20&company_id=7194");
      this.lists = result.data;
    },
    goCart() {
      common_vendor.index.navigateTo({
        url: "/pages/cart/cart"
      });
    },
    goGood(pinyin, chinese) {
      pinyin = pinyin.split("-")[1].split("/")[0];
      common_vendor.index.navigateTo({
        url: `/pages/good/good?pinyin=${pinyin}&chinese=${chinese}`
      });
    },
    leftClick(idx, item) {
      this.currentIndex = idx;
      this.doms = "po" + idx;
    },
    scrolltolower() {
      setTimeout(() => {
        this.currentIndex = 11;
      }, 500);
    },
    scrolls(e) {
      let scrollTop = e.target.scrollTop;
      for (let i = 0; i < this.topList.length; i++) {
        let h1 = this.topList[i];
        let h2 = this.topList[i + 1];
        if (scrollTop >= h1 && scrollTop < h2) {
          this.currentIndex = i;
        }
      }
    },
    getNodesInfo() {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.selectAll(".right-scroll-item").boundingClientRect().exec((res) => {
        let nodes = res[0];
        let rel = [];
        nodes.map((item) => {
          rel.push(item.top);
        });
        this.topList = rel;
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2 + _easycom_uni_badge2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons + _easycom_uni_badge)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(_ctx.search),
    b: common_vendor.p({
      placeholder: "\u8F93\u5165\u5546\u54C1\u5206\u7C7B\u3001\u540D\u79F0",
      radius: 100,
      cancelButton: "none"
    }),
    c: common_vendor.o((...args) => _ctx.tosearch && _ctx.tosearch(...args)),
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
    g: common_vendor.f($data.title, (item, idx, i0) => {
      return {
        a: common_vendor.t(item.desc),
        b: common_vendor.n({
          active: $data.currentIndex === idx
        }),
        c: item.id,
        d: common_vendor.o(($event) => $options.leftClick(idx, item), item.id)
      };
    }),
    h: common_vendor.f($data.lists, (item, index, i0) => {
      return {
        a: common_vendor.t(item.desc),
        b: common_vendor.f(item.cat_list, (item1, index1, i1) => {
          return {
            a: item1.image_url,
            b: common_vendor.t(item1.desc_three),
            c: item1.id,
            d: common_vendor.o(($event) => $options.goGood(item1.url_type, item1.name), item1.id)
          };
        }),
        c: index,
        d: "po" + index
      };
    }),
    i: $data.doms,
    j: common_vendor.o((...args) => $options.scrolls && $options.scrolls(...args)),
    k: common_vendor.o((...args) => $options.scrolltolower && $options.scrolltolower(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a1ddb074"], ["__file", "D:/HBuilderXProject/ZLHome/pages/sort/sort.vue"]]);
wx.createPage(MiniProgramPage);
