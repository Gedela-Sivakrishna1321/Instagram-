import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchUserCard = ({user}) => {

  const navigate = useNavigate();

  function handleClick() {
    navigate(`/${user.username}`)
  }

  return (
    <div onClick={handleClick} className='cursor-pointer py-2'>
        <div className='flex items-center' >
            <img className='w-10 h-10 rounded-full' src={user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />

            <div className='ml-3'>
                <p className='text-start'>{user.name}</p>
                <p className='opacity-70 text-start' >{user.username}</p>
            </div>
       
        </div>
    </div>
  )
}

export default SearchUserCard