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
      show: false
    };
  },
  onLoad() {
    this.bindRegionChange();
  },
  methods: {
    bindRegionChange(event) {
      this.region = event.detail.value;
      console.log(this.region);
    },
    changeAddress() {
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
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_icons2 + _easycom_uni_tag2 + _easycom_uni_datetime_picker2 + _easycom_uni_popup2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_icons + _easycom_uni_tag + _easycom_uni_datetime_picker + _easycom_uni_popup)();
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
    g: common_vendor.t($data.region[0]),
    h: common_vendor.t($data.region[1]),
    i: common_vendor.t($data.region[2]),
    j: common_vendor.o((...args) => $options.bindRegionChange && $options.bindRegionChange(...args)),
    k: common_vendor.p({
      label: "\u6240\u5728\u5730\u533A"
    }),
    l: common_vendor.p({
      inputBorder: false,
      placeholder: "\u5FC5\u586B"
    }),
    m: common_vendor.p({
      label: "\u8BE6\u7EC6\u5730\u5740"
    }),
    n: common_vendor.p({
      border: true
    }),
    o: common_vendor.p({
      type: "location-filled",
      size: "30"
    }),
    p: common_vendor.o((...args) => $options.changeAddress && $options.changeAddress(...args)),
    q: common_vendor.o($options.setInverted),
    r: common_vendor.p({
      text: "\u4F50\u7F57\u4F18\u9009\u6307\u5B9A\u7269\u6D41",
      inverted: $data.inverted,
      type: "error",
      circle: true
    }),
    s: common_vendor.o($options.setInver),
    t: common_vendor.p({
      text: "\u672C\u5E97\u5408\u4F5C\u7269\u6D41",
      inverted: !$data.inverted,
      type: "error",
      circle: true
    }),
    v: common_vendor.o(_ctx.maskClick),
    w: common_vendor.o(($event) => $data.single = $event),
    x: common_vendor.p({
      type: "date",
      ["clear-icon"]: false,
      border: false,
      modelValue: $data.single
    }),
    y: $data.flag ? 1 : "",
    z: common_vendor.o((...args) => $options.open && $options.open(...args)),
    A: common_vendor.sr("popup", "db675620-14"),
    B: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#fff"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-db675620"], ["__file", "C:/Users/dell/Desktop/ZLHome/pages/address/address.vue"]]);
wx.createPage(MiniProgramPage);
