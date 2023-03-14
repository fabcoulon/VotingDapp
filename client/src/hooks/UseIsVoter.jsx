import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';

export function UseIsVoter(account) {

  const { state: { contract } } = useEth();
  const [isVoter, setIsVoter] = useState(false);

  useEffect(() => {
  
    setIsVoter(false);
    async function fetchData() { 
  
      const options = {
        filter: {
          value: [],
        },
        fromBlock: 0,
      };
    
      contract.events.VoterRegistered(options).on("data",event => (event.returnValues[0] === account) && setIsVoter(true));
  
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account])
  return { isVoter }
  
  }