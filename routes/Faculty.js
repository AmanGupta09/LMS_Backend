var express = require('express');
var router = express.Router();
var pool= require('./Pool')
var upload= require('./Multer')

router.post('/addfaculty',upload.single('facultyimg'),function(req, res, next) {
    pool.query("insert into faculty (firstname, lastname, fathername, gender, birthdate, qualification, department, address, state, city, mobilenumber, alternatemobilenumber, emailid, designation,password,facultyimage) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.firstname,req.body.lastname,req.body.fathername,req.body.gender,req.body.birthdate,req.body.qualification,req.body.department,req.body.address,req.body.state,req.body.city,req.body.mobileno,req.body.alternatemobileno,req.body.emailid,req.body.designation,req.body.password,req.filename],function(error,result){
    if(error)
    {   console.log(error)
        res.status(500).json({result:false,msz:'Server Error....'})
    }
    else
    {
      res.status(200).json({result:true,msz:'Record Submitted....'})
    }
  })
  });
  router.post('/editfacultydata',function(req, res, next) {
    pool.query("update faculty set firstname=?, lastname=?, fathername=?, gender=?, birthdate=?, qualification=?, department=?, address=?, state=?, city=?, mobilenumber=?, alternatemobilenumber=?, emailid=?, designation=?, password=? where facultyid=?",[req.body.firstname,req.body.lastname,req.body.fathername,req.body.gender,req.body.birthdate,req.body.qualification,req.body.department,req.body.address,req.body.state,req.body.city,req.body.mobileno,req.body.alternatemobileno,req.body.emailid,req.body.designation,req.body.password,req.body.facultyid],function(error,result){
    if(error)
    {   console.log(error)
        res.status(500).json({result:false,msz:'Server Error....'})
    }
    else
    {
      res.status(200).json({result:true,msz:'Edit Department Successfully....'})
    }
  })
  });
  router.get('/displayallfaculty',function(req, res) {
    pool.query("select F.*,(select D.departmentname from department D where D.departmentid=F.department) as departmentname,(select S.statename from states S where S.stateid=F.state) as statename,(select C.cityname from cities C where C.cityid=F.city) as cityname from faculty F",function(error,result){
    if(error)
    {   console.log(error)
        res.status(500).json({result:[]})
    }
    else
    {
      res.status(200).json({result:result})
    }
  })
  });
  router.post('/editfacultyimage',upload.single('facultyimage'),function(req, res, next) {
    pool.query("update faculty set facultyimage=? where facultyid=?",[req.filename,req.body.facultyid],function(error,result){
    if(error)
    {   console.log(error)
        res.status(500).json({result:false,msz:'Server Error....'})
    }
    else
    { console.log(result)
      res.status(200).json({result:true,msz:'Faculty Image Edited Successfully....'})
    }
  })
  });
  router.post('/deletefaculty',function(req, res, next) {
    pool.query("delete from faculty where facultyid=?",[req.body.facultyid],function(error,result){
    if(error)
    {   console.log(error)
        res.status(500).json({result:false,msz:'Server Error....'})
    }
    else
    {
      res.status(200).json({result:true,msz:'Deleted Successfully....'})
    }
  })
  });
module.exports = router;