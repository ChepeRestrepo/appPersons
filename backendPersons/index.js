require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const url = process.env.MONGODB_URI;
const cors = require("cors");
const Persons = require("./src/models/persons.js");
app.use(cors());
app.use(express.json());
morgan.token("body", (request, response) =>
  request.method === "POST" ? JSON.stringify(request.body) : ""
);
app.use(
  morgan((tokens, request, response) =>
    [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, response, "content.length"),
      "-",
      tokens["response-time"](request, response),
      "ms",
      tokens.body(request, response),
    ].join(" ")
  )
);

//console.log("connecting to", url);
mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });
// let persons = [
//   {
//     name: "Arto Hellas",
//     number: "040-123456",
//     id: 1,
//   },
//   {
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//     id: 2,
//   },
//   {
//     name: "Dan Abramov",
//     number: "12-43-234345",
//     id: 3,
//   },
//   {
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//     id: 4,
//   },
// ];

//TODO GET localhost:3001/api/persons Trae todas las persons
app.get("/api/persons", async (request, response) => {
  try {
    let personsApi = await Persons.find({});
    response.json(personsApi);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Error en el servidor" });
  }
});
//TODO GET localhost:3001/info Trae info del server y fecha actual

app.get("/api/info", async (request, response) => {
  try {
    // Suponiendo que Persons es un modelo de Mongoose, reemplaza esto con la consulta adecuada para contar el número de personas en la base de datos.
    const count = await Persons.countDocuments();
    const responseText = `
    <p>Phonebook has info for ${count} people</p>
    <p>${new Date()}</p>
    `;

    response.send(responseText);
    // console.log(responseText);
  } catch (error) {
    console.error("Error al obtener la información:", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
});

//TODO localhost:3001/api/persons/id trae person por id
app.get("/api/persons/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const person = await Persons.findById(id);
    if (person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Error en el servidor" });
  }
});

// TODO localhost:3001/persons/id elimina por id
// app.delete("/api/persons/delete/:id", async (request, response) => {
//   const id = request.params.id;
//   await Persons.findByIdAndRemove(id);
//   response.status(204).send("Contacto eliminado con exito");
// });
app.delete("/api/persons/delete/:id", async (request, response) => {
  const id = request.params.id;

  try {
    await Persons.findByIdAndRemove(id);
    response.status(204).send("Contacto eliminado con éxito");
  } catch (error) {
    console.error("Error al eliminar el contacto:", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
});

//TODO controlador para actualizar elementos con el metodo PUT

// //TODO genera aleatoriamente un id
// const generateIdRandom = () => {
//   const randomId =
//     persons.length > 0 ? Math.floor(Math.random() * 1000000 + 1) : 0;
//   return randomId;
// };
// const generateId = () => {
//   const maxId = Persons.length > 0 ? Math.max(...Persons.map((p) => p.id)) : 0;
//   return maxId + 1;
// };
//TODO localhost:3001/api/persons permite crear nuevos contactos
app.post("/api/persons", async (request, response) => {
  const body = request.body;

  try {
    if (!body.name) {
      return response.status(400).json({
        error: "name missing",
      });
    }

    if (!body.number) {
      return response.status(400).json({
        error: "number missing",
      });
    }

    // Verificar si el nombre ya existe en la agenda
    const existingName = await Persons.findOne({ name: body.name });
    const existingNumber = await Persons.findOne({ number: body.number });

    if (existingName) {
      return response.status(400).json({
        error: "name already exists in the agenda",
      });
    }

    if (existingNumber) {
      return response.status(400).json({
        error: "number already exists in the agenda",
      });
    }

    const person = new Persons({
      name: body.name,
      number: Number(body.number),
    });

    const savedPerson = await person.save();
    response.json(savedPerson);
  } catch (error) {
    console.error("Error al guardar el documento:", error);
    response.status(500).json({
      error: "Internal server error",
    });
  }
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
