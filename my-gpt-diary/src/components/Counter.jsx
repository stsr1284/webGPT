import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  const handleClickPlus = () => {
    setCount(count + 1);
  }

  const handleClickMinus = () => {
    setCount(count - 1);
  }

  const handleUserInput = (e) => {
    setInput(e.target.value);
  }

  const handleEnter = () => {
    if (e.Key === "Enter") {
      setInput("");
      const num = Number(input);
      if (Number.isInteger(num)) setCount(num);
    }
  }

  return (
    <>
     <div>count: {count}</div>
     <div>
      <div>count valud input</div>
      <input
        value={input}
        onChange={handleUserInput}
        onKeyDown={handleEnter}></input>
     </div>
     <div>
      <div>button</div>
      <button onClick={handleClickPlus}>+</button>
      <button onClick={handleClickMinus}>-</button>
     </div>
    </>
  )
}

export default Counter
