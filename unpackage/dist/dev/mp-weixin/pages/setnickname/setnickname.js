"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      keywords: ""
    };
  },
  created() {
    this.show();
  },
  methods: {
    show() {
      this.keywords = common_vendor.index.getStorageSync("user").alias;
    },
    onKeyInput: function(event) {
      this.keywords = event.detail.value;
    },
    async edit() {
      await common_js_http.requestPost("/api/api/user/edit", {
        "alias": this.keywords
      });
      let result2 = await common_js_http.requestPost("/api/getUserRole");
      common_vendor.index.setStorageSync("user", result2.data);
      common_vendor.index.navigateBack({
        delta: 1
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.onKeyInput && $options.onKeyInput(...args)),
    b: $data.keywords,
    c: common_vendor.o((...args) => $options.edit && $options.edit(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-79c2b328"], ["__file", "D:/HBuilderXProject/ZLHome/pages/setnickname/setnickname.vue"]]);
wx.createPage(MiniProgramPage);
