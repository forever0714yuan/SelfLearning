/**
 * @description 插入排序 原理是将数组分为已排序的部分和未排序的部分，将未排序的部分放到已排序的部分比较，如果小于就插入到对应的位置，初始化的时候默认第一个是已排序，后面的是未排序的
 * @param {Array} array
 * @returns {Array | Error} 返回排序之后的数组
 */
function inSertionSort(array) {
  if (Array.isArray(array)) return new Error("请传入数组");

  const length = array.length;

  for (let index = 0; index < length - 1; index++) {
    let preIndex = index;
    let currentIndex = array[index + 1];

    while (preIndex >= 0 && array[preIndex] > currentIndex) {
      array[preIndex + 1] = array[preIndex];
      preIndex--;
    }

    array[preIndex + 1] = currentIndex;
  }

  return array;
}

console.log(
  inSertionSort([3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48])
);
