import useEth from "../../contexts/EthContext/useEth";
import { useState, useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import { useWorkflowStep } from "../../hooks/useWorkflowStep";
import { useHasVoter } from "../../hooks/useHasVoter";
import { useHasProposal } from "../../hooks/useHasProposal";
import { useIsProposal } from "../../hooks/useIsProposal";
import { useIsVoter } from "../../hooks/useIsVoter";

function InfoGetter({type}) {

const { state: { contract, accounts,web3 } } = useEth();
const {voterAddress} =  useContext(VotingContext);

const [address,setAddress] = useState("");
const [proposal,setProposal] = useState("");

const { workflowstep } = useWorkflowStep();
const { hasVoter } = useHasVoter(voterAddress);
const { hasProposal } = useHasProposal(proposal);
const { isProposal } = useIsProposal(proposal);
const {isVoter} =  useIsVoter(accounts[0]);

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
            (hasVoter && isVoter) ? (<div>      
            <input type="text" placeholder="address" value={address} onChange={handleAddressChange}/>
            <button onClick={getVoter} >
            get voter
            </button>    
        </div>) : <></>
        ):
        ( 
        workflowstep && workflowstep > 0 && hasProposal && isVoter ? (<div>
            <input type="text" placeholder="Proposal" value={proposal} onChange={handleProposalChange}/>
            <button onClick={getOneProposal} >
            get one propoal
            </button>
        </div>) : <></>     
        )
    )
}

export default InfoGetter;