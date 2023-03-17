import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';

export function UseHasVoter(voterAddress) {

  const { state: { contract,web3,txhash } } = useEth();
  const [hasVoter,setHasVoter] = useState(false);

  useEffect(() => {
  
  async function fetchData() { 
  
  const deployTx = await web3.eth.getTransaction(txhash);
  const results = await contract.getPastEvents("VoterRegistered", {fromBlock:deployTx.blockNumber , toBlock: "latest"});
  results.length > 0 && setHasVoter(true);

  
  }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voterAddress])
  
  return { hasVoter }
  
  }