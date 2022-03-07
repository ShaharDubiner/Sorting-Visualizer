function animationsHelper(firstIdx, SecondIdx, value, animations) {
    animations.push([firstIdx, SecondIdx]);
    animations.push([firstIdx, SecondIdx]);
    animations.push([firstIdx, value]);
}

export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}
  
function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
    ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

export function getInsertionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    insertionSort(array, animations);
    return animations;
}

function insertionSort(array, animations) { 
    let i, key, j; 
    for (i = 1; i < array.length; ++i) { 
        key = array[i]; 
        j = i - 1;

        while (j >= 0 && array[j] > key) {

            animations.push([i, j]);
            animations.push([i, j]);
            
            animations.push([j + 1, array[j]]);
            array[j + 1] = array[j];
            j = j - 1; 
        } 
        animations.push([j + 1, j + 1]);
        animations.push([j + 1, j + 1]);
        animations.push([j + 1, key]);
        array[j + 1] = key;
    }
    
    for (i = 1; i < array.length; ++i) {
        console.log(array[i] + " ")
    }
} 

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSort(array, 0, array.length -1, animations);
    for (let i = 0; i < array.length; ++i) {
        console.log(array[i] + " ")
    }
    return animations;
}

function quickSort(array, start, end, animations) {
    if (start >= end) {
        return;
    }
    
    let index = partition(array, start, end, animations);
    quickSort(array, start, index - 1, animations);
    quickSort(array, index + 1, end, animations);
}

function partition(array, start, end, animations){
    const pivotValue = array[end];
    let pivotIndex = start; 
    for (let i = start; i < end; i++) {
        animations.push([i, end]);
        animations.push([i, end]);
        if (array[i] < pivotValue) {
            animations.push([i, array[pivotIndex]]);
            animations.push([pivotIndex, array[i]]);
            [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
            pivotIndex++;
        } else {
            animations.push([i, array[i]]);
            animations.push([i, array[i]]);
        }
    }
    
    // Putting the pivot value in the middle
    animations.push([pivotIndex, end]);
    animations.push([pivotIndex, end]);
    animations.push([pivotIndex, array[end]]);
    animations.push([end, array[pivotIndex]]);
    [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]] 
    return pivotIndex;
}

let ANIMATION_SPEED_MS = 3;

export function get_ANIMATION_SPEED_MS() {
    return ANIMATION_SPEED_MS;
}
export function fasterSpeed() {
    if(ANIMATION_SPEED_MS > 1) {
        --ANIMATION_SPEED_MS;
    }
}
export function slowerSpeed() {
    ++ANIMATION_SPEED_MS;
}