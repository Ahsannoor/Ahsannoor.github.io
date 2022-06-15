import { graphqlServerIp } from "../assets/images/Constants/Constants";

async function graphqlCall(requestBody, filename) {
    let result = {
        error_code: "400",
        error_description: "Internet connection failed or server unreachable",
        responseData: "",
    };
    //Fetch api to fetch data from Grapghql server
    //Input parameter: Request body which contains  graphql query
    //Output paramter: Result which contains data, error

    let url = graphqlServerIp + filename;
    console.log(url);
    await fetch(url, {
        method: "post",
    })
        .then((res) => {
            // if (res.status !== 200 && res.status !== 201) {
            //     // Fetch api has failed to connect to graphql server
            //     result.error_code = "401";
            //     result.error_description = "Request Failed";
            //     result.responseData = "";
            // }
            // Returning JSON result received from graphql server
            return res.json();
        })
        .then((resData) => {
            console.log(resData);
            if (resData.errors) {
                result.error_code = "1";
                result.error_description = "Errors reported";
                result.responseData = resData;
            } else {
                result.error_code = "0";
                result.error_description = "Success no errors reported";
                result.responseData = resData;
            }
        })
        .catch((err) => {
            // Catch block for returning error
            console.log(err);
            // console.log(result);
        });
    return result;
}

export default graphqlCall;
