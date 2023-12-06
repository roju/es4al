import { chartColors, categories } from './constants.mjs'

var userData;
var userDataChart;
var chartOptions = {
    algorithm: 'all',
    learningMethod: 'all',
    colorCategory: 'ageGroup',
    xAxisCategory: 'all',
    testScoreDisplay: 'improvement' // improvement | stacked
};

document.addEventListener("DOMContentLoaded", async function() {
    addRadioGroupClickListener('radio-cc', colorCatOptionChanged);
    addRadioGroupClickListener('radio-xc', xAxisCatOptionChanged);
    addRadioGroupClickListener('radio-a', algorithmOptionChanged);
    addRadioGroupClickListener('radio-lm', learningMethodOptionChanged);
    addRadioGroupClickListener('radio-ts', testScoreDisplayOptionChanged);
    hideDuplicateCategoryOption('radio-cc');
    hideDuplicateCategoryOption('radio-xc');

    userData = await getUserData();
    userData.forEach(user => user.ageGroup = getAgeGroup(user.age));
    // console.log(JSON.stringify(userData, null, 2));

    // Show chart canvas and hide loading indicator
    document.getElementById('chartCanvas').style.display="block";
    document.getElementById('chartLoader').style.display="none";

    // Render chart
    const datasets = getChartDatasets(userData, chartOptions);
    userDataChart = createChart(datasets, chartOptions);
    // updateChartDescriptionText();
});

function getChartDatasets(userData, chartOptions) {
    var datasets = [];
    const filteredUserData = getFilteredUserData(userData, chartOptions);
    const colorCategoryItems = categories[chartOptions.colorCategory];
    colorCategoryItems.forEach((colorCategoryItem, index) => {
        const barData = getDataForItem(filteredUserData, index, chartOptions);
        // Don't include color category items with no data
        if (barData.preTestAvgs.every(s => s == 0)) return;
        // Lower portion of the bar
        if (chartOptions.testScoreDisplay == 'stacked') {
            datasets.push({
                label: `${colorCategoryItem} (pre-test score)`,
                data: barData.preTestAvgs, // Pre-test score averages
                backgroundColor: `rgba(${chartColors[index]}, 0.8)`,
                borderColor: `rgba(${chartColors[index]}, 1)`,
                borderWidth: 1,
                stack: `Stack ${index}`
            });
        }
        // Upper portion of the bar
        var scoreImprvOpacity = 0.4;
        if (chartOptions.testScoreDisplay == 'improvement') {
            scoreImprvOpacity = 0.8;
        }
        datasets.push({
            label: `${colorCategoryItem} (score improvement)`,
            data: barData.impvtAvgs, // Score improvement averages
            backgroundColor: `rgba(${chartColors[index]}, ${scoreImprvOpacity})`,
            borderColor: `rgba(${chartColors[index]}, ${scoreImprvOpacity})`,
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
            y: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Test Score % Average',
                    // font: {size: 25}
                }
            }
        },
        plugins: {
            htmlLegend: {
                containerID: 'legend-container',
              },
              legend: {
                display: false,
            }
        }
      },
      plugins: [htmlLegendPlugin],
    });
}

const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    let listContainer = legendContainer.querySelector('div');

    if (!listContainer) {
      listContainer = document.createElement('div');
      listContainer.style.flexDirection = 'row';
      listContainer.style.margin = 0;
      listContainer.style.padding = 0;

      legendContainer.appendChild(listContainer);
    }

    return listContainer;
  };

const htmlLegendPlugin = {
    id: 'htmlLegend',
    afterUpdate(chart, args, options) {
      const ul = getOrCreateLegendList(chart, options.containerID);

      // Remove old legend items
      while (ul.firstChild) {
        ul.firstChild.remove();
      }

      // Reuse the built-in legendItems generator
      const items = chart.options.plugins.legend.labels.generateLabels(chart);

      items.forEach((item, index) => {
        if (chartOptions.testScoreDisplay == 'stacked' && index % 2 == 1) return;
        const div = document.createElement('div');
        div.style.alignItems = 'center';
        div.style.cursor = 'pointer';
        div.style.display = 'flex';
        div.style.flexDirection = 'row';
        div.style.marginLeft = '10px';

        div.onclick = () => {
          chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
          if (chartOptions.testScoreDisplay == 'stacked') {
            chart.setDatasetVisibility(item.datasetIndex+1, !chart.isDatasetVisible(item.datasetIndex+1));
          }
          chart.update();
        };

        // Color box
        const boxSpan = document.createElement('span');
        boxSpan.style.background = item.fillStyle;
        boxSpan.style.borderColor = item.strokeStyle;
        boxSpan.style.borderWidth = item.lineWidth + 'px';
        boxSpan.style.display = 'inline-block';
        boxSpan.style.flexShrink = 0;
        boxSpan.style.height = '20px';
        boxSpan.style.marginRight = '10px';
        boxSpan.style.width = '20px';

        // Text
        const textContainer = document.createElement('p');
        textContainer.style.color = item.fontColor;
        textContainer.style.margin = 0;
        textContainer.style.padding = 0;
        textContainer.style.textDecoration = item.hidden ? 'line-through' : '';
        // Remove all text in parentheses so it only shows on chart hover, not in legend
        const text = document.createTextNode(item.text.replace(/\([^)]*\)/g, ''));
        textContainer.appendChild(text);

        div.appendChild(boxSpan);
        div.appendChild(textContainer);
        ul.appendChild(div);
      });
    }
  };

function getDataForItem(userData, colorCategoryItemIndex, chartOptions) {
    var filteredUsers = userData;
    var barData = {
        preTestAvgs: [], // List of pre-test score averages
        impvtAvgs: [] // // List of score improvement averages
    };
    if (chartOptions.colorCategory != 'all') {
        // Get all users for the current color category item
        filteredUsers = userData.filter(user =>
            user[chartOptions.colorCategory] == colorCategoryItemIndex);
    }
    // Iterate through all the x axis category items
    for (let i = 0; i < categories[chartOptions.xAxisCategory].length; i++) {
        var xItemUsers = filteredUsers;
        if (chartOptions.xAxisCategory != 'all') {
            // Get all users for the current x axis category item
            xItemUsers = filteredUsers.filter(user =>
                user[chartOptions.xAxisCategory] == i);
        }
        // Leave an empty space without a bar when there is no data
        if (xItemUsers.length == 0) {
            barData.preTestAvgs.push(0);
            barData.impvtAvgs.push(0);
            continue;
        }
        // Find the pre-test and post-test score averages
        const preTestAvg = xItemUsers.reduce((acc, cur) =>
            acc + cur.preTestScore, 0) / xItemUsers.length;
        const postTestAvg = xItemUsers.reduce((acc, cur) =>
            acc + cur.postTestScore, 0) / xItemUsers.length;

        // Pre-test score average is the lower portion of the bar
        barData.preTestAvgs.push(preTestAvg);
        // Score improvement average is the upper portion of the bar
        barData.impvtAvgs.push(postTestAvg - preTestAvg);
    }
    return barData;
}

function getFilteredUserData(allUserData, chartOptions) {
    var filteredUserData = allUserData;
    if (chartOptions.algorithm != 'all') {
        filteredUserData = filteredUserData.filter(user =>
            user.algorithm == chartOptions.algorithm);
    }
    if (chartOptions.learningMethod != 'all') {
        filteredUserData = filteredUserData.filter(user =>
            user.learningMethod == chartOptions.learningMethod);
    }
    return filteredUserData;
}

function addRadioGroupClickListener(groupName, callback) {
    var radios = document.getElementsByName(groupName);
    if (radios) {
        for (var i = 0; i < radios.length; i++) {
            radios[i].addEventListener("click", callback);
        }
    }
}

function colorCatOptionChanged() {
    hideDuplicateCategoryOption('radio-cc');
    const colorCatOption = getChartOptionValue('radio-cc');
    chartOptions.colorCategory = colorCatOption;
    userDataChart.data.datasets = getChartDatasets(userData, chartOptions);
    updateChart();
}

function xAxisCatOptionChanged() {
    hideDuplicateCategoryOption('radio-xc');
    const xAxisCatOption = getChartOptionValue('radio-xc');
    chartOptions.xAxisCategory = xAxisCatOption;
    userDataChart.data.datasets = getChartDatasets(userData, chartOptions);
    userDataChart.data.labels = categories[chartOptions.xAxisCategory];
    updateChart();
}

function algorithmOptionChanged() {
    const optionValue = getChartOptionValue('radio-a');
    chartOptions.algorithm = optionValue;
    userDataChart.data.datasets = getChartDatasets(userData, chartOptions);
    updateChart();
}

function learningMethodOptionChanged() {
    const optionValue = getChartOptionValue('radio-lm');
    chartOptions.learningMethod = optionValue;
    userDataChart.data.datasets = getChartDatasets(userData, chartOptions);
    updateChart();
}

function testScoreDisplayOptionChanged() {
    const optionValue = getChartOptionValue('radio-ts');
    chartOptions.testScoreDisplay = optionValue;
    userDataChart.data.datasets = getChartDatasets(userData, chartOptions);
    updateChart();
}

function updateChart() {
    // updateChartDescriptionText();
    userDataChart.update();
}

function getMostImprovedScoreInfo(userData, chartOptions) {
    var highScoreBarInfo = [];
    const filteredUserData = getFilteredUserData(userData, chartOptions);
    const colorCategoryItems = categories[chartOptions.colorCategory];
    colorCategoryItems.forEach((colorItemName, index) => {
        const barData = getDataForItem(filteredUserData, index, chartOptions);
        let scores = barData.impvtAvgs;
        let highestScore = scores[0];
        let highestScoreIndex = 0;
        for (let i = 1; i < scores.length; i++) {
            if (scores[i] > highestScore) {
                highestScore = scores[i];
                highestScoreIndex = i;
            }
        }
        const xAxisItemName = categories[chartOptions.xAxisCategory][highestScoreIndex];
        highScoreBarInfo.push({
            colorItemName,
            xAxisItemName,
            highestScore
        });
    });
    const highestScoreBarInfo = highScoreBarInfo.reduce((highest, current) =>
        (current.highestScore > highest.highestScore ? current : highest),
        highScoreBarInfo[0]
    );
    return {
        colorItem: highestScoreBarInfo.colorItemName,
        xAxisItem: highestScoreBarInfo.xAxisItemName
    }
}

function updateChartDescriptionText() {
    // var chartDescriptionLabel = document.getElementById('chart-description-text');
    // var description = 'For ';
    // if (chartOptions.algorithm == 'all' && chartOptions.learningMethod == 'all') {
    //     description += 'all users, ';
    // }
    // else if (chartOptions.algorithm != 'all' && chartOptions.learningMethod != 'all') {
    //     description += `users who were assigned the ${chartOptions.algorithm} algorithm and the ${chartOptions.learningMethod} learning method, `;
    // }
    // else {
    //     if (chartOptions.algorithm != 'all') {
    //         description += `users who were assigned the ${chartOptions.algorithm} algorithm, `;
    //     }
    //     if (chartOptions.learningMethod != 'all') {
    //         description += `users who were assigned the ${chartOptions.learningMethod} learning method, `;
    //     }
    // }
    // switch (chartOptions.xAxisCategory) {
    //     case 'ageGroup':
    //         description += `ages `;
    //         break;

    //     default:
    //         break;
    // }

    // chartDescriptionLabel.innerHTML = description;
}

function getChartOptionValue(name) {
    var radios = document.getElementsByName(name);
    var option = '';
    for (var i = 0; i < radios.length; i++) {
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

function hideDuplicateCategoryOption(radioCategory) {
    const colorRadioName = 'radio-cc';
    const xAxisRadioName = 'radio-xc';
    const otherCatRadioName = radioCategory == colorRadioName ? xAxisRadioName : colorRadioName;
    const changedOptionRadios = document.getElementsByName(radioCategory);

    for (let i = 1; i < changedOptionRadios.length; i++) {
        const otherCatItemDisplay = changedOptionRadios[i].checked ? 'none' : 'block';
        document.getElementById(`${otherCatRadioName}-${i}`).style.display=otherCatItemDisplay;
    }
}

// function handleInvalidSelections(columnName) {
//     selectNextAvailableOption('radio-cc', columnName);
//     colorCatOptionChanged();
//     selectNextAvailableOption('radio-xc', columnName);
//     xAxisCatOptionChanged();
// }

// function optionIsValid(radioButton, columnName) {
//     const outerDiv = window.getComputedStyle(radioButton.parentNode);
//     return (
//         outerDiv.display != 'none'
//         && radioButton.value != columnName
//     )
// }

// function selectNextAvailableOption(radioCategory, columnName) {
//     const radios = document.getElementsByName(radioCategory);
//     const selectedRadioButton = Array.from(radios).find(r => r.checked);
//     if (optionIsValid(selectedRadioButton, columnName)) return;
//     selectedRadioButton.checked = false;
//     for (let i = 0; i < radios.length; i++) {
//         if (optionIsValid(radios[i], columnName)) {
//             radios[i].checked = true;
//             break;
//         }
//     }
// }

// function shouldShowOptionContainer(container, shouldShow) {
//     const elements = document.getElementsByName(container);
//     const displayType = shouldShow ? 'block' : 'none';
//     for (let i = 0; i < elements.length; i++) {
//         elements[i].style.display = displayType;
//     }
// }