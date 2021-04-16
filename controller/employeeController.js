const express = require('express')

var { Employee } = require('../models/employee')

var router = express.Router()
// const app = express()

router.get('/', (req, res) => {
    
    // Model.find({}) -> return all data or error
    Employee.find({})
        .then((result) => res.status(200).send(result))
        .catch(error => res.status(500).send(error))

})

router.get('/:id', (req, res) => {

    // read parameter from path
    const _id = req.params.id

    // Model.findById -> Find data by id or return error
    Employee.findById({ _id })
        .then((user) => {
            if(!user){
                return  res.status(404).send("Employee Not Found")
            }
            res.status(200).send(user)
        })
        .catch(error => res.status(500).send(error))

})

router.post('/', (req, res) =>{

    // read data from body
    const obj = req.body;
    // console.log(obj)

    // Model object
    const emp = new Employee(obj); // run validator on the value

    // insert object in mongodb
    emp.save()
        .then((result) => {
            console.log(result)
            res.status(201).send(result)
        })
        .catch((error) => res.status(400).send(error))

})

router.patch('/:id', (req, res) => {
    
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

router.delete('/:id', (req, res) => {

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

module.exports = router;