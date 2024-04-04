import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaPhotoVideo } from 'react-icons/fa'
import './CreatePostModel.css'
import { GrEmoji } from 'react-icons/gr'
import { GoLocation } from 'react-icons/go'
import { useDispatch } from 'react-redux'
import { UploadToCloudinary } from '../../Config/UploadToCloudinary'
import { createPostAction } from '../../Redux/Post/Action'

const CreatePostModel = ({ onClose, isOpen }) => {

    const [isDragOver, setIsDragOver] = useState(false);
    const [file, setFile] = useState();
    const [caption, setCaption] = useState("");
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState();
    const [location, setLocation] = useState("");
    const token = localStorage.getItem("token");

    function handleDrop(event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        console.log("Dropped file - ",droppedFile);
        if(droppedFile.type.startsWith("image/**") || droppedFile.type.startsWith("video/**")) {
            setFile(droppedFile);
        }
        console.log("File - ",file);
    }

    function handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect="copy";
        setIsDragOver(true);
    }

    function handleDragLeave() {
        setIsDragOver(false);
    }

 async  function handleOnChange(event) {
        const file = event.target.files[0];
       
        if(file && (file.type.startsWith("image/") || file.type.startsWith("video/")) ) {
            const imgUrl = await UploadToCloudinary(file);
            setImageUrl(imgUrl);
            setFile(file); 
            // console.log("ImageURL - ",imgUrl);
        } else {
            setFile(null);
            alert("Please select a video / image ")

        }
        
        console.log("File : ",file);
    }

    function handleCaptionChange(e) {
        setCaption(e.target.value)
    }

    function handleCreatePost() {
        const data = {
            jwt : token,
            data : {
                caption, location, image : imageUrl,
            },
        }
        dispatch(createPostAction(data));
        onClose();
    }

    return (
        <div>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                size={'4xl'}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <div className='flex items-center justify-between py-1 px-10'>
                        <p>Create New Post</p>
                        <Button 
                            onClick={handleCreatePost}
                            variant={'ghost'} 
                            colorScheme='blue'
                             size={'sm'}>
                                Share
                        </Button>
                    </div>
                    <ModalBody>
                        <div className='h-[70vh] justify-between pb-5 flex '>
                            <div className='w-[50%]'>
                               {!file && <div onDrop={handleDrop}
                                     onDragOver={handleDragOver}
                                     onDragLeave={handleDragLeave}
                                     className='drag-drop h-full'>
                                    <div>
                                        <FaPhotoVideo className='text-3xl' />
                                        <p>Drag Photos or videos here</p>          
                                    </div>

                                    <label htmlFor="file-upload" className='custom-file-upload'>Select from computer</label>
                                    <input type="file" id='file-upload' accept='image/*, video/*' onChange={handleOnChange} />
                                </div>}

                                {
                                    file && <img className='max-h-full' src={URL.createObjectURL(file)}  />
                                }

                            </div>

                            <div className='border w-[1px] h-full' ></div>

                            <div className='w-[50%] '>
                                <div className='flex items-center px-2'>
                                    <img className='w-7 h-7 rounded-full' src="https://cdn.pixabay.com/photo/2023/09/09/08/31/woman-8242672_640.jpg" alt="" />
                                    <p className='ml-4 font-semibold' >username</p>
                                </div>

                                {/* Caption Div */}
                                <div className='px-2'>
                                    <textarea onChange={handleCaptionChange} className='captionInput' placeholder='write a caption...' rows="8"></textarea>
                                </div>

                                {/* Word count */}
                                <div className='flex justify-between px-2'>
                                    <GrEmoji/>
                                    <p className='opacity-70'>{caption.length}/2,200</p>
                                </div>
                                <hr />
                                
                                {/* Location */}
                                <div className='flex p-2 justify-between'>
                                    <input 
                                    type="text"
                                     placeholder='location'
                                      className='w-[90%] outline-0'
                                      onChange={(e) => setLocation(e.target.value)} />
                                    <GoLocation/>
                                </div>
                                <hr />
                            </div>
                        </div>


                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CreatePostModel