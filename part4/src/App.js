import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import personeService from "../src/services/persons";
import PersonForm from "./components/PersonForm";
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
    personeService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      //console.log(contacts);
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
      personeService.create(newPerson).then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        alert("Usuario creado");
        setNewName("");
        setNewNum("");
        setErrorMessage(`Added ${addedPerson.name}`);
      });
    }
  };

  const handleChange = (setValue) => (e) => {
    setValue(e.target.value);
    setFilterQuery(e.target.value.toLowerCase());
  };

  const handleRemovePerson = (id, name) => () => {
    if (window.confirm(`Delete ${name}?`)) {
      personeService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.name !== name));
      });
    }
  };
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
      <Persons
        persons={persons}
        query={filterQuery}
        handleRemovePerson={handleRemovePerson}
      />
    </div>
  );
};

export default App;
