import useEth from "../../contexts/EthContext/useEth";
import { useEffect, useContext, useState } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import { UseIsOwner } from "../../hooks/UseIsOwner";
import { UseWorkflowStep } from "../../hooks/UseWorkflowStep";
import { UseIsVoter } from "../../hooks/UseIsVoter";
import { UseHasVoted } from "../../hooks/UseHasVoted";
import { UseIsProposal } from "../../hooks/UseIsProposal";

function ActionButton(){
    
const { state: { contract, accounts,web3 } } = useEth();
let {proposal,setProposal,voterAddress,setVoterAddress,vote} = useContext(VotingContext);

const { isOwner } = UseIsOwner(accounts[0]);

const [isRegistred,setIsRegistred] = useState(false);

const { workflowstep } = UseWorkflowStep();
const {isVoter} = UseIsVoter(accounts[0]);
const {hasVoted} = UseHasVoted(accounts[0]);
const {isProposal} = UseIsProposal(vote);

useEffect(() => {

  setIsRegistred(false);
  const options = {
    filter: {
      value: [],
    },
    fromBlock: 0,
  };

  contract.events.VoterRegistered(options).on("data",event => (event.returnValues[0] === voterAddress) && setIsRegistred(true));

// eslint-disable-next-line react-hooks/exhaustive-deps
}, [voterAddress]);

  const addVoter = async () => {

    setVoterAddress("");

    if (!web3.utils.isAddress(voterAddress)) {
      return alert("invalid address")
    }

    if(isRegistred) {
      return alert("Voter already registred");
    }

    await contract.methods.addVoter(voterAddress).send({ from: accounts[0] });

  };

  const addProposal = async () => {
    if (proposal === "") {
      return alert("No empty proposal please.");

    }
    await contract.methods.addProposal(proposal).send({ from: accounts[0] });
    setProposal("");
  };

  const setVote = async () => {
    if(hasVoted){
      return alert("You have already voted");

    }
    else if(!isProposal) {
      return alert("Proposal not found");
    } 
  const value = web3.utils.toBN(parseInt(vote));
    await contract.methods.setVote(value).send({ from: accounts[0] });
  };

switch (parseInt(workflowstep)) {
        case 0:
            return isOwner&&<button onClick={addVoter} >Add voter</button>
        case 1:
            return isVoter&&<button onClick={addProposal} >Add proposal</button>
        case 3:
            return <button onClick={setVote} >Vote for proposal</button>
        default:
        }
}

export default ActionButton;