import React, { useEffect } from "react";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import AppRouter from "./AppRouter";
import GlobalStyles from "./GlobalStyled";
import ThemeProvider from "./theme";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient();
  useEffect(() => {
    axios.post(
      "http://localhost:8000/auth/verify",
      {},
      {
        withCredentials: true,
      }
    );
  });
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          <RecoilRoot>
            <AppRouter />
          </RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
