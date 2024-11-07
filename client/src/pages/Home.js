import React from 'react'
import './Home.css'
import doc from '../assets/doc.png'
import sth from '../assets/sth.png'

import Navbar from '../components/home/Navbar.js'
const Home = () => {
  return (
    <>
      <Navbar/>
      <div className='hero'>
        
        <div className='heroleft'>
          <h1>Seamless Hospital management for better care and smoother workflows</h1>
        </div>

        <div className='heroright'>
          <img src={doc} width={408} height={612}></img> 
        </div>
        
      </div>
    </>
  )
}

export default Home
