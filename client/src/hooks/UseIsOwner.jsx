import { VotingContext } from '../contexts/VotingContext/VotingContext';
import useEth from '../contexts/EthContext/useEth';
import { useContext } from 'react';

const UseIsOwner = async (account) => {

  const {owner,setOwner,setIsOwner,isOwner} = useContext(VotingContext);
  const { state: { contract } } = useEth();

  setOwner(await contract.methods.owner().call());

  setIsOwner(owner === account);

  return isOwner;
}

export {UseIsOwner}