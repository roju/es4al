import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

export const handler = async (event) => {
    const bucketName = 'es4al-data';
    const fileName = 'user-data.json';

    // Extract the input JSON object from the Lambda event
    const inputObject = JSON.parse(event.body);

    // Create an S3 client
    const s3 = new S3Client();

    // Retrieve the existing content of the file from S3
    const existingContent = await getS3ObjectContent(bucketName, fileName, s3);

    // Parse the existing content as JSON
    let updatedData = {};
    if (existingContent) {
        updatedData = JSON.parse(existingContent);
    }

    // Merge the input JSON object with the existing data
    updatedData.userData.push(inputObject);

    // Convert the updated data back to a JSON string
    const updatedContent = JSON.stringify(updatedData, null, 2);

    // Upload the updated content back to the S3 bucket
    await uploadToS3(bucketName, fileName, updatedContent, s3);

    return {
        statusCode: 200,
        body: 'JSON object appended to the file successfully!',
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
    };
};

async function getS3ObjectContent(bucketName, fileName, s3) {
    const params = {
        Bucket: bucketName,
        Key: fileName,
    };

    try {
        const data = await s3.send(new GetObjectCommand(params));
        const readable = Readable.from(data.Body);
        const content = await streamToString(readable);
        return content;
    } catch (error) {
        // If the file doesn't exist, return an empty string
        if (error.name === 'NoSuchKey') {
            return '';
        }
        throw error;
    }
}

async function uploadToS3(bucketName, fileName, content, s3) {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: content,
    };

    await s3.send(new PutObjectCommand(params));
}

async function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
        stream.on('error', (error) => reject(error));
    });
}