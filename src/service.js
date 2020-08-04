import Amplify from '@aws-amplify/core';
import Storage from '@aws-amplify/storage';

export function configureAmplify() {
  
  Amplify.configure(
  {
   Auth: {
     identityPoolId: "us-east-1:2a3c5cfe-fa6e-4f30-8f5f-e2415983b1f4",
     region: "us-east-1",
     userPoolId: "us-east-1_iSdExsmX5",
     userPoolWebClientId: "72tfgp62h80tblanseai16brte",
    },
  Storage: { 
     bucket: "test-bucket-amplify",
     region: "us-east-1",
     identityPoolId: "us-east-1:2a3c5cfe-fa6e-4f30-8f5f-e2415983b1f4"
    }
  }
 );
}
export function SetS3Config(bucket, level){
    Storage.configure({ 
           bucket: "test-bucket-amplify",
           level: level,
           region: "us-east-1",  
           identityPoolId:  "us-east-1:2a3c5cfe-fa6e-4f30-8f5f-e2415983b1f4"
        });
 }