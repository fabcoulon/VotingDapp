import { useWorkflowStep } from '../../hooks/useWorkflowStep';
import { Text} from "@chakra-ui/react";

export function VotesEnded() {

  const { workflowstep } = useWorkflowStep();
  
  const endedVote = 
  <>
  <Text as="b" class="votesEnded">Votes ended</Text>
  </>;
   return workflowstep > 4 && endedVote
  }