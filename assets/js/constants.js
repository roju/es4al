export const videoIds = [
    // Bubble
    [
        "Iv3vgjM8Pv4", // Dance
        "9I2oOAr2okY", // Animation
        "A6m-g0SPzt0" // Lecture
    ],
    // Quick
    [
        "3San3uKKHgg", // Dance
        "WprjBK0p6rw", // Animation
        "ZHVk2blR45Q" // Lecture
    ],
    // Merge
    [
        "dENca26N6V4", // Dance
        "5Z9dn2WTg9o", // Animation
        "qdv3i6X0PiQ" // Lecture
    ],
    // Insertion
    [
        "EdIKIf9mHk0", // Dance
        "JU767SDMDvA", // Animation
        "eTvQIbB-AuE" // Lecture
    ]
];

export const chartColors = [
    '230, 25, 75',
    '60, 180, 75',
    '255, 225, 25',
    '0, 130, 200',
    '245, 130, 48',
    '145, 30, 180',
    '70, 240, 240',
    '240, 50, 230',
    '210, 245, 60',
    '250, 190, 212',
    '0, 128, 128',
    '220, 190, 255',
    '170, 110, 40',
    '255, 250, 200',
    '128, 0, 0',
    '170, 255, 195',
    '128, 128, 0',
    '255, 215, 180',
];

/*
    Definitions
    Category: properties on the 'category' object (ageGroup, csMajor etc)
    Item: Array elements in each category (Asian, Merge Sort, etc)
*/
export const categories = {
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
};

// time and space complexity explanation
export const tmSpcCmplxExpl = `
Imagine sorting numbers like organizing a deck of cards. \
Time complexity is like asking, “How much longer will it take to sort two decks \
instead of one?”\n
Big O notation is a way to describe this. If I say a sorting method is O(n log n), \
it means that as the number of items (n) increases, the time it takes to sort roughly \
grows in proportion to n times the logarithm of n.\n
Space complexity is similar, but it describes how much extra memory or space an \
algorithm needs to perform the sorting. Algorithms that create additional arrays \
(which increase in size as the input increases) will have a higher space complexity \
than those that don’t. For example: a space complexity of O(1) is constant, meaning \
that the array is sorted in-place, which is the lowest possible space complexity and \
the most memory efficient.
`;