"use strict";
var common_vendor = require("../../common/vendor.js");
var _imports_0 = "/static/icon/me.png";
const _sfc_main = {
  data() {
    return {
      username: "",
      imageValue: [],
      imageStyles: {
        border: {
          radius: "50%"
        }
      },
      neverchange: true,
      imgpath: ""
    };
  },
  created() {
    this.show();
  },
  updated() {
    let result = common_vendor.index.getStorageSync("user");
    if (result) {
      let result1 = common_vendor.index.getStorageSync(`img${result.user_id}`);
      if (result1) {
        this.imgpath = result1;
        this.neverchange = false;
        console.log(this.imgpath, "xxxx");
      }
    } else {
      this.imgpath = "";
      this.neverchange = true;
    }
  },
  onShow() {
    this.show();
  },
  methods: {
    judget() {
      let result = common_vendor.index.getStorageSync("user");
      if (result) {
        this.changeImage();
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
    },
    changeImage() {
      var _this = this;
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["original"],
        sourceType: ["album"],
        success: function(res) {
          let result = common_vendor.index.getStorageSync("user");
          _this.neverchange = "false";
          _this.imgpath = res.tempFilePaths[0];
          common_vendor.index.setStorageSync(`img${result.user_id}`, _this.imgpath);
        }
      });
    },
    gologin() {
      let result = common_vendor.index.getStorageSync("user");
      if (result) {
        common_vendor.index.navigateTo({
          url: "/pages/useredit/useredit"
        });
      } else {
        this.imgpath = "";
        this.neverchange = true;
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
    },
    show() {
      let result = common_vendor.index.getStorageSync("user");
      if (result) {
        this.username = result.user_name;
      } else {
        this.username = "\u70B9\u51FB\u767B\u5F55";
      }
    },
    goSet() {
      let result = common_vendor.index.getStorageSync("user");
      if (result) {
        common_vendor.index.navigateTo({
          url: "/pages/set/set"
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/login/login"
        });
      }
    },
    goOrder() {
      let result = common_vendor.index.getStorageSync("user");
      if (result) {
        common_vendor.index.navigateTo({
          url: "/pages/order/order"
        });
      } else {
        common_vendor.index.showToast({
          title: "\u8BF7\u5148\u767B\u5F55",
          image: "/static/icon/err.png",
          duration: 2e3
        });
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
        }, 2e3);
      }
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
  return common_vendor.e({
    a: $data.neverchange == true
  }, $data.neverchange == true ? {
    b: _imports_0
  } : {
    c: $data.imgpath
  }, {
    d: common_vendor.o((...args) => $options.judget && $options.judget(...args)),
    e: common_vendor.t($data.username),
    f: common_vendor.o((...args) => $options.gologin && $options.gologin(...args)),
    g: common_vendor.o($options.goSet),
    h: common_vendor.p({
      type: "gear-filled",
      size: "30",
      color: "white"
    }),
    i: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-ziwopingjia",
      size: "20"
    }),
    j: common_vendor.p({
      type: "right",
      size: "20"
    }),
    k: common_vendor.o((...args) => $options.goOrder && $options.goOrder(...args)),
    l: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-shoucang",
      size: "20"
    }),
    m: common_vendor.p({
      type: "right",
      size: "20"
    }),
    n: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-ziwopingjia",
      size: "20"
    }),
    o: common_vendor.p({
      type: "right",
      size: "20"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-259fb574"], ["__file", "F:/\u65E0\u9521\u524D\u7AEF\u57F9\u8BAD/\u9A6C\u54E5\u6559\u5B66/uni-app/ZLHome/pages/me/me.vue"]]);
wx.createPage(MiniProgramPage);
