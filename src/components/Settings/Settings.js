// src/AccountSettings.js
import React from 'react';
import './Settings.css';

const Settings = () => {
  return (
    <div className="account-settings">
      <h1 className="title">Account Settings</h1>
      <div className="profile">
        <img className="profile-image" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" alt="Profile" />
        <div className="profile-details">
          <div className="form-group">
            <label>User Name</label>
            <input type="text" value="alphauser" readOnly />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value="alphauser@gmail.com" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
