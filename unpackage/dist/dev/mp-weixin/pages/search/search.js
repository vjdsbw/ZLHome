"use strict";
var common_js_http = require("../../common/js/http.js");
var common_vendor = require("../../common/vendor.js");
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
      newbrands: []
    };
  },
  methods: {
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
      let result2 = await common_js_http.requestGet(`/api/api/category-` + this.type + `v=1&XcxSessKey=%20&company_id=7194`);
      console.log(result2);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.onKeyInput && $options.onKeyInput(...args)),
    b: common_vendor.o((...args) => $options.search && $options.search(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/zuolo/pages/search/search.vue"]]);
wx.createPage(MiniProgramPage);
