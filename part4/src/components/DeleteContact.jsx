import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const DeleteContact = () => {
  const [contactEditado, SetContactEditado] = useState({
    name: "",
    number: 0,
  });
  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/persons/delete/${id}`,
        contactEditado
      );
      console.log("Contacto borrado con exito");
      Swal.fire({
        icon: "success",
        title: "Contacto eliminado con éxito",
        text: "El contacto ha sido eliminado exitosamente.",
      });
    } catch (error) {
      console.log(
        "Error al realizar el borrado, ocurrio el siguiente error:  ",
        error
      );
    }
  };
  return (
    <>
      <btn className="btn-danger" onClick={handleDeleteContact}>
        DeleteContact
      </btn>
      ;
    </>
  );
};
export default DeleteContact;
