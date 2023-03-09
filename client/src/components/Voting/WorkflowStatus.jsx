import useEth from "../../contexts/EthContext/useEth";
import React, {useContext,useEffect,useCallback} from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";

  function WorkflowStatus() {
  const { state: { contract, accounts } } = useEth();
  const {setWorkflowStatus} = useContext(VotingContext);

  const readStatus = useCallback( async () => {
    try {
      const value = await contract.methods.workflowStatus().call();
      switch(parseInt(value)){
        case 0 : setWorkflowStatus("Registering voters");
          break;
        case 1 : setWorkflowStatus("Proposals registration started");
          break;
        case 2 : setWorkflowStatus("Proposals registration ended");
          break;
        case 3 : setWorkflowStatus("Voting session started");
          break;
        case 4 : setWorkflowStatus("Voting session ended");
          break;
        case 5 : setWorkflowStatus("Votes tallied");
          break;
          default: setWorkflowStatus("Step unknow");
      }
    } catch (err) {
      console.error(err);
    }
  },[contract.methods,setWorkflowStatus]);

  useEffect(() => {
    readStatus();
  },[readStatus]);

  const startProposalsRegistering = async () => {
    await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
    readStatus();
  };
  
  return (
    <div className="btns">
  
      <button onClick={startProposalsRegistering}>
      startProposalsRegistering()
      </button>
  
    </div>
  );

}

export default WorkflowStatus;
