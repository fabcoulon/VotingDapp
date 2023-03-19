import useEth from "../../contexts/EthContext/useEth";
import React, { useState, useContext } from "react";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import { useWorkflowStep } from "../../hooks/useWorkflowStep";
import { useHasVoter } from "../../hooks/useHasVoter";
import { useHasProposal } from "../../hooks/useHasProposal";
import { useIsVoter } from "../../hooks/useIsVoter";
import { Box, Text } from "@chakra-ui/react";
import { InfoIcon, ViewIcon } from '@chakra-ui/icons'
import AlertInfoVoter from "./AlertInfoVoter";
import AlertInfoProposal from "./AlertInfoProposal";

function InfoGetter({type}) {

const { state: { accounts } } = useEth();
const {voterAddress} =  useContext(VotingContext);

const {proposal} = useState("");

const { workflowstep } = useWorkflowStep();
const { hasVoter } = useHasVoter(voterAddress);
const { hasProposal } = useHasProposal(proposal);
const {isVoter} =  useIsVoter(accounts[0]);

  return (
        (type === "voter") ?(
            (hasVoter && isVoter) ? (<div>   
            <Box w="inherit" h="20rem" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" align="center">
                <InfoIcon pt={3} w={50} h={50} color="blue.500" />

                <Box p="6">
                    <Text fontWeight="bold" fontSize="14">
                    Get voter informations
                    </Text>
                    <AlertInfoVoter />
                </Box>
            </Box>
        </div>) : <></>
        ):
        ( 
            workflowstep && workflowstep > 0 && hasProposal && isVoter ? (<div>
             <Box w="inherit" h="20rem" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md" align="center">
                <ViewIcon w={50} h={50} color="blue.500" />

                <Box p="6">
                    <Text fontWeight="bold" fontSize="14">
                    Get proposal informations
                    </Text>
                    <AlertInfoProposal />
                </Box>
            </Box>
        </div>) : <></>     
        )
    )
}

export default InfoGetter;