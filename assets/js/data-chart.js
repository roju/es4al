document.addEventListener("DOMContentLoaded", async function() {
    userData = await getUserData();
    // console.log(JSON.stringify(userData, null, 2));

    // show chart and hide loading indicator
    document.getElementById('chartCanvas').style.display="block";
    document.getElementById('chartLoader').style.display="none";

    const chartOptions = {
        colorCategory: 'learningMethod',
        xAxisCategory: 'algorithm',
        // yAxisValue: 'combinedScore'
    };

    renderChart(userData, chartOptions);
});

function renderChart(userData, chartOptions) {
    var datasets = [];
    const colorCategoryItems = categories[chartOptions.colorCategory];
    colorCategoryItems.forEach((colorCategoryItem, index) => {
        const barData = getDataForItem(userData, index, chartOptions);
        if (!barData) return; // Don't include color category items with no data
        // Lower portion of the bar
        datasets.push({
            label: `${colorCategoryItem} (pre)`,
            data: barData.preTestAvgs, // Pre-test score averages
            backgroundColor: `rgba(${chartColors[index]}, 0.8)`,
            borderColor: `rgba(${chartColors[index]}, 1)`,
            borderWidth: 1,
            stack: `Stack ${index}`
        });
        // Upper portion of the bar
        datasets.push({
            label: `${colorCategoryItem} (post)`,
            data: barData.impvtAvgs, // Score improvement averages
            backgroundColor: `rgba(${chartColors[index]}, 0.4)`,
            borderColor: `rgba(${chartColors[index]}, 0.5)`,
            borderWidth: 1,
            stack: `Stack ${index}`
        })
    });

    // Get the canvas element
    var ctx = document.getElementById('userDataChart').getContext('2d');

    // Create the bar chart
    var userDataChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: categories[chartOptions.xAxisCategory],
        datasets
      },
      options: {
        scales: {
            x: {stacked: true},
            y: {stacked: true}
        },
      }
    });
}

function getDataForItem(userData, colorCategoryItemIndex, chartOptions, scoreType) {
    // Get all students for the current color category item
    userData = userData.filter(student => student[chartOptions.colorCategory] == colorCategoryItemIndex);

    var barData = {
        preTestAvgs: [], // List of pre-test score averages
        impvtAvgs: [] // // List of score improvement averages
    };
    // Iterate through all the x axis category items
    for (let i = 0; i < categories[chartOptions.xAxisCategory].length; i++) {
        // Get all students for the current x axis category item
        const xItemStudents = userData.filter(student => student[chartOptions.xAxisCategory] == i);
        // Leave an empty space without a bar when there is no data
        if (xItemStudents.length == 0) {
            barData.preTestAvgs.push(0);
            barData.impvtAvgs.push(0);
            continue;
        }
        // Find the pre-test and post-test score averages
        const preTestAvg = xItemStudents.reduce((acc, cur) => acc + cur.preTestScore, 0) / xItemStudents.length;
        const postTestAvg = xItemStudents.reduce((acc, cur) => acc + cur.postTestScore, 0) / xItemStudents.length;

        // Pre-test score average is the lower portion of the bar
        barData.preTestAvgs.push(preTestAvg);
        // Score improvement average is the upper portion of the bar
        barData.impvtAvgs.push(postTestAvg - preTestAvg);
    }
    return barData;
}

function getAgeGroup(age) {
    if (age <= 17) return 0;
    if (age >= 18 && age <= 24) return 1;
    if (age >= 25 && age <= 34) return 2;
    if (age >= 35 && age <= 49) return 3;
    if (age >= 50 && age <= 64) return 4;
    return 5;
}

async function getUserData() {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const apiUrl = 'https://f8k5jcocqb.execute-api.us-east-1.amazonaws.com/PROD/user-data';
    try {
        const response = await fetch(apiUrl, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        resJson = await response.json();
        let userData = resJson.userData;
        userData = userData.filter(student => !student.dummyData);
        userData.forEach(student => student.ageGroup = getAgeGroup(student.age));
        return userData;
    }
    catch(err) {
        console.log(err);
    }
}

/*
    Definitions
    Category: properties on the 'category' object (ageGroup, csMajor etc)
    Item: Array elements in each category (Asian, Merge Sort, etc)
*/
const categories = {
    ageGroup: [
        '17 or less',
        '18-24',
        '25-34',
        '35-49',
        '50-64',
        '65 plus',
    ],
    csMajor: [
        'Not CS major',
        'CS major'
    ],
    educationLevel: [
        '12th or less',
        'Grad HS',
        'Some college',
        'Associate',
        'Bachelor',
        'Post grad'
    ],
    race: [
        'Native American',
        'Asian',
        'Black',
        'Hispanic',
        'Middle Eastern',
        'Pacific Islander',
        'White',
        'Multiethnic',
        'Unknown'
    ],
    algorithm: [
        'Bubble Sort',
        'Quick Sort',
        'Merge Sort',
        'Insertion Sort'
    ],
    learningMethod: [
        'Dance',
        'Animation',
        'Lecture'
    ]
}

const chartColors = [
    '0,128,255',		// Blue
    '255,0,0',			// Red
    '0,255,0',			// Lime
    '255,255,0',		// Yellow
    '0,255,255',		// Cyan
    '255,0,255',		// Magenta
    '192,192,192',		// Silver
    '128,128,128',		// Gray
    '128,0,0',			// Maroon
    '128,128,0',		// Olive
    '0,128,0',			// Green
    '128,0,128',		// Purple
    '0,128,128',		// Teal
    '0,0,128',			// Navy
];