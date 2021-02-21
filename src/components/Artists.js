import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import FadeIn from 'react-fade-in';
import '../components_styles/Artists.css';

function Artists() {

  const token = Cookies.get('spotifyAuthToken')
  const [loading, setIsLoading] = useState(false)
  const [shortArtistData, setShortArtistData] = useState([])
  const [shortArtistPicture, setShortArtistPicture] = useState([])
  const [shortArtistLink, setShortArtistLink] = useState([])
  const [mediumArtistData, setMediumArtistData] = useState([])
  const [mediumArtistPicture, setMediumArtistPicture] = useState([])
  const [mediumArtistLink, setMediumArtistLink] = useState([])
  const [longArtistData, setLongArtistData] = useState([])
  const [longArtistPicture, setLongArtistPicture] = useState([])
  const [longArtistLink, setLongArtistLink] = useState([])
  const [name, setName] = useState('')

  useEffect(() => {
    const loader = () => {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 2100)
    }

    const getArtistData = async (timePeriod) => {
      const response = await fetch(`https://api.spotify.com/v1/me/top/artists?limit=10&time_range=${timePeriod}`, {
      headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'}})
      
      const artistData = await response.json()
      console.log(artistData)
      const artistArray = []
      const artistPicture = []
      let artistLink = []
      let artist
      for (artist in artistData['items']) {
        if (artistData['items'][artist] && artistData['items'][artist]['images'][0]) {
          if (artistData['items'][artist]['name'].length > 16) {
            artistArray.push(artistData['items'][artist]['name'].slice(0, 16))
          } else {
            artistArray.push(artistData['items'][artist]['name'])
          }
          artistPicture.push(artistData['items'][artist]['images'][0]['url'])
          artistLink.push(artistData['items'][artist]['external_urls']['spotify'])
        }
      }
      if (timePeriod === 'short_term') {
        setShortArtistData(artistArray)
        setShortArtistPicture(artistPicture)
        setShortArtistLink(artistLink)
      } else if (timePeriod === 'medium_term') {
        setMediumArtistData(artistArray)
        setMediumArtistPicture(artistPicture)
        setMediumArtistLink(artistLink)
      } else {
        setLongArtistData(artistArray)
        setLongArtistPicture(artistPicture)
        setLongArtistLink(artistLink)
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
    getArtistData('short_term')
    getArtistData('medium_term')
    getArtistData('long_term')
    getProfileInfo()
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      {loading ? <Loading /> :
      <div className= 'Artist'>
        <div className='artist-back-button-container'>
          <Link to='/select'><button>Back</button></Link>
        </div>
        <div className='artist-header-container'>
          <h1>{name} Favorite Artists</h1>
          <div>Can we <span className='artist-interesting'>really</span> call these artists?</div>
        </div>
        <FadeIn delay={150} transitionDuration={700}>
          <div className='artist-container'>
            <div className='artist-short-term'>
              <div className='artist-short-term-header'>
                <h1>Short Term</h1>
                <div>1 month of data</div>
              </div>
              {shortArtistData.map((artist, index) => (
                <div className='main-artist-div'>
                  <a target='_blank' rel='noopener noreferrer' href={shortArtistLink[index]}><img className='artist-image' src={shortArtistPicture[index]} alt='img'></img></a>
                  <p key={index}>{artist}</p>
                </div>
              ))}
            </div>
            <div className='artist-medium-term'>
              <div className='artist-medium-term-header'>
                <h1>Medium Term</h1>
                <div>~6 months of data</div>
              </div>
              {mediumArtistData.map((artist, index) => (
                <div className='main-artist-div'>
                  <a target='_blank' rel='noopener noreferrer' href={mediumArtistLink[index]}><img className='artist-image' src={mediumArtistPicture[index]} alt='img'></img></a>
                  <p key={index}>{artist}</p>
                </div>
              ))}
            </div>
            <div className='artist-long-term'>
              <div className='artist-long-term-header'>
                <h1>Long Term</h1>
                <div>years of data</div>
              </div>
              {longArtistData.map((artist, index) => (
                <div className='main-artist-div'>
                  <a target='_blank' rel='noopener noreferrer' href={longArtistLink[index]}><img className='artist-image' src={longArtistPicture[index]} alt='img'></img></a>
                  <p key={index}>{artist}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>}
    </div>
  );
}

export default Artists;
