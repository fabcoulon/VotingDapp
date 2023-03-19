import {Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

function NoticeWrongNetwork() {
  return (
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>MetaMask is not connected to the same network as the one you deployed to.</AlertTitle>
        <AlertDescription>Please change your network</AlertDescription>
      </Alert>
  );
}

export default NoticeWrongNetwork;
