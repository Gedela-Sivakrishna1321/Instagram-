import React, { useEffect, useState } from 'react'
import { AiFillAlert, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { isCommentLikedByUser, timeDifference } from '../../Config/Logics';
import { useDispatch, useSelector } from 'react-redux';
import { likeCommentAction, unlikeCommentAction } from '../../Redux/Comment/Action';

const CommentCard = ({comment}) => { 
    const [isCommentLiked, setIsCommentLiked] = useState(false);
    const dispatch = useDispatch();
    const {user} = useSelector((store) => store);
    const token = localStorage.getItem("token");
    const data = {
        commentId : comment.id,
        jwt : token,
    }

    function handleCommentLike() {
        setIsCommentLiked(true);
        dispatch(likeCommentAction(data))
    }

    function handleCommentUnlike() {
        setIsCommentLiked(false);
        dispatch(unlikeCommentAction(data))
    }

    useEffect(()=>{
        setIsCommentLiked(isCommentLikedByUser(comment, user.reqUser.id))
    },[user.reqUser, comment])

  return (
    <div>
        <div className='flex items-center justify-between py-5'>
            <div className='flex items-center'>
                <div>
                    <img className='w-9 h-9 rounded-full' 
                    src={comment.user.userImage ||  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                </div>

                <div className='ml-3'>
                    <p>
                        <span className='font-semibold'> {comment?.user.username} </span>

                        <span className='ml-2' >{comment.content} </span>
                    </p>

                    <div className='flex items-center space-x-3 text-xs opacity-60 pt-2'>
                        <span> {timeDifference(comment.createdAt)} </span>
                     {comment.likedByUsers?.length > 0 &&   <span> {comment.likedByUsers?.length} likes</span>}
                    </div>
                </div>
            </div>

            <div>
                {isCommentLiked ? 
                <AiFillHeart onClick={handleCommentUnlike} className='text-xs cursor-pointer text-red-600 hover:opacity-50' /> 
                : <AiOutlineHeart onClick={handleCommentLike} className='text-xs cursor-pointer hover:opacity-50'/>}
            </div>
        </div>
    </div>
  )
}

export default CommentCard