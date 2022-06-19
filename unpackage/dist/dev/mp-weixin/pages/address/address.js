"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      customItem: "\u5168\u90E8",
      region: [],
      single: "",
      type: "default",
      inverted: false,
      flag: false,
      show: false,
      show2: "\u8BF7\u9009\u62E9"
    };
  },
  onLoad() {
    this.bindRegionChange();
  },
  methods: {
    bindRegionChange(event) {
      this.region = event.detail.value;
      this.show2 = "";
      console.log(this.region);
    },
    change(e) {
      this.single = e;
      console.log("-change\u4E8B\u4EF6:", e);
    },
    setInverted() {
      this.inverted = !this.inverted;
      this.flag = false;
    },
    setInver() {
      this.inverted = !this.inverted;
      this.flag = true;
    },
    onClose(e) {
      console.log(e);
    },
    open() {
      this.$refs.popup.open("bottom");
    },
    close() {
      this.$refs.popup.close();
    },
    goAddress() {
      this.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_icons2 + _easycom_uni_forms2 + _easycom_uni_popup2 + _easycom_uni_tag2 + _easycom_uni_datetime_picker2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_icons + _easycom_uni_forms + _easycom_uni_popup + _easycom_uni_tag + _easycom_uni_datetime_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      inputBorder: false,
      placeholder: "\u5FC5\u586B"
    }),
    b: common_vendor.p({
      label: "\u6536\u8D27\u4EBA"
    }),
    c: common_vendor.p({
      inputBorder: false,
      placeholder: "\u5FC5\u586B"
    }),
    d: common_vendor.p({
      label: "\u624B\u673A\u53F7\u7801"
    }),
    e: common_vendor.p({
      inputBorder: false,
      placeholder: ""
    }),
    f: common_vendor.p({
      label: "\u5907\u7528\u53F7\u7801"
    }),
    g: common_vendor.t($data.show2),
    h: common_vendor.t($data.region[0]),
    i: common_vendor.t($data.region[1]),
    j: common_vendor.t($data.region[2]),
    k: common_vendor.p({
      type: "right",
      size: "20"
    }),
    l: common_vendor.o((...args) => $options.bindRegionChange && $options.bindRegionChange(...args)),
    m: common_vendor.p({
      label: "\u6240\u5728\u5730\u533A"
    }),
    n: common_vendor.p({
      inputBorder: false,
      placeholder: "\u5FC5\u586B"
    }),
    o: common_vendor.p({
      label: "\u8BE6\u7EC6\u5730\u5740"
    }),
    p: common_vendor.p({
      border: true
    }),
    q: common_vendor.p({
      type: "location-filled",
      size: "30"
    }),
    r: common_vendor.o((...args) => $options.open && $options.open(...args)),
    s: common_vendor.o($options.close),
    t: common_vendor.p({
      type: "closeempty",
      size: "30"
    }),
    v: common_vendor.o((...args) => $options.goAddress && $options.goAddress(...args)),
    w: common_vendor.sr("popup", "db675620-12"),
    x: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#fff"
    }),
    y: common_vendor.o($options.setInverted),
    z: common_vendor.p({
      text: "\u4F50\u7F57\u4F18\u9009\u6307\u5B9A\u7269\u6D41",
      inverted: $data.inverted,
      type: "error",
      circle: true
    }),
    A: common_vendor.o($options.setInver),
    B: common_vendor.p({
      text: "\u672C\u5E97\u5408\u4F5C\u7269\u6D41",
      inverted: !$data.inverted,
      type: "error",
      circle: true
    }),
    C: common_vendor.o(_ctx.maskClick),
    D: common_vendor.o(($event) => $data.single = $event),
    E: common_vendor.p({
      type: "date",
      ["clear-icon"]: false,
      border: false,
      modelValue: $data.single
    }),
    F: common_vendor.p({
      type: "right",
      size: "20"
    }),
    G: $data.flag ? 1 : ""
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-db675620"], ["__file", "D:/HBuilderXProject/ZLHome/pages/address/address.vue"]]);
wx.createPage(MiniProgramPage);
