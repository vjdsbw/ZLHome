"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      title: [],
      lists: [],
      currentIndex: 0
    };
  },
  created() {
    this.getList();
    this.getListContent();
    this.getData();
  },
  onReady() {
    const query = common_vendor.index.createSelectorQuery().in(this);
    query.selectAll(".left-scroll-item").boundingClientRect((data) => {
      this.leftDomsTop = data.map((v) => v.top);
      console.log("\u5DE6\u8FB9top\uFF1A", this.leftDomsTop);
    }).exec();
    query.selectAll(".right-scroll-item").boundingClientRect((data) => {
      this.rightDomsTop = data.map((v) => v.top);
      console.log("\u53F3\u8FB9top\uFF1A", this.rightDomsTop);
    }).exec();
    query.selectAll(".left-scroll-item").fields({
      size: true,
      rect: true
    }, (data) => {
      this.cateItemHeight = data.map((v) => {
        this.cateItemHeight = v.height;
        return v.top;
      });
    }).exec();
  },
  methods: {
    async getList() {
      let result = await common_js_http.requestGet("/api/m/index/cate_list");
      this.title = result.data;
    },
    async getListContent() {
      let result = await common_js_http.requestGet("/api/m/index/cate_list?XcxSessKey=%20&company_id=7194");
      this.lists = result.data;
    },
    leftClick(idx, item) {
      this.currentIndex = idx;
      this.rightScrollTop = this.rightDomsTop[idx];
    },
    getData() {
      for (let i = 0; i < 12; i++) {
        this.title.push({
          name: "\u5206\u7C7B" + i
        });
        this.lists.push({
          name: `\u2014\u2014 \u4EA7\u54C1\u5206\u7C7B${i} \u2014\u2014`,
          lists: []
        });
      }
      for (let i = 0; i < this.lists.length; i++) {
        for (let j = 0; j < 24; j++) {
          this.lists[i].lists.push({
            name: `\u5206\u7C7B${i}-\u5546\u54C1${j}`
          });
        }
      }
    },
    async onRightScroll(e) {
      this.rightDomsTop.forEach((v, k) => {
        if (v < e.detail.scrollTop + 3) {
          this.currentIndex = k;
          return false;
        }
      });
    }
  },
  wacth: {
    currentIndex(newValue, oldValue) {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.selectAll("#leftScroll").fields({
        size: true,
        scrollOffset: true
      }, (data) => {
        let H = data.height;
        let ST = data.scrollTop;
        if (this.leftDomsTop[newValue] + this.cateItemHeight > H + ST) {
          return this.leftScrollTop = this.leftDomsTop[newValue] + this.cateItemHeight - H;
        }
        if (ST > this.cateItemHeight) {
          this.leftScrollTop = this.leftDomsTop[newValue];
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.title, (item, idx, i0) => {
      return {
        a: common_vendor.t(item.desc),
        b: common_vendor.n({
          active: $data.currentIndex === idx
        }),
        c: item.id,
        d: common_vendor.o(($event) => $options.leftClick(idx, item), item.id)
      };
    }),
    b: _ctx.leftScrollTop,
    c: common_vendor.f($data.lists, (item, index, i0) => {
      return {
        a: common_vendor.t(item.desc),
        b: common_vendor.f(item.cat_list, (item1, index1, i1) => {
          return {
            a: item1.image_url,
            b: common_vendor.t(item1.desc_three),
            c: item1.id
          };
        }),
        c: item.id
      };
    }),
    d: _ctx.rightScrollTop,
    e: common_vendor.o((...args) => $options.onRightScroll && $options.onRightScroll(...args))
  };
}


var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "F:/zuolo/pages/sort/sort.vue"]]);

wx.createPage(MiniProgramPage);
