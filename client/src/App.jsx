import { EthProvider } from "./contexts/EthContext";
import Voting from "./components/Voting";
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <EthProvider>
        <div id="App">
          <div className="container">
            <Voting />
          </div>
        </div>
      </EthProvider>
    </ChakraProvider>
  );
}

export default App;
