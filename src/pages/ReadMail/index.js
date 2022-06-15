import React from "react";
import { Typography } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { NotificationManager } from "react-notifications";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import LoadingOverlay from "react-loading-overlay";
import { serverIP, monthNames } from "../../util/Constants";
import Table from "../../components/ReadMailTable";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
  },
  field: {
    //width: '200px'
  },
  greenAvatar: {
    marginRight: "10px",
    color: "#fff",
    backgroundColor: green[500],
  },
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: "850px",
  },
  columnPaper: {
    display: "grid",
    gridTemplateColumns: "25% 25% 25% 25%",
    padding: "5px",
    margin: "10px 5px",
  },
}));

const headers = [
  { label: "Order", key: "order" },
  { label: "Selected Cuts", key: "cuts" },
  { label: "Amount", key: "amount" },
];

const ReadMailLog = (props) => {
  const theme = useTheme();
  const classes = useStyles();
  const [mailsData, setMailsData] = React.useState([]);
  const [Loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    NotificationManager.info("Fetching Mails");
    setLoading(true);
    // let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    fetch(serverIP + "read/get")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        setLoading(false);
        try {
          if (!data.error) {
            setMailsData(data.data);
          } else {
            NotificationManager.error("Unable to fetch Mails" + data.message);
          }
        } catch (ex) {
          console.log("error");
        }
      })
      .catch((error) => {
        setLoading(false);
        NotificationManager.error(
          "Failed to fetch, connection to server failed"
        );
        console.log(error);
      });
  }, []);

  return (
    <>
      <LoadingOverlay active={Loading} spinner text={"Fetching orders data"}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0px 0px 15px",
          }}
        >
          <Typography variant="h5">Read Mail Log</Typography>
        </div>
        <Table mailsData={mailsData} />
      </LoadingOverlay>
    </>
  );
};

export default ReadMailLog;
