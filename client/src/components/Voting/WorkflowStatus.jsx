import { useEffect,useContext } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";

function WorkflowStatus() {
const { state: { contract } } = useEth();

let {setWorkflowStatus,workflowstep,setWorkflowStep} = useContext(VotingContext);

useEffect(() => {
async function getValue() {
    setWorkflowStep(await contract.methods.workflowStatus().call());
  }
  getValue();
  },[contract.methods,setWorkflowStep]);
  
useEffect(() => {

async function getworkflowStatus() {
    switch(parseInt(workflowstep)){
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
        
    }
    getworkflowStatus();
    },[workflowstep,setWorkflowStatus]);
}

export default WorkflowStatus;