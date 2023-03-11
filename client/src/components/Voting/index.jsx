import React, {useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Contract from "./Contract";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import VotingButton from "./VotingButton";
import Address from "./Address";
import VotingInput from "./VotingInput";

function Voting() {
  const { state } = useEth();
  const [ workflowStatus, setWorkflowStatus ] = useState("Registering voters");
  const [value,setValue] = useState(0);

  const voting =
    <>
      <div className="contract-container">
      <VotingContext.Provider value={{workflowStatus,setWorkflowStatus,value,setValue }} >
        <Contract/>
        <VotingButton />
        <Address />
        <VotingInput />
      </VotingContext.Provider>
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
