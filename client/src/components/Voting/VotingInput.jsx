import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function VotingInput({refreshBalance}) {
  const { state: { contract, accounts, web3 } } = useEth();
  const [proposal, setProposal] = useState("");
  const [voterAddress, setVoterAddress] = useState("");
  const [vote, changeVote] = useState("");

  const handleProposalChange = e => {
    setProposal(e.target.value);
  };

  const handleAddressChange = e => {
    setVoterAddress(e.target.value);
  };

  const handleVoteChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      changeVote(e.target.value);
    }
  };

  const addVoter = async () => {
    if (!web3.utils.isAddress(voterAddress)) {
      alert("invalid address")
    }
    // const value = web3.utils.toBN(parseInt(inputValue) * 10 ** 18);
    await contract.methods.addVoter(voterAddress).send({ from: accounts[0] });
    setVoterAddress("");
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

  const getVoter = async () => {
    if (!web3.utils.isAddress(voterAddress)) {
      alert("invalid address")
    }
    const voter = await contract.methods.getVoter(voterAddress).call({ from: accounts[0] });
    alert(voter);
    setVoterAddress("");
  };

  const getOneProposal = async () => {
    const value = web3.utils.toBN(parseInt(vote));
      const proposal = await contract.methods.getOneProposal(value).call({ from: accounts[0] });
      alert(proposal)
      changeVote("");
    };

  return (
    <div>
      <div>
      <input
        type="text"
        placeholder="address"
        value={voterAddress}
        onChange={handleAddressChange}
      />
      </div>
      <div>
      <input
        type="text"
        placeholder="Proposal"
        value={proposal}
        onChange={handleProposalChange}
      />
      </div>
      <div>
      <input
        type="text"
        placeholder="proposal id"
        value={vote}
        onChange={handleVoteChange}
      />
      </div>
      <button onClick={addVoter} >
        Add voter
      </button>     
      <div>
      <button onClick={addProposal} >
        Add proposal
      </button>
      </div>
      <div>
      <button onClick={setVote} >
        Vote for proposal
      </button>
      </div>
      <div>
      <button onClick={getVoter} >
        get voter
      </button>    
      </div>
      <div>
      <button onClick={getOneProposal} >
        get one propoal
      </button>
      </div>
    </div>
  );
}

export default VotingInput;