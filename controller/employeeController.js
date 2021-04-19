const express = require('express')
const app = express()
const Employee = require('../models/employee')
const auth = require('../middleware/auth')

// const router = express.Router()

// get - all documents - find()
// router.get('/', (req, res) => {    
//     // Model.find({}) -> return all data or error
//     Employee.find({})
//         .then((result) => res.status(200).send(result))
//         .catch(error => res.status(500).send(error))
// })

// async - await 
app.get('/', async (req, res) => {
    try {
        // Model.find({}) -> return all data or error
        const employees = await Employee.find({})
        res.status(200).send(employees)
    } catch (e) {
        res.status(500).send(e)
    }
})

// serach by id
// app.get('/:id', (req, res) => {
//     // read parameter from path
//     const _id = req.params.id
//     // Model.findById -> Find data by id or return error
//     Employee.findById({ _id })
//         .then((user) => {
//             if(!user){
//                 return  res.status(404).send("Employee Not Found")
//             }
//             res.status(200).send(user)
//         })
//         .catch(error => res.status(500).send(error))
// })

// async - await 
app.get('/:id', async (req, res) => {
    // read parameter from path
    const _id = req.params.id
    try {
        const employee = await Employee.findById(_id)
        if (!employee) {
            return res.status(404).send()
        }
        // console.log(employee)
        res.send(employee)
    } catch (e) {
        res.status(500).send(e)
    }
})

// app.post('/', (req, res) =>{
//     // read data from body
//     const obj = req.body;
//     // console.log(obj)
//     // Model object
//     const emp = new Employee(obj); // run validator on the value
//     // insert object in mongodb
//     emp.save()
//         .then((result) => {
//             console.log(result)
//             res.status(201).send(result)
//         })
//         .catch((error) => res.status(400).send(error))
// })

app.post('/', async (req, res) => {
    const emp = new Employee(req.body);
    // insert object in mongodb
    try {
        const newemp = await emp.save()
        const token = await newemp.generateAuthToken()
        res.status(201).send({ newemp, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

app.patch('/:id', (req, res) => {
    // console.log(req.body)    
    // return;
    // Model.findByIdAndUpdate -> Find data by id and update the data or return error
    Employee.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true
        })
        .then((user) => {
            if(!user){
                return  res.status(404).send("Employee Not Found")
            }
            res.status(200).send(user)
        })
        .catch(error => res.status(500).send(error))

})

app.delete('/:id', (req, res) => {

    // Model.findByIdAndDelete -> Find data by id and delete the document or return error
    Employee.findByIdAndDelete(req.params.id)
    .then((user) => {
        if(!user){
            return  res.status(404).send("Employee Not Found")
        }
        res.status(200).send(user)
    })
    .catch(error => res.status(500).send(error))

})

app.post('/login', async (req, res) => {
    try {

        email = req.body.email
        password = req.body.password

        const emp = await Employee.findByCredentials(email, password)

        if ((emp.error) && (emp.error.includes("Wrong")) ) {
            res.status(404).send({"error": emp.error})
        } 

        const token = await emp.generateAuthToken()
        res.send({ emp, token })
        
        //res.send(emp)
        // if response header
        // res.set({'token', token})
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = app;