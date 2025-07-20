import { useEffect, useState, useRef, useReducer } from "react";







export default function Counter() {

  const [count, setCount] = useState(0);
  const prevCount = useRef(count)
  const resetPressed = useRef(false)

  useEffect(() => {

    if (resetPressed.current) {
      console.log("count reset")
      resetPressed.current = false;
    }
    else {
      if (count > prevCount.current) {
        console.log("count increased: ", count)
      }
      else if (count < prevCount.current) {
        console.log("count decreased: ", count)
      }
    }


    prevCount.current = count
  }, [count])
  function increase() {
    setCount(count + 1);
  }
  function decrease() {
    setCount(count - 1)
  }
  return (

    <>
      <div>counter</div>
      <h4>Count: {count}</h4>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
      <button onClick={() => {
        setCount(0);
        resetPressed.current = true
      }}>Reset</button>
    </>


  )
}

/*
 async function data() {
   
    const resp = await fetch('http://localhost:8080/data');
    const result = await response.text(); // or .json() if your API returns JSON
    alert(result);
    if(resp.ok) {
        const result = await response.text(); // or .json() if your API returns JSON
        alert("Response: " + result);
    } else {
        alert("Request failed: " + resp.status);
    }
}
*/