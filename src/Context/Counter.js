import { createContext, useState } from "react";



export let counter = createContext();

export default function CounterProvuder(props) {


    let [counterNum ,setCounterNum] = useState (10);

    return <>
    
    <counter.Provider value={{counterNum , setCounterNum}} >
        {props.children}
    </counter.Provider>
    </>


}