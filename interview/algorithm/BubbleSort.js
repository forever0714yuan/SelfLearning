/**
 * @description 冒泡排序
 * @param { Array } array 传入的数组
 */
function bubbleSort(array) {
  if (!Array.isArray(array)) {
    return new Error("请传入一个数组");
  }

  const length = array.length;
  for (let outIndex = 0; outIndex < length - 1; outIndex++) {
    for (let inIndex = 0; inIndex < length - 1 - outIndex; inIndex++) {
      if (array[inIndex] > array[inIndex + 1]) {
        const temp = array[inIndex + 1];

        array[inIndex + 1] = array[inIndex];

        array[inIndex] = temp;
      }
    }
  }

  return array;
}
