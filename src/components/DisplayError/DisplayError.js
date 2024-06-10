import React from 'react'
import { assets } from '../../assets/assets'

const DisplayError = () => {
  return (
    <div className='error-page'>
      <img className='error-image' src={assets.errorIcon} alt="error page" />
      <h1>Oops! Something went wrong.</h1>
    </div>
  )
}

export default DisplayError
