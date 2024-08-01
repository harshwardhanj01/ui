"use client";
import React, { useState,useEffect } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GiCircle } from "react-icons/gi";
import { TbCash } from "react-icons/tb";
import { AiOutlineRise } from "react-icons/ai";
import { IoBarChartOutline } from "react-icons/io5";
import { PiDeviceTabletSpeakerLight } from "react-icons/pi";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";



const ManualTrade = () => {
  const [open_time, setOpenTime] = useState(null);
  const [open_price, setOpenPrice] = useState("");
  const [close_time, setCloseTime] = useState(null);
  const [close_price, setClosePrice] = useState("");
  const [side, setSide] = useState("");
  const [symbol, setSymbol] = useState("");
  const [volume, setVolume] = useState("");
  const [stop_loss, setStopLoss] = useState("");
  const [take_profit, setTakeProfit] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const [session, setSession] = useState(null);
  

  useEffect(() => {
    const token = Cookies.get('session_token');
    console.log(token)
    
    if (token) {
      try {
        // Decode the token to get user data
        console.log("dash token : " + token);

        const decoded = jwtDecode(token);
        console.log("dash token decode : " + JSON.stringify(decoded,null,2));

        // Set the session state with the decoded user data
        setSession( {user : decoded} );
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [session?.user?.username ]);
   


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle error if user tries to submit form with any field missing
    let errors = [];
    if (!symbol) errors.push("Asset is required.");
    if (!open_time) errors.push("Time Entered is required.");
    if (!open_price) errors.push("Entry Price is required.");
    if (!close_time) errors.push("Time Exited is required.");
    if (!close_price) errors.push("Exit Price is required.");
    if (!side) errors.push("Side is required.");
    if (!volume) errors.push("Volume is required.");
    if (!stop_loss) errors.push("Stop Loss Level is required.");
    if (!take_profit) errors.push("Take Profit Level is required.");

    if (errors.length > 0) {
      setError(errors);
      setSuccess(false);
      return;
    }

    // Prepare the request body with the user-provided data
    const requestBody = {
      email_id: session?.user?.username,
      open_time: open_time,
      open_price: parseFloat(open_price), // Convert to float
      close_time: close_time,
      close_price: parseFloat(close_price), // Convert to float
      side: side.toLowerCase(), // Ensure it's lowercase as per API requirement
      symbol: symbol,
      volume: parseInt(volume), // Convert to integer
      stop_loss: parseInt(stop_loss), // Convert to integer
      take_profit: parseInt(take_profit), // Convert to integer
    };
  
    try {
      const response = await fetch("https://7q7g1qslnc.execute-api.us-east-1.amazonaws.com/test/single_trade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccess(true);
        setError([]);
        // Clear input fields after successful submission
        setOpenTime("");
        setOpenPrice("");
        setCloseTime("");
        setClosePrice("");
        setSide("");
        setSymbol("");
        setVolume("");
        setStopLoss("");
        setTakeProfit("");
      } else {
        setError([data.msg]); // Assuming the API returns an error message in JSON format
        setSuccess(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(["Failed to submit trade. Please try again."]);
      setSuccess(false);
    }
  };

  const handleInputChange = (setter, type) => (e) => {
    const value = e.target.value;
    let regex;

    if (type === 'numeric') {
      regex = /^\d*\.?\d{0,2}$/;
    } else if (type === 'alphanumeric') {
      regex = /^[a-zA-Z0-9 ]*$/;
    }

    if (value === '' || (regex && regex.test(value))) {
      setter(value);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-10 mx-auto">
        <div className="text-center">
          <h1 className="text-2xl font-medium title-font text-gray-900">Manual Trade Import</h1>
          <div className="flex mt-1 justify-center">
            <div className="w-24 h-1 rounded-full bg-blue-400 inline-flex"></div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 max-w-3xl mx-auto gap-4">
          <div className="md:w-full px-3 mb-6 md:mb-0 relative justify-between">
            <label className="block tracking-wide text-grey-darker text-md font-medium mb-2" htmlFor="symbol">Asset</label>
            <GiCircle className="w-8 h-8 py-auto px-auto ml-2 mt-2 absolute text-blue-400" />
            <PiDeviceTabletSpeakerLight  className="w-4 h-4 py-auto px-auto ml-4 mt-4 absolute text-blue-400" />
            <input
              id="symbol" 
              onChange={handleInputChange(setSymbol, 'alphanumeric')} 
              value={symbol} 
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded-lg py-3 px-12 mb-3" 
              type="text" 
              placeholder="Enter" />
          </div>
          <br />
          <div className="md:w-full px-3 mb-6 md:mb-0 relative justify-between">
            <label className="block tracking-wide text-grey-darker text-md font-medium mb-2" htmlFor="open_time">Time Entered</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                value={open_time ? dayjs(open_time) : null}
                onChange={(value) => setOpenTime(value.format())}
                maxDateTime={close_time ? dayjs(close_time) : null}  // Prevent selecting after closeTime
                textField={(props) => (
                  <TextField
                    {...props}
                    id="open_time"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-3 px-12"
                    placeholder="MM/DD/YYYY hh:mm aa"
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="md:w-full px-3 mb-6 md:mb-0 relative justify-between">
            <label className="block tracking-wide text-grey-darker text-md font-medium mb-2" htmlFor="close_time">Time Exited</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                value={close_time ? dayjs(close_time) : null}
                onChange={(value) => setCloseTime(value.format())}
                minDateTime={open_time ? dayjs(open_time) : null}  // Prevent selecting before openTime
                textField={(props) => (
                  <TextField
                    {...props}
                    id="close_time"
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-3 px-12"
                    placeholder="MM/DD/YYYY hh:mm aa"
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="md:w-full px-3 mb-6 md:mb-0 relative justify-between">
            <label className="block tracking-wide text-grey-darker text-md font-medium mb-2" htmlFor="open_price">Entry Price</label>
            <GiCircle className="w-8 h-8 py-auto px-auto ml-2 mt-2 absolute text-blue-400" />
            <TbCash className="w-4 h-4 py-auto px-auto ml-4 mt-4 absolute text-blue-400" />
            <input 
              id="open_price" 
              autoComplete='off' 
              onChange={handleInputChange(setOpenPrice,'numeric')} 
              value={open_price} 
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-3 px-12" 
              type="number" 
              step="0.01" 
              placeholder="Enter" 
            />
          </div>
          <div className="md:w-full px-3 mb-6 md:mb-0 relative justify-between">
            <label className="block tracking-wide text-grey-darker text-md font-medium mb-2" htmlFor="close_price">Exit Price</label>
            <GiCircle className="w-8 h-8 py-auto px-auto ml-2 mt-2 absolute text-blue-400" />
            <TbCash className="w-4 h-4 py-auto px-auto ml-4 mt-4 absolute text-blue-400" />
            <input 
              id="close_price" 
              autoComplete='off' 
              onChange={handleInputChange(setClosePrice,'numeric')} 
              value={close_price} 
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-3 px-12" 
              type="number" 
              step="0.01" 
              placeholder="Enter" 
            />
          </div>
          <div className="md:w-full px-3 mb-6 md:mb-0 relative justify-between">
            <label className="block tracking-wide text-grey-darker text-md font-medium mb-2" htmlFor="take_profit">Take Profit Level</label>
            <GiCircle className="w-8 h-8 py-auto px-auto ml-2 mt-2 absolute text-blue-400" />
            <TbCash className="w-4 h-4 py-auto px-auto ml-4 mt-4 absolute text-blue-400" />
            <input 
              id="take_profit" 
              autoComplete='off' 
              onChange={handleInputChange(setTakeProfit,'numeric')} 
              value={take_profit} 
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-3 px-12" 
              type="number" 
              step="0.01" 
              placeholder="Enter" 
            />
          </div>
          <div className="md:w-full px-3 mb-6 md:mb-0 relative justify-between">
            <label className="block tracking-wide text-grey-darker text-md font-medium mb-2" htmlFor="stop_loss">Stop Loss Level</label>
            <GiCircle className="w-8 h-8 py-auto px-auto ml-2 mt-2 absolute text-blue-400" />
            <TbCash className="w-4 h-4 py-auto px-auto ml-4 mt-4 absolute text-blue-400" />
            <input 
              id="stop_loss" 
              autoComplete='off' 
              onChange={handleInputChange(setStopLoss,'numeric')} 
              value={stop_loss} 
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-3 px-12" 
              type="number" 
              step="0.01" 
              placeholder="Enter" 
            />
          </div>
          <div className="md:w-full px-3 mb-6 md:mb-0 relative justify-between">
            <label className="block tracking-wide text-grey-darker text-md font-medium mb-2" htmlFor="volume">Volume</label>
            <GiCircle className="w-8 h-8 py-auto px-auto ml-2 mt-2 absolute text-blue-400" />
            <IoBarChartOutline className="w-4 h-4 py-auto px-auto ml-4 mt-4 absolute text-blue-400" />
            <input 
              id="volume" 
              autoComplete='off' 
              onChange={handleInputChange(setVolume,'numeric')} 
              value={volume} 
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-3 px-12" 
              type="number" 
              step="0.01" 
              placeholder="Enter" 
            />
          </div>         
          <div className="md:w-full px-3 mb-6 md:mb-0 relative justify-between">
            <label className="block tracking-wide text-grey-darker text-md font-medium mb-2" htmlFor="side">Side</label>
            <GiCircle className="w-8 h-8 py-auto px-auto ml-2 mt-2 absolute text-blue-400" />
            <AiOutlineRise className="w-4 h-4 py-auto px-auto ml-4 mt-4 absolute text-blue-400" />
            <select id="side" onChange={(e) => setSide(e.target.value)} value={side} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg py-3 px-12">
              <option value="">Select Side</option>
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </select>
          </div>
        </div>
        {error.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4 max-w-3xl mx-auto" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error.join(", ")}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4 max-w-3xl mx-auto" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> Trade has been imported successfully.</span>
          </div>
        )}
        <div className="flex justify-center mt-6 mb-6">
          <button className="bg-blue-400 hover:bg-blue-600 text-white font-bold w-40 h-10 rounded-lg" type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
};

export default ManualTrade;