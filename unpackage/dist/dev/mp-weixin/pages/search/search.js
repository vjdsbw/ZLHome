"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      searchlist: [],
      keywords: "",
      category_list: [],
      type: ""
    };
  },
  methods: {
    onKeyInput: function(event) {
      this.keywords = event.detail.value;
    },
    clean() {
      this.searchlist = [];
      this.keywords = "";
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
      this.GoGoodList(this.type, this.keywords);
      this.searchlist.push(this.keywords);
    },
    GoGoodList(pinyin, chinese) {
      console.log(pinyin, chinese);
      common_vendor.index.navigateTo({
        url: `/pages/good/good?pinyin=${pinyin}&chinese=${chinese}`
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-sousuo",
      size: "20"
    }),
    b: common_vendor.o((...args) => $options.onKeyInput && $options.onKeyInput(...args)),
    c: common_vendor.o((...args) => $options.search && $options.search(...args)),
    d: common_vendor.o(($event) => $options.GoGoodList("chuang", "\u5E8A")),
    e: common_vendor.o(($event) => $options.GoGoodList("chuangdian", "\u5E8A\u57AB")),
    f: common_vendor.o(($event) => $options.GoGoodList("canzhuo", "\u9910\u684C")),
    g: common_vendor.o(($event) => $options.GoGoodList("shafa", "\u6C99\u53D1")),
    h: common_vendor.o(($event) => $options.GoGoodList("yigui", "\u8863\u67DC")),
    i: common_vendor.o($options.clean),
    j: common_vendor.p({
      type: "trash",
      size: "20"
    }),
    k: common_vendor.f($data.searchlist, (item, indx, i0) => {
      return {
        a: common_vendor.t(item),
        b: item.idx
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4cedc0c6"], ["__file", "D:/HBuilderXProject/ZLHome/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
