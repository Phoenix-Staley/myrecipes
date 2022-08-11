/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
ABOUT THIS NODE.JS EXAMPLE: This example works with AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the 'AWS SDK for JavaScript v3 Developer Guide' at
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-creating-buckets.html.
Purpose:
s3Client.js is a helper function that creates an Amazon Simple Storage Service (Amazon S3) service client.
Inputs (replace in code):
*/
// snippet-start:[s3.JavaScript.buckets.createclientv3]
// Create service client module using ES6 syntax.
require('dotenv').config()

const { S3Client } =  require("@aws-sdk/client-s3");
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ 
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION 
 });
module.exports = { s3Client };