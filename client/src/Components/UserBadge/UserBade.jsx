
import { Badge, Flex } from '@chakra-ui/react'
import React from 'react'

function UserBade({handleRemove,user}) {
  console.log(user);
  return (
    // <div style={{display:"Flex"}}>
    
        <Badge cursor={'pointer'} ml={2}  colorScheme='green'>{user.fullname}</Badge>
    // </div>
  )
}

export default UserBade
