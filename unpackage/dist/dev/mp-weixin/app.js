"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/sort/sort.js";
  "./pages/brand/brand.js";
  "./pages/me/me.js";
  "./pages/login/login.js";
  "./pages/set/set.js";
  "./pages/gooddetail/gooddetail.js";
  "./pages/good/good.js";
  "./pages/search/search.js";
  "./pages/useredit/useredit.js";
  "./pages/setnickname/setnickname.js";
  "./pages/order/order.js";
  "./pages/address/address.js";
  "./pages/cart/cart.js";
  "./pages/mycollection/mycollection.js";
  "./pages/orderdetail/orderdetail.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("\u5F53\u524D\u7EC4\u4EF6\u4EC5\u652F\u6301 uni_modules \u76EE\u5F55\u7ED3\u6784 \uFF0C\u8BF7\u5347\u7EA7 HBuilderX \u5230 3.1.0 \u7248\u672C\u4EE5\u4E0A\uFF01");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Study/geek/15.uni-app/ZLHome/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  app.config.globalProperties.$filters = {
    formatDate: function(data) {
      const date = new Date(data);
      const day = date.getMonth().toString().padStart(2, "0") + "-" + date.getDay().toString().padStart(2, "0");
      return date.getFullYear() + "-" + day;
    }
  };
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
