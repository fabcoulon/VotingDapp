import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';

export function UseIsProposal(vote) {

  const { state: { contract } } = useEth();
  const [isProposal, setIsProposal] = useState(false);

  useEffect(() => {
  
    setIsProposal(false);
    async function fetchData() { 
  
      const options = {
        filter: {
          value: [],
        },
        fromBlock: 0,
      };
      contract.events.ProposalRegistered(options).on("data",event => (event.returnValues[0] === vote) && setIsProposal(true));
  
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vote])
  return { isProposal }
  
  }