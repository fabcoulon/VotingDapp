import { useEffect,useContext } from "react";
import useEth from "../../contexts/EthContext/useEth";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import Button from "./Button";

function VotingButton() {
const { state: { contract } } = useEth();

let {setWorkflowStatus,value,setValue} = useContext(VotingContext);

useEffect(() => {

async function getValue() {
    setValue(await contract.methods.workflowStatus().call());
  }
  getValue();
  },[contract.methods,setValue]);
  
useEffect(() => {

async function getworkflowStatus() {
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
        
    }
    getworkflowStatus();
    },[value,setWorkflowStatus]);


    return < Button />
}

export default VotingButton;