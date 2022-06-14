"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      list: [
        {
          title: "\u4E2D\u9910",
          list: ["\u76D6\u996D", "\u6252\u996D", "\u9E21\u9AA8\u5934", "\u9E21\u8089"]
        },
        {
          title: "\u897F\u9910",
          list: ["\u725B\u6392", "\u7F8A\u6392", "\u9E21\u6392", "\u732A\u6392"]
        },
        {
          title: "\u5357\u9910",
          list: ["\u80E1\u841D\u535C", "\u9752\u6912", "\u7092\u9E21\u86CB", "\u897F\u8679\u5E02"]
        },
        {
          title: "\u5317\u9910",
          list: ["\u9505\u5305\u8089", "\u8089\u5305", "\u6740\u732A\u83DC", "\u8840\u80A0"]
        }
      ],
      currentIndex: 0,
      doms: "",
      topList: []
    };
  },
  onLoad() {
  },
  onReady() {
    this.getNodesInfo();
  },
  methods: {
    scrolltolower() {
      setTimeout(() => {
        this.currentIndex = 3;
      }, 80);
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
      query.selectAll(".title").boundingClientRect().exec((res) => {
        let nodes = res[0];
        let rel = [];
        nodes.map((item) => {
          rel.push(item.top);
        });
        this.topList = rel;
      });
    },
    changeactive(index) {
      this.currentIndex = index;
      this.doms = "po" + index;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: index,
        c: $data.currentIndex == index ? 1 : "",
        d: common_vendor.o(($event) => $options.changeactive(index))
      };
    }),
    b: common_vendor.f($data.list, (items, index, i0) => {
      return {
        a: common_vendor.t(items.title),
        b: common_vendor.f(items.list, (it, index2, i1) => {
          return {
            a: common_vendor.t(it),
            b: index2
          };
        }),
        c: index,
        d: "po" + index
      };
    }),
    c: $data.doms,
    d: common_vendor.o((...args) => $options.scrolls && $options.scrolls(...args)),
    e: common_vendor.o((...args) => $options.scrolltolower && $options.scrolltolower(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/\u65E0\u9521\u524D\u7AEF\u57F9\u8BAD/\u9A6C\u54E5\u6559\u5B66/uni-app/ZLHome/pages/me/me.vue"]]);
wx.createPage(MiniProgramPage);
