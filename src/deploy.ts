import * as cdk from '@aws-cdk/core';
import stacks from './stacks/index';

const app = new cdk.App();
stacks.forEach((stack) => {
    const { deployStack } = stack;
    deployStack(app);
});
app.synth();
