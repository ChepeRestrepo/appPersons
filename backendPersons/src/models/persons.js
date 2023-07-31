const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const personsSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    minlength: 8,
    required: true,
    unique: true,
  },
});

personsSchema.plugin(uniqueValidator);

personsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Persons = mongoose.model("Persons", personsSchema);
module.exports = Persons;
