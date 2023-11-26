// pages/profile.js
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const userInfo = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  nickname: 'johndoe',
  website: 'https://www.example.com',
  avatarUrl: '/assets/img/avatar-placeholder.jpg',
  phone: '12345678901',
};

const Profile = () => {
  const [user, setUser] = useState(userInfo);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUserModified, setIsUserModified] = useState(false);
  // Retrieve user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Update localStorage whenever the user data changes
  useEffect(() => {
    console.log(isUserModified)
    if (isUserModified) {
        localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user, isUserModified]);

  useEffect(() => {
    setIsUserModified(!isEditMode);     // set userModified flag false when edit mode.
  }, [isEditMode])

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Add logic here to save the updated user data (e.g., send it to an API or update a database)
    console.log('Saving user data:', user);
    if (isEditMode && !/^\d{11}$/.test(user.phone)) {
        alert('Please enter a valid phone number with 11 digits.');
        return;
    }
    if(isEditMode) {
        setIsUserModified(true)     // phone number passed checking, triger save effect
    }
    // Exit edit mode after saving
    setIsEditMode(false);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div>
      <Image
          src={user.avatarUrl}
          alt={`${user.name}'s avatar`}
          width={128} // Set the desired width
          height={128} // Set the desired height
          className="rounded-full"
        />
        {/* <img src={user.avatarUrl} alt={`${user.name}'s avatar`} className="rounded-full w-32 h-32" /> */}
      </div>
      <div className="text-center">
        {isEditMode ? (
          <div className='grid grid-cols-1 '>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 md:place-items-start'>
              <label className="mb-1 mr-2 place-self-start">Name:</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 mb-2"
              />
              {/* ... (similar adjustments for other fields) */}
            </div>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 place-items-start'>
              <label className=" mb-1 mr-2 place-self-start">Email:</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 mb-2"
              />
            </div>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 place-items-start'>
              <label className=" mb-1 mr-2 place-self-start">Nickname:</label>
              <input
                type="text"
                name="nickname"
                value={user.nickname}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 mb-2"
              />
            </div>
            <div className='grid md:grid-cols-2 sm:grid-cols-1 place-items-start'>
              <label className=" mb-1 mr-2 place-self-start">Phone:</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 mb-2"
              />
            </div>

            <div className='grid md:grid-cols-2 sm:grid-cols-1 place-items-start'>
              <label className=" mb-1 mr-2 place-self-start">Website:</label>
              <input
                type="text"
                name="website"
                value={user.website}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 mb-2"
              />
            </div>

            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
              Save
            </button>
          </div>
        ) : (
          <div className='grid'>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-1 justify-items-start'>
                <div className='font-bold'>Email: </div><div>{user.email}</div>
                <div className='font-bold'>Nickname: </div><div>{user.nickname}</div>
                <div className='font-bold'>Phone: </div><div>{user.phone}</div>
                <div className='font-bold'>
                Website:
                </div><div>
                <a href={user.website} className="text-blue-500">
                    {user.website}
                </a></div>
            </div>
            <div className='mt-4 justify-self-stretch'>
            <button onClick={toggleEditMode} className="bg-green-500 text-white px-4 py-2 rounded w-2/3 lg:w-1/3">
              Edit
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
