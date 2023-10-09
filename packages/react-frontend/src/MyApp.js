import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  // useState => state value, function to update it.
  const [characters, setCharacters] = useState([]);

  function updateList(person) {
    postUser(person) //slide 10, week2-m
      .then((res) => {
        if (res.status !== 201) throw new Error("Invalid Response!"); //only if 201.
        return res.json();
      })
      .then((json) => {
        if (json) setCharacters([...characters, json]);
        //console.log(json)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    const del_id = characters.find((character, i) => i === index)["id"];
    fetch(`http://localhost:8000/users/${del_id}`, {
      method: "DELETE",
    })
    .then((res) => {
      if (res.status !== 204) throw new Error("Invalid Response!"); 
      return res.json();
    })
    setCharacters(updated);
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise; //useful to perform operation which will take time or won't finish
    //promise = basis of asynch processing in JS
  }

  //add new user to backend first, then show on frontend
  function postUser(person) {
    const promise = fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  // react hook to call fetchUsers, using .then for when promise is fulfilled
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  );
}
export default MyApp; //export default makes avaiable to import into components
