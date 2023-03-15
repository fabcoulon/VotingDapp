import { useEffect, useState } from "react";
  
export function UseWorkflowStatus(workflowstep) {

const [workflowStatus,setWorkflowStatus] = useState(0);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[workflowstep]);

    return { workflowStatus }
}