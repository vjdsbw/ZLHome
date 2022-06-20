"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      isflag: true,
      noflag: false,
      isAddress: true,
      isShow: false,
      noShow: true,
      formdataList: [],
      addressList: [],
      formData: {
        name: "",
        phone: "",
        bphone: "",
        address: "",
        region: ""
      },
      rules: {
        phone: {
          rules: [{
            required: true,
            errorMessage: "\u7535\u8BDD\u680F\u4E0D\u80FD\u4E3A\u7A7A"
          }]
        }
      },
      value: "",
      range: [{
        "value": 0,
        "text": "\u8BBE\u4E3A\u9ED8\u8BA4\u5730\u5740"
      }],
      region: "",
      num: 1,
      customItem: "\u5168\u90E8",
      single: "",
      type: "default",
      inverted: false,
      flag: false,
      show: false,
      show2: "\u8BF7\u9009\u62E9",
      formData: {
        consignee: "",
        tel: "",
        mobile: "",
        province: "",
        city: "",
        district: ""
      }
    };
  },
  onLoad(options) {
    this.formData.id = "testId";
    this.checkout(options.cart_id);
  },
  created() {
    common_vendor.index.getStorageSync("address") ? this.addressList = common_vendor.index.getStorageSync("address") : this.addressList = [];
    console.log(this.addressList, "aaaaaaaaaa");
    this.submit();
  },
  methods: {
    bindRegionChange(event) {
      console.log(event);
      this.region = event.detail.value[0] + event.detail.value[1] + event.detail.value[2];
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
      this.isShow = false;
      this.isAddress = true;
    },
    submit() {
      this.$refs.form.validate(["id"], (err, formData) => {
        if (!err) {
          console.log("success", formData);
        }
      });
      this.noShow = true;
      this.formdataList[this.formdataList.length + 1].push({
        name: this.formData.name,
        phone: this.formData.phone,
        bphone: this.formData.bphone,
        address: this.formData.address,
        region: this.region,
        id: Date.now()
      });
      console.log(this.formdataList, "xxxxxxxxxxxxxxxxxxxxx");
      common_vendor.index.setStorageSync("address", this.formdataList);
    },
    address() {
      this.isAddress = false;
      this.isShow = true;
    },
    addr() {
      this.$refs.popup.open();
    },
    exitAddress(id) {
      this.$refs.exit.open();
      if (this.addressList.length != 0) {
        var index = this.addressList.findIndex((item) => item.id == id);
        this.formData.name = this.addressList[index].name;
        this.formData.phone = this.addressList[index].phone;
        this.formData.bphone = this.addressList[index].bphone;
        this.formData.address = this.addressList[index].address;
        this.region = this.addressList[index].region;
        this.show2 = "";
      }
    },
    deleteAddress(id) {
      let newaddressList = this.addressList.filter((item) => {
        return item.id != id;
      });
      this.addressList = newaddressList;
    },
    addClose() {
      this.$refs.exit.close();
    },
    save() {
      this.$refs.exit.close();
    },
    async checkout(m) {
      let result = await common_js_http.requestPost(`/api/api/flow/check_out?cart_id=` + m + `XcxSessKey=%20&company_id=7194`);
      console.log(result, "xxxxxxxxxxxxx");
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_icons2 + _easycom_uni_forms2 + _easycom_uni_data_checkbox2 + _easycom_uni_popup2 + _easycom_uni_tag2 + _easycom_uni_datetime_picker2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_data_checkbox = () => "../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_icons + _easycom_uni_forms + _easycom_uni_data_checkbox + _easycom_uni_popup + _easycom_uni_tag + _easycom_uni_datetime_picker)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.addressList ? $data.isAddress : $data.isShow
  }, ($data.addressList ? $data.isAddress : $data.isShow) ? {
    b: common_vendor.o(($event) => $data.formData.name = $event),
    c: common_vendor.p({
      inputBorder: false,
      placeholder: "\u5FC5\u586B",
      modelValue: $data.formData.name
    }),
    d: common_vendor.p({
      label: "\u6536\u8D27\u4EBA",
      required: true,
      name: "name"
    }),
    e: common_vendor.o(($event) => $data.formData.phone = $event),
    f: common_vendor.p({
      inputBorder: false,
      placeholder: "\u5FC5\u586B",
      modelValue: $data.formData.phone
    }),
    g: common_vendor.p({
      label: "\u624B\u673A\u53F7\u7801",
      required: true,
      name: "phone"
    }),
    h: common_vendor.o(($event) => $data.formData.bphone = $event),
    i: common_vendor.p({
      inputBorder: false,
      modelValue: $data.formData.bphone
    }),
    j: common_vendor.p({
      label: "\u5907\u7528\u53F7\u7801",
      name: "bphone"
    }),
    k: common_vendor.t($data.show2),
    l: common_vendor.t($data.region),
    m: common_vendor.p({
      type: "right",
      size: "20"
    }),
    n: common_vendor.o((...args) => $options.bindRegionChange && $options.bindRegionChange(...args)),
    o: common_vendor.p({
      label: "\u6240\u5728\u5730\u533A",
      name: "region"
    }),
    p: common_vendor.o(($event) => $data.formData.address = $event),
    q: common_vendor.p({
      inputBorder: false,
      placeholder: "\u5FC5\u586B",
      modelValue: $data.formData.address
    }),
    r: common_vendor.p({
      label: "\u8BE6\u7EC6\u5730\u5740",
      name: "address"
    }),
    s: common_vendor.sr("form", "db675620-0"),
    t: common_vendor.p({
      border: true,
      modelValue: $data.formData
    }),
    v: common_vendor.p({
      type: "location-filled",
      size: "30"
    }),
    w: common_vendor.o((...args) => $options.open && $options.open(...args))
  } : {}, {
    x: common_vendor.o($options.close),
    y: common_vendor.p({
      type: "closeempty",
      size: "30"
    }),
    z: common_vendor.f($data.addressList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.phone),
        c: common_vendor.t(item.region),
        d: common_vendor.t(item.address),
        e: common_vendor.o(($event) => $options.address(item.id)),
        f: "db675620-14-" + i0 + ",db675620-12",
        g: common_vendor.o(($event) => $options.exitAddress(item.id)),
        h: "db675620-15-" + i0 + ",db675620-12",
        i: common_vendor.o(($event) => $options.deleteAddress(item.id)),
        j: "db675620-16-" + i0 + ",db675620-12",
        k: item.id
      };
    }),
    A: common_vendor.o(($event) => $data.value = $event),
    B: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.value
    }),
    C: common_vendor.p({
      type: "compose",
      size: "22"
    }),
    D: common_vendor.p({
      type: "trash",
      size: "22"
    }),
    E: $data.noShow,
    F: common_vendor.o((...args) => $options.goAddress && $options.goAddress(...args)),
    G: common_vendor.sr("popup", "db675620-12"),
    H: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#fff"
    }),
    I: $data.addressList ? $data.isShow : $data.isAddress
  }, ($data.addressList ? $data.isShow : $data.isAddress) ? {
    J: common_vendor.t($data.addressList[0].name),
    K: common_vendor.t($data.addressList[0].phone),
    L: common_vendor.t($data.addressList[0].region),
    M: common_vendor.t($data.addressList[0].address),
    N: common_vendor.t($data.addressList[0].bphone),
    O: $data.addressList[0].bphone ? $data.isflag : $data.noflag,
    P: common_vendor.o((...args) => $options.addr && $options.addr(...args))
  } : {}, {
    Q: common_vendor.o($options.addClose),
    R: common_vendor.p({
      type: "closeempty",
      size: "18"
    }),
    S: common_vendor.o((...args) => $options.save && $options.save(...args)),
    T: common_vendor.o(($event) => $data.formData.name = $event),
    U: common_vendor.p({
      inputBorder: false,
      modelValue: $data.formData.name
    }),
    V: common_vendor.p({
      label: "\u6536\u8D27\u4EBA",
      required: true,
      name: "name"
    }),
    W: common_vendor.o(($event) => $data.formData.phone = $event),
    X: common_vendor.p({
      inputBorder: false,
      modelValue: $data.formData.phone
    }),
    Y: common_vendor.p({
      label: "\u624B\u673A\u53F7\u7801",
      required: true,
      name: "phone"
    }),
    Z: common_vendor.o(($event) => $data.formData.bphone = $event),
    aa: common_vendor.p({
      inputBorder: false,
      modelValue: $data.formData.bphone
    }),
    ab: common_vendor.p({
      label: "\u5907\u7528\u53F7\u7801",
      name: "bphone"
    }),
    ac: common_vendor.t($data.show2),
    ad: common_vendor.t($data.region),
    ae: common_vendor.o((...args) => $options.bindRegionChange && $options.bindRegionChange(...args)),
    af: common_vendor.p({
      label: "\u6240\u5728\u5730\u533A",
      name: "region"
    }),
    ag: common_vendor.o(($event) => $data.formData.address = $event),
    ah: common_vendor.p({
      inputBorder: false,
      modelValue: $data.formData.address
    }),
    ai: common_vendor.p({
      label: "\u8BE6\u7EC6\u5730\u5740",
      name: "address"
    }),
    aj: common_vendor.sr("form", "db675620-19,db675620-17"),
    ak: common_vendor.p({
      border: true,
      modelValue: $data.formData
    }),
    al: common_vendor.o(($event) => $data.value = $event),
    am: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.value
    }),
    an: common_vendor.o((...args) => $options.deleteAddress && $options.deleteAddress(...args)),
    ao: common_vendor.sr("exit", "db675620-17"),
    ap: common_vendor.p({
      type: "bottom",
      ["background-color"]: "#eee"
    }),
    aq: common_vendor.o($options.setInverted),
    ar: common_vendor.p({
      text: "\u4F50\u7F57\u4F18\u9009\u6307\u5B9A\u7269\u6D41",
      inverted: $data.inverted,
      type: "error",
      circle: true
    }),
    as: common_vendor.o($options.setInver),
    at: common_vendor.p({
      text: "\u672C\u5E97\u5408\u4F5C\u7269\u6D41",
      inverted: !$data.inverted,
      type: "error",
      circle: true
    }),
    av: common_vendor.o(_ctx.maskClick),
    aw: common_vendor.o(($event) => $data.single = $event),
    ax: common_vendor.p({
      type: "date",
      ["clear-icon"]: false,
      border: false,
      modelValue: $data.single
    }),
    ay: common_vendor.p({
      type: "right",
      size: "20"
    }),
    az: $data.flag ? 1 : "",
    aA: common_vendor.o((...args) => $options.submit && $options.submit(...args)),
    aB: common_vendor.t($data.num)
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-db675620"], ["__file", "D:/HBuilderXProject/ZLHome/pages/address/address.vue"]]);
wx.createPage(MiniProgramPage);
