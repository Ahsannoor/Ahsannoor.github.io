import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MachineImage from "../../assets/images/machines.jpg";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { withRouter } from "react-router-dom";
import { drawerWidth } from "../../util/config";
import { ListItemIcon } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,

    color: "white",
    backgroundImage: `linear-gradient(
            rgba(21, 21, 21, 1.85),
            rgba(21, 21, 21, 0.75)
          ),url(${MachineImage})`,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const DrawerComponent = (props) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div
        style={{
          height: "150px",
          padding: "15px",
          textAlign: "center",
        }}
      >
        <img
          src={require("../../assets/images/parseur.png")}
          style={{ height: "110%" }}
        />
      </div>
      <List>
        <div
          style={{
            backgroundColor: props.selected === 1 ? "#0084C5" : "transparent",
            margin: "10px",
            borderRadius: "5px",
          }}
        >
          <ListItem button key={"sent"} onClick={() => props.setSelected(1)}>
            <ListItemIcon>
              <DashboardIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary={`Sent Mails`} />
          </ListItem>
        </div>

        <div
          style={{
            backgroundColor: props.selected === 2 ? "#0084C5" : "transparent",
            margin: "10px",
            borderRadius: "5px",
          }}
        >
          <ListItem button key={"read"} onClick={() => props.setSelected(2)}>
            <ListItemIcon>
              <DashboardIcon style={{ color: "#fff" }} />
            </ListItemIcon>
            <ListItemText primary={`Read Mails`} />
          </ListItem>
        </div>
      </List>
    </Drawer>
  );
};

export default withRouter(DrawerComponent);
