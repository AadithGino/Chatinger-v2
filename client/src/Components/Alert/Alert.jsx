import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
  } from '@chakra-ui/react'

function Alert({message,action,functiontobedone}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
       <>
      <Button mr={2} colorScheme={'red'} color={'black'} onClick={onOpen}  >{action}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{message}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
         
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme={'orange'} onClick={()=>{functiontobedone()}}>{action}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    </div>
  )
}

export default Alert
