"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    goToBack() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    goHome() {
      common_vendor.index.navigateTo({
        url: "/pages/home/index"
      });
    }
  }
};
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_navbar2 = common_vendor.resolveComponent("uv-navbar");
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  (_easycom_uv_icon2 + _easycom_uv_line2 + _easycom_uv_navbar2 + _easycom_uv_image2)();
}
const _easycom_uv_icon = () => "../../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_line = () => "../../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_uv_navbar = () => "../../../uni_modules/uv-navbar/components/uv-navbar/uv-navbar.js";
const _easycom_uv_image = () => "../../../uni_modules/uv-image/components/uv-image/uv-image.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_line + _easycom_uv_navbar + _easycom_uv_image)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.goToBack),
    b: common_vendor.p({
      name: "arrow-left",
      size: "19"
    }),
    c: common_vendor.p({
      direction: "column",
      hairline: false,
      length: "16",
      margin: "0 8px"
    }),
    d: common_vendor.o($options.goHome),
    e: common_vendor.p({
      name: "home",
      size: "20"
    }),
    f: common_vendor.p({
      title: "超市商品"
    }),
    g: common_vendor.p({
      src: "https://cdn.uviewui.com/uview/album/1.jpg",
      shape: "circle",
      width: "400rpx",
      height: "400rpx"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-590b2205"], ["__file", "F:/selfLearning/uniApp/fallInLove/pages/shop/shopDetal/shopDetal.vue"]]);
wx.createPage(MiniProgramPage);
