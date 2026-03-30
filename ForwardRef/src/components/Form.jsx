import { forwardRef } from "react";

const Form = forwardRef(({ handleSubmit, name, setName }, ref) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Your Name</label>
      <input
        type="text"
        ref={ref}
        id="name"
        name="name"
        value={name}
        onInput={(e) => setName(e.currentTarget.value)}
      />
      <input
        type="submit"
        onSubmit={handleSubmit}
      />
    </form>
  );
});

export default Form;
