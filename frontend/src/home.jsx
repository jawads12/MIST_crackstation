import axios from "axios";
import ResponseImg from "./responseImg";
import Sidepanel from "./sidepanel";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [userPromt, setUserPromt] = useState("");
  const [responseData, setResponseData] = useState(""); // State to store response data

  const [formData, setFormData] = useState({
    prompt: "",
  });

  useEffect(() => {
    // Retrieve user name from session storage
    const storedUserName = sessionStorage.getItem("userName");
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
    try {
      console.log("Form data:", formData);
      const response = await axios.post(
        "http://127.0.0.1:5000/query",
        formData
      );

      const dataString = response.data;

      const jsonString = dataString.replace(/```json\n|```/g, "");
      try {
        setResponseData(JSON.parse(jsonString));
        console.log(JSON.parse(jsonString));
        // sessionStorage.setItem("JSONresponseai", JSON.parse(jsonString));
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return;
      }
    } catch (error) {
      console.error("Error:", error.message); // Log error message
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
        <div className="px-8 mb-5 rounded-md text-gray-400 h-auto text-wrap">
          {formData.prompt}
        </div>

        <div className="container mx-auto px-8 pt-0 pb-20">
          {/* <h2 className="text-2xl font-bold mb-4">Note:</h2>
          <p>{responseData.note}</p> */}

          {responseData.places && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Places</h2>
              <ul>
                {responseData.places.map((place, index) => (
                  // <li key={index} className="mb-4">
                  //   <h3 className="text-xl font-semibold">{place.name}</h3>
                  //   <p>{place.history}</p>
                  //   <p>
                  //     Transportation: {place.transportation.vehicle}, Distance:{" "}
                  //     {place.transportation.distance}, Time:{" "}
                  //     {place.transportation.time}
                  //   </p>
                  //   <p>Address: {place.address}</p>
                  // </li>
                  <a key={index}
                    href="#"
                    className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8"
                  >
                    <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

                    <div className="sm:flex sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                          {place.name}
                        </h3>

                        <p className="mt-1 text-xs font-medium text-gray-600">
                          {place.transportation.distance}
                        </p>
                      </div>

                      <div className="hidden sm:block sm:shrink-0">
                        {/* <img
                          alt=""
                          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                          className="size-16 rounded-lg object-cover shadow-sm"
                        /> */}
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="text-pretty text-sm text-gray-500">
                        {place.history}
                      </p>
                    </div>

                    <dl className="mt-6 flex gap-4 sm:gap-6">
                      <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600">
                          Transportation Time
                        </dt>
                        <dd className="text-xs text-gray-500">
                          {place.transportation.time}
                        </dd>
                      </div>

                      <div className="flex flex-col-reverse">
                        <dt className="text-sm font-medium text-gray-600">
                          Vehicle
                        </dt>
                        <dd className="text-xs text-gray-500">
                          {place.transportation.vehicle}
                        </dd>
                      </div>
                    </dl>
                  </a>
                ))}
              </ul>
            </div>
          )}

          {responseData.food && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Food</h2>
              <div className="grid grid-cols-12 gap-4">
                {responseData.food.map((item, index) => (
                  // <li key={index} className="mb-4">
                  //   <h3 className="text-xl font-semibold">{item.name}</h3>
                  //   <p>Cost: {item.cost}</p>
                  //   <p>Restaurant: {item.restaurant}</p>
                  //   <p>Address: {item.address}</p>
                  // </li>

                  <article key={index} className="col-span-6 mt-2 rounded-xl border-l border-gray-300 bg-gray-100 text-black p-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-lg font-medium">
                          {item.name}
                        </h3>

                        {/* <div className="flow-root">
                          <ul className="-m-1 flex flex-wrap">
                            <li className="p-1 leading-none">
                              <a
                                href="#"
                                className="text-xs font-medium "
                              >
                                {" "}
                                Twitter{" "}
                              </a>
                            </li>

                            <li className="p-1 leading-none">
                              <a
                                href="#"
                                className="text-xs font-medium "
                              >
                                {" "}
                                GitHub{" "}
                              </a>
                            </li>

                            <li className="p-1 leading-none">
                              <a
                                href="#"
                                className="text-xs font-medium "
                              >
                                Website
                              </a>
                            </li>
                          </ul>
                        </div> */}
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2">
                      <li>
                        <a
                          href="#"
                          className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600"
                        >
                          <strong className="font-medium ">
                            Where to eat?
                          </strong>

                          <p className="mt-1 text-xs font-medium ">
                            {item.restaurant}
                          </p>
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="block h-full rounded-lg border border-gray-700 p-4 hover:border-pink-600"
                        >
                          <strong className="font-medium ">
                            Where to find it?
                          </strong>

                          <p className="mt-1 text-xs font-medium ">
                            {item.address}
                          </p>
                        </a>
                      </li>
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          )}

          {responseData.hotels && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Hotels:</h2>
              <ul>
                {responseData.hotels.map((hotel, index) => (
                  <li key={index} className="mb-4">
                    <h3 className="text-xl font-semibold">{hotel.name}</h3>
                    <p>Address: {hotel.address}</p>
                    <p>Cost: {hotel.cost}</p>
                    <p>Review: {hotel.review}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

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
