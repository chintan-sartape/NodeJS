const mongoose = require('mongoose')
const validator = require('validator')

const empSchema = new mongoose.Schema({

    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email not valid")
        }
      }
    },
    position: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      min: [18, 'Age cannot be less than 18'],
      max: 58,
      default: 18
    },
    salary: {
      type: Number,
      required: true,
      trim: true
    },
    password: {
      // Goal - required, length 6, trim spaces, validate not conatin "password" lowercase
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1024,
      trim: true,
      lowercase: true,
      validate(value) {
        if (value.includes("password")) {
          throw new Error("Cannot contain -password- as string")
        }
      }
    }
    
  })

const Employee = mongoose.model('Employee', empSchema)

module.exports = { Employee };