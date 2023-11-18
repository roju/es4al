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
            question: 'In Bubble Sort, how are adjacent elements compared and swapped?',
            answers: [
                'Elements with the largest values',
                'Elements with the smallest values',
                'Elements at even indices',
                'Elements at odd indices',
            ],
            correctAnswer: 0
        },
        {
            question: 'Which of the following statements is true regarding the Bubble Sort algorithm?',
            answers: [
                'It is an example of a divide-and-conquer algorithm.',
                'It is inherently stable.',
                'It always performs better than quicksort.',
                'It has a constant space complexity.',
            ],
            correctAnswer: 1
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
                'It has a time complexity of O(1).',
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
            question: 'Quick Sort is a comparison-based sorting algorithm that falls under which category?',
            answers: [
                'Divide and Conquer',
                'Greedy Algorithms',
                'Dynamic Programming',
                'Backtracking',
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
            question: 'Quick Sort is often preferred over other sorting algorithms because:',
            answers: [
                'It has a stable time complexity in all cases',
                'It has a simple and easy-to-implement logic',
                'It can be easily adapted for parallel processing',
                'It does not require recursion',
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
                'The relative order of equal elements remains unchanged after sorting.',
                'It has a fixed time complexity.',
                'It can handle large datasets efficiently.',
            ],
            correctAnswer: 1
        },
        {
            question: 'What is the main advantage of the Merge Sort algorithm over other sorting algorithms?',
            answers: [
                'It has a time complexity of O(n^2) in the worst case.',
                'It requires minimal additional memory space.',
                'It is an in-place sorting algorithm.',
                'It guarantees a linear time complexity for all inputs.',
            ],
            correctAnswer: 1
        },
        {
            question: 'Merge Sort is a classic example of a:',
            answers: [
                'Greedy algorithm',
                'Divide and Conquer algorithm',
                'Dynamic Programming algorithm',
                'Backtracking algorithm',
            ],
            correctAnswer: 1
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
            question: 'Insertion Sort is considered an adaptive algorithm because:',
            answers: [
                'It adapts its behavior based on the input size.',
                'It adapts its behavior based on the distribution of input values.',
                'It adapts its behavior based on whether the input is sorted or not.',
                'It adapts its behavior based on the available memory space.',
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
            question: 'Insertion Sort is efficient for:',
            answers: [
                'Large datasets with a random distribution of elements.',
                'Almost sorted or small datasets.',
                'Datasets with a reverse-sorted order.',
                'Datasets containing only distinct elements.',
            ],
            correctAnswer: 1
        },
    ],
}