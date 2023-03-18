import { useState, useEffect,useContext } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { useHasProposal } from "../../hooks/useHasProposal";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import { Select } from '@chakra-ui/react'

function SelectProposal() {
    const { state: { contract,accounts } } = useEth();
    const [proposalEvents, setProposalEvents] = useState([]);
    let {changeVote} = useContext(VotingContext);
    const {hasProposal} = useHasProposal();

    const handleVoteChange = e => {
        changeVote(e.target.value);
    };

    useEffect(() => {
        async function getPastEvent() {
            if (contract) 
            {
                const results = await contract.getPastEvents("ProposalRegistered", { fromBlock:0 , toBlock: "latest" });
                const Proposals = await Promise.all(results.map(async(proposal) => {
                    let event = {proposalId:null,proposal:null};
                    event.proposalId = proposal.returnValues.proposalId;
                    const arr = await contract.methods.getOneProposal(event.proposalId).call({ from: accounts[0] });
                    event.proposal = arr[0];
                    return event;
                }));
                setProposalEvents(Proposals);
            }
        }
    getPastEvent();
  });

  return (
    hasProposal&&<div id="selectContainer">

        <Select name="proposals" id="proposals" onChange={ handleVoteChange }>
        <option value=""> Please choose an proposal
        </option>
            {proposalEvents.map((event, index) => {
                    return (
                    <option key={index} value={event.proposalId}>{event.proposal}</option>
                    )
                })}
        </Select>
    </div>
  );
}

export default SelectProposal;