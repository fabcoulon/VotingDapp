import useEth from "../../contexts/EthContext/useEth";
import { useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";

function ActionButton(){
    
const { state: { contract, accounts,web3 } } = useEth();
let {value,proposal,setProposal,voterAddress,setVoterAddress,vote,changeVote} = useContext(VotingContext);

const addVoter = async () => {
    if (!web3.utils.isAddress(voterAddress)) {
      alert("invalid address")
    }
    await contract.methods.addVoter(voterAddress).send({ from: accounts[0] });
    setVoterAddress("");
  };

  const addProposal = async () => {
    await contract.methods.addProposal(proposal).send({ from: accounts[0] });
    setProposal("");
  };

  const setVote = async () => {
  const value = web3.utils.toBN(parseInt(vote));
    await contract.methods.setVote(value).send({ from: accounts[0] });
    changeVote("");
  };

switch (parseInt(value)) {
        case 0:
            return <button onClick={addVoter} >Add voter</button>
        case 1:
            return <button onClick={addProposal} >Add proposal</button>
        case 3:
            return <button onClick={setVote} >Vote for proposal</button>
        default:
        }
}

export default ActionButton;