/**
 * Options to configure a cron expression
 *
 * All fields are strings so you can use complex expressions. Absence of
 * a field implies '*' or '?', whichever one is appropriate.
 *
 * @see https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html
 */
export interface CronOptions {
  /**
     * The minute to run this rule at
     *
     * @default - Every minute
     */
  readonly minute?: string;

  /**
     * The hour to run this rule at
     *
     * @default - Every hour
     */
  readonly hour?: string;

  /**
     * The day of the month to run this rule at
     *
     * @default - Every day of the month
     */
  readonly day?: string;

  /**
     * The month to run this rule at
     *
     * @default - Every month
     */
  readonly month?: string;

  /**
     * The year to run this rule at
     *
     * @default - Every year
     */
  readonly year?: string;

  /**
     * The day of the week to run this rule at
     *
     * @default - Any day of the week
     */
  readonly weekDay?: string;
}

export class Cron {
  private readonly minute: string;
  private readonly hour: string;
  private readonly day: string;
  private readonly month: string;
  private readonly weekDay: string;
  private readonly year: string;

  /**
     * Create a cron expression
     */
  constructor(options: CronOptions) {
    this.validate(options);

    this.minute = options.minute ?? '*';
    this.hour = options.hour ?? '*';
    this.day = options.day ?? '*';
    this.month = options.month ?? '*';
    this.year = options.year ?? '*';
    this.weekDay = options.weekDay ?? '?';
  }

  /**
     * Return the cron expression
     */
  public toString() {
    return `cron(${this.minute} ${this.hour} ${this.day} ${this.month} ${this.weekDay} ${this.year})`;
  }

  private validate(options: CronOptions) {
    const minutePattern = /^(\*|([0-5]?[0-9](-[0-5]?[0-9])?)(,([0-5]?[0-9](-[0-5]?[0-9])?))*|\*\/[0-5]?[0-9])$/;
    const hourPattern = /^(\*|([01]?[0-9]|2[0-3])(-([01]?[0-9]|2[0-3]))?)(,([01]?[0-9]|2[0-3])(-([01]?[0-9]|2[0-3]))?)*|\*\/([01]?[0-9]|2[0-3]))$/;
    const dayPattern = /^(\*|\?|([0-2]?[0-9]|3[01])(-([0-2]?[0-9]|3[01]))?)(,([0-2]?[0-9]|3[01])(-([0-2]?[0-9]|3[01]))?)*|\*\/([0-2]?[0-9]|3[01])|L|LW|W)$/;
    const monthPattern = /^(\*|([1-9]|1[012])(-([1-9]|1[012]))?)(,([1-9]|1[012])(-([1-9]|1[012]))?)*|\*\/([1-9]|1[012]))$/;
    const weekDayPattern = /^(\*|\?|([1-7]|SUN|MON|TUE|WED|THU|FRI|SAT)(-([1-7]|SUN|MON|TUE|WED|THU|FRI|SAT))?)(,([1-7]|SUN|MON|TUE|WED|THU|FRI|SAT)(-([1-7]|SUN|MON|TUE|WED|THU|FRI|SAT))?)*|\*\/([1-7])|L|\#[1-5])$/;
    const yearPattern = /^(\*|([1][9][7-9][0-9]|2[0][0-9][0-9]|21[0-8][0-9]|219[0-9])(-([1][9][7-9][0-9]|2[0][0-9][0-9]|21[0-8][0-9]|219[0-9]))?)(,([1][9][7-9][0-9]|2[0][0-9][0-9]|21[0-8][0-9]|219[0-9])(-([1][9][7-9][0-9]|2[0][0-9][0-9]|21[0-8][0-9]|219[0-9]))?)*|\*\/([1][9][7-9][0-9]|2[0][0-9][0-9]|21[0-8][0-9]|219[0-9]))$/;

    if (options.minute && !minutePattern.test(options.minute)) {
      throw new Error('Invalid minute field');
    }
    if (options.hour && !hourPattern.test(options.hour)) {
      throw new Error('Invalid hour field');
    }
    if (options.day && !dayPattern.test(options.day)) {
      throw new Error('Invalid day field');
    }
    if (options.month && !monthPattern.test(options.month)) {
      throw new Error('Invalid month field');
    }
    if (options.weekDay && !weekDayPattern.test(options.weekDay)) {
      throw new Error('Invalid weekDay field');
    }
    if (options.year && !yearPattern.test(options.year)) {
      throw new Error('Invalid year field');
    }

    if (options.day !== '?' && options.weekDay !== '?' && (options.day !== '*' || options.weekDay !== '*')) {
      throw new Error('You cannot specify both Day-of-month and Day-of-week in the same cron expression. Use "?" in one of these fields.');
    }
    if (options.minute?.includes('/') && parseInt(options.minute.split('/')[1]) < 1) {
      throw new Error('Cron expressions that lead to rates faster than 1 minute are not supported.');
    }
  }
}