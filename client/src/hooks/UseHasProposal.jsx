import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';

export function UseHasProposal(proposal) {

  const { state: { contract } } = useEth();
  const [hasProposal,setHasProposal] = useState(false);

  useEffect(() => {
  
  async function fetchData() { 
    setHasProposal(false);
    const options = {
      filter: {
        value: [],
      },
      fromBlock: 0,
    };
  
    contract.events.ProposalRegistered(options).on("data",event => (event.returnValues[0]) && setHasProposal(true));

  }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposal])
  return { hasProposal }
  
  }