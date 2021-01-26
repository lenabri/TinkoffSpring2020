/**
 * Напишите функцию promiseAll(promises), поведение
 * которой аналогично поведению Promise.all(promises).
 *
 * @param  {Promise[]} promises массив с исходными промисами
 * @return {Promise}
 */
export const promiseAll = promises => new Promise((resolve, reject) => {
  const output = [];

  let counter = 0;

  for (let i = 0; i < promises.length; i++) {
    promises[i].then(
      result => {
        output[i] = result;

        counter++;
        if (counter === promises.length) {
          resolve(output);
        }
      },
      error => reject(error)
    );
  }
});
