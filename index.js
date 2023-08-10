import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "emreckkr";
const yourPassword = "123456789";
const yourAPIKey = "49afed25-597e-4651-8458-18c4bc80de99";
const yourBearerToken = "7e8ccd8a-3127-47b0-af94-b32a7d1d736c";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async(req, res) => {
  //TODO 2: Use axios to hit up the /random endpoint
  try {
    const result = await axios.get(API_URL + "/random");
    console.log(result.data);
    //The data you get back should be sent to the ejs file as "content"
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  }catch (error) {
    // Handle Error Here
    res.status(404).send(error.message);
  }
});

app.get("/basicAuth",async (req, res) => {
  //TODO 3: Write your code here to hit up the /all endpoint
  try {
    const result = await axios.get(API_URL + "/all?page=2",{},
      {
        auth:{
        username:yourUsername,
        password:yourPassword,
      },
      }
  );

    console.log(result.data);
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  } 
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  /*
   axios.get(URL, {
      auth: {
        username: "abc",
        password: "123",
      },
    });
  */
    catch (error) {
      // Handle Error Here
      res.status(404).send(error.message);
  }
});

app.get("/apiKey",async (req, res) => {
  //TODO 4: Write your code here to hit up the /filter endpoint
  try {
    const result = await axios.get(API_URL + "/filter",{
      params:{
        score:5,
        apiKey:yourAPIKey,
        },
  });
    console.log(result.data);
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  } 

  catch (error) {
    res.status(404).send(error.message);
}
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken",async (req, res) => {
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  try {
    const result = await axios.get(API_URL + "/secrets/2",{
      headers: {
        Authorization:  `Bearer ${yourBearerToken}`,
      },
    });
    console.log(result.data);
    res.render("index.ejs", {content: JSON.stringify(result.data)});
  } 

  catch (error) {
    res.status(404).send(error.message);
  }
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
