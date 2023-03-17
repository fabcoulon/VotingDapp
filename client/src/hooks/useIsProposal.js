import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';

export function useIsProposal(vote) {

  const { state: { contract,web3,txhash } } = useEth();
  const [isProposal, setIsProposal] = useState(false);

  useEffect(() => {
  
    setIsProposal(false);
    async function fetchData() { 
  
    const deployTx = await web3.eth.getTransaction(txhash);
    contract.events.ProposalRegistered({fromBlock:deployTx.blockNumber , toBlock: "latest"}).on("data",event => (event.returnValues[0] === vote) && setIsProposal(true));
  
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vote])
  return { isProposal }
  
  }