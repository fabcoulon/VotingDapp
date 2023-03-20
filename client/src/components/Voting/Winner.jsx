import useEth from '../../contexts/EthContext/useEth';
import { useState, useContext, useEffect } from 'react';
import { useWorkflowStep } from '../../hooks/useWorkflowStep';
import { VotingContext } from '../../contexts/VotingContext/VotingContext';
import { Box, Text, Divider, Center, AbsoluteCenter } from "@chakra-ui/react";

export function Winner() {

  const { state: { contract,accounts } } = useEth();
  const { workflowstep } = useWorkflowStep();
  const [winningProposal,setWinningProposal] = useState("");
  const [voteCount,setVoteCount] = useState("");
  let {vote} = useContext(VotingContext);

  useEffect(() => {
  
    async function fetchData() { 

      const winningProposalId = await contract.methods.winningProposalID().call();
      await new Promise(async() => {
          const proposal = await contract.methods.getOneProposal(winningProposalId).call({ from: accounts[0] });
          setWinningProposal(proposal[0]);
          setVoteCount(proposal[1]);
      });
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote,workflowstep])
  
  const winnerBox = 
  <>
    <Box position='relative' width="100%" maxW="inherit" borderWidth="1px" h='100px' borderRadius="lg" overflow="hidden" boxShadow="md">
      <AbsoluteCenter>
        <Text as="b" h='100px' >The winning proposal is : <span className="winningProposal">{ winningProposal }</span> with <span className="winningProposal">{ voteCount }</span> { voteCount > 1 ? "votes" : "vote"}</Text>
      </AbsoluteCenter>
    </Box>
  <Center height='30px'>
    <Divider orientation='vertical' />
  </Center>
  </>;
   return workflowstep > 4 && winnerBox
   
  
  }