import React from "react";
import { Button, Input, AlertDialog, AlertDialogBody, AlertDialogHeader, 
        AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, AlertDialogFooter } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { UseIsVoter } from "../../hooks/UseIsVoter";
import useEth from "../../contexts/EthContext/useEth";
import { useState } from "react";


function AlertInfoVoter() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [address,setAddress] = useState("");
    const {isVoter} =  UseIsVoter(address);
    const { state: { contract, accounts,web3 } } = useEth();
    let [alertMessage,setAlertMessage] = useState("");

    const handleAddressChange = e => {
      setAddress(e.target.value);
    };

    const getVoter = async (e) => {
      onOpen();
      setAlertMessage("");
      alertMessage="";

      alert(await contract.methods.getVoter(address).call({ from: accounts[0] }));
      
      if (!web3.utils.isAddress(address)) {
        //alertMessage = "The address is Invalid. ";
        setAlertMessage("The address is Invalid. ");
      }
      if(!isVoter)
      {
        //alertMessage +="The voter does not exists.";
        setAlertMessage("The voter does not exists.");
      }
      //alert(alertMessage.length);
      if (alertMessage.length === 0) { 
        //alertMessage = await contract.methods.getVoter(address).call({ from: accounts[0] }).toString();
        setAlertMessage(await contract.methods.getVoter(address).call({ from: accounts[0] }).toString());
      }
      
      const response = await fetch(contract.methods.getVoter(address).call({ from: accounts[0] }));
      const data = await response.json();
      setAlertMessage(data);
      //alert(await contract.methods.getVoter(address).call({ from: accounts[0] }));

      //setAlertMessage(alertMessage);
  };
  
    return (
      <>
        <Input size="lg" borderWidth="1px" type="text" placeholder="address" value={address} onChange={handleAddressChange}/>
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
            {alertMessage}
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