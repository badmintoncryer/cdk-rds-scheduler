import { Cron } from '../src';

test('default', () => {
  const cron = new Cron({});
  expect(cron.toString()).toBe('cron(* * * * ? *)');
});