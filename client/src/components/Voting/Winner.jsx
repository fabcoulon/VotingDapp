import useEth from '../../contexts/EthContext/useEth';
import { useState, useContext, useEffect } from 'react';
import { useWorkflowStep } from '../../hooks/useWorkflowStep';
import { VotingContext } from '../../contexts/VotingContext/VotingContext';
import { Box, Text, Divider, Center } from "@chakra-ui/react";

export function Winner() {

  const { state: { contract,accounts } } = useEth();
  const { workflowstep } = useWorkflowStep();
  const [winningProposal,setWinningProposal] = useState("");
  let {vote} = useContext(VotingContext);

  useEffect(() => {
  
    async function fetchData() { 

      const winningProposalId = await contract.methods.winningProposalID().call();
      await new Promise(async() => {
          const proposal = await contract.methods.getOneProposal(winningProposalId).call({ from: accounts[0] });
          setWinningProposal(proposal[0]);
      });
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote,workflowstep])
  
  const winnerBox = 
  <>
  <Box maxW="inherit" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
  <Text as="b">The winning proposal is : </Text>{ winningProposal }
  </Box>
  <Center height='30px'>
    <Divider orientation='vertical' />
  </Center>
  </>;
   return workflowstep > 4 && winnerBox
   
  
  }