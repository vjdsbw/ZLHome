"use strict";
var common_vendor = require("../../common/vendor.js");
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
      this.keywords = common_vendor.index.getStorageSync("user").user_name;
    },
    onKeyInput: function(event) {
      this.keywords = event.detail.value;
    },
    edit() {
      let result = common_vendor.index.getStorageSync("user");
      result.user_name = this.keywords;
      common_vendor.index.setStorageSync("user", result);
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-79c2b328"], ["__file", "C:/Users/dell/Desktop/ZLHome/pages/setnickname/setnickname.vue"]]);
wx.createPage(MiniProgramPage);
