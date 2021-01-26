/**
 * Напишите функцию getIntersection(first, second), возвращающую
 * массив из общих значений массивов first и second.
 *
 * Результирующий массив должен быть отсортирован по возрастанию.
 *
 * Пример:
 * getIntersection([1, 3, 5, 7, 9], [1, 2, 3, 4]); //  [1, 3]
 * getIntersection([1, 1, 2], [2, 1, 1, 1]); // [1, 1, 2]
 *
 * @param  {number[]} first исходные массивы
 * @param  {number[]} second исходные массивы
 * @return {number[]} массив значений, отсортированный по возрастанию
 */
function getIntersection(first, second) {
  const arr = [];
  const scnd = [...second];

  first.forEach(item => {
    const idx = scnd.indexOf(item);

    if (idx !== -1) {
      scnd.splice(idx, 1);
      arr.push(item);
    }
  });

  function sortRules(a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }

    return 0;
  }

  return arr.sort(sortRules);
}
