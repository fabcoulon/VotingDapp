import useEth from "../../contexts/EthContext/useEth";
import { useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import { useIsOwner } from "../../hooks/useIsOwner";
import { useWorkflowStep } from "../../hooks/useWorkflowStep";
import { useHasVoter } from "../../hooks/useHasVoter";
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
            return hasVoter && isOwner&&<button onClick={startProposalsRegistering}>start proposals registering</button>;
        case 1:
            return hasProposal && isOwner&&<button onClick={endProposalsRegistering}>End proposals registering</button>;
        case 2:
            return isOwner&&<button onClick={startVotingSession}>Start voting session</button>;
        case 3:
            return isOwner&&<button onClick={endVotingSession}>End voting session</button>;
        case 4:
            return isOwner&&<button onClick={tallyVotes}>Tally votes</button>;
        case 5:
            return <p>Votes ended</p>;
        default:
            return <p>Step unknow</p>;
        }
}

export default StepButton;