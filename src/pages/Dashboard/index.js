import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "20px",
  },
  field: {
    //width: '200px'
  },
  columnPaper: {
    display: "grid",
    gridTemplateColumns: "25% 25% 25% 25%",
    padding: "10px",
    margin: "10px 5px",
    height: "inherit",
  },
}));

const Dashboard = () => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <Iframe url={userInfo.unitID==="2"?
				"https://app.powerbi.com/view?r=eyJrIjoiNjYwODNhZjMtN2M0YS00ZmRmLThjYWEtNzE3OWI5OWYyYWU3IiwidCI6IjE0ZWY0NmQ0LTdhNTItNGZiYS1hYWZkLWJjOGY3NzM0ZWY2ZCIsImMiOjl9"
				:"https://app.powerbi.com/view?r=eyJrIjoiZmY2ZWQ4NjYtYjU5Zi00ZjZkLTllYzQtYmE3YTc0OTMyMjE4IiwidCI6IjE0ZWY0NmQ0LTdhNTItNGZiYS1hYWZkLWJjOGY3NzM0ZWY2ZCIsImMiOjl9"}
					width="80%"
					height="750px"
					Style={{alignSelf:'center'}}
					id="myId"
					className="myClassname"
					display="initial"
					position="relative" /> */}
      </div>
    </>
  );
};

export default Dashboard;
