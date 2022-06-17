"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      result: {},
      swiperImg: [],
      goodsInfo: {},
      fromaddress: "",
      toaddress: "",
      goodsId: "",
      goodsAttr: [],
      img: "",
      price: "",
      goodsNum: "",
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 1e3,
      showmotai: false,
      isActive: 0,
      options: [{
        icon: "shop",
        text: "\u4F50\u7F57\u4F18\u9009"
      }, {
        icon: "shop",
        text: "\u5206\u7C7B",
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
    this.goodsId = options.id;
  },
  onReady() {
    this.getGoodDetail();
  },
  methods: {
    async getGoodDetail() {
      console.log(this.goods_id);
      let result = await common_js_http.requestGet("/api/api_goods?category_pinyin=undefined&XcxSessKey=%20&company_id=7194&goods_id=" + this.goodsId);
      this.swiperImg = result.data.goods_main_image;
      this.goodsInfo = result.data.goods_info;
      this.fromaddress = result.data.address_name;
      this.toaddress = result.data.local_address;
      this.attrs = result.data.attr_list;
      this.goodsAttr = result.data.goods_attr.goods;
      this.img = result.data.goods_info.goods_img_url;
      this.price = result.data.goods_info.shop_price;
      this.goodsNum = result.data.goods_info.goods_sn;
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
    },
    onClick(e) {
      if (e.index == 0) {
        common_vendor.index.switchTab({
          url: "/pages/index/index"
        });
      }
      if (e.index == 1) {
        common_vendor.index.switchTab({
          url: "/pages/sort/sort"
        });
      }
      if (e.index == 2) {
        common_vendor.index.navigateTo({
          url: "/pages/carts/carts"
        });
      }
    },
    buttonClick(e) {
      console.log(e);
      this.options[2].info++;
    },
    showMotaikuang() {
      this.showmotai = true;
    },
    exitMotaikuang() {
      this.showmotai = false;
    },
    changeClass(i) {
      this.isActive = i;
      this.img = this.goodsAttr[i].goods_img_url;
      this.price = this.goodsAttr[i].shop_price;
      this.goodsNum = this.goodsAttr[i].goods_sn;
      this.goodsId = this.goodsAttr[i].id;
    },
    otherdetails() {
      console.log(this.goodsId);
      common_vendor.index.navigateTo({
        url: `/pages/gooddetail/gooddetail?id=${this.goodsId}`,
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
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
  return common_vendor.e({
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
    q: common_vendor.o((...args) => $options.showMotaikuang && $options.showMotaikuang(...args)),
    r: $data.showmotai
  }, $data.showmotai ? {
    s: common_vendor.o((...args) => $options.exitMotaikuang && $options.exitMotaikuang(...args)),
    t: common_vendor.o((...args) => $options.exitMotaikuang && $options.exitMotaikuang(...args)),
    v: $data.img,
    w: common_vendor.t($data.price),
    x: common_vendor.t($data.goodsNum),
    y: common_vendor.f($data.goodsAttr, (item, index, i0) => {
      return {
        a: common_vendor.t(item.size),
        b: item.id,
        c: $data.isActive === index ? 1 : "",
        d: common_vendor.o(($event) => $options.changeClass(index), item.id)
      };
    }),
    z: common_vendor.o((...args) => _ctx.chooseSize && _ctx.chooseSize(...args)),
    A: common_vendor.o(($event) => $options.otherdetails())
  } : {}, {
    B: common_vendor.p({
      result: $data.result
    }),
    C: common_vendor.o($options.onClick),
    D: common_vendor.o($options.buttonClick),
    E: common_vendor.p({
      options: $data.options,
      fill: true,
      ["button-group"]: $data.buttonGroup
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1c515af4"], ["__file", "C:/Study/geek/15.uni-app/ZLHome/pages/gooddetail/gooddetail.vue"]]);
wx.createPage(MiniProgramPage);
