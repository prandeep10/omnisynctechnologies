import React, { useState, useEffect } from 'react';
import flower from './flower.png';
import './Garden.css';

const Garden = () => {
  const [isWaterDropletOn, setIsWaterDropletOn] = useState(false); // Change initial state to false

  useEffect(() => {
    const fetchWaterDropletStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/water/status');
        if (response.ok) {
          const data = await response.json();
          setIsWaterDropletOn(data.isWaterDropletOn);
        } else {
          throw new Error('Failed to fetch water droplet status');
        }
      } catch (error) {
        console.error('Error fetching water droplet status:', error);
      }
    };

    fetchWaterDropletStatus();
    const interval = setInterval(fetchWaterDropletStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='garden'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div className='flower-container' key={index}>
          <img src={flower} alt='flowerpot' className='flower' />
          <div className={`water-droplet ${isWaterDropletOn ? 'falling' : ''}`}></div>
        </div>
      ))}
    </div>
  );
}

export default Garden;
