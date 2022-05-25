import { useEffect, useState } from "react";

export default function useDebounce(initialValue,delay){
    const [debaounceValue,setDebounceValue]=useState(initialValue);
    useEffect(()=>{       
        const timer = setTimeout(()=>{
            setDebounceValue(initialValue)
        },delay)
        return ()=>{
            clearTimeout(timer)
        }
    },[delay, initialValue])
    return debaounceValue;
}