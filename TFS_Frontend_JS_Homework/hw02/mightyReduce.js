/**
 * Напишите функцию reduceMap(fn, input), создающую новый
 * массив с результатами вызова функции fn на каждом
 * элементе массива input.
 *
 * Для реализации функции используйте reduce.
 *
 * Пример:
 * reduceMap(x => x * 2, [1, 2, 3]); // [2, 4, 6]
 *
 * @param {Function} fn    функция-маппер
 * @param {*[]}      input массив значений
 */
function reduceMap(fn, input) {
  return input.reduce((arr, item) => {
    arr.push(fn(item));

    return arr;
  }, []);
}

function reduceFilter(fn, input) {
  return input.reduce((arr, item) => {
    if (fn(item)) {
      arr.push(item);
    }

    return arr;
  }, []);
}
