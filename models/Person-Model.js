const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//hash password
// personSchema.pre("save", async function (next) {
//   const person = await this;
//   //hash the pasword only if it has been modified (or is new)
//   if (!person.isModified("password")) return next();
//   try {
//     //hash password generation
//     const salt = await bcrypt.genSalt(10);
//     //hash password
//     const hashPassword = await bcrypt.hash(person.password, salt);
//     //overide the plain password with the hashed one
//     person.password = hashPassword;
//     next();
//   } catch (err) {
//     return next(err);
//   }
// });

// personSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     const isMatch = await bcrypt.compare(candidatePassword, this.password);
//     return isMatch;
//   } catch (err) {
//     throw err;
//   }
// };

personSchema.pre("save", async function (next) {
  const person = this; // No need to await this
  if (!person.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(person.password, salt);
    person.password = hashPassword;
    next(); // Ensure next() is called in both success and error cases
  } catch (err) {
    next(err); // Pass the error to the next middleware
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw new Error('Error comparing passwords'); // Handle error more gracefully
  }
};

//create person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
