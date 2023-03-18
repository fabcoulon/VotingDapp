import React, {useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Display from "./Display";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import { VotingContext } from "../../contexts/VotingContext/VotingContext";
import Address from "./Address";
import StepButton from "./StepButton";
import VotingInput from "./VotingInput";
import InfoGetter from "./InfoGetter";
import { Winner } from "./Winner";
import { Box, Heading, Flex, Link, Text, Icon, Divider, Center } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

function Voting() {
  const { state } = useEth();
  const [ workflowStatus, setWorkflowStatus ] = useState("Registering voters");
  const [proposal, setProposal] = useState("");
  const [voterAddress, setVoterAddress] = useState("");
  const [vote, changeVote] = useState("");
  



  const voting =
  <>
    <VotingContext.Provider value={{workflowStatus,setWorkflowStatus,proposal,setProposal,voterAddress,setVoterAddress,vote,changeVote}} >
      <Box bg="gray.100" boxShadow="md">
        <Flex justify="space-between" align="center" p={4}>
          <Heading as="h1" size="lg" color="gray.700">
            The F & G Voting Dapp
          </Heading>
          <Box>
            <Address />
          </Box>
        </Flex>
      </Box>



      <div className="contract-container">
        <div>
        <Display/>
        <Flex direction="column">

          <Winner/>

          <Box maxW="inherit" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
          <Text as="b">Action Box</Text>
            <Flex justify="space-between">
            
              <Box
                maxW="lg"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden">
                  <StepButton />
              </Box>

              <Box
                maxW="lg"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden">
                  <VotingInput />
                </Box>
            </Flex>
          </Box>
          <Center height='30px'>
            <Divider orientation='vertical' />
          </Center>
          <Box maxW="inherit" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
            <Text as="b">Information Box</Text>
            <Flex justify="space-between" mt="8">
              <Box
                maxW="inherit"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden">
                <InfoGetter type="voter"/>
              </Box>

              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden">

                <InfoGetter type="proposal"/>
              </Box>
             </Flex>
          </Box>
        </Flex>
        </div>
      </div>


      <Box bg="gray.100" boxShadow="md" mt={8}  position="fixed" bottom="0" width="100%">
        <Flex direction="column" justify="center" align="center" p={4}>
          <Text color="gray.600" mb={2}>
            © 2023 Mon application. Tous droits réservés.
          </Text>
          <Link href="https://github.com/fabcoulon/VotingDapp" mb={2}>
            <Icon as={FaGithub} color="blue.500" mr={2} />
            Dépôt Git
          </Link>
        </Flex>
      </Box>

      </VotingContext.Provider>
    </>
    ;

  return (
    <div className="voting">
      {
        
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            voting
      }
    </div>
  );
}

export default Voting;
