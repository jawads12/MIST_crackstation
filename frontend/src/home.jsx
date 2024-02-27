import axios from "axios";
import ResponseImg from "./responseImg";
import Sidepanel from "./sidepanel";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [responseData, setResponseData] = useState(""); // State to store response data
  const [loading, setLoading] = useState(false);

  // New state for itinerary
  const [itinerary, setItinerary] = useState(null);

  const [formData, setFormData] = useState({
    gender: "",
    season: "",
    with_whom: "",
    budget: "",
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
    setLoading(true);

    try {
      console.log("FormData:", formData);
      const response = await axios.post(
        "http://127.0.0.1:5000/plan-itinerary",
        formData
      );

      // Directly using response data as JSON
      setItinerary(response.data.itinerary);
      console.log(response.data.itinerary);
    } catch (error) {
      console.error("Error:", error.message);
    }
    setLoading(false);
  };
  // Render itinerary
  const renderItinerary = () => {
    if (!itinerary) return null;

    return Object.keys(itinerary).map((day) => (
      <div key={day} className="mb-6 px-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{day}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {itinerary[day].map((item, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-xl font-semibold text-gray-700">
                {item.place}
              </h3>
              <p className="text-gray-600">Distance: {item.distance}</p>
              {/* You can add more details here */}
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="rounded-lg col-span-2 md:col-span-1 lg:col-span-3">
        <Sidepanel />
      </div>
      <div className="rounded-lg col-span-10 md:col-span-11 lg:col-span-9 relative">
        <header>
          <div className="mx-auto max-w-screen-xl md:px-4 px-0 sm:py-12 lg:px-8">
            <div className="sm:items-center sm:justify-between">
              <div className="text-left pt-0 sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Take your traveling experience to the next level
                </h1>

                <p className="mt-1.5 text-sm text-gray-500">
                  Start a new travel Plan...
                </p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="m-0 pt-4 px-4">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-11 md:col-span-6 flex items-center">
                  <label className="mr-2 text-sm font-medium">Gender:</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="border rounded-md py-2 px-4 bg-white w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="col-span-11 md:col-span-6 flex items-center">
                  <label className="mr-2 text-sm font-medium">Season:</label>
                  <select
                    name="season"
                    value={formData.season}
                    onChange={handleInputChange}
                    className="border rounded-md py-2 px-4 bg-white w-full"
                  >
                    <option value="">Select Season</option>
                    <option value="Winter">Winter</option>
                    <option value="Summer">Summer</option>
                    <option value="Rainy">Rainy</option>
                  </select>
                </div>

                <div className="col-span-11 md:col-span-5 flex items-center">
                  <label className="mr-2 text-sm font-medium">With Whom:</label>
                  <select
                    name="with_whom"
                    value={formData.with_whom}
                    onChange={handleInputChange}
                    className="border rounded-md py-2 px-4 bg-white w-full"
                  >
                    <option value="">Select Companion</option>
                    <option value="Couple">Couple</option>
                    <option value="Friend">Friend</option>
                    <option value="Family">Family</option>
                  </select>
                </div>

                <div className="col-span-11 md:col-span-5 flex items-center">
                  <label className="mr-2 text-sm font-medium">Budget:</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="border rounded-md py-2 px-4 bg-white w-full"
                  >
                    <option value="">Select Budget</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="col-span-11 md:col-span-6 flex items-center">
                  <label className="mr-2 text-sm font-medium">
                    Number of Days:
                  </label>
                  <input
                    type="number"
                    name="num_days"
                    value={formData.num_days}
                    onChange={handleInputChange}
                    placeholder="Enter number of days"
                    className="border rounded-md py-2 px-4 bg-white w-full"
                    min="1"
                  />
                </div>

                <div className="col-span-11 md:col-span-2">
                  <button
                    className="border rounded-md px-4 py-3 bg-indigo-600 text-sm font-medium transition hover:bg-indigo-700 focus:outline-none focus:ring text-white w-full"
                    type="submit"
                  >
                    Enter
                  </button>
                </div>
              </div>
            </form>
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

        {renderItinerary()}
      </div>
    </div>
  );
}
