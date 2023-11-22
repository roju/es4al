import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

export const handler = async (event) => {
    const bucketName = 'es4al-data';
    const fileName = 'user-data.json';

    // Create an S3 client
    const s3 = new S3Client();

    // Retrieve the content of the file from S3
    const userDataJsonFile = await getS3ObjectContent(bucketName, fileName, s3);

    return {
        statusCode: 200,
        body: userDataJsonFile,
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

async function streamToString(stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
        stream.on('error', (error) => reject(error));
    });
}