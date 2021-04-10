import { QueryClientProvider } from "react-query";
import { queryClient } from "hooks/api";

import Main from "pages/Main";

import "./App.css";

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </div>
  );
}

export default App;
