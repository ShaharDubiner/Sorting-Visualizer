import React from "react";
import {getMergeSortAnimations, getInsertionSortAnimations, getQuickSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js'
import './SortingVisualizer.css';

const PRIMARY_COLOR = 'turquoise'; 
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        var arraySize = document.getElementById("arraySize");
        for (let i = 0; i < arraySize.value; ++i) {
            array.push(randomIntFromInterval(2,700));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        var ANIMATION_SPEED_MS = document.getElementById("animSpeed");
        for (let i = 0; i < animations.length; ++i) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = (i % 3 !== 2);
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                let color;
                if(i % 3 === 0) {
                    color = SECONDARY_COLOR
                } else color = PRIMARY_COLOR
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * (10- ANIMATION_SPEED_MS.value));
                
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * (10- ANIMATION_SPEED_MS.value));
                
            }
        }
    }

    insertionSort() {
        const animations = getInsertionSortAnimations(this.state.array);
        var ANIMATION_SPEED_MS = document.getElementById("animSpeed");
        for (let i = 0; i < animations.length; ++i) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = (i % 3 !== 2);
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                let color;
                if(i % 3 === 0) {
                    color = SECONDARY_COLOR
                } else color = PRIMARY_COLOR
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * (10- ANIMATION_SPEED_MS.value));
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * (10- ANIMATION_SPEED_MS.value));
            }
        }
    }

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        var isColorChange = 0;
        var ANIMATION_SPEED_MS = document.getElementById("animSpeed");
        for (let i = 0; i < animations.length; ++i) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if (isColorChange === 4) isColorChange = 0;
            if (isColorChange === 0 || isColorChange === 1) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                let color;
                if(isColorChange === 0) {
                    color = SECONDARY_COLOR
                } else color = PRIMARY_COLOR
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * (10- ANIMATION_SPEED_MS.value));
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    const [barTwoIdx, newHeight2] = animations[i + 1];
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barTwoStyle.height = `${newHeight2}px`;
                    ++i;
                }, i * (10- ANIMATION_SPEED_MS.value));
            }
            ++isColorChange;
        }
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div 
                    className="array-bar" 
                    key={idx}
                    style={{
                        backgroundColor: PRIMARY_COLOR,
                        height: `${value}px`
                    }}></div>
                ))}
                <div className="button-container">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                </div>
                <div class="slidecontainer">
                    <p>Animation Speed:</p>
                    <input type="range" min="1" max="9" defaultValue="7" step="1" id="animSpeed"/>
                    
                    <p>Array Length:</p>
                    <input type="range" min="150" max="400" defaultValue="200" step="1" class="slider" id="arraySize"/>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}