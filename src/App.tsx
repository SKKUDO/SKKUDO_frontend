import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import AppRouter from "./AppRouter";
import GlobalStyles from "./GlobalStyled";
import ThemeProvider from "./theme";
import { ReactQueryDevtools } from "react-query/devtools";
import { Global } from "@emotion/react";
import { CookiesProvider } from "react-cookie";
import axios from "axios";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <GlobalStyles />
      {/* <Global
        styles={{
          body: {
            backgroundColor: "#0C4426",
          },
        }}
      /> */}
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          <RecoilRoot>
            <CookiesProvider>
              <AppRouter />
            </CookiesProvider>
          </RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
