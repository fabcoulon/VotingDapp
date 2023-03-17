import { useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import useEth from "../../contexts/EthContext/useEth";
import { UseIsOwner } from "../../hooks/UseIsOwner";
import { UseWorkflowStep } from "../../hooks/UseWorkflowStep";
import { UseIsVoter } from "../../hooks/UseIsVoter";
import SelectProposal from "./SelectProposal";

function ActionInput(){
    
let {proposal,setProposal,voterAddress,setVoterAddress} = useContext(VotingContext);

const { state: {accounts } } = useEth();

const { isOwner } = UseIsOwner(accounts[0]);

const { workflowstep } = UseWorkflowStep();
const {isVoter} = UseIsVoter(accounts[0]);

const handleProposalChange = e => {
  setProposal(e.target.value);
};

const handleAddressChange = e => {
  setVoterAddress(e.target.value);
};

switch (parseInt(workflowstep)) {
        case 0:
            return isOwner&&<input type="text" placeholder="address" value={voterAddress} onChange={handleAddressChange}/> 
        case 1:
            return  isOwner ? <input type="text" placeholder="Proposal" value={proposal} onChange={handleProposalChange}/> 
            : isVoter ? <input type="text" placeholder="Proposal" value={proposal} onChange={handleProposalChange}/> : <></>    
        case 3:
            return isVoter&& <SelectProposal />
        default:
        }
}

export default ActionInput;