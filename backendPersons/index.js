import express from "express";
import morgan from "morgan";
const app = express();
import mongoose from "mongoose";
const url = process.env.MONGODB_URI;
import cors from "cors";
import Persons from "./src/models/persons.js";
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

console.log("connecting to", url);
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

app.get("/", (request, response) => {
  response.send("<h1>Hello Persons</h1>");
});
//TODO GET localhost:3001/api/persons Trae todas las persons
app.get("/api/persons/", (request, response) => {
  let personsApi = Persons.map((person) => person);
  response.json(personsApi);
});
//TODO GET localhost:3001/info Trae info del server y fecha actual
app.get("/info", (request, response) => {
  const responseText = `
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `;
  response.send(responseText);
  // console.log(responseText);
});
//TODO localhost:3001/api/persons/id trae person por id
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
  // console.log(person.id, typeof person.id, id, typeof id, person.id === id);
  // console.log("Esta es la persona: " + person);
  response.json(person);
});
// TODO localhost:3001/persons/id elimina por id
app.delete("/api/persons/delete/:id", (request, response) => {
  const id = Number(request.params.id);
  personsFilter = persons.filter((p) => p.id !== id);
  response.status(204).send("Contacto eliminado con exito");
});
// //TODO genera aleatoriamente un id
// const generateIdRandom = () => {
//   const randomId =
//     persons.length > 0 ? Math.floor(Math.random() * 1000000 + 1) : 0;
//   return randomId;
// };
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};
//TODO localhost:3001/api/persons permite crear nuevos contactos
app.post("/api/persons", (request, response) => {
  const body = request.body;
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
  const existingName = persons.find((name) => name.name === body.name);
  const existingNumber = persons.find(
    (number) => number.number === body.number
  );
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
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  // console.log(person);
  response.json(persons);
});
const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
