import { useState, useEffect } from 'react';
import './SortingVisualizer.css';
// import { bubbleSort } from './../SortingAlgos/SortingAlgos';


export default function SortingVisualizer() {
    
    const [array, setArray] = useState([]);
    const [algoIsRunning, setAlgoIsRunning] = useState(false);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        if (algoIsRunning) {
            window.location.href='/';
        }

        const array = [];

        //23
        for (let i = 0; i < 5; i ++) {
            array.push(Math.floor(Math.random() * (100 - 5 + 1) + 5));
        }

        setArray(array);
        
    }

    const handleSortClick = (e) => {
        switch (e.target.id) {
            case 'selection-sort':
                selectionSort();
                break;
            case 'quick-sort':
                console.log('2');
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


    const bubbleSort = async (delay = 100) => {
        setAlgoIsRunning(true);
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
    }

    //===================================================================================
    // SELECTION SORT
    //===================================================================================

    const selectionSort = async (delay = 1000) => {
        setAlgoIsRunning(true);
        let bars = document.querySelectorAll('.array-bar');


        for (let i = 0; i < bars.length; i++) {
            console.log(bars);
            let min = i;

            bars[i].style.backgroundColor = "#FF4949";

            await new Promise(resolve => setTimeout(() => {
                resolve();
            }, delay));

            for (let j = i + 1; j < bars.length; j++) {
                bars[j].style.backgroundColor = "yellow";

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
                } else {
                    bars[j].style.backgroundColor = "#58B7FF";
                }
            }

            if (min !== i) {
                await swap2(bars[i], bars[min]);
                bars = document.querySelectorAll(".array-bar");
                bars[i].style.backgroundColor = "#58B7FF";
            }



            bars[i].style.backgroundColor = "#13CE66";


        }

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
        </div>
    );
}