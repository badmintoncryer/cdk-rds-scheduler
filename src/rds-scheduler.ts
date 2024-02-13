import { Stack, TimeZone } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as scheduler from 'aws-cdk-lib/aws-scheduler';
import { Construct } from 'constructs';
import { Cron } from './cron';

export interface Schedule {
  /**
   * The start schedule
   *
   * @default - no start schedule. The RDS instance or cluster will not be started automatically.
   */
  readonly start?: Cron;
  /**
   * The stop schedule
   *
   * @default - no stop schedule. The RDS instance or cluster will not be stopped automatically.
   */
  readonly stop?: Cron;
  /**
   * The timezone for the cron expression
   *
   * @default UTC
   */
  readonly timezone?: TimeZone;
}

/**
 * Properties for the RdsScheduler
 */
export interface RdsSchedulerProps {
  /**
   * The RDS cluster to start and stop.
   * If you specify a cluster, you cannot specify an instance.
   *
   * @default - no cluster is specified and you must specify an instance
   */
  readonly cluster?: rds.IDatabaseCluster;
  /**
   * The RDS instance to start and stop.
   * If you specify an instance, you cannot specify a cluster.
   *
   * @default - no instance is specified and you must specify a cluster
   */
  readonly instance?: rds.IDatabaseInstance;
  /**
   * The schedule for starting and stopping the RDS instance or cluster
   */
  readonly schedule: Schedule[];
}

/**
 * A scheduler for RDS instances or clusters
 */
export class RdsScheduler extends Construct {
  constructor (scope: Construct, id: string, props: RdsSchedulerProps) {
    super(scope, id);

    if (props.cluster && props.instance) {
      throw new Error('You can only specify either a cluster or an instance, not both.');
    }
    if (!props.cluster && !props.instance) {
      throw new Error('You must specify either a cluster or an instance.');
    }
    if (props.schedule.length === 0) {
      throw new Error('You must specify at least one schedule.');
    }
    const isCluster = !!props.cluster;

    const identifier = isCluster ? props.cluster!.clusterIdentifier : props.instance!.instanceIdentifier;
    const schedulerRole = new iam.Role(this, 'SchedulerRole', {
      assumedBy: new iam.ServicePrincipal('scheduler.amazonaws.com'),
      inlinePolicies: {
        SchedulerPolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              effect: iam.Effect.ALLOW,
              actions: isCluster ? ['rds:StartDBCluster', 'rds:StopDBCluster'] : ['rds:StartDBInstance', 'rds:StopDBInstance'],
              resources: [
                Stack.of(this).formatArn({
                  service: 'rds',
                  resource: isCluster ? 'cluster' : 'db',
                  resourceName: identifier,
                }),
              ],
            }),
          ],
        }),
      },
    });

    props.schedule.forEach((schedule, index) => {
      if (schedule.start) {
        new scheduler.CfnSchedule(this, `StartSchedule${index}`, {
          flexibleTimeWindow: {
            mode: 'OFF',
          },
          scheduleExpression: schedule.start.toString(),
          scheduleExpressionTimezone: schedule.timezone?.timezoneName ?? TimeZone.ETC_UTC.timezoneName,
          target: {
            arn: Stack.of(this).formatArn({
              service: 'scheduler',
              resource: 'aws-sdk:rds',
              resourceName: isCluster ? 'startDBCluster' : 'startDBInstance',
            }),
            roleArn: schedulerRole.roleArn,
            input: JSON.stringify({
              ...(isCluster ? {
                DBClusterIdentifier: identifier,
              } : {
                DBInstanceIdentifier: identifier,
              }),
            }),
          },
        });
      }

      if (schedule.stop) {
        new scheduler.CfnSchedule(this, `StopSchedule${index}`, {
          flexibleTimeWindow: {
            mode: 'OFF',
          },
          scheduleExpression: schedule.stop.toString(),
          scheduleExpressionTimezone: schedule.timezone?.timezoneName ?? TimeZone.ETC_UTC.timezoneName,
          target: {
            arn: Stack.of(this).formatArn({
              service: 'scheduler',
              resource: 'aws-sdk:rds',
              resourceName: isCluster ? 'stopDBCluster' : 'stopDBInstance',
            }),
            roleArn: schedulerRole.roleArn,
            input: JSON.stringify({
              ...(isCluster ? {
                DBClusterIdentifier: identifier,
              } : {
                DBInstanceIdentifier: identifier,
              }),
            }),
          },
        });
      }
    });
  }
}
