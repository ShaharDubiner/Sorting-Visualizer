import React from "react";
import {getMergeSortAnimations, getInsertionSortAnimations, getQuickSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js'
import './SortingVisualizer.css';

let ANIMATION_SPEED_MS = 3;
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
        for (let i = 0; i < 200; ++i) {
            array.push(randomIntFromInterval(2,700));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
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
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    insertionSort() {
        const animations = getInsertionSortAnimations(this.state.array);
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
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        var isColorChange = 0;
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
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    const [barTwoIdx, newHeight2] = animations[i + 1];
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barTwoStyle.height = `${newHeight2}px`;
                    ++i;
                }, i * ANIMATION_SPEED_MS);
            }
            ++isColorChange;
        }
    }

    fasterSpeed() {
        if(ANIMATION_SPEED_MS > 1) {
            --ANIMATION_SPEED_MS;
            console.log(ANIMATION_SPEED_MS + " ANIMATION_SPEED_MS")
        }
    }

    slowerSpeed() {
        ++ANIMATION_SPEED_MS;
        console.log(ANIMATION_SPEED_MS + " ANIMATION_SPEED_MS")
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
                <div className="speed-container">
                    <button hidden="hidden" onClick={() => this.slowerSpeed()}>Slower</button>
                    <button hidden="hidden" onClick={() => this.fasterSpeed()}>Faster</button>
                </div>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}