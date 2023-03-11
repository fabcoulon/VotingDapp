import { useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";

function Contract({ value }) {
const {workflowStatus} = useContext(VotingContext);

  return (
      <p>{workflowStatus}</p>
  );
}

export default Contract;
