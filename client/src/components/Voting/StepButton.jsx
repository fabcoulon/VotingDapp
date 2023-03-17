import useEth from "../../contexts/EthContext/useEth";
import { useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import { UseIsOwner } from "../../hooks/UseIsOwner";
import { UseWorkflowStep } from "../../hooks/UseWorkflowStep";
import { UseHasVoter } from "../../hooks/UseHasVoter";
import { UseHasProposal } from "../../hooks/UseHasProposal";
import { Button } from '@chakra-ui/react'

function StepButton(){

const { state: { contract, accounts } } = useEth();
const { setWorkflowStatus,proposal,voterAddress } = useContext(VotingContext);

const { workflowstep} = UseWorkflowStep();
const { isOwner } = UseIsOwner(accounts[0]);
const { hasVoter } = UseHasVoter(voterAddress);
const { hasProposal } = UseHasProposal(proposal);

const startProposalsRegistering = async () => {
await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
setWorkflowStatus("Proposals registration started");
};

const endProposalsRegistering = async () => {
await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
setWorkflowStatus("Proposals registration ended");
};

const startVotingSession = async () => {
await contract.methods.startVotingSession().send({ from: accounts[0] });
setWorkflowStatus("Voting session started");
};

const endVotingSession = async () => {
await contract.methods.endVotingSession().send({ from: accounts[0] });
setWorkflowStatus("Voting session ended");
};

const tallyVotes = async () => {
await contract.methods.tallyVotes().send({ from: accounts[0] });
setWorkflowStatus("Votes tallied");
};

switch (parseInt(workflowstep)) {
        case 0:
            return hasVoter && isOwner&&<Button colorScheme='blue' onClick={startProposalsRegistering}>startProposalsRegistering()</Button>;
        case 1:
            return hasProposal && isOwner&&<Button colorScheme='blue' onClick={endProposalsRegistering}>endProposalsRegistering()</Button>;
        case 2:
            return isOwner&&<Button colorScheme='blue' onClick={startVotingSession}>startVotingSession()</Button>;
        case 3:
            return isOwner&&<Button colorScheme='blue' onClick={endVotingSession}>endVotingSession()</Button>;
        case 4:
            return isOwner&&<Button colorScheme='blue' onClick={tallyVotes}>tallyVotes()</Button>;
        case 5:
            return <p>Votes ended</p>;
        default:
            return <p>Step unknow</p>;
        }
}

export default StepButton;