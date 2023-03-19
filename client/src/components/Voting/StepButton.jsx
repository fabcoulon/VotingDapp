import useEth from "../../contexts/EthContext/useEth";
import { useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import { Button } from '@chakra-ui/react'
import { useIsOwner } from "../../hooks/useIsOwner";
import { useWorkflowStep } from "../../hooks/useWorkflowStep";
import { useHasVoter } from "../../hooks/useHasVoter";
import { VotesEnded } from "./VotesEnded";
import { useHasProposal } from "../../hooks/useHasProposal";

function StepButton(){

const { state: { contract, accounts } } = useEth();
const { setWorkflowStatus,proposal,voterAddress } = useContext(VotingContext);

const { workflowstep} = useWorkflowStep();
const { isOwner } = useIsOwner(accounts[0]);
const { hasVoter } = useHasVoter(voterAddress);
const { hasProposal } = useHasProposal(proposal);
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
            return hasVoter && isOwner&&<Button size="lg" colorScheme='blue' onClick={startProposalsRegistering}>Start proposals registering</Button>;
        case 1:
            return hasProposal && isOwner&&<Button size="lg" colorScheme='blue' onClick={endProposalsRegistering}>End proposals registering</Button>;
        case 2:
            return isOwner&&<Button size="lg" colorScheme='blue' onClick={startVotingSession}>Start voting session</Button>;
        case 3:
            return isOwner&&<Button size="lg" colorScheme='blue' onClick={endVotingSession}>End voting session</Button>;
        case 4:
            return isOwner&&<Button size="lg" colorScheme='blue' onClick={tallyVotes}>Tally votes</Button>;
        case 5:
            return <VotesEnded />;
        default:
            return <p>Step unknow</p>;
        }
}

export default StepButton;