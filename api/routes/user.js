const express = require('express');
const router = express.Router();

const mysqlConnection = require('../connection/connection');

const jwt = require('jsonwebtoken');

router.get('/', (req,res) =>{
    mysqlConnection.query('select * from user', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
       }else{
        console.log(err);
       }
    })    
})

router.post('/singin', (req,res) => {
    const { username, password } = req.body;
    mysqlConnection.query('select username,roleid from user where username=? and password=?',
    [username,password],
    (err,rows,fields) => {
      if(!err){
        if(rows.length >0){
            let data = JSON.stringify(rows[0]);
            const token = jwt.sign(data, 'stil');
            res.json({token});
          }else{
            res.json('Usuario o clave incorrectos');
          }
        
      }else{
        console.log(err);
      }
    }
    )
  })

  router.post('/test',verifyToken, (req,res) => {
    res.json('Informacion secreta');
  })

  function verifyToken(req,res, next){
    if(!req.headers.authorization) return res.status(401).json('No autorizado');

    const token = req.headers.authorization.substr(7);
    if(token!==''){
        const content = jwt.verify(token,'stil');
        req.data = content;
        next();
      }else{
        res.status(401).json('Token vacio');
      }
  }  
  router.get('/persona', (req,res) =>{
    mysqlConnection.query('select * from persona', (err,rows,fields)=>{
        if(!err){
            res.json(rows);
       }else{
        console.log(err);
       }
    })    
})
router.get('/persona/:id',(req, res)=>{
  const {id} = req.params
  let sql ='select * from persona where idpersona = ?'
  mysqlConnection.query(sql,[id],(err, rows, fields)=>{
      if(err) throw err;
      else{
          res.json(rows)
      }
  })
})
router.get('/personaorg', (req,res) =>{
  mysqlConnection.query('select per.nombre, per.apepat,per.apemat, per.codigo,orga.nombreo from persona per inner join organizacion orga on (per.idorga = orga.idorga)', (err,rows,fields)=>{
      if(!err){
          res.json(rows);
     }else{
      console.log(err);
     }
  })    
})



//agregar practicante
router.post('/persona',( req, res)=>{
  const{nombre, apepat, apemat, codigo} = req.body

  let sql = `insert into persona(nombre, apepat, apemat, codigo) values('${nombre}','${apepat}','${apemat}','${codigo}')`
  mysqlConnection.query(sql, (err, rows, fields)=>{
      if(err) throw err
      else{
          res.json({status: 'practicante registrado'})
      }
  })
})

//registrar practicante y org
router.post('/personaorga',( req, res)=>{
  const{nombre, apepat, apemat, codigo,nombreo} = req.body

  let sql = `insert into persona(nombre, apepat, apemat, codigo,nombreo) values('${nombre}','${apepat}','${apemat}','${codigo}','${nombreo}')`
  mysqlConnection.query(sql, (err, rows, fields)=>{
      if(err) throw err
      else{
          res.json({status: 'practicante registrado'})
      }
  })
})

//eliminar practicante
router.delete('/persona/delete/:id',(req, res)=>{
  const{id} = req.params

  let sql =`delete from persona where idpersona = '${id}'`
  mysqlConnection.query(sql, (err, rows, fields)=>{
      if(err) throw err
      else{
          res.json({status: 'practicante eliminado'})
      }
  })
});

//modificar practicante
router.put('/persona/update/:id',(req, res)=>{
  const{id}=req.params
  const{nombre, apepat, apemat, codigo} = req.body

  let sql = `update persona set 
              nombre ='${nombre}',
              apepat='${apepat}',
              apemat='${apemat}',
              codigo='${codigo}'
              where idpersona = '${id}'`
  
      mysqlConnection.query(sql, (err, rows, fields)=>{
      if(err) throw err
      else{
          res.json({status: 'equipo modificado'})
      }
  })

})

router.post('/organizacion',( req, res)=>{
  const{nombreo, ruc} = req.body

  let sql = `insert into organizacion(nombreo, ruc) values('${nombreo}','${ruc}')`
  mysqlConnection.query(sql, (err, rows, fields)=>{
      if(err) throw err
      else{
          res.json({status: 'organizacion registrada'})
      }
  })
})

router.get('/organizacion', (req,res) =>{
  mysqlConnection.query('select * from organizacion', (err,rows,fields)=>{
      if(!err){
          res.json(rows);
     }else{
      console.log(err);
     }
  })    
})
router.get('/organizacion/:id',(req, res)=>{
  const {id} = req.params
  let sql ='select * from organizacion where idorga = ?'
  mysqlConnection.query(sql,[id],(err, rows, fields)=>{
      if(err) throw err;
      else{
          res.json(rows)
      }
  })
})

router.delete('/organizacion/delete/:id',(req, res)=>{
  const{id} = req.params

  let sql =`delete from organizacion where idorga = '${id}'`
  mysqlConnection.query(sql, (err, rows, fields)=>{
      if(err) throw err
      else{
          res.json({status: 'organizacion eliminada'})
      }
  })

  router.put('/organizacion/update/:id',(req, res)=>{
    const{id}=req.params
    const{nombreo, ruc} = req.body
  
    let sql = `update organizacion set 
                nombreo ='${nombreo}',
                ruc='${ruc}'
                where idorga = '${id}'`
    
        mysqlConnection.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'equipo modificado'})
        }
    })
  
  })
});
  

module.exports = router;