import React from "react";
import Drawer from "../Drawer/Drawer";
import { drawerWidth } from "../../util/config";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { withRouter } from "react-router-dom";
import "./index.css";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
}));

const Layout = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.clear();
      props.history.push("/");
    }, 1000);
  };
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar color="primary" position="fixed" className={classes.appBar}>
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
            <Typography variant="h6" noWrap>
              Mail Parser Admin Portal
            </Typography>
            <Typography
              className="logout"
              variant="subtitle2"
              onClick={handleLogout}
            >
              {loading === true ? (
                <CircularProgress size="18px" style={{ color: "blue" }} />
              ) : (
                `Logout`
              )}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer selected={props.selected} setSelected={props.setSelected} />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {props.children}
        </main>
      </div>
    </>
  );
};

export default withRouter(Layout);
