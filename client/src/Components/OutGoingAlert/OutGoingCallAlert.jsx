import React, { useEffect, useRef, useState } from "react";
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

import "./OutGoingCallAlert.css";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { socketURL } from "../../values";

function OutGoingCallAlert({ outGoingCallRef, callData }) {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [decline, setDecline] = useState();
  const userData = useSelector(
    (state) => state.setSelectedUserReducer.userdata
  );
  console.log(userData);
  const socket = useRef();
  useEffect(() => {
    setDecline(false);
  },[]);
  const endCall = () => {
    socket.current = io(socketURL);
    const id = userData ? userData._id : "";
    socket.current.emit("endCall-by-outgoing", id);
  };

  useEffect(() => {
    socket.current = io(socketURL);
    socket.current.on("decline-call-outgoing", (data) => {
      if (data === userdata._id) {
        console.log("END RUNNING CALL");
        setDecline(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    });
  }, []);

  return (
    <div>
      <Button
        style={{ display: "none" }}
        ref={outGoingCallRef}
        onClick={onOpen}
      >
        Open Modal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>OutGoing Call</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div class="call-animation">
              <img
                className="call-image"
                src={userData ? userData.photo : ""}
                alt=""
                width="135"
              />
            </div>
            <h2>
              {userData ? (userData.fullname ? userData.fullname : "") : ""}
            </h2>

            {decline ? <h2 style={{color:"red"}}>DECLINED</h2> : ""}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                onClose();
                endCall();
              }}
            >
             <i style={{marginRight:"10px"}} class="fa-solid fa-phone"></i>End
            </Button>
            {/* <Button variant="ghost">END CALL</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default OutGoingCallAlert;
