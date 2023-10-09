import express from "express";
import cors from "cors";
// http middleware dispatching HTTP calls to the routes + send responses
// npx nodemon backend.js
// instance of Express and constant for port num
const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(cors()); // allows backend to respond to calls coming from a diff origin
app.use(express.json()); //process data in JSON
//api endpoint, GET requests

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

//uses filtered user list, so pass in user list as param
const findUserByJob = (job) => {
  return users["users_list"].filter((user) => user["job"] === job);
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined) {
    let res_name = findUserByName(name);
    if (job != undefined) {
      let res_job = findUserByJob(job);
      result = { user_list: res_name };
      result = { result: res_job };
      res.send(result);
    }
  } else {
    res.send(users);
  }
});

const findUserById = (id) => {
  return users["users_list"].find((user) => user["id"] === id);
};

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  // creates id with first letter of name and 3 digit num
  user["id"] =
    user.name.charAt(0) + Math.floor(Math.random() * (999 - 100 + 1) + 100);
  user = {
    id: user.id,
    name: user.name,
    job: user.job,
  };
  users["users_list"].push(user);
  return user;
};

// api endpoint for post methods
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send(userToAdd); //201 content created
});

// //hard delete to remove user by id from list
const deleteUser = (id) => {
  const idx = users["users_list"].findIndex((user) => user["id"] === id);
  if (idx === -1) {
    return idx;
  } else {
    return users["users_list"].splice(idx,1);
  }
};

// api endpoint for delete method
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = deleteUser(id);
  if (result === -1) {
    res.status(404).send("Resource not found.");
  } else {
    res.status(204).send();
  }
});

//listen to incoming requests on port num
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
