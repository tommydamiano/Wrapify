import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import FadeIn from 'react-fade-in';
import '../components_styles/Songs.css';

function Songs() {

  const token = Cookies.get('spotifyAuthToken')
  const [loading, setIsLoading] = useState(false)
  const [shortSongData, setShortSongData] = useState([])
  const [shortSongPicture, setShortSongPicture] = useState([])
  const [shortLink, setShortLink] = useState([])
  const [mediumSongData, setMediumSongData] = useState([])
  const [mediumSongPicture, setMediumSongPicture] = useState([])
  const [mediumLink, setMediumLink] = useState([])
  const [longSongData, setLongSongData] = useState([])
  const [longSongPicture, setLongSongPicture] = useState([])
  const [longLink, setLongLink] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    const loader = () => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 2100)
    }

    const getSongData = async (timePeriod) => {
      const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=${timePeriod}`, {
      headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'}})
      
      const songData = await response.json()
      console.log(songData)
      const songArray = []
      const songPicture = []
      let songLink = []
      let song
      for (song in songData['items']) {
        if (songData['items'][song] && songData['items'][song]['album']['images'][0]) {
          if (songData['items'][song]['name'].length > 16) {
            songArray.push(songData['items'][song]['name'].slice(0, 16))
          } else {
            songArray.push(songData['items'][song]['name'])
          }
          songPicture.push(songData['items'][song]['album']['images'][0]['url'])
          songLink.push(songData['items'][song]['external_urls']['spotify'])
        }
      }
      if (timePeriod === 'short_term') {
        setShortSongData(songArray)
        setShortSongPicture(songPicture)
        setShortLink(songLink)
      } else if (timePeriod === 'medium_term') {
        setMediumSongData(songArray)
        setMediumSongPicture(songPicture)
        setMediumLink(songLink)
      } else {
        setLongSongData(songArray)
        setLongSongPicture(songPicture)
        setLongLink(songLink)
      }
    }

    const getProfileInfo = async () => {
      const response = await fetch(`https://api.spotify.com/v1/me`, {
      headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'}})
      
      const profileInfo = await response.json()
      console.log(profileInfo)
      if (profileInfo['display_name']) {
        setName(profileInfo['display_name'] + "'s")
      } else {
        setName('Your')
      }
    }
    
    loader()
    getSongData('short_term')
    getSongData('medium_term')
    getSongData('long_term')
    getProfileInfo()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {loading ? <Loading /> :
      <div className= 'Songs'>
        <div className='back-button-container'>
          <Link to='/select'><button>Back</button></Link>
        </div>
        <div className='song-header-container'>
          <h1>{name} Favorite Songs</h1>
          <div>Hm... <span className='interesting'>interesting</span> music taste.</div>
        </div>
        <FadeIn delay={150} transitionDuration={700}>
          <div className='songs-container'>
            <div className='short-term'>
              <div className='short-term-header'>
                <h1>Short Term</h1>
                <div>1 month of data</div>
              </div>
              {shortSongData.map((song, index) => (
                <div className='main-song-div'>
                  <a target='_blank' rel='noopener noreferrer' href={shortLink[index]}><img className='song-image' src={shortSongPicture[index]} alt='song'></img></a>
                  <p key={index}>{song}</p>
                </div>
              ))}
            </div>
            <div className='medium-term'>
              <div className='medium-term-header'>
                <h1>Medium Term</h1>
                <div>~6 months of data</div>
              </div>
              {mediumSongData.map((song, index) => (
                <div className='main-song-div'>
                  <a target='_blank' rel='noopener noreferrer' href={mediumLink[index]}><img className='song-image' src={mediumSongPicture[index]} alt='song'></img></a>
                  <p key={index}>{song}</p>
                </div>
              ))}
            </div>
            <div className='long-term'>
              <div className='long-term-header'>
                <h1>Long Term</h1>
                <div>years of data</div>
              </div>
              {longSongData.map((song, index) => (
                <div className='main-song-div'>
                  <a target='_blank' rel='noopener noreferrer' href={longLink[index]}><img className='song-image' src={longSongPicture[index]} alt='song'></img></a>
                  <p key={index}>{song}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>}
    </div>
  );
}

export default Songs;
