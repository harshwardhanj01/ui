import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [profileImage, setProfileImage] = useState('/images/dummyProfile.png');
  
  // tejas ........................ > assests creation login.. 
  const [assets, setAssets] = useState(['Asset 1', 'Asset 2', 'Asset 3']);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [newAsset, setNewAsset] = useState('');
  const [showAddNew, setShowAddNew] = useState(false);
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

  const handleSelect = (asset) => {
    if (selectedAssets.includes(asset)) {
      setSelectedAssets(selectedAssets.filter(a => a !== asset));
    } else if (selectedAssets.length < 3) {
      setSelectedAssets([...selectedAssets, asset]);
    }
  };

  const handleAddNew = () => {
    if (newAsset && !assets.includes(newAsset)) {
      setAssets([...assets, newAsset]);
      setNewAsset('');
      setShowAddNew(false);
    }
  };
  // tejas ........................ > assests creation login.. 
  

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setProfileImage(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="container mx-auto p-5">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Image src={profileImage} alt="Profile" width={150} height={150} className="rounded-full border-4 border-white shadow-lg" />
            <div className="absolute bottom-0 right-0">
              <label htmlFor="file-upload" className="cursor-pointer">
                <Image src="/images/PlusIcon.png" alt="Upload" width={30} height={30} className="rounded-full" />
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>
          <h1 className="title-font sm:text-4xl text-3xl mt-4 mb-2 font-medium text-gray-900">
            {session?.user?.name || 'Your Name'}
          </h1>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 mt-6 w-full md:w-2/3 mx-auto">
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" placeholder="First Name" className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" placeholder="Last Name" className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={session?.user?.username || ''}
                  placeholder="Email Address"
                  className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full bg-gray-100 cursor-not-allowed"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" placeholder="Address" className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Balance</label>
                <input type="text" placeholder="300$" className="mt-1 px-3 py-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preferred Trading Instruments</label>
                <div className="mt-1 flex space-x-2">
                  <button type="button" className="px-3 py-2 bg-blue-500 text-white rounded-md">BTC</button>
                  <button type="button" className="px-3 py-2 bg-blue-500 text-white rounded-md">ETH</button>

                  {/* tejas......................................................... > creating assests start  */}

                  <div>
                    <select multiple value={selectedAssets} onChange={(e) => handleSelect(e.target.value)}>
                      {assets.map((asset, index) => (
                        <option key={index} value={asset} disabled={selectedAssets.length >= 3 && !selectedAssets.includes(asset)}>
                          {asset}
                        </option>
                      ))}
                      <option value="add_new" onClick={() => setShowAddNew(true)}>Add New Asset</option>
                    </select>

                    {showAddNew && (
                      <div>
                        <input
                          type="text"
                          value={newAsset}
                          onChange={(e) => setNewAsset(e.target.value)}
                          placeholder="Enter new asset"
                        />
                        <button onClick={handleAddNew}>Add</button>
                      </div>
                    )}

                    <div>
                      <h3>Selected Assets:</h3>
                      <ul>
                        {selectedAssets.map((asset, index) => (
                          <li key={index}>{asset}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* tejas......................................................... > creating assests end  */}




                </div>
              </div>
            </div>
            <button type="submit" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md w-full">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
