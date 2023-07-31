import React from "react";

const Person = ({ name, number, handleRemovePerson }) => {
  return (
    <div key={name}>
      {name} {number} <button onClick={handleRemovePerson}>Delete</button>
    </div>
  );
};

export default Person;
