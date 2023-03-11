// import { useContext } from "react";
// import { VotingContext } from "../../contexts/VotingContext/VotingContext";
// import VotingButton from "./VotingButton";

// function WorkflowStatus() {

//     const Status = () => {
//     let {setWorkflowStatus,value} = useContext(VotingContext);

//     switch(parseInt(value)){
//         case 0 : setWorkflowStatus("Registering voters");
//         break;
//         case 1 : setWorkflowStatus("Proposals registration started");
//         break;
//         case 2 : setWorkflowStatus("Proposals registration ended");
//         break;
//         case 3 : setWorkflowStatus("Voting session started");
//         break;
//         case 4 : setWorkflowStatus("Voting session ended");
//         break;
//         case 5 : setWorkflowStatus("Votes tallied");
//         break;
//         default: setWorkflowStatus("Step unknow");
//         }
//     }

//         return <VotingButton workfkowSatus = {Status} />
//     }

//     export default WorkflowStatus;