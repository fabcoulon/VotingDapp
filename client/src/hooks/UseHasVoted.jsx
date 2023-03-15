import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';

export function UseHasVoted(voterAddress) {

  const { state: { contract } } = useEth();
  const [hasVoted,setHasVoted] = useState(false);

  useEffect(() => {
  
  async function fetchData() { 
    setHasVoted(false);
    const options = {
      filter: {
        value: [],
      },
      fromBlock: 0,
    };
    contract.events.Voted(options).on("data",event => (event.returnValues[0] === voterAddress) && setHasVoted(true));

  }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voterAddress])
  
  return { hasVoted }
  
  }