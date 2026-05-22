let array = [];
const DEFAULT_SIZE = 30;
const DELAY_MS = 100;

//generating random array
function generateArray(size) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 300) + 20);
    }
    renderArray(array);
}

//creating bars for the array
function renderArray(arr) {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    arr.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}px`;
        container.appendChild(bar);
    });
}

// update bar heights without recreating DOM (keeps highlights stable during sort)
function syncBars() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length; i++) {
        bars[i].style.height = `${array[i]}px`;
    }
}

function swap(i, j) {
    [array[i], array[j]] = [array[j], array[i]];
    syncBars();
}

document.addEventListener('DOMContentLoaded', () => {
    generateArray(DEFAULT_SIZE);

    document.getElementById('start-button').onclick = async function() {
        const algorithm = document.getElementById('algorithm-select').value;
        switch (algorithm) {
            case 'bubble':
                await bubbleSort(array);
                break;
            case 'selection':
                await selectionSort(array);
                break;
            case 'insertion':
                await insertionSort(array);
                break;
            case 'quick':
                await quickSort(array, 0, array.length - 1);
                break;
            case 'merge':
                await mergeSort(array, 0, array.length - 1);
                break;
            case 'heap':
                await heapSort(array);
                break;
        }
    };

    document.getElementById('random-button').onclick = () => generateArray(DEFAULT_SIZE);
    document.getElementById('reset-button').onclick = () => renderArray(array);
    document.getElementById('custom-button').onclick = () => {
        const input = prompt('Enter comma-separated numbers (e.g. 50,120,80):');
        if (!input) return;
        const values = input.split(',').map(v => parseInt(v.trim(), 10)).filter(n => !isNaN(n) && n > 0);
        if (values.length === 0) return;
        array = values;
        renderArray(array);
    };
});

//bubble sort
async function bubbleSort(array) {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
            if (array[j] > array[j + 1]) {
                swap(j, j + 1);
            }
            bars[j].style.backgroundColor = 'steelblue';
            bars[j + 1].style.backgroundColor = 'steelblue';
        }
    }
}

//selection sort
async function selectionSort(array) {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        bars[minIndex].style.backgroundColor = 'red';
        for (let j = i + 1; j < array.length; j++) {
            bars[j].style.backgroundColor = 'yellow';
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
            if (array[j] < array[minIndex]) {
                bars[minIndex].style.backgroundColor = 'steelblue';
                minIndex = j;
                bars[minIndex].style.backgroundColor = 'red';
            } else {
                bars[j].style.backgroundColor = 'steelblue';
            }
        }
        if (minIndex !== i) {
            swap(i, minIndex);
        }
        bars[minIndex].style.backgroundColor = 'steelblue';
        bars[i].style.backgroundColor = 'steelblue';
    }
}  

//insertion sort
async function insertionSort(array) {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = 'yellow';
            await new Promise(resolve => setTimeout(resolve, DELAY_MS));
            array[j + 1] = array[j];
            syncBars();
            bars[j + 1].style.backgroundColor = 'steelblue';
            j--;
        }
        array[j + 1] = key;
        syncBars();
        bars[j + 1].style.backgroundColor = 'steelblue';
        if (j + 1 !== i) bars[i].style.backgroundColor = 'steelblue';
    }
}

//quick sort
async function quickSort(array, low, high) {
    if (low < high) {
        const pi = await partition(array, low, high);
        await quickSort(array, low, pi - 1);
        await quickSort(array, pi + 1, high);
    }
}

async function partition(array, low, high) {
    const bars = document.getElementsByClassName('bar');
    let pivot = array[high];
    bars[high].style.backgroundColor = 'red';
    let i = low - 1;
    for (let j = low; j < high; j++) {
        bars[j].style.backgroundColor = 'yellow';
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        if (array[j] < pivot) {
            i++;
            swap(i, j);
        }
        bars[j].style.backgroundColor = 'steelblue';
    }
    swap(i + 1, high);
    bars[high].style.backgroundColor = 'steelblue';
    bars[i + 1].style.backgroundColor = 'steelblue';
    return i + 1;
}

//merge sort
async function mergeSort(array, left, right) {
    if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await mergeSort(array, left, mid);
        await mergeSort(array, mid + 1, right);
        await merge(array, left, mid, right);
    }
}

async function merge(array, left, mid, right) {
    const bars = document.getElementsByClassName('bar');
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;
    while (i < leftArray.length && j < rightArray.length) {
        bars[k].style.backgroundColor = 'yellow';
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        syncBars();
        bars[k].style.backgroundColor = 'steelblue';
        k++;
    }
    while (i < leftArray.length) {
        bars[k].style.backgroundColor = 'yellow';
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        array[k] = leftArray[i];
        syncBars();
        bars[k].style.backgroundColor = 'steelblue';
        i++;
        k++;
    }
    while (j < rightArray.length) {
        bars[k].style.backgroundColor = 'yellow';
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        array[k] = rightArray[j];
        syncBars();
        bars[k].style.backgroundColor = 'steelblue';
        j++;
        k++;
    }
}

//heap sort
async function heapSort(array) {
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        swap(0, i);
        await heapify(array, i, 0);
    }
}

async function heapify(array, n, i) {
    const bars = document.getElementsByClassName('bar');
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < n && array[left] > array[largest]) {
        largest = left;
    }
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }
    if (largest !== i) {
        bars[i].style.backgroundColor = 'red';
        bars[largest].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
        swap(i, largest);
        bars[i].style.backgroundColor = 'steelblue';
        bars[largest].style.backgroundColor = 'steelblue';
        await heapify(array, n, largest);
    }
}

