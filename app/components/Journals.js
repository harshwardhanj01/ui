"use client";
import React, { useState, useEffect } from 'react';
import { CiCalendar } from "react-icons/ci";
import { GiCircle } from "react-icons/gi";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";




const Journals = () => {
  const [session, setSession] = useState(null);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const [note, setNote] = useState('');
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState('');
  const [addingNewAsset, setAddingNewAsset] = useState(false);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const token = Cookies.get('session_token');
    console.log(token)

    if (token) {
      try {
        // Decode the token to get user data
        console.log("dash token : " + token);

        const decoded = jwtDecode(token);
        console.log("dash token decode : " + JSON.stringify(decoded, null, 2));

        // Set the session state with the decoded user data
        setSession({ user: decoded });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [session?.user?.username]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch(`https://7q7g1qslnc.execute-api.us-east-1.amazonaws.com/test/uniqueassets?email=${session?.user?.username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setAssets(data["unique_assets"] || []);
          setMessage('');
        } else {
          setMessage(`Error fetching assets: ${data.message || 'Unknown error'}`);
        }
      } catch (error) {
        setMessage(`Error fetching assets: ${error.message}`);
      }
    };
    if (session?.user?.username) {
      fetchAssets();
    }
  }, [session?.user?.username]);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`https://7q7g1qslnc.execute-api.us-east-1.amazonaws.com/test/journalnote?email=${userEmail}&asset=${selectedAsset}&date=${date}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (response.ok) {
          setNote(data["Journal Note"] || '');
          setMessage('');
        } else {
          setMessage(`Error fetching note: ${data.message || 'Unknown error'}`);
        }
      } catch (error) {
        setMessage(`Error fetching note: ${error.message}`);
      }
    };
    if (selectedAsset) {
      fetchNote();
    }
  }, [selectedAsset, date]);


  const saveNote = async () => {
    if (!selectedAsset) {
      setMessage('Please select an asset first to save a note.');
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch('https://7q7g1qslnc.execute-api.us-east-1.amazonaws.com/test/sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          date,
          trading_pair: selectedAsset,
          journal_notes: note
        })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Note saved successfully!');
      } else {
        setMessage(`Error saving note: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage(`Error saving note: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const currentDate = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  const handleAssetChange = (e) => {
    if (e.target.value === "add_new") {
      setAddingNewAsset(true);
      setSelectedAsset('');
    } else {
      setAddingNewAsset(false);
      setSelectedAsset(e.target.value);
    }
  };

  return (
    <div className="flex flex-col items-start p-6 max-w-4xl mx-auto font-sans">
      <div className="flex items-center mb-4">
        <div className="flex mr-4">
          <GiCircle className="w-9 h-9 py-auto px-auto absolute text-blue-400 " />
          <CiCalendar className="w-5 h-5 py-auto px-auto ml-2 mt-2 absolute" />
          <span className="ml-12 text-lg">{formattedDate}</span>
        </div>
        <div className="flex gap-2">
          {!addingNewAsset ? (
            <select
              onChange={handleAssetChange}
              className="px-4 py-2 rounded-md bg-gray-100"
              value={selectedAsset}
            >
              <option value="">Select an asset</option>
              {assets.map(asset => (
                <option key={asset} value={asset}>{asset}</option>
              ))}
              <option value="add_new">Add new asset</option>
            </select>
          ) : (
            <input
              type="text"
              placeholder="Enter new asset"
              value={newAsset}
              onChange={(e) => setNewAsset(e.target.value)}
              onBlur={() => {
                if (newAsset && !assets.includes(newAsset)) {
                  setAssets([...assets, newAsset]);
                  setSelectedAsset(newAsset);
                }
                setAddingNewAsset(false);
              }}
              className="px-4 py-2 rounded-md bg-gray-100"
            />
          )}
        </div>
      </div>
      <div className="w-full mb-5">
        <h3 className="text-xl mb-2">Journal Notes</h3>
        <textarea
          value={note}
          onChange={(e) => {
            setNote(e.target.value);
            setMessage('');
          }}
          placeholder="Enter your journal notes here ..."
          className="w-full h-48 p-4 border rounded-md"
        />
      </div>
      <div className="mb-5">
        <button
          onClick={saveNote}
          className={`px-4 py-2 text-white rounded-md transition-colors ${selectedAsset && !isSaving ? 'bg-blue-400 hover:bg-blue-500' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!selectedAsset || isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Note'}
        </button>
      </div>
      {message && (
        <div className="mb-5 text-red-500">
          {message}
        </div>
      )}
    </div>
  );
};

export default Journals;
