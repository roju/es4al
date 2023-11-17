document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.endsWith('/video/')) {
        assignVideo();
    }
});

async function saveStudentInfo() {
    try {
        const age = getUserAge();
        const csMajor = getMultipleChoiceValue('cs_major');
        const educationLevel = getMultipleChoiceValue('edu_level');
        const race = getMultipleChoiceValue('race');

        let singleUserData = {
            age,
            csMajor,
            educationLevel,
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
    const videoLinks = [
        // Bubble
        [
            "https://www.youtube.com/embed/Iv3vgjM8Pv4", // Dance
            "https://www.youtube.com/embed/9I2oOAr2okY", // Animation
            "https://www.youtube.com/embed/A6m-g0SPzt0" // Lecture
        ],
        // Quick
        [
            "https://www.youtube.com/embed/3San3uKKHgg", // Dance
            "https://www.youtube.com/embed/WprjBK0p6rw", // Animation
            "https://www.youtube.com/embed/ZHVk2blR45Q" // Lecture
        ],
        // Merge
        [
            "https://www.youtube.com/embed/dENca26N6V4", // Dance
            "https://www.youtube.com/embed/5Z9dn2WTg9o", // Animation
            "https://www.youtube.com/embed/qdv3i6X0PiQ" // Lecture
        ],
        // Insertion
        [
            "https://www.youtube.com/embed/EdIKIf9mHk0", // Dance
            "https://www.youtube.com/embed/JU767SDMDvA", // Animation
            "https://www.youtube.com/embed/eTvQIbB-AuE" // Lecture
        ]
    ];
    const singleUserData = getLocalSingleUserData();
    console.log(singleUserData);
    const { algorithm, learningMethod } = singleUserData;
    console.log(algorithm);
    console.log(learningMethod);
    document.getElementById('video-frame').setAttribute("src",
        videoLinks[algorithm][learningMethod]
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