import React, { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  WrapItem,
  Avatar,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { chanegUserName, changeProfileImage } from "../../API/ChatApiCalls";
import { updateUserData, userLoginAction, userLogoutAction } from "../../Redux/Actions/UserActions/UserLoginSignupActions";
import Alert from "../Alert/Alert";
import { Navigate, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [editName, setEditName] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState();
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const fileRef = useRef();

  const changeName = () => {
    chanegUserName(userdata._id, firstname, lastname).then((data) => {
      dispatch(updateUserData(data.data));
      console.log(data.data);
    });
  };
  console.log(userdata);

  const changeProfilePic = (e) => {
    setImageLoading(true);
    console.log(image);
    const data = new FormData();
    data.append("file", e);
    data.append("upload_preset", "noteapp");
    data.append("cloud_name", "dhajqatgt");
    fetch("https://api.cloudinary.com/v1_1/dhajqatgt/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        changeProfileImage(userdata._id, data.url).then((result) => {
          console.log(result.data);
          dispatch(updateUserData(result.data));
          setImageLoading(false);
        });
      });
  };

  const logout = () => {
    dispatch(userLogoutAction())
    navigate("/login")
  };

  return (
    <>
      {imageLoading ? (
        <h2>Loading...</h2>
      ) : (
        <WrapItem>
          <Avatar
            onClick={() => {
              onOpen();
              navigate('/home')
            }}
            name={userdata.firstname}
            src={userdata.photo}
          />
        </WrapItem>
      )}

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <WrapItem>
              <Avatar
                onClick={() => {
                  fileRef.current.click();
                }}
                size="lg"
                name={userdata.firstname}
                src={userdata.photo}
              />{" "}
            </WrapItem>

            <Input
              onChange={(e) => {
                console.log(e.target.files[0]);
                
                changeProfilePic(e.target.files[0]);
              }}
              ref={fileRef}
              style={{ display: "none" }}
              type={"file"}
            />
            <FormControl>
              <FormLabel>
                NAME :{" "}
                {userdata ? userdata.firstname + " " + userdata.lastname : ""}{" "}
                <i
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditName(!editName)}
                  class="fa-solid fa-pen-to-square"
                ></i>
              </FormLabel>
              {editName ? (
                <div>
                  <Input
                    onChange={(e) => setFirstname(e.target.value)}
                    style={{ marginBottom: "10px" }}
                    ref={initialRef}
                    placeholder="First name"
                  />

                  <Input
                    ref={initialRef}
                    onChange={(e) => setLastname(e.target.value)}
                    placeholder="Last name"
                  />
                </div>
              ) : (
                ""
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {editName ? (
              <Button onClick={() => changeName()} colorScheme="blue" mr={3}>
                Save
              </Button>
            ) : (
              ""
            )}

            <Alert
              message={"Are You Sure You Want To Logout"}
              action={"Logout"}
              functiontobedone={logout}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Profile;
