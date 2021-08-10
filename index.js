const express=require('express');
const axios=require('axios');
const mongoose=require('mongoose');
const asana=require('asana');
const Userdata=require('./user');
mongoose.connect('mongodb://localhost/user');
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));
const app=express();
const clientID = '1200758467999947';
const clientSecret = '1d5b569405a3530a415545d4ccaddb71';
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
    console.log(accessToken);
    return accessToken;
    }).then(function(token)
    {
    projects=axios.get('https://app.asana.com/api/1.0/projects',
    {
        headers: 
        {
          accept: 'application/json',  
          Authorization: `Bearer ${token}`
        }  
    }).then(async(response) =>
    {
      // app.post('/data',(req,res)=>{
      //   const data =res.data;
      // })
      console.log(response.data);
    const userinfo = new Userdata({
   
         data:require.data,
        //  gid:data.gid,
        //  name:data.name,
        //  resource_type:name.resource_type
  });    
     try{
       db.collection('projects').insertOne({gid:userinfo.gid,name:userinfo.name,resource_type:userinfo.resource_type});
        const savedPost = await userinfo.save()
        //  db.collection('projects').insertOne(savedPost);
        res.send("Userinfo Saved Successfully ");
        console.log("Userinfo Saved Successfully.");
        }
        catch (err){
            res.json({ message: err}); 
        }
      }).catch(function (error) {
      // handle error
      console.log(error);
    // }); 
    });
  });
});
    app.use(express.static(__dirname));
    app.listen(8080);