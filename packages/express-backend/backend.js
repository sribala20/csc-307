import express from "express";
// http middleware dispatching HTTP calls to the routes + send responses

// instance of Express and constant for port num
const app = express(); 
const port = 8000;
const users = { 
    users_list : [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

 
app.use(express.json()); //process data in JSON

//api endpoint, GET requests
app.get('/users', (req, res) => {
    res.send(users);
});

app.listen(port, () => { //listen to incoming requests on port num
    console.log(`Example app listening at http://localhost:${port}`);
});      