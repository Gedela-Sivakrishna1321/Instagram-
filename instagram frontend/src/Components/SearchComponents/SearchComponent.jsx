import React from 'react'
import './SearchComponent.css'
import SearchUserCard from './SearchUserCard'
import { useDispatch, useSelector } from 'react-redux'
import { searchUserAction } from '../../Redux/User/Action'

const SearchComponent = () => {

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const {user} = useSelector(store => store);

  const handleSearch = (e) => {
    dispatch(searchUserAction({jwt : token, query : e.target.value}));
  }

  return (
    <div className='searchContainer '>
        <div className='px-3 pb-5'>
            <h1 className='text-xl pb-5'>Search</h1>
            <input onChange={handleSearch} type="text" placeholder='Search...' className='searchInput' />
        </div>

        <div className='px-5 pt-5'>
            {user.searchUser?.map((item) => <SearchUserCard user={item} />)}
        </div>
    </div>
  )
}

export default SearchComponent