import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Cron, RdsScheduler } from '../src';


let app: App;
let stack: Stack;
let vpc: ec2.Vpc;
beforeEach(() => {
  app = new App();
  stack = new Stack(app, 'TestStack');
  vpc = new ec2.Vpc(stack, 'Vpc');
});

test('default for database cluster', () => {
  const databaseCluster = new rds.DatabaseCluster(stack, 'DatabaseCluster', {
    engine: rds.DatabaseClusterEngine.AURORA,
    instanceProps: {
      vpc: vpc,
    },
  });

  new RdsScheduler(stack, 'RdsScheduler', {
    cluster: databaseCluster,
    schedule: [
      {
        start: new Cron({ minute: '0', hour: '8', weekDay: 'MON-FRI' }),
        stop: new Cron({ minute: '0', hour: '18', weekDay: 'MON-FRI' }),
      },
    ],
  });

  const template = Template.fromStack(stack);
  console.log(JSON.stringify(template.toJSON(), null, 2));
  template.hasResourceProperties('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: 'scheduler.amazonaws.com',
          },
        },
      ],
      Version: '2012-10-17',
    },
    Policies: [
      {
        PolicyDocument: {
          Statement: [
            {
              Action: ['rds:StartDBCluster', 'rds:StopDBCluster'],
              Effect: 'Allow',
              Resource: {
                'Fn::Join': [
                  '',
                  [
                    'arn:',
                    {
                      Ref: 'AWS::Partition',
                    },
                    ':rds:',
                    {
                      Ref: 'AWS::Region',
                    },
                    ':',
                    {
                      Ref: 'AWS::AccountId',
                    },
                    ':cluster/',
                    {
                      Ref: 'DatabaseCluster68FC2945',
                    },
                  ],
                ],
              },
            },
          ],
          Version: '2012-10-17',
        },
        PolicyName: 'SchedulerPolicy',
      },
    ],
  });
  template.hasResourceProperties('AWS::Scheduler::Schedule', {
    FlexibleTimeWindow: {
      Mode: 'OFF',
    },
    ScheduleExpression: 'cron(0 8 * * MON-FRI *)',
    ScheduleExpressionTimezone: 'Etc/UTC',
    Target: {
      Arn: {
        'Fn::Join': [
          '',
          [
            'arn:',
            {
              Ref: 'AWS::Partition',
            },
            ':scheduler:',
            {
              Ref: 'AWS::Region',
            },
            ':',
            {
              Ref: 'AWS::AccountId',
            },
            ':aws-sdk:rds/startDBCluster',
          ],
        ],
      },
      Input: {
        'Fn::Join': [
          '',
          [
            '{"DBClusterIdentifier":"',
            {
              Ref: 'DatabaseCluster68FC2945',
            },
            '"}',
          ],
        ],
      },
      RoleArn: {
        'Fn::GetAtt': [
          'RdsSchedulerSchedulerRole35200A83',
          'Arn',
        ],
      },
    },
  });
  template.hasResourceProperties('AWS::Scheduler::Schedule', {
    FlexibleTimeWindow: {
      Mode: 'OFF',
    },
    ScheduleExpression: 'cron(0 18 * * MON-FRI *)',
    ScheduleExpressionTimezone: 'Etc/UTC',
    Target: {
      Arn: {
        'Fn::Join': [
          '',
          [
            'arn:',
            {
              Ref: 'AWS::Partition',
            },
            ':scheduler:',
            {
              Ref: 'AWS::Region',
            },
            ':',
            {
              Ref: 'AWS::AccountId',
            },
            ':aws-sdk:rds/stopDBCluster',
          ],
        ],
      },
      Input: {
        'Fn::Join': [
          '',
          [
            '{"DBClusterIdentifier":"',
            {
              Ref: 'DatabaseCluster68FC2945',
            },
            '"}',
          ],
        ],
      },
      RoleArn: {
        'Fn::GetAtt': [
          'RdsSchedulerSchedulerRole35200A83',
          'Arn',
        ],
      },
    },
  });
});

test('default for database instance', () => {
  const databaseInstance = new rds.DatabaseInstance(stack, 'DatabaseInstance', {
    engine: rds.DatabaseInstanceEngine.MYSQL,
    instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE2, ec2.InstanceSize.MICRO),
    vpc: vpc,
  });

  new RdsScheduler(stack, 'RdsScheduler', {
    instance: databaseInstance,
    schedule: [
      {
        start: new Cron({ minute: '0', hour: '8', weekDay: 'MON-FRI' }),
        stop: new Cron({ minute: '0', hour: '18', weekDay: 'MON-FRI' }),
      },
    ],
  });

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: 'scheduler.amazonaws.com',
          },
        },
      ],
      Version: '2012-10-17',
    },
    Policies: [
      {
        PolicyDocument: {
          Statement: [
            {
              Action: ['rds:StartDBInstance', 'rds:StopDBInstance'],
              Effect: 'Allow',
              Resource: {
                'Fn::Join': [
                  '',
                  [
                    'arn:',
                    {
                      Ref: 'AWS::Partition',
                    },
                    ':rds:',
                    {
                      Ref: 'AWS::Region',
                    },
                    ':',
                    {
                      Ref: 'AWS::AccountId',
                    },
                    ':db/',
                    {
                      Ref: 'DatabaseInstance24D16791',
                    },
                  ],
                ],
              },
            },
          ],
          Version: '2012-10-17',
        },
        PolicyName: 'SchedulerPolicy',
      },
    ],
  });
  template.hasResourceProperties('AWS::Scheduler::Schedule', {
    FlexibleTimeWindow: {
      Mode: 'OFF',
    },
    ScheduleExpression: 'cron(0 8 * * MON-FRI *)',
    ScheduleExpressionTimezone: 'Etc/UTC',
    Target: {
      Arn: {
        'Fn::Join': [
          '',
          [
            'arn:',
            {
              Ref: 'AWS::Partition',
            },
            ':scheduler:',
            {
              Ref: 'AWS::Region',
            },
            ':',
            {
              Ref: 'AWS::AccountId',
            },
            ':aws-sdk:rds/startDBInstance',
          ],
        ],
      },
      Input: {
        'Fn::Join': [
          '',
          [
            '{"DBInstanceIdentifier":"',
            {
              Ref: 'DatabaseInstance24D16791',
            },
            '"}',
          ],
        ],
      },
      RoleArn: {
        'Fn::GetAtt': [
          'RdsSchedulerSchedulerRole35200A83',
          'Arn',
        ],
      },
    },
  });
  template.hasResourceProperties('AWS::Scheduler::Schedule', {
    FlexibleTimeWindow: {
      Mode: 'OFF',
    },
    ScheduleExpression: 'cron(0 18 * * MON-FRI *)',
    ScheduleExpressionTimezone: 'Etc/UTC',
    Target: {
      Arn: {
        'Fn::Join': [
          '',
          [
            'arn:',
            {
              Ref: 'AWS::Partition',
            },
            ':scheduler:',
            {
              Ref: 'AWS::Region',
            },
            ':',
            {
              Ref: 'AWS::AccountId',
            },
            ':aws-sdk:rds/stopDBInstance',
          ],
        ],
      },
      Input: {
        'Fn::Join': [
          '',
          [
            '{"DBInstanceIdentifier":"',
            {
              Ref: 'DatabaseInstance24D16791',
            },
            '"}',
          ],
        ],
      },
      RoleArn: {
        'Fn::GetAtt': [
          'RdsSchedulerSchedulerRole35200A83',
          'Arn',
        ],
      },
    },
  });
});
