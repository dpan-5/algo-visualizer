import { useState, useEffect } from 'react';
import './SortingVisualizer.css';
// import { bubbleSort } from './../SortingAlgos/SortingAlgos';


export default function SortingVisualizer() {
    
    const [array, setArray] = useState([]);
    const [resetClicked, setResetClicked] = useState(false);
    const [algoIsRunning, setAlgoIsRunning] = useState(false);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        if (algoIsRunning) {
            window.location.href='/';
        }

        const array = [];

        for (let i = 0; i < 23; i ++) {
            array.push(Math.floor(Math.random() * (100 - 5 + 1) + 5));
        }

        setArray(array);
        
    }

    const handleSortClick = (e) => {
        switch (e.target.id) {
            case 'merge-sort':
                console.log('1');
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


    const bubbleSort = async (delay = 100) => {
        setAlgoIsRunning(true);
        let bars = document.querySelectorAll('.array-bar');

        for (let i = 0; i < bars.length; i++) {
            for (let j = 0; j < bars.length - 1 - i; j++) {
                bars[j].style.backgroundColor = "#FF4949";
                bars[j + 1].style.backgroundColor = "#FF4949";

                await new Promise(resolve => setTimeout(() => {
                    resolve();
                }, delay));

                const value1 = Number(bars[j].childNodes[0].innerHTML);
                const value2 = Number(bars[j + 1].childNodes[0].innerHTML);

                if (value1 > value2) {
                    await swap(bars[j], bars[j + 1]);
                    bars = document.querySelectorAll(".array-bar");
                }

                bars[j].style.backgroundColor = "#58B7FF";
                bars[j + 1].style.backgroundColor = "#58B7FF";
            }

            bars[bars.length - i - 1].style.backgroundColor = "#13CE66";
        }
    }

    
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
                <button onClick={handleSortClick} id='merge-sort' disabled={algoIsRunning} style={algoIsRunning ? {cursor: 'not-allowed'} : {}}>Merge Sort</button>
                <button onClick={handleSortClick} id='quick-sort' disabled={algoIsRunning} style={algoIsRunning ? {cursor: 'not-allowed'} : {}}>Quick Sort</button>
                <button onClick={handleSortClick} id='heap-sort' disabled={algoIsRunning} style={algoIsRunning ? {cursor: 'not-allowed'} : {}}>Heap Sort</button>
                <button onClick={handleSortClick} id='bubble-sort' disabled={algoIsRunning} style={algoIsRunning ? {cursor: 'not-allowed'} : {}}>Bubble Sort</button>
            </div>
        </div>
    );
}