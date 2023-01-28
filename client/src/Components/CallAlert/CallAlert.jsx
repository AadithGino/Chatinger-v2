import React, { useEffect, useRef } from "react";
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
} from "@chakra-ui/react";

import "./CallAlert.css";
import { io } from "socket.io-client";
import { acceptCall, declinecall } from "../../API/ChatApiCalls";

function CallAlert({ callRef, callData, endCallRef }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const socket = useRef();

  const declineCall = () => {
    socket.current = io("http://localhost:8800");
    const id = callData ? callData.userdata._id : "";
    socket.current.emit("Decline-call", id);
    declinecall(callData.callid).then((data)=>{
      
    })
  };

  const acceptcall = () => {
    acceptCall(callData.callid).then((data)=>{
      
    })
  }
  return (
    <div>
      <Button style={{ display: "none" }} ref={callRef} onClick={onOpen}>
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Incoming Call</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div class="call-animation">
              <img
                className="call-image"
                src={callData ? callData.userdata.photo : ""}
                alt=""
                width="135"
              />
            </div>
            <h2>{callData?.userdata?.fullname}</h2>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                declineCall();
                onClose();
              }}
            >
              Decline
            </Button>
            <Button
              style={{ display: "none" }}
              ref={endCallRef}
              onClick={onClose}
              variant="ghost"
            >
              Accept
            </Button>
            <Button  colorScheme="green" mr={3} onClick={() => {acceptcall()}}>
              Accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CallAlert;
