import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Axios from "axios";
import Notification from "./components/Notification";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [persons, setPersons] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "No se ha agregado nuevos contactos"
  );

  useEffect(() => {
    console.log("effect linea 13");
    Axios.get("http://localhost:3000/persons").then((response) => {
      const persons = response.data;
      setPersons(persons);
      console.log(persons);
    });
  }, []);
  const handleAddNewPerson = (e) => {
    e.preventDefault();
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNum,
      };
      setPersons(persons.concat(newPerson));
      alert("Usuario creado");
      setNewName(newPerson.name);
      setNewNum(newPerson.number);
      setErrorMessage(`Added ${Object.values(newPerson)}`);
    }
  };
  const handleChange = (setValue) => (e) => setValue(e.target.value);
  return (
    <div>
      <h1>Phonebook</h1>
      {<Notification message={errorMessage} />}
      <h2>
        <Filter
          handleChange={handleChange(setFilterQuery)}
          query={filterQuery}
        />
      </h2>
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNum}
        handleChangeName={handleChange(setNewName)}
        handleChangeNumber={handleChange(setNewNum)}
        handleAddPerson={handleAddNewPerson}
      />
      <h2>Numbers</h2>
      <br />
      <Persons persons={persons} query={filterQuery} />
    </div>
  );
};

export default App;
