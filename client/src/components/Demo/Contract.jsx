import { useRef, useEffect } from "react";

function Contract({ value, workflowStatus }) {
  const spanEle = useRef(null);

  return (
    <code>
        <p>{value}</p>
        <p>{workflowStatus}</p>
    </code>
  );
}

export default Contract;
