import { useState, useEffect } from 'react';
import './SortingVisualizer.css';


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
                <button onClick={() => resetArray()}>Merge Sort</button>
                <button onClick={() => resetArray()}>Quick Sort</button>
                <button onClick={() => resetArray()}>Heap Sort</button>
                <button onClick={() => resetArray()}>Bubble Sort</button>
            </div>
        </div>
    );
}