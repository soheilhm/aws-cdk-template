import  { App, Stack, StackProps } from '@aws-cdk/core';
import { Group, Policy, PolicyStatement } from '@aws-cdk/aws-iam';
import config from '../../config/config';

const _defineGroupPolicies = (scope: IamStack, groupName: string) : void => {
    switch (groupName) {
        case 'developers': {
            const developerGroup = new Group(scope, `${groupName}-id`, { groupName });
            const policy = new Policy(scope, `${groupName}-policy`);
            const groupPolicies = [
                {
                    resources: ['arn:aws:iam::*:user/${aws:username}'],
                    actions: ['iam:ChangePassword']
                },
                {
                    resources: ['*'],
                    actions: ['lambda:InvokeFunction']
                }
            ];
            groupPolicies.forEach(groupPolicy => {
                const policyStatement = new PolicyStatement(groupPolicy);
                policy.addStatements(policyStatement);
            })

            developerGroup.attachInlinePolicy(policy);
        }
    }

};

class IamStack extends Stack {
    private groups: string[];

    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);
        this.groups = ['developers'];

        this.groups.forEach((group) => _defineGroupPolicies(this, group));
    }
};

const runStack = (app: App) : void => {
    new IamStack(app, 'IamStack', { env: config.env });
};

const deployStack = (app: App) : void => {
    console.log('\x1b[32m%s\x1b[0m', 'DEPLOYING IAM STACK...\n');
    runStack(app);
};
const destroyStack = (app: App) : void => {
    console.log('\x1b[31m%s\x1b[0m', 'DESTROYING IAM STACK...\n');
    runStack(app);
};

export default {
    deployStack, destroyStack
};
