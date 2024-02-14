import React, { useState, useEffect } from 'react';
import './FalseCeiling.css';
import fan1 from './fanslow.gif';
import fan2 from './fan.gif';
import fan3 from './fanfast.gif';

const FalseCeiling = () => {
  // State variables to track the status of each light and LED
  const [light1, setLight1] = useState(false);
  const [light2, setLight2] = useState(false);
  const [light3, setLight3] = useState(false);
  const [light4, setLight4] = useState(false);
  const [isLedOn, setIsLedOn] = useState(false);
  const [fanSpeed, setFanSpeed] = useState(1);

  // Function to toggle a light
  const toggleLight = async (light) => {
    try {
      // Perform fetch request to backend to toggle the light
      const response = await fetch(`http://localhost:3001/api/control/light/${light}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: !eval(light) }) // Toggle the status of the light
      });
      const data = await response.json();
      console.log(data);

      // Update the state of the corresponding light
      switch (light) {
        case 'light1':
          setLight1(!light1);
          break;
        case 'light2':
          setLight2(!light2);
          break;
        case 'light3':
          setLight3(!light3);
          break;
        case 'light4':
          setLight4(!light4);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to fetch current state of lights and LED from the server
  const fetchData = async () => {
    try {
      const [lightsResponse, ledResponse, fanResponse] = await Promise.all([
        fetch('http://localhost:3001/api/lights'),
        fetch('http://localhost:3001/api/led/status'),
        fetch('http://localhost:3001/api/fan/speed')
      ]);

      // Check if the responses are successful
      if (!lightsResponse.ok || !ledResponse.ok || !fanResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const [lightsData, ledData, fanData] = await Promise.all([
        lightsResponse.json(),
        ledResponse.json(),
        fanResponse.json()
      ]);

      console.log('Lights data:', lightsData);
      console.log('LED data:', ledData);
      console.log('Fan speed:', fanData.speed);

      // Update the state of each light, LED, and fan speed based on the data from the server
      setLight1(lightsData.light1);
      setLight2(lightsData.light2);
      setLight3(lightsData.light3);
      setLight4(lightsData.light4);
      setIsLedOn(ledData.isLedOn);
      setFanSpeed(fanData.speed);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error gracefully, e.g., show a message to the user
    }
  };

  // Use useEffect to fetch lights, LED state, and fan speed when the component mounts and whenever the LED status or fan speed changes
  useEffect(() => {
    fetchData();

    // Fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once, when the component mounts

  // Function to select fan image based on fan speed
  const getFanImage = () => {
    switch (fanSpeed) {
      case 1:
        return fan1;
      case 2:
        return fan2;
      case 3:
        return fan3;
      default:
        return fan1;
    }
  };

  return (
    <div className='lights-section'>
      <div className='false-ceiling'>
        <div className={`piece ${isLedOn ? 'shine' : ''}`}> </div>
        <div className={`piece ${isLedOn ? 'shine' : ''}`}> </div>
        <div className={`piece ${isLedOn ? 'shine' : ''}`}> </div>
        <div className={`piece ${isLedOn ? 'shine' : ''}`}> </div>
        <div className={`piece ${isLedOn ? 'shine' : ''}`}> </div>
        <div className={`piece ${isLedOn ? 'shine' : ''}`}> </div>
      </div>
      <div className='lights-container'>
        <div className={`light light1 ${light1 ? 'glow' : ''}`} onClick={() => toggleLight('light1')}></div>
        <div className={`light light2 ${light2 ? 'glow' : ''}`} onClick={() => toggleLight('light2')}></div>
        <img src={getFanImage()} alt='fan' className='fan' />
        <div className={`light light3 ${light3 ? 'glow' : ''}`} onClick={() => toggleLight('light3')}></div>
        <div className={`light light4 ${light4 ? 'glow' : ''}`} onClick={() => toggleLight('light4')}></div>
      </div>
    </div>
  );
};

export default FalseCeiling;
