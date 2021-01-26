import test from 'ava';
import { anagram } from '../hw02/anagram';
import { customBind } from '../hw02/customBind';
import { getIntersection } from '../hw02/getIntersection';
import { getUnique } from '../hw02/getUnique';
import { isIsomorphic } from '../hw02/isIsomorphic';
import { meanMode } from '../hw02/meanMode';
import { mergeNumbers } from '../hw02/mergeNumbers';
import { reduceFilter, reduceMap } from '../hw02/mightyReduce';

test('Lesson 2: anagram', t => {
  t.is(
    anagram('просветитель', 'терпеливость'),
    true
  );

  t.is(
    anagram('Senator Palpatine', 'Planet separation'),
    true
  );

  t.is(
    anagram('Han Solo', 'No halos'),
    true
  );

  t.is(
    anagram('Лея Органа-Соло', 'Лея Скайуокер'),
    false
  );

  t.is(
    anagram('Татуин', 'Дантуин'),
    false,
  );

  t.is(
    anagram('aappcc', 'ааррсс'),
    false
  );
});

test('Lesson 2: customBind', t => {
  let lastParams = null;

  let lastContext = null;
  const context = { test: 'test' };

  function call(...params) {
    lastContext = this;
    lastParams = params;
  }

  const bindedFunc = customBind(call, context, 1, 3);

  bindedFunc(4);

  t.deepEqual(
    lastContext,
    context
  );

  t.deepEqual(
    lastParams,
    [1, 3, 4]
  );
});

test('Lesson 2: getIntersection', t => {
  t.deepEqual(
    getIntersection([1, 5, 7, 9, 3], [1, 2, 3, 4]),
    [1, 3]
  );

  t.deepEqual(
    getIntersection([1, 9, 10, 3, 5, 7], [10, 3, 4]),
    [3, 10]
  );

  t.deepEqual(
    getIntersection([1, 1, 2], [2, 1, 1, 1]),
    [1, 1, 2]
  );

  t.deepEqual(
    getIntersection([1, 1, 1, 2], [2, 1, 1]),
    [1, 1, 2]
  );
});

test('Lesson 2: getUnique', t => {
  t.deepEqual(
    getUnique([1, 2, 4, 2, 3, 1]),
    [1, 2, 3, 4]
  );

  t.deepEqual(
    getUnique([1, 1, 1, 1, 1]),
    [1]
  );
});

test('Lesson 2: isIsomorphic', t => {
  t.is(
    isIsomorphic('a', 'a'),
    true
  );

  t.is(
    isIsomorphic('bac', 'cab'),
    true
  );

  t.is(
    isIsomorphic('egg', 'foo'),
    true
  );

  t.is(
    isIsomorphic('good', 'deer'),
    true
  );

  t.is(
    isIsomorphic('ok', 'notok'),
    false
  );

  t.is(
    isIsomorphic('foo', 'bar'),
    false
  );

  t.is(
    isIsomorphic('bar', 'foo'),
    false
  );

  t.is(
    isIsomorphic('good', 'dder'),
    false
  );

  t.is(
    isIsomorphic('dder', 'good'),
    false
  );

  t.is(
    isIsomorphic('seeds', 'flags'),
    false
  );
});

test('Lesson 1: meanMode', t => {
  t.is(
    meanMode([1, 2, 3, 2]),
    true
  );

  t.is(
    meanMode([4, 4, 4, 6, 2]),
    true
  );

  t.is(
    meanMode([1, 2, 2, 1, 2, 4]),
    true
  );

  t.is(
    meanMode([1, 2, 3, 4, 5, 4, 2, 3, 3]),
    true
  );

  t.is(
    meanMode([9, 1, 5, 5, 4, 5, 9, 2, 5]),
    true
  );

  t.is(
    meanMode([4, 2, 1, 4, 1, 3, 2, 2, 2, 1, 0, 2]),
    true
  );

  t.is(
    meanMode([1, 2, 3]),
    false
  );

  t.is(
    meanMode([1, 1, 1, 2, 2, 2, 5]),
    false
  );

  t.is(
    meanMode([1, 2, 2, 1, 2, 3, 1]),
    false
  );

  t.is(
    meanMode([1, 22, 3, 10, 1, 10, 9]),
    false
  );

  t.is(
    meanMode([1, 22, 3, 10, 1, 10, 9]),
    false
  );

  t.is(
    meanMode([1, 1, 1, 2, 5]),
    false
  );

  t.is(
    meanMode([]),
    false
  );
});

test('Lesson 2: mergeNumbers', t => {
  t.is(
    mergeNumbers(1),
    1
  );

  t.is(
    mergeNumbers(10001),
    2
  );

  t.is(
    mergeNumbers(12345),
    6
  );

  t.is(
    mergeNumbers(15334232),
    5
  );

  t.is(
    mergeNumbers(987654321),
    9
  );

  t.is(
    mergeNumbers(555555555555),
    6
  );

  t.is(
    mergeNumbers(50349814743854),
    2
  );
});

test('Lesson 2: reduceMap', t => {
  t.deepEqual(
    reduceMap(x => x * 2, [1, 2, 3]),
    [2, 4, 6]
  );

  t.deepEqual(
    reduceMap(x => x.toUpperCase(), ['a', 'b', 'c']),
    ['A', 'B', 'C']
  );
});

test('Lesson 2: reduceFilter', t => {
  t.deepEqual(
    reduceFilter(x => true, [1, 2, 3]),
    [1, 2, 3]
  );

  t.deepEqual(
    reduceFilter(x => false, [1, 2, 3]),
    []
  );

  t.deepEqual(
    reduceFilter(x => x % 2 === 0, [1, 2, 3, 4]),
    [2, 4]
  );

  t.deepEqual(
    reduceFilter(x => x === x.toUpperCase(), ['a', 'B', 'c', 'D']),
    ['B', 'D']
  );
});
