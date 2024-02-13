/**
 * Options to configure a cron expression
 *
 * All fields are strings so you can use complex expressions. Absence of
 * a field implies '*' or '?', whichever one is appropriate.
 *
 * @see https://docs.aws.amazon.com/eventbridge/latest/userguide/scheduled-events.html#cron-expressions
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
    // TODO - validate that the expression is valid
    // @see https://docs.aws.amazon.com/scheduler/latest/UserGuide/schedule-types.html?icmpid=docs_console_unmapped#cron-based

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
}