import React, { useRef } from 'react';
import { io } from "socket.io-client";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Avatar,
    useDisclosure,
    Button,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { chatblockUser, clearUserChat } from '../../API/ChatApiCalls';
import { setCurrentChat, userHome } from '../../Redux/Actions/UserActions/UserHomeAction';
import Alert from '../Alert/Alert'

function OtherUserProfile({ chat, userData, recieverid, setBlock }) {
    const dispatch = useDispatch()
    const socket = useRef()
    const userdata = useSelector((state) => state.loginReducer.userdata)
    const { loading, error, homedata } = useSelector((state) => state.userHome);
    const { isOpen, onOpen, onClose } = useDisclosure()
    function block() {

        chatblockUser(userdata._id, chat._id).then((data) => {
            dispatch(userHome());
            dispatch(setCurrentChat(data.data))
            socket.current = io("http://localhost:8800");
            let details = {
                userid:recieverid,
                chat:data.data
            }
            socket.current.emit("Block",details)
        })

    }


    const clearChat = () =>{
       clearUserChat(chat._id).then((data)=>{
        dispatch(setCurrentChat(data.data))
        socket.current = io("http://localhost:8800");
        let details = {
            userid:recieverid,
            chat:data.data
        }
        socket.current.emit("ClearChat",details)
       })
    }
    return (
        <>

            <Avatar
                onClick={onOpen}
                style={{ margin: "0" }}
                size={"md"}
                name={
                    chat.isGroupChat
                        ? chat.chatName
                        : userData
                            ? userData.fullname
                            : ""
                }

                src={chat.isGroupChat
                    ? chat.chatName
                    : chat.block.length > 0 ? chat.block.length > 1 ? '' : chat.block[0] == userdata._id ? userData
                        ? userData.photo
                        : "" : '' : userData
                        ? userData.photo
                        : ""}
            />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{chat.isGroupChat
                        ? chat.chatName
                        : userData
                            ? userData.fullname
                            : ""}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Avatar

                            style={{ margin: "0" }}
                            size={"xl"}
                            name={
                                chat.isGroupChat
                                    ? chat.chatName
                                    : userData
                                        ? userData.fullname
                                        : ""
                            }

                            src={chat.isGroupChat
                                ? chat.chatName
                                : chat.block.length > 0 ? chat.block.length > 1 ? '' : chat.block[0] == userdata._id ? userData
                                    ? userData.photo
                                    : "" : '' : userData
                                    ? userData.photo
                                    : ""}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        {
                           chat.isGroupChat?'':<Alert message="Are you sure to clear chat for both user" action="Clear Chat" functiontobedone={clearChat} />
                        }
                        {
                            chat.isGroupChat ? '' : <Button onClick={block} colorScheme={chat.block.length != 0 ? chat.block.length > 1 ? 'green' : chat.block[0] == recieverid ? 'red' : 'green' : 'red'}>{
                                chat.block.length != 0 ? chat.block.length > 1 ? <h2 style={{ color: "black" }}>Unblock</h2> : chat.block[0] == recieverid ? <h2 style={{ color: "black" }}>Block</h2> : <h2 style={{ color: "black" }}>Unblock</h2> : <h2 style={{ color: "black" }}>Block</h2>
                            }</Button>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default OtherUserProfile