import React, { useState } from 'react'


function Counter() {
    const [counter, setCounter] = useState(0)

    const addCounter = () => {
        setCounter((prevCounter) => prevCounter + 1)
    }

    return <div>
        <h1>{counter}</h1>
        <button onClick={addCounter}>Add</button>
    </div>

}

export default Counter 