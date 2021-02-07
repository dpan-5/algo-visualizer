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
        <div className='array-container'>
            {array.map((val, idx) => (
                <div className='array-bar' key={idx} style={{height: `${val}px`}}>
                    
                </div>
            ))}
        </div>
    );
}