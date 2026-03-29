import "./App.css";

import { useEffect, useRef, useState } from "react";

function App() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="tutorial">
      <input ref={inputRef} type="text" placeholder="Type something..." />
    </div>
  );
}

export default App;
