import { useEffect, useRef, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Dialog from "./components/Dialog";

function App() {
  const [name, setName] = useState("");
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  function closeModal() {
    if (!dialogRef.current) return;

    dialogRef.current.close();
    setName("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!dialogRef.current) return;
    dialogRef.current.showModal();
  }

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <main>
      <Form
        handleSubmit={handleSubmit}
        name={name}
        setName={setName}
        ref={inputRef}
      />

      <Dialog
        name={name}
        closeModal={closeModal}
        ref={dialogRef}
      >
        <p>Your name is {name}</p>
      </Dialog>
    </main>
  );
}

export default App;
