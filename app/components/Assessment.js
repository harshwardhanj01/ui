"use client";
import React, { useState, useEffect } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";




const Assessment = () => {
  const [session, setSession] = useState(null);
  const [confidenceScore, setConfidenceScore] = useState('N/A');
  const [relatedInsights, setRelatedInsights] = useState('N/A');
  const [journalNotes, setJournalNotes] = useState([]);
  const [finalScore, setFinalScore] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');

  useEffect(() => {
    const token = Cookies.get('session_token');
    console.log(token)

    if (token) {
      try {
        // Decode the token to get user data
        const decoded = jwtDecode(token);
        setSession({ user: decoded });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [session?.user?.username]);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedAsset) return;

      try {
        const email = session?.user?.username;
        // const asset = 'INR';
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().slice(0, 10);
        const apiUrl = `https://7q7g1qslnc.execute-api.us-east-1.amazonaws.com/test/patterns?email=${email}&asset=${selectedAsset}&date=${formattedDate}`;
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        if (!data || !data.confidence_score || !data.related_insights || !data.similar_past_notes) {
          setConfidenceScore('N/A');
          setRelatedInsights('N/A');
          setJournalNotes([]);
          setFinalScore([]);
        } else {
          const { confidence_score, related_insights, final_score, similar_past_notes } = data;
          setConfidenceScore(Math.round(confidence_score * 100));
          setRelatedInsights(related_insights);
          setJournalNotes(similar_past_notes);
          setFinalScore(final_score);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setConfidenceScore('N/A');
        setRelatedInsights('N/A');
        setJournalNotes([]);
        setFinalScore([]);
      }
    };

    fetchData();
  }, [selectedAsset, session]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const email = session?.user?.email;
        const apiUrl = `https://7q7g1qslnc.execute-api.us-east-1.amazonaws.com/test/journal_assets?email=${email}`;
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch assets');
        }

        const data = await response.json();
        setAssets(data.unique_assets || []);
      } catch (error) {
        console.error('Error fetching assets:', error);
        setAssets([]);
      }
    };

    if (session) {
      fetchAssets();
    }
  }, [session]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query) {
      const results = assets.filter(asset =>
        asset.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAssets(results);
    } else {
      setFilteredAssets([]);
    }
  };

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setSearchQuery(asset); // Update the search query with the selected asset
    setFilteredAssets([]); // Clear the dropdown after selection
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        {/* Searchable Dropdown */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search assets..."
          className="placeholder-gray-500 w-full bg-blue-100 p-2 rounded-md border border-blue-300 focus:outline-none focus:border-blue-600 mb-2"
        />
        {filteredAssets.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md max-h-40 overflow-y-auto">
            <ul className="space-y-2">
              {filteredAssets.slice(0, 5).map((asset, index) => (
                <li key={index} onClick={() => handleAssetSelect(asset)}>{asset}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div className="bg-blue-400 text-white p-2 rounded-lg flex flex-col items-center relative">
            <div className="absolute top-0 left-0 right-0 bottom-20 flex justify-center items-center">
              <div className="bg-white text-blue-400 rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold">
                {confidenceScore}
              </div>
            </div>
            <div className="mt-40 text-center">Confidence Score</div>
          </div>
          <div className="bg-blue-400 text-white p-2 rounded-lg flex flex-col items-center relative">
            <div className="absolute top-0 left-0 right-0 bottom-20 flex justify-center items-center">
              <div className="bg-white text-blue-400 rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold">
                {relatedInsights}
              </div>
            </div>
            <div className="mt-40 text-center">Related insights from your collection were found</div>
          </div>
          <div className="p-2 rounded-lg flex flex-col items-center shadow-sm">
            <ReactSpeedometer
              maxValue={1}
              value={finalScore}
              currentValueText={`${typeof finalScore === 'number' ? finalScore.toFixed(2) : '0'}`}
              needleColor="black"
              segments={3}
              segmentColors={["red", "orange", "green"]}
              needleHeightRatio={0.8}
              ringWidth={35}
              height={200}
              width={270}
            />
            <div className="font-bold text-xl text-center">Market Conditions</div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6">Related Insights</h2>
          <div className="space-y-4">
            {journalNotes && journalNotes.map((note, index) => (
              <div key={index} className="flex items-center">
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center">
                    <div className="font-bold">{note.date.substring(8, 10)}/{note.date.substring(5, 7)}</div>
                  </div>
                  <div className="mb-5 mt-1 max-h-24 overflow-hidden overflow-y-auto">{note.journal_notes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;