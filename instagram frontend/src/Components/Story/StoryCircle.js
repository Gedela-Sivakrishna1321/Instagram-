import React from 'react'
import { useNavigate } from 'react-router-dom'

const StoryCircle = () => {

  const navigate = useNavigate();

  function handleStoryView() {
    navigate("/story");
  }
  

  return (
    <div onClick={handleStoryView} className='flex flex-col items-center cursor-pointer' >
        <img className='h-16 w-16 rounded-full ' src='https://cdn.pixabay.com/photo/2023/09/05/16/39/sunrise-8235461_640.jpg' />
        <p>Username</p>
    </div>
  )
}

export default StoryCircle