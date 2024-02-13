# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### RdsScheduler <a name="RdsScheduler" id="cdk-rds-scheduler.RdsScheduler"></a>

A scheduler for RDS instances or clusters.

#### Initializers <a name="Initializers" id="cdk-rds-scheduler.RdsScheduler.Initializer"></a>

```typescript
import { RdsScheduler } from 'cdk-rds-scheduler'

new RdsScheduler(scope: Construct, id: string, props: RdsSchedulerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-rds-scheduler.RdsScheduler.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-rds-scheduler.RdsScheduler.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-rds-scheduler.RdsScheduler.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-rds-scheduler.RdsSchedulerProps">RdsSchedulerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-rds-scheduler.RdsScheduler.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-rds-scheduler.RdsScheduler.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-rds-scheduler.RdsScheduler.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-rds-scheduler.RdsSchedulerProps">RdsSchedulerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-rds-scheduler.RdsScheduler.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-rds-scheduler.RdsScheduler.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-rds-scheduler.RdsScheduler.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-rds-scheduler.RdsScheduler.isConstruct"></a>

```typescript
import { RdsScheduler } from 'cdk-rds-scheduler'

RdsScheduler.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-rds-scheduler.RdsScheduler.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-rds-scheduler.RdsScheduler.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-rds-scheduler.RdsScheduler.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### CronOptions <a name="CronOptions" id="cdk-rds-scheduler.CronOptions"></a>

Options to configure a cron expression.

All fields are strings so you can use complex expressions. Absence of
a field implies '*' or '?', whichever one is appropriate.

> [https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cron-expressions.html)

#### Initializer <a name="Initializer" id="cdk-rds-scheduler.CronOptions.Initializer"></a>

```typescript
import { CronOptions } from 'cdk-rds-scheduler'

const cronOptions: CronOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-rds-scheduler.CronOptions.property.day">day</a></code> | <code>string</code> | The day of the month to run this rule at. |
| <code><a href="#cdk-rds-scheduler.CronOptions.property.hour">hour</a></code> | <code>string</code> | The hour to run this rule at. |
| <code><a href="#cdk-rds-scheduler.CronOptions.property.minute">minute</a></code> | <code>string</code> | The minute to run this rule at. |
| <code><a href="#cdk-rds-scheduler.CronOptions.property.month">month</a></code> | <code>string</code> | The month to run this rule at. |
| <code><a href="#cdk-rds-scheduler.CronOptions.property.weekDay">weekDay</a></code> | <code>string</code> | The day of the week to run this rule at. |
| <code><a href="#cdk-rds-scheduler.CronOptions.property.year">year</a></code> | <code>string</code> | The year to run this rule at. |

---

##### `day`<sup>Optional</sup> <a name="day" id="cdk-rds-scheduler.CronOptions.property.day"></a>

```typescript
public readonly day: string;
```

- *Type:* string
- *Default:* Every day of the month

The day of the month to run this rule at.

---

##### `hour`<sup>Optional</sup> <a name="hour" id="cdk-rds-scheduler.CronOptions.property.hour"></a>

```typescript
public readonly hour: string;
```

- *Type:* string
- *Default:* Every hour

The hour to run this rule at.

---

##### `minute`<sup>Optional</sup> <a name="minute" id="cdk-rds-scheduler.CronOptions.property.minute"></a>

```typescript
public readonly minute: string;
```

- *Type:* string
- *Default:* Every minute

The minute to run this rule at.

---

##### `month`<sup>Optional</sup> <a name="month" id="cdk-rds-scheduler.CronOptions.property.month"></a>

```typescript
public readonly month: string;
```

- *Type:* string
- *Default:* Every month

The month to run this rule at.

---

##### `weekDay`<sup>Optional</sup> <a name="weekDay" id="cdk-rds-scheduler.CronOptions.property.weekDay"></a>

```typescript
public readonly weekDay: string;
```

- *Type:* string
- *Default:* Any day of the week

The day of the week to run this rule at.

---

##### `year`<sup>Optional</sup> <a name="year" id="cdk-rds-scheduler.CronOptions.property.year"></a>

```typescript
public readonly year: string;
```

- *Type:* string
- *Default:* Every year

The year to run this rule at.

---

### RdsSchedulerProps <a name="RdsSchedulerProps" id="cdk-rds-scheduler.RdsSchedulerProps"></a>

Properties for the RdsScheduler.

#### Initializer <a name="Initializer" id="cdk-rds-scheduler.RdsSchedulerProps.Initializer"></a>

```typescript
import { RdsSchedulerProps } from 'cdk-rds-scheduler'

const rdsSchedulerProps: RdsSchedulerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-rds-scheduler.RdsSchedulerProps.property.schedule">schedule</a></code> | <code><a href="#cdk-rds-scheduler.Schedule">Schedule</a>[]</code> | The schedule for starting and stopping the RDS instance or cluster. |
| <code><a href="#cdk-rds-scheduler.RdsSchedulerProps.property.cluster">cluster</a></code> | <code>aws-cdk-lib.aws_rds.IDatabaseCluster</code> | The RDS cluster to start and stop. |
| <code><a href="#cdk-rds-scheduler.RdsSchedulerProps.property.instance">instance</a></code> | <code>aws-cdk-lib.aws_rds.IDatabaseInstance</code> | The RDS instance to start and stop. |

---

##### `schedule`<sup>Required</sup> <a name="schedule" id="cdk-rds-scheduler.RdsSchedulerProps.property.schedule"></a>

```typescript
public readonly schedule: Schedule[];
```

- *Type:* <a href="#cdk-rds-scheduler.Schedule">Schedule</a>[]

The schedule for starting and stopping the RDS instance or cluster.

---

##### `cluster`<sup>Optional</sup> <a name="cluster" id="cdk-rds-scheduler.RdsSchedulerProps.property.cluster"></a>

```typescript
public readonly cluster: IDatabaseCluster;
```

- *Type:* aws-cdk-lib.aws_rds.IDatabaseCluster
- *Default:* no cluster is specified and you must specify an instance

The RDS cluster to start and stop.

If you specify a cluster, you cannot specify an instance.

---

##### `instance`<sup>Optional</sup> <a name="instance" id="cdk-rds-scheduler.RdsSchedulerProps.property.instance"></a>

```typescript
public readonly instance: IDatabaseInstance;
```

- *Type:* aws-cdk-lib.aws_rds.IDatabaseInstance
- *Default:* no instance is specified and you must specify a cluster

The RDS instance to start and stop.

If you specify an instance, you cannot specify a cluster.

---

### Schedule <a name="Schedule" id="cdk-rds-scheduler.Schedule"></a>

#### Initializer <a name="Initializer" id="cdk-rds-scheduler.Schedule.Initializer"></a>

```typescript
import { Schedule } from 'cdk-rds-scheduler'

const schedule: Schedule = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-rds-scheduler.Schedule.property.start">start</a></code> | <code><a href="#cdk-rds-scheduler.Cron">Cron</a></code> | The start schedule. |
| <code><a href="#cdk-rds-scheduler.Schedule.property.stop">stop</a></code> | <code><a href="#cdk-rds-scheduler.Cron">Cron</a></code> | The stop schedule. |
| <code><a href="#cdk-rds-scheduler.Schedule.property.timezone">timezone</a></code> | <code>aws-cdk-lib.TimeZone</code> | The timezone for the cron expression. |

---

##### `start`<sup>Optional</sup> <a name="start" id="cdk-rds-scheduler.Schedule.property.start"></a>

```typescript
public readonly start: Cron;
```

- *Type:* <a href="#cdk-rds-scheduler.Cron">Cron</a>
- *Default:* no start schedule. The RDS instance or cluster will not be started automatically.

The start schedule.

---

##### `stop`<sup>Optional</sup> <a name="stop" id="cdk-rds-scheduler.Schedule.property.stop"></a>

```typescript
public readonly stop: Cron;
```

- *Type:* <a href="#cdk-rds-scheduler.Cron">Cron</a>
- *Default:* no stop schedule. The RDS instance or cluster will not be stopped automatically.

The stop schedule.

---

##### `timezone`<sup>Optional</sup> <a name="timezone" id="cdk-rds-scheduler.Schedule.property.timezone"></a>

```typescript
public readonly timezone: TimeZone;
```

- *Type:* aws-cdk-lib.TimeZone
- *Default:* UTC

The timezone for the cron expression.

---

## Classes <a name="Classes" id="Classes"></a>

### Cron <a name="Cron" id="cdk-rds-scheduler.Cron"></a>

#### Initializers <a name="Initializers" id="cdk-rds-scheduler.Cron.Initializer"></a>

```typescript
import { Cron } from 'cdk-rds-scheduler'

new Cron(options: CronOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-rds-scheduler.Cron.Initializer.parameter.options">options</a></code> | <code><a href="#cdk-rds-scheduler.CronOptions">CronOptions</a></code> | *No description.* |

---

##### `options`<sup>Required</sup> <a name="options" id="cdk-rds-scheduler.Cron.Initializer.parameter.options"></a>

- *Type:* <a href="#cdk-rds-scheduler.CronOptions">CronOptions</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-rds-scheduler.Cron.toString">toString</a></code> | Return the cron expression. |

---

##### `toString` <a name="toString" id="cdk-rds-scheduler.Cron.toString"></a>

```typescript
public toString(): string
```

Return the cron expression.





