import { categories } from '../assets/js/constants.mjs';
import fs from 'fs';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateSingleUser() {
    const testQuestionsCount = 5;
    const percentFactor = 100 / testQuestionsCount;
    const preTestCorrectCount = getRandomNumber(0, testQuestionsCount);
    const postTestCorrectCount = getRandomNumber(preTestCorrectCount, testQuestionsCount);
    var user = {
        age: getRandomNumber(16, 65)
    };
    for (const category in categories) {
        if (category == 'ageGroup') continue;
        user[`${category}`] = getRandomNumber(0, categories[category].length - 1);
    }
    return {
      ...user,
      preTestScore: preTestCorrectCount * percentFactor,
      postTestScore: postTestCorrectCount * percentFactor
    };
}

function generateUserDataArray(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(generateSingleUser());
  }
  return users;
}

try {
  const numberOfUsers = 200;
  const fileName = 'user-data.json';
  const userData = generateUserDataArray(numberOfUsers);
  const jsonData = JSON.stringify({userData}, null, 2);
  fs.writeFileSync(fileName, jsonData);
  console.log(`ceated file: ${fileName}`);
}
catch(err) {
  console.log(err);
}
