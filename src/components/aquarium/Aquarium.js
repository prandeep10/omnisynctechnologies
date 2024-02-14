import React, { useState, useEffect } from 'react';
import './Aquarium.css';
import fishGif1 from './fish1.gif';
import fishGif2 from './fish2.gif';
import fishGif3 from './fish3.gif';
import table from './table.png';
import feeder1 from './feeder.png';
import feeder2 from './feeder.gif';

const Aquarium = () => {
    const [feederImage, setFeederImage] = useState(feeder1);

    useEffect(() => {
        const fetchFeederStatus = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/feeder/status');
                if (response.ok) {
                    const data = await response.json();
                    setFeederImage(data.isFeederOn === true ? feeder2 : feeder1);
                } else {
                    throw new Error('Failed to fetch feeder status');
                }
            } catch (error) {
                console.error('Error fetching feeder status:', error);
            }
        };

        // Fetch feeder status initially when the component mounts
        fetchFeederStatus();

        // Fetch feeder status every 10 seconds
        const interval = setInterval(fetchFeederStatus, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='aquarium-container'>
            <table className="aquarium-table">
                <tbody>
                    <tr>
                        <td colSpan="3">
                            <div className="aquarium">
                                <div className="water">
                                    {/* Fish */}
                                    <div className="fish">
                                        <img src={fishGif1} alt="Fish 1" />
                                    </div>
                                    <div className="fish">
                                        <img src={fishGif2} alt="Fish 2" />
                                    </div>
                                    <div className="fish">
                                        <img src={fishGif3} alt="Fish 3" />
                                    </div>
                                    {/* Bubbles */}
                                    <div className="bubble bubble1"></div>
                                    <div className="bubble bubble2"></div>
                                    <div className="bubble bubble3"></div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="3">
                            <img src={feederImage} alt="" className='feeder' />
                        </td>
                    </tr>
                </tbody>
                <img src={table} className='table' alt='table' />
            </table>
        </div>
    );
};

export default Aquarium;
