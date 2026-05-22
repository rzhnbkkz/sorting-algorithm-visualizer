let array = [];

//generating random array
function generateArray(size) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 300) + 20);
    }
    renderArray(array);
}

//start button 
document.getElementById('start-button').onClick = async function() {
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

//creating bars for the array
function renderArray(array) {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value}px`;
        container.appendChild(bar);
    });
}

//bubble sort
async function bubbleSort(array) {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';
            await new Promise(resolve => setTimeout(resolve, 100));
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                renderArray(array);
            }
            bars[j].style.backgroundColor = 'blue';
            bars[j + 1].style.backgroundColor = 'blue';
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
            await new Promise(resolve => setTimeout(resolve, 100));
            if (array[j] < array[minIndex]) {
                bars[minIndex].style.backgroundColor = 'blue';
                minIndex = j;
                bars[minIndex].style.backgroundColor = 'red';
            } else {
                bars[j].style.backgroundColor = 'blue';
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            renderArray(array);
        }
        bars[i].style.backgroundColor = 'blue';
    }
}  

//insertion sort
async function insertionSort(array) {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        bars[i].style.backgroundColor = 'red';
        await new Promise(resolve => setTimeout(resolve, 100));
        while (j >= 0 && array[j] > key) {
            bars[j].style.backgroundColor = 'yellow';
            await new Promise(resolve => setTimeout(resolve, 100));
            array[j + 1] = array[j];
            renderArray(array);
            bars[j].style.backgroundColor = 'blue';
            j--;
        }
        array[j + 1] = key;
        renderArray(array);
        bars[i].style.backgroundColor = 'blue';
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
        await new Promise(resolve => setTimeout(resolve, 100));
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            renderArray(array);
        }
        bars[j].style.backgroundColor = 'blue';
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    renderArray(array);
    bars[high].style.backgroundColor = 'blue';
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
        await new Promise(resolve => setTimeout(resolve, 100));
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        renderArray(array);
        bars[k].style.backgroundColor = 'blue';
        k++;
    }
    while (i < leftArray.length) {
        bars[k].style.backgroundColor = 'yellow';
        await new Promise(resolve => setTimeout(resolve, 100));
        array[k] = leftArray[i];
        renderArray(array);
        bars[k].style.backgroundColor = 'blue';
        i++;
        k++;
    }
    while (j < rightArray.length) {
        bars[k].style.backgroundColor = 'yellow';
        await new Promise(resolve => setTimeout(resolve, 100));
        array[k] = rightArray[j];
        renderArray(array);
        bars[k].style.backgroundColor = 'blue';
        j++;
        k++;
    }
}

//heap sort
async function heapSort(array) {
    const bars = document.getElementsByClassName('bar');
    const n = array.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(array, n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        [array[0], array[i]] = [array[i], array[0]];
        renderArray(array);
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
        await new Promise(resolve => setTimeout(resolve, 100));
        [array[i], array[largest]] = [array[largest], array[i]];
        renderArray(array);
        bars[i].style.backgroundColor = 'blue';
        bars[largest].style.backgroundColor = 'blue';
        await heapify(array, n, largest);
    }
}

