import { App, Stack, StackProps } from '@aws-cdk/core';
import { AutoScalingGroup } from '@aws-cdk/aws-autoscaling';
import { ApplicationLoadBalancer, ApplicationTargetGroup } from '@aws-cdk/aws-elasticloadbalancingv2';
import { AmazonLinuxImage, InstanceType, InstanceClass, InstanceSize } from '@aws-cdk/aws-ec2';
import { getDefaultVPC } from '../../helpers/getVPC';
import config from '../../config/config';

class ApplicationLoadBalancerStack extends Stack {
    readonly targetGroup: ApplicationTargetGroup;
    private listenerPort: number;
    private internetFacing: boolean;
    private instanceClass: InstanceClass;
    private instanceSize: InstanceSize;
    private targetRequestsPerSecond: number;
    private loadBalancerID: string;
    private loadBalancerName: string;
    private autoScalingGroupID: string;

    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);
        this.listenerPort = 80;
        this.internetFacing = true;
        this.instanceClass = InstanceClass.T2;
        this.instanceSize = InstanceSize.MICRO;
        this.targetRequestsPerSecond = 1;
        this.autoScalingGroupID = 'asgID';
        this.loadBalancerID = 'albID'
        this.loadBalancerName = 'test-alb';

        const vpc = getDefaultVPC(this);
        const asg = new AutoScalingGroup(this, this.autoScalingGroupID, {
            vpc,
            instanceType: InstanceType.of(this.instanceClass, this.instanceSize),
            machineImage: new AmazonLinuxImage(),
        });
        const lb = new ApplicationLoadBalancer(this, this.loadBalancerID, {
            vpc,
            internetFacing: this.internetFacing,
            loadBalancerName: this.loadBalancerName,
        });
        const listener = lb.addListener('Listener', { port: this.listenerPort });

        this.targetGroup = listener.addTargets('Target', {
            port: this.listenerPort,
            targets: [asg]
        });

        listener.connections.allowDefaultPortFromAnyIpv4('Open to the world');

        asg.scaleOnRequestCount('AModestLoad', { targetRequestsPerSecond: this.targetRequestsPerSecond });
    }
};

const runStack = (app: App) : void => {
    new ApplicationLoadBalancerStack(app, 'AlbTestStack', { env: config.env });
};

const deployStack = (app: App) : void => {
    console.log('\x1b[32m%s\x1b[0m', 'DEPLOYING ALB STACK...\n');
    runStack(app);
};
const destroyStack = (app: App) : void => {
    console.log('\x1b[31m%s\x1b[0m', 'DESTROYING ALB STACK...\n');
    runStack(app);
};

export default {
    deployStack, destroyStack
};