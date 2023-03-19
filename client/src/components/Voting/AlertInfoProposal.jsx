import React from "react";
import { Button, Input, Text, AlertDialog, AlertDialogBody, AlertDialogHeader, 
        AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, AlertDialogFooter } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";
import { useIsProposal } from "../../hooks/useIsProposal";

function AlertInfoProposal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const { state: { contract, accounts,web3 } } = useEth();
    let [alertMessage,setAlertMessage] = useState("");

    const [proposal,setProposal] = useState("");
    const { isProposal } = useIsProposal(proposal);
    const handleProposalChange = e => {
        if (/^\d+$|^$/.test(e.target.value)) {
        setProposal(e.target.value);
        }
    };
    
    const getOneProposal = async () => {
        onOpen();
        if(!isProposal) {
            setAlertMessage("Proposal not found");
        } else {
            const value = web3.utils.toBN(parseInt(proposal));
            setAlertMessage((await contract.methods.getOneProposal(value).call({ from: accounts[0] }))[0]);
        }
        setProposal("");
    };
    
    return (
      <>
        <Input size="lg" borderWidth="1px" type="text" placeholder="Proposal" value={proposal} onChange={handleProposalChange}/>
        <Button mt="2rem" size="lg" onClick={getOneProposal} colorScheme='blue'>
            get one propoal
        </Button> 

        <AlertDialog
          motionPreset='slideInBottom'
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />
  
          <AlertDialogContent  bg="blue.500" color="white">
            <AlertDialogHeader>Proposal Informations : </AlertDialogHeader>
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
      </>
    )
  };

export default AlertInfoProposal;