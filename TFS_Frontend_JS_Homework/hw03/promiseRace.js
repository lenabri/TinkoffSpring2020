/**
 * Напишите функцию promiseRace(promises), поведение
 * которой аналогично поведению Promise.race(promises).
 *
 * @param  {Promise[]} promises массив с исходными промисами
 * @return {Promise}
 */
export const promiseRace = promises => new Promise((resolve, reject) => {
  let done = false;

  for (const i of promises) {
    i.then(
      result => {
        if (!done) {
          resolve(result);
          done = true;
        }
      },
      error => {
        if (!done) {
          reject(error);
          done = true;
        }
      }
    );
  }
});
