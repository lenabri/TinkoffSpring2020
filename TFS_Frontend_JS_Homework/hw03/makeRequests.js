/**
 * Задача повышенной сложности. На неё нет тестов, и ее выполнение
 * должно быть визуализировано.
 *
 * Напишите функцию makeRequests(urls, maxRequests), получающую
 * на вход массив ссылок urls и число maxRequests - максимальное
 * количество одновременных запросов. Условия:
 *
 * 1. Одновременно должно выполняться не более указанного
 *    числа запросов.
 * 2. Должен возвращаться promise, резолвящийся в массив результатов
 *    в той же последовательности, что и адреса запросов.
 * 3. Дублирующиеся урлы должны игнорироваться (при этом
 *    результат всё равно должен присутствовать в результате
 *    на нужной позиции).
 * 4. При падении любого из запросов вернувшийся промис
 *    должен реджектиться с той же ошибкой, что и оригинальный
 *    запрос.
 *
 * Требования к визуализации:
 *
 * 1. Должен быть создан index.html
 * 2. В интерфейсе должна быть возможность задать любое количество url.
 *    (Можно сделать это добавлением/удалением полей, перечислить через запятую в одном текстовом поле
 *    или любой другой вариант, на который хватит фантазии)
 * 3. В интерфейсе должна быть возможность задать число -- ограничение на количество запросов
 * 4. В интерфейсе должна быть кнопка, по нажатию на которую должно начинаться выполнение запросов
 * 5. После запуска должен отображаться список url
 * 6. У каждого url должен отображаться актуальный статус
 *    (wait, in progress, resolved, rejected), доп информация (duplicate) и результат. Хорошо,
 *    если статус будет отображаться цветом
 * 7. После выполнения всех запросов на страницу нужно вывести результат
 *
 * @param  {string[]} urls      массив с адресами
 * @param  {number} maxRequests максимальное количество одновременных запросов
 * @return {Promise}
 */
export default function makeRequests(urls, maxRequests) {
  return new Promise((resolve, reject) => {
    const output = new Map();

    let counter = 0;

    let promises = [];

    const processUrl = async(url, result) => {
      await result.text().then(text => {
        output.set(url, text);
      });

      if (result.status === 200) {
        document.getElementById(url).style.color = 'green';
      } else {
        document.getElementById(url).style.color = 'orange';
      }

      counter++;
      if (counter === urls.length) {
        resolve(output);
      }
    };

    const rejectUrl = (url, error) => {
      document.getElementById(url).style.color = 'red';

      reject({ url, error });
    };

    const requestUrl = async url => {
      const request = new Request(url);

      /* eslint-disable no-await-in-loop */
      while (promises.length >= maxRequests) {
        await Promise.race(promises);
      }
      /* eslint-enable no-await-in-loop */

      document.getElementById(url).style.color = 'white';

      const currentPromise = fetch(request).then(
        response => processUrl(url, response),
        error => rejectUrl(url, error)
      );

      promises.push(currentPromise);
      // currentPromise.then(
      //   _ => promises = promises.filter(p => p !== currentPromise)
      // );
      await currentPromise.catch(err => console.log(err));
      promises = promises.filter(p => p !== currentPromise);
    };

    for (const url of urls) {
      requestUrl(url).catch(err => reject(err));
    }
  });
}

// https://raw.githubusercontent.com/Gregory06/school_timetable_generator/master/Src/CABCOptimizer.cpp
// https://raw.githubusercontent.com/Gregory06/school_timetable_generator/master/main.cpp
// https://raw.githubusercontent.com/Gregory06/school_timetable_generator/master/Src/CABCOptimizer.cpp
// https://raw.githubusercontent.com/Gregory06/school_timetable_generator/master/Src/CCabinet.cpp
// https://raw.githubusercontent.com/Gregory06/school_timetable_generator/master/Src/CObjectiveFunction.cpp
// https://raw.githubusercontent.com/Gregory06/school_timetable_generator/master/Src/CGroup.cpp
// https://raw.githubusercontent.com/Gregory06/hugeFiles/master/4.txt
// https://raw.githubusercontent.com/Gregory06/hugeFiles/master/9.txt
//
//
