import { useWorkflowStep } from "../../hooks/useWorkflowStep";
//import { useWorkflowStatus } from "../../hooks/useWorkflowStatus";
import {Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'

function Display() {

const { workflowstep } = useWorkflowStep();
const workflowstepInt = parseInt(workflowstep);
//const {workflowStatus} = useWorkflowStatus(workflowstep);

  return (
      <>
      <br />
      <Breadcrumb
            spacing="8px"
            separator= "/"
            fontFamily="Arial"
            fontWeight="semibold"
            fontSize="lg">
            <BreadcrumbItem>
              <BreadcrumbLink className="no-underline" isCurrentPage color={workflowstepInt===0 ? " blue.500" : "gray.200"} textTransform={workflowstepInt===0 && "uppercase" }>
              Registering voters
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink className="no-underline" isCurrentPage color={workflowstepInt===1 ? " blue.500" : "gray.200"} textTransform={workflowstepInt===1 && "uppercase" }>
                Proposals registration started
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink className="no-underline" isCurrentPage color={workflowstepInt===2 ? " blue.500" : "gray.200"} textTransform={workflowstepInt===2 && "uppercase" }>
                Proposals registration ended
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink className="no-underline" isCurrentPage color={workflowstepInt===3 ? " blue.500" : "gray.200"} textTransform={workflowstepInt===3 && "uppercase" }>
                Voting session started
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink className="no-underline" textDecoration="none" color={workflowstepInt===4 ? " blue.500" : "gray.200"} textTransform={workflowstepInt===4 && "uppercase" }>
                Voting session ended
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink className="no-underline" color={workflowstepInt===5 ? " blue.500" : "gray.200"} textTransform={workflowstepInt===5 && "uppercase" }>
                The tally is over
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <br />
      </>
  );
}

export default Display;
