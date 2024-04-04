import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'


const ChangeProfilePhotoModel = ({isOpen, onClose,  onOpen,  handleProfileImageChange}) => {

    // console.log("isOpen : ",isOpen);
    // console.log("onClose : ", onClose);
    // console.log("onOpen : ", onOpen);

  return (
    <div>

        <Modal onClose={onClose} isOpen={isOpen} isCentered >

            <ModalOverlay/>
            <ModalContent>
                <ModalHeader textAlign={"center"} >Modal Title</ModalHeader>

                <ModalBody>
                    <div className='flex flex-col items-center' >
                        <label for="profileImage"
                        className='font-bold py-3 text-blue-600 text-center cursor-pointer text-xs w-full' >
                            Upload photo
                        </label>

                        <input onChange={handleProfileImageChange} type="file" id="profileImage" name="profileImage" />
                    </div>

                    <hr />

                    <p className='font-bold py-3 text-red-600 text-center' >
                        Remove Photo
                    </p>

                    <hr />

                    <p className='py-3 text-center cursor-pointer ' onClick={onClose}  >
                        Cancel
                    </p>
                
                </ModalBody>
                <ModalCloseButton/>
            </ModalContent>

        </Modal>

    </div>
  )
}

export default ChangeProfilePhotoModel