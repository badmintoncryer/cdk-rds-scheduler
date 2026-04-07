import { Cron } from '../src';

test('default', () => {
  const cron = new Cron({});
  expect(cron.toString()).toBe('cron(* * * * ? *)');
});

test('weekDay sets day to ?', () => {
  const cron = new Cron({ minute: '0', hour: '8', weekDay: 'MON-FRI' });
  expect(cron.toString()).toBe('cron(0 8 ? * MON-FRI *)');
});

test('day sets weekDay to ?', () => {
  const cron = new Cron({ minute: '0', hour: '0', day: '15' });
  expect(cron.toString()).toBe('cron(0 0 15 * ? *)');
});