import React from "react";

const Persons = ({ persons, query }) => {
  return (
    <div>
      NAME --------------- NUMBER
      {persons
        .filter((person) => person.name.toLowerCase().includes(query))
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </div>
  );
};
export default Persons;
