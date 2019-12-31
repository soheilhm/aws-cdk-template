import { Vpc } from '@aws-cdk/aws-ec2';
import * as cdk from '@aws-cdk/core';

export const getDefaultVPC = (stack: cdk.Stack) => Vpc.fromLookup(stack, 'vpc', { isDefault: true });
export const getVPCByID = (stack: cdk.Stack , vpcId: string) => Vpc.fromLookup(stack, 'vpc', { vpcId });
