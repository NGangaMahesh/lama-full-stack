import React, { useState } from 'react';
import './ShowDisplay.css';

const ShowDisplay = () => {
  const [primaryColor, setPrimaryColor] = useState('#7BD568');
  const [fontColor, setFontColor] = useState('#3C3C3C');
  const [fontSize, setFontSize] = useState(25);
  const [chatHeight, setChatHeight] = useState('');
  const [showSources, setShowSources] = useState(false);
  const [chatIconSize, setChatIconSize] = useState('Small (48x48 px)');
  const [distanceFromBottom, setDistanceFromBottom] = useState(20);
  const [positionOnScreen, setPositionOnScreen] = useState('Bottom Right');
  const [horizontalDistance, setHorizontalDistance] = useState(20);

  const handlePrimaryColorChange = (e) => {
    setPrimaryColor(e.target.value);
  };

  const handleFontColorChange = (e) => {
    setFontColor(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleChatHeightChange = (e) => {
    setChatHeight(e.target.value);
  };

  const handleShowSourcesChange = () => {
    setShowSources((prevState) => !prevState);
  };

  const handleChatIconSizeChange = (e) => {
    setChatIconSize(e.target.value);
  };

  const handleDistanceFromBottomChange = (e) => {
    setDistanceFromBottom(e.target.value);
  };

  const handlePositionOnScreenChange = (e) => {
    setPositionOnScreen(e.target.value);
  };

  const handleHorizontalDistanceChange = (e) => {
    setHorizontalDistance(e.target.value);
  };

  return (
    <div className="widget-configuration">
    <div className='widget-configuration-first'>
        <div className="config-section">
            <h3>Primary Color</h3>
            <input
            type="color"
            value={primaryColor}
            onChange={handlePrimaryColorChange}
            />
        </div>

        <div className="config-section">
            <h3>Font Color</h3>
            <input type="color" value={fontColor} onChange={handleFontColorChange} />
        </div>

        <div className="config-section">
            <h3>Font Size (in px)</h3>
            <input
            type="number"
            value={fontSize}
            onChange={handleFontSizeChange}
            />
        </div>

        <div className="config-section">
            <h3>Chat Height (in % of total screen)</h3>
            <input
            type="text"
            value={chatHeight}
            onChange={handleChatHeightChange}
            />
        </div>

        <div className="config-section">
            <h3>Show Sources</h3>
            <label className="switch">
            <input
                type="checkbox"
                checked={showSources}
                onChange={handleShowSourcesChange}
            />
            <span className="slider"></span>
            </label>
        </div>
      </div>
      <hr />
      <div className='widget-configuration-first'>
      <div className="config-section congig-first">
        <h3>Chat Icon</h3>
        <div>
          <h4>Chat Icon Size</h4>
          <select
            value={chatIconSize}
            onChange={handleChatIconSizeChange}
          >
            <option>Small (48x48 px)</option>
            <option>Medium (64x64 px)</option>
            <option>Large (80x80 px)</option>
          </select>
        </div>
        <div>
          <h4>Position on Screen</h4>
          <select
            value={positionOnScreen}
            onChange={handlePositionOnScreenChange}
          >
            <option>Bottom Right</option>
            <option>Bottom Left</option>
            <option>Top Right</option>
            <option>Top Left</option>
          </select>
        </div>
        <div>
          <h4>Distance from Bottom (in px)</h4>
          <input
            type="number"
            value={distanceFromBottom}
            onChange={handleDistanceFromBottomChange}
          />
        </div>
        <div>
          <h4>Horizontal Distance (in px)</h4>
          <input
            type="number"
            value={horizontalDistance}
            onChange={handleHorizontalDistanceChange}
          />
        </div>
        <div>
        <h3>Bot Icon</h3>
        <button>Upload Image</button>
      </div>
      </div>

      
    </div>
    </div>
  );
};

export default ShowDisplay;