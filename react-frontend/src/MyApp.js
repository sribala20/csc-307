import React, { useState } from 'react';
import Table from "./Table";
import Form from './Form';

function MyApp() {
    // useState => state value, function to update it.
    const [characters, setCharacters] = useState([])

    function updateList(person) {
        setCharacters([...characters, person]);
      }

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
            return i !== index
        });
        setCharacters(updated);
    }

    return (
        <div className="container">
            <Table characterData={characters}
                removeCharacter={removeOneCharacter} />
            <Form handleSubmit={updateList} />
        </div>
    );
}
export default MyApp; //export default makes avaiable to import into components

