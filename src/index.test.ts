import { mq } from '.';

const expected = {
  basic: 'only screen and (min-width: 100px) and (max-width: 200px)'
};

test('basic usage', () => {
  expect(mq({ screen: 'only', minWidth: 100, maxWidth: 200 })).toBe(expected.basic);
});

test('basic test with destructuring', () => {
  expect(mq(({ and }) => and({ screen: 'only', minWidth: 100, maxWidth: 200 }))).toBe(expected.basic);
});

test('basic test with destructuring and expanded number values', () => {
  expect(
    mq(({ and }) =>
      and({ screen: 'only', minWidth: { value: 100, units: 'rem' }, maxWidth: { value: 200, units: 'rem' } })
    )
  ).toBe('only screen and (min-width: 100rem) and (max-width: 200rem)');
});

test('complex test - and / or', () => {
  expect(
    mq(({ and, or }) =>
      and({ screen: true }, or(and({ minWidth: 100, maxWidth: 200 }), and({ minWidth: 300, maxWidth: 400 })))
    )
  ).toBe('screen and (((min-width: 100px) and (max-width: 200px)) or ((min-width: 300px) and (max-width: 400px)))');
});

test('complex not', () => {
  expect(mq(({ and, not }) => and({ screen: false }, not({ width: 100, height: 100 })))).toBe(
    'not screen and (not ((width: 100px) and (height: 100px)))'
  );
});

test('complex from css tricks', () => {
  expect(
    mq(({ or, and }) =>
      or({ minWidth: { value: 20, units: 'em' } }, and({ all: false, minHeight: { value: 40, units: 'em' } }))
    )
  ).toBe('(min-width: 20em) or (not all and (min-height: 40em))');
});

test('prefers color scheme', () => {
  expect(mq({ prefersColorScheme: 'dark' })).toBe('(prefers-color-scheme: dark)');
});
