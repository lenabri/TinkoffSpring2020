/**
 * Напишите функцию meanMode(numbers), принимающую массив чисел numbers
 * и возвращающую true, если среднее значение числового ряда равно
 * числу (или любому из чисел), встречающемуся чаще остальных. Иначе
 * вернуть false.
 *
 * Если есть несколько чисел, встречающихся одинаковое количество раз,
 * и чаще всех остальных, считать входящий массив невалидным и
 * возвращать false.
 *
 * Пример:
 * meanMode([1]) === true
 * meanMode([4, 4, 4, 6, 2]) === true
 * meanMode([1, 2, 3]) === false
 * meanMode([1, 1, 1, 2, 5]) === false
 * meanMode([]) === false
 *
 * Больше примеров в тестах.
 *
 * @param  {number[]} numbers массив целых положительных чисел.
 * @return {boolean}
 */
function meanMode(numbers) {
  if (numbers.length === 0) {
    return false;
  }

  const map = {};
  const mean = numbers.reduce((sum, current) => {
    if (current in map) {
      map[current] += 1;
    } else {
      map[current] = 1;
    }

    return sum + current;
  }, 0) / numbers.length;
  const max = {
    key: null,
    value: -Infinity
  };

  for (const key in map) {
    if (map[key] > max.value) {
      max.value = map[key];
      max.key = Number(key);
    }
  }
  for (const key in map) {
    if (map[key] === max.value && Number(key) !== max.key) {
      return false;
    }
  }

  return max.key === mean;
}