import AuthContext from "../context/auth-context";
import { toast } from "react-toastify";
import { graphqlServerIp } from "../assets/Constants/Constants";
async function graphqlCallWithAuthorization(requestBody, token) {
    let result = {
        error_code: "400",
        error_description: "Connection Failed",
        responseData: ""
    };
    //Fetch api to fetch data from Grapghql server
    //Input parameter: Request body which contains  graphql query
    //Output paramter: Result which contains data, error
    await fetch(graphqlServerIp, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
            // ensurig that the mode of communication is JSON
            "Content-Type": "application/json",
            // providing token to graphql request for authorization
            Authorization: "Bearer ".concat(token)
        }
    })
        .then(res => {
            toast.dismiss();
            if (res.status !== 200 && res.status !== 201) {
                // Fetch api has failed to connect to graphql server
                result.error_code = "401";
                result.error_description = "Graphql request failed";
                result.responseData = "";
            }
            // Returning JSON result received from graphql server
            return res.json();
        })
        .then(resData => {
            if (resData.errors) {
                result.error_code = "1";
                result.error_description = resData.errors.message;
                result.responseData = resData;
            } else {
                result.error_code = "0";
                result.error_description = "Success no errors reported";
                result.responseData = resData;
            }
        })
        .catch(err => {
            // Catch block for returning error
            console.log(err);
            // console.log(result);
        });
    return result;
}

export default graphqlCallWithAuthorization;
