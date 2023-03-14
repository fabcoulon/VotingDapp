import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';

export function UseHasVoter() {

  const { state: { contract } } = useEth();
  const {hasVoter,setHasVoter} = useState(false);

  useEffect(() => {
  
  async function fetchData() { 

    const options = {
      filter: {
        value: [],
      },
      fromBlock: 0,
    };
  
    contract.events.VoterRegistered(options).on("data",event => event.returnValues[0] && setHasVoter(true));

  }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return { hasVoter }
  
  }