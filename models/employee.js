const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')

// Create the Schema and pass it as argument to the model
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
      validate(value) {
        if (value.includes("password")) {
          throw new Error("Cannot contain -password- as string")
        }
      }
    }
    
  })

// methods are accessible on instances of Models
empSchema.methods.generateAuthToken = async function () {

  const emp = this
  const token = jwt.sign({ _id: emp._id.toString() }, 'secretkey')
  return token
}

// static methods are accessible on Models
// Once you separate schema from model, then you can 
// set up middleware
// User.findByCredentials
empSchema.statics.findByCredentials = async (email, password) => {

  const emp = await Employee.findOne({ email: email })
  if (!emp) {
    // throw new Error('Unable to Login')
    return ({"error": "Wrong email"})
  }

  const isMatch = password === emp.password
  if (!isMatch) {
    // throw new Error('Unable to Login')
    return ({"error": "Wrong password"})
  }

  return emp
}

const Employee = mongoose.model('Employee', empSchema)

module.exports = Employee;