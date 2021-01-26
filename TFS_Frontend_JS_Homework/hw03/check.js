const p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'one');
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, 'two');
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'three');
});

const p4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, 'four');
});

const p5 = new Promise((resolve, reject) => {
// Это обещание прервет Promise.all
  reject('reject');
});


const promiseAlll = promises => new Promise((resolve, reject) => {
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

promiseAlll([p1, p2, p3, p4, p5]).then(res => console.log(res), err => console.log(err));
