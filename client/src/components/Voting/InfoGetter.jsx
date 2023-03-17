//import useEth from "../../contexts/EthContext/useEth";
import React, { useState, useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import { UseWorkflowStep } from "../../hooks/UseWorkflowStep";
import { UseHasVoter } from "../../hooks/UseHasVoter";
import { UseHasProposal } from "../../hooks/UseHasProposal";
//import { UseIsProposal } from "../../hooks/UseIsProposal";
//import { UseIsVoter } from "../../hooks/UseIsVoter";
import { Box, Text } from "@chakra-ui/react";
import { InfoIcon, ViewIcon } from '@chakra-ui/icons'
import AlertInfoVoter from "./AlertInfoVoter";
import AlertInfoProposal from "./AlertInfoProposal";

function InfoGetter({type}) {

//const { state: { contract, accounts,web3 } } = useEth();
const {voterAddress} =  useContext(VotingContext);

//const [address,setAddress] = useState("");
//const [proposal,setProposal] = useState("");
const {proposal} = useState("");

const { workflowstep } = UseWorkflowStep();
const { hasVoter } = UseHasVoter(voterAddress);
const { hasProposal } = UseHasProposal(proposal);
//const { isProposal } = UseIsProposal(proposal);
//const {isVoter} =  UseIsVoter(address);

/*
const getVoter = async (e) => {

    if (!web3.utils.isAddress(address)) {
        alert("invalid address")
    }
    if(!isVoter)
    {
        alert("Voter does not exists");
    }
    alert(await contract.methods.getVoter(address).call({ from: accounts[0] }));
};*/


/*
const handleProposalChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
    setProposal(e.target.value);
    }
};

const getOneProposal = async () => {

    if(!isProposal) {
    alert("Proposal not found");
    return setProposal("");
    } 
    const value = web3.utils.toBN(parseInt(proposal));
    alert(await contract.methods.getOneProposal(value).call({ from: accounts[0] }));
    setProposal("");
};*/

  return (
        (type === "voter") ?(
            (hasVoter) ? (<div>   
            <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" align="center">
                <InfoIcon w={50} h={50} color="blue.500" />

                <Box p="6">
                    <Text fontWeight="bold" fontSize="2xl">
                    Get the voter informations
                    </Text>
                    <AlertInfoVoter />
                </Box>
            </Box>
        </div>) : <></>
        ):
        ( 
        workflowstep && workflowstep > 0 && hasProposal ? (<div>
             <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" align="center">
                <ViewIcon w={50} h={50} color="blue.500" />

                <Box p="6">
                    <Text fontWeight="bold" fontSize="2xl">
                    Get the proposal informations
                    </Text>
                    <AlertInfoProposal />
                </Box>
            </Box>



        </div>) : <></>     
        )
    )
}

export default InfoGetter;