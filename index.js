const express=require('express');
const axios=require('axios');
// const mongoose=require('mongoose');
const asana=require('asana')
// mongoose.connect('mongodb://localhost/user');
// const db = mongoose.connection;
// db.on("error", error => console.log(error));
// db.once("open", () => console.log("connection to db established"));
const app=express();
const clientID = '1200670432873807';
const clientSecret = 'd7a7f74d829daa4a7f2031492d077ed0';
app.get('/oauth/redirect', (req, res) => {
    const requestToken = req.query.code;
    console.log(req.query.code);
    axios({
      // make a POST request
      method: 'post',
      url: `https://app.asana.com/-/oauth_token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=authorization_code&code=${requestToken}&redirect_uri=https://localhost:8080/oauth/redirect`,
       headers: {
           accept: 'application/json'
      }
    }).then((response) => {
    console.log("FFF");
    const accessToken = response.data.access_token;
    return accessToken;
    }).then(function(token)
    {
    axios.get('https://app.asana.com/api/1.0/projects',
    {
        headers: 
        {
          accept: 'application/json',
          'Authorization': 'bearer' , token
        }
    }).then(function(res)
    {
      console.log(res.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    }); 
    });
  });
    app.use(express.static(__dirname));
    app.listen(8080);