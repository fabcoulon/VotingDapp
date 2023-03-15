import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';
import { UseWorkflowStep } from '../hooks/UseWorkflowStep';

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
  
   return workflowstep > 4 && <p>Winning proposal { winner }</p>
  }