import React, { useState } from "react";
import { Button, Input, Text, AlertDialog, AlertDialogBody, AlertDialogHeader, 
        AlertDialogContent, AlertDialogOverlay, AlertDialogFooter } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { useIsVoter } from "../../hooks/useIsVoter";
import useEth from "../../contexts/EthContext/useEth";

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
       if (!(await web3.utils.isAddress(address))) {
        setAlertMessage(`The address ${address} is Invalid. `);
        setAddress("");
      } else if (!isVoter) {
        setAlertMessage("The voter does not exists.");
      } else {
        contract.methods.getVoter(address).call({ from: accounts[0] })
          .then(function(voter) {
            setAlertMessage((voter.isRegistered && "This voter is registrated")
             +  (voter.hasVoted ? " and has voted for proposal " + voter.votedProposalId 
             : " but has not voted yet"));
             setAddress("");
          })
          .catch(function(error) {
            console.log(error);
          });
      }
  };
    return (
      <>
        <Input size="lg" borderWidth="1px" type="text" placeholder="address" value={address} onInput={handleAddressChange} />
        <Button size="lg" mt="2rem" onClick={getVoter} colorScheme='blue'>
          get voter
        </Button> 

        <AlertDialog
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
          size="6xl"
        >
          <AlertDialogOverlay />
          <AlertDialogContent bg="blue.500" color="white" >
            <AlertDialogHeader>Voter Informations : </AlertDialogHeader>
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
      </>
    )
  };

export default AlertInfoVoter;