export const testQuestions = {
    0: [ // Bubble Sort
        {
            question: 'What is the time complexity of the Bubble Sort algorithm?',
            answers: [
                'O(log n)',
                'O(n)',
                'O(n^2)',
                'O(n log n)',
            ],
            correctAnswer: 2
        },
        {
            question: 'What is the main advantage of the bubble sort algorithm?',
            answers: [
                'It is highly efficient for large datasets',
                'It is easy to implement',
                'It requires minimal memory usage',
                'It guarantees the fastest sorting time',
            ],
            correctAnswer: 1
        },
        {
            question: 'When the first pass of the bubble sort algorithm is completed, what was achieved?',
            answers: [
                'The median element is identified',
                'The smallest element is moved to the beginning of the list',
                'The largest element is moved to the end of the list',
                'The array is divided into sub-arrays',
            ],
            correctAnswer: 2
        },
        {
            question: 'What is the best-case time complexity of the Bubble Sort algorithm when the input array is already sorted?',
            answers: [
                'O(log n)',
                'O(n)',
                'O(n^2)',
                'O(n log n)',
            ],
            correctAnswer: 1
        },
        {
            question: 'What is the main disadvantage of the Bubble Sort algorithm?',
            answers: [
                'It requires additional memory space.',
                'It is not suitable for large datasets.',
                'It has a complex implementation.',
                'It has a time complexity of O(n log n).',
            ],
            correctAnswer: 1
        },
    ],
    1: [ //Quick Sort
        {
            question: 'What is the average time complexity of the Quick Sort algorithm?',
            answers: [
                'O(n)',
                'O(n log n)',
                'O(n^2)',
                'O(log n)',
            ],
            correctAnswer: 1
        },
        {
            question: 'In Quick Sort, which element is chosen as the "pivot"?',
            answers: [
                'The first element',
                'The middle element',
                'The last element',
                'A randomly chosen element',
            ],
            correctAnswer: 3
        },
        {
            question: 'In Quick Sort, what is the purpose of the recursive calls?',
            answers: [
                'To divide the array into subarrays',
                'To merge sorted subarrays',
                'To find the median element',
                'To select the pivot',
            ],
            correctAnswer: 0
        },
        {
            question: 'What is a potential disadvantage of the basic Quick Sort implementation?',
            answers: [
                'It is not a stable sort',
                'It has a time complexity of O(n^2) in the worst case',
                'It cannot handle large datasets',
                'It requires additional memory space',
            ],
            correctAnswer: 1
        },
        {
            question: 'What happens when the subarrays in Quick Sort become sufficiently small?',
            answers: [
                'They are ignored',
                'They are sorted using insertion sort',
                'They are merged into a single array',
                'They are randomly shuffled',
            ],
            correctAnswer: 2
        },
    ],
    2: [ // Merge Sort
        {
            question: 'What is the time complexity of the Merge Sort algorithm in the worst case?',
            answers: [
                'O(n)',
                'O(n log n)',
                'O(n^2)',
                'O(log n)',
            ],
            correctAnswer: 1
        },
        {
            question: 'In Merge Sort, how are the elements divided during the "split" phase?',
            answers: [
                'Every other element',
                'Into two halves',
                'Into three equal parts',
                'Into random subarrays',
            ],
            correctAnswer: 1
        },
        {
            question: 'Merge Sort is a stable sorting algorithm. What does "stable" mean in this context?',
            answers: [
                'It always sorts elements in descending order.',
                'It has a fixed time complexity.',
                'It can handle large datasets efficiently.',
                'The relative order of equal elements remains unchanged after sorting.',
            ],
            correctAnswer: 3
        },
        {
            question: 'In merge sort, when are the recursive calls for dividing the array stopped?',
            answers: [
                'When the array size is less than 2',
                'When the array size is an even number',
                'When the array is sorted in descending order',
                'When the array size is equal to the input size',
            ],
            correctAnswer: 0
        },
        {
            question: 'What is the space complexity of merge sort?',
            answers: [
                'O(n)',
                'O(1)',
                'O(log n)',
                'O(n^2)',
            ],
            correctAnswer: 0
        },
    ],
    3: [ // Insertion Sort
        {
            question: 'What is the typical time complexity of the Insertion Sort algorithm in the worst case?',
            answers: [
                'O(n)',
                'O(n log n)',
                'O(n^2)',
                'O(log n)',
            ],
            correctAnswer: 2
        },
        {
            question: 'In Insertion Sort, how are elements moved within the sorted portion of the array during the "insert" phase?',
            answers: [
                'By swapping adjacent elements',
                'By comparing elements and moving them one position at a time',
                'By selecting a random element',
                'By reversing the entire sorted portion',
            ],
            correctAnswer: 1
        },
        {
            question: 'In insertion sort, where does the algorithm start comparing elements?',
            answers: [
                'From the middle',
                'From the end',
                'From the beginning',
                'Randomly',
            ],
            correctAnswer: 2
        },
        {
            question: 'What is a potential disadvantage of the Insertion Sort algorithm?',
            answers: [
                'It has a time complexity of O(n^2) in the best case.',
                'It is not an in-place sorting algorithm.',
                'It requires additional memory space.',
                'It is not suitable for small datasets.',
            ],
            correctAnswer: 0
        },
        {
            question: 'If an array contains only unique elements, how many comparisons are made in the worst-case scenario during Insertion Sort?',
            answers: [
                'n/2',
                'n - 1',
                'n^2',
                '2n',
            ],
            correctAnswer: 1
        },
    ],
}