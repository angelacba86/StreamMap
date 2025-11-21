import "./Input.css";
export const Input = ({ type, placeholder,id }) => {
  return (
    <>
      <input
        type={type}
        className="input-style"
        placeholder={placeholder}
        id={id}
      ></input>
    </>
  );
};
