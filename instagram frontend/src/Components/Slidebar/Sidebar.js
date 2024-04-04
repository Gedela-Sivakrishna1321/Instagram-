import React, { useState } from 'react'
import {IoReorderFourOutline} from 'react-icons/io5'
import {menu} from "./SidebarConfig"
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import CreatePostModel from '../Post/CreatePostModel';
import SearchComponent from '../SearchComponents/SearchComponent';
import { useSelector } from 'react-redux';

const Sidebar = () => {

  const [activeTab, setActiveTab] = useState();
  const navigate = useNavigate();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const {user} = useSelector(store => store);

  function handleTabClick(title) {
      setActiveTab(title);
      if(title == "Profile") {
        navigate(`/${user.reqUser?.username}`)
      } 
      else if (title == "Create") {
          onOpen()
      }
       else if(title == "Home") {
        navigate("/")
      }
     if (title == "Search") {
        setIsSearchVisible(true);
      } else 
        setIsSearchVisible(false)
  }


  return (
    <div className='sticky top-0 h-[100vh] flex'>

        <div className={`flex flex-col justify-between h-full ${activeTab === "Search" ? "px-2" : "px-10"}`} >

        <div>
           { activeTab !== "Search" && <div className='pt-10'>
                <img className='w-40' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy57NIobf2Tszx0d2mNr7UwWcsUI71jgsp-Q&usqp=CAU' />
            </div>}

            <div className='mt-10'>
                  {menu.map((item,index) => (
                    <div key={index} className='flex items-center mb-5 cursor-pointer text-lg' onClick={()=> handleTabClick(item.title)} >
                        { activeTab == item.title ? (item.activeIcon) : (item.icon) }
                       { activeTab !== "Search" && <p className={`${activeTab === item.title ? "font-bold" : "font-semibold"} `} >{item.title}</p>}
                    </div>
                  ))}
            </div>
        </div>

        <div className='flex items-center cursor-pointer pb-10' >
            <IoReorderFourOutline className='text-2xl'/>
           { activeTab !== "Search" && <p className='ml-5' >More </p>}
        </div>

        </div>

        <CreatePostModel isOpen={isOpen} onClose={onClose} />
        
        { isSearchVisible && <SearchComponent/>}

    </div>
  )
}

export default Sidebar