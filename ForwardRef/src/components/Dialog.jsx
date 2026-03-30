import { forwardRef } from "react";

const Dialog = forwardRef(({ children, closeModal }, ref) => {
  return (
    <dialog ref={ref}>
      <h2>Info here</h2>
      {children}
      <button onClick={closeModal}>Close</button>
    </dialog>
  );
});

export default Dialog;
