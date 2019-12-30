#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { BananatagCdkStack } from '../lib/bananatag-cdk-stack';

const app = new cdk.App();
new BananatagCdkStack(app, 'BananatagCdkStack');
