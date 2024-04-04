import React, { useEffect, useState } from 'react'
import StoryCircle from '../../Components/Story/StoryCircle'
import HomeRight from '../../Components/HomeRight/HomeRight'
import PostCard from '../../Components/Post/PostCard'
import { useDispatch, useSelector } from 'react-redux'
import { findUserPostAction } from '../../Redux/Post/Action'


const HomePage = () => {

    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [userIds, setUserIds] = useState();
    const {user, post} = useSelector((store) => store);

    useEffect(()=>{
        // console.log(user?.reqUser);
       // console.log(post);
       // console.log("Type :  ",user?.reqUser?.following?.map((user) => user.id));
        const newIds = user?.reqUser?.following.map((user) => user.id);

        if(newIds?.length > 0) {
            setUserIds([user.reqUser?.id, ...newIds])
        } else {
            setUserIds([user.reqUser?.id])
        }
    //    {newIds != null && setUserIds([user.reqUser?.id, ...newIds]); }
    
    },[user.reqUser])

    useEffect(()=>{
        const data = {
            jwt : token,
            userIds : [userIds].join(","),
        };

        dispatch(findUserPostAction(data));
    },[userIds, post.createdPost, post.deletePost]);


  return (
    <div>
        <div className='flex justify-center mt-10 w-[100%] ' >
            <div className='w-[44%] px-10' >
                
                <div className=' storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full ' >
                    {[1,1,1,1].map((item,index) => <StoryCircle key={index} /> )}
                </div>

                <div className='space-y-10 mt-10 w-full' >
                    { post.usersPost.length > 0 && post.usersPost.map((item, index) => <PostCard key={index} post={item} />)}
                </div>

            </div>

            <div className='w-[27%]' >
                <HomeRight/>
            </div>

        </div>

         
    </div>
  )
}

export default HomePage