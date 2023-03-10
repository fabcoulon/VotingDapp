import { useState,useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import useEth from "../../contexts/EthContext/useEth";

function InfoGetter({type}) {

const { state: { contract, accounts,web3 } } = useEth();
const workflowstep = useContext(VotingContext);

const [address,setAddress] = useState("");
const [proposal,setProposal] = useState("");

const getVoter = async () => {
    if (!web3.utils.isAddress(address)) {
        alert("invalid address")
    }

    const voter = await contract.methods.getVoter(address).call({ from: accounts[0] });
    alert(voter);
    setAddress("");
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
const value = web3.utils.toBN(parseInt(proposal));
const vote = await contract.methods.getOneProposal(value).call({ from: accounts[0] });
    alert(vote);
setProposal("");
};

  return (
        (type === "voter") ?(
            workflowstep > 0 ? (<div>      
            <input type="text" placeholder="address" value={address} onChange={handleAddressChange}/>
            <button onClick={getVoter} >
            get voter
            </button>    
        </div>) : <></>
        ):
        ( 
        workflowstep > 2 ? (<div>
            <input type="text" placeholder="Proposal" value={proposal} onChange={handleProposalChange}/>
            <button onClick={getOneProposal} >
            get one propoal
            </button>
        </div>) : <></>     
        )
    )
}

export default InfoGetter;