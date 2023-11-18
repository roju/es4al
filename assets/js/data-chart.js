import { chartColors, categories } from './constants.js'

var userData;
var userDataChart;
var chartOptions = {
    colorCategory: 'learningMethod',
    xAxisCategory: 'algorithm'
};

document.addEventListener("DOMContentLoaded", async function() {
    var colorCatRadios = document.getElementsByName("radio-cc");
    if (colorCatRadios) {
        for (var i = 0; i < colorCatRadios.length; i++) {
            colorCatRadios[i].addEventListener("click", colorCatOptionChanged);
        }
    }
    var xAxisCatRadios = document.getElementsByName("radio-xc");
    if (xAxisCatRadios) {
        for (var i = 0; i < xAxisCatRadios.length; i++) {
            xAxisCatRadios[i].addEventListener("click", xAxisCatOptionChanged);
        }
    }
    userData = await getUserData();
    userData.forEach(student => student.ageGroup = getAgeGroup(student.age));
    // console.log(JSON.stringify(userData, null, 2));

    // Show chart canvas and hide loading indicator
    document.getElementById('chartCanvas').style.display="block";
    document.getElementById('chartLoader').style.display="none";

    // Render chart
    const datasets = getChartDatasets(userData, chartOptions);
    userDataChart = createChart(datasets, chartOptions);
});

function getChartDatasets(userData, chartOptions) {
    var datasets = [];
    const colorCategoryItems = categories[chartOptions.colorCategory];
    colorCategoryItems.forEach((colorCategoryItem, index) => {
        const barData = getDataForItem(userData, index, chartOptions);
        // Don't include color category items with no data
        if (barData.preTestAvgs.every(s => s == 0)) return;
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
    return datasets;
}

function createChart(datasets, chartOptions) {
    // Get the canvas element
    var ctx = document.getElementById('userDataChart').getContext('2d');

    // Create the bar chart
    return new Chart(ctx, {
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

function getDataForItem(allUserData, colorCategoryItemIndex, chartOptions) {
    // Get all students for the current color category item
    const colorItemStudents = allUserData.filter(student =>
        student[chartOptions.colorCategory] == colorCategoryItemIndex);

    var barData = {
        preTestAvgs: [], // List of pre-test score averages
        impvtAvgs: [] // // List of score improvement averages
    };
    // Iterate through all the x axis category items
    for (let i = 0; i < categories[chartOptions.xAxisCategory].length; i++) {
        // Get all students for the current x axis category item
        const xItemStudents = colorItemStudents.filter(student =>
            student[chartOptions.xAxisCategory] == i);
        // Leave an empty space without a bar when there is no data
        if (xItemStudents.length == 0) {
            barData.preTestAvgs.push(0);
            barData.impvtAvgs.push(0);
            continue;
        }
        // Find the pre-test and post-test score averages
        const preTestAvg = xItemStudents.reduce((acc, cur) =>
            acc + cur.preTestScore, 0) / xItemStudents.length;
        const postTestAvg = xItemStudents.reduce((acc, cur) =>
            acc + cur.postTestScore, 0) / xItemStudents.length;

        // Pre-test score average is the lower portion of the bar
        barData.preTestAvgs.push(preTestAvg);
        // Score improvement average is the upper portion of the bar
        barData.impvtAvgs.push(postTestAvg - preTestAvg);
    }
    return barData;
}

function colorCatOptionChanged() {
    const colorCatOption = getChartOptionValue('radio-cc');
    chartOptions.colorCategory = colorCatOption;
    userDataChart.data.datasets = getChartDatasets(userData, chartOptions);
    userDataChart.update();
}

function xAxisCatOptionChanged() {
    const xAxisCatOption = getChartOptionValue('radio-xc');
    chartOptions.xAxisCategory = xAxisCatOption;
    userDataChart.data.datasets = getChartDatasets(userData, chartOptions);
    userDataChart.data.labels = categories[chartOptions.xAxisCategory];
    userDataChart.update();
}

function getChartOptionValue(name) {
    var radios = document.getElementsByName(name);
    var option = '';
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            option = radios[i].value;
           break;
         }
    }
    return option;
};

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
        const resJson = await response.json();
        return resJson.userData;
    }
    catch(err) {
        console.log(err);
    }
}