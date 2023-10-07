import express from "express";
// http middleware dispatching HTTP calls to the routes + send responses

// instance of Express and constant for port num
const app = express(); 
const port = 8000;

app.use(express.json()); //process data in JSON

app.get('/', (req, res) => { //set up first API endpoint, GET requests
    res.send('Hello World!'); 
});

app.listen(port, () => { //listen to incoming requests on port num
    console.log(`Example app listening at http://localhost:${port}`);
});      