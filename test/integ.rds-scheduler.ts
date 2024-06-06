import { IntegTest } from '@aws-cdk/integ-tests-alpha';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Cron, RdsScheduler } from '../src';

const app = new App();

class TestStack extends Stack {
  constructor(scope: App, id: string, _props: StackProps = {}) {
    super(scope, id);

    const vpc = new ec2.Vpc(this, 'Vpc');

    const databaseCluster = new rds.DatabaseCluster(this, 'DatabaseCluster', {
      engine: rds.DatabaseClusterEngine.auroraPostgres({
        version: rds.AuroraPostgresEngineVersion.VER_15_2,
      }),
      writer: rds.ClusterInstance.provisioned('writer'),
      readers: [
        rds.ClusterInstance.serverlessV2('reader'),
      ],
      vpc,
    });

    new RdsScheduler(this, 'OnOffRdsScheduler', {
      cluster: databaseCluster,
      schedule: [
        {
          start: new Cron({ minute: '0', hour: '8', day: '?', weekDay: 'MON-FRI' }),
          stop: new Cron({ minute: '0', hour: '18', day: '?', weekDay: 'MON-FRI' }),
        },
      ],
    });

    new RdsScheduler(this, 'RdsInstanceScheduler', {
      cluster: databaseCluster,
      schedule: [
        // Put the instance into a dormant state.
        // As a measure for automatic start of Aurora, stop it every day.
        {
          stop: new Cron({ minute: '0', hour: '0', day: '?', weekDay: '*' }),
          // timeZone is optional, default is UTC
        },
      ],
    });
  }
}

const stack = new TestStack(app, 'TestStack');

new IntegTest(app, 'Test', {
  testCases: [stack],
});
