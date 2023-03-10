import useEth from "../../contexts/EthContext/useEth";
import { useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import {UseIsOwner} from "../../hooks/UseIsOwner";

function StepButton(){

const { state: { contract, accounts } } = useEth();
const {setWorkflowStatus,workflowstep,isOwner} = useContext(VotingContext);

UseIsOwner(accounts[0]);

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
setWorkflowStatus("Voting session ended");
};

switch (parseInt(workflowstep)) {
        case 0:
            return isOwner&&<button onClick={startProposalsRegistering}>startProposalsRegistering()</button>;
        case 1:
            return isOwner&&<button onClick={endProposalsRegistering}>endProposalsRegistering()</button>;
        case 2:
            return isOwner&&<button onClick={startVotingSession}>startVotingSession()</button>;
        case 3:
            return isOwner&&<button onClick={endVotingSession}>endVotingSession()</button>;
        case 4:
            return isOwner&&<button onClick={tallyVotes}>tallyVotes()</button>;
        default:
            return <p>Votes ended</p>;
        }
}

export default StepButton;