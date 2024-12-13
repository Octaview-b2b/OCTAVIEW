import AWS from 'aws-sdk'
import {AWS_ACCESS_KEY_ID,AWS_REGION,AWS_SECRET_ACCESS_KEY} from '../config/env'

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION
  });
  
  const s3 = new AWS.S3();
  
  export { s3 };