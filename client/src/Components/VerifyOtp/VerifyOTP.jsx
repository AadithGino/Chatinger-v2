import { Center, FormLabel, Heading } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyOTPAction } from "../../Redux/Actions/UserActions/UserLoginSignupActions";

function VerifyOTP() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [otp, setOtp] = useState("");
  const OTP = useSelector((state)=>state.otpReducer)
  const {loading,error,otpdata}=OTP;
  
  useEffect(()=>{
    if(otpdata){
      navigate("/login")
    }
  },[otpdata])

  const handleSubmit = () => {
    dispatch(verifyOTPAction(otp))
  };

  console.log(error);
  return (
    <div className="verify-otp-baground">
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={4}
          w={"full"}
          maxW={"sm"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={10}
        >
          <Center>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Verify your Number
            </Heading>
          </Center>
          <Center
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            {
              error ? <h2>{error}</h2>  : ''
            }
            We have sent code to your Number
          </Center>
          <Center
            fontSize={{ base: "sm", sm: "md" }}
            fontWeight="bold"
            color={useColorModeValue("gray.800", "gray.400")}
          ></Center>
          <FormControl>
            <Center>
              <HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>OTP</FormLabel>
                  <Input
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                    placeholder="Type OTP..."
                    _placeholder={{ color: "gray.500" }}
                    type="number"
                  />
                </FormControl>
              </HStack>
            </Center>
          </FormControl>
          <Stack spacing={6}>
            <Button
              onClick={() => {
                handleSubmit()
              }}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Verify
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </div>
  );
}

export default VerifyOTP;
