import React from 'react';
import spotifyLogo from '../img/spotify_logo.png'
import Pulse from 'react-reveal/Pulse';
import '../components_styles/Loading.css';

function Loading() {
  return (
      <div className='Loading'>
        <div className='loading-container'>
            <h1>Loading your data...</h1>
            <Pulse>
                <div>
                    <img src={spotifyLogo} alt='logo'></img>
                </div>
            </Pulse>
        </div>
      </div>
  );
}

export default Loading;