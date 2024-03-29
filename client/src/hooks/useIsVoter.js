import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';

export function useIsVoter(account) {

  const { state: { contract,web3,txhash } } = useEth();
  const [isVoter, setIsVoter] = useState(false);

  useEffect(() => {
  
    setIsVoter(false);
    async function fetchData() { 
    
    const deployTx = await web3.eth.getTransaction(txhash);
    await contract.events.VoterRegistered({fromBlock:deployTx.blockNumber , toBlock: "latest"}).on("data",event => (event.returnValues[0] === account) && setIsVoter(true));
  
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [account])
  return { isVoter }
  
  }