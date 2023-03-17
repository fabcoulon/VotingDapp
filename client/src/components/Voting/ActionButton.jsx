import useEth from "../../contexts/EthContext/useEth";
import { useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import { useIsOwner } from "../../hooks/useIsOwner";
import { useWorkflowStep } from "../../hooks/useWorkflowStep";
import { useIsVoter } from "../../hooks/useIsVoter";
import { useHasVoted } from "../../hooks/useHasVoted";
import { useIsProposal } from "../../hooks/useIsProposal";

function ActionButton(){
    
const { state: { contract, accounts,web3 } } = useEth();
let {proposal,setProposal,voterAddress,setVoterAddress,vote} = useContext(VotingContext);

const { isOwner } = useIsOwner(accounts[0]);

const { workflowstep } = useWorkflowStep();
const {isVoter} = useIsVoter(voterAddress);
const {hasVoted} = useHasVoted(accounts[0]);
const {isProposal} = useIsProposal(vote);

const addVoter = async () => {

  if (!web3.utils.isAddress(voterAddress)) {
    return alert("invalid address")
  }

  if(isVoter) {
    return alert("Voter already registred");
  }

  await contract.methods.addVoter(voterAddress).send({ from: accounts[0] });
  alert(`Voter ${voterAddress} is regitrated`);
  setVoterAddress("");
};

  const addProposal = async () => {
    if (proposal === "") {
      return alert("No empty proposal please.");

    }
     if (!isVoter) {
      return alert("You are not registred as voter.");

    }
    await contract.methods.addProposal(proposal).send({ from: accounts[0] });
    alert(`Proposal ${proposal} is registred`);
    setProposal("");
  };

  const setVote = async () => {
    if (!isVoter) {
      return alert("You are not registred as voter.");

    }

    if(hasVoted){
      return alert("You have already voted");

    }
    else if(!isProposal) {
      return alert("Proposal not found");
    } 
  const value = web3.utils.toBN(parseInt(vote));
    await contract.methods.setVote(value).send({ from: accounts[0] });
    alert(`${accounts[0]} has just voted for proposal ${proposal}`);
  };

switch (parseInt(workflowstep)) {
        case 0:
            return isOwner&&<button onClick={addVoter} >Add voter</button>
        case 1:
            return isOwner ? <button onClick={addProposal} >Add proposal</button> 
            : isVoter ? <button onClick={addProposal} >Add proposal</button> : <></>                 
        case 3:
            return isVoter&&<button onClick={setVote} >Vote for proposal</button>
        default:
        }
}

export default ActionButton;