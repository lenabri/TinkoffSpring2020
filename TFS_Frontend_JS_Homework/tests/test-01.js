import test from 'ava';
import getMinMax from '../hw01/getMinMax';
import multiple from '../hw01/multiple';
import capitalize from '../hw01/capitalize';
import passwordCheck from '../hw01/passwordCheck';
import limitCalls from '../hw01/limitCalls';
import rle from '../hw01/rle';
import sum from '../hw01/sum';


test('Lesson 1: getMinMax', t => {
  t.deepEqual(
    getMinMax('1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028'),
    {
      max: 15,
      min: -1028
    }
  );

  t.deepEqual(
    getMinMax('100 и 500 -3; 178 или неточное число 1.3232'),
    {
      max: 500,
      min: -3
    }
  );

  t.deepEqual(
    getMinMax('"To Infinity and beyond", - repeated Buzz Lightyear 4 times in a row'),
    {
      max: Infinity,
      min: 4
    }
  );

  t.deepEqual(
    getMinMax('"To -Infinity and beyond", - repeated Buzz Lightyear 4 times in a row'),
    {
      max: 4,
      min: -Infinity
    }
  );

  t.deepEqual(
    getMinMax(`
      У нас было 2 мешка травы, 75 таблеток мескалина, 5 марок мощнейшей кислоты,
      полсолонки кокаина и гора возбудителей, успокоительных и всего такого, всех цветов,
      а ещё 1 литр текилы, 1 литр рома, ящик пива, 0.5 литра эфира и 24 амила.
    `),
    {
      max: 75,
      min: 0.5
    }
  );

  t.deepEqual(
    getMinMax('Нет ничего проще 0 и 1'),
    {
      max: 1,
      min: 0
    }
  );
});

test('Lesson 1: multiple', t => {
  const random = () => Math.floor(Math.random() * 100) * (Math.random() < 0.5 ? -1 : 1);
  const cases = [
    [1, 1],
    [1, 2],
    [0, 0],
    [random(), random()],
    [random(), random()],
    [random(), random()],
    [random(), random()],
    [random(), random()],
    [1, -Infinity],
    [0, Infinity]
  ];

  cases.forEach(([a, b]) => {
    t.is(multiple(a, b), a * b);
  });
});

test('Lesson 1: capitalize', t => {
  t.is(
    capitalize('А роза упала на лапу Азора'),
    'А Роза Упала На Лапу Азора'
  );

  t.is(
    capitalize('Use the force, Luke'),
    'Use The Force, Luke'
  );

  t.is(
    capitalize('Что-то ты маловат для штурмовика.'),
    'Что-то Ты Маловат Для Штурмовика.'
  );

  t.is(
    capitalize('Сэр, мне кажется этот астероид нестабилен.'),
    'Сэр, Мне Кажется Этот Астероид Нестабилен.'
  );

  t.is(
    capitalize('Ваша самоуверенность — ваша слабость.'),
    'Ваша Самоуверенность — Ваша Слабость.'
  );
});

test('Lesson 1: passwordCheck', t => {
  t.is(
    passwordCheck('Nagibator777'),
    false
  );

  t.is(
    passwordCheck('password'),
    false
  );

  t.is(
    passwordCheck('Bp^VfT9h'),
    false
  );

  t.is(
    passwordCheck('SbGGstn6mQf7'),
    false
  );

  t.is(
    passwordCheck('<+)saHz[6HX'),
    true
  );

  t.is(
    passwordCheck('<+)saHz[6HX'),
    true
  );

  t.is(
    passwordCheck('95-Yt$e&*d4u8E@vtUkP'),
    true
  );

  t.is(
    passwordCheck('This is the 7th password I have come up with!'),
    true
  );
});

test('Lesson 1: limitCalls', t => {
  (() => {
    let count = 0;
    const increment = () => { count += 1; };
    const limitedIncrementA = limitCalls(increment, 3);

    limitedIncrementA();
    limitedIncrementA();
    limitedIncrementA();
    limitedIncrementA();
    limitedIncrementA();

    t.is(
      count,
      3
    );

    count = 0;
    const limitedIncrementB = limitCalls(increment, 1);

    limitedIncrementB();
    limitedIncrementB();
    limitedIncrementB();

    t.is(
      count,
      1
    );
  })();
});

test('Lesson 1: rle', t => {
  t.is(
    rle('BCCDDDEEEE'),
    'BC2D3E4'
  );

  t.is(
    rle('AAAB'),
    'A3B'
  );

  t.is(
    rle('LLLKKFJJJJJJJJJDDDDDSSKQQQNNAAAAAGG'),
    'L3K2FJ9D5S2KQ3N2A5G2'
  );

  t.is(
    rle('HELLOWORLD'),
    'HEL2OWORLD'
  );

  t.is(
    rle('PARSELTANGSSSSHHHHHSSSSHHHHHSHHHH'),
    'PARSELTANGS4H5S4H5SH4'
  );
});

test('Lesson 1: sum', t => {
  t.is(
    sum(),
    0
  );

  t.is(
    sum(1)(2)(),
    3
  );

  t.is(
    sum(10)(20)(),
    30
  );

  t.is(
    sum(1)(1)(1)(1)(1)(),
    5
  );

  t.is(
    sum(15)(0)(23)(),
    38
  );
});
