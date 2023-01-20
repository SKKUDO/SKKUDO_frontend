import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import AppRouter from "./AppRouter";
import GlobalStyles from "./GlobalStyled";
import ThemeProvider from "./theme";
import { ReactQueryDevtools } from "react-query/devtools";

import { CookiesProvider } from "react-cookie";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import axios from "axios";

function App() {
  const queryClient = new QueryClient();
  axios.defaults.withCredentials = true;

  return (
    <>
      <GlobalStyles />

      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
          <RecoilRoot>
            <CookiesProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <AppRouter />
              </LocalizationProvider>
            </CookiesProvider>
          </RecoilRoot>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
