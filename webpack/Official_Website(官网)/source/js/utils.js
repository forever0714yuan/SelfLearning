// import { createStorage } from "../webStorage";
// const storage = createStorage({ type: "localStorage" });
export const TOKEN_KEY = `lhyj-` + "access_token";
let Utils = {
  initState: function(vals, ranes) {
    let min = vals[0] || 0;
    let max = vals[1] || 0;
    let rangMin = ranes[0] || 0;
    let rangMax = ranes[1] || 0;
    this.setVals = (_min, _max) => {
      min = _min;
      max = _max;
      if (_max == 2802) {
        // debugger
      }
    };
    this.setRanges = (_min, _max) => {
      rangMin = _min;
      rangMax = _max;
    };
    this.getVal = (t) => {
      const k = Utils.smoothstep(t, min, max);

      return Utils.lerp(rangMin, rangMax, k);
      //
    };
    this.get = () => {
      return [rangMin, rangMax];
    };
  },
  lerp: function(x, y, t) {
    return (1 - t) * x + t * y;
  },
  round(val, k = 1) {
    const t = Math.pow(10, k) / 10;
    return Math.round(val * t) / t;
  },
  smoothstep(x, min, max) {
    if (x <= min) return 0;
    if (x >= max) return 1;
    x = (x - min) / (max - min);
    return x;
  },
  // - dispose
  // - 清除util
  disposeUtil() {
    for (const l in this.dft.txues) {
      this.dft.txues[k].dispose();
    }
  },
  /**
   * [disposeObj 删除组合节点]
   * @Author ZHOUPU
   * @DateTime 2019-05-14
   * @param {[object]} obj [组合节点]
   * @return {[type]}      [description]
   */
  disposeObj(obj) {
    if (obj instanceof THREE.Object3D) {
      this.objectTraverse(obj, Utils.disposeNode.bind(Utils));
    }
  },
  /**
   * [disposeNode 删除单个节点]
   * @Author ZHOUPU
   * @DateTime 2019-05-14
   * @param {[object]} node [节点对象]
   * @return {[type]}      [description]
   */
  disposeNode(node) {
    if (Array.isArray(node._txueArr)) {
      for (let i = 0; i < node._txueArr.length; i++) {
        node._txueArr[i].dispose();
        node._txueArr[i] = null;
      }
      node._txueArr = null;
    }
    this.deleteGeometry(node);
    this.deleteMaterial(node);
    node.dispose && node.dispose();
    if (node.parent) node.parent.remove(node);
    node = null;
  },
  /**
   * [deleteGeometry 删除几何体]
   * @Author ZHOUPU
   * @DateTime 2019-05-14
   * @param {[object]} node [节点对象]
   * @return {[type]}      [description]
   */
  deleteGeometry(node) {
    if (node.geometry && node.geometry.dispose) {
      if (node.geometry._bufferGeometry) {
        node.geometry._bufferGeometry.dispose();
      }

      node.geometry.dispose();
      node.geometry = null;
    }
  },
  /**
   * [disposeMaterial 删除材质, 多材质]
   * @Author ZHOUPU
   * @DateTime 2019-05-14
   * @param {[object]} node [节点对象]
   * @return {[type]}      [description]
   */
  deleteMaterial(node) {
    if (Array.isArray(node.material)) {
      node.material.forEach(Utils.disposeMaterial.bind(Utils));
    } else if (node.material) {
      this.disposeMaterial(node.material);
    }
  },
  /**
   * [deleteMaterial 销毁材质]
   * @Author ZHOUPU
   * @DateTime 2018-08-02
   * @param {[object]} mtl [THREE的材质对象]
   * @return {[type]}      [description]
   */
  disposeMaterial(mtl) {
    if (mtl.uniforms) {
      for (const i in mtl.uniforms) {
        let uniform = mtl.__webglShader ? mtl.__webglShader.uniforms[i] : undefined;
        if (uniform && uniform.value) {
          uniform.value.dispose && uniform.value.dispose();
          uniform.value = null;
        }
        uniform = mtl.uniforms[i];
        if (uniform.value) {
          uniform.value.dispose && uniform.value.dispose();
          uniform.value = null;
        }
      }
    }
    if (mtl.map) {
      mtl.map.dispose();
      mtl.map = null;
      if (mtl.__webglShader) {
        mtl.__webglShader.uniforms.map.value.dispose();
        mtl.__webglShader.uniforms.map.value = null;
      }
    }

    mtl.dispose();
    mtl = null;
  },
  /**
   * [objectTraverse 遍历对象树, 由叶到根]
   * @Author ZHOUPU
   * @DateTime 2018-08-02
   * @param {[object]} obj [THREE的object3D对象]
   * @param {[Function]} callback [回调函数, 返回遍历对象]
   * @return {[void]}
   */
  objectTraverse(obj, callback) {
    if (!Utils.isFunction(callback)) return;
    const { children } = obj;
    for (let i = children.length - 1; i >= 0; i--) {
      Utils.objectTraverse(children[i], callback);
    }
    callback(obj);
  },
  /**
   * 检测是否函数
   * @param func
   * @returns {boolean}
   */
  isFunction(func) {
    return typeof func === "function";
  },
  format(date = new Date(), fmt = "yyyy-MM-dd hh:mm:ss") {
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds(),
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (let k in o) {
      if (!o.hasOwnProperty(k)) continue;
      if (new RegExp("(" + k + ")").test(fmt)) {
        let ts = Array.from({ length: RegExp.$1.length })
          .map((item) => "0")
          .join("");
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (ts + o[k]).substr(("" + o[k]).length));
      }
    }

    return fmt;
  },
  /**
   * 深层合并对象
   * @Auther
   * @param target {Object}
   * @param objMore [Object, [Object...]]
   * @returns {*}
   */
  mergeObject(target, ...objMore) {
    let result = Object.assign({}, target);
    if (objMore.length) {
      for (let obj of objMore) {
        for (let key in obj) {
          if (!obj.hasOwnProperty(key)) continue;
          if (obj[key] instanceof Object) {
            if (key in result) {
              result[key] = this.mergeObject({}, result[key], obj[key]);
            } else {
              result[key] = this.mergeObject({}, obj[key]);
            }
          } else {
            result[key] = obj[key];
          }
        }
      }
    }

    return result;
  },

  calculateTextWidth(options) {
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");

    context.font = options.fontSize + "px 微软雅黑";
    var textMetrics = context.measureText(options.text);
    return textMetrics.width;
  },
  /**
   * 获取token
   * @returns
   */
  // getAccessToken() {
  //   const token = storage.get(TOKEN_KEY);
  //   if (token && token !== "undefined") return token;
  //   else return false;
  // },
  /**
   * 获取缓存中的值
   * @param {*} key
   * @returns
   */
  // getStorageData(key) {
  //   const data = storage.get(key);
  //   if (data && data !== "undefined") return data;
  //   else return false;
  // },
};
export { Utils };
export default Utils;
