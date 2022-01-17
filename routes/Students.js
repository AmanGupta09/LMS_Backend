var express = require('express');
var router = express.Router();
var pool= require('./Pool')
var upload= require('./Multer')

router.post('/addstudent',upload.any(),function(req, res, next) {
    pool.query("insert into students (enrollmentno,studentname, fathername, mothername, category, nationality, gender, dob, mobileno, parentsmobileno, cstate, ccity, caddress, pstate, pcity, paddress, emailid, parentoccupation, annualincome, aadhaarno, uploadaadhaar, domicilestate, uploaddomicle, departmentid, courseid, password, picture) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.enrollmentno,req.body.studentname,req.body.fathername,req.body.mothername,req.body.category,req.body.nationality,req.body.gender,req.body.dob,req.body.mobileno,req.body.parentsmobileno,req.body.cstate,req.body.ccity,req.body.caddress,req.body.pstate,req.body.pcity,req.body.paddress,req.body.emailid,req.body.parentsoccupation,req.body.annualincome,req.body.aadhaarno,req.files[0].filename,req.body.domicilestate,req.files[1].filename,req.body.departmentid,req.body.courseid,req.body.password,req.files[2].filename],function(error,result){
    if(error)
    {   console.log(error)
        res.status(500).json({result:false,msz:'Server Error....'})
    }
    else
    {console.log(result)
      res.status(200).json({result:true,msz:'Submitted....'})
    }
  })
  });

  router.get('/displayallstudents',function(req, res) {
    pool.query("select ST.*,(select S.statename from states S where S.stateid=ST.cstate ) as currentstate,(select C.cityname from cities C where C.cityid=ST.ccity ) as currentcity,(select S.statename from states S where S.stateid=ST.pstate ) as permanentstate,(select C.cityname from cities C where C.cityid=ST.pcity ) as permanentcity,(select S.statename from states S where S.stateid=ST.domicilestate ) as domicilestatename,(select D.departmentname from department D where D.departmentid=ST.departmentid) as departmentname,(select C.coursename from courses C where C.courseid=ST.courseid) as coursename from students ST",function(error,result){
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
  router.post('/editstudentpicture',upload.single('picture'),function(req, res, next) {
    pool.query("update students set picture=? where enrollmentno=?",[req.filename,req.body.enrollmentno],function(error,result){
    if(error)
    {   console.log(error)
        res.status(500).json({result:false,msz:'Server Error....'})
    }
    else
    {
      res.status(200).json({result:true,msz:'Icon Edited Successfully....'})
    }
  })
  });  

router.post('/editstudentdata',function(req, res, next) {
    pool.query("update students set studentname=?,category=?,nationality=?,gender=?,dob=?,mobileno=?,cstate=?,ccity=?,caddress=?,emailid=?,departmentid=?,courseid=?,password=? where enrollmentno=?",[req.body.studentname,req.body.category,req.body.nationality,req.body.gender,req.body.dob,req.body.mobileno,req.body.cstate,req.body.ccity,req.body.caddress,req.body.emailid,req.body.departmentid,req.body.courseid,req.body.password,req.body.enrollmentno],function(error,result){
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

  router.post('/deletestudent',function(req, res, next) {
    pool.query("delete from students where enrollmentno=?",[req.body.enrollmentno],function(error,result){
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



router.post('/editaadhaarpicture',upload.single('aadhaarimage'),function(req, res, next) {
    pool.query("update students set uploadaadhaar=? where enrollmentno=?",[req.filename,req.body.enrollmentno],function(error,result){
    if(error)
    {   console.log(error)
        res.status(500).json({result:false,msz:'Server Error....'})
    }
    else
    {
      res.status(200).json({result:true,msz:'Icon Edited Successfully....'})
    }
  })
  });  

  router.post('/editdomicilepicture',upload.single('domicileimage'),function(req, res, next) {
    pool.query("update students set uploaddomicle=? where enrollmentno=?",[req.filename,req.body.enrollmentno],function(error,result){
    if(error)
    {   console.log(error)
        res.status(500).json({result:false,msz:'Server Error....'})
    }
    else
    {
      res.status(200).json({result:true,msz:'Icon Edited Successfully....'})
    }
  })
  });  

  router.post('/editparentsdata',function(req, res, next) {
    pool.query("update students set fathername=?,mothername=?,pstate=?,pcity=?,paddress=?,parentoccupation=?,annualincome=?,parentsmobileno=?,aadhaarno=?,domicilestate=? where enrollmentno=?",[req.body.fathername,req.body.mothername,req.body.pstate,req.body.pcity,req.body.paddress,req.body.parentoccupation,req.body.annualincome,req.body.parentsmobileno,req.body.aadhaarno,req.body.domicilestate,req.body.enrollmentno],function(error,result){
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


module.exports = router;