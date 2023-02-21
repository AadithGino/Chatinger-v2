import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLoginAction } from '../../Redux/Actions/UserActions/adminActions';
import Loading from '../../ToolComponents/Loading/Loading';

function AdminLogin() {
    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {adminData,error,loading} = useSelector((state)=>state.adminLoginReducer)

    const handleSignin = () =>{
        dispatch(adminLoginAction(email,password))
        if(adminData){
            navigate("/podaaa")
        }
        
    }
    return (
        <>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Admin Login</Heading>

                    </Stack>
                    {
                        error?<Alert status='error'>
                        <AlertIcon />
                       {error}
                      </Alert>:''
                    }
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input onChange={(e)=>setEmail(e.target.value)} type="email" />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input onChange={(e)=>setPassword(e.target.value)} type="password" />
                            </FormControl>
                            <Stack spacing={10}>

                                {
                                    loading?<Button
                                   
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                       <Loading/>
                                    </Button>:<Button
                                onClick={handleSignin}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign in
                                </Button>
                                }
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    )
}

export default AdminLogin