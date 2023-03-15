import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';

export function UseWorkflowStep() {

  const { state: { contract } } = useEth();
  const [workflowstep,setWorkflowStep] = useState(0);

  useEffect(() => {
  
  async function fetchData() { 

    setWorkflowStep(await contract.methods.workflowStatus().call());

  }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflowstep])
  
  return { workflowstep }
  
  }