import useEth from '../../contexts/EthContext/useEth';
import { useState, useContext, useEffect } from 'react';
import { useWorkflowStep } from '../../hooks/useWorkflowStep';
import { VotingContext } from '../../contexts/VotingContext/VotingContext';

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
        return proposal;  
    });
  }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vote])
   return workflowstep > 4 && <p>Winning proposal { winningProposal }</p>
  }