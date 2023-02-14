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

function UploadStatus({ setMyStatus, status }) {
  const userdata = useSelector((state) => state.loginReducer.userdata);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [selectText, setSelectText] = useState(false);
  const [image, setImage] = useState("");
  const [uploading,setUploading]=useState(false);
  const finalRef = React.useRef(null);



  const UploadStatus = () => {
    setUploading(true)
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
          setMyStatus( result.data);
          onClose();
          setUploading(false)
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


            <img src={image ? URL.createObjectURL(image) : ""} alt="" />



            <Input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type={"file"}
            />

          </ModalBody>

          <ModalFooter>
            {
              uploading? <Button colorScheme="green" mr={3} >
              Uploading...
            </Button>:<Button colorScheme="green" mr={3} onClick={UploadStatus}>
              Upload
            </Button>
            }
            

            {
              uploading?  '': <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            }

           
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default UploadStatus;
