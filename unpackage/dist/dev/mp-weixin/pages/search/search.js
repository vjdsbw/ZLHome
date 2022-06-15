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
      if (this.type == "") {
        common_vendor.index.showToast({
          title: `\u62B1\u6B49\uFF0C\u6CA1\u6709\u627E\u5230\u76F8\u5173\u5546\u54C1`
        });
      } else {
        let result2 = await common_js_http.requestGet(`/api/api/category-` + this.type + `/?v=1&XcxSessKey=%20&company_id=7194`);
        console.log(result2.data);
      }
      this.searchlist.push(this.keywords);
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
    d: common_vendor.o(($event) => _ctx.GoGoodList("chuang")),
    e: common_vendor.o(($event) => _ctx.GoGoodList("chuangdian")),
    f: common_vendor.o(($event) => _ctx.GoGoodList("canzhuo")),
    g: common_vendor.o(($event) => _ctx.GoGoodList("shafa")),
    h: common_vendor.o(($event) => _ctx.GoGoodList("yigui")),
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4cedc0c6"], ["__file", "C:/Study/geek/15.uni-app/ZLHome/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
