import React from 'react'
import Sidebar from '../../Components/Slidebar/Sidebar'
import HomePage from '../HomePage/HomePage'
import { Route, useLocation} from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Profile from "../Profile/Profile"
import Story from '../Story/Story'
import Auth from '../Auth/Auth'
import EditAccountDetails from '../../Components/EditAccount/EditAccountDetails'

const Router = () => {
    const location = useLocation();
  return (
    <div>
        { (location.pathname !== '/login' && location.pathname !== '/signup') && <div className='flex' >
            <div className='border border-l-slate-100'>
                <Sidebar/>
            </div>

            <div className='w-full'>
                <Routes>
                    <Route path='/'  element={<HomePage/>} />
                    <Route path='/:username'  element={<Profile/>} />
                    <Route path='/story' element={<Story/>} />
                    <Route path='/comment/:postId' element={<HomePage/>} />
                    <Route path='/account/edit' element={<EditAccountDetails/>} />
                </Routes>
            </div>
        </div>}

        {
            (location.pathname === '/login' || location.pathname === '/signup') && 
            <div>
                <Routes>
                    <Route path='/signup' element={<Auth/>} ></Route>
                    <Route path='/login' element={<Auth/>} />
                </Routes>
            </div>
        }

    </div>
  )
}

export default Router