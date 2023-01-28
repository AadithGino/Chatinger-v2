import React from "react";
import "./GroupInfo.css";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changeGroupName, removeUserFromGroup } from "../../API/ChatApiCalls";
import {
  setCurrentChat,
  userHome,
} from "../../Redux/Actions/UserActions/UserHomeAction";
import UserBade from "../UserBadge/UserBade";
const GroupInfo = ({ members, chat, currentuser }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editName, setEditName] = useState(false);
  const [nameupdated, setnameupdated] = useState(false);
  const [name, setName] = useState("");
  console.log(chat);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleChangeName = () => {
    changeGroupName(name, chat._id)
      .then((data) => {
        setnameupdated(true);
        dispatch(setCurrentChat(data.data));
        dispatch(userHome());
        setEditName(false);
        setTimeout(() => {
          setnameupdated(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeUser = (id) => {
    removeUserFromGroup(id, chat._id)
      .then((data) => {
        console.log(data);
        dispatch(setCurrentChat(data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <i style={{color:"black"}} onClick={onOpen} class="fa-solid fa-circle-info"></i>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Group Info </ModalHeader>
          <ModalCloseButton />
          {nameupdated ? (
            <Alert status="success">
              <AlertIcon />
              Group Name Updated
            </Alert>
          ) : (
            ""
          )}
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>
                Group Name : {chat.chatName}{" "}
                {chat.groupAdmin === currentuser ? (
                  <i
                    onClick={() => setEditName(!editName)}
                    class="fa-solid fa-pen"
                  ></i>
                ) : (
                  ""
                )}{" "}
              </FormLabel>
              {editName ? (
                <Input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  ref={initialRef}
                  placeholder="New Group Name..."
                />
              ) : (
                ""
              )}
            </FormControl>

            <h2>MEMBERS</h2>
            {chat.isGroupChat
              ? members
                ? members.map((m) => {
                    console.log(m.user[0]);
                    if (m.user[0] !== currentuser) {
                      return (
                        <>
                          {chat.groupAdmin === currentuser ? (
                            <span
                              onClick={() => {
                                removeUser(m.user[0]._id);
                              }}
                            >
                              {" "}
                              <UserBade user={m.user[0]} /> <br />
                            </span>
                          ) : (
                            <span>
                              {" "}
                              <UserBade user={m.user[0]} /> <br />
                            </span>
                          )}
                        </>
                      );
                    }
                  })
                : ""
              : ""}
          </ModalBody>

          <ModalFooter>
            {chat.groupAdmin === currentuser ? (
              editName ? (
                <Button onClick={handleChangeName} colorScheme="blue" mr={3}>
                  Save
                </Button>
              ) : (
                ""
              )
            ) : (
              ""
            )}
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupInfo;
