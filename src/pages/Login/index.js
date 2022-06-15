import React from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import Image from "../../assets/images/login-background.png";
import { NotificationManager } from "react-notifications";
import { serverIP, login } from "../../util/Constants";
//import axios from 'axios';

const Signin = (props) => {
  const [state, setState] = React.useState({ username: "", password: "" });

  // React.useEffect(()=>{
  //     axios.get('/api/basic/list')
  //     .then(res => console.log('res.data.Basic: ',res.data.Basic))
  // },[])
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    if (state.username != "" && state.password != "") {
      fetch(
        serverIP +
          "user" +
          "?UserName=" +
          state.username +
          "&Password=" +
          state.password,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            console.log(response);
            throw new Error("Invalid Credentials");
          }
        })
        .then((data) => {
          try {
            if (!data.error) {
              localStorage.setItem("isLoggedIn", true);
              let userInfo = {
                userName: state.username,
                password: state.password,
                unitID: state.username,
                UsUnitID: state.username,
                unitCode: state.username,
              };
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
              props.history.push("/home");
            } else {
              NotificationManager.error("Failed to login" + data.message);
            }
          } catch (ex) {
            console.log("error");
          }
        })
        .catch((error) => {
          NotificationManager.error(error.message.toString());
          console.log(error);
        });
    } else {
      NotificationManager.error("Username or password is not provided!");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f6f6f6",
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "40% 60%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
          color: "#fff",
          backgroundImage: `linear-gradient(to bottom, rgba(13, 81, 5, 0.6), rgba(37, 37, 37, 0.6)),
url(${Image})`,
        }}
      >
        <h2 style={{ fontSize: "60px" }}>Admin Portal</h2>
        {/* <div style={{display:'flex',justifyContent:'center',paddingTop:0,paddingBottom:20}}>
                    <img src={require('../../../assets/rtl.jpg')} alt="Logo" style={{width:310}}/>
                </div> */}
        <h4 style={{ fontSize: "20px" }}>Sign In To Continue</h4>
      </div>
      <div
        style={{
          padding: "0px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid container style={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="h3"
            style={{ textAlign: "center", fontWeight: "700" }}
          >
            Welcome
          </Typography>
        </Grid>
        {/* <Grid container style={{ display:'flex',justifyContent:'center'}}>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                        <Typography variant="h6" color='primary' style={{textAlign:'center'}}>Sign In</Typography>
                    </Grid>
                </Grid> */}

        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <TextField
              name="username"
              onChange={handleChange}
              value={state.username}
              label="Username"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <TextField
              name="password"
              type="password"
              onChange={handleChange}
              value={state.password}
              label="Password"
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Button
              variant="contained"
              fullWidth
              style={{ height: "50px", color: "#fff" }}
              color="primary"
              onClick={() => handleLogin()}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 40,
            paddingBottom: 20,
          }}
        >
          <Typography variant="subtitle2" color="black">
            ver 1.0
          </Typography>
        </div>
        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 0,
            paddingBottom: 20,
          }}
        >
          <img
            src={require("../../assets/images/WiMetrix.png")}
            alt="Logo"
            style={{ width: 210 }}
          />
        </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 0,
            paddingBottom: 20,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Signin;
