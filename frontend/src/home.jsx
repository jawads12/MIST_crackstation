import axios from "axios";
import ResponseImg from "./responseImg";
import Sidepanel from "./sidepanel";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState('');
  const [userPromt, setUserPromt] = useState('');

  const [formData, setFormData] = useState({
    prompt: "",
  });

  useEffect(() => {
    // Retrieve user name from session storage
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.setItem("userPromt", JSON.stringify(formData)); // Make sure formData is converted to a JSON string
    try {
      console.log("Form data:", formData); // Log form data before sending the request
      const response = await axios.post('http://127.0.0.1:5000/query', formData.prompt);
      console.log('Response:', response.data); // Log response data
    } catch (error) {
      console.error('Error:', error.message); // Log error message
    }
  };


  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="rounded-lg col-span-3 bg-gray-200">
        <Sidepanel />
      </div>
      <div className="rounded-lg col-span-9 relative">
        <header>
          <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Welcome {userName}!
                </h1>

                <p className="mt-1.5 text-sm text-gray-500">
                  Let's make a new travel Plan! 🎉
                </p>
              </div>

              <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                <button
                  className="block rounded-lg bg-indigo-600 px-3 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
                  type="button"
                >
                  New travel plan +
                </button>
              </div>
            </div>
          </div>
        </header>
        <div className="px-8 mb-5 rounded-md text-gray-400 h-auto text-wrap">{ formData.prompt }</div>
        <ResponseImg />
        <div className="fixed bottom-0 w-full bg-white border-t border-gray-300">
          <form onSubmit={ handleSubmit } className="mx-0 py-4 px-4">
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
                <button
                  className="border rounded-md px-4 py-2 bg-indigo-600 text-sm font-medium transition hover:bg-indigo-700 focus:outline-none focus:ring text-white"
                  type="submit"
                >
                  send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
