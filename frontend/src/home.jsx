import axios from "axios";
import ResponseImg from "./responseImg";
import Sidepanel from "./sidepanel";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [userPromt, setUserPromt] = useState("");
  const [responseData, setResponseData] = useState(""); // State to store response data
  const [loading, setLoading] = useState(false);
  const userInfoString = `Age group is Young, gender is Male.`;

  const [reviewData, setreviewData] = useState({
    email: "",
    date: "",
    comment: "",

  });

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

  // Function to submit a review to the server
  const submitReview = async (reviewData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/reviews", reviewData);
      console.log("Review submitted:", response.data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleSubmit = async (e) => {
    const updatedFormData = {
      ...formData,
      prompt: userInfoString + formData.prompt,
    };

    setLoading(true); // Start loading
    e.preventDefault();
    try {
      console.log("Form data:", updatedFormData);
      const response = await axios.post(
        "http://127.0.0.1:5000/query",
        updatedFormData
      );

      const dataString = response.data;

      const jsonString = dataString.replace(/```json\n|```/g, "");
      try {
        setResponseData(JSON.parse(jsonString));
        console.log(JSON.parse(jsonString));
        // Check if the note is 'review' and then submit the review
        if (JSON.parse(jsonString).note === "review") {
          // Assuming the review data is structured appropriately
          submitReview({
            email: userName, // or however you obtain the user's email
            date: new Date().toISOString(),
            comment: formData.prompt,
          });
        }
      } catch (error) {
        console.error("Error parsing JSON:", error);
        return;
      }
    } catch (error) {
      console.error("Error:", error.message); // Log error message
    }
    setLoading(false); // Stop loading
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="rounded-lg col-span-3 bg-gray-200">
        <Sidepanel />
      </div>
      <div className="rounded-lg col-span-9 relative">
        <header>
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 sm:py-12 lg:px-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="text-center pt-14 sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Take your traveling experience to the next level
                </h1>

                <p className="mt-1.5 text-sm text-gray-500">
                  Start a new travel Plan...
                </p>
              </div>
            </div>
          </div>
        </header>

        {loading && (
          <div className="loading-container w-full bg-slate-800">
            <div>
              <div className="loader"></div>
              <p className="loading-text"></p>
            </div>
          </div>
        )}
        <div className="container mx-auto px-8">
          {/* <h2 className="text-2xl font-bold mb-4">Note:</h2>
          <p>{responseData.note}</p> */}

          {responseData.places && (
            <div className="mt-0">
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
                  <a
                    key={index}
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

                  <article
                    key={index}
                    className="col-span-6 mt-2 rounded-xl border-l border-gray-300 bg-gray-100 text-black p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-lg font-medium">{item.name}</h3>

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
              <h2 className="text-2xl font-bold mb-4">Hotels</h2>
              <ul>
                {responseData.hotels.map((hotel, index) => (
                  // <li key={index} className="mb-4">
                  //   <h3 className="text-xl font-semibold">{hotel.name}</h3>
                  //   <p>Address: {hotel.address}</p>
                  //   <p>Cost: {hotel.cost}</p>
                  //   <p>Review: {hotel.review}</p>
                  // </li>
                  <article
                    key={index}
                    className="mt-4 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
                  >
                    <div className="rounded-[10px] bg-white p-4 !pt-10 sm:p-6">
                      <h1 className="m-0 border-indigo-600 border-l px-2 font-bold">
                        {hotel.cost}
                      </h1>

                      <a href="#">
                        <h3 className="mt-2.5 text-xl font-medium text-gray-900">
                          {hotel.name}
                        </h3>
                      </a>

                      <div className="mt-4 flex flex-wrap gap-1">
                        <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                          {hotel.address}
                        </span>

                        <span className="mt-1 whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                          {hotel.review}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="fixed top-0 w-full bg-white border-t border-gray-300">
          <form onSubmit={handleSubmit} className="mx-0 py-4 px-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8">
                <input
                  type="text"
                  name="prompt"
                  value={formData.prompt}
                  onChange={handleInputChange}
                  placeholder="Type something..."
                  className="border-0 border-b col-span-1 w-full py-3 px-4 bg-white border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
                />
              </div>
              <div className="col-span-2">
                <button
                  className="border rounded-md px-4 py-3 bg-indigo-600 text-sm font-medium transition hover:bg-indigo-700 focus:outline-none focus:ring text-white"
                  type="submit"
                >
                  Enter
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
