"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      value: 0,
      list: [
        "/static/image/home1.jpg",
        "/static/image/home2.jpg",
        "/static/image/home3.jpg"
      ]
    };
  },
  methods: {
    tabBarChange(index) {
      this.value = index;
      if (index === 4) {
        common_vendor.index.reLaunch({
          url: "/pages/user/user"
        });
      }
      if (index === 2) {
        common_vendor.index.reLaunch({
          url: "/pages/home/index"
        });
      }
      if (index === 1) {
        common_vendor.index.reLaunch({
          url: "/pages/shop/shop"
        });
      }
      if (index === 0) {
        common_vendor.index.reLaunch({
          url: "/pages/task/task"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uv_swiper2 = common_vendor.resolveComponent("uv-swiper");
  const _easycom_uv_tags2 = common_vendor.resolveComponent("uv-tags");
  const _easycom_uv_tabbar_item2 = common_vendor.resolveComponent("uv-tabbar-item");
  const _easycom_uv_tabbar2 = common_vendor.resolveComponent("uv-tabbar");
  (_easycom_uv_swiper2 + _easycom_uv_tags2 + _easycom_uv_tabbar_item2 + _easycom_uv_tabbar2)();
}
const _easycom_uv_swiper = () => "../../uni_modules/uv-swiper/components/uv-swiper/uv-swiper.js";
const _easycom_uv_tags = () => "../../uni_modules/uv-tags/components/uv-tags/uv-tags.js";
const _easycom_uv_tabbar_item = () => "../../uni_modules/uv-tabbar/components/uv-tabbar-item/uv-tabbar-item.js";
const _easycom_uv_tabbar = () => "../../uni_modules/uv-tabbar/components/uv-tabbar/uv-tabbar.js";
if (!Math) {
  (_easycom_uv_swiper + _easycom_uv_tags + _easycom_uv_tabbar_item + _easycom_uv_tabbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      height: "200",
      list: $data.list
    }),
    b: common_vendor.p({
      text: "标签",
      plain: true,
      size: "mini",
      type: "warning"
    }),
    c: common_vendor.p({
      text: "标签",
      plain: true,
      size: "mini",
      type: "warning"
    }),
    d: common_vendor.p({
      text: "标签",
      plain: true,
      size: "mini",
      type: "warning"
    }),
    e: common_vendor.p({
      text: "标签",
      plain: true,
      size: "mini",
      type: "warning"
    }),
    f: common_vendor.p({
      text: "任务",
      icon: "file-text"
    }),
    g: common_vendor.p({
      text: "商城",
      icon: "empty-coupon"
    }),
    h: common_vendor.p({
      text: "首页",
      icon: "home"
    }),
    i: common_vendor.p({
      text: "仓库",
      icon: "shopping-cart"
    }),
    j: common_vendor.p({
      text: "我的",
      icon: "account"
    }),
    k: common_vendor.o($options.tabBarChange),
    l: common_vendor.p({
      value: $data.value,
      circular: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-62407536"], ["__file", "F:/selfLearning/uniApp/fallInLove/pages/task/task.vue"]]);
wx.createPage(MiniProgramPage);
