let Tools = {
  format,
};

/**
 *
 * @param date
 * @param formatter
 * @return {string}
 */
function format(date = new Date(), formatter = "yyyy-MM-dd hh:mm:ss") {
  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };

  if (/(y+)/.test(formatter)) {
    formatter = formatter.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (let k in o) {
    if (!o.hasOwnProperty(k)) continue;
    if (new RegExp("(" + k + ")").test(formatter)) {
      formatter = formatter.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }

  return formatter;
}
function handelvalue(data) {
      let residue = data % 10;
      if (residue >= 0) {
        if (residue >= 5) {
          data=data + 10 - residue;
        } else {
            data=data - residue;
        }
      } else {
        if (residue > -5) {
            data=data - residue;
        } else {
            data=data - 10 - residue;
        }
      }
    return data;
}

export { Tools, format, handelvalue };
export default Tools;
