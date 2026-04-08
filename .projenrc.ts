import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  majorVersion: 1,
  author: 'Kazuho CryerShinozuka',
  authorAddress: 'malaysia.cryer@gmail.com',
  cdkVersion: '2.144.0',
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
  devDeps: ['@aws-cdk/integ-runner@2.144.0-alpha.0', '@aws-cdk/integ-tests-alpha@2.144.0-alpha.0'],
  packageName: 'cdk-rds-scheduler', /* The "name" in package.json. */
  publishToPypi: {
    distName: 'rds-scheduler',
    module: 'rds_scheduler',
  },
});

project.projectBuild.testTask.exec('yarn tsc -p tsconfig.dev.json && yarn integ-runner');

// Override release_pypi job to use PyPI Trusted Publishing (OIDC) instead of username/password
// PyPI requires the trusted publisher to be configured at:
// https://pypi.org/manage/project/rds-scheduler/settings/publishing/
const releaseWorkflow = project.github?.tryFindWorkflow('release');
releaseWorkflow?.file?.addOverride('jobs.release_pypi.permissions', {
  contents: 'read',
  'id-token': 'write',
});
// Replace the publib-pypi step (index 8) with pypa/gh-action-pypi-publish
releaseWorkflow?.file?.addDeletionOverride('jobs.release_pypi.steps.8.run');
releaseWorkflow?.file?.addDeletionOverride('jobs.release_pypi.steps.8.env');
releaseWorkflow?.file?.addOverride('jobs.release_pypi.steps.8.uses', 'pypa/gh-action-pypi-publish@release/v1');
releaseWorkflow?.file?.addOverride('jobs.release_pypi.steps.8.with', {
  'packages-dir': 'dist/python',
  attestations: false,
});

project.synth();