import useEth from "../../contexts/EthContext/useEth";
import { useState, useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import { UseWorkflowStep } from "../../hooks/UseWorkflowStep";
import { UseHasVoter } from "../../hooks/UseHasVoter";
import { UseHasProposal } from "../../hooks/UseHasProposal";
import { UseIsProposal } from "../../hooks/UseIsProposal";
import { UseIsVoter } from "../../hooks/UseIsVoter";

function InfoGetter({type}) {

const { state: { contract, accounts,web3 } } = useEth();
const {voterAddress} =  useContext(VotingContext);

const [address,setAddress] = useState("");
const [proposal,setProposal] = useState("");

const { workflowstep } = UseWorkflowStep();
const { hasVoter } = UseHasVoter(voterAddress);
const { hasProposal } = UseHasProposal(proposal);
const { isProposal } = UseIsProposal(proposal);
const {isVoter} =  UseIsVoter(address);

const getVoter = async (e) => {
    if (!web3.utils.isAddress(address)) {
        alert("invalid address")
    }
    if(!isVoter)
    {
        alert("Voter does not exists");
    }

    alert(await contract.methods.getVoter(address).call({ from: accounts[0] }));
};

const handleAddressChange = e => {
    setAddress(e.target.value);
};

const handleProposalChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
    setProposal(e.target.value);
    }
};

const getOneProposal = async () => {

    if(!isProposal) {
    alert("Proposal not found");
    return setProposal("");
    } 
    const value = web3.utils.toBN(parseInt(proposal));
    alert(await contract.methods.getOneProposal(value).call({ from: accounts[0] }));
    setProposal("");
};

  return (
        (type === "voter") ?(
            (hasVoter) ? (<div>      
            <input type="text" placeholder="address" value={address} onChange={handleAddressChange}/>
            <button onClick={getVoter} >
            get voter
            </button>    
        </div>) : <></>
        ):
        ( 
        workflowstep && workflowstep > 0 && hasProposal ? (<div>
            <input type="text" placeholder="Proposal" value={proposal} onChange={handleProposalChange}/>
            <button onClick={getOneProposal} >
            get one propoal
            </button>
        </div>) : <></>     
        )
    )
}

export default InfoGetter;