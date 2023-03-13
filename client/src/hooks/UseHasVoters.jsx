import { VotingContext } from '../contexts/VotingContext/VotingContext';
import useEth from '../contexts/EthContext/useEth';
import { useContext } from 'react';

const UseHasVoters = async () => {
const { state: { contract } } = useEth();
const {hasVoters,setHasVoters} = useContext(VotingContext);

  const options = {
    filter: {
      value: [],
    },
    fromBlock: 0,
  };

  contract.events.VoterRegistered(options).on("data",event => event.returnValues[0] && setHasVoters(true));

  return hasVoters;
}

export {UseHasVoters};