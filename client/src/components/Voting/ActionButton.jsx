import useEth from "../../contexts/EthContext/useEth";
import { useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import { useIsOwner } from "../../hooks/useIsOwner";
import { useWorkflowStep } from "../../hooks/useWorkflowStep";
import { useIsVoter } from "../../hooks/useIsVoter";
import { useHasVoted } from "../../hooks/useHasVoted";
import { useIsProposal } from "../../hooks/useIsProposal";
import { Button } from '@chakra-ui/react'

import { useIamVoter } from "../../hooks/useIamVoter";
import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { Text, AlertDialog, AlertDialogBody, AlertDialogHeader, 
  AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, AlertDialogFooter } from "@chakra-ui/react";


function ActionButton(){
    
const { state: { contract, accounts,web3 } } = useEth();
let {proposal,setProposal,voterAddress,setVoterAddress,vote} = useContext(VotingContext);

const { isOwner } = useIsOwner(accounts[0]);

const { workflowstep } = useWorkflowStep();
const {isVoter} = useIsVoter(voterAddress);

const { isOpen, onOpen, onClose } = useDisclosure();
const cancelRef = React.useRef();
const {IamVoter} = useIamVoter(accounts[0]);
let [alertMessage,setAlertMessage] = useState("");

const {hasVoted} = useHasVoted(accounts[0]);
const {isProposal} = useIsProposal(vote);

const addVoter = async () => {
  setAlertMessage("");
  if (!web3.utils.isAddress(voterAddress)) {
    onOpen();
    return setAlertMessage("invalid address");
  }

  if(isVoter) {
    onOpen();
    return setAlertMessage("Voter already registred");
  }
  await contract.methods.addVoter(voterAddress).send({ from: accounts[0] });
  onOpen();
  setAlertMessage("Voter "+voterAddress+" is regitrated");
  setVoterAddress("");
};

  const addProposal = async () => {
    setAlertMessage("");
    if (proposal === "") {
      onOpen();
      return setAlertMessage("No empty proposal please.");

    }
    if (!IamVoter) {
      onOpen();
      return setAlertMessage("You are not registred as voter.");

    }
    await contract.methods.addProposal(proposal).send({ from: accounts[0] });
    onOpen();
    setAlertMessage("Proposal "+proposal+" is regitrated");
    setProposal("");
  };

  const setVote = async () => {
    setAlertMessage("");

    if (!IamVoter) {
      onOpen();
      return setAlertMessage("You are not registred as voter.");
    }

    if(hasVoted){
      onOpen();
      return setAlertMessage("You have already voted");

    }
    else if(!isProposal) {
      onOpen();
      return setAlertMessage("Proposal not found");
    } 
  const value = web3.utils.toBN(parseInt(vote));
  await contract.methods.setVote(value).send({ from: accounts[0] });
  onOpen();
  setAlertMessage(accounts[0]+" has just voted for proposal "+value);
  };


  return (
    <>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent  bg="blue.500" color="white">
          <AlertDialogHeader>Message : </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <Text fontSize='4xl'>
              {alertMessage}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} color="black">
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {
        (() => {
        switch (parseInt(workflowstep)) {
          case 0:
              return isOwner&&<Button size="lg" onClick={addVoter} colorScheme='blue'>Add voter</Button>          
          case 1:
            return IamVoter &&<Button size="lg" onClick={addProposal} colorScheme='blue'>Add proposal</Button>             
          case 3:
            return IamVoter&&<Button size="lg" onClick={setVote} colorScheme='blue'>Vote for proposal</Button>
          default:
          }
        })()
      }
    </>
  )
}

export default ActionButton;