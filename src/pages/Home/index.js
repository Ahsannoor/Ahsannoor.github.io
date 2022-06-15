import React from "react";
import Layout from "../../components/Layout";
import Dashboard from "../Dashboard";
import SendMail from "../SendMail";
import ReadMail from "../ReadMail";

const Home = (props) => {
  const [selected, setSelected] = React.useState(1);
  console.log(props);
  return (
    <Layout selected={selected} setSelected={setSelected}>
      {selected === 1 ? (
        <SendMail />
      ) : selected === 2 ? (
        <ReadMail />
      ) : (
        <div style={{ padding: "20px" }}>No option selected.</div>
      )}
    </Layout>
  );
};

export default Home;
