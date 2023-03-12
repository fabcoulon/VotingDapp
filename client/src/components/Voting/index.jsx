import React, {useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Contract from "./Contract";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import VotingButton from "./WorkflowStatus";
import Address from "./Address";
import StepButton from "./StepButton";
import VotingInput from "./VotingInput";
import InfoGetter from "../InfoGetter";

function Voting() {
  const { state } = useEth();
  const [ workflowStatus, setWorkflowStatus ] = useState("Registering voters");
  const [value,setValue] = useState(0);
  const [proposal, setProposal] = useState("");
  const [voterAddress, setVoterAddress] = useState("");
  const [vote, changeVote] = useState("");
  const [owner, setOwner] = useState("");
  const voting =
    <>
      <div className="contract-container">
      <div>
      <InfoGetter type="voter"/>
      <InfoGetter type="proposal"/>
      </div>
      <div>
      <VotingContext.Provider value={{workflowStatus,setWorkflowStatus,value,setValue,proposal,setProposal,voterAddress,setVoterAddress,vote,changeVote,setOwner,owner}} >
        <Contract/>
        <StepButton />
        <Address />
        <VotingButton />
        <VotingInput />
      </VotingContext.Provider>
      </div>
      </div>
    </>;

  return (
    <div className="voting">
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
          voting
      }
    </div>
  );
}

export default Voting;
