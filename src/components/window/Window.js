import React, { useState, useEffect } from 'react';
import './Window.css';
import windowImage from './window.jpg'; // Import window image
import pardaImage from './parda.jpg'; // Import parda image

const Window = () => {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const fetchWindowStatus = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/window/status');
                if (response.ok) {
                    const data = await response.json();
                    setImageSrc(data.windowStatus === 'open' ? windowImage : pardaImage);
                } else {
                    throw new Error('Failed to fetch window status');
                }
            } catch (error) {
                console.error('Error fetching window status:', error);
            }
        };

        // Fetch window status initially when the component mounts
        fetchWindowStatus();

        // Fetch window status every 5 seconds
        const interval = setInterval(fetchWindowStatus, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='window-container'>
            <img src={imageSrc} alt='window' className='window-image' />
        </div>
    );
};

export default Window;
