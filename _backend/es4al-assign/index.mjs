import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

export const handler = async (event) => {
    const bucketName = 'es4al-data';
    const fileName = 'user-data.json';

    // Retrieve the JSON data from S3
    const s3 = new S3Client();
    const s3File = await getS3ObjectContent(bucketName, fileName, s3);
    var userData = JSON.parse(s3File).userData;

    // Added to ensure all algorithms and learning methods are included
    // in the data at least once
    userData = [...dummyData, ...userData];

    const algorithm = findLeastPrevalentAssignment(userData, 'algorithm');
    const learningMethod = findLeastPrevalentAssignment(userData, 'learningMethod');

    console.log(`algorithm: ${algorithm}  learningMethod: ${learningMethod}`);

    return {
        statusCode: 200,
        body: JSON.stringify({
          algorithm,
          learningMethod
        }),
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


function findLeastPrevalentAssignment(userDataArray, assignmentName) {
  var assignmentCount = {};

  // Count the occurrences of each assignment in the array
  userDataArray.forEach(function(user) {
    if (!user.hasOwnProperty(`${assignmentName}`)) {
      return;
    }
    var assignment = user[assignmentName];
    assignmentCount[assignment] = (assignmentCount[assignment] || 0) + 1;
  });

  // Find the assignment with the minimum count
  var leastPrevalentAssignment = Object.keys(assignmentCount).reduce(function(prevAssn, currentAssn) {
    return assignmentCount[currentAssn] < assignmentCount[prevAssn] ? currentAssn : prevAssn;
  });

  return Number(leastPrevalentAssignment);
}

const dummyData = [
    {
      "algorithm": 0,
      "learningMethod": 0,
    },
    {
      "algorithm": 1,
      "learningMethod": 1,
    },
    {
      "algorithm": 2,
      "learningMethod": 2,
    },
    {
      "algorithm": 3,
    }
];