import { Box, ChakraProvider, ChakraTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Navbar } from "./components/Navbar";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Cards } from "./pages/Cards";
import { extendTheme } from "@chakra-ui/react";
import { Study } from "./pages/Study";
import "github-markdown-css";

export const App = () => {
  const styles = {
    global: (props: ChakraTheme) => ({
      body: {
        background: mode("#CCC", "#333")(props),
      },

      ".markdown-body": {
        color: "#fff",
        fontSize: "inherit",

        "a, blockquote": {
          color: "#ccc",
        },
        p: {
          wordBreak: "break-word",
          marginBottom: "0",
        },
        
        li: {
          marginTop: "0",
          wordBreak: "break-word",
        },

        "pre, code": {
          backgroundColor: "#333",
          wordWrap: "break-word",
          my: "8",
        },
      },
    }),
  };

  const config = {
    initialColorMode: "dark",
  };

  const theme = extendTheme({ config }, { styles });

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box>
          <Box height="5vh">
            <Navbar />
          </Box>
          <Box height="95vh" maxWidth="100vw">
            <Switch>
              <Route path="/cards">
                <Cards />
              </Route>
              <Route path="/study">
                <Study />
              </Route>
              <Redirect to="/cards" />
            </Switch>
          </Box>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
