import React from "react";

const FixedInputField = ({ placeholder, onSubmit }) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      onSubmit(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-300">
      <form onSubmit={handleSubmit} className="mx-0 py-4 px-4">
        <div className="container">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder || "Type something..."}
            className="w-3/4 py-2 px-4 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </form>
    </div>
  );
};

export default FixedInputField;
