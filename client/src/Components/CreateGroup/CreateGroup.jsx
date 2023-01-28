import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  CloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroup, userSearchforGroup } from "../../API/ChatApiCalls";
import {
  setCurrentChat,
  userHome,
} from "../../Redux/Actions/UserActions/UserHomeAction";
import UserBadge from "../UserBadge/UserBade";

function CreateGroup({}) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [users, setUsers] = useState([]);
  const [groupmembers, setGroupmembers] = useState([]);
  const [chatName, setChatName] = useState("");
  const [error, setError] = useState(null);
  const [groupMembers, setgroupMembers] = useState([]);
  const currentuser = useSelector((state) => state.loginReducer.userdata._id);
  const handleSearch = async (value) => {
    const { data } = await userSearchforGroup(currentuser, value);
    setUsers(data);
  };

  const handleaddMember = (user) => {
    if (groupMembers.includes(user._id)) {
      console.log(user._id);
    } else {
      if (groupMembers.length == 0) {
        setgroupMembers([currentuser, user._id]);
        setGroupmembers([user]);
        console.log(groupMembers);
      } else {
        setgroupMembers([...groupMembers, user._id]);
        setGroupmembers([...groupmembers, user]);
        console.log(groupMembers);
      }
    }
  };
  const handleRemove = (user) => {
    setGroupmembers(groupmembers.filter((sel) => sel !== user));
    setgroupMembers(groupMembers.filter((sel) => sel !== user._id));
    console.log(groupMembers);
    console.log();
  };

  const handleCreateGroup = async () => {
    const members = JSON.stringify(groupMembers);
    createGroup(currentuser, members, chatName)
      .then((data) => {
        dispatch(setCurrentChat(data.data));
        dispatch(userHome());
        onClose();
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(err.response.data);
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  };
  return (
    <>
      <div>
        <i
          style={{ marginTop: "20px" }}
          onClick={onOpen}
          class="fa-solid fa-user-group"
        ></i>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Group</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>CHAT NAME</FormLabel>
                <Input
                  onChange={(e) => {
                    setChatName(e.target.value);
                  }}
                  placeholder="First name"
                />
                <FormLabel>Users</FormLabel>
                <Input
                  onChange={(e) => {
                    handleSearch(e.target.value);
                  }}
                  ref={initialRef}
                  placeholder="First name"
                />
              </FormControl>
              {error ? (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Create Group Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : (
                ""
              )}
              {groupmembers
                ? groupmembers.map((user) => {
                    return (
                      <span
                        onClick={() => {
                          handleRemove(user);
                        }}
                      >
                        <UserBadge handleRemove={handleRemove} user={user} />
                      </span>
                    );
                  })
                : ""}
              {users
                ? users.map((m) => {
                    return (
                      <div className="user-list">
                        <div
                          onClick={() => {
                            handleaddMember(m);
                          }}
                        >
                          <img
                            className="user-img"
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAACTCAMAAAC9O9snAAAAMFBMVEXk5ueutLepsLPZ3N3n6eq/xMa5vsHd4OHIzM68wcSxt7rh4+TM0NLW2dvT1tjEycv0+YafAAADTElEQVR4nO2b25arIAxAuURRQPz/vz3Y2nacaYVEgz1rZb/MzNPsFQIEiEoJgiAIgiAIgiAIgiBwAVcLbAAA5ay1Liy/fQGgbBy1WfFdcldHDMLca6N/YHQfr7QC2298HlpmdhdZQejeCN2t/HCJFMR3MXoN4XSBVbentNA8VM6XlLQZWyuVjJpL2QqjRapvpxRqotQ4UrVKWaprk+hQnHE/pVILKZgQShnXwKk6mVZ6/kDBjAuTNvwLukMq5UAFZiX4uO9+DlRidnJoJa097+DBgB66HCjLKgUEJa1ZF06wJCfPmeUwU5TycsDopHqa08w4eJRZt8A582jplOFT2j8W7GAsnxN2r3vCV7HASFTSkc+JNu0057kKkKXTC77FQJz+Y6dvzHF8kbnCuD5RKrobjOeERHViLKDIezBjXRCIST5yFr+0JDd8291SrNDixHtnQEoo3pMwadU0zLetlNXAsBqRZh77XR2lJOcrxh9SaCXOw90KNqO4s2kBOfVY18sXKKU2N+SQMFLcF4cPKcTcY59zT6naW/s2N/arVN0hvaWSqnhRbK9UkVPGN399hWn/sGf6C97OQe0klWG8Sdm3sh+X9C5c1vYAU2f+BMvoy1oe7lIQovf6IZZ/+jFd3bBy05ri0I39OHZDtOFLWns2fIONc1OKcViIMU3WqavM8n8NNs63zqdthue/+y5aF1RTsxyc1PX+t87GLIsNtpFVTuk0+882W7OxQdsYwDRWCq1anrdtDJSdMT7PaPVcSxZA+tU6h9BiCRaoSBVagzWcveFAKvdglaz8cObGfILRzUrH04wC+Tnqj5U/51mfejf3wao7nuzgTgvSKnW4TIfp0Gx7b3WsLD533J5SR1r/6O+/BSlPX6vedhifA1Vq5FPSxEgxRmmBIAWcUbqBvplCNWHSwHYgkbtAMOBeq4i9V0iQbx7kB3IciG2mQTLd8fVRwveFEkGMHrmNAE/lvTDu/vsglW9W9A4QAqZqkQJyEwGJqkDRm1JI+Jr366rPRM6jqupssav8pKJ3s2mGL1RkOa3z+YhT8QUE+1XGCRRnHgytlcpdGvS2UDLF2o7aTXTEqbRCuecnrO0odrxPtjVTo2dsQRAEQRAK/AMk5ChxwTG5FAAAAABJRU5ErkJggg=="
                            alt=""
                          />
                          <span
                            style={{ color: "black" }}
                            className="user-name"
                          >
                            {m.fullname}
                          </span>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </ModalBody>

            <ModalFooter>
              <Button onClick={handleCreateGroup} colorScheme="green" mr={3}>
                Create Group
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default CreateGroup;
