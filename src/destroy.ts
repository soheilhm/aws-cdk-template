import * as cdk from '@aws-cdk/core';
import stacks from './stacks/index';

const app = new cdk.App();
stacks.forEach((stack) => {
    const { destroyStack } = stack;
    destroyStack(app);
});
app.synth();

