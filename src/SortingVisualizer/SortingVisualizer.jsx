import { useState, useEffect } from 'react';
import './SortingVisualizer.css';
import { bubbleSort } from './../SortingAlgos/SortingAlgos';


export default function SortingVisualizer() {
    
    const [array, setArray] = useState([]);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        const array = [];

        for (let i = 0; i < 300; i ++) {
            array.push(Math.floor(Math.random() * (500 - 5 + 1) + 5));
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
                console.log(bubbleSort(array));
        }
    }
    
    return (
        <div className='sv-container'>
            <div className='array-container'>
                {array.map((val, idx) => (
                    <div className='array-bar' key={idx} style={{height: `${val}px`}}>
                        
                    </div>
                ))}
            </div>
            <div className='button-container'>
                <button onClick={() => resetArray()} className='reset-button'>Reset</button>
                <button onClick={handleSortClick} id='merge-sort'>Merge Sort</button>
                <button onClick={handleSortClick} id='quick-sort'>Quick Sort</button>
                <button onClick={handleSortClick} id='heap-sort'>Heap Sort</button>
                <button onClick={handleSortClick} id='bubble-sort'>Bubble Sort</button>
            </div>
        </div>
    );
}