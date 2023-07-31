import React from "react";
const PersonForm = ({
  name,
  number,
  handleChangeName,
  handleChangeNumber,
  handleAddPerson,
}) => {
  return (
    <form onSubmit={handleAddPerson}>
      <div>
        name: <input onChange={handleChangeName} value={name} />
      </div>
      <div>
        number: <input onChange={handleChangeNumber} value={number} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
