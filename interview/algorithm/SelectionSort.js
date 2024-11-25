/**
 * @param {Array} array
 * @description 选择排序
 * @returns {Array | Error}
 */

function selectionSort(array) {
  if (Array.isArray(array)) {
    return new Error("请传入数组");
  }

  const length = array.length;

  for (let outIndex = 0; outIndex < length - 1; outIndex++) {
    let minIndex = outIndex;
    let temp;

    for (let inIndex = outIndex + 1; inIndex < length; inIndex++) {
      if (array[inIndex] < array[minIndex]) {
        minIndex = inIndex;
      }
    }

    temp = array[outIndex];
    array[outIndex] = array[minIndex];
    array[minIndex] = temp;
  }

  return array;
}
