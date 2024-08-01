"use client";
import React, { useEffect, useCallback } from 'react'
import Link from 'next/link'

import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';



import { useState, useRef } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto'

const options = {
  scales: {
    x: {
      grid: {
        display: false, // Remove vertical grid lines
      },
      ticks: {
        display: true, // Show x-axis labels
      },
      border: {
        display: false, // Remove the x-axis border line
      },
    },
    y: {
      display: false, // Hide the y-axis and its values
    },
  },
  plugins: {
    legend: {
      display: false // Hide the legend   
    }
  }
};

const options1 = {
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
      },
      border: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: true,
        callback: function (value) {
          return value + 'k'; // Add 'k' to the y-axis labels
        }
      },
      border: {
        display: false,
      },
    },
  },
  plugins: {
    legend: {
      display: false // Hide the legend   
    },
    tooltip: {
      callbacks: {
        label: function (context) {
          const value = context.raw;
          return context.label + ': ' + value + 'k'; // Display with 'k' in the tooltip
        }
      }
    }
  }
};


export default function Trading() {

  const fileInputRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [load, isload] = useState(false);
  const [message, setMessage] = useState(false);


  const [timeframe, setTimeframe] = useState('week');
  const [data, setData] = useState(null);
  const [winrate, setWinrate] = useState(0);
  const [weekperformance, setWeekperformance] = useState({
    labels: [],
    datasets: [],
  });
  const [hoursperformance, setHoursperformance] = useState({
    labels: [],
    datasets: [],
  });
  const [graphView, setGraphView] = useState({
    labels: [],
    datasets: [],
  });
  
  const [session, setSession] = useState(null);
  
  

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile || selectedFile.type !== 'text/csv') {
      alert('Please select a valid CSV file');
      return;
    }

    console.log(selectedFile);


    const userEmail = email;
    const newFileName = `${userEmail}_${new Date().toISOString()}_${selectedFile.name}`;
    // const newFileName = selectedFile.name;

    const newFile = new File([selectedFile], newFileName, {
      type: selectedFile.type,
      lastModified: selectedFile.lastModified
    });


    console.log(newFile);



    // const formData = new FormData();
    // formData.append('file', new File([selectedFile], newFileName));

    try {
      const presigUrlRes = await fetch(`https://7q7g1qslnc.execute-api.us-east-1.amazonaws.com/dev/generate_presigned_url?email=${userEmail}&object_name=${newFile.name}`);

      const urlres = await presigUrlRes.json();

      console.log(urlres);

      const url = urlres.presigned_url;
      console.log(url);

      async function uploadCsvToS3(presignedUrl, file) {

        try {
          const response = await fetch(presignedUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'text/csv',
            },
            body: file,
          });

          if (response.ok) {
            console.log('File uploaded successfully!');
          } else {
            console.error('Error uploading file:', response.statusText);
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };
      uploadCsvToS3(url, newFile);

    }
    catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file');
    }
  };

  /* eslint-disable react-hooks/exhaustive-deps */


  // graph view.....
  const processGraphView = useCallback((newData, timeframe) => {
    console.log("in progress graph view...");
    console.log(timeframe);
    console.log(newData);
    
    let labels = [];
    let performanceData = [];

    if (timeframe === 'week') {
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      labels = daysOfWeek;
      performanceData = daysOfWeek.map((day) =>{ return newData.Graph_Metrics[day] ?? 0; });

    } else if (timeframe === 'month') {
      const weeksOfMonth = Object.keys(newData["Graph_Metrics"]).map(Number);
      labels = weeksOfMonth;
      performanceData = weeksOfMonth.map((week) =>{return newData.Graph_Metrics[week] ?? 0;});

    } else {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      labels = months;
      performanceData = months.map((month) => {return newData.Graph_Metrics[month] ?? 0;});
    }

    const dataForTimeframePerformance = {
      labels: labels,
      datasets: [
        {
          data: performanceData,
          borderRadius: 30,
          barThickness: 10,
          borderSkipped: false,
          backgroundColor: performanceData.map(value => value > 0 ? '#4682B4' : 'rgba(255, 99, 132, 0.6)'),
        },
      ],
    };

    setGraphView(dataForTimeframePerformance);
    // console.log(timeframePerformance);
  }, []);

  // Process data for day performance

  const processDayPerformance = useCallback((newdata) => {
    console.log("in progress dayperformance ...");

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const performanceData = daysOfWeek.map((day) => {
      return newdata["Average_Performance_by_Day"]?.[day] ?? 0;
    });

    const dataForDayPerformance = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      datasets: [
        {
          data: performanceData,
          borderRadius: 30,
          barThickness: 10,
          borderSkipped: false,
          responsive: false,
          backgroundColor: performanceData.map(value => value > 0 ? '#4CAF50' : 'rgba(255, 99, 132, 0.6)'),
        },
      ],
    };

    setWeekperformance(dataForDayPerformance);
  }, []);

  // Process data for hour performance
  const processHourPerformance = useCallback((newdata) => {
    console.log("Processing data for hour performance");
    const hoursOfDay = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
    const performanceByHourData = hoursOfDay.map((hour) => {
      return newdata["Average_Performance_by_Hour "]?.[hour] ?? 0;
    });

    const dataForHourPerformance = {
      labels: Array.from({ length: 24 }, (_, i) => i + 1),
      datasets: [
        {
          data: performanceByHourData,
          borderRadius: 30,
          barThickness: 10,
          borderSkipped: false,
          backgroundColor: performanceByHourData.map(value => value > 0 ? '#4CAF50' : 'rgba(255, 99, 132, 0.6)'),
        },
      ],
    };

    setHoursperformance(dataForHourPerformance);
  }, []);

  // fetching the data from api...
  const fetchData = useCallback(async (timeframe) => {
    try {

      
      isload(true);
      console.log("Fetching data...");
      console.log();
      const response = await fetch(`https://7q7g1qslnc.execute-api.us-east-1.amazonaws.com/test/timeframe?email=${session?.user?.username}&timeframe=${timeframe}`);
      // const response = {};
      console.log(response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      console.log(jsonData);
      if (jsonData.error_response) {
        setMessage(true);
        isload(false);

        return;
      }
      setData(jsonData);
      console.log(data);
      setMessage(false);
      isload(false);

    } catch (error) {

      console.log("Error fetching data:", error);
    }
  }, [session?.user?.username,timeframe]);

  // Handle data changes
  const handleDataChange = useCallback((newdata) => {
    if (!newdata) return;

    setWinrate(newdata.WR);
    processDayPerformance(newdata);
    processHourPerformance(newdata);
    processGraphView(newdata, timeframe);
    isload(false);
  }, [timeframe]);

  useEffect(() => {
    // Fetch data based on the timeframe

    console.log("timeframe : " + timeframe);
    fetchData(timeframe);
  }, [timeframe,session?.user?.username]);

  
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

  useEffect(() => {
    if (!data) return;

    handleDataChange(data);

  }, [data]);

  useEffect(() => {
    if (!data || !data.Calendar_Metrics) return;

    const caldata = data.Calendar_Metrics.map(metric => {
      const date = Object.keys(metric)[0];
      const { total_trades, net_virtual_profit } = metric[date];
      const isProfit = net_virtual_profit > 0;
      const color = isProfit ? 'blue' : 'red';
      const profit = net_virtual_profit.toFixed(2);
      const title = `$${profit}\n  ${total_trades} trade`;

      return {
        title: title,
        start: date,
        color: color,
      };
    });

    setEvents(caldata);
  }, [data]);

  /* eslint-enable react-hooks/exhaustive-deps */




  return (
    <>
      {/* <HeadDash /> */}


      <div className="flex flex-col gap-6 md:ml-6 md:mr-4 ">
        {(message) ? <div className='flex items-center justify-center bg-red-800 text-white'>No data found. Check other timeframes or add your trades.</div> : <div></div>}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 w-full">
          <div className="flex flex-row items-center justify-between gap-4 w-full md:flex-row md:w-auto">
            <span className="text-gray-600 dark:text-gray-400">Timeframe</span>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="md:ml-6 p-2 px-4 border rounded bg-blue-200"
            >
              <option value="week">1 week</option>
              <option value="month">1 month</option>
              <option value="3months">3 months</option>
              <option value="9months">9 months</option>
              <option value="year">12 months</option>
              <option value="all">All</option>
            </select>
          </div>
          <div className="flex flex-row gap-6 justify-between w-full md:w-auto md:justify-end">
            <Link href="/manualtrade">
              <button className="flex items-center gap-2 p-3 bg-blue-400 rounded">
                <span className="text-gray-900 dark:text-gray-100 text-sm md:text-base">Manual Trade Import</span>
              </button>
            </Link>
            {/* <button className="flex items-center gap-2 p-3 bg-black rounded">
              <span className="text-gray-900 dark:text-gray-100">Import from CSV</span>
            </button> */}
            <button
              className="flex items-center gap-2 p-3 bg-black rounded"
              onClick={handleButtonClick}
            >
              <span className="text-gray-900 dark:text-gray-100 text-sm md:text-base">Import from CSV</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".csv"
              onChange={handleFileChange}
            />
          </div>
        </div>
        {(load) ? <div className='flex justify-center align-middle'><div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
          >Loading...</span>
        </div></div> :
          <div>
            <div className={`flex flex-col mx-4 flex-wrap gap-6 justify-center md:flex-row ${message ? 'opacity-30' : ''}`} >

              <div className="flex-1 w-full md:min-w-[200px] md:max-w-[calc(25%-1rem)] ">
                <div className="bg-white rounded-lg shadow-2xl p-4 dark:bg-white-800 dark:text-black">
                  <div className="flex flex-row justify-between mb-2 ">
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                      <span className="text-black dark:text-black mb-2">Winrate %</span>
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-6">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="ml-1 text-gray-900 ">gain</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="ml-1 text-gray-900">loss</span>
                          </div>
                        </div>
                      </div>

                    </div>

                    {(false) ? (<div
                      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status">
                      <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                      >Loading...</span>
                    </div>) :
                      <div className="w-full md:w-auto h-40 md:h-20 flex justify-center items-center">
                        <div className="w-32 h-32 md:w-20 md:h-20">
                          <Doughnut
                            data={{
                              datasets: [
                                {

                                  data: winrate ? [winrate, 1 - winrate] : [1],
                                  backgroundColor: winrate ? ['#4CAF50', '#F44336'] : ['#ABABAB'],
                                  borderWidth: 0,
                                },
                              ],
                            }}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                tooltip: {
                                  callbacks: {
                                    label: function (context) {
                                      // Get the value from the dataset
                                      const value = context.raw;

                                      // Format the value as a percentage
                                      const percentage = (value * 100).toFixed(2) + '%';

                                      // Return the formatted percentage
                                      return context.label + ': ' + percentage;
                                    }
                                  }
                                }
                              }
                            }}
                          />
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <div className="flex-1 w-full  md:min-w-[200px] md:max-w-[calc(25%-1rem)]">
                <div className="bg-white rounded-lg shadow-2xl p-4 dark:bg-white-800 dark:text-black">
                  <span className="mb-4 block text-black dark:text-black">Average risk to reward ratio</span>
                  <span className="text-3xl font-bold text-gray-900 ">{data ? data.R_R_ratio : "0"}</span>
                </div>
              </div>

              <div className="flex-1  w-full  md:min-w-[200px] md:max-w-[calc(25%-1rem)]">
                <div className="bg-white rounded-lg shadow-2xl p-4 dark:bg-white-800 dark:text-black">
                  <span className="mb-4 block text-black dark:text-black">Total pnl% gain</span>
                  <span className="text-3xl font-bold text-gray-900 ">{data ? ((data.DailyProfit / data.Total_Trades) / 100).toFixed(4) : "0"}</span>
                </div>
              </div>
              <div className="flex-1 w-full md:min-w-[200px] md:max-w-[calc(25%-1rem)]">
                <div className="bg-white rounded-lg shadow-2xl p-4 dark:bg-white-800 dark:text-black">
                  <span className="mb-4 block text-black dark:text-black">Total pnl$ gain</span>
                  <span className="text-3xl font-bold text-gray-900 ">{data ? data.DailyProfit : "0"}</span>
                </div>
              </div>
            </div>

            <div className={`flex flex-wrap gap-4 justify-center p-4   ${message ? 'opacity-30' : ''}`}>
              <div className="bg-white rounded-lg shadow-2xl p-4 dark:bg-white-800 dark:text-black flex-1 w-full md:w-[calc(50%-1rem)]">
                <span className="mb-2 block text-black dark:text-black">Graph View</span>
                <div className="w-full h-full">

                  <Bar data={graphView} options={options1} className="w-full h-full" />

                </div>
              </div>
              <div className="bg-white rounded-lg shadow-2xl p-4 dark:bg-white-800 dark:text-black flex-1 w-full md:w-[calc(50%-1rem)]">
                <span className="mb-2 block text-black dark:text-black">Trade History</span>
                <div className="w-full h-64 overflow-auto">
                  <div className="relative">
                    <table className="w-full border-collapse">
                      <thead className="sticky top-0 bg-white dark:bg-white-800">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assets</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RR Ratio</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Gain</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data && (!data.error_response) && data.Trade_History_Log.map((trade, index) => (
                          <tr key={index} className="odd:bg-gray-100">
                            <td className="px-3 py-2">{trade.date.split('T')[0]}</td>
                            <td className="px-3 py-2">{trade.time}</td>
                            <td className="px-3 py-2">{trade.outcome}</td>
                            <td className="px-3 py-2">{trade.symbol}</td>
                            <td className="px-3 py-2">{trade.rr_ratio}</td>
                            <td className="px-3 py-2">{trade.percentage_gain}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>


            <div className={`p-4 flex justify-center  ${message ? 'opacity-30' : ''}`}>
              <div className="w-full max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white">
                <div className="h-[500px] md:h-[500px] sm:h-auto w-full overflow-x-auto">
                  <div className="min-w-[768px] md:min-w-full">
                    <FullCalendar
                      plugins={[dayGridPlugin, interactionPlugin]}
                      initialView="dayGridMonth"
                      events={events}
                      headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: '', // Remove right toolbar options
                      }}
                      height="auto"
                      contentHeight="auto"
                    />
                  </div>
                </div>
              </div>

            </div>



            <div className={`flex flex-wrap gap-4 justify-center p-4  ${message ? 'opacity-30' : ''}`}>
              {/* First Row */}
              <div className="flex flex-wrap gap-4 justify-center w-full">
                <div className="flex-1 min-w-[200px] md:max-w-[calc(50%-1rem)] w-full">
                  <div className="bg-white rounded-lg shadow-2xl p-4 dark:bg-white-800 dark:text-black h-full">
                    <h2 className="text-lg font-semibold pb-6">Projected 30 Day Performance</h2>
                    <p className="text-2xl">$ {data ? data["30_Days_Projection"] : "0"}</p>
                  </div>
                </div>
                <div className="flex-1 min-w-[200px] md:max-w-[calc(50%-1rem)] w-full">
                  <div className="flex flex-col justify-center bg-white rounded-lg shadow-2xl p-4 dark:bg-white-800 dark:text-black w-full h-50 ">
                    <h2 className="text-lg font-semibold ">Projected 30 Day Performance</h2>
                    <Bar data={weekperformance} options={options} className='w-full h-full' />
                  </div>
                </div>
              </div>
              {/* Second Row */}
              <div className="flex flex-wrap gap-4 justify-center w-full">
                <div className="flex-1 min-w-[200px] md:max-w-[calc(50%-1rem)] w-full h-50">
                  <div className="bg-white rounded-lg shadow-2xl p-4 dark:bg-white-800 dark:text-black h-full">
                    <h2 className="text-lg font-semibold pb-6">Statistic Placeholder 1</h2>
                    <p className="text-2xl">{data ? data["30_Days_Projection"] : "0"}</p>
                  </div>
                </div>
                <div className="flex-1 min-w-[200px] md:max-w-[calc(50%-1rem)] w-full h-48">
                  <div className="bg-white rounded-lg shadow-2xl p-4 dark:bg-white-800 dark:text-black h-full">

                    <h2 className="text-lg font-semibold pb-6">Average Performance By Day</h2>
                    <p className="text-2xl">{data ? data["30_Days_Projection"] : "0"} </p>
                  </div>
                </div>
              </div>
              {/* Third Row */}
              <div className="flex justify-center w-full p-4">
                <div className="w-full">
                  <h2 className="text-lg font-semibold mb-2 text-center">Average Performance By Hour</h2>
                  <div className="bg-white rounded-lg shadow-xl p-4 h-64 md:h-96">
                    <div className="h-full w-full">
                      <Bar
                        data={hoursperformance}
                        options={{
                          ...options,
                          maintainAspectRatio: false,
                          responsive: true
                        }}
                        className="h-full w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div></div>
        }

      </div>
    </>

  );
}