"use strict";
var common_vendor = require("../../common/vendor.js");
var common_js_http = require("../../common/js/http.js");
const _sfc_main = {
  data() {
    return {
      customFormData: {
        username: "",
        password: ""
      },
      customRules: {
        username: {
          rules: [{
            pattern: "^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$",
            errorMessage: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7"
          }]
        },
        password: {
          rules: [{
            required: true,
            errorMessage: "\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A"
          }]
        }
      }
    };
  },
  methods: {
    submit(ref) {
      this.$refs[ref].validate().then((res) => {
        console.log("success", res);
        this.login();
      }).catch((err) => {
        console.log("err", err);
      });
    },
    async login() {
      let result = await common_js_http.requestPostLogin("/api/api/ajax_login", {
        "username": this.customFormData.username,
        "password": this.customFormData.password
      });
      console.log(result);
      if (result.error === 0) {
        common_vendor.index.setStorageSync("user", result.data);
        common_vendor.index.showToast({
          title: `\u767B\u5F55\u6210\u529F`
        });
        setTimeout(() => {
          common_vendor.index.navigateBack({
            delta: 1
          });
        }, 2e3);
      } else {
        common_vendor.index.showToast({
          title: result.message
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_section2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_section = () => "../../components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.customFormData.username = $event),
    b: common_vendor.p({
      placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801",
      modelValue: $data.customFormData.username
    }),
    c: common_vendor.p({
      required: true,
      name: "username"
    }),
    d: common_vendor.o(($event) => $data.customFormData.password = $event),
    e: common_vendor.p({
      type: "password",
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      modelValue: $data.customFormData.password
    }),
    f: common_vendor.p({
      required: true,
      name: "password"
    }),
    g: common_vendor.sr("customForm", "b237504c-1,b237504c-0"),
    h: common_vendor.p({
      rules: $data.customRules,
      modelValue: $data.customFormData
    }),
    i: common_vendor.o(($event) => $options.submit("customForm"))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b237504c"], ["__file", "F:/\u65E0\u9521\u524D\u7AEF\u57F9\u8BAD/\u9A6C\u54E5\u6559\u5B66/uni-app/ZLHome/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
