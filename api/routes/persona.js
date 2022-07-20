const router = express.Router();
const express = require('express');
const mysqlConnection = require('../connection/connection');

//get equipos



router.get('/', (req,res) =>{
    mysqlConnection.query('select * from persona', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
       }else{
        console.log(err);
       }
    })    
})

module.exports = router;