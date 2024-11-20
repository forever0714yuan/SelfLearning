"use strict";
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://localhost:3000/rainbow";
common_vendor.index.addInterceptor("request", {
  invoke(options) {
    if (!options.url.startsWith("http")) {
      options.url = baseUrl + options.url;
    }
    options.timeout = 1e4;
  }
});
