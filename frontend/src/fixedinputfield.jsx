import React, { useEffect, useState } from "react";

const FixedInputField = () => {
  const [formData, setFormData] = useState({
    prompt: "",
  });

  const [userPromt, setUserPromt] = useState("");

  useEffect(() => {
    // Retrieve user name from session storage
    const storedUserPromt = sessionStorage.getItem("userPromt");
    if (storedUserPromt) {
      setUserPromt(storedUserPromt);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem("userPromt", formData.prompt);
  };

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-300">
      <form onSubmit={handleSubmit} className="mx-0 py-4 px-4">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-6">
            <input
              type="text"
              name="prompt"
              value={formData.prompt}
              onChange={handleInputChange}
              placeholder="Type something..."
              className="col-span-1 w-full py-2 px-4 bg-white border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <div className="col-span-6">
            <button className="border rounded-md px-4 py-2 bg-blue-500 text-white" type="submit">
              send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FixedInputField;
