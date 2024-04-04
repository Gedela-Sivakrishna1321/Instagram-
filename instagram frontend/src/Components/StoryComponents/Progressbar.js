import React, { useEffect, useState } from 'react'
import './Progressbar.css'

const Progressbar = ({index, activeIndex, duration}) => {
// Initially progress value is zero 
  const [progress, setProgress] = useState(0);

  // Update the progress value
  useEffect(()=> {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if(prevProgress < 100) {
          return prevProgress + 1;
        }
        clearInterval(interval)
        return prevProgress;
      })
    }, duration/100)

    return () => {
      clearInterval(interval)
    }
  },[duration, activeIndex])


  useEffect(() => {
    setProgress(0)
  },[activeIndex])


  const isActive = index === activeIndex;

  return (
    <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
        {/* Progress is the dynamic changing value, which gets it's value changed from 0 - 100 */}
        <div className={`${isActive ? "progress-bar" : ""}`}  style={{width : `${progress}%`}}>
      
        </div>

    </div>
  )
}

export default Progressbar