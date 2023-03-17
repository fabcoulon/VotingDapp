import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';

export function useHasVoted(voterAddress) {

  const { state: { contract,web3,txhash } } = useEth();
  const [hasVoted,setHasVoted] = useState(false);

  useEffect(() => {
  
  async function fetchData() { 
    setHasVoted(false);

    const deployTx = await web3.eth.getTransaction(txhash);
    contract.events.Voted({fromBlock:deployTx.blockNumber , toBlock: "latest"}).on("data",event => (event.returnValues[0] === voterAddress) && setHasVoted(true));

  }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [voterAddress])
  
  return { hasVoted }
  
  }