import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect, useContext } from 'react';
import { VotingContext } from '../contexts/VotingContext/VotingContext';

export function useWorkflowStep() {

  const { state: { contract } } = useEth();
  const [workflowstep,setWorkflowStep] = useState(0);
  let {workflowStatus} = useContext(VotingContext);

  useEffect(() => {
  
    async function fetchData() { 
  
      setWorkflowStep(await contract.methods.workflowStatus().call());
  
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  useEffect(() => {
  
  async function fetchData() { 

    setWorkflowStep(await contract.methods.workflowStatus().call());

  }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflowstep,workflowStatus])
  
  return { workflowstep }
  
  }