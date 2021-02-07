import { useState, useEffect } from 'react';
export default function SortingVisualizer() {
    
    const [array, setArray] = useState([]);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        const array = [];

        for (let i = 0; i < 100; i ++) {
            array.push(Math.floor(Math.random() * (1000 - 5 + 1) + 5));
        }

        setArray(array);

    }
    
    return (
        <>
        {array.map((val, idx) => (
            <div className='array-bar' key={idx}>
                {val}
            </div>
        ))}
        </>
    );
}