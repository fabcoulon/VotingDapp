import { useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";

function Contract({ value }) {
const {workflowStatus} = useContext(VotingContext);

  return (
    <code>
        <p>{value}</p>
        <p>{workflowStatus}</p>
    </code>
  );
}

export default Contract;
