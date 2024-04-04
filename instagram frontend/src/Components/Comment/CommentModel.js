import {  Modal,  ModalContent,  ModalOverlay } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import CommentCard from './CommentCard'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'
import { RiSendPlaneLine } from 'react-icons/ri'
import './CommentModel.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createCommentAction, findPostCommentAction } from '../../Redux/Comment/Action'
import { findPostByIdAction } from '../../Redux/Post/Action'
import { timeDifference } from '../../Config/Logics'

const CommentModel = (
    { onClose,
     isOpen,
    isSaved,
    isPostLiked,
    handlePostLike,
    handlePostSaveed }) => {

    // const [isPostLiked, setIsPostLiked] = useState(false);
    // const [isSaved, setIsSaved] = useState(false);

    // function handlePostLike() {
    //     setIsPostLiked(!isPostLiked);
    // }

    // function handlePostSaveed() {
    //     setIsSaved(!isSaved);
    // }

    const [commentContent, setCommentContent] = useState();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const {postId} = useParams();
    const {comment, post, user} = useSelector((store) => store);

    console.log("Comments : ",comment);

    // Find all the comments of the post
    useEffect(()=>{
        const data = {
            jwt : token,
            postId
        };
        
        if(postId) {
            dispatch(findPostByIdAction(data));
        }

    },[comment.createdComment, postId, comment.likeComment])





    return (
        <div>

            <Modal size={'4xl'} onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>

                    <div className='flex h-[75vh] py-4' >
                        <div className='w-[45%] flex flex-col justify-center pl-5' >
                            <img className='max-h-full w-full' 
                            src={post.getSinglePost?.image} alt="" />
                        </div>

                        <div className='w-[55%] pl-10 pr-5 ' >

                            <div className='flex justify-between items-center py-5 ' >
                                <div className='flex items-center' >
                                    <div>
                                        <img className='h-9 w-9 rounded-full'
                                         src={user.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                                    </div>

                                    <div className='ml-2' >
                                        <p> {user.reqUser.username} </p>
                                    </div>
                                </div>

                                <BsThreeDots />
                            </div>

                            <div className='comment pr-2'>
                                {post.getSinglePost?.comments?.map((item) => <CommentCard comment={item}  />)}
                            </div>

                            <div className='mt-2' >
                                <div className='flex items-center justify-between py-4 ' >
                                    <div className='flex items-center space-x-2' >
                                        {/* {isPostLiked && <AiOutlineHeart/> } */}
                                        {isPostLiked ? <AiFillHeart onClick={handlePostLike} className='cursor-pointer text-2xl hover:opacity-70 text-red-600' /> : <AiOutlineHeart onClick={handlePostLike} className='cursor-pointer text-2xl hover:opacity-50' />}
                                        <FaRegComment className='cursor-pointer text-xl hover:opacity-50' />
                                        <RiSendPlaneLine className='cursor-pointer text-xl hover:opacity-50' />
                                    </div>

                                    <div className='cursor-pointer' >
                                        {isSaved ? <BsBookmarkFill onClick={handlePostSaveed} className='cursor-pointer text-xl hover:opacity-50' /> : <BsBookmark onClick={handlePostSaveed} className='cursor-pointer text-xl hover:opacity-50' />}
                                    </div>

                                </div>


                                <div className='w-full py-2' >
                                   {post.getSinglePost?.likedByUsers?.length > 0 && <p className='text-start'> {post.getSinglePost.likedByUsers?.length}  Likes</p>}
                                    <p className='py-2 opacity-50 text-sm text-start' > {timeDifference(post.getSinglePost?.createdAt)} </p>
                                </div>

                                <div className=''>
                                    <div className='flex items-center w-full' >
                                        <BsEmojiSmile />
                                        <input 
                                            type="text" 
                                            placeholder='Add a comment' 
                                            className='commentInput' 
                                            onChange={(e) => setCommentContent(e.target.value) }
                                            value={commentContent}
                                            onKeyPress={(e) => {
                                                if(e.key === "Enter") {
                                                   const data = {
                                                        postId,
                                                        jwt : token,
                                                        data : {
                                                            content : commentContent,
                                                        }
                                                    };
                                                    dispatch(createCommentAction(data));
                                                    setCommentContent("");
                                                }
                                            }}  
                                            />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </ModalContent>
            </Modal>

        </div>
    )
}

export default CommentModel