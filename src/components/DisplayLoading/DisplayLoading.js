import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import './DisplayLoading.css'

const DisplayLoading = () => {
  return (
    <div className='loding-container'>
      <InfinitySpin
      visible={true}
      width="300"
      color="#4fa94d"
      ariaLabel="infinity-spin-loading"
      />
    </div>
  )
}

export default DisplayLoading
