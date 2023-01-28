import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  Input,
} from "@chakra-ui/react";
import "./UploadStatus.css";
import { getStatus, uploadStatus } from "../../API/ChatApiCalls";
import { useSelector } from "react-redux";

function UploadStatus({ setStatus, status }) {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [selectText, setSelectText] = useState(false);
  const [image, setImage] = useState("");
  const [selectImage, setSelectImage] = useState(false);
  const finalRef = React.useRef(null);

  const selectTextfun = () => {
    setSelectText(true);
    setSelectImage(false);
    setImage(false);
  };

  const selectImafefun = () => {
    setSelectText(false);
    setSelectImage(true);
    setText(false);
  };

  const UploadStatus = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "noteapp");
    data.append("cloud_name", "dhajqatgt");
    fetch("https://api.cloudinary.com/v1_1/dhajqatgt/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        uploadStatus(userdata._id, data.url).then((result) => {
          console.log(result);
          console.log(...status);
          setStatus([...status, result.data]);
          onClose();
        });
      });
  };

  return (
    <div>
      <Button mt={4} onClick={onOpen}>
        Upload Status +
      </Button>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Status</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectText ? (
              <div className="status-image-preview">
                <ModalHeader>{text}</ModalHeader>
              </div>
            ) : (
              ""
            )}

            {selectImage ? (
              <img src={image ? URL.createObjectURL(image) : ""} alt="" />
            ) : (
              ""
            )}

            <h2 onClick={selectTextfun}>TEXT</h2>
            <h2 onClick={selectImafefun}>IMAGE</h2>

            {selectText ? (
              <Input
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            ) : (
              ""
            )}
            {selectImage ? (
              <Input
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
                type={"file"}
              />
            ) : (
              ""
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={UploadStatus}>
              Upload
            </Button>

            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default UploadStatus;
