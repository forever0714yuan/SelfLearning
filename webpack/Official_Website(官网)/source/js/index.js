import store from "../vuex";
import msg from "@/utils/message";
// 转换到编辑表格所需数据结构
// export function convertTableData(data) {
//   const interpMethodOptions = store.getters.getMethods;
//   const paramTypeOptions = store.getters.getParamType;
//   const priorityOption = store.getters.getParamPriority;
//   const newData = [];
//   data.forEach((item) => {
//     const obj = {};
//     obj.paramId = item.flyParamId || item.paramId;
//     obj.paramName = { value: item["paramName"], edit: false, enable: true };
//     obj.paramCode = { value: item["paramCode"], edit: false, enable: true };
//     obj.paramPriority = {
//       value: mapValueToName(priorityOption, item["paramPriority"]),
//       edit: false,
//       enable: true,
//     };

//     obj.interpMethods = { value: convertObjToString(item["interpMethods"]), edit: false, enable: true };
//     obj.paramSeg = { value: item["paramSeg"], edit: false, enable: true };
//     obj.paramType = { value: mapValueToName(paramTypeOptions, item["paramType"]), edit: false, enable: true };
//     obj.paramAlias = { value: item["paramAlias"], edit: false, enable: true };
//     newData.push(obj);
//   });
//   return newData;
// }

// export function convertAnalyTableData(data) {
//   const interpMethodOptions = store.getters.getMethods;
//   const paramTypeOptions = store.getters.getParamType;
//   const priorityOption = store.getters.getParamPriority;
//   const newData = [];
//   data.forEach((item) => {
//     const obj = {};
//     obj.analyzeParamId = item.analyzeParamId;
//     obj.analyzeParamName = { value: item["analyzeParamName"], edit: false, enable: true };
//     obj.analyzeParamCode = { value: item["analyzeParamCode"], edit: false, enable: false };
//     obj.analyzePriority = {
//       value: mapValueToName(priorityOption, item["analyzePriority"]),
//       edit: false,
//       enable: true,
//     };

//     obj.interpMethods = { value: convertObjToString(item["interpMethods"]), edit: false, enable: true };
//     obj.analyzeParamSeg = { value: item["analyzeParamSeg"], edit: false, enable: true };
//     obj.analyzeParamType = {
//       value: mapValueToName(paramTypeOptions, item["analyzeParamType"]),
//       edit: false,
//       enable: true,
//     };
//     obj.analyzeParamAlias = { value: item["analyzeParamAlias"], edit: false, enable: true };
//     newData.push(obj);
//   });
//   return newData;
// }

/**
 * 将普通表格数据结构转为可编辑表结构
 * @param {*} data 普通表格数据结构
 * @param {*} config 哪些字段可编辑
 * @param {*} id 行id，一般进行修改删除行数据用
 * @returns
 */
export function convertXtableToEditTable(data, config = [], id = "") {
  const newData = [];
  data.forEach((element) => {
    const map = {};
    Object.keys(element).forEach((item) => {
      if (config.indexOf(item) > -1) {
        map[item] = { value: element[item] + "" || "", edit: false, enable: true };
      } else {
        map[item] = { value: element[item] + "" || "", edit: false, enable: false };
      }

      if (id && element[id]) {
        map[id] = element[id];
      }
    });
    newData.push(map);
  });

  return newData;
}

/**
 * 将可编辑表格结构转为普通表结构
 * @param {*} data
 * @returns
 */
export function convertEditTableToXtable(data) {
  const newData = [];
  data.forEach((element) => {
    const map = {};
    Object.keys(element).forEach((item) => {
      map[item] = element[item].value || "";
    });
    newData.push(map);
  });

  return newData;
}

// 数组转为下拉框格式
export function convertArrToOptions(arr) {
  if (arr instanceof Array && arr.length) {
    return arr.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
  } else {
    return [];
  }
}

/**
 * 数据转换到下拉框列表
 * @param {*} data 后端返回的列表数组
 * @param {*} key 要转换的字段
 * @returns 返回下拉框所需的结构
 */
export function covertToOption(data, key) {
  const model = [];
  data.forEach((item, index) => {
    model.push({
      label: item[key[0]],
      value: item[key[1]] + "",
      active: index === 0 ? true : false,
    });
  });
  return model;
}

export function returnToOption(data) {
  const model = [];
  data.forEach((item) => {
    model.push({
      label: item.datasourceEnName,
      value: item.datasourceName,
    });
  });
  return model;
}
/**
 * 把值映射为中文名称
 * @param {*} infoArr 映射关系
 * @param {*} value 值
 * @returns 名称
 */
function mapValueToName(infoArr, value) {
  let result = [];
  let name = "";
  result = infoArr.filter((item) => item.value == value);
  if (result.length) {
    name = result[0].label;
  }
  return name;
}

function mapNameToValue(infoArr, name) {
  const reslut = infoArr.filter((item) => item.label == name);
  return reslut[0].value;
}

/**
 * 数组转string ‘,’隔开
 * @param {*} arr 传入的数组
 * @returns
 */
export function convertObjToString(arr) {
  let name = "";
  if (arr) {
    const nameArr = arr.map((v) => v.name);
    name = nameArr.join(",");
  }
  return name;
}

/**
 * 树节点禁用
 * @param {*} arr 未禁用树
 * @returns 禁用后的树
 */
export function disabledTree(arr) {
  arr.map((item, index) => {
    item.disabled = true;
    if (item.children.length) {
      disabledTree(item.children);
    }
  });
  return arr;
}

/**
 * 获取除当前任务外其他任务列表
 * @param {*} data 原数据
 * @param {*} id 需要除去的
 * @returns
 */

export function filterList(data, id) {
  const list = [];
  data.forEach((item) => {
    if (item.flyTaskId !== id) {
      list.push({
        value: item.flyTaskId + "",
        label: item.taskCode,
      });
    }
  });
  return list;
}

/**
 * 获取本地token
 * @returns
 */
export function getToken() {
  if (localStorage.eleToken) {
    return localStorage.eleToken;
  }
}

/**
 * 获取本地用户信息
 * @returns
 */
export function getUser() {
  if (localStorage.user) {
    return JSON.parse(localStorage.user);
  }
}

/**
 * 省略多余字符，用...显示
 * @param {String} value
 * @param {number} len
 */
export function ellipsis(value, len) {
  if (!value) return "";
  if (value.length > len) {
    return value.slice(0, len) + "...";
  }
  return value;
}

// 生成uuid
export function guid2() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}

/*
 * fn [function] 需要防抖的函数
 * delay [number] 毫秒，防抖期限值
 */
export function debounce(fn, delay) {
  let timer = null; //借助闭包
  return function() {
    if (timer) {
      clearTimeout(timer); //进入该分支语句，说明当前正在一个计时过程中，并且又触发了相同事件。所以要取消当前的计时，重新开始计时
      timer = setTimeout(fn, delay);
    } else {
      timer = setTimeout(fn, delay); // 进入该分支说明当前并没有在计时，那么就开始一个计时
    }
  };
}

// 转换到画板所需格式
export function convertToDrawDataStr(res) {
  // const xdata = res.datas[0]?.xdata || [];
  const set = new Set();
  let da = null;
  const lines = [];
  if (!res.datas.length) {
    msg("error", "没有数据！");
  } else {
    console.time("xdata");

    // 把数学算法生成的线添加到datas中
    if (res.line?.length || res.other?.length) {
      const mathLines = covertLine2DrawData(res.line, res.other, res.datas);
      res.datas.push(...mathLines);
    }

    // x轴合并并去重
    res.datas.forEach((element) => {
      element.xdata?.map((item) => {
        set.add(item);
      });
    });

    da = [...set].sort(function(a, b) {
      return a - b; // 升序
    });

    const xMap = new Map();
    // 缓存合并后x轴的值与索引

    da.map((item, i) => {
      xMap.set(item, i);
    });

    res.datas.forEach((element) => {
      let newYdata = new Array(da.length).fill(null);

      element.xdata?.map((item, i) => {
        const index = xMap.get(item); // 找到合并前x在合并后x中的索引，并插值
        newYdata[index] = element.ydata[i];
      });
      newYdata = getLine(newYdata);
      lines.push({
        Point: element.Point || false,
        name: element.name || element.paramCode || "",
        unit: "",
        max: 0,
        min: 0,
        systemName: "",
        analyzeParamAlias: element.analyzeParamAlias || "0",
        analyzeParamCode: element.analyzeParamCode || "0",
        analyzeParamHash: element.analyzeParamHash,
        paramLength: 0,
        // id: element.id || element.analyzeParamId || guid2(),
        id: guid2(),
        type: element.type || "",
        taskCode: element.taskCode || "",
        data: newYdata,
        // message : element.message||[],
        // blockTime : element.blockTime||[],
        // errorTimes : element.errorTimes||[],
      });
    });

    console.timeEnd("xdata");
  }

  let showMarks = [];
  if (res.marks && res.marks.length) {
    showMarks = [...res.marks];
  }
  if (res.faultMarks && res.faultMarks.length) {
    showMarks = [...res.faultMarks];
  }
  let myIndex = res.datas.filter((v) => {
    return v.blockTime;
  });
  // console.log(myIndex,"rrrrrrrrrrrrrrrrrrrrr");
  if (myIndex.length) {
    lines.map((v) => {
      if (v.name === myIndex[0].name) {
        v.message = myIndex[0].message;
        v.blockTime = myIndex[0].blockTime;
        v.errorTimes = myIndex[0].errorTimes;
      }
    });
  }
  return {
    data: {
      datetime: da || [],
      lines: lines,
      switches: [],
      showMarks: showMarks || [],
      doubleValue: res.doubleValue || [],
      graph: res.graph || [],
      value: res.value || [],
      pointMarks: res.pointMarks || [],
      LineMarks: res.LineMarks || [],
      showMathData: res.showMathData || [],
    },
  };
}
export function convertToDrawDataStrcop(res) {
  // const xdata = res.datas[0]?.xdata || [];
  const set = new Set();
  let da = null;
  const lines = [];
  if (!res.datas.length) {
    // msg("error", "没有数据！");
  } else {
    console.time("xdata");

    // 把数学算法生成的线添加到datas中
    if (res.line?.length || res.other?.length) {
      const mathLines = covertLine2DrawData(res.line, res.other, res.datas);
      res.datas.push(...mathLines);
    }

    // x轴合并并去重
    res.datas.forEach((element) => {
      element.xdata?.map((item) => {
        set.add(item);
      });
    });
    da = [...set].sort(function(a, b) {
      return a - b; // 升序
    });
    const xMap = new Map();
    // 缓存合并后x轴的值与索引
    da.map((item, i) => {
      xMap.set(item, i);
    });

    res.datas.forEach((element) => {
      let newYdata = new Array(da.length);
      element.xdata?.map((item, i) => {
        const index = xMap.get(item); // 找到合并前x在合并后x中的索引，并插值
        newYdata[index] = element.ydata[i];
      });
      newYdata = getLine(newYdata);
      lines.push({
        Point: element.Point || false,
        name: element.name || element.paramCode || "",
        unit: "",
        max: 0,
        min: 0,
        systemName: "",
        analyzeParamAlias: element.analyzeParamAlias,
        analyzeParamCode: element.analyzeParamCode,
        analyzeParamHash: element.analyzeParamHash,
        paramLength: 0,
        id: guid2(),
        // id: element.id || element.analyzeParamId || guid2(),
        type: element.type || "",
        data: newYdata,
      });
    });

    console.timeEnd("xdata");
  }

  let showMarks = [];
  if (res.marks && res.marks.length) {
    showMarks = [...res.marks];
  }
  if (res.faultMarks && res.faultMarks.length) {
    showMarks = [...res.faultMarks];
  }

  return {
    data: {
      datetime: da || [],
      lines: lines,
      switches: [],
      showMarks: showMarks || [],
      doubleValue: res.doubleValue || [],
      graph: res.graph || [],
      value: res.value || [],
    },
  };
}
function covertLine2DrawData(line, other, all) {
  const newLines = [];
  const map = {};
  all.forEach((item) => {
    if (item.analyzeParamCode) {
      map[item.analyzeParamHash] = item.analyzeParamCode;
    }
  });

  if (line&&line.length) {
    line.forEach((item) => {
      newLines.push({
        analyzeParamAlias: "",
        analyzeParamCode: "",
        analyzeParamHash: item.mathCalculateHash,
        // name: `${item.mathName}_${map[item.mathCalculateHash]}`,
        name: item.mathName,
        type: 1,
        id: item.id,
        xdata: item.xdata,
        ydata: item.ydata,
      });
    });
  }

  if (other && other.length) {
    other.forEach((item) => {
      let str = item.realDistanceHash.map((item) => map[item]).join("_");
      newLines.push({
        analyzeParamAlias: "",
        analyzeParamCode: "",
        analyzeParamHash: item.realDistanceHash,
        // name: `差值曲线_${str}`,
        name: item.mathName,
        type: 1,
        id: item.id,
        xdata: item.xdata,
        ydata: item.ydata,
      });
    });
  }

  return newLines;
}

// 系统切换时缓存系统参数
export function storeSystemParams(oldData, newData) {
  let all = [];
  for (let i = 0; i < newData.length; i++) {
    const index = oldData.findIndex((v) => v.analyzeParamId === newData[i].analyzeParamId);
    if (index < 0) {
      all.push(newData[i]);
    }
  }
  return [...oldData, ...all];
}
// 转换到画板所需格式
export function convertToDrawDataStrs(res, errorData) {
  // const xdata = res.datas[0]?.xdata || [];
  const set = new Set();
  let da = null;
  const lines = [];
  if (!res.datas.length) {
    msg("error", "没有数据！");
  } else {
    console.time("xdata");

    // 把数学算法生成的线添加到datas中
    if (res.line?.length || res.other?.length) {
      const mathLines = covertLine2DrawData(res.line, res.other, res.datas);
      res.datas.push(...mathLines);
    }

    // x轴合并并去重
    res.datas.forEach((element) => {
      element.xdata?.map((item) => {
        set.add(item);
      });
    });
    da = [...set].sort(function(a, b) {
      return a - b; // 升序
    });
    const xMap = new Map();
    // 缓存合并后x轴的值与索引
    da.map((item, i) => {
      xMap.set(item, i);
    });

    res.datas.forEach((element) => {
      // const newYdata = new Array(da.length);
      let newYdata = new Array(da.length).fill(null);
      element.xdata?.map((item, i) => {
        const index = xMap.get(item); // 找到合并前x在合并后x中的索引，并插值
        newYdata[index] = element.ydata[i];
      });
      newYdata = getLine(newYdata);
      lines.push({
        Point: element.Point || false,
        name: element.name || element.paramCode || "",
        unit: "",
        max: 0,
        min: 0,
        systemName: "",
        analyzeParamAlias: element.analyzeParamAlias,
        analyzeParamCode: element.analyzeParamCode,
        analyzeParamHash: element.analyzeParamHash,
        paramLength: 0,
        id: guid2(),
        // id: element.id || element.analyzeParamId || guid2(),
        type: element.type || "",
        data: newYdata,
      });
    });

    console.timeEnd("xdata");
  }

  let showMarks = [];
  if (res.marks && res.marks.length) {
    showMarks = [...res.marks];
  }
  if (res.faultMarks && res.faultMarks.length) {
    showMarks = [...res.faultMarks];
  }
  // 错误信息和虚线
  if (errorData.code === 0) {
    const { errorTimes, message, blockTime, paramCode } = errorData.data;
    lines.map((v) => {
      if (v.name === paramCode) {
        v.message = message;
        v.blockTime = blockTime;
        v.errorTimes = errorTimes.split(",").map(Number);
      }
    });
  } else {
    msg("error", errorData.message);
  }
  return {
    data: {
      datetime: da || [],
      lines: lines,
      switches: [],
      showMarks: showMarks || [],
      doubleValue: res.doubleValue || [],
      graph: res.graph || [],
      value: res.value || [],
      pointMarks: res.pointMarks || [],
      LineMarks: res.LineMarks || [],
    },
  };
}
// 转换到画板所需格式
export function convertToDrawDataStrsss(res, errorData) {
  // const xdata = res.datas[0]?.xdata || [];
  const set = new Set();
  let da = null;
  const lines = [];
  if (!res.datas.length) {
    msg("error", "没有数据！");
  } else {
    console.time("xdata");

    // 把数学算法生成的线添加到datas中
    if (res.line?.length || res.other?.length) {
      const mathLines = covertLine2DrawData(res.line, res.other, res.datas);
      res.datas.push(...mathLines);
    }

    // x轴合并并去重
    res.datas.forEach((element) => {
      element.xdata?.map((item) => {
        set.add(item);
      });
    });
    da = [...set].sort(function(a, b) {
      return a - b; // 升序
    });
    const xMap = new Map();
    // 缓存合并后x轴的值与索引
    da.map((item, i) => {
      xMap.set(item, i);
    });

    res.datas.forEach((element) => {
      // const newYdata = new Array(da.length);
      let newYdata = new Array(da.length).fill(null);
      element.xdata?.map((item, i) => {
        const index = xMap.get(item); // 找到合并前x在合并后x中的索引，并插值
        newYdata[index] = element.ydata[i];
      });
      newYdata = getLine(newYdata);
      lines.push({
        Point: element.Point || false,
        name: element.name || element.paramCode || "",
        unit: "",
        max: 0,
        min: 0,
        systemName: "",
        analyzeParamAlias: element.analyzeParamAlias,
        analyzeParamCode: element.analyzeParamCode,
        analyzeParamHash: element.analyzeParamHash,
        paramLength: 0,
        id: guid2(),
        // id: element.id || element.analyzeParamId || guid2(),
        type: element.type || "",
        data: newYdata,
      });
    });

    console.timeEnd("xdata");
  }

  let showMarks = [];
  if (res.marks && res.marks.length) {
    showMarks = [...res.marks];
  }
  if (res.faultMarks && res.faultMarks.length) {
    showMarks = [...res.faultMarks];
  }
  // 错误信息和虚线
  if (errorData.code === 0) {
    const { errorTimes, message, blockTime, paramCode } = errorData.data;
    let targetName = errorData.targetName;
    let iptMdIdName = errorData.iptMdIdName;
    lines.map((v) => {
      if (v.name === targetName) {
        v.message = message;
        v.blockTime = blockTime;
        v.errorTimes = errorTimes;
      }
    });
  } else {
    msg("error", errorData.message);
  }
  return {
    data: {
      datetime: da || [],
      lines: lines,
      switches: [],
      showMarks: showMarks || [],
      doubleValue: res.doubleValue || [],
      graph: res.graph || [],
      value: res.value || [],
      pointMarks: res.pointMarks || [],
      LineMarks: res.LineMarks || [],
    },
  };
}

// 手动分析记录函数
export function retask(data) {
  let isarray = Array.isArray(store.state.projectStore.commandtableData);
  let newdata = [];
  if (!isarray) {
    newdata.push(store.state.projectStore.commandtableData);
    // return false
  } else {
    newdata = store.state.projectStore.commandtableData.map((item) => {
      return item;
    });
  }
  newdata.push(data);
  store.commit("addcommendtable", newdata);
}
function getLine(arr) {
  let temp = [];
  let res = [];
  let count = 0;
  let currentIndex = -1;
  let hasNumber = [];
  let startI = 0;
  let endI = 0;
  let allLength = arr.length;
  let firstNull = 0;
  let lastNull = 0;
  arr.forEach((v, index) => {
    if (v == null) {
      count++;
      temp[currentIndex] = { value: arr[index - count], mount: count };
    } else {
      hasNumber.push(v);
      count = 0;
      currentIndex++;
      temp[currentIndex] = { value: v, mount: count };
    }
  });
  startI = arr.indexOf(hasNumber[0]);
  endI = arr.lastIndexOf(hasNumber[hasNumber.length - 1]);
  firstNull = startI;
  if (endI === allLength - 1) {
    lastNull = 0;
  } else {
    lastNull = allLength - endI - 1;
  }
  for (let i = 0; i < temp.length - 1; i++) {
    res.push(temp[i].value);
    let aver = (temp[i + 1].value - temp[i].value) / (temp[i].mount + 1);
    for (let j = 1; j <= temp[i].mount; j++) {
      res.push(temp[i].value + j * aver);
    }
  }
  res.push(temp[temp.length - 1].value);
  for (let z = 0; z < firstNull; z++) {
    res.unshift(null);
  }
  for (let c = 0; c < lastNull; c++) {
    res.push(null);
  }
  return res;
}
