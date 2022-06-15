import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./router";
import { ThemeProvider } from "@material-ui/styles";
import validators from "./util/validators";
import validate from "validate.js";
import { SnackbarProvider } from "notistack";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { createMuiTheme } from "@material-ui/core";

validate.validators = {
  ...validate.validators,
  ...validators,
};
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#004160",
    },
    secondary: {
      main: "#0084C5",
    },
  },
});

function App() {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
          <NotificationContainer />
        </SnackbarProvider>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
