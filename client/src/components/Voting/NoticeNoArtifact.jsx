import {Alert, AlertIcon, AlertTitle, AlertDescription, Text } from '@chakra-ui/react'

function NoticeNoArtifact() {
  return (
    <Alert status='error'>
      <AlertIcon />
      <AlertTitle>Cannot find <Text as='span' fontSize='3xl'>Voting</Text> contract artifact.</AlertTitle>
      <AlertDescription>Please complete the above preparation first, then restart the react dev server.</AlertDescription>
    </Alert>
  );
}

export default NoticeNoArtifact;