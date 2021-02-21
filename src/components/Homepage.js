import React from 'react';
import { SpotifyAuth } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';
import '../components_styles/Homepage.css';
import spotifyLogo from '../img/spotify_logo.png'
import gitHub from '../img/github.png';
import FadeIn from 'react-fade-in';

function Homepage() {
  return (
    <div className='Home'>
      <div className='homepage-header'>
        <FadeIn delay={100} transitionDuration={600}>
            <div className= 'main-home-div'>
              <h1>Wrapify</h1>
              <img src={spotifyLogo} alt='logo'></img>
            </div>
            <div className='secondary-header-container'>
              <p>view your top <span className='green-spotify-callout'>Spotify</span> jams at any time</p>
            </div>
            <div className='spotify-auth-container'>
              <SpotifyAuth
                btnClassName= 'rsaSpotifyBtn'
                onAccessToken= {() => window.location.replace('/select')}
                redirectUri={window.location.href}
                clientID='62a3bd9320eb4455b95a18d40b2e1c46'
                scopes={['user-top-read']} />
            </div> 
          </FadeIn>
      </div>
      <div className='footer-home'>
        <p><a target='_blank' rel='noopener noreferrer' href='https://github.com/tommydamiano'>Developed by Tommy Damiano</a></p>
        <img src={gitHub} alt='github'></img>
      </div>
    </div>
  )
}

export default Homepage;
