import "./App.css";

import { useRef, useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const countRef = useRef(0);

  const handleIncrement = () => {
    setCount(count + 1);
    countRef.current++;
    // console.log("State count:", count);
    console.log("Ref count:", countRef.current);
  };

  return (
    <div className="tutorial">
      Count: {countRef.current}
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

export default App;
