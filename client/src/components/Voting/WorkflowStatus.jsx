import { useEffect,useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import { UseWorkflowStep } from "../../hooks/UseWorkflowStep";

function WorkflowStatus() {

let {setWorkflowStatus,workflowStatus} = useContext(VotingContext);

const { workflowstep } = UseWorkflowStep(workflowStatus);
  
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