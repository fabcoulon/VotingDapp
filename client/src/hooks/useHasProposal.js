import useEth from '../contexts/EthContext/useEth';
import { useState, useEffect } from 'react';

export function useHasProposal(proposal) {

  const { state: { contract,web3,txhash } } = useEth();
  const [hasProposal,setHasProposal] = useState(false);

  useEffect(() => {
  
  async function fetchData() { 
    setHasProposal(false);
    const deployTx = await web3.eth.getTransaction(txhash);
    contract.events.ProposalRegistered({fromBlock:deployTx.blockNumber , toBlock: "latest"}).on("data",event => (event.returnValues[0]) && setHasProposal(true));
  }
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposal])
  return { hasProposal }
  
  }