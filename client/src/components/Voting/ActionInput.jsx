import { useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";

function ActionInput(){
    
let {value,proposal,setProposal,voterAddress,setVoterAddress,vote,changeVote} = useContext(VotingContext);

const handleProposalChange = e => {
  setProposal(e.target.value);
};

const handleAddressChange = e => {
  setVoterAddress(e.target.value);
};

const handleVoteChange = e => {
  if (/^\d+$|^$/.test(e.target.value)) {
    changeVote(e.target.value);
  }
};

switch (parseInt(value)) {
        case 0:
            return <input type="text" placeholder="address" value={voterAddress} onChange={handleAddressChange}/> 
        case 1:
            return <input type="text" placeholder="Proposal" value={proposal} onChange={handleProposalChange}/>
        case 3:
            return <input type="text" placeholder="proposal id" value={vote} onChange={handleVoteChange}/>
        default:
        }
}

export default ActionInput;