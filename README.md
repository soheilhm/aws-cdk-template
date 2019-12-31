# AWS CDK template with examples

There are not a lot of good examples out there on how to bootstrap an *AWS cdk* project. So I decided to modify the AWS CDK app and create a new template for it.
Feel free to fork this repositiory and modify it to suit your needs.

All the stacks are defined at this folder: `src/stacks`. I have created a few example stacks in there.

There is also a helper function to fetch an existing VPC (it is a common task to require default VPC or get one by ID before laying out the rest of the network). Use case is demontsrated in one of the examples.


## commands
 * `npm run deploy`  compile the ts modules and deploys all the create stacks exported from `src/stacks/index.ts`
 * `npm run destroy` compile the ts modules and deletes all the delete stacks exported from `src/stacks/index.ts` (MFA delete)


The cloudformation role is using the AWS configuration in your aws cli and this package assumes that you have created a test profile at `~/.aws/config `:

```sh
[profile test]
aws_access_key_id=...
aws_secret_access_key=...
region=...
```

The IAM role associated with this access keys must have enough privilleages to execute the cloudforation commands. If that is not the case, you will get runtime access denied errors and to fix that, you need to update your IAM policies associated with the user/role.

Even though there are not a lot of examples, the API refernces at https://docs.aws.amazon.com/cdk/api/latest/docs/aws-construct-library.html cover the available methods and the arguments. Even though the ew AWS API updates don't immediately show up in the CDK API refernces, there is a lower level construt available in CDK to use with Cloudformation, these constructors are prefixed with `Cfn` and are released at the same time that Cloudfromation external API releases those updates.