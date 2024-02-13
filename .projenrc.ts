import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Kazuho CryerShinozuka',
  authorAddress: 'malaysia.cryer@gmail.com',
  cdkVersion: '2.127.0',
  description: 'Automatic Start and Stop Scheduler for AWS RDS',
  defaultReleaseBranch: 'main',
  keywords: ['aws', 'cdk', 'RDS', 'aws-cdk', 'EventBridge'],
  jsiiVersion: '~5.3.0',
  name: 'cdk-rds-scheduler',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/badmintoncryer/cdk-rds-scheduler.git',

  eslintOptions: {
    dirs: [],
    ignorePatterns: ['example/**/*', 'test/assets/**/*', 'test/*.snapshot/**/*', '*.d.ts'],
  },
  gitignore: ['*.js', '*.d.ts', '!test/.*.snapshot/**/*', '.tmp'],
  tsconfigDev: {
    compilerOptions: {},
    exclude: ['example', 'test/.*.snapshot'],
  },
  devDeps: ['@aws-cdk/integ-runner@2.127.0-alpha.0', '@aws-cdk/integ-tests-alpha@2.127.0-alpha.0'],

  packageName: 'rds-scheduler', /* The "name" in package.json. */

  publishToPypi: {
    distName: 'rds-scheduler',
    module: 'rds_scheduler',
  },
});

project.projectBuild.testTask.exec('yarn tsc -p tsconfig.dev.json && yarn integ-runner');

project.synth();