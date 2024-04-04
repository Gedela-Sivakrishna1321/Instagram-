import React, { useEffect, useState } from 'react'
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import './PostCard.css'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import CommentModel from '../Comment/CommentModel'
import { useDisclosure } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { likePostAction, savePostAction, unlikePostAction, unsavePostAction } from '../../Redux/Post/Action'
import { isPostLikedByUser, isPostSavedByUser } from '../../Config/Logics'
import { useNavigate } from 'react-router-dom'

const PostCard = ({post}) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const {isOpen, onOpen, onClose} = useDisclosure();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const {user} = useSelector((store) => store);
    const naviagte = useNavigate();

    const data = {
        jwt : token,
        postId : post.id
    }

    function handleOpenCommentModel () {
        naviagte(`/comment/${post.id}`)
        onOpen()
    }

    function handlePostLike() {
        setIsPostLiked(true);
        dispatch(likePostAction(data))
    }

    function handlePostUnlike() {
        setIsPostLiked(false);
        dispatch(unlikePostAction(data))
    }

    function handlePostSaveed() {
        setIsSaved(true);
        dispatch(savePostAction(data))
    }

    function handlePostUnSaveed() {
        setIsSaved(false);
        dispatch(unsavePostAction(data))
    }

    function handleClick() {
        setShowDropDown(!showDropDown);
    }

    useEffect(()=>{
        setIsPostLiked(isPostLikedByUser(post, user?.reqUser?.id ));
        setIsSaved(isPostSavedByUser(post.id, user?.reqUser))
    },[post, user.reqUser, post.likePost])

    // , post.unlikePost, post.savedPost, post.unsavedPost

    return (
        <div>
            <div className='border rounded-md w-full' >
                <div className='flex justify-between items-center py-4 px-5' >
                    <div className='flex items-center ' >
                        <img
                         className='h-12 w-12 rounded-full' 
                         src={post.user.image  || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} />

                        <div className='pl-2' >
                            <p className='font-semibold text-sm' > {post.user.username} </p>
                            <p className='font-thin text-sm' > {post.location} </p>
                        </div>

                    </div>

                    <div className='dots' >
                        <BsThreeDots onClick={handleClick} />
                        <div className='dropdown-content' >
                           {showDropDown && <p className='bg-black text-white py-1 px-4 rounded-md cursor-pointer' >Delete</p>}
                        </div>

                    </div>

                </div>

                {/* Post Image */}
                <div className='w-full' >
                    <img className='w-full' src={post?.image} alt="" />
                </div>

                {/* Link, comment, share */}
                <div className='flex items-center justify-between px-5 py-4 ' >
                    <div className='flex items-center space-x-2' >
                        {/* {isPostLiked && <AiOutlineHeart/> } */}
                        {isPostLiked ? <AiFillHeart onClick={handlePostUnlike} className='cursor-pointer text-2xl hover:opacity-70 text-red-600'/> : <AiOutlineHeart onClick={handlePostLike} className='cursor-pointer text-2xl hover:opacity-50' />  }
                        <FaRegComment onClick={handleOpenCommentModel} className='cursor-pointer text-xl hover:opacity-50'/>
                        <RiSendPlaneLine className='cursor-pointer text-xl hover:opacity-50'/>
                    </div>

                    <div className='cursor-pointer' >
                       {isSaved ? <BsBookmarkFill onClick={handlePostUnSaveed} className='cursor-pointer text-xl hover:opacity-50' /> : <BsBookmark onClick={handlePostSaveed} className='cursor-pointer text-xl hover:opacity-50'/>}
                    </div>

                </div>

                <div className='w-full py-2 px-5' >
                  { post.likedByUsers.length > 0 &&  <p className='text-start'>{post.likedByUsers.length} Likes</p>}
                  { post.comments.length > 0 &&  <p className='py-2 opacity-50 cursor-pointer text-start' >view all {post.comments.length} comments</p>}
                </div>

                <div className='border border-t'>
                    <div className='flex items-center px-5 w-full' >
                        <BsEmojiSmile/>
                        <input type="text" placeholder='Add a comment' className='commentInput' />
                    </div>
                </div>

            </div>

            <CommentModel handlePostLike={handlePostLike} onClose={onClose} isOpen={isOpen} handlePostSaveed={handlePostSaveed} isPostLiked={isPostLiked} isSaved={isSaved} />

        </div>
    )
}

export default PostCard