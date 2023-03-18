import React from "react";
import { Button, Input, Text, AlertDialog, AlertDialogBody, AlertDialogHeader, 
        AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, AlertDialogFooter } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useIsVoter } from "../../hooks/useIsVoter";
import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";


function AlertInfoVoter() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [address,setAddress] = useState("");
    const {isVoter} =  useIsVoter(address);
    const { state: { contract, accounts,web3 } } = useEth();
    let [alertMessage,setAlertMessage] = useState("");

    const handleAddressChange = e => {
      setAddress(e.target.value);
    };

    const getVoter = async (e) => {
      onOpen();
      /*if (alertMessage.length === 0) { 
        setAlertMessage("The input is empty");
      } */
       if (!(await web3.utils.isAddress(address))) {
        setAlertMessage("The address is Invalid. ");
      } else if (!isVoter) {
        setAlertMessage("The voter does not exists.");
      } else {
        contract.methods.getVoter(address).call({ from: accounts[0] })
          .then(function(voter) {
            //setAlertMessage(voter);
            setAlertMessage(" isRegistered : "+voter.isRegistered+"\n hasVoted : "+voter.hasVoted
                            + "\n\r votedProposalId : "+voter.votedProposalId);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
  };
    return (
      <>
        <Input size="lg" borderWidth="1px" type="text" placeholder="address" value={address} onInput={handleAddressChange} />
        <Button onClick={getVoter} colorScheme='blue'>
          get voter
        </Button> 

        <AlertDialog
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>Voter Informations : </AlertDialogHeader>
            <AlertDialogCloseButton />
            <AlertDialogBody>
              <Text>
              {alertMessage}
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    )
  };

export default AlertInfoVoter;