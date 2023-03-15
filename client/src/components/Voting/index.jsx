import React, {useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Display from "./Display";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import Address from "./Address";
import StepButton from "./StepButton";
import VotingInput from "./VotingInput";
import InfoGetter from "./InfoGetter";
import { Winner } from "../Winner";

function Voting() {
  const { state } = useEth();
  const [ workflowStatus, setWorkflowStatus ] = useState("Registering voters");
  const [proposal, setProposal] = useState("");
  const [voterAddress, setVoterAddress] = useState("");
  const [vote, changeVote] = useState("");
  const voting =
    <>
      <div className="contract-container">
      <div>
      <VotingContext.Provider value={{workflowStatus,setWorkflowStatus,proposal,setProposal,voterAddress,setVoterAddress,vote,changeVote}} >
        <div>
        <InfoGetter type="voter"/>
        <InfoGetter type="proposal"/>
        </div>
        <Display/>
        <Winner/>
        <StepButton />
        <Address />
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
