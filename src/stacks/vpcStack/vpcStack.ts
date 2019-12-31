import  { App, Stack, StackProps } from '@aws-cdk/core';
import { SubnetType, Vpc } from '@aws-cdk/aws-ec2';
import config from '../../config/config';

class VpcStack extends Stack {
    readonly vpc: Vpc;
    private cidr: string;
    private vpcID: string;

    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);

        this.cidr = '10.0.0.0/16';
        this.vpcID = 'test';
        this.vpc = new Vpc(this, this.vpcID, {
            cidr: this.cidr,
            enableDnsHostnames: true,
            enableDnsSupport: true,
            natGateways: 1,
            maxAzs: 2,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'Public',
                    subnetType: SubnetType.PUBLIC
                },
                {
                    cidrMask: 24,
                    name: 'Public2',
                    subnetType: SubnetType.PUBLIC
                },
                {
                    cidrMask: 24,
                    name: 'Private - Application',
                    subnetType: SubnetType.PRIVATE,
                },
                {
                    cidrMask: 24,
                    name: 'Private - Database',
                    subnetType: SubnetType.PRIVATE,
                },
            ]
        });
    }
};

const runStack = (app: App) : void => {
    new VpcStack(app, 'VpcStack', { env: config.env });
};

const deployStack = (app: App) : void => {
    console.log('\x1b[32m%s\x1b[0m', 'DEPLOYING VPC STACK...\n');
    runStack(app);
};
const destroyStack = (app: App) : void => {
    console.log('\x1b[31m%s\x1b[0m', 'DESTROYING VPC STACK...\n');
    runStack(app);
};

export default {
    deployStack, destroyStack
};
