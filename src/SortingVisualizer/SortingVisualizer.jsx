import { useState, useEffect } from 'react';
import './SortingVisualizer.css';
// import { bubbleSort } from './../SortingAlgos/SortingAlgos';

const ARRAY_SIZE = 9;

const DELAY_MS = 100;

export default function SortingVisualizer() {
    
    const [array, setArray] = useState([]);
    const [algoIsRunning, setAlgoIsRunning] = useState(false);
    const [algoHasRan, setAlgoHasRan] = useState(false);



    useEffect(() => {
        resetArray();
    }, []);

    useEffect(() => {
        if (algoIsRunning) {
            setAlgoHasRan(true);
        }
    }, [algoIsRunning])

    const resetArray = () => {
        if (algoIsRunning) {
            window.location.href='/';
        }
        if (algoHasRan) {
            let bars = document.querySelectorAll('.array-bar');
            bars.forEach(bar => bar.style.backgroundColor = '#58B7FF');
        }
        const array = [];
        for (let i = 0; i < ARRAY_SIZE; i ++) {
            array.push(Math.floor(Math.random() * (100 - 5 + 1) + 5));
        }
        setArray(array); 
    }

    const handleSortClick = (e) => {
        setAlgoIsRunning(true);
        if (algoHasRan) {
            let bars = document.querySelectorAll('.array-bar');
            bars.forEach(bar => bar.style.backgroundColor = '#58B7FF')
        }

        switch (e.target.id) {
            case 'selection-sort':
                selectionSort();
                break;
            case 'quick-sort':
                quickSortIterative(array);
                break;
            case 'heap-sort':
                console.log('3');
                break;
            case 'bubble-sort':
                bubbleSort();
        }
    }

    const container = document.querySelector('.array-container');

    const swap = async (bar1, bar2) => {
        return new Promise(resolve => {
            const style1 = window.getComputedStyle(bar1);
            const style2 = window.getComputedStyle(bar2);
        
            const transform1 = style1.getPropertyValue("transform");
            const transform2 = style2.getPropertyValue("transform");
        
            bar1.style.transform = transform2;
            bar2.style.transform = transform1;
        

            window.requestAnimationFrame(function() {
              setTimeout(() => {
                container.insertBefore(bar2, bar1);
                resolve();
              }, 250);
            });
          });
    }

    const swap2 = async (bar1, bar2) => {
        return new Promise(resolve => {
            const style1 = window.getComputedStyle(bar1);
            const style2 = window.getComputedStyle(bar2);
        
            const transform1 = style1.getPropertyValue("transform");
            const transform2 = style2.getPropertyValue("transform");
        
            bar1.style.transform = transform2;
            bar2.style.transform = transform1;
        

            window.requestAnimationFrame(function() {
              setTimeout(() => {
                // create temp element and insert it before bar1
                const temp = document.createElement('div');
                container.insertBefore(temp, bar1);
                
                // move bar1 to right before bar2
                container.insertBefore(bar1, bar2);

                // move bar2 to right before bar1 used to be (now temp)
                container.insertBefore(bar2, temp);

                // remove temp element node
                container.removeChild(temp);

                resolve();
              }, 250);
            });
          });
    }

    //===================================================================================
    // BUBBLE SORT
    //===================================================================================

    const bubbleSort = async (delay = 100) => {
        let bars = document.querySelectorAll('.array-bar');

        for (let i = 0; i < bars.length; i++) {
            // document.querySelector('.iLoop').style.color = 'red';
            // document.querySelector('.jLoop').style.color = 'black';

            await new Promise(resolve => setTimeout(() => {
                resolve();
            }, delay));

            for (let j = 0; j < bars.length - 1 - i; j++) {
                // document.querySelector('.iLoop').style.color = 'black';
                // document.querySelector('.jLoop').style.color = 'red';
                bars[j].style.backgroundColor = "#FF4949";
                bars[j + 1].style.backgroundColor = "#FF4949";

                await new Promise(resolve => setTimeout(() => {
                    resolve();
                }, delay));

                const value1 = Number(bars[j].childNodes[0].innerHTML);
                const value2 = Number(bars[j + 1].childNodes[0].innerHTML);

                if (value1 > value2) {
                    // document.querySelector('.iLoop').style.color = 'black';
                    // document.querySelector('.jLoop').style.color = 'black';
                    
                    await swap(bars[j], bars[j + 1]);
                    bars = document.querySelectorAll(".array-bar");
                }

                bars[j].style.backgroundColor = "#58B7FF";
                bars[j + 1].style.backgroundColor = "#58B7FF";
            }

            bars[bars.length - i - 1].style.backgroundColor = "#13CE66";
        }

        setAlgoIsRunning(false);
    }

    //===================================================================================
    // SELECTION SORT
    //===================================================================================

    const selectionSort = async (delay = 100) => {
        let bars = document.querySelectorAll('.array-bar');


        for (let i = 0; i < bars.length; i++) {
            let min = i;

            bars[i].style.backgroundColor = "#FF4949";

            await new Promise(resolve => setTimeout(() => {
                resolve();
            }, delay));

            for (let j = i + 1; j < bars.length; j++) {
                bars[j].style.backgroundColor = "#FF4949";

                await new Promise(resolve => setTimeout(() => {
                    resolve();
                }, delay));


                if (Number(bars[j].childNodes[0].innerHTML) < Number(bars[min].childNodes[0].innerHTML)) {
                        if (min !== i) {
                        // Turn old index of min back to blue
                        bars[min].style.backgroundColor= "#58B7FF";
                        }
                    // Set new min object to current min of index j
                    min = j;
                    // Turn current index (new min) to purple
                    bars[j].style.backgroundColor = '#AE58FF';
                    await new Promise(resolve => setTimeout(() => {
                        resolve();
                    }, delay));
                } else {
                    bars[j].style.backgroundColor = "#58B7FF";
                }
            }

            if (min !== i) {
                await swap2(bars[i], bars[min]);
                bars = document.querySelectorAll(".array-bar");
                bars[i].style.backgroundColor = "#58B7FF";
                bars[min].style.backgroundColor = "#58B7FF";
            }



            bars[i].style.backgroundColor = "#13CE66";


        }

        setAlgoIsRunning(false);
    }

    //===================================================================================
    // QUICK SORT
    //===================================================================================

    const partition = async (arr, start, end) => {
        
        const pivotValue = arr[end];
        let pivotIndex = start;

        for (let i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                // Swap elements

                [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                // Move pivot index to next element
                pivotIndex++;
            }
        }

        [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
        return pivotIndex;
    }

    const quickSortRecursive = async (arr, start, end) => {
        // let bars = document.querySelectorAll('.array-bar');

        if (start >= end) {
            return;
        }

        let index = await partition(arr, start, end);
        
        await Promise.all([quickSortRecursive(arr, start, index - 1), quickSortRecursive(arr, index + 1, end)])
    }

    const partition2 = async (bars, start, end) => {

        const pivotValue = Number(bars[end].childNodes[0].innerHTML);
        let pivotIndex = start;

        // await new Promise(resolve => {
        //     setTimeout(resolve, 1000);
        // });

        bars[pivotIndex].style.backgroundColor = 'yellow';

        for (let i = start; i < end; i++) {
            if (bars[i].childNodes[0].innerHTML < pivotValue) {
                // Swap elements

                await new Promise(resolve => setTimeout(() => {
                    resolve();
                }, 1000));

                await swap2(bars[i], bars[pivotIndex]);

                bars = document.querySelectorAll('.array-bar');

                // [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
                // Move pivot index to next element
                pivotIndex++;
                bars[pivotIndex - 1].style.backgroundColor = '#58B7FF';
                bars[pivotIndex].style.backgroundColor = 'yellow';
            }
        }

        await new Promise(resolve => setTimeout(() => {
            resolve();
        }, 1000));

        await swap2(bars[pivotIndex], bars[end]);
        bars = document.querySelectorAll('.array-bar');
        // [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
        return pivotIndex;
    }

    const quickSortIterative = async (arr) => {
        let bars = document.querySelectorAll('.array-bar');

        // Creating an array that we'll use as a stack, using the push() and pop() functions
        let stack = [];
        
        // Adding the entire initial array as an "unsorted subarray"
        stack.push(0);
        stack.push(bars.length - 1);
        
        // There isn't an explicit peek() function
        // The loop repeats as long as we have unsorted subarrays
        while(stack[stack.length - 1] >= 0){
            await new Promise(resolve => {
                setTimeout(resolve, 100);
            });

            console.log(stack);
            // Extracting the top unsorted subarray
            let end = stack.pop();
            let start = stack.pop();

            bars[end].style.backgroundColor = 'black';
            bars[start].style.backgroundColor = 'black';
            
            let pivotIndex = await partition2(bars, start, end);
            console.log(pivotIndex);

            bars = document.querySelectorAll('.array-bar');

            // If there are unsorted elements to the "left" of the pivot,
            // we add that subarray to the stack so we can sort it later
            if (pivotIndex - 1 > start){
                stack.push(start);
                stack.push(pivotIndex - 1);
            }
            
            // If there are unsorted elements to the "right" of the pivot,
            // we add that subarray to the stack so we can sort it later
            if (pivotIndex + 1 < end){
                stack.push(pivotIndex + 1);
                stack.push(end);
            }

            


        }
        console.log(stack);
        setAlgoIsRunning(false);
    }

    



    //===================================================================================
    // RENDER
    //===================================================================================


    
    return (
        <div className='sv-container'>
            <div className='array-container'>
                {array.map((val, idx) => (
                    <div className='array-bar' key={idx} style={{height: `${val*3}px`, transform: `translateX(${idx * 30}px)`}}>
                        <label className='array-bar-label'>
                            {val}
                        </label>
                    </div>
                ))}
            </div>
            <div className='button-container'>
                <button onClick={() => resetArray()} className='reset-button'>Reset</button>
                <button onClick={handleSortClick} id='selection-sort' disabled={algoIsRunning} style={algoIsRunning ? {cursor: 'not-allowed'} : {}}>Selection Sort</button>
                <button onClick={handleSortClick} id='bubble-sort' disabled={algoIsRunning} style={algoIsRunning ? {cursor: 'not-allowed'} : {}}>Bubble Sort</button>
                <button onClick={handleSortClick} id='quick-sort' disabled={algoIsRunning} style={algoIsRunning ? {cursor: 'not-allowed'} : {}}>Quick Sort</button>
                <button onClick={handleSortClick} id='heap-sort' disabled={algoIsRunning} style={algoIsRunning ? {cursor: 'not-allowed'} : {}}>Heap Sort</button>
            </div>
            {/* <input id='slider' type='range' min='0' max='5' /> */}

        </div>
    );
}



            {/* <code className='iLoop'>
                {"for (let i = 0; i < array.length; i++) {"}
            </code>
            <code className='jLoop' style={{textIndent: 30}}>
                {"for (let j = 0; j < array.length - 1 - j; j++) {"}
            </code>
            <code className='ifCheck' style={{textIndent: 60}}>
                {"if (array[j] > array[j + 1]) {"}
            </code>
            <code className='ifCheckTrue' style={{textIndent: 90}}>
                {"let tmp = array[j]"}
            </code>
            <code className='ifCheckTrue' style={{textIndent: 90}}>
                {"array[j] = array[j + 1]"}
            </code>
            <code className='ifCheckTrue' style={{textIndent: 90}}>
                {"array[j + 1] = tmp"}
            </code> */}