import axios from "axios";
import React, { useRef, useState } from "react";

export default function GetFibForm(){

    const [fibonacciSeq, setFibonacci] = useState(
        {
          fibonacci: [],
          sorted: [],
        }
      );

    const inputNumber = useRef(1);

    function handleClick(e){
        e.preventDefault();
        // console.log("Send number, get API");
        // console.log(inputNumber.current.value);

        axios
        .get("http://localhost:8080/fibonacci/" + inputNumber.current.value)
        .then(response => {
            console.log(response.data);
            setFibonacci(response.data);
        })
        .catch(e => {
            console.log(e);
        })
    }

    function displayFib(){
        if (fibonacciSeq){
            return(
            <div>
                <div>Unsorted Fibonacci Sequence: {fibonacciSeq.fibonacci.toString()}</div>
                <br/>
                <div>Sorted Fibonacci Sequence: {fibonacciSeq.sorted.toString()}</div>
            </div>
            )
        }
    }

    return(
        <div>
            <h3>Get Fibonacci Sequence</h3>
            <form>
                <label htmlFor="number">Number of elements:</label>
                <input ref={inputNumber} type="number" name="number" min="1" required step="1"/>
                <button onClick={handleClick}>Enter</button>
            </form>
            <br/><br/>
            {displayFib()}
        </div>
    )
}