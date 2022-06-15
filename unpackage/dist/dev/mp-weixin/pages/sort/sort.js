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
      topList: []
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
  onReady() {
  },
  methods: {
    async getList() {
      let result = await common_js_http.requestGet("/api/m/index/cate_list");
      this.title = result.data;
    },
    async getListContent() {
      let result = await common_js_http.requestGet("/api/m/index/cate_list?XcxSessKey=%20&company_id=7194");
      this.lists = result.data;
    },
    tosearch() {
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
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
        console.log(rel, "9999999999999999999999999");
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_search_bar2 + _easycom_uni_icons2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(_ctx.search),
    b: common_vendor.p({
      placeholder: "\u8F93\u5165\u5546\u54C1\u5206\u7C7B\u3001\u540D\u79F0",
      radius: 100,
      cancelButton: "none"
    }),
    c: common_vendor.o((...args) => $options.tosearch && $options.tosearch(...args)),
    d: common_vendor.o(_ctx.tocart),
    e: common_vendor.p({
      type: "cart",
      size: "30"
    }),
    f: common_vendor.f($data.title, (item, idx, i0) => {
      return {
        a: common_vendor.t(item.desc),
        b: common_vendor.n({
          active: $data.currentIndex === idx
        }),
        c: item.id,
        d: common_vendor.o(($event) => $options.leftClick(idx, item), item.id)
      };
    }),
    g: common_vendor.f($data.lists, (item, index, i0) => {
      return {
        a: common_vendor.t(item.desc),
        b: common_vendor.f(item.cat_list, (item1, index1, i1) => {
          return {
            a: item1.image_url,
            b: common_vendor.t(item1.desc_three),
            c: item1.id
          };
        }),
        c: index,
        d: "po" + index
      };
    }),
    h: $data.doms,
    i: common_vendor.o((...args) => $options.scrolls && $options.scrolls(...args)),
    j: common_vendor.o((...args) => $options.scrolltolower && $options.scrolltolower(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a1ddb074"], ["__file", "F:/\u65E0\u9521\u524D\u7AEF\u57F9\u8BAD/\u9A6C\u54E5\u6559\u5B66/uni-app/ZLHome/pages/sort/sort.vue"]]);
wx.createPage(MiniProgramPage);
