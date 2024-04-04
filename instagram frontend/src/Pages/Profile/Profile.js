import React, { useEffect } from 'react'
import ProfileUserDetails from '../../Components/ProfileComponents/ProfileUserDetails'
import ReqUserPostPart from '../../Components/ProfileComponents/ReqUserPostPart'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { isFollowing} from '../../Config/Logics'
import { isReqUser } from '../../Config/Logics'
import { findUserByUsernameAction, getUserProfile } from '../../Redux/User/Action'

const Profile = () => {

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const {username} = useParams();
  const {user} = useSelector(store => store);
  const location = useLocation();

  console.log("Location pathnamen - ",location.pathname);

 const isRequser = isReqUser(user.reqUser?.id, user.findUserByUsername?.id);
  const isFollowed = isFollowing(user.reqUser, user.findUserByUsername);
//  console.log("IsReqUser function - ",isReqUser);
  console.log("user ---->  : ",user);

  useEffect(()=>{
    const data = {
      jwt : token,
      username,
    }
    dispatch(getUserProfile(token));
    dispatch(findUserByUsernameAction(data));
  },[username, user.follower, user.following, location.pathname]);

//   user = {isReqUser ? user.reqUser : user.findUserByUsername} isFollowing={isFollowed} isReqUser={isReqUser}
//    user = {isReqUser ? user.reqUser : user.findUserByUsername}
  return (
    <div className='px-20'>
        <div className='w-full' >
            <ProfileUserDetails user = {isRequser ? user.reqUser : user.findUserByUsername} isFollowing={isFollowed} isReqUser={isReqUser} />
        </div>

        <div>
            <ReqUserPostPart  user = {isRequser ? user.reqUser : user.findUserByUsername}  />
        </div>
    </div>
  )
}

export default Profile