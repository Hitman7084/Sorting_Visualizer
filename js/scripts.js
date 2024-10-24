const arrayContainer = document.getElementById('array-container');
const generateBtn = document.getElementById('generate');
const sortBtn = document.getElementById('sort');
const algorithmSelect = document.getElementById('algo');
const speedInput = document.getElementById('speed');
const sizeInput = document.getElementById('size');

let array = [];
let sorting = false;

let comparisons = 0;
let swaps = 0;
let startTime;

// Update statistics
function updateStats(){
    document.getElementById('comparisons').textContent = comparisons;
    document.getElementById('swaps').textContent = swaps;
    const timeElapsed = new Date().getTime() - startTime;
    document.getElementById('time').textContent = timeElapsed;
}

// Reset statistics
function resetStats() {
    comparisons = 0;
    swaps = 0;
    document.getElementById('comparisons').textContent = 0;
    document.getElementById('swaps').textContent = 0;
    document.getElementById('time').textContent = 0;
}

function generateArray(){
    const size = sizeInput.value;
    array = Array.from({ length: size }, () => Math.floor(Math.random() * 300) + 5);
    renderArray();
}

function renderArray(){
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('array-bar');
        bar.style.height = `${value}px`;
        bar.style.width = `${600 / array.length}px`;
        arrayContainer.appendChild(bar);
    });
}

function swap(el1, el2){
    const temp = el1.style.height;
    el1.style.height = el2.style.height;
    el2.style.height = temp;
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort(){
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 0; i < bars.length - 1; i++){
        for (let j = 0; j < bars.length - i - 1; j++){
            bars[j].style.backgroundColor = '#403D39';
            bars[j + 1].style.backgroundColor = '#403D39';

            if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)){
                await sleep(speedInput.value);
                swap(bars[j], bars[j + 1]);
            }

            bars[j].style.backgroundColor = '#333333';
            bars[j + 1].style.backgroundColor = '#333333';
        }
        bars[bars.length - 1 - i].classList.add('sorted');
    }
}

// Insertion Sort
async function insertionSort(){
    const bars = document.querySelectorAll('.array-bar');
    for (let i = 1; i < bars.length; i++){
        let j = i - 1;
        let key = bars[i].style.height;
        bars[i].style.backgroundColor = '#403D39';
        
        while (j >= 0 && parseInt(bars[j].style.height) > parseInt(key)){
            bars[j + 1].style.height = bars[j].style.height;
            j--;
            await sleep(speedInput.value);
        }
        bars[j + 1].style.height = key;
        bars[i].style.backgroundColor = '#333333';
    }
}

//Merge Sort
async function mergeSort(start, end) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const bars = document.querySelectorAll('.array-bar');
    let left = start, right = mid + 1;
    const tempArray = [];

    while (left <= mid && right <= end) {
        bars[left].style.backgroundColor = '#A4193D'; // Left half 
        bars[right].style.backgroundColor = '#FFDFB9'; // Right half

        if (parseInt(bars[left].style.height) < parseInt(bars[right].style.height)) {
            tempArray.push(bars[left].style.height);
            left++;
        } else {
            tempArray.push(bars[right].style.height);
            right++;
        }
        await sleep(speedInput.value);
    }

    while (left <= mid) tempArray.push(bars[left++].style.height);
    while (right <= end) tempArray.push(bars[right++].style.height);

    for (let i = 0; i < tempArray.length; i++) {
        bars[start + i].style.height = tempArray[i];
        bars[start + i].style.backgroundColor = '#333333';
        await sleep(speedInput.value);
    }
}


// Quick Sort
async function quickSort(start, end){
    if (start >= end) return;

    const bars = document.querySelectorAll('.array-bar');
    let pivotIndex = await partition(bars, start, end);
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);
}

async function partition(bars, start, end){
    let pivot = parseInt(bars[end].style.height);
    let i = start - 1;
    bars[end].style.backgroundColor = '#403D39';

    for (let j = start; j < end; j++){
        bars[j].style.backgroundColor = '#720026';
        if (parseInt(bars[j].style.height) < pivot) {
            i++;
            swap(bars[i], bars[j]);
            await sleep(speedInput.value);
        }
        bars[j].style.backgroundColor = '#333333';
    }
    swap(bars[i + 1], bars[end]);
    bars[end].style.backgroundColor = '#333333';
    bars[i + 1].classList.add('sorted');
    return i + 1;
}


// Selection Sort
async function selectionSort() {
    const bars = document.querySelectorAll('.array-bar');
    applyColorScheme(bars);
    for (let i = 0; i < bars.length - 1; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = '#403D39'; // Current min element
        
        for (let j = i + 1; j < bars.length; j++) {
            comparisons++;
            updateStats();
            bars[j].style.backgroundColor = '#A4193D'; // Current element being compared

            if (parseInt(bars[j].style.height) < parseInt(bars[minIndex].style.height)) {
                minIndex = j;
            }
            await sleep(speedInput.value);
            bars[j].style.backgroundColor = '#333333'; // Reset color
        }
        
        if (minIndex !== i) {
            swap(bars[i], bars[minIndex]);
            swaps++;
            updateStats();
        }
        bars[i].classList.add('sorted');
    }
}

// Heap Sort
async function heapSort() {
    const bars = document.querySelectorAll('.array-bar');
    applyColorScheme(bars);
    const n = bars.length;
    
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(bars, n, i);
    }
    
    for (let i = n - 1; i > 0; i--) {
        swap(bars[0], bars[i]);
        swaps++;
        updateStats();
        await heapify(bars, i, 0);
        bars[i].classList.add('sorted');
    }
    bars[0].classList.add('sorted');
}

async function heapify(bars, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    comparisons++;
    updateStats();
    if (left < n && parseInt(bars[left].style.height) > parseInt(bars[largest].style.height)) {
        largest = left;
    }

    comparisons++;
    updateStats();
    if (right < n && parseInt(bars[right].style.height) > parseInt(bars[largest].style.height)) {
        largest = right;
    }

    if (largest !== i) {
        swap(bars[i], bars[largest]);
        swaps++;
        updateStats();
        await heapify(bars, n, largest);
    }
}

// Handle sorting selection
async function handleSort() {
    if (sorting) return;
    sorting = true;
    resetStats();
    startTime = new Date().getTime();
    
    const algorithm = algorithmSelect.value;
    switch (algorithm) {
        case '0':
            alert("Sorting type not selected!!");
            break;
        case '1':
            await bubbleSort();
            break;
        case '2':
            await insertionSort();
            break;
        case '3':
            await quickSort(0, array.length - 1);
            break;
        case '4':
            await mergeSort(0, array.length -1);
            break;
        case '5':
            await selectionSort();
            break;
        case '6':
            await heapSort();
            break;
    }
    sorting = false;
}


generateBtn.addEventListener('click', generateArray);
sortBtn.addEventListener('click', handleSort);

generateArray();