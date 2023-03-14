import useEth from "../../contexts/EthContext/useEth";
import { useEffect, useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import { UseIsOwner } from "../../hooks/UseIsOwner";
import { UseWorkflowStep } from "../../hooks/UseWorkflowStep";

function ActionButton(){
    
const { state: { contract, accounts,web3 } } = useEth();
let {workflowStatus,proposal,setProposal,voterAddress,setVoterAddress,vote,changeVote,setIsRegistred,isRegistred} = useContext(VotingContext);

const { isOwner } = UseIsOwner(accounts[0]);

const { workflowstep } = UseWorkflowStep(workflowStatus);

useEffect(() => {

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

    setIsRegistred(false);
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
    await contract.methods.addProposal(proposal).send({ from: accounts[0] });
    setProposal("");
  };

  const setVote = async () => {
  const value = web3.utils.toBN(parseInt(vote));
    await contract.methods.setVote(value).send({ from: accounts[0] });
    changeVote("");
  };

switch (parseInt(workflowstep)) {
        case 0:
            return isOwner&&<button onClick={addVoter} >Add voter</button>
        case 1:
            return <button onClick={addProposal} >Add proposal</button>
        case 3:
            return <button onClick={setVote} >Vote for proposal</button>
        default:
        }
}

export default ActionButton;