"use client"

import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../app/state/reducers/authSlice';
import { RootState } from '../app/state/stateTypes';
import { useRouter } from "next/navigation";
import React, {useState, useEffect} from 'react';
import { Shield } from 'lucide-react';


export default function Home() {

  const user = useSelector((state: RootState) => state.auth.user)
  const token = useSelector((state: RootState) => state.auth.token)
  const dispatch = useDispatch()
  const router = useRouter();

  const [selectedResponses, setSelectedResponses] = useState({
    whatsup: '',
    hello: '',
    hey: '',
    yesInjury: '',
    noInjury: '',
    yesAlone: '',
    noAlone: '',
    bridgeKeyword: '',
    contactName: '',
    contactPhone: '',
    contactAge: '',
    contactVoiceType: '',
    contactCallTopic: '',
  });

  const fetchContact = async () => {
    try {
      const response = await fetch(`/api/auth/?query=${user?._id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
      console.log("use effect data.contact: ", data.data)
      if (response.ok && data.data) {
        // Update Redux state
        dispatch(authActions.setContact(data.data));
        
        setSelectedResponses(prevState => ({
          ...prevState,
          ...data.data
        }));
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    }
  };

  // Initial load
  useEffect(() => {
    if(!user || !user?.firstName || token == "") {
      router.push("/login")
    } else {
      fetchContact();
    }
  }, []); // Only run on mount

  // Sync with Redux state changes
  useEffect(() => {
    if (user?.contact && Object.keys(user.contact).length > 0) {
      setSelectedResponses(prevState => ({
        ...prevState,
        ...user.contact
      }));
    }
  }, [user?.contact]);

  const handleSave = async() => {
    try {
      const editUserResponse = await fetch("/api/auth", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: user?._id,
          contact: selectedResponses
        }),
      });

      const editedUser = await editUserResponse.json();

      console.log(editedUser)

      // Check if the update was successful
      if (editUserResponse.ok) {
        console.log("User contact updated successfully");
        
        await fetchContact();
      } else {
        console.error("Failed to update user contact:", editedUser.message);
      }
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  }

  const responses = [
    "I just need a reason to leave my current situation. No contact alert needed.",
    `I need my contact to come to my location immediately. Send contact location.`,
    `This is an emergency. Send my location to my contact, and bridge call to authorities...`
  ];
    
      return (
        <div className="min-h-screen bg-background-blue p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-14">
              <div className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <span className="font-RalewayMedium text-dark-blue text-xl font-medium">BeSafe</span>
              </div>
              <span className="font-RalewayLight text-dark-blue text-sm">Made with love at Rutgers</span>
            </div>
    
            {/* Title */}
            <h1 className="mt-4 text-5xl font-RalewaySemiBold text-dark-blue mb-12">Hello {user?.firstName},</h1>
    
            {/* Main Card */}
            <div className="bg-pale-blue rounded-xl p-8">
              {/* Contact Info Section */}
              <h2 className="text-2xl font-RalewayRegular text-dark-blue mb-6">Contact Info</h2>
              <div className="grid grid-cols-5 gap-4 mb-12">
                <input 
                  placeholder="Name or Title"
                  value={selectedResponses.contactName}
                  onChange={(e) => setSelectedResponses({...selectedResponses, contactName: e.target.value})}
                  className="px-3 py-2 font-RalewayRegular rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  placeholder="Phone Number"
                  value={selectedResponses.contactPhone}
                  onChange={(e) => setSelectedResponses({...selectedResponses, contactPhone: e.target.value})}
                  className="px-3 py-2 font-RalewayRegular rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  placeholder="Age"
                  value={selectedResponses.contactAge}
                  onChange={(e) => setSelectedResponses({...selectedResponses, contactAge: e.target.value})}
                  className="px-3 py-2 font-RalewayRegular rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  placeholder="Voice Type"
                  value={selectedResponses.contactVoiceType}
                  onChange={(e) => setSelectedResponses({...selectedResponses, contactVoiceType: e.target.value})}
                  className="px-3 py-2 font-RalewayRegular rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                  placeholder="Call Topic"
                  value={selectedResponses.contactCallTopic}
                  onChange={(e) => setSelectedResponses({...selectedResponses, contactCallTopic: e.target.value})}
                  className="px-3 py-2 font-RalewayRegular rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
    
              {/* Conversation Structure Section */}
              <h2 className="text-2xl font-RalewayRegular text-dark-blue mb-6">Conversation Structure</h2>
              
              <div className="space-y-4">
                {/* What's up row */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 font-RalewayRegular text-dark-blue">If you answer with</div>
                  <div className="col-span-3 font-RalewayRegular text-gray-700 bg-white rounded-lg p-2 text-center">"What's up, {selectedResponses.contactName}?"</div>
                  <div className="col-span-1 font-RalewayRegular text-dark-blue">then...</div>
                  <div className="col-span-6">
                    <select 
                      value={selectedResponses.whatsup}
                      onChange={(e) => setSelectedResponses({...selectedResponses, whatsup: e.target.value})}
                      className="w-full font-RalewayRegular text-gray-700 px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a response</option>
                      {responses.map((response, index) => (
                        <option key={index} value={response}>
                          {response}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
    
                {/* Hello row */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 font-RalewayRegular text-dark-blue">If you answer with</div>
                  <div className="col-span-3 font-RalewayRegular text-gray-700 bg-white rounded-lg p-2 text-center">"Hello, {selectedResponses.contactName}?"</div>
                  <div className="col-span-1 font-RalewayRegular text-dark-blue">then...</div>
                  <div className="col-span-6">
                    <select 
                      value={selectedResponses.hello}
                      onChange={(e) => setSelectedResponses({...selectedResponses, hello: e.target.value})}
                      className="w-full font-RalewayRegular text-gray-700 px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a response</option>
                      {responses.map((response, index) => (
                        <option key={index} value={response}>
                          {response}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
    
                {/* Hey row */}
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 font-RalewayRegular text-dark-blue">If you answer with</div>
                  <div className="col-span-3 font-RalewayRegular text-gray-700 bg-white rounded-lg p-2 text-center">"Hey {selectedResponses.contactName}?"</div>
                  <div className="col-span-1 font-RalewayRegular text-dark-blue">then...</div>
                  <div className="col-span-6">
                    <select 
                      value={selectedResponses.hey}
                      onChange={(e) => setSelectedResponses({...selectedResponses, hey: e.target.value})}
                      className="w-full font-RalewayRegular text-gray-700 px-3 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a response</option>
                      {responses.map((response, index) => (
                        <option key={index} value={response}>
                          {response}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="py-4"></div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 font-RalewayRegular text-dark-blue">Are you injured?</div>
                  <div className="col-span-1 font-RalewayRegular text-dark-blue"> If yes ...</div>
                  <input 
                    placeholder="Keyword 1"
                    value={selectedResponses.yesInjury}
                    onChange={(e) => setSelectedResponses({...selectedResponses, yesInjury: e.target.value})}
                    className="col-span-3 px-3 py-2 font-RalewayRegular rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="col-span-1 font-RalewayRegular text-dark-blue"> If not ...</div>
                  <input 
                    placeholder="Keyword 2"
                    value={selectedResponses.noInjury}
                    onChange={(e) => setSelectedResponses({...selectedResponses, noInjury: e.target.value})}
                    className="col-span-3 px-3 py-2 font-RalewayRegular rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 font-RalewayRegular text-dark-blue">Is there help nearby?</div>
                  <div className="col-span-1 font-RalewayRegular text-dark-blue"> If yes ...</div>
                  <input 
                    placeholder="Keyword 1"
                    value={selectedResponses.yesAlone}
                    onChange={(e) => setSelectedResponses({...selectedResponses, yesAlone: e.target.value})}
                    className="col-span-3 px-3 py-2 font-RalewayRegular rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="col-span-1 font-RalewayRegular text-dark-blue"> If not ...</div>
                  <input 
                    placeholder="Keyword 2"
                    value={selectedResponses.noAlone}
                    onChange={(e) => setSelectedResponses({...selectedResponses, noAlone: e.target.value})}
                    className="col-span-3 px-3 py-2 font-RalewayRegular rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 font-RalewayRegular text-dark-blue">Bridge the call</div>
                  <div className="col-span-1 font-RalewayRegular text-dark-blue"> If you say</div>
                  <input 
                    placeholder="Keyword 1"
                    value={selectedResponses.bridgeKeyword}
                    onChange={(e) => setSelectedResponses({...selectedResponses, bridgeKeyword: e.target.value})}
                    className="col-span-3 px-3 py-2 font-RalewayRegular rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

              </div>
            </div>
    
            {/* Save Button */}
            <div className="flex justify-end mt-6">
              <button 
                  onClick={()=>{handleSave()}}
                className="bg-dark-blue font-RalewayMedium hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      );
}
