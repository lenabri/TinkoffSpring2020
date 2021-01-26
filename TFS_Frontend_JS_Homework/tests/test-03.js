import test from 'ava';
import delay from 'delay';
import { NumberAndString } from '../hw03/numberAndString';
import { rejectOnTimeout } from '../hw03/rejectOnTimeout';
import { promiseAll } from '../hw03/promiseAll';
import { promiseRace } from '../hw03/promiseRace';
import { flatMapPolyfill } from '../hw03/flatMap';

test('Lesson 03: NumberAndString', t => {
  const values = ['hello', 'javascript', 'world'];
  const instances = values.map(str => new NumberAndString(str));

  t.is(
    instances.join(' '),
    'hello javascript world'
  );

  t.is(
    instances.reduce((obj, memo) => memo + obj, 0),
    20
  );
});

test('Lesson 03: rejectOnTimeout, 01', async t => {
  const result = await rejectOnTimeout(Promise.resolve(10), 100);

  t.is(
    result,
    10
  );
});

test('Lesson 03: rejectOnTimeout, 02', async t => {
  const result = await rejectOnTimeout(Promise.reject(10), 100)
    .catch(error => error);

  t.is(
    result,
    10
  );
});

test('Lesson 03: rejectOnTimeout, 03', async t => {
  const delayed = delay(100, { value: 10 });
  const result = await rejectOnTimeout(delayed, 50)
    .catch(error => error);

  t.is(
    result,
    'timeout_error'
  );
});

test('Lesson 03: rejectOnTimeout, 04', async t => {
  const delayed = delay.reject(100, { value: 10 });
  const result = await rejectOnTimeout(delayed, 50)
    .catch(error => error);

  t.is(
    result,
    'timeout_error'
  );
});

test('Lesson 03: promiseAll, 01', async t => {
  const result = await promiseAll([
    Promise.reject('test_error'),
    Promise.resolve('test_value')
  ])
    .catch(error => error);

  t.is(
    result,
    'test_error'
  );
});

test('Lesson 03: promiseAll, 02', async t => {
  const result = await promiseAll([
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ]);

  t.deepEqual(
    result,
    [1, 2, 3]
  );
});

test('Lesson 03: promiseAll, 03', async t => {
  const result = await promiseAll([
    delay.reject(50, { value: 10 }),
    Promise.resolve(2),
    Promise.resolve(3)
  ])
    .catch(error => error);

  t.is(
    result,
    10
  );
});

test('Lesson 03: promiseAll, 04', async t => {
  const result = await promiseAll([
    delay(50, { value: 1 }),
    delay(100, { value: 2 }),
    Promise.resolve(3)
  ]);

  t.deepEqual(
    result,
    [1, 2, 3]
  );
});

test('Lesson 03: promiseRace, 01', async t => {
  const result = await promiseRace([
    Promise.reject('test_error'),
    Promise.resolve('test_value')
  ])
    .catch(error => error);

  t.is(
    result,
    'test_error'
  );
});

test('Lesson 03: promiseRace, 02', async t => {
  const result = await promiseRace([
    delay.reject(100, { value: 'test_error' }),
    delay(50, { value: 'test_value' })
  ]);

  t.is(
    result,
    'test_value'
  );
});

test('Lesson 03: promiseRace, 03', async t => {
  const result = await promiseRace([
    delay(100, { value: 1 }),
    delay(50, { value: 2 }),
    delay(25, { value: 3 })
  ]);

  t.is(
    result,
    3
  );
});

test('Lesson 03: flatMap polyfill', t => {
  const original = {
    writable: true,
    enumerable: false,
    configurable: true
  };

  // eslint-disable-next-line
  Array.prototype.flatMap = function flatMap() {
    throw new Error('Nope');
  };

  class PseudoArray extends Array {}

  flatMapPolyfill(PseudoArray);

  t.is(
    Object.prototype.hasOwnProperty.call(
      PseudoArray.prototype, 'flatMap'
    ),
    true
  );

  const { value: _, ...descriptor } = Object.getOwnPropertyDescriptor(
    PseudoArray.prototype, 'flatMap'
  );

  t.deepEqual(
    descriptor,
    original
  );

  t.deepEqual(
    (new PseudoArray(1, 2, 3, 4))
      .flatMap(x => [x * 2]),
    new PseudoArray(2, 4, 6, 8)
  );

  t.deepEqual(
    (new PseudoArray("it's Sunny in", '', 'California'))
      .flatMap(x => x.split(' ')),
    new PseudoArray("it's", 'Sunny', 'in', '', 'California')
  );

  t.deepEqual(
    (new PseudoArray(1, 2, 3, 4))
      .flatMap((x, index) => [x, index]),
    new PseudoArray(1, 0, 2, 1, 3, 2, 4, 3)
  );

  const context = { t: 1 };

  t.deepEqual(
    (new PseudoArray(1, 2))
      .flatMap(function() {
        return this;
      }, context),
    new PseudoArray(context, context)
  );
});
