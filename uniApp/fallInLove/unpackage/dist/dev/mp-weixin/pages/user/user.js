"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      value: 4
    };
  },
  methods: {
    tabBarChange(index) {
      this.value = index;
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
  const _easycom_uv_tabbar_item2 = common_vendor.resolveComponent("uv-tabbar-item");
  const _easycom_uv_tabbar2 = common_vendor.resolveComponent("uv-tabbar");
  (_easycom_uv_tabbar_item2 + _easycom_uv_tabbar2)();
}
const _easycom_uv_tabbar_item = () => "../../uni_modules/uv-tabbar/components/uv-tabbar-item/uv-tabbar-item.js";
const _easycom_uv_tabbar = () => "../../uni_modules/uv-tabbar/components/uv-tabbar/uv-tabbar.js";
if (!Math) {
  (_easycom_uv_tabbar_item + _easycom_uv_tabbar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      text: "任务",
      icon: "file-text"
    }),
    b: common_vendor.p({
      text: "商城",
      icon: "empty-coupon"
    }),
    c: common_vendor.p({
      text: "首页",
      icon: "home"
    }),
    d: common_vendor.p({
      text: "仓库",
      icon: "shopping-cart"
    }),
    e: common_vendor.p({
      text: "我的",
      icon: "account"
    }),
    f: common_vendor.o($options.tabBarChange),
    g: common_vendor.p({
      value: $data.value,
      circular: true
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0f7520f0"], ["__file", "F:/selfLearning/uniApp/fallInLove/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
