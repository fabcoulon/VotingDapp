import React, {useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Contract from "./Contract";
import ContractBtns from "./ContractBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import WorkflowStatus from "./WorkflowStatus";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";

function Voting() {
  const { state } = useEth();
  const [value, setValue] = useState("?");
  const [ workflowStatus, setWorkflowStatus ] = useState("Registering voters")

  const voting =
    <>
      <div className="contract-container">
      <VotingContext.Provider value={{workflowStatus,setWorkflowStatus}} >
        <Contract value={value} />
        <ContractBtns value={setValue} />
        <WorkflowStatus />
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
