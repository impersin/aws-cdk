import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket,EventType } from 'aws-cdk-lib/aws-s3';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { SqsDestination } from 'aws-cdk-lib/aws-s3-notifications';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });


    // L! and L2 Construc of an S3 Bucket

    const level1S3Bucket = new CfnBucket(this,'MyFirstLevel1ConstructBucket',{
      versioningConfiguration:{
        status:"Enabled"
      }
    });

    const level2S3Bucket = new Bucket(this, 'MyFirstLevel2ConstructBucket',{
      bucketName:"myfirstlevel2constructbucketv2",
      versioned:true
    })

    const queue = new Queue(this, 'MyQueue',{
      queueName:'MyQueue'
    })

    level2S3Bucket.addEventNotification(EventType.OBJECT_CREATED, new SqsDestination(queue))
  }
}
