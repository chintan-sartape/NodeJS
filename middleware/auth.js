const jwt = require('jsonwebtoken')
const Employee = require('../models/employee')

const auth = async(req, res, next) => {
 try{

    const token = req.header('Authorization').replace('Bearer ', '')
     console.log(token)
     const decoded = jwt.verify(token, 'secretkey')
     const employee = await Employee.findOne({ _id: decoded._id })
     if(!employee){
         throw new Error()
     }
     //req.token = token
     req.employee = employee
     next()
 } catch(error){
     res.status(401).send({ error : 'Please Authenticate'})
 }
}

module.exports = auth