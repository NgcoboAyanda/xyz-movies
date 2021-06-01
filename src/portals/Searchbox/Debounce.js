import React, { useState, useEffect} from 'react'

export default (myValue, delay)=>{
    const[debouncedValue, setDebouncedValue] = useState(myValue)

    useEffect(
        ()=> {
            const handler = setTimeout( ()=>{
                setDebouncedValue(myValue)
            }, delay)
            return ()=> {
                clearTimeout(handler)
            }
        },
        // Only call useEffect if myValue changes
        [myValue]
    )

    return debouncedValue
}