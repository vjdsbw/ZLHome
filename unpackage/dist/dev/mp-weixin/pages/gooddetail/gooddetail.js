"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      swiperImg: [],
      goodsInfo: {},
      fromaddress: "",
      toaddress: "",
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 1e3,
      goods_id: 0,
      result: {},
      optionsgwc: [{
        icon: "chat",
        text: "\u4F50\u7F57\u4F18\u9009"
      }, {
        icon: "shop",
        text: "\u5206\u7C7B",
        infoBackgroundColor: "#007aff",
        infoColor: "#f5f5f5"
      }, {
        icon: "star",
        text: "\u6536\u85CF",
        infoBackgroundColor: "#007aff",
        infoColor: "#f5f5f5"
      }, {
        icon: "cart",
        text: "\u8D2D\u7269\u8F66"
      }],
      buttonGroup: [{
        text: "\u52A0\u5165\u8D2D\u7269\u8F66",
        backgroundColor: "linear-gradient(90deg, #FE6035, #EF1224)",
        color: "#fff"
      }]
    };
  },
  created() {
  },
  onLoad(options) {
    this.goods_id = options.id;
  },
  onShow() {
    this.getGoodDetail();
    let user = common_vendor.index.getStorageSync("user");
    let result = common_vendor.index.getStorageSync(`col${user.user_id}`);
    var newresult = result.split(",");
    var nnresult = newresult.splice(0, newresult.length - 1);
    nnresult.forEach((item) => {
      if (item == this.goods_id) {
        this.optionsgwc[2].icon = "star-filled";
        this.optionsgwc[2].text = "\u5DF2\u6536\u85CF";
      }
    });
  },
  methods: {
    onClick(e) {
      let user = common_vendor.index.getStorageSync("user");
      if (user) {
        if (e.index == 2) {
          if (this.optionsgwc[e.index].icon == "star") {
            this.optionsgwc[e.index].icon = "star-filled";
            this.optionsgwc[e.index].text = "\u5DF2\u6536\u85CF";
            this.shoucang();
          } else {
            this.optionsgwc[e.index].icon = "star";
            this.optionsgwc[e.index].text = "\u6536\u85CF";
            this.delCol();
          }
        }
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
    },
    delCol() {
      let user = common_vendor.index.getStorageSync("user");
      let result = common_vendor.index.getStorageSync(`col${user.user_id}`);
      var newresult = result.split(",");
      var nnresult = newresult.splice(0, newresult.length - 1);
      nnresult.forEach((item, idx) => {
        if (item == this.result.data.goods_info.goods_id) {
          nnresult.splice(idx, 1);
        }
      });
      var ns = nnresult.join(",");
      common_vendor.index.setStorageSync(`col${user.user_id}`, `${ns},`);
    },
    shoucang() {
      let user = common_vendor.index.getStorageSync("user");
      let result = common_vendor.index.getStorageSync(`col${user.user_id}`);
      var aaa = Object.values(this.result.data);
      if (result) {
        var newresult = result.split(",");
        for (var i = 0; i < newresult.length - 1; i++) {
          if (aaa[8].goods_id == newresult[i]) {
            return;
          }
        }
        result = `${result}${aaa[8].goods_id},`;
        common_vendor.index.setStorageSync(`col${user.user_id}`, result);
      } else {
        var new1 = `${aaa[8].goods_id},`;
        common_vendor.index.setStorageSync(`col${user.user_id}`, new1);
      }
    },
    async getGoodDetail() {
      let result = await common_js_http.requestGet(`/api/api_goods?goods_id=${this.goods_id}`);
      this.swiperImg = result.data.goods_main_image;
      this.goodsInfo = result.data.goods_info;
      this.fromaddress = result.data.address_name;
      this.toaddress = result.data.local_address;
      this.attrs = result.data.attr_list;
      this.result = result;
    },
    changeIndicatorDots(e) {
      this.indicatorDots = !this.indicatorDots;
    },
    changeAutoplay(e) {
      this.autoplay = !this.autoplay;
    },
    intervalChange(e) {
      this.interval = e.target.value;
    },
    durationChange(e) {
      this.duration = e.target.value;
    },
    onTabChange(event) {
      wx.showToast({
        title: `\u5207\u6362\u5230\u6807\u7B7E ${event.detail.name}`,
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _easycom_goodsdetail_tabs2 = common_vendor.resolveComponent("goodsdetail_tabs");
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  (_easycom_goodsdetail_tabs2 + _easycom_uni_goods_nav2)();
}
const _easycom_goodsdetail_tabs = () => "../../components/goodsdetail_tabs/goodsdetail_tabs.js";
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
if (!Math) {
  (_easycom_goodsdetail_tabs + _easycom_uni_goods_nav)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.swiperImg, (item, k0, i0) => {
      return {
        a: item.imgs_url_2,
        b: item.goods_id
      };
    }),
    b: $data.indicatorDots,
    c: $data.autoplay,
    d: $data.interval,
    e: $data.duration,
    f: common_vendor.t($data.goodsInfo.shop_price),
    g: common_vendor.t($data.goodsInfo.goods_name),
    h: common_vendor.t($data.goodsInfo.subtitle),
    i: common_vendor.t($data.goodsInfo.sale_num),
    j: common_vendor.t($data.fromaddress),
    k: common_vendor.t($data.goodsInfo.subtitle),
    l: common_vendor.t($data.fromaddress),
    m: common_vendor.t($data.toaddress.province_name),
    n: common_vendor.t($data.toaddress.city_name),
    o: common_vendor.t($data.toaddress.area_name),
    p: common_vendor.t($data.goodsInfo.delivery_time),
    q: common_vendor.p({
      result: $data.result
    }),
    r: common_vendor.o($options.onClick),
    s: common_vendor.o(_ctx.buttonClick),
    t: common_vendor.p({
      options: $data.optionsgwc,
      fill: true,
      ["button-group"]: $data.buttonGroup
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1c515af4"], ["__file", "F:/zuolo/pages/gooddetail/gooddetail.vue"]]);
wx.createPage(MiniProgramPage);
