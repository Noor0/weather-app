import { QueryClientProvider, QueryClient } from "react-query";

export default function wrapper({ children }) {
  return (
    <QueryClientProvider client={(() => new QueryClient())()}>
      {children}
    </QueryClientProvider>
  );
}
