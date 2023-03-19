import { useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import useEth from "../../contexts/EthContext/useEth";
import { useIsOwner } from "../../hooks/useIsOwner";
import { useWorkflowStep } from "../../hooks/useWorkflowStep";
import { useIsVoter } from "../../hooks/useIsVoter";
import SelectProposal from "./SelectProposal";
import { Input } from '@chakra-ui/react'

function ActionInput(){
    
let {proposal,setProposal,voterAddress,setVoterAddress} = useContext(VotingContext);

const { state: {accounts } } = useEth();

const { isOwner } = useIsOwner(accounts[0]);

const { workflowstep } = useWorkflowStep();
const {isVoter} = useIsVoter(accounts[0]);

const handleProposalChange = e => {
  setProposal(e.target.value);
};

const handleAddressChange = e => {
  setVoterAddress(e.target.value);
};

switch (parseInt(workflowstep)) {
        case 0:
            return isOwner&&<Input size="lg" w="md" borderWidth="1px" type="text" placeholder="address" value={voterAddress} onChange={handleAddressChange}/> 
        case 1:
            return  isOwner ? <Input type="text" size="lg" w="md" borderWidth="1px" placeholder="Proposal" value={proposal} onChange={handleProposalChange}/> 
            : isVoter ? <Input type="text" size="lg" w="md" borderWidth="1px" placeholder="Proposal" value={proposal} onChange={handleProposalChange}/> : <></>    
        case 3:
            return isVoter&& <SelectProposal />
        default:
        }
}

export default ActionInput;