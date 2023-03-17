import { useWorkflowStep } from "../../hooks/useWorkflowStep";
import { useWorkflowStatus } from "../../hooks/useWorkflowStatus";

function Display() {

const { workflowstep } = useWorkflowStep();
const {workflowStatus} = useWorkflowStatus(workflowstep);

  return (
      <>
        <p>{workflowStatus}</p>
        <p></p>
      </>
  );
}

export default Display;
