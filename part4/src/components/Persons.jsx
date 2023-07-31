import React from "react";
import Person from "./Person";
const Persons = ({ persons, query, handleRemovePerson }) => {
  return (
    <>
      NAME --------------- NUMBER
      {persons
        .filter((person) => person.name.toLowerCase().includes(query))
        .map((person) => (
          <Person
            key={person.id}
            name={person.name}
            number={person.number}
            handleRemovePerson={handleRemovePerson(person.id, person.name)}
          />
        ))}
    </>
  );
};
export default Persons;
