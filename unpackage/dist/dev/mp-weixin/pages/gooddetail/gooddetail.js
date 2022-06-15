"use strict";
var common_js_http = require("../../common/js/http.js");
var common_vendor = require("../../common/vendor.js");
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
      result: {}
    };
  },
  created() {
    this.getGoodDetail();
  },
  onLoad(options) {
    this.goods_id = options.id;
  },
  methods: {
    async getGoodDetail() {
      console.log(this.goods_id);
      let result = await common_js_http.requestGet(`/api/api_goods?goods_id=${this.goods_id}`);
      this.swiperImg = result.data.goods_main_image;
      this.goodsInfo = result.data.goods_info;
      console.log(result.data.goods_info, "22222222222222222222");
      this.fromaddress = result.data.address_name;
      this.toaddress = result.data.local_address;
      this.attrs = result.data.attr_list;
      this.result = result;
      console.log(this.result, "far");
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
      console.log(event.detail);
      wx.showToast({
        title: `\u5207\u6362\u5230\u6807\u7B7E ${event.detail.name}`,
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _easycom_goodsdetail_tabs2 = common_vendor.resolveComponent("goodsdetail_tabs");
  _easycom_goodsdetail_tabs2();
}
const _easycom_goodsdetail_tabs = () => "../../components/goodsdetail_tabs/goodsdetail_tabs.js";
if (!Math) {
  _easycom_goodsdetail_tabs();
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
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1c515af4"], ["__file", "C:/Study/geek/15.uni-app/ZLHome/pages/gooddetail/gooddetail.vue"]]);
wx.createPage(MiniProgramPage);
