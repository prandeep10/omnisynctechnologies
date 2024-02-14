import React, { useState, useEffect } from 'react';
import './Tv.css';

const Tv = () => {
  const [tvUrl, setTvUrl] = useState('');

  useEffect(() => {
    const fetchTvUrl = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tv/url');
        if (response.ok) {
          const data = await response.json();
          setTvUrl(data.url);
        } else {
          throw new Error('Failed to fetch TV URL');
        }
      } catch (error) {
        console.error('Error fetching TV URL:', error);
      }
    };

    fetchTvUrl();

    const interval = setInterval(fetchTvUrl, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const player = document.getElementById('tv-iframe');
    const handleClick = () => {
      const duration = player.duration;
      const middlePosition = duration / 2;
      player.currentTime = middlePosition;
    };

    const handlePlayClick = () => {
      setTimeout(() => {
        const playerDiv = document.getElementById('player');
        if (playerDiv) {
          playerDiv.click();
        }
      }, 2000);
    };

    player.addEventListener('loadeddata', () => {
      player.addEventListener('click', handleClick);
      handlePlayClick();
    });

    return () => {
      player.removeEventListener('loadeddata', () => {
        player.removeEventListener('click', handleClick);
      });
    };
  }, [tvUrl]);

  return (
    <div className='tv-container'>
      <div className="television">
        <iframe id="tv-iframe" width="290" height="160" src={tvUrl} title="YouTube video player" frameBorder="0" allow="autoplay" allowFullScreen></iframe>
        <div className="on">•</div>
        <div className="stand" />
        <div className="base">
          <div className="doors">
            <div className="door">
              <div className="knob-left" />
            </div>
            <div className="door">
              <div className="knob-right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tv;
