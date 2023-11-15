document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.endsWith('/video/')) {
        assignVideo();
    }
});

async function saveStudentInfo() {
    try {
        const age = getUserAge();
        const cs_major = getMultipleChoiceValue('cs_major');
        const edu_level = getMultipleChoiceValue('edu_level');
        const race = getMultipleChoiceValue('race');

        let singleUserData = {
            age,
            cs_major,
            edu_level,
            race
        }
        console.log(JSON.stringify(singleUserData, null, 2));

        // show loading indicator while waiting for assignments
        document.getElementById('studentInfoNext').style.display="none";
        document.getElementById('studentInfoLoader').style.display="block";

        const assignments = await getAssignments();
        console.log(assignments);
        singleUserData = { ...singleUserData, ...assignments };
        localStorage.clear();
        localStorage.setItem('singleUserData', JSON.stringify(singleUserData));
        window.location.href = '/pages/pre-test';
    }
    catch (err) {
        console.error(err);
        alert(err);
    }
}

async function getAssignments() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const apiUrl = 'https://f8k5jcocqb.execute-api.us-east-1.amazonaws.com/PROD/assign';
    try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        resJson = await response.json();
        return resJson;
    }
    catch(err) {
        console.log(err);
    }
}

async function assignVideo() {
    const videoLinks = {
        bubble: {
            dance: "https://www.youtube.com/embed/Iv3vgjM8Pv4",
            animation: "https://www.youtube.com/embed/9I2oOAr2okY",
            lecture: "https://www.youtube.com/embed/p__ETf2CKY4"
        },
        insertion: {
            dance: "https://www.youtube.com/embed/EdIKIf9mHk0",
            animation: "https://www.youtube.com/embed/JU767SDMDvA",
            lecture: "https://www.youtube.com/embed/oTICKmJhLXI"
        },
        merge: {
            dance: "https://www.youtube.com/embed/dENca26N6V4",
            animation: "https://www.youtube.com/embed/5Z9dn2WTg9o",
            lecture: "https://www.youtube.com/embed/mB5HXBb_HY8"
        },
        quick: {
            dance: "https://www.youtube.com/embed/3San3uKKHgg",
            animation: "https://www.youtube.com/embed/WprjBK0p6rw",
            lecture: "https://www.youtube.com/embed/7h1s2SojIRw"
        }
    }
    const singleUserData = getLocalSingleUserData();
    console.log(singleUserData);
    const { assignedAlgorithm, assignedLearningMethod } = singleUserData;
    console.log(assignedAlgorithm);
    console.log(assignedLearningMethod);
    document.getElementById('video-frame').setAttribute("src",
        videoLinks[`${assignedAlgorithm}`][`${assignedLearningMethod}`]
    );
}

async function uploadDataToCloud(singleUserData) {
    const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(singleUserData)
    };
    const apiUrl = 'https://f8k5jcocqb.execute-api.us-east-1.amazonaws.com/PROD/user-data';
    try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log('Success:', response);
    }
    catch(err) {
        console.log(err);
    }
}

function getLocalSingleUserData() {
    var singleUserData = null;
    try {
        singleUserData = JSON.parse(localStorage.getItem("singleUserData"));
    }
    catch(err) {
        throw Error('Please modify your browser permsissons to allow localStorage');
    }
    if (!singleUserData) {
        throw Error('Student info not found. Please start from the home page.');
    }
    return singleUserData;
}

function savePreTest() {
    try {
        var singleUserData = getLocalSingleUserData();
        const score = document.getElementById('preTestScore').value;
        singleUserData.preTestScore = Number(score);
        localStorage.setItem('singleUserData', JSON.stringify(singleUserData));
        window.location.href = '/pages/video';
    }
    catch (err) {
        alert(err);
    }
}

async function savePostTest() {
    try {
        var singleUserData = getLocalSingleUserData();
        const score = document.getElementById('postTestScore').value;
        singleUserData.postTestScore = Number(score);
        console.log(singleUserData);
        // show loading indicator while waiting for upload
        document.getElementById('postTestNext').style.display="none";
        document.getElementById('postTestLoader').style.display="block";
        await uploadDataToCloud(singleUserData);
        localStorage.clear();
        window.location.href = '/';
    }
    catch (err) {
        console.log(err);
        alert(err);
    }
}

function videoFinished() {
    window.location.href = '/pages/post-test';
}

function getMultipleChoiceValue(name) {
    var radios = document.getElementsByName(name);
    var answer = '';
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            answer = radios[i].value;
           break;
         }
    }
    if (answer == '' ) {
      throw Error(`Question is required: ${name}`)
    }
    return Number(answer);
};

function getUserAge() {
    var age = document.getElementById('age').value;
    if (!age || isNaN(age)) {
        throw Error('Age must be a number')
    }
    return Number(age);
}

function assignAlgorithm() {

}