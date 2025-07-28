import React, { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import axios from "axios";

const API_URL = "https://66dafea9f47a05d55be6b983.mockapi.io/product";

const App = () => {
  const [switchData, setSwitchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null); // Track individual switch update

  // Fetch data from API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (Array.isArray(response?.data)) {
        setSwitchData(response.data);
      } else {
        setSwitchData([]);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setSwitchData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitch = async (id) => {
    //Get the element
    const index = switchData.findIndex((item) => item?.id === id);
    if (index === -1) return;

    //Change the element behaviour
    const updated = [...switchData];
    const current = updated[index];
    const newState = !current?.isTurnOn;

    //Set it back
    updated[index] = { ...current, isTurnOn: newState };
    setSwitchData(updated);
    setUpdatingId(id);

    try {
      await axios.put(`${API_URL}/${id}`, {
        ...current,
        isTurnOn: newState,
      });
    } catch (error) {
      console.error("Failed to toggle switch:", error);
      // Rollback if failed
      updated[index] = { ...current };
      setSwitchData(updated);
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-[#1A1A1D] flex flex-col gap-4 justify-center items-center min-h-screen px-4 py-10">
      <h1 className="text-4xl font-bold text-[#dedef1] mb-5">Switch</h1>

      {loading ? (
        <p className="text-white  ">Loading...</p>
      ) : Array.isArray(switchData) && switchData.length > 0 ? (
        switchData.map((item) => (
          <div
            key={item?.id}
            className="p-4 border border-[#dedef1] w-full max-w-xl rounded-xl text-[#dedef1] flex justify-between items-center"
          >
            <h4 className="text-2xl font-bold">{item?.heading || "Unnamed"}</h4>
            <Switch
              checked={item?.isTurnOn ?? false}
              onCheckedChange={() => handleSwitch(item?.id)}
              className="cursor-pointer"
              disabled={loading || updatingId === item?.id}
              loading={updatingId === item?.id}
            />
          </div>
        ))
      ) : (
        <p className="text-white">No switch data available.</p>
      )}
    </div>
  );
};

export default App;
