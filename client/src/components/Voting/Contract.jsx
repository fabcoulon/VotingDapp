import { UseWorkflowStep } from "../../hooks/UseWorkflowStep";
import { UseWorkflowStatus } from "../../hooks/UseWorkflowStatus";

function Contract() {

const { workflowstep } = UseWorkflowStep();
const {workflowStatus} = UseWorkflowStatus(workflowstep);

  return (
      <>
        <p>{workflowStatus}</p>
        <p></p>
      </>
  );
}

export default Contract;
