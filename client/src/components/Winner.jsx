import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';
import { UseWorkflowStep } from '../hooks/UseWorkflowStep';
import { Box, Text, Divider, Center } from "@chakra-ui/react";

export function Winner() {

  const { state: { contract } } = useEth();
  const { workflowstep } = UseWorkflowStep();
  const [winner,setWinner] = useState(0);

  useEffect(() => {
  
  async function fetchData() { 

    setWinner(await contract.methods.winningProposalID().call());

  }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winner])
  
  const winnerBox = 
  <>
  <Box maxW="inherit" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
  <Text as="b">The winningProposalID is : </Text>{ winner }
  </Box>
  <Center height='30px'>
    <Divider orientation='vertical' />
  </Center>
  </>;

   return workflowstep > 4 && winnerBox
   
  
  }